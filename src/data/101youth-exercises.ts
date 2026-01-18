/**
 * 101 Youth Football Coaching Sessions øvelser
 * 
 * Kilde: Tony Charles & Stuart Rook: "101 Youth Football Coaching Sessions" (2013)
 * ISBN: 978-1408192245
 * 
 * Smålagsspill fra kapittel om Small-Sided Games
 */

import type { ExerciseData } from './exercises';

export const youthExercises: ExerciseData[] = [
  // ===== 101 YOUTH FOOTBALL (kap. Small-Sided Games) =====
  {
    id: "smallsided-20",
    exerciseNumber: 277,
    name: "Bingo (Pasningsjakt)",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "possession",
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
    sourceRef: "101 Youth session 71 (s.71) 'Bingo'"
  },
  {
    id: "smallsided-21",
    exerciseNumber: 280,
    name: "Tag Team",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 15,
    theme: "possession",
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
    sourceRef: "101 Youth session 72 (s.72) 'Tag Team'"
  },
  {
    id: "smallsided-22",
    exerciseNumber: 283,
    name: "Fargepass",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 20,
    theme: "possession",
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
    sourceRef: "101 Youth session 73 (s.73) 'Keep Ball Colours'"
  },
  {
    id: "smallsided-23",
    exerciseNumber: 284,
    name: "Hold to baller",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "possession",
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
    sourceRef: "101 Youth session 74 (s.74) 'Keep Two Balls'"
  },
  {
    id: "smallsided-24",
    exerciseNumber: 285,
    name: "Overtall med støtte",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 18,
    theme: "possession",
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
    sourceRef: "101 Youth session 75 (s.75) 'Overload'"
  },
  {
    id: "smallsided-25",
    exerciseNumber: 287,
    name: "Retningsspill",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 18,
    theme: "gjennombrudd",
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
    sourceRef: "101 Youth session 76 (s.76) 'Directional Play'"
  },
  {
    id: "smallsided-26",
    exerciseNumber: 288,
    name: "Gjennom portene",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 16,
    theme: "gjennombrudd",
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
    sourceRef: "101 Youth session 77 (s.77) 'Through The Gates'"
  },
  {
    id: "smallsided-27",
    exerciseNumber: 27,
    name: "Fire hjørner",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "gjennombrudd",
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
    sourceRef: "101 Youth session 78 (s.78) 'Four Corners'"
  },
  {
    id: "smallsided-28",
    exerciseNumber: 289,
    name: "Målball (Target Ball)",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "gjennombrudd",
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
    sourceRef: "101 Youth session 79 (s.79) 'Target Ball'"
  },
  {
    id: "smallsided-29",
    exerciseNumber: 292,
    name: "Portjakt (Gate Crasher)",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "possession",
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
    sourceRef: "101 Youth session 80 (s.80) 'Gate Crasher'"
  },
  {
    id: "smallsided-30",
    exerciseNumber: 295,
    name: "Ørkenøy",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "avslutning",
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
    sourceRef: "101 Youth session 81 (s.81) 'Desert Island Discs'"
  },
  {
    id: "smallsided-31",
    exerciseNumber: 299,
    name: "Støttespillere på sidene",
    tags: ["101-youth-football-coaching-2013"],
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "possession",
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
    sourceRef: "101 Youth session 82 (s.82) 'Support Play'"
  },
  {
    id: "smallsided-32",
    exerciseNumber: 303,
    name: "Wembley Way",
    tags: ["101-youth-football-coaching-2013"],
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
    sourceRef: "101 Youth session 83 (s.83) 'Wembley Way'"
  },
];
