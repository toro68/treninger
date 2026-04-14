/**
 * Seeger: kilde + øvelser.
 *
 * Kildebok i repo:
 * - treninger/docs/books/seeger-soccer-games-compendium-2017.txt
 *
 * NB: Seeger-øvelsene var tidligere definert i `smallsided-exercises.ts`.
 */

import { Exercise } from "./exercises";

import { seegerImageById } from './seeger-image-map';

export const SEEGER_SOURCE = {
  id: "seeger-soccer-games-compendium-2017",
  title: "The Soccer Games and Drills Compendium",
  author: "Seeger",
  year: 2017,
  localTextPath: "treninger/docs/books/seeger-soccer-games-compendium-2017.txt",
} as const;

const baseSeegerExercises: Exercise[] = [
  // ===== SEEGER - KAOS OG OVERGANGER =====
  {
    id: "smallsided-33",
    exerciseNumber: 304,
    name: "Fra 1v1 til 3v2",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 15,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description:
      "Starter 1v1. Ved ballvinning kommer 2 inn = 3v1. Så kommer 1 til = 3v2. Eskalering.",
    coachingPoints: [
      "1v1: Mot og ferdighet",
      "Overtall: Ikke stress",
      "Forsvar: Forsink",
      "Kommunikasjon",
    ],
    variations: [
      "Tidsbegrensning per fase",
      "Ulike startposisjoner",
      "Legg til keeper",
    ],
    source: "seeger",
    sourceRef: "Seeger 1.7.2 (s.99) 'From 1-on-1 to 3-on-2'",
  },
  {
    id: "smallsided-34",
    exerciseNumber: 307,
    name: "Fra 2v1 til 3v2",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 15,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description:
      "Starter 2v1. Ved ballvinning kommer flere inn. Kontinuerlig eskalering begge veier.",
    coachingPoints: [
      "2v1: Utnytt overtall",
      "Forsvarer: Forsink",
      "Les situasjonen",
      "Timing på innløp",
    ],
    variations: [
      "Start fra ulike sider",
      "Legg til mål",
      "Tidsbegrensning",
    ],
    source: "seeger",
    sourceRef: "Seeger 1.7.3 (s.100) 'From 2-on-1 to 3-on-2'",
  },
  {
    id: "smallsided-35",
    exerciseNumber: 310,
    name: "Kaos 1v1",
    category: "game",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "1v1",
    equipment: ["Kjegler", "Vester", "Baller", "4 mål"],
    description:
      "Flere 1v1-situasjoner samtidig på samme bane. Kaos og konsentrasjon.",
    coachingPoints: [
      "Fokus på din duell",
      "Unngå andre",
      "Raske avgjørelser",
      "Romforståelse",
    ],
    variations: [
      "Ulike måltyper",
      "Tidsbegrensning",
      "Vinnerturneringer",
    ],
    source: "seeger",
    sourceRef: "Seeger 1.7.5 (s.102) 'Chaos 1-on-1'",
  },
  {
    id: "smallsided-36",
    exerciseNumber: 311,
    name: "Kaos 3v3 på 6 mål",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "6 små mål"],
    description:
      "3v3 med 6 mål spredt. Begge kan score i alle. Konstant årvåkenhet.",
    coachingPoints: [
      "Hold hodet oppe",
      "Raske vendinger",
      "Kommunikasjon",
      "Markeringer",
    ],
    variations: [
      "Ulike poeng per mål",
      "Ikke samme 2x",
      "Legg til jokere",
    ],
    source: "seeger",
    sourceRef: "Seeger 1.7.6 (s.103) 'Chaos 3-on-3 (on 6 goals)'",
  },
  {
    id: "smallsided-37",
    exerciseNumber: 312,
    name: "Kaos 3v3 på 3 mål",
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "3 mål"],
    description:
      "3v3 med 3 mål i trekant. Alle kan score i alle mål. Krever 360° oppmerksomhet.",
    coachingPoints: [
      "Constant scanning",
      "Rask omstilling",
      "Dekke flere mål",
      "Angrepspunkt-bytte",
    ],
    variations: ["Roter mål-verdi", "Tidspress", "4v4"],
    source: "seeger",
    sourceRef: "Seeger 1.7.7 (s.104) 'Chaos 3-on-3 (on 3 goals)'",
  },
  {
    id: "smallsided-38",
    exerciseNumber: 313,
    name: "Rask 2v2",
    category: "game",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "1v1",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description:
      "Korte, intense 2v2-runder. Vinneren blir, taperen byttes. Høy intensitet.",
    coachingPoints: [
      "Samarbeid i 2v2",
      "Raske avgjørelser",
      "Kondisjon og vilje",
      "Lær av hvert tap",
    ],
    variations: [
      "1 min runder",
      "Vinner scorer 2x for å vinne",
      "Legg til nøytral",
    ],
    source: "seeger",
    sourceRef: "Seeger 1.7.8 (s.105) 'Fast 2-on-2'",
  },
  {
    id: "smallsided-39",
    exerciseNumber: 314,
    name: "4v4 Ballhånd",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "smålagsspill",
    equipment: ["Kjegler", "Vester", "Baller"],
    description:
      "4v4 der ballen kastes og fanges i stedet for sparkes. Fokus på bevegelse og rom.",
    coachingPoints: [
      "Samme bevegelser som fotball",
      "Rom og vinkler",
      "Kommunikasjon",
      "Forsvarsposisjonering",
    ],
    variations: [
      "Score ved å fange i sone",
      "Begrenset antall kast",
      "Blanding hånd/fot",
    ],
    source: "seeger",
    sourceRef: "Seeger 1.7.9 (s.106) '4-on-4 (ball in hand)'",
  },
  {
    id: "smallsided-40",
    exerciseNumber: 320,
    name: "Måljakt",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 20,
    theme: "avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "Mål"],
    description:
      "Turnering der flest mål totalt (ikke seire) avgjør. Oppmuntrer til offensivt spill.",
    coachingPoints: [
      "Angrep!",
      "Risiko vs belønning",
      "Avslutt når du kan",
      "Målscoring fokus",
    ],
    variations: [
      "Mål i siste min teller dobbelt",
      "Langskudd = ekstra poeng",
      "Heading = bonus",
    ],
    source: "seeger",
    sourceRef: "Seeger 1.8.5 (s.113) 'Tournament (goal hunt)'",
  },
  {
    id: "smallsided-48",
    exerciseNumber: 48,
    name: "Pasningssirkel med 6er",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 12,
    theme: "pasning",
    equipment: ["Kjegler", "Baller"],
    description:
      "Sirkel med spiller i midten (6er-posisjon). Ball inn til 6er, legg av, rotér.",
    coachingPoints: [
      "6er: Sjekk skuldre, åpen kropp",
      "Pasningskvalitet inn",
      "Avlegget: Riktig fot",
      "Tempo i rotasjonen",
    ],
    variations: [
      "To i midten",
      "Mottak + snu + pasning",
      "Legg til press",
    ],
    source: "seeger",
    sourceRef: "Seeger 2.2.10 (s.159) 'Passing circle (6er behavior)'",
  },
  // ===== SEEGER - SPILLEBANER =====
  {
    id: "smallsided-49",
    exerciseNumber: 1026,
    name: "Vertikal bane i midten",
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 16,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description:
      "Ekstra smal sone i midten gir bonuspoeng for gjennomspill der. Trener sentralt spill.",
    coachingPoints: [
      "Finn midten!",
      "Bevegelse inn/ut av sonen",
      "Pasningskvalitet gjennom",
      "Forsvar: Steng midten",
    ],
    variations: ["Kun pasning gjennom", "Dribling = ekstra", "Bytt bredde på sonen"],
    source: "seeger",
    sourceRef: "Seeger 1.8.7 (s.115) 'Playing field (vertical field in the center)'",
  },
  {
    id: "smallsided-50",
    exerciseNumber: 50,
    name: "Byttespill",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 18,
    theme: "vendingsspill",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description:
      "Bane delt i to halvdeler med ulike regler. F.eks. fri på ene, 2-touch på andre.",
    coachingPoints: [
      "Tilpass til sonen",
      "Bytt rytme",
      "Les spillet annerledes",
      "Fleksibilitet",
    ],
    variations: [
      "Bytt regler underveis",
      "Kun score fra én halvdel",
      "Nøytrale i én sone",
    ],
    source: "seeger",
    sourceRef: "Seeger 1.8.9 (s.117) 'Playing field (switching play)'",
  },
];

export const seegerExercises: Exercise[] = baseSeegerExercises.map((exercise): Exercise => ({
  ...exercise,
  imageUrl: exercise.imageUrl ?? seegerImageById[exercise.id],
}));
