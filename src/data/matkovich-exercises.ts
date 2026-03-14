/**
 * Matkovich Elite Soccer Drills øvelser
 * 
 * Kilde: Michael Matkovich & Jason Davis: "Elite Soccer Drills" (2008)
 * 
 * Kriterier for øvelsene:
 * ✓ Alle spillere aktive hele tiden (ingen køer)
 * ✓ Alle involveres med ball
 * ✓ Høy intensitet og mange ballberøringer
 * ✓ Realistiske spillsituasjoner
 * ✓ Passer for J16-nivå (15-16 år)
 */

import type { ExerciseData } from './exercises';

import { matkovichImageById } from './matkovich-image-map';

const baseMatkovichExercises: ExerciseData[] = [
  // ===== MATKOVICH - ELITE SOCCER DRILLS (8-15 spillere) =====
  {
    id: "smallsided-91",
    exerciseNumber: 91,
    name: "4v4 Firkant med støttespillere",
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 12,
    theme: "possession",
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
    sourceRef: "Matkovich 2008 '57 4v4 Square Possession With Bumpers'"
  },
  {
    id: "smallsided-92",
    exerciseNumber: 92,
    name: "Fire-sone spill",
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 15,
    playersMin: 18,
    playersMax: 18,
    theme: "possession",
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
    sourceRef: "Matkovich 2008 '58 Four-Zone Game'"
  },
  {
    id: "smallsided-94",
    exerciseNumber: 94,
    name: "Vinduer (Windows)",
    tags: ["matkovich-elite-drills-2008"],
    category: "warmup",
    duration: 12,
    playersMin: 16,
    playersMax: 16,
    theme: "possession",
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
    sourceRef: "Matkovich 2008 '41 Windows'"
  },
  {
    id: "smallsided-95",
    exerciseNumber: 95,
    name: "Sikksakk-pasning",
    tags: ["matkovich-elite-drills-2008"],
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 14,
    theme: "possession",
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
    sourceRef: "Matkovich 2008 '42 Angle Passing and Receiving'"
  },
  {
    id: "smallsided-102",
    exerciseNumber: 102,
    name: "4v4 med vinger",
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 12,
    theme: "innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "4v4 på 50x40 meter med en fri kantspiller på hver side i begge angrepshalvdeler. Kantspillere har to touch og ser etter innlegg hver gang de mottar ballen.",
    coachingPoints: [
      "Ha en offensiv innstilling og søk avslutning fra åpent spill",
      "Posisjoner deg slik at innlegg kan angripes",
      "Følg alle avslutninger og returer",
      "Slå drevne innlegg mot nærmeste og løftede innlegg mot bakre stolpe"
    ],
    variations: [
      "La kantspillere drible mot nærmeste stolpe og slå cutback langs bakken",
      "Gi kantspillere fri touch, men la dem først bli aktive etter mottak",
      "Tillat én overlap på utsiden for å skape 2v1"
    ],
    source: "matkovich",
    sourceRef: "Matkovich 2008 '73 4v4 with Wingers'"
  },
  {
    id: "smallsided-107",
    exerciseNumber: 107,
    name: "5v5 + 2 nøytrale",
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 12,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "5v5 i en 30x40-meter grid med to nøytrale spillere. Laget i ballbesittelse spiller alltid 7v5 og forsøker å holde ballen lenge nok til å sette sammen syv pasninger for poeng.",
    coachingPoints: [
      "Gjør banen stor i angrep ved å spre dere",
      "Flytt deg uten ball for å gi støtte",
      "Spill vekk fra press og bruk kort-kort-lang rytme",
      "Kommuniser hele tiden med medspillere og nøytrale"
    ],
    variations: [
      "Begrens alle til to touch, men gi tre touch etter brudd",
      "Begrens alle til ett touch, men gi to touch etter brudd",
      "Juster hvor mange sammenhengende pasninger som gir poeng"
    ],
    source: "matkovich",
    sourceRef: "Matkovich 2008 '55 5v5 (+2) Possession'"
  },
  {
    id: "smallsided-108",
    exerciseNumber: 108,
    name: "Støttespill i trekant",
    tags: ["matkovich-elite-drills-2008"],
    category: "warmup",
    duration: 10,
    playersMin: 3,
    playersMax: 15,
    theme: "possession",
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
    sourceRef: "Matkovich 2008 '40 Groups of Three'"
  },
];

export const matkovichExercises: ExerciseData[] = baseMatkovichExercises.map((exercise): ExerciseData => ({
  ...exercise,
  imageUrl: exercise.imageUrl ?? matkovichImageById[exercise.id],
}));
