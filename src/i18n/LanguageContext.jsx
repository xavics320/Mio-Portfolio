import { useState, useEffect } from "react";
import { translations, LANGUAGES } from "./translations";
import { LanguageContext } from "./context";

export function LanguageProvider({ children }) {
  // "it" fisso al primo render: deve coincidere con l'HTML prerenderizzato
  // lato server (che non ha accesso a localStorage/navigator). La lingua
  // reale viene rilevata subito dopo, in un useEffect — quindi dopo
  // l'idratazione, senza causare un mismatch tra markup server e client.
  const [lang, setLangState] = useState("it");

  useEffect(() => {
    // Lettura una tantum da localStorage/navigator al mount — non può
    // avvenire durante il render (servirebbe per l'idratazione coerente
    // col markup prerenderizzato lato server).
    const stored = localStorage.getItem("lang");
    if (stored && LANGUAGES.includes(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
      return;
    }
    const browserLang = navigator.language?.slice(0, 2);
    if (LANGUAGES.includes(browserLang)) setLangState(browserLang);
  }, []);

  const setLang = (next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    localStorage.setItem("lang", next);
  };

  const value = { lang, setLang, t: translations[lang] };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
