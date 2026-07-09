import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import GeoBg from "./GeoBg";
import ProjectPage from "./ProjectPage";
import { LanguageProvider } from "./i18n/LanguageContext";
import { LANGUAGES } from "./i18n/translations";
import { useLanguage } from "./i18n/useLanguage";
import "./App.css";

/* ─── DATI ──────────────────────────────────────────────────────────────── */
const ME = {
  name: "Xavier Paredes",
  role: "Front-End Developer",
  tagline: "Trasformo idee in interfacce che funzionano.",
  bio: `Sono uno sviluppatore front-end con una passione per il dettaglio e per il design che comunica. Lavoro con React, HTML/CSS e JavaScript per costruire siti web eleganti e performanti — con una particolare attenzione alle piccole imprese e ai brand artigianali che meritano una presenza digitale all'altezza.`,
  email: "xavierparedes296@gmail.com",
  github: "https://github.com/xavics320",
  linkedin: "https://linkedin.com/in/xavierparedes",
};

export const PROJECTS = [
  {
    id: "01",
    slug: "isabella-ricami",
    title: "Isabella Ricami",
    tags: ["React", "EmailJS", "CSS"],
    desc: "Sito vetrina con configuratore prodotto multi-step per un brand di ricami personalizzati.",
    // ── Dati pagina dedicata ──────────────────────────────────────────────
    client: "Isabella Ricami Personalizzati",
    year: "2025",
    liveUrl: "https://tuosito.com",
    brief: "Isabella aveva bisogno di un sito che raccontasse il suo brand artigianale e permettesse ai clienti di richiedere ricami personalizzati direttamente online, con la possibilità di caricare un'immagine di riferimento.",
    challenge: "Il configuratore prodotto doveva essere intuitivo anche per utenti poco digitali, con upload immagine, anteprima in tempo reale e invio via email — senza back-end.",
    solution: "Ho progettato un flusso multi-step guidato con drag & resize dell'immagine caricata, EmailJS per l'invio diretto e un flow GDPR compliant. Il tutto con un'estetica rosa cipria coerente col brand.",
    photos: [
      // Sostituisci con i percorsi reali delle tue foto
      "/photos/isabella-1.jpg",
      "/photos/isabella-2.jpg",
      "/photos/isabella-3.jpg",
    ],
  },
  {
    id: "02",
    slug: "DKE impianti",
    title: "DKE impianti",
    tags: ["HTML", "CSS", "JavaScript", "EmailJS"],
    desc: "Descrivi brevemente questo progetto — cosa hai costruito e per chi.",
    client: "Nome Cliente",
    year: "2025",
    liveUrl: "#",
    brief: "Descrivi il brief del cliente — cosa voleva, quale problema aveva da risolvere.",
    challenge: "Qual era la sfida principale — tecnica, creativa o di comunicazione?",
    solution: "Come l'hai risolta — scelte di design, tecnologie usate, approccio adottato.",
    photos: [],
  },
  {
    id: "03",
    slug: "progetto-tre",
    title: "Progetto Tre",
    tags: ["React", "API"],
    desc: "Descrivi brevemente questo progetto — cosa hai costruito e per chi.",
    client: "Nome Cliente",
    year: "2025",
    liveUrl: "#",
    brief: "Descrivi il brief del cliente.",
    challenge: "La sfida principale del progetto.",
    solution: "Come l'hai risolta.",
    photos: [],
  },
];

const SKILLS = [
  "React", "JavaScript", "HTML & CSS",
  "Responsive Design", "EmailJS", "Git & GitHub",
  "UI/UX Sensibility", "Figma",
];

/* ─── HOOK: fade-in on scroll ───────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── LOGO INTRO ────────────────────────────────────────────────────────── */
function LogoIntro({ onDone }) {
  const [phase, setPhase] = useState("center");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("move"), 1100);
    const t2 = setTimeout(() => { setPhase("done"); onDone(); }, 1900);
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
  const { lang, setLang, t } = useLanguage();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`}>
      <Link to="/" className={`navbar__logo${hidden ? " navbar__logo--hidden" : ""}`}>
        {ME.name}<span>.</span>
      </Link>
      <ul className="navbar__links">
        {[[t.nav.progetti, "#progetti"], [t.nav.processo, "#processo"], [t.nav.chiSono, "#chi-sono"], [t.nav.contatti, "#contatti"]].map(([label, href]) => (
          <li key={href}><a href={href}>{label}</a></li>
        ))}
      </ul>
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
    </nav>
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
  return (
    <article ref={ref} className="project-card fade-section">
      <span className="project-card__number">{project.id}</span>
      <div>
        <div className="project-card__tags">
          {project.tags.map(t => <span key={t} className="project-card__tag">{t}</span>)}
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{desc}</p>
        <Link to={`/progetti/${project.slug}`} className="project-card__link">
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
      <p ref={ref} className="section-label fade-section">{t.projects.sectionLabel}</p>
      <div className="projects__list">
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            desc={t.projects.items[i] ?? p.desc}
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
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        form,
        import.meta.env.VITE_EMAILJS_KEY
      )
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
        <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
      <span>© 2025 {ME.name}</span>
      <span>{t.footer.built}</span>
    </footer>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────────────────────── */
function HomePage() {
  const [introActive, setIntroActive] = useState(true);
  return (
    <>
      <GeoBg />
      <LogoIntro onDone={() => setIntroActive(false)} />
      <Navbar hidden={introActive} />
      <main style={{ position: "relative", zIndex: 1, opacity: introActive ? 0 : 1, transition: "opacity 0.5s ease" }}>
        <Hero />
        <Process />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ─── APP con ROUTER ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/progetti/:slug" element={<ProjectPage projects={PROJECTS} />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
