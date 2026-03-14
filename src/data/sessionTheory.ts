export type SessionTheoryItem = {
  id: string;
  category: "trenerfokus" | "spillerbudskap" | "læringsprinsipp";
  title: string;
  summary: string;
  coachNote?: string;
  playerMessage?: string;
};

export const sessionTheoryItems: SessionTheoryItem[] = [
  {
    id: "theory-scan-before-ball",
    category: "spillerbudskap",
    title: "Se før du får ballen",
    summary: "Skann før mottak. Da går første touch framover eller bort fra press.",
    coachNote: "Repeter ett spørsmål: Hva så du før du fikk ballen?",
    playerMessage: "Se opp tidlig. Finn rom, press og neste pasning før mottak.",
  },
  {
    id: "theory-courage-to-try",
    category: "trenerfokus",
    title: "Ros modige forsøk",
    summary: "Ros initiativ og gode valg, ikke bare utfallet.",
    coachNote: "Vil du ha mot og fart i læringen, må gode forsøk tåle å mislykkes.",
    playerMessage: "Det er lov å prøve. Riktig idé teller også når utførelsen ikke sitter.",
  },
  {
    id: "theory-width-depth-balance",
    category: "spillerbudskap",
    title: "Bredde, dybde og støtte",
    summary: "Ballfører bør ha hjelp foran, bak og til siden.",
    coachNote: "Se etter om avstandene gir enkle valg og nok fart i spillet.",
    playerMessage: "Gi ballfører minst tre løsninger: støtte, bredde og dybde.",
  },
  {
    id: "theory-fewer-instructions",
    category: "læringsprinsipp",
    title: "Mindre instruksjon, mer oppdagelse",
    summary: "Spillerne lærer dypere når de finner løsninger selv.",
    coachNote: "Still korte spørsmål før du gir fasit.",
  },
  {
    id: "theory-press-after-loss",
    category: "spillerbudskap",
    title: "Reaksjon ved balltap",
    summary: "Første sekunder etter balltap avgjør om dere gjenvinner eller må hjem.",
    coachNote: "Lag ett felles signal for press eller fall.",
    playerMessage: "Reager med en gang. Press sammen, eller fall raskt og samlet.",
  },
  {
    id: "theory-representative-training",
    category: "læringsprinsipp",
    title: "Øvelsen må ligne kampen",
    summary: "Jo mer øvelsen ligner kampens valg og rom, jo mer treffer læringen.",
    coachNote: "Juster heller regler og rom enn å forklare for mye.",
  },
  {
    id: "theory-collective-language",
    category: "trenerfokus",
    title: "Ett språk for laget",
    summary: "Få, tydelige ord gir raskere kollektiv respons.",
    coachNote: "Bruk de samme nøkkelordene hver uke.",
    playerMessage: "Samme ord gjør det lettere å reagere likt i fart.",
  },
  {
    id: "theory-result-vs-learning",
    category: "trenerfokus",
    title: "Læring foran resultat",
    summary: "Vurder økta på hva dere trener på, ikke bare hva som lykkes.",
    coachNote: "Avslutt gjerne med: Hva trente vi på i dag, og hvor så vi det?",
    playerMessage: "Målet er å forstå og gjenta riktige valg.",
  },
  {
    id: "theory-433-front-three",
    category: "spillerbudskap",
    title: "4-3-3: fronttrioen",
    summary: "9-er binder stopperne. Kantene gir bredde inn, og motsatt kant angriper bakre rom.",
    coachNote: "Se etter tre tydelige oppgaver: true bakromsløp, bredde i ballside og bakre trussel motsatt.",
    playerMessage: "9-er truer bakrom. Ballsidekant strekker. Motsatt kant går inn i boks eller bakre rom.",
  },
  {
    id: "theory-433-midfield",
    category: "spillerbudskap",
    title: "4-3-3: midtbanetreeren",
    summary: "Ankeret sikrer bak ball. Indreløperne jobber ulikt: én støtter, én truer framover.",
    coachNote: "Unngå at begge indreløpere står i samme høyde. Én ned, én opp.",
    playerMessage: "Anker gir balanse. Indreløpere må gi både støtte og løp gjennom ledd.",
  },
  {
    id: "theory-fullbacks-433",
    category: "spillerbudskap",
    title: "Backenes jobb",
    summary: "Backen på ballside kan gå. Motsatt back låser og sikrer restforsvaret.",
    coachNote: "Ikke send begge backer samtidig hvis dere ikke har kontroll sentralt.",
    playerMessage: "Én back støtter angrep. Den andre tenker sikring og balanse.",
  },
  {
    id: "theory-451-defensive-shape",
    category: "spillerbudskap",
    title: "4-5-1 defensivt",
    summary: "Kantene hjem. Avstanden mellom ledd må være kort. 9-er styrer spillet én vei.",
    coachNote: "Prioriter kompakt avstand sentralt før aggressivt press ute.",
    playerMessage: "Først samlet, så press. Tving spillet ut og beskytt rommet foran stopperne.",
  },
  {
    id: "theory-4231-anchor-steps-up",
    category: "spillerbudskap",
    title: "4-2-3-1: ankeret opp",
    summary: "Når ankeret går opp i mellomrommet, må den andre 6-eren holde balanse bak ball.",
    coachNote: "Byttet må være tydelig: én går mellom ledd, én blir igjen og sikrer sentralt.",
    playerMessage: "Når én 6-er går, må den andre låse rommet foran stopperne.",
  },
  {
    id: "theory-4231-ten-role",
    category: "spillerbudskap",
    title: "10-er i 4-2-3-1",
    summary: "10-eren må være spillbar mellom ledd, vende når mulig og sette fart framover.",
    coachNote: "Se etter mottak i mellomrom med åpen kropp, ikke bare støttepasninger.",
    playerMessage: "Finn lommen. Vend opp om du kan. Hvis ikke, spill av og flytt deg igjen.",
  },
  {
    id: "theory-352-wingbacks",
    category: "spillerbudskap",
    title: "3-5-2: vingbackene",
    summary: "Vingbackene må skape all bredden. Kommer de ikke opp, blir laget smalt.",
    coachNote: "3-5-2 fungerer dårlig uten klare løp og gjentatte aksjoner fra vingbackene.",
    playerMessage: "Vingback: vær tidlig bred i angrep og raskt hjem på balltap.",
  },
  {
    id: "theory-352-front-two",
    category: "spillerbudskap",
    title: "3-5-2: spissparet",
    summary: "Én møter, én truer. To spisser må jobbe ulikt for å strekke backrekka.",
    coachNote: "Unngå at begge spisser kommer i ball samtidig. Da mister dere dybde.",
    playerMessage: "Én kommer kort. Én går bak. Bytt roller underveis.",
  },
  {
    id: "theory-roles-rest-defense",
    category: "trenerfokus",
    title: "Restforsvar først",
    summary: "Før mange går i angrep må noen være igjen og kontrollere neste balltap.",
    coachNote: "Tell alltid hvor mange som sikrer bak ball før dere sender folk fram.",
    playerMessage: "Når vi angriper, må noen tenke neste balltap allerede nå.",
  },
];

export const getSessionTheoryItem = (id: string) =>
  sessionTheoryItems.find((item) => item.id === id);
