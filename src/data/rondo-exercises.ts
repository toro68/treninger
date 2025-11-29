/**
 * Øvelser fra "The Science of Rondo" av Marcus A. DiBernardo
 * Progressions, Variations & Transitions (2014)
 */

import { Exercise } from './exercises';

export const rondoExercises: Exercise[] = [
  // === GRUNNLEGGENDE RONDO ===
  {
    id: "rondo-fundamental",
    exerciseNumber: 1,
    name: "Fundamental Rondo (7v2)",
    category: "warmup",
    duration: 10,
    playersMin: 7,
    playersMax: 11,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Grunnleggende rondo i sirkel. 7v2 i 10x10m firkant. Spillerne danner sirkel og holder ballen borte fra 2 forsvarere. Fokus på rytme, tempo og 1-2 touch.",
    coachingPoints: [
      "Stå på tåballene med åpen kropp - klar til å motta fra alle sider",
      "Tenk 1-2 steg foran spillet - fart i tanken = fart i spillet",
      "Finn rytme i pasningene - tempo er kritisk",
      "Se etter 'third line split pass' - pasning gjennom forsvarerne",
    ],
    variations: [
      "3v1, 4v1, 4v2 for mindre grupper",
      "Kun 1 touch for høyere nivå",
      "Gjør firkanten større hvis spillerne sliter",
    ],
    source: "rondo",
  },
  {
    id: "rondo-breaking-lines",
    exerciseNumber: 201,
    name: "Breaking The Lines Rondo",
    category: "warmup",
    duration: 12,
    playersMin: 8,
    playersMax: 11,
    theme: "rondo",
    equipment: ["baller", "kjegler", "tape/tau"],
    description:
      "Rondo med linjer på bakken som deler sirkelen i soner. Hver pasning MÅ krysse minst én linje. Start med 6 soner, reduser til 4 for progresjon.",
    coachingPoints: [
      "Pasningen må krysse en linje før mottaker får ballen",
      "Øker pasningssyn og romforståelse",
      "Fjern linjer gradvis for å øke vanskelighetsgrad",
      "Bruk tape eller tau på bakken - ikke kjegler (ballen må rulle fritt)",
    ],
    variations: [
      "Start med 6 soner, reduser til 4",
      "Kun 2 soner for maksimal vanskelighet",
      "Kombiner med touch-begrensning",
    ],
    source: "rondo",
  },
  {
    id: "rondo-moving",
    exerciseNumber: 202,
    name: "Moving Rondo",
    category: "warmup",
    duration: 12,
    playersMin: 7,
    playersMax: 11,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Rondo der hele gruppen flytter seg til nytt felt etter 4 pasninger. Sett opp 2-4 firkanter ved siden av hverandre. Etter 4 pasninger spilles ballen til åpent felt og alle løper dit.",
    coachingPoints: [
      "Fullfør 4 pasninger før dere kan flytte",
      "Alle må løpe til nytt felt sammen - kollektiv bevegelse",
      "Hold sirkelformen når dere ankommer nytt felt",
      "Høy energi og flyt i spillet",
    ],
    variations: [
      "2 felt for én gruppe",
      "4 felt for to grupper (konkurranse)",
      "Variér antall pasninger før flytting",
    ],
    source: "rondo",
  },
  {
    id: "rondo-two-team-color",
    exerciseNumber: 473,
    name: "Two Team Color Coded Rondo",
    category: "station",
    duration: 12,
    playersMin: 12,
    playersMax: 20,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "To rondo-felt ved siden av hverandre. Spillerne har partnere med samme fargevest. Når forsvarerne vinner ballen, må den som mistet ballen OG partneren løpe til andre feltet som forsvarere.",
    coachingPoints: [
      "Scan hele tiden - forsvarere kan komme bakfra",
      "Ikke svik partneren din!",
      "Høy intensitet - ingen vil være i midten lenge",
      "Kommuniser med partner om posisjon",
    ],
    variations: [
      "5-6 ulike farger på vestene",
      "Variér avstanden mellom feltene",
      "Legg til tidsbegrensning for forsvarere",
    ],
    source: "rondo",
  },
  {
    id: "rondo-moving-circle",
    exerciseNumber: 5,
    name: "Moving Circle Rondo",
    category: "warmup",
    duration: 10,
    playersMin: 7,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Rondo der sirkelen beveger seg sideveis mens de holder ballen. 10m langt x 25m bredt felt. Hold ballen og flytt sirkelen til enden av feltet, så tilbake.",
    coachingPoints: [
      "Hold rytme i pasningene mens dere beveger dere",
      "Kollektiv problemløsning - må jobbe sammen",
      "Kommuniser retning og tempo",
      "Forsvarere har vesten i hånden (ikke på) for rask bytte",
    ],
    variations: [
      "Variér bredde på feltet",
      "Legg til tidsmål",
      "Konkurranse: hvem kommer først til enden?",
    ],
    source: "rondo",
  },
  {
    id: "rondo-line-passing",
    exerciseNumber: 412,
    name: "Line Passing Rondo",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Rondo med regler for linjepassninger. 'First line' = personen ved siden av deg. 'Second line' = hopper over én. 'Third line' = splitpass gjennom midten.",
    coachingPoints: [
      "Spill 1: Kun second og third line passes tillatt",
      "Spill 2: Etter first line pass, må neste være second/third",
      "Øker konsentrasjon og pasningssyn",
      "Third line split pass er 'pengeballen' - tren den!",
    ],
    variations: [
      "Kun second/third line",
      "Alternér mellom first og second/third",
      "Poeng for third line split pass",
    ],
    source: "rondo",
  },
  {
    id: "rondo-to-possession",
    exerciseNumber: 415,
    name: "Rondo to Possession",
    category: "station",
    duration: 15,
    playersMin: 14,
    playersMax: 20,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "To rondo-sirkler (f.eks. Rød 7v2 gul, Blå 7v2 gul). På signal 'Combined Play' spiller rød mot blå med de 4 gule som nøytrale. Etter 1 min: 'Rondo!' - tilbake til sirklene.",
    coachingPoints: [
      "Sømløs overgang mellom rondo og possession",
      "2 touch i combined play",
      "Gule hjelper laget med ball",
      "Rask omstilling mellom modusene",
    ],
    variations: [
      "Variér tid i hvert modus",
      "Endre antall nøytrale",
      "Legg til mål i combined play",
    ],
    source: "rondo",
  },
  {
    id: "rondo-transitions",
    exerciseNumber: 417,
    name: "Rondo Transitions",
    category: "station",
    duration: 15,
    playersMin: 6,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Veksle mellom rondo og andre øvelser. Sett opp rondo-felt ved siden av pasningsløype eller kondisløype. 3 min rondo → 3 min pasning/kondis → gjenta.",
    coachingPoints: [
      "Minimal nedetid i overgangene",
      "Hold fokus gjennom hele økten",
      "Planlegg feltoppsett for rask overgang",
      "Kombiner teknisk og fysisk trening",
    ],
    variations: [
      "Rondo → Pasningsløype",
      "Rondo → Kondisløp",
      "Rondo → Avslutning",
    ],
    source: "rondo",
  },
  {
    id: "rondo-sliding-player",
    exerciseNumber: 420,
    name: "Sliding Player Rondo",
    category: "station",
    duration: 12,
    playersMin: 7,
    playersMax: 11,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Rondo med én spiller som kan gli inn i midten for å hjelpe. Midtspilleren kan bli der hele tiden, eller bytte flytende med en fra sirkelen uten stopp.",
    coachingPoints: [
      "Midtspiller skaper overtall og pasningslinjer",
      "Flytende bytte uten å stoppe spillet",
      "Øker kompleksitet og lagarbeid",
      "Kommuniser når du går inn/ut",
    ],
    variations: [
      "Fast midtspiller hele tiden",
      "Roterende midtspiller",
      "2 midtspillere for større grupper",
    ],
    source: "rondo",
  },

  // === RONDO VARIASJONER ===
  {
    id: "rondo-follow-pass",
    exerciseNumber: 203,
    name: "Follow Your Pass Rondo",
    category: "warmup",
    duration: 10,
    playersMin: 9,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Etter du har slått pasningen, løper du til plassen til den du sendte til. Oppmuntrer til bevegelse etter pasning.",
    coachingPoints: [
      "Flytt deg umiddelbart etter pasning",
      "Mottaker må være klar til å flytte seg",
      "Skaper naturlig rotasjon i sirkelen",
      "God for spillere som står stille etter pasning",
    ],
    variations: [
      "Kombiner med touch-begrensning",
      "Sprint til ny posisjon",
      "Legg til armheving før du løper",
    ],
    source: "rondo",
  },
  {
    id: "rondo-pushup",
    exerciseNumber: 204,
    name: "Push-Up Rondo",
    category: "warmup",
    duration: 10,
    playersMin: 6,
    playersMax: 11,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Etter du har slått pasning, gjør en armheving før du er klar igjen. Du kan ikke få ballen tilbake umiddelbart - tvinger andre pasningsvalg.",
    coachingPoints: [
      "Gjør armhevingen raskt!",
      "Reduserer pasningsalternativer - må tilpasse seg",
      "Kombinerer styrke og teknikk",
      "Hold høyt tempo tross armhevingene",
    ],
    variations: [
      "Burpee i stedet for armheving",
      "Sit-up",
      "Sprint til kjegle 5m bak",
    ],
    source: "rondo",
  },
  {
    id: "rondo-two-touch-both-feet",
    exerciseNumber: 12,
    name: "Two Touch Both Feet Rondo",
    category: "warmup",
    duration: 10,
    playersMin: 7,
    playersMax: 11,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "To touch er obligatorisk - mottak med én fot, pasning med den andre. Skaper 1-2 rytme og tvinger bruk av begge føtter.",
    coachingPoints: [
      "Mottak med høyre → pasning med venstre (og omvendt)",
      "Skaper naturlig rytme i spillet",
      "Utvikler svak fot",
      "Hold tempoet oppe",
    ],
    variations: [
      "Kun svak fot for pasning",
      "Kun svak fot for mottak",
      "3 touch: mottak-touch-pasning",
    ],
    source: "rondo",
  },
  {
    id: "rondo-hold-hands",
    exerciseNumber: 13,
    name: "Hold Hands Rondo",
    category: "warmup",
    duration: 8,
    playersMin: 7,
    playersMax: 11,
    theme: "rondo",
    equipment: ["baller", "kjegler"],
    description:
      "Spillerne holder hender i sirkelen. Gjør feltet mindre og øker fart på ballbevegelse. Krever lagarbeid og hurtig spill.",
    coachingPoints: [
      "Sirkelen blir naturlig mindre",
      "Ballen må bevege seg raskt",
      "Ekstremt godt for lagarbeid",
      "Morsom variant som skaper energi",
    ],
    variations: [
      "Kun 1 touch",
      "Legg til konkurranse på tid",
      "Kombiner med jubel etter 10 pasninger",
    ],
    source: "rondo",
  },
  {
    id: "rondo-air",
    exerciseNumber: 428,
    name: "Air Rondo",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 10,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "Ballen starter i luften og kan IKKE berøre bakken. Svært høyt ferdighetsnivå kreves. Heading, volleys og brystkontroll.",
    coachingPoints: [
      "Hold ballen i luften hele tiden",
      "Krever høy teknisk ferdighet",
      "Bruk alle kroppsdeler unntatt hender",
      "Start med større sirkel og juster ned",
    ],
    variations: [
      "Kun heading",
      "Maks 2 touch før pasning",
      "Tell rekord for pasninger uten bakke",
    ],
    source: "rondo",
  },

  // === AVANSERTE RONDO-ØVELSER ===
  {
    id: "rondo-9v4",
    exerciseNumber: 432,
    name: "9v4 Rondo",
    category: "station",
    duration: 15,
    playersMin: 13,
    playersMax: 13,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "35x25m felt. 6 gule på utsiden, 3 gule inni. 4 blå forsvarere inni. Hvis blå vinner = 4v3 inni (gule på utsiden må bli). Når gule vinner tilbake = bruk alle 9.",
    coachingPoints: [
      "Utsidespillere gir bredde og sikkerhet",
      "Innsidespillere må bevege seg smart",
      "Ved tap: 4v3 situasjon - press!",
      "Progresjon: 1 touch for gule",
    ],
    variations: [
      "2 touch → 1 touch",
      "Utsidespillere kun 1 touch",
      "Poeng for split pass gjennom blå",
    ],
    source: "rondo",
  },
  {
    id: "rondo-cognitive-ball-toss",
    exerciseNumber: 435,
    name: "Cognitive Rondo: Ball Toss",
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 14,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester", "tennisballer"],
    description:
      "Vanlig rondo PLUSS en tennisball som kastes rundt samtidig! Spillerne må prosessere to oppgaver samtidig - øker kognitiv belastning dramatisk.",
    coachingPoints: [
      "Kast tennisballen underhånds mens rondo pågår",
      "Må være bevisst på BÅDE fotball og tennisball",
      "Tren hjernens evne til multitasking",
      "Start med 1 tennisball, øk til 2",
    ],
    variations: [
      "1 tennisball",
      "2 tennisballer",
      "Variér antall forsvarere",
    ],
    source: "rondo",
  },
  {
    id: "rondo-cognitive-no-same-color",
    exerciseNumber: 438,
    name: "Cognitive Rondo: No Same Color",
    category: "station",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester", "tennisballer"],
    description:
      "10v2 rondo med 6 par i ulike farger. Du kan IKKE sendt til din partner (samme farge). Forsvarere holder tennisball i hånden for rask identifikasjon.",
    coachingPoints: [
      "Finn alltid hvor partneren din er - unngå den retningen",
      "Krever konstant scanning",
      "Tennisball i hånden = forsvarer (raskere bytte enn vest)",
      "Høy kognitiv belastning",
    ],
    variations: [
      "Bytt plass med den du sender til",
      "Partnere må stå ved siden av hverandre",
      "Legg til tidsbegrensning",
    ],
    source: "rondo",
  },
  {
    id: "rondo-10v2-one-touch",
    exerciseNumber: 440,
    name: "10v2 One Touch",
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 12,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "IKKE i sirkel - spillerne beveger seg fritt i 10x10m. Alt er 1 touch. Forsvarere har vest i hånden. Arsenal FC bruker denne øvelsen mye!",
    coachingPoints: [
      "Konstant bevegelse - aldri stå stille",
      "1 touch tvinger forberedelse før mottak",
      "Trener hurtig spill og bevegelse etter ball",
      "Coach mater inn nye baller umiddelbart ved tap",
    ],
    variations: [
      "9v2 for litt mer plass",
      "Mindre felt for høyere press",
      "Poeng for 10 pasninger på rad",
    ],
    source: "rondo",
  },
  {
    id: "rondo-game-related",
    exerciseNumber: 19,
    name: "Game Related Rondo Transition",
    category: "game",
    duration: 20,
    playersMin: 17,
    playersMax: 18,
    theme: "possession",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "35x25m. Posisjonsspesifikt: 2 stoppere, 2 backer, 6'er, 8'er, 10'er og spiss per lag. 1 nøytral. Spill fra stoppere → gjennom midtbane → til spiss → tilbake. 2 touch.",
    coachingPoints: [
      "Direkte spillrelatert - alle rondoferdigheter brukes",
      "Utsidespillere i 'safe zones' (kan ikke tackles)",
      "Ballen beveger seg raskt - kamplik",
      "Perfekt overgang fra rondo til kamp",
    ],
    variations: [
      "1 touch for utsidespillere",
      "Legg til mål",
      "Variér feltstørrelse etter intensitet ønsket",
    ],
    source: "rondo",
  },

  // === HYBALLA TIQUI-TACA RONDOS (fra German Soccer Passing Drills) ===
  {
    id: "hyballa-tiqui-1",
    exerciseNumber: 20,
    name: "Tiqui-Taca Rondo: Mottak og Pasning",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "8v2 eller 9v3 Rondo med fokus på mottak og pasning. Begrens til 1-2 touch. Bytt fot (venstre/høyre) obligatorisk.",
    coachingPoints: [
      "Ta raske beslutninger",
      "Ta hensyn til forsvarernes posisjoner",
      "Bytt posisjoner etter balltap",
      "Veksle mellom sterk og svak fot"
    ],
    variations: [
      "Kun 1 touch",
      "Tidsbegrensning før bytte",
      "Bytt roller etter X antall balltap"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-2",
    exerciseNumber: 21,
    name: "Tiqui-Taca Rondo: Push-pasninger",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "8v2 med fokus på push-pasninger over korte avstander. Pasning til medspillerens sterke fot.",
    coachingPoints: [
      "Kroppen over ballen",
      "Hold ballen flat - ikke løft den",
      "Støttefoten i spilleffektiv posisjon",
      "Balanse for neste berøring"
    ],
    variations: [
      "Varier pasningsavstand",
      "Legg til bevegelse etter pasning",
      "Konkurranseform: Flest pasninger på rad"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-3",
    exerciseNumber: 22,
    name: "Tiqui-Taca Rondo: Ballhastighet",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "8v2 med fokus på ballhastighet. Velg pasningshastighet som gjør at forsvareren kommer for sent.",
    coachingPoints: [
      "Ta riktig beslutning om hastighet",
      "Ballhastighet som taktisk verktøy",
      "Forsvareren skal være for sen romlig og tidsmessig",
      "Varier tempo basert på situasjon"
    ],
    variations: [
      "Høyere tempo = mindre felt",
      "Lavere tempo = større felt",
      "Konkurranseform: Hvem mister minst baller?"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-4",
    exerciseNumber: 23,
    name: "Tiqui-Taca Rondo: Lang Pasning",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "8v2 med fokus på å åpne rom og slå lang pasning. Forsvarerne blir i midten når lang pasning spilles mellom dem.",
    coachingPoints: [
      "Lang pasning mellom to forsvarere = de blir i midten",
      "Ball gjennom sentrum = de blir i midten",
      "Ball rundt hele rondoen = de blir i midten",
      "Motto: Mye rom og tid for angrepsspillet!"
    ],
    variations: [
      "6-8 pasninger uten tap = forsvarerne blir",
      "Kombiner flere regler",
      "Legg til poenggiving"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-5",
    exerciseNumber: 24,
    name: "Tiqui-Taca Rondo: Ventende Forsvarer",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "8v2 der forsvarerne venter på rett øyeblikk. Fokus på korte pasninger til motsatt side av rondoen.",
    coachingPoints: [
      "Kort pasningsspill til motsatt side",
      "Lokk forsvareren til én side, spill til den andre",
      "Pasning som taktisk verktøy",
      "Tålmodighet i pasningsspillet"
    ],
    variations: [
      "Begrens til 1 touch",
      "Legg til tidsbegrensning",
      "Konkurranseform mellom grupper"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-6",
    exerciseNumber: 25,
    name: "Tiqui-Taca Rondo: Romforståelse",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "8v2 med fokus på romforståelse og retningsendringer. Regel: Kan IKKE spille tilbake til naboen.",
    coachingPoints: [
      "Veksle mellom korte og lange pasninger",
      "Hopp over en linje!",
      "Les rommet og finn åpninger",
      "Tving frem retningsendringer"
    ],
    variations: [
      "Kan ikke spille til de to nærmeste",
      "Varier feltstørrelsen",
      "Legg til bevegelse etter pasning"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-7",
    exerciseNumber: 452,
    name: "Tiqui-Taca Rondo: Kommunikasjon",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "8v2 med fokus på kommunikasjon med og uten ball. 2 touch obligatorisk.",
    coachingPoints: [
      "Se deg rundt og coach hverandre!",
      "Bruk ballhastighet som kommunikasjon",
      "Lange baller holder forsvarerne ute - de må løpe mer",
      "2 touch = kontrollér rondoen med første touch"
    ],
    variations: [
      "Hard pasning = du har ikke tid",
      "Lang pasning mellom forsvarere = signal",
      "Legg til verbale signaler"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-8",
    exerciseNumber: 456,
    name: "Tiqui-Taca Rondo: Overgang",
    category: "station",
    duration: 15,
    playersMin: 9,
    playersMax: 14,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "9v3 med fokus på overganger. Ved ballvinning må alle 3 forsvarere prøve å få ballen, deretter byttes roller.",
    coachingPoints: [
      "Rask overgang i begge retninger",
      "Angrep til forsvar og forsvar til angrep",
      "Pasningskondisjon og taktikk",
      "Intelligens i overgangen"
    ],
    variations: [
      "Forsvarerne sparker ballen ut og rykker opp",
      "Markert felt - forsvarerne må score på småmål",
      "Tidsbegrensning på gjenvinning"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-9",
    exerciseNumber: 461,
    name: "Tiqui-Taca Rondo: Kondisjon",
    category: "station",
    duration: 15,
    playersMin: 9,
    playersMax: 14,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "9v3 med fokus på pasningskondisjon for Tiqui-Taca. 1:3 ratio mellom innsats og hvile. Kun 1 touch.",
    coachingPoints: [
      "Forsvarere med 100% beredskap",
      "Angripere: Se deg rundt og coach!",
      "Konkurranseform: Hvem klarer flest pasninger?",
      "Kings of Rondo-mentalitet"
    ],
    variations: [
      "Varier ratio mellom innsats/hvile",
      "Legg til tidsbegrensning",
      "Konkurranseturneringer mellom grupper"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  },
  {
    id: "hyballa-tiqui-10",
    exerciseNumber: 290,
    name: "Tiqui-Taca Rondo: Spilleder",
    category: "game",
    duration: 15,
    playersMin: 9,
    playersMax: 14,
    theme: "rondo",
    equipment: ["baller", "kjegler", "vester"],
    description:
      "9v3 der spillerne lager egne regler (fra Rondo 1-9). Én spiller utpekes som spilleder med ansvar for flyt og atmosfære.",
    coachingPoints: [
      "Treneren observerer og gir verbal input",
      "Spillerne dømmer hverandre",
      "Spillederen har alt ansvar for flyten",
      "Utvikle lederskapsevner gjennom rondo"
    ],
    variations: [
      "Roter spillederen",
      "La spillerne velge fra alle 9 varianter",
      "Evaluer etter øvelsen"
    ],
    source: "rondo",
    sourceUrl: "Hyballa/te Poel: German Soccer Passing Drills"
  }
];

// Eksporter antall rondo-øvelser for bruk i filter
export const rondoExerciseCount = rondoExercises.length;
