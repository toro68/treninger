/**
 * Prickett 3v3 Coaching øvelser
 * 
 * Kilde: Peter Prickett: "Developing Skill: A Guide to 3v3 Soccer Coaching" (2018)
 * 
 * Kriterier for øvelsene:
 * ✓ Alle spillere aktive hele tiden (ingen køer)
 * ✓ Alle involveres med ball
 * ✓ Høy intensitet og mange ballberøringer
 * ✓ Realistiske spillsituasjoner
 * ✓ Passer for J16-nivå (15-16 år)
 */

import type { ExerciseData } from './exercises';

import { prickettImageById } from './prickett-image-map';

const basePrickettExercises: ExerciseData[] = [
  // ===== 3v3 GRUNNLEGGENDE (Prickett kap. 4) =====
  {
    id: "smallsided-1",
    exerciseNumber: 1,
    name: "3v3 Fire mål",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "smålagsspill",
    equipment: ["Kjegler", "Vester", "Baller", "4 små mål"],
    description: "Tre mot tre på liten bane med fire små mål (ett i hvert hjørne). Begge lag kan score på begge mål på motsatt side. Tvinger spillerne til å lese spillet og bytte angrepspunkt.",
    coachingPoints: [
      "Les spillet - hvilket mål er åpent?",
      "Bytt angrepspunkt når en side er stengt",
      "Bevegelse uten ball for å skape rom",
      "Kommunikasjon - hvem presser, hvem sikrer?"
    ],
    variations: [
      "Kan ikke score i samme mål to ganger på rad",
      "Maks 3 berøringer",
      "Må ha minst 3 pasninger før scoring"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 2 – Four Goal Game'"
  },
  {
    id: "smallsided-2",
    exerciseNumber: 2,
    name: "2v2 + 2 målspillere",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "2v2 med en målspiller i hver ende. Laget scorer ved å spille inn til en målspiller, bevege seg for returen og vende spillet videre til målspilleren i motsatt ende.",
    coachingPoints: [
      "Kroppsstilling før mottak",
      "Orientert førstetouch",
      "Raskt pasningsspill",
      "Bevegelse for å finne rom",
      "Bruk kombinasjoner som veggspill, overlap og opp-tilbake-gjennom"
    ],
    variations: [
      "Roter målspillere etter hver serie",
      "Begrens sentrale spillere til to touch",
      "Krev vending før spillet går til motsatt ende"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 3 – Target Players'"
  },
  {
    id: "smallsided-3",
    exerciseNumber: 3,
    name: "3v3 Frispill",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 8,
    theme: "smålagsspill",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Fritt 3v3 på en liten bane. Banen holdes så kompakt at keeperne kan skyte og være involvert i det generelle spillet gjennom hele øvelsen.",
    coachingPoints: [
      "Hold avstandene små nok til at alle er involvert",
      "Se etter rom og muligheter til å vende spillet",
      "Bruk små kombinasjoner for å komme fri",
      "La keeperne være en del av oppbyggingen"
    ],
    variations: [
      "Spill med eller uten keeper",
      "Begrens antall touch for høyere tempo",
      "Gi ekstra poeng for vellykket sideskifte"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 1 – Small-Sided Free Play'"
  },
  {
    id: "smallsided-4",
    exerciseNumber: 4,
    name: "2v2 + 2 og overgang til mål",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "omstilling",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "2v2 med en målspiller i hver ende. Ballaget scorer ved å spille fra målspiller til målspiller. Hvis forsvarerne vinner ballen, kan de bryte ut og score i ett av to mål.",
    coachingPoints: [
      "Presist pasningsspill",
      "Bevegelse etter pasning",
      "Bruk kombinasjoner som veggspill og overlap",
      "Vær klar for overgang og kontring når ballen tapes"
    ],
    variations: [
      "Bytt roller etter fast tid",
      "Begrens målspillerne til to touch",
      "La forsvarslaget starte umiddelbar kontring ved ballvinning"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 4 – Two vs Two plus Two'"
  },
  {
    id: "smallsided-5",
    exerciseNumber: 5,
    name: "4v2 Possession",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "rondo",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Klassisk 4v2 rondo i firkant. De 4 holder ball, de 2 presser. Ved tap bytter den som mistet + den som ga dårlig ball.",
    coachingPoints: [
      "Åpne kroppen - se hele banen",
      "Førstetouch vekk fra press",
      "Kommunikasjon: 'Tid!' eller 'Mann på!'",
      "Presset: Arbeid sammen, styr mot hjørne"
    ],
    variations: [
      "1-touch",
      "2-touch",
      "Split-pass gjennom midten = de 2 ut"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 5 – Four vs Two Possession'"
  },
  
  // ===== 3v3 MED SONER (Prickett) =====
  {
    id: "smallsided-6",
    exerciseNumber: 247,
    name: "Vertikale soner 3x1v1",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Banen deles i tre vertikale soner. Start med tre separate 1v1-dueller. Progresjon: spill med én ball, spillerne er låst i sonene, men angripere kan følge pasningen sin og skape overtall eller løp i bakrom.",
    coachingPoints: [
      "Drible når du har 1v1-fordel",
      "Se etter riktig øyeblikk for kombinasjon",
      "Beveg deg videre etter pasning for å skape overtall",
      "Forsvarerne må lese når de skal presse og dekke"
    ],
    variations: [
      "Start med tre rene 1v1-er før du slipper inn én ball",
      "Tillat scoring i alle mål når én-ball-progresjonen starter",
      "La angripere følge pasningen inn i neste sone"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 7 – In Zones - Vertical'"
  },
  {
    id: "smallsided-7",
    exerciseNumber: 250,
    name: "3v3 Midtbanespill",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 14,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "To spillere fra hvert lag er låst til hver sin halvdel. Den tredje spilleren på hvert lag er fri mellom sonene og fungerer som lagets midtbanespiller i både angrep og forsvar.",
    coachingPoints: [
      "Midtbanespilleren må velge hvem som skal hjelpes og hvor støtten skal gis",
      "Vær bevisst på 1v1-, 2v1- og 2v2-situasjonene som oppstår",
      "Hold hodet oppe og les neste aksjon tidlig",
      "Skap balanse mellom støtte fremover og dekning bakover"
    ],
    variations: [
      "Roter hvem som er fri midtbanespiller",
      "Spill uten fast midtbane, men krev at minst én spiller blir igjen i hver halvdel",
      "Begrens den frie spilleren til to touch"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 8 – Midfielder Game'"
  },
  {
    id: "smallsided-8",
    exerciseNumber: 252,
    name: "3v3 Endesoner",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller"],
    description: "Score ved å motta ball i kontroll i motstanderens endesone. Ingen kan stå og vente i sonen.",
    coachingPoints: [
      "Timing i løpene inn i sonen",
      "Pasningen må være presis",
      "Kontroll er nøkkelen",
      "Bakrom-løp bak forsvarer"
    ],
    variations: [
      "Må drible inn i sonen",
      "2 berøringer",
      "Minst 4 pasninger først"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 13 – End Zones'"
  },
  
  // ===== 3v3 OVERGANGER (Prickett) =====
  {
    id: "smallsided-9",
    exerciseNumber: 253,
    name: "3v3 Tre-spillers overgang",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 9,
    playersMax: 18,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Tre lag på tre spillere. Ett lag angriper, ett lag forsvarer, og det tredje laget venter bak målet. Når forsvarslaget vinner ballen eller får ny ball fra trener, angriper de neste lag umiddelbart mens laget som mistet går av banen.",
    coachingPoints: [
      "Angrip raskt når momentet skifter",
      "Bruk bevegelse og støtte for å holde overgangen flytende",
      "Vær klar til å avslutte før motstanderen organiserer seg",
      "Neste lag må lese når de skal inn og når de skal av"
    ],
    variations: [
      "Ved scoring får angripende lag ny overgang og angriper motsatt vei",
      "La lagene velge om de vil forsvare med tre utespillere eller to og keeper",
      "Start ny overgang med coach-ball hvis ballen går ut"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 12 – Three Player Transition'"
  },
  {
    id: "smallsided-10",
    exerciseNumber: 256,
    name: "3v2 Kontring med outlet",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "3v2-angrep med en kontringsutgang. Hvis de to forsvarerne vinner ballen, kan de spille frem på outlet-spilleren og følge etter for et raskt fremoverløp og en ett-touch-avslutning.",
    coachingPoints: [
      "Utnytt 3v2-overtallet uten å miste balansen",
      "Vær bevisst på restforsvar selv når laget angriper",
      "Outlet-spilleren må flytte seg til effektivt mottaksrom",
      "Kontringen må gå fremover med få touch"
    ],
    variations: [
      "Krev ett-touch-avslutning etter tilbakespill fra outlet",
      "La angripende lag beholde én sikringsspiller",
      "Legg til keeper for tydeligere avslutningsbilde"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 22 – Counter-Punch'"
  },
  {
    id: "smallsided-11",
    exerciseNumber: 259,
    name: "Sekvens med hurtige overganger",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 5,
    playersMax: 10,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Sekvensøvelse med stigende overtall og undertall: 1v0-angrep, umiddelbar 2v1 andre veien, deretter 3v2 tilbake. Når sekvensen er ferdig, starter motsatt lag en ny bølge.",
    coachingPoints: [
      "Les overgangen tidlig og spill fremover med en gang",
      "Utnytt overtall før motstanderen rekker å sette seg",
      "Forsvareren må kjøpe tid til neste spiller kommer inn",
      "Spillerne må være klare på neste rolle i sekvensen"
    ],
    variations: [
      "Bruk alternativ sekvens: 1v0, 1v1, 2v1, 2v2, 3v2, 3v3",
      "Avslutt hver bølge innen en tidsgrense",
      "Bytt startlag etter hver serie"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 35 – Quick Transitions'"
  },
  {
    id: "smallsided-12",
    exerciseNumber: 261,
    name: "3v3 Tilbaketrekning",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "3v1-angrep der to forsvarere starter på etterskudd og trigges til returløp når angriperne passerer halvveis eller når trenerens valgte trigger inntreffer.",
    coachingPoints: [
      "Første forsvarer må forsinke angrepet",
      "Returløpene må ha gode vinkler inn mot mål og ball",
      "Avstanden mellom forsvarere og angripere avgjør om hjelpen rekker frem",
      "Kommuniser hvem som presser og hvem som dekker rom"
    ],
    variations: [
      "Bytt trigger til første pasning fra angripende lag",
      "Bruk tidsgrense før hjelperne får gå",
      "La samme oppsett gå med ny 3v1 etter hver avslutning"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 23 – Recovery Runs'"
  },
  
  // ===== 3v3 SPESIELLE BANER (Prickett kap. 6) =====
  {
    id: "smallsided-13",
    exerciseNumber: 263,
    name: "3v3 Bakovervendte mål",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 små mål"],
    description: "Målene snudd med åpningen bort. Må komme rundt og skyte inn bakfra. Krever gjennombrudd.",
    coachingPoints: [
      "Må komme rundt - ikke skyte fra avstand",
      "Finter og retningsendringer",
      "Timing mellom målene",
      "Balansegang dribling/pasning"
    ],
    variations: [
      "Legg til endesoner bak",
      "4v4",
      "2 berøringer i egen halvdel"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 16 – Reversed Goals'"
  },
  {
    id: "smallsided-14",
    exerciseNumber: 14,
    name: "3v3 Seks mål",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "overgang",
    equipment: ["Kjegler", "Vester", "Baller", "6 små mål"],
    description: "Seks små mål spredt på banen. Begge lag kan score i alle. Krever årvåkenhet.",
    coachingPoints: [
      "Hold hodet oppe - se alle mål",
      "Raske vendinger",
      "Kommunikasjon: 'Der er åpent!'",
      "Hvem markerer hvem?"
    ],
    variations: [
      "Noen mål gir mer poeng",
      "Ikke samme mål to ganger",
      "3v3 + 2 jokere"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '6: Pitch Types 4 – Six-Goal Game'"
  },
  {
    id: "smallsided-15",
    exerciseNumber: 265,
    name: "3v3 Ishockeyspill",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Lov å spille bak målene (som ishockey). Kreativt spill fra uventede vinkler.",
    coachingPoints: [
      "Utnytt rommet bak mål",
      "Timing på innlegg fra baksiden",
      "Forsvar: Hvem følger bak?",
      "Skudd fra alle vinkler"
    ],
    variations: [
      "Legg til keeper",
      "Må via bak-mål før scoring",
      "4v4"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 15 – Ice Hockey'"
  },
  {
    id: "smallsided-16",
    exerciseNumber: 268,
    name: "3v3 Magisk firkant",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "gjennombrudd",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Liten firkant i midten. Ballen må gjennom firkanten før scoring.",
    coachingPoints: [
      "Spill gjennom midten",
      "Trekk forsvarere ut",
      "Når er firkanten åpen?",
      "Rask omstilling etter"
    ],
    variations: [
      "To firkanter",
      "Kun dribling teller",
      "2 berøringer"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 32 – Magic Square'"
  },
  {
    id: "smallsided-17",
    exerciseNumber: 271,
    name: "3v3 Diamant-bane",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "smålagsspill",
    equipment: ["Kjegler", "Vester", "Baller", "4 små mål"],
    description: "Diamantformet bane med mål i hver spiss. Uvanlig form gir nye situasjoner.",
    coachingPoints: [
      "Tilpass spillet til formen",
      "Vinkler blir annerledes",
      "Les rommet",
      "Kreativ bruk av kantene"
    ],
    variations: [
      "Kun 2 mål aktive",
      "Roter hvilke mål som gjelder",
      "3 berøringer"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '6: Pitch Types 14 – Diamond Pitch'"
  },
  
  // ===== 3v3 PRESSING OG FORSVAR (Prickett) =====
  {
    id: "smallsided-18",
    exerciseNumber: 273,
    name: "3v3 Press og sikring",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "pressing",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Fokus på at første mann presser og andre sikrer. Trener roterer og gir poeng for god pressing.",
    coachingPoints: [
      "Første mann: Press ballsiden",
      "Andre mann: Sikre rommet bak",
      "Kommunikasjon: 'Jeg tar!' 'Jeg sikrer!'",
      "Bytting av roller"
    ],
    variations: [
      "Poeng for ballvinning i visse soner",
      "Tidsbegrensning på press",
      "4v4"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 26 – Press and Cover'"
  },
  {
    id: "smallsided-19",
    exerciseNumber: 275,
    name: "3v3 Forsvare midten",
    tags: ["prickett-3v3-coaching-2018"],
    category: "game",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "pressing",
    equipment: ["Kjegler", "Vester", "Baller", "2 mål"],
    description: "Forsvaret får bonuspoeng for å hindre spill gjennom midtsonen. Angrepet får poeng for gjennomspill.",
    coachingPoints: [
      "Forsvar: Steng midten!",
      "Angrep: Lokk og spill gjennom",
      "Kommunikasjon i forsvarsrekka",
      "Kompakthet"
    ],
    variations: [
      "Større/mindre midtsone",
      "Kun pasning gjennom teller",
      "Legg til nøytrale"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '4: Why 3v3? 33 – Defend The Middle'"
  },
  
  // ===== EKSTRA RONDO-VARIANTER =====
  {
    id: "smallsided-46",
    exerciseNumber: 46,
    name: "Mini-rondo i firkant",
    tags: ["prickett-3v3-coaching-2018"],
    category: "rondo",
    duration: 10,
    playersMin: 5,
    playersMax: 8,
    theme: "rondo",
    equipment: ["Kjegler", "Baller"],
    description: "Fire på hjørner, én i midten. Den som mister bytter. Enkel oppvarming.",
    coachingPoints: [
      "Bevegelse til ledig side",
      "Førstetouch bort fra press",
      "Kommunikasjon",
      "Press: Styr mot hjørne"
    ],
    variations: [
      "1-touch",
      "5 ute, 1-2 inne",
      "To baller"
    ],
    source: "prickett",
    sourceRef: "Prickett 2018 '2: Warming Up, Square 12 – Mini Rondo'"
  },
];

export const prickettExercises: ExerciseData[] = basePrickettExercises.map((exercise): ExerciseData => ({
  ...exercise,
  imageUrl: exercise.imageUrl ?? prickettImageById[exercise.id],
}));
