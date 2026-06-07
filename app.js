const categories = [
  { id: "policy", en: "Climate Policy", de: "Klimapolitik" },
  { id: "energy", en: "Renewable Energy", de: "Erneuerbare Energie" },
  { id: "biodiversity", en: "Biodiversity", de: "Biodiversität" },
  { id: "cities", en: "Sustainable Cities", de: "Nachhaltige Städte" },
  { id: "marine", en: "Marine Protection", de: "Meeresschutz" },
];

const articles = [];

const photoSources = [
  {
    id: "sponge-city-rain-garden",
    src: "assets/photos/sponge-city-rain-garden-hd.jpg",
    credit: "Jeremy Jeziorski / Oregon Convention Center · CC BY 2.0 · resized",
    license: "CC BY 2.0 · web-optimized",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rain_Garden_(33234470895).jpg",
    label: {
      en: "Urban rain garden that retains and slowly releases stormwater",
      de: "Städtischer Regengarten, der Niederschlagswasser zurückhält",
    },
  },
  {
    id: "seagrass-meadow",
    src: "assets/photos/seagrass-meadow-zostera-hd.jpg",
    credit: "Olivier Dugornay / Ifremer · CC BY 4.0 · resized",
    license: "CC BY 4.0 · web-optimized",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Herbier_de_zost%C3%A8res_(Zostera_marina)_(Ifremer_00560-67187_-_21863).jpg",
    label: {
      en: "Common eelgrass meadow beneath shallow coastal water",
      de: "Wiese aus Großem Seegras in flachem Küstenwasser",
    },
  },
  {
    id: "coral-bleaching-2023",
    src: "assets/photos/coral-bleaching-florida-2023-hd.jpg",
    credit: "Dan Eidsmoe / Symbiosis · CC BY 2.0 · resized",
    license: "CC BY 2.0 · web-optimized",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:%22The_Great_Coral_Bleaching_of_2023%22_-_53088200178.jpg",
    label: {
      en: "Heat-stressed corals during the 2023 bleaching event in Florida",
      de: "Hitzegestresste Korallen während der Bleiche 2023 in Florida",
    },
  },
  {
    id: "coral",
    src: "assets/photos/coral-reef-bleaching-hd.jpg",
    credit: "Jay Galvin / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Coral_Reef_Bleaching.jpg",
    label: {
      en: "Coral bleaching",
      de: "Korallenbleiche",
    },
  },
  {
    id: "marine-debris",
    src: "assets/photos/ocean-plastic-hd.jpg",
    credit: "Kevin Krejci / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Plastic_Ocean_(4408273247).jpg",
    label: {
      en: "Marine debris",
      de: "Meeresmüll",
    },
  },
  {
    id: "mangrove",
    src: "assets/photos/mangrove-forest-hd.jpg",
    credit: "Emonjnu / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_mighty_Mangrove_forest.jpg",
    label: {
      en: "Mangrove forest",
      de: "Mangrovenwald",
    },
  },
  {
    id: "glacier",
    src: "assets/photos/aletsch-glacier-hd.jpg",
    credit: "Gzzz / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Glacier_d%27Aletsch_panorama.jpg",
    label: {
      en: "Glacier change",
      de: "Gletscherwandel",
    },
  },
  {
    id: "solar",
    src: "assets/photos/offshore-wind-hd.jpg",
    credit: "U.S. Department of Energy / Wikimedia Commons",
    license: "Public Domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Block_Island_Wind_Farm.jpg",
    label: {
      en: "Offshore wind energy",
      de: "Offshore-Windenergie",
    },
  },
];

const API_BASES = ["backend.php?route=", "api"];
const PUBLISH_SESSION_KEY = "cyri-publish-token";
const HOMEPAGE_ARTICLE_COUNT = 5;
const FEATURED_ARTICLE_COUNT = 2;

