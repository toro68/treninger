export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  example?: string;
};

export const glossaryTerms: Record<string, GlossaryTerm> = {
  etasje: {
    id: "etasje",
    term: "Etasjer (banedeling)",
    definition:
      "NFFs dynamiske soneinndeling av banen i lengderetning. Fire etasjer brukes for å beskrive presshøyde og hvor vi ønsker å vinne ball: 1. etasje = foran eget mål (lav blokk), 2. etasje = egen halvdel bak midtlinjen, 3. etasje = motstanderens halvdel foran midtlinjen, 4. etasje = foran motstanderens mål (høypress). Mer fleksibel enn tredeler da grensene flytter seg med spillets dynamikk.",
    example: "Vi presser i 3. etasje på deres oppspill, men faller til 2. etasje når de spiller seg ut.",
  },
  tredjemann: {
    id: "tredjemann",
    term: "Tredjemann",
    definition:
      "Spilleren som mottar pasningen etter at to medspillere allerede har kombinert. Kritisk for å bryte linjer og opprettholde tempo (sent i A02).",
    example: "Tredjemann starter løpet idet pasning #2 slås og kommer rettvendt i mellomrommet.",
  },
  treplustwo: {
    id: "treplustwo",
    term: "3+2-sikring",
    definition:
      "Balanseprinsipp: minst tre spillere bak ball + to sentrale sikringer før laget sender mange i angrep. Hindrer kontring på kontring (A12).",
    example: "Indreløper må bli igjen til vi har 3+2, ellers blir vi sårbare ved balltap.",
  },
  frysse_sla: {
    id: "frys-se-sla",
    term: "Frys–se–slå",
    definition:
      "Mentalt cue fra Fredriksen (A12): Etter ballvinning – frys ballen, løft blikket og slå først når rommet er definert (tempo-kontroll).",
    example: "Ballvinner frys-se-slår: tar et øyeblikk for å lese bakrom før pasningen går.",
  },
  forsteforsvarer: {
    id: "forsteforsvarer",
    term: "Førsteforsvarer (Signalspiller)",
    definition:
      "Spilleren nærmest ballfører – den viktigste i soneforsvaret. Signalspillerens handling definerer hva de andre ti spillerne gjør. Oppgaver: Vinn ball, opphold/led ballfører, hindre gjennombrudd, tving spill bakover eller ut mot sidelinje.",
    example: "Når du er førsteforsvarer, vis tydelig med kroppen hvor du leder ballen. Ropene 'Gå!' og 'Hold!' kommer fra spillerne bak som ser hele situasjonen.",
  },
  andreforsvarer: {
    id: "andreforsvarer",
    term: "Andreforsvarer (Sikring)",
    definition:
      "Nærmeste spiller til førsteforsvarer. Sikrer på rett side og/eller dekker farlig rom. Hvem sikrer hvem: Midtbane sikrer kant/midtbane, stopper sikrer stopper/back. Avstanden til førsteforsvarer avhenger av motstanderens ferdighet og tempo.",
    example: "Når backen støter (førsteforsvarer), må stopperen falle av som andreforsvarer og rope 'Jeg sikrer!' – klar til å ta over hvis backen blir slått.",
  },
  rettside: {
    id: "rettside",
    term: "Rett side",
    definition:
      "Grunnprinsipp i soneforsvar: Å stå mellom ball/motstander og eget mål. Prioritering: Først på rett side av ballen, deretter på rett side av både ball og motstander i farlige soner. Gir mulighet til å gripe inn uten å bli passert.",
    example: "Kantspilleren var på feil side etter balltap – et raskt returløp tilbake på rett side stengte gjennombruddet.",
  },
  balanse: {
    id: "balanse",
    term: "Balanse (defensiv)",
    definition:
      "Lagets evne til å ha riktig antall spillere bak ball og i sentrale posisjoner for å møte et eventuelt balltap. God balanse = kort vei til å etablere forsvar. Innebærer at noen spillere alltid holder igjen mens andre går i angrep.",
    example: "Vi hadde dårlig balanse – alle var fremme og ingen sikret sentralt da vi mistet ballen.",
  },
  pasningslinje: {
    id: "pasningslinje",
    term: "Pasningslinje (pasningskorridor)",
    definition:
      "Den tenkte linjen mellom ballfører og en potensiell mottaker. I forsvar: Steng pasningslinjer for å tvinge spill dit vi vil. I angrep: Åpne pasningslinjer med bevegelse og posisjonering.",
    example: "Tredjeforsvarer roper 'Steng 10!' og plasserer seg i pasningslinjen mellom ballfører og motstanderens playmaker.",
  },
  stottespiller: {
    id: "stottespiller",
    term: "Støttespiller",
    definition:
      "Medspiller som tilbyr seg i en posisjon der ballfører kan spille en enkel pasning for å beholde ball, avlaste press eller endre angrepsvinkelen. Viktig for å skape trekanter og sikre ballsirkulasjon.",
    example: "Ankeret tilbyr seg alltid som støttespiller for stopperne – en trygg utgang under press.",
  },
  frirom: {
    id: "frirom",
    term: "Frirom",
    definition:
      "Område på banen uten motspillere der en medspiller kan motta ball med tid og rom. Skapes gjennom bevegelse (trekke med seg markering), pasningsspill (flytte forsvar) eller ved å utnytte forsvarets blindsoner.",
    example: "Spissen trakk stopperen ut og skapte frirom for indreløperen som kom på løp.",
  },
  kompakthet: {
    id: "kompakthet",
    term: "Kompakthet",
    definition:
      "Kort avstand mellom lagdelene (lengde) og mellom spillerne (bredde). Jo mer kompakt, desto mindre rom har motstanderen å spille i. Oppnås gjennom pumping og sideforskyvning. Ideelt: Maks 35-40m fra første til siste forsvarsledd.",
    example: "Laget må være kompakt – pump opp backrekka når førsteforsvarer presser!",
  },
  pressfelle: {
    id: "pressfelle",
    term: "Pressfelle",
    definition:
      "Planlagt situasjon der laget lokker motstanderen til å spille i et område for så å stenge alle utveier med koordinert press. Krever timing mellom førsteforsvarer og sikring. Sidelinje og hjørner er naturlige pressfeller.",
    example: "Vi la pressfelle langs sidelinja – ledet ballen dit, så stengte back og kant samtidig.",
  },
  blindsone: {
    id: "blindsone",
    term: "Blindsone",
    definition:
      "Området bak en forsvarer som denne ikke kan se uten å snu hodet. Angripere utnytter blindsoner ved å starte løp i det øyeblikket forsvareren fokuserer på ballen. Forsvarere må sjekke skulder for å unngå å miste spillere.",
    example: "Indreløperen startet løpet i backen sin blindsone og kom fri i boksen.",
  },
  ballbesittelse: {
    id: "ballbesittelse",
    term: "Ballbesittelse (possession)",
    definition:
      "Kontrollert ballinnehav for å flytte motstanderen, trekke ut markeringer og skape rom før gjennombrudd. Ikke et mål i seg selv, men et middel for å kontrollere tempo og skape sjanser. Krever gode støttevinkler og bevegelse.",
    example: "Vi spiller ballbesittelse for å dra presset til én side før vi bryter motsatt.",
  },
  lop_i_bakrom: {
    id: "lop_i_bakrom",
    term: "Løp i bakrom",
    definition:
      "Koordinert løp bak siste forsvarslinje for å true dybden. Timing er kritisk: Løpet må starte før pasningen slås. Kombineres ofte med motløp eller bevegelse som trekker forsvarere ut av posisjon.",
    example: "Vingen gjorde løp i bakrom idet midtbanespilleren løftet blikket – perfekt timing ga 1v1 med keeper.",
  },
  cutback: {
    id: "cutback",
    term: "Cut-back",
    definition:
      "Innleggspasning der kantspiller/back driver mot kortlinja og slår ballen tilbake (45° bakover eller skrått ut) til medspiller i mellomrom/bakre støtte. Brukes for å utnytte forsvarerens momentum mot mål og åpne avslutning fra andre bølge.",
    example: "Backen gikk til kortlinja, stoppet opp og slo cut-back til indreløperen som kom på andre bølge og scoret.",
  },
  vendepunkt: {
    id: "vendepunkt",
    term: "Vendepunkt",
    definition:
      "Spiller (ofte anker eller spiss) som mottar ball med ryggen mot mål og vender spillet til motsatt side eller fremover. Kritisk for å endre angrepsvinkelen og utnytte overbelastning.",
    example: "Ankeret fungerte som vendepunkt – mottok fra venstre stopper og vendte spillet til høyre back i rom.",
  },
  overbelastning: {
    id: "overbelastning",
    term: "Overbelastning",
    definition:
      "Taktisk prinsipp der laget plasserer flere spillere på én side av banen enn motstanderen kan dekke. Skaper overtall lokalt. Kombineres ofte med raske vendinger til undersiden der det er frirom.",
    example: "Vi overbelastet venstre med kant, back og indreløper – da de forskjøv, slo vi diagonalt til høyre.",
  },
};

export const getGlossaryTerm = (id: string): GlossaryTerm | undefined => glossaryTerms[id];
