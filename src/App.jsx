import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CodeBg from "./CodeBg";
import ProjectPage from "./ProjectPage";
import { LanguageProvider } from "./i18n/LanguageContext";
import { LANGUAGES } from "./i18n/translations";
import { localizePath } from "./i18n/paths";
import { useLanguage } from "./i18n/useLanguage";
import { setDocumentMeta } from "./useDocumentMeta";
import { getHomeMeta } from "./seo";
import CookieConsentBanner from "./CookieConsentBanner";
import Pricing from "./components/Pricing/Pricing";
import Faq from "./components/Faq/Faq";
import { useFadeIn } from "./hooks/useFadeIn";
import "./App.css";

/* ─── DATI ──────────────────────────────────────────────────────────────── */
const ME = {
  name: "Xavier Paredes",
  role: "Front-End Developer",
  tagline: "Trasformo idee in interfacce che funzionano.",
  bio: `Sono uno sviluppatore front-end con una passione per il dettaglio e per il design. Lavoro con React, HTML/CSS e JavaScript per costruire siti web eleganti e performanti — con una particolare attenzione alle piccole imprese e ai brand artigianali che meritano una presenza digitale all'altezza.`,
  email: "info@xavierparedes-dev.it",
  github: "https://github.com/xavics320",
};

// Dati strutturali dei progetti. I testi (descrizione, brief, sfida,
// soluzione, categoria) sono tradotti in i18n/translations.js →
// projects.items[slug].
export const PROJECTS = [
  {
    id: "01",
    slug: "dke-impianti",
    title: "DKE Impianti",
    tags: ["HTML", "CSS", "React","Vite", "EmailJS"],
    client: "DKE Impianti",
    year: "2026",
    liveUrl: "https://dke-impianti.vercel.app",
    photos: [
      "/photos2/1.webp",
      "/photos2/2.webp",
      "/photos2/3.webp",
      "/photos2/4.webp",
      "/photos2/5.webp",
    ],
  },
  {
    id: "02",
    slug: "osteria-del-grano",
    title: "Osteria del Grano",
    tags: ["React", "HTML", "CSS", "API"],
    client: "Osteria del Grano",
    year: "2025",
    liveUrl: "https://ristorante1-delta.vercel.app",
    photos: [
      "/photos3/1.webp",
      "/photos3/2.webp",
      "/photos3/3.webp",
      "/photos3/4.webp",
      "/photos3/5.webp",
      "/photos3/6.webp",
    ],
  },
];

const SKILLS = [
  "React", "JavaScript", "HTML & CSS",
  "Responsive Design", "EmailJS", "Git & GitHub",
  "UI/UX Sensibility", "Figma",
];

/* ─── LOGO INTRO ────────────────────────────────────────────────────────── */
// Mostrata solo alla prima visita. Lo script inline in index.html legge la
// stessa chiave e aggiunge .intro-seen a <html> prima del primo paint, così
// chi torna non vede nemmeno un frame dell'overlay.
const INTRO_KEY = "intro-seen";

function LogoIntro({ onDone }) {
  const [phase, setPhase] = useState("center");
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(INTRO_KEY) === "1";
      localStorage.setItem(INTRO_KEY, "1");
    } catch { /* storage bloccato: mostra l'intro */ }
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase("move"), 600);
    const t2 = setTimeout(() => { setPhase("done"); onDone(); }, 1150);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (phase === "done") return null;
  const moved = phase === "move";
  return (
    <div className={`logo-intro-overlay${moved ? " moved" : ""}`}>
      <span className={`logo-intro-text${moved ? " moved" : ""}`}>
        {ME.name}<span>.</span>
      </span>
    </div>
  );
}

