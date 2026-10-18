import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { useFadeIn } from "../../hooks/useFadeIn";
import { PROJECTS } from "../../data/projects";
import "./Projects.css";

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

export default function Projects() {
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
