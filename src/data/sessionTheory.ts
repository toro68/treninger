export type SessionTheoryItem = {
  id: string;
  category: "trenerfokus" | "spillerbudskap" | "læringsprinsipp";
  title: string;
  summary: string;
  imageUrl?: string;
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
    playerMessage: "Orienter deg før mottak. Se etter rom, hvor er medspillere og motspillere, så du kan ta første touch framover i banen - eller bort fra press.",
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
    id: "theory-build-from-goal-structure-and-tasks",
    category: "spillerbudskap",
    title: "Utspill fra eget mål: struktur og oppgaver",
    summary: "Godt utspill fra eget mål krever struktur før pasningen og tydelige oppgaver når presset kommer.",
    coachNote: "Se først etter struktur før ballen går: bredde, dybde, vinkler og én spiller mellom ledd. Deretter: hvem gir støtte, hvem vender opp, og hvem truer bak presset?",
    playerMessage: "Før ballen går må vi gi keeper vinkler og avstander. Når presset kommer må vi vite neste handling, og true både mellomrom og rommet bak.",
    sections: [
      {
        title: "Posisjonering",
        paragraphs: [
          "Målet er å skape bredde, dybde og klare vinkler rundt ballfører.",
        ],
        bullets: [
          "Keeper må ha minst to korte alternativer.",
          "Stopperne må gi bredde uten å bli for flate.",
          "Backene må vurdere høyde ut fra pressbildet: enten gi et lavt alternativ eller stå høyere for å dra ut press.",
          "En sentral midtbane må være spillbar mellom første og andre pressledd, helst halvt vendt.",
          "Resten må strekke banen nok til at motstander ikke kan presse alt på liten flate.",
        ],
      },
      {
        title: "Oppgaver",
        bullets: [
          "Keeper skal styre tempo, lese presset og velge side ut fra hvor neste fordel ligger.",
          "Nærmeste spillere må gi tydelige støttevinkler, men ikke stå på samme linje.",
          "Spilleren som mottar første pasning må orientere før ballen kommer og vite neste handling på forhånd.",
          "Spillere lenger unna ball må enten gjøre seg spillbare eller true rommet bak presset.",
          "Det kan være ved å trekke fra og komme mot, eller komme mot og gå i rom.",
          "Hvis laget spiller forbi første press, må neste handling være framover eller vendingsspill.",
        ],
      },
      {
        title: "Enkel huskeregel",
        bullets: [
          "Skap trekanter rundt ball.",
          "Ha én spiller mellom ledd.",
          "Ha én trussel i rommet bak presset.",
          "Vend raskt hvis motstander låser én side.",
          "Ved balltap må nærmeste reagere umiddelbart for å hindre direkte overgang.",
        ],
      },
    ],
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
  {
    id: "theory-drillo-spilleprinsippmodellen",
    category: "læringsprinsipp",
    title: "Drillo: spilleprinsipp-modellen",
    summary:
      "Vi angriper for å skape gjennombrudd. Vi forsvarer for å stanse gjennombrudd. Derfor må laget alltid være organisert for neste fase.",
    coachNote:
      "Bruk få prinsipper. Gjenta dem ofte. Alt spillet gjør skal kunne forklares gjennom gjennombrudd, dybde, bredde, bevegelse, konsentrering og balanse.",
    playerMessage:
      "Er vi ikke klare for neste fase, er vi dårlig organisert - både med og uten ball.",
    sections: [
      {
        title: "Det betyr:",
        bullets: [
          "Gjennombrudd framover, hindre gjennombrudd imot.",
          "Dybde i eget angrep, dybde i eget forsvar.",
          "Bredde med ball, konsentrering uten ball.",
          "Bevegelse i angrep, balanse ved balltap.",
        ],
      },
      {
        title: "Kampregel",
        paragraphs: [
          "Hvis vi angriper uten å være klare for balltap, er vi dårlig organisert. Hvis vi forsvarer uten å være klare for ballgjenvinning, er vi også dårlig organisert.",
        ],
      },
    ],
  },
  {
    id: "theory-drillo-gjennombrudd-forst",
    category: "spillerbudskap",
    title: "Drillo: gjennombrudd først",
    summary: "I angrep er gjennombruddet overordnet. Støtte, bredde og bevegelse er hjelpemidler for å komme framover.",
    coachNote:
      "Tell framoverspillet, ikke pasningene. Støtte er bare riktig når den skaper neste framoverrettede aksjon.",
    playerMessage:
      "Se fram først. Spill støtte bare når den setter opp neste gjennombrudd.",
    sections: [
      {
        title: "Hva dette betyr i praksis",
        paragraphs: [
          "Gjennombrudd er når vi spiller forbi motspillere i lengderetning og flytter spillet nærmere mål.",
          "Støtte er ikke et mål i seg selv. Den er bare riktig når den gjør neste framoverrettede aksjon mulig.",
        ],
        bullets: [
          "Støttepasning skal skape nytt gjennombrudd, ikke skjule mangel på framdrift.",
          "Dybde, bredde og bevegelse er bare gode nok hvis de hjelper laget framover.",
          "En trygg pasning er bare god når den forbedrer neste aksjon.",
        ],
      },
    ],
  },
  {
    id: "theory-drillo-dybde-bredde-bevegelse",
    category: "spillerbudskap",
    title: "Drillo: dybde, bredde og bevegelse",
    summary: "Ballfører trenger alternativer foran, til siden og rundt seg. Gode avstander og løp gjør gjennombrudd mulig.",
    coachNote:
      "Se etter avstand og timing, ikke bare aktivitet. Mange løp er verdiløse hvis de kommer i samme rom eller samme linje.",
    playerMessage:
      "Gi ballfører flere valg. Ikke stå på linje. Når én går, må en annen støtte eller åpne et nytt rom.",
    sections: [
      {
        title: "Struktur rundt ballfører",
        bullets: [
          "Dybde i angrep betyr at ballfører har flere pasningsalternativer i lengderetningen.",
          "Bredde brukes for å strekke motstander og åpne rom sentralt eller på motsatt side.",
          "Bevegelse framover må komme med riktig timing; fart uten timing skaper ofte bare balltap.",
          "Ved innlegg må angripere unngå å bli stående på samme linje foran mål.",
        ],
      },
    ],
  },
  {
    id: "theory-drillo-soneforsvar",
    category: "spillerbudskap",
    title: "Drillo: soneforsvar med press og sikring",
    summary: "Et godt soneforsvar prioriterer press på ballfører, sikring bak presset og korte avstander mellom medspillere.",
    coachNote:
      "Press teller bare når det er sikring bak. Avstandene avgjør om laget forsvarer samlet eller bare løper hver for seg.",
    playerMessage:
      "Én presser, én sikrer, resten samler. Du forsvarer ikke alene.",
    sections: [
      {
        title: "Defensiv prioritering",
        paragraphs: [
          "Soneforsvar er å gjøre rommet rundt ballfører trangt og ha sikring bak presset.",
          "Førsteforsvarer setter retning og trykk. Presset er bare godt nok når laget rundt er tett nok til å sikre og stenge rom.",
        ],
        bullets: [
          "Hindre gjennombrudd er første oppgave.",
          "Konsentrering rundt ball gjør sikringen sterkere.",
          "Dybde i forsvar er avstanden mellom presser og sikrer, og mellom leddene bak.",
        ],
      },
    ],
  },
  {
    id: "theory-drillo-presshoyde",
    category: "trenerfokus",
    title: "Drillo: velg presshøyde bevisst",
    summary: "Høyt og lavt press er ikke identitetsspørsmål, men kampvalg. Presshøyden må passe motstander og egen evne til å være samlet.",
    coachNote:
      "Velg presshøyde ut fra hva laget klarer å gjøre samlet. Feil presshøyde gir bare lange lag og svake pressledd.",
    playerMessage:
      "Det spiller mindre rolle hvor vi presser enn om vi starter samlet og flytter samlet.",
    sections: [
      {
        title: "Når laget presser høyt eller lavt",
        bullets: [
          "Høyt press gir kort vei til mål ved ballvinning og kan holde laget aggressivt.",
          "Lavere press kan være riktig når motstander spiller seg ut, eller rommet bak blir for sårbart.",
          "Det avgjørende er ikke bare høyden, men at alle vet når presset starter.",
          "Lavt press er bare godt nok når laget fortsatt er kompakt og aktivt.",
        ],
      },
    ],
  },
  {
    id: "theory-drillo-forste-og-andreball",
    category: "spillerbudskap",
    title: "Drillo: første- og andreball",
    summary: "Direkte spill virker bare når laget er organisert for både første ball og andreball.",
    coachNote:
      "Ikke vurder den lange ballen alene. Vurder hvordan laget er plassert rundt duellen og nedfallsrommet.",
    playerMessage:
      "Ikke følg bare ballbanen. Vær på plass der neste ball kommer.",
    sections: [
      {
        title: "Rundt den første duellen",
        bullets: [
          "Den som går i første duell må ha støtte rundt nedfallsrommet.",
          "Formasjonen rundt duellen avgjør om direkte spill blir angrep eller balltap.",
          "Selv uten ren seier i første duell kan laget eie situasjonen gjennom andreballen.",
        ],
      },
    ],
  },
  {
    id: "theory-drillo-dodball-effektivitet",
    category: "trenerfokus",
    title: "Drillo: dødball som kampvåpen",
    summary: "Dødball er en stor del av effektiv fotball. Struktur og tydelige roller gjør stillestående situasjoner til en reell fordel.",
    coachNote:
      "Velg få varianter, gjenta dem og fordel ansvar tydelig. Dødball vinner kamper når rollene sitter.",
    playerMessage:
      "På dødball skal alle vite oppgaven før ballen slås. Timing og ansvar slår improvisasjon.",
    sections: [
      {
        title: "Hva laget må være tydelig på",
        bullets: [
          "Hvem som angriper første sone, sentral sone og bakre rom offensivt.",
          "Hvem som eier returrommet og overgangen hvis første ball ikke vinnes rent.",
          "Hvem som markerer, hvem som dekker sone og hvem som tar første klarering defensivt.",
          "Keeperstyring og felles signaler som alle kjenner.",
        ],
      },
    ],
  },
  {
    id: "theory-offensiv-corner-roller",
    category: "spillerbudskap",
    title: "Offensiv corner: roller og løp",
    summary: "En god corner trenger klare løp i boksen og én eller to spillere som er klare på returen utenfor feltet.",
    imageUrl: "/book-illustrations/drillo/drillo-figur-31-corner-grunnoppstilling.png",
    coachNote:
      "Velg få roller og repeter dem. Løpene må skape rom, og returrommet kan aldri stå tomt.",
    playerMessage:
      "Én går første stolpe, én går sentralt, én går bakre, og noen eier returen.",
    sections: [
      {
        title: "Standard for en enkel cornerpakke",
        bullets: [
          "Avklar første stolpe, sentral sone, bakre rom og returrom før serven.",
          "Løp med timing og fart, ikke tidlig og ikke flatt på linje.",
          "Bruk blokk eller kryssløp bare når det er innøvd og frigjør avslutteren.",
          "Hvis første ball ikke vinnes, skal laget eie andreballen.",
        ],
      },
    ],
  },
  {
    id: "theory-defensiv-corner-prinsipper",
    category: "spillerbudskap",
    title: "Defensiv corner: første ball og retur",
    summary:
      "Ved defensiv corner må laget beskytte nærmeste stolpe, rommet midt foran mål og bakre rom, og fullføre til situasjonen er avklart.",
    coachNote:
      "Velg en tydelig balanse mellom romdekking og markering. Tren utgangsposisjon, kroppsstilling og keeperstyring i de tre farligste rommene.",
    playerMessage:
      "Vit om du dekker rom eller markerer spiller. Vinn ballen i sonen din og fullfør til situasjonen er avklart.",
    sections: [
      {
        title: "Defensive nøkkelpunkt",
        bullets: [
          "Beskytt området ved nærmeste stolpe, rommet midt foran mål og bakre stolpe med klare roller.",
          "Bruk sterke hodespillere i rommene som skal angripes, og la resten løse tydelige markeringsoppgaver.",
          "Keeperen organiserer før serven og må stå slik at han kan se og bevege seg både framover og bakover.",
          "Klarér og skyv ut samlet, men først når situasjonen faktisk er avklart.",
        ],
      },
    ],
  },
  {
    id: "theory-frispark-boks-og-mur",
    category: "trenerfokus",
    title: "Frispark: raske valg og faste mønstre",
    summary:
      "Ved frispark utenfor skuddhold bør laget enten ta det hurtig eller bruke en fast oppstilling som setter press på bakrom og andreball.",
    imageUrl: "/book-illustrations/drillo/drillo-figur-41-frispark-midtsone.png",
    coachNote:
      "Lag få rutiner og la dem styres av hvor frisparket tas. Spillerne må kjenne oppgaven før ballen legges død.",
    playerMessage:
      "Når vi spiller fast, skal noen møte, noen true bakrom og noen eie andreballen.",
    sections: [
      {
        title: "Hva laget må avklare",
        bullets: [
          "Om frisparket skal tas hurtig eller om laget skal inn i fast oppstilling.",
          "Hvem som møter på første serv, og hvem som angriper bakrommet fra hver sin side.",
          "Hvem som står i støtteposisjon for å vinne andreballen hvis første duell ikke avgjør situasjonen.",
          "At servekvalitet, timing og roller er innøvd nok til at laget slipper å improvisere.",
        ],
      },
    ],
  },
  {
    id: "theory-andreball-beredskap",
    category: "spillerbudskap",
    title: "Andreball: vær i forkant",
    summary:
      "Etter corner og frispark oppstår ofte gjenvinningsangrep på andreball. Den vinnes av laget som er rettvendt og på plass før klareringen kommer.",
    coachNote:
      "Belønn spillere som er tidlig i returrommet. Ett sekunds nøling etter klarering er ofte nok til å miste hele dødballsituasjonen.",
    playerMessage:
      "Les klareringen tidlig. Vær rettvendt og klar før neste ball kommer ut.",
    sections: [
      {
        title: "Andreball i praksis",
        bullets: [
          "Spillere i returrommet må stå rettvendt og klare til å angripe neste aksjon.",
          "Nærmeste spiller går fram i ball, mens resten sikrer rundt og bak.",
          "Andreballen kan gi ny avslutning, nytt innlegg eller direkte gjenvinning, så reaksjonen må komme med en gang.",
          "Lag som eier andreballen, eier ofte hele dødballsituasjonen selv uten å vinne første heading rent.",
        ],
      },
    ],
  },
  {
    id: "theory-nff-relasjonell-kompetanse",
    category: "spillerbudskap",
    title: "NFF: spill stort i angrep",
    summary: "I 11-er må laget gjøre banen stor. Bredde og dybde gir tid, rom og flere valg framover.",
    sections: [
      {
        title: "Angrepsretning og rom",
        bullets: [
          "Bruk bredde for å strekke laget imot.",
          "Bruk dybde for å true bakrom.",
          "Gjør banen stor når dere har kontroll.",
        ],
      },
    ],
  },
  {
    id: "theory-nff-fra-nier-til-ellever",
    category: "spillerbudskap",
    title: "NFF: flere spillpunkter rundt ballfører",
    summary: "I 11-er trenger ballfører flere spillpunkter. Ett støttepunkt er for lite.",
    sections: [
      {
        title: "Når laget bygger opp",
        bullets: [
          "Ha spillpunkt foran når dere kan spille fram.",
          "Ha støtte bak når presset må av.",
          "Ha motsatt side klar når spillsiden er stengt.",
        ],
      },
    ],
  },
  {
    id: "theory-nff-felles-sprak-og-spillide",
    category: "spillerbudskap",
    title: "NFF: rolleforståelse i 11-er",
    summary: "I 11-er må rollene utfylle hverandre. Noen truer, noen støtter, noen sikrer.",
    sections: [
      {
        title: "Rollekrav i laget",
        bullets: [
          "Ballnære spillere må skape støtte og pasningsvinkel.",
          "Spillere lenger unna må true nytt rom eller gjøre banen stor.",
          "Noen må alltid sikre bak neste trekk.",
        ],
      },
    ],
  },
  {
    id: "theory-nff-soneforsvar-hvorfor",
    category: "spillerbudskap",
    title: "NFF: godt forsvar skaper angrep",
    summary: "Godt forsvar handler om mer enn å nekte mål. Det er også starten på de beste angrepene.",
    sections: [
      {
        title: "Hvorfor NFF vektlegger forsvar",
        bullets: [
          "Konsentrering, dybde og balanse gjør laget vanskeligere å spille gjennom.",
          "Samstemt forflytning krymper tid og rom.",
          "Gode ballerobringer gir ofte de beste angrepene.",
        ],
      },
    ],
  },
  {
    id: "theory-nff-pa-rett-side",
    category: "spillerbudskap",
    title: "NFF: på rett side i soneforsvar",
    summary: "I soneforsvar betyr rett side først og fremst rett side av ball i riktig rom.",
    sections: [
      {
        title: "Hva rett side betyr",
        bullets: [
          "Spillere i det bakre leddet er oftest både på rett side av ball og motstander.",
          "Øvrige spillere må først komme på rett side av ball og inn i strukturen.",
          "Nær ballfører kan feil side fortsatt gi mulighet til å vinne ball i sandwich.",
        ],
      },
    ],
  },
  {
    id: "theory-nff-presshoyde-samstemthet",
    category: "trenerfokus",
    title: "NFF: presshøyde og samstemthet",
    summary: "Presshøyde må passe lagets evne til å stå samlet. Høyt og lavt press er verdiløst hvis laget splittes.",
    sections: [
      {
        title: "Når laget presser",
        bullets: [
          "1F må lede eller oppholde til laget samler seg bak presset.",
          "Alle avstander må justeres raskt når presset glipper.",
          "Lavt press er kontroll, ikke passivitet.",
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
