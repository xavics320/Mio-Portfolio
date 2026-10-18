import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { useFadeIn } from "../../hooks/useFadeIn";
import { ME } from "../../data/profile";
import "./Contact.css";

export default function Contact() {
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
