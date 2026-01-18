/**
 * Prickett 3v3 Coaching øvelser
 * 
 * Kilde: Peter Prickett: "Developing Skill: A Guide to 3v3 Soccer Coaching" (2018)
 * 
 * Kriterier for øvelsene:
 * ✓ Alle spillere aktive hele tiden (ingen køer)
 * ✓ Alle involveres med ball
 * ✓ Høy intensitet og mange ballberøringer
 * ✓ Realistiske spillsituasjoner
 * ✓ Passer for J16-nivå (15-16 år)
 */

import type { ExerciseData } from './exercises';

export const prickettExercises: ExerciseData[] = [
  // ===== 3v3 GRUNNLEGGENDE (Prickett kap. 4) =====
  {
    id: "smallsided-1",
    exerciseNumber: 1,
    name: "3v3 Fire mål",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller", "4 små mål"],
    description: "Tre mot tre på liten bane med fire små mål (ett i hvert hjørne). Begge lag kan score på begge mål på motsatt side. Tvinger spillerne til å lese spillet og bytte angrepspunkt.",
    coachingPoints: [
      "Les spillet - hvilket mål er åpent?",
      "Bytt angrepspunkt når en side er stengt",
      "Bevegelse uten ball for å skape rom",
      "Kommunikasjon - hvem presser, hvem sikrer?"
    ],
    variations: [
      "Kan ikke score i samme mål to ganger på rad",
      "Maks 3 berøringer",
      "Må ha minst 3 pasninger før scoring"
    ],
    source: "prickett",
    sourceRef: "Prickett s.48 'Four Goal Game'"
  },
  {
    id: "smallsided-2",
    exerciseNumber: 2,
    name: "3v3 Målspillere",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "3v3 med en målspiller for hvert lag bak motstanderens linje. Poeng scores ved å spille ballen til egen målspiller. Den som scorer bytter plass med målspilleren.",
    coachingPoints: [
      "Skap dybde i spillet - noen må ligge høyt",
      "Timing i innspillet til målspilleren",
      "Målspilleren må bevege seg for å bli spillbar",
      "Positiv overgang - angrip med en gang du vinner ball"
    ],
    variations: [
      "Innspill til målspiller må være førstetouch",
      "Målspilleren må fange ballen",
      "Legg til en forsvarer som kan gå inn i målsonen"
    ],
    source: "prickett",
    sourceRef: "Prickett s.49 'Target Players'"
  },
  {
    id: "smallsided-3",
    exerciseNumber: 3,
    name: "3v3 Gjennombruddsspill",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "3v3 der man scorer ved å drible over motstanderens baklinje. Krever 1v1-ferdigheter og støtte fra medspillere.",
    coachingPoints: [
      "Når dribler du, når spiller du?",
      "Støttespill - gi alternativer til ballføreren",
      "Timing i løpene - løp når ballen kan spilles",
      "Forsvaret: Forsink angrepet, tving til siden"
    ],
    variations: [
      "Legg til små mål på linjene",
      "3 berøringer maks",
      "Må ha pasningsspill før gjennombrudd"
    ],
    source: "prickett",
    sourceRef: "Prickett s.47 'Small-Sided Free Play'"
  },
  {
    id: "smallsided-4",
    exerciseNumber: 4,
    name: "3v3 2v2+2 Støttespill",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "2v2 inne med 2 nøytrale på utsiden. Nøytrale spiller alltid med ballaget = 4v2. Trener på overtallsspill og støttebevegelser.",
    coachingPoints: [
      "Finn den nøytrale - de er alltid fri",
      "Spill og beveg deg",
      "Nøytrale: God vinkel for mottak",
      "2 inne: Koordiner press"
    ],
    variations: [
      "Nøytrale kun 1 berøring",
      "Rotér hvem som er nøytral",
      "Legg til mål"
    ],
    source: "prickett",
    sourceRef: "Prickett s.50 'Two vs Two plus Two'"
  },
  {
    id: "smallsided-5",
    exerciseNumber: 5,
    name: "4v2 Possession",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Klassisk 4v2 rondo i firkant. De 4 holder ball, de 2 presser. Ved tap bytter den som mistet + den som ga dårlig ball.",
    coachingPoints: [
      "Åpne kroppen - se hele banen",
      "Førstetouch vekk fra press",
      "Kommunikasjon: 'Tid!' eller 'Mann på!'",
      "Presset: Arbeid sammen, styr mot hjørne"
    ],
    variations: [
      "1-touch",
      "2-touch",
      "Split-pass gjennom midten = de 2 ut"
    ],
    source: "prickett",
    sourceRef: "Prickett s.51 'Four vs Two Possession'"
  },
  
  // ===== 3v3 MED SONER (Prickett) =====
  {
    id: "smallsided-6",
    exerciseNumber: 247,
    name: "3v3 Vertikale soner",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Banen delt i tre vertikale soner. Ballen må gå gjennom alle tre soner før scoring. Trener på tålmodig oppbygging.",
    coachingPoints: [
      "Tålmodighet - bygg opp riktig",
      "Bevegelse mellom sonene",
      "Når er det åpent for å gå videre?",
      "Forsvar: Hvem presser hvor?"
    ],
    variations: [
      "Maks 3 berøringer per sone",
      "Må ha pasning i hver sone",
      "Legg til en nøytral i midtsonen"
    ],
    source: "prickett",
    sourceRef: "Prickett s.53 'In Zones - Vertical'"
  },
  {
    id: "smallsided-7",
    exerciseNumber: 250,
    name: "3v3 Midtbanespiller",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 7,
    playersMax: 14,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "3v3 med en nøytral midtbanespiller som begge lag kan bruke. Må spille via midtbanen minst én gang før scoring.",
    coachingPoints: [
      "Finn midtbanespilleren",
      "Midtbane: Kroppen åpen, se begge retninger",
      "Veggspill med midtbane",
      "Tempo gjennom midten"
    ],
    variations: [
      "Midtbane kun 1 berøring",
      "To i midten",
      "Midtbane kan score"
    ],
    source: "prickett",
    sourceRef: "Prickett s.54-55 'Midfielder Game'"
  },
  {
    id: "smallsided-8",
    exerciseNumber: 252,
    name: "3v3 Endesoner",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Score ved å motta ball i kontroll i motstanderens endesone. Ingen kan stå og vente i sonen.",
    coachingPoints: [
      "Timing i løpene inn i sonen",
      "Pasningen må være presis",
      "Kontroll er nøkkelen",
      "Bakrom-løp bak forsvarer"
    ],
    variations: [
      "Må drible inn i sonen",
      "2 berøringer",
      "Minst 4 pasninger først"
    ],
    source: "prickett",
    sourceRef: "Prickett s.59 'End Zones'"
  },
  
  // ===== 3v3 OVERGANGER (Prickett) =====
  {
    id: "smallsided-9",
    exerciseNumber: 253,
    name: "3v3 Tre-spillers overgang",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 18,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "3v3 der laget som mister ball må løpe rundt eget mål før de kan forsvare. Gir overtall i overgang.",
    coachingPoints: [
      "Rask reaksjon ved ballvinning",
      "Utnytt overtallet - ikke stress",
      "Forsvar: Spring fort tilbake!",
      "Positiv overgang = angrip direkte"
    ],
    variations: [
      "To må rundt målet",
      "Løp rundt kjegle i stedet",
      "Tidsbegrensning på angrep"
    ],
    source: "prickett",
    sourceRef: "Prickett s.58 'Three Player Transition'"
  },
  {
    id: "smallsided-10",
    exerciseNumber: 256,
    name: "3v3 Kontring",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 15,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "3v3 + 2 ventende per lag. Ved ballvinning løper de 2 inn = 5v3 kontra. Det andre laget må forsvare.",
    coachingPoints: [
      "Hurtig reaksjon ved ballvinning",
      "De som løper inn: Timing og retning",
      "5v3: Utnytt overtallet",
      "Forsvar: Forsink til hjelp kommer"
    ],
    variations: [
      "Kun ventende kan score",
      "Tidsbegrensning",
      "Legg til keeper"
    ],
    source: "prickett",
    sourceRef: "Prickett s.68 'Counter-Punch'"
  },
  {
    id: "smallsided-11",
    exerciseNumber: 259,
    name: "3v3 Hurtige overganger",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "4 små mål"],
    description: "3v3 med mål i hvert hjørne. Etter scoring starter motstanderlaget umiddelbart. Rask omstilling.",
    coachingPoints: [
      "Rask omstilling begge veier",
      "Første forsvarer presser",
      "Utnytt momentet etter vinning",
      "Kommunikasjon"
    ],
    variations: [
      "Scorer får ball igjen",
      "10 sek tidsbegrensning",
      "3v3 + 1 joker"
    ],
    source: "prickett",
    sourceRef: "Prickett s.81 'Quick Transitions'"
  },
  {
    id: "smallsided-12",
    exerciseNumber: 261,
    name: "3v3 Tilbaketrekning",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Ved ballvinning må forsvarende lag trekke alle spillere bak ball før de kan angripe. Trener tilbakeløp.",
    coachingPoints: [
      "Alle bak ball - raskt!",
      "Organisér forsvaret på vei tilbake",
      "Når alle er bak: Angrip!",
      "Motstanderen: Press høyt!"
    ],
    variations: [
      "Kun 2 må tilbake",
      "Tidsbegrensning på tilbaketrekning",
      "Legg til endesoner"
    ],
    source: "prickett",
    sourceRef: "Prickett s.69 'Recovery Runs'"
  },
  
  // ===== 3v3 SPESIELLE BANER (Prickett kap. 6) =====
  {
    id: "smallsided-13",
    exerciseNumber: 263,
    name: "3v3 Bakovervendte mål",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 små mål"],
    description: "Målene snudd med åpningen bort. Må komme rundt og skyte inn bakfra. Krever gjennombrudd.",
    coachingPoints: [
      "Må komme rundt - ikke skyte fra avstand",
      "Finter og retningsendringer",
      "Timing mellom målene",
      "Balansegang dribling/pasning"
    ],
    variations: [
      "Legg til endesoner bak",
      "4v4",
      "2 berøringer i egen halvdel"
    ],
    source: "prickett",
    sourceRef: "Prickett s.88 'Reversed Goals'"
  },
  {
    id: "smallsided-14",
    exerciseNumber: 14,
    name: "3v3 Seks mål",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "6 små mål"],
    description: "Seks små mål spredt på banen. Begge lag kan score i alle. Krever årvåkenhet.",
    coachingPoints: [
      "Hold hodet oppe - se alle mål",
      "Raske vendinger",
      "Kommunikasjon: 'Der er åpent!'",
      "Hvem markerer hvem?"
    ],
    variations: [
      "Noen mål gir mer poeng",
      "Ikke samme mål to ganger",
      "3v3 + 2 jokere"
    ],
    source: "prickett",
    sourceRef: "Prickett s.84 'Six-Goal Game'"
  },
  {
    id: "smallsided-15",
    exerciseNumber: 265,
    name: "3v3 Ishokkeyspill",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Lov å spille bak målene (som ishockey). Kreativt spill fra uventede vinkler.",
    coachingPoints: [
      "Utnytt rommet bak mål",
      "Timing på innlegg fra baksiden",
      "Forsvar: Hvem følger bak?",
      "Skudd fra alle vinkler"
    ],
    variations: [
      "Legg til keeper",
      "Må via bak-mål før scoring",
      "4v4"
    ],
    source: "prickett",
    sourceRef: "Prickett s.86 'Back to Back Goals'"
  },
  {
    id: "smallsided-16",
    exerciseNumber: 268,
    name: "3v3 Magisk firkant",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Liten firkant i midten. Ballen må gjennom firkanten før scoring.",
    coachingPoints: [
      "Spill gjennom midten",
      "Trekk forsvarere ut",
      "Når er firkanten åpen?",
      "Rask omstilling etter"
    ],
    variations: [
      "To firkanter",
      "Kun dribling teller",
      "2 berøringer"
    ],
    source: "prickett",
    sourceRef: "Prickett s.78 'Magic Square'"
  },
  {
    id: "smallsided-17",
    exerciseNumber: 271,
    name: "3v3 Diamant-bane",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller", "4 små mål"],
    description: "Diamantformet bane med mål i hver spiss. Uvanlig form gir nye situasjoner.",
    coachingPoints: [
      "Tilpass spillet til formen",
      "Vinkler blir annerledes",
      "Les rommet",
      "Kreativ bruk av kantene"
    ],
    variations: [
      "Kun 2 mål aktive",
      "Roter hvilke mål som gjelder",
      "3 berøringer"
    ],
    source: "prickett",
    sourceRef: "Prickett s.94 'Diamond Pitch'"
  },
  
  // ===== 3v3 PRESSING OG FORSVAR (Prickett) =====
  {
    id: "smallsided-18",
    exerciseNumber: 273,
    name: "3v3 Press og sikring",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "pressing",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Fokus på at første mann presser og andre sikrer. Trener roterer og gir poeng for god pressing.",
    coachingPoints: [
      "Første mann: Press ballsiden",
      "Andre mann: Sikre rommet bak",
      "Kommunikasjon: 'Jeg tar!' 'Jeg sikrer!'",
      "Bytting av roller"
    ],
    variations: [
      "Poeng for ballvinning i visse soner",
      "Tidsbegrensning på press",
      "4v4"
    ],
    source: "prickett",
    sourceRef: "Prickett s.71-72 'Press and Cover'"
  },
  {
    id: "smallsided-19",
    exerciseNumber: 275,
    name: "3v3 Forsvare midten",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "pressing",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Forsvaret får bonuspoeng for å hindre spill gjennom midtsonen. Angrepet får poeng for gjennomspill.",
    coachingPoints: [
      "Forsvar: Steng midten!",
      "Angrep: Lokk og spill gjennom",
      "Kommunikasjon i forsvarsrekka",
      "Kompakthet"
    ],
    variations: [
      "Større/mindre midtsone",
      "Kun pasning gjennom teller",
      "Legg til nøytrale"
    ],
    source: "prickett",
    sourceRef: "Prickett s.79 'Defend The Middle'"
  },
  
  // ===== EKSTRA RONDO-VARIANTER =====
  {
    id: "smallsided-46",
    exerciseNumber: 46,
    name: "Mini-rondo i firkant",
    tags: ["prickett-3v3-coaching-2018"],
    category: "rondo",
    duration: 10,
    playersMin: 5,
    playersMax: 8,
    theme: "possession",
    equipment: ["Kjegler", "Baller"],
    description: "Fire på hjørner, én i midten. Den som mister bytter. Enkel oppvarming.",
    coachingPoints: [
      "Bevegelse til ledig side",
      "Førstetouch bort fra press",
      "Kommunikasjon",
      "Press: Styr mot hjørne"
    ],
    variations: [
      "1-touch",
      "5 ute, 1-2 inne",
      "To baller"
    ],
    source: "prickett",
    sourceRef: "Prickett s.31 'Square 12 - Mini Rondo'"
  },
];
