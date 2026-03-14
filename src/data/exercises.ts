export type ExerciseCategory = "fixed-warmup" | "warmup" | "aktivisering" | "rondo" | "station" | "game" | "cooldown";
export type ExerciseSource = "egen" | "tiim" | "eggen" | "godfoten" | "dbu" | "rondo" | "hyballa" | "bangsbo" | "dugger" | "prickett" | "101youth" | "seeger" | "matkovich" | "worldclass" | "uefa";

export const EXERCISE_THEMES = [
  "1v1",
  "angrep",
  "avslutning",
  "ballkontroll",
  "bevegelse",
  "bevegelighet",
  "dribling",
  "dødball",
  "evaluering",
  "finter",
  "forsvar",
  "gjennombrudd",
  "heading",
  "hurtighet",
  "innlegg",
  "kantspill",
  "konkurranse",
  "kontring",
  "keeper",
  "koordinasjon",
  "lek",
  "mental",
  "mobilitet",
  "omstilling",
  "oppbygging",
  "oppvarming",
  "overgang",
  "overlapp",
  "pasning",
  "possession",
  "pressing",
  "restitusjon",
  "rondo",
  "smålagsspill",
  "spill",
  "styrke",
  "teknikk",
  "utvikling",
  "vendingsspill",
] as const;

export type ExerciseTheme = typeof EXERCISE_THEMES[number];

const EXERCISE_THEME_SET = new Set<string>(EXERCISE_THEMES);

export const isExerciseTheme = (value: string): value is ExerciseTheme =>
  EXERCISE_THEME_SET.has(value);

const THEME_ALIASES: Record<string, ExerciseTheme> = {
  avslutninger: "avslutning",
  overganger: "overgang",
  press: "pressing",
  passing: "pasning",
};

export const normalizeTheme = (value: string): ExerciseTheme => {
  const normalized = value.trim().toLowerCase();
  const mapped = THEME_ALIASES[normalized] ?? normalized;
  if (isExerciseTheme(mapped)) return mapped;
  throw new Error(`Ukjent theme-verdi: "${value}" (normalisert: "${mapped}")`);
};

const normalizeCategory = (category: ExerciseCategory): ExerciseCategory => {
  // Historisk kategori i UI: slått sammen til warmup
  if (category === "aktivisering") return "warmup";
  return category;
};

type ExerciseFields<TTheme extends string> = {
  id: string;
  exerciseNumber: number; // Unikt nummer innen kategorien
  name: string;
  tags?: string[]; // Tagger for filtrering og gruppering
  category: ExerciseCategory;
  duration: number; // minutes
  playersMin: number;
  playersMax: number;
  theme: TTheme;
  equipment: string[];
  description: string;
  coachingPoints: string[];
  variations: string[];
  alwaysIncluded?: boolean;
  scalable?: boolean; // true = kan kjøres i parallell med mange grupper (f.eks. 1v1, 2v2)
  imageUrl?: string; // URL til bilde/diagram av øvelsen
  svgDiagram?: string; // Inline SVG markup for diagram (import/paste)
  source?: ExerciseSource; // Kilde: egen eller tiim
  sourceUrl?: string; // Lenke til original øvelse
  sourceRef?: string; // Referanse til bok/side (vises ikke i utskrift)
};

export type ExerciseData = ExerciseFields<string>;
export type Exercise = ExerciseFields<ExerciseTheme>;

// Hjelpefunksjon for å få formatert øvelseskode med kategori-prefiks
export const getExerciseCode = (
  exercise: Pick<ExerciseData, "category" | "exerciseNumber">
): string => {
  const prefixMap: Record<ExerciseCategory, string> = {
    "fixed-warmup": "F",
    warmup: "O",
    aktivisering: "AK",
    rondo: "R",
    station: "S",
    game: "K",
    cooldown: "A",
  };
  const prefix = prefixMap[exercise.category] || "?";
  const number = exercise.exerciseNumber ?? 0;
  return `${prefix}${number}`;
};

