import { SITE_URL } from "./seo";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setAlternates(alternates = []) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  for (const { hreflang, href } of alternates) {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  }
}

/**
 * Aggiorna title, meta description, canonical, hreflang, lang e Open
 * Graph/Twitter tags per la pagina corrente. Necessario perché l'app è una
 * SPA client-side: senza questo, navigando tra le rotte resterebbero i meta
 * tag della prima pagina caricata.
 */
export function setDocumentMeta({ title, description, path, image, lang, locale, alternates }) {
  const url = `${SITE_URL}${path}`;
  const img = image ?? `${SITE_URL}/og-image.jpg`;

  document.title = title;
  document.documentElement.lang = lang;
  setMeta("name", "description", description);
  setCanonical(url);
  setAlternates(alternates);

  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", img);
  setMeta("property", "og:locale", locale);

  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:url", url);
  setMeta("name", "twitter:image", img);
}
