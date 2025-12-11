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
    exerciseNumber: 303,
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
    exerciseNumber: 304,
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
    exerciseNumber: 305,
    name: "Lavt i hjørnet-stasjoner",
    category: "station",
    duration: 16,
    playersMin: 12,
    playersMax: 20,
    theme: "avslutning",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Fire avslutningsstasjoner: curl lavt i hjørne, første-touch finish i sone 1c, bakre stolpe-løp, kontrollert skudd. Rotasjon hvert 4. minutt.",
    coachingPoints: [
      "Første touch forbereder skuddet",
      "Se keeper før avslutning",
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
    exerciseNumber: 306,
    name: "6-sekunders scoring",
    category: "game",
    duration: 16,
    playersMin: 12,
    playersMax: 14,
    theme: "kontring",
    equipment: ["mål", "kjegler"],
    description:
      "Gk+5v5+Gk. Ved omstilling må laget avslutte innen 6 sek og fra definert scoringssone. Bonus for lavt hjørne.",
    coachingPoints: [
      "Første touch framover",
      "Plassering fremfor kraft",
      "Fyll sone 1c med spiss/kant",
    ],
    variations: [
      "Legg til forsvarer",
      "Krav om 1-touch avslutning",
    ],
    source: "uefa",
    sourceRef: "A03 Tom Selmer – Sekundene som avgjør",
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
      "Fire stasjoner (teknikk, koordinasjon, pasning, skudd) inspirert av Basmas ROS-oppvekst. Foreldre eller medspillere rullerer – fokus på trygghet og lek.",
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
    exerciseNumber: 308,
    name: "Steg 4 konkurranse",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "spill",
    equipment: ["mål", "kjegler"],
    description:
      "8v8 på 60 x 45 m med 'profesjonelle' krav – etterligner Basmas KIL/Stabæk-steg. Høy intensitet og mentalt fokus på riktige valg.",
    coachingPoints: [
      "Lederskap",
      "Kvalitet i valg",
    ],
    variations: [
      "Må evalueres etter kampplan",
      "Gi spillerne spesifikke utviklingsoppdrag"],
    source: "uefa",
    sourceRef: "A05 Christer Basma – Mine suksesskriterier",
  },
  {
    id: "uefa-a01-01",
    exerciseNumber: 301,
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
    exerciseNumber: 302,
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
    exerciseNumber: 1,
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
    exerciseNumber: 2,
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
    exerciseNumber: 3,
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
    exerciseNumber: 4,
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
    exerciseNumber: 5,
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
    exerciseNumber: 6,
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
    exerciseNumber: 7,
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
    exerciseNumber: 1,
    name: "Prioriterte rom – 7v7",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Gk+6v6+Gk på 60x40m. Tre soner markert: framrom (foran 16m), mellomrom (midten), bakrom (bak forsvarslinje). Mål fra ulike soner gir ulike poeng: bakrom=3, mellomrom=2, framrom=1. Fokus på å prioritere bakrom først.",
    coachingPoints: [
      "Bakrom først! Strekk linja før du tilbyr til fot",
      "Mellomrom: søk rommet mellom linjer sentralt",
      "Spiss faller, indreløper løper – timing",
      "Les motstanderens linje – finn hullet",
    ],
    variations: [
      "Kun mål fra bakrom i første del",
      "Legg til tidsbegrensning per angrep",
      "Obligatorisk tredjemann-kombinasjon før mål",
    ],
    source: "uefa",
    sourceRef: "A12 Anders Fredriksen – Angrepsspill",
  },

  {
    id: "uefa-a12-02",
    exerciseNumber: 2,
    name: "Tredjeløp-sekvens",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål"],
    description:
      "Sekvensøvelse: A spiller til B, B til C (vegg), C løper i bakrom. Fokus på at tredjemann (C) starter løpet idet pasning 2 spilles – ikke før. Avslutning på mål. Roter posisjoner.",
    coachingPoints: [
      "Tredjemann: løp NÅR pasningen går, ikke FØR",
      "Veggspiller: ett touch, åpen kropp",
      "Igangsetter: løft hodet, se løpet",
      "Tempo i pasningene – ikke stopp ballen",
    ],
    variations: [
      "Legg til forsvarer som følger tredjemann",
      "Variér retning: høyre/venstre kant",
      "Kombiner med innlegg i stedet for avslutning",
    ],
    source: "uefa",
    sourceRef: "A12 Anders Fredriksen – Angrepsspill",
  },

  // ══════════════════════════════════════════════════════════
  // A13: Rolletrening sideback/indreløper (Arnstein Røen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a13-01",
    exerciseNumber: 1,
    name: "3v3 + keeper – SB/IL",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 8,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "3v3 + to keepere på 30x33 m. Fokuserer på sidebackens 1v1 leding/gjenvinning og indreløperens rettvendte mottak. Første pasning må være framover, scoring innen 6 sek etter gjenvinning gir bonus.",
    coachingPoints: [
      "Orientering før mottak – ta av press på første touch",
      "Sideback: led ut, bestem tidlig om du støtter",
      "Reaksjon <1 sek ved balltap",
    ],
    variations: [
      "Legg til joker som indreløper",
      "Touch-begrensning (maks 2) for IL",
    ],
    source: "uefa",
    sourceRef: "A13 Arnstein Røen – Sideback/Indreløper",
  },

  {
    id: "uefa-a13-02",
    exerciseNumber: 2,
    name: "7v7+kantsoner",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Gk+7v7 på 50x66,5 m med kantsoner. 3-3-1 struktur med jokere på kant. Vekt på SB/IL kombinasjoner, kantens skjæring og 3+2-balanse før overlapp.",
    coachingPoints: [
      "Sideback/indreløper: en går, en sikrer (3+2)",
      "Kant: skjær inn når IL får ball",
      "Lag: vurder kontring vs etablert hurtig",
    ],
    variations: [
      "Tillat joker å avslutte selv",
      "Varier presshøyde for forsvarende lag",
    ],
    source: "uefa",
    sourceRef: "A13 Arnstein Røen – Sideback/Indreløper",
  },

  // ══════════════════════════════════════════════════════════
  // A14: Indreløper i 4-3-1-2 (Magnus Oltedal)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a14-01",
    exerciseNumber: 1,
    name: "Diamant-possession",
    category: "rondo",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "possession",
    equipment: ["kjegler", "baller"],
    description:
      "4v4+3 jokere i 25x25 rute. Diamantmidtbane med regista og to indreløpere som jokere. 1-touch policy for jokere, scoring etter 10 pasninger og rombytte.",
    coachingPoints: [
      "Scanning før mottak",
      "1–2 touch i mellomrom",
      "Gi regista to støttevinkler",
    ],
    variations: [
      "Legg til press-trigger (ekstra spiller på press)",
      "Touch-begrensning for presslag",
    ],
    source: "uefa",
    sourceRef: "A14 Magnus Oltedal – Indreløper",
  },

  {
    id: "uefa-a14-02",
    exerciseNumber: 2,
    name: "Diamant gjennombrudd",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "8 angripere (4-3-1-2 med vingbacker) mot 6 forsvarere + keepere på 40x55m. Første gjennombrudd må involvere indreløper og vingback, og minst fire løp i boks.",
    coachingPoints: [
      "Two-move pattern for indreløper",
      "Regista: finn diagonale pasninger",
      "3F-gjenvinning innen 5 sek",
    ],
    variations: [
      "Vingback må slå innlegg på første touch",
      "Forsvar kan kontra for å teste 3+2",
    ],
    source: "uefa",
    sourceRef: "A14 Magnus Oltedal – Indreløper",
  },

  // ══════════════════════════════════════════════════════════
  // A15: Innlegg i Tippeligaen (Gard H. Kristiansen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a15-01",
    exerciseNumber: 1,
    name: "Innleggssoner A-C",
    category: "station",
    duration: 16,
    playersMin: 10,
    playersMax: 14,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "6v4+Gk på 40x50 m med markerte innleggssoner A-F. Angrep må slå innlegg fra A-C for å telle. Bonus for direkte scoring (innlegger + målscorer) og gjenvinningsmål innen 5 sek.",
    coachingPoints: [
      "Jobb ballen inn i A/B – ikke slå fra 25 m",
      "Minst tre i boks + bakre 45°",
      "Blokkert innlegg = umiddelbar gjenvinning",
    ],
    variations: [
      "Tillat dype innlegg kun ved overtall",
      "Tidsbegrensning fra sone til innlegg",
    ],
    source: "uefa",
    sourceRef: "A15 Gard Kristiansen – Innlegg",
  },

  {
    id: "uefa-a15-02",
    exerciseNumber: 2,
    name: "Direkte vs gjenvinning",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "7v7+Gk på halvbane. Mål gir ulik score: direkte innlegg-mål = 2 poeng, gjenvinningsmål innen 5 sek = 2, øvrige innleggsmål = 1. Fokus på roller (innlegger, boks, gjenvinner).",
    coachingPoints: [
      "Hurtig vurdering: etablert vs overgang",
      "Gjenvinning: 2 nærmeste presser, 3. sikrer",
      "Boksbemanning: rom 1–3 + bakre",
    ],
    variations: [
      "Varier presshøyde på forsvar",
      "Sett mål for innleggs-effektivitet (1 mål per 20 innlegg)",
    ],
    source: "uefa",
    sourceRef: "A15 Gard Kristiansen – Innlegg",
  },

  // ══════════════════════════════════════════════════════════
  // A16: Rosenborgs angrepsspill (Jørgen Ferstad)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a16-01",
    exerciseNumber: 1,
    name: "RBK-kombinasjoner",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 10,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "IL-kant-spiss kombinasjon 3v2+Gk på 35x25 m med bakrom. Fokus på L-løp for kant, 1-touch kombinasjon, spiss i rom 1/2, samt backdoor-løp for motsatt IL.",
    coachingPoints: [
      "Indreløper: frys–se–slå",
      "Kant: L-løp (ut–inn)",
      "Spiss: Rom 1→2",
    ],
    variations: [
      "Legg til motsatt IL for bakre 45°",
      "Touch-begrensning for IL",
    ],
    source: "uefa",
    sourceRef: "A16 Jørgen Ferstad – Rosenborg angrep",
  },

  {
    id: "uefa-a16-02",
    exerciseNumber: 2,
    name: "RBK fase-spill",
    category: "game",
    duration: 24,
    playersMin: 20,
    playersMax: 22,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "10v10+Gk (4-3-3 mot 4-4-2) på 2/3 bane. Trener styrer faser (etablert, kontring, overgang). Bonus for scoring etter definert mønster (kombinasjon, gullsonen, 6 sek kontring).",
    coachingPoints: [
      "Boksbemanning rom 1-3",
      "6 sek kontring",
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
    exerciseNumber: 1,
    name: "RBK-spiss boksbevegelser",
    category: "station",
    duration: 15,
    playersMin: 6,
    playersMax: 8,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "Sekvensøvelse med to kanter og indreløper som leverer tre typer innlegg (lavt første stolpe, cut-back, bakre). Spissen trener på L-løp og rom 1-3 + bakre 45°. Gjenvinningspress etter blokkert innlegg.",
    coachingPoints: [
      "L-løp: ut-stopp-inn",
      "Øyekontakt med kant",
      "Gjenvinn etter blokk",
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
    exerciseNumber: 2,
    name: "Spissrelasjoner 5v4",
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 10,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "IL + kant + midtspiss angriper mot 4 forsvarere. Mål teller kun etter kombinasjon (1-2, dyp-vegger). Bonus for mål på ett touch og for spiss som tar førsteforsvar ved balltap.",
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
    exerciseNumber: 1,
    name: "Gullsoner – spillvending",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "8v8+Gk på 50x45 m. Angripende lag må vende spillet før de kan forsøke gjennombrudd. Fokus på å overbefolke en side, trekke motstander, og vende raskt til motsatt for å angripe gullsonen mellom back og stopper.",
    coachingPoints: [
      "Tålmodig bearbeiding – vurder pressbalanse",
      "Vending = tempo (2 touch maks)",
      "Angrip mellom back/stopper etter vending",
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
    exerciseNumber: 2,
    name: "Gjenvinning lav blokk",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "6v6 på 35x35 m med to småmål i hver ende. Lag A angriper mot lav blokk, men hver gang innlegget/blcokerte skuddet skjer, skal de gjenvinne innen 5 sek og angripe gjennom sentrum. Trener legger inn baller for å simulere Rosenborgs gjenvinning.",
    coachingPoints: [
      "Struktur: 3+2 sikring",
      "Vinn ball nær boks – spill gjennom forskjøyvde rom",
      "Første touch framover etter gjenvinning",
    ],
    variations: [
      "Legg til kantsoner for overlapp",
      "Bruk tidsbonus (mål innen 8 sek etter gjenvinning)",
    ],
    source: "uefa",
    sourceRef: "A18 Hiep Tran – Angrep mot etablert forsvar",
  },

  // ══════════════════════════════════════════════════════════
  // A19: Hva bør vektlegges i angrep mot etablert forsvar (Ståle Andersen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a19-01",
    exerciseNumber: 1,
    name: "KFUM nærrom-possession",
    category: "rondo",
    duration: 16,
    playersMin: 12,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "baller"],
    description:
      "Tre soner á 10x25 m med 4v2 i hver. Ballen skal oppholde seg i en sone med minst fem pas før den flyttes. Ved balltap skal 1F presse framover innen 3 sek (gjenvinningsprinsipp).",
    coachingPoints: [
      "Pasningskvalitet i trange rom",
      "Støttevinkler (to-touch-policy)",
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
    exerciseNumber: 2,
    name: "Spill mot lav blokk 8v8",
    category: "game",
    duration: 18,
    playersMin: 16,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "8v8 på 50x40 m. Angripende lag (4-3-3) møter 4-4-2 i lav blokk. Poeng for gjennombrudd i definerte soner (rom 2/3, kant). Bonus for mål etter gjenvinning innen 6 sek.",
    coachingPoints: [
      "Tålmodighet i bearbeiding",
      "Back-IL-kant kombinasjoner",
      "Struktur (3+2 sikring) før risiko",
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
    exerciseNumber: 1,
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
    exerciseNumber: 2,
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
    exerciseNumber: 1,
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
    exerciseNumber: 2,
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
  // A22: RBK i angrep (Svein Maalen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a22-01",
    exerciseNumber: 1,
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
    sourceRef: "A22 Svein Maalen – RBK i angrep",
  },

  {
    id: "uefa-a22-02",
    exerciseNumber: 2,
    name: "Kontring til balanse 6v4",
    category: "game",
    duration: 20,
    playersMin: 10,
    playersMax: 12,
    theme: "overgang",
    equipment: ["mål", "baller", "tidsklokke"],
    description:
      "50x40 m i tre soner. Lag starter hos keeper, skal finne kontringsrom innen seks sekunder og avslutte. Etter avslutning må laget falle og sikre «def i off»-soner. Fokus på første pasning fram og restforsvar.",
    coachingPoints: [
      "Første pasning fram/diagonal",
      "Kommunikasjon stoppere–sentral midt",
      "Press på ball eller fall samlet",
    ],
    variations: [
      "Legg til nøytral støtte",
      "Endre tidskrav til 5 sek",
    ],
    source: "uefa",
    sourceRef: "A22 Svein Maalen – RBK i angrep",
  },

  {
    id: "uefa-a22-03",
    exerciseNumber: 3,
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
    sourceRef: "A22 Svein Maalen – RBK i angrep",
  },

  {
    id: "uefa-a22-04",
    exerciseNumber: 4,
    name: "Gjennombruddstriangel 8v6",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 16,
    theme: "angrep",
    equipment: ["mål", "kjegler", "mannequins"],
    description:
      "60x45 m med tre korridorer. Angripende 4-2-3-1 møter 6 forsvarere i 4-4-2. Back + kant + indreløper må involveres før innlegg. Tre trekk i mellomrom før gjennombrudd tvinger timing.",
    coachingPoints: [
      "Tredjemannsbevegelse i korridor",
      "Sentral midt skanner restforsvar",
      "Tempo i ballflytting før gjennombrudd",
    ],
    variations: [
      "Fjern tre-trekk-regel for enklere versjon",
      "To-touch-begrensning i siste tredel",
    ],
    source: "uefa",
    sourceRef: "A22 Svein Maalen – RBK i angrep",
  },

  {
    id: "uefa-a22-05",
    exerciseNumber: 5,
    name: "Press-reset 7v7+Gk",
    category: "game",
    duration: 22,
    playersMin: 16,
    playersMax: 16,
    theme: "overgang",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "55x40 m kamp med restforsvarssoner. Etter hver avslutning får laget tre sekunder til å etablere 5-0-2 restforsvar før motstander kan kontre. Pressfelle trigges kun på signal fra spiss.",
    coachingPoints: [
      "Kommunikasjon stopper–sentral midt",
      "Stramme linjeavstander før press",
      "Kjenn når du skal falle vs. presse",
    ],
    variations: [
      "Gi fem sekunder restforsvarstid (enklere)",
      "Legg til ekstra joker for kontring (hardere)",
    ],
    source: "uefa",
    sourceRef: "A22 Svein Maalen – RBK i angrep",
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
    exerciseNumber: 310,
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
    exerciseNumber: 311,
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
