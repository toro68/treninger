/**
 * UEFA-øvelser fra analyserte UEFA A-oppgaver
 *
 * Disse øvelsene er ekstrahert fra docs/uefa/*-ANALYSERT.md
 * og brukes både i treningsseksjonen og UEFA-panelet.
 *
 * Kodeformat: uefa-[oppgavekode]-[nummer], f.eks. "uefa-a10-01"
 * Visningskode: UEFA-A10-01 (for UI)
 */

import type { Exercise } from "./exercises";

export const uefaExercises: Exercise[] = [
  {
    id: "uefa-a02-01",
    exerciseNumber: 519,
    name: "Tredjespiller i mellomrom",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "baller", "minimål"],
    description:
      "4v2+2 jokere i rute: midtsone = mellomrom. Jokere spiller tredjemann, må avlevere innen 2 touch og angrepet må fullføres innen 6 sek.",
    coachingPoints: [
      "Orientering før mottak",
      "Åpen kropp – se begge sider",
      "Tempoveksling etter touch",
    ],
    variations: [
      "Legg til forsvarer i mellomrom",
      "Krav om første-touch framover",
    ],
    source: "uefa",
    sourceRef: "A02 Per Inge Jacobsen – Hva skjer før scoring",
  },
  {
    id: "uefa-a02-02",
    exerciseNumber: 549,
    name: "3-spillersekvens til scoring",
    category: "game",
    duration: 16,
    playersMin: 12,
    playersMax: 14,
    theme: "angrep",
    equipment: ["mål", "kjegler"],
    description:
      "Gk+5v5+Gk der hvert angrep må involvere tredjespiller → assist → målscorer. Maks 2 touch på tredjemann og assist, scoring innen 6 sek.",
    coachingPoints: [
      "Timing på løp i boks",
      "Assistenes blikk og valg",
      "Målscorer: plassering med få touch",
    ],
    variations: [
      "Legg til ekstra forsvarer",
      "Krav om bakromsløp før avslutning",
    ],
    source: "uefa",
    sourceRef: "A02 Per Inge Jacobsen – Hva skjer før scoring",
  },
  {
    id: "uefa-a03-01",
    exerciseNumber: 520,
    name: "Lavt i hjørnet-stasjoner",
    category: "station",
    duration: 16,
    playersMin: 12,
    playersMax: 20,
    theme: "avslutning",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Fire avslutningsstasjoner: curl lavt i hjørne, første-touch finish i sentral scoringssone (sone 1cv/1ch), bakre stolpe-løp, kontrollert skudd. Rotasjon hvert 4. minutt.",
    coachingPoints: [
      "Første touch forbereder skuddet",
      "Avvent keeperens handling når du kan",
      "Fokus på lavt hjørne",
    ],
    variations: [
      "Legg til forsvarer",
      "Tidskrav per stasjon",
    ],
    source: "uefa",
    sourceRef: "A03 Tom Selmer – Sekundene som avgjør",
  },
  {
    id: "uefa-a03-02",
    exerciseNumber: 550,
    name: "Kontrollert avslutning i omstilling",
    category: "game",
    duration: 16,
    playersMin: 12,
    playersMax: 14,
    theme: "kontring",
    equipment: ["mål", "kjegler"],
    description:
      "Gk+5v5+Gk. Ved omstilling skal laget søke avslutning i sentral scoringssone (sone 1cv/1ch). Bonus for lavt hjørne og curl/plassering.",
    coachingPoints: [
      "Skaff tid før avslutning via medtak/bevegelse",
      "Plassering/curl fremfor kraft når du har kontroll",
      "Fyll scoringssonen med flere løp (1. og 2. bevegelse)",
    ],
    variations: [
      "Legg til forsvarer",
      "Bonuspoeng for avslutning lavt i hjørnet",
    ],
    source: "uefa",
    sourceRef: "A03 Tom Selmer – Sekundene som avgjør",
  },
  {
    id: "uefa-a04-01",
    exerciseNumber: 521,
    name: "Ett-touch maurtue",
    category: "rondo",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description:
      "Rondo i flere koblede ruter (\"maurtue\") med vekt på rytme: ett-touch for å bryte/akselerere og to-touch for kontroll.",
    coachingPoints: [
      "Kroppsposisjon før mottak",
      "Skann før pasning",
      "Bytt rytme på trenercue",
    ],
    variations: [
      "Flere forsvarere (mer press)",
      "Krav om ett-touch gjennom porter",
    ],
    source: "uefa",
    sourceRef: "A04 Finn Bredo Olsen – Høyt tempo eller god kontroll?",
  },
  {
    id: "uefa-a04-02",
    exerciseNumber: 522,
    name: "Tempo-switch 8v8",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 16,
    theme: "spill",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Gk+7v7+Gk der trener styrer rytme i spill: perioder med ett-touch (akselerasjon) og perioder med 2–3 touch (kontroll).",
    coachingPoints: [
      "Gjenkjenn når vi skal gire opp",
      "Støttevinkler tett på ball",
      "Ro med ball når vi skal kontrollere",
    ],
    variations: [
      "Scoring i tempo-fase gir ekstra poeng",
      "Begrens touch i gitte soner",
    ],
    source: "uefa",
    sourceRef: "A04 Finn Bredo Olsen – Høyt tempo eller god kontroll?",
  },
  {
    id: "uefa-a05-01",
    exerciseNumber: 307,
    name: "Basma ROS-stasjoner",
    category: "warmup",
    duration: 20,
    playersMin: 12,
    playersMax: 20,
    theme: "utvikling",
    equipment: ["kjegler", "småmål"],
    description:
      "Stasjonsbasert øktidé (teknikk, koordinasjon, pasning, skudd) inspirert av Basmas beskrivelser av tidlig miljø/lek og støtte rundt aktiviteten. Kan organiseres med voksne/medspillere som hjelpere – fokus på trygghet og lek.",
    coachingPoints: [
      "Lek og nysgjerrighet",
      "Fang opp mestring",
    ],
    variations: [
      "Legg til konkurranse",
      "Rotér roller"],
    source: "uefa",
    sourceRef: "A05 Christer Basma – Mine suksesskriterier",
  },
  {
    id: "uefa-a05-02",
    exerciseNumber: 551,
    name: "Steg 4 konkurranse",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "spill",
    equipment: ["mål", "kjegler"],
    description:
      "Spillform med høy intensitet og tydelige roller (f.eks. 8v8), inspirert av Basmas beskrivelser av overgangen til mer krevende miljø og betydningen av valg/ansvar. Tilpass rammer og krav til spillergruppe.",
    coachingPoints: [
      "Lederskap",
      "Kvalitet i valg",
    ],
    variations: [
      "Valgfritt: avslutt med kort refleksjon på valg/ansvar",
      "Valgfritt: gi spillerne spesifikke utviklingsoppdrag"],
    source: "uefa",
    sourceRef: "A05 Christer Basma – Mine suksesskriterier",
  },

  // ══════════════════════════════════════════════════════════
  // A07: Hvordan bli en god målscorer (Sigurd Rushfeldt)
  // ══════════════════════════════════════════════════════════
  {
    id: "uefa-a07-01",
    exerciseNumber: 523,
    name: "Rush-korridor",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "avslutning",
    equipment: ["kjegler", "baller", "mål"],
    description:
      "To korridorer med server(e) og spiss: spiss orienterer, tar 1–2 touch og avslutter fort. Bytt korridor etter hver avslutning. Fokus på bevegelse før ball, første touch mot mål og etterarbeid på returer.",
    coachingPoints: [
      "Orienter før mottak",
      "Første touch mot mål",
      "Avslutt tidlig (1–2 touch)",
      "Jakt returer",
    ],
    variations: [
      "Bonuspoeng for scoring på første touch",
      "Legg inn passiv → aktiv forsvarer som kommer sent i press",
      "Varier servering: innlegg på bakken / luft / cutback",
    ],
    source: "uefa",
    sourceRef: "A07 Sigurd Rushfeldt – Hvordan bli en god målscorer",
  },
  {
    id: "uefa-a07-02",
    exerciseNumber: 524,
    name: "3-soners målspill 5v5",
    category: "game",
    duration: 16,
    playersMin: 12,
    playersMax: 14,
    theme: "avslutning",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Gk+5v5+Gk på bane delt i tre soner. Angrep må spille via mellomromssone før avslutning, og scoring teller kun hvis spiss(er) er innenfor 16-meteren. Fokus på bevegelse før ball, orientering og 1–2 touch i boks.",
    coachingPoints: [
      "Bevegelse før ball – skaff deg fordel før pasningen",
      "Orientering og åpen kropp",
      "Avslutt fort i boks (1–2 touch)",
      "Kant fyller motsatt stolpe",
    ],
    variations: [
      "Bytt roller (spiss/kant) etter mål",
      "Gi ekstra poeng for returmål",
      "Krav om at siste pasning må være gjennomspill eller innlegg",
    ],
    source: "uefa",
    sourceRef: "A07 Sigurd Rushfeldt – Hvordan bli en god målscorer",
  },

  // ══════════════════════════════════════════════════════════
  // A08: Høy playmaker (Gard Holme)
  // ══════════════════════════════════════════════════════════
  {
    id: "uefa-a08-01",
    exerciseNumber: 525,
    name: "Fase 1-posisjonering i mellomrom",
    category: "station",
    duration: 12,
    playersMin: 9,
    playersMax: 9,
    theme: "angrep",
    equipment: ["kjegler", "baller"],
    description:
      "3 servere, 3 playmakere og 3 forsvarere i mellomromssoner (25x20m). Playmaker starter i skygge, beveger seg ut, mottar og spiller gjennom port. Fokus: posisjonering midt i rommet, kroppsvinkel og orientering før mottak.",
    coachingPoints: [
      "Orienter før mottak (skann over skulder)",
      "Motta med åpen kropp (rett-/sidevendt når mulig)",
      "Juster deg midt i rommet før du ber om ball",
      "Kvalitet på sistepasning gjennom port",
    ],
    variations: [
      "Forsvarer passiv → aktiv",
      "Krav om 1-touch videre når rommet er åpent",
      "Legg til medløper (tredjemann) for timing",
    ],
    source: "uefa",
    sourceRef: "A08 Gard Holme – Kompetansekrav i rolle: høy playmaker",
  },
  {
    id: "uefa-a08-02",
    exerciseNumber: 526,
    name: "Fase 2–3 kombinasjonsspill 7v7",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Gk+7v7+Gk (50x40m) i 1-3-3-1. Fokus på playmaker i mellomrom: komme på ball (fase 1), hurtig håndtering i fase 2 og avgjørende pasning i fase 3. Enkle regler kan styre at playmaker er involvert før avslutning.",
    coachingPoints: [
      "Playmaker: orienter før mottak og spill på neste signal",
      "Hurtig håndtering under press (kort tid på ball)",
      "Timing i avgjørende pasning mot løp",
      "Spiss/kant: koordiner løp med playmaker",
    ],
    variations: [
      "Touch-begrensning for playmaker i mellomrom",
      "Bonuspoeng for gjennomspill/bakromspasning",
      "Marker mellomromssone (kun playmaker i sonen)",
    ],
    source: "uefa",
    sourceRef: "A08 Gard Holme – Kompetansekrav i rolle: høy playmaker",
  },
  {
    id: "uefa-a01-01",
    exerciseNumber: 548,
    name: "3-5-2 press og gjenvinning",
    category: "game",
    duration: 16,
    playersMin: 14,
    playersMax: 18,
    theme: "press",
    equipment: ["mål", "kjegler"],
    description:
      "Gk+7v7+Gk med tre stoppere, regista som joker og fokus på Conte-presset: spiss styrer inn sentralt, indreløper støter, regista sikrer. Scoring etter høy gjenvinning innen 6 sek = 2 poeng.",
    coachingPoints: [
      "Spiss signaliserer press – alle følger",
      "Regista faller bak for å dekke rom",
      "Vingback må falle i femmer når motsatt side angripes",
    ],
    variations: [
      "Legg til lynraskt overgangslag som straffer dårlig restforsvar",
      "Obligatorisk tredje-manns løp før scoring",
    ],
    source: "uefa",
    sourceRef: "A01 Even Ødegaard – Juventus 3-5-2",
  },
  {
    id: "uefa-a01-02",
    exerciseNumber: 518,
    name: "Vingback → tidlig innlegg + gjenvinning",
    category: "station",
    duration: 20,
    playersMin: 12,
    playersMax: 16,
    theme: "innlegg",
    equipment: ["mål", "kjegler"],
    description:
      "Vingbacker låst i kantsoner mottar ball og slår tidlig innlegg. Etter innlegg skal vingbacken sprinte inn i retursone og bidra til gjenvinning – Juventus' «fem rundt ball».",
    coachingPoints: [
      "Innlegg innen 2 touch",
      "Spissduo i motsatte løp",
      "Vingback: lever varsel og retur samme aksjon",
    ],
    variations: [
      "Legg til aktiv back som prøver å bryte",
      "Poeng for scoring på gjenvinning",
    ],
    source: "uefa",
    sourceRef: "A01 Even Ødegaard – Juventus 3-5-2",
  },
  // ══════════════════════════════════════════════════════════
  // A10: Moderne vingerrolle (Hugo Pereira)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a10-01",
    exerciseNumber: 505,
    name: "1v1 på kant med soner",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "angrep",
    equipment: ["kjegler", "baller", "småmål"],
    description:
      "Vinger starter bredt og mottar ball fra sentral spiller. 1v1 mot back med tre mulige soner: gjennombrudd på linja, skjær inn, eller spill tilbake. Bonuspoeng for vellykket gjennombrudd.",
    coachingPoints: [
      "Start bredt – strekk forsvaret",
      "Akselerér mot ball – ikke stå stille",
      "Les backen: lukker han inn? Gå rundt. Gir han linja? Skjær inn.",
      "Første touch skal sette fart",
    ],
    variations: [
      "Legg til overlappende back for 2v1",
      "Begrens til 3 touch før 1v1 starter",
      "Tidsbegrensning: 5 sek til avslutning",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Vingerrolle",
  },

  {
    id: "uefa-a10-02",
    exerciseNumber: 512,
    name: "Innlegg og avslutning",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Vinger mottar i fart på kant, slår tidlig innlegg (før 16m). Spiss og indreløper timer løp: spiss ved første stolpe, indreløper bakre. Keeper aktiv. Fokus på timing og innleggskvalitet.",
    coachingPoints: [
      "Innlegg: slå tidlig, mellom keeper og forsvarslinje",
      "Spiss: blindside-løp, ikke løp for tidlig",
      "Indreløper: kom på bakre stolpe i fart",
      "Vinger: løft hodet før innlegg – se løpene",
    ],
    variations: [
      "Legg til forsvarere (passiv → aktiv)",
      "Alternér mellom lavt og høyt innlegg",
      "Cutback-variant: spiss trekker seg, innlegg på bakken",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Vingerrolle",
  },

  {
    id: "uefa-a10-03",
    exerciseNumber: 515,
    name: "Bakromsløp med timing",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Vinger starter høyt og bredt. Sentral spiller har ball. Vinger truer bakrom først (løp bak dummyforsvar), så tilbyr til fot. Hvis forsvar følger, løp i bakrom. Fokus på å skape og utnytte rom.",
    coachingPoints: [
      "Tru bakrom FØRST – det skaper rom til fot",
      "Les forsvareren: følger han? Løp i bakrom",
      "Timing: start løp når ballførers hode er oppe",
      "Motta i fart, ikke stå stille",
    ],
    variations: [
      "Legg til live forsvar",
      "Kombiner med veggpasning før bakromsløp",
      "Avslutning etter mottak i bakrom",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Vingerrolle",
  },

  {
    id: "uefa-a10-04",
    exerciseNumber: 517,
    name: "Overlapp og innlegg",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 14,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Vinger holder ball, back overlapper. 2v1 mot forsvarer på kant. Valgfritt: vinger slår innlegg selv, eller spiller til back som slår. Spiss og indreløper i boks. Fokus på relasjonsforståelse.",
    coachingPoints: [
      "Back: rop 'overlapp!' og kom i fart bak vinger",
      "Vinger: hold ball til back er forbi, så velg",
      "Les forsvarer: lukker han back? Gå selv. Følger han deg? Spill back.",
      "Innlegg: tidlig, mellom keeper og linje",
    ],
    variations: [
      "Underlapp (back går innenfor)",
      "Legg til midtstopper som sikrer",
      "Tidsbegrensning for å fremtvinge hurtig valg",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Vingerrolle",
  },

  {
    id: "uefa-a10-05",
    exerciseNumber: 544,
    name: "Kantspill 4v3",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål", "småmål"],
    description:
      "Halv bane, 4v3+Gk. Angrep har overtall. Fokus på å utnytte vinger og back i samspill. Mål på innlegg teller dobbelt. Forsvar scorer på småmål ved gjenvinning og kontring.",
    coachingPoints: [
      "Utnytt overtallet – finn den ledige",
      "Vinger: hold bredde, ikke kom inn for tidlig",
      "Back: støtt opp, skap 2v1 på kant",
      "Variér: kant, mellomrom, bakrom",
    ],
    variations: [
      "4v4 for å øke intensitet",
      "Begrens touch i midtsonen",
      "Innlegg må slås før 16m for å telle dobbelt",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Vingerrolle",
  },

  {
    id: "uefa-a10-06",
    exerciseNumber: 546,
    name: "Kantspill 7v7",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Gk+6v6+Gk på 60x40m. Kantsoner markert (5m fra sidelinje). Mål etter spill via kantsone teller dobbelt. Dutch Rule: alltid start fra keeper. Fokus på å bruke bredde og skape 1v1/2v1 på kant.",
    coachingPoints: [
      "Etablér bredde først – vinger ut i kantsone",
      "Sentralt spill for å åpne kant",
      "Bytt side hvis kant er lukket",
      "Bonuspoeng motiverer bruk av kant",
    ],
    variations: [
      "Obligatorisk kantsone-touch før mål",
      "Legg til press på keeper for raskere spill",
      "Begrens baklengs-pasninger",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Vingerrolle",
  },

  {
    id: "uefa-a10-07",
    exerciseNumber: 547,
    name: "Kamplik 9v9",
    category: "game",
    duration: 25,
    playersMin: 18,
    playersMax: 22,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Gk+8v8+Gk på 70x50m. Full formasjon (1-4-3). Fokus på vingerrollens prinsipper i kamplik setting. Trener stopper spillet for å coache nøkkelsituasjoner (freeze). Mål etter 1v1-gjennombrudd = 2 poeng.",
    coachingPoints: [
      "Vinger: bruk prinsippene fra isolert trening",
      "Freeze ved gode/dårlige valg for læring",
      "Oppmuntre 1v1-forsøk – ros innsats",
      "Back: overlapp når vinger holder",
    ],
    variations: [
      "Spill uten freeze for flyt",
      "Legg til offside for realistisk bakromsløp-timing",
      "Bytt formajson til 4-4-2 og tilpass",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Vingerrolle",
  },

  // ══════════════════════════════════════════════════════════
  // A12: Hurtig og kontrollert angrepsspill (Anders Fredriksen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a12-01",
    exerciseNumber: 532,
    name: "Direkte vs. etablert angrep – 7v7",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Gk+6v6+Gk på 60x40m. Spill vanlig, men loggfør to ting på scoringer/sjanser: (1) antall pasninger i angrepet og (2) cirka tid fra ballvinning/start til avslutning. Bruk dette til å diskutere når direkte angrep (få trekk) er hensiktsmessig og når laget bør etablere mer kontroll.",
    coachingPoints: [
      "Tell trekk og tid på målangrep – gjør det konkret",
      "Diskuter direkte (få trekk) vs. lengre etablerte angrep",
      "Se etter mønster: mange mål kommer innen få pasninger, men også etter lengre angrep",
      "Knytt valg til hvor bruddet skjer i banen (høyt/lavt)",
    ],
    variations: [
      "Gi bonuspoeng for mål etter maks 4 pasninger (som læringsramme, ikke fasit)",
      "Gi bonuspoeng for mål etter lengre etablert angrep (for å trene begge uttrykk)",
      "Bytt på startbetingelse: angrep etter ballvinning vs. etablert oppbygging",
    ],
    source: "uefa",
    sourceRef: "A12 Anders Fredriksen – Angrepsspill",
  },

  {
    id: "uefa-a12-02",
    exerciseNumber: 513,
    name: "4 pasninger / 10+ sek – scenarier",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Stasjonsøvelse med to tydelige scenarier som trener begge uttrykk i angrep: (A) avslutt innen maks 4 pasninger, (B) bygg et angrep som varer 10+ sekunder før avslutning. Bruk enkel coaching og roter roller/posisjoner.",
    coachingPoints: [
      "Gjør det målbart: tell pasninger og tid",
      "Snakk om når direkte angrep er riktig valg",
      "Snakk om når laget bør etablere og beholde kontroll",
      "Knytt refleksjon til hva som skjer etter ballvinning",
    ],
    variations: [
      "Legg til passiv forsvarer i scenario A (for beslutning/tempo)",
      "Legg til tidskrav i scenario B (minimum 10 sek før avslutning)",
      "Bytt sluttprodukt: avslutning etter innlegg vs. avslutning sentralt",
    ],
    source: "uefa",
    sourceRef: "A12 Anders Fredriksen – Angrepsspill",
  },

  // ══════════════════════════════════════════════════════════
  // A13: Rolletrening sideback/indreløper (Arnstein Røen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a13-01",
    exerciseNumber: 506,
    name: "3v3 + keeper – SB/IL",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 8,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "3v3 + keeper(e) på 30x33 m. Vekt på 1–1 ferdighet offensivt og defensivt, omstillingshurtighet, frekvens (quickness), medtak/ta av press og avslutningsferdighet.",
    coachingPoints: [
      "1–1 ferdighet offensivt og defensivt",
      "Omstillingshurtighet og frekvens (quickness)",
      "Medtak/ta av press og avslutningsferdighet",
    ],
    variations: [
      "2v2 + keeper(e) (juster areal)",
      "4v4 + keeper(e) (juster areal)",
      "Bruk offsideregel ved behov for flere 1–1 situasjoner",
    ],
    source: "uefa",
    sourceRef: "A13 Arnstein Røen – Sideback/Indreløper",
  },

  {
    id: "uefa-a13-02",
    exerciseNumber: 534,
    name: "7v7+kantsoner",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "7v7 + keeper(e) på 50x66,5 m i 3-3-1 med innleggssoner og kantspillere (sonespillere). Vekt på relasjoner SB–IL, innløp i boks og vurderinger i omstilling.",
    coachingPoints: [
      "Offensivt: utnytte overtall og komme med innløp i boks",
      "Vurder klima: kontring, overtall eller undertall",
      "Defensivt: rask omstilling – vurder gjenvinne eller reorganisere",
    ],
    variations: [
      "Sonespiller kan ta med ball inn i banen",
      "Motsatt sonespiller skjærer ved innlegg",
      "Offsideregel også for sonespillerne",
    ],
    source: "uefa",
    sourceRef: "A13 Arnstein Røen – Sideback/Indreløper",
  },

  // ══════════════════════════════════════════════════════════
  // A14: Indreløper i 4-3-1-2 (Magnus Oltedal)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a14-01",
    exerciseNumber: 482,
    name: "Diamant-possession",
    category: "rondo",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "possession",
    equipment: ["kjegler", "baller"],
    description:
      "4v4+3 jokere i rute. Bruk jokerne som en diamant (dyp sentral + to indreløpere) for å trene støtte, vinkler og rolleforståelse i 4-3-1-2. Vekt på å skape bredde i mellomrommet på ballside og å reagere raskt ved balltap.",
    coachingPoints: [
      "Angrep: skap bredde i mellomrommet på ballside (i tospann med back/ytterrom)",
      "Tilby støtte og vinkler – bygg relasjonelle «firkanter» rundt ballfører",
      "Balltap: umiddelbar reaksjon – løp de første sekundene",
    ],
    variations: [
      "Juster banestørrelse for ønsket intensitet",
      "Bytt hvilke roller som er jokere",
    ],
    source: "uefa",
    sourceRef: "A14 Magnus Oltedal – Indreløper",
  },

  {
    id: "uefa-a14-02",
    exerciseNumber: 535,
    name: "Diamant gjennombrudd",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Spillform med et angrepslag i 4-3-1-2 mot et kompakt forsvar på mellomstor bane. Bruk økta til å trene indreløperens rolle i relasjon med back/yttersone (skape bredde i mellomrommet), og til å øve på skyv/press innenfra og ut når ballen går ut til motstanderback.",
    coachingPoints: [
      "Angrep: IL på sterk side skaper bredde i mellomrommet (i tospann med back)",
      "Forsvar: skyv innenfra og ut mot back og steng pasningsalternativer innover",
      "Balltap: «klikkmentalitet» – alle løper de første sekundene",
    ],
    variations: [
      "Start spillet fra ulike utgangsposisjoner (stopper/back) for å trigge ønsket pressretning",
      "Bytt forsvarsformasjon for å teste rom og korridorer",
    ],
    source: "uefa",
    sourceRef: "A14 Magnus Oltedal – Indreløper",
  },

  // ══════════════════════════════════════════════════════════
  // A15: Innlegg i Tippeligaen (Gard H. Kristiansen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a15-01",
    exerciseNumber: 507,
    name: "Innleggssoner (A–F)",
    category: "station",
    duration: 16,
    playersMin: 10,
    playersMax: 14,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "6v4+Gk på 40x50 m med markerte innleggssoner (A–F). Bruk spillformen til å skape mange innleggs-situasjoner, og til å registrere hvor innlegget slås fra og hva som skjer etterpå (avslutning, scoring, klarering, ny fase).",
    coachingPoints: [
      "Sonebevissthet: Hvor slår vi innlegg fra (A–F)?",
      "Kategoriser: Direkte scoring (innlegger + målscorer) vs flere involverte",
      "Kategoriser: Kom situasjonen i etablert angrep eller etter overgang/gjenvinning?",
    ],
    variations: [
      "Bytt hvilke soner som er markert/aktive, og se hvordan det påvirker antall avslutninger",
      "La trener rope ut sonekode før innlegg for å øve på felles språk i analyse",
    ],
    source: "uefa",
    sourceRef: "A15 Gard Kristiansen – Innlegg",
  },

  {
    id: "uefa-a15-02",
    exerciseNumber: 536,
    name: "Direkte vs gjenvinning",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "7v7+Gk på halvbane. Spill med tydelig fokus på innleggs-situasjoner, og bruk korte stopp/oppstart til å klassifisere scoringer og sjanser: direkte (innlegger + målscorer), etter gjenvinning i forkant, og i etablert angrep vs overgang.",
    coachingPoints: [
      "Hurtig vurdering: etablert angrep vs overgang",
      "Direkte vs ikke-direkte: hvilke valg og bevegelser utløser det?",
      "Etter gjenvinning: hva gjorde vi i forkant av innlegget?",
    ],
    variations: [
      "Varier presshøyde på forsvar",
      "Start annenhver ball fra innleggsposisjon for å øke repetisjoner",
    ],
    source: "uefa",
    sourceRef: "A15 Gard Kristiansen – Innlegg",
  },

  // ══════════════════════════════════════════════════════════
  // A16: Rosenborgs angrepsspill (Jørgen Ferstad)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a16-01",
    exerciseNumber: 508,
    name: "RBK-kombinasjoner",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 10,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Kombinasjonsøvelse med IL–kant–spiss mot to forsvarere + keeper, inspirert av Ferstads beskrivelse av RBKs angrepsmønstre og rollefordeling ved innlegg. Fokus på å skape gjennombrudd på kant og levere innlegg inn i «slottet».",
    coachingPoints: [
      "Indreløper: frys–se–slå",
      "Kant: L-løp (ut–inn)",
      "Avklar roller i boks ved innlegg (1. stolpe / bakre stolpe)",
    ],
    variations: [
      "Legg til motsatt IL for bakre 45°",
      "Valgfritt: touch-begrensning for IL",
    ],
    source: "uefa",
    sourceRef: "A16 Jørgen Ferstad – Rosenborg angrep",
  },

  {
    id: "uefa-a16-02",
    exerciseNumber: 537,
    name: "RBK fase-spill",
    category: "game",
    duration: 24,
    playersMin: 20,
    playersMax: 22,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Spilløvelse der trener bevisst setter i gang angrep i ulike faser (etablert angrep, dødball, kontring), inspirert av Ferstads faseinndeling og funn. Valgfritt kan dere gi poeng for scoring etter innlegg inn i «slottet» eller etter kombinasjonsspill.",
    coachingPoints: [
      "Rollefordeling i boks ved innlegg (1. stolpe / bakre stolpe)",
      "Kant/back relasjoner",
    ],
    variations: [
      "Tillat motstander å kontra for å teste restforsvar",
      "Legg inn dødball-scenarier",
    ],
    source: "uefa",
    sourceRef: "A16 Jørgen Ferstad – Rosenborg angrep",
  },

  // ══════════════════════════════════════════════════════════
  // A17: Spissrollen i RBK (Erik Selnæs)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a17-01",
    exerciseNumber: 509,
    name: "RBK-spiss boksbevegelser",
    category: "station",
    duration: 15,
    playersMin: 6,
    playersMax: 8,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Øktidé: sekvensøvelse der kant/indreløper leverer baller inn i boks, og spissen trener på rolleavklaringer, timing og bevegelse ved innlegg. Legg inn reaksjon etter blokk/retur og kollektiv innsats.",
    coachingPoints: [
      "Avklar spissens rolle ved innlegg",
      "Timing og justering etter ballfører",
      "Reaksjon etter blokk/retur",
    ],
    variations: [
      "Legg til midtstopper som press",
      "Varier rekkefølge på innlegg",
    ],
    source: "uefa",
    sourceRef: "A17 Erik Selnæs – Spissrollen i RBK",
  },

  {
    id: "uefa-a17-02",
    exerciseNumber: 538,
    name: "Spissrelasjoner 5v4",
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 10,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Spillform der IL + kant + midtspiss angriper mot 4 forsvarere. Prioriter relasjonelle handlinger (møte/strekke, veggspill, dyp/tilbake) og tydelig førsteforsvarer-rolle ved balltap.",
    coachingPoints: [
      "Spiss: fall-retur-boks",
      "IL: blikk før ball",
      "Kant: start bredt, skjær inn",
    ],
    variations: [
      "Legg til keeperspill",
      "Tillat forsvar å kontra for å trene press",
    ],
    source: "uefa",
    sourceRef: "A17 Erik Selnæs – Spissrollen i RBK",
  },

  // ══════════════════════════════════════════════════════════
  // A18: Angrep mot etablert forsvar (Hiep Tran)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a18-01",
    exerciseNumber: 533,
    name: "Rommet mellom back og stopper – spillvending",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "8v8+Gk. Bane: forslag ca. 50x45 m. Angripende lag kan få et krav om å vende spillet før de forsøker gjennombrudd. Fokus på å overbefolke en side, trekke motstander, og vende til motsatt for å angripe rommet mellom back og stopper.",
    coachingPoints: [
      "Tålmodig bearbeiding – vurder pressbalanse",
      "Vending = tempo og kvalitet i første pasning etter vending",
      "Angrip rommet mellom back/stopper etter vending",
    ],
    variations: [
      "Legg til begrensning på antall berøringer",
      "Gi bonuspoeng for scoring etter tredje vending",
    ],
    source: "uefa",
    sourceRef: "A18 Hiep Tran – Angrep mot etablert forsvar",
  },

  {
    id: "uefa-a18-02",
    exerciseNumber: 539,
    name: "Gjenvinning lav blokk",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "6v6. Bane: forslag ca. 35x35 m med to småmål i hver ende. Lag A angriper mot lav blokk, men ved blokkert innlegg/skudd er målet å vinne ballen raskt tilbake og angripe gjennom sentrum. Trener legger inn baller for å simulere gjenvinningssituasjoner.",
    coachingPoints: [
      "Struktur og balanse i angrep",
      "Vinn ball nær boks – spill gjennom forskjøyvde rom",
      "Første touch framover etter gjenvinning",
    ],
    variations: [
      "Legg til kantsoner for overlapp",
      "Bruk tidsbonus (valgfritt)",
    ],
    source: "uefa",
    sourceRef: "A18 Hiep Tran – Angrep mot etablert forsvar",
  },

  // ══════════════════════════════════════════════════════════
  // A19: Hva bør vektlegges i angrep mot etablert forsvar (Ståle Andersen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a19-01",
    exerciseNumber: 483,
    name: "KFUM nærrom-possession",
    category: "rondo",
    duration: 16,
    playersMin: 12,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "baller"],
    description:
      "Tre soner (forslag: ca. 10x25 m) med 4v2 i hver. Ballen skal oppholde seg i en sone med minst fem pas før den flyttes. Ved balltap: mål å presse raskt framover (gjenvinningsprinsipp).",
    coachingPoints: [
      "Pasningskvalitet i trange rom",
      "Støttevinkler (valgfritt: to-touch-policy)",
      "1A/1F-roller etter KFUM-prinsipp",
    ],
    variations: [
      "Tillat overføringer kun via sentral spiller",
      "Legg inn poeng for gjenvinning",
    ],
    source: "uefa",
    sourceRef: "A19 Ståle Andersen – Angrep etablert",
  },

  {
    id: "uefa-a19-02",
    exerciseNumber: 540,
    name: "Spill mot lav blokk 8v8",
    category: "game",
    duration: 18,
    playersMin: 16,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "8v8 (forslag: ca. 50x40 m). Angripende lag (4-3-3) møter 4-4-2 i lav blokk. Poeng for gjennombrudd i definerte soner (rom 2/3, kant). Valgfritt: bonus for gjenvinning som gir ny sjanse raskt.",
    coachingPoints: [
      "Tålmodighet i bearbeiding",
      "Back-IL-kant kombinasjoner",
      "Struktur og balanse før risiko",
    ],
    variations: [
      "Endre sonene som gir poeng",
      "Tillat forsvar å kontra for å trene restforsvar",
    ],
    source: "uefa",
    sourceRef: "A19 Ståle Andersen – Angrep etablert",
  },

  // ══════════════════════════════════════════════════════════
  // A20: Touch og scoringer (Stian Lund)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a20-01",
    exerciseNumber: 510,
    name: "Ett-touch finishing carousel",
    category: "station",
    duration: 20,
    playersMin: 8,
    playersMax: 12,
    theme: "avslutning",
    equipment: ["mål", "baller", "kjegler"],
    description:
      "Fire stasjoner (innlegg høyre, cut-back venstre, tredjepas vegg, stikkpasning). Spillere roterer, og alle avslutter på ett touch. Bonus for kombinasjoner der tredjepas + assist også er ett touch.",
    coachingPoints: [
      "Orientering før avslutning",
      "Timing på løp i boks",
      "Presisjon i leveranser selv på ett touch",
    ],
    variations: [
      "Legg til forsvarsskjermer",
      "Tillat to touch ved vanskelige vinkler",
    ],
    source: "uefa",
    sourceRef: "A20 Stian Lund – Touch og scoring",
  },

  {
    id: "uefa-a20-02",
    exerciseNumber: 541,
    name: "3-involveringsangrep 7v7",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "baller", "kjegler"],
    description:
      "7v7 på 44x40 m. Mål teller kun hvis de tre siste involveringene (tredjepas, assist, avslutter) er på maks ett touch (kan justeres til 1-2 touch). Brudd gir ball til motstander.",
    coachingPoints: [
      "Skap støttevinkler for ett-touch",
      "Kommunikasjon og tydelige signal",
      "Tempo uten å miste presisjon",
    ],
    variations: [
      "Tillat to-touch for assist",
      "Legg inn tidsbegrensning (10 sek) på angrep",
    ],
    source: "uefa",
    sourceRef: "A20 Stian Lund – Touch og scoring",
  },

  // ══════════════════════════════════════════════════════════
  // A21: Notorisk målscorer (Totto Dahlum)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a21-01",
    exerciseNumber: 511,
    name: "Perfeksjonisme-runden",
    category: "station",
    duration: 15,
    playersMin: 4,
    playersMax: 6,
    theme: "avslutning",
    equipment: ["mål", "baller", "kjegler"],
    description:
      "Spiller velger avslutningstype (volley, heading, cut-back). Må gjennomføre 10/10 på rad før han bytter stasjon. Hvis serien brytes, starter han på nytt. Visualiser kamptrykk (A21-mentalitet).",
    coachingPoints: [
      "Fokus på detaljer",
      "Visualiser scenario (straff, 90. min)",
      "Selvstyrt repetisjon",
    ],
    variations: [
      "Legg til passiv forsvarer",
      "Endre mål: 8/8, 12/12",
    ],
    source: "uefa",
    sourceRef: "A21 Totto Dahlum – Notorisk målscorer",
  },

  {
    id: "uefa-a21-02",
    exerciseNumber: 514,
    name: "Visualiseringsscenario",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 8,
    theme: "mental",
    equipment: ["baller", "kjegler"],
    description:
      "Spillere beskriver kamp-scenario (0-0, 90. min, bakre stolpe). Trener kaster ball, spiss avslutter umiddelbart. Fokus på mental forberedelse og beslutningsevne.",
    coachingPoints: [
      "Se situasjonen før ballen kommer",
      "Ingen ekstra touch",
      "Best når det gjelder",
    ],
    variations: [
      "Legg til keeper",
      "Bruk straffespark med konsekvens",
    ],
    source: "uefa",
    sourceRef: "A21 Totto Dahlum – Notorisk målscorer",
  },

  // ══════════════════════════════════════════════════════════
  // A11: RBK i angrep (Svein Maalen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a11-01",
    exerciseNumber: 484,
    name: "Differansejakt 4v4+3",
    category: "rondo",
    duration: 18,
    playersMin: 11,
    playersMax: 11,
    theme: "angrep",
    equipment: ["kjegler", "minimål", "baller"],
    description:
      "35x30 m delt i to halvdeler. 4v4 ytterlag med tre nøytrale i midten skaper overtall. Poeng fås når ballen spilles gjennom linjen og spiss avslutter i miniatyrmål. Fokus på støttevinkler og sjansedifferanse.",
    coachingPoints: [
      "Orientering før mottak",
      "Tredjemannsløp med kant/spiss",
      "Reaksjon på brudd (press eller fall)",
    ],
    variations: [
      "Legg til restforsvar som kan bryte linjepasning",
      "Endre touchbegrensning for nøytrale",
    ],
    source: "uefa",
    sourceRef: "A11 Svein Maalen – RBK i angrep",
  },

  {
    id: "uefa-a11-02",
    exerciseNumber: 542,
    name: "Kontring til balanse 6v4",
    category: "game",
    duration: 20,
    playersMin: 10,
    playersMax: 12,
    theme: "overgang",
    equipment: ["mål", "baller", "tidsklokke"],
    description:
      "50x40 m i tre soner. Lag starter hos keeper, skal søke kontringsrom raskt og avslutte. Etter avslutning må laget falle og sikre balanse («def i off»-soner). Fokus på første pasning fram og restforsvar.",
    coachingPoints: [
      "Første pasning fram/diagonal",
      "Kommunikasjon stoppere–sentral midt",
      "Press på ball eller fall samlet",
    ],
    variations: [
      "Legg til nøytral støtte",
      "Valgfritt: innfør tidsfrist for avslutning",
    ],
    source: "uefa",
    sourceRef: "A11 Svein Maalen – RBK i angrep",
  },

  {
    id: "uefa-a11-03",
    exerciseNumber: 516,
    name: "Dødballpakke RBK",
    category: "station",
    duration: 24,
    playersMin: 14,
    playersMax: 16,
    theme: "dødball",
    equipment: ["mål", "hjørneflagg", "mannequins"],
    description:
      "35x30 m område rundt 16-meter. To corner-varianter: nærstol flick og bakre skjerm. Seks spillere i boks, tre i restforsvar. Servetrigger avtales før hver repetisjon.",
    coachingPoints: [
      "Tim server og løp",
      "Skjerm keeper/markeringsspillere",
      "Restforsvar klart før serv",
    ],
    variations: [
      "Kjør kort corner med kombinasjon",
      "Legg inn motkontring for forsvar",
    ],
    source: "uefa",
    sourceRef: "A11 Svein Maalen – RBK i angrep",
  },

  {
    id: "uefa-a11-04",
    exerciseNumber: 543,
    name: "Gjennombruddstriangel 8v6",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "mannequins"],
    description:
      "60x45 m med tre korridorer. Angripende 4-2-3-1 møter 6 forsvarere i 4-4-2. Oppmuntre til samspill i korridor (back + kant + indreløper) før innlegg/gjennombrudd. Fokus på timing og tempo i ballflytting.",
    coachingPoints: [
      "Tredjemannsbevegelse i korridor",
      "Sentral midt skanner restforsvar",
      "Tempo i ballflytting før gjennombrudd",
    ],
    variations: [
      "Valgfritt: krav om involvering i korridor før innlegg",
      "To-touch-begrensning i siste tredel",
    ],
    source: "uefa",
    sourceRef: "A11 Svein Maalen – RBK i angrep",
  },

  {
    id: "uefa-a11-05",
    exerciseNumber: 545,
    name: "Press-reset 7v7+Gk",
    category: "game",
    duration: 22,
    playersMin: 16,
    playersMax: 16,
    theme: "overgang",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "55x40 m kamp med restforsvarssoner. Etter hver avslutning må laget raskt etablere restforsvar før motstander kan kontre. Pressfelle/trigger kan avtales (f.eks. signal fra spiss) for å trene samhandling i førsteforsvar.",
    coachingPoints: [
      "Kommunikasjon stopper–sentral midt",
      "Stramme linjeavstander før press",
      "Kjenn når du skal falle vs. presse",
    ],
    variations: [
      "Gi mer tid til restforsvar (enklere)",
      "Legg til ekstra joker for kontring (hardere)",
    ],
    source: "uefa",
    sourceRef: "A11 Svein Maalen – RBK i angrep",
  },

  // ══════════════════════════════════════════════════════════
  // A06: Den sentrale midtbanerollen (Øyvind Iversen)
  // ══════════════════════════════════════════════════════════
  {
    id: "uefa-a06-01",
    exerciseNumber: 309,
    name: "Posisjonsspill med linjebrudd",
    category: "rondo",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "vester", "baller"],
    description:
      "4v4+2 jokere (sentrale midtbanespillere) i en rute delt i tre soner. Målet er å spille ballen fra en ytre sone til den andre via en av jokerne i midtsonen. Jokerne har maks 2 touch for å fremme raske avgjørelser og orientering.",
    coachingPoints: [
      "Joker (SM): Konstant skanning og orientering før mottak.",
      "Åpen kropp for å se begge retninger.",
      "Kvalitet og tempo på pasning for å bryte linjen.",
    ],
    variations: [
      "Legg til en forsvarer i midtsonen for å øke presset.",
      "Krav om at joker må spille på 1-touch.",
      "Bonuspoeng for tredjemannskombinasjoner.",
    ],
    source: "uefa",
    sourceRef: "A06 Øyvind Iversen – Den sentrale midtbanerollen",
  },
  {
    id: "uefa-b01-01",
    exerciseNumber: 552,
    name: "Overgangsspill med pyramide-fokus",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "overgang",
    equipment: ["mål", "kjegler", "vester"],
    description:
      "7v7+Gk. Trener starter spillet. Ved brudd har laget 8 sekunder på å score. Laget må følge 'overgangspyramiden': 1. Bakrom, 2. Mellomrom, 3. Vekk fra press. Bonuspoeng for scoring etter direkte bakromspasning.",
    coachingPoints: [
      "Spissers umiddelbare bevegelse i bakrom etter brudd.",
      "Orientering hos ballvinner: se opp for første pasningsvalg.",
      "Restforsvar: de som ikke er involvert i kontringen, inntar defensive posisjoner.",
    ],
    variations: [
      "Varier antall spillere.",
      "Juster tidsfristen.",
    ],
    source: "uefa",
    sourceRef: "B01 Bjarte Lunde Aarsheim – Overgangsspill",
  },
  {
    id: "uefa-b01-02",
    exerciseNumber: 553,
    name: "Presshøyde og brudd",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 20,
    theme: "press",
    equipment: ["mål", "kjegler", "vester"],
    description:
      "8v8+Gk. To lag i 4-4-2. Trener instruerer forsvarende lag til å enten presse høyt i diamant eller falle lavt i sone. Forsvarende lag får poeng for å vinne ballen i sin definerte presshøyde. Etter brudd gjelder overgangsspill-regler.",
    coachingPoints: [
      "1. forsvars aggressive press.",
      "2. og 3. forsvars sikringsbevegelser.",
      "Kollektiv forflytning når presset starter.",
    ],
    variations: [
      "Spill 11v11 for full formasjonstrening.",
      "La lagene selv bestemme presshøyde.",
    ],
    source: "uefa",
    sourceRef: "B01 Bjarte Lunde Aarsheim – Overgangsspill",
  },

  // ══════════════════════════════════════════════════════════
  // LEGG TIL FLERE UEFA-ØVELSER HER
  // ══════════════════════════════════════════════════════════
];

