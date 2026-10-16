import { useLocation, useNavigate } from "react-router-dom";
import { translations } from "./translations";
import { LanguageContext } from "./context";
import { parsePath, localizePath } from "./paths";

export function LanguageProvider({ children }) {
  // La lingua viene dall'URL (vedi paths.js): stessa lingua nell'HTML
  // prerenderizzato e al primo render client, quindi nessun mismatch di
  // idratazione e nessun cambio di testo dopo il caricamento (CLS).
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { lang, rest } = parsePath(pathname);

  // Cambiare lingua = andare alla stessa pagina nell'altra lingua
  const setLang = (next) => {
    if (next === lang || !translations[next]) return;
    navigate(localizePath(rest, next) + hash);
  };

  // Converte un path "neutro" ("/progetti/x") nel path della lingua corrente
  const localize = (path) => localizePath(path, lang);

  const value = { lang, setLang, localize, t: translations[lang] };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
