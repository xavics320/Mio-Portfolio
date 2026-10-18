/* ─── TRADUZIONI ────────────────────────────────────────────────────────── */
/*
  translations.js — ottimizzato per SEO (Step 6)
  
  REGOLE APPLICATE:
  - Keyword principale "siti web per piccole imprese e artigiani" nell'H1
    (tagline): è quello che cerca un cliente, non "front-end developer"
  - Keyword geografica "Milano" nel label, nel title e nella bio
  - Keyword tecnica "React" nel sub e nella bio
  - Keyword transazionali ("prezzi", "preventivo", "quanto costa") in
    Prezzi e FAQ
  - Nessuna ripetizione forzata — ogni keyword appare in modo naturale
  - EN ed ES hanno URL propri (/en/, /es/ — vedi paths.js) e vengono
    indicizzati anche loro: stesse regole, keyword nella loro lingua

  seo: title e description della home e suffisso dei title dei progetti.
  Title ≤ 60 caratteri, description ≤ 160 (oltre Google li tronca).
  projects.items: testi dei progetti per slug (i dati strutturali —
  foto, tag, anno, link — stanno in PROJECTS in data/projects.js).
*/

export const LANGUAGES = ["it", "en", "es"];

export const translations = {
  it: {
    seo: {
      title: "Siti Web per Piccole Imprese a Milano | Xavier Paredes",
      description: "Sviluppatore web freelance a Milano: creo siti veloci e su misura per artigiani e piccole imprese. Pacchetti da 489 €, consulenza gratuita.",
      projectsLabel: "Progetti",
    },

    nav: {
      prezzi: "Prezzi",
      progetti: "Progetti",
      processo: "Come lavoro",
      chiSono: "Chi sono",
      contatti: "Contatti",
      faq: "FAQ"
    },

    hero: {
      /*
        LABEL — "Sviluppatore Web Freelance · Milano"
        PERCHÉ: un cliente italiano cerca "sviluppatore web" o "web
        designer", quasi mai "front-end" (termine da addetti ai lavori).
      */
      label: "Sviluppatore Web Freelance · Milano",

      /*
        TAGLINE (H1) — keyword principale integrata
        PERCHÉ: l'H1 è il segnale SEO più importante della pagina dopo il
        title tag. "Siti web" + target (piccole imprese, artigiani) è
        esattamente quello che scrive su Google chi cerca un sito.

        KEYWORD PRESENTE: "siti web per piccole imprese e artigiani"
      */
      tagline: "Siti web su misura per piccole imprese e artigiani.",

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
        TESTI PROGETTI — per slug (deve coincidere con PROJECTS in data/projects.js)
        category: tipo di sito, finisce nel <title> della pagina progetto
        desc: card in home + meta description della pagina progetto
        PERCHÉ: le descrizioni dei progetti sono contenuto indicizzabile.
        Menzionare tipo di attività e tecnologie (React, Vite, EmailJS)
        aiuta per query come "sito web per ristorante" o "sviluppatore React".
      */
      items: {
        "dke-impianti": {
          category: "sito per impianti elettrici",
          desc: "Sito web professionale per DKE Impianti, azienda di impianti elettrici a Milano. Sviluppato con React e Vite, con modulo di contatto EmailJS e design responsive.",
          brief: "DKE Impianti aveva bisogno di un sito professionale per presentare i propri servizi e permettere ai clienti di contattarli facilmente.",
          challenge: "La principale sfida era creare un sito moderno e responsive che rispecchiasse l'identità dell'azienda, con un modulo di contatto funzionante e sicuro.",
          solution: "Ho sviluppato un sito web con React e Vite, utilizzando HTML e CSS per garantire un design pulito e responsive. Ho integrato EmailJS per il modulo di contatto, assicurando che le richieste dei clienti arrivassero direttamente alla loro email.",
        },
        "osteria-del-grano": {
          category: "sito web per ristorante",
          desc: "Sito vetrina per l'Osteria del Grano: menu aggiornato tramite API, prenotazione dei tavoli online e notifiche email al ristorante. Sviluppato con React.",
          brief: "Il ristorante voleva un sito che mostrasse il menu aggiornato, permettesse di prenotare tavoli online e raccontasse la storia del locale.",
          challenge: "Creare un sistema di prenotazioni online che fosse semplice da usare per i clienti e facile da gestire per il ristorante, senza un back-end complesso.",
          solution: "Ho sviluppato un sito con React che consente di visualizzare il menu in tempo reale tramite un'API e di prenotare tavoli online. Ho implementato un sistema di gestione delle prenotazioni che invia notifiche al ristorante via email.",
        },
      },
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
          desc: "Ti mostro il sito in anteprima e raccolgo il tuo feedback. Le revisioni incluse dipendono dal pacchetto scelto — aggiustiamo insieme finché il risultato è esattamente quello che avevi in mente."
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

    pricing: {
      /*
        SEZIONE PREZZI — keyword transazionali
        "prezzi sito web" e "quanto costa un sito web" sono tra le ricerche
        più frequenti di chi sta per comprare. Prezzi visibili = meno
        richieste a vuoto e clienti già in target.
        I numeri (prezzi) NON stanno qui: vivono in src/data/plans.js.
      */
      sectionLabel: "Prezzi sito web",
      title: ["Pacchetti chiari,", "nessuna sorpresa."],
      sub: "Scegli il pacchetto più adatto alla tua attività. Prezzi trasparenti, tutto incluso — e se hai esigenze particolari, prepariamo insieme un preventivo su misura.",
      featuredBadge: "Il più scelto",
      quoteLabel: "Su preventivo",
      note: "Prezzi una tantum. Nel pacchetto Business dominio, hosting ed email sono inclusi per il primo anno; dal secondo anno il rinnovo è a parte.",
      plans: {
        starter: {
          name: "Starter",
          desc: "Per chi parte da zero e vuole una presenza online curata.",
          cta: "Scegli Starter",
          features: [
            "Fino a 4 sezioni",
            "Mockup Figma su misura",
            "Form contatti (email o WhatsApp)",
            "Link social integrati",
            "SEO base + GDPR compliant",
            "1 revisione",
            "Consegna in 7 giorni",
          ],
        },
        business: {
          name: "Business",
          desc: "Per attività che vogliono un sito completo, veloce e pronto a vendere.",
          cta: "Scegli Business",
          features: [
            "Fino a 7 sezioni",
            "Mockup Figma su misura",
            "Form email + WhatsApp",
            "Email personalizzata, hosting e dominio inclusi (1 anno)",
            "Google Maps integrata",
            "Link social integrati",
            "Ottimizzazione velocità avanzata (Lighthouse 90+)",
            "SEO ottimizzata + GDPR compliant",
            "Supporto post-lancio 30 giorni",
            "3 revisioni",
            "Consegna in 10 giorni",
          ],
        },
        custom: {
          name: "Su misura",
          desc: "Per progetti che richiedono funzionalità specifiche.",
          cta: "Richiedi un preventivo",
          features: [
            "E-commerce",
            "Funzionalità avanzate",
            "Integrazioni con servizi esterni",
            "Tempi e costi concordati insieme",
          ],
        },
      },
    },

    faq: {
      /*
        FAQ — keyword long-tail in forma di domanda
        PERCHÉ: chi cerca "quanto costa un sito web" o "quanto tempo serve
        per fare un sito" usa esattamente queste frasi. Le risposte vengono
        anche esposte come schema FAQPage (vedi seo.js).
        Le risposte devono restare coerenti con i pacchetti in "pricing".
      */
      sectionLabel: "Domande frequenti",
      title: ["Domande", "frequenti."],
      items: [
        {
          q: "Quanto costa un sito web?",
          a: "Il pacchetto Starter costa 489 €, il Business 789 €: prezzi una tantum, senza abbonamenti. Per e-commerce o funzionalità particolari preparo un preventivo su misura, gratuito e senza impegno.",
        },
        {
          q: "Quanto tempo serve per realizzare un sito?",
          a: "La consegna è in 7 giorni con il pacchetto Starter e in 10 giorni con il Business. Per i progetti su misura i tempi li concordiamo insieme nel preventivo.",
        },
        {
          q: "Dominio, hosting ed email sono inclusi?",
          a: "Nel pacchetto Business dominio, hosting ed email personalizzata sono inclusi per il primo anno; dal secondo anno il rinnovo è a parte. Con lo Starter valutiamo insieme la soluzione più adatta alla tua attività.",
        },
        {
          q: "Il mio sito sarà visibile su Google?",
          a: "Sì: ogni sito è costruito con struttura, meta tag e velocità curati per i motori di ricerca — SEO di base nello Starter, ottimizzata nel Business. Nessuno può garantire onestamente il primo posto, ma partirai con basi solide.",
        },
        {
          q: "Posso chiedere modifiche durante il lavoro?",
          a: "Certo. Prima dello sviluppo vedi la bozza su Figma e puoi chiedere cambiamenti; poi sono incluse 1 revisione con lo Starter e 3 con il Business.",
        },
        {
          q: "Il sito funziona bene anche da smartphone?",
          a: "Sì, ogni sito è responsive: si adatta a smartphone, tablet e computer, con un codice ottimizzato per caricarsi in fretta anche da rete mobile.",
        },
        {
          q: "Lavori solo con clienti di Milano?",
          a: "Ho base a Milano ma lavoro con piccole imprese e artigiani in tutta Italia: ci sentiamo di persona, in call o via messaggio, come preferisci.",
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

    cookieBanner: {
      text: "Uso cookie analitici per capire come viene usato il sito. Puoi accettarli o rifiutarli.",
      policyLink: "Scopri di più",
      accept: "Accetta",
      reject: "Rifiuta",
    },

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

  // ─── EN ────────────────────────────────────────────────────────────────────
  en: {
    seo: {
      title: "Websites for Small Businesses in Milan | Xavier Paredes",
      description: "Freelance web developer in Milan: fast, custom websites for artisans and small businesses. Packages from €489, free consultation.",
      projectsLabel: "Projects",
    },
    nav: { prezzi: "Pricing", progetti: "Projects", processo: "How I work", chiSono: "About", contatti: "Contact", faq: "FAQ" },
    hero: {
      label: "Freelance Web Developer · Milan",
      tagline: "Custom websites for small businesses and artisans.",
      sub: "I build websites in React for people with something beautiful to tell — artisans, freelancers, small businesses. Modern design, clean code, real results.",
      ctaProjects: "See the projects",
      ctaContact: "Let's work together →",
    },
    projects: {
      sectionLabel: "Websites I've built",
      openProject: "Open project →",
      items: {
        "dke-impianti": {
          category: "electrical contractor website",
          desc: "Professional website for DKE Impianti, an electrical systems company in Milan. Built with React and Vite, with an EmailJS contact form and responsive design.",
          brief: "DKE Impianti needed a professional website to present its services and make it easy for customers to get in touch.",
          challenge: "The main challenge was building a modern, responsive site that reflected the company's identity, with a working and secure contact form.",
          solution: "I built the site with React and Vite, using HTML and CSS for a clean, responsive design. I integrated EmailJS for the contact form, so customer requests go straight to the company's inbox.",
        },
        "osteria-del-grano": {
          category: "restaurant website",
          desc: "Showcase website for Osteria del Grano: menu kept up to date via an API, online table booking and email notifications to the restaurant. Built with React.",
          brief: "The restaurant wanted a website that showed an up-to-date menu, allowed online table booking and told the story of the place.",
          challenge: "Building an online booking system that was simple for guests to use and easy for the restaurant to manage, without a complex back end.",
          solution: "I built a React site that shows the menu in real time via an API and lets guests book tables online. I implemented a booking flow that notifies the restaurant by email.",
        },
      },
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
        { title: "Revisions", desc: "I show you the site preview and collect your feedback. The number of revision rounds depends on your package — we adjust together until the result is exactly what you had in mind." },
        { title: "Go Live", desc: "I publish the site, set up the domain and hand everything over — credentials, instructions and post-launch support." },
      ],
    },
    pricing: {
      sectionLabel: "Pricing",
      title: ["Clear packages,", "no surprises."],
      sub: "Pick the package that fits your business. Transparent prices, everything included — and if you have specific needs, we'll put together a custom quote.",
      featuredBadge: "Most popular",
      quoteLabel: "Custom quote",
      note: "One-off prices. In the Business package, domain, hosting and email are included for the first year; renewal from the second year is billed separately.",
      plans: {
        starter: {
          name: "Starter",
          desc: "For those starting from scratch who want a polished online presence.",
          cta: "Choose Starter",
          features: [
            "Up to 4 sections",
            "Custom Figma mockup",
            "Contact form (email or WhatsApp)",
            "Social media links",
            "Basic SEO + GDPR compliant",
            "1 revision",
            "Delivery in 7 days",
          ],
        },
        business: {
          name: "Business",
          desc: "For businesses that want a complete, fast site ready to bring in clients.",
          cta: "Choose Business",
          features: [
            "Up to 7 sections",
            "Custom Figma mockup",
            "Email + WhatsApp form",
            "Custom email, hosting and domain included (1 year)",
            "Integrated Google Maps",
            "Social media links",
            "Advanced speed optimisation (Lighthouse 90+)",
            "Optimised SEO + GDPR compliant",
            "30-day post-launch support",
            "3 revisions",
            "Delivery in 10 days",
          ],
        },
        custom: {
          name: "Custom",
          desc: "For projects that need specific features.",
          cta: "Request a quote",
          features: [
            "E-commerce",
            "Advanced features",
            "Third-party integrations",
            "Timeline and costs agreed together",
          ],
        },
      },
    },
    faq: {
      sectionLabel: "FAQ",
      title: ["Frequently asked", "questions."],
      items: [
        {
          q: "How much does a website cost?",
          a: "The Starter package is €489 and Business is €789: one-off prices, no subscriptions. For e-commerce or specific features I prepare a custom quote, free and with no obligation.",
        },
        {
          q: "How long does it take to build a website?",
          a: "Delivery takes 7 days with the Starter package and 10 days with Business. For custom projects we agree on the timeline together in the quote.",
        },
        {
          q: "Are domain, hosting and email included?",
          a: "In the Business package, domain, hosting and a custom email address are included for the first year; renewal from the second year is billed separately. With Starter we choose the best option for your business together.",
        },
        {
          q: "Will my website show up on Google?",
          a: "Yes: every site is built with structure, meta tags and speed tuned for search engines — basic SEO in Starter, optimised SEO in Business. Nobody can honestly guarantee the top spot, but you'll start on solid ground.",
        },
        {
          q: "Can I ask for changes along the way?",
          a: "Of course. Before development you see the Figma draft and can request changes; after that, 1 revision is included with Starter and 3 with Business.",
        },
        {
          q: "Will the site work well on smartphones?",
          a: "Yes, every site is responsive: it adapts to phones, tablets and computers, with code optimised to load quickly even on mobile networks.",
        },
        {
          q: "Do you only work with clients in Milan?",
          a: "I'm based in Milan but work with small businesses and artisans all over Italy: we can meet in person, on a call or by message, whatever suits you.",
        },
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

    cookieBanner: {
      text: "I use analytics cookies to understand how the site is used. You can accept or reject them.",
      policyLink: "Learn more",
      accept: "Accept",
      reject: "Reject",
    },
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

  // ─── ES ────────────────────────────────────────────────────────────────────
  es: {
    seo: {
      title: "Páginas Web para Pequeñas Empresas | Xavier Paredes",
      description: "Desarrollador web freelance en Milán: creo páginas web rápidas y a medida para artesanos y pequeñas empresas. Paquetes desde 489 €, consulta gratuita.",
      projectsLabel: "Proyectos",
    },
    nav: { prezzi: "Precios", progetti: "Proyectos", processo: "Cómo trabajo", chiSono: "Sobre mí", contatti: "Contacto", faq: "FAQ" },
    hero: {
      label: "Desarrollador Web Freelance · Milán",
      tagline: "Páginas web a medida para pequeñas empresas y artesanos.",
      sub: "Construyo sitios web en React para quienes tienen algo bonito que contar — artesanos, freelancers, pequeñas empresas. Diseño moderno, código limpio, resultados concretos.",
      ctaProjects: "Ver los proyectos",
      ctaContact: "Trabajemos juntos →",
    },
    projects: {
      sectionLabel: "Sitios web realizados",
      openProject: "Abrir proyecto →",
      items: {
        "dke-impianti": {
          category: "web para electricistas",
          desc: "Sitio web profesional para DKE Impianti, empresa de instalaciones eléctricas en Milán. Hecho con React y Vite, con formulario EmailJS y diseño responsive.",
          brief: "DKE Impianti necesitaba un sitio profesional para presentar sus servicios y facilitar que los clientes se pusieran en contacto.",
          challenge: "El principal reto era crear un sitio moderno y responsive que reflejara la identidad de la empresa, con un formulario de contacto funcional y seguro.",
          solution: "Desarrollé el sitio con React y Vite, usando HTML y CSS para un diseño limpio y responsive. Integré EmailJS en el formulario de contacto para que las solicitudes de los clientes lleguen directamente a su email.",
        },
        "osteria-del-grano": {
          category: "web para restaurante",
          desc: "Sitio escaparate para la Osteria del Grano: menú actualizado vía API, reservas online y avisos por email al restaurante. Hecho con React.",
          brief: "El restaurante quería un sitio que mostrara el menú actualizado, permitiera reservar mesa online y contara la historia del local.",
          challenge: "Crear un sistema de reservas online sencillo para los clientes y fácil de gestionar para el restaurante, sin un back-end complejo.",
          solution: "Desarrollé un sitio con React que muestra el menú en tiempo real mediante una API y permite reservar mesa online. Implementé un sistema de reservas que avisa al restaurante por email.",
        },
      },
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
        { title: "Revisiones", desc: "Te muestro la vista previa del sitio y recojo tu feedback. Las rondas de revisión incluidas dependen del paquete elegido." },
        { title: "Go Live", desc: "Publico el sitio, configuro el dominio y te entrego todo — credenciales, instrucciones y soporte post-lanzamiento." },
      ],
    },
    pricing: {
      sectionLabel: "Precios",
      title: ["Paquetes claros,", "sin sorpresas."],
      sub: "Elige el paquete que mejor se adapta a tu negocio. Precios transparentes, todo incluido — y si tienes necesidades especiales, preparamos juntos un presupuesto a medida.",
      featuredBadge: "El más elegido",
      quoteLabel: "Bajo presupuesto",
      note: "Precios de pago único. En el paquete Business, dominio, hosting y email están incluidos el primer año; a partir del segundo año la renovación se paga aparte.",
      plans: {
        starter: {
          name: "Starter",
          desc: "Para quien empieza de cero y quiere una presencia online cuidada.",
          cta: "Elegir Starter",
          features: [
            "Hasta 4 secciones",
            "Mockup en Figma a medida",
            "Formulario de contacto (email o WhatsApp)",
            "Enlaces a redes sociales",
            "SEO básico + cumplimiento RGPD",
            "1 revisión",
            "Entrega en 7 días",
          ],
        },
        business: {
          name: "Business",
          desc: "Para negocios que quieren un sitio completo, rápido y listo para atraer clientes.",
          cta: "Elegir Business",
          features: [
            "Hasta 7 secciones",
            "Mockup en Figma a medida",
            "Formulario email + WhatsApp",
            "Email personalizado, hosting y dominio incluidos (1 año)",
            "Google Maps integrado",
            "Enlaces a redes sociales",
            "Optimización avanzada de velocidad (Lighthouse 90+)",
            "SEO optimizado + cumplimiento RGPD",
            "Soporte post-lanzamiento 30 días",
            "3 revisiones",
            "Entrega en 10 días",
          ],
        },
        custom: {
          name: "A medida",
          desc: "Para proyectos que requieren funcionalidades específicas.",
          cta: "Pedir presupuesto",
          features: [
            "E-commerce",
            "Funcionalidades avanzadas",
            "Integraciones con servicios externos",
            "Tiempos y costos acordados juntos",
          ],
        },
      },
    },
    faq: {
      sectionLabel: "Preguntas frecuentes",
      title: ["Preguntas", "frecuentes."],
      items: [
        {
          q: "¿Cuánto cuesta una página web?",
          a: "El paquete Starter cuesta 489 € y el Business 789 €: precios de pago único, sin suscripciones. Para e-commerce o funcionalidades específicas preparo un presupuesto a medida, gratuito y sin compromiso.",
        },
        {
          q: "¿Cuánto tiempo se tarda en hacer una página web?",
          a: "La entrega es en 7 días con el paquete Starter y en 10 días con el Business. Para proyectos a medida acordamos los tiempos juntos en el presupuesto.",
        },
        {
          q: "¿Dominio, hosting y email están incluidos?",
          a: "En el paquete Business, dominio, hosting y email personalizado están incluidos el primer año; a partir del segundo año la renovación se paga aparte. Con el Starter elegimos juntos la mejor opción para tu negocio.",
        },
        {
          q: "¿Mi página web aparecerá en Google?",
          a: "Sí: cada sitio se construye con estructura, meta tags y velocidad cuidados para los buscadores — SEO básico en el Starter, optimizado en el Business. Nadie puede garantizar honestamente el primer puesto, pero empezarás con una base sólida.",
        },
        {
          q: "¿Puedo pedir cambios durante el trabajo?",
          a: "Claro. Antes del desarrollo ves el boceto en Figma y puedes pedir cambios; después se incluye 1 revisión con el Starter y 3 con el Business.",
        },
        {
          q: "¿La web funciona bien en el móvil?",
          a: "Sí, cada sitio es responsive: se adapta a móviles, tablets y ordenadores, con un código optimizado para cargar rápido incluso con datos móviles.",
        },
        {
          q: "¿Trabajas solo con clientes de Milán?",
          a: "Tengo base en Milán pero trabajo con pequeñas empresas y artesanos de toda Italia: nos vemos en persona, por videollamada o por mensaje, como prefieras.",
        },
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

    cookieBanner: {
      text: "Utilizo cookies analíticas para entender cómo se usa el sitio. Puedes aceptarlas o rechazarlas.",
      policyLink: "Saber más",
      accept: "Aceptar",
      reject: "Rechazar",
    },
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