const categories = [
  { id: "policy", en: "Climate Policy", de: "Klimapolitik" },
  { id: "energy", en: "Renewable Energy", de: "Erneuerbare Energie" },
  { id: "biodiversity", en: "Biodiversity", de: "Biodiversität" },
  { id: "cities", en: "Sustainable Cities", de: "Nachhaltige Städte" },
  { id: "marine", en: "Marine Protection", de: "Meeresschutz" },
];

const articles = [];

const learningTopics = [
  {
    id: "oceans",
    articleId: "seegraswiesen-klima-kuesten-arten-2026",
    imageId: "seagrass-meadow",
    title: {
      en: "Oceans & coasts",
      de: "Meere & Küsten",
    },
    intro: {
      en: "Explore how marine ecosystems protect coastlines, store carbon and support biodiversity.",
      de: "Entdecke, wie Meeresökosysteme Küsten schützen, Kohlenstoff speichern und Artenvielfalt fördern.",
    },
    question: {
      en: "How can an underwater meadow help the climate?",
      de: "Wie kann eine Unterwasserwiese dem Klima helfen?",
    },
    concepts: {
      en: ["Blue carbon", "Coastal protection", "Biodiversity"],
      de: ["Blue Carbon", "Küstenschutz", "Biodiversität"],
    },
  },
  {
    id: "climate",
    articleId: "korallenbleiche-erklaert-2026",
    imageId: "coral-bleaching-2023",
    title: {
      en: "Climate & ecosystems",
      de: "Klima & Ökosysteme",
    },
    intro: {
      en: "Understand how warming changes sensitive ecosystems and why local protection still matters.",
      de: "Verstehe, wie Erwärmung empfindliche Ökosysteme verändert und warum lokaler Schutz trotzdem wichtig ist.",
    },
    question: {
      en: "Why does heat make coral reefs turn white?",
      de: "Warum lässt Hitze Korallenriffe weiß werden?",
    },
    concepts: {
      en: ["Marine heatwaves", "Resilience", "Climate action"],
      de: ["Marine Hitzewellen", "Widerstandskraft", "Klimaschutz"],
    },
  },
  {
    id: "cities",
    articleId: "schwammstadt-regenwasser-hitze-2026",
    imageId: "sponge-city-rain-garden",
    title: {
      en: "Cities & adaptation",
      de: "Städte & Anpassung",
    },
    intro: {
      en: "Learn how urban planning can respond to heat, heavy rain and drought at the same time.",
      de: "Lerne, wie Stadtplanung gleichzeitig auf Hitze, Starkregen und Trockenheit reagieren kann.",
    },
    question: {
      en: "What changes when a city treats rain as a resource?",
      de: "Was verändert sich, wenn eine Stadt Regen als Ressource behandelt?",
    },
    concepts: {
      en: ["Rainwater storage", "Urban heat", "Climate adaptation"],
      de: ["Regenwasserspeicherung", "Stadthitze", "Klimaanpassung"],
    },
  },
];