export const exercises: ExerciseData[] = [
  {
    id: "skadefri-oppvarming",
    exerciseNumber: 1,
    name: "Skadefri oppvarming",
    category: "fixed-warmup",
    duration: 5,
    playersMin: 1,
    playersMax: 40,
    theme: "oppvarming",
    equipment: [],
    description: "",
    coachingPoints: [],
    variations: [],
    alwaysIncluded: true,
  },
  {
    id: "rondo-5v2",
    exerciseNumber: 2,
    name: "Rondo 5v2",
    category: "rondo",
    duration: 10,
    playersMin: 7,
    playersMax: 16,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Rondo i kvadrat, korte touch, fokus på vinkler og støtte.",
    coachingPoints: [
      "Åpne kropp mot neste pasning",
      "Kommuniser bytte av press",
    ],
    variations: ["Begrens antall touch", "Legg inn ekstra press-spiller"],
  },
  {
    id: "tverrligger",
    exerciseNumber: 36,
    name: "Tverrligger",
    category: "game",
    duration: 10,
    playersMin: 4,
    playersMax: 25,
    theme: "konkurranse",
    equipment: ["baller", "mål"],
    description:
      "Spillerne skyter på tverrliggeren fra en avtalt avstand. Poeng for treff. Kan spilles individuelt eller i lag.",
    coachingPoints: ["Sikting og teknikk", "Riktig skuddkraft"],
    variations: ["Varierende avstander", "Begge fot", "Frimerke (treffe bestemt del)"],
  },
  {
    id: "straffekonkurranse",
    exerciseNumber: 37,
    name: "Straffekonkurranse",
    category: "game",
    duration: 10,
    playersMin: 6,
    playersMax: 25,
    theme: "konkurranse",
    equipment: ["baller", "mål"],
    description:
      "Klassisk straffekonkurranse. Kan kjøres som turnering eller lag mot lag. Tren på å prestere under press.",
    coachingPoints: ["Bestem deg tidlig", "Hold roen", "Fokus på teknikk, ikke kraft"],
    variations: ["Sudden death", "Keeper-konkurranse parallelt", "Tidsbegrensning per straffe"],
  },
  {
    id: "nettsus",
    exerciseNumber: 38,
    name: "Nettsus",
    category: "game",
    duration: 8,
    playersMin: 4,
    playersMax: 20,
    theme: "konkurranse",
    equipment: ["baller", "mål"],
    description:
      "Skyt ballen slik at den treffer innsiden av nettet og 'susser' langs nettveggen. Poeng for beste sus/lyd.",
    coachingPoints: ["Plassering i hjørnet", "Riktig kraft og vinkel"],
    variations: ["Kun svak fot", "Fra ulike vinkler", "Med motstand fra keeper"],
  },
  {
    id: "planken",
    exerciseNumber: 33,
    name: "Planken",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "styrke",
    equipment: [],
    description:
      "Statisk kjerneøvelse der spillerne holder plankestilling i intervaller. Fokus på god teknikk og rett rygg.",
    coachingPoints: [
      "Hold hoften på linje med kroppen",
      "Stram mage og sete",
      "Pust rolig gjennom hele øvelsen",
    ],
    variations: [
      "Sideplank",
      "Plank med veksling av bein",
      "Lag konkurranse på hvem holder lengst",
    ],
  },
  {
    id: "armheving",
    exerciseNumber: 34,
    name: "Armheving",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "styrke",
    equipment: [],
    description:
      "Klassisk armhevingsøvelse for overkroppsstyrke. Tilpass nivå med knær i bakken for nybegynnere.",
    coachingPoints: [
      "Hold kroppen rett som en planke",
      "Albuene 45 grader fra kroppen",
      "Senk deg kontrollert ned",
    ],
    variations: [
      "Armheving på knær",
      "Diamant-armheving for triceps",
      "Lag pyramide: 5-10-15-10-5 reps",
    ],
  },
  {
    id: "burpees",
    exerciseNumber: 35,
    name: "Burpees",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "styrke",
    equipment: [],
    description:
      "Helkroppsøvelse som kombinerer armheving og hopp. Høy intensitet for å avslutte treningen.",
    coachingPoints: [
      "Eksploder kraftig opp i hoppet",
      "Lande mykt med bøyde knær",
      "Hold tempo gjennom hele serien",
    ],
    variations: [
      "Uten hopp for lavere intensitet",
      "Med klapp over hodet i hoppet",
      "30 sek arbeid, 30 sek pause x 4 runder",
    ],
  },
  {
    id: "knebøy",
    exerciseNumber: 36,
    name: "Knebøy",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "styrke",
    equipment: [],
    description:
      "Beinstyrke gjennom dype knebøy. Fokus på full bevegelsesutslag og kontroll.",
    coachingPoints: [
      "Knær følger tærne",
      "Vekt på hælene",
      "Bryst opp og se fremover",
    ],
    variations: [
      "Enbeins knebøy (pistol squat)",
      "Hoppende knebøy (jump squats)",
      "Bulgarsk knebøy med bak fot løftet",
    ],
  },
  {
    id: "utfall",
    exerciseNumber: 37,
    name: "Utfall",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "styrke",
    equipment: [],
    description:
      "Ensidig beinstyrke med utfall fremover eller på stedet. Bygger balanse og stabilitet.",
    coachingPoints: [
      "Bakre kne nesten i bakken",
      "Fremre kne over ankel",
      "Hold overkroppen oppreist",
    ],
    variations: [
      "Gående utfall over banen",
      "Hoppende utfall",
      "Sidelengs utfall for hoftemobilitet",
    ],
  },
  {
    id: "ab-workout",
    exerciseNumber: 38,
    name: "Magekjernen",
    category: "cooldown",
    duration: 6,
    playersMin: 1,
    playersMax: 30,
    theme: "styrke",
    equipment: [],
    description:
      "Kjernestyrke-sirkuit med sit-ups, sykkelbevegelse og beinhev. Roter gjennom øvelsene.",
    coachingPoints: [
      "Press korsryggen mot bakken",
      "Kontrollert bevegelse",
      "Pust ut ved anstrengelse",
    ],
    variations: [
      "30 sek per øvelse, 3 runder",
      "Legg til Russian twist",
      "Partner holder føttene for sit-ups",
    ],
  },
  {
    id: "stretch-lar",
    exerciseNumber: 39,
    name: "Tøyning lår",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "bevegelighet",
    equipment: [],
    description:
      "Statisk tøyning av lårets fremside (quadriceps) og bakside (hamstrings). Hold hver stilling i 20-30 sekunder.",
    coachingPoints: [
      "Tøy til du kjenner et lett ubehag, ikke smerte",
      "Hold stillingen rolig uten å vippe",
      "Pust rolig og dypt",
    ],
    variations: [
      "Liggende hamstring stretch",
      "Stående quad stretch med støtte",
      "Partnertøyning for dypere stretch",
    ],
  },
  {
    id: "stretch-legger",
    exerciseNumber: 40,
    name: "Tøyning legger",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "bevegelighet",
    equipment: [],
    description:
      "Tøyning av leggmuskulatur (gastrocnemius og soleus). Viktig for å forebygge cramper og skader.",
    coachingPoints: [
      "Hold hæl i bakken",
      "Strekk bakre bein helt",
      "Lene deg fremover mot vegg",
    ],
    variations: [
      "Stående leggstretch mot vegg",
      "Trapp-stretch for akillessenen",
      "Sittende tå-trekk med håndkle",
    ],
  },
  {
    id: "stretch-lysk",
    exerciseNumber: 41,
    name: "Tøyning lysk",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "bevegelighet",
    equipment: [],
    description:
      "Tøyning av lyske og hoftemuskulatur. Viktig område for fotballspillere som ofte er stram.",
    coachingPoints: [
      "Sitt med rett rygg",
      "Press knærne forsiktig ned",
      "Ikke vipp frem og tilbake",
    ],
    variations: [
      "Sommerfugl-stretch (butterfly)",
      "Lungestretch for hofteflexor",
      "Pigeon pose fra yoga",
    ],
  },
  {
    id: "stretch-helkropp",
    exerciseNumber: 42,
    name: "Helkropps-stretch",
    category: "cooldown",
    duration: 8,
    playersMin: 1,
    playersMax: 30,
    theme: "bevegelighet",
    equipment: [],
    description:
      "Komplett tøyerutine som går gjennom alle store muskelgrupper. Ideell avslutning på treningen.",
    coachingPoints: [
      "Roter systematisk gjennom kroppen",
      "Hold hver posisjon 20-30 sekunder",
      "Avslutt med dype åndedrag",
    ],
    variations: [
      "Legg til yoga-elementer",
      "Partnertøyning i par",
      "Fokuser på problemområder",
    ],
  },
  {
    id: "mobility-circuit",
    exerciseNumber: 43,
    name: "Mobilitets-sirkuit",
    category: "cooldown",
    duration: 6,
    playersMin: 1,
    playersMax: 30,
    theme: "bevegelighet",
    equipment: [],
    description:
      "Dynamisk mobilitet gjennom hofter, ankler og skuldre. Fokus på bevegelseskvalitet.",
    coachingPoints: [
      "Kontrollerte bevegelser gjennom full range",
      "Hold god kroppsholdning",
      "Gradvis øk bevegelsesutslaget",
    ],
    variations: [
      "90/90 hip stretch",
      "Ankle circles og dorsifleksjon",
      "World's greatest stretch",
    ],
  },
  {
    id: "foam-rolling",
    exerciseNumber: 44,
    name: "Foam rolling",
    category: "cooldown",
    duration: 6,
    playersMin: 1,
    playersMax: 30,
    theme: "bevegelighet",
    equipment: ["foam roller"],
    description:
      "Selvmassasje med foam roller for restitusjon. Fokus på IT-bånd, quads, hamstrings og legger.",
    coachingPoints: [
      "Rull sakte over muskulaturen",
      "Stopp på ømme punkter i 20-30 sek",
      "Unngå direkte på ledd og ben",
    ],
    variations: [
      "Bruk tennisball på mindre områder",
      "Dobbel foam roller for ryggen",
      "Partner-assistert rolling",
    ],
  },
  {
    id: "evaluering-kort",
    exerciseNumber: 45,
    name: "Rask evaluering",
    category: "cooldown",
    duration: 5,
    playersMin: 1,
    playersMax: 30,
    theme: "evaluering",
    equipment: [],
    description:
      "Kort evalueringsrunde der spillere og trenere deler umiddelbare tanker om økten. Fokus på læring.",
    coachingPoints: [
      "Gi rom for ærlige tilbakemeldinger",
      "Spør åpne spørsmål",
      "Oppsummer nøkkelpunkter",
    ],
    variations: [
      "Tommel opp/ned/midt på intensitet",
      "Hva lærte du i dag?",
      "En ting å ta med til neste trening",
    ],
  },
  {
    id: "evaluering-detaljert",
    exerciseNumber: 46,
    name: "Grundig evaluering",
    category: "cooldown",
    duration: 10,
    playersMin: 1,
    playersMax: 30,
    theme: "evaluering",
    equipment: [],
    description:
      "Strukturert gjennomgang av treningsøkten med fokus på hva som fungerte og hva som kan forbedres.",
    coachingPoints: [
      "La spillerne snakke først",
      "Noter ned tilbakemeldinger",
      "Knytt tilbake til treningsmål",
    ],
    variations: [
      "Små grupper diskuterer før plenum",
      "Anonyme tilbakemeldinger på lapp",
      "Video-gjennomgang av situasjoner",
    ],
  },
  {
    id: "evaluering-spillere",
    exerciseNumber: 47,
    name: "Spillerevaluering",
    category: "cooldown",
    duration: 8,
    playersMin: 5,
    playersMax: 30,
    theme: "evaluering",
    equipment: [],
    description:
      "Spillerne diskuterer treninga i grupper og presenterer synspunkter. Trener lytter og noterer.",
    coachingPoints: [
      "Unngå å forsvare øvelsesvalg",
      "Still oppfølgingsspørsmål",
      "Verdsett spillernes innsikt",
    ],
    variations: [
      "Hva gjorde vi bra? Hva kan forbedres?",
      "Skala 1-10 på ulike elementer",
      "Hvordan føltes intensiteten?",
    ],
  },
  {
    id: "evaluering-teambuilding",
    exerciseNumber: 48,
    name: "Evaluering og lagbygging",
    category: "cooldown",
    duration: 10,
    playersMin: 8,
    playersMax: 30,
    theme: "evaluering",
    equipment: [],
    description:
      "Kombinerer evaluering med lagbyggende elementer. Spillere roser hverandres innsats og deler læring.",
    coachingPoints: [
      "Skap trygg atmosfære for deling",
      "Fremhev positiv atferd",
      "Koble til lagverdier",
    ],
    variations: [
      "Ros-runde: hver spiller fremhever en annen",
      "Hvem viste best holdning i dag?",
      "Hvilke lagverdier så vi i praksis?",
    ],
  },
];

