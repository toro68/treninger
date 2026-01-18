/**
 * World Class Coaching øvelser
 * 
 * Kilde: World Class Coaching: "50 Small-Sided Games" (2014)
 * Øvelser fra Chelsea, Manchester City, Newcastle United, Juventus, Ajax, PSV Eindhoven m.fl.
 */

import type { ExerciseData } from './exercises';

export const worldclassExercises: ExerciseData[] = [
  // ===== WORLD CLASS COACHING - 50 Small-Sided Games =====
  // Oppvarming og kondisjon
  {
    id: "smallsided-111",
    exerciseNumber: 111,
    name: "Håndball til mål",
    tags: ["worldclass-50-smallsided-games"],
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 14,
    theme: "bevegelse",
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
    tags: ["worldclass-50-smallsided-games"],
    category: "warmup",
    duration: 12,
    playersMin: 10,
    playersMax: 20,
    theme: "bevegelse",
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
    sourceRef: "WorldClass s.14 'Throw - Head - Catch'"
  },
  {
    id: "smallsided-113",
    exerciseNumber: 113,
    name: "Fire lag oppvarming",
    tags: ["worldclass-50-smallsided-games"],
    category: "warmup",
    duration: 10,
    playersMin: 16,
    playersMax: 18,
    theme: "possession",
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
    category: "rondo",
    duration: 10,
    playersMin: 7,
    playersMax: 14,
    theme: "possession",
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
    theme: "possession",
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
    theme: "avslutning",
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
    theme: "possession",
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
    theme: "possession",
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
    playersMin: 18,
    playersMax: 20,
    theme: "avslutning",
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
    theme: "avslutning",
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
    theme: "innlegg",
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
    theme: "possession",
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
    theme: "possession",
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
    category: "rondo",
    duration: 12,
    playersMin: 8,
    playersMax: 12,
    theme: "possession",
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
    category: "rondo",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "pressing",
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
    theme: "possession",
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
    theme: "possession",
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
    theme: "avslutning",
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
    theme: "possession",
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
    theme: "possession",
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
    theme: "possession",
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

  // Målscoring
  {
    id: "smallsided-136",
    exerciseNumber: 136,
    name: "5v5+2 Støttespillere",
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
    name: "Multi-mål spill",
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

  // Avslutning og shooting
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
    name: "2v2+4 med mål",
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
    id: "smallsided-142",
    exerciseNumber: 142,
    name: "Possession til avslutning",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
    theme: "avslutning",
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
    theme: "innlegg",
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
    name: "Tre soner til mål",
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
    name: "Kantsoner med innlegg",
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

  // 7+4v7+4 og større
  {
    id: "smallsided-148",
    exerciseNumber: 148,
    name: "7+4 vs 7+4",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 16,
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

  // ===== FLERE WORLD CLASS ØVELSER =====
  
  // Oppvarming: Kast-Heading-Fang Variasjon
  {
    id: "smallsided-149",
    exerciseNumber: 500,
    name: "10v10 Heading-spill",
    tags: ["worldclass-50-smallsided-games"],
    category: "warmup",
    duration: 10,
    playersMin: 16,
    playersMax: 22,
    theme: "heading",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål", "2 keepere"],
    description: "10v10 på 65x35m bane. Spillerne starter med kast, deretter heading-pasning eller heading-skudd. Hvis ballen treffer bakken, mister laget besittelsen.",
    coachingPoints: [
      "Timing på heading - møt ballen",
      "Kommunikasjon - rop 'min!'",
      "Posisjonering for å motta kast",
      "Variér heading: nedover, sidelengs, oppover"
    ],
    variations: [
      "Bare mål med heading teller",
      "Pasning med hodet, fang og kast videre",
      "Legg til volley-pasninger"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.14 'Throw - Head - Catch'"
  },
  
  // Conditioning: 1v1 Intensiv
  {
    id: "smallsided-150",
    exerciseNumber: 501,
    name: "1v1 Intensiv kondisjon",
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
    sourceRef: "WorldClass s.15 '1v1 Conditioning'"
  },
  
  // Conditioning: 6v4+GK
  {
    id: "smallsided-151",
    exerciseNumber: 502,
    name: "6v4+GK Funksjonell trening",
    category: "game",
    duration: 12,
    playersMin: 11,
    playersMax: 13,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "1 mål", "1 keeper"],
    description: "4 forsvarere + keeper forsvarer mot 6 angripere (2 spisser, 4 midtbane) på 75x45m bane. Angriperne scorer på stort mål, forsvarerne scorer ved å spille til målspillere ved midtstreken.",
    coachingPoints: [
      "Keeper: prosesser cues raskt",
      "Forsvarere: kommunikasjon og sikring",
      "Angripere: rask kombinasjonsspill",
      "Overgang begge veier"
    ],
    variations: [
      "Legg til en forsvarer ved ballvinning",
      "Tidsbegrensning på angrep (15 sek)",
      "Mål fra førstetouch = dobbelt"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.14 '6v4+Goalkeeper'"
  },
  
  // Possession: 6v6+6 Nøytrale
  {
    id: "smallsided-152",
    exerciseNumber: 503,
    name: "6v6+6 Nøytrale",
    category: "game",
    duration: 15,
    playersMin: 18,
    playersMax: 20,
    theme: "possession",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "6v6 keep-away med 6 nøytrale spillere på utsiden. Laget i besittelse spiller til nøytral som slår lang pasning til motsatt side. Kontrollert mottak = 1 poeng. Nøytrale roterer med innelag etter tid.",
    coachingPoints: [
      "Høy teknikk og kontroll kreves",
      "Hastighet i pasningsspillet",
      "Konsentrasjon og fokus",
      "Nøytrale: 1-touch"
    ],
    variations: [
      "Tidsbegrensning: 3 sekunder på ballen",
      "Nøytrale fri bevegelse langs linje",
      "Motta lang ball = bytt side"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.12 '6v6+6 Possession'"
  },
  
  // Shooting: Progresjonsspill til avslutning
  {
    id: "smallsided-153",
    exerciseNumber: 504,
    name: "Progresjon 1v1 til 4v2",
    category: "station",
    duration: 15,
    playersMin: 12,
    playersMax: 14,
    theme: "avslutning",
    equipment: ["Kjegler", "Vester", "Baller", "1 mål", "1 keeper"],
    description: "3 soner: Sone 1 (1v1), Sone 2 (2v1 til mål), Sone 3 (4v2 til mål). Angriper starter i Sone 1, kjemper mot forsvarer. Uansett utfall går angriper til Sone 2 og får med seg én spiller for 2v1. Begge angripere går til Sone 3 for 4v2.",
    coachingPoints: [
      "Hver sone: løs oppgaven raskt",
      "Overgang mellom soner",
      "Avslutt så snart sjansen byr seg",
      "Forsvarere: forsink og reorganiser"
    ],
    variations: [
      "Tidsbegrensning per sone",
      "Mål fra distanse = ekstra poeng",
      "Bytt roller etter alle har vært gjennom"
    ],
    source: "worldclass",
    sourceRef: "WorldClass s.32 'Shooting Progression'"
  },
  
  // Crossing: 9v9 Innleggsspill
  {
    id: "smallsided-154",
    exerciseNumber: 505,
    name: "9v9 Innlegg og avslutning",
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
    sourceRef: "WorldClass s.38 '9v9 Crossing'"
  },
  
  // Possession: 11v11 Frie kantsoner
  {
    id: "smallsided-155",
    exerciseNumber: 506,
    name: "11v11 Frie kantsoner",
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
    sourceRef: "WorldClass s.44 '11v11 Flanks Free'"
  },
  
  // Keepaway: Nummerspill
  {
    id: "smallsided-156",
    exerciseNumber: 507,
    name: "Keepaway Nummerspill",
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
  
  // Possession: Linjespill
  {
    id: "smallsided-157",
    exerciseNumber: 622,
    name: "4-3-3 Linjespill",
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
  
  // Conditioning: 2v2+Mål
  {
    id: "smallsided-158",
    exerciseNumber: 623,
    name: "2v2+Målspillere kondisjon",
    category: "game",
    duration: 10,
    playersMin: 8,
    playersMax: 12,
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
    sourceRef: "WorldClass s.19 '2v2+Targets'"
  },

  // FineSoccer Drill 88
  {
    id: "smallsided-159",
    exerciseNumber: 510,
    name: "4v4 Sirkelspill med rotasjon",
    category: "warmup",
    duration: 10,
    playersMin: 12,
    playersMax: 16,
    theme: "oppvarming",
    equipment: ["Kjegler", "Vester", "Baller", "2 småmål"],
    description: "Bruk midtsirkelen som bane med to småmål på hver side. 4v4 inne i sirkelen, 8 spillere fordelt på to lag utenfor. Når ball går ut, bytter innespilleren med utespiller fra samme lag. Høyt tempo og mye bevegelse.",
    coachingPoints: [
      "Raske overganger ved bytte",
      "Hold høyt tempo inne i sirkelen",
      "Utespillere: vær klar til å entre",
      "Spill raskt - 1-2 touch"
    ],
    variations: [
      "Mål teller bare fra førstetouch",
      "Utespillere kan brukes som veggspillere (1-touch)",
      "Bytt hele laget etter hvert mål"
    ],
    source: "worldclass",
    sourceRef: "FineSoccer Drill 88"
  }
];