const content = {
  en: {
    accessibility: {
      skip: "Skip to content",
      menu: "Open navigation menu",
      close: "Close",
    },
    seo: {
      title: "CYRI | Youth-led climate articles",
      description:
        "Climate Youth Research Initiative publishes understandable climate and marine protection articles.",
      pages: {
        home: {
          title: "CYRI | Youth-led climate articles",
          description:
            "Climate Youth Research Initiative publishes understandable climate and marine protection articles.",
        },
        articles: {
          title: "Articles | CYRI",
          description:
            "Read CYRI articles on climate policy, renewable energy, biodiversity, marine protection and sustainable cities.",
        },
        research: {
          title: "Research Tool | CYRI",
          description:
            "Ask questions and receive AI-assisted answers based only on published CYRI articles.",
        },
        about: {
          title: "About | CYRI",
          description:
            "Learn about CYRI, a two-person youth-led climate article initiative currently in development in Germany.",
        },
        publish: {
          title: "Publish | CYRI",
          description:
            "Protected publishing backend for CYRI articles and updates.",
        },
        imprint: {
          title: "Imprint | CYRI",
          description:
            "Legal notice and responsible contact information for CYRI.",
        },
        privacy: {
          title: "Privacy | CYRI",
          description:
            "Privacy notice for the CYRI website backend and contact forms.",
        },
        contact: {
          title: "Contact | CYRI",
          description:
            "Contact CYRI for questions, media inquiries, article feedback and general messages.",
        },
      },
    },
    nav: {
      home: "Home",
      mission: "Mission",
      articles: "Articles",
      research: "Research",
      about: "About",
      publish: "Publish",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Climate Youth Research Initiative",
      title: "Youth-led climate articles for a more sustainable future.",
      subtitle:
        "CYRI publishes understandable climate and marine protection articles for young people, educators and the public.",
      primaryCta: "Read Latest Articles",
      secondaryCta: "Our Mission",
      imageAlt: "Bleached coral reef",
    },
    mission: {
      eyebrow: "Mission",
      title: "Our Mission",
      intro: "CYRI is an independent youth-led climate article initiative based in Germany.",
      paragraphOne:
        "Our goal is to make climate science, climate policy and sustainability topics understandable for young people and the wider public.",
      paragraphTwo:
        "We publish articles based on credible, traceable sources. CYRI does not conduct original research.",
      focus: [
        {
          title: "Clear articles",
          text: "We turn complex climate topics into precise, accessible public articles.",
        },
        {
          title: "Transparent sources",
          text: "We make sources visible and separate facts, context and interpretation clearly.",
        },
        {
          title: "Responsible publishing",
          text: "We publish carefully edited articles for readers who want serious climate context.",
        },
      ],
    },
    latest: {
      eyebrow: "Latest thinking",
      title: "Latest Articles",
      intro: "Published CYRI articles appear here automatically once they are added.",
      viewAll: "View all articles",
    },
    articles: {
      eyebrow: "Articles",
      title: "Climate and marine protection, explained clearly.",
      intro:
        "Read CYRI articles on climate protection, marine protection, renewable energy, climate policy, biodiversity and sustainable cities.",
      newestEyebrow: "Newest",
      newestTitle: "Newest Articles",
      archiveEyebrow: "Archive",
      olderTitle: "Older Articles",
      olderIntro: "Browse previous CYRI publications by topic and format.",
      readMore: "Read more",
      sourcesTitle: "Sources and further reading",
      modalNote: "Photo sources are shown in the lower corner of each image.",
      filters: {
        all: "All",
      },
      emptyLatest: "No CYRI articles have been published yet.",
      emptyLatestHint: "Use the protected publishing area to add the first article.",
      emptyNewest: "No newest articles yet.",
      noResults: "No older articles match this category yet.",
    },
    research: {
      eyebrow: "Research tool",
      title: "Ask questions about CYRI articles.",
      intro:
        "Receive concise AI-assisted answers based only on the content of published CYRI articles.",
      questionLabel: "Your question",
      questionPlaceholder: "What does coral bleaching have to do with climate change?",
      submit: "Ask CYRI",
      asking: "Reviewing CYRI articles...",
      answerEyebrow: "Answer",
      referencesTitle: "Based on these CYRI articles",
      readArticle: "Read article",
      privacyNote:
        "Your question is sent to the configured AI provider for processing. Do not enter personal or confidential information.",
      missing: "Enter a question with at least five characters.",
      unavailable: "The AI research tool is not configured on the server yet.",
      rateLimited: "Too many questions were submitted. Please try again in a few minutes.",
      error: "The question could not be answered. Please try again later.",
    },
    about: {
      eyebrow: "About",
      title: "An ambitious youth-led initiative from Germany.",
      intro: "CYRI is an independent youth-led climate article initiative currently in development.",
      storyTitle: "Building a clear bridge between climate topics and the public.",
      storyOne:
        "CYRI is being developed to help young people understand climate topics, evaluate public debates and participate in sustainability conversations with confidence.",
      storyTwo:
        "The initiative focuses on careful article work, accessible writing, transparent sourcing and responsible publishing.",
      teamEyebrow: "Team",
      teamTitle: "Core team",
      team: [
        {
          name: "Tobias Göppert",
          role: "Co-founder & editorial lead",
          text: "Co-founded CYRI and leads article direction, public positioning, editorial standards and source-based climate articles.",
        },
        {
          name: "Jarne Bub",
          role: "Co-founder & operations lead",
          text: "Co-founded CYRI and supports article planning, publishing workflows, organization and quality control.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact CYRI.",
      intro:
        "Reach out with questions, media inquiries, article feedback or general messages.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      message: "Message",
      messagePlaceholder: "Tell us what your message is about.",
      submit: "Send Message",
      success: "Thank you. Your message has been saved and can be reviewed by the CYRI team.",
      error: "The message could not be sent. Please try again later.",
      panelEyebrow: "Contact",
      panelTitle: "Questions and article feedback.",
      panelText:
        "CYRI reads messages related to articles, climate topics, media questions and general feedback.",
    },
    publish: {
      eyebrow: "Publish",
      title: "Publish a CYRI article.",
      intro: "Add a new climate or marine protection article with the protected backend editor.",
      panelEyebrow: "Editor access",
      panelTitle: "Protected publishing backend.",
      panelText:
        "This editor saves articles on the server so published posts are available to every visitor.",
      password: "Password",
      passwordPlaceholder: "Enter editor password",
      unlock: "Unlock editor",
      loginSuccess: "Editor unlocked.",
      loginError: "Wrong password.",
      backendError: "Backend is not reachable. Start the Node server or upload the PHP backend files.",
      titleDe: "German title",
      titleDePlaceholder: "Example: Warum Meeresschutz Klimaschutz ist",
      titleEn: "English title",
      titleEnPlaceholder: "Optional English title",
      category: "Category",
      date: "Article date",
      publication: "Publication",
      publishNow: "Publish now",
      publishLater: "Schedule for later",
      scheduleTime: "Launch date and time",
      scheduleHint: "The time uses your device's local time zone.",
      summaryDe: "German summary",
      summaryDePlaceholder: "Short, clear summary for the article card.",
      summaryEn: "English summary",
      summaryEnPlaceholder: "Optional English summary.",
      bodyDe: "German article text",
      bodyDePlaceholder: "Write the article text here.",
      bodyEn: "English article text",
      bodyEnPlaceholder: "Optional English article text.",
      translate: "Translate German article with AI",
      translating: "Translating article...",
      translateSuccess: "English title, summary and article text have been filled in.",
      translateMissing: "Enter the German title, summary and article text first.",
      translateNotConfigured: "AI translation is not configured on the server yet.",
      translateError: "The article could not be translated. Please try again later.",
      cover: "Cover photo",
      ownImage: "Upload your own photo",
      ownImageHint: "Optional. JPG, PNG or WebP; the image is optimized before upload.",
      chooseImage: "Choose photo",
      removeImage: "Remove photo",
      imageCredit: "Photo credit",
      imageCreditPlaceholder: "Example: Tobias Göppert / CYRI",
      imageTooLarge: "The selected image is too large or could not be processed.",
      uploadingImage: "Optimizing and uploading photo...",
      submit: "Publish article",
      scheduleSubmit: "Schedule article",
      success: "Article published. It now appears in the articles section.",
      scheduledSuccess: "Article scheduled. It will appear automatically at the selected time.",
      error: "The article could not be published. Please log in again or try later.",
    },
    legal: {
      imprintEyebrow: "Legal notice",
      imprintTitle: "Imprint",
      imprintIntro:
        "Legal information for CYRI according to German provider identification requirements.",
      providerEyebrow: "Information according to § 5 DDG",
      providerTitle: "Provider",
      projectLabel: "Project",
      operatorLabel: "Operators",
      statusLabel: "Status",
      statusText:
        "Independent youth-led initiative currently in development; not a registered NGO or incorporated association.",
      addressLabel: "Address",
      addressText: "[Full summonable address must be added before public launch.]",
      emailLabel: "Email",
      editorialEyebrow: "Editorial responsibility",
      editorialTitle: "Responsible under § 18 Abs. 2 MStV",
      editorialText:
        "Tobias Göppert and Jarne Bub are responsible for editorial article content. A full address for the responsible person must be added before public launch.",
      liabilityEyebrow: "Liability notice",
      liabilityTitle: "Liability for content",
      liabilityContent:
        "CYRI creates article content with care. However, no guarantee is given for correctness, completeness, timeliness or suitability for a particular purpose. The content is for general information and does not replace professional advice. Liability is excluded to the extent permitted by law. Mandatory liability, especially for intent, gross negligence and injury to life, body or health, remains unaffected.",
      linksTitle: "Liability for external links",
      linksText:
        "External links lead to third-party content. The respective providers are responsible for their own content. Linked pages were checked for obvious legal violations when the links were created. If CYRI becomes aware of illegal content, the relevant links will be removed.",
      copyrightTitle: "Copyright and image credits",
      copyrightText:
        "Texts, layout and original CYRI content are protected by copyright unless otherwise stated. Third-party images are used with source and license information shown near the image or in the documentation.",
      privacyEyebrow: "Privacy",
      privacyTitle: "Privacy notice",
      privacyIntro:
        "This website sends contact messages and protected publishing requests to the CYRI backend.",
      localDataTitle: "Backend data",
      localDataText:
        "Contact messages are stored on the server for processing. Published articles are stored in the article backend. Questions entered in the research tool are sent to the configured AI provider for processing. A complete privacy policy should be finalized before public launch.",
    },
    footer: {
      statement: "Youth-led climate articles for a more sustainable future.",
      language: "Language",
      social: "Social",
      imprint: "Imprint",
      privacy: "Privacy",
    },
  },
  de: {
    accessibility: {
      skip: "Zum Inhalt springen",
      menu: "Navigationsmenü öffnen",
      close: "Schließen",
    },
    seo: {
      title: "CYRI | Jugendgeführte Klimaartikel",
      description:
        "Climate Youth Research Initiative veröffentlicht verständliche Artikel zu Klima- und Meeresschutz.",
      pages: {
        home: {
          title: "CYRI | Jugendgeführte Klimaartikel",
          description:
            "Climate Youth Research Initiative veröffentlicht verständliche Artikel zu Klima- und Meeresschutz.",
        },
        articles: {
          title: "Artikel | CYRI",
          description:
            "Lies CYRI-Artikel zu Klimapolitik, erneuerbarer Energie, Biodiversität, Meeresschutz und nachhaltigen Städten.",
        },
        research: {
          title: "Recherche-Tool | CYRI",
          description:
            "Stelle Fragen und erhalte KI-gestützte Antworten auf Basis veröffentlichter CYRI-Artikel.",
        },
        about: {
          title: "Über uns | CYRI",
          description:
            "Erfahre mehr über CYRI, eine zweiköpfige jugendgeführte Klimaartikelinitiative im Aufbau in Deutschland.",
        },
        publish: {
          title: "Publizieren | CYRI",
          description:
            "Geschütztes Veröffentlichungsbackend für CYRI-Artikel und Updates.",
        },
        imprint: {
          title: "Impressum | CYRI",
          description:
            "Impressum und verantwortliche Kontaktinformationen für CYRI.",
        },
        privacy: {
          title: "Datenschutz | CYRI",
          description:
            "Datenschutzhinweise für das CYRI-Website-Backend und Kontaktformulare.",
        },
        contact: {
          title: "Kontakt | CYRI",
          description:
            "Kontaktiere CYRI für Fragen, Medienanfragen, Artikelhinweise und allgemeine Nachrichten.",
        },
      },
    },
    nav: {
      home: "Start",
      mission: "Mission",
      articles: "Artikel",
      research: "Recherche",
      about: "Über uns",
      publish: "Publizieren",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Climate Youth Research Initiative",
      title: "Jugendgeführte Klimaartikel für eine nachhaltigere Zukunft.",
      subtitle:
        "CYRI veröffentlicht verständliche Artikel zu Klima- und Meeresschutz für junge Menschen, Bildungseinrichtungen und die Öffentlichkeit.",
      primaryCta: "Neueste Artikel lesen",
      secondaryCta: "Unsere Mission",
      imageAlt: "Gebleichter Korallenriffbereich",
    },
    mission: {
      eyebrow: "Mission",
      title: "Unsere Mission",
      intro: "CYRI ist eine unabhängige, jugendgeführte Klimaartikelinitiative aus Deutschland.",
      paragraphOne:
        "Unser Ziel ist es, Klimawissenschaft, Klimapolitik und Nachhaltigkeitsthemen für junge Menschen und die breite Öffentlichkeit verständlich zu machen.",
      paragraphTwo:
        "Wir veröffentlichen Artikel auf Basis glaubwürdiger, nachvollziehbarer Quellen. CYRI führt keine eigene Forschung durch.",
      focus: [
        {
          title: "Klare Artikel",
          text: "Wir machen komplexe Klimathemen in präzisen und zugänglichen Artikeln verständlich.",
        },
        {
          title: "Transparente Quellen",
          text: "Wir machen Quellen sichtbar und trennen Fakten, Kontext und Einordnung klar voneinander.",
        },
        {
          title: "Verantwortliches Publizieren",
          text: "Wir veröffentlichen sorgfältig redigierte Artikel für Leserinnen und Leser, die seriöse Klimaeinordnung suchen.",
        },
      ],
    },
    latest: {
      eyebrow: "Aktuelle Perspektiven",
      title: "Neueste Artikel",
      intro: "Veröffentlichte CYRI-Artikel erscheinen hier automatisch, sobald sie angelegt wurden.",
      viewAll: "Alle Artikel ansehen",
    },
    articles: {
      eyebrow: "Artikel",
      title: "Klima- und Meeresschutz klar erklärt.",
      intro:
        "Lies CYRI-Artikel zu Klimaschutz, Meeresschutz, erneuerbarer Energie, Klimapolitik, Biodiversität und nachhaltigen Städten.",
      newestEyebrow: "Neueste",
      newestTitle: "Neueste Artikel",
      archiveEyebrow: "Archiv",
      olderTitle: "Ältere Artikel",
      olderIntro: "Durchsuche frühere CYRI-Veröffentlichungen nach Thema und Format.",
      readMore: "Weiterlesen",
      sourcesTitle: "Quellen und weiterführende Informationen",
      modalNote: "Bildquellen werden unten rechts im jeweiligen Foto angezeigt.",
      filters: {
        all: "Alle",
      },
      emptyLatest: "Es wurden noch keine CYRI-Artikel veröffentlicht.",
      emptyLatestHint: "Nutze den geschützten Veröffentlichungsbereich, um den ersten Artikel anzulegen.",
      emptyNewest: "Noch keine neuesten Artikel.",
      noResults: "Zu dieser Kategorie gibt es noch keine älteren Artikel.",
    },
    research: {
      eyebrow: "Recherche-Tool",
      title: "Stelle Fragen zu den CYRI-Artikeln.",
      intro:
        "Erhalte kurze KI-gestützte Antworten, die ausschließlich auf veröffentlichten CYRI-Artikeln basieren.",
      questionLabel: "Deine Frage",
      questionPlaceholder: "Was hat Korallenbleiche mit dem Klimawandel zu tun?",
      submit: "CYRI fragen",
      asking: "CYRI-Artikel werden ausgewertet...",
      answerEyebrow: "Antwort",
      referencesTitle: "Basiert auf diesen CYRI-Artikeln",
      readArticle: "Artikel lesen",
      privacyNote:
        "Deine Frage wird zur Verarbeitung an den eingerichteten KI-Anbieter übermittelt. Gib keine persönlichen oder vertraulichen Informationen ein.",
      missing: "Gib eine Frage mit mindestens fünf Zeichen ein.",
      unavailable: "Das KI-Recherche-Tool ist auf dem Server noch nicht eingerichtet.",
      rateLimited: "Es wurden zu viele Fragen gestellt. Bitte versuche es in einigen Minuten erneut.",
      error: "Die Frage konnte nicht beantwortet werden. Bitte versuche es später erneut.",
    },
    about: {
      eyebrow: "Über uns",
      title: "Eine ambitionierte jugendgeführte Initiative aus Deutschland.",
      intro: "CYRI ist eine unabhängige, jugendgeführte Klimaartikelinitiative, die sich derzeit im Aufbau befindet.",
      storyTitle: "Eine klare Brücke zwischen Klimathemen und Öffentlichkeit bauen.",
      storyOne:
        "CYRI entsteht, um jungen Menschen zu helfen, Klimathemen zu verstehen, öffentliche Debatten einzuordnen und selbstbewusst an Nachhaltigkeitsgesprächen teilzunehmen.",
      storyTwo:
        "Die Initiative konzentriert sich auf sorgfältige Artikelarbeit, verständliche Texte, transparente Quellen und verantwortliches Publizieren.",
      teamEyebrow: "Team",
      teamTitle: "Kernteam",
      team: [
        {
          name: "Tobias Göppert",
          role: "Mitgründer & redaktionelle Leitung",
          text: "Hat CYRI mitgegründet und leitet Artikelstrategie, öffentliche Positionierung, redaktionelle Standards und quellenbasierte Klimaartikel.",
        },
        {
          name: "Jarne Bub",
          role: "Mitgründer & Organisation",
          text: "Hat CYRI mitgegründet und unterstützt Artikelplanung, Veröffentlichungsabläufe, Organisation und Qualitätskontrolle.",
        },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "CYRI kontaktieren.",
      intro:
        "Melde dich mit Fragen, Medienanfragen, Artikelhinweisen oder allgemeinen Nachrichten.",
      name: "Name",
      namePlaceholder: "Dein Name",
      email: "E-Mail",
      emailPlaceholder: "deine.email@example.com",
      message: "Nachricht",
      messagePlaceholder: "Beschreibe, worum es in deiner Nachricht geht.",
      submit: "Nachricht senden",
      success: "Danke. Deine Nachricht wurde gespeichert und kann vom CYRI-Team geprüft werden.",
      error: "Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.",
      panelEyebrow: "Kontakt",
      panelTitle: "Fragen und Artikelhinweise.",
      panelText:
        "CYRI liest Nachrichten zu Artikeln, Klimathemen, Medienfragen und allgemeinem Feedback.",
    },
    publish: {
      eyebrow: "Publizieren",
      title: "Einen CYRI-Artikel veröffentlichen.",
      intro: "Füge einen neuen Artikel zu Klima- oder Meeresschutz über den geschützten Backend-Editor hinzu.",
      panelEyebrow: "Editor-Zugang",
      panelTitle: "Geschütztes Veröffentlichungsbackend.",
      panelText:
        "Dieser Editor speichert Artikel auf dem Server, damit veröffentlichte Beiträge für alle Besucher verfügbar sind.",
      password: "Passwort",
      passwordPlaceholder: "Editor-Passwort eingeben",
      unlock: "Editor entsperren",
      loginSuccess: "Editor entsperrt.",
      loginError: "Falsches Passwort.",
      backendError: "Das Backend ist nicht erreichbar. Starte den Node-Server oder lade die PHP-Backend-Dateien hoch.",
      titleDe: "Deutscher Titel",
      titleDePlaceholder: "Beispiel: Warum Meeresschutz Klimaschutz ist",
      titleEn: "Englischer Titel",
      titleEnPlaceholder: "Optionaler englischer Titel",
      category: "Kategorie",
      date: "Artikeldatum",
      publication: "Veröffentlichung",
      publishNow: "Sofort veröffentlichen",
      publishLater: "Für später planen",
      scheduleTime: "Launch-Datum und Uhrzeit",
      scheduleHint: "Es gilt die lokale Zeitzone deines Geräts.",
      summaryDe: "Deutsche Zusammenfassung",
      summaryDePlaceholder: "Kurze, klare Zusammenfassung für die Artikelkarte.",
      summaryEn: "Englische Zusammenfassung",
      summaryEnPlaceholder: "Optionale englische Zusammenfassung.",
      bodyDe: "Deutscher Artikeltext",
      bodyDePlaceholder: "Schreibe den Artikeltext hier.",
      bodyEn: "Englischer Artikeltext",
      bodyEnPlaceholder: "Optionaler englischer Artikeltext.",
      translate: "Deutschen Artikel mit KI übersetzen",
      translating: "Artikel wird übersetzt...",
      translateSuccess: "Englischer Titel, Zusammenfassung und Artikeltext wurden ausgefüllt.",
      translateMissing: "Fülle zuerst den deutschen Titel, die Zusammenfassung und den Artikeltext aus.",
      translateNotConfigured: "Die KI-Übersetzung ist auf dem Server noch nicht eingerichtet.",
      translateError: "Der Artikel konnte nicht übersetzt werden. Bitte versuche es später erneut.",
      cover: "Coverfoto",
      ownImage: "Eigenes Foto hochladen",
      ownImageHint: "Optional. JPG, PNG oder WebP; das Bild wird vor dem Upload optimiert.",
      chooseImage: "Foto auswählen",
      removeImage: "Foto entfernen",
      imageCredit: "Bildnachweis",
      imageCreditPlaceholder: "Beispiel: Tobias Göppert / CYRI",
      imageTooLarge: "Das ausgewählte Bild ist zu groß oder konnte nicht verarbeitet werden.",
      uploadingImage: "Foto wird optimiert und hochgeladen...",
      submit: "Artikel veröffentlichen",
      scheduleSubmit: "Artikel einplanen",
      success: "Artikel veröffentlicht. Er erscheint jetzt im Artikelbereich.",
      scheduledSuccess: "Artikel eingeplant. Er erscheint automatisch zum ausgewählten Zeitpunkt.",
      error: "Der Artikel konnte nicht veröffentlicht werden. Bitte melde dich erneut an oder versuche es später.",
    },
    legal: {
      imprintEyebrow: "Impressum",
      imprintTitle: "Impressum",
      imprintIntro:
        "Rechtliche Angaben für CYRI nach den deutschen Anforderungen zur Anbieterkennzeichnung.",
      providerEyebrow: "Angaben gemäß § 5 DDG",
      providerTitle: "Anbieter",
      projectLabel: "Projekt",
      operatorLabel: "Betreiber",
      statusLabel: "Status",
      statusText:
        "Unabhängige jugendgeführte Initiative im Aufbau; kein eingetragener Verein, keine registrierte NGO.",
      addressLabel: "Anschrift",
      addressText: "[Vollständige ladungsfähige Anschrift vor öffentlichem Launch ergänzen.]",
      emailLabel: "E-Mail",
      editorialEyebrow: "Redaktionelle Verantwortung",
      editorialTitle: "Verantwortlich nach § 18 Abs. 2 MStV",
      editorialText:
        "Tobias Göppert und Jarne Bub sind für redaktionelle Artikelinhalte verantwortlich. Eine vollständige Anschrift der verantwortlichen Person muss vor einem öffentlichen Launch ergänzt werden.",
      liabilityEyebrow: "Haftungshinweis",
      liabilityTitle: "Haftung für Inhalte",
      liabilityContent:
        "CYRI erstellt Artikelinhalte mit Sorgfalt. Eine Gewähr für Richtigkeit, Vollständigkeit, Aktualität oder Eignung für einen bestimmten Zweck wird jedoch nicht übernommen. Die Inhalte dienen der allgemeinen Information und ersetzen keine professionelle Beratung. Eine Haftung ist im gesetzlich zulässigen Umfang ausgeschlossen. Zwingende gesetzliche Haftungstatbestände, insbesondere für Vorsatz, grobe Fahrlässigkeit sowie Schäden aus der Verletzung von Leben, Körper oder Gesundheit, bleiben unberührt.",
      linksTitle: "Haftung für externe Links",
      linksText:
        "Externe Links führen zu Inhalten Dritter. Für diese Inhalte sind die jeweiligen Anbieter verantwortlich. Verlinkte Seiten wurden zum Zeitpunkt der Verlinkung auf offensichtliche Rechtsverstöße geprüft. Sobald CYRI rechtswidrige Inhalte bekannt werden, werden entsprechende Links entfernt.",
      copyrightTitle: "Urheberrecht und Bildnachweise",
      copyrightText:
        "Texte, Layout und eigene CYRI-Inhalte sind urheberrechtlich geschützt, sofern nicht anders angegeben. Bilder Dritter werden mit Quellen- und Lizenzhinweisen direkt am Bild oder in der Dokumentation verwendet.",
      privacyEyebrow: "Datenschutz",
      privacyTitle: "Datenschutzhinweis",
      privacyIntro:
        "Diese Website sendet Kontaktanfragen und geschützte Veröffentlichungsanfragen an das CYRI-Backend.",
      localDataTitle: "Serverdaten",
      localDataText:
        "Kontaktanfragen werden zur Bearbeitung auf dem Server gespeichert. Veröffentlichte Artikel werden im Artikelbackend gespeichert. Fragen im Recherche-Tool werden zur Beantwortung an den konfigurierten KI-Anbieter übermittelt. Eine vollständige Datenschutzerklärung sollte vor dem öffentlichen Launch finalisiert werden.",
    },
    footer: {
      statement: "Jugendgeführte Klimaartikel für eine nachhaltigere Zukunft.",
      language: "Sprache",
      social: "Social Media",
      imprint: "Impressum",
      privacy: "Datenschutz",
    },
  },
};

const state = {
  lang: localStorage.getItem("cyri-language") || (navigator.language.startsWith("de") ? "de" : "en"),
  page: "home",
  anchor: null,
  filter: "all",
  activeArticleId: null,
  publisherToken: sessionStorage.getItem(PUBLISH_SESSION_KEY) || "",
  publisherUnlocked: Boolean(sessionStorage.getItem(PUBLISH_SESSION_KEY)),
  publishedArticles: [],
  customImagePreviewUrl: "",
};

const routes = new Set([
  "home",
  "articles",
  "research",
  "about",
  "publish",
  "contact",
  "imprint",
  "privacy",
]);

function t(path) {
  return path.split(".").reduce((value, key) => value?.[key], content[state.lang]) || "";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (options.auth) {
    headers.Authorization = `Bearer ${state.publisherToken}`;
  }

  const requestOptions = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };
  let fallbackError = null;

  for (const base of API_BASES) {
    const url = base.endsWith("=") ? `${base}${encodeURIComponent(path)}` : `${base}${path}`;

    try {
      const response = await fetch(url, requestOptions);
      const isJson = response.headers.get("content-type")?.includes("application/json");
      const payload = isJson ? await response.json().catch(() => ({})) : {};

      if (response.ok && isJson) {
        return payload;
      }

      const error = new Error(payload.error || "Request failed.");
      error.status = response.status;
      fallbackError = error;

      if (response.status !== 404 && response.status !== 405 && isJson) {
        throw error;
      }
    } catch (error) {
      fallbackError = error;

      if (error.status && error.status !== 404 && error.status !== 405) {
        throw error;
      }
    }
  }

  throw fallbackError || new Error("Backend is not reachable.");
}

async function loadArticlesFromBackend() {
  try {
    const payload = await apiRequest("/articles");
    state.publishedArticles = Array.isArray(payload.articles) ? payload.articles : [];
    renderArticles();
    if (state.activeArticleId) updateArticleModal();
    return true;
  } catch {
    state.publishedArticles = [];
    renderArticles();
    return false;
  }
}

async function loadStaticArticles() {
  try {
    const response = await fetch("content/articles.json?v=20260607-3", { cache: "no-cache" });
    if (!response.ok) throw new Error("Static article corpus is not available.");
    const payload = await response.json();
    articles.splice(0, articles.length, ...(Array.isArray(payload) ? payload : []));
    renderArticles();
    if (state.activeArticleId) updateArticleModal();
    return true;
  } catch {
    articles.splice(0, articles.length);
    renderArticles();
    return false;
  }
}

function allArticles() {
  const uniqueArticles = new Map();
  [...state.publishedArticles, ...articles].forEach((article) => {
    if (article?.id && !uniqueArticles.has(article.id)) {
      uniqueArticles.set(article.id, article);
    }
  });
  return [...uniqueArticles.values()];
}

function sortedArticles() {
  return allArticles().sort((a, b) => {
    const timeA = Date.parse(a.publishAt || `${a.date}T12:00:00`);
    const timeB = Date.parse(b.publishAt || `${b.date}T12:00:00`);
    return timeB - timeA;
  });
}

function getCategory(id) {
  return categories.find((category) => category.id === id) || categories[0];
}

function getPhoto(id) {
  return photoSources.find((photo) => photo.id === id) || photoSources[0];
}

function getArticlePhoto(article) {
  if (String(article.imageId || "").startsWith("upload:")) {
    const filename = String(article.imageId).slice("upload:".length);
    return {
      src: `uploads/${encodeURIComponent(filename)}`,
      credit: article.imageCredit || "CYRI",
      sourceUrl: "",
      label: {
        en: "Article cover photo",
        de: "Artikel-Coverfoto",
      },
    };
  }

  return getPhoto(article.imageId);
}

function renderPhotoCredit(photo) {
  const credit = escapeHtml(photo.credit || "CYRI");
  if (!photo.sourceUrl) return credit;
  return `<a href="${escapeHtml(photo.sourceUrl)}" target="_blank" rel="noreferrer">${credit}</a>`;
}

function formatDate(date) {
  const locale = state.lang === "de" ? "de-DE" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function toLocalDateTimeValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function updatePublishScheduleControls() {
  const later = document.querySelector('input[name="publishMode"][value="later"]')?.checked;
  const timeWrap = document.querySelector("[data-publish-time-wrap]");
  const timeInput = document.querySelector("[data-publish-at]");
  const submitButton = document.querySelector("[data-publish-submit]");
  const now = new Date();

  if (!timeWrap || !timeInput || !submitButton) return;

  timeWrap.hidden = !later;
  timeInput.required = Boolean(later);
  timeInput.min = toLocalDateTimeValue(now);

  if (later && !timeInput.value) {
    timeInput.value = toLocalDateTimeValue(new Date(now.getTime() + 60 * 60 * 1000));
  }

  submitButton.textContent = t(later ? "publish.scheduleSubmit" : "publish.submit");
}

function updateStaticText() {
  document.documentElement.lang = state.lang;
  updateSeo();

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = t(element.dataset.i18nAlt);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langButton === state.lang);
    button.setAttribute("aria-pressed", String(button.dataset.langButton === state.lang));
  });
}

