import { PLANS } from "../../data/plans";
import { useLanguage } from "../../i18n/useLanguage";
import { useFadeIn } from "../../hooks/useFadeIn";
import "./Pricing.css";

// Mappa lingua del sito → locale per Intl (formato numeri e valuta)
const LOCALES = { it: "it-IT", en: "en-GB", es: "es-ES" };

function formatPrice(value, lang) {
  return new Intl.NumberFormat(LOCALES[lang] ?? "it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function PlanCard({ plan, copy, lang, badge, quoteLabel }) {
  const ref = useFadeIn();
  const titleId = `plan-${plan.id}-title`;
  const isQuote = plan.price === null;

  return (
    <article
      ref={ref}
      className={`plan-card fade-section${plan.featured ? " plan-card--featured" : ""}`}
      aria-labelledby={titleId}
    >
      {plan.featured && <p className="plan-card__badge">{badge}</p>}

      <h3 id={titleId} className="plan-card__name">{copy.name}</h3>
      <p className="plan-card__desc">{copy.desc}</p>

      <p className={`plan-card__price${isQuote ? " plan-card__price--quote" : ""}`}>
        {isQuote ? quoteLabel : formatPrice(plan.price, lang)}
      </p>

      <ul className="plan-card__features">
        {copy.features.map(feature => (
          <li key={feature} className="plan-card__feature">{feature}</li>
        ))}
      </ul>

      {/* Riuso i bottoni globali: primario solo sul piano consigliato */}
      <a
        href="#contatti"
        className={`btn ${plan.featured ? "btn--primary" : "btn--ghost"} plan-card__cta`}
      >
        {copy.cta}
      </a>
    </article>
  );
}

export default function Pricing() {
  const headerRef = useFadeIn();
  const { lang, t } = useLanguage();
  const { pricing } = t;

  return (
    <section id="prezzi" className="pricing" aria-labelledby="pricing-title">
      <div ref={headerRef} className="pricing__header fade-section">
        <p className="section-label">{pricing.sectionLabel}</p>
        <h2 id="pricing-title" className="pricing__title">
          {pricing.title[0]}<br />{pricing.title[1]}
        </h2>
        <p className="pricing__sub">{pricing.sub}</p>
      </div>

      <div className="pricing__grid">
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            copy={pricing.plans[plan.id]}
            lang={lang}
            badge={pricing.featuredBadge}
            quoteLabel={pricing.quoteLabel}
          />
        ))}
      </div>

      <p className="pricing__note">{pricing.note}</p>
    </section>
  );
}