// ============================================
// HJELPEFUNKSJONER
// ============================================

/**
 * Konverterer intern id til visningskode
 * "uefa-a10-01" → "UEFA-A10-01"
 */
export const getUEFADisplayCode = (id: string): string => {
  if (!id.startsWith("uefa-")) return id;
  return id.replace("uefa-", "UEFA-").toUpperCase();
};

/**
 * Konverterer visningskode til intern id
 * "UEFA-A10-01" → "uefa-a10-01"
 */
export const uefaCodeToId = (code: string): string => {
  return code.toLowerCase().replace("uefa-", "uefa-");
};

/**
 * Finn UEFA-øvelse etter kode (case-insensitive)
 * Aksepterer både "UEFA-A10-01" og "uefa-a10-01"
 */
export const getUEFAExerciseByCode = (code: string): Exercise | undefined => {
  const normalizedId = code.toLowerCase().replace(/^uefa-/, "uefa-");
  return uefaExercises.find((ex) => ex.id === normalizedId);
};

/**
 * Finn alle UEFA-øvelser for en gitt oppgavekode (f.eks. "A10")
 */
export const getUEFAExercisesByAnalysis = (analysisCode: string): Exercise[] => {
  const prefix = `uefa-${analysisCode.toLowerCase()}-`;
  return uefaExercises.filter((ex) => ex.id.startsWith(prefix));
};
