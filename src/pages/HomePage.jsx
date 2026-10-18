import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { setDocumentMeta } from "../lib/useDocumentMeta";
import { getHomeMeta } from "../lib/seo";
import CodeBg from "../components/CodeBg/CodeBg";
import LogoIntro from "../components/LogoIntro/LogoIntro";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Pricing from "../components/Pricing/Pricing";
import Process from "../components/Process/Process";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Faq from "../components/Faq/Faq";
import Footer from "../components/Footer/Footer";

export default function HomePage() {
  const [introActive, setIntroActive] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    setDocumentMeta(getHomeMeta(lang));
  }, [lang]);

  return (
    <>
      <CodeBg />
      <LogoIntro onDone={() => setIntroActive(false)} />
      <Navbar hidden={introActive} />
      <main className={`home-main${introActive ? " home-main--intro" : ""}`}>
        {/* Se cambi l'ordine, aggiorna anche i link in Navbar */}
        <Hero />
        <Pricing />
        <Process />
        <Projects />
        <About />
        <Contact />
        <Faq />
        <Footer />
      </main>
    </>
  );
}
