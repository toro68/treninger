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
    beskrivelse: "En formasjon som gir numerisk overtall både sentralt i forsvar og på midtbanen. Den er avhengig av svært hardtarbeidende vingbacker som dekker hele siden.",
    styrker: [
      "Solid defensivt med tre midtstoppere mot to spisser.",
      "5 spillere på midtbanen gir sentral kontroll.",
      "To spisser skaper trøbbel for motstanderens forsvar.",
      "Vingbackene gir permanent bredde i angrep."
    ],
    svakheter: [
      "Store rom bak vingbackene som kan utnyttes av motstanderen.",
      "Svært fysisk krevende for vingbackene.",
      "Kan bli undertall på kantene i forsvar (2v1 mot vingback)."
    ],
    spillerprofiler: [
      { rolle: "Vingback", profil: "Ekstrem løpskapasitet og god utholdenhet. Må være like god defensivt som offensivt, og ha gode innleggsferdigheter." },
      { rolle: "Sentrale midtbanespillere", profil: "En blanding av en kreativ '10er', en ballvinner og en 'box-to-box' spiller for å kontrollere midtbanen." }
    ],
    relaterteAnalyser: ["a01-juventus-352"],
    kildefil: "3-5-2.md",
    taktiskePrinsipper: [],
    kjennetegn: []
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
    relaterteAnalyser: ["a06-sentral-midt", "a22-rbk-angrep"],
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