const quizQuestions = [
  {
    question: {
      en: "What does coral bleaching mean?",
      de: "Was bedeutet Korallenbleiche?",
    },
    options: {
      en: [
        "The coral has always died",
        "The coral has expelled its symbiotic algae under stress",
        "The reef is covered by white sand",
      ],
      de: [
        "Die Koralle ist immer bereits gestorben",
        "Die Koralle hat unter Stress ihre symbiotischen Algen abgestoßen",
        "Das Riff ist von weißem Sand bedeckt",
      ],
    },
    correct: 1,
    explanation: {
      en: "Bleached corals are severely stressed but not automatically dead. They may recover if conditions improve quickly.",
      de: "Gebleichte Korallen sind stark gestresst, aber nicht automatisch tot. Verbessern sich die Bedingungen schnell, können sie sich erholen.",
    },
  },
  {
    question: {
      en: "Where can seagrass meadows store carbon for a long time?",
      de: "Wo können Seegraswiesen Kohlenstoff langfristig speichern?",
    },
    options: {
      en: ["Mainly in the sediment", "Only in fish", "Only at the water surface"],
      de: ["Vor allem im Sediment", "Nur in Fischen", "Nur an der Wasseroberfläche"],
    },
    correct: 0,
    explanation: {
      en: "A large part of the long-term carbon storage associated with seagrass lies in the sediment beneath the plants.",
      de: "Ein großer Teil der langfristigen Kohlenstoffspeicherung von Seegras liegt im Sediment unter den Pflanzen.",
    },
  },
  {
    question: {
      en: "What is the basic idea of a sponge city?",
      de: "Was ist die Grundidee einer Schwammstadt?",
    },
    options: {
      en: [
        "Drain all rainwater immediately",
        "Store and reuse rainwater within the city",
        "Build only taller buildings",
      ],
      de: [
        "Regenwasser sofort vollständig ableiten",
        "Regenwasser in der Stadt speichern und wieder nutzen",
        "Nur höhere Gebäude bauen",
      ],
    },
    correct: 1,
    explanation: {
      en: "Sponge cities retain rainwater so it can infiltrate, evaporate or be reused instead of disappearing immediately into drains.",
      de: "Schwammstädte halten Regenwasser zurück, damit es versickern, verdunsten oder wiederverwendet werden kann.",
    },
  },
  {
    question: {
      en: "How can seagrass meadows help protect coastlines?",
      de: "Wie können Seegraswiesen Küsten schützen?",
    },
    options: {
      en: [
        "By slowing waves and stabilizing sediment",
        "By increasing wave height",
        "By removing all salt from seawater",
      ],
      de: [
        "Indem sie Wellen bremsen und Sediment stabilisieren",
        "Indem sie die Wellenhöhe vergrößern",
        "Indem sie dem Meerwasser sämtliches Salz entziehen",
      ],
    },
    correct: 0,
    explanation: {
      en: "Dense seagrass leaves slow water movement, while their roots and rhizomes help stabilize the seabed.",
      de: "Dichte Seegrasblätter bremsen die Wasserbewegung, während Wurzeln und Rhizome den Meeresboden stabilisieren.",
    },
  },
  {
    question: {
      en: "What is the main global driver of mass coral bleaching?",
      de: "Was ist der wichtigste globale Auslöser für großflächige Korallenbleiche?",
    },
    options: {
      en: ["Colder winter nights", "Prolonged heat stress in the ocean", "Normal tidal changes"],
      de: ["Kältere Winternächte", "Anhaltender Hitzestress im Meer", "Normale Gezeitenwechsel"],
    },
    correct: 1,
    explanation: {
      en: "Unusually warm water and marine heatwaves can overwhelm corals and trigger bleaching across large reef areas.",
      de: "Ungewöhnlich warmes Wasser und marine Hitzewellen können Korallen überfordern und großflächige Bleichen auslösen.",
    },
  },
  {
    question: {
      en: "Why do green spaces help cool a sponge city?",
      de: "Warum helfen Grünflächen dabei, eine Schwammstadt zu kühlen?",
    },
    options: {
      en: [
        "They create shade and support evaporation",
        "They seal the ground more strongly",
        "They prevent all air movement",
      ],
      de: [
        "Sie spenden Schatten und fördern Verdunstung",
        "Sie versiegeln den Boden stärker",
        "Sie verhindern jede Luftbewegung",
      ],
    },
    correct: 0,
    explanation: {
      en: "Trees, planted areas and stored water reduce heat through shade and evapotranspiration.",
      de: "Bäume, bepflanzte Flächen und gespeichertes Wasser mindern Hitze durch Schatten und Verdunstung.",
    },
  },
  {
    question: {
      en: "Can local reef protection replace global climate action?",
      de: "Kann lokaler Riffschutz globalen Klimaschutz ersetzen?",
    },
    options: {
      en: [
        "Yes, completely",
        "Only when reefs are very small",
        "No, but it can improve local resilience",
      ],
      de: [
        "Ja, vollständig",
        "Nur wenn Riffe sehr klein sind",
        "Nein, aber er kann die lokale Widerstandskraft verbessern",
      ],
    },
    correct: 2,
    explanation: {
      en: "Reducing pollution and physical damage can help reefs cope, but limiting ocean warming still requires global emissions cuts.",
      de: "Weniger Verschmutzung und Schäden können Riffen helfen, doch die Meereserwärmung lässt sich nur durch globale Emissionsminderung begrenzen.",
    },
  },
  {
    question: {
      en: "Why are heavily sealed city surfaces a problem during heavy rain?",
      de: "Warum sind stark versiegelte Stadtflächen bei Starkregen problematisch?",
    },
    options: {
      en: [
        "Water cannot infiltrate easily and runs off quickly",
        "They absorb every drop immediately",
        "They turn rainwater into drinking water",
      ],
      de: [
        "Wasser kann schlecht versickern und fließt schnell ab",
        "Sie nehmen jeden Tropfen sofort auf",
        "Sie verwandeln Regenwasser in Trinkwasser",
      ],
    },
    correct: 0,
    explanation: {
      en: "Concrete and asphalt limit infiltration, increasing rapid runoff and pressure on drainage systems.",
      de: "Beton und Asphalt begrenzen die Versickerung, wodurch Wasser schneller abfließt und die Kanalisation stärker belastet wird.",
    },
  },
  {
    question: {
      en: "Which statement best describes blue carbon?",
      de: "Welche Aussage beschreibt Blue Carbon am besten?",
    },
    options: {
      en: [
        "Carbon stored by coastal and marine ecosystems",
        "Carbon found only in deep-sea animals",
        "Carbon used to color seawater blue",
      ],
      de: [
        "Kohlenstoff, den Küsten- und Meeresökosysteme speichern",
        "Kohlenstoff, der nur in Tiefseetieren vorkommt",
        "Kohlenstoff, der Meerwasser blau färbt",
      ],
    },
    correct: 0,
    explanation: {
      en: "Blue carbon refers to carbon captured and stored by coastal ecosystems such as seagrass meadows, salt marshes and mangroves.",
      de: "Blue Carbon bezeichnet Kohlenstoff, den Küstenökosysteme wie Seegraswiesen, Salzwiesen und Mangroven aufnehmen und speichern.",
    },
  },
];

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
      title: "CYRI | Youth-led environmental education",
      description:
        "CYRI is a youth-led digital learning platform for climate, nature and environmental protection.",
      pages: {
        home: {
          title: "CYRI | Youth-led environmental education",
          description:
            "Explore understandable articles, interactive learning paths and educational formats on climate, nature and environmental protection.",
        },
        learn: {
          title: "Learn | CYRI",
          description:
            "Explore interactive CYRI learning paths, environmental topics and a short knowledge quiz.",
        },
        articles: {
          title: "Articles | CYRI",
          description:
            "Read CYRI articles on climate policy, renewable energy, biodiversity, marine protection and sustainable cities.",
        },
        research: {
          title: "Learning Assistant | CYRI",
          description:
            "Ask questions and receive AI-assisted answers based only on published CYRI articles.",
        },
        about: {
          title: "About | CYRI",
          description:
            "Learn about CYRI, a two-person youth-led environmental education platform currently in development in Germany.",
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
      learn: "Learn",
      articles: "Articles",
      research: "Ask CYRI",
      about: "About",
      publish: "Publish",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Youth-led environmental education",
      title: "Understand the environment. Question it. Help shape it.",
      subtitle:
        "We are building a digital youth platform for environmental education where young people publish clear articles, infographics and social media posts about climate, nature and environmental protection.",
      primaryCta: "Start learning",
      secondaryCta: "Read articles",
      imageAlt: "Bleached coral reef",
    },
    learningIntro: {
      eyebrow: "Learn actively",
      title: "From reading to understanding.",
      intro:
        "Choose a topic, ask questions and check what you have learned. CYRI connects reliable information with interactive environmental education.",
      cta: "Explore the learning platform",
      paths: [
        {
          step: "01",
          title: "Explore",
          text: "Find a clear entry point into climate, nature and environmental topics.",
        },
        {
          step: "02",
          title: "Question",
          text: "Use the CYRI assistant to ask questions about published articles.",
        },
        {
          step: "03",
          title: "Check",
          text: "Test your understanding with short knowledge checks and explanations.",
        },
      ],
    },
    mission: {
      eyebrow: "Mission",
      title: "Our Mission",
      intro: "CYRI is an independent youth-led environmental education platform based in Germany.",
      paragraphOne:
        "Our goal is to make climate science, nature conservation, environmental policy and sustainability understandable for young people and the wider public.",
      paragraphTwo:
        "We create articles, visual explainers and social media formats based on credible, traceable sources. CYRI does not conduct original research.",
      focus: [
        {
          title: "Understandable knowledge",
          text: "We turn complex environmental topics into precise, accessible learning content.",
        },
        {
          title: "Interactive learning",
          text: "Topic explorers, questions and quizzes help readers engage with information actively.",
        },
        {
          title: "Youth perspectives",
          text: "Young people shape the topics, formats and language while sources remain transparent.",
        },
      ],
    },
    latest: {
      eyebrow: "New learning content",
      title: "Latest learning articles",
      intro: "New source-based CYRI learning articles appear here automatically.",
      viewAll: "View all learning articles",
    },
    learn: {
      eyebrow: "Learning platform",
      title: "Environmental knowledge that you can explore.",
      intro:
        "Start with a question, discover the key concepts and continue with the full source-based article.",
      topicsEyebrow: "Choose a topic",
      topicsTitle: "What do you want to understand?",
      topicsAria: "Learning topics",
      journeyEyebrow: "Your learning journey",
      journeyTitle: "Learn at your own pace.",
      journeyIntro:
        "Explore a topic, open its learning article and complete the knowledge check. Your progress is saved on this device.",
      journeyProgress: "Overall progress",
      journeySaved: "Saved locally on this device",
      journeyExplored: "Topic explored",
      journeyArticle: "Learning article opened",
      journeyQuiz: "Knowledge check completed",
      journeyNext: "Recommended next step",
      journeyExploreAction: "Explore {topic}",
      journeyReadAction: "Read {topic}",
      journeyQuizAction: "Start knowledge check",
      journeyCompleteTitle: "Learning journey completed.",
      journeyCompleteText:
        "You explored every topic, opened all three learning articles and completed the knowledge check.",
      journeyReset: "Reset progress",
      journeyStatus: "{complete} of {total} steps",
      guidingQuestion: "Guiding question",
      concepts: "Key concepts",
      openArticle: "Open learning article",
      askAssistant: "Ask CYRI",
      formatsEyebrow: "Formats",
      formatsTitle: "Knowledge for different contexts.",
      formatsIntro:
        "The same topic can be explored in depth, understood visually or prepared for social media.",
      formats: [
        {
          status: "Available now",
          title: "Learning articles",
          text: "Source-based long-form explanations with clear structure and further reading.",
        },
        {
          status: "In development",
          title: "Infographics",
          text: "Visual summaries that make processes, comparisons and key figures easier to grasp.",
        },
        {
          status: "On our channels",
          title: "Social explainers",
          text: "Compact educational posts for Instagram, LinkedIn and X.",
        },
      ],
      quizEyebrow: "Knowledge check",
      quizTitle: "What stayed with you?",
      quizIntro: "Choose how deeply you want to test your knowledge.",
      quizLengthLabel: "Quiz length",
      quizLengths: [
        { value: 3, title: "Quick", text: "3 questions" },
        { value: 6, title: "Focused", text: "6 questions" },
        { value: 9, title: "Deep dive", text: "9 questions" },
      ],
      questionProgress: "Question {current} of {total}",
      correct: "Correct.",
      incorrect: "Not quite.",
      next: "Next question",
      finish: "Show result",
      resultTitle: "Your result",
      resultText: "You answered {score} of {total} questions correctly.",
      resultStrong: "Strong foundation. Continue with a new topic or ask a deeper question.",
      resultDeveloping: "A good start. The linked learning articles explain each answer in more depth.",
      restart: "Restart quiz",
    },
    articles: {
      eyebrow: "Learning articles",
      title: "Environmental topics, explained clearly.",
      intro:
        "Explore source-based CYRI articles on climate, nature, marine protection, renewable energy, biodiversity and sustainable cities.",
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
      eyebrow: "Learning assistant",
      title: "Ask questions about CYRI learning content.",
      intro:
        "Receive concise AI-assisted explanations based only on published CYRI learning articles.",
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
      unavailable: "The AI learning assistant is not configured on the server yet.",
      rateLimited: "Too many questions were submitted. Please try again in a few minutes.",
      error: "The question could not be answered. Please try again later.",
    },
    about: {
      eyebrow: "About",
      title: "A youth-led platform for environmental education.",
      intro: "CYRI is an independent youth-led digital education platform currently in development.",
      storyTitle: "Making environmental knowledge accessible and useful.",
      storyOne:
        "CYRI helps young people understand environmental topics, evaluate public debates and participate in sustainability conversations with confidence.",
      storyTwo:
        "The platform combines careful editorial work, accessible writing, transparent sourcing and interactive learning formats.",
      teamEyebrow: "Team",
      teamTitle: "Core team",
      team: [
        {
          name: "Tobias Göppert",
          role: "Co-founder & education lead",
          text: "Co-founded CYRI and leads educational direction, editorial standards, learning formats and source-based environmental content.",
        },
        {
          name: "Jarne Bub",
          role: "Co-founder & operations lead",
          text: "Co-founded CYRI and leads platform organization, publishing workflows, format development and quality control.",
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
      title: "Publish a CYRI learning article.",
      intro: "Add new source-based environmental education content with the protected editor.",
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
        "Contact messages are stored on the server for processing. Published articles are stored in the article backend. Questions entered in the learning assistant are sent to the configured AI provider for processing. A complete privacy policy should be finalized before public launch.",
    },
    footer: {
      statement: "Youth-led environmental education for a more sustainable future.",
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
      title: "CYRI | Jugendgeführte Umweltbildung",
      description:
        "CYRI ist eine jugendgeführte digitale Lernplattform für Klima-, Natur- und Umweltschutz.",
      pages: {
        home: {
          title: "CYRI | Jugendgeführte Umweltbildung",
          description:
            "Entdecke verständliche Artikel, interaktive Lernpfade und Bildungsformate zu Klima-, Natur- und Umweltschutz.",
        },
        learn: {
          title: "Lernen | CYRI",
          description:
            "Entdecke interaktive CYRI-Lernpfade, Umweltthemen und einen kurzen Wissenscheck.",
        },
        articles: {
          title: "Artikel | CYRI",
          description:
            "Lies CYRI-Artikel zu Klimapolitik, erneuerbarer Energie, Biodiversität, Meeresschutz und nachhaltigen Städten.",
        },
        research: {
          title: "Lernassistent | CYRI",
          description:
            "Stelle Fragen und erhalte KI-gestützte Antworten auf Basis veröffentlichter CYRI-Artikel.",
        },
        about: {
          title: "Über uns | CYRI",
          description:
            "Erfahre mehr über CYRI, eine zweiköpfige jugendgeführte Plattform für Umweltbildung im Aufbau in Deutschland.",
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
      learn: "Lernen",
      articles: "Artikel",
      research: "CYRI fragen",
      about: "Über uns",
      publish: "Publizieren",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Jugendgeführte Umweltbildung",
      title: "Umwelt verstehen. Hinterfragen. Mitgestalten.",
      subtitle:
        "Wir bauen eine digitale Jugendplattform für Umweltbildung auf, auf der junge Menschen verständliche Artikel, Infografiken und Social-Media-Beiträge zu Klima-, Natur- und Umweltschutz veröffentlichen.",
      primaryCta: "Jetzt lernen",
      secondaryCta: "Artikel lesen",
      imageAlt: "Gebleichter Korallenriffbereich",
    },
    learningIntro: {
      eyebrow: "Aktiv lernen",
      title: "Vom Lesen zum Verstehen.",
      intro:
        "Wähle ein Thema, stelle Fragen und überprüfe dein Wissen. CYRI verbindet verlässliche Informationen mit interaktiver Umweltbildung.",
      cta: "Lernplattform entdecken",
      paths: [
        {
          step: "01",
          title: "Entdecken",
          text: "Finde einen verständlichen Einstieg in Klima-, Natur- und Umweltthemen.",
        },
        {
          step: "02",
          title: "Nachfragen",
          text: "Stelle dem CYRI-Assistenten Fragen zu den veröffentlichten Artikeln.",
        },
        {
          step: "03",
          title: "Überprüfen",
          text: "Teste dein Verständnis mit kurzen Wissensfragen und Erklärungen.",
        },
      ],
    },
    mission: {
      eyebrow: "Mission",
      title: "Unsere Mission",
      intro: "CYRI ist eine unabhängige, jugendgeführte Plattform für Umweltbildung aus Deutschland.",
      paragraphOne:
        "Unser Ziel ist es, Klimawissenschaft, Naturschutz, Umweltpolitik und Nachhaltigkeit für junge Menschen und die breite Öffentlichkeit verständlich zu machen.",
      paragraphTwo:
        "Wir erstellen Artikel, visuelle Erklärformate und Social-Media-Inhalte auf Basis glaubwürdiger, nachvollziehbarer Quellen. CYRI führt keine eigene Forschung durch.",
      focus: [
        {
          title: "Verständliches Wissen",
          text: "Wir machen komplexe Umweltthemen in präzisen und zugänglichen Lerninhalten verständlich.",
        },
        {
          title: "Interaktives Lernen",
          text: "Themenexplorer, Fragen und Quizze helfen dabei, Informationen aktiv zu verarbeiten.",
        },
        {
          title: "Jugendliche Perspektiven",
          text: "Junge Menschen prägen Themen, Formate und Sprache, während Quellen transparent bleiben.",
        },
      ],
    },
    latest: {
      eyebrow: "Neue Lerninhalte",
      title: "Neueste Lernartikel",
      intro: "Neue quellenbasierte CYRI-Lernartikel erscheinen hier automatisch.",
      viewAll: "Alle Lernartikel ansehen",
    },
    learn: {
      eyebrow: "Lernplattform",
      title: "Umweltwissen, das du selbst erkunden kannst.",
      intro:
        "Starte mit einer Frage, entdecke die wichtigsten Begriffe und vertiefe das Thema anschließend im vollständigen, quellenbasierten Artikel.",
      topicsEyebrow: "Thema wählen",
      topicsTitle: "Was möchtest du verstehen?",
      topicsAria: "Lernthemen",
      journeyEyebrow: "Dein Lernpfad",
      journeyTitle: "Lerne in deinem eigenen Tempo.",
      journeyIntro:
        "Erkunde ein Thema, öffne den passenden Lernartikel und absolviere den Wissenscheck. Dein Fortschritt wird auf diesem Gerät gespeichert.",
      journeyProgress: "Gesamtfortschritt",
      journeySaved: "Lokal auf diesem Gerät gespeichert",
      journeyExplored: "Thema erkundet",
      journeyArticle: "Lernartikel geöffnet",
      journeyQuiz: "Wissenscheck abgeschlossen",
      journeyNext: "Empfohlener nächster Schritt",
      journeyExploreAction: "{topic} erkunden",
      journeyReadAction: "{topic} lesen",
      journeyQuizAction: "Wissenscheck starten",
      journeyCompleteTitle: "Lernpfad abgeschlossen.",
      journeyCompleteText:
        "Du hast alle Themen erkundet, alle drei Lernartikel geöffnet und den Wissenscheck abgeschlossen.",
      journeyReset: "Fortschritt zurücksetzen",
      journeyStatus: "{complete} von {total} Schritten",
      guidingQuestion: "Leitfrage",
      concepts: "Schlüsselbegriffe",
      openArticle: "Lernartikel öffnen",
      askAssistant: "CYRI fragen",
      formatsEyebrow: "Formate",
      formatsTitle: "Wissen für unterschiedliche Situationen.",
      formatsIntro:
        "Dasselbe Thema kann ausführlich vertieft, visuell verstanden oder für Social Media aufbereitet werden.",
      formats: [
        {
          status: "Jetzt verfügbar",
          title: "Lernartikel",
          text: "Quellenbasierte Langform-Erklärungen mit klarer Struktur und weiterführenden Informationen.",
        },
        {
          status: "Im Aufbau",
          title: "Infografiken",
          text: "Visuelle Zusammenfassungen, die Abläufe, Vergleiche und Kennzahlen leichter erfassbar machen.",
        },
        {
          status: "Auf unseren Kanälen",
          title: "Social Erklärformate",
          text: "Kompakte Bildungsbeiträge für Instagram, LinkedIn und X.",
        },
      ],
      quizEyebrow: "Wissenscheck",
      quizTitle: "Was ist hängen geblieben?",
      quizIntro: "Wähle selbst, wie ausführlich du dein Wissen prüfen möchtest.",
      quizLengthLabel: "Quizlänge",
      quizLengths: [
        { value: 3, title: "Kurz", text: "3 Fragen" },
        { value: 6, title: "Fokussiert", text: "6 Fragen" },
        { value: 9, title: "Ausführlich", text: "9 Fragen" },
      ],
      questionProgress: "Frage {current} von {total}",
      correct: "Richtig.",
      incorrect: "Noch nicht ganz.",
      next: "Nächste Frage",
      finish: "Ergebnis anzeigen",
      resultTitle: "Dein Ergebnis",
      resultText: "Du hast {score} von {total} Fragen richtig beantwortet.",
      resultStrong: "Starke Grundlage. Vertiefe ein neues Thema oder stelle eine weiterführende Frage.",
      resultDeveloping: "Ein guter Anfang. Die verlinkten Lernartikel erklären jede Antwort ausführlicher.",
      restart: "Quiz neu starten",
    },
    articles: {
      eyebrow: "Lernartikel",
      title: "Umweltthemen klar erklärt.",
      intro:
        "Entdecke quellenbasierte CYRI-Artikel zu Klima, Natur, Meeresschutz, erneuerbarer Energie, Biodiversität und nachhaltigen Städten.",
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
      eyebrow: "Lernassistent",
      title: "Stelle Fragen zu den CYRI-Lerninhalten.",
      intro:
        "Erhalte kurze KI-gestützte Erklärungen, die ausschließlich auf veröffentlichten CYRI-Lernartikeln basieren.",
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
      unavailable: "Der KI-Lernassistent ist auf dem Server noch nicht eingerichtet.",
      rateLimited: "Es wurden zu viele Fragen gestellt. Bitte versuche es in einigen Minuten erneut.",
      error: "Die Frage konnte nicht beantwortet werden. Bitte versuche es später erneut.",
    },
    about: {
      eyebrow: "Über uns",
      title: "Eine jugendgeführte Plattform für Umweltbildung.",
      intro: "CYRI ist eine unabhängige, jugendgeführte digitale Bildungsplattform, die sich derzeit im Aufbau befindet.",
      storyTitle: "Umweltwissen zugänglich und nutzbar machen.",
      storyOne:
        "CYRI hilft jungen Menschen, Umweltthemen zu verstehen, öffentliche Debatten einzuordnen und selbstbewusst an Nachhaltigkeitsgesprächen teilzunehmen.",
      storyTwo:
        "Die Plattform verbindet sorgfältige Redaktionsarbeit, verständliche Sprache, transparente Quellen und interaktive Lernformate.",
      teamEyebrow: "Team",
      teamTitle: "Kernteam",
      team: [
        {
          name: "Tobias Göppert",
          role: "Mitgründer & Bildungsleitung",
          text: "Hat CYRI mitgegründet und leitet Bildungsstrategie, redaktionelle Standards, Lernformate und quellenbasierte Umweltinhalte.",
        },
        {
          name: "Jarne Bub",
          role: "Mitgründer & Organisation",
          text: "Hat CYRI mitgegründet und leitet Plattformorganisation, Veröffentlichungsabläufe, Formatentwicklung und Qualitätskontrolle.",
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
      title: "Einen CYRI-Lernartikel veröffentlichen.",
      intro: "Füge neue quellenbasierte Inhalte für die Umweltbildung über den geschützten Editor hinzu.",
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
        "Kontaktanfragen werden zur Bearbeitung auf dem Server gespeichert. Veröffentlichte Artikel werden im Artikelbackend gespeichert. Fragen im Lernassistenten werden zur Beantwortung an den konfigurierten KI-Anbieter übermittelt. Eine vollständige Datenschutzerklärung sollte vor dem öffentlichen Launch finalisiert werden.",
    },
    footer: {
      statement: "Jugendgeführte Umweltbildung für eine nachhaltigere Zukunft.",
      language: "Sprache",
      social: "Social Media",
      imprint: "Impressum",
      privacy: "Datenschutz",
    },
  },
};

const LEARNING_PROGRESS_KEY = "cyri-learning-progress";

function loadLearningProgress() {
  const fallback = {
    visitedTopics: [],
    readArticles: [],
    quizCompleted: false,
    quizScore: 0,
    quizIndex: 0,
    quizAnswers: [],
    quizComplete: false,
    quizLength: 3,
    lastTopic: "oceans",
  };

  try {
    const saved = JSON.parse(localStorage.getItem(LEARNING_PROGRESS_KEY) || "{}");
    const validTopicIds = new Set(learningTopics.map((topic) => topic.id));
    const validArticleIds = new Set(learningTopics.map((topic) => topic.articleId));
    const quizLength = [3, 6, 9].includes(saved.quizLength) ? saved.quizLength : 3;
    const quizAnswers = Array.isArray(saved.quizAnswers)
      ? saved.quizAnswers.slice(0, quizLength)
      : [];

    return {
      visitedTopics: Array.isArray(saved.visitedTopics)
        ? saved.visitedTopics.filter((id) => validTopicIds.has(id))
        : [],
      readArticles: Array.isArray(saved.readArticles)
        ? saved.readArticles.filter((id) => validArticleIds.has(id))
        : [],
      quizCompleted: Boolean(saved.quizCompleted),
      quizScore: Number.isFinite(saved.quizScore) ? saved.quizScore : 0,
      quizIndex:
        Number.isInteger(saved.quizIndex) &&
        saved.quizIndex >= 0 &&
        saved.quizIndex < quizLength
          ? saved.quizIndex
          : 0,
      quizAnswers,
      quizComplete: Boolean(saved.quizComplete),
      quizLength,
      lastTopic: validTopicIds.has(saved.lastTopic) ? saved.lastTopic : "oceans",
    };
  } catch {
    return fallback;
  }
}

const savedLearningProgress = loadLearningProgress();

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
  learningTopic: savedLearningProgress.lastTopic,
  learningProgress: {
    visitedTopics: savedLearningProgress.visitedTopics,
    readArticles: savedLearningProgress.readArticles,
    quizCompleted: savedLearningProgress.quizCompleted,
    quizScore: savedLearningProgress.quizScore,
  },
  quizIndex: savedLearningProgress.quizIndex,
  quizAnswers: savedLearningProgress.quizAnswers,
  quizComplete: savedLearningProgress.quizComplete,
  quizLength: savedLearningProgress.quizLength,
};

const routes = new Set([
  "home",
  "learn",
  "articles",
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
    const response = await fetch("content/articles.json?v=20260607-6", { cache: "no-cache" });
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

function formatLearningText(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template
  );
}

function saveLearningProgress() {
  localStorage.setItem(
    LEARNING_PROGRESS_KEY,
    JSON.stringify({
      ...state.learningProgress,
      quizIndex: state.quizIndex,
      quizAnswers: state.quizAnswers,
      quizComplete: state.quizComplete,
      quizLength: state.quizLength,
      lastTopic: state.learningTopic,
    })
  );
}

function markLearningTopicVisited(topicId) {
  if (!state.learningProgress.visitedTopics.includes(topicId)) {
    state.learningProgress.visitedTopics.push(topicId);
  }
  saveLearningProgress();
}

function markLearningArticleRead(articleId) {
  const learningArticle = learningTopics.some((topic) => topic.articleId === articleId);
  if (learningArticle && !state.learningProgress.readArticles.includes(articleId)) {
    state.learningProgress.readArticles.push(articleId);
    saveLearningProgress();
    renderLearningJourney();
  }
}

function learningProgressCount() {
  return (
    state.learningProgress.visitedTopics.length +
    state.learningProgress.readArticles.length +
    Number(state.learningProgress.quizCompleted)
  );
}

function nextLearningStep() {
  const activeTopic = learningTopics.find((topic) => topic.id === state.learningTopic);
  if (
    activeTopic &&
    state.learningProgress.visitedTopics.includes(activeTopic.id) &&
    !state.learningProgress.readArticles.includes(activeTopic.articleId)
  ) {
    return { type: "article", topic: activeTopic };
  }

  for (const topic of learningTopics) {
    if (!state.learningProgress.visitedTopics.includes(topic.id)) {
      return { type: "topic", topic };
    }
    if (!state.learningProgress.readArticles.includes(topic.articleId)) {
      return { type: "article", topic };
    }
  }

  if (!state.learningProgress.quizCompleted) {
    return { type: "quiz" };
  }

  return { type: "complete" };
}

function renderLearningJourney() {
  const container = document.querySelector("[data-learning-journey]");
  if (!container) return;

  const total = learningTopics.length * 2 + 1;
  const complete = learningProgressCount();
  const progress = Math.round((complete / total) * 100);
  const nextStep = nextLearningStep();
  let nextAction = "";

  if (nextStep.type === "topic") {
    nextAction = `
      <button
        class="button button-primary"
        type="button"
        data-learning-next-topic="${escapeHtml(nextStep.topic.id)}"
      >
        ${escapeHtml(
          formatLearningText(t("learn.journeyExploreAction"), {
            topic: nextStep.topic.title[state.lang],
          })
        )}
      </button>
    `;
  } else if (nextStep.type === "article") {
    nextAction = `
      <button
        class="button button-primary"
        type="button"
        data-learning-next-article="${escapeHtml(nextStep.topic.articleId)}"
      >
        ${escapeHtml(
          formatLearningText(t("learn.journeyReadAction"), {
            topic: nextStep.topic.title[state.lang],
          })
        )}
      </button>
    `;
  } else if (nextStep.type === "quiz") {
    nextAction = `
      <button class="button button-primary" type="button" data-learning-next-quiz>
        ${escapeHtml(t("learn.journeyQuizAction"))}
      </button>
    `;
  } else {
    nextAction = `
      <button class="button button-secondary" type="button" data-learning-reset>
        ${escapeHtml(t("learn.journeyReset"))}
      </button>
    `;
  }

  container.innerHTML = `
    <div class="journey-progress-block">
      <div class="journey-progress-copy">
        <div>
          <span>${escapeHtml(t("learn.journeyProgress"))}</span>
          <strong>${escapeHtml(
            formatLearningText(t("learn.journeyStatus"), { complete, total })
          )}</strong>
        </div>
        <span>${progress}%</span>
      </div>
      <div
        class="journey-progress-track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="${total}"
        aria-valuenow="${complete}"
      >
        <span style="width: ${progress}%"></span>
      </div>
      <p>${escapeHtml(t("learn.journeySaved"))}</p>
    </div>

    <div class="journey-topic-grid">
      ${learningTopics
        .map((topic) => {
          const photo = getPhoto(topic.imageId);
          const explored = state.learningProgress.visitedTopics.includes(topic.id);
          const articleRead = state.learningProgress.readArticles.includes(topic.articleId);
          const topicComplete = Number(explored) + Number(articleRead);
          return `
            <button
              class="journey-topic-card${topicComplete === 2 ? " is-complete" : ""}"
              type="button"
              data-learning-journey-topic="${escapeHtml(topic.id)}"
            >
              <img src="${escapeHtml(photo.src)}" alt="" loading="lazy" />
              <span class="journey-topic-body">
                <span class="journey-topic-heading">
                  <strong>${escapeHtml(topic.title[state.lang])}</strong>
                  <small>${topicComplete}/2</small>
                </span>
                <span class="journey-task${explored ? " is-complete" : ""}">
                  <span aria-hidden="true">${explored ? "✓" : "1"}</span>
                  ${escapeHtml(t("learn.journeyExplored"))}
                </span>
                <span class="journey-task${articleRead ? " is-complete" : ""}">
                  <span aria-hidden="true">${articleRead ? "✓" : "2"}</span>
                  ${escapeHtml(t("learn.journeyArticle"))}
                </span>
              </span>
            </button>
          `;
        })
        .join("")}
    </div>

    <div class="journey-next${nextStep.type === "complete" ? " is-complete" : ""}">
      <div>
        <p class="eyebrow">${escapeHtml(
          nextStep.type === "complete"
            ? t("learn.journeyQuiz")
            : t("learn.journeyNext")
        )}</p>
        <h3>${escapeHtml(
          nextStep.type === "complete"
            ? t("learn.journeyCompleteTitle")
            : nextStep.type === "quiz"
              ? t("learn.journeyQuizAction")
              : nextStep.topic.question[state.lang]
        )}</h3>
        ${
          nextStep.type === "complete"
            ? `<p>${escapeHtml(t("learn.journeyCompleteText"))}</p>`
            : ""
        }
      </div>
      ${nextAction}
    </div>
  `;
}

function renderLearningPaths() {
  const container = document.querySelector("[data-learning-paths]");
  if (!container) return;
  container.innerHTML = t("learningIntro.paths")
    .map(
      (path) => `
        <article class="learning-path-card">
          <span class="learning-step">${escapeHtml(path.step)}</span>
          <h3>${escapeHtml(path.title)}</h3>
          <p>${escapeHtml(path.text)}</p>
        </article>
      `
    )
    .join("");
}

function renderLearningTopics() {
  const selector = document.querySelector("[data-learning-topics]");
  const detail = document.querySelector("[data-learning-detail]");
  if (!selector || !detail) return;

  const activeTopic =
    learningTopics.find((topic) => topic.id === state.learningTopic) || learningTopics[0];
  selector.innerHTML = learningTopics
    .map((topic) => {
      const photo = getPhoto(topic.imageId);
      const active = topic.id === activeTopic.id;
      return `
        <button
          class="topic-tab${active ? " is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${active}"
          data-learning-topic="${escapeHtml(topic.id)}"
        >
          <img src="${escapeHtml(photo.src)}" alt="" loading="lazy" />
          <span>${escapeHtml(topic.title[state.lang])}</span>
        </button>
      `;
    })
    .join("");

  const photo = getPhoto(activeTopic.imageId);
  detail.innerHTML = `
    <figure class="topic-visual">
      <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.label[state.lang])}" />
      <figcaption>${renderPhotoCredit(photo)}</figcaption>
    </figure>
    <div class="topic-copy">
      <p class="eyebrow">${escapeHtml(activeTopic.title[state.lang])}</p>
      <h2>${escapeHtml(activeTopic.question[state.lang])}</h2>
      <p>${escapeHtml(activeTopic.intro[state.lang])}</p>
      <div class="topic-concepts">
        <strong>${escapeHtml(t("learn.concepts"))}</strong>
        <div>
          ${activeTopic.concepts[state.lang]
            .map((concept) => `<span>${escapeHtml(concept)}</span>`)
            .join("")}
        </div>
      </div>
      <div class="topic-actions">
        <button
          class="button button-primary"
          type="button"
          data-article-id="${escapeHtml(activeTopic.articleId)}"
        >
          ${escapeHtml(t("learn.openArticle"))}
        </button>
        <button class="button button-secondary" type="button" data-open-learning-assistant>
          ${escapeHtml(t("learn.askAssistant"))}
        </button>
      </div>
    </div>
  `;
}

function renderLearningFormats() {
  const container = document.querySelector("[data-learning-formats]");
  if (!container) return;
  container.innerHTML = t("learn.formats")
    .map(
      (format, index) => `
        <article class="format-card">
          <div class="format-card-top">
            <span class="format-number">${String(index + 1).padStart(2, "0")}</span>
            <span class="format-status">${escapeHtml(format.status)}</span>
          </div>
          <h3>${escapeHtml(format.title)}</h3>
          <p>${escapeHtml(format.text)}</p>
        </article>
      `
    )
    .join("");
}

function quizScore() {
  return state.quizAnswers.slice(0, state.quizLength).reduce(
    (score, answer, index) => score + (answer === quizQuestions[index].correct ? 1 : 0),
    0
  );
}

function renderQuizLengthSelector() {
  return `
    <div class="quiz-length-picker">
      <span>${escapeHtml(t("learn.quizLengthLabel"))}</span>
      <div class="quiz-length-options" role="group" aria-label="${escapeHtml(
        t("learn.quizLengthLabel")
      )}">
        ${t("learn.quizLengths")
          .map(
            (option) => `
              <button
                class="quiz-length-option${option.value === state.quizLength ? " is-active" : ""}"
                type="button"
                data-quiz-length="${option.value}"
                aria-pressed="${option.value === state.quizLength}"
              >
                <strong>${escapeHtml(option.title)}</strong>
                <small>${escapeHtml(option.text)}</small>
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderLearningQuiz() {
  const container = document.querySelector("[data-learning-quiz]");
  if (!container) return;
  const lengthSelector = renderQuizLengthSelector();

  if (state.quizComplete) {
    const score = quizScore();
    const total = state.quizLength;
    const strong = score >= Math.ceil(total * 0.67);
    container.innerHTML = `
      ${lengthSelector}
      <div class="quiz-result">
        <span class="quiz-score">${score}/${total}</span>
        <div>
          <p class="eyebrow">${escapeHtml(t("learn.resultTitle"))}</p>
          <h3>${escapeHtml(
            formatLearningText(t("learn.resultText"), { score, total })
          )}</h3>
          <p>${escapeHtml(t(strong ? "learn.resultStrong" : "learn.resultDeveloping"))}</p>
        </div>
      </div>
      <button class="button button-secondary" type="button" data-quiz-reset>
        ${escapeHtml(t("learn.restart"))}
      </button>
    `;
    return;
  }

  const question = quizQuestions[state.quizIndex];
  const selectedAnswer = state.quizAnswers[state.quizIndex];
  const answered = Number.isInteger(selectedAnswer);
  const correct = selectedAnswer === question.correct;
  const progress = ((state.quizIndex + 1) / state.quizLength) * 100;
  container.innerHTML = `
    ${lengthSelector}
    <div class="quiz-progress-row">
      <span>${escapeHtml(
        formatLearningText(t("learn.questionProgress"), {
          current: state.quizIndex + 1,
          total: state.quizLength,
        })
      )}</span>
      <span>${state.quizIndex + 1}/${state.quizLength}</span>
    </div>
    <div class="quiz-progress"><span style="width: ${progress}%"></span></div>
    <h3 class="quiz-question">${escapeHtml(question.question[state.lang])}</h3>
    <div class="quiz-options">
      ${question.options[state.lang]
        .map((option, index) => {
          let className = "quiz-option";
          if (answered && index === question.correct) className += " is-correct";
          if (answered && index === selectedAnswer && !correct) className += " is-incorrect";
          return `
            <button
              class="${className}"
              type="button"
              data-quiz-option="${index}"
              ${answered ? "disabled" : ""}
            >
              <span>${String.fromCharCode(65 + index)}</span>
              ${escapeHtml(option)}
            </button>
          `;
        })
        .join("")}
    </div>
    ${
      answered
        ? `
          <div class="quiz-feedback ${correct ? "is-correct" : "is-incorrect"}">
            <strong>${escapeHtml(t(correct ? "learn.correct" : "learn.incorrect"))}</strong>
            <p>${escapeHtml(question.explanation[state.lang])}</p>
          </div>
          <button class="button button-primary" type="button" data-quiz-next>
            ${escapeHtml(
              t(
                state.quizIndex === state.quizLength - 1
                  ? "learn.finish"
                  : "learn.next"
              )
            )}
          </button>
        `
        : ""
    }
  `;
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
  renderLearningPaths();
  renderLearningJourney();
  renderLearningTopics();
  renderLearningFormats();
  renderLearningQuiz();
  renderFilters();
  renderArticles();
  renderTeam();
  renderPublishTools();
  if (state.activeArticleId) updateArticleModal();
}

function parseRoute() {
  const raw = window.location.hash.replace("#", "") || "home";
  if (raw === "mission") return { page: "home", anchor: "mission" };
  if (raw === "research") return { page: "learn", anchor: "assistant" };
  if (routes.has(raw)) return { page: raw, anchor: null };
  return { page: "home", anchor: null };
}

function showPage(shouldScroll = true) {
  document.querySelectorAll("[data-page]").forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === state.page);
  });

  const activeKey = state.anchor === "mission" ? "mission" : state.page;
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
    if (state.anchor === "assistant") {
      document.querySelector("[data-learning-assistant]")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
  markLearningArticleRead(id);
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

  const learningTopicButton = event.target.closest("[data-learning-topic]");
  if (learningTopicButton) {
    state.learningTopic = learningTopicButton.dataset.learningTopic;
    markLearningTopicVisited(state.learningTopic);
    renderLearningTopics();
    renderLearningJourney();
    return;
  }

  const journeyTopicButton = event.target.closest("[data-learning-journey-topic]");
  if (journeyTopicButton) {
    state.learningTopic = journeyTopicButton.dataset.learningJourneyTopic;
    markLearningTopicVisited(state.learningTopic);
    renderLearningTopics();
    renderLearningJourney();
    document.querySelector(".topic-explorer")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  const nextTopicButton = event.target.closest("[data-learning-next-topic]");
  if (nextTopicButton) {
    state.learningTopic = nextTopicButton.dataset.learningNextTopic;
    markLearningTopicVisited(state.learningTopic);
    renderLearningTopics();
    renderLearningJourney();
    document.querySelector(".topic-explorer")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  const nextArticleButton = event.target.closest("[data-learning-next-article]");
  if (nextArticleButton) {
    openArticle(nextArticleButton.dataset.learningNextArticle);
    return;
  }

  if (event.target.closest("[data-learning-next-quiz]")) {
    document.querySelector(".quiz-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  if (event.target.closest("[data-open-learning-assistant]")) {
    document.querySelector("[data-learning-assistant]")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.setTimeout(() => document.querySelector("#research-question")?.focus(), 420);
    return;
  }

  if (event.target.closest("[data-learning-reset]")) {
    state.learningTopic = "oceans";
    state.learningProgress = {
      visitedTopics: [],
      readArticles: [],
      quizCompleted: false,
      quizScore: 0,
    };
    state.quizIndex = 0;
    state.quizAnswers = [];
    state.quizComplete = false;
    saveLearningProgress();
    renderLearningJourney();
    renderLearningTopics();
    renderLearningQuiz();
    return;
  }

  const quizLengthButton = event.target.closest("[data-quiz-length]");
  if (quizLengthButton) {
    const quizLength = Number(quizLengthButton.dataset.quizLength);
    if ([3, 6, 9].includes(quizLength) && quizLength !== state.quizLength) {
      state.quizLength = quizLength;
      state.quizIndex = 0;
      state.quizAnswers = [];
      state.quizComplete = false;
      saveLearningProgress();
      renderLearningQuiz();
    }
    return;
  }

  const quizOptionButton = event.target.closest("[data-quiz-option]");
  if (quizOptionButton) {
    state.quizAnswers[state.quizIndex] = Number(quizOptionButton.dataset.quizOption);
    saveLearningProgress();
    renderLearningQuiz();
    return;
  }

  if (event.target.closest("[data-quiz-next]")) {
    if (state.quizIndex === state.quizLength - 1) {
      state.quizComplete = true;
      state.learningProgress.quizCompleted = true;
      state.learningProgress.quizScore = quizScore();
    } else {
      state.quizIndex += 1;
    }
    saveLearningProgress();
    renderLearningQuiz();
    renderLearningJourney();
    return;
  }

  if (event.target.closest("[data-quiz-reset]")) {
    state.quizIndex = 0;
    state.quizAnswers = [];
    state.quizComplete = false;
    saveLearningProgress();
    renderLearningQuiz();
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
syncRoute(window.location.hash === "#research" || window.location.hash === "#mission");
observeReveals();
loadStaticArticles();
loadArticlesFromBackend().then((backendAvailable) => {
  if (backendAvailable) {
    setInterval(loadArticlesFromBackend, 60 * 1000);
  }
});
