import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { LANGUAGES } from "./i18n/translations";
import { localizePath } from "./i18n/paths";
import { PROJECTS } from "./data/projects";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import CookieConsentBanner from "./components/CookieConsentBanner/CookieConsentBanner";

/* ─── ROUTES ────────────────────────────────────────────────────────────── */
// Estratte da App così entry-server.jsx può montarle sotto StaticRouter
// (per il prerendering) invece che sotto BrowserRouter.
export function AppRoutes() {
  return (
    <LanguageProvider>
      <Routes>
        {/* Stesse pagine per ogni lingua: "/" (it), "/en/", "/es/" — vedi i18n/paths.js */}
        {LANGUAGES.map(lang => {
          const prefix = localizePath("", lang);
          return [
            <Route key={`${lang}-home`} path={`${prefix}/`} element={<HomePage />} />,
            <Route key={`${lang}-project`} path={`${prefix}/progetti/:slug`} element={<ProjectPage projects={PROJECTS} />} />,
          ];
        })}
      </Routes>
      <CookieConsentBanner />
    </LanguageProvider>
  );
}

/* ─── APP ───────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
