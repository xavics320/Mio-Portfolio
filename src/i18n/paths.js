/*
  Lingua nell'URL: l'italiano sta alla radice ("/", "/progetti/…"),
  le altre lingue sotto un prefisso ("/en/", "/es/progetti/…").
  Ogni lingua ha così un URL suo che Google può indicizzare — con la
  lingua salvata solo in localStorage, EN ed ES erano invisibili ai crawler.
*/
import { LANGUAGES } from "./translations";

export const DEFAULT_LANG = "it";

// "/en/progetti/x" → { lang: "en", rest: "/progetti/x" }
export function parsePath(pathname) {
  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  if (match && match[1] !== DEFAULT_LANG && LANGUAGES.includes(match[1])) {
    return { lang: match[1], rest: match[2] || "/" };
  }
  return { lang: DEFAULT_LANG, rest: pathname };
}

// ("/progetti/x", "en") → "/en/progetti/x"; ("/", "en") → "/en/"
export function localizePath(rest, lang) {
  return lang === DEFAULT_LANG ? rest : `/${lang}${rest}`;
}

// Tutte le route da prerenderizzare / mettere in sitemap
export function allRoutes(slugs) {
  const rests = ["/", ...slugs.map(slug => `/progetti/${slug}`)];
  return LANGUAGES.flatMap(lang => rests.map(rest => localizePath(rest, lang)));
}
