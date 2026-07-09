import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "./i18n/useLanguage";
import "./ProjectPage.css";

export default function ProjectPage({ projects }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const pp = t.projectPage;

  const index = projects.findIndex(p => p.slug === slug);
  const project = projects[index];
  const prev = projects[index - 1] || null;
  const next = projects[index + 1] || null;

  // Galleria foto
  const [activePhoto, setActivePhoto] = useState(0);

  // Scroll in cima ad ogni cambio progetto
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // 404 se slug non esiste
  if (!project) {
    return (
      <div className="pp-notfound">
        <p>{pp.notFound}</p>
        <Link to="/" className="btn btn--primary">{pp.backHome}</Link>
      </div>
    );
  }

  const hasPhotos = project.photos && project.photos.length > 0;

  return (
    <div className="pp-page">

      {/* ── NAVBAR minimale ─────────────────────────────────────────────── */}
      <nav className="pp-nav">
        <Link to="/" className="pp-nav__logo">{project.title.split(" ")[0]}.</Link>
        <Link to="/" className="pp-nav__back">{pp.allProjects}</Link>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <header className="pp-hero">
        <div className="pp-hero__meta">
          <div className="pp-hero__tags">
            {project.tags.map(t => (
              <span key={t} className="pp-tag">{t}</span>
            ))}
          </div>
          <span className="pp-hero__year">{project.year}</span>
        </div>
        <h1 className="pp-hero__title">{project.title}</h1>
        <p className="pp-hero__client">{pp.client} {project.client}</p>
        {project.liveUrl && project.liveUrl !== "#" && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary pp-hero__cta">
            {pp.visitSite}
          </a>
        )}
      </header>

      {/* ── FOTO PRINCIPALE + GALLERIA ──────────────────────────────────── */}
      {hasPhotos && (
        <section className="pp-gallery">
          {/* foto grande attiva */}
          <div className="pp-gallery__main">
            <img
              src={project.photos[activePhoto]}
              alt={`${project.title} screenshot ${activePhoto + 1}`}
              className="pp-gallery__img"
            />
          </div>
          {/* thumbnails */}
          {project.photos.length > 1 && (
            <div className="pp-gallery__thumbs">
              {project.photos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`pp-gallery__thumb${i === activePhoto ? " active" : ""}`}
                >
                  <img src={src} alt={`thumb ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── CONTENUTO ───────────────────────────────────────────────────── */}
      <section className="pp-content">

        {/* Brief */}
        <div className="pp-block">
          <span className="pp-block__label">{pp.brief}</span>
          <p className="pp-block__text">{project.brief}</p>
        </div>

        {/* Challenge */}
        <div className="pp-block">
          <span className="pp-block__label">{pp.challenge}</span>
          <p className="pp-block__text">{project.challenge}</p>
        </div>

        {/* Solution */}
        <div className="pp-block">
          <span className="pp-block__label">{pp.solution}</span>
          <p className="pp-block__text">{project.solution}</p>
        </div>

        {/* Tecnologie */}
        <div className="pp-block">
          <span className="pp-block__label">{pp.technologies}</span>
          <div className="pp-tech">
            {project.tags.map(t => (
              <span key={t} className="pp-tag">{t}</span>
            ))}
          </div>
        </div>

      </section>

      {/* ── NAVIGAZIONE PREV / NEXT ──────────────────────────────────────── */}
      <nav className="pp-prevnext">
        {prev ? (
          <Link to={`/progetti/${prev.slug}`} className="pp-prevnext__item pp-prevnext__item--prev">
            <span className="pp-prevnext__dir">{pp.previous}</span>
            <span className="pp-prevnext__name">{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/progetti/${next.slug}`} className="pp-prevnext__item pp-prevnext__item--next">
            <span className="pp-prevnext__dir">{pp.next}</span>
            <span className="pp-prevnext__name">{next.title}</span>
          </Link>
        ) : <div />}
      </nav>

    </div>
  );
}
