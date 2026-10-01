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
  "/detailing",
  "/auto-detailing",
  "/rv-detailing",
  "/ceramic-coating",
  "/paint-correction",
  "/gallery",
  "/reviews",
  "/contact",
  "/marine",
  "/gift-cards",
  "/training",
  "/training/signup",
  "/blog",
  "/blog/ppf-vs-ceramic-coating-calgary",
  "/calgary-detailing-price-comparison",
  "/terms-of-service",
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

/** Adds any blog post missing from dist/sitemap.xml so new posts are indexed without hand edits. */
const addBlogPostsToSitemap = () => {
  const path = resolve(DIST, "sitemap.xml");
  if (!existsSync(path)) return;
  let xml = readFileSync(path, "utf-8");
  const entries = BLOG_ROUTES.filter((b) => !xml.includes(`https://xpressautodetail.ca${b.route}<`))
    .map(
      (b) =>
        `  <url><loc>https://xpressautodetail.ca${b.route}</loc><lastmod>${b.date}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    )
    .join("\n");
  if (entries) xml = xml.replace("</urlset>", `${entries}\n</urlset>`);
  writeFileSync(path, xml);
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
  for (const route of ROUTES) {
    const { html, head } = await render(route);

    if (!html || html.length < 500) {
      throw new Error(`Prerender produced suspiciously empty HTML for ${route}`);
    }

    const target = outputPathFor(route);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, buildDocument(template, head, html));
    rendered += 1;
    console.log(`prerendered ${route} -> ${target.replace(`${DIST}/`, "dist/")}`);
  }

  addBlogPostsToSitemap();

  // The SSR bundle is a build artifact only; it must never ship.
  rmSync(SSR_DIST, { recursive: true, force: true });

  console.log(`\nPrerendered ${rendered} routes to static HTML.`);
}

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
