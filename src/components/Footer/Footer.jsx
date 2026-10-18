import { useLanguage } from "../../i18n/useLanguage";
import { ME } from "../../data/profile";
import "./Footer.css";

const PRIVACY_URL = "https://www.iubenda.com/privacy-policy/81915781";
const COOKIE_URL = "https://www.iubenda.com/privacy-policy/81915781/cookie-policy";

// Attributi comuni delle icone SVG (stroke="currentColor": prendono il
// colore del link, quindi cambiano da sole all'hover)
const ICON_PROPS = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <span>{t.footer.built}</span>
      <span>© 2026 {ME.name}</span>

      {/* ── SOCIAL ICONS ─────────────────────────────────────────────────
        Icone SVG inline — nessuna libreria esterna.

        rel="noopener noreferrer":
        - noopener: impedisce alla pagina aperta di accedere
          all'oggetto window del tuo sito (sicurezza)
        - noreferrer: non passa il tuo URL come referrer
          alla pagina di destinazione (privacy)
        Sempre obbligatori su link esterni con target="_blank".

        aria-label: dice agli screen reader cosa fa il link.
        Un link con solo un'icona SVG senza testo non è accessibile
        senza aria-label — Google lo conta nell'Accessibility score.
      ───────────────────────────────────────────────────────────────── */}
      <div className="footer__social">
        <a
          href={ME.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Profilo Instagram di Xavier Paredes"
          className="footer__social-link"
        >
          <svg {...ICON_PROPS}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </a>

        <a
          href={ME.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Profilo Facebook di Xavier Paredes"
          className="footer__social-link"
        >
          <svg {...ICON_PROPS}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      </div>

      {/* Policy links */}
      <div className="footer__links">
        <a
          href={PRIVACY_URL}
          className="policy footer__policy"
          target="_blank"
          rel="noopener noreferrer"
          title="Privacy Policy"
        >
          Privacy Policy
        </a>
        <a
          href={COOKIE_URL}
          className="cookie footer__policy"
          target="_blank"
          rel="noopener noreferrer"
          title="Cookie Policy"
        >
          Cookie Policy
        </a>
      </div>
    </footer>
  );
}
