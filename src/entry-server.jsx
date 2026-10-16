import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes, PROJECTS } from "./App";
import { PLANS } from "./data/plans";
import { allRoutes } from "./i18n/paths";
import { resolveMetaForPath, resolveSchemaForPath } from "./seo";

// Tutte le route da prerenderizzare, in tutte le lingue
export const ROUTES = allRoutes(PROJECTS.map(p => p.slug));

// Usato solo dallo script di prerendering (scripts/prerender.mjs), mai in produzione runtime
export function render(url) {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  const meta = resolveMetaForPath(url, PROJECTS);
  const schema = resolveSchemaForPath(url, PROJECTS, PLANS);
  return { appHtml, meta, schema };
}
