import { translations, LANGUAGES } from "../i18n/translations";
import { parsePath, localizePath, DEFAULT_LANG } from "../i18n/paths";

export const SITE_URL = "https://xavierparedes-dev.it";

const OG_LOCALES = { it: "it_IT", en: "en_GB", es: "es_ES" };

// hreflang: per ogni pagina, la stessa pagina nelle altre lingue.
// x-default = versione mostrata a chi non parla nessuna delle tre (italiano).
function alternatesFor(rest) {
  return [
    ...LANGUAGES.map(lang => ({ hreflang: lang, href: SITE_URL + localizePath(rest, lang) })),
    { hreflang: "x-default", href: SITE_URL + localizePath(rest, DEFAULT_LANG) },
  ];
}

// Title e description stanno in translations[lang].seo
// (title ≤ 60 caratteri, description ≤ 160: oltre vengono troncati da Google).
export function getHomeMeta(lang) {
  const { seo } = translations[lang];
  return {
    title: seo.title,
    description: seo.description,
    path: localizePath("/", lang),
    lang,
    locale: OG_LOCALES[lang],
    alternates: alternatesFor("/"),
  };
}

export function getProjectMeta(project, lang) {
  const copy = translations[lang].projects.items[project.slug];
  const rest = `/progetti/${project.slug}`;
  return {
    title: `${project.title}: ${copy.category} | Xavier Paredes`,
    description: copy.desc,
    path: localizePath(rest, lang),
    image: project.photos?.[0] ? `${SITE_URL}${project.photos[0]}` : undefined,
    lang,
    locale: OG_LOCALES[lang],
    alternates: alternatesFor(rest),
  };
}

function matchProject(pathname, projects) {
  const { lang, rest } = parsePath(pathname);
  const match = rest.match(/^\/progetti\/([^/]+)\/?$/);
  const project = match && projects.find(p => p.slug === match[1]);
  return { lang, rest, project };
}

// Risolve i meta tag per un path noto a build time — usato dallo script
// di prerendering (nessun accesso al DOM, deve girare in Node).
export function resolveMetaForPath(pathname, projects) {
  const { lang, rest, project } = matchProject(pathname, projects);
  if (rest === "/") return getHomeMeta(lang);
  return project ? getProjectMeta(project, lang) : null;
}

/* ─── DATI STRUTTURATI (JSON-LD) ──────────────────────────────────────────
  Generati a build time dallo script di prerender a partire dagli stessi
  dati che usa il sito (PROJECTS, PLANS, traduzioni): così prezzi, FAQ e
  progetti nello schema non vanno mai fuori sincrono con la pagina.
  Person e WebSite, che valgono per tutto il sito, restano in index.html.
*/
function homeSchema(lang, projects, plans) {
  const t = translations[lang];
  const home = SITE_URL + localizePath("/", lang);
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Xavier Paredes · Web Developer",
      description: t.seo.description,
      url: home,
      email: "info@xavierparedes-dev.it",
      image: `${SITE_URL}/og-image.jpg`,
      founder: { "@id": `${SITE_URL}/#xavier` },
      address: { "@type": "PostalAddress", addressLocality: "Milano", addressCountry: "IT" },
      areaServed: [
        { "@type": "City", name: "Milano" },
        { "@type": "Country", name: "Italia" },
      ],
      priceRange: "€€",
      makesOffer: plans
        .filter(plan => plan.price !== null)
        .map(plan => ({
          "@type": "Offer",
          name: `${t.pricing.plans[plan.id].name} — ${t.pricing.plans[plan.id].desc}`,
          price: plan.price,
          priceCurrency: "EUR",
        })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: t.faq.items.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t.projects.sectionLabel,
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: SITE_URL + localizePath(`/progetti/${project.slug}`, lang),
        name: project.title,
      })),
    },
  ];
}

function projectSchema(project, lang) {
  const t = translations[lang];
  const copy = t.projects.items[project.slug];
  const url = SITE_URL + localizePath(`/progetti/${project.slug}`, lang);
  const home = SITE_URL + localizePath("/", lang);
  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      name: project.title,
      headline: `${project.title}: ${copy.category}`,
      description: copy.desc,
      inLanguage: lang,
      url,
      dateCreated: project.year,
      keywords: project.tags.join(", "),
      image: project.photos?.map(src => `${SITE_URL}${src}`),
      creator: { "@id": `${SITE_URL}/#xavier` },
      ...(project.liveUrl && project.liveUrl !== "#" ? { sameAs: project.liveUrl } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: home },
        { "@type": "ListItem", position: 2, name: t.seo.projectsLabel, item: `${home}#progetti` },
        { "@type": "ListItem", position: 3, name: project.title, item: url },
      ],
    },
  ];
}

export function resolveSchemaForPath(pathname, projects, plans) {
  const { lang, rest, project } = matchProject(pathname, projects);
  if (rest === "/") return homeSchema(lang, projects, plans);
  return project ? projectSchema(project, lang) : [];
}
