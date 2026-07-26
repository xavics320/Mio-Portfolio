import { useEffect, useState } from "react";
import { useLanguage } from "./i18n/useLanguage";
import { grantAnalyticsConsent } from "./analytics";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsentBanner() {
  const { t } = useLanguage();
  // Parte nascosto: la decisione dipende da localStorage, non disponibile
  // lato server, quindi va letta solo dopo il mount per evitare mismatch
  // tra markup prerenderizzato e client (stesso pattern di LanguageContext).
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      grantAnalyticsConsent();
    } else if (stored !== "denied") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "granted");
    grantAnalyticsConsent();
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite">
      <p className="cookie-banner__text">
        {t.cookieBanner.text}{" "}
        <a
          href="https://www.iubenda.com/privacy-policy/81915781/cookie-policy"
          className="cookie-banner__link"
        >
          {t.cookieBanner.policyLink}
        </a>
      </p>
      <div className="cookie-banner__actions">
        <button
          type="button"
          className="cookie-banner__btn cookie-banner__btn--reject"
          onClick={handleReject}
        >
          {t.cookieBanner.reject}
        </button>
        <button
          type="button"
          className="cookie-banner__btn cookie-banner__btn--accept"
          onClick={handleAccept}
        >
          {t.cookieBanner.accept}
        </button>
      </div>
    </div>
  );
}
