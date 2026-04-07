// category = plassering/struktur i økta, ikke faglig øvelsestype.
export type ExerciseCategory = "fixed-warmup" | "warmup" | "aktivisering" | "rondo" | "station" | "game" | "cooldown";
export type ExerciseSource = "egen" | "tiim" | "eggen" | "godfoten" | "dbu" | "rondo" | "hyballa" | "bangsbo" | "dugger" | "drillo" | "prickett" | "101youth" | "seeger" | "matkovich" | "worldclass" | "uefa" | "manc";

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
export type ExerciseType = ExerciseTheme;

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

const normalizeFilterToken = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const isTiimSituationalExercise = (
  exercise: Pick<ExerciseData, "source" | "name" | "sourceUrl" | "tags">
) => {
  if (exercise.source !== "tiim") return false;

  const haystack = [exercise.name, exercise.sourceUrl, ...(exercise.tags ?? [])]
    .filter(Boolean)
    .join(" ");

  return normalizeFilterToken(haystack).includes("situasjonsovelse");
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
  displayName?: string; // Kortere visningsnavn i UI når full tittel er lang
  tags?: string[]; // Tagger for filtrering og gruppering
  category: ExerciseCategory; // Øktdel/struktur: oppvarming, stasjon, spill osv.
  duration: number; // minutes
  playersMin: number;
  playersMax: number;
  theme: TTheme; // Faglig type/fokus: 1v1, angrep, forsvar, innlegg osv.
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
    theme: "koordinasjon",
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
    id: "damelaget",
    exerciseNumber: 3,
    name: "Damelaget",
    category: "rondo",
    duration: 15,
    playersMin: 12,
    playersMax: 15,
    theme: "pasning",
    equipment: ["kjegler", "baller", "vester"],
    description:
      "16-meteren deles i tre like store firkanter på rekke. Spillerne deles i tre lag (A, B, C). Lag A starter med ball i den ene ytterfirkanten, Lag C venter i den andre ytterfirkanten, og Lag B er i midtfirkanten. Lag B sender 1–2 spillere inn i Lag A sin firkant for å presse. Lag A skal holde ballen og fullføre 5 pasninger under press, og deretter spille ballen gjennom eller over midtfirkanten til Lag C på andre siden. Når ballen kommer til Lag C, sender Lag B 1–2 pressere dit i stedet. Lag C må nå holde 5 pasninger og spille tilbake til Lag A. Hvis presslaget (B) vinner ballen, bytter de plass med laget som mistet den.",
    coachingPoints: [
      "Spill med åpen kropp – vær klar til å snu spillet",
      "Presset fra midtlaget må være koordinert: én presser, resten stenger pasningslinjer",
      "Pasning nummer 5 bør gå til spilleren med best posisjon for å slå diagonalt eller langt",
      "Mottakerlaget i andre enden må bevege seg og tilby seg før ballen kommer",
    ],
    variations: [
      "Senk til 3 pasninger for høyere tempo",
      "Øk til 2–3 pressere fra midtlaget for høyere intensitet",
      "Midtlaget scorer poeng ved å vinne ball – laget med færrest balltap etter X minutter vinner",
      "Legg til krav om at ballen må spilles langs bakken gjennom midtfeltet (ikke over)",
      "Pep Guardiola-variant (Bayern München, Doha 2016): 15×45 yards (endesoner 15×10, midtsone 15×25). 3 lag à 6 spillere + 1 joker. 6(+1)v2 i endesonen – fullføre 6–8 pasninger, deretter luftpasning til motsatt lag. 2 fra midtlaget presser i endesonen, resten i midtsonen kan avskjære luftpasningen. Ved balltap: laget som mister bytter med midtlaget. Kontinuerlige overganger med høy intensitet – 2 nye pressere sprinter inn umiddelbart, de andre 4 flytter til midtsonen. Kilde: SoccerTutor, Pep Guardiola Vol. 2, s. 106–107.",
    ],
    imageUrl: "/book-illustrations/pep-vol2-p106-107-three-team-possession-transition.webp",
    source: "egen",
  },
  {
    id: "lanaa-rondo-2v2v2-3v3v3",
    exerciseNumber: 4,
    name: "Lånå - rondo 2v2v2 / 3v3v3",
    category: "rondo",
    duration: 12,
    playersMin: 6,
    playersMax: 18,
    theme: "pasning",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Tre lag spiller rondo i firkant. Del spillerne i tre like lag dersom antallet kan deles på tre, typisk 2v2v2 eller 3v3v3. Ett lag er i lånå og presser, mens de to andre lagene samarbeider om å holde ballen. Hvis antallet ikke går opp, brukes en joker med laget i ballbesittelse for å skape flyt og riktige relasjoner.",
    coachingPoints: [
      "Skap gode vinkler rundt firkanten så ballfører alltid har minst to alternativer",
      "Spill med få touch og vær klar til å flytte ballen bort fra pressretningen",
      "Laget i lånå må presse samlet og styre spillet mot én side",
      "Jokeren må hele tiden justere posisjon for å skape overtall rundt ballen",
    ],
    variations: [
      "Det laget som spiller ballen ut av firkanten er i lånå",
      "Begrens alle til to touch eller ett touch for høyere tempo",
      "Gi poeng etter et bestemt antall sammenhengende pasninger",
      "Spill med én fast joker eller roter jokerrollen ved hvert brudd",
      "Gjør firkanten mindre for hardere press eller større for mer tid i ball",
    ],
    source: "egen",
  },
  {
    id: "guus-hiddink-movement-and-combination-play",
    exerciseNumber: 4,
    name: "Guus Hiddink Movement and combination play",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "pasning",
    equipment: ["baller", "kjegler"],
    description:
      "Pasnings- og bevegelsesmønster der spillerne jobber på to sider samtidig. To spillere går i bevegelse fram i neste rom, og to spillere legger igjen ballen tilbake slik at neste pasning kan spilles til motsatt side. Øvelsen går kontinuerlig med fokus på timing, orientering og presis vekt i kombinasjonsspillet.",
    coachingPoints: [
      "Start bevegelsen tidlig nok til å møte pasningen i fart",
      "Legg igjen med riktig vinkel og fart slik at spillet kan vendes motsatt",
      "Orienter før mottak så neste handling kan tas på få touch",
      "Hold flyt i mønsteret med tydelig kommunikasjon og rollebytte",
    ],
    variations: [
      "Spill på ett touch i legg-igjen-leddet",
      "Bytt retning etter hver tredje eller fjerde sekvens",
      "La én spiller følge pasningen og overta neste posisjon",
      "Avslutt sekvensen med gjennombruddspasning eller innlegg",
    ],
    imageUrl: "/book-illustrations/mine_egne/guus_hiddinck.png",
    source: "egen",
    sourceUrl: "https://youtu.be/KF-o9wi9ZZo?si=MD3XouKTIpLW7tne",
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
    id: "divisjon-2v2",
    exerciseNumber: 39,
    name: "Divisjon 2v2",
    category: "game",
    duration: 15,
    playersMin: 4,
    playersMax: 30,
    theme: "konkurranse",
    equipment: ["baller", "mål", "kjegler", "vester"],
    description:
      "Flere små baner side om side rangert som divisjoner (1. divisjon, 2. divisjon osv.). To mot to på hver bane. Vinnerne rykker opp én divisjon, taperne rykker ned. Ved uavgjort avgjøres det med stein, saks, papir.",
    coachingPoints: [
      "Korte, intense kamper (2–3 minutter per runde)",
      "Oppmuntre til 1v1-dueller og samspill under press",
      "Hold oppe intensiteten – spillerne vil opp i divisjon",
      "Observer hvem som tar ansvar i avgjørende øyeblikk",
    ],
    variations: [
      "Endre til 3v3 for større grupper",
      "Legg til keeper på hver bane",
      "Dobbel opprykk/nedrykk for ekstra spenning",
      "Tidsbegrensning med nedtelling for å øke intensiteten",
    ],
    source: "egen",
    scalable: true,
  },
  {
    id: "utspill-fra-mal-k8-mot-6-7",
    exerciseNumber: 40,
    name: "Utspill fra mål",
    category: "game",
    duration: 16,
    playersMin: 15,
    playersMax: 16,
    theme: "oppbygging",
    equipment: ["baller", "mål", "småmål", "kjegler", "vester"],
    description:
      "Spill med keeper + 8 utespillere mot 6–7 presspillere. Bruk halv bane fra eget mål og opp til midtlinjen. Oppspillslaget starter alltid hos keeper og skal spille seg ut bakfra. Presslaget forsøker å vinne ball og score i det store målet. Oppspillslaget scorer ved å spille inn i ett av tre småmål plassert på midtlinjen, eller ved å føre ball kontrollert over midtlinjen hvis du vil ha en enklere variant. Dutch rule gjelder: hver ny ball settes i gang fra keeper.",
    coachingPoints: [
      "Skap bredde og dybde tidlig så keeper alltid har minst to korte alternativer",
      "Trekk presset til én side før dere spiller ut av press og vender gjennom motsatt rom",
      "Mottakere må stå halvt åpne og være klare til å spille framover på få touch",
      "Ved brudd må presslaget avslutte raskt før oppspillslaget rekker å reorganisere",
    ],
    variations: [
      "Spill K + 8 mot 6 for mer kontroll, eller mot 7 for hardere press",
      "Gi poeng bare hvis oppspillslaget kommer gjennom midtbanen sentralt",
      "Begrens antall touch på backer eller sentrale midtbanespillere",
      "La scoring for oppspillslaget kun telle i småmål, ikke ved føring over linjen",
    ],
    source: "egen",
  },
  {
    id: "offensiv-corner-forste-bakre",
    exerciseNumber: 90,
    name: "Offensiv corner: første og bakre",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 18,
    theme: "dødball",
    equipment: ["baller", "mål", "vester", "kjegler"],
    description:
      "Cornertrening med faste løp mot første stolpe, sentralt rom og bakre stolpe. Én spiller sikrer returrommet utenfor boksen.",
    coachingPoints: [
      "Start løpene sent nok til å angripe fart inn i rommet",
      "Én angriper første stolpe, én angriper keeperrommet, én kommer på bakre",
      "Serven må være tydelig: første sone, sentral sone eller bakre rom",
      "Ha alltid en spiller klar på klarering og andreball",
    ],
    variations: [
      "Slå både innsvinger og utsvinger",
      "Legg inn kort corner før serven kommer",
      "Bytt mellom blokkering og rene løp",
    ],
    source: "egen",
    sourceRef: "Intern dødballpakke - offensiv corner",
  },
  {
    id: "offensivt-frispark-returrom",
    exerciseNumber: 91,
    name: "Offensivt frispark med returrom",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 18,
    theme: "dødball",
    equipment: ["baller", "mål", "vester", "kjegler"],
    description:
      "Frispark fra side- eller mellomrom med fokus på servekvalitet, timede løp i boks og kontroll på andreball etter første klarering.",
    coachingPoints: [
      "Bestem før serven hvem som angriper første, sentral og bakre sone",
      "Returspilleren må lese klareringen tidlig og stå rettvendt",
      "Serven skal ha fart nok til å skape usikkerhet, men være presis nok til at egne kan angripe den",
      "Etter første duell må laget jage neste aksjon umiddelbart",
    ],
    variations: [
      "Kjør både direkte serve og kort variant",
      "Legg inn motstander som kontrer på klarering",
      "Varier avstanden og vinkelen på frisparket",
    ],
    source: "egen",
    sourceRef: "Intern dødballpakke - offensivt frispark",
  },
  {
    id: "andreball-etter-serve",
    exerciseNumber: 92,
    name: "Andreball etter serve",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "dødball",
    equipment: ["baller", "mål", "vester", "kjegler"],
    description:
      "Treningsform der første ball serveres inn i boks eller mellomrom, og poenget er å vinne og avslutte på andreballen rundt feltet.",
    coachingPoints: [
      "Gå i kroppen før første duell slik at motstander mister timing",
      "Spillerne rundt boksen må være i bevegelse før klareringen kommer",
      "Andreball skal angripes framover når mulig, ikke bare dempes ned",
      "Reaksjonen etter første kontakt avgjør om øvelsen blir kamprelevant",
    ],
    variations: [
      "Serve fra corner, frispark eller kast",
      "Poeng kun hvis avslutning kommer innen tre sekunder etter andreball",
      "Spill med overtall eller likt antall i returrommet",
    ],
    source: "egen",
    sourceRef: "Intern dødballpakke - andreball",
  },
  {
    id: "drillo-langpasning-direkte-bakrom",
    exerciseNumber: 93,
    name: "Drillo: langpasning direkte i bakrom",
    category: "station",
    duration: 14,
    playersMin: 8,
    playersMax: 16,
    theme: "oppbygging",
    equipment: ["baller", "kjegler", "vester", "mål"],
    description:
      "Bakre ledd spiller direkte rett eller diagonalt i bakrom. Frontspillere trener motsatte bevegelser og timing på gjennomløp når oppspillet går.",
    coachingPoints: [
      "Slå tidlig når motstander står høyt og bakrommet er åpent",
      "Koordiner møtende og truende løp slik at pasningslinjen og bakrommet åpnes samtidig",
      "Angrip første ball framover med fart, ikke vent på sprett nummer to",
      "Hold laget kompakt bak oppspillet slik at andreball kan vinnes",
    ],
    variations: [
      "Veksle mellom rett og diagonal langpasning",
      "Start med passiv, deretter aktiv forsvarer på bakre ledd",
      "Legg inn krav om avslutning innen seks sekunder etter mottak",
    ],
    imageUrl: "/book-illustrations/drillo/drillo-figur-21-direkte-bakrom.png",
    source: "drillo",
    sourceRef: "Effektiv fotball - Drillo, figur 21",
  },
  {
    id: "drillo-stuss-flikk-ni-er",
    exerciseNumber: 94,
    name: "Drillo: stuss/flikk via 9-er",
    category: "station",
    duration: 14,
    playersMin: 8,
    playersMax: 16,
    theme: "oppbygging",
    equipment: ["baller", "kjegler", "vester", "mål"],
    description:
      "Spill opp på spiss som møter feilvendt og stusser eller flikker direkte inn i bakrommet for medspiller som starter i fart bakfra eller fra siden.",
    coachingPoints: [
      "Oppspilleren må treffe spissen i en høyde og fart som gjør førstetouch-spill mulig",
      "Spissen låser stopper før han slipper ballen videre på én berøring",
      "Bakromsløpet må starte idet oppspillet er på vei, ikke etter stussen",
      "Nærmeste midtbane må følge inn for å eie andreball og neste aksjon",
    ],
    variations: [
      "La spissen velge mellom stuss, flikk eller dempe av til støtte",
      "Bruk en eller to bakromstrusler fra ulike startposisjoner",
      "Avslutt med 3v2 mot mål etter stuss/flikk",
    ],
    imageUrl: "/book-illustrations/drillo/drillo-figur-24-stuss-flikk.png",
    source: "drillo",
    sourceRef: "Effektiv fotball - Drillo, oppspillsvariant figur 24",
  },
  {
    id: "drillo-flo-oppspill",
    exerciseNumber: 95,
    name: "Drillo: Flo-oppspill fra sidekorridor",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 18,
    theme: "oppbygging",
    equipment: ["baller", "kjegler", "vester", "mål"],
    description:
      "Langt oppspill mot kantspiller i sidekorridor som flikker eller header videre inn i bakrommet eller tvers foran forsvarsleddet.",
    coachingPoints: [
      "Treff kantspilleren slik at han kan spille videre på første berøring",
      "Kantspilleren må time frispilling og kroppsstilling før heading eller flikk",
      "Løpene inn bak må komme både foran og bakfra når ballen går ut mot siden",
      "Bakre ledd flytter opp samlet for å holde trykk og kontroll på returrom",
    ],
    variations: [
      "Spill både mot høyt og lavt forsvar med ulik startavstand",
      "Gi poeng for flikk på tvers foran bakre ledd og for gjennombrudd i bakrom",
      "La kantspiller velge mellom flikk, heading ned eller medtak og innlegg",
    ],
    imageUrl: "/book-illustrations/drillo/drillo-figur-25-flo-oppspill.png",
    source: "drillo",
    sourceRef: "Effektiv fotball - Drillo, Flo-oppspillet figur 25",
  },
  {
    id: "drillo-corner-grunnoppstilling",
    exerciseNumber: 96,
    name: "Drillo: corner med fast grunnoppstilling",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 18,
    theme: "dødball",
    equipment: ["baller", "mål", "vester", "kjegler"],
    description:
      "Offensiv corner der laget bruker samme grunnoppstilling hver gang, men varierer mellom nærmeste stolpe, bakre stolpe og stussvariant med faste roller i returrom.",
    coachingPoints: [
      "Behold samme grunnoppstilling slik at alle kjenner rolle og startpunkt",
      "Serven må være presis og tydelig avtalt før ballen slås",
      "Angrip første og andre sone med aggressivitet, men uten at løpene havner i samme korridor",
      "Returspillere må stå rettvendt og klare for ny avslutning eller nytt innlegg",
    ],
    variations: [
      "Innoverskrudd mot nærmeste stolpe",
      "Serve mot bakre stolpe med forstyrrelse i keeperrommet",
      "Stussvariant på første stolpe før resten angriper sentral og bakre sone",
    ],
    imageUrl: "/book-illustrations/drillo/drillo-figur-32-corner-bakre-stolpe.png",
    source: "drillo",
    sourceRef: "Effektiv fotball - Drillo, figur 32",
  },
  {
    id: "drillo-frispark-midtsone-stuss-andreball",
    exerciseNumber: 97,
    name: "Drillo: frispark fra midtsone med stuss og andreball",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 18,
    theme: "dødball",
    equipment: ["baller", "mål", "vester", "kjegler"],
    description:
      "Langt frispark fra midtsone eller egen halvdel inn mot møtende spiller som stusser videre i bakrom, med klare støtteposisjoner rundt andreballen.",
    coachingPoints: [
      "Ta frisparket raskt hvis motstander er ubalansert, ellers bruk innøvd mønster",
      "Møtende spillere må skape riktig vinkel for stuss og flikk mot bakrommet",
      "Bakromsløp skal komme fra begge sider for å strekke det bakre leddet",
      "Støttespillere må være tett nok til å vinne andreball og holde angrepet i live",
    ],
    variations: [
      "La serven gå mot én eller to møtende spillere",
      "Kjør med aktiv offside-linje for å trene timing",
      "Spill videre 5 sekunder etter første klarering for å belønne gjenvinning",
    ],
    imageUrl: "/book-illustrations/drillo/drillo-figur-41-frispark-midtsone.png",
    source: "drillo",
    sourceRef: "Effektiv fotball - Drillo, frispark fra midtsone figur 41",
  },
  {
    id: "egne-innlegg-begge-sider-forste-andre-stolpe",
    exerciseNumber: 98,
    name: "Innlegg fra begge sider med løp på første og andre stolpe",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "innlegg",
    equipment: ["baller", "mål", "vester", "kjegler"],
    description:
      "Innleggstrening fra begge sider annenhver gang. To angripere går i boksen for å angripe første og andre stolpe, mens én forsvarer jobber inne i boksen og forsøker å bryte eller klarere. Roter roller jevnlig slik at flere får slå innlegg, forsvare og avslutte.",
    coachingPoints: [
      "Angrip første og andre stolpe med fart og tydelig rollefordeling",
      "Start løpene sent nok til å møte innlegget, ikke stå og vente i boksen",
      "Innleggslegger må løfte blikket tidlig og variere kvaliteten etter løpene som kommer",
      "Forsvareren må prioritere ballbane, kroppskontakt og klarering bort fra farlig rom",
    ],
    variations: [
      "Legg inn aktiv returspiller utenfor boksen som angriper andreball",
      "Bytt mellom tidlige innlegg og innlegg nær dødlinja",
      "Øk til 3 angripere mot 2 forsvarere når gruppa blir større",
    ],
    source: "egen",
  },
  {
    id: "styrke-generic",
    exerciseNumber: 32,
    name: "Styrke",
    category: "cooldown",
    duration: 10,
    playersMin: 1,
    playersMax: 30,
    theme: "styrke",
    equipment: [],
    description: "Husk høyttaler.",
    coachingPoints: [],
    variations: [],
  },
  {
    id: "cup-4-lag-2-baner",
    exerciseNumber: 996,
    name: "Cup med 4 lag. 2 baner.",
    category: "game",
    duration: 20,
    playersMin: 8,
    playersMax: 24,
    theme: "spill",
    equipment: ["baller", "mål", "vester", "kjegler"],
    description:
      "Cupspill med 4 lag fordelt på 2 baner. Spill korte kamper samtidig, og la vinnere og tapere møtes videre etter oppsettet dere ønsker.",
    coachingPoints: [
      "Ha klare bytter og rask oppstart mellom kampene på begge baner",
      "Bruk vanlige spillregler og tydelig kampstruktur",
      "Hold høy intensitet i korte kamper og få lagene raskt videre til neste oppgjør",
    ],
    variations: [
      "Vinnere møtes på bane 1 og tapere møtes på bane 2 i neste runde",
      "Spill semifinaler og finale med avsluttende finalekamp",
      "La kampene vare 3–5 minutter for høyt tempo og mange repetisjoner",
    ],
    source: "egen",
  },
  {
    id: "cup-4-lag-vanlig-spill",
    exerciseNumber: 998,
    name: "Cup - 4 lag. Vanlig spill.",
    category: "game",
    duration: 20,
    playersMin: 8,
    playersMax: 24,
    theme: "spill",
    equipment: ["baller", "mål", "vester", "kjegler"],
    description:
      "Cupspill med 4 lag og vanlige regler. Korte kamper der vinnerne går videre og neste oppgjør settes raskt i gang.",
    coachingPoints: [
      "Få laget raskt i posisjon når ny kamp starter",
      "Oppmuntre til høyt tempo og tydelige roller i hvert lag",
      "Bruk kampene til å forsterke vanlige spillprinsipper i begge retninger",
    ],
    variations: [
      "Spill semifinaler og finale",
      "Kjør alle-mot-alle med tabell hvis dere vil ha flere kamper",
      "La taperlag ha korte oppgaver mellom kampene før de går inn igjen",
    ],
    source: "egen",
  },
  {
    id: "skudd-generic",
    exerciseNumber: 49,
    name: "Skudd",
    category: "cooldown",
    duration: 10,
    playersMin: 2,
    playersMax: 30,
    theme: "avslutning",
    equipment: ["baller", "mål"],
    description:
      "Velg selv. F.eks. tredjemannsløp, volley, frispark, 2v1, innlegg til 2 angripere/1 forsvarer (eller 3v2), avslutning etter veggspill, avslutning etter innlegg fra kant, avslutning etter cutback og returløp/andreballer.",
    coachingPoints: [],
    variations: [],
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
    id: "evaluering-teambuilding",
    exerciseNumber: 48,
    name: "Evaluering og lagbygging",
    category: "cooldown",
    duration: 10,
    playersMin: 8,
    playersMax: 30,
    theme: "utvikling",
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

const SOCCERTUTOR_TACTICS_MANAGER_CREDIT = /\s*Diagram laget med SoccerTutor\.com Tactics Manager\./g;

const normalizeExerciseDescription = (description: string): string =>
  description.replace(SOCCERTUTOR_TACTICS_MANAGER_CREDIT, "").trim();

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
  description: normalizeExerciseDescription(exercise.description),
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
// Importer ManC-øvelser (Manchester City Academy / Pep-metodikk)
import { mancExercises } from './manc-exercises';
// Importer ManC Attacking Positional Patterns of Play (egen fil)
import { mancAttackingPositionalExercises } from './manc-attacking-positional-exercises';

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
  ...mancExercises,
  ...mancAttackingPositionalExercises,
];

export const allExercises: Exercise[] = allExerciseData.map(normalizeExercise);
