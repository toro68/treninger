/**
 * Smålagsspill-øvelser der alle spillere er aktive hele tiden
 * 
 * Kilder (med forkortelser brukt i sourceRef):
 * - [Prickett] Peter Prickett: "Developing Skill: A Guide to 3v3 Soccer Coaching" (2018)
 * - [101Youth] Tony Charles & Stuart Rook: "101 Youth Football Coaching Sessions" (2013)
 * - [Seeger] Fabian Seeger: "The Soccer Games and Drills Compendium" (2017)
 * - [Matkovich] Michael Matkovich & Jason Davis: "Elite Soccer Drills" (2008)
 * - [WorldClass] World Class Coaching: "50 Small-Sided Games" (2014) - fra Chelsea, Man City, Juventus, m.fl.
 * 
 * Kriterier for øvelsene:
 * ✓ Alle spillere aktive hele tiden (ingen køer)
 * ✓ Alle involveres med ball
 * ✓ Høy intensitet og mange ballberøringer
 * ✓ Realistiske spillsituasjoner
 * ✓ Passer for J16-nivå (15-16 år)
 */

import { Exercise } from './exercises';

export const smallsidedExercises: Exercise[] = [
  // ===== 3v3 GRUNNLEGGENDE (Prickett kap. 4) =====
  {
    id: "smallsided-1",
    exerciseNumber: 1,
    name: "3v3 Fire mål",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Possession",
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
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Gjennombrudd",
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
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Gjennombrudd",
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
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Possession",
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
    category: "game",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "Possession",
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
    exerciseNumber: 6,
    name: "3v3 Vertikale soner",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Gjennombrudd",
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
    exerciseNumber: 7,
    name: "3v3 Midtbanespiller",
    category: "game",
    duration: 12,
    playersMin: 7,
    playersMax: 14,
    theme: "Gjennombrudd",
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
    exerciseNumber: 8,
    name: "3v3 Endesoner",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Gjennombrudd",
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
    exerciseNumber: 9,
    name: "3v3 Tre-spillers overgang",
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 18,
    theme: "Overganger",
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
    exerciseNumber: 10,
    name: "3v3 Kontring",
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 15,
    theme: "Overganger",
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
    exerciseNumber: 11,
    name: "3v3 Hurtige overganger",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Overganger",
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
    exerciseNumber: 12,
    name: "3v3 Tilbaketrekning",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Overganger",
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
    exerciseNumber: 13,
    name: "3v3 Bakovervendte mål",
    category: "game",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "Gjennombrudd",
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
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Overganger",
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
    exerciseNumber: 15,
    name: "3v3 Ishokkeyspill",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Gjennombrudd",
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
    exerciseNumber: 16,
    name: "3v3 Magisk firkant",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Gjennombrudd",
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
    exerciseNumber: 17,
    name: "3v3 Diamant-bane",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Possession",
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
    exerciseNumber: 18,
    name: "3v3 Press og sikring",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Pressing",
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
    exerciseNumber: 19,
    name: "3v3 Forsvare midten",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Pressing",
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
  
  // ===== 101 YOUTH FOOTBALL (kap. Small-Sided Games) =====
  {
    id: "smallsided-20",
    exerciseNumber: 20,
    name: "Bingo (Pasningsjakt)",
    category: "game",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 der hver spiller teller sine pasninger høyt. Ved 10 pasninger roper du 'Bingo!' Laget vinner når alle har 10.",
    coachingPoints: [
      "Bevegelse for ballfører",
      "Rop ut tallene",
      "Kun vellykkede teller",
      "Riktig vekt på pasninger"
    ],
    variations: [
      "15-20 pasninger",
      "2-touch etter Bingo",
      "5v5 eller 6v6"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.71 'Bingo'"
  },
  {
    id: "smallsided-21",
    exerciseNumber: 21,
    name: "Tag Team",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 15,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "3v3 inne + 2 per lag i hjørnene. Kan 'tagge ut' når som helst. 10 pasninger = 1 poeng.",
    coachingPoints: [
      "Bevegelse for rom",
      "Dribling under press",
      "Taktisk bytting",
      "Kommunikasjon"
    ],
    variations: [
      "De ute blir støttespillere (5v3)",
      "2-touch inne",
      "Støtte langs linjen"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.72 'Tag Team'"
  },
  {
    id: "smallsided-22",
    exerciseNumber: 22,
    name: "Fargepass",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 20,
    theme: "Possession",
    equipment: ["Kjegler", "4 farger vester", "Baller"],
    description: "Fire lag, to samarbeider. Rød+gul mot blå+grønn. Røde KUN til gule og omvendt.",
    coachingPoints: [
      "Løft blikket - finn farge",
      "Bevegelse uten ball",
      "Kommunikasjon",
      "Førstetouch bort fra press"
    ],
    variations: [
      "2-touch",
      "Legg til nøytrale",
      "Målspillere på enden"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.73 'Keep Ball Colours'"
  },
  {
    id: "smallsided-23",
    exerciseNumber: 23,
    name: "Hold to baller",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "2 baller"],
    description: "Bane delt i to. 4v2 per side med én ball. Forsvarerne prøver vinne og spille over = 2 baller der!",
    coachingPoints: [
      "Angrip/forsvar som lag",
      "Presise pasninger",
      "Kommunikasjon",
      "Koordinert press"
    ],
    variations: [
      "2-3 berøringer",
      "Start med 4 baller",
      "Taper bytter"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.74 'Keep Two Balls'"
  },
  {
    id: "smallsided-24",
    exerciseNumber: 24,
    name: "Overtall med støtte",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 18,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "7v4 inne + 4 nøytrale på sidene. Store laget har ball: 11v4. Lille vinner: 8v7.",
    coachingPoints: [
      "Bevegelse uten ball",
      "Kommunikasjon",
      "Førstetouch inn i rom",
      "Press i par"
    ],
    variations: [
      "Store: 2-touch",
      "Bytting ved tap",
      "Ulik poengsum"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.75 'Overload'"
  },
  {
    id: "smallsided-25",
    exerciseNumber: 25,
    name: "Retningsspill",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 18,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Tre soner, fri sone i midten. 3v3 i hver ende. Spill gjennom fri sone til lagkamerater.",
    coachingPoints: [
      "Bevegelse for mottak",
      "Riktig vekt og timing",
      "Førstetouch-kvalitet",
      "Nøytrale skaper overtall"
    ],
    variations: [
      "Målspillere på enden",
      "Min. pasninger først",
      "2-touch"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.76 'Directional Play'"
  },
  {
    id: "smallsided-26",
    exerciseNumber: 26,
    name: "Gjennom portene",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Må passere gjennom port på midten før scoring. Mister du ball = gjennom port igjen.",
    coachingPoints: [
      "Pasning viktigere enn dribling",
      "Skap rom etter gjennomspill",
      "Kommunikasjon",
      "Rask omstilling"
    ],
    variations: [
      "Begge porter først",
      "Dribling gjennom",
      "Legg til keeper"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.77 'Through The Gates'"
  },
  {
    id: "smallsided-27",
    exerciseNumber: 27,
    name: "Fire hjørner",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "4 små mål"],
    description: "6v6 med mål diagonalt i hjørnene. Score ved å drible gjennom.",
    coachingPoints: [
      "Rom i brede områder",
      "Spill ut til siden",
      "Bytt angrepspunkt",
      "Gjennombrudd forbi siste"
    ],
    variations: [
      "Ikke samme mål 2x",
      "Kun én side",
      "Diagonalt motsatte"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.78 'Four Corners'"
  },
  {
    id: "smallsided-28",
    exerciseNumber: 28,
    name: "Målball (Target Ball)",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 16,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5x5m målsone i hver ende med en målspiller. Score ved å spille til målspilleren. Bytting ved scoring.",
    coachingPoints: [
      "Lagspill og pasning",
      "Presise pasninger",
      "Bevegelse for rom",
      "Raske beslutninger"
    ],
    variations: [
      "Førstetouch-innspill",
      "2-touch",
      "Forsvarer i målsonen"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.79 'Target Ball'"
  },
  {
    id: "smallsided-29",
    exerciseNumber: 29,
    name: "Portjakt (Gate Crasher)",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 med 5 porter spredt. Score ved pasning gjennom som mottas av medspiller. Ikke samme 2x.",
    coachingPoints: [
      "Bytt angrepspunkt",
      "Bevegelse for mottak",
      "Dribling under press",
      "Innsiden for presisjon"
    ],
    variations: [
      "Førstetouch-pasning",
      "2-3 berøringer",
      "Flere porter"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.80 'Gate Crasher'"
  },
  {
    id: "smallsided-30",
    exerciseNumber: 30,
    name: "Ørkenøy",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Avslutninger",
    equipment: ["Kjegler", "Vester", "6-8 baller på kjegler"],
    description: "5v5/6v6 - score ved å skyte ned baller på kjegler på motstanderens linje. Først tom vinner.",
    coachingPoints: [
      "Skyt når muligheten er der",
      "Pasning for skuddvinkel",
      "Spill mellom forsvarere",
      "Prioritér: Hvilken ball?"
    ],
    variations: [
      "Kun førstetouch",
      "Kun svak fot",
      "2-3 berøringer"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.81 'Desert Island Discs'"
  },
  {
    id: "smallsided-31",
    exerciseNumber: 31,
    name: "Støttespillere på sidene",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 inne + 2 støttespillere per lag på sidene. Poeng ved å spille til støtte.",
    coachingPoints: [
      "Spill raskt til støtte",
      "Åpne opp - halvt snu",
      "Støtte: Kom til mottak",
      "Benytt begge støttespillere"
    ],
    variations: [
      "Begge støtte for poeng",
      "Bytting ved pasning til støtte",
      "2-touch"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.82 'Support Play'"
  },
  {
    id: "smallsided-32",
    exerciseNumber: 32,
    name: "Wembley Way",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 20,
    theme: "1v1",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Spillere i rekker med nummer. Trener roper tall - de løper rundt banen, gjennom mål, kjemper om ball. 1v1 til mål.",
    coachingPoints: [
      "Ball nær føttene",
      "Skudd med vristen",
      "Fintebruk",
      "Forsvar: Tålmodighet"
    ],
    variations: [
      "To tall = 2v2/3v3",
      "Førstetouch = lagspill",
      "15 sek tidsbegrensning"
    ],
    source: "101youth",
    sourceRef: "101 Youth s.83 'Wembley Way'"
  },
  
  // ===== SEEGER - KAOS OG OVERGANGER =====
  {
    id: "smallsided-33",
    exerciseNumber: 33,
    name: "Fra 1v1 til 3v2",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 15,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Starter 1v1. Ved ballvinning kommer 2 inn = 3v1. Så kommer 1 til = 3v2. Eskalering.",
    coachingPoints: [
      "1v1: Mot og ferdighet",
      "Overtall: Ikke stress",
      "Forsvar: Forsink",
      "Kommunikasjon"
    ],
    variations: [
      "Tidsbegrensning per fase",
      "Ulike startposisjoner",
      "Legg til keeper"
    ],
    source: "seeger",
    sourceRef: "Seeger s.99-101 'From 1-on-1 to 3-on-2'"
  },
  {
    id: "smallsided-34",
    exerciseNumber: 34,
    name: "Fra 2v1 til 3v2",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 15,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Starter 2v1. Ved ballvinning kommer flere inn. Kontinuerlig eskalering begge veier.",
    coachingPoints: [
      "2v1: Utnytt overtall",
      "Forsvarer: Forsink",
      "Les situasjonen",
      "Timing på innløp"
    ],
    variations: [
      "Start fra ulike sider",
      "Legg til mål",
      "Tidsbegrensning"
    ],
    source: "seeger",
    sourceRef: "Seeger s.100 'From 2-on-1 to 3-on-2'"
  },
  {
    id: "smallsided-35",
    exerciseNumber: 35,
    name: "Kaos 1v1",
    category: "game",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "1v1",
    equipment: ["Kjegler", "Vester", "Baller", "4 mål"],
    description: "Flere 1v1-situasjoner samtidig på samme bane. Kaos og konsentrasjon.",
    coachingPoints: [
      "Fokus på din duell",
      "Unngå andre",
      "Raske avgjørelser",
      "Romforståelse"
    ],
    variations: [
      "Ulike måltyper",
      "Tidsbegrensning",
      "Vinnerturneringer"
    ],
    source: "seeger",
    sourceRef: "Seeger s.102 'Chaos 1-on-1'"
  },
  {
    id: "smallsided-36",
    exerciseNumber: 36,
    name: "Kaos 3v3 på 6 mål",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "6 små mål"],
    description: "3v3 med 6 mål spredt. Begge kan score i alle. Konstant årvåkenhet.",
    coachingPoints: [
      "Hold hodet oppe",
      "Raske vendinger",
      "Kommunikasjon",
      "Markeringer"
    ],
    variations: [
      "Ulike poeng per mål",
      "Ikke samme 2x",
      "Legg til jokere"
    ],
    source: "seeger",
    sourceRef: "Seeger s.103 'Chaos 3-on-3 (on 6 goals)'"
  },
  {
    id: "smallsided-37",
    exerciseNumber: 37,
    name: "Kaos 3v3 på 3 mål",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "3 mål"],
    description: "3v3 med 3 mål i trekant. Alle kan score i alle mål. Krever 360° oppmerksomhet.",
    coachingPoints: [
      "Constant scanning",
      "Rask omstilling",
      "Dekke flere mål",
      "Angrepspunkt-bytte"
    ],
    variations: [
      "Roter mål-verdi",
      "Tidspress",
      "4v4"
    ],
    source: "seeger",
    sourceRef: "Seeger s.104 'Chaos 3-on-3 (on 3 goals)'"
  },
  {
    id: "smallsided-38",
    exerciseNumber: 38,
    name: "Rask 2v2",
    category: "game",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "1v1",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Korte, intense 2v2-runder. Vinneren blir, taperen byttes. Høy intensitet.",
    coachingPoints: [
      "Samarbeid i 2v2",
      "Raske avgjørelser",
      "Kondisjon og vilje",
      "Lær av hvert tap"
    ],
    variations: [
      "1 min runder",
      "Vinner scorer 2x for å vinne",
      "Legg til nøytral"
    ],
    source: "seeger",
    sourceRef: "Seeger s.105 'Fast 2-on-2'"
  },
  {
    id: "smallsided-39",
    exerciseNumber: 39,
    name: "4v4 Ballhånd",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 der ballen kastes og fanges i stedet for sparkes. Fokus på bevegelse og rom.",
    coachingPoints: [
      "Samme bevegelser som fotball",
      "Rom og vinkler",
      "Kommunikasjon",
      "Forsvarsposisjonering"
    ],
    variations: [
      "Score ved å fange i sone",
      "Begrenset antall kast",
      "Blanding hånd/fot"
    ],
    source: "seeger",
    sourceRef: "Seeger s.106 '4-on-4 (ball in hand)'"
  },
  {
    id: "smallsided-40",
    exerciseNumber: 40,
    name: "Integrerte baner",
    category: "game",
    duration: 15,
    playersMin: 16,
    playersMax: 24,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "2-3 baller", "4 mål"],
    description: "To overlappende 4v4-baner. Kaos når ballene møtes i midten.",
    coachingPoints: [
      "Fokus på egen ball",
      "Reager på kaos",
      "Ekstra kommunikasjon",
      "Utnytt forvirring"
    ],
    variations: [
      "Tre baller",
      "Kan bytte bane",
      "Ett stort vs to små lag"
    ],
    source: "seeger",
    sourceRef: "Seeger s.107 'Integrated Playing Fields'"
  },
  
  // ===== SEEGER - TURNERINGER =====
  {
    id: "smallsided-41",
    exerciseNumber: 41,
    name: "Champions League",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 20,
    theme: "Smålagsspill",
    equipment: ["Kjegler", "Vester", "Baller", "Mål"],
    description: "Turnering 3v3/4v4. Korte kamper, taper ned, vinner opp.",
    coachingPoints: [
      "Høy intensitet",
      "Lagarbeid under press",
      "Mental styrke",
      "Juster taktikk"
    ],
    variations: [
      "Ulike regler per runde",
      "Stilpoeng",
      "Handicap"
    ],
    source: "seeger",
    sourceRef: "Seeger s.108 'Tournament (Champions League)'"
  },
  {
    id: "smallsided-42",
    exerciseNumber: 42,
    name: "Berøringsturnering",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 20,
    theme: "Teknikk",
    equipment: ["Kjegler", "Vester", "Baller", "Mål"],
    description: "Turnering der berøringsbegrensning endres mellom runder (3-touch, 2-touch, 1-touch).",
    coachingPoints: [
      "Tilpass til reglene",
      "Førstetouch viktigere",
      "Tenk raskere",
      "Posisjonering"
    ],
    variations: [
      "Ulike begrensninger per halvdel",
      "Fri vs begrenset annenhver",
      "Kun svak fot"
    ],
    source: "seeger",
    sourceRef: "Seeger s.112 'Tournament (touches)'"
  },
  {
    id: "smallsided-43",
    exerciseNumber: 43,
    name: "Måljakt",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 20,
    theme: "Avslutninger",
    equipment: ["Kjegler", "Vester", "Baller", "Mål"],
    description: "Turnering der flest mål totalt (ikke seire) avgjør. Oppmuntrer til offensivt spill.",
    coachingPoints: [
      "Angrep!",
      "Risiko vs belønning",
      "Avslutt når du kan",
      "Målscoring fokus"
    ],
    variations: [
      "Mål i siste min teller dobbelt",
      "Langskudd = ekstra poeng",
      "Heading = bonus"
    ],
    source: "seeger",
    sourceRef: "Seeger s.113 'Tournament (goal hunt)'"
  },
  
  // ===== SEEGER - POSISJONSSPILL =====
  {
    id: "smallsided-44",
    exerciseNumber: 44,
    name: "4v4+3 Posisjonsspill",
    category: "game",
    duration: 15,
    playersMin: 11,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 + 3 nøytrale jokere = 7v4 med ball. Fokus på ballbesittelse.",
    coachingPoints: [
      "Finn jokeren",
      "Triangler og vinkler",
      "Bevegelse etter pasning",
      "1-2 berøringer"
    ],
    variations: [
      "10 pasninger = poeng",
      "Jokere 1-touch",
      "Roter jokere"
    ],
    source: "seeger",
    sourceRef: "Seeger s.48-52 'Possession Games'"
  },
  {
    id: "smallsided-45",
    exerciseNumber: 45,
    name: "5v3+2 Utholdenhetsrondo",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "Pressing",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5 holder mot 3 som presser. Ved vinning spiller 3 til 2 ventende = 5v5 overgang. Taper blir press.",
    coachingPoints: [
      "5: Hold tempo",
      "3: Koordinert press",
      "Rask overgang",
      "Kondisjonskrevende"
    ],
    variations: [
      "1 min uten tap = poeng",
      "2-touch for de 5",
      "Fire pressende"
    ],
    source: "seeger",
    sourceRef: "Seeger s.290-291 '4-on-2 (interval runs)'"
  },
  
  // ===== EKSTRA RONDO-VARIANTER =====
  {
    id: "smallsided-46",
    exerciseNumber: 46,
    name: "Mini-rondo i firkant",
    category: "warmup",
    duration: 10,
    playersMin: 5,
    playersMax: 8,
    theme: "Possession",
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
  {
    id: "smallsided-47",
    exerciseNumber: 47,
    name: "Pasningsfirkant med rotasjon",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Baller"],
    description: "Spillere på hjørner/midtpunkter. Pasning og følg. Veggspill, overlapper, tredjemann.",
    coachingPoints: [
      "Innsiden langs bakken",
      "Åpne kroppen",
      "Veggspill: 1-touch tilbake",
      "Hold tempo"
    ],
    variations: [
      "Dobbelt veggspill",
      "Chip til motsatt",
      "To baller samtidig"
    ],
    source: "seeger",
    sourceRef: "Seeger s.126-149 'Passing Loops'"
  },
  {
    id: "smallsided-48",
    exerciseNumber: 48,
    name: "Pasningssirkel med 6er",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Baller"],
    description: "Sirkel med spiller i midten (6er-posisjon). Ball inn til 6er, legg av, rotér.",
    coachingPoints: [
      "6er: Sjekk skuldre, åpen kropp",
      "Pasningskvalitet inn",
      "Avlegget: Riktig fot",
      "Tempo i rotasjonen"
    ],
    variations: [
      "To i midten",
      "Mottak + snu + pasning",
      "Legg til press"
    ],
    source: "seeger",
    sourceRef: "Seeger s.159 'Passing circle (6er behavior)'"
  },
  
  // ===== SEEGER - SPILLEBANER =====
  {
    id: "smallsided-49",
    exerciseNumber: 49,
    name: "Vertikal bane i midten",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 16,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Ekstra smal sone i midten gir bonuspoeng for gjennomspill der. Trener sentralt spill.",
    coachingPoints: [
      "Finn midten!",
      "Bevegelse inn/ut av sonen",
      "Pasningskvalitet gjennom",
      "Forsvar: Steng midten"
    ],
    variations: [
      "Kun pasning gjennom",
      "Dribling = ekstra",
      "Bytt bredde på sonen"
    ],
    source: "seeger",
    sourceRef: "Seeger s.115 'Playing field (vertical field in center)'"
  },
  {
    id: "smallsided-50",
    exerciseNumber: 50,
    name: "Byttespill",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 18,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Bane delt i to halvdeler med ulike regler. F.eks. fri på ene, 2-touch på andre.",
    coachingPoints: [
      "Tilpass til sonen",
      "Bytt rytme",
      "Les spillet annerledes",
      "Fleksibilitet"
    ],
    variations: [
      "Bytt regler underveis",
      "Kun score fra én halvdel",
      "Nøytrale i én sone"
    ],
    source: "seeger",
    sourceRef: "Seeger s.117 'Playing field (switching play)'"
  },

  // ===== SEEGER - FLERE SMÅLAGSSPILL (8-15 spillere) =====
  {
    id: "smallsided-51",
    exerciseNumber: 51,
    name: "4v4+4 Fargespill",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "3 farger vester", "Baller"],
    description: "Tre lag à 4. To lag samarbeider mot ett (8v4). Ved ballvinning bytter lagene roller - det laget som mistet blir forsvarere.",
    coachingPoints: [
      "Finn rom i 8v4 - lett!",
      "Kvalitet selv i overtall",
      "Rask omstilling ved tap",
      "Kommunikasjon: Hvem presser?"
    ],
    variations: [
      "2-touch for alle",
      "Maks 5 sek før bytte",
      "Poeng for 10 strake"
    ],
    source: "seeger",
    sourceRef: "Seeger s.182 'Possession game (3 teams)'"
  },
  {
    id: "smallsided-52",
    exerciseNumber: 52,
    name: "5v5+5 Trelagsspill",
    category: "game",
    duration: 15,
    playersMin: 15,
    playersMax: 15,
    theme: "Possession",
    equipment: ["Kjegler", "3 farger vester", "Baller"],
    description: "Tre lag à 5. Samme prinsipp som 4v4+4, men flere spillere gir mer realistisk spillbilde.",
    coachingPoints: [
      "10v5 = finn den frie!",
      "Bevegelse skaper rom",
      "Tålmodighet i spillet",
      "Aggressivt press som 5"
    ],
    variations: [
      "Lag som mister må løpe rundt",
      "1-touch for angriperne",
      "Legg til mål"
    ],
    source: "seeger",
    sourceRef: "Seeger s.183 'Possession game (3 teams - 5v5)'"
  },
  {
    id: "smallsided-53",
    exerciseNumber: 53,
    name: "4v4 + 2 Nøytrale på bredden",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 10,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 inne med 2 nøytrale på hver langside. Nøytrale spiller alltid med ballaget = 6v4.",
    coachingPoints: [
      "Bruk bredden!",
      "Nøytrale: Alltid spillbar",
      "Bytt side via nøytral",
      "Inne: Trekk forsvarere"
    ],
    variations: [
      "Nøytrale kun 1-touch",
      "Rotasjon hvert 2. min",
      "4 nøytrale (2 per side)"
    ],
    source: "seeger",
    sourceRef: "Seeger s.186 'Possession game (neutral players on the wing)'"
  },
  {
    id: "smallsided-54",
    exerciseNumber: 54,
    name: "4v4 + 2 i Diamant",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 10,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 med 2 nøytrale plassert i diamantformasjon (topp/bunn). Gir dybde i spillet.",
    coachingPoints: [
      "Spill i dybden",
      "Nøytral på topp = veggspill",
      "Nøytral på bunn = sikkerhet",
      "Timing på gjennombrudd"
    ],
    variations: [
      "Kun score via nøytral",
      "Bytting ved 5 pasninger",
      "Legg til soner"
    ],
    source: "seeger",
    sourceRef: "Seeger s.187 'Possession game (diamond neutral)'"
  },
  {
    id: "smallsided-55",
    exerciseNumber: 55,
    name: "Sone-til-sone",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Bane i 3 soner. 4v2 i første sone, spill over til 4v2 i siste. 2 forsvarere i midten prøver snappe.",
    coachingPoints: [
      "Rett tidspunkt å spille over",
      "Kvalitet på lang pasning",
      "Mottakerne: Timing på bevegelse",
      "Forsvarere: Koordinert press"
    ],
    variations: [
      "5v2 per sone",
      "Chip over midten",
      "Spiller følger pasning"
    ],
    source: "seeger",
    sourceRef: "Seeger s.188 'Zone-to-zone possession'"
  },
  {
    id: "smallsided-56",
    exerciseNumber: 56,
    name: "Quadrat med 4 mål",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "4 små mål"],
    description: "4v4 på kvadratisk bane med mål i hvert hjørne. Hvert lag forsvarer 2 diagonalt motsatte mål.",
    coachingPoints: [
      "Les spillet - bytt mål!",
      "Rask omstilling",
      "Forsvar: Steng nærmeste",
      "Kommunikasjon"
    ],
    variations: [
      "Rotér hvilke mål som gjelder",
      "3-touch",
      "Kun scoring etter veggspill"
    ],
    source: "seeger",
    sourceRef: "Seeger s.192 'Four goals game (diagonal)'"
  },
  {
    id: "smallsided-57",
    exerciseNumber: 57,
    name: "Linjespill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 der scoring skjer ved å stoppe ballen på motstanderens baklinje med foten på ballen.",
    coachingPoints: [
      "Dybdeløp til linjen",
      "Timing på innspillet",
      "Kontroll under press",
      "Forsvar: Dekk rommet"
    ],
    variations: [
      "Må motta med svak fot",
      "Innspill må være i lufta",
      "Legg til endesoner"
    ],
    source: "seeger",
    sourceRef: "Seeger s.194 'Line ball'"
  },
  {
    id: "smallsided-58",
    exerciseNumber: 58,
    name: "Kongepar (King Couple)",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 der ett par på hvert lag er 'kongepar'. Pasning mellom kongeparet = 1 poeng. Andre spillere prøver koble dem sammen.",
    coachingPoints: [
      "Finn kongene!",
      "Konger: Bevegelse for å bli fri",
      "Andre: Bygg bro mellom kongene",
      "Forsvar: Marker kongene"
    ],
    variations: [
      "Bytting av kongepar",
      "3 konger",
      "Konger kun 1-touch"
    ],
    source: "seeger",
    sourceRef: "Seeger s.196 'King couple'"
  },
  {
    id: "smallsided-59",
    exerciseNumber: 59,
    name: "Scoringssoner",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Avslutninger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 med scoringssone foran hvert mål. Må entre sonen før skudd. Ingen forsvarere i sonen.",
    coachingPoints: [
      "Timing på innløp",
      "Kvalitet på innspillet",
      "Rask avslutning",
      "Forsvar: Steng pasningslinjen"
    ],
    variations: [
      "Forsvarer kan følge etter 1 sek",
      "Førstetouch-avslutning",
      "Innspill må være lav"
    ],
    source: "seeger",
    sourceRef: "Seeger s.198 'Scoring zones'"
  },
  {
    id: "smallsided-60",
    exerciseNumber: 60,
    name: "Numerisk overtall",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5+2 nøytrale. Nøytrale blir med angrepet = 7v5. Ved overgang må angriperne vente på nøytrale.",
    coachingPoints: [
      "Utnytt 7v5 - tålmodighet",
      "Nøytrale: Rask omstilling",
      "Forsvar: Forsink til 5v5",
      "Kommunikasjon"
    ],
    variations: [
      "3 nøytrale",
      "Nøytrale kun 2-touch",
      "Tidsbegrensning på angrep"
    ],
    source: "seeger",
    sourceRef: "Seeger s.200 'Numerical superiority'"
  },
  {
    id: "smallsided-61",
    exerciseNumber: 61,
    name: "Pressing-spill",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "Pressing",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "6v6 med fokus på høyt press. Poeng for ballvinning i motstanderens halvdel (2p) vs vanlig mål (1p).",
    coachingPoints: [
      "Trigger: Når presser vi?",
      "Samkjørt pressing",
      "Sikring bak presset",
      "Vinne ball = angrip!"
    ],
    variations: [
      "3p for scoring etter vinning",
      "Oppspill fra keeper trigger",
      "Legg til tidsbegrensning"
    ],
    source: "seeger",
    sourceRef: "Seeger s.202 'Pressing game'"
  },
  {
    id: "smallsided-62",
    exerciseNumber: 62,
    name: "Kontringsspill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "5v5+keepere. Scoring innen 8 sek etter vinning = 2p. Trener hurtig omstilling.",
    coachingPoints: [
      "Første tanke: Fremover!",
      "Dybdeløp med én gang",
      "Kvalitet under tempo",
      "Tell ned høyt!"
    ],
    variations: [
      "6 sek = 3p",
      "Må ha min. 2 pasninger",
      "Keeper starter kontra"
    ],
    source: "seeger",
    sourceRef: "Seeger s.204 'Counter-attacking game'"
  },
  {
    id: "smallsided-63",
    exerciseNumber: 63,
    name: "Bygge bakfra",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Oppbygging",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "5v5+keepere. Keeper starter alltid. Må bygge ut gjennom markerte soner. Motstand øker gradvis.",
    coachingPoints: [
      "Tålmodighet bakfra",
      "Bevegelse for å bli spillbar",
      "Når slår vi gjennom?",
      "Keeper: Les spillet"
    ],
    variations: [
      "Forsvarere starter i angrepssone",
      "Legg til nøytral 6er",
      "Maks berøringer per sone"
    ],
    source: "seeger",
    sourceRef: "Seeger s.206 'Building from the back'"
  },
  {
    id: "smallsided-64",
    exerciseNumber: 64,
    name: "Løpsdyp (Depth runs)",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 der spiller som gjør dybdeløp bak forsvaret og mottar = 2p (vs 1p vanlig mål).",
    coachingPoints: [
      "Timing på løpet",
      "Kvalitet på gjennomspill",
      "Les forsvarerens posisjon",
      "Veggspill før dybde"
    ],
    variations: [
      "Må være 1-touch på dybdepassning",
      "Kun teller med avslutning",
      "Legg til begrensninger"
    ],
    source: "seeger",
    sourceRef: "Seeger s.208 'Through balls & depth runs'"
  },
  {
    id: "smallsided-65",
    exerciseNumber: 65,
    name: "Kantspill",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "6v6 med kantsoner. Spill i kantsonen + innlegg = 2p ved scoring. Trener kantspill.",
    coachingPoints: [
      "Bytt side hvis stengt",
      "Timing på innløp i boks",
      "Innlegg: Kvalitet!",
      "Forsvar: Press på kant"
    ],
    variations: [
      "Må score på heading",
      "Kantspiller = 2-touch",
      "Overlapp-poeng"
    ],
    source: "seeger",
    sourceRef: "Seeger s.210 'Wing play game'"
  },
  {
    id: "smallsided-66",
    exerciseNumber: 66,
    name: "Endesone-spill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 med endesoner (5m dype). Poeng ved å motta ball i endesonen med kontroll.",
    coachingPoints: [
      "Timing på innløp",
      "Kvalitet på pasning",
      "Mottaker: Åpen kropp",
      "Forsvar: Dekk rommet"
    ],
    variations: [
      "Må snu og spille tilbake",
      "2 i endesonen = ekstra poeng",
      "Legg til målspiller"
    ],
    source: "seeger",
    sourceRef: "Seeger s.212 'End zone game'"
  },
  {
    id: "smallsided-67",
    exerciseNumber: 67,
    name: "Triangelspill",
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "3v3 i tre separate trekanter som danner stor trekant. Spill må gå via alle tre før poeng.",
    coachingPoints: [
      "Les spillet - hvilken trekant er åpen?",
      "Kvalitet på pasning mellom",
      "Bevegelse inni trekanten",
      "Kommunikasjon"
    ],
    variations: [
      "2-touch inni trekant",
      "Tidsbegrensning",
      "4v4 i hver"
    ],
    source: "seeger",
    sourceRef: "Seeger s.214 'Triangle game'"
  },
  {
    id: "smallsided-68",
    exerciseNumber: 68,
    name: "Boksespill (Box game)",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 i firkant med 4 hjørnespillere (nøytrale). Innespillere må bruke hjørner for å bytte side.",
    coachingPoints: [
      "Bruk hjørnene!",
      "Hjørner: Alltid spillbar",
      "Bytt angrepspunkt",
      "Forsvar: Press mot hjørne"
    ],
    variations: [
      "Hjørner 1-touch",
      "Rotasjon inn/ut",
      "Legg til mål"
    ],
    source: "seeger",
    sourceRef: "Seeger s.216 'Box game'"
  },
  {
    id: "smallsided-69",
    exerciseNumber: 69,
    name: "Dobbel rondo",
    category: "game",
    duration: 10,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "To 5v2 rondoer side om side. Ved gjennomspill i midten mellom dem byttes forsvarere.",
    coachingPoints: [
      "Finn åpning til andre rondo",
      "Kvalitet på lang pasning",
      "Timing - når er det åpent?",
      "Forsvarere: Steng midten"
    ],
    variations: [
      "3 i midten",
      "Chip over = bytte",
      "Spiller følger ball"
    ],
    source: "seeger",
    sourceRef: "Seeger s.218 'Double rondo'"
  },
  {
    id: "smallsided-70",
    exerciseNumber: 70,
    name: "Tempospill",
    category: "game",
    duration: 10,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "Stoppeklokke"],
    description: "5v5 der laget teller pasninger høyt. Rekord = mål å slå. Ved tap nullstilles.",
    coachingPoints: [
      "Hold tempo oppe",
      "Kvalitet selv under press",
      "Bevegelse - alltid alternativ",
      "Tell høyt sammen!"
    ],
    variations: [
      "1-touch = teller dobbelt",
      "Maks 2 sek per ball",
      "Rekord = alle gjør øvelse"
    ],
    source: "seeger",
    sourceRef: "Seeger s.220 'Tempo possession'"
  },
  {
    id: "smallsided-71",
    exerciseNumber: 71,
    name: "3-soner spill",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 15,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Bane i 3 soner med 2v1 i hver. Ball må gjennom alle soner. Spillere låst til sin sone.",
    coachingPoints: [
      "2v1: Utnytt overtall",
      "Timing på pasning til neste",
      "Bevegelse inni sonen",
      "Forsvarer: Forsink"
    ],
    variations: [
      "3v2 per sone",
      "Spiller kan følge ball",
      "Legg til mål i endene"
    ],
    source: "seeger",
    sourceRef: "Seeger s.222 'Three zone game'"
  },
  {
    id: "smallsided-72",
    exerciseNumber: 72,
    name: "Keeper-starter",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Oppbygging",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "5v5+keepere. Keeper har alltid ballstart etter mål/ut. Fokus på oppspill og første mottak.",
    coachingPoints: [
      "Bevegelse for keeper",
      "Åpne kroppen ved mottak",
      "Spill ut av press",
      "Keeper: Tålmodighet"
    ],
    variations: [
      "Keeper kun kast",
      "Første mottak = 2-touch",
      "Press fra halvveis"
    ],
    source: "seeger",
    sourceRef: "Seeger s.224 'Goalkeeper distribution'"
  },
  {
    id: "smallsided-73",
    exerciseNumber: 73,
    name: "Formasjonsspill 3-1",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 der begge lag må holde 3-1 formasjon. Trener posisjonsspill og forståelse.",
    coachingPoints: [
      "Hold formasjonen!",
      "6er: Dreiepunkt",
      "Bevegelse innen rollen",
      "Bytt side gjennom 6er"
    ],
    variations: [
      "2-3 formasjon",
      "Fri når i angrep",
      "Rotér posisjoner"
    ],
    source: "seeger",
    sourceRef: "Seeger s.226 'Formation play 3-1'"
  },
  {
    id: "smallsided-74",
    exerciseNumber: 74,
    name: "Formasjonsspill 2-2",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 i 2-2 formasjon. To bak, to foran. Trener samspill mellom linjer.",
    coachingPoints: [
      "Forbindelse mellom linjene",
      "Bevegelse i bredden",
      "Støttespill bakover",
      "Gjennombrudd fremover"
    ],
    variations: [
      "Kun score via fremste",
      "Bytt linje ved pasning",
      "Legg til nøytral"
    ],
    source: "seeger",
    sourceRef: "Seeger s.228 'Formation play 2-2'"
  },
  {
    id: "smallsided-75",
    exerciseNumber: 75,
    name: "Flytsone",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 med 'flytsone' i midten der kun én spiller per lag kan være. Skaper 4v4 + 1v1 dynamikk.",
    coachingPoints: [
      "Hvem tar flytsonen?",
      "Timing inn/ut av sonen",
      "1v1 i midten: Vinn den!",
      "Støttespill rundt"
    ],
    variations: [
      "2v2 i flytsonen",
      "Kun 2 sek i sonen",
      "Scoring kun via flytsone"
    ],
    source: "seeger",
    sourceRef: "Seeger s.230 'Flow zone'"
  },
  {
    id: "smallsided-76",
    exerciseNumber: 76,
    name: "Målvokter-spill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "4 små mål"],
    description: "5v5 med 4 mål (ett i hvert hjørne). Én spiller per lag er 'målvokter' som beskytter begge sine mål.",
    coachingPoints: [
      "Målvokter: Posisjonering",
      "Andre: Trekk målvokter",
      "Bytt angrepspunkt",
      "Kommunikasjon"
    ],
    variations: [
      "Rotér målvokter",
      "Målvokter kan score",
      "3 mål per lag"
    ],
    source: "seeger",
    sourceRef: "Seeger s.232 'Goalkeeper SSG'"
  },
  {
    id: "smallsided-77",
    exerciseNumber: 77,
    name: "Pasningspoeng",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 der hver 5. pasning = 1 bonuspoeng (i tillegg til vanlige mål). Belønner ballhold.",
    coachingPoints: [
      "Tell høyt!",
      "Kvalitet på pasninger",
      "Tålmodighet vs tempo",
      "Når slår vi gjennom?"
    ],
    variations: [
      "Hver 3. pasning",
      "Split-pass = teller som 2",
      "1-touch = ekstra"
    ],
    source: "seeger",
    sourceRef: "Seeger s.234 'Passing points'"
  },
  {
    id: "smallsided-78",
    exerciseNumber: 78,
    name: "Sonebytter",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Bane i 4 soner. 3v1 i 2 soner, tom i 2. Ball må til tom sone = spillere følger/bytter.",
    coachingPoints: [
      "Les hvilken sone som er tom",
      "Timing på byttet",
      "Kvalitet på lang pasning",
      "Rask bevegelse etter"
    ],
    variations: [
      "4v2 per sone",
      "Maks 5 sek per sone",
      "Chip = ekstra poeng"
    ],
    source: "seeger",
    sourceRef: "Seeger s.236 'Zone switching'"
  },
  {
    id: "smallsided-79",
    exerciseNumber: 79,
    name: "Direktespill",
    category: "game",
    duration: 10,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 der direktespill (1-touch) gir doble poeng ved scoring. Belønner kombinasjonsspill.",
    coachingPoints: [
      "Tenk før du får ball",
      "Åpen kropp = flere valg",
      "Veggspill!",
      "Kvalitet på touch"
    ],
    variations: [
      "3+ direktepassninger før = 3x",
      "Lag må spille 1-touch i siste fase",
      "Keeper teller høyt"
    ],
    source: "seeger",
    sourceRef: "Seeger s.238 'Direct play bonus'"
  },
  {
    id: "smallsided-80",
    exerciseNumber: 80,
    name: "Midtbane-dominans",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "6v6 med markert midtsone. Begge lag må ha min. 2 spillere i midtsonen hele tiden.",
    coachingPoints: [
      "Kontroller midten",
      "Bevegelse i sonen",
      "Spill gjennom midten",
      "Forsvar: Press i midten"
    ],
    variations: [
      "3 i midten",
      "Scoring kun via midten",
      "Nøytral i midten"
    ],
    source: "seeger",
    sourceRef: "Seeger s.240 'Midfield dominance'"
  },
  {
    id: "smallsided-81",
    exerciseNumber: 81,
    name: "Omstillingsspill",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6v6+keepere. Etter scoring starter motsatt keeper umiddelbart = rask omstilling.",
    coachingPoints: [
      "Følg med etter scoring!",
      "Rask mental omstilling",
      "Press eller fall tilbake?",
      "Kommunikasjon"
    ],
    variations: [
      "Keeper kaster langt",
      "3 sek regel",
      "Scoring etter 5p"
    ],
    source: "seeger",
    sourceRef: "Seeger s.242 'Transition game'"
  },
  {
    id: "smallsided-82",
    exerciseNumber: 82,
    name: "Vendespill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 der spiller som snur og spiller fremover får poeng (markert av trener). Belønner modig spill.",
    coachingPoints: [
      "Sjekk over skulder",
      "Førstetouch til å snu",
      "Når er det trygt å snu?",
      "Støttespill foran"
    ],
    variations: [
      "Kun vendinger i midtsone",
      "Vending + pasning = 2p",
      "Legg til press"
    ],
    source: "seeger",
    sourceRef: "Seeger s.244 'Turning game'"
  },
  {
    id: "smallsided-83",
    exerciseNumber: 83,
    name: "Veggspill-bonus",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 der veggspill (gi-og-gå) i motstanderens halvdel = 1 bonuspoeng.",
    coachingPoints: [
      "Timing på løpet",
      "Veggspiller: 1-touch tilbake",
      "Fortsett løpet!",
      "Kvalitet på begge pasninger"
    ],
    variations: [
      "Dobbelt veggspill = 2p",
      "Må avslutte etter vegg",
      "Kun i visse soner"
    ],
    source: "seeger",
    sourceRef: "Seeger s.246 'Wall pass bonus'"
  },
  {
    id: "smallsided-84",
    exerciseNumber: 84,
    name: "Spillende stopper",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Oppbygging",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 der én spiller per lag er 'spillende stopper' som starter alle angrep. Fokus på oppbygging.",
    coachingPoints: [
      "Stopper: Løft hodet",
      "Andre: Bevegelse for stopper",
      "Pasningskvalitet ut",
      "Tålmodighet"
    ],
    variations: [
      "Rotér stopper",
      "Stopper maks 3 berøringer",
      "Må bygge via stopper"
    ],
    source: "seeger",
    sourceRef: "Seeger s.248 'Playing center back'"
  },
  {
    id: "smallsided-85",
    exerciseNumber: 85,
    name: "Frigjøringsspill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 der spillere kun har 3 sek med ball før pasning. Trener rask ballsirkulasjon.",
    coachingPoints: [
      "Tenk før du mottar",
      "Alltid 2 alternativer",
      "Bevegelse uten ball",
      "Kvalitet under press"
    ],
    variations: [
      "2 sek",
      "Trener teller høyt",
      "Tap = straffe"
    ],
    source: "seeger",
    sourceRef: "Seeger s.250 'Quick release'"
  },
  {
    id: "smallsided-86",
    exerciseNumber: 86,
    name: "Fotball-sjakk",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 der trener roper 'FREEZE' - alle må stå stille. Analyserer posisjonering før fortsettelse.",
    coachingPoints: [
      "Hvor skulle du stått?",
      "Triangler og linjer",
      "Dekningsbalanse",
      "Spillforståelse"
    ],
    variations: [
      "Spillere foreslår",
      "Flytt én spiller før start",
      "Kun freeze i forsvar"
    ],
    source: "seeger",
    sourceRef: "Seeger s.252 'Football chess'"
  },
  {
    id: "smallsided-87",
    exerciseNumber: 87,
    name: "Joker i midten",
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 13,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "4v4+1 joker som alltid spiller med ballaget. Joker må være i midtsonen.",
    coachingPoints: [
      "Bruk jokeren!",
      "Joker: Åpen posisjon",
      "Spill gjennom joker",
      "Forsvar: Press via joker"
    ],
    variations: [
      "2 jokere",
      "Joker kun 1-touch",
      "Joker kan score"
    ],
    source: "seeger",
    sourceRef: "Seeger s.254 'Joker in the middle'"
  },
  {
    id: "smallsided-88",
    exerciseNumber: 88,
    name: "Labyrint-spill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 på bane med kjegler spredt som 'hindringer'. Må navigere rundt kjeglene.",
    coachingPoints: [
      "Bruk kjeglene som skjold",
      "Veggspill rundt kjegler",
      "Les rommet",
      "Kreativitet"
    ],
    variations: [
      "Flere kjegler",
      "Kjegler i mønster",
      "Berøring av kjegle = tap"
    ],
    source: "seeger",
    sourceRef: "Seeger s.256 'Maze game'"
  },
  {
    id: "smallsided-89",
    exerciseNumber: 89,
    name: "Størrelsesbytte",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 der banen krymper/utvider på treners signal. Trener tilpasning til rom.",
    coachingPoints: [
      "Tilpass til rommet",
      "Liten bane = tett, rask",
      "Stor bane = bruk bredde",
      "Mental tilpasning"
    ],
    variations: [
      "Kun krymping",
      "Spillere bestemmer",
      "Bytt ved mål"
    ],
    source: "seeger",
    sourceRef: "Seeger s.258 'Size changing'"
  },
  {
    id: "smallsided-90",
    exerciseNumber: 90,
    name: "Tvillinger",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5 der to spillere per lag er 'tvillinger' som må holde seg innen 5m fra hverandre.",
    coachingPoints: [
      "Koordinert bevegelse",
      "Kommunikasjon mellom par",
      "Utnytt parformasjonen",
      "Forsvar: Skill dem!"
    ],
    variations: [
      "Alle er tvillinger",
      "Tvillinger = 1-touch",
      "Bytt tvilling-par"
    ],
    source: "seeger",
    sourceRef: "Seeger s.260 'Twins'"
  },

  // ===== MATKOVICH - ELITE SOCCER DRILLS (8-15 spillere) =====
  {
    id: "smallsided-91",
    exerciseNumber: 91,
    name: "4v4 Firkant med støttespillere",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 inne i 20x20m firkant med én nøytral på hver side (4 stk). Nøytrale kun 1-touch. 7 pasninger = 1 poeng.",
    coachingPoints: [
      "Bruk nøytrale for å komme ut av press",
      "Motta på tvers av kroppen",
      "Vit hvor neste pasning går FØR du får ball",
      "Kompakt press som forsvar"
    ],
    variations: [
      "2-touch for alle",
      "5 pasninger = poeng",
      "2v2 i midten (mindre)"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.120 'Drill 57: 4v4 Square Possession With Bumpers'"
  },
  {
    id: "smallsided-92",
    exerciseNumber: 92,
    name: "Fire-sone spill",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 18,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Halvbane delt i 4 soner. 8v8+2 nøytrale. Maks 4 pasninger per sone før bytte. 10 pasninger = poeng.",
    coachingPoints: [
      "Spre dere - ikke alle i én sone",
      "Ha alltid dybdeutløp i annen sone",
      "Kort-kort-lang pasningsrytme",
      "Drevne eller luftpasninger ved bytte"
    ],
    variations: [
      "6 soner - maks 3 pasninger per",
      "2-touch maks",
      "1-touch ved avskjæring"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.122 'Drill 58: Four-Zone Game'"
  },
  {
    id: "smallsided-93",
    exerciseNumber: 93,
    name: "Trelagsspill (Keepaway)",
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 15,
    theme: "Possession",
    equipment: ["Kjegler", "3 farger vester", "Baller"],
    description: "Tre lag à 3-5. To lag holder ball mot ett. Ved tap bytter roller. 5 pasninger = poeng.",
    coachingPoints: [
      "Finn rom i stort overtall",
      "Kvalitet selv uten press",
      "Rask omstilling ved tap",
      "Kommunikasjon: Hvem presser?"
    ],
    variations: [
      "Lag som mister løper rundt",
      "1-touch for angriperne",
      "Legg til mål"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.130 'Drill 61: Three-Team Keep-Away Game'"
  },
  {
    id: "smallsided-94",
    exerciseNumber: 94,
    name: "Vinduer (Windows)",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler", "Baller"],
    description: "8 med ball på stor sirkel (30-40m), 8 inne. Innespillere sjekker, mottar, returnerer, snur og finner ny.",
    coachingPoints: [
      "Finte før mottak",
      "Førstetouch ut fra kroppen",
      "Vektet pasning tilbake",
      "Minimer tid mellom mottak og pasning"
    ],
    variations: [
      "Snu og dribl før pasning",
      "Overlapping etter pasning",
      "Heading-varianter"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.82 'Drill 41: Windows'"
  },
  {
    id: "smallsided-95",
    exerciseNumber: 95,
    name: "Sikksakk-pasning",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "2 baller"],
    description: "7 spillere i sikksakk-linje (15m mellom). 2 baller. Pasning og følg. Mottaker snur, spiller videre.",
    coachingPoints: [
      "Motta på tvers av kroppen",
      "Finte før mottak",
      "Stram pasning til neste",
      "Kort tid mellom mottak og pasning"
    ],
    variations: [
      "Veggspill mellom hver",
      "Legg av for gjennomspill",
      "Lang, slått ball tilbake i stedet for dribling"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.84 'Drill 42: Angle Passing and Receiving'"
  },
  {
    id: "smallsided-96",
    exerciseNumber: 96,
    name: "5v3 Possession med mål",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v3 inne med 2 mål. 5 holder ball, ved tap blir det 5v3 andre veien. Scoring = 3 poeng.",
    coachingPoints: [
      "Utnytt overtall - finn den frie",
      "Kvalitet selv uten press",
      "Når slår vi gjennom?",
      "Forsvar: Kompakt, press sammen"
    ],
    variations: [
      "4v2",
      "6v4",
      "Legg til keepere"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.126 'Drill 60: Keep-Away Drill'"
  },
  {
    id: "smallsided-97",
    exerciseNumber: 97,
    name: "Langball-spill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "2 baller"],
    description: "Fire 15x15m ruter. 5v1 i 2 diagonale ruter. Etter 4 pasninger = lang ball til tom rute, alle følger.",
    coachingPoints: [
      "Korte pasninger i rute, lang ut",
      "Les hvilken rute som er åpen",
      "Kvalitet på lang pasning",
      "Forsvarere: Steng pasningslinjer"
    ],
    variations: [
      "3 pasninger før bytte",
      "Legg til forsvarer",
      "Mindre ruter"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.128 'Drill 59: Long Ball Drill'"
  },
  {
    id: "smallsided-98",
    exerciseNumber: 98,
    name: "4v4 med endesoner",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 på 30x40m. Score ved å motta i motstanderens endesone (5m dyp). Må ha kontroll.",
    coachingPoints: [
      "Timing på dybdeløp",
      "Kvalitet på gjennomspill",
      "Mottaker: Åpen kropp",
      "Forsvar: Dekk rommet"
    ],
    variations: [
      "5v5",
      "Må snu og spille tilbake",
      "Legg til målspiller i sonen"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.118 'Drill 56: End Zone Game'"
  },
  {
    id: "smallsided-99",
    exerciseNumber: 99,
    name: "Pressing-trigger",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Pressing",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5+keepere. Spesifikke triggere for press (tilbakespill, dårlig touch, kropp vendt). Poeng for pressvinn.",
    coachingPoints: [
      "Les triggeren - når presser vi?",
      "Samkjørt pressing",
      "Sikring bak presset",
      "Vinne ball = angrip direkte!"
    ],
    variations: [
      "Kun tilbakespill som trigger",
      "Ekstrapoeng for rask scoring",
      "Legg til soner"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.132 'Pressing Game'"
  },
  {
    id: "smallsided-100",
    exerciseNumber: 100,
    name: "Overgangsspill 5v5",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "5v5+keepere. Ved tap = 6 sek til å score. Keeper starter alltid motangrep umiddelbart.",
    coachingPoints: [
      "Rask mental omstilling",
      "Dybdeløp med én gang",
      "Kvalitet under tempo",
      "Forsvar: Fall tilbake raskt!"
    ],
    variations: [
      "8 sek tidsfrist",
      "4 sek = 3 poeng",
      "Keeper kaster langt"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.134 'Transition Game'"
  },
  {
    id: "smallsided-101",
    exerciseNumber: 101,
    name: "6v4 Angrep mot forsvar",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "1 mål", "1 keeper"],
    description: "6 angripere mot 4 forsvarere + keeper. Angrep har 20 sek. Ved vinning kontrer forsvar til linje.",
    coachingPoints: [
      "Utnytt 6v4 - tålmodighet",
      "Bytt angrepspunkt",
      "Timing på avslutning",
      "Forsvar: Kompakt, forsink"
    ],
    variations: [
      "5v3",
      "7v5",
      "Legg til mottaksmål for forsvar"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.136 'Attack vs Defense'"
  },
  {
    id: "smallsided-102",
    exerciseNumber: 102,
    name: "Kantangrep med innlegg",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "1 mål", "1 keeper"],
    description: "Kantspillere faste, 4v4 i midten. Mål kun fra innlegg. Rotér kantspillere.",
    coachingPoints: [
      "Timing på innløp i boks",
      "Kvalitet på innlegg",
      "Nærste/fjerneste stolpe",
      "Bakrom-bevegelser"
    ],
    variations: [
      "Kun heading",
      "Cutback = ekstra poeng",
      "Kantspiller kan skyte"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.142-146 'Crossing and Finishing'"
  },
  {
    id: "smallsided-103",
    exerciseNumber: 103,
    name: "Kombinasjonsspill til avslutning",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Avslutninger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "4v4+keepere på 30x40m. Mål kun etter minst 3 pasninger i motstanderens halvdel.",
    coachingPoints: [
      "Kombinasjonsspill før avslutning",
      "Tålmodighet i siste tredel",
      "Kvalitet på avslutning",
      "Støttespill rundt ballfører"
    ],
    variations: [
      "2 pasninger",
      "Veggspill før = ekstra poeng",
      "5v5"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.148 'Drill 67-68: Finishing Games'"
  },
  {
    id: "smallsided-104",
    exerciseNumber: 104,
    name: "Direktespill-mål",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Avslutninger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "5v5+keepere. Direkteskudd (1-touch) = 2 poeng, vanlig mål = 1 poeng.",
    coachingPoints: [
      "Tenk skudd før du får ball",
      "Posisjonering for direkteavslutning",
      "Kvalitet på innspill",
      "Keeper: Posisjonering"
    ],
    variations: [
      "Kun direktemål teller",
      "Heading = 3 poeng",
      "Volley = 3 poeng"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.150 'One-Touch Finishing'"
  },
  {
    id: "smallsided-105",
    exerciseNumber: 105,
    name: "Bygge opp og avslutte",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Oppbygging",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6v6+keepere. Keeper starter alltid. Må bygge via markerte soner. Press øker gradvis.",
    coachingPoints: [
      "Tålmodighet bakfra",
      "Bevegelse for keeper",
      "Når slår vi gjennom?",
      "Les presset"
    ],
    variations: [
      "Forsvarere starter høyt",
      "Maks berøringer per sone",
      "Legg til nøytral 6er"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.152 'Build-Up Play'"
  },
  {
    id: "smallsided-106",
    exerciseNumber: 106,
    name: "Rotasjonsspill",
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "3 grupper à 3-4 på bane. Én gruppe holder, én presser, én hviler. Rotér hvert minutt.",
    coachingPoints: [
      "Maks intensitet i 1 min",
      "Rask omstilling mellom roller",
      "Kvalitet selv med press",
      "Kommunikasjon"
    ],
    variations: [
      "2 min runder",
      "Lag som mister bytter",
      "Poengsum per runde"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.154 'Rotation Game'"
  },
  {
    id: "smallsided-107",
    exerciseNumber: 107,
    name: "Numerisk overlegsspill",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "Overganger",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "5v5+2 nøytrale. Nøytrale alltid med angrep = 7v5. Ved vinning må man vente på nøytrale.",
    coachingPoints: [
      "Utnytt 7v5 - tålmodighet!",
      "Nøytrale: Rask omstilling",
      "Forsvar: Forsink til 5v5",
      "Kommunikasjon"
    ],
    variations: [
      "3 nøytrale",
      "Nøytrale kun 2-touch",
      "Tidsbegrensning på angrep"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.156 'Numerical Superiority Game'"
  },
  {
    id: "smallsided-108",
    exerciseNumber: 108,
    name: "Støttespill i trekant",
    category: "warmup",
    duration: 10,
    playersMin: 9,
    playersMax: 15,
    theme: "Possession",
    equipment: ["Kjegler", "Baller"],
    description: "Grupper på 3. Ballfører spiller, overlapper. Mottaker veggspill og spiller til tredjemann.",
    coachingPoints: [
      "Vis for mottak",
      "Timing på overlapp",
      "Veggspill-kvalitet",
      "Fortsett løpet!"
    ],
    variations: [
      "Takeover i stedet for veggspill",
      "Dobbelt veggspill",
      "Legg til press"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.80 'Drill 40: Groups of Three'"
  },
  {
    id: "smallsided-109",
    exerciseNumber: 109,
    name: "Sirkelspill med 8",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler", "Baller"],
    description: "8 på sirkel, 8 inne. Hver ytrespiller har ball. Innespillere sjekker, mottar, returnerer, finner ny.",
    coachingPoints: [
      "Sjekk over skulderen",
      "Finte før mottak",
      "Kvalitet på retur",
      "Kontinuerlig bevegelse"
    ],
    variations: [
      "Snu og dribl først",
      "Kun 1-touch",
      "Legg til forsvarere inne"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.82 'Drill 41: Windows'"
  },
  {
    id: "smallsided-110",
    exerciseNumber: 110,
    name: "6v6 med soner",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6v6+keepere på halvbane. Bane delt i 3 soner. Minst 2 spillere per lag i hver sone.",
    coachingPoints: [
      "Hold formasjonen",
      "Spill mellom linjer",
      "Bevegelse innen sonen",
      "Kommunikasjon"
    ],
    variations: [
      "3 i midtsone",
      "Fri bevegelse ved scoring",
      "Rotér soner"
    ],
    source: "matkovich",
    sourceRef: "Matkovich s.122 'Zone Play'"
  },

  // ===== WORLD CLASS COACHING - 50 Small-Sided Games =====
  // Oppvarming og kondisjon
  {
    id: "smallsided-111",
    exerciseNumber: 111,
    name: "Håndball til mål",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 14,
    theme: "Bevegelse",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6v6 håndball med avslutning. Spillerne spiller med hendene (kast og fang), men må avslutte med hodet eller volleyskudd. Ingen dribling - kun pasninger. Tvinger bevegelse uten ball.",
    coachingPoints: [
      "Konstant bevegelse for å bli spillbar",
      "Timing på løp - ikke løp for tidlig",
      "Kvalitet på innlegg til avslutning",
      "Kommunikasjon - rop deg fri"
    ],
    variations: [
      "Kun heading til mål",
      "Maks 3 sek med ball",
      "Legg til overtall ved innlegg"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.12 'Team Hand Ball to Goal'"
  },
  {
    id: "smallsided-112",
    exerciseNumber: 112,
    name: "Kast-Heading-Fang",
    category: "warmup",
    duration: 12,
    playersMin: 10,
    playersMax: 16,
    theme: "Bevegelse",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "To lag spiller på bane med endesoner. Spillerne kaster til hverandre, og mottaker MÅ hodet ballen tilbake. Poeng ved å fange ball i endesone. Aktiv oppvarming med heading.",
    coachingPoints: [
      "Timing på hopp og heading",
      "Løp inn i rom - ikke stå stille",
      "Presise kast - ikke for høye",
      "Forsvar: avskjær kastene"
    ],
    variations: [
      "Mottaker kan velge heading eller bryst",
      "Doble poeng for heading i sone",
      "Legg til mål med keeper"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.14 'Throw-Head-Catch'"
  },
  {
    id: "smallsided-113",
    exerciseNumber: 113,
    name: "Fire lag oppvarming",
    category: "warmup",
    duration: 10,
    playersMin: 12,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler", "Vester (4 farger)", "Baller"],
    description: "Fire lag à 3-4 spillere på kvadrat. Lag 1+2 mot Lag 3+4 i ballbesittelse. Bytter motstandere hvert minutt. Alle må holde intensiteten opp.",
    coachingPoints: [
      "Kommunikasjon - hvem er med/mot deg",
      "Finn lagkamerat raskt",
      "Høyt tempo selv i oppvarming",
      "Sjekk over skulder kontinuerlig"
    ],
    variations: [
      "Vekslende partnerlag",
      "Lag som mister ball bytter ut",
      "Maks 2-touch"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.10 'Four Team Warm-Up'"
  },

  // Pasning og ballbesittelse
  {
    id: "smallsided-114",
    exerciseNumber: 114,
    name: "5v2 En-touch rondo",
    category: "game",
    duration: 10,
    playersMin: 7,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5 spillere på sirkel holder ball mot 2 i midten. Kun 1-touch tillatt. Spiller som mister går i midten. Ekstremt høy intensitet og teknisk fokus.",
    coachingPoints: [
      "Kroppsstilling - åpen for neste pasning",
      "Første touch = pasning",
      "Kommunikasjon - hvem er åpen?",
      "Forsvar: jobb i par, steng pasningslinjer"
    ],
    variations: [
      "2-touch for enklere variant",
      "Poeng for 10 pasninger",
      "6v2 for større gruppe"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.61 '5v2 One-Touch Possession'"
  },
  {
    id: "smallsided-115",
    exerciseNumber: 115,
    name: "Kjegler som mål 4v4",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler (mange)", "Vester", "Baller"],
    description: "4v4 på bane med 6-8 kjeglepar spredt rundt. Score ved å spille gjennom kjeglepar til lagkamerat. Tvinger scanning og spillebytte.",
    coachingPoints: [
      "Scan banen - hvor er det åpent?",
      "Bytt angrepspunkt ofte",
      "Bevegelse uten ball skaper åpninger",
      "Kvalitet på gjenomspillingen"
    ],
    variations: [
      "Kan ikke score gjennom samme mål to ganger på rad",
      "Scoring kun med svak fot",
      "Legg til nøytrale spillere"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.56 'Cones as Goals'"
  },
  {
    id: "smallsided-116",
    exerciseNumber: 116,
    name: "6v3 Press til avslutning",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "1 mål", "1 keeper"],
    description: "6 angripere mot 3 forsvarere i boks. Ved 5 pasninger på rad, scorer de. Ved balltap presser forsvarerne, og angriperne kan kontre på mål. Bytter roller etter 3 min.",
    coachingPoints: [
      "Pasninger med tempo",
      "Bevegelse for å holde overtall",
      "Ved balltap: umiddelbar omstilling",
      "Forsvar: kommunikasjon og press"
    ],
    variations: [
      "4 pasninger for scoring",
      "Forsvarere kan kontre på minimål",
      "Tidsbegrensning per angrep"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.40 '6v3 Possession to Finishing'"
  },
  {
    id: "smallsided-117",
    exerciseNumber: 117,
    name: "2v2+4 Støttespillere",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "2v2 i midten av rute, 4 støttespillere på sidene (nøytrale). Laget med ball bruker støttespillerne for overtall. Støttespillere kun 1-touch.",
    coachingPoints: [
      "Utnytt overtallet via støttespillere",
      "Bevegelse for å skape pasningslinje",
      "Støttespillere: god kroppsstilling",
      "Balanse mellom pasning og dribling"
    ],
    variations: [
      "Støttespillere 2-touch",
      "Rotér innover etter x pasninger",
      "Legg til mål på kortsider"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.63 '2v2+4 Support Players'"
  },
  {
    id: "smallsided-118",
    exerciseNumber: 118,
    name: "4v4+4 Progresjon",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester (3 farger)", "Baller"],
    description: "4v4 i midten, 4 nøytrale langs kantene. Start 4v4+4 (8v4 med ball). Etter 5 pasninger bytter nøytrale inn. Konstant rotation og høyt tempo.",
    coachingPoints: [
      "Utnyt overtallet - spill enkelt",
      "Nøytrale: alltid klar for ball",
      "Bytt posisjon med nøytral etter pasning",
      "Høyt tempo - ingen pauser"
    ],
    variations: [
      "3 pasninger for bytte",
      "Nøytrale kan drible inn",
      "Legg til mål for scoring"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.65 '4v4+4 Progression'"
  },

  // Avslutning og shooting
  {
    id: "smallsided-119",
    exerciseNumber: 119,
    name: "9v9 Offside-spill",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 18,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "9v9 på stor bane med offsidelinje i hver halvdel. Fokus på timing av løp og pasninger i bakrom. Realistisk kamptrening med avslutninger.",
    coachingPoints: [
      "Timing på dybdeløp - sjekk linja",
      "Pasning i fart - ikke for tidlig/sent",
      "Forsvarslinje: hold kompakt",
      "Keeper: kommunikasjon med linje"
    ],
    variations: [
      "Kun 2-touch i angrepssone",
      "Scoring etter innlegg gir dobbelt",
      "Maks 20 sek angrep"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.28 '9v9 Offside Shooting'"
  },
  {
    id: "smallsided-120",
    exerciseNumber: 120,
    name: "6v6 med keepere",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6v6 på kompakt bane med fulle mål. Oppmuntrer til mange avslutninger og pressspill. Korte overganger mellom angrep og forsvar.",
    coachingPoints: [
      "Skudd ved første mulighet",
      "Rask omstilling begge veier",
      "Press høyt ved balltap",
      "Keeper: start kontringsangrep"
    ],
    variations: [
      "Mål fra innlegg gir ekstra",
      "Maks 5 pasninger før skudd",
      "Heading teller dobbelt"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.30 '6v6+Goalkeepers'"
  },

  // Innlegg og avslutning
  {
    id: "smallsided-121",
    exerciseNumber: 121,
    name: "4v4 Innleggsspill",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "Innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "4v4 på bane med kantsoner. Spillere kan drible inn i kantsone fritt - da må innlegg slås. Poeng for mål etter innlegg.",
    coachingPoints: [
      "Timing på innlegg - når er medspillere klare?",
      "Bevegelse i boks før innlegget",
      "Kvalitet på innlegget - bakre stolpe",
      "Forsvar: mark tett ved innlegg"
    ],
    variations: [
      "Kun 1-touch i boks",
      "Innlegg fra bakken og luft",
      "Ekstra poeng for heading"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.34 '4v4 Crossing Progression'"
  },
  {
    id: "smallsided-122",
    exerciseNumber: 122,
    name: "7v7 Transferspill",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "7v7 med midtlinje. Ball må spilles over midten til lagkamerat i motstanderens halvdel før angrep. Tvinger lagspill og dybde i laget.",
    coachingPoints: [
      "Hold bredde og dybde",
      "Løp for å motta i rom",
      "Pasning i fart over midten",
      "Balanse mellom angrep og forsvar"
    ],
    variations: [
      "2 spillere må være i hver halvdel",
      "Kun 3-touch i egen halvdel",
      "Kontering gir doble poeng"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.48 '7v7 Transfer Game'"
  },
  {
    id: "smallsided-123",
    exerciseNumber: 123,
    name: "6v6 Endesoner",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "6v6 på bane med endesoner (5m dype). Score ved å drible inn i endesonen med kontroll. Fokus på inntrengninger og gjennombrudd.",
    coachingPoints: [
      "Drible med fart mot sonen",
      "Tidlig støtteløp fra lagkamerater",
      "Forsvar: falle av og forsinke",
      "Overganger: slå kontrene raskt"
    ],
    variations: [
      "Må motta pasning i endesonen",
      "Legg til scoringssone med mål",
      "Kun 2-touch utenfor endesoner"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.50 '6v6 End Zones'"
  },

  // Newcastle United pasningsspill
  {
    id: "smallsided-124",
    exerciseNumber: 124,
    name: "Newcastle 5v3 Rondo",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v3 rondo fra Newcastle United. Spillerne roterer posisjon etter hver pasning (følg pasningen). Holder alle aktive og beveger seg konstant.",
    coachingPoints: [
      "Følg pasningen - bytt plass",
      "Sjekk skulderen før mottak",
      "Pasning i fart - ikke stopp ballen",
      "Forsvar: press i par"
    ],
    variations: [
      "2-touch maks",
      "Spiller som mister bytter ut",
      "Legg til målscoring etter 8 pasninger"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.70 'Newcastle United Passing'"
  },
  {
    id: "smallsided-125",
    exerciseNumber: 125,
    name: "Quick Play & Pressing",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "Pressing",
    equipment: ["Kjegler", "Vester", "Baller", "2 minimål"],
    description: "5v5+2 nøytrale på kompakt bane. Ekstremt høyt tempo med fokus på pressing og rask omstilling. Nøytrale alltid med laget som har ball.",
    coachingPoints: [
      "Press umiddelbart ved balltap",
      "Nøytrale: alltid beveg deg til støtteposisjon",
      "Korte pasninger i høyt tempo",
      "Kroppen klar for neste aksjon"
    ],
    variations: [
      "Kun 2-touch",
      "Mål etter 6 pasninger",
      "Nøytrale roterer inn/ut"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.72 'Quick Play and Pressing'"
  },

  // PSV Eindhoven og Juventus
  {
    id: "smallsided-126",
    exerciseNumber: 126,
    name: "PSV Firkant-spill",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "4v4 i firkant med hjørnespillere (roterende). Ballholdende lag bruker hjørnene som støtte. Ved 6 pasninger byttes lag i midten.",
    coachingPoints: [
      "Bruk hjørnene aktivt",
      "Bevegelse for å motta",
      "Kommunikasjon om bytte",
      "Press: steng hjørnene"
    ],
    variations: [
      "Hjørnespillere 1-touch",
      "Poeng for pasning gjennom laget",
      "Legg til mål"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.58 'PSV Eindhoven Square Play'"
  },
  {
    id: "smallsided-127",
    exerciseNumber: 127,
    name: "Juventus 6v4 Possession",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "6v4 ballbesittelse fra Juventus. Ved 8 pasninger scorer 6-laget. Ved erobring kan 4-laget score på minimål. Høy intensitet begge veier.",
    coachingPoints: [
      "Overtall: hold ballen i bevegelse",
      "Undertall: press i gruppe, steng linjer",
      "Rask omstilling ved erobring",
      "Kommunikasjon konstant"
    ],
    variations: [
      "6 pasninger for poeng",
      "4-laget har tidsfrist på kontra",
      "Rotér spillere mellom lag"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.67 'Juventus 6v4 Possession'"
  },

  // Chelsea og Manchester City
  {
    id: "smallsided-128",
    exerciseNumber: 128,
    name: "Chelsea Boksspill",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 10,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "1 mål", "1 keeper"],
    description: "4v4 i 16-meter med keeper. Fokus på bevegelse i trange rom, kombinasjoner og avslutninger. Høy frekvens på skudd.",
    coachingPoints: [
      "Bevegelse for å skape rom",
      "Korte kombinasjoner",
      "Skudd ved første sjanse",
      "Returer - alltid klar for 2. ball"
    ],
    variations: [
      "Maks 3-touch",
      "Innlegg fra kanter",
      "Tidsbegrensning per angrep"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.24 'Chelsea Box Play'"
  },
  {
    id: "smallsided-129",
    exerciseNumber: 129,
    name: "Man City Possession Square",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 i firkant med mål i hvert hjørne (kjegler). Score ved pasning gjennom mål til lagkamerat. Tvinger lagbytte og scanning.",
    coachingPoints: [
      "Scan konstant - hvor er det åpent?",
      "Beveg deg for å åpne pasningslinje",
      "Bytt angrepspunkt raskt",
      "Forsvaret: les spillet, dekk målene"
    ],
    variations: [
      "Kan ikke bruke samme mål to ganger",
      "2-touch maksimum",
      "Poeng for direkte pasning gjennom"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.60 'Man City Possession Square'"
  },
  {
    id: "smallsided-130",
    exerciseNumber: 130,
    name: "Ajax Posisjonsspill",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v3+2 målspillere. Ballholdende lag holder ball og scorer ved pasning til målspiller. Målspillere bytter med spiller som ga pasning.",
    coachingPoints: [
      "Hold bredde og dybde",
      "Pasning til riktig fot",
      "Målspillere: vis deg, gi pasningslinje",
      "Forsvar: press intensivt"
    ],
    variations: [
      "Målspillere 1-touch retur",
      "Bytter lag ved erobring",
      "Legg til tidsfrist"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.68 'Ajax Positional Play'"
  },

  // ===== FLERE WORLD CLASS COACHING ØVELSER =====
  // Newcastle United
  {
    id: "smallsided-131",
    exerciseNumber: 131,
    name: "Newcastle Pasning med endesoner",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "6v6 med endesoner på hver kortside. Én spiller per lag i hver endesone (umarkert). Ved pasning til medspiller i endesonen bytter de plass - mottaker dribbler inn, passer løper inn i sonen.",
    coachingPoints: [
      "Killer-pasningen går til medspiller, ikke i rommet",
      "Se opp før pasning for bedre presisjon",
      "Kommunikasjon er nøkkelen",
      "Timing på innløp i sonen"
    ],
    variations: [
      "Maks 2-touch",
      "Sonesspiller må spille 1-touch retur",
      "Legg til mål etter sonespill"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.70 'Newcastle Passing #3'"
  },
  {
    id: "smallsided-132",
    exerciseNumber: 132,
    name: "6v6 Partner-marking",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "6v6 ballbesittelse hvor hver spiller velger en partner på motstanderlaget. Du kan KUN takle personen du er matchet med. Tvinger dribling og kreativitet.",
    coachingPoints: [
      "Finn din partner - hold øye med dem",
      "Dribl for å skape pasningsrom",
      "Utnytt at andre ikke kan takle deg",
      "Lag åpninger for lagkamerater"
    ],
    variations: [
      "Bytt partner hvert minutt",
      "Kan tackle to spillere",
      "Legg til mål for scoring"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.71 'Partner Marking Game'"
  },
  {
    id: "smallsided-133",
    exerciseNumber: 133,
    name: "7v7 Midtfirkant",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "7v7 med firkant i midten av banen. Score ved å spille gjennom firkanten til lagkamerat på andre siden. Tvinger pasninger i dybden.",
    coachingPoints: [
      "Spill gjennom midten - ikke rundt",
      "Bevegelse for å motta bak firkanten",
      "Timing på løp og pasning",
      "Press: steng midten"
    ],
    variations: [
      "Dribl gjennom firkanten for poeng",
      "Legg til spiller i firkanten som vegg",
      "Pasning gjennom + scoring = doble poeng"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.72 '7v7 Center Square'"
  },

  // Fitness og intensitet
  {
    id: "smallsided-134",
    exerciseNumber: 134,
    name: "5v5+5 Keep-Away",
    category: "game",
    duration: 12,
    playersMin: 15,
    playersMax: 15,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 i midten med 1-touch. 5 'hvilende' spillere på kantene for 1-touch returpasninger. Lagene roterer regelmessig. Ekstremt høyt tempo.",
    coachingPoints: [
      "1-touch = alltid klar for ball",
      "Bruk kantspillerne aktivt",
      "Bevegelse etter pasning",
      "Kantspillere: god kroppsstilling"
    ],
    variations: [
      "3-sek tidsfrist i stedet for 1-touch",
      "Kantspillere kan bevege seg langs linja",
      "Poeng for 10 pasninger"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.75 '5v5+5 Keep-Away'"
  },
  {
    id: "smallsided-135",
    exerciseNumber: 135,
    name: "3v3+3 Rotasjon",
    category: "game",
    duration: 10,
    playersMin: 9,
    playersMax: 12,
    theme: "Possession",
    equipment: ["Kjegler", "Vester (3 farger)", "Baller"],
    description: "Tre lag à 3-4 spillere. To lag holder ball mot det tredje. Ved balltap bytter laget som mistet til forsvar. Maks 2-touch.",
    coachingPoints: [
      "Første touch bort fra press",
      "Ikke stopp ballen med første touch",
      "Støtt spilleren som mottar",
      "Forsvar: aggressivt press"
    ],
    variations: [
      "Kan ikke spille til spilleren som ga deg ball",
      "Kan ikke spille til egne lagkamerater",
      "1-touch for ekstra utfordring"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.76 '3v3+3'"
  },

  // Målscoring
  {
    id: "smallsided-136",
    exerciseNumber: 136,
    name: "5v5+2 Støttespillere",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 12,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "1 mål", "1 keeper"],
    description: "5v5 med 2 støttespillere på endelinja som angriper. Ved pasning til støttespiller, kan laget avslutte på mål. Ved erobring i motstanderens halvdel kan man skyte direkte.",
    coachingPoints: [
      "Umiddelbart press ved balltap",
      "Støttespillere: sett opp avslutning",
      "Kom raskt i skuddposisjon",
      "Erobring = rask omstilling"
    ],
    variations: [
      "Støttespillere 1-touch",
      "Begge lag kan skyte på mål",
      "Legg til tidsfrist"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.78 '5v5+2 Support'"
  },
  {
    id: "smallsided-137",
    exerciseNumber: 137,
    name: "Progresjonsspill 5v2 til 7v5",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Start 5v2 i liten rute (10x10m). Ved balltap eller ball ut utvides til 7v5 i stor rute (30x30m). Ved gjenerobring starter 5v2 igjen.",
    coachingPoints: [
      "5v2: hold ballen i bevegelse",
      "Ved balltap: rask omstilling til forsvar",
      "7v5: bruk hele rommet",
      "Press intensivt for å tvinge tilbake til 5v2"
    ],
    variations: [
      "6v2 til 8v6",
      "Tidsfrist på 7v5",
      "Poeng for pasninger i 5v2"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.80 'Small-Sided Game Progression'"
  },
  {
    id: "smallsided-138",
    exerciseNumber: 138,
    name: "Multi-mål spill",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler (mange)", "Vester", "Baller"],
    description: "Spill på stor bane med 8 kjegleporter spredt rundt. Poeng ved å spille gjennom port til lagkamerat på andre siden. Kan ikke score i samme port to ganger på rad.",
    coachingPoints: [
      "Scan banen - hvor er det åpent?",
      "Etter scoring: finn ny port raskt",
      "Bytt angrepspunkt",
      "Press: dekk portene"
    ],
    variations: [
      "1-touch eller 2-touch",
      "Dribling gjennom teller også",
      "Legg til tidsfrist per poeng"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.82 'Multiple Goal Possession'"
  },
  {
    id: "smallsided-139",
    exerciseNumber: 139,
    name: "Lagbesittelse med formål",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "Possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "To lag spiller om ball. Score ved: 1) 12 pasninger på rad, eller 2) alle spillere i angrepssonen når mål scores. Tvinger lagarbeid.",
    coachingPoints: [
      "Hold oversikt over pasningsantall",
      "Press opp når dere har ball",
      "Forsvar: press intensivt, avbryt pasningsrekker",
      "Kommunikasjon om posisjonering"
    ],
    variations: [
      "10 pasninger for poeng",
      "Forsvarere må tilbake i egen halvdel - ellers doble poeng",
      "Maks 2-touch"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.84 'Team Possession Game'"
  },

  // Avslutning og shooting
  {
    id: "smallsided-140",
    exerciseNumber: 140,
    name: "Shooting vs Possession",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 16,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "To lag med ulike mål: Lag A holder ball med støttespillere på sidene (poeng for pasninger). Lag B prøver å erobre og score raskt med støttespillere på endelinjer. Bytt roller etter 4 min.",
    coachingPoints: [
      "Lag B: jobb hardt for å vinne ball",
      "Lag B: rask avslutning ved erobring",
      "Lag A: hold ballen så lenge som mulig",
      "Omstilling ved rollebytte"
    ],
    variations: [
      "Lag A kan også score etter x pasninger",
      "Tidsfrist på avslutning for Lag B",
      "Roter støttespillere inn"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.32 'Shooting vs Possession'"
  },
  {
    id: "smallsided-141",
    exerciseNumber: 141,
    name: "2v2+4 med mål",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "2v2 i midten med 4 støttespillere per lag på utsiden (1-touch). Ved scoring roterer spillerne: innerspillere til stolpe, stolpe til kant, kant til bane.",
    coachingPoints: [
      "Støttespillere: sett opp avslutning",
      "Rask avslutning",
      "Følg skuddet for retur",
      "Rotasjon holder alle aktive"
    ],
    variations: [
      "3v3+6",
      "Ingen rotasjon - bytt etter 2 min",
      "Støttespillere 2-touch"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.26 '2v2+4'"
  },
  {
    id: "smallsided-142",
    exerciseNumber: 142,
    name: "Possession til avslutning",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "8v8 holder ball på halv bane. På trenersignal kan laget med ball angripe hvilket som helst mål. Forsvar må reorganisere raskt.",
    coachingPoints: [
      "Ved signal: evaluer raskt hvilket mål",
      "Forsvar: rask omstilling",
      "Hold ball i bevegelse mens dere venter",
      "Keeper: kommuniser med forsvar"
    ],
    variations: [
      "Forsvar starter med ball",
      "Tidsfrist på avslutning",
      "Ved erobring kan forsvar kontre"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.28 'Possession to Finishing'"
  },

  // Innlegg
  {
    id: "smallsided-143",
    exerciseNumber: 143,
    name: "4v4 Innlegg fra hjørner",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "Innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "4v4 + keepere på dobbel 16-meter. Start med keeper som kaster til keeper. Etter 4 pasninger (minst én til keeper) spilles til innleggsspiller i hjørnet. Lag som scorer blir.",
    coachingPoints: [
      "Early press på ball",
      "Dekk mann og bli målside",
      "Keeper: startposisjon i forhold til ball",
      "Angrip ballen ved innlegg"
    ],
    variations: [
      "Innlegg fra bakken eller cutback",
      "Svak-side innlegger kan angripe",
      "Legg til forsvar i hjørnet"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.34 '4v4 Crossing'"
  },
  {
    id: "smallsided-144",
    exerciseNumber: 144,
    name: "Flanke-håndball",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "Innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "Håndballspill hvor ball må kastes til løpende mottaker i kantsonen. Mål teller kun ved heading/volley fra innkast fra kanten. 3 spillere må komme til kjeglene ved 16-meter.",
    coachingPoints: [
      "Løp inn i boksen - ikke stå og vent",
      "Spredning og 'framing' av mål",
      "Kantspiller: serve til løpende spiller",
      "Timing på løp og kast"
    ],
    variations: [
      "Spillere på kjegler kan heade videre",
      "Cutback tillatt",
      "Legg til forsvar på kantene"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.36 'Flank Handball'"
  },
  {
    id: "smallsided-145",
    exerciseNumber: 145,
    name: "Tre soner til mål",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "Innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "8v8 i 3-4-1 formasjon. Midt-sone (25m bred) markert - kun 2-touch der. Tvinger ball ut på kantene for innlegg.",
    coachingPoints: [
      "Midtspillere: kropp klar for å spille ut på kant",
      "Pasning til kantspiller i fart",
      "Overlapping og bytte mellom kant-MB og back",
      "Sentral MF må inn i boks"
    ],
    variations: [
      "1-touch i midtsone",
      "Mål fra innlegg = doble poeng",
      "Legg til fri kantsone"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.38 'Three Zone to Goal'"
  },
  {
    id: "smallsided-146",
    exerciseNumber: 146,
    name: "Magisk boks",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "Innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "8v8 med boks (25x15m) midt på banen. Kan IKKE passe eller drible gjennom boksen. Tvinger spillebytte og kantspill.",
    coachingPoints: [
      "Raske bytter av side",
      "Tidlige baller ut på kant",
      "Sentrale spillere må ut for vinklet pasning",
      "Ikke lange oppbygginger - spill direkte"
    ],
    variations: [
      "Maks 3 pasninger før bytte av side",
      "1-touch utenfor siste tredel",
      "Boksen flyttes til angrepssone"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.40 'Magic Box'"
  },
  {
    id: "smallsided-147",
    exerciseNumber: 147,
    name: "Kantsoner med innlegg",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "Innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6v6 på kompakt bane. Hvert lag har en kantspiller i egen angrepssone. Ball spilles til kantspiller som slår inn. Kantspiller kan serve tidlig (30m) eller nær endeline.",
    coachingPoints: [
      "Organiser løp, kommuniser og 'frame' målet",
      "Kantspiller: aggressiv første touch inn i banen",
      "Varier: cutback, første stolpe, bakre stolpe",
      "Løp mot innlegget - ikke stå"
    ],
    variations: [
      "3 poeng for 1-touch avslutning",
      "Overlapping tillatt ved god 1. touch",
      "Rotér kantspillere"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.42 'Flank Zones'"
  },

  // 7+4v7+4 og større
  {
    id: "smallsided-148",
    exerciseNumber: 148,
    name: "7+4 vs 7+4",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "Avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6 feltspillere + keeper per lag på banen. 4 støttespillere per lag langs sidelinja: 2 på endelinja (angrep) og 2 på sidelinja (angrepssone). Mål: rask fremover og scoring.",
    coachingPoints: [
      "Støttespillere: 1-touch",
      "Hurtig spill fremover",
      "Endeline-spillere: sett opp skudd",
      "Innlegg fra kantspillerne"
    ],
    variations: [
      "Støttespillere 2-touch",
      "Rotér inn/ut hvert 2. minutt",
      "Mål fra innlegg = ekstra poeng"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.74 '7+4v7+4'"
  }
];