/* ─── NAVBAR ────────────────────────────────────────────────────────────── */
function Navbar({ hidden }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, localize, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blocca scroll body quando menu aperto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const links = [
    [t.nav.prezzi, "#prezzi"],
    [t.nav.progetti, "#progetti"],
    [t.nav.processo, "#processo"],
    [t.nav.chiSono, "#chi-sono"],
    [t.nav.contatti, "#contatti"],
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`}>
        <Link to={localize("/")} className={`navbar__logo${hidden ? " navbar__logo--hidden" : ""}`}>
          {ME.name}<span>.</span>
        </Link>

        {/* Link desktop */}
        <ul className="navbar__links">
          {links.map(([label, href]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>

        {/* Lingua + hamburger affiancati */}
        <div className="navbar__right">
          <ul className="navbar__lang">
            {LANGUAGES.map(code => (
              <li key={code}>
                <button
                  type="button"
                  className={`navbar__lang-btn${code === lang ? " active" : ""}`}
                  onClick={() => setLang(code)}
                >
                  {code.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger — solo mobile */}
          <button
            className={`navbar__hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Overlay menu mobile */}
      <div className={`navbar__mobile-menu${menuOpen ? " open" : ""}`}>
        {/* Lingue anche nel menu mobile */}
        <ul className="navbar__mobile-lang">
          {LANGUAGES.map(code => (
            <li key={code}>
              <button
                type="button"
                className={`navbar__lang-btn${code === lang ? " active" : ""}`}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
        <ul className="navbar__mobile-links">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={handleLinkClick}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────────── */
function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero">
      <p className="hero__label">{t.hero.label}</p>
      <h1 className="hero__title">{t.hero.tagline}</h1>
      <p className="hero__sub">{t.hero.sub}</p>
      <div className="hero__cta">
        <a href="#progetti" className="btn btn--primary">{t.hero.ctaProjects}</a>
        <a href="#contatti" className="btn btn--ghost">{t.hero.ctaContact}</a>
      </div>
    </section>
  );
}

/* ─── PROJECT CARD ──────────────────────────────────────────────────────── */
function ProjectCard({ project, desc, openLabel }) {
  const ref = useFadeIn();
  const { localize } = useLanguage();
  return (
    <article ref={ref} className="project-card fade-section">
      <span className="project-card__number">{project.id}</span>
      <div>
        <div className="project-card__tags">
          {project.tags.map(t => <span key={t} className="project-card__tag">{t}</span>)}
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{desc}</p>
        <Link to={localize(`/progetti/${project.slug}`)} className="project-card__link">
          {openLabel}
        </Link>
      </div>
    </article>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────────────────────── */
function Projects() {
  const ref = useFadeIn();
  const { t } = useLanguage();
  return (
    <section id="progetti" className="projects">
      {/* h2 e non p: le card hanno h3, senza un h2 sopra la gerarchia salta un livello */}
      <h2 ref={ref} className="section-label fade-section">{t.projects.sectionLabel}</h2>
      <div className="projects__list">
        {PROJECTS.map(p => (
          <ProjectCard
            key={p.id}
            project={p}
            desc={t.projects.items[p.slug].desc}
            openLabel={t.projects.openProject}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── PROCESS ───────────────────────────────────────────────────────────── */
function ProcessStep({ step, index, total }) {
  const ref = useFadeIn();
  const isLast = index === total - 1;
  const number = String(index + 1).padStart(2, "0");
  return (
    <div ref={ref} className="process-step fade-section">
      <div className="process-step__left">
        <div className="process-step__dot" />
        {!isLast && <div className="process-step__line" />}
      </div>
      <div className="process-step__content">
        <span className="process-step__number">{number}</span>
        <h3 className="process-step__title">{step.title}</h3>
        <p className="process-step__desc">{step.desc}</p>
      </div>
    </div>
  );
}

function Process() {
  const ref = useFadeIn();
  const { t } = useLanguage();
  const steps = t.process.steps;
  return (
    <section id="processo" className="process">
      <div ref={ref} className="process__header fade-section">
        <p className="section-label">{t.process.sectionLabel}</p>
        <h2 className="process__title">{t.process.title[0]}<br />{t.process.title[1]}</h2>
        <p className="process__sub">{t.process.sub}</p>
      </div>
      <div className="process__steps">
        {steps.map((s, i) => <ProcessStep key={i} step={s} index={i} total={steps.length} />)}
      </div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────────── */
function About() {
  const ref = useFadeIn();
  const { t } = useLanguage();
  return (
    <section id="chi-sono" ref={ref} className="about fade-section">
      <div>
        <p className="section-label">{t.about.sectionLabel}</p>
        <h2 className="about__title">{t.about.title[0]}<br />{t.about.title[1]}</h2>
        <p className="about__bio">{t.about.bio}</p>
        <a href={ME.github} target="_blank" rel="noopener noreferrer" className="about__github-link">{t.about.githubLink}</a>
      </div>
      <div>
        <p className="skills-label">{t.about.skillsLabel}</p>
        <ul className="skills-list">
          {SKILLS.map(s => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────────────────── */
function Contact() {
  const ref = useFadeIn();
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // EmailJS caricato solo all'invio: non serve nel bundle iniziale
    import("@emailjs/browser")
      .then(({ default: emailjs }) => emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        form,
        import.meta.env.VITE_EMAILJS_KEY
      ))
      .then(() => setSent(true))
      .catch(() => alert(t.contact.error));
  };
  return (
    <section id="contatti" ref={ref} className="contact fade-section">
      <p className="section-label">{t.contact.sectionLabel}</p>
      <h2 className="contact__title">{t.contact.title[0]}<br />{t.contact.title[1]}</h2>
      <p className="contact__sub">{t.contact.sub}</p>
      {sent ? (
        <p className="contact__success">{t.contact.success}</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact__form">
          <input className="contact__input" name="nome" type="text" placeholder={t.contact.namePlaceholder} required value={form.nome} onChange={handleChange} />
          <input className="contact__input" name="email" type="email" placeholder={t.contact.emailPlaceholder} required value={form.email} onChange={handleChange} />
          <textarea className="contact__textarea" name="messaggio" placeholder={t.contact.messagePlaceholder} required rows={5} value={form.messaggio} onChange={handleChange} />
          <button type="submit" className="btn btn--primary">{t.contact.submit}</button>
        </form>
      )}
      <div className="contact__links">
        <a href={`mailto:${ME.email}`}>{ME.email}</a>
        <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────── */
function Footer() {
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

        {/* Instagram */}
        <a
          href="https://www.instagram.com/webdev_xp/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Profilo Instagram di Xavier Paredes"
          className="footer__social-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/xavy.p"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Profilo Facebook di Xavier Paredes"
          className="footer__social-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

      </div>

      {/* Policy links */}
      <div className="footer__links">
        <a
          href="https://www.iubenda.com/privacy-policy/81915781"
          className="policy footer__policy"
          target="_blank"
          rel="noopener noreferrer"
          title="Privacy Policy"
        >
          Privacy Policy
        </a>
        <a
          href="https://www.iubenda.com/privacy-policy/81915781/cookie-policy"
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

/* ─── HOME PAGE ─────────────────────────────────────────────────────────── */
function HomePage() {
  const [introActive, setIntroActive] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    setDocumentMeta(getHomeMeta(lang));
  }, [lang]);

  return (
    <>
      <CodeBg />
      <LogoIntro onDone={() => setIntroActive(false)} />
      <Navbar hidden={introActive} />
      <main className={`home-main${introActive ? " home-main--intro" : ""}`}>
        <Hero />
        <Pricing />
        <Process />
        <Projects />
        <About />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

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