function updateSeo() {
  const seo = content[state.lang].seo.pages[state.page] || content[state.lang].seo;
  document.title = seo.title;
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (description) description.content = seo.description;
  if (ogTitle) ogTitle.content = seo.title;
  if (ogDescription) ogDescription.content = seo.description;
}

function renderMissionFocus() {
  const container = document.querySelector("[data-mission-focus]");
  container.innerHTML = t("mission.focus")
    .map(
      (item, index) => `
        <article class="focus-card">
          <span class="focus-index">${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");
}

function localizedArticleValue(article, field) {
  return article[field]?.[state.lang] || article[field]?.de || article[field]?.en || "";
}

function renderEmptyArticleState(title, text) {
  return `
    <article class="empty-card">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function renderArticleCard(article, featured = false) {
  const category = getCategory(article.category);
  const photo = getArticlePhoto(article);
  return `
    <article class="article-card${featured ? " article-card-featured" : ""}">
      <figure class="article-photo">
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.label[state.lang])}" loading="lazy" />
        <figcaption>${renderPhotoCredit(photo)}</figcaption>
      </figure>
      <div class="article-meta">
        <span class="article-category">${escapeHtml(category[state.lang])}</span>
        <span aria-hidden="true">-</span>
        <time datetime="${article.date}">${formatDate(article.date)}</time>
      </div>
      <h3>${escapeHtml(localizedArticleValue(article, "title"))}</h3>
      <p>${escapeHtml(localizedArticleValue(article, "summary"))}</p>
      <button class="card-button" type="button" data-article-id="${escapeHtml(article.id)}">
        ${escapeHtml(t("articles.readMore"))}
      </button>
    </article>
  `;
}

function renderArticles() {
  const sorted = sortedArticles();
  const homepageArticles = sorted.slice(0, HOMEPAGE_ARTICLE_COUNT);
  const newest = sorted.slice(0, FEATURED_ARTICLE_COUNT);
  const older = sorted.slice(FEATURED_ARTICLE_COUNT);
  const homepageContainer = document.querySelector("[data-latest-articles]");
  const newestContainer = document.querySelector("[data-articles-newest]");
  const olderContainer = document.querySelector("[data-articles-older]");

  homepageContainer.innerHTML = homepageArticles.length
    ? homepageArticles.map((article) => renderArticleCard(article)).join("")
    : renderEmptyArticleState(t("articles.emptyLatest"), t("articles.emptyLatestHint"));
  newestContainer.innerHTML = newest.length
    ? newest.map((article) => renderArticleCard(article, true)).join("")
    : renderEmptyArticleState(t("articles.emptyNewest"), t("articles.emptyLatestHint"));

  const filteredOlder =
    state.filter === "all" ? older : older.filter((article) => article.category === state.filter);

  olderContainer.innerHTML = filteredOlder.length
    ? filteredOlder.map((article) => renderArticleCard(article)).join("")
    : `<p class="empty-state">${escapeHtml(t("articles.noResults"))}</p>`;
}

function renderFilters() {
  const container = document.querySelector("[data-article-filters]");
  const filterItems = [{ id: "all", label: t("articles.filters.all") }].concat(
    categories.map((category) => ({ id: category.id, label: category[state.lang] }))
  );
  container.innerHTML = filterItems
    .map(
      (item) => `
        <button class="filter-button${item.id === state.filter ? " is-active" : ""}" type="button" data-filter="${item.id}">
          ${escapeHtml(item.label)}
        </button>
      `
    )
    .join("");
}

function renderTeam() {
  const container = document.querySelector("[data-team]");
  container.innerHTML = t("about.team")
    .map(
      (member) => `
        <article class="team-card">
          <span class="team-initial" aria-hidden="true">${escapeHtml(member.name.charAt(0))}</span>
          <h3>${escapeHtml(member.name)}</h3>
          <p class="article-category">${escapeHtml(member.role)}</p>
          <p>${escapeHtml(member.text)}</p>
        </article>
      `
    )
    .join("");
}

function renderPublishTools() {
  const categorySelect = document.querySelector("[data-publish-category]");
  const imagePicker = document.querySelector("[data-publish-images]");
  const gate = document.querySelector("[data-publish-login]");
  const form = document.querySelector("[data-publish-form]");
  const dateInput = document.querySelector("[data-publish-date]");

  if (categorySelect) {
    const current = categorySelect.value || "policy";
    categorySelect.innerHTML = categories
      .map(
        (category) => `
          <option value="${escapeHtml(category.id)}"${category.id === current ? " selected" : ""}>
            ${escapeHtml(category[state.lang])}
          </option>
        `
      )
      .join("");
  }

  if (imagePicker) {
    const selected = imagePicker.querySelector("input:checked")?.value || photoSources[0].id;
    imagePicker.innerHTML = photoSources
      .map(
        (photo, index) => `
          <label class="image-option">
            <input
              type="radio"
              name="imageId"
              value="${escapeHtml(photo.id)}"
              ${photo.id === selected || (!selected && index === 0) ? "checked" : ""}
            />
            <span class="image-option-frame">
              <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.label[state.lang])}" loading="lazy" />
              <span class="photo-credit">${escapeHtml(photo.credit)}</span>
            </span>
            <span class="image-option-text">
              <strong>${escapeHtml(photo.label[state.lang])}</strong>
              <small>${escapeHtml(photo.license)}</small>
            </span>
          </label>
        `
      )
      .join("");
  }

  if (gate && form) {
    gate.hidden = state.publisherUnlocked;
    form.hidden = !state.publisherUnlocked;
  }

  if (dateInput && !dateInput.value) {
    dateInput.value = toLocalDateTimeValue(new Date()).slice(0, 10);
  }

  updatePublishScheduleControls();
}

function clearCustomImage() {
  const input = document.querySelector("[data-custom-image]");
  const preview = document.querySelector("[data-custom-image-preview]");
  const previewImage = document.querySelector("[data-custom-image-preview-img]");
  const creditWrap = document.querySelector("[data-custom-credit-wrap]");
  const creditInput = document.querySelector("[data-custom-image-credit]");

  if (state.customImagePreviewUrl) {
    URL.revokeObjectURL(state.customImagePreviewUrl);
    state.customImagePreviewUrl = "";
  }

  if (input) input.value = "";
  if (preview) preview.hidden = true;
  if (previewImage) previewImage.removeAttribute("src");
  if (creditWrap) creditWrap.hidden = true;
  if (creditInput) creditInput.value = "";
}

function showCustomImage(file) {
  const preview = document.querySelector("[data-custom-image-preview]");
  const previewImage = document.querySelector("[data-custom-image-preview-img]");
  const creditWrap = document.querySelector("[data-custom-credit-wrap]");

  if (state.customImagePreviewUrl) {
    URL.revokeObjectURL(state.customImagePreviewUrl);
  }

  state.customImagePreviewUrl = URL.createObjectURL(file);
  previewImage.src = state.customImagePreviewUrl;
  previewImage.alt = file.name;
  preview.hidden = false;
  creditWrap.hidden = false;
}

function loadBrowserImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image could not be decoded."));
    };
    image.src = url;
  });
}

