import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { Suspense } from "react";
import { Writable } from "node:stream";
import { AnimatedRoutes, AppProviders, RouteFallback } from "./App";

export interface RenderResult {
  html: string;
  head: string;
}

const collectHelmet = (helmet: HelmetServerState | undefined) => {
  if (!helmet) return "";
  return [
    helmet.title?.toString() ?? "",
    helmet.meta?.toString() ?? "",
    helmet.link?.toString() ?? "",
    helmet.script?.toString() ?? "",
  ]
    .filter(Boolean)
    .join("\n    ");
};

export async function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = await new Promise<string>((resolve, reject) => {
    let body = "";
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        body += chunk.toString();
        callback();
      },
    });
    sink.on("finish", () => resolve(body));

    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <AppProviders>
          <StaticRouter location={url}>
            <Suspense fallback={<RouteFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </StaticRouter>
        </AppProviders>
      </HelmetProvider>,
      {
        onAllReady() {
          pipe(sink);
        },
        onError(error) {
          reject(error);
          abort();
        },
      },
    );

    // Safety valve so a hung suspense boundary can never stall the build.
    setTimeout(() => abort(), 20_000);
  });

  return { html, head: collectHelmet(helmetContext.helmet) };
}
