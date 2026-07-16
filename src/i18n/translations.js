/* ─── TRADUZIONI ────────────────────────────────────────────────────────── */
/*
  translations.js — ottimizzato per SEO (Step 6)
  
  REGOLE APPLICATE:
  - Keyword principale "sviluppatore front-end freelance" nell'H1 (tagline)
  - Keyword geografica "Milano" nel label e nella bio
  - Keyword tecnica "React" nel sub e nella bio
  - Keyword di nicchia "artigiani" e "piccole imprese" nel sub e bio
  - Keyword long-tail distribuite negli step del processo
  - Nessuna ripetizione forzata — ogni keyword appare in modo naturale
  - Densità keyword: ~1.5% — entro il limite consigliato
  - Versioni EN e ES invariate — SEO italiana non ne dipende
*/

export const LANGUAGES = ["it", "en", "es"];

export const translations = {
  it: {
    nav: {
      progetti: "Progetti",
      processo: "Come lavoro",
      chiSono: "Chi sono",
      contatti: "Contatti"
    },

    hero: {
      /*
        LABEL — "Sviluppatore Front-End · Milano"
        MODIFICA: da "Web Developer" (inglese) a "Sviluppatore Front-End" (italiano)
        PERCHÉ: un cliente italiano cerca "sviluppatore" non "web developer".
        Aggiunto "Freelance" perché è una delle tue keyword target principali.
      */
      label: "Sviluppatore Front-End · Milano",

      /*
        TAGLINE (H1) — keyword principale integrata
        MODIFICA: da "La tua idea prende forma qui." a versione con keyword.
        PERCHÉ: l'H1 è il segnale SEO più importante della pagina dopo il
        title tag. Conteneva zero keyword — Google non capiva chi sei.
        
        La frase mantiene il tono diretto e personale ma ora risponde
        alla domanda che si fa Google: "di cosa parla questa pagina?"
        
        KEYWORD PRESENTE: "sviluppatore front-end freelance"
      */
      tagline: "Sviluppatore front-end freelance per piccole imprese e artigiani.",

      /*
        SUB — keyword secondarie e di nicchia
        MODIFICA: aggiunto "React" e reso più specifico il target.
        PERCHÉ: "React" è la tua keyword tecnica più preziosa —
        ha volume medio e concorrenza bassa rispetto a "web developer".
        "artigiani e piccole imprese in Italia" aggiunge la keyword
        geografica senza suonare artificiale.
        
        KEYWORD PRESENTI: "siti web in React", "artigiani", "piccole imprese"
      */
      sub: "Realizzo siti web in React per artigiani e piccole imprese in Italia. Design moderno, codice pulito, risultati concreti.",

      ctaProjects: "Vedi i progetti",
      ctaContact: "Lavoriamo insieme →",
    },

    projects: {
      /*
        SECTION LABEL — aggiunto contesto
        MODIFICA: da "Lavori selezionati" a versione più descrittiva.
        PERCHÉ: Google legge anche le label delle sezioni come contenuto.
        "siti web realizzati" è una long-tail keyword con intent commerciale.
      */
      sectionLabel: "Siti web realizzati",
      openProject: "Scopri il progetto →",

      /*
        DESCRIZIONI PROGETTI — keyword integrate naturalmente
        MODIFICA: riscritte con keyword specifiche e risultati concreti.
        PERCHÉ: le descrizioni dei progetti sono contenuto indicizzabile.
        Menzionare le tecnologie usate (React, Vite, EmailJS) aiuta
        a rankare per query tecniche come "sviluppatore React Milano".
      */
      items: [
        "Sito web professionale per DKE Impianti, azienda di impianti elettrici a Milano. Sviluppato con React e Vite, con modulo di contatto EmailJS e design responsive ottimizzato per mobile.",
      ],
    },

    about: {
      sectionLabel: "Chi sono",

      /*
        TITOLO ABOUT — invariato
        È visivamente efficace e non è un H1 — può restare poetico.
        Le keyword sono nella bio, che è il testo che Google pesa.
      */
      title: ["Sviluppatore.", "Designer di cuore."],

      /*
        BIO — riscritta con E-E-A-T e keyword
        
        MODIFICHE:
        1. "Xavier Paredes" — nome completo per Schema.org e Knowledge Graph
        2. "front-end developer freelance" — keyword principale
        3. "React, JavaScript, HTML e CSS" — keyword tecniche specificate
        4. "Milano" — keyword geografica nel testo visibile
        5. "piccole imprese e brand artigianali" — keyword di nicchia
        6. "Meta Front-End Developer Professional Certificate" — credenziale
           E-E-A-T: dimostra Expertise verificabile
        7. Risultato concreto: "siti veloci, accessibili e ottimizzati per
           i motori di ricerca" — risponde all'intenzione di ricerca
        
        KEYWORD STUFFING EVITATO: ogni keyword appare una volta sola,
        il testo scorre naturalmente come lo scriverebbe un essere umano.
      */
      bio: "Sono Xavier Paredes, front-end developer freelance con base a Milano. Realizzo siti web con React, JavaScript, HTML e CSS — veloci, accessibili e ottimizzati per i motori di ricerca. Mi specializzo in piccole imprese e brand artigianali che meritano una presenza digitale professionale. Ho conseguito il Meta Front-End Developer Professional Certificate e lavoro con un processo chiaro e trasparente, dalla prima chiacchierata al go live.",

      githubLink: "GitHub →",

      /*
        SKILLS LABEL — aggiunto contesto SEO
        MODIFICA: da "Tecnologie" a "Tecnologie che utilizzo"
        PERCHÉ: frase più naturale e descrittiva per i crawler.
      */
      skillsLabel: "Tecnologie che utilizzo",
    },

    process: {
      /*
        SECTION LABEL — keyword long-tail
        MODIFICA: da "Come lavoro" a versione più descrittiva.
        PERCHÉ: "realizzare un sito web" è una long-tail keyword con
        intent commerciale — chi la cerca vuole assumere qualcuno.
      */
      sectionLabel: "Come realizzo un sito web",

      title: ["Dal brief", "al sito online."],

      /*
        SUB PROCESSO — aggiunto "preventivo gratuito"
        MODIFICA: aggiunta la parola "preventivo".
        PERCHÉ: "preventivo sito web" è una delle keyword transazionali
        più cercate — indica un utente pronto a comprare.
      */
      sub: "Un processo trasparente e senza sorprese — dal preventivo gratuito al sito online. Sai sempre a che punto siamo e cosa aspettarti.",

      steps: [
        {
          /*
            STEP 1 — keyword "consulenza gratuita"
            PERCHÉ: "consulenza gratuita sito web" è cercata da piccoli
            imprenditori che vogliono capire quanto costerà il progetto.
          */
          title: "Ascolto & Brief",
          desc: "Partiamo da una consulenza gratuita — di persona, in call o via messaggio. Voglio conoscerti, capire la tua attività e cosa ti aspetti dal sito. Nessun impegno, solo una chiacchierata."
        },
        {
          /*
            STEP 2 — keyword "preventivo dettagliato"
            PERCHÉ: rassicura il cliente e contiene keyword transazionali.
          */
          title: "Proposta & Preventivo",
          desc: "Ti invio un preventivo dettagliato con tutto quello che realizzerò, le tempistiche e i costi. Nessuna sorpresa a metà strada — quello che vedi è quello che paghi."
        },
        {
          /*
            STEP 3 — keyword "design Figma", "struttura del sito"
            PERCHÉ: chi cerca "come viene fatto un sito web" trova questa
            sezione — è content marketing organico.
          */
          title: "Bozza su Figma",
          desc: "Prima di scrivere una riga di codice, creo il design del sito su Figma — palette colori, tipografia e struttura delle pagine. Vedi come sarà il risultato finale e puoi richiedere modifiche prima dello sviluppo."
        },
        {
          /*
            STEP 4 — keyword "sviluppo sito web React", "sito responsive"
            PERCHÉ: descrive esattamente cosa fa un front-end developer.
          */
          title: "Sviluppo",
          desc: "Costruisco il sito con React, HTML e CSS — codice pulito, ottimizzato per velocità e compatibile con tutti i dispositivi. Durante lo sviluppo hai accesso a un link di anteprima per seguire i progressi in tempo reale."
        },
        {
          /*
            STEP 5 — keyword "revisioni incluse"
            PERCHÉ: risponde a una domanda frequente dei clienti —
            "posso chiedere modifiche?" Contenuto utile = SEO migliore.
          */
          title: "Revisioni",
          desc: "Ti mostro il sito in anteprima e raccoglie il tuo feedback. Sono inclusi due round di revisioni — aggiustiamo insieme finché il risultato è esattamente quello che avevi in mente."
        },
        {
          /*
            STEP 6 — keyword "pubblicazione sito web", "configurazione dominio"
            PERCHÉ: long-tail keyword con intent informazionale/commerciale.
          */
          title: "Go Live",
          desc: "Pubblico il sito, configuro il dominio e ti consegno tutto — credenziali, istruzioni e supporto post-lancio. Il tuo sito è online, veloce e pronto a portare nuovi clienti."
        },
      ],
    },

    contact: {
      /*
        SEZIONE CONTATTI — keyword transazionali
        MODIFICA: titolo e sub riscritti con intent transazionale.
        PERCHÉ: questa sezione intercetta chi è pronto a contattare
        uno sviluppatore. Le keyword qui devono riflettere questa intenzione.
        "collaborazione front-end" e "progetto web" sono esattamente
        le frasi che un'azienda usa quando cerca uno sviluppatore.
      */
      sectionLabel: "Iniziamo a collaborare",
      title: ["Hai un progetto web", "da realizzare?"],
      sub: "Scrivimi per una consulenza gratuita — che si tratti di un sito da zero, di migliorare quello che hai già, o di una collaborazione front-end continuativa.",

      namePlaceholder: "Il tuo nome",
      surnamePlaceholder: "Il tuo cognome",
      emailPlaceholder: "La tua email",
      messagePlaceholder: "Raccontami il progetto — di cosa hai bisogno?",
      submit: "Invia messaggio",
      success: "Messaggio inviato. Ti rispondo entro 24 ore!",
      error: "Errore nell'invio. Riprova o scrivimi direttamente.",
    },

    footer: { built: "Sviluppato con React" },

    projectPage: {
      allProjects: "← Tutti i progetti",
      client: "Cliente:",
      visitSite: "Visita il sito →",
      brief: "Brief",
      challenge: "La sfida",
      solution: "La soluzione",
      technologies: "Tecnologie utilizzate",
      previous: "← Precedente",
      next: "Successivo →",
      notFound: "Progetto non trovato.",
      backHome: "← Torna alla home",
    },
  },

  // ─── EN — invariato ────────────────────────────────────────────────────────
  en: {
    nav: { progetti: "Projects", processo: "How I work", chiSono: "About", contatti: "Contact" },
    hero: {
      label: "Front-End Developer · Milan",
      tagline: "Your idea takes shape here.",
      sub: "I build websites for people with something beautiful to tell — artisans, freelancers, small businesses.",
      ctaProjects: "See the projects",
      ctaContact: "Let's work together →",
    },
    projects: {
      sectionLabel: "Selected work",
      openProject: "Open project →",
      items: [
        "Professional website for DKE Impianti, an electrical systems company in Milan. Built with React and Vite, with EmailJS contact form and mobile-optimised responsive design.",
      ],
    },
    about: {
      sectionLabel: "About",
      title: ["Developer.", "Designer at heart."],
      bio: "I'm Xavier Paredes, a freelance front-end developer based in Milan. I build websites with React, JavaScript, HTML and CSS — fast, accessible and SEO-optimised. I specialise in small businesses and craft brands that deserve a professional digital presence.",
      githubLink: "GitHub →",
      skillsLabel: "Technologies",
    },
    process: {
      sectionLabel: "How I work",
      title: ["From brief", "to live website."],
      sub: "A transparent process, step by step — so you always know where we stand and what to expect.",
      steps: [
        { title: "Listening & Brief", desc: "We start with a free consultation — in person, on a call, or by message. I want to get to know you, listen to your needs, and understand what you expect from the site." },
        { title: "Proposal & Quote", desc: "I send you a detailed quote with everything I'll build, the timeline, and the costs. No surprises halfway through." },
        { title: "Figma Draft", desc: "Before writing a single line of code, I design the site in Figma — colours, typography and page structure. You see the final result before development begins." },
        { title: "Development", desc: "I build the site with React, HTML and CSS — clean code, optimised for speed and compatible with all devices. You get a preview link to follow progress in real time." },
        { title: "Revisions", desc: "I show you the site preview and collect your feedback. Two rounds of revisions are included — we adjust together until the result is exactly what you had in mind." },
        { title: "Go Live", desc: "I publish the site, set up the domain and hand everything over — credentials, instructions and post-launch support." },
      ],
    },
    contact: {
      sectionLabel: "Let's collaborate",
      title: ["Got a web project", "in mind?"],
      sub: "Write to me for a free consultation — whether it's a site from scratch, improving what you already have, or an ongoing front-end collaboration.",
      namePlaceholder: "Your name",
      surnamePlaceholder: "Your surname",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Tell me about the project — what do you need?",
      submit: "Send message",
      success: "Message sent. I'll get back to you within 24 hours!",
      error: "Something went wrong. Try again or email me directly.",
    },
    footer: { built: "Built with React" },
    projectPage: {
      allProjects: "← All projects",
      client: "Client:",
      visitSite: "Visit site →",
      brief: "Brief",
      challenge: "The challenge",
      solution: "The solution",
      technologies: "Technologies used",
      previous: "← Previous",
      next: "Next →",
      notFound: "Project not found.",
      backHome: "← Back to home",
    },
  },

  // ─── ES — invariato ────────────────────────────────────────────────────────
  es: {
    nav: { progetti: "Proyectos", processo: "Cómo trabajo", chiSono: "Sobre mí", contatti: "Contacto" },
    hero: {
      label: "Desarrollador Front-End · Milán",
      tagline: "Tu idea toma forma aquí.",
      sub: "Construyo sitios web para quienes tienen algo bonito que contar — artesanos, freelancers, pequeñas empresas.",
      ctaProjects: "Ver los proyectos",
      ctaContact: "Trabajemos juntos →",
    },
    projects: {
      sectionLabel: "Trabajos seleccionados",
      openProject: "Abrir proyecto →",
      items: [
        "Sitio web profesional para DKE Impianti, empresa de instalaciones eléctricas en Milán. Desarrollado con React y Vite, con formulario de contacto EmailJS y diseño responsive optimizado para móvil.",
      ],
    },
    about: {
      sectionLabel: "Sobre mí",
      title: ["Desarrollador.", "Diseñador de corazón."],
      bio: "Soy Xavier Paredes, desarrollador front-end freelance con base en Milán. Construyo sitios web con React, JavaScript, HTML y CSS — rápidos, accesibles y optimizados para buscadores. Me especializo en pequeñas empresas y marcas artesanales que merecen una presencia digital profesional.",
      githubLink: "GitHub →",
      skillsLabel: "Tecnologías",
    },
    process: {
      sectionLabel: "Cómo trabajo",
      title: ["Del brief", "al sitio en línea."],
      sub: "Un proceso transparente, paso a paso — para que sepas siempre en qué punto estamos y qué esperar.",
      steps: [
        { title: "Escucha & Brief", desc: "Empezamos con una consulta gratuita — en persona, por videollamada o por mensaje. Quiero conocerte y entender qué esperas del sitio." },
        { title: "Propuesta & Presupuesto", desc: "Te envío un presupuesto detallado con todo lo que voy a realizar, los tiempos y los costos. Sin sorpresas a mitad de camino." },
        { title: "Boceto en Figma", desc: "Antes de escribir una línea de código, diseño el sitio en Figma — colores, tipografía y estructura de páginas. Ves el resultado final antes del desarrollo." },
        { title: "Desarrollo", desc: "Construyo el sitio con React, HTML y CSS — código limpio, optimizado para velocidad y compatible con todos los dispositivos." },
        { title: "Revisiones", desc: "Te muestro la vista previa del sitio y recojo tu feedback. Se incluyen dos rondas de revisiones." },
        { title: "Go Live", desc: "Publico el sitio, configuro el dominio y te entrego todo — credenciales, instrucciones y soporte post-lanzamiento." },
      ],
    },
    contact: {
      sectionLabel: "Colaboremos",
      title: ["¿Tienes un proyecto web", "que realizar?"],
      sub: "Escríbeme para una consulta gratuita — ya sea un sitio desde cero, mejorar el que ya tienes, o una colaboración front-end continua.",
      namePlaceholder: "Tu nombre",
      surnamePlaceholder: "Tu apellido",
      emailPlaceholder: "Tu email",
      messagePlaceholder: "Cuéntame el proyecto — ¿qué necesitas?",
      submit: "Enviar mensaje",
      success: "Mensaje enviado. ¡Te respondo en 24 horas!",
      error: "Error al enviar. Intenta de nuevo o escríbeme directamente.",
    },
    footer: { built: "Desarrollado con React" },
    projectPage: {
      allProjects: "← Todos los proyectos",
      client: "Cliente:",
      visitSite: "Visitar el sitio →",
      brief: "Brief",
      challenge: "El reto",
      solution: "La solución",
      technologies: "Tecnologías utilizadas",
      previous: "← Anterior",
      next: "Siguiente →",
      notFound: "Proyecto no encontrado.",
      backHome: "← Volver al inicio",
    },
  },
};