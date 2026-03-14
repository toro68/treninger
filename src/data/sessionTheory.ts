export type SessionTheoryItem = {
  id: string;
  category: "trenerfokus" | "spillerbudskap" | "læringsprinsipp";
  title: string;
  summary: string;
  coachNote?: string;
  playerMessage?: string;
  sections?: {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
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
  {
    id: "theory-attack-depth-halfspace-width",
    category: "spillerbudskap",
    title: "Angripe bakrom, mellomrom og kanter",
    summary: "Etter ballvinning prioriterer vi direkte bakrom, så mellomrom, og til slutt vekk fra press. Rollen til spiss, kant, indreløper, back og pasningslegger må være tydelig.",
    coachNote: "Vær kompromissløs på rekkefølgen. Bakromstrussel først. Da tvinges motstander ned, og mellomrommet åpner seg. Se spesielt etter timing mellom passer og løper, ikke bare om pasningen slås.",
    playerMessage: "Ved ballvinning: tru rommet bak først, så spill mellom ledd, og bare deretter ut av press. Når én går, må andre skape neste problem for forsvaret.",
    sections: [
      {
        title: "Prioritert rekkefølge etter ballvinning",
        paragraphs: [
          "Direkte bakrom går foran mellomrom, og mellomrom går foran pasning vekk fra press.",
          "Rekkefølgen er bevisst: bakromstrussel tvinger forsvaret til å falle, og da åpnes rommet mellom ledd. Starter vi i mellomrom uten bakromstrussel, får motstander ofte stå høyere og presse opp i ryggen.",
        ],
      },
      {
        title: "Bakrom: slik truer vi bak forsvarslinja",
        paragraphs: [
          "Spisser starter bakromsløp umiddelbart ved ballvinning. Bevegelsene må variere for å skape usikkerhet: ballside-spiss kan true bak stopper eller back, mens spiss nummer to kan true mellom stopperne eller gå bueløp bak andre stopper.",
          "Kanter velger motsatt av spissens bevegelse. Går spiss i bakrom, holder kanten bredde. Møter spiss i fot, kan kanten true rommet bak. Indreløper kan også komme på bakromsløp fra mellomrom, noe som ofte gir store sjanser.",
        ],
        bullets: [
          "Pasningslegger er som regel sentral midtbane eller stopper med riktig pasningsfot. Ikke alle skal slå disse ballene.",
          "Den vanligste feilen er for tidlig pasning på første bevegelse i stedet for å vente til løperen virkelig har skapt fordel.",
          "Timing mellom passer og løper er viktigere enn tempo alene.",
        ],
      },
      {
        title: "Mellomrom: slik spiller vi gjennom pressledd",
        paragraphs: [
          "Mellomrommet blir interessant først når bakromstrusselen har fått motstander til å falle. Da oppstår rom mellom midtbaneledd og forsvarsledd.",
          "Innoverkanter kan skjære inn fra bredde og tilby seg rettvendt. Når kanten går inn, skal backen løfte seg og holde bredden. Én sentral midtbanespiller kan splitte opp bak spissene, mens den andre sikrer bak ballen.",
          "Vending av spill og pådrag fra ballfører er ofte det som åpner dette rommet mot lav blokk.",
        ],
        bullets: [
          "Rettvendt mottak er avgjørende. Spilleren må orientere seg før ballen kommer.",
          "Én spiller går opp i mellomrom, én holder balanse bak ballen.",
          "Når vi får rettvendt mottak mellom ledd, må neste aksjon komme raskt og framover.",
        ],
      },
      {
        title: "Kanter: bredde som verktøy, ikke mål i seg selv",
        paragraphs: [
          "Bredde på kant skal skape dilemma hos motstander. Backen må velge mellom å følge ut eller holde seg sentralt. Overlapp gir overtall ute, mens underlapp kan åpne rom mellom motstanders back og stopper.",
          "Etter gjennombrudd på kant bør vi oftere søke cut-back eller 45-graderspasning enn høye innlegg.",
        ],
        bullets: [
          "Spiss angriper første stolpe.",
          "Kant eller indreløper fyller bakre rom.",
          "Én spiller må angripe returrommet utenfor boksen.",
        ],
      },
    ],
  },
  {
    id: "theory-roseborg-attack-postulates",
    category: "spillerbudskap",
    title: "Roseborg: angrepspostulater",
    summary: "Spill framover når du kan, bruk motsatte bevegelser og skap bredde, støtte og bakrom samtidig.",
    coachNote:
      "Bruk dette som felles rammeverk for valg i angrep: lengderetning først, støtte rundt ballfører, og løp som åpner for andre.",
    playerMessage:
      "Vend fram når du kan. Når én møter, må en annen stikke. Hold bredden og let etter rommet bak motstander.",
    sections: [
      {
        title: "Kjerne i angrepsspillet",
        bullets: [
          "Spill i lengderetningen når det er mulig. Støttepasning brukes for å komme fram, ikke for å gjemme ballen.",
          "Når én møter i ball, bør en annen true bakrom. Motsatte bevegelser skaper ubalanse.",
          "Hold alltid bredde på angrepssida og strekk opp laget når rommet finnes.",
          "Ballfører skal ha støtte tett nok til å spille sikkert, men også trusler foran seg.",
          "Utnytt rom både mellom lagdelene og bak backrekka når motstander ligger høyt.",
        ],
      },
      {
        title: "Gjennombrudd og innlegg",
        bullets: [
          "Vinkle oppbyggingspasningen innover i banen, men søk gjennombrudd utover eller bakfra når rommet åpner seg.",
          "Etter gjennombrudd på kant er ballførers posisjon avgjørende: tidlig innlegg bak backrekka er ofte beste løsning.",
          "Angrip første stolpe, rommet foran keeper og bakre stolpe med tydelige roller.",
          "Når tidlig innlegg ikke kommer, søk ny posisjon og vær klar for gjenvinning eller klareringsball.",
          "Vær besluttsom foran mål. Press alene skaper flere sjanser enn passivitet.",
        ],
      },
      {
        title: "Presiseringer fra Roseborg-miljøet",
        paragraphs: [
          "Senere presiseringer løfter fram bevegelser i forkant av pasningen, ikke bare på pasningsøyeblikket. Førstebevegelsen skal ofte utløse andre- og tredjebevegelsen.",
          "På kant skal vi utfordre for å skape overtall og innleggssituasjon, men med resten av laget i balanse for å tåle balltapet om gjennombruddet stoppes.",
        ],
      },
    ],
  },
  {
    id: "theory-roseborg-defense-postulates",
    category: "spillerbudskap",
    title: "Roseborg: forsvarspostulater",
    summary: "Korte avstander, tydelig første-forsvarer og samordnet skyving avgjør om presset blir aggressivt eller kontrollert.",
    coachNote:
      "Skill tydelig mellom høyt sjokkpress og lavere kontrollpress, men krev samme prinsipp: press, sikring og dekking av rom samtidig.",
    playerMessage:
      "Når vi forsvarer, skal én presse, de andre sikre og skyve samlet. Avstanden mellom leddene må være kort.",
    sections: [
      {
        title: "Presshøyde og avstander",
        bullets: [
          "Høyt press: bakre ledd kan stå rundt midtstreken hvis presset på ball er reelt og laget er samlet.",
          "Lavere press: spisser og midtbane trekker ned, men avstanden mellom leddene skal fortsatt være kort.",
          "Sideveis avstand må være liten nok til at laget kan sideforskyve raskt ved ballflytting.",
          "Når førsteforsvarer støter, faller og sikrer de andre i forhold til ball, rom og medspillere.",
        ],
      },
      {
        title: "Når motstander angriper sentralt eller på kant",
        bullets: [
          "Ved sentralt angrep skal laget konsentrere seg og nekte spill gjennom rommet foran stopperne.",
          "Ved angrep på kant skal hele laget sideforskyve. Ballnær side presser opp, motsatt side faller inn og bakover.",
          "Midtspiss kan styre eller presse førsteforsvarer, men må ikke åpne sentral korridor gratis.",
          "Soneforsvar oppheves nær 16-meteren, der markering og duellstyrke blir viktigere.",
        ],
      },
      {
        title: "Rollepresiseringer",
        paragraphs: [
          "Keeper omtales som sweeper og har ansvar for å dirigere dødball og støtte trykke-/fallebevegelsen bakfra.",
          "Backrekka skal være sterkt soneorientert. Spillere som ikke er førsteforsvarer holder linje og posisjon på linja, mens ballnær back kan bryte ut når laget sikrer bak.",
          "På midtbanen ligger den sentrale spilleren gjerne litt dypere for å nekte mellomrom. Hvis en midtbanespiller bryter ut i press, må sideforskyvingen bak være umiddelbar.",
        ],
      },
    ],
  },
  {
    id: "theory-roseborg-regain-priorities",
    category: "trenerfokus",
    title: "Roseborg: prioritering i forsvar",
    summary: "Forsvar handler om rekkefølge: vinn ballen, hindre mål, vinn duellen og kontroller andreball i framrom og bakrom.",
    coachNote:
      "Dette er et nyttig trenerfilter i kampnære øvelser: belønn handlinger som stopper mål først, og deretter handlinger som gjør laget i stand til å vinne neste ball.",
    playerMessage:
      "Det nærmest eget mål prioriteres først. Vinn duellen, nekt mål og vær klar for andreballen.",
    sections: [
      {
        title: "Praktisk rekkefølge",
        bullets: [
          "Hindre mål kommer før alt annet når motstander er nær eget mål.",
          "Å vinne oppspillspasningen eller duellen foran motspiller er ofte første steg i godt forsvar.",
          "Gjenvinningssituasjoner favoriserer ofte spilleren som nettopp mistet ballen, fordi avstanden til press er kortest der og da.",
          "Andreball i framrom og bakrom må angripes aktivt av laget rundt duellen, ikke overlates til tilfeldigheter.",
        ],
      },
      {
        title: "Konsekvens for trening",
        paragraphs: [
          "I spilløvelser bør treneren se etter om laget reagerer kollektivt rundt første duell: én presser, én sikrer rom, og flere forbereder seg på neste ball.",
          "Dette gjør forsvarsarbeidet mer enn bare press på ballfører. Det blir en felles kamp om første- og andreball, med tydelig prioritet etter hvor farlig situasjonen er.",
        ],
      },
    ],
  },
];

export const getSessionTheoryItem = (id: string) =>
  sessionTheoryItems.find((item) => item.id === id);

export const getSessionTheoryCategoryLabel = (
  category: SessionTheoryItem["category"]
) => {
  if (category === "trenerfokus") return "Trenerfokus";
  if (category === "spillerbudskap") return "Spillerbudskap";
  return "Læringsprinsipp";
};
