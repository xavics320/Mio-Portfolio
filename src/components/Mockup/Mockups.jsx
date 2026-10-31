import { useRef, useEffect } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import "./Mockups.css";

/* ─── DATI CATEGORIE ────────────────────────────────────────────────────────
   Ogni categoria ha:
   - key: identificatore univoco
   - icon: SVG inline (nessuna dipendenza esterna)
   - accentColor: colore dominante della card (usato per i "blocchi" decorativi)
   - blocks: array di stringhe che simulano righe di contenuto nel mockup
─────────────────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    key: "artigiani",
    accentColor: "#C8FF00",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    blocks: ["hero", "about", "gallery", "contact"],
  },
  {
    key: "ristoranti",
    accentColor: "#FF6B35",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
    blocks: ["hero", "menu", "reservations", "contact"],
  },
  {
    key: "negozi",
    accentColor: "#A78BFA",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    blocks: ["hero", "products", "cart", "checkout"],
  },
  {
    key: "studi",
    accentColor: "#38BDF8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    blocks: ["hero", "services", "team", "booking"],
  },
  {
    key: "bnb",
    accentColor: "#FB923C",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    blocks: ["hero", "rooms", "availability", "contact"],
  },
  {
    key: "aziende",
    accentColor: "#34D399",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    blocks: ["hero", "services", "about", "contact"],
  },
];

/* ─── MOCKUP CARD ─────────────────────────────────────────────────────────── */
function MockupCard({ category, label, desc }) {
  const ref = useRef(null);

  /* Fade-in on scroll (stesso pattern del resto del sito) */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article ref={ref} className="mockup-card fade-section" style={{ "--accent": category.accentColor }}>

      {/* ── BROWSER CHROME DECORATIVO ─────────────────────────────────────
          Simula la barra URL di un browser per dare contesto visivo.
          È puro CSS/HTML — nessuna funzionalità reale.
      ──────────────────────────────────────────────────────────────────── */}
      <div className="mockup-card__browser">
        <div className="mockup-card__browser-bar">
          <span className="mockup-card__dot" />
          <span className="mockup-card__dot" />
          <span className="mockup-card__dot" />
          <span className="mockup-card__url">www.tuosito.it</span>
        </div>

        {/* ── SCHERMO MOCKUP ──────────────────────────────────────────────
            Ogni "blocco" rappresenta una sezione del sito.
            L'accent color cambia per categoria — l'hero è sempre accent,
            le altre sezioni sono grigie per simulare contenuto neutro.
        ──────────────────────────────────────────────────────────────────── */}
        <div className="mockup-card__screen">

          {/* Blocco Hero — usa accent color */}
          <div className="mockup-card__block mockup-card__block--hero">
            <div className="mockup-card__icon">{category.icon}</div>
            <div className="mockup-card__lines">
              <div className="mockup-card__line mockup-card__line--title" />
              <div className="mockup-card__line mockup-card__line--sub" />
            </div>
          </div>

          {/* Blocchi secondari — simulano le altre sezioni */}
          <div className="mockup-card__sections">
            {category.blocks.slice(1).map((block, i) => (
              <div key={block} className="mockup-card__section">
                <div className="mockup-card__section-line" style={{ width: `${60 + i * 10}%` }} />
                <div className="mockup-card__section-line" style={{ width: `${40 + i * 8}%` }} />
                <div className="mockup-card__section-line" style={{ width: "30%" }} />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── INFO CARD ─────────────────────────────────────────────────────── */}
      <div className="mockup-card__info">
        <span className="mockup-card__label">{label}</span>
        <p className="mockup-card__desc">{desc}</p>
      </div>

    </article>
  );
}

/* ─── SEZIONE MOCKUPS ─────────────────────────────────────────────────────── */
export default function Mockups() {
  const { t } = useLanguage();
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const categories = t.mockups.categories;

  return (
    <section id="esempi" className="mockups">
      <div ref={headerRef} className="mockups__header fade-section">
        <p className="section-label">{t.mockups.sectionLabel}</p>
        <h2 className="mockups__title">
          {t.mockups.title[0]}<br />{t.mockups.title[1]}
        </h2>
        <p className="mockups__sub">{t.mockups.sub}</p>
      </div>

      <div className="mockups__grid">
        {CATEGORIES.map((cat) => {
          const catData = categories[cat.key];
          return (
            <MockupCard
              key={cat.key}
              category={cat}
              label={catData.label}
              desc={catData.desc}
            />
          );
        })}
      </div>

      <div className="mockups__cta">
        <p className="mockups__cta-text">{t.mockups.ctaText}</p>
        <a href="#contatti" className="btn btn--primary">{t.mockups.ctaButton}</a>
      </div>
    </section>
  );
}