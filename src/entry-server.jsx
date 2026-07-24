import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes, PROJECTS } from "./App";
import { resolveMetaForPath } from "./seo";

export { PROJECTS };

// Usato solo dallo script di prerendering (scripts/prerender.mjs), mai in produzione runtime
// né in Fast Refresh — l'eslint-plugin-react-refresh non si applica qui.
// eslint-disable-next-line react-refresh/only-export-components
export function render(url) {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  const meta = resolveMetaForPath(url, PROJECTS);
  return { appHtml, meta };
}
