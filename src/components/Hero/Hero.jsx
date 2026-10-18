import { useLanguage } from "../../i18n/useLanguage";
import "./Hero.css";

export default function Hero() {
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
