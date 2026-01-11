/**
 * Øvelser fra DBUs "Den røde tråd" - spillerutviklingsmodell
 * Kilde: Dansk Boldspil-Union (DBU)
 * Aldersrelateret Træning 2: https://www.dbu.dk/media/10246/aldersrelateret_traening_2.pdf
 * 
 * Dansk → Norsk ordliste:
 * - genpres → gegenpressing/motpress (gjenvinningspress når motstander er i ubalanse)
 * - boldbesiddelse → ballbesittelse (possession)
 * - boldholder → ballfører
 * - modspiller → motspiller
 * - medspiller → medspiller
 * - omstilling → overgang
 * - retvendt → vendt mot mål
 * - rygvendt → vendt fra mål
 * - sidevendt → sidevendt
 * - forfint → fintebevegelse
 * - støttepasning → støttepasning (vegg)
 * - bagkæde → backrekke (forsvarsrekke)
 * - bagrum → bakrom
 * - erobringsspil → erobringsspill
 * - afslutningsspil → avslutningsspill
 * - opbygningsspil → oppbyggingsspill
 */

import type { ExerciseData } from './exercises';

export const dbuExercises: ExerciseData[] = [
  // === PASNINGSØVELSER (Y-øvelser) ===
  {
    id: "dbu-y1-enkelt-y",
    exerciseNumber: 1,
    name: "Enkelt Y (Y1)",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "pasning",
    equipment: ["baller", "kjegler"],
    description:
      "Y-formet pasningsøvelse med bevegelse. Spillerne jobber med pasningskvalitet, timing av løp og vendinger. Fokus på å skape vinkler og spille på offensiv fot.",
    coachingPoints: [
      "Spill på fjerneste fot (offensiv fot)",
      "Tilpass ballens fart til avstand",
      "Forbered mottaket - orienter deg før du får ballen",
      "Timing i løp - mot og vekk",
    ],
    variations: [
      "Kun én berøring",
      "Spillerne velger selv variant",
      "Legg til vending i midten",
    ],
    source: "dbu",
  },
  {
    id: "dbu-y2-dobbelt-y",
    exerciseNumber: 2,
    name: "Dobbelt Y (Y2)",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "pasning",
    equipment: ["baller", "kjegler"],
    description:
      "Utvidet Y-øvelse med to Y-formasjoner. Fokus på motsattrettede bevegelser, vinkler og pasningskvalitet.",
    coachingPoints: [
      "Skap vinkler i spillet",
      "Motsattrettede bevegelser",
      "Bli vendt mot mål på første berøring",
      "Tøm og fyll rom",
    ],
    variations: [
      "Legg til avslutning på mål",
      "Variér antall berøringer",
      "Spillerne velger løsninger selv",
    ],
    source: "dbu",
  },
  {
    id: "dbu-m-oevelse",
    exerciseNumber: 3,
    name: "M-øvelse",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "pasning",
    equipment: ["baller", "kjegler"],
    description:
      "M-formet pasningsøvelse med fokus på de sentrale spillernes bevegelse i forhold til hverandre. Vinkler, avstander og timing.",
    coachingPoints: [
      "Timing i løp",
      "Skap vinkler",
      "Fintebevegelse (vekk og mot / mot og vekk) - åpne opp",
      "De sentrale spillernes bevegelse i forhold til hverandre",
    ],
    variations: [
      "Falle ut på blindsiden - åpne opp",
      "Falle ned - åpne opp",
      "Variér avstander",
    ],
    source: "dbu",
  },

  // === BALLBESITTELSESSPILL ===
  {
    id: "dbu-4v4-3-possession",
    exerciseNumber: 472,
    name: "4v4+3 ballbesittelse",
    category: "station",
    duration: 15,
    playersMin: 11,
    playersMax: 11,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Possession med 4v4 og 3 jokere. Plasser spillerne ut fra deres posisjoner. Fokus på å holde ballen og skape vinkler.",
    coachingPoints: [
      "Skap vinkler i spillet",
      "Bevegelser i forhold til motspillere, medspillere og ballfører",
      "Hold dybde og bredde (motsattrettede bevegelser)",
      "Ro på ballen i forhold til press",
    ],
    variations: [
      "Spill på tid uten overganger",
      "Legg til overganger",
      "Variér antall berøringer",
    ],
    source: "dbu",
  },
  {
    id: "dbu-4v4-4-possession",
    exerciseNumber: 407,
    name: "4v4+4 ballbesittelse",
    category: "station",
    duration: 15,
    playersMin: 12,
    playersMax: 12,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Possession med 4v4 og 4 jokere på sidene. Endesoner bør ha midtforsvarere. Fokus på ballbesittelse og spillestil.",
    coachingPoints: [
      "Spill forbi den nærmeste",
      "Orientering etter innspill sentralt",
      "Agere framfor å reagere",
      "Spill og bevegelse",
    ],
    variations: [
      "Begrens berøringer",
      "Poeng for spill gjennom sentralt",
      "Med overganger",
    ],
    source: "dbu",
  },
  {
    id: "dbu-3v3-2-possession",
    exerciseNumber: 411,
    name: "3v3+2 ballbesittelse",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 8,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Mindre possession 3v3 med 2 jokere. Ideelt for fokus på de sentrale spillernes bevegelser.",
    coachingPoints: [
      "Skap vinkler og avstander",
      "Motsattrettede bevegelser",
      "Skal kunne se ballen hele tiden",
      "Ro på ballen under press",
    ],
    variations: [
      "Kun to berøringer",
      "Fri touch",
      "Bytt jokere etter tid",
    ],
    source: "dbu",
  },

  // === STORE BALLBESITTELSESSPILL ===
  {
    id: "dbu-5v5-3-stor",
    exerciseNumber: 7,
    name: "5v5+3 stort possession",
    category: "station",
    duration: 18,
    playersMin: 13,
    playersMax: 13,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Stort possession på ca 30x45m. Plasser spillerne ut fra deres posisjoner. Fokus på de sentrale spillernes bevegelse i forhold til hverandre.",
    coachingPoints: [
      "Hold dybde og bredde",
      "De sentrale spillernes bevegelse i forhold til hverandre",
      "Skap vinkler og avstander",
      "Spill forbi den nærmeste",
    ],
    variations: [
      "Spill på tid",
      "Med overganger",
      "Variér jokernes posisjoner",
    ],
    source: "dbu",
  },
  {
    id: "dbu-6v6-3-stor",
    exerciseNumber: 8,
    name: "6v6+3 stort possession",
    category: "station",
    duration: 18,
    playersMin: 15,
    playersMax: 15,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Stort possession med 6v6 og 3 jokere. Brukes for å trene spillestilselementer i større format.",
    coachingPoints: [
      "Orientering etter innspill sentralt",
      "Bevegelser i forhold til motspillere og medspillere",
      "Agere framfor å reagere",
      "Spill og bevegelse",
    ],
    variations: [
      "Begrens berøringer",
      "Med mål og keepere",
      "Med overganger",
    ],
    source: "dbu",
  },
  {
    id: "dbu-7v7-3-stor",
    exerciseNumber: 9,
    name: "7v7+3 stort possession",
    category: "station",
    duration: 20,
    playersMin: 17,
    playersMax: 17,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester", "mål"],
    description:
      "Stort possession 7v7+3, kan spilles med eller uten mål. Posisjonerer spillere ut fra deres roller.",
    coachingPoints: [
      "De sentrale spillernes bevegelse",
      "Skap vinkler og avstander",
      "Hold dybde og bredde",
      "Spill forbi den nærmeste",
    ],
    variations: [
      "Med retning mot mål",
      "Uten overganger først",
      "Legg til overganger senere",
    ],
    source: "dbu",
  },
  {
    id: "dbu-8v8-2-stor",
    exerciseNumber: 10,
    name: "8v8+2 stort possession",
    category: "game",
    duration: 20,
    playersMin: 18,
    playersMax: 18,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester", "mål"],
    description:
      "Nesten fullskala possession 8v8 med 2 jokere. Trener spillestilselementer i kamplik situasjon.",
    coachingPoints: [
      "Alle ballbesittelses-prinsipper",
      "De sentrale spillernes bevegelser",
      "Motsattrettede bevegelser",
      "Spill dypt før bredt",
    ],
    variations: [
      "Med mål",
      "Med overganger",
      "Posisjonsspesifikke krav",
    ],
    source: "dbu",
  },
  {
    id: "dbu-9v9-1-stor",
    exerciseNumber: 11,
    name: "9v9+1 stort possession",
    category: "game",
    duration: 22,
    playersMin: 19,
    playersMax: 19,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester", "mål"],
    description:
      "Fullskala possession 9v9+1. Brukes for å trene hele spillestilen i en setting nær 11v11.",
    coachingPoints: [
      "Alle spillestilselementer",
      "Spill dybt før bredt",
      "Mange lag i holdet",
      "Mange linjer i spillet",
    ],
    variations: [
      "Med retning mot mål",
      "Med overganger",
      "Fokus på spesifikke temaer",
    ],
    source: "dbu",
  },

  // === CITY-SPILL OG GJENVINNSPRESSING ===
  {
    id: "dbu-city-spill",
    exerciseNumber: 423,
    name: "City-spill (gegenpressing)",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 13,
    theme: "pressing",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Blå spiller 4v1 med 1 berøring i liten firkant. Når rød vinner ballen, spilles den ut i stor firkant og det blir 6v4. Blå går straks i gegenpressing.",
    coachingPoints: [
      "Hurtig reaksjon etter balltap - gegenpressing",
      "Kommunikasjon og press",
      "Skap flere linjer for ballfører",
      "Spill ballen hurtig vekk fra press",
    ],
    variations: [
      "Variér antall spillere",
      "Begrens berøringer i kantene",
      "Legg til tidsfaktor",
      "Posisjonert",
    ],
    source: "dbu",
  },

  // === VENDESPILL ===
  {
    id: "dbu-vendespill-6v2",
    exerciseNumber: 425,
    name: "Vendespill 6v2",
    category: "station",
    duration: 15,
    playersMin: 14,
    playersMax: 22,
    theme: "vendingsspill",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Spill i 2 kanter med mellomsone. I mellomsonen skal det gjøres en vending (vende opp i banen). 6v2 i kantene, 1 forsvarer i mellomsonen.",
    coachingPoints: [
      "Pasningskvalitet",
      "Første berøring",
      "Vinkler - spill forbi press",
      "Forberedelse av ballmottak - bli vendt mot mål på 1. berøring",
    ],
    variations: [
      "Variér antall spillere (8-7v3, 6-5v2)",
      "Flere forsvarere i mellomsonen",
      "Støttespill i mellomsonen (fram/tilbake/fram)",
    ],
    source: "dbu",
  },

  // === LINJESPILL ===
  {
    id: "dbu-linjespill-4v2",
    exerciseNumber: 427,
    name: "Linjespill 4v2",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 6,
    theme: "gjennombrudd",
    equipment: ["baller", "kjegler"],
    description:
      "4v2 linjespill i lengderetning. Spill gjennom motstanderlinjer, oppsøk press og spill forbi - alltid to muligheter (høyre eller venstre).",
    coachingPoints: [
      "Pasningskvalitet - spill på fjerneste fot",
      "Forberedelse av ballmottak",
      "Timing av løp - fintebevegelse (vekk og mot)",
      "Vending med ball - bli vendt mot mål på 1. berøring",
    ],
    variations: [
      "Step A: Motstandere kun på linjer",
      "Step B: Bakre motstander kan gå i press",
      "Step C: Begge kan gå i press",
    ],
    source: "dbu",
  },
  {
    id: "dbu-linjespill-9v8",
    exerciseNumber: 15,
    name: "Linjespill 9v8",
    category: "game",
    duration: 20,
    playersMin: 17,
    playersMax: 17,
    theme: "gjennombrudd",
    equipment: ["baller", "kjegler"],
    description:
      "9v8 linjespill fra felt til felt. Spill gjennom motstanderlinjer med fokus på persepsjonsevne hos sentrale spillere.",
    coachingPoints: [
      "Spill i vinkler",
      "Ut av 'skyggen'",
      "Orientering - fjerneste fot, ta ballen opp i banen",
      "Falle ut på blindsiden - åpne opp",
    ],
    variations: [
      "Step 1: Forsvar kun på linjer",
      "Step 2: Første linje på linje, andre kan presse",
      "Step 3: Begge linjer kan presse",
    ],
    source: "dbu",
  },
  {
    id: "dbu-linjespill-11v11",
    exerciseNumber: 16,
    name: "Linjespill 11v11",
    category: "game",
    duration: 25,
    playersMin: 22,
    playersMax: 22,
    theme: "gjennombrudd",
    equipment: ["baller", "mål"],
    description:
      "11v11 linjespill på hel bane. Spill gjennom motstanderlinjer - spillerne kan velge mellom varianter eller finne egne løsninger.",
    coachingPoints: [
      "Alle linjespill-prinsipper",
      "Persepsjonsevne - sentrale spillere",
      "Spill forbi motstanderens forsvarslinjer",
      "Skap alltid to muligheter",
    ],
    variations: [
      "Step 1: Forsvar kun på linjer",
      "Step 2: Gradvis mer press",
      "Step 3: Fritt spill",
    ],
    source: "dbu",
  },

  // === AVSLUTNINGSØVELSER ===
  {
    id: "dbu-enkelt-y-avslutning",
    exerciseNumber: 437,
    name: "Enkelt Y til avslutning",
    category: "station",
    duration: 15,
    playersMin: 6,
    playersMax: 12,
    theme: "avslutning",
    equipment: ["baller", "kjegler", "mål"],
    description:
      "Progresjon på pasningsøvelsen med avslutning. Fokus på overgangen fra oppbyggingsspill til avslutningsspill.",
    coachingPoints: [
      "Timing/tempo i løp før avslutning",
      "Avslutningskvalitet",
      "Pasningskvalitet fra oppbyggingen",
      "Spillerne velger selv variant",
    ],
    variations: [
      "Variér avslutningsposisjon",
      "Legg til forsvarere",
      "Spillerne finner egne løsninger",
    ],
    source: "dbu",
  },
  {
    id: "dbu-lop-i-feltet",
    exerciseNumber: 439,
    name: "Løp i feltet",
    category: "station",
    duration: 15,
    playersMin: 3,
    playersMax: 6,
    theme: "innlegg",
    equipment: ["baller", "mål"],
    description:
      "Øvelse for innleggskvalitet, løp i feltet og avslutningskvalitet. 3-6 spillere + keeper.",
    coachingPoints: [
      "Innleggskvalitet - rundskjev eller halvliggende vristspark",
      "Timing i innløp (knekløp)",
      "Arbeid på blindsiden av forsvarerne",
      "Avslutt med nærmeste ben",
    ],
    variations: [
      "Variér innleggsposisjon",
      "Legg til forsvarere",
      "Dobbel avslutning",
    ],
    source: "dbu",
  },
  {
    id: "dbu-dype-lop-1",
    exerciseNumber: 442,
    name: "Dype løp mot backrekke 1",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["baller", "mål", "kjegler"],
    description:
      "Gjennombrudd via dybdeløp. Fokus på timing/tempo i løp av kant (7/11) som støttespiller og dybdeløper.",
    coachingPoints: [
      "Timing/tempo i løp",
      "Back (3/4) - god berøring og orientering framover",
      "9'er skal arbeide på blindside",
      "Avslutningskvalitet",
    ],
    variations: [
      "Variér startposisjon",
      "Legg til forsvarere",
      "Chipball i bakrom",
    ],
    source: "dbu",
  },
  {
    id: "dbu-dype-lop-2",
    exerciseNumber: 20,
    name: "Dype løp mot backrekke 2 (chip)",
    category: "station",
    duration: 15,
    playersMin: 5,
    playersMax: 11,
    theme: "gjennombrudd",
    equipment: ["baller", "mål"],
    description:
      "Nr. 6 blir retvendt og setter medspillere bak motstanderens rekke. Fokus på chipball-muligheter i bakrommet.",
    coachingPoints: [
      "Sparketeknisk: chipballen",
      "Timing i løp gjennom backrekken",
      "Modsatrettede bevegelser innløp/fremløp",
      "Arbeid med avslutninger sentralt",
    ],
    variations: [
      "4 motstandere i backrekke",
      "8 motstandere",
      "Ekstra innlegg etter første avslutning",
    ],
    source: "dbu",
  },
  {
    id: "dbu-gjennombrudd-kant",
    exerciseNumber: 21,
    name: "Gjennombrudd på kant",
    category: "station",
    duration: 15,
    playersMin: 5,
    playersMax: 10,
    theme: "innlegg",
    equipment: ["baller", "mål", "kjegler"],
    description:
      "Gjennombrudd på kanten med innlegg og avslutning. 5-10 spillere per side + keeper.",
    coachingPoints: [
      "Pasningskvalitet",
      "Timing/tempo i løp",
      "Innleggskvalitet - rundskjev vristspark",
      "Løp i feltet - timing, blindside",
    ],
    variations: [
      "Varianter enkeltvis først",
      "Spillerne velger variant",
      "Spillerne finner egne løsninger",
    ],
    source: "dbu",
  },

  // === OVERGANGSSPILLØVELSER ===
  {
    id: "dbu-omstilling-de-vi-1",
    exerciseNumber: 281,
    name: "Overgang de/vi (øvelse 1)",
    category: "game",
    duration: 18,
    playersMin: 12,
    playersMax: 16,
    theme: "omstilling",
    equipment: ["baller", "mål"],
    description:
      "Rød spiller til angriber som laver motløp og støttespill. Rødt angriper blåt mål, to forsvarere forsvarer. Ved avslutning serverer blå til sin angriber.",
    coachingPoints: [
      "Hold ballen sentralt",
      "Tempo i løpene rundt ballfører",
      "Ballholder skal legge press på forsvarsspillerne",
      "Spill så sent som mulig",
    ],
    variations: [
      "Variér antall spillere",
      "Legg til tidsbegrensning",
      "Poeng for hurtige mål",
    ],
    source: "dbu",
  },
  {
    id: "dbu-omstilling-de-vi-2",
    exerciseNumber: 23,
    name: "Overgang de/vi (øvelse 2)",
    category: "game",
    duration: 18,
    playersMin: 12,
    playersMax: 16,
    theme: "omstilling",
    equipment: ["baller", "mål", "vester"],
    description:
      "Rød har ballen med jokerne i midten. Når de taper ballen, kan blå gå i overgang sammen med jokerne. Rød må lage returløp.",
    coachingPoints: [
      "Hold ballen sentralt",
      "Tempo i løpene rundt ballfører",
      "Spill dypt og løp dypt",
      "Hurtige overganger",
    ],
    variations: [
      "2 mål",
      "4v4+4",
      "Variér banestørrelse",
    ],
    source: "dbu",
  },
  {
    id: "dbu-omstilling-4v6-5v8",
    exerciseNumber: 24,
    name: "Overgang de/vi 4v6/5v8",
    category: "game",
    duration: 18,
    playersMin: 10,
    playersMax: 13,
    theme: "omstilling",
    equipment: ["baller", "mål"],
    description:
      "Rød starter med dribbling i maks fart mot blåt mål. Blå spiller bak rød sprinter hjem for å hjelpe forsvaret. Fokus på overgang i overtal/liketal.",
    coachingPoints: [
      "Hold ballen sentralt",
      "Tempo i løpene rundt ballfører",
      "Løp på forsvarets blindside",
      "Oppsøk motstander - legg press",
    ],
    variations: [
      "Juster antall spillere",
      "Fokus på de/vi eller vi/de",
      "Varier startposisjon",
    ],
    source: "dbu",
  },

  // === PRESSSPILL ===
  {
    id: "dbu-6v8-1-presspill",
    exerciseNumber: 25,
    name: "6v8+1 presspill",
    category: "game",
    duration: 20,
    playersMin: 15,
    playersMax: 15,
    theme: "pressing",
    equipment: ["baller", "mål", "kjegler"],
    description:
      "Blå har oppspill fra keeper. Blåt hold skal spille til 9'er i sentral sone. Rødt hold skal erobre ballen med organisert press. Signal til press er at rød 9'er velger side.",
    coachingPoints: [
      "Signaler i presset",
      "Skjær banen av",
      "Press på ballen - sideforskyvning",
      "Kommunikasjon",
    ],
    variations: [
      "Variér berøringer hos blå",
      "Tid/avleveringsantall ved erobring",
      "Blå 9'er kan spilles i luften",
    ],
    source: "dbu",
  },

  // === 1V1 ØVELSER ===
  {
    id: "dbu-1v1-retvendt",
    exerciseNumber: 451,
    name: "1v1 vendt mot mål",
    category: "station",
    duration: 10,
    playersMin: 2,
    playersMax: 2,
    theme: "1v1",
    equipment: ["baller", "kjegler", "småmål"],
    description:
      "1v1 der angriper er vendt mot mål. Forsvarsspiller må agere mens ballen er underveis. Angriper scorer ved å drible gjennom keglemål.",
    coachingPoints: [
      "Forsvarers posisjonering",
      "Timing av press",
      "Angriper: gegenpressing ved tap",
      "Individuell pressferdighet",
    ],
    variations: [
      "Variér startposisjon",
      "Legg til tidsbegrensning",
      "Turneringformat",
    ],
    scalable: true,
    source: "dbu",
  },
  {
    id: "dbu-1v1-rygvendt",
    exerciseNumber: 455,
    name: "1v1 vendt fra mål",
    category: "station",
    duration: 10,
    playersMin: 2,
    playersMax: 2,
    theme: "1v1",
    equipment: ["baller", "mål", "småmål"],
    description:
      "1v1 der angriper er vendt fra mål. Ball spilles i føttene eller i luften. Forsvarsspiller agerer mens ballen er underveis.",
    coachingPoints: [
      "Forsvarers posisjonering",
      "Press før angriper snur",
      "Angriper: gegenpressing ved tap",
      "Individuell pressferdighet",
    ],
    variations: [
      "Ball i føttene",
      "Ball i luften (kropp)",
      "Stor mål vs småmål",
    ],
    scalable: true,
    source: "dbu",
  },
  {
    id: "dbu-1v1-sidevendt",
    exerciseNumber: 460,
    name: "1v1 sidevendt",
    category: "station",
    duration: 10,
    playersMin: 2,
    playersMax: 2,
    theme: "1v1",
    equipment: ["baller", "kjegler", "småmål"],
    description:
      "1v1 der angriper er sidevendt. Angriper scorer ved å drible gjennom keglemål, forsvarer scorer på småmål.",
    coachingPoints: [
      "Forsvarers posisjonering",
      "Styr angriper mot ønsket side",
      "Angriper: gegenpressing ved tap",
      "Individuell pressferdighet",
    ],
    variations: [
      "Variér startposisjon",
      "Krav om vending først",
      "Turneringformat",
    ],
    scalable: true,
    source: "dbu",
  },
  {
    id: "dbu-1v1-sentral-midtbane",
    exerciseNumber: 29,
    name: "1v1 for sentrale midtbanespillere",
    category: "station",
    duration: 12,
    playersMin: 2,
    playersMax: 4,
    theme: "1v1",
    equipment: ["baller", "kjegler"],
    description:
      "Posisjonsspesifikk 1v1 for sentrale midtbanespillere. Settes i tre ulike situasjoner: vendt mot mål, vendt fra mål og sidevendt.",
    coachingPoints: [
      "Posisjonsspesifikke pressferdigheter",
      "Les situasjonen",
      "Tilpass press til situasjon",
      "Gjenvinnspressing ved balltap",
    ],
    variations: [
      "Roter gjennom alle tre situasjoner",
      "Fokus på én situasjon",
      "Legg til støttespiller",
    ],
    scalable: true,
    source: "dbu",
  },

  // === FORSVARSSPILL ===
  {
    id: "dbu-6v8-forsvarsspill",
    exerciseNumber: 293,
    name: "6+1v8 forsvarsspill",
    category: "game",
    duration: 20,
    playersMin: 15,
    playersMax: 15,
    theme: "forsvar",
    equipment: ["baller", "mål"],
    description:
      "Rød keeper starter med utspark til blå. Rødt hold pumper formasjonen opp. Blåt hold har overtal på kanten, så rød øver innleggsstrategi.",
    coachingPoints: [
      "Pumpe og falle ift ball og motstandere",
      "Posisjoner ved innlegg",
      "Sideforskyvning av backer",
      "Stopper på ballside setter linje",
    ],
    variations: [
      "Rødt scorer ved 5 pasninger ved erobring",
      "Rødt scorer ved å få ballen over midten",
      "Variér antall spillere",
    ],
    source: "dbu",
  },

  // === OVERGANGSSPILL (fra Aldersrelateret Træning 2) ===
  {
    id: "dbu-genpres-oevelse",
    exerciseNumber: 296,
    name: "Gjenvinnspressing 9v5",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 14,
    theme: "omstilling",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "9v5 i lite område på banens midte. Ved balltap vurderes lynhurtigt: Gjenvinnspressing eller forsvarsspill? Ved gegenpressing: enten vinn ball, tving bakspill, eller ball 'løftes langt'. Ved forsvarsspill: 5v5 med scoring.",
    coachingPoints: [
      "Lynhurtig vurdering ved balltap",
      "Gjenvinnspressing = første forsvarer",
      "Tvinge bakspill = vinn tid",
      "Alle 5 i gegenpressing samtidig",
    ],
    variations: [
      "7v5 ved balltap",
      "Tidsbegrensning på gegenpressing",
      "Poeng for vellykket gegenpressing",
    ],
    source: "dbu",
  },
  {
    id: "dbu-klassisk-kontra",
    exerciseNumber: 300,
    name: "Klassisk kontraangrep",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 22,
    theme: "omstilling",
    equipment: ["baller", "mål", "vester"],
    description:
      "Kompakt forsvar mot oppbyggingsspill. Fokus på å utnytte bakrommet ved erobring. Presspiller stjåler ball og spiller dypt til spiss som løper ved erobring/overgang.",
    coachingPoints: [
      "Utnytt numerisk/posisjonell ubalanse",
      "Timing av dype løp",
      "Slå dype ball i riktig øyeblikk",
      "Fart mot mål",
    ],
    variations: [
      "Start fra ulike posisjoner",
      "Legg til støttespiller",
      "Fokus på 2. bølge",
    ],
    source: "dbu",
  },
  {
    id: "dbu-kollektiv-kontra",
    exerciseNumber: 624,
    name: "Kollektiv kontra",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 16,
    theme: "omstilling",
    equipment: ["baller", "mål", "vester"],
    description:
      "Gruppe-kontraangrep med direkte og flytende kombinasjonsspill i høy fart. Fokus på spill på 3. mann. Ball erobres sentralt, spilles dypt med støttepasning, deretter dybt igjen.",
    coachingPoints: [
      "Fart i ball OG medspillere",
      "Spill på 3. mann",
      "Direkte pasningsspill",
      "Utnytt posisjonell ubalanse",
    ],
    variations: [
      "Start fra ulike erobringsposisjoner",
      "Variér antall spillere",
      "2. bølge kommer bredt og dypt",
    ],
    source: "dbu",
  },
  {
    id: "dbu-avansert-kontra-genpres",
    exerciseNumber: 527,
    name: "Avansert kontra: Høy gegenpressing",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 22,
    theme: "omstilling",
    equipment: ["baller", "mål", "vester"],
    description:
      "Høyt press eller gegenpressing for å vinne ball på motstanderens halvdel. Utnytt at motstander er i posisjonell/numerisk ubalanse. Kort avstand til mål ved erobring.",
    coachingPoints: [
      "Mentalt mot til å presse høyt",
      "Kompakt organisasjon",
      "Fokus på ball",
      "Dyktige 1v1 defensivt",
    ],
    variations: [
      "Avgrens pressområde",
      "Tidsbegrensning på gegenpressing",
      "Poeng for erobring i sone",
    ],
    source: "dbu",
  },
  {
    id: "dbu-enkeltmands-kontra",
    exerciseNumber: 528,
    name: "Enkeltmanns-kontra",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "omstilling",
    equipment: ["baller", "mål", "vester"],
    description:
      "Individuelle gjennombrudd. Hurtig angriper stjåler ball og kjører direkte mot mål. Fokus på 1v1 eller 1v2 situasjoner. Angriperne defineres som 'første forsvarer'.",
    coachingPoints: [
      "Aggressiv erobring",
      "Fart med ball",
      "Løsninger i 1v1/1v2",
      "Timing av avslutning",
    ],
    variations: [
      "Start fra ulike posisjoner",
      "Med/uten støttespiller",
      "Konkurranseform",
    ],
    source: "dbu",
  },

  // === ANGREPSPRINSIPPER (fra Aldersrelateret Træning 2) ===
  {
    id: "dbu-bandespill",
    exerciseNumber: 36,
    name: "Bandespill (veggspill)",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["baller", "kjegler"],
    description:
      "Ballholder (1) sender til medspiller (2) som agerer bande - spiller på 1. berøring tilbake til (1) som har løpt i ny posisjon. Pasningen tilbake overspiller ofte en motstander.",
    coachingPoints: [
      "1. berøring-pasning tilbake",
      "Timing av løp fra ballfører",
      "Overspill motstander i fritt rom",
      "Særlig effektivt mot soneforsvar",
    ],
    variations: [
      "Legg til forsvarere",
      "Kombiner med avslutning",
      "Variér avstander",
    ],
    source: "dbu",
  },
  {
    id: "dbu-overlap",
    exerciseNumber: 37,
    name: "Overlap",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["baller", "kjegler"],
    description:
      "Medspiller (1) bak ballfører (2) løper forbi - overlapper. Kan kombineres med motløp/overlap. Særlig effektivt med brede kanter som utfordrer inn i banen.",
    coachingPoints: [
      "Timing av overlap-løp",
      "Skaper 2v1 på kanten",
      "Kombinasjon med motløp",
      "Kommunikasjon",
    ],
    variations: [
      "Med innlegg",
      "Med avslutning",
      "I spillsituasjon",
    ],
    source: "dbu",
  },
  {
    id: "dbu-boldovertagelse",
    exerciseNumber: 38,
    name: "Ballovertakelse",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["baller", "kjegler"],
    description:
      "Ballholder dribler, motløpende medspiller overtar ballen. Brukes i bredde- og lengderetning. Effektivt etter pasningssekvens i lite område som har trukket mange motstandere.",
    coachingPoints: [
      "Timing av overtagelse",
      "Vend spillet",
      "Utnytt fritt område på motsatt side",
      "Lang pasning etter overtagelse",
    ],
    variations: [
      "I bredderetning",
      "I lengderetning",
      "Med lang pasning etterpå",
    ],
    source: "dbu",
  },
  {
    id: "dbu-modloep",
    exerciseNumber: 39,
    name: "Motløp",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["baller", "kjegler"],
    description:
      "Medspiller løper mot spilleretningen og mot ballfører. Samtidig og veltimet motløp fra spiss og offensiv midtbane kan skape større bakrom for gjennombrudd.",
    coachingPoints: [
      "Timing av motløp",
      "Skaper rom bak",
      "Kommunikasjon",
      "Kombinasjon med dype løp",
    ],
    variations: [
      "Dobbelt motløp (9 og 10)",
      "Med dypt løp fra 3. mann",
      "I spillsituasjon",
    ],
    source: "dbu",
  },
  {
    id: "dbu-spill-paa-3-mann",
    exerciseNumber: 40,
    name: "Spill på 3. mann",
    category: "game",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "angrep",
    equipment: ["baller", "mål", "vester"],
    description:
      "To spillere kombinerer for å utnytte 3. spillers dybdeløp i høy fart. Dyp pasning + støttepasning + dyp gjennombruddspasning (opp-ned-opp). Bringer 3. mann i høy fart mot mål.",
    coachingPoints: [
      "Utnytt forsvarsfokus rundt ball",
      "Timing av 3. manns løp",
      "Støttepasning og dyp pasning",
      "3. mann i høy fart",
    ],
    variations: [
      "Fra ulike posisjoner",
      "Med varierende startposisjon",
      "I helbane-spill",
    ],
    source: "dbu",
  },
  {
    id: "dbu-knekloep-i-feltet",
    exerciseNumber: 41,
    name: "Knekkeløp i feltet",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["baller", "mål", "kjegler"],
    description:
      "Angriper starter løp i én retning, endrer deretter retning med temposkift for å overløpe markeringsspiller. Momentet: fingere løp, så endre retning og tempo.",
    coachingPoints: [
      "Fingere løp i én retning",
      "Eksplosiv retningsendring",
      "Temposkift",
      "Timing med innlegg",
    ],
    variations: [
      "Fra ulike startposisjoner",
      "Med innlegg",
      "Med pasning i føttene",
    ],
    source: "dbu",
  },
  {
    id: "dbu-blindsideloep",
    exerciseNumber: 42,
    name: "Blindsideløp i feltet",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["baller", "mål", "kjegler"],
    description:
      "Angriper posisjonerer seg så forsvarer ikke kan ha både ball og angriper i synsfeltet. Agere i forsvarerens 'blinde vinkel'. Vinn tid, skap frie rom, slipp fri.",
    coachingPoints: [
      "Posisjonering utenfor synsfelt",
      "Eksplosive løp fra blindside",
      "Forsvarer er ballorientert",
      "Timing med innlegg/pasning",
    ],
    variations: [
      "Med innlegg fra kant",
      "Med pasning fra sentrum",
      "I spillsituasjon",
    ],
    source: "dbu",
  },
  {
    id: "dbu-loep-i-feltet-tre-omraader",
    exerciseNumber: 43,
    name: "Løp i feltet: Tre områder",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "angrep",
    equipment: ["baller", "mål", "kjegler"],
    description:
      "Ved innlegg fra kant: tre løp - til forreste område, til bagerste område, til straffesparkspletten. Dype angriper, offensiv midtbane, og motsatt kant.",
    coachingPoints: [
      "Tre ulike løp i feltet",
      "Timing av løp",
      "Kommunikasjon med innlegger",
      "Variér innleggstype",
    ],
    variations: [
      "Med forsvarere",
      "Fra begge sider",
      "Med 2. ball ved retur",
    ],
    source: "dbu",
  },

  // === DOBBELTPRESS OG PRESSSPILL ===
  {
    id: "dbu-dobbeltpress",
    exerciseNumber: 44,
    name: "Dobbeltpress",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Utnytt kompakt organisasjon med kort avstand mellom medspillere. Press fra forsvarslinje OG fra motsatt side for å sette ballfører under dobbelt press.",
    coachingPoints: [
      "Kompakt organisasjon",
      "Press fra to sider",
      "Timing av 2. presspiller",
      "Vinn ball eller tving feil",
    ],
    variations: [
      "I ulike soner på banen",
      "Med overgangsspill",
      "Konkurranseform",
    ],
    source: "dbu",
  },
  {
    id: "dbu-1v1-defensiv-naerkamp",
    exerciseNumber: 45,
    name: "1v1 defensiv: Nærkamp og tackling",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 8,
    theme: "1v1",
    equipment: ["baller", "småmål"],
    description:
      "Hvit forsvarsspiller sender til grå angriper, deretter 1v1 (eller 2v2). Fokus på god defensiv spiller: fysisk styrke, spilintelligens, mot, lavt tyngdepunkt, koordinasjon.",
    coachingPoints: [
      "Styr motstander dit du vil",
      "Ha siden til ballen",
      "Angrib ball når den er åpen",
      "Timing av tackling",
    ],
    variations: [
      "2v2",
      "Med tidsbegrensning",
      "Turneringformat",
    ],
    source: "dbu",
  },
];

// Eksporter antall DBU-øvelser for bruk i filter
export const dbuExerciseCount = dbuExercises.length;