function canvasToBlob(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Image could not be encoded."))),
      "image/jpeg",
      quality
    );
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Image could not be read."));
    reader.readAsDataURL(blob);
  });
}

async function optimizeImage(file) {
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowedTypes.has(file.type) || file.size > 15 * 1024 * 1024) {
    throw new Error("Unsupported image.");
  }

  const image = await loadBrowserImage(file);
  if (
    image.naturalWidth < 1 ||
    image.naturalHeight < 1 ||
    image.naturalWidth > 12000 ||
    image.naturalHeight > 12000 ||
    image.naturalWidth * image.naturalHeight > 80000000
  ) {
    throw new Error("Image dimensions are unsupported.");
  }

  const maxDimension = 2000;
  const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d", { alpha: false });

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  let quality = 0.86;
  let blob = await canvasToBlob(canvas, quality);
  while (blob.size > 2.5 * 1024 * 1024 && quality > 0.58) {
    quality -= 0.08;
    blob = await canvasToBlob(canvas, quality);
  }

  if (blob.size > 2.5 * 1024 * 1024) {
    throw new Error("Optimized image is too large.");
  }

  return blobToDataUrl(blob);
}

async function uploadCustomImage(file, credit) {
  const dataUrl = await optimizeImage(file);
  return apiRequest("/uploads", {
    method: "POST",
    auth: true,
    body: {
      dataUrl,
      credit: credit || "CYRI",
    },
  });
}

