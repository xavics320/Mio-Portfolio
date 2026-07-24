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
    // Solo localStorage, niente auto-detect da navigator.language: il sito
    // è prerenderizzato in italiano, quindi cambiare lingua in automatico
    // al mount per ogni visitatore con browser non italiano (compresi i
    // bot di test come Lighthouse, che girano in en-US) produce un cambio
    // di tutto il testo subito dopo il caricamento — un layout shift (CLS)
    // che penalizza pesantemente il punteggio Performance. La lingua resta
    // "it" finché l'utente non la cambia manualmente (persistita qui sotto).
    const stored = localStorage.getItem("lang");
    if (stored && LANGUAGES.includes(stored) && stored !== "it") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
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
