// Genera un index.html statico per ogni route conosciuta a build time,
// con markup React già renderizzato e meta tag (title/description/
// canonical/OG) corretti — visibili anche ai crawler che non eseguono JS.
// Va lanciato DOPO "vite build" (client) e "vite build --ssr" (server bundle).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, PROJECTS } = await import(
  path.join(ssrDir, "entry-server.js")
);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
const routes = ["/", ...PROJECTS.map(p => `/progetti/${p.slug}`)];

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

for (const route of routes) {
  const { appHtml, meta } = render(route);
  let html = template.replace("<!--app-html-->", appHtml);

  if (meta) {
    const url = `https://xavierparedes-dev.it${meta.path}`;
    const image = meta.image ?? "https://xavierparedes-dev.it/og-image.jpg";

    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
    html = setContent(html, /<meta name="description"[^>]*>/, meta.description);
    html = setHref(html, /<link rel="canonical"[^>]*>/, url);

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

fs.rmSync(ssrDir, { recursive: true, force: true });
