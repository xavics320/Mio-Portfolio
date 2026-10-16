import { useLanguage } from "../../i18n/useLanguage";
import { useFadeIn } from "../../hooks/useFadeIn";
import "./Faq.css";

/*
  Domande frequenti. <details>/<summary> nativi: accessibili da tastiera e
  screen reader senza JS, e le risposte restano nell'HTML prerenderizzato
  (Google le legge anche da chiuse). Gli stessi testi finiscono nello
  schema FAQPage generato in seo.js.
*/
export default function Faq() {
  const ref = useFadeIn();
  const { t } = useLanguage();
  const { faq } = t;

  return (
    <section id="faq" ref={ref} className="faq fade-section" aria-labelledby="faq-title">
      <p className="section-label">{faq.sectionLabel}</p>
      <h2 id="faq-title" className="faq__title">{faq.title[0]}<br />{faq.title[1]}</h2>

      <div className="faq__list">
        {faq.items.map(({ q, a }) => (
          <details key={q} className="faq__item">
            <summary className="faq__question">
              <h3 className="faq__question-text">{q}</h3>
            </summary>
            <p className="faq__answer">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
