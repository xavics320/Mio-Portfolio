import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LANGUAGES } from "../../i18n/translations";
import { useLanguage } from "../../i18n/useLanguage";
import { ME } from "../../data/profile";
import "./Navbar.css";

export default function Navbar({ hidden }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, localize, t } = useLanguage();
  const { pathname } = useLocation();

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

  // Sulla home il Link punta allo stesso URL e il router non fa nulla:
  // torniamo in cima a mano. Da un'altra pagina saltiamo in cima subito,
  // altrimenti la home si aprirebbe alla posizione di scroll precedente.
  const handleLogoClick = () => {
    setMenuOpen(false);
    const strip = p => p.replace(/\/+$/, "");
    const onHome = strip(pathname) === strip(localize("/"));
    window.scrollTo({ top: 0, behavior: onHome ? "smooth" : "auto" });
  };

  // Stesso ordine delle sezioni in HomePage
  const links = [
    [t.nav.prezzi, "#prezzi"],
    [t.nav.processo, "#processo"],
    [t.nav.progetti, "#progetti"],
    [t.nav.chiSono, "#chi-sono"],
    [t.nav.contatti, "#contatti"],
    [t.nav.faq, "#faq"],
  ];

  const langButtons = LANGUAGES.map(code => (
    <li key={code}>
      <button
        type="button"
        className={`navbar__lang-btn${code === lang ? " active" : ""}`}
        onClick={() => setLang(code)}
      >
        {code.toUpperCase()}
      </button>
    </li>
  ));

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`}>
        <Link to={localize("/")} onClick={handleLogoClick} className={`navbar__logo${hidden ? " navbar__logo--hidden" : ""}`}>
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
          <ul className="navbar__lang">{langButtons}</ul>

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
        <ul className="navbar__mobile-lang">{langButtons}</ul>
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
