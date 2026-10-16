// Genera un index.html statico per ogni route conosciuta a build time,
// con markup React già renderizzato e meta tag (title/description/
// canonical/OG) corretti — visibili anche ai crawler che non eseguono JS.
// Va lanciato DOPO "vite build" (client) e "vite build --ssr" (server bundle).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, ROUTES: routes } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function setContent(html, tagRegex, value) {
  return html.replace(tagRegex, tag => tag.replace(/content="[^"]*"/, `content="${esc(value)}"`));
}

function setHref(html, tagRegex, value) {
  return html.replace(tagRegex, tag => tag.replace(/href="[^"]*"/, `href="${esc(value)}"`));
}

// "<" escapato: impedisce che un testo contenente "</script>" chiuda il tag
function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

for (const route of routes) {
  const { appHtml, meta, schema } = render(route);
  let html = template.replace("<!--app-html-->", appHtml);

  if (schema?.length) {
    html = html.replace("</head>", `  ${schema.map(jsonLd).join("\n  ")}\n</head>`);
  }

  if (meta) {
    const url = `https://xavierparedes-dev.it${meta.path}`;
    const image = meta.image ?? "https://xavierparedes-dev.it/og-image.jpg";

    html = html.replace(/<html lang="[^"]*">/, `<html lang="${meta.lang}">`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
    html = setContent(html, /<meta name="description"[^>]*>/, meta.description);
    html = setHref(html, /<link rel="canonical"[^>]*>/, url);
    html = setContent(html, /<meta property="og:locale"[^>]*>/, meta.locale);

    const hreflangs = meta.alternates
      .map(a => `<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`)
      .join("\n  ");
    html = html.replace(/(<link rel="canonical"[^>]*>)/, `$1\n  ${hreflangs}`);

    html = setContent(html, /<meta property="og:title"[^>]*>/, meta.title);
    html = setContent(html, /<meta property="og:description"[^>]*>/, meta.description);
    html = setContent(html, /<meta property="og:url"[^>]*>/, url);
    html = setContent(html, /<meta property="og:image"[^>]*>/, image);

    html = setContent(html, /<meta name="twitter:title"[^>]*>/, meta.title);
    html = setContent(html, /<meta name="twitter:description"[^>]*>/, meta.description);
    html = setContent(html, /<meta name="twitter:url"[^>]*>/, url);
    html = setContent(html, /<meta name="twitter:image"[^>]*>/, image);
  }

  const outPath = route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, route.replace(/^\//, ""), "index.html");

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerendered ${route} -> ${path.relative(root, outPath)}`);
}

// Sitemap generata dalle stesse route: un nuovo progetto in PROJECTS
// finisce in sitemap automaticamente, senza toccare file a mano.
// (changefreq/priority omessi: Google li ignora.)
const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://xavierparedes-dev.it${route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
console.log(`sitemap.xml -> ${routes.length} url`);

fs.rmSync(ssrDir, { recursive: true, force: true });
