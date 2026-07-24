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

/**
 * Aggiorna title, meta description, canonical e Open Graph/Twitter tags
 * per la pagina corrente. Necessario perché l'app è una SPA client-side:
 * senza questo, ogni rotta condividerebbe i meta tag statici di index.html.
 */
export function setDocumentMeta({ title, description, path, image }) {
  const url = `https://xavierparedes-dev.it${path}`;
  const img = image ?? "https://xavierparedes-dev.it/og-image.jpg";

  document.title = title;
  setMeta("name", "description", description);
  setCanonical(url);

  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", img);

  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:url", url);
  setMeta("name", "twitter:image", img);
}