function renderDynamicContent() {
  renderMissionFocus();
  renderFilters();
  renderArticles();
  renderTeam();
  renderPublishTools();
  if (state.activeArticleId) updateArticleModal();
}

function parseRoute() {
  const raw = window.location.hash.replace("#", "") || "home";
  if (raw === "mission") return { page: "home", anchor: "mission" };
  if (routes.has(raw)) return { page: raw, anchor: null };
  return { page: "home", anchor: null };
}

function showPage(shouldScroll = true) {
  document.querySelectorAll("[data-page]").forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === state.page);
  });

  const activeKey = state.anchor || state.page;
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.navLink === activeKey);
  });

  updateSeo();

  if (!shouldScroll) return;

  requestAnimationFrame(() => {
    if (state.anchor === "mission") {
      document.querySelector("[data-anchor='mission']").scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function syncRoute(shouldScroll = true) {
  const route = parseRoute();
  state.page = route.page;
  state.anchor = route.anchor;
  showPage(shouldScroll);
}

function closeMenu() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  header.classList.remove("is-menu-open");
  toggle.setAttribute("aria-expanded", "false");
}

function createArticleId(title) {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
  return `${slug || "cyri-article"}-${Date.now().toString(36)}`;
}

function buildPublishedArticle(form) {
  const data = new FormData(form);
  const titleDe = String(data.get("titleDe") || "").trim();
  const titleEn = String(data.get("titleEn") || "").trim() || titleDe;
  const summaryDe = String(data.get("summaryDe") || "").trim();
  const summaryEn = String(data.get("summaryEn") || "").trim() || summaryDe;
  const bodyDe = String(data.get("bodyDe") || "").trim();
  const bodyEn = String(data.get("bodyEn") || "").trim() || bodyDe;
  const publishMode = String(data.get("publishMode") || "now");
  const scheduledValue = String(data.get("publishAt") || "");
  const publishAt =
    publishMode === "later" && scheduledValue
      ? new Date(scheduledValue).toISOString()
      : new Date().toISOString();

  return {
    id: createArticleId(titleEn || titleDe),
    date: String(data.get("date") || new Date().toISOString().slice(0, 10)),
    category: String(data.get("category") || "policy"),
    imageId: String(data.get("imageId") || photoSources[0].id),
    publishAt,
    title: {
      en: titleEn,
      de: titleDe,
    },
    summary: {
      en: summaryEn,
      de: summaryDe,
    },
    body: {
      en: bodyEn,
      de: bodyDe,
    },
  };
}

function openArticle(id) {
  state.activeArticleId = id;
  updateArticleModal();
  const modal = document.querySelector("[data-article-modal]");
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  document.querySelector("[data-modal-close]").focus();
}

function closeArticle() {
  state.activeArticleId = null;
  const modal = document.querySelector("[data-article-modal]");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function renderArticleBody(body) {
  return body
    .split(/\n{2,}/)
    .map((block) => {
      const heading = block.match(/^##\s+(.+)$/);
      return heading
        ? `<h3>${escapeHtml(heading[1])}</h3>`
        : `<p>${escapeHtml(block)}</p>`;
    })
    .join("");
}

function updateArticleModal() {
  const article = allArticles().find((item) => item.id === state.activeArticleId);
  if (!article) return;
  const category = getCategory(article.category);
  const photo = getArticlePhoto(article);
  const body = localizedArticleValue(article, "body");
  const photoWrap = document.querySelector("[data-modal-photo-wrap]");
  const photoImage = document.querySelector("[data-modal-photo]");
  const photoCredit = document.querySelector("[data-modal-credit]");
  const sourcesWrap = document.querySelector("[data-modal-sources]");
  const sourcesList = document.querySelector("[data-modal-source-list]");
  document.querySelector("[data-modal-category]").textContent = category[state.lang];
  document.querySelector("[data-modal-title]").textContent = localizedArticleValue(article, "title");
  document.querySelector("[data-modal-date]").textContent = formatDate(article.date);
  document.querySelector("[data-modal-date]").dateTime = article.date;
  document.querySelector("[data-modal-summary]").textContent = localizedArticleValue(article, "summary");
  photoWrap.hidden = false;
  photoImage.src = photo.src;
  photoImage.alt = photo.label[state.lang];
  photoCredit.innerHTML = renderPhotoCredit(photo);
  document.querySelector("[data-modal-body]").innerHTML = body ? renderArticleBody(body) : "";

  const sources = Array.isArray(article.sources) ? article.sources : [];
  sourcesWrap.hidden = sources.length === 0;
  sourcesList.innerHTML = sources
    .map(
      (source) => `
        <li>
          <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">
            ${escapeHtml(source.label)}
          </a>
        </li>
      `
    )
    .join("");
}

function observeReveals() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

document.addEventListener("click", (event) => {
  const languageButton = event.target.closest("[data-lang-button]");
  if (languageButton) {
    state.lang = languageButton.dataset.langButton;
    localStorage.setItem("cyri-language", state.lang);
    updateStaticText();
    renderDynamicContent();
    resetResearchAnswer();
    return;
  }

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    state.filter = filterButton.dataset.filter;
    renderFilters();
    renderArticles();
    return;
  }

  const articleButton = event.target.closest("[data-article-id]");
  if (articleButton) {
    openArticle(articleButton.dataset.articleId);
    return;
  }

  if (event.target.closest("[data-modal-close]")) {
    closeArticle();
    return;
  }

  const modal = document.querySelector("[data-article-modal]");
  if (!modal.hidden && event.target === modal) {
    closeArticle();
    return;
  }

  const internalLink = event.target.closest('a[href^="#"]');
  if (internalLink) {
    const target = internalLink.getAttribute("href");
    if (target.length > 1) {
      event.preventDefault();
      closeMenu();
      if (window.location.hash === target) {
        syncRoute(true);
      } else {
        window.location.hash = target;
      }
    }
  }
});

document.querySelector("[data-menu-toggle]").addEventListener("click", () => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const isOpen = header.classList.toggle("is-menu-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('input[name="publishMode"]').forEach((input) => {
  input.addEventListener("change", updatePublishScheduleControls);
});

document.querySelector("[data-publish-at]").addEventListener("change", (event) => {
  const scheduled = new Date(event.currentTarget.value);
  const dateInput = document.querySelector("[data-publish-date]");
  if (!Number.isNaN(scheduled.getTime()) && dateInput) {
    dateInput.value = toLocalDateTimeValue(scheduled).slice(0, 10);
  }
});

document.querySelector("[data-custom-image]").addEventListener("change", (event) => {
  const file = event.currentTarget.files?.[0];
  const status = document.querySelector("[data-publish-status]");
  status.textContent = "";

  if (!file) {
    clearCustomImage();
    return;
  }

  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowedTypes.has(file.type) || file.size > 15 * 1024 * 1024) {
    clearCustomImage();
    status.textContent = t("publish.imageTooLarge");
    return;
  }

  showCustomImage(file);
});

document.querySelector("[data-custom-image-remove]").addEventListener("click", () => {
  clearCustomImage();
  document.querySelector("[data-publish-status]").textContent = "";
});

document.querySelector("[data-ai-translate]").addEventListener("click", async (event) => {
  const form = document.querySelector("[data-publish-form]");
  const button = event.currentTarget;
  const status = document.querySelector("[data-translation-status]");
  const title = form.elements.titleDe.value.trim();
  const summary = form.elements.summaryDe.value.trim();
  const body = form.elements.bodyDe.value.trim();

  status.textContent = "";

  if (!title || !summary || !body) {
    status.textContent = t("publish.translateMissing");
    return;
  }

  button.disabled = true;
  button.textContent = t("publish.translating");

  try {
    const payload = await apiRequest("/translate", {
      method: "POST",
      auth: true,
      body: { title, summary, body },
    });
    form.elements.titleEn.value = payload.translation.title;
    form.elements.summaryEn.value = payload.translation.summary;
    form.elements.bodyEn.value = payload.translation.body;
    status.textContent = t("publish.translateSuccess");
  } catch (error) {
    if (error.status === 401) {
      state.publisherUnlocked = false;
      state.publisherToken = "";
      sessionStorage.removeItem(PUBLISH_SESSION_KEY);
      renderPublishTools();
    }
    status.textContent =
      error.status === 503 ? t("publish.translateNotConfigured") : t("publish.translateError");
  } finally {
    button.disabled = false;
    button.textContent = t("publish.translate");
  }
});

function resetResearchAnswer() {
  const answer = document.querySelector("[data-research-answer]");
  const answerCopy = document.querySelector("[data-research-answer-copy]");
  const references = document.querySelector("[data-research-references]");
  const referenceList = document.querySelector("[data-research-reference-list]");
  if (answer) answer.hidden = true;
  if (answerCopy) answerCopy.innerHTML = "";
  if (references) references.hidden = true;
  if (referenceList) referenceList.innerHTML = "";
}

document.querySelector("[data-research-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const question = String(new FormData(form).get("question") || "").trim();
  const submitButton = form.querySelector("button[type='submit']");
  const status = document.querySelector("[data-research-status]");
  const answer = document.querySelector("[data-research-answer]");
  const answerCopy = document.querySelector("[data-research-answer-copy]");
  const references = document.querySelector("[data-research-references]");
  const referenceList = document.querySelector("[data-research-reference-list]");

  if (question.length < 5) {
    status.textContent = t("research.missing");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = t("research.asking");
  status.textContent = t("research.asking");
  resetResearchAnswer();

  try {
    const payload = await apiRequest("/research", {
      method: "POST",
      body: { question, language: state.lang },
    });
    const paragraphs = String(payload.answer || "")
      .split(/\n{2,}/)
      .filter(Boolean);
    answerCopy.innerHTML = paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

    const referencedArticles = Array.isArray(payload.articles) ? payload.articles : [];
    referenceList.innerHTML = referencedArticles
      .map(
        (article) => `
          <button class="research-reference" type="button" data-article-id="${escapeHtml(article.id)}">
            <span>${escapeHtml(article.title || "")}</span>
            <small>${escapeHtml(t("research.readArticle"))}</small>
          </button>
        `
      )
      .join("");
    references.hidden = referencedArticles.length === 0;
    answer.hidden = false;
    status.textContent = "";
  } catch (error) {
    if (error.status === 503) {
      status.textContent = t("research.unavailable");
    } else if (error.status === 429) {
      status.textContent = t("research.rateLimited");
    } else {
      status.textContent = t("research.error");
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = t("research.submit");
  }
});

document.querySelector("[data-contact-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const status = document.querySelector("[data-form-status]");
  const data = new FormData(form);

  submitButton.disabled = true;
  status.textContent = "";

  try {
    await apiRequest("/contact", {
      method: "POST",
      body: {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
      },
    });
    form.reset();
    status.textContent = t("contact.success");
  } catch {
    status.textContent = t("contact.error");
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector("[data-publish-login]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const passwordInput = document.querySelector("[data-publish-password]");
  const status = document.querySelector("[data-publish-login-status]");
  const submitButton = event.currentTarget.querySelector("button[type='submit']");

  submitButton.disabled = true;
  status.textContent = "";

  try {
    const payload = await apiRequest("/auth/publish", {
      method: "POST",
      body: { password: passwordInput.value },
    });
    state.publisherUnlocked = true;
    state.publisherToken = payload.token;
    sessionStorage.setItem(PUBLISH_SESSION_KEY, payload.token);
    passwordInput.value = "";
    status.textContent = t("publish.loginSuccess");
    renderPublishTools();
  } catch (error) {
    status.textContent = error.status === 401 ? t("publish.loginError") : t("publish.backendError");
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector("[data-publish-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const status = document.querySelector("[data-publish-status]");
  const customImage = document.querySelector("[data-custom-image]").files?.[0];
  const imageCredit = document.querySelector("[data-custom-image-credit]").value.trim();
  let customImageUploaded = !customImage;
  let article;

  submitButton.disabled = true;
  status.textContent = "";

  try {
    article = buildPublishedArticle(form);

    if (customImage) {
      status.textContent = t("publish.uploadingImage");
      const upload = await uploadCustomImage(customImage, imageCredit);
      article.imageId = upload.imageId;
      article.imageCredit = upload.credit;
      customImageUploaded = true;
    }

    const payload = await apiRequest("/articles", {
      method: "POST",
      auth: true,
      body: article,
    });
    if (!payload.scheduled) {
      state.publishedArticles = [payload.article, ...state.publishedArticles];
    }
    form.reset();
    clearCustomImage();
    document.querySelector("[data-publish-date]").value = toLocalDateTimeValue(new Date()).slice(0, 10);
    status.textContent = t(payload.scheduled ? "publish.scheduledSuccess" : "publish.success");
    renderDynamicContent();
  } catch (error) {
    if (error.status === 401) {
      state.publisherUnlocked = false;
      state.publisherToken = "";
      sessionStorage.removeItem(PUBLISH_SESSION_KEY);
      renderPublishTools();
    }
    status.textContent =
      customImage && !customImageUploaded && error.status !== 401
        ? t("publish.imageTooLarge")
        : t("publish.error");
  } finally {
    submitButton.disabled = false;
  }
});

window.addEventListener("hashchange", () => syncRoute(true));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !document.querySelector("[data-article-modal]").hidden) {
    closeArticle();
  }
});

updateStaticText();
renderDynamicContent();
syncRoute(false);
observeReveals();
loadStaticArticles();
loadArticlesFromBackend().then((backendAvailable) => {
  if (backendAvailable) {
    setInterval(loadArticlesFromBackend, 60 * 1000);
  }
});
