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
    imageUrl: "",
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

  {
    id: "uefa-a01-03",
    exerciseNumber: 549,
    name: "Figur 25: Generell 2v1",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["baller", "kjegler"],
    description:
      "Generell form: 2 spillere utfordrer 1 motspiller, og ny gruppe settes i gang når motspiller er passert.",
    coachingPoints: [
      "Ballfører: utfordre med fart og timing",
      "Medspiller: skap vinkel og støtte – vær spillbar",
      "Når forsvarer er passert: start ny gruppe",
    ],
    variations: [
      "Forsvarer passiv → aktiv",
      "Begrens antall touch (2–3) før avslutning",
    ],
    source: "uefa",
    sourceRef: "A01 Even Ødegaard – Figur 25 (generell tilnærming)",
  },

  {
    id: "uefa-a01-04",
    exerciseNumber: 550,
    name: "Figur 26: Kant 1v1 + overlapp + innlegg",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "innlegg",
    equipment: ["baller", "kjegler", "mål"],
    description:
      "Spesifikk spillsituasjon: kantspiller utfordrer sideback og får overlapp fra egen sideback. Øvelsen kan avsluttes med innlegg.",
    coachingPoints: [
      "Kantspiller: utfordre 1v1 og les sideback",
      "Back: timet overlapp – løp forbi når sideback binder",
      "Innlegg: slå når du har fordel og løp i boks er klare",
    ],
    variations: [
      "Legg til 1 forsvarer i boks (passiv → aktiv)",
      "Krav om cutback-variant ved gjennombrudd",
    ],
    source: "uefa",
    sourceRef: "A01 Even Ødegaard – Figur 26 (spesifikk tilnærming)",
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

  {
    id: "uefa-a13-03",
    exerciseNumber: 600,
    name: "11v11 – oppspill + presshøyde",
    category: "game",
    duration: 25,
    playersMin: 20,
    playersMax: 22,
    theme: "overgang",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "11v11 hel bane med kampforberedende progresjon: coach ett lag i oppspillsvarianter, la motstander variere presshøyde (høyt som base, avtal fall-av), coach så defensiv struktur med variasjon i presshøyde, og avslutt med vanlig spill der begge strukturer praktiseres.",
    coachingPoints: [
      "Avklar presshøyde-modus og trigger for fall-av",
      "Gjenvinning: 1F først, støtte i tre ledd",
      "SB–IL-relasjon: frispill IL rettvendt i rom 2 når mulig",
      "Etablert angrep: krev 4 samtidige innløp i boks",
    ],
    variations: [
      "Sett måltall: gjenvinning ≤6–8 sek eller fall av til 3 ledd",
      "Begrens antall sekunder i oppspill (for å trigge pressbeslutninger)",
      "Start fra ulike død-baller/keeper for å variere kampbildet",
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
    name: "Faseøvelse – ballside 8 bred + spiss i rom 2",
    category: "game",
    duration: 10,
    playersMin: 20,
    playersMax: 22,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "Kort faseøvelse (10v10/11v11) der dere repeterer «regel-bildet» i 4-3-1-2: ballside 8 går bredt som breddeholder, spiss tilbyr seg i rom 2, og sentral støtte flytter for å frigjøre sentral spiller. Mål: skape back-dilemma (gå/stå) og åpne sentral korridor.",
    coachingPoints: [
      "Ballside 8: start smalt, bli rettvendt i mellomrom, og gå ut (innenfra og ut)",
      "Motsatt 8: stabiliser smalt/innenfor når ballside 8 går («én går – én blir»)",
      "Krav til ramme: hold laget kort og smalt (30/40) før gjennombrudd",
    ],
    variations: [
      "Start fra ulike utgangsposisjoner (keeper/stopper) for å trigge ønsket mønster",
      "Bytt hvilken side som er «sterk» (styrt via spillvending/coach-stopp)",
    ],
    source: "uefa",
    sourceRef: "A14 Magnus Oltedal – Indreløper",
  },

  {
    id: "uefa-a14-02",
    exerciseNumber: 535,
    name: "Posisjonsspill – rollekrav (7v7+3)",
    category: "rondo",
    duration: 12,
    playersMin: 15,
    playersMax: 17,
    theme: "possession",
    equipment: ["kjegler", "baller", "vester"],
    description:
      "7v7+3 i sone/rute med tydelige rollekrav: dere får poeng kun hvis ballside 8 mottar bredt på sterk side, og motsatt 8 er i stabiliseringsposisjon før gjennombrudd/viderespill. Bruk økta til å trene bredde/stabilitet og timing i «innenfra og ut»-bevegelsen.",
    coachingPoints: [
      "Ballside 8: skap bredde på sterk side (manglende naturlige breddeholdere)",
      "Motsatt 8: inn og sikre – ikke begge på tur",
      "Hold 30/40-ramma i forsvar når dere mister ball",
    ],
    variations: [
      "Gi bonuspoeng hvis mottak i mellomrom skjer rettvendt før ball spilles videre",
      "Juster banestørrelse for ønsket intensitet og avstander",
    ],
    source: "uefa",
    sourceRef: "A14 Magnus Oltedal – Indreløper",
  },

  {
    id: "uefa-a14-03",
    exerciseNumber: 602,
    name: "Pressfelle i korridor (6v6 + keepere)",
    category: "game",
    duration: 16,
    playersMin: 14,
    playersMax: 14,
    theme: "press",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "6v6 + to keepere på bane delt i tre korridorer. Angrepslag forsøker å bygge opp, forsvarslag får poeng for ballvinning i sidekorridor etter at ballside 8 har støtt innenfra-og-ut og laget låser spillet der.",
    coachingPoints: [
      "Pressretning: tving spillet mot sidekorridor (to spisser stenger mest mulig sentralt)",
      "Ballside 8: støt innenfra og ut og steng pasning innover",
      "Kompakthet: prioriter 30/40 før dere går i brudd",
    ],
    variations: [
      "Mellompress (felle): start i kompakt blokk og trigger støt når ball går ut til back/korridor",
      "Aggressivt (høyt): høyere startposisjoner og kortere tid til brudd",
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
    name: "Overtall på kant → innlegg (8v6 / 10v8)",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 22,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "Spillform på halv/mellombane med tydelig mål om å skape 2v1/3v2 på kant før innlegg. Poeng for innleggssituasjoner etter at dere har «vunnet posisjon», og scoring teller dobbelt hvis avslutning kommer fra D eller C.",
    coachingPoints: [
      "Innleggslegger: vinn posisjon før du slår – ikke slå fordi du kan",
      "Boksroller: bemann 1. stolpe, C, D og bakre stolpe ved hvert innlegg",
      "D-løper: på plass før innlegget går (kommunikasjon: «D!»)",
    ],
    variations: [
      "Gi bonuspoeng for direkte scoring (innlegger + målscorer)",
      "Begrens antall touch i innleggsrom for å øke tempo i avgjørelsene",
    ],
    source: "uefa",
    sourceRef: "A15 Gard Kristiansen – Innlegg",
  },

  {
    id: "uefa-a15-02",
    exerciseNumber: 536,
    name: "4-soners boksroller (6–8 reps per side)",
    category: "station",
    duration: 16,
    playersMin: 10,
    playersMax: 16,
    theme: "avslutning",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Innleggsmassasje med tydelige scoreroller. Marker soner: 1. stolpe, C, D og bakre. Krav: alltid én løper i hver sone før innlegget slås. Kjør 6–8 repetisjoner per side og bytt roller etter 4 reps.",
    coachingPoints: [
      "9’er: aggressivt løp i C/1. stolpe (timing > fart)",
      "Motsatt kant: kom i fart til bakre stolpe og vær klar for gjennomspill/retur",
      "8/10: møt i D for avslutning/andreball – «D!» før innlegget går",
    ],
    variations: [
      "Varier leveringstype: cutback til D vs luft i C/bakre",
      "Gi poeng for avslutning fra D eller C",
    ],
    source: "uefa",
    sourceRef: "A15 Gard Kristiansen – Innlegg",
  },

  {
    id: "uefa-a15-03",
    exerciseNumber: 603,
    name: "Innlegg + andreball (5-sek-regel)",
    category: "game",
    duration: 18,
    playersMin: 12,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "Spillform der situasjonen alltid lever videre etter innlegg: spill videre i 5 sek uansett utfall. Poeng for (a) direkte avslutning/scoring og (b) gjenvunnet ball og avslutning på andreball.",
    coachingPoints: [
      "Ettertrykk 5 sek: først press, så sikring",
      "6’er + motsatt back/stopper: restforsvar og «andreball-lås»",
      "D-løper: les klarering/retur og vær klar til avslutning",
    ],
    variations: [
      "Krev at minst 4 roller er på plass ved innlegg (1. stolpe, C, D, bakre) før scoring teller",
      "Start annenhver ball fra etablert angrep (lavere tempo) og annenhver fra overgang (høyere tempo)",
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
    name: "Vending → overtall på kant → innlegg",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 22,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "8v8/10v10 der poeng kun teller når angrepet har (a) gjennomført sidebytte, (b) skapt overtall på kant (2v1/3v2/4v3), og (c) avsluttet med innlegg/cutback med minst 3 løp i boks. Speiler RBKs «gjennombrudd bredt» i etablert fase.",
    coachingPoints: [
      "Etablert: vinn kant via vending og overtall før innlegg",
      "Boksroller: motsatt kant 1. stolpe, 9’er bakre, ettertrykk rundt D",
      "Relasjoner: «samme side» – gjenta mønsteret med kontinuitet",
    ],
    variations: [
      "Gi ekstra poeng hvis avslutning kommer fra D etter cutback",
      "Krev at minst 3 av 4 roller er på plass (1. stolpe, C, bakre, D) før scoring teller",
    ],
    source: "uefa",
    sourceRef: "A16 Jørgen Ferstad – Rosenborg angrep",
  },

  {
    id: "uefa-a16-02",
    exerciseNumber: 537,
    name: "Boksroller på innlegg (låste løp)",
    category: "station",
    duration: 16,
    playersMin: 10,
    playersMax: 16,
    theme: "avslutning",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Mønsterøvelse fra kant/back med tydelige «låste» boksroller: motsatt kant må angripe 1. stolpe, 9’er må gå bakre, og indreløper(e) fyller mellomrom/retur (D). Variér type innlegg (høyt/lavt/cutback).",
    coachingPoints: [
      "Boks: motsatt kant 1. stolpe – 9’er bakre",
      "Ettertrykk: minst én spiller fyller D for returer/2. ball",
      "Innleggslegger: vent til løpene er i gang – timing > tempo",
    ],
    variations: [
      "Legg inn en passiv/aktiv forsvarer i boks for kamprealisme",
      "Gi bonuspoeng for direkte avslutning på første aksjon",
    ],
    source: "uefa",
    sourceRef: "A16 Jørgen Ferstad – Rosenborg angrep",
  },

  {
    id: "uefa-a16-03",
    exerciseNumber: 604,
    name: "Overgang: ubalanse = gå / ellers sikre",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 18,
    theme: "overgang",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "7v7+GK. Etter brudd/gjenvinning får laget 8–10 sek til å skape avslutning hvis ubalanse er tydelig. Hvis ikke, må laget sikre og etablere angrep med mål om kantgjennombrudd (vending → overtall bredt → innlegg/cutback).",
    coachingPoints: [
      "Gjenkjenn ubalanse: gå når muligheten er der – uansett kampstatus",
      "Hvis ikke ubalanse: sikre ball og bygg til kantgjennombrudd",
      "Ettertrykk: følg opp for returer og 2. ball",
    ],
    variations: [
      "Definer «ubalanse» som konkrete kriterier (overtall, feilvendt stopper, stor avstand mellom ledd)",
      "Bytt startpunkt (brudd i midtbane vs brudd i lav blokk) for ulike overgangstyper",
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
    name: "Feilvendt-oppspill + tredjemann",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "6v6+2 jokere. Poeng kun hvis laget spiller inn på spiss feilvendt og kommer ut på tredjemann innen 3 pasninger. Trener «god feilvendt» + relasjonell bevegelse (vegger/tredjemann).",
    coachingPoints: [
      "Spiss: lås stopper, vinn første kontakt og spill av på 1–2 touch",
      "Spiss etter avlevering: utløse tredjemann (returløp/ny posisjon)",
      "Timing: medspillere må starte løp før spiss mottar",
    ],
    variations: [
      "Begrens antall touch på spiss (maks 2) for å forsterke kvalitet",
      "Gi bonuspoeng hvis tredjemann-aksjonen ender i gjennombrudd/avslutning",
    ],
    source: "uefa",
    sourceRef: "A17 Erik Selnæs – Spissrollen i RBK",
  },

  {
    id: "uefa-a17-02",
    exerciseNumber: 538,
    name: "Innlegg/boksroller (1-touch / volley / hode)",
    category: "station",
    duration: 16,
    playersMin: 10,
    playersMax: 16,
    theme: "avslutning",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Mønster fra kant/back der spissen har 2–3 definerte løp (1. stolpe/bakre/stop–rykk). Avslutt med variasjon i sluttprodukt (1-touch/volley/hode) og tydelige boksavtaler.",
    coachingPoints: [
      "Avklar boksrolle før innlegg (hvilket rom og hvilket løp)",
      "Kom fri: timing + retningsforandring (ikke bare «løp inn»)",
      "Innleggslegger: vent til løpene er i gang – timing > tempo",
    ],
    variations: [
      "Legg inn en passiv/aktiv forsvarer for å øke kamprealisme",
      "Poengsystem: ekstra poeng for 1-touch avslutning eller heading på mål",
    ],
    source: "uefa",
    sourceRef: "A17 Erik Selnæs – Spissrollen i RBK",
  },

  {
    id: "uefa-a17-03",
    exerciseNumber: 605,
    name: "Pressledelse (spiss som trigger)",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 18,
    theme: "press",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "7v7. Oppstart hos motstanders stopper. Spissen får poeng når han stenger sentrum og leder spillet til avtalt side, og laget vinner ball innen 6 sek etter at fella settes.",
    coachingPoints: [
      "Spiss: vinkel i press – steng sentrum og led til side",
      "Lag: kollektivt trykk etter signal (vinne ball innen 6 sek)",
      "Hvis ikke vinning: fall av og behold retningen (ikke jage)",
    ],
    variations: [
      "Bytt presshøyde-modus (høyt/mellom/lavt) med samme retning og nye startposisjoner",
      "Gi ekstra poeng hvis ballvinning utløser umiddelbar sjanse innen 8 sek",
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
    name: "Vending med hensikt (8v8 + 2 jokere)",
    category: "game",
    duration: 18,
    playersMin: 18,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "8v8 + 2 jokere (possession). Bane ca. 50x40. Mål teller bare etter vending med hensikt og angrep innen 8–10 sek. Trener å flytte lav blokk for å skape ubalanse (ikke «vend for å vende»).",
    coachingPoints: [
      "Trekk dem over → slå motsatt → angrip rommet som åpnes",
      "Motsatt side må være i posisjon før vending (back/kant i høyde og bredde)",
      "Kvalitet etter vending: første pasning og første touch må true framover",
    ],
    variations: [
      "Hvis rommet nøytraliseres: krev ny vending før avslutning",
      "Bonuspoeng hvis målet kommer etter vending + gjennombruddspasning (ikke bare skudd uten ubalanse)",
    ],
    source: "uefa",
    sourceRef: "A18 Hiep Tran – Angrep mot etablert forsvar",
  },

  {
    id: "uefa-a18-02",
    exerciseNumber: 539,
    name: "Pådrag for å åpne mellomrom (7v7 + keepere)",
    category: "game",
    duration: 18,
    playersMin: 16,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "7v7 + keepere. Poeng når ballfører binder 2. ledd med pådrag og finner rettvendt mottak i mellomrom før avslutning. Trener «gå med ball» når 1. pressledd ikke får trykk, og å slippe ballen i riktig øyeblikk.",
    coachingPoints: [
      "Trigger: når 1F ikke får trykk → ballfører avansér og bind 2F",
      "Slipp ballen i riktig øyeblikk (før 2F rekker å komprimere)",
      "Mellomrom: rettvendt mottak skal true framover, ikke bare sikre",
    ],
    variations: [
      "Bonuspoeng hvis angrepet ender i cut-back/45-graders pasning",
      "Krev minst ett pådrag i siste tredjedel før avslutning",
    ],
    source: "uefa",
    sourceRef: "A18 Hiep Tran – Angrep mot etablert forsvar",
  },

  {
    id: "uefa-a18-03",
    exerciseNumber: 606,
    name: "Lav blokk-lås opp (siste 2/3)",
    category: "game",
    duration: 22,
    playersMin: 20,
    playersMax: 22,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "Spill i siste 2/3 av banen (10v10 eller 11v10). Angrepslaget får 2 poeng for: (a) cut-back/45, (b) gjennombrudd i mellomrom, (c) innlegg etter overtall på kant. Bonus: +1 poeng for gjenvinning innen 6–8 sek etter balltap.",
    coachingPoints: [
      "Avklar løsningsprofil (sidekorridor vs mellomrom) før dere starter",
      "Angrep må tåle balltap: restforsvar/balanse for å kunne gjenvinne",
      "Gjør målepunktene tydelige: hva teller som mellomromstreff og hva teller som cut-back/45",
    ],
    variations: [
      "Bytt mellom Bayern-profil (side) og Barca-profil (mellomrom) hver 4.–5. min",
      "Stram inn bonus: gjenvinning må skje innen 6 sek og gi avslutning innen 8 sek",
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
    name: "Spill mot delvis etablert (start hos anker, 5 sek)",
    category: "game",
    duration: 18,
    playersMin: 16,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "8v8 (forslag: ca. 50x40 m). Angripende lag møter et delvis/lavt etablert forsvar. Hvert angrep starter hos anker/spillpunkt. Ved balltap har angrepslaget 5 sek til å gjenvinne; lykkes dere, starter nytt etablert angrep (fortsatt i «etablert»-fasen). Fokus er tålmodighet (vend/reset) framfor tvangsgjennombrudd.",
    coachingPoints: [
      "Definer «grønt lys» for gjennombrudd (ubalanse/rettvendt/timet løp) før dere spiller gjennom",
      "Bruk anker som sikkerhet + sidebytte når dere må starte på nytt",
      "5 sek-regel: gjenvinn eller fall av og steng sentralt",
    ],
    variations: [
      "Gi 2 poeng for gjennombrudd etter vending/sidebytte (reset før stikk)",
      "Poeng for gjenvinning ≤5 sek som leder til avslutning innen 10 sek",
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
    id: "uefa-a09-01",
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
    sourceRef: "A09 Bjarte Lunde Aarsheim – Overgangsspill",
  },
  {
    id: "uefa-a09-02",
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
    sourceRef: "A09 Bjarte Lunde Aarsheim – Overgangsspill",
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
