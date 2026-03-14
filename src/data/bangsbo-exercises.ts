// Øvelser fra "Forsvar" av Jens Bangsbo og Birger Peitersen
// Kilde: Jens Bangsbo & Birger Peitersen - "Forsvar" (2002) - Dansk forsvarsspill-metodikk

import type { ExerciseData } from './exercises';

export const bangsboExercises: ExerciseData[] = [
  // === KAPITTEL 1: INDIVIDUELT FORSVARSSPILL ===
  {
    id: "bangsbo-ind-1",
    exerciseNumber: 399,
    name: "Dekking i sirkel",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Fire spillere står utenfor en sirkel med ball, mens to spillere er inne. I fase 1 mottar den angripende spilleren inne i sirkelen pasning og spiller tilbake, mens forsvareren følger passivt. Deretter økes presset slik at angriperen må frigjøre seg, og i siste fase konkurrerer spillerne om å motta og spille videre presist for poeng.",
    coachingPoints: [
      "Følg angriperen tett uten å miste balansen",
      "Bryt inn når pasningen eller returpasningen blir løs",
      "Som angriper: skap nok avstand til å kunne motta og spille presist tilbake",
      "Øk vanskelighetsgraden trinnvis fra passiv til aktiv dekking"
    ],
    variations: [
      "Behold bare halvparten av ballene hos spillerne utenfor sirkelen i siste fase",
      "La flere par konkurrere i samme sone",
      "Forby returpasning til samme spiller i fase 3"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 3 (Figur 17) (txt:561)"
  },
  {
    id: "bangsbo-ind-2",
    exerciseNumber: 402,
    name: "8v7 med koordinert offsidefelle",
    category: "station",
    duration: 12,
    playersMin: 15,
    playersMax: 15,
    theme: "forsvar",
    equipment: ["kjegler"],
    description: "8 mot 7 på halv bane delt i to soner med ett stort mål. Det svarte laget forsvarer målet med fem forsvarere, to midtbanespillere og keeper, mens det hvite laget angriper. Spillerne kan ikke bytte sone, og øvelsen trener koordinasjonen mellom forsvarerne når offsidefellen settes.",
    coachingPoints: [
      "Spilleren som styrer fellen må finne riktig øyeblikk for å starte bevegelsen",
      "Forsvarer 4 må vente til midtbanespilleren presser ballfører før linjen skyver opp",
      "Hele bakre ledd må være koordinert for at offsidefellen skal fungere",
      "Ved variantene må midtbanespillerne trekke hjem og dekke opp når rom åpner seg"
    ],
    variations: [
      "Tillat spillere fra sone 2 å gå inn i sone 1, men ikke i 16-meteren",
      "La innkast i sone 2 tas som frispark",
      "La innkast i sone 1 tas som corner"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 1 (Figur 15) (txt:539)"
  },
  {
    id: "bangsbo-ind-3",
    exerciseNumber: 405,
    name: "4v4 markering og balltyveri",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 8,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "I et felt på størrelse med straffefeltet har alle fire spillere på det ene laget hver sin ball, mens motstanderne markerer og prøver å vinne den. Når forsvarslaget stjeler en ball, skal spilleren drible den ut til sidelinjen og raskt tilbake i spill før han fortsetter å forsvare.",
    coachingPoints: [
      "Marker tett nok til å kunne angripe første løse touch",
      "Vinn ballen kontrollert og kom raskt ut til sidelinjen",
      "Orienter deg før gjenvinning slik at du kan returnere raskt",
      "Hold høy intensitet i overgangen mellom vinning og retur"
    ],
    variations: [
      "Bytt roller etter fastsatt tid",
      "Tell antall ballvinninger per lag",
      "Begrens tiden spilleren får på å returnere fra sidelinjen"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 2 (Figur 16) (txt:550)"
  },

  // === KAPITTEL 2: SIKRING OG STØTTE ===
  {
    id: "bangsbo-sikring-1",
    exerciseNumber: 475,
    name: "2 forsvarere mot 2 angripere i tre soner",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 4,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "To forsvarere møter to angripere på en bane delt i tre soner. Den ene forsvareren kan bare arbeide i sone 1 og 2, den andre i sone 2 og 3. Angriperne forsøker å spille eller drible seg fra sone 1 til motsatt dødlinje, mens forsvarerne skal samarbeide om å styre, forsinke og vinne ballen.",
    coachingPoints: [
      "Første forsvarer må være tålmodig og jobbe med sideveis zig-zag-bevegelser",
      "Styr angriperne mot en side hvor medspiller kan hjelpe til",
      "Andre forsvarer må lese når han skal gripe inn og når han skal vente",
      "Kommunikasjonen mellom forsvarerne er avgjørende når spillet går gjennom sone 2"
    ],
    variations: [
      "Gjør banen større",
      "Tillat at den første forsvareren også kan falle inn i sone 3 når ballen spilles dit",
      "La angriperne starte på nytt fra front hvis forsvaret vinner ballen i sone 1 eller 2"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Illustrasjon av spilløvelse 2 (Figur 77) (txt:3036)"
  },
  {
    id: "bangsbo-sikring-2",
    exerciseNumber: 409,
    name: "Soneforsvar med spillerbytte i fire kvadrater",
    category: "station",
    duration: 15,
    playersMin: 9,
    playersMax: 9,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Et 16 x 16 meters felt er delt i fire kvadrater langs sidelinjen. Fire angripere står utenfor kvadratene, fire forsvarere starter ett i hvert kvadrat, og én spiller fungerer som oppspillspunkt inne på feltet. Når ballen spilles til en sone, må de nærmeste forsvarerne forlate sine felt, mens de andre flytter inn i de feltene som blir ledige.",
    coachingPoints: [
      "Forsvarerne må bytte felt raskt når ballen skifter sone",
      "Nærmeste forsvarere går ut i press, de andre fyller ledige kvadrater",
      "Oppspillspunktet må alltid vende spillet til et nytt kvadrat",
      "Hele øvelsen avhenger av timing og kommunikasjon i spillerbyttene"
    ],
    variations: [
      "Bytt roller hvert tredje minutt",
      "Varier tempoet på spillvendingene",
      "Roter hvilke spillere som er oppspillspunkt og forsvarere"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Øvelse 2 (Figur 55) (txt:2099)"
  },
  {
    id: "bangsbo-sikring-3",
    exerciseNumber: 413,
    name: "4v4 støtte og markering i soner",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 8,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "småmål"],
    description: "4 mot 4 i straffefelt delt i fire soner med små mål på hver baklinje. Ballen kan bare spilles eller dribles til neste sone, og når en spiller dribler frem, må en lagkamerat umiddelbart fylle sonen som ble forlatt. Øvelsen trener hvordan en forsvarer forlater egen markering for å gi støtte til lagkameraten i rett øyeblikk.",
    coachingPoints: [
      "Det skal hele tiden være én spiller fra hvert lag i hver sone",
      "Gi støtte uten å miste kontroll på spilleren du dekker",
      "Forsvarere borte fra ballen må justere markeringen tett når spillet flyttes",
      "Orienter kroppen mot eget mål når du sikrer"
    ],
    variations: [
      "Tillat pasninger over flere soner",
      "La lagene score ved avslutning fra kort hold på småmål",
      "Bytt hvilke spillere som starter i de ulike sonene"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 4 (Figur 25) (txt:922)"
  },

  // === KAPITTEL 3: SONEFORSVAR OG MANNDEKNING ===
  {
    id: "bangsbo-sone-1",
    exerciseNumber: 249,
    name: "3v3 med mannsmarkering i to soner",
    category: "game",
    duration: 20,
    playersMin: 6,
    playersMax: 6,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "3 mot 3 på et felt delt i to soner med kjeglemål bak hver sone. Hvert lag har én spiller i sone 1 og to spillere i sone 2. Spillerne må holde seg i startsonen sin og markere sin direkte motspiller tett i egen forsvarssone.",
    coachingPoints: [
      "Det essensielle er avstand og posisjonering i mannsmarkeringen",
      "Hold tett kontakt med direkte motspiller i egen sone",
      "Kommuniser raskt når angriperne bytter posisjon mellom sonene",
      "Forsvarerne må selv avgjøre hvem som skal markeres når varianten åpner for bytter"
    ],
    variations: [
      "Tillat ett posisjonsbytte mellom angreps- og forsvarssonen per angrep",
      "Begrens forsvarerne til to touch og maks to pasninger seg imellom i forsvarssonen",
      "Roter hvilke spillere som starter i hver sone"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 1 (Figur 10) (txt:363)"
  },

  // === KAPITTEL 4: PRESSING ===

  // === KAPITTEL 4.2: OFFSIDEFELLEN ===
  {
    id: "bangsbo-offside-1",
    exerciseNumber: 430,
    name: "8v7 med koordinert offsidefelle",
    category: "station",
    duration: 15,
    playersMin: 15,
    playersMax: 15,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "8 mot 7 på halv bane delt i to soner med ett stort mål. Det svarte laget forsvarer målet med fem forsvarere, to midtbanespillere og keeper, mens det hvite laget angriper. Spillerne kan ikke bytte sone, og øvelsen trener koordinasjonen mellom forsvarerne når offsidefellen settes.",
    coachingPoints: [
      "Spilleren som styrer fellen må finne riktig øyeblikk for å starte bevegelsen",
      "Forsvarer 4 må vente til midtbanespilleren presser ballfører før linjen skyver opp",
      "Hele bakre ledd må være koordinert for at offsidefellen skal fungere",
      "Ved variantene må midtbanespillerne trekke hjem og dekke opp når rom åpner seg"
    ],
    variations: [
      "Tillat spillere fra sone 2 å gå inn i sone 1, men ikke i 16-meteren",
      "La innkast i sone 2 tas som frispark",
      "La innkast i sone 1 tas som corner"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 1 (Figur 94) (txt:4181)"
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
    name: "8v8 pressfordeling mellom sentral og ytre sone",
    category: "game",
    duration: 30,
    playersMin: 16,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "8 mot 8 på en fjerdedel av banen med sentral sone og to ytre soner. Fire hvite spillere jobber i par i midtsonen, mens to hvite og fire svarte befinner seg i hver ytter­sone. Når ballen spilles mellom yttersonene, må de hvite raskt fordele pressoppgavene og løpe inn med riktig antall spillere.",
    coachingPoints: [
      "De hvite må raskt fordele rollene som 1., 2. og 3. forsvarer",
      "Spillere som allerede er i ytresonen må samhandle med de som kommer inn fra midten",
      "Kontinuerlige bytter av pressoppgaver krever timing og kommunikasjon",
      "Øvelsen kan brukes til å trene ekstra tydelig pressing langs sidelinjen"
    ],
    variations: [
      "Bare mottakende spiller får bruke to touch",
      "Fjern begrensning på antall berøringer",
      "Gjør banen større eller mindre, eller slipp inn flere hvite fra midtsonen"
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
    name: "8v6 med kombinasjon av markering og soneforsvar",
    category: "station",
    duration: 15,
    playersMin: 14,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "8 mot 6 på en halv bane med ett stort mål. Det hvite laget består av keeper, firerbackslinje og tre midtbanespillere, mens det svarte laget har to angripere og fire midtbanespillere. To hvite forsvarere markerer de to svarte angriperne, en hvit midtbanespiller sikrer en sentral motspiller, og resten av laget praktiserer soneforsvar.",
    coachingPoints: [
      "Bakre ledd må unngå å åpne frie rom når angriperne går diagonalt",
      "Spillere i soneforsvar må trekke innover og fylle rom som blir ledige",
      "Kantspiller og spilleren foran må samarbeide om variabelt soneforsvar på siden",
      "Midtbaneleddet må være klare til å forlate markeringen hvis den sentrale motspilleren slipper fri"
    ],
    variations: [
      "Begrens det svarte laget til maksimalt tre touch",
      "Legg til libero for det hvite laget og en ekstra midtbanespiller for det svarte",
      "Gi begge lag en ekstra midtbanespiller og utvid spilleområdet"
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
    name: "Lede ballfører mot hjørnefelle",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 6,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Fire angripere plasserer seg i en trekant, med to spillere ved hjørnet der ballen er. To forsvarere samarbeider slik at den ene følger etter ballføreren uten å gå direkte i press, før han leder mottakeren mot et hjørne der den andre forsvareren allerede står. Øvelsen trener hvordan forsvareren beveger seg riktig for å få angriperen til å la seg styre inn i fellen.",
    coachingPoints: [
      "Følg etter uten å gå for tidlig i press",
      "Led mottakeren mot hjørnet der medforsvareren allerede står",
      "Forsvareren må bevege seg så riktig at angriperen faktisk velger den ledede retningen",
      "Bytt roller ofte så begge forsvarerne trener timing og vinkel"
    ],
    variations: [
      "Roter spillerne hvert tredje minutt",
      "Varier hvilken side fellen settes på",
      "Øk tempoet i pasningsspillet mellom angriperne"
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
    name: "Spillerbytte mellom to forsvarere",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 8,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "På omtrent 1/4 bane med to soner og ett stort mål spiller to indreløpere og to angripere mot én indreløper, to forsvarere og keeper. Spillet trener særlig samordnet forsvarsarbeid mellom de to forsvarerne, som må markere angriperne tett og bytte motspiller raskt når angriperne skifter posisjon.",
    coachingPoints: [
      "Forsvarerne må markere 10 og 11 tett og koordinert",
      "Ved posisjonsbytte mellom angriperne må forsvarerne bytte motspiller raskt",
      "Spillere i offsideposisjon skal kunne slippes hvis situasjonen tilsier det",
      "Kontinuerlig kommunikasjon mellom de to forsvarerne er avgjørende"
    ],
    variations: [
      "Utvid sone 1",
      "La spillerne i sone 1 også kunne oppholde seg i sone 2",
      "Legg til en ekstra indreløper for begge lag"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Illustrasjon av spilløvelse 1 (Figur 58) (txt:2186)"
  },
  {
    id: "bangsbo-stotte-6",
    exerciseNumber: 466,
    name: "5v5 med støttespillere i yttersoner",
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 10,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "småmål"],
    description: "5 mot 5 på omtrent 1/8 bane, delt i fire soner og en sentral sone. Én spiller fra hvert lag fungerer som støttespiller og starter i ytterste forsvarssone, mens øvrige spillere er fordelt i sone 2 og 3. Når laget mister ballen, må støttespilleren raskt tilbake for å sikre, mens medspillerne bremser spillet til støtten er på plass.",
    coachingPoints: [
      "Støttespilleren må orientere seg raskt bakover og komme i sikringsposisjon",
      "Medspillerne må forsinke spillet til støtten rekker tilbake",
      "Hold rolle- og sonebalansen når ballen flyttes mellom sone 2 og 3",
      "Kommunikasjon mellom støttespiller og nærmeste forsvarer må være tidlig og tydelig"
    ],
    variations: [
      "La støttespillerne bevege seg fritt, men krev retur til egen forsvarssone etter balltap",
      "Tillat løp gjennom sentral sone, men ikke ballberøring der",
      "Bytt hvilke spillere som har støtterollen"
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
    name: "3v3 med støttespillere i yttersoner",
    category: "game",
    duration: 20,
    playersMin: 6,
    playersMax: 6,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "3 mot 3 på cirka 1/8 bane delt i tre soner, med sju kjeglemål på hver side i yttersonene. Én spiller fra hvert lag er støttespiller og holder til i henholdsvis sone 1 og 3. Øvelsen trener hvordan støttespilleren plasserer seg i forhold til ballfører og medspillere, og hvordan resten av laget hjelper og forsinker til støtte er etablert.",
    coachingPoints: [
      "Støttespilleren må ligge riktig i forhold til både ballfører og medspillere",
      "Spillerne utenfor ballen må hjelpe uten å slippe markeringen helt",
      "Vinn ballen når motstanderen har minst mulig handlingsrom",
      "Ved balltap må laget forsinke til støttespilleren er tilbake i riktig posisjon"
    ],
    variations: [
      "La støttespillerne også kunne oppholde seg i midtsonen, men krev retur til egen forsvarssone ved balltap",
      "La lagene score på småmål i stedet for kjeglemål",
      "Roter hvem som har støtterollen"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 1 (Figur 22) (txt:796)"
  },
  {
    id: "bangsbo-stil-2",
    exerciseNumber: 41,
    name: "9v9 med ulik banehalvdel og rask reorganisering",
    category: "game",
    duration: 20,
    playersMin: 18,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "9 mot 9 med keepere på omtrent 2/3 bane, der de to banehalvdelene har ulik størrelse. Begge lag spiller i to firerlinjer, med offside og begrensning på maksimalt to berøringer på egen halvdel før ballen må over midtlinjen. Øvelsen trener hvor raskt laget reorganiserer seg defensivt når spillet stadig tvinges inn på egen banehalvdel.",
    coachingPoints: [
      "Bakre ledd må reorganisere seg raskt når ballen kommer inn på egen halvdel",
      "Fremre ledd må styre motstanderens oppbygging slik at mange spillere er samlet i hovedområdet",
      "Laget på stor banehalvdel må jobbe hardere for å danne en kompakt enhet",
      "Forsvarerne må hele tiden ha kontroll på spillere som blir stående igjen høyt"
    ],
    variations: [
      "La to spillere fra hvert lag alltid oppholde seg på motstanderens banehalvdel",
      "Krev at laget som forsvarer største banehalvdel spiller ballen over midtlinjen etter maks to pasninger",
      "La keeper spille direkte til motstanderens halvdel"
    ],
    tags: ["bangsbo-peitersen-forsvar"],
    source: "bangsbo",
    sourceRef: "Bangsbo/Peitersen Forsvar – Spilløvelse 4 (Figur 53) (txt:2038)"
  },

  // === KAPITTEL 5: TAKTISK TRENING ===
  {
    id: "bangsbo-taktisk-1",
    exerciseNumber: 42,
    name: "8v8 pressing og linjesamarbeid",
    category: "game",
    duration: 20,
    playersMin: 16,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "8 mot 8 på en halv bane med tre små mål på hver mållinje. Lagene starter i 4-4-formasjon med soneforsvar og spiller uten offside. Øvelsen trener samspillet mellom første og andre forsvarslinje under pressing, særlig hvordan laget kanaliserer spillet mot kant.",
    coachingPoints: [
      "Bevegelsene må tilpasses posisjonene til første og andre forsvarer",
      "Press mot sidelinjene for å gjøre oppgavene tydeligere",
      "Sentrale områder krever bedre oppdeling av ansvar mellom leddene",
      "Lagene må hele tiden tilpasse seg skiftende pressretning og målvalg"
    ],
    variations: [
      "Fjern kravet om minst to berøringer per spiller",
      "Spesifiser hvilket av de tre små målene som kan angripes",
      "Veksle mellom å kun angripe sidemål og kun angripe midtmål"
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
    playersMin: 12,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "6 mot 6 på omtrent 1/4 bane delt i fire soner med tre små kjeglemål på hver baklinje. To spillere fra hvert lag fungerer som støttespillere i sone 1 eller 4, og etter balltap må de umiddelbart bytte sone. Øvelsen trener forsvarsgjenoppstilling og hvordan laget forsinker spillet til støtte er på plass.",
    coachingPoints: [
      "Etter balltap må støttespillerne trekke seg raskt tilbake til ny sikringsposisjon",
      "Spillet på motstanderens halvdel skal først og fremst forsinkes",
      "Unngå unødige taklinger som ødelegger avstanden til nærmeste motspiller",
      "Vurder hele tiden om du skal gå direkte i press eller falle av og gi støtte"
    ],
    variations: [
      "Tillat pasning direkte fra egen halvdel til angrepssonen",
      "La støttespillerne kunne stjele ballen mens de bytter sone",
      "La støttespillerne bevege seg fritt over hele banen"
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
