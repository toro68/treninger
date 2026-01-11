// Øvelser fra Hyballa & te Poel: German Soccer Passing Drills
// Kilde: Peter Hyballa & Hans-Dieter te Poel - "German Soccer Passing Drills: More than 100 Drills from the Pros" (2015)

import type { ExerciseData } from './exercises';

export const hyballaExercises: ExerciseData[] = [
  // === LOB PASS ØVELSER ===
  {
    id: "hyballa-lob-1",
    exerciseNumber: 398,
    name: "Lob Pass i Femkant",
    category: "station",
    duration: 12,
    playersMin: 5,
    playersMax: 10,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Fem kjegler i 30x20m felt. Spiller passer til motstående spiller som lar ballen gå tilbake, første spiller lobber over andre til tredje spiller 15m unna. Tredje spiller spiller direkte til fjerde, som lobber til femte.",
    coachingPoints: [
      "Krev kroppsspenning fra alle spillere",
      "Krev tofot-lobbing",
      "Ballen må lobbes hardt og presist for å initiere nytt spill"
    ],
    variations: [
      "Bare lob med spesifikk fot",
      "Øk avstandene og lob mot hodet",
      "Sett opp to pasningsgrid ved siden av hverandre - hvem er raskest?"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-lob-2",
    exerciseNumber: 401,
    name: "Lob Pass med Posisjonsbytte",
    category: "station",
    duration: 12,
    playersMin: 5,
    playersMax: 10,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Som Lob Pass i Femkant, men spillerne bytter posisjon med motspiller etter lob-pasningen. Etter lob spilles all ball direkte.",
    coachingPoints: [
      "Krev 'Spill og løp!'",
      "Etter lob må alle orientere seg mot nytt rom",
      "Ikke legg for mye skru på lob-pasningen"
    ],
    variations: [
      "Øk avstandene - spiller må utføre flere lob etter hverandre",
      "Legg til mål med keeper, avslutt etter lob"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-lob-3",
    exerciseNumber: 404,
    name: "Lob Pass eller 1v1",
    category: "station",
    duration: 15,
    playersMin: 5,
    playersMax: 10,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Spiller som lar ballen gå tilbake blir umiddelbart forsvarsspiller. Ballmottaker velger om han vil gå 1v1 eller bruke lob-pass. Hver spiller som bruker lob blir neste forsvarer.",
    coachingPoints: [
      "Ta raske beslutninger",
      "Les forsvarerens posisjon",
      "Bruk lob når forsvarer kommer tett på"
    ],
    variations: [
      "Øk press fra forsvarer",
      "Legg til tidsbegrensning på valg"
    ],
    source: "hyballa"
  },

  // === TRIANGLE PASS ØVELSER ===
  {
    id: "hyballa-triangle-1",
    exerciseNumber: 474,
    name: "Trekantpasninger i Sekskant",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Seks kjegler i trekantformasjoner med 8m avstand. Spillerne holder ballen i konstant bevegelse i ulike trekantformasjoner. Ingen tverrpasninger tillatt - ballen kan kun spilles via tredjemann.",
    coachingPoints: [
      "Før ballmottak må spiller bestemme hvor ballen skal",
      "Vend presist før neste pasning",
      "Fokus på rask og presis pasningsteknikk"
    ],
    variations: [
      "Kun ett-touch",
      "Ett eller to touch",
      "Ballen kan spilles tilbake, men må deretter åpnes til annen side"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-triangle-2",
    exerciseNumber: 408,
    name: "Grid med 7 Spillere - Sentral Vending",
    category: "station",
    duration: 15,
    playersMin: 7,
    playersMax: 14,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Som trekant-grid med ekstra kjegle og spiller i sentrum. Sentrale spillere mottar og spiller videre, eller vender ut for å akselerere spillet. Øves med to baller.",
    coachingPoints: [
      "De to sentrale spillerne må vende ut",
      "To baller kan ikke være i samme trekanthalvdel samtidig",
      "Reduser ballhastighet ved kaos"
    ],
    variations: [
      "Øv med én ball og bestemte pasnings-/løpebaner",
      "Trekantpasninger med posisjonsbytte",
      "Trener bestemmer tempo: langsom Tiqui-Taca eller raske åpningspasninger"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-triangle-3",
    exerciseNumber: 6,
    name: "6v4 med Obligatoriske Trekantpasninger",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål"],
    description: "6v4 på to store mål med keepere, 55x30m bane. Laget i overtall kan kun spille til tredjemann - ballen kan ikke returneres dit den kom fra. Laget i undertall spiller fritt.",
    coachingPoints: [
      "Spillerne må se plassering i bredde og dybde",
      "Husk også å se over hele banens bredde"
    ],
    variations: [
      "Høy vanskelighetsgrad: Fire spillere kan også kun spille trekant",
      "Seks spillere begrenses til ett-to touch",
      "Returpasning til keeper tillatt"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-triangle-4",
    exerciseNumber: 248,
    name: "8v4 med Ett-Touch og Trekantpasninger",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 16,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål"],
    description: "8v4 der åtte spillere spiller med bare ett touch. Ballen kan ikke returneres til samme spiller - resulterer i åpningsspill. Fire spillere spiller fritt. La ballen gjøre jobben!",
    coachingPoints: [
      "La ballen gjøre jobben",
      "Hold åpent spillbilde",
      "Rask ballsirkulasjon"
    ],
    variations: [
      "Legg til tidsbegrensning",
      "Roter roller etter mål"
    ],
    source: "hyballa"
  },

  // === SWITCH PASS (SIDESKIFTE) ØVELSER ===
  {
    id: "hyballa-switch-1",
    exerciseNumber: 418,
    name: "Sideskifte i Bredt Grid",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 8,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Fire spillere, åtte kjegler - fire kjegler 40m fra hverandre, to sett à 2 kjegler sentralt ca 10m fra hverandre. Spiller i sirkel passer kort til motspiller som lar ballen gå diagonalt i løpsbanen, deretter sideskifte-pass til venstre/høyre side.",
    coachingPoints: [
      "Veggpasninger fra korte pasninger må være presise for å forberede sideskifte",
      "Skarp ett-touch sideskifte; spill med begge føtter",
      "Sideskifte bør spilles skarpt, med fart og lite skru"
    ],
    variations: [
      "Sideskifte mellom sentrale og sidekjegler",
      "Sideskifte med to touch - kontroll og pasning",
      "Sideskifte aksepteres av spiller som går 1v1 mot lagkamerat"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-switch-2",
    exerciseNumber: 421,
    name: "Grid med Fire - Vending Ut",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 8,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Spiller mottar pasning, vender umiddelbart ut og spiller sideskifte til andre siden. Neste spiller tar imot på høyre eller venstre og lar ballen gå tilbake til partner som vender ut. Posisjonsbytte mellom parene etter hvert sideskifte.",
    coachingPoints: [
      "Forbered sideskifte med presis ut-vending",
      "Bruk begge føtter for å ta imot og spille sideskifte",
      "Hold tempoet oppe under vending og sideskifte"
    ],
    variations: [
      "Ballen alltid i luften (perfeksjonere teknikk)",
      "Først vende ut, så 1v1 mot partner før sideskifte",
      "Etter vending, kortpasning til lagkamerat som spiller dyp før sideskifte"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-switch-3",
    exerciseNumber: 254,
    name: "7v7 med Obligatoriske Sideskifter",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål", "vester"],
    description: "7v7 på to store mål på halv bane. To 20m brede vingsonene langs sidene. Når ball spilles inn i vingsonen må den umiddelbart spilles til motsatt vingsone med sideskifte. Deretter normalt spill.",
    coachingPoints: [
      "Fot på ball spiller sideskifte umiddelbart",
      "Spiller uten ball må umiddelbart frigjøre seg i motsatt vingsone",
      "Spill kun inn i vingsonen når spillsituasjonen tillater det"
    ],
    variations: [
      "Ingen angrep inne i vingsonen",
      "Mål teller kun hvis minst ett sideskifte er utført",
      "Spillere tillates kun ett-to touch totalt"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-switch-4",
    exerciseNumber: 257,
    name: "6v6 + 4 Veggspillere med Sideskifte",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 20,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål", "vester"],
    description: "6v6 på to store mål med keepere, 55x35m bane. Fire nøytrale spillere opererer i vingsonene utenfor banen. Nøytrale samarbeider med ballbesittende lag. Når nøytral mottar pass må de spille sideskifte til spillere i motsatt vingsone.",
    coachingPoints: [
      "Spill høyfarts sideskifte for presist og raskt sideskifte",
      "Utfør situasjonstilpasset sideskifte for raskere målsjanse",
      "Bruk sideskifte som overraskelseselement når rommet blir trangt"
    ],
    variations: [
      "Etter sideskifte dribler mottaker fra vingsonen inn på banen - 7v6",
      "Etter sideskifte må umiddelbart innlegg spilles foran mål",
      "Ingen nøytrale - én spiller fra hvert lag opererer i vingsone"
    ],
    source: "hyballa"
  },

  // === WALL PASS (VEGGPASNING) ØVELSER ===
  {
    id: "hyballa-wall-1",
    exerciseNumber: 12,
    name: "5v5 + 4 med Veggspill og Avslutning",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål"],
    description: "5v5 på to store mål med keepere, 45x30m bane. Fire nøytrale veggspillere bak målene. På banen kun ett-to touch. Nøytrale spiller med ett touch og kan kun la ballen gå tilbake til sender.",
    coachingPoints: [
      "Etter pasning må spiller utføre spesifikk løpsbane for veggspill",
      "Veggspiller må være i mottaksposisjon",
      "Hvis situasjonen ikke tillater veggspill, må veggspiller avbryte og gjenåpne spillet"
    ],
    variations: [
      "Fritt spill",
      "Nøytrale kan også plasseres langs sidelinjen",
      "Avslutning må komme umiddelbart etter veggspill"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-wall-2",
    exerciseNumber: 13,
    name: "6v6 med Veggspillere på Sidene",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 20,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål", "vester"],
    description: "6v6 på to store mål med keepere, 60x40m bane. Fire nøytrale langs begge sidelinjer fungerer som veggspillere. Veggspill gir 5 bonuspoeng. Vellykket veggspill med tredjemann gir 2 bonuspoeng.",
    coachingPoints: [
      "Visuell persepsjon bør være dyp OG bred - bruk hele 180-graders synsvinkel",
      "Veggspillere kan også spille høy veggpasning",
      "Alle spillere bør risikere feilaktige veggspill (pasnings-mentalitet)"
    ],
    variations: [
      "Legg til to nøytrale ved hvert mål for dypere ball",
      "Marker banen lengre og smalere",
      "Speed-veggspill: kun 8 sekunder til avslutning"
    ],
    source: "hyballa"
  },

  // === ANGLED PASS (VINKLET PASNING) ØVELSER ===
  {
    id: "hyballa-angled-1",
    exerciseNumber: 429,
    name: "Grid 3:3:3 - Vinklede Pasninger",
    category: "station",
    duration: 12,
    playersMin: 9,
    playersMax: 18,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Tre kjegler vertikalt og horisontalt i tre rader. 10 spillere totalt - ytterspillere i midtradene har ball. Baller kan kun spilles i bestemte vinkler, konstant i bevegelse. Trener og spillere bestemmer pasningsvinkler sammen.",
    coachingPoints: [
      "Stopp ballen midlertidig ved for mye pasningskaos",
      "Hake opp og se rundt! (180-graders bevegelsespersepsjon)",
      "Raske og skarpe returpasninger"
    ],
    variations: [
      "Pasning med to baller",
      "Pasning med én ball",
      "Utfør kroppsfinteetter hver pasning"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-angled-2",
    exerciseNumber: 264,
    name: "8v8 på Tre Store Mål",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 20,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål"],
    description: "8v8 på tre store mål med keepere på halv bane. Fritt spill men kun vinklede pasninger tillatt. Tverrpasning gir motstander straffespark. Ett lag spiller på begge store mål, det andre på ett mål.",
    coachingPoints: [
      "Først gå dypt, så bredt!",
      "Spillere uten ball er konstant i bevegelse - ut av skyggen",
      "6er og 10er bør ofte posisjonere seg bak motstander"
    ],
    variations: [
      "Spill med kun ett-to touch",
      "Lag som spiller på to mål må avslutte innen 8 sekunder",
      "Alltid spill fremover (pasnings-mentalitet)"
    ],
    source: "hyballa"
  },

  // === ONE-TOUCH PASS ØVELSER ===
  {
    id: "hyballa-onetouch-1",
    exerciseNumber: 436,
    name: "Ett-Touch i Firkanter",
    category: "station",
    duration: 15,
    playersMin: 16,
    playersMax: 24,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "I 30x30m firkant, marker en 15x15m firkant inni. Åtte spillere i hver firkant (to ved hver kjegle). Spillere som står overfor hverandre er gruppe med ball. Diagonale, flate pasninger - ett-touch obligatorisk i indre firkant.",
    coachingPoints: [
      "Hold øynene åpne og vær konstant i bevegelse",
      "Coach hverandre med bestemte kodeord",
      "Tim pasninger og løpsbaner; legg følelse i ballen"
    ],
    variations: [
      "Tillat ett-to touch basert på situasjon",
      "Krev bruk av begge føtter",
      "Legg til ulike baller (stor/liten, tung/lett)"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-onetouch-2",
    exerciseNumber: 17,
    name: "Direkte Treff - Ett-Touch Minispill",
    category: "game",
    duration: 15,
    playersMin: 16,
    playersMax: 20,
    theme: "pasning",
    equipment: ["kjegler", "småmål", "baller", "vester"],
    description: "8v8 i 40x40m firkant. Ett småmål på hver sidelinje. 8m forbudssone foran hvert mål. Ett-touch pasninger. Hvert lag forsvarer to diagonalt motstående mål. Mål må scores direkte utenfra sonene.",
    coachingPoints: [
      "Skarp pasning",
      "Pasningsspiller blir alltid neste mottaker",
      "Mot for den risikable touchen!"
    ],
    variations: [
      "Marker småmål med fargede vester - bytt retning på kommando",
      "Legg til flere mål"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-onetouch-3",
    exerciseNumber: 18,
    name: "9v9 med Ett-Touch Soner",
    category: "game",
    duration: 20,
    playersMin: 18,
    playersMax: 22,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål", "vester"],
    description: "9v9 på halv bane med to store mål og keepere. Fire 7x7m ett-touch soner markeres - to sentrale er offensive soner. Fritt spill i taktisk formasjon. Hvis ball spilles inn i ett-touch sone, kan kun ett touch brukes der.",
    coachingPoints: [
      "Ved oppbygging velg trygg og skarp pasningsspill ut av ett-touch sonen",
      "Ild og risikovilje i de offensive ett-touch sonene",
      "Pasningsspiller blir umiddelbart mottaker"
    ],
    variations: [
      "Minsk/øk størrelsen på ett-touch soner",
      "Ett-touch kun i midtsonen: 25x30m sone i midten",
      "Treners favoritter: Kun 2-3 spillere får spille ett-touch"
    ],
    source: "hyballa"
  },

  // === TIQUI-TACA / RONDO ØVELSER ===
  {
    id: "hyballa-rondo-1",
    exerciseNumber: 480,
    name: "Rondo 8v2 - Mottak og Pasning",
    category: "rondo",
    duration: 10,
    playersMin: 10,
    playersMax: 12,
    theme: "ballkontroll",
    equipment: ["kjegler", "baller"],
    description: "8 spillere i sirkel, 2 i midten. Fokus på mottak og pasning. Regel 1: Ett-to touch. Regel 2: Posisjonsbytte ved tapt ball. Regel 3: Veksle spillefot (venstre/høyre).",
    coachingPoints: [
      "Ballkontroll",
      "Push-pass (pasningsteknikk)",
      "Ta raske beslutninger",
      "Ta hensyn til forsvarernes posisjon"
    ],
    variations: [
      "Samme fot to ganger på rad",
      "Tre obligatoriske touch, fritt fotvalg"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-rondo-2",
    exerciseNumber: 205,
    name: "Rondo med Ballhastighet",
    category: "rondo",
    duration: 10,
    playersMin: 10,
    playersMax: 12,
    theme: "ballkontroll",
    equipment: ["kjegler", "baller"],
    description: "8v2 Rondo med fokus på ballhastighet. Velg hastighet slik at forsvarer kommer for sent romlig og tidsmessig.",
    coachingPoints: [
      "Ta riktig beslutning!",
      "Velg ballhastighet som gjør forsvarer sen",
      "Hold ballen i bevegelse"
    ],
    variations: [
      "Øk/minsk avstand mellom spillere",
      "Legg til tidsbegrensning"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-rondo-3",
    exerciseNumber: 206,
    name: "Rondo med Åpent Rom og Lang Pasning",
    category: "rondo",
    duration: 10,
    playersMin: 10,
    playersMax: 12,
    theme: "ballkontroll",
    equipment: ["kjegler", "baller"],
    description: "8v2 Rondo der forsvarere må bli i midten når: a) Lang pasning er spilt mellom to forsvarere, b) Ball spilt gjennom sentrum 2-3 ganger, c) Ball passert rundt hele runden, d) Ball passert 6-8 ganger uten tapt ball.",
    coachingPoints: [
      "Masse rom og tid for angrepsspillet vårt!",
      "Bruk lang pasning for å skape åpning",
      "Kombiner korte og lange pasninger"
    ],
    variations: [
      "Øv B og C sammen for høyere nivå"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-rondo-4",
    exerciseNumber: 207,
    name: "Rondo 9v3 med Defensive Trekanter",
    category: "rondo",
    duration: 12,
    playersMin: 12,
    playersMax: 15,
    theme: "ballkontroll",
    equipment: ["kjegler", "baller", "vester"],
    description: "9v3 Rondo i sirkel eller firkant. Tre forsvarere må danne defensive trekanter, kroker og forflytning. Dette gjør lange fremoverpasninger vanskeligere - angripere må tilpasse med Tiqui-Taca.",
    coachingPoints: [
      "Forsvarere: Defensive trekanter, ballorientert spill",
      "Angripere: Rask ett-touch for å bryte presset",
      "Korte pasninger til fot og i løpsbane"
    ],
    variations: [
      "Øk/minsk feltets størrelse",
      "Endre tidsintervaller",
      "Legg til posisjonsbytte etter gitte pasningssekvenser"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-rondo-5",
    exerciseNumber: 208,
    name: "Rondo med Kommunikasjonsformer",
    category: "rondo",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "ballkontroll",
    equipment: ["kjegler", "baller"],
    description: "8v2 Rondo med fokus på kommunikasjon med og uten ball. To touch - kontroller rondoen med første touch. Bruk ballhastighet som kommunikasjonsmiddel.",
    coachingPoints: [
      "Se deg rundt og coach hverandre!",
      "Bruk ballhastighet som kommunikasjon",
      "Lang ball mellom forsvarere betyr 'lite tid' til forsvarer, 'mye rom' til angriper",
      "Ballen holder seg i bevegelse så forsvarere ikke kan hvile",
      "Langsom ball som agn: Forsvarer nærmer seg, så lang pasning"
    ],
    variations: [
      "Treg pasning som agn - forsvarer nærmer seg, så rask pasning",
      "Verbal og ikke-verbal kommunikasjon påkrevd"
    ],
    source: "hyballa"
  },

  // === PASSING INTO SPACE (DYBDEPASNING) ØVELSER ===
  {
    id: "hyballa-space-1",
    exerciseNumber: 447,
    name: "Ball i Rom - Løp i Rom",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 16,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Grid med fire kjegler og åtte spillere. Spiller passer diagonalt i rommet. Diagonal motspiller starter først etter ball er spilt og jager den. Mottaker lar ballen gå i kort, åpent rom til motspiller som spiller lang dybdepasning bak.",
    coachingPoints: [
      "Spiller må reagere raskt på ballen",
      "Spillere må konstant ha øye på sine rom",
      "Følg ballen med øynene!"
    ],
    variations: [
      "Øk avstander",
      "Spill ofte veggpasning til lagkameratens fot",
      "Sett opp to grid som kan kobles med sideskifte"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-space-2",
    exerciseNumber: 286,
    name: "Følge Ballen",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 16,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål", "vester"],
    description: "6v6 på to store mål med keepere, 50x40m bane. 20m bred sone markeres i midten. Spillere kan kun spurte inn i endsonene (mørke områder) etter ball er spilt. Ballbesitter tvinger spiller uten ball til å starte i rom.",
    coachingPoints: [
      "Be om mange flate pasninger gjennom sømmer",
      "Ballen bør spilles slik at den kan følges",
      "Ved motstanderens mottak, bytt umiddelbart til motpress"
    ],
    variations: [
      "Øk/minsk banemål",
      "7v5: Undertallslaget kan også passe til fot - utfordrer overtallslaget til pressing",
      "Etter å følge ballen, enten skudd eller søk 1v1"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-space-3",
    exerciseNumber: 26,
    name: "Dybdepasning med Chip-baller",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 20,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål"],
    description: "8v8 på to store mål med keepere på halv stor bane. Som 'Følge Ballen' men ballene må nå chippes. Se etter vingene spesielt når motstanderne er ballorienterte.",
    coachingPoints: [
      "Ball må chippes fra midten av midtsonen",
      "Velg alternativ: Spill sideskifte i åpent rom",
      "Regel: Start løpet etter ball er spilt - angriper har alltid fordel!"
    ],
    variations: [
      "Spillere kan holde ball i hånden og spille som volley i rom",
      "Spill på tre-fjerdedeler av stor bane for lengre rom-pasninger",
      "Spiller uten ball bestemmer når ball skal i rom"
    ],
    source: "hyballa"
  },

  // === GIVE-AND-GO (DOBBELTPASNING) ØVELSER ===
  {
    id: "hyballa-giveandgo-1",
    exerciseNumber: 457,
    name: "Dobbeltpasning til Mål",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 16,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål"],
    description: "Spillere i to rekker. Spiller 1 passer til Spiller 2, løper forbi, mottar returpass og avslutter på mål. Fokus på timing, presisjon og rask bevegelse etter første pasning.",
    coachingPoints: [
      "Spill og løp! - akselerér etter første pasning",
      "Returpass i løpsbanen, ikke i beina",
      "Presis avslutning etter dobbeltpasning"
    ],
    variations: [
      "Legg til forsvarer som starter passivt",
      "Varier startposisjon og vinkel",
      "To-touch maks på mottaker"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-giveandgo-2",
    exerciseNumber: 28,
    name: "6v4 + 2 med Dobbeltpasning og Finish",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 16,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål", "vester"],
    description: "6v4 på to store mål med keepere. To nøytrale bak hvert mål. Laget i overtall må avslutte via dobbeltpasning med nøytral. Dobbeltpasning som assister gir bonuspoeng.",
    coachingPoints: [
      "Timing på dobbeltpasning kritisk",
      "Nøytrale må være klare for rask vegg",
      "Løp i rommet bak forsvarslinjen"
    ],
    variations: [
      "Nøytrale på sidelinjen istedenfor bak mål",
      "Begge lag må bruke dobbeltpasning",
      "Tidsbegrensning på angrep"
    ],
    source: "hyballa"
  },

  // === VOLLEY PASS ØVELSER ===
  {
    id: "hyballa-volley-1",
    exerciseNumber: 463,
    name: "Volley-pasning i Trekant",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Tre spillere i trekant, 8-10m avstand. Spiller kaster ball til neste som spiller volley videre til tredje. Rotasjon etter 10 vellykkede serier.",
    coachingPoints: [
      "Hold kroppen over ballen",
      "Ankel låst ved kontakt",
      "Følg gjennom mot målet"
    ],
    variations: [
      "Kun venstre/høyre fot",
      "Øk avstandene",
      "Legg til bevegelse - mottaker starter løp før mottak"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-volley-2",
    exerciseNumber: 30,
    name: "Bryst-pasning Kombinasjon",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "pasning",
    equipment: ["kjegler", "baller"],
    description: "Spillere i to rekker mot hverandre, 10m avstand. Ball kastes til brystet, brystes ned og spilles flatt tilbake, deretter kastes til neste i motsatt rekke.",
    coachingPoints: [
      "Myk landing på brystet - 'pust ut' ved kontakt",
      "Kontroller ned til god spilleposisjon",
      "Rask og presis returpasning"
    ],
    variations: [
      "Bryst direkte til volley tilbake",
      "Legg til bevegelse fremover etter pasning",
      "Konkurranse mellom grupper"
    ],
    source: "hyballa"
  },

  // === KILLER PASS ØVELSER ===
  {
    id: "hyballa-killer-1",
    exerciseNumber: 297,
    name: "Gjennombruddspasning i 4v3",
    category: "game",
    duration: 15,
    playersMin: 7,
    playersMax: 14,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål"],
    description: "4v3 på ett mål med keeper. Angripende lag må finne gjennombruddspasning bak forsvarslinjen. Fokus på timing og presisjon for å sette medspiller alene med keeper.",
    coachingPoints: [
      "Se etter hull mellom forsvarere",
      "Timing - spill når mottaker starter løp",
      "Våg å prøve - gjennombruddspasning krever mot"
    ],
    variations: [
      "3v3 + 1 joker",
      "Tidsbegrensning på angrep (8 sek)",
      "Mål etter gjennombruddspasning teller dobbelt"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-killer-2",
    exerciseNumber: 301,
    name: "8v6 med Gjennombrudds-soner",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål", "vester"],
    description: "8v6 på to store mål med keepere. To 'gjennombruddssoner' (10m dype) foran hvert mål. Ball kan kun entres i sonen via gjennombruddspasning - ikke dribbling.",
    coachingPoints: [
      "Tålmodig oppspill for å skape åpning",
      "Løp i dybden for å motta gjennombruddspasning",
      "Gjennombruddspasning gjennom sømmer"
    ],
    variations: [
      "7v7 med balanse",
      "Kun ett touch i gjennombruddssonen",
      "Mål etter gjennombrudd teller dobbelt"
    ],
    source: "hyballa"
  },

  // === THROW-IN PASS (INNKAST) ØVELSER ===
  {
    id: "hyballa-throwin-1",
    exerciseNumber: 33,
    name: "Innkast-trekant med Startsaksjon",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "pasning",
    equipment: ["baller"],
    description: "Tre spillere mot hverandre. Innkaster veksler mellom å kaste til de to lagkameratene. Mottaker holder ballen i luften og spiller til neste som tar nytt innkast.",
    coachingPoints: [
      "Kast noen til hodet, noen til føttene",
      "Legg kraft bak ballen!",
      "Varier avstandene basert på treningsfokus"
    ],
    variations: [
      "Innkast kun rettet mot hodet",
      "Innkast kun rettet mot føttene",
      "Legg til stort mål for avslutning"
    ],
    source: "hyballa"
  },
  {
    id: "hyballa-throwin-2",
    exerciseNumber: 305,
    name: "8v8 med Taktisk Innkast",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 20,
    theme: "pasning",
    equipment: ["kjegler", "baller", "mål", "vester"],
    description: "8v8 på to store mål med keepere, 60x30m bane. Én nøytral på hver sidelinje. Når ball går ut bak mål eller i touch, tar nøytral umiddelbart innkast fra vingposisjon. Høyre sidelinje kun korte, venstre kun lange innkast.",
    coachingPoints: [
      "Hold deg i bevegelse og reager på ballen!",
      "Ved lange innkast vær klar for duell - kroppsspenning og mentalitet!",
      "Ved korte innkast vær klar for kombinasjon: gap, vinkel, skygge, mellom linjene"
    ],
    variations: [
      "9v9 uten nøytrale",
      "Mål etter innkast gir 5 poeng",
      "Balltap etter innkast gir motstander straffespark"
    ],
    source: "hyballa"
  },

  // === PRESSING MOT ETT-TOUCH ===
  {
    id: "hyballa-pressing-1",
    exerciseNumber: 308,
    name: "3v2 x 2 - Ett-Touch mot Aggressivt Press",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "pasning",
    equipment: ["kjegler", "baller", "vester"],
    description: "2 x 3v2 på to tilstøtende felt som veksler konstant. Tre i overtall per felt, to forsvarere starter ved sentral kjegle. Trener spiller ball inn ved start og ved ut. Direkte spill for overtallslaget. Etter min 3 pasninger kan overtall spille til nabofelt.",
    coachingPoints: [
      "Hold hodet oppe og vær i klar-posisjon konstant",
      "Skarpe ett-touch pasninger!",
      "Åpen posisjon - trekant som trygg organisasjonsform",
      "Hold rommet stort!"
    ],
    variations: [
      "Minsk/øk feltstørrelse",
      "Øk antall spillere",
      "Endre spilletid",
      "Marker 2m korridor mellom felt der overtallslag kan spille"
    ],
    source: "hyballa"
  }
];
