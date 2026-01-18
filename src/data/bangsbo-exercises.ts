// Øvelser fra "Forsvar" av Jens Bangsbo og Birger Peitersen
// Kilde: Jens Bangsbo & Birger Peitersen - "Forsvar" (2002) - Dansk forsvarsspill-metodikk

import type { ExerciseData } from './exercises';

export const bangsboExercises: ExerciseData[] = [
  // === KAPITTEL 1: INDIVIDUELT FORSVARSSPILL ===
  {
    id: "bangsbo-ind-1",
    exerciseNumber: 399,
    name: "Passiv Pressing på Pasning",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "A1 spiller til A2 som mottar ballen. B starter pressing idet pasningen spilles. B beveger seg kontrollert mot A2 med fokus på timing og kroppsstilling. A2 spiller ballen tilbake når B er nær.",
    coachingPoints: [
      "Gå kontrollert mot motstanderen med ballen",
      "Reduser hastigheten og senk tyngdepunktet de siste meterne",
      "Hold blikket på ballen, ikke på kroppen",
      "Plasser deg slik at motstanderen presses mot sidelinje eller bakover"
    ],
    variations: [
      "Øk tempo gradvis",
      "Varier startavstand mellom B og A2",
      "Legg til krav om at A2 må forsøke å snu"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 3 (Figur 17) (txt:561)"
  },
  {
    id: "bangsbo-ind-2",
    exerciseNumber: 402,
    name: "Pressing med Retningsbestemmelse",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 8,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "A1 spiller til A2. B presser idet pasningen spilles og forsøker å tvinge A2 mot en bestemt side (høyre eller venstre). Fokus på å lukke pasningslinjer og styre motstanderen.",
    coachingPoints: [
      "Tilnærm deg motstanderen i en kurvet løpsbane",
      "Posisjonér deg slik at du stenger den ene pasningslinjen",
      "Hold lav kroppsstilling for hurtige retningsendringer",
      "Vær tålmodig - ikke stup inn"
    ],
    variations: [
      "Bestem på forhånd hvilken side motstanderen skal tvinges",
      "Legg til en tredje angrepsspiller som mål",
      "Gjør det til 1v1 med mål"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 1 (Figur 15) (txt:539)"
  },
  {
    id: "bangsbo-ind-3",
    exerciseNumber: 405,
    name: "Individuell Takling",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 10,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "1v1 i avgrenset felt. Angriperen starter med ball og forsøker å drible forbi forsvareren til motsatt linje. Forsvareren jobber med timing av takling.",
    coachingPoints: [
      "Vent på riktig øyeblikk - når motstanderen har dårlig kontroll",
      "Gå inn med bestemthet når du takler",
      "Hold lav stilling og bruk hele kroppen",
      "Gjenvinningsfase: følg opp umiddelbart etter balltap"
    ],
    variations: [
      "Utvid feltet for mer løpsdueller",
      "Legg til tidsbegrensning",
      "Poengsystem: 1 poeng for vellykket takling, 2 for ballvinning"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 2 (Figur 16) (txt:550)"
  },

  // === KAPITTEL 2: SIKRING OG STØTTE ===
  {
    id: "bangsbo-sikring-1",
    exerciseNumber: 475,
    name: "Sikring i 2v1",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "To forsvarere mot én angriper. B1 presser ballføreren mens B2 sikrer. Fokus på riktig avstand og vinkel mellom forsvarerne. Angriperen forsøker å komme seg forbi begge.",
    coachingPoints: [
      "B1: Press aktivt og tving til én side",
      "B2: Hold sikringsposisjon - ikke for langt unna eller for nær",
      "Kommuniser: 'Jeg sikrer deg'",
      "Sikringsspilleren skal kunne ta over om B1 blir passert"
    ],
    variations: [
      "Utvid til 2v2 hvor andre angriper løper støtte",
      "Legg til mål - forsvarerne må beskytte",
      "Varier startposisjoner"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Illustrasjon av spilløvelse 2 (Figur 77) (txt:3036)"
  },
  {
    id: "bangsbo-sikring-2",
    exerciseNumber: 409,
    name: "Sikringskjede i 3v2",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Tre forsvarere mot to angripere. Øvelse i å bygge sikringskjede hvor den som er nærmest ballen presser, neste sikrer, og tredje balanserer. Rotér ved pasning.",
    coachingPoints: [
      "Den nærmeste presser alltid",
      "Sikringsspilleren dekker rommet bak pressende spiller",
      "Tredje forsvarer leser spillet og balanserer",
      "Hele kjeden må flytte seg som én enhet ved pasning"
    ],
    variations: [
      "3v3 for mer realistisk press",
      "4v3 for økt forsvarstrykk",
      "Legg til scoringssoner"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 2 (Figur 55) (txt:2099)"
  },
  {
    id: "bangsbo-sikring-3",
    exerciseNumber: 413,
    name: "Støtte ved Ballvinning",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "småmål"],
    description: "Når forsvarer vinner ballen, skal lagkameraten umiddelbart tilby støtte. Øvelse i overgang fra forsvar til angrep med fokus på hurtig støttespill.",
    coachingPoints: [
      "Ved ballvinning: Nærmeste lagkamerat tilbyr seg umiddelbart",
      "Støttespilleren plasserer seg i pasningsvinkel",
      "Rask omstilling i hodet: fra forsvar til angrep",
      "Kommunikasjon: 'Tid!' eller 'Snu!'"
    ],
    variations: [
      "Poengsystem for raske overganger",
      "Legg til mål å angripe etter ballvinning",
      "Tidsbegrensning på overgangsfasen"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 4 (Figur 25) (txt:922)"
  },

  // === KAPITTEL 3: SONEFORSVAR OG MANNDEKNING ===
  {
    id: "bangsbo-sone-1",
    exerciseNumber: 249,
    name: "4-manns Soneforsvarslinje",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Fire forsvarere øver på å holde linjen og flytte seg som enhet. Tre angripere spiller ball på tvers mens forsvarerne justerer posisjoner. Fokus på kompakthet og timing.",
    coachingPoints: [
      "Hold avstanden til medspillere konstant (10-15m)",
      "Hele linjen flytter seg mot ballen",
      "Kommuniser: 'Stram inn!' eller 'Ut!'",
      "Ved gjennomspill: Nærmeste går ut, resten sikrer"
    ],
    variations: [
      "Legg til innlegg som forsvarerne skal klarere",
      "Utvid til full forsvarsrekke med keeper",
      "3 mot 4 spill med offside-linje"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 1 (Figur 10) (txt:363)"
  },
  {
    id: "bangsbo-sone-2",
    exerciseNumber: 251,
    name: "Soneforsvar i Firkant",
    category: "game",
    duration: 20,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Fire forsvarere i firkantformasjon forsvarer mot fire angripere. Fokus på å stenge sentralt rom og tvinge spillet ut på kantene.",
    coachingPoints: [
      "Stengt sentralt rom er prioritet nummer én",
      "Press på kantspiller, sikring sentralt",
      "Flytt firkanten som én enhet mot ball",
      "Ved dybdeløp: Nærmeste følger, resten sikrer"
    ],
    variations: [
      "5v4 for økt press på forsvarerne",
      "Legg til mål med keeper",
      "Scoringssoner i hjørnene (angripernes mål)"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 2 (Figur 39) (txt:1405)"
  },
  {
    id: "bangsbo-mann-1",
    exerciseNumber: 9,
    name: "Manndekning med Overlevering",
    category: "game",
    duration: 18,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Forsvarere følger sin mann, men overleverer ved kryssløp i egne soner. Øvelse i å kommunisere 'Jeg tar!' og 'Din!'",
    coachingPoints: [
      "Følg din mann tett, men ikke blindt",
      "Ved kryssløp: Kommuniser tidlig",
      "Overlevering skjer i sonen, ikke utenfor",
      "Ha alltid øyekontakt med både mann og ball"
    ],
    variations: [
      "Sett poengsystem for vellykkede overleveringer",
      "Utvid til 4v4 med komplekse løp",
      "Legg til innlegg som avslutning"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-kombinert-1",
    exerciseNumber: 255,
    name: "Kombinert Sone- og Manndekning",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Soneforsvar i ytre soner, manndekning i farlige soner. Forsvarerne øver på å bytte mellom systemer avhengig av ballens plassering.",
    coachingPoints: [
      "I ytre soner: Hold posisjon, les spillet",
      "I sentrale soner: Tett mann, ikke slipp",
      "Bytte av system skjer ved definerte linjer",
      "Kommunikasjon er nøkkelen til sømløse overganger"
    ],
    variations: [
      "Varier sonene for overgang",
      "Legg til kontringsmål for forsvarerne",
      "Øk antall angripere for press"
    ],
    source: "bangsbo"
  },

  // === KAPITTEL 4: PRESSING ===
  {
    id: "bangsbo-pressing-1",
    exerciseNumber: 258,
    name: "Høyt Press i 3v3",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Tre forsvarere presser høyt mot tre angripere som bygger opp fra keeper. Fokus på å stenge pasningslinjer og tvinge feil.",
    coachingPoints: [
      "Press som en enhet - ikke alene",
      "Steng pasningslinjer, ikke bare løp mot ballen",
      "Trigger: Dårlig touch eller pasning bakover",
      "Hvis presset brytes, fall tilbake kontrollert"
    ],
    variations: [
      "4v3 pressing for mer intensitet",
      "Legg til tidsbegrensning på oppbyggingsspill",
      "Poengsystem for ballvinning i pressingsone"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-pressing-2",
    exerciseNumber: 260,
    name: "Mellomromspressing",
    category: "game",
    duration: 18,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Forsvarslag lar angriperne spille seg opp til midtbanen, deretter aktiverer de pressing. Øvelse i kontrollert tilbaketrekning og koordinert pressing.",
    coachingPoints: [
      "Hold kompakt formasjon under tilbaketrekningen",
      "Trigger for pressing: Ball spilles inn i vår sone",
      "Første forsvarer setter retning, resten stenger",
      "Mål: Tvinge ballen tilbake eller ut på kant"
    ],
    variations: [
      "Varier pressingstriggeren",
      "Legg til scoringsoner for begge lag",
      "Øk presset med undertallige angripere"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-pressing-3",
    exerciseNumber: 262,
    name: "Lavt Forsvar med Kontringsutløsning",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 22,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Forsvarslaget ligger lavt og kompakt, forsvarer målet. Ved ballvinning skal de kontringsspillere være klare. Fokus på tålmodighet og eksplosiv overgang.",
    coachingPoints: [
      "Lavt forsvar: Hold linjen, ikke fall for finter",
      "Blokkér skudd og innlegg",
      "Ved ballvinning: Første touch fremover",
      "Kontringsspillere starter løpet i det ballen vinnes"
    ],
    variations: [
      "Tidsbegrensning for angrep før poeng til forsvar",
      "Bonus for kontringsscoringer",
      "Varier antall kontringsspillere"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 1 (Figur 79) (txt:3131)"
  },

  // === KAPITTEL 4.2: OFFSIDEFELLEN ===
  {
    id: "bangsbo-offside-1",
    exerciseNumber: 430,
    name: "Koordinert Offside-linje",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Fire forsvarere øver på å flytte linjen opp i riktig øyeblikk for å sette angripere offside. Fokus på timing og kommunikasjon.",
    coachingPoints: [
      "Linjens leder kommanderer 'Opp!'",
      "Alle beveger seg samtidig - én som er sen ødelegger fellen",
      "Timing: Akkurat idet pasningen slås",
      "Hvis usikker, stå - ikke gamble"
    ],
    variations: [
      "Legg til varierende pasninger (kort/lang)",
      "Øv med keeper som siste sikkerhet",
      "Kombiner med sekkeløp ved gjennomspill"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 1 (Figur 94) (txt:4181)"
  },
  {
    id: "bangsbo-offside-2",
    exerciseNumber: 433,
    name: "Offsidelinje med Dybdeforsvarer",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Tre forsvarere holder linjen mens én forsvarer er dypere som sikkerhet. Øvelse i å kombinere offsidefelle med ekstra sikring.",
    coachingPoints: [
      "Dybdeforsvareren dekker rom bak linjen",
      "Linjen stoler på at dybdeforsvareren er der",
      "Ved gjennomspill: Dybdeforsvareren tar over",
      "Kommunikasjon mellom linje og dybdeforsvarer"
    ],
    variations: [
      "Rotér dybdeforsvarerrollen",
      "Legg til hurtige angripere",
      "Kombiner med keeperutrykking"
    ],
    source: "bangsbo"
  },

  // === KAPITTEL 5: FORSVARSSPILL I ULIKE SONER ===
  {
    id: "bangsbo-formsone-1",
    exerciseNumber: 266,
    name: "Forsvar i Farlighetsgrad 1-sone",
    category: "game",
    duration: 18,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Forsvarsspill i lite farlig sone (langt fra eget mål). Fokus på å forsinke og styre angrepet. Mindre risiko, mer kontroll.",
    coachingPoints: [
      "Forsinke, ikke hastevinne",
      "La angriperne ha ballen men kontroller retningen",
      "Hold kompakt - ikke stretch ut",
      "Kjøp tid for lagkamerater å komme i posisjon"
    ],
    variations: [
      "Tidsbegrensning før forsvarerne får poeng",
      "Legg til mål for angriperne å nå",
      "Varier antall forsvarere"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-formsone-2",
    exerciseNumber: 269,
    name: "Forsvar i Farlighetsgrad 3-sone",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Forsvarsspill i høyrisikosone (nær eget mål). Fokus på å vinne ballen, blokkere skudd og ikke gi rom. Høy intensitet.",
    coachingPoints: [
      "Prioriter å blokkere skudd foran alt annet",
      "Tett manndekning i boksen",
      "Klarering: Høyt, bredt eller langt - aldri sentralt",
      "Vær klar for andre baller"
    ],
    variations: [
      "Innleggssituasjoner",
      "Dødballsforsvar",
      "1v1 i boks"
    ],
    source: "bangsbo"
  },

  // === SPILLØVELSER (STØRRE FORMAT) ===
  {
    id: "bangsbo-spill-1",
    exerciseNumber: 272,
    name: "6v6 Soneforsvarsspill",
    category: "game",
    duration: 25,
    playersMin: 14,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "To lag spiller på halv bane med fulle mål. Forsvarslaget øver på kompakt soneforsvar med fokus på å stenge rom og tvinge feil.",
    coachingPoints: [
      "Hele laget flytter seg mot ballen",
      "Hold 10-15m mellom forsvarslinjene",
      "Kommunikasjon: Hvem presser, hvem sikrer",
      "Ved ballvinning: Rask overgang"
    ],
    variations: [
      "Poengsystem for lave ballvinninger",
      "Undertallig forsvar for økt press",
      "Tidsbegrensning på angrep"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-spill-2",
    exerciseNumber: 274,
    name: "8v8 med Pressingssoner",
    category: "game",
    duration: 30,
    playersMin: 18,
    playersMax: 22,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Banen deles i tre soner. Forsvarslaget bestemmer hvor de vil presse (høyt, midt eller lavt). Angrepslaget må spille seg gjennom sonene.",
    coachingPoints: [
      "Hele laget enige om pressingshøyde",
      "Trigger for pressing må være tydelig",
      "Hvis presset brytes, reorganiser raskt",
      "Overgangsfaser: Fra forsvar til angrep og motsatt"
    ],
    variations: [
      "Coach roper hvilken sone som skal presses",
      "Rotér pressingsstrategi hvert 5. minutt",
      "Bonus for ballvinning i høy sone"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 1 (Figur 89) (txt:3895)"
  },
  {
    id: "bangsbo-spill-3",
    exerciseNumber: 276,
    name: "Catenaccio-øvelse: 5-4-1 Lavblokk",
    category: "game",
    duration: 25,
    playersMin: 12,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Inspirert av italiensk catenaccio. Forsvarslaget setter opp 5-4-1 og forsvarer dypt. Fokus på tålmodighet, posisjonering og kontringsberedskap.",
    coachingPoints: [
      "Fembacklinje: Alltid minst tre spillere i boksen",
      "Midtbanefire: Steng midten, tving ut på kantene",
      "Spissspiller: Hold seg fremme for kontringsmulighet",
      "Tålmodighet: Ikke hopp ut av posisjon"
    ],
    variations: [
      "Tidsbegrensning: Forsvar må holde nullen i X minutter",
      "Legg til ekstra angriper for økt press",
      "Kontringsscoringer teller dobbelt"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-spill-4",
    exerciseNumber: 278,
    name: "Forsvar mot Innlegg",
    category: "game",
    duration: 20,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Angrepslag spiller seg ut på kanten og slår innlegg. Forsvarere øver på posisjonering, klarering og dueller i luften.",
    coachingPoints: [
      "Første stolpe-forsvarer: Dekk nærmeste rom",
      "Sentralforsvarer: Vær klar for heading",
      "Bakre forsvarer: Dekk bakerste stolpe",
      "Keeper: Kommuniser og ta det du kan ta"
    ],
    variations: [
      "Varier innleggstyper (lavt, høyt, tilbaketrukket)",
      "Legg til andre baller",
      "Øv med forskjellige antall angripere i boksen"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-spill-5",
    exerciseNumber: 282,
    name: "Forsvar i Undertall",
    category: "game",
    duration: 18,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "2v3 eller 3v4 forsvarssituasjoner. Forsvarerne øver på å forsinke angrepet og dekke de farligste løpene.",
    coachingPoints: [
      "Forsinke er viktigere enn å vinne ball",
      "Dekk sentralt rom og nærmeste angriper",
      "Tvinge angrepet bredt og bakover",
      "Kjøp tid til lagkamerater kommer"
    ],
    variations: [
      "Varier undertallssituasjonen",
      "Legg til tidsbegrensning for angriperne",
      "Poengsystem for forsinkelse uten mål"
    ],
    source: "bangsbo"
  },

  // === SPESIALISERINGØVELSER ===
  {
    id: "bangsbo-spesiell-1",
    exerciseNumber: 445,
    name: "Midtstopperens Leserskap",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Midtstopperen øver på å lese spillet og dirigere forsvarslinjen. Fokus på kommunikasjon og posisjoneringsledelse.",
    coachingPoints: [
      "Konstant kommunikasjon: 'Stram inn', 'Ut', 'Hold'",
      "Les pasninger før de spilles",
      "Organiser linjen - du er sjefen",
      "Ta ansvar for sikringsposisjonen"
    ],
    variations: [
      "Lydløs variant - kun håndbevegelser",
      "Øk tempoet for raskere beslutninger",
      "Legg til situasjoner med keeper-kommunikasjon"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-spesiell-2",
    exerciseNumber: 448,
    name: "Backs som Går Ut",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Sideback øver på timing for å gå ut og presse kantspiller. Fokus på å stenge innlegg og tvinge innover.",
    coachingPoints: [
      "Timing: Gå ut idet kantspiller mottar med dårlig touch",
      "Vinkel: Tving innover mot hjelp, eller ut mot linjen",
      "Etter pressing: Kom deg tilbake i linje raskt",
      "Kommuniser med midtstopper om dekning"
    ],
    variations: [
      "Legg til innleggssituasjoner",
      "2v1 på kant med sikringsspiller",
      "Full flankesituasjon med innlegg"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-spesiell-3",
    exerciseNumber: 450,
    name: "Defensiv Midtbanes Skjerming",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Defensiv midtbane øver på å skjerme rom foran forsvarslinjen. Fokus på posisjonering mellom linjer og ballvinning.",
    coachingPoints: [
      "Plassering: Steng pasningslinjer inn i farlige rom",
      "Les spillet: Vær der ballen kommer, ikke der den er",
      "Ballvinning: Timing og kraft",
      "Etter ballvinning: Spill enkelt og sikkert"
    ],
    variations: [
      "To defensive midtbanere i samarbeid",
      "Øk antall angripere for mer press",
      "Legg til scoringsoner"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 1 (Figur 74) (txt:2818)"
  },

  // === DØDBALL-FORSVAR ===
  {
    id: "bangsbo-dodball-1",
    exerciseNumber: 453,
    name: "Forsvar ved Hjørnespark",
    category: "station",
    duration: 15,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Øvelse på posisjonering og ansvarsfordeling ved hjørnespark. Kombiner soneplassering med manndekning på farlige angripere.",
    coachingPoints: [
      "Stolpemannen: Eier første og bakre stolpe",
      "Keeperen: Kommander og ta det du kan ta",
      "Sonefolk: Hold posisjon, angrip ballen",
      "Manndekkere: Ikke slipp din mann"
    ],
    variations: [
      "Varier hjørnesparkstyper (kort, lang, innsvinger, utsvinger)",
      "Øv på klarering og andre baller",
      "Legg til kontringssituasjon etter klarering"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-dodball-2",
    exerciseNumber: 458,
    name: "Forsvar ved Frispark Sentralt",
    category: "station",
    duration: 15,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Murplassering og forsvar ved direkte frispark. Fokus på murens rolle og spillerne som dekker andre innspillsmuligheter.",
    coachingPoints: [
      "Muren: Stå i ro, hopp ikke før skudd",
      "Keeperen: Plasser muren, ta ansvar for din side",
      "Utenfor muren: Dekk korte varianter",
      "Andre baller: Vær forberedt på returer"
    ],
    variations: [
      "Varier avstanden fra mål",
      "Øv på korte varianter",
      "Legg til keeper-mur kommunikasjon"
    ],
    source: "bangsbo"
  },

  // === OPPVARMINGSØVELSER MED FORSVARSFOKUS ===
  {
    id: "bangsbo-oppvarming-1",
    exerciseNumber: 28,
    name: "Speil-øvelse",
    category: "warmup",
    duration: 8,
    playersMin: 8,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler"],
    description: "Par står overfor hverandre. Én leder, én speiler bevegelsene. Fokus på lavt tyngdepunkt og raske retningsendringer som forsvarere.",
    coachingPoints: [
      "Hold lavt tyngdepunkt hele tiden",
      "Raske, korte steg",
      "Øynene på motstanderen",
      "Vær klar for retningsskift"
    ],
    variations: [
      "Legg til at lederen har ball",
      "Øk tempoet",
      "Bytt roller på signal"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-oppvarming-2",
    exerciseNumber: 29,
    name: "Skyggeløp",
    category: "warmup",
    duration: 8,
    playersMin: 8,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler"],
    description: "Par løper, den ene foran (angriper) og den andre bak (forsvarer). Forsvareren holder avstand på 1-2m og følger alle retningsendringer.",
    coachingPoints: [
      "Hold øyekontakt med hoftene til den foran",
      "Korte, raske steg for å følge retningsendringer",
      "Ikke kom for nær - hold avtalt avstand",
      "Forbered deg på plutselige stopp"
    ],
    variations: [
      "Varier avstanden",
      "Legg til signal for forsvareren å gå inn i takling",
      "La angriperen ha ball"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-oppvarming-3",
    exerciseNumber: 30,
    name: "1v1 Bokser",
    category: "warmup",
    duration: 10,
    playersMin: 8,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Små bokser (5x5m) med 1v1. Angriperen forsøker å holde ballen i boksen, forsvareren forsøker å sparke den ut. Oppvarming for taklinger.",
    coachingPoints: [
      "Hold lavt - vær klar for alle retninger",
      "Timing på takling: Når angriperen har dårlig touch",
      "Vær tålmodig - ikke stup inn for tidlig",
      "Bruk kroppen for å skjerme ballen ut"
    ],
    variations: [
      "Øk boksens størrelse",
      "Tidsbegrensning",
      "Poengsystem"
    ],
    source: "bangsbo"
  },

  // === FLERE ØVELSER FRA KAPITTEL 1: DEKNING OG MARKERING ===
  {
    id: "bangsbo-dekning-1",
    exerciseNumber: 31,
    name: "Dekning med Posisjonering",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 10,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "1/5 av banen med tre soner. Forsvarer (3) dekker angriper (10). Pasningsgiver (7) spiller til 10 som forsøker å drible forbi 3 og score.",
    coachingPoints: [
      "Posisjonér deg mellom ball og mål",
      "Hold øyekontakt med både ball og angriper",
      "Vurder avstand: For nær = kan snus, for langt = kan snu og skyte",
      "Nærm deg kontrollert - ikke spring ukontrollert"
    ],
    variations: [
      "10 kan spille vegg med 7",
      "Reduser sonen så 10 bare er i 16m",
      "Legg til tidsbegrensning"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 1 (Figur 6) (txt:233)"
  },
  {
    id: "bangsbo-dekning-2",
    exerciseNumber: 32,
    name: "Dekningsposisjon ved Vinkel",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 8,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Øvelse der forsvareren lærer å posisjonere seg basert på vinkel mellom ball, angriper og mål. Når ballen er sentralt = stå bak. Når ballen er på siden = stå ved siden.",
    coachingPoints: [
      "Ball sentralt = posisjonér deg mellom angriper og mål",
      "Ball på siden = posisjonér deg på siden av angriper mot ballen",
      "Hold begge (ball og angriper) i synsfeltet",
      "Vær klar til å avskjære pasningen"
    ],
    variations: [
      "Varier startposisjoner",
      "Legg til scoring på småmål",
      "Øv på ulike soner av banen"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 2 (Figur 39) (txt:1405)"
  },
  {
    id: "bangsbo-dekning-3",
    exerciseNumber: 464,
    name: "Forsvarsposisjon og Kroppsstilling",
    category: "station",
    duration: 10,
    playersMin: 4,
    playersMax: 10,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Fokus på korrekt forsvarsposisjon: Lavt tyngdepunkt, bøyde knær og hofter, én fot foran den andre, kroppen vendt mot ballføreren.",
    coachingPoints: [
      "Leddene i mellomposisjon (knær og hofter lett bøyd)",
      "Én fot foran den andre for rask retningsendring",
      "Kroppen vendt mot ballføreren",
      "Armene ute for balanse"
    ],
    variations: [
      "Øv statisk først, deretter med bevegelse",
      "Legg til angriper som forsøker å passere",
      "Konkurranseform: Hvem holder best posisjon?"
    ],
    source: "bangsbo"
  },

  // === KAPITTEL 2: STØTTE OG SIKRING (FLERE) ===
  {
    id: "bangsbo-stotte-4",
    exerciseNumber: 34,
    name: "Støttespiller i Sone",
    category: "station",
    duration: 15,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "3 soner med støttespiller (4) i sone 1, forsvarer (3) og angriper (10) i sone 2. Når 10 passerer 3, må 4 angripe før 10 kommer til skudd.",
    coachingPoints: [
      "Støttespilleren holder seg nær nok til å angripe raskt",
      "Ikke for nær - da kan 10 spille i bakrom",
      "Kommuniser med 3 om hvem som har ballen",
      "Forsinke hvis 3 kan komme tilbake"
    ],
    variations: [
      "4 starter 10m bak og må løpe seg i posisjon",
      "Legg til angriper 11 i sone 2",
      "3 kan gå inn i sone 1 hvis ballen spilles dit"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-stotte-5",
    exerciseNumber: 35,
    name: "Dobbel Støtte med Kommunikasjon",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Tre soner med to forsvarere (2,3) og to angripere (10,11). Støttespillere (5,6) i de ytre sonene. Fokus på kommunikasjon når angriper bytter sone.",
    coachingPoints: [
      "Kommunisér: 'Din!', 'Jeg tar!', 'Bytt!'",
      "Støttespilleren følger med på hvor de andre forsvarerne er",
      "Ved bytte av angriper: Overlever uten å miste øyekontakt",
      "Hold kompakt - ikke la angriperne få rom mellom"
    ],
    variations: [
      "Begrens antall touch for angriperne",
      "Legg til tidsbegrensning",
      "Varier sonestørrelser"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Illustrasjon av spilløvelse 1 (Figur 58) (txt:2186)"
  },
  {
    id: "bangsbo-stotte-6",
    exerciseNumber: 466,
    name: "Forsinke ved Dribbling",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Angriper (10) dribler mot mål. Forsvarer (3) forsøker å forsinke til støttespiller (4) rekker tilbake. Fokus på å holde avstand og styre retning.",
    coachingPoints: [
      "Hold avstand - ikke la deg passere",
      "Styr angriperen mot sidelinjen",
      "Kjøp tid for medspillere",
      "Angrip kun når angriperen har dårlig kontroll"
    ],
    variations: [
      "Varier startposisjon for støttespilleren",
      "Legg til tidsbegrensning",
      "Poengsystem for sekunder forsvareren holder"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 2 (Figur 23) (txt:830)"
  },

  // === KAPITTEL 3: RETNINGSBESTEMMELSE (FLERE) ===
  {
    id: "bangsbo-retning-3",
    exerciseNumber: 467,
    name: "Åpne og Lukke",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Forsvarer åpner én side for angriperen (inviterer inn), og lukker den igjen når angriperen går inn der. Fokus på å fange angriperen.",
    coachingPoints: [
      "Vis tydelig hvilken side som er 'åpen'",
      "Når angriperen velger den åpne siden - lukk raskt",
      "Koordinér med medspillere som venter på den siden",
      "Timing er alt - lukk i rett øyeblikk"
    ],
    variations: [
      "Legg til støttespiller som venter på den 'åpne' siden",
      "Varier hvilken side som åpnes",
      "Konkurranseform med poeng"
    ],
    source: "bangsbo"
  },
  {
    id: "bangsbo-retning-4",
    exerciseNumber: 468,
    name: "Parpress med Retningsbestemmelse",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "To forsvarere presser sammen mot én ballfører. Fokus på koordinasjon for å styre angriperen mot sidelinje eller medforsvarer.",
    coachingPoints: [
      "Kommunisér hvem som presser og hvem som sikrer",
      "Pressende forsvarer: Steng den ene siden",
      "Sikrende forsvarer: Dekk pasningslinjen",
      "Styr mot hverandre eller mot sidelinje"
    ],
    variations: [
      "Legg til angripere som kan motta pasning",
      "Varier feltets størrelse",
      "Poengsystem for vellykkede ballvinninger"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Illustrasjon av spilløvelse 1 (Figur 94) (txt:4181)"
  },
  {
    id: "bangsbo-retning-5",
    exerciseNumber: 39,
    name: "Retningsbestemmelse i 4v4",
    category: "game",
    duration: 15,
    playersMin: 8,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "småmål"],
    description: "4v4 på halv bane med 3 små mål på hver side. Forsvarerne forsøker å styre angrepet mot ett bestemt mål der de har fordel.",
    coachingPoints: [
      "Steng sidene du ikke vil at de skal spille",
      "Koordinér som lag - alle styrer samme retning",
      "Press når ballen er der du vil ha den",
      "Tålmodighet - vent på rett øyeblikk"
    ],
    variations: [
      "Varier antall mål",
      "Legg til soner",
      "Poengsystem for mål i 'ønsket' mål"
    ],
    source: "bangsbo"
  },

  // === KAPITTEL 4: FORSVARSSTIL (FLERE) ===
  {
    id: "bangsbo-stil-1",
    exerciseNumber: 315,
    name: "Lavt Forsvar med Kontring",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 22,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Laget ligger lavt og kompakt, lar motstanderen ha ballen. Ved ballvinning: Rask kontring gjennom forhåndsbestemte soner.",
    coachingPoints: [
      "Hold kompakt - aldri mer enn 10-15m mellom linjene",
      "Vent på rett øyeblikk for å vinne ballen",
      "Ved ballvinning: Første touch fremover",
      "Kontringsspillere starter løpet før ballvinning"
    ],
    variations: [
      "Varier hvor langt laget ligger",
      "Legg til tidsbegrensning for kontringen",
      "Poengsystem for rask scoring etter ballvinning"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 1 (Figur 22) (txt:796)"
  },
  {
    id: "bangsbo-stil-2",
    exerciseNumber: 41,
    name: "Høyt Forsvar med Pressing",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 22,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Laget presser høyt og forsøker å vinne ballen i motstanderens halvdel. Ved gjennombrudd: Sprint tilbake og reorganiser.",
    coachingPoints: [
      "Alle må jobbe - én som slapper av ødelegger presset",
      "Press trigger: Dårlig førstekontakt eller baklengs pasning",
      "Ved gjennombrudd: Sprint sentralt og steng farlige rom",
      "Kommunikasjon: 'Press!', 'Fall!', 'Hold!'"
    ],
    variations: [
      "Varier pressingshøyde",
      "Legg til kontringssoner",
      "Byttesystem ved baklengspress"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 4 (Figur 53) (txt:2038)"
  },

  // === KAPITTEL 5: TAKTISK TRENING ===
  {
    id: "bangsbo-taktisk-1",
    exerciseNumber: 42,
    name: "Overgangsspill Forsvar-Angrep",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 22,
    theme: "overgang",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Ved ballvinning: Første pasning må gå til forhåndsbestemt spiller. Fokus på rask omstilling fra forsvar til angrep.",
    coachingPoints: [
      "Ved ballvinning: Løft blikket umiddelbart",
      "Forhåndsbestemt mottaker gjør seg spillbar",
      "Resten av laget starter løp fremover",
      "Ikke mist ballen i overgangen"
    ],
    variations: [
      "Varier hvem som er forhåndsbestemt mottaker",
      "Legg til tidsbegrensning på kontringen",
      "Poengsystem for raske overganger"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 3 (Figur 91) (txt:3983)"
  },
  {
    id: "bangsbo-taktisk-2",
    exerciseNumber: 43,
    name: "Reorganisering etter Ballvinning hos Motstander",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 22,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Fokus på hva som skjer når vi mister ballen. Spillere 5 og 6 må bytte sone umiddelbart etter balltap.",
    coachingPoints: [
      "Umiddelbart etter balltap: Sprint mot egen forsvarssone",
      "Nærmeste spiller presser ballføreren",
      "Resten: Fall tilbake og reorganiser",
      "Kommunisér: 'Fall tilbake!', 'Press!'"
    ],
    variations: [
      "Varier hvem som må bytte sone",
      "Legg til tidsbegrensning på reorganisering",
      "Poengsystem for raske overganger"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 3 (Figur 24) (txt:872)"
  },
  {
    id: "bangsbo-taktisk-3",
    exerciseNumber: 321,
    name: "Forsinke Motangrep",
    category: "game",
    duration: 15,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Motstander kontrer. Første forsvarer forsøker å forsinke angrepet. Fokus på å kjøpe tid for medspillere.",
    coachingPoints: [
      "Ikke stup inn - hold avstand og forsinke",
      "Styr angriperen mot sidelinjen",
      "Kommunisér: 'Jeg har!', 'Kom tilbake!'",
      "Angrip kun når du har støtte"
    ],
    variations: [
      "Varier antall angripere og forsvarere",
      "Legg til tidsbegrensning",
      "Poengsystem for sekunder forsinket"
    ],
    source: "bangsbo"
  },

  // === OPPVARMINGSØVELSER (FLERE) ===
  {
    id: "bangsbo-oppvarming-4",
    exerciseNumber: 45,
    name: "Fase-oppvarming: Dekke, Støtte, Angripe",
    category: "warmup",
    duration: 12,
    playersMin: 12,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Tre faser i oppvarmingen: 1) Dekkeposisjon uten ball, 2) Støtteposisjon med ball, 3) Angrepsfase med takling.",
    coachingPoints: [
      "Fase 1: Korrekt kroppsstilling, hold posisjon",
      "Fase 2: Kommuniser med medforsvarer",
      "Fase 3: Timing på takling, gå inn med kraft",
      "Gradvis oppbygging av intensitet"
    ],
    variations: [
      "Varier lengden på hver fase",
      "Legg til konkurranseelement",
      "Kombiner med tekniske øvelser"
    ],
    source: "bangsbo"
  }
];
