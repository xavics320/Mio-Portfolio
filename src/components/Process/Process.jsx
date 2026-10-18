import { useLanguage } from "../../i18n/useLanguage";
import { useFadeIn } from "../../hooks/useFadeIn";
import "./Process.css";

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

export default function Process() {
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
