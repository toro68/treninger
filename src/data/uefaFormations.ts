// src/data/uefaFormations.ts

// ============================================
// TYPER
// ============================================

export type UEFAFormation = {
  /** Unik ID (f.eks. "4-3-3") */
  id: string;
  /** Visningsnavn (f.eks. "4-3-3") */
  navn: string;
  /** SVG-diagram av formasjonen */
  svgDiagram?: string;
  /** Generell beskrivelse av formasjonen */
  beskrivelse: string;
  /** Formasjonens styrker */
  styrker?: string[];
  /** Formasjonens svakheter */
  svakheter?: string[];
  /** Nøkkelkjennetegn og filosofi */
  kjennetegn: string[];
  /** Beskrivelse av nøkkelroller */
  spillerprofiler?: {
    rolle: string;
    profil: string;
  }[];
  /** Taktiske prinsipper og anvendelse */
  taktiskePrinsipper: {
    tittel: string;
    detaljer: string[];
  }[];
  /** Relaterte UEFA-analyser (id-er fra uefaAnalyses) */
  relaterteAnalyser?: string[];
  /** Kildefil i docs/uefa/ */
  kildefil: string;
};

// ============================================
// DATA
// ============================================

export const uefaFormations: UEFAFormation[] = [
  {
    id: "4-3-3",
    navn: "4-3-3",
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130"><rect width="100" height="130" fill="#4CAF50"/><circle cx="50" cy="120" r="5" fill="yellow"/><circle cx="20" cy="100" r="5" fill="white"/><circle cx="40" cy="100" r="5" fill="white"/><circle cx="60" cy="100" r="5" fill="white"/><circle cx="80" cy="100" r="5" fill="white"/><circle cx="30" cy="65" r="5" fill="lightblue"/><circle cx="50" cy="55" r="5" fill="lightblue"/><circle cx="70" cy="65" r="5" fill="lightblue"/><circle cx="25" cy="25" r="5" fill="red"/><circle cx="50" cy="15" r="5" fill="red"/><circle cx="75" cy="25" r="5" fill="red"/></svg>`,
    beskrivelse: "En fleksibel og balansert formasjon som er populær i moderne fotball. Den gir god dekning over hele banen og kan enkelt tilpasses både en ballbesittende og en mer direkte spillestil.",
    styrker: [
      "Overtall sentralt på midtbanen (3v2 mot 4-4-2).",
      "Gode muligheter for høyt press med tre spillere i front.",
      "Naturlige trekanter i laget som fremmer pasningsspill.",
      "Fleksibel i angrep, hvor vinger kan true både bredt og smalt."
    ],
    svakheter: [
      "Kan være sårbar på kantene bak offensive backer.",
      "Krever hardtarbeidende midtbanespillere som dekker store rom.",
      "En enslig spiss kan bli isolert mot to midtstoppere."
    ],
    spillerprofiler: [
      { rolle: "Indreløper", profil: "En 'box-to-box' spiller med stor løpskapasitet, god pasningsfot og evne til å lese spillet både offensivt og defensivt." },
      { rolle: "Vinger", profil: "Rask og teknisk spiller med gode 1v1-ferdigheter. Må kunne utfordre, slå innlegg og avslutte." },
      { rolle: "Spiss", profil: "En komplett spiss som både kan agere som møtende oppspillspunkt og true bakrom. Sterk i lufta og en klinisk avslutter." }
    ],
    relaterteAnalyser: ["a10-winger", "a12-angrepsspill", "a13-sideback-indreloper", "a15-innlegg", "a16-rosenborg-angrep", "a17-spissrollen"],
    kildefil: "4-3-3.md",
    taktiskePrinsipper: [],
    kjennetegn: []
  },
  {
    id: "3-5-2",
    navn: "3-5-2",
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130"><rect width="100" height="130" fill="#4CAF50"/><circle cx="50" cy="120" r="5" fill="yellow"/><circle cx="25" cy="100" r="5" fill="white"/><circle cx="50" cy="100" r="5" fill="white"/><circle cx="75" cy="100" r="5" fill="white"/><circle cx="10" cy="65" r="5" fill="lightblue"/><circle cx="35" cy="60" r="5" fill="lightblue"/><circle cx="50" cy="50" r="5" fill="lightblue"/><circle cx="65" cy="60" r="5" fill="lightblue"/><circle cx="90" cy="65" r="5" fill="lightblue"/><circle cx="40" cy="20" r="5" fill="red"/><circle cx="60" cy="20" r="5" fill="red"/></svg>`,
    beskrivelse:
      "3-5-2 er en formasjon som ofte brukes som et verktøy for spillestil: fem bak i lavt press (5-3-2), mye folk sentralt, og klare roller for når laget går fra lav blokk til høyt press. Den gir et sterkt senter (mellomrom/bakrom) og tydelige angrepsmønstre med to spisser, indreløpere og vingbacker.",
    styrker: [
      "Lav blokk med fem bak gjør det enklere å beskytte mellomrom, bakrom og egen boks.",
      "Klar romprioritering (steng sentralt først) gir forutsigbarhet i forsvar.",
      "Avtalte press-signaler gjør høyt press mer synkront og effektivt.",
      "Sterk boksbeskyttelse på innlegg med tre stoppere inne.",
      "Sentralt overtall gir gode vinkler i oppbygging og i returløp/gjenvinning.",
      "To spisser med motsatte bevegelser skaper gjennombrudd sentralt (møte/stikk).",
      "Vingbacker kan brukes som vendingspunkt – ikke bare innlegg – for å få ballen inn i mellomrom.",
      "Klare avtaler på siste tredjedel (møte/stikke/fylle/sikre) gir flere repeterbare mønstre."
    ],
    svakheter: [
      "Rommet bak høye vingbacker kan bli sårbart ved balltap hvis ytre stopper går høyt samtidig.",
      "Hvis førsteforsvarer blir passert og stoppere mangler fart, kan overganger bli krevende å stoppe.",
      "Krever høy kapasitet i vingback-rollen (mange meter + 1v1 begge veier).",
      "Kan bli kant-sårbart hvis vingback blir stående alene (2v1) uten støtte fra indreløper/ytre stopper.",
      "Krever høy presisjon i rolleavtaler på siste tredjedel (hvem møter, hvem stikker, hvem fyller boks, hvem sikrer).",
      "Hvis ytre stopper tar for mye oppspillsansvar under press, kan det gi dårligere betingelser i frispilling og større overgangsrisiko."
    ],
    spillerprofiler: [
      {
        rolle: "Keeper",
        profil:
          "God igangsetter og trygg med beina. Offensiv i feltet og klar til å rydde bak bakre ledd (sweeper-tendenser).",
      },
      {
        rolle: "Ytre stoppere",
        profil:
          "Sterke 1v1 og i lufta. Komfortable med ball (kan bære fram og tre gjennom ledd). Må kunne håndtere rommet bak høye vingbacker og veksle mellom sone og selektiv markering når sikring er på plass.",
      },
      {
        rolle: "Sentral stopper",
        profil:
          "Leder og styrer: linje, balanse, sikring og kommunikasjon. Må prioritere rom (mellomrom/bakrom først) og organisere boksforsvar ved innlegg.",
      },
      {
        rolle: "Vingbacker",
        profil:
          "Ekstrem løpskraft. Må vinne 1v1 både offensivt og defensivt, time løp (bredde, bakre stolpe), og kunne være et vendingspunkt i etablerte angrep – ikke bare slå tidlige innlegg.",
      },
      {
        rolle: "Sentralt anker (regista)",
        profil:
          "Pasningshjerne og rytmestyrer. Tilbyr seg konstant som vendingspunkt, kan slå stikkere i bakrom og pasninger inn i mellomrom, og må være sterk i gjenvinning/andreball i returrom.",
      },
      {
        rolle: "Indreløpere",
        profil:
          "Motorer med løpsstyrke. Strekker i mellomrom for å åpne for spiss som møter, timer bakromsløp, fyller boks på innlegg, og jobber hjem i returløp.",
      },
      {
        rolle: "Spisser",
        profil:
          "Må kunne både møte og true bakrom. Jobber i relasjon: en møter, en strekker (motsatte løp). Lojale i press-spill og gode på å legge av på én touch i mønstre.",
      },
    ],
    relaterteAnalyser: ["a01-juventus-352"],
    kildefil: "3-5-2.md",
    taktiskePrinsipper: [
      {
        tittel: "Defensiv struktur (lavt press som default)",
        detaljer: [
          "Organiser som 5-3-2: tre stoppere + lave vingbacker.",
          "Soneforsvar som utgangspunkt, med selektiv markering når sikring er på plass.",
          "Romprioritering: steng mellomrom og bakrom først – led motstander ut i sidekorridor.",
          "Hvis ballen er sentral: vær kompakt og tålmodig – ikke bryt ut og åpne mellomrom.",
          "Hvis ballen går ut i sidekorridor: vingback går, nærmeste indreløper støtter, ytre stopper sikrer rommet bak.",
          "Hvis spiss faller ned i mellomrom: avklar hvem som følger (anker/ytre stopper) og hvem som sikrer bakrom.",
        ],
      },
      {
        tittel: "Press-signaler og høyt press",
        detaljer: [
          "Gå høyt på avtalte signaler (eksempel: dårlig førstetouch, tversoverpasning, feilvendt stopper, svak klarering).",
          "Spissene går på hver sin stopper når laget trår opp.",
          "Vingback presser back og leder innover mot indreløper + ytre stopper; resten sideforskyver og sikrer.",
          "Hvis press-signalet kommer: alle må opp samtidig – ikke " +
            "enkeltpress som åpner pasningslinjer rundt.",
          "Hvis ballen spilles til back: vingback presser med kroppsvinkel som leder inn (ikke gi enkel linje langs siden).",
          "Hvis spiss presser stopper: press med vinkel som låser pasningen inn sentralt og gjør støttepasning forutsigbar.",
        ],
      },
      {
        tittel: "Innlegg imot (boksbeskyttelse)",
        detaljer: [
          "Søk tre stoppere i boks ved innlegg – ofte overtall inne.",
          "Kombiner sonespillere og markering ut fra hvem som er best i lufta / nærmest ball.",
          "Ved innlegg kan ytre stopper + vingback være sonespillere, mens andre tar markering (avhengig av motstanderens trusler).",
          "Prioritér returrom: sikre andreball og ny fase etter klarering.",
          "Før innlegg: press ballfører for å forsinke/forringe innleggskvalitet (stopp innleggsfot om mulig).",
          "Når innlegg slås: fordel roller raskt (nærmeste tar ballbane, andre tar rom, tredje tar bakre sikring).",
          "Etter klarering: vær påskrudd i returrom – neste aksjon er ofte 2. ball eller nytt innlegg.",
        ],
      },
      {
        tittel: "Overganger imot (typiske feller)",
        detaljer: [
          "Unngå at ytre stopper går høyt uten balanse bak – det åpner bakrom når vingbacker er høye.",
          "Hvis førsteforsvarer blir passert, må resten være forberedt på å løpe hjem og stenge sentralt.",
          "Vurder spillerprofil: stoppere uten fart må kompensere med posisjonering, orientering og sikringsavstander.",
          "Hvis ballen tapes med høye vingbacker: prioriter å stoppe direkteball i bakrom og løp hjem med ansiktet mot egen mål.",
          "Hvis dere ikke kan vinne ballen raskt tilbake: fall av, steng midten, og tving motstander ut i sidekorridor.",
          "Selv med numerisk balanse kan overgangen ryke på tempo: vær ærlig på 1v1-fart i bakre treer og justér risiko deretter.",
        ],
      },
      {
        tittel: "Oppbygging og etablerte mønstre",
        detaljer: [
          "Oppspill starter ofte via ytre stopper som kan bære fram og tre opp.",
          "Indreløper strekker i mellomrom for å åpne rom for spiss som møter.",
          "Vingback står bredt og kan være vendingspunkt; regista tilbyr seg konstant sentralt.",
          "Mønster: vingback → spiss møter → avlegg (én touch) → indreløper i bakrom.",
          "Hvis ytre stopper får tid: bær fram for å trekke ut motstanders ledd – spill deretter inn i mellomrom eller på vendingspunkt.",
          "Hvis spiss møter: se etter tredje-mann-løp (indreløper/vingback) før støttepasning bakover.",
          "Hvis regista får rettvendt: angrip med stikker i bakrom eller pasning inn i mellomrom – ikke bli " +
            "stående i sideveis sirkulasjon.",
          "Prioritér gjennombrudd sentralt når det er mulig – bredde skal ofte brukes for å åpne midten, ikke som mål i seg selv.",
        ],
      },
      {
        tittel: "Innleggsmønster og returrom",
        detaljer: [
          "Fyll boks: to spisser + motsatt indreløper + motsatt vingback.",
          "Hold igjen i returrom: ballnær indreløper + regista for andreball/gjenvinning.",
          "Hvis vingback får slå innlegg: avklar roller før pasningen (hvem går 1. stolpe, hvem går bakre, hvem kommer i cutback/returrom).",
          "Hvis innlegget blir blokkert: vær klar for ny fase (gjenvinn → nytt innlegg eller spill inn sentralt).",
        ],
      },
      {
        tittel: "Gjenvinning som egen fase",
        detaljer: [
          "Vær forberedt på balltap høyt: mange spillere er allerede sentralt/høyt og kan vinne ball raskt tilbake.",
          "Tør gjennombruddspasningen når strukturen bak er klar for gjenvinning.",
          "Hvis ballen tapes i siste tredjedel: nærmeste spillere presser umiddelbart, mens resten låser sentralt og sikrer bakrom.",
          "Hvis dere vinner ballen tilbake: spill raskt fram i mellomrom/bakrom før motstander rekker å etablere lav blokk igjen.",
        ],
      },
      {
        tittel: "Siste tredjedel: rolleavtaler",
        detaljer: [
          "Avklar før dere går i etablering: hvem møter (spiss), hvem stikker (spiss/indreløper), hvem fyller boks, hvem sikrer.",
          "Spiss–spiss-relasjon: en møter og en strekker – indreløper timer løp i rommet som åpnes.",
          "Vingback som vendingspunkt: bruk ham til å vende inn i mellomrom, ikke bare for å slå tidlig innlegg.",
        ],
      },
      {
        tittel: "Anvendelse (DFI): når passer 3-5-2?",
        detaljer: [
          "Bruk 3-5-2 som verktøy for spillestil: styre med ball, ha mange sentralt for pasningsspill og gjenvinning.",
          "Defensivt gir det ofte enklere kompakt senter og boksbeskyttelse, med mulighet for selektiv markering.",
          "Offensivt gir det sentralt overtall, gode frispillingsvinkler og tydelige mønstre på siste tredjedel.",
          "Aksepter risiko: høye vingbacker + mye folk sentralt krever felles forståelse for press-signaler og hva som skjer etter balltap.",
        ],
      },
    ],
    kjennetegn: [
      "Fem bak i lavt press (5-3-2) med klare rom- og rolleansvar.",
      "Soneforsvar som base – med selektiv markering når sikring er etablert.",
      "Romprioritering: mellomrom/bakrom før press på ball.",
      "Felles press-signaler for å trigge høyt press og få samtidighet.",
      "Tre stoppere i boks ved innlegg og tydelig returrom-rolle.",
      "Vingback som breddeholder og vendingspunkt.",
      "Regista som konstant støtte/vendingspunkt og 2.-ballspiller.",
      "Spissduo med møte/stikk og motsatte løp.",
      "Gjenvinning (gegenpress light) brukt som våpen i etablerte angrep.",
      "Siste tredjedel styres av avtaler: møte/stikke, boksfylling og sikring.",
      "3-5-2 brukes best som ramme for en spillestil (DFI), ikke som et mål i seg selv.",
    ],
  },
  {
    id: "4-4-2",
    navn: "4-4-2",
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130"><rect width="100" height="130" fill="#4CAF50"/><circle cx="50" cy="120" r="5" fill="yellow"/><circle cx="20" cy="100" r="5" fill="white"/><circle cx="40" cy="100" r="5" fill="white"/><circle cx="60" cy="100" r="5" fill="white"/><circle cx="80" cy="100" r="5" fill="white"/><circle cx="20" cy="60" r="5" fill="lightblue"/><circle cx="40" cy="55" r="5" fill="lightblue"/><circle cx="60" cy="55" r="5" fill="lightblue"/><circle cx="80" cy="60" r="5" fill="lightblue"/><circle cx="40" cy="20" r="5" fill="red"/><circle cx="60" cy="20" r="5" fill="red"/></svg>`,
    beskrivelse: "En tradisjonell og velbalansert formasjon med to kompakte og flate firere. Den er enkel å organisere og gir god dekning på hele banen.",
    styrker: [
      "Solid defensiv struktur og enkel å organisere (soneforsvar).",
      "God balanse mellom forsvar og angrep.",
      "To spisser kan binde opp motstanderens forsvar.",
      "God bredde fra kantspillerne."
    ],
    svakheter: [
      "Kan bli i undertall sentralt på midtbanen (2v3 mot 4-3-3).",
      "Store avstander mellom leddene kan oppstå.",
      "Kan være forutsigbar og statisk i angrepsspillet."
    ],
    spillerprofiler: [
      { rolle: "Sentral midtbane", profil: "En 'motor' som er god begge veier, og en mer kreativ spiller som kan styre spillet." },
      { rolle: "Spisser", profil: "Ofte en kombinasjon av en sterk targetspiss og en raskere, mer bevegelig spiss." }
    ],
    relaterteAnalyser: ["a17-spissrollen", "a18-angrep-etablert", "b01-overgangsspill"],
    kildefil: "4-4-2.md",
    taktiskePrinsipper: [],
    kjennetegn: []
  },
  {
    id: "4-2-3-1",
    navn: "4-2-3-1",
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130"><rect width="100" height="130" fill="#4CAF50"/><circle cx="50" cy="120" r="5" fill="yellow"/><circle cx="20" cy="100" r="5" fill="white"/><circle cx="40" cy="100" r="5" fill="white"/><circle cx="60" cy="100" r="5" fill="white"/><circle cx="80" cy="100" r="5" fill="white"/><circle cx="40" cy="70" r="5" fill="lightblue"/><circle cx="60" cy="70" r="5" fill="lightblue"/><circle cx="25" cy="45" r="5" fill="lightblue"/><circle cx="50" cy="35" r="5" fill="lightblue"/><circle cx="75" cy="45" r="5" fill="lightblue"/><circle cx="50" cy="15" r="5" fill="red"/></svg>`,
    beskrivelse: "En moderne og populær formasjon som gir god defensiv balanse med to dype midtbanespillere, samtidig som den er fleksibel og farlig i angrep.",
    styrker: [
      "God defensiv balanse med 'dobbelt pivot' foran forsvaret.",
      "Fleksibilitet i angrep med fire offensive spillere.",
      "En dedikert '10er' kan utnytte rommet mellom motstanderens midtbane og forsvar.",
      "Sterk i gjenvinningsspillet på motstanderens halvdel."
    ],
    svakheter: [
      "Kan bli for defensivt om de to dype midtbanespillerne ikke deltar nok offensivt.",
      "Den ene spissen kan bli isolert.",
      "Krever at de tre offensive midtbanespillerne jobber hardt defensivt."
    ],
    spillerprofiler: [
      { rolle: "Offensiv midtbane (10er)", profil: "Kreativ og smart spiller med eksepsjonell teknikk og visjon. Kan score mål og slå den avgjørende pasningen." },
      { rolle: "Sittende midtbane", profil: "Taktisk klok og posisjoneringssterk spiller som er god til å lese spillet og vinne ballen. En stabilisator." }
    ],
    relaterteAnalyser: ["a06-sentral-midt", "a11-rbk-angrep"],
    kildefil: "4-2-3-1.md",
    taktiskePrinsipper: [],
    kjennetegn: []
  },
  {
    id: "4-3-1-2",
    navn: "4-3-1-2 (Diamant)",
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130"><rect width="100" height="130" fill="#4CAF50"/><circle cx="50" cy="120" r="5" fill="yellow"/><circle cx="20" cy="100" r="5" fill="white"/><circle cx="40" cy="100" r="5" fill="white"/><circle cx="60" cy="100" r="5" fill="white"/><circle cx="80" cy="100" r="5" fill="white"/><circle cx="30" cy="65" r="5" fill="lightblue"/><circle cx="50" cy="75" r="5" fill="lightblue"/><circle cx="70" cy="65" r="5" fill="lightblue"/><circle cx="50" cy="40" r="5" fill="lightblue"/><circle cx="40" cy="20" r="5" fill="red"/><circle cx="60" cy="20" r="5" fill="red"/></svg>`,
    beskrivelse: "En smal, men veldig sterk sentral formasjon som fokuserer på å dominere midtbanen med en diamant og to spisser på topp.",
    styrker: [
      "Sterkt numerisk overtall sentralt på midtbanen (4 spillere).",
      "To spisser gir konstant trussel mot midtstopperne.",
      "God forutsetning for intrikat pasningsspill sentralt.",
      "En dedikert 10er-rolle."
    ],
    svakheter: [
      "Mangler naturlig bredde i angrepsspillet.",
      "Ekstremt avhengig av offensive backer for å skape bredde.",
      "Sårbar for kontringer på kantene hvis backene er høyt i banen."
    ],
    spillerprofiler: [
      { rolle: "Backer", profil: "Svært offensive med stor løpskapasitet. Må fungere som lagets vinger i angrep." },
      { rolle: "10er", profil: "En klassisk playmaker som trives i små rom og kan tre gjennom de to spissene." }
    ],
    relaterteAnalyser: ["a14-indreloper-4312"],
    kildefil: "4-3-1-2.md",
    taktiskePrinsipper: [],
    kjennetegn: []
  },
  {
    id: "4-5-1",
    navn: "4-5-1",
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130"><rect width="100" height="130" fill="#4CAF50"/><circle cx="50" cy="120" r="5" fill="yellow"/><circle cx="20" cy="100" r="5" fill="white"/><circle cx="40" cy="100" r="5" fill="white"/><circle cx="60" cy="100" r="5" fill="white"/><circle cx="80" cy="100" r="5" fill="white"/><circle cx="15" cy="60" r="5" fill="lightblue"/><circle cx="35" cy="55" r="5" fill="lightblue"/><circle cx="50" cy="50" r="5" fill="lightblue"/><circle cx="65" cy="55" r="5" fill="lightblue"/><circle cx="85" cy="60" r="5" fill="lightblue"/><circle cx="50" cy="20" r="5" fill="red"/></svg>`,
    beskrivelse: "En defensivt solid formasjon som fokuserer på å tette igjen rom sentralt med fem midtbanespillere. Kan være vanskelig å bryte ned.",
    styrker: [
      "Svært kompakt og defensivt solid, spesielt sentralt.",
      "Vanskelig for motstanderen å finne rom mellom leddene.",
      "God for å forsvare en ledelse eller nøytralisere en spillende motstander."
    ],
    svakheter: [
      "Kan bli veldig passiv og defensiv.",
      "Spissen kan bli veldig isolert på topp.",
      "Krever ekstremt hardt arbeid og offensive løp fra midtbanen for å skape noe."
    ],
    spillerprofiler: [
      { rolle: "Spiss", profil: "En sterk targetspiss som kan holde på ballen alene og vente på støtte fra midtbanen." },
      { rolle: "Sentrale midtbanespillere", profil: "Disiplinerte og hardtarbeidende spillere som er flinke til å dekke rom og beskytte forsvaret." }
    ],
    relaterteAnalyser: ["a19-angrep-etablert"],
    kildefil: "4-5-1.md",
    taktiskePrinsipper: [],
    kjennetegn: []
  },
];

// ============================================
// HJELPEFUNKSJONER
// ============================================

/** Finn formasjon etter ID (f.eks. "4-3-3") */
export const getFormationById = (id: string): UEFAFormation | undefined =>
  uefaFormations.find((f) => f.id.toLowerCase() === id.toLowerCase());

