import { useLanguage } from "../../i18n/useLanguage";
import { useFadeIn } from "../../hooks/useFadeIn";
import { ME, SKILLS } from "../../data/profile";
import "./About.css";

export default function About() {
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