const normalizeStringArray = (items: string[] | undefined): string[] =>
  (items ?? []).map((item) => item.trim()).filter(Boolean);

import { bangsboImageById } from './bangsbo-image-map';
import { worldclassImageById } from './worldclass-image-map';

const inferBookImageUrl = (exercise: ExerciseData): string | undefined => {
  if (exercise.imageUrl) return exercise.imageUrl;
  if (exercise.source === "bangsbo") {
    return bangsboImageById[exercise.id];
  }
  if (exercise.source === "worldclass") {
    return worldclassImageById[exercise.id];
  }
  return undefined;
};

const normalizeExercise = (exercise: ExerciseData): Exercise => ({
  ...exercise,
  imageUrl: inferBookImageUrl(exercise),
  theme: normalizeTheme(exercise.theme),
  category: normalizeCategory(exercise.category),
  equipment: normalizeStringArray(exercise.equipment),
  coachingPoints: normalizeStringArray(exercise.coachingPoints),
  variations: normalizeStringArray(exercise.variations),
});

// Importer tiim-øvelser
import { tiimExercises } from './tiim-exercises';
// Importer Eggen-øvelser
import { eggenExercises } from './eggen-exercises';
// Importer DBU-øvelser
import { dbuExercises } from './dbu-exercises';
// Importer Rondo-øvelser fra DiBernardo
import { dibernardoExercises } from './dibernardo-exercises';
// Importer øvrige rondo-øvelser
import { rondoExercises } from './rondo-exercises';
// Importer Hyballa-øvelser
import { hyballaExercises } from './hyballa-exercises';
// Importer Bangsbo-øvelser (Forsvar)
import { bangsboExercises } from './bangsbo-exercises';
// Importer Dugger-øvelser (World Class Defense)
import { duggerExercises } from './dugger-exercises';
// Importer Matkovich-øvelser
import { matkovichExercises } from './matkovich-exercises';
// Importer 101 Youth-øvelser
import { youthExercises } from './101youth-exercises';
// Importer WorldClass-øvelser
import { worldclassExercises } from './worldclass-exercises';
// Importer Seeger-øvelser
import { seegerExercises } from './seeger';
// Importer UEFA-øvelser (fra UEFA A-analyser)
import { uefaExercises } from './uefa-exercises';

// Kombiner alle øvelseskilder
const allExerciseData: ExerciseData[] = [
  ...exercises,
  ...tiimExercises,
  ...eggenExercises,
  ...dbuExercises,
  ...dibernardoExercises,
  ...rondoExercises,
  ...hyballaExercises,
  ...bangsboExercises,
  ...duggerExercises,
  // Smålagsspill per kilde (egne filer)
  ...matkovichExercises,
  ...youthExercises,
  ...worldclassExercises,
  ...seegerExercises,
  ...uefaExercises,
];

export const allExercises: Exercise[] = allExerciseData.map(normalizeExercise);
