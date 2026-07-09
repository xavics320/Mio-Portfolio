import { useState } from "react";
import { translations, LANGUAGES } from "./translations";
import { LanguageContext } from "./context";

function detectInitialLanguage() {
  const stored = localStorage.getItem("lang");
  if (stored && LANGUAGES.includes(stored)) return stored;

  const browserLang = navigator.language?.slice(0, 2);
  if (LANGUAGES.includes(browserLang)) return browserLang;

  return "it";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLanguage);

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
