/**
 * Build-time prerendering (SSG).
 *
 * Runs after the client build and the SSR bundle build. Renders every public
 * route to a fully-formed static HTML file so the initial server response
 * contains real headings, copy, nav links and per-page metadata — no JS
 * execution required for a crawler to read the page.
 *
 * Output: dist/<route>/index.html (dist/index.html for "/").
 */

import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DIST = resolve("dist");
const SSR_DIST = resolve("dist-ssr");
const TEMPLATE_PATH = resolve(DIST, "index.html");
const SSR_ENTRY = resolve(SSR_DIST, "entry-server.js");

/** Every public route that should get its own static HTML file. */
const ROUTES = [
  "/",
  "/black-friday",
  "/detailing",
  "/auto-detailing",
  "/rv-detailing",
  "/ceramic-coating",
  "/paint-correction",
  "/headlight-restoration",
  "/windshield-ppf",
  "/paint-protection-film",
  "/paint-protection-film/suntek",
  "/ceramic-coating/carpro-dquartz",
  "/gallery",
  "/reviews",
  "/contact",
  "/quote",
  "/warranty",
  "/lease-return",
  "/lp/interior-detailing",
  "/lp/ceramic-ppf",
  "/lp/fleet",
  "/marine",
  "/gift-cards",
  "/training",
  "/training/signup",
  "/blog",
  "/blog/ppf-vs-ceramic-coating-calgary",
  "/calgary-detailing-price-comparison",
  "/terms-of-service",
  "/privacy-policy",
  // Canonical URLs used by the nav — must ship real HTML
  "/rv-trailer",
  "/rv-trailer/ppf",
  "/rv-trailer/rental-fleet",
  "/ceramic-paint-correction",
  "/fleet",
  "/xpress-pass",
  "/cancellation-policy",
];

/** Published blog posts (src/content/blog/*.json, dated today or earlier in Calgary). */
const TODAY = new Date().toLocaleDateString("en-CA", { timeZone: "America/Edmonton" });
const BLOG_DIR = resolve("src/content/blog");
const BLOG_ROUTES = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(resolve(BLOG_DIR, f), "utf-8")))
  .filter((p) => p.date <= TODAY)
  .map((p) => ({ route: `/blog/${p.slug}`, date: p.date }));
ROUTES.push(...BLOG_ROUTES.map((b) => b.route));

/** Sitemap priority by route. Anything not listed gets 0.6. */
const PRIORITY = [
  [/^\/$/, "1.0"],
  [/^\/(detailing|ceramic-coating|paint-protection-film|windshield-ppf|rv-trailer|fleet)$/, "0.9"],
  [/^\/(rv-trailer\/ppf|rv-detailing|auto-detailing|paint-correction|headlight-restoration|ceramic-paint-correction|marine|xpress-pass|quote|reviews|gallery)$/, "0.8"],
  [/^\/(terms-of-service|privacy-policy|cancellation-policy)$/, "0.3"],
];
const priorityFor = (route) => PRIORITY.find(([re]) => re.test(route))?.[1] ?? "0.6";

/**
 * Writes dist/sitemap.xml from the routes that were actually prerendered and are indexable,
 * so the sitemap can never list a dead page or miss a new one. Blog posts carry their date.
 */
const writeSitemap = (routes) => {
  const blogDates = new Map(BLOG_ROUTES.map((b) => [b.route, b.date]));
  const urls = routes.map((route) => {
    const loc = `https://xpressautodetail.ca${route === "/" ? "/" : route}`;
    const lastmod = blogDates.get(route);
    return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<priority>${priorityFor(route)}</priority></url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  writeFileSync(resolve(DIST, "sitemap.xml"), xml);
  console.log(`sitemap.xml: ${routes.length} URLs`);
};

/**
 * Head tags the per-route Helmet output also emits. They are removed from the
 * template before injection so each page ships exactly one of each.
 */
const CONFLICTING_TAG_PATTERNS = [
  /<title>[\s\S]*?<\/title>\s*/i,
  /<meta\s+name="description"[^>]*>\s*/i,
  /<meta\s+name="author"[^>]*>\s*/i,
  /<link\s+rel="canonical"[^>]*>\s*/i,
  /<meta\s+property="og:title"[^>]*>\s*/i,
  /<meta\s+property="og:description"[^>]*>\s*/i,
  /<meta\s+property="og:type"[^>]*>\s*/i,
  /<meta\s+property="og:url"[^>]*>\s*/i,
  /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>\s*/i,
  /<meta\s+property="og:site_name"[^>]*>\s*/i,
  /<meta\s+name="twitter:card"[^>]*>\s*/i,
  /<meta\s+name="twitter:title"[^>]*>\s*/i,
  /<meta\s+name="twitter:description"[^>]*>\s*/i,
];

function outputPathFor(route) {
  return route === "/"
    ? resolve(DIST, "index.html")
    : resolve(DIST, `.${route}`, "index.html");
}

function buildDocument(template, head, appHtml) {
  let doc = template;
  for (const pattern of CONFLICTING_TAG_PATTERNS) {
    doc = doc.replace(pattern, "");
  }
  // Pages that set their own robots tag (noindex) replace the template's default.
  if (/<meta[^>]+name="robots"/i.test(head)) {
    doc = doc.replace(/<meta\s+name="robots"[^>]*>\s*/i, "");
  }
  doc = doc.replace("</head>", `  ${head}\n  </head>`);
  doc = doc.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return doc;
}

async function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    throw new Error(`Missing client build output at ${TEMPLATE_PATH}`);
  }
  if (!existsSync(SSR_ENTRY)) {
    throw new Error(`Missing SSR bundle at ${SSR_ENTRY}`);
  }

  const template = readFileSync(TEMPLATE_PATH, "utf-8");

  // Browser-only globals referenced at module scope by some client libraries.
  if (typeof globalThis.localStorage === "undefined") {
    const store = new Map();
    globalThis.localStorage = {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => void store.set(k, String(v)),
      removeItem: (k) => void store.delete(k),
      clear: () => store.clear(),
      key: (i) => [...store.keys()][i] ?? null,
      get length() {
        return store.size;
      },
    };
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY).href);


  let rendered = 0;
  const indexable = [];
  for (const route of ROUTES) {
    const { html, head } = await render(route);
    if (!/name="robots"[^>]*noindex/i.test(head)) indexable.push(route);

    if (!html || html.length < 500) {
      throw new Error(`Prerender produced suspiciously empty HTML for ${route}`);
    }

    const target = outputPathFor(route);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, buildDocument(template, head, html));
    rendered += 1;
    console.log(`prerendered ${route} -> ${target.replace(`${DIST}/`, "dist/")}`);
  }

  writeSitemap(indexable);

  // The SSR bundle is a build artifact only; it must never ship.
  rmSync(SSR_DIST, { recursive: true, force: true });

  console.log(`\nPrerendered ${rendered} routes to static HTML.`);
}

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
