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

export const matkovichExercises: ExerciseData[] = [
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
    sourceRef: "Matkovich s.120 'Drill 57: 4v4 Square Possession With Bumpers'"
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
    sourceRef: "Matkovich s.122 'Drill 58: Four-Zone Game'"
  },
  {
    id: "smallsided-93",
    exerciseNumber: 93,
    name: "Trelagsspill (Keepaway)",
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 15,
    theme: "possession",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
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
    sourceRef: "Matkovich s.82 'Drill 41: Windows'"
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
    sourceRef: "Matkovich s.84 'Drill 42: Angle Passing and Receiving'"
  },
  {
    id: "smallsided-96",
    exerciseNumber: 96,
    name: "5v3 Possession med mål",
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "possession",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "possession",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "gjennombrudd",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "pressing",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "overgang",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "gjennombrudd",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "gjennombrudd",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "avslutning",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "avslutning",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "oppbygging",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 12,
    theme: "possession",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "overgang",
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
    sourceRef: "Matkovich s.80 'Drill 40: Groups of Three'"
  },
  {
    id: "smallsided-109",
    exerciseNumber: 109,
    name: "Sirkelspill med 8",
    tags: ["matkovich-elite-drills-2008"],
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "possession",
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
    tags: ["matkovich-elite-drills-2008"],
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "possession",
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
];
