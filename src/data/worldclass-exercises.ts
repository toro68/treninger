/**
 * World Class Coaching øvelser
 * 
 * Kilde: World Class Coaching: "50 Small-Sided Games" (2014)
 * Øvelser fra Chelsea, Manchester City, Newcastle United, Juventus, Ajax, PSV Eindhoven m.fl.
 */

import type { ExerciseData } from './exercises';
import { worldclassImageById } from './worldclass-image-map';

const baseWorldclassExercises: ExerciseData[] = [
  // ===== WORLD CLASS COACHING - 50 Small-Sided Games =====
  // Warm-up
  {
    id: "smallsided-112",
    exerciseNumber: 112,
    name: "Throw - Head - Catch",
    tags: ["worldclass-50-smallsided-games"],
    category: "warmup",
    duration: 12,
    playersMin: 20,
    playersMax: 20,
    theme: "bevegelse",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "10v10 på 65x35 yards. Spillet starter med kast, deretter må spillerne header-passe og score med heading. Ball på bakken = balltap og nytt kast andre veien.",
    coachingPoints: [],
    variations: [
      "Kast → volley til medspiller → heading tilbake → mottak",
      "Spillerne må header-passe mens de er i lufta",
      "Kun mål med heading"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.14 'Throw - Head - Catch'"
  },
  {
    id: "smallsided-113",
    exerciseNumber: 113,
    name: "Four Team Warm-Up",
    tags: ["worldclass-50-smallsided-games"],
    category: "warmup",
    duration: 10,
    playersMin: 16,
    playersMax: 18,
    theme: "possession",
    equipment: ["Kjegler", "Vester (4 farger)", "Baller", "2 mål", "2 keepere"],
    description: "Fire lag à fire spillere. Hvert lag har én ball og passer kort. Når keeper roper farge, slår spilleren ballen enkelt inn i keeperens armer, som kaster ut til samme gruppe. Dynamisk strekk underveis før lengre/drivende pasninger.",
    coachingPoints: [],
    variations: [
      "Lengre pasninger før innlegg til keeper",
      "Drivende pasninger med mer kraft"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.10 'Four Team Warm-Up'"
  },

  // Passing and possession
  {
    id: "smallsided-114",
    exerciseNumber: 114,
    name: "5v2",
    category: "rondo",
    duration: 10,
    playersMin: 7,
    playersMax: 14,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Etter dynamisk oppvarming spiller tre grupper 5v2 i 10-yard ruter. Kun 1-touch fra start. Angriperne prøver å splitte forsvarerne og støtte tidlig for høyt tempo.",
    coachingPoints: [],
    variations: [],
    source: "worldclass",
    sourceRef: "WorldClass s.61 '5v2'"
  },
  {
    id: "smallsided-115",
    exerciseNumber: 115,
    name: "Cones as Goals",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "possession",
    equipment: ["Kjegler (mange)", "Vester", "Baller"],
    description: "4v4 i 20x30 yard rektangel. Mål ved å velte en av target-kjeglene på motsatt ende. Fokus på presisjon i skudd og korte sidefotsavslutninger.",
    coachingPoints: [
      "Presisjon i skudd",
      "Sidefotskudd på kort hold"
    ],
    variations: [],
    source: "worldclass",
    sourceRef: "WorldClass s.56 'Cones as Goals'"
  },
  {
    id: "smallsided-116",
    exerciseNumber: 116,
    name: "6v3",
    category: "game",
    duration: 15,
    playersMin: 9,
    playersMax: 9,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6 spillere holder ball mot 3. Seks pasninger = 1 poeng. Vinner 3-laget ballen, kan de score i ett av to mål. Startes alltid med ball fra trener.",
    coachingPoints: [],
    variations: [
      "Bytt de tre forsvarerne hver 45–60 sek",
      "Trenerserver kan styre intensitet"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.40 '6v3'"
  },
  {
    id: "smallsided-118",
    exerciseNumber: 118,
    name: "4 v 4 + 4 Progression",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "possession",
    equipment: ["Kjegler", "Vester (3 farger)", "Baller", "2 keepere"],
    description: "4v4 i rute (ca. 44x36 yards) med 4 støtte‑spillere på utsiden. Spilles i 3 minutter, deretter bytter inner/ytter. Utespillere 1-touch, restart fra keeper på halvdel der ballen gikk ut.",
    coachingPoints: [
      "Utespillere har 1-touch",
      "Restart fra keeper på halvdel der ballen gikk ut"
    ],
    variations: [],
    source: "worldclass",
    sourceRef: "WorldClass s.65 '4 v 4 + 4 Progression'"
  },

  // Finishing
  {
    id: "smallsided-119",
    exerciseNumber: 119,
    name: "9 v 9 Offside Shooting",
    category: "game",
    duration: 15,
    playersMin: 18,
    playersMax: 20,
    theme: "avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "9v9 i midtre tredjedel av full bane, markert i tredeler. Start med coach‑server til ett lag som må ha min. 3 pasninger før ball spilles i rom for løpende spiller (1v1 mot keeper). Coach server til andre lag etter avslutning.",
    coachingPoints: [
      "Unngå å gå for tidlig i offside",
      "Ikke forhast siste pasning",
      "Bruk hele banens bredde",
      "Spill pasningen i rom, ikke til spiller"
    ],
    variations: [],
    source: "worldclass",
    sourceRef: "WorldClass s.28 '9 v 9 Offside Shooting'"
  },
  {
    id: "smallsided-120",
    exerciseNumber: 120,
    name: "6 v 6 + Goalkeepers",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 14,
    theme: "avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "6v6 i rute med mål i hver ende. Lagene står i 2-2-2. Skudd på mål gir laget ballen tilbake for å angripe motsatt mål.",
    coachingPoints: [
      "Hold ballen og angrip med hensikt",
      "Skyt når muligheten kommer",
      "Press ballfører raskt"
    ],
    variations: [
      "Spill to-touch, deretter en-touch hvis mulig"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.30 '6 v 6 + Goalkeepers'"
  },

  // Crossing and finishing
  {
    id: "smallsided-121",
    exerciseNumber: 121,
    name: "4v4",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 12,
    theme: "innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "4v4 med keepere i område omtrent dobbelt størrelse av 16‑meter. Tredje lag venter ute. Start alltid med keeper‑kast til motsatt keeper som spiller til eget lag. Lag som scorer blir på.",
    coachingPoints: [
      "Tidlig press på ball",
      "Dekning rundt første forsvarer",
      "Forsvar: prioriter å beskytte mål"
    ],
    variations: [
      "Progression #1: Ekstra lag fungerer som crossere i hjørner. Angripende lag må ha 4 pasninger før innlegg, én må til keeper.",
      "Progression #2: Crossere kutter ballen tilbake og slår innsvingende innlegg med andre fot. Svak side kan angripe innlegget."
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.34 '4v4'"
  },
  {
    id: "smallsided-122",
    exerciseNumber: 122,
    name: "7 v 7 Transfer Game",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 14,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "To lag spiller i hver sin halvdel og er nummerert 1–7. Trener server ball inn; to forsvarere krysser inn for å vinne ballen. Ballholdende lag får poeng for hver femte pasning og kan sende ekstra forsvarer ved fem pasninger. Vinner forsvarerne ballen, spiller de til eget lag i motsatt halvdel og teller kun pasninger i sin angrepshalvdel. Ved første utspill spurter spiller #1 fra hvert lag til sidelinjeball, neste gang #2 osv.",
    coachingPoints: [],
    variations: [],
    source: "worldclass",
    sourceRef: "WorldClass s.48 '7 v 7 Transfer Game'"
  },
  {
    id: "smallsided-132",
    exerciseNumber: 132,
    name: "6v6",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 14,
    theme: "possession",
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
    sourceRef: "WorldClass s.71 '6v6'"
  },
  {
    id: "smallsided-133",
    exerciseNumber: 133,
    name: "7 v 7 with Center Square",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "possession",
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
    sourceRef: "WorldClass s.72 '7 v 7 with Center Square'"
  },

  // Fitness and intensity
  {
    id: "smallsided-134",
    exerciseNumber: 134,
    name: "Fitness Exercise: 5 v 5 + 5 Keep-Away",
    category: "game",
    duration: 12,
    playersMin: 15,
    playersMax: 15,
    theme: "possession",
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
    sourceRef: "WorldClass s.75 'Fitness Exercise: 5 v 5 + 5 Keep-Away'"
  },
  {
    id: "smallsided-135",
    exerciseNumber: 135,
    name: "3v3+3",
    category: "game",
    duration: 10,
    playersMin: 9,
    playersMax: 12,
    theme: "possession",
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

  // Goalscoring
  {
    id: "smallsided-136",
    exerciseNumber: 136,
    name: "5 v 5 +2",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 12,
    theme: "avslutning",
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
    sourceRef: "WorldClass s.78 '5 v 5 +2'"
  },
  {
    id: "smallsided-137",
    exerciseNumber: 137,
    name: "Small-Sided Game Progression",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "possession",
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
    name: "Multiple Goal Possession Game",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 16,
    theme: "possession",
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
    sourceRef: "WorldClass s.82 'Multiple Goal Possession Game'"
  },
  {
    id: "smallsided-139",
    exerciseNumber: 139,
    name: "Team Possession Game",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "possession",
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

  // Finishing
  {
    id: "smallsided-140",
    exerciseNumber: 140,
    name: "Shooting vs Possession",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 16,
    theme: "avslutning",
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
    name: "2v2+4",
    category: "game",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "avslutning",
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
    id: "smallsided-144",
    exerciseNumber: 144,
    name: "Flank Handball",
    category: "game",
    duration: 12,
    playersMin: 12,
    playersMax: 16,
    theme: "innlegg",
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
    name: "Three Zone To Goal",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "innlegg",
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
    sourceRef: "WorldClass s.38 'Three Zone To Goal'"
  },
  {
    id: "smallsided-146",
    exerciseNumber: 146,
    name: "Magic Box",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "innlegg",
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
    name: "Flank Zones",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "innlegg",
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

  // 7+4v7+4 and larger games
  {
    id: "smallsided-148",
    exerciseNumber: 148,
    name: "7+4v7+4",
    category: "game",
    duration: 15,
    playersMin: 22,
    playersMax: 22,
    theme: "avslutning",
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
  },

  // ===== ADDITIONAL WORLD CLASS EXERCISES =====
  
  // Conditioning
  {
    id: "smallsided-150",
    exerciseNumber: 501,
    name: "1v1",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 16,
    theme: "1v1",
    equipment: ["Kjegler", "Baller"],
    description: "1v1 i 10m firkanter. 4 spillere på utsiden leverer baller når ball går ut. 1 minutt arbeid, deretter bytte. Hold besittelse eller vinn ball. 4 repetisjoner per spiller. Høyintensiv mannorientering.",
    coachingPoints: [
      "Hold ballen i bevegelse",
      "Bruk kroppsfinter for å lure motstander",
      "Vinn ballen - umiddelbar pressing",
      "Total konsentrasjon og fokus"
    ],
    variations: [
      "2v2 med 2 min arbeid",
      "4v4 i 30m firkant, 4 min arbeid",
      "Mannorientering hele tiden"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.15 '1v1'"
  },
  
  // Crossing
  {
    id: "smallsided-154",
    exerciseNumber: 508,
    name: "9 v 9 Crossing And Finishing",
    category: "game",
    duration: 15,
    playersMin: 18,
    playersMax: 20,
    theme: "innlegg",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "9v9 på midtre tredjedel (delt i tredeler med linjer fra 16m). Ballen spilles ut til kantspiller som angriper endeline og slår inn. To spillere (A1 nær, A2 bakre) timer løpene inn i feltet.",
    coachingPoints: [
      "Timing av innløp - ikke for tidlig",
      "A1: nær stolpe først, A2: bakre stolpe",
      "Vekt på pasningen til kantspiller",
      "Treff målet med avslutningen"
    ],
    variations: [
      "Innlegg fra motsatt kant",
      "Kondisjonselement: løp tilbake til midt umiddelbart",
      "Cutback til kant"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.38 '9 v 9 Crossing And Finishing'"
  },
  
  // Possession
  {
    id: "smallsided-155",
    exerciseNumber: 506,
    name: "11 v 11 with the Flanks Free",
    category: "game",
    duration: 20,
    playersMin: 22,
    playersMax: 24,
    theme: "kantspill",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "11v11 med kantsonene frie (5-10m på hver side). Bare én spiller om gangen kan entre kantsonen ved å løpe på ball. Maks 3 touch i kantsonen, deretter tilbake i spill. 1 poeng for mål, 2 poeng for mål fra innlegg.",
    coachingPoints: [
      "Normalt spill sentralt",
      "Kantspiller: kontroll, slå inn, tilbake",
      "2-3 touch i sentrum",
      "Overlapping og posisjonsbytte"
    ],
    variations: [
      "Forsvarer kan entre for å stoppe innlegg",
      "Må ha minst 4 pasninger før kantspill",
      "Begge kantspillere kan entre samtidig"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.44 '11 v 11 with the Flanks Free'"
  },
  
  // Keepaway
  {
    id: "smallsided-156",
    exerciseNumber: 507,
    name: "Keepaway Game",
    category: "warmup",
    duration: 10,
    playersMin: 12,
    playersMax: 16,
    theme: "pasning",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "To lag med nummererte spillere i hvert sitt kvadrat. Treneren roper et nummer - disse to spillerne sprinter til motsatt kvadrat og spiller 4v1 (eller liknende undertall). Den som vinner ballen først får poeng til laget.",
    coachingPoints: [
      "Sprint for å vinne kappløpet",
      "Hurtig omstilling til forsvar/angrep",
      "Hold ballen i bevegelse",
      "Kommunikasjon"
    ],
    variations: [
      "Rop to nummer = 4v2",
      "Vinneren får bli og spille videre",
      "Tidsbegrensning (30 sek)"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.11 'Keepaway Game'"
  },
  
  // Possession
  {
    id: "smallsided-157",
    exerciseNumber: 622,
    name: "Line Game",
    category: "game",
    duration: 12,
    playersMin: 18,
    playersMax: 22,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Feltspillere i 4-3-3 formasjon spiller keep-away. 10 sammenhengende pasninger = 1 mål. Deretter spilles med 'mål' som to linjer 6m fra hver ende. Mål scores ved å drible over linjen etter minst 4 pasninger.",
    coachingPoints: [
      "Ingen lobber - hold ballen nede",
      "Make it take it ved mål",
      "1-2 touch",
      "Posisjonering i formasjon"
    ],
    variations: [
      "Kun 1-touch",
      "Pasning over linjen teller ikke",
      "Legg til press etter 5 sek"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.12 'Line Game'"
  },
  
  // Conditioning
  {
    id: "smallsided-158",
    exerciseNumber: 623,
    name: "2 v 2 + Targets",
    category: "game",
    duration: 10,
    playersMin: 6,
    playersMax: 6,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "2v2 med én målspiller for hvert lag på motsatte ender. Laget i besittelse prøver å spille fra én målspiller til den andre. Høy intensitet - hver omgang varer 1 minutt. Fokus på vending og dribleteknikk.",
    coachingPoints: [
      "Vend raskt - ikke stopp ballen",
      "Drible for å skape pasningsrom",
      "Målspillerne må bevege seg",
      "Fullt tempo hele tiden"
    ],
    variations: [
      "Målspillerne har 1-touch",
      "Bytt spillere hvert minutt",
      "Legg til mål for direkte scoring"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.19 '2 v 2 + Targets'"
  },

];

export const worldclassExercises: ExerciseData[] = baseWorldclassExercises.map((exercise) => ({
  ...exercise,
  imageUrl: exercise.imageUrl ?? worldclassImageById[exercise.id],
}));
