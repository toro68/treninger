/**
 * UEFA-analyser fra docs/uefa/*-ANALYSERT.md
 *
 * Når en ny oppgave er analysert med ANALYSE-MAL.md,
 * trekk ut feltene og legg til et nytt objekt her.
 *
 * Komponenten UEFASeksjon.tsx importerer denne filen.
 */

// ============================================
// TYPER
// ============================================

export type UEFAAnalyse = {
  /** Unik ID (lowercase, kebab-case) */
  id: string;
  /** Oppgavekode: A01-A12, B01, C01-C11, D01-D02, E01-E04 */
  kode: string;
  /** Kort tittel for visning */
  tittel: string;
  /** Forfatter av UEFA A-oppgaven */
  forfatter: string;
  /** Hovedtema (rolle/fase/prinsipp) */
  tema: string;
  /** Hvilke roller dette gjelder */
  roller: Rolle[];
  /** 3-5 setninger som oppsummerer kjernebudskapet */
  sammendrag: string;
  /** KPI-er fra dataanalysen */
  kpier: KPI[];
  /** Fokuspunkter til kampplan */
  fokuspunkter: Fokuspunkt[];
  /** Referanser til øvelser i øvelsesbanken */
  ovelser: OvelsesReferanse[];
  /** Coaching cues (gjør/ikke gjør) */
  coachingCues: CoachingCue[];
  /** Kildefil i docs/uefa/ */
  kildefil: string;
  /** Lenke til original oppgave */
  oppgaveUrl: string;
};

export type Rolle =
  | "Keeper"
  | "Høyreback"
  | "Venstreback"
  | "Back"
  | "Sideback"
  | "Stopper"
  | "Sentral midtbane"
  | "Indreløper"
  | "Offensiv midtbane"
  | "Høyrevinger"
  | "Venstrevinger"
  | "Vinger"
  | "Spiss"
  | "Vingback";

export type KPI = {
  navn: string;
  referanseverdi: string;
  kilde?: string;
};
export type Fokuspunkt = {
  id: string;
  tekst: string;
  rolle?: Rolle;
};

/** Referanse til øvelse i øvelsesbanken. */
export type OvelsesReferanse = {
  /** Kode som matcher uefa-exercises.ts (f.eks. "uefa-a10-01") */
  kode: string;
};

export type CoachingCue = {
  kategori: string;
  gjor: string;
  ikkeGjor: string;
};

// ============================================
// DATA
// ============================================

export const uefaAnalyses: UEFAAnalyse[] = [
  {
    id: "a04-barca-rytme",
    kode: "A04",
    tittel: "Høyt tempo eller god kontroll?",
    forfatter: "Finn Bredo Olsen",
    tema: "Angrepsrytme (touch, tempo, kontroll)",
    roller: ["Sentral midtbane", "Indreløper", "Vinger"],
    sammendrag:
      "Olsen loggførte alle touch i Barcelonas CL-scoringsangrep (2010/11) og fant 25 % ett-touch og 36 % to-touch involveringer (snitt 2,1). Barca giret opp (færre touch) når mål måtte jages, men senket tempoet for å kontrollere kampen når de ledet. Rytme handler om å vite når ett-touch skal bryte linjer og når to-touch skal gi kontroll.",
    kpier: [
      { navn: "Ett-touch involveringer", referanseverdi: "25 %", kilde: "Kap. 6.5" },
      { navn: "To-touch involveringer", referanseverdi: "36 %", kilde: "Kap. 6.5" },
      { navn: "Gjennomsnitt touch pr spiller", referanseverdi: "2,1", kilde: "Kap. 6.5" },
    ],
    fokuspunkter: [
      { id: "a04-touch", tekst: "1-touch når vi bryter linjer, 2-touch når vi kontrollerer" },
      { id: "a04-tempo", tekst: "Definér tempo-switch (press, resultat, tid)" },
      { id: "a04-maurtue", tekst: "Fyll rom rundt ball – maurtue-prinsippet" },
      { id: "a04-messi", tekst: "Messi-rolle: driv når rommet åpner seg" },
      { id: "a04-dirigent", tekst: "Dirigent (Xavi) styrer touch-krav" },
    ],
    ovelser: [
      { kode: "uefa-a04-01" },
      { kode: "uefa-a04-02" },
    ],
    coachingCues: [
      { kategori: "Tempo", gjor: "Rop 'Tempo!' når laget skal inn i ett-touch", ikkeGjor: "Ikke la laget spille samme rytme hele kampen" },
      { kategori: "Kontroll", gjor: "Bruk 2-3 touch for å stoppe klokka", ikkeGjor: "Ikke forhaste pasninger ved ledelse" },
      { kategori: "Støtte", gjor: "Strekk maurtua – gi vinkler", ikkeGjor: "Ikke bli stående i samme rom" },
    ],
    kildefil: "A04-barca-rytme-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa_a_2012_oppgave_finn_bredo_olsen.pdf",
  },

  {
    id: "a03-sekundene-som-avgjor",
    kode: "A03",
    tittel: "Sekundene som avgjør",
    forfatter: "Tom Selmer",
    tema: "Scoringsferdighet (avslutning på tid, kvalitet, plassering)",
    roller: ["Spiss", "Vinger", "Sentral midtbane"],
    sammendrag:
      "Selmer sammenligner 342 Tippeliga- og 277 Champions League-scoringer og finner store, konkrete forskjeller i avslutningskvalitet: 70,0 % av CL-scoringene går lavt i hjørnet (vs 41,5 % i Tippeligaen), 86,0 % scores med kontroll (vs 49,0 %), og 73 % scores med curl/plassering (vs 30 %). CL skaper også oftere avslutninger i sone 1cv/1ch (59,5 % vs 34,5 %), og beskriver hvorfor: tidlige innlegg mellom forsvar og keeper (ofte langs bakken), flere bevegelser i boks (2./3. bevegelse) og relasjonelle «Z-løp» som frigjør avslutter. I avslutningsøyeblikket handler det om å skaffe seg tid (medtak/bevegelse), være rolig nok til å velge plassering, og å utvikle automatisering gjennom kamplike repetisjoner (spesifisitetsprinsippet) og bevisstgjøring.",
    kpier: [
      { navn: "Lavt i hjørnet", referanseverdi: "70 % (CL) / 41,5 % (TL)", kilde: "Tabell 1" },
      { navn: "Kontrollerte scoringer", referanseverdi: "86 % (CL) / 49 % (TL)", kilde: "Kap. 6.3" },
      { navn: "Curl/plassering", referanseverdi: "73 % (CL) / 30 % (TL)", kilde: "Kap. 6.4" },
      { navn: "Scoringer sone 1cv/1ch", referanseverdi: "59,5 % (CL) / 34,5 % (TL)", kilde: "Kap. 6.5" },
      { navn: "Mål mellom bena på keeper", referanseverdi: "2 % (CL) / 10 % (TL)", kilde: "Kap. 6.5" },
    ],
    fokuspunkter: [
      { id: "a03-lavt", tekst: "Avslutt lavt i hjørnet – 0,5 m over bakken, 1 m fra stolpe", rolle: "Spiss" },
      { id: "a03-kontroll", tekst: "Velg presisjon fremfor kraft: kontroll, plassering og curl", rolle: "Vinger" },
      { id: "a03-tid", tekst: "Skaff tid før avslutning via gode medtak/bevegelser og ved å skape rom for hverandre" },
      { id: "a03-sone", tekst: "Søk avslutning i sone 1cv/1ch (nært mål): fyll boksen og jakt andreball" },
      { id: "a03-keeper", tekst: "Alene med keeper: utfordre og avvent keeperens handling før du plasserer/chipper", rolle: "Spiss" },
      { id: "a03-innlegg", tekst: "Tidlige innlegg mellom forsvar og keeper, ofte langs bakken (45°/cutback)" },
      { id: "a03-boks", tekst: "2. og 3. bevegelse i boks: første løp skaper rom, neste løp utnytter" },
      { id: "a03-z", tekst: "Z-løp for avslutter: inn mot stopper → rykk ut/tilbake i rommet som skapes" },
    ],
    ovelser: [
      { kode: "uefa-a03-01" },
      { kode: "uefa-a03-02" },
    ],
    coachingCues: [
      { kategori: "Avslutning", gjor: "Ta deg god tid før du setter ballen i mål", ikkeGjor: "Ikke skyt bare fordi du kan" },
      { kategori: "Plassering", gjor: "Førstevalg: lavt i hjørnet (tenk pasning i hjørnet)", ikkeGjor: "Ikke skyt i keeperhøyde når du har valg" },
      { kategori: "Teknikk", gjor: "Bruk innside/utside/liggende vrist og curl når du har kontroll", ikkeGjor: "Ikke la maks kraft bli standard i kontrollerte situasjoner" },
      { kategori: "1v1 keeper", gjor: "Vent – se – plasser/chipp (utfordre keeperen først)", ikkeGjor: "Ikke panikkskudd tidlig fra 16-meteren" },
      { kategori: "Innlegg", gjor: "Slå tidlige innlegg mellom forsvar og keeper, ofte langs bakken (cutback/45°)", ikkeGjor: "Ikke alltid gå til dødlinja og slå høyt" },
      { kategori: "Boks", gjor: "Kjør 2./3. bevegelse og Z-løp for å frigjøre avslutter", ikkeGjor: "Ikke stopp etter første rykk" },
    ],
    kildefil: "A03-avslutning-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa_a_2012_oppgave_tom_selmer.pdf",
  },
  {
    id: "a02-hva-sker-for-scoring",
    kode: "A02",
    tittel: "Hva skjer før scoring?",
    forfatter: "Per Inge Jacobsen",
    tema: "De tre siste spillerne (tempo, touch, roller)",
    roller: ["Sentral midtbane", "Indreløper", "Vinger", "Spiss"],
    sammendrag:
      "Jacobsen analyserte 340 scoringer (Barcelona, Bayern, Manchester United, Strømsgodset, Nordstrand) og ser på de tre siste involverte før scoring: tredjespiller → målgivende → målscorer. Kjernefunnene er at tredjespilleren er den «skjulte» playmakeren som setter tempoet via orientering før/under mottak, raske valg under press og en tydelig idé om hvor angrepet skal utvikles. Alle lagene i studien involverer kantspiller på en eller annen måte når tredjespilleren har ballen. Tempoet skiller nivåene tydeligst: internasjonale topplag bruker i snitt 6,37 sek fra tredjespiller mottar ball til scoring, mens Strømsgodset ligger på 7,09 og Nordstrand på 7,9. Antall berøringer reduseres jo nærmere mål man kommer; tredjespilleren på pro-lag bruker i snitt 2,17 berøringer, og målscoreren bruker hovedsakelig 1–2.",
    kpier: [
      { navn: "Tid (tredjespiller → scoring)", referanseverdi: "6,37 sek (topplag) / 7,09 (Strømsgodset) / 7,9 (Nordstrand)", kilde: "Sammendrag" },
      { navn: "Berøringer (3 siste involverte)", referanseverdi: "2,1 i snitt (topplag) / 2,32 (Nordstrand)", kilde: "Sammendrag" },
      { navn: "Berøringer (tredjespiller, pro-lag)", referanseverdi: "2,17 i snitt", kilde: "Sammendrag" },
      { navn: "Berøringer (målscorer)", referanseverdi: "Hovedsakelig 1–2 berøringer", kilde: "Figur 9" },
    ],
    fokuspunkter: [
      {
        id: "a02-tredjespiller-kjennetegn",
        tekst:
          "Tredjespilleren (tredje sist på ball): kontinuerlig orientering, raske valg under press og en klar idé om hvor/hvordan angrepet skal utvikles",
        rolle: "Sentral midtbane",
      },
      {
        id: "a02-touch",
        tekst: "Tredjespiller: orienter før mottak og spill på få touch (pro-lag: 2,17 i snitt)",
        rolle: "Sentral midtbane",
      },
      {
        id: "a02-tid",
        tekst:
          "Tempo i siste tredjedel: korte sekvenser fra tredjespiller til scoring (snitt 6,37 sek i topplag; 7,09 Strømsgodset; 7,9 Nordstrand)",
        rolle: "Indreløper",
      },
      {
        id: "a02-kant-involvering",
        tekst:
          "Kant involveres nesten alltid når tredjespilleren har ballen: sett opp kant/back for innlegg, 1v1 eller bakrom",
        rolle: "Vinger",
      },
      {
        id: "a02-assist",
        tekst:
          "Målgivende ledd: færre berøringer og raskere valg jo nærmere mål – ofte via kant/back i innleggsrom",
        rolle: "Vinger",
      },
      {
        id: "a02-etterpasning",
        tekst:
          "Bevegelse etter avlevering: tredjespilleren kan slippe til kant og sprint inn i boks for å dra stopper og åpne rom",
        rolle: "Indreløper",
      },
      {
        id: "a02-2v1-back",
        tekst:
          "Skap 2v1 på sideback: overlap/underlap + timing for å få innleggsrom eller gjennombrudd",
      },
      {
        id: "a02-vending",
        tekst:
          "Spillvending som våpen: hurtig vending på midtbanen for å angripe motsatt kant (vendingsspiller-rollen)",
      },
      {
        id: "a02-malscorer",
        tekst:
          "Målscorer: tendens til færre berøringer jo nærmere mål – målscorer bruker hovedsakelig 1–2 berøringer",
        rolle: "Spiss",
      },
      {
        id: "a02-orientering",
        tekst: "Orientering under press: skann før mottak og mens bildet endrer seg fra sekund til sekund",
        rolle: "Indreløper",
      },
    ],
    ovelser: [
      { kode: "uefa-a02-01" },
      { kode: "uefa-a02-02" },
    ],
    coachingCues: [
      { kategori: "Tredjespiller", gjor: "Skann før mottak og ta med første touch i fart", ikkeGjor: "Ikke ta imot flatfotet og spill kun støtte" },
      { kategori: "Tredjespiller", gjor: "Involver kant/back når du får ballen – sett opp 1v1/innleggsrom", ikkeGjor: "Ikke lås spillet i smale rom uten bredde" },
      { kategori: "Tempo", gjor: "Jakt flyt: korte sekvenser fra tredjespiller til avslutning", ikkeGjor: "Ikke senk tempo etter første gjennombrudd" },
      { kategori: "Berøringer", gjor: "Tren få-touch i siste tredjedel (målscorer: ofte 1–2)", ikkeGjor: "Ikke gi ekstra berøringer «for å få kontroll» nær boksen" },
      { kategori: "Relasjoner", gjor: "Skap 2v1 på back med overlap/underlap + timing", ikkeGjor: "Ikke løp samme rom samtidig" },
      { kategori: "Etterpasning", gjor: "Etter avlevering: løp inn i boks/45° for å binde stopper og åpne rom", ikkeGjor: "Ikke bli stående og se på etter pasning" },
    ],
    kildefil: "A02-angrep-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2013-oppgave-per-inge-jacobsen.pdf",
  },
  // ──────────────────────────────────────────
  // A01: Juventus 3-5-2 (Even Ødegaard)
  // Kilde: docs/uefa/A01-even-odegard-analysed-v2.md
  // ──────────────────────────────────────────
  {
    id: "a01-juventus-352",
    kode: "A01",
    tittel: "Juventus 3-5-2 som virkemiddel",
    forfatter: "Even Ødegaard",
    tema: "3-5-2 kampplan (forsvar, angrep, gjenvinning)",
    roller: ["Stopper", "Vingback", "Sentral midtbane", "Indreløper", "Spiss"],
    sammendrag:
      "Oppgaven destillerer Juventus’ 3-5-2 til en komplett kampplan: lavt press som default (5 bak, steng mellom-/bakrom), høyt press på avtalte signaler (nese mot mål, tverspasning, dårlig touch) og tydelige pressmekanismer (spiss-stopper, vingback leder inn, sideforskyving). Offensivt er vingback permanent bredde, ytre stopper bærer fram, spissrelasjonen møte–stikk og boksfyll/returrom ved innlegg. Gjenvinning (5-sekundersregel, kontradekning) er et eget våpen, mens overgangssårbarhet håndteres via risikovurdering og 1v1-kvalitet bak.",
    kpier: [
      { navn: "Mål etter gjenvinningsangrep", referanseverdi: "18 av 87 (20 %)", kilde: "Juventus-analyse" },
      { navn: "Mål etter overgang (breakdown)", referanseverdi: "10 av 87 (8,7 %)", kilde: "Juventus-analyse" },
      { navn: "Innslupne mål etter overgang imot", referanseverdi: "12 av 36 (33 %)", kilde: "Juventus-analyse" },
    ],
    fokuspunkter: [
      { id: "a01-forsvar", tekst: "Default = 5-3-2 lav blokk – steng mellom-/bakrom og led mot rom 1–2" },
      { id: "a01-hoyt-press", tekst: "Gå høyt kun på signaler (nese mot mål, tverspasning, dårlig touch/klarering)" },
      { id: "a01-pressmekanisme", tekst: "Spiss presser stopper, vingback leder inn, ytre stopper skyver – resten sideforskyver", rolle: "Vingback" },
      { id: "a01-press-risiko", tekst: "Husk bakrom når vi går høyt – enten presset sitter, eller vi faller" },
      { id: "a01-angrep-bredde", tekst: "Vingback står helt bredt for å åpne midten; vend via dem hvis ikke gjennombrudd" },
      { id: "a01-spissrelasjon", tekst: "Spissduo i møte–stikk: én møter, én truer bakrom", rolle: "Spiss" },
      { id: "a01-indreloper", tekst: "Indreløper: møt for å åpne rom eller gå tredje mann i bakrom", rolle: "Indreløper" },
      { id: "a01-innlegg", tekst: "Innlegg: fyll boks (2 spisser + motsatt indreløper + motsatt vingback) og bemann returrom" },
      { id: "a01-gjenvinning", tekst: "5-sekundersregel + kontradekning = gjenvinning som våpen" },
      { id: "a01-overgang", tekst: "Overgang imot: stoppere må vurdere risiko når de fører, og tåle 1v1" },
    ],
    ovelser: [
      { kode: "uefa-a01-01" },
      { kode: "uefa-a01-02" },
      { kode: "uefa-a01-03" },
      { kode: "uefa-a01-04" },
    ],
    coachingCues: [
      { kategori: "Press-signaler", gjor: "Rop signal og gå samtidig", ikkeGjor: "Ikke la press bli individuell innsats" },
      { kategori: "Romprioritering", gjor: "Steng mellomrom/bakrom først og led mot rom 1–2", ikkeGjor: "Ikke åpne midten for å vinne ballen" },
      { kategori: "Vingback", gjor: "Vær vendingspunkt og fyll boks på bakre – så returløp og sikre femmer", ikkeGjor: "Ikke bli stående høyt etter tap" },
      { kategori: "Spissrelasjon", gjor: "Møte/stikk – motsatte løp og avlegg på riktig tidspunkt", ikkeGjor: "Ikke løp samme rom" },
      { kategori: "Returrom", gjor: "Ha folk i returrom for 2. ball/gjenvinning", ikkeGjor: "Ikke tøm midten når innlegget går" },
    ],
    kildefil: "A01-even-odegard-analysed-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2014-oppgave-even-odegard.pdf",
  },
  // ──────────────────────────────────────────
  // A05: Mine suksesskriterier (Christer Basma)
  // Kilde: docs/uefa/A05-basma-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a05-suksesskriterier",
    kode: "A05",
    tittel: "Mine suksesskriterier",
    forfatter: "Christer Basma",
    tema: "Spillerutvikling, langsiktig utvikling",
    roller: ["Keeper", "Back", "Stopper", "Sentral midtbane", "Vinger", "Spiss"],
    sammendrag:
      "Basma beskriver sin vei fra knøtt til RBK og destillerer syv suksesskriterier: talentgrunnlag, vilje til å ta konsekvenser, treningsvillighet, klubber/trenere som tror på deg, trygt utviklingsmiljø, egne valg og fokus på livet etter fotballen. Oppgaven gir en normativ modell for norsk spillerutvikling.",
    kpier: [],
    fokuspunkter: [
      { id: "a05-talent", tekst: "Talent – identifiser og bygg videre" },
      { id: "a05-vilje", tekst: "Vilje til konsekvenser – ofre for drømmen" },
      { id: "a05-trening", tekst: "Treningsvillighet – mengde + kvalitet" },
      { id: "a05-klubb", tekst: "Klubben/treneren må tro på deg" },
      { id: "a05-miljo", tekst: "Trygt utviklingsmiljø" },
      { id: "a05-valg", tekst: "Egen vurdering – ta riktige valg" },
      { id: "a05-etter", tekst: "Fokus på livet etter fotballen" },
    ],
    ovelser: [
      { kode: "uefa-a05-01" },
      { kode: "uefa-a05-02" },
    ],
    coachingCues: [
      { kategori: "Ansvar", gjor: "Ta ansvar for valgene dine", ikkeGjor: "La tilfeldigheter styre" },
      { kategori: "Balanse", gjor: "Trening + skole + sosialt", ikkeGjor: "Forsøm utdanning" },
      { kategori: "Miljø", gjor: "Skap trygghet og tro på spilleren", ikkeGjor: "Kritiser uten støtte" },
    ],
    kildefil: "A05-basma-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa_a_2012_oppgave_christer_basma.pdf",
  },
  // ──────────────────────────────────────────
  // A06: Sentral midtbanerolle (Øyvind S. L. Iversen)
  // Kilde: docs/uefa/A06-sentral-midt-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a06-sentral-midt",
    kode: "A06",
    tittel: "Den sentrale midtbanerollen",
    forfatter: "Øyvind S. L. Iversen",
    tema: "Sentral midtbane, rollekrav, kampdimensjon",
    roller: ["Sentral midtbane", "Indreløper"],
    sammendrag:
      "Iversen analyserer Euro 2012 for å identifisere rollespesifikke ferdighetskrav for sentrale midtbanespillere. Data viser at pasningssikkerhet er det mest kritiske kravet (85 % treffprosent vs. 68 % for andre roller), spesielt fremoverrettede pasninger. Defensivt er evnen til å skape balanse viktigere enn rene ballvinneregenskaper. Rollen var direkte involvert i 22 av 76 mål (≈29 %) i mesterskapet.",
    kpier: [
      { navn: "Pasningspresisjon (total)", referanseverdi: "85 %", kilde: "Analyse" },
      { navn: "Pasningspresisjon (fremover)", referanseverdi: "77,3 %", kilde: "Analyse" },
      { navn: "Andel pasninger fremover", referanseverdi: "54,2 %", kilde: "Analyse" },
      { navn: "Skapte ubalansesituasjoner", referanseverdi: "3,76 pr. kamp", kilde: "Analyse" },
      { navn: "Direkte involvert i scoringer", referanseverdi: "22/76 (≈29 %)", kilde: "Analyse" }
    ],
    fokuspunkter: [
      { id: "a06-orientering", tekst: "Orientering før mottak – skanning som grunnferdighet", rolle: "Sentral midtbane" },
      { id: "a06-pasningskvalitet", tekst: "Oppretthold høy pasningskvalitet (>85%) under press", rolle: "Sentral midtbane" },
      { id: "a06-balanse", tekst: "Prioriter defensiv balanse og dekk rom sentralt", rolle: "Sentral midtbane" },
      { id: "a06-framover", tekst: "Vurder alltid muligheten for en linjebrytende pasning freover", rolle: "Sentral midtbane" }
    ],
    ovelser: [
        { kode: "uefa-a06-01" }
    ],
    coachingCues: [
      { kategori: "Pasningsspill", gjor: "Slå pasning med intensjon – bryt en linje!", ikkeGjor: "Ikke slå støttepasning hvis du kan spille fremover." },
      { kategori: "Posisjonering", gjor: "Vær spillbar – tenk to trekk frem.", ikkeGjor: "Ikke gjem deg bak motstanderen." },
      { kategori: "Defensivt", gjor: "Tenk balanse før du støter.", ikkeGjor: "Ikke etterlat store rom bak deg." }
    ],
    kildefil: "A06-sentral-midt-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oyvind-iversen.pdf",
  },
  // ──────────────────────────────────────────
  // A07: Hvordan bli en god målscorer (Sigurd Rushfeldt)
  // Kilde: docs/uefa/A07-maalscorer-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a07-maalscorer",
    kode: "A07",
    tittel: "Hvordan bli en god målscorer",
    forfatter: "Sigurd Rushfeldt",
    tema: "Avslutninger, målscorerferdighet",
    roller: ["Spiss", "Vinger", "Offensiv midtbane"],
    sammendrag: `Rushfeldts 3 styringsprinsipper:
- Avslutt fort (bygg repertoar for 1–2 touch)
- Riktig sone (innenfor 16 m – helst 11 m)
- Ha en plan i typiske situasjoner (1v1, skrå vinkel, innlegg, returer)

Tall som styrer treningen:
- 70 % 1 touch / 85 % 1–2 touch (egne mål)
- 83 % 1–2 touch (toppklubber)
- 94 % innenfor 16 m (75 % innenfor 11 m)
- 37 % av scoringene etter innlegg (toppklubber)
- ~10 % returer (≈30 mål i karrieren)

Treningsfokus:
- Forberedelse før mottak + bestem før du får den
- Blindsiden lenge, rykk på ball
- Returløp er en vane (alltid)`,
    kpier: [
      { navn: "Datagrunnlag (egne mål)", referanseverdi: "~300 mål analysert", kilde: "Bakgrunn" },
      { navn: "Datagrunnlag (toppklubber 2011/12)", referanseverdi: "~400 scoringer analysert", kilde: "Bakgrunn" },
      { navn: "Avslutning på 1 touch (egne mål)", referanseverdi: "70 % av målene", kilde: "Avslutte fort" },
      { navn: "Avslutning på 1–2 touch (toppklubber)", referanseverdi: "83 % av målene", kilde: "Avslutte fort" },
      { navn: "Avslutning på 1–2 touch (egne mål)", referanseverdi: "85 % av målene", kilde: "Avslutte fort" },
      { navn: "Mål innenfor 16 m (egne mål)", referanseverdi: "94 % (75 % innenfor 11 m)", kilde: "16-meteren" },
      { navn: "Mål etter returer (egne mål)", referanseverdi: "~10 % (≈30 mål i karrieren)", kilde: "Etterarbeid/returer" },
      { navn: "Mål etter innlegg (toppklubber)", referanseverdi: "37 %", kilde: "Innlegg" },
      { navn: "Kamp-KPI: 1 touch i boks", referanseverdi: "Opp mot topplag-nivå", kilde: "Kampdimensjon" },
      { navn: "Kamp-KPI: 1–2 touch i boks", referanseverdi: "≥80 %", kilde: "Kampdimensjon" },
      { navn: "Kamp-KPI: avslutninger fra 11 m-sone", referanseverdi: "Flere per kamp", kilde: "Kampdimensjon" },
      { navn: "Kamp-KPI: returløp", referanseverdi: "Løp inn i returrom ved skudd/innlegg", kilde: "Kampdimensjon" },
    ],
    fokuspunkter: [
      { id: "a07-avslutt-fort", tekst: "Avslutt fort – bygg repertoar for 1–2 touch", rolle: "Spiss" },
      { id: "a07-16m", tekst: "Kom deg inn i 16 m (helst 11 m) før sjansen", rolle: "Spiss" },
      { id: "a07-plan", tekst: "Ha en plan i typiske situasjoner (1v1, skrå vinkel, innlegg, retur)", rolle: "Spiss" },
      { id: "a07-blindside", tekst: "Bevegelse i boks: vær på blindsiden lengst mulig, rykk på ball", rolle: "Spiss" },
      { id: "a07-retur", tekst: "Etterarbeid: returløp er en vane (alltid)", rolle: "Spiss" },
    ],
    ovelser: [
      { kode: "uefa-a07-01" },
      { kode: "uefa-a07-02" },
    ],
    coachingCues: [
      { kategori: "Tid", gjor: "Er du usikker på tid, har du dårlig tid", ikkeGjor: "Ikke nøl i boks" },
      { kategori: "Avslutning", gjor: "1 touch i boks – bestem før mottak", ikkeGjor: "Ikke ta ekstra touch" },
      { kategori: "Bevegelse", gjor: "Blindsiden lenge – rykk på ball!", ikkeGjor: "Ikke stå i ro i markering" },
      { kategori: "Etterarbeid", gjor: "Retur er din jobb – alltid", ikkeGjor: "Ikke stopp når skuddet går" },
      { kategori: "Teknikk", gjor: "Nært mål = presisjon (innside)", ikkeGjor: "Ikke jakt kraft på kort hold" },
    ],
    kildefil: "A07-maalscorer-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oppgave-sigurd-rushfeldt.pdf",
  },

  {
    id: "a08-playmaker",
    kode: "A08",
    tittel: "Kompetansekrav: høy playmaker",
    forfatter: "Gard Holme",
    tema: "Høy playmaker – orientering, touch, avgjørende pasning",
    roller: ["Offensiv midtbane", "Indreløper", "Vinger", "Spiss"],
    sammendrag: `Kort fortalt: Den høye playmakeren er høyt involvert, har høy pasningskvalitet, skaper sjanser/assist, og må løse situasjoner raskt under tett press.

Nøkkeltall (rolleprofil):
- Pasninger pr. kamp: 70,8
- Pasningssuksess: 85,65 %
- Pasninger mot siste 1/3: 9,56
- Pasninger på 1. touch: 29,06
- Assist/Chances: 0,35 / 0,45 pr. kamp

3 faser i assistsituasjoner:
1) Komme på ball: mikrojusteringer og posisjonering i romutviklingen (lavt/midt i mellomrom i 88,3 %)
2) Mulighet → realitet: kort tid på ball (0–2 sek i 59,8 %) og tett press (0–3 m i 84,5 %)
3) Forløsning: presisjon + romforståelse (bakrom/innlegg, ofte fra sentral sone rett utenfor 16 m)`,
    kpier: [
      { navn: "Pasninger pr. kamp", referanseverdi: "70,8", kilde: "Rolleprofil" },
      { navn: "Pasningssuksess", referanseverdi: "85,65 %", kilde: "Rolleprofil" },
      { navn: "Pasninger mot siste 1/3", referanseverdi: "9,56", kilde: "Rolleprofil" },
      { navn: "Pasninger på 1. touch", referanseverdi: "29,06", kilde: "Rolleprofil" },
      { navn: "Assist pr. kamp", referanseverdi: "0,35", kilde: "Rolleprofil" },
      { navn: "Chances pr. kamp", referanseverdi: "0,45", kilde: "Rolleprofil" },

      { navn: "Bevegelse: mikrojustering (midt i rommet)", referanseverdi: "35,4 %", kilde: "Fase 1" },
      { navn: "Bevegelse: doble bevegelser", referanseverdi: "1,3 %", kilde: "Fase 1" },
      { navn: "Høyde i mellomrom", referanseverdi: "Lavt/midt i rommet = 88,3 %", kilde: "Fase 1" },
      { navn: "Kroppsvinkel ved mottak", referanseverdi: "Rett-/sidevendt = 80,3 %", kilde: "Fase 1" },

      { navn: "Tid på ball (fase 2)", referanseverdi: "0–2 sek = 59,8 %", kilde: "Fase 2" },
      { navn: "Antall touch (fase 2)", referanseverdi: "1 touch = 27,8 % (3 touch = 24,7 %) (5+ = 19,6 %)", kilde: "Fase 2" },
      { navn: "Pressavstand ved 1. berøring", referanseverdi: "0–3 m = 84,5 %", kilde: "Fase 2" },

      { navn: "Hvem mottar assist", referanseverdi: "Spiss 70,4 % / kant 28,6 %", kilde: "Fase 3" },
    ],
    fokuspunkter: [
      { id: "a08-prinsipp-mikro", tekst: "Mikroposisjonering (midt i rommet) slår doble bevegelser – finn midten av rommet" },
      { id: "a08-prinsipp-kropp", tekst: "Rett/sidevendt mottak for å spille fremover raskt" },
      { id: "a08-prinsipp-scan", tekst: "Ha scannet ferdig før du får ballen – løs under ekstremt tid/press (0–2 sek, 0–3 m)" },
      { id: "a08-prinsipp-forlose", tekst: "Forløsning = presisjon + romforståelse (bakrom/innlegg + innsidevariasjon)" },
      { id: "a08-matchprep", tekst: "MatchPrep: avklar hvem du oftest skal forløse (9 først, deretter kant) og hvilke rom dere prioriterer" },
    ],
    ovelser: [
      { kode: "uefa-a08-01" },
      { kode: "uefa-a08-02" },
    ],
    coachingCues: [
      { kategori: "Fase 1", gjor: "Små steg – finn midten av rommet", ikkeGjor: "Ikke rykk-fri uten å lese romutviklingen" },
      { kategori: "Fase 1", gjor: "Vær sidevendt før ballen kommer", ikkeGjor: "Ikke bli låst feilvendt" },
      { kategori: "Fase 2", gjor: "Se før du får", ikkeGjor: "Ikke motta uten informasjon" },
      { kategori: "Fase 2", gjor: "1–2 touch hvis mulig", ikkeGjor: "Ikke ta ekstra touch uten gevinst" },
      { kategori: "Fase 2", gjor: "Tåler du kontakt? Løs det i 0–3 meter", ikkeGjor: "Ikke forvent rom og tid" },
      { kategori: "Fase 3", gjor: "Vekt den – på sølvfat", ikkeGjor: "Ikke spill hardt uten presisjon" },
      { kategori: "Fase 3", gjor: "Kamufler før du stikker", ikkeGjor: "Ikke telegraphér pasningen" },
      { kategori: "Fase 3", gjor: "Innside = kontroll (tilpass til rommet)", ikkeGjor: "Ikke velg teknikk som ikke matcher rommet" },
    ],
    kildefil: "A08-playmaker-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/idrett---676258---uefa-a-2014-oppgave-gard-holme.pdf",
  },
  // ──────────────────────────────────────────
  // A10: Vingerrolle (Hugo Pereira)
  // Kilde: docs/uefa/A10-implicit-winger-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a10-winger",
    kode: "A10",
    tittel: "Kant/winger – trefase-modell fra kampdata",
    forfatter: "Hugo Pereira",
    tema: "Kant/winger, kampdata, trefase-modell, constraints, implicit læring",
    roller: ["Høyrevinger", "Venstrevinger", "Back"],
    sammendrag:
      "Pereira bruker kampdata til å definere hva som faktisk skjer når kantspillere skaper mål (assist/innlegg) og når de scorer selv – og oversetter funnene til konkrete treningsbetingelser gjennom en trefase-modell (før ball → med ball → siste handling). Nøkkelsituasjonene preges av tett press (ofte 1–3 m), kort tidsvindu (typisk 1–4 sek), og krav om presis utførelse i siste tredjedel. Treningspoenget er å bygge dette via constraints (banestørrelse, soner, touch/poengsystem) slik at beslutning og teknikk utvikles under kampnært tid/rom-press.",
    kpier: [
      { navn: "Presser ved assist", referanseverdi: "1–3 m (75 %)", kilde: "Kap. 5.1" },
      { navn: "Tid før assist", referanseverdi: "1–4 sek (77,7 %)", kilde: "Kap. 5.1" },
      { navn: "Handlinger før assist", referanseverdi: "2-touch (67 %)", kilde: "Kap. 5.1" },
      { navn: "Presser ved decisive pass", referanseverdi: "1–2 m (89 %)", kilde: "Kap. 5.1" },
      { navn: "Område avgjørende pasning", referanseverdi: "Siste tredel (91 %)", kilde: "Kap. 5.1" },
      { navn: "Presser ved innlegg", referanseverdi: "1 m (44 %) / 2 m (38 %)", kilde: "Kap. 5.2" },
      { navn: "Touch før innlegg", referanseverdi: "≤4 touch (76 %)", kilde: "Kap. 5.2" },
      { navn: "Hvem scorer etter innlegg", referanseverdi: "Spiss 56 % / motsatt kant 31 % / midtbane 12 %", kilde: "Kap. 5.2" },
      { navn: "Målrom etter innlegg", referanseverdi: "5 m ≈44 % / sentralt i 16 m 50 % (utenfor 6,3 %)", kilde: "Kap. 5.2" },
      { navn: "Presser ved avslutning", referanseverdi: "1–2 m (84 %)", kilde: "Kap. 5.3" },
      { navn: "Avslutninger i boks", referanseverdi: "82 %", kilde: "Kap. 5.3" },
      { navn: "Skuddplassering", referanseverdi: "Lavt plassert = 64 %", kilde: "Kap. 5.3" },
      { navn: "Avslutningsteknikk", referanseverdi: "Innside 47 % / vrist 31 %", kilde: "Kap. 5.3" },
    ],
    fokuspunkter: [
      { id: "uefa-a10-fokus-orientering", tekst: "Før ball: kom rettvendt og kom i scoringsrom (korridor + mellomrom)", rolle: "Vinger" },
      { id: "uefa-a10-fokus-press", tekst: "Med ball: løs under ekstremt tid/rom-press (typisk 1–4 sek med tett press 1–3 m)", rolle: "Vinger" },
      { id: "uefa-a10-fokus-touch", tekst: "Oppdatert før 1. touch: kort ball–kropp-avstand og kort tid mellom 1. og 2. berøring", rolle: "Vinger" },
      { id: "uefa-a10-fokus-innlegg", tekst: "Innlegg: tren mot konkrete målrom (5 m + sentralt i boksen) og koordiner boksroller (spiss/motsatt kant)", rolle: "Vinger" },
      { id: "uefa-a10-fokus-avslutning", tekst: "Avslutning: prioriter lavt plasserte skudd inne i boksen – kampnært «safe» valg under press", rolle: "Vinger" },
    ],
    ovelser: [
      { kode: "uefa-a10-01" },
      { kode: "uefa-a10-02" },
      { kode: "uefa-a10-03" },
      { kode: "uefa-a10-04" },
      { kode: "uefa-a10-05" },
      { kode: "uefa-a10-06" },
      { kode: "uefa-a10-07" },
    ],
    coachingCues: [
      {
        kategori: "Tid/press",
        gjor: "Se før du får den – du har 1–4 sek",
        ikkeGjor: "Ikke bruk første touch til å stoppe opp i press",
      },
      {
        kategori: "1. touch",
        gjor: "1. touch mot mål – sett fart og retning",
        ikkeGjor: "Ikke ta imot passivt med kroppen bort fra mål",
      },
      {
        kategori: "Innlegg",
        gjor: "Innlegg: 5 m + straffemerke først – koordiner spiss/motsatt kant",
        ikkeGjor: "Ikke slå blindt uten boksroller på plass",
      },
      {
        kategori: "Kamuflasje",
        gjor: "Kamufler retning (innside som skjuler valg) i decisive pass",
        ikkeGjor: "Ikke vis løsningen for tidlig med kropp og blikk",
      },
      {
        kategori: "Avslutning",
        gjor: "Avslutt lavt når du har kontroll – kampnært «safe»",
        ikkeGjor: "Ikke tving høyt skudd under tett press hvis lavt alternativ finnes",
      },
    ],
    kildefil: "A10-implicit-winger-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2015-oppgave-hugo-pereira.pdf",
  },

  // ──────────────────────────────────────────
  // A11: RBK i angrep (Svein Maalen)
  // Kilde: docs/uefa/A11-svein-maalen-rbk-angrep-analyse.md
  // ──────────────────────────────────────────
  {
    id: "a11-rbk-angrep",
    kode: "A11",
    tittel: "RBK i angrep 2006–2011",
    forfatter: "Svein Maalen",
    tema: "Sjansedifferanse, angrepstype og balanse",
    roller: ["Spiss", "Vinger", "Indreløper", "Sentral midtbane", "Back"],
    sammendrag:
      "Maalen analyserer målsjanser for og mot RBK i Tippeligaen 2006–2011 og bruker sjanser som et «speil» på spillestil og konsekvens gjennom fem trenerperioder (Tørum, Henriksen, Hamrén, Eggen, Jönsson). Hovedbildet er at poengfangst henger tett sammen med sjansedifferanse: å skape mye hjelper, men å slippe til lite er ofte det som stabiliserer resultatene. Materialet viser også at angrepstype (kontring/etablert/dødball) og «def i off» (offensiv balanse/restforsvar) påvirker både sjansevolum, sjansestørrelse og sjanser imot.",
    kpier: [
      {
        navn: "Sjanser for pr. kamp",
        referanseverdi: "Tørum 8,4 / Henriksen 6,1 / Hamrén 8,1 / Eggen 9,5 / Jönsson 9,7",
        kilde: "Nøkkeltall",
      },
      {
        navn: "Sjanser mot pr. kamp",
        referanseverdi: "Tørum 5,9 / Henriksen 3,8 / Hamrén 4,0 / Eggen 4,4 / Jönsson 5,7",
        kilde: "Nøkkeltall",
      },
      {
        navn: "Sjansedifferanse → poeng",
        referanseverdi: ">2 poeng pr. kamp ≈ skape ca. dobbelt så mange sjanser som man slipper til",
        kilde: "Nøkkeltall",
      },
      {
        navn: "Poeng pr. kamp",
        referanseverdi: "Eggen 2,4 / Hamrén 2,1",
        kilde: "Nøkkeltall",
      },
      {
        navn: "Sjanseuttelling",
        referanseverdi: "25,26% / 27,87% / 22,96% / 22,37% / 23,79%",
        kilde: "Nøkkeltall",
      },
      {
        navn: "Volum → effektivitet",
        referanseverdi: "Flere sjanser → ofte lavere effektivitet (r = -0,84355)",
        kilde: "Nøkkeltall",
      },
      {
        navn: "Volum → mål",
        referanseverdi: "Flere sjanser henger sammen med flere mål (r = 0,92816)",
        kilde: "Nøkkeltall",
      },
      {
        navn: "Store sjanser pr. kamp",
        referanseverdi: "Tørum 2,0 / Henriksen 2,0 / Hamrén 1,9 / Eggen 2,6 / Jönsson 2,7",
        kilde: "Nøkkeltall",
      },
      {
        navn: "Angrepstype (sjanser pr. kamp)",
        referanseverdi: "Kontring 1,9–2,9 / Etablert 2,9–4,3 / Dødball 1,3–2,9",
        kilde: "Grafer",
      },
    ],
    fokuspunkter: [
      {
        id: "a11-differanse",
        tekst: "Styr etter sjansedifferanse (for–mot) – målsetting kampplan: 8–10 sjanser for og maks ~4 mot",
      },
      {
        id: "a11-def-i-off",
        tekst: "Offensiv balanse («def i off») er en angrepsferdighet: angrip samlet og vær klar til gjenvinning/restforsvar",
      },
      {
        id: "a11-stilkontrakt",
        tekst: "Velg «stil-kontrakt» før kamp: Hamrén-modus (kontroll/etablert/lav risiko) vs Eggen-modus (mer gjennombrudd/kontring)",
      },
      {
        id: "a11-kvalitet",
        tekst: "Kvalitet > volum i siste tredjedel: mer sjansevolum kan gi lavere uttelling – tren «rene» store sjanser",
      },
      {
        id: "a11-overgang",
        tekst: "Overgangsregler: etter brudd – kontring ved ubalanse, ellers sikre og etablere kontroll",
      },
    ],
    ovelser: [
      { kode: "uefa-a11-01" },
      { kode: "uefa-a11-02" },
      { kode: "uefa-a11-03" },
      { kode: "uefa-a11-04" },
      { kode: "uefa-a11-05" },
    ],
    coachingCues: [
      {
        kategori: "Sjansediff",
        gjor: "Rop «Diff!» – styr etter sjanser for/mot/diff",
        ikkeGjor: "Ikke la «vi skaper mye» bli nok hvis du også slipper til mye",
      },
      {
        kategori: "Balanse",
        gjor: "«Def i off!» – angrip samlet og vær klare til å vinne igjen",
        ikkeGjor: "Ikke overbelast uten restforsvar",
      },
      {
        kategori: "Balltap",
        gjor: "«Når vi mister: nærmeste trykker, resten sikrer midten»",
        ikkeGjor: "Ikke jag ball med mange uten sikring",
      },
      {
        kategori: "Kvalitet",
        gjor: "«Ikke jag skudd – jag STORE sjanser»",
        ikkeGjor: "Ikke fyll loggen med lave prosent-skudd bare for volum",
      },
    ],
    kildefil: "A11-svein-maalen-rbk-angrep-analyse.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A12: Angrepsspill (Anders Fredriksen)
  // Kilde: docs/uefa/A12-anders-fredriksen-angrepsspill-ANALYSE-v2.md
  // ──────────────────────────────────────────
  {
    id: "a12-angrepsspill",
    kode: "A12",
    tittel: "Hurtig og kontrollert angrepsspill",
    forfatter: "Anders Fredriksen",
    tema: "Direkte vs kontroll, bruddsoner og seleksjon",
    roller: ["Spiss", "Offensiv midtbane", "Indreløper", "Vinger"],
    sammendrag:
      "Fredriksen viser at «hurtig angrep» ofte betyr få pasninger – men ikke nødvendigvis under 10 sekunder: ca. 65 % av mål kommer etter maks 4 pasninger, samtidig som 60 %+ kommer etter mer enn 10 sekunder. Direkte angrep (≤5 pasninger) dominerer i forkant av mål (ca. 60–40), og snittet ligger rundt 5–6 pasninger. Analysen peker også på at internasjonale lag oftere skaper målangrep etter brudd høyere i banen (2/4–3/4), noe som henger sammen med kortere avstander og bedre mulighet til å presse/gjenvinne. Praktisk handler det om å beherske begge «gir»: gå direkte når ubalanse/rom er der – ellers sikre og bygge, og når dere går, så gå fullt.",
    kpier: [
      {
        navn: "Mål etter ≤4 pasninger",
        referanseverdi: "Ca. 65%",
        kilde: "Hva analysen viser",
      },
      {
        navn: "Mål etter >10 sekunder",
        referanseverdi: "60%+",
        kilde: "Hva analysen viser",
      },
      {
        navn: "Direkte angrep dominerer",
        referanseverdi: "Ca. 60–40 i favør direkte (≤5 pasninger)",
        kilde: "Hva analysen viser",
      },
      {
        navn: "Snitt pasninger før mål",
        referanseverdi: "Ca. 5–6 (RBK 4,775 / Strømsgodset 5,89 / VIF 5,82 / Dortmund 5,65 / Bayern 6,07 / Barca 5,47)",
        kilde: "Hva analysen viser",
      },
      {
        navn: "Tid før mål (snitt)",
        referanseverdi: "RBK 11,305 s / Strømsgodset 13,55 s / Bayern 13,36 s / Barca 12,88 s / Dortmund 18,05 s",
        kilde: "Hva analysen viser",
      },
      {
        navn: "Bruddsoner (nasjonalt)",
        referanseverdi: "1/4 = 30,18% (flere brudd lavt)",
        kilde: "Hva analysen viser",
      },
      {
        navn: "Bruddsoner (internasjonalt)",
        referanseverdi: "2/4+3/4 = 68,76% (33,21% + 35,55%)",
        kilde: "Hva analysen viser",
      },
      {
        navn: "Direkte-andel (eksempler)",
        referanseverdi: "Strømsgodset 63,46% / RBK 74,29% / Bayern 67,95% / Barca 62,75%",
        kilde: "Hva analysen viser",
      },
    ],
    fokuspunkter: [
      {
        id: "a12-valg-etter-brudd",
        tekst: "Avklar «valg etter brudd»-regel: direkte når ubalanse + støtte + løpskraft, ellers sikre først og bygg nytt",
      },
      {
        id: "a12-fullfor",
        tekst: "Når vi går, så går vi fullt: framover, støtte og boks – unngå «kontring på egen kontring»",
      },
      {
        id: "a12-bruddsoner",
        tekst: "Flytt bruddsonen opp: øk andel brudd som leder til sjanse/mål i 2/4–3/4 gjennom kortere avstander og kollektivt trykk",
      },
      {
        id: "a12-direkte-ikke-hastverk",
        tekst: "Direkte ≠ hastverk: få pasninger, men riktig timing og seleksjon (kvalitet i overgangene)",
      },
      {
        id: "a12-10-16-sek",
        tekst: "Følg kampdimensjon: mål/angrep kommer ofte på få pasninger, men mye skjer også etter 10–16+ sek (tålmodighet)",
      },
    ],
    ovelser: [
      { kode: "uefa-a12-01" },
      { kode: "uefa-a12-02" },
    ],
    coachingCues: [
      {
        kategori: "Valg",
        gjor: "Se ubalanse først: kan vi gå nå – eller må vi sikre?",
        ikkeGjor: "Ikke gå direkte uten støtte/risikovurdering",
      },
      {
        kategori: "Fullfør",
        gjor: "Når vi går, så går vi fullt: framover, støtte, boks",
        ikkeGjor: "Ikke stopp opp halvveis og gi motstander kontring på kontring",
      },
      {
        kategori: "Gjenvinning",
        gjor: "Kort avstand ved balltap – vinn neste ball i midtsonen",
        ikkeGjor: "Ikke bli langt og spredt etter balltap",
      },
      {
        kategori: "Timing",
        gjor: "Direkte ≠ hastverk: få pasninger, men riktig timing",
        ikkeGjor: "Ikke forveksle tempo med stress",
      },
    ],
    kildefil: "A12-anders-fredriksen-angrepsspill-ANALYSE-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2013-oppgave-anders-fredriksen.pdf",
  },

  // ──────────────────────────────────────────
  // A13: Sideback/indreløper (Arnstein Røen)
  // Kilde: docs/uefa/A13-sideback-indreloper-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a13-sideback-indreloper",
    kode: "A13",
    tittel: "Sideback & indreløper (Orkla FK)",
    forfatter: "Arnstein Røen",
    tema: "Gjenvinning, høyt press, SB 1v1, 3. angriper og 4 løp i boks",
    roller: ["Sideback", "Indreløper"],
    sammendrag:
      "Røen beskriver en spillmodell der gjenvinning er viktigste ferdighet: 1F-jobben vektlegges i alle roller, og laget ønsker press i tre ledd for å vinne ball raskt tilbake. Standard er høyt press (med perioder der laget kan falle av mot sirkel/tangent på motstanders halvdel). Sideback må tåle 1v1 i sidekorridor uten «gratis» sikring fra stopper, og angrepet bygges i tre faser (oppbygging → gjennombrudd → avslutning) med vekt på samtidige trusler og 3. angripers bevegelse. I etablert angrep kreves minst fire samtidige innløp i boks.",
    kpier: [
      {
        navn: "Gjenvinningstid etter balltap",
        referanseverdi: "≤ 6–8 sek (eller fall av til 3 ledd)",
        kilde: "Kjernefunn",
      },
      {
        navn: "Boksinnløp ved etablert angrep",
        referanseverdi: "≥ 4 samtidige",
        kilde: "Kjernefunn",
      },
      {
        navn: "SB→IL rettvendt mellomrom/rom 2",
        referanseverdi: "Tell suksesser pr. omgang",
        kilde: "Kjernefunn",
      },
      {
        navn: "1v1-situasjoner SB/IL (off+def)",
        referanseverdi: "Tell pr. økt/kamp (mange nok)",
        kilde: "Rollekrav",
      },
    ],
    fokuspunkter: [
      { id: "a13-gjenvinning-1f", tekst: "Gjenvinning er viktigst: 1F først – press i tre ledd for å vinne ball raskt tilbake" },
      { id: "a13-presshoyde", tekst: "Presshøyde som standard: høyt press, med avtalt fall-av til rundt sirkel/tangent ved behov" },
      { id: "a13-sb-1v1", tekst: "Sideback: stå i 1v1 i sidekorridor uten gratis sikring fra stopper (evt. hjelp fra indreløper)", rolle: "Sideback" },
      { id: "a13-3angriper", tekst: "Angrep i 3 faser: oppbygging → gjennombrudd → avslutning, med vekt på 3. angripers bevegelse" },
      { id: "a13-4boks", tekst: "Etablert angrep: krev minst 4 samtidige innløp i boks (definer rom og boksjobber)" },
      { id: "a13-sb-il-rom2", tekst: "SB–IL-relasjon: frispill indreløper rettvendt i mellomrom/rom 2 og skap 2v1 mot back", rolle: "Sideback" },
      { id: "a13-overlapp", tekst: "Sideback: unngå «seine overlapper» i siste 20 m – timing tidlig nok til å true", rolle: "Sideback" },
      { id: "a13-il-1touch", tekst: "Indreløper: scan, ta av press på 1. touch, spill rettvendt", rolle: "Indreløper" },
    ],
    ovelser: [
      { kode: "uefa-a13-01" },
      { kode: "uefa-a13-02" },
      { kode: "uefa-a13-03" },
    ],
    coachingCues: [
      {
        kategori: "Gjenvinning",
        gjor: "Gjenvinn først – vi presser i tre ledd",
        ikkeGjor: "Ikke gi opp presset etter første duell",
      },
      {
        kategori: "Sideback",
        gjor: "SB: tør å stå i 1v1 – du får ikke gratis sikring",
        ikkeGjor: "Ikke falle av og invitere 1v1 uten press",
      },
      {
        kategori: "Indreløper",
        gjor: "IL: scan – 1. touch av press – spill rettvendt",
        ikkeGjor: "Ikke motta uten informasjon og uten neste handling",
      },
      {
        kategori: "Boks",
        gjor: "I boks: fire løp – fire rom",
        ikkeGjor: "Ikke bli stående uten innløp når vi etablerer på siste tredel",
      },
    ],
    kildefil: "A13-sideback-indreloper-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2013-oppgave-arnstein-roen.pdf",
  },

  // ──────────────────────────────────────────
  // A14: Indreløper i 4-3-1-2 (Magnus Oltedal)
  // Kilde: docs/uefa/A14-indreloper-4312-analyse-v2.md
  // Rå kilde: docs/uefa/A14-magnus-oltedal-indreloper.txt
  // ──────────────────────────────────────────
  {
    id: "a14-indreloper-4312",
    kode: "A14",
    tittel: "Indreløper i diamant",
    forfatter: "Magnus Oltedal",
    tema: "Indreløperrolle i 4-3-1-2",
    roller: ["Indreløper", "Sentral midtbane"],
    sammendrag:
      "4-3-1-2 (diamant) har ingen naturlige høye breddeholdere. Et gjennomgående «regel-bilde» i oppgaven er derfor at ballside indreløper (8) starter smalt og blir spilt rettvendt i mellomrommet – før han/hun går «innenfra og ut» og skaper bredde på sterk side. Når ballside 8 går, må motsatt 8 stabilisere smalt/innenfor for å sikre balanse. Defensivt beskrives en presslogikk som ofte ønsker spill inn i sidekorridorene, der indreløper kan støte innenfra-og-ut og stenge pasning innover. Som kollektiv ramme framheves kompakt-bildet: ca. 30 m lengde og 40 m bredde.",
    kpier: [
      {
        navn: "Kompakthet (lengde)",
        referanseverdi: "≤ 30 m i etablert forsvar",
        kilde: "Kompakt-ideal (30/40)",
      },
      {
        navn: "Kompakthet (bredde)",
        referanseverdi: "≤ 40 m i etablert forsvar",
        kilde: "Kompakt-ideal (30/40)",
      },
      {
        navn: "Rollebalanse i midtbane-3",
        referanseverdi: "«Én går – én blir» (ballside 8 går, motsatt 8 stabiliserer)",
        kilde: "MatchPrep / rollekrav",
      },
      {
        navn: "Strukturkontekst (Tippeligaen 2015)",
        referanseverdi: "39 % én stabiliserende midtbanespiller / 61 % to",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Strukturkontekst (Serie A 2015/16)",
        referanseverdi: "76 % én stabiliserende midtbanespiller / 24 % to",
        kilde: "Kampdimensjon",
      },
    ],
    fokuspunkter: [
      {
        id: "a14-bredde",
        tekst: "Angrep: ballside 8 skaper bredde på sterk side (manglende naturlige breddeholdere)",
        rolle: "Indreløper",
      },
      {
        id: "a14-led-ut",
        tekst: "Balanse: når ballside 8 går, stabiliserer motsatt 8 smalt/innenfor («én går – én blir»)",
        rolle: "Indreløper",
      },
      {
        id: "a14-press-back",
        tekst: "«Regel-bilde»: start smalt – bli rettvendt i mellomrommet – så ut (innenfra og ut)",
        rolle: "Indreløper",
      },
      {
        id: "a14-synkronisering",
        tekst: "Forsvar: pressretning ofte mot sidekorridor – 8 støter innenfra-og-ut og stenger innover",
      },
      {
        id: "a14-balltap",
        tekst: "Kompakt ramme: hold laget kort og smalt (30/40) før dere går i brudd",
      },
    ],
    ovelser: [
      { kode: "uefa-a14-01" },
      { kode: "uefa-a14-02" },
      { kode: "uefa-a14-03" },
    ],
    coachingCues: [
      {
        kategori: "Rollebalanse",
        gjor: "Ballside 8: skap bredde. Motsatt 8: bli igjen og balanser",
        ikkeGjor: "Ikke la begge 8-ere gå samtidig",
      },
      {
        kategori: "Mellomrom",
        gjor: "Smalt først – bli rettvendt i mellomrom – så ut (innenfra og ut)",
        ikkeGjor: "Ikke stå fast i samme rom uten timing/retning",
      },
      {
        kategori: "Press",
        gjor: "Jobb innenfra og ut når vi støter",
        ikkeGjor: "Ikke åpne pasningen inn i sentral korridor",
      },
      {
        kategori: "Kompakthet",
        gjor: "Hold laget kort og smalt (30/40) før vi går i brudd",
        ikkeGjor: "Ikke jage ball med for store avstander i laget",
      },
    ],
    kildefil: "A14-indreloper-4312-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A15: Innlegg i Tippeligaen (Gard Kristiansen)
  // Kilde: docs/uefa/A15-innlegg-2015-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a15-innlegg",
    kode: "A15",
    tittel: "Innlegg som våpen",
    forfatter: "Gard H. Kristiansen",
    tema: "Innleggsanalyse Tippeligaen 2015",
    roller: ["Vinger", "Back", "Indreløper", "Spiss"],
    sammendrag:
      "Kristiansen analyserer alle mål i Tippeligaen 2015 (uten dødball) og koder mål etter innlegg i åpent spill: hvor innlegget slås fra og hvor scoringene tas (soner). Hovedbildet er todelt: innlegg er et svært vanlig scoringsgrunnlag (33,85 % av alle mål), men hvert enkelt innlegg har lav scoringssannsynlighet (3,5 %). I tillegg er majoriteten av innleggs-mål «direkte» (68,32 %), og de fleste scoringene tas i soner nær mål – særlig sone D og C, og i området fra dødlinje/femmer og ut til 16 m.",
    kpier: [
      {
        navn: "Andel mål etter innlegg (åpent spill)",
        referanseverdi: "33,85 % (262/774)",
        kilde: "Tippeligaen 2015",
      },
      {
        navn: "Suksessrate pr innlegg (åpent spill)",
        referanseverdi: "3,5 %",
        kilde: "Tippeligaen 2015",
      },
      {
        navn: "Direkte andel av innleggsmål",
        referanseverdi: "68,32 % (179/262)",
        kilde: "Tippeligaen 2015",
      },
      {
        navn: "Etablert vs overgang (innleggsmål)",
        referanseverdi: "73 % vs 27 %",
        kilde: "Tippeligaen 2015",
      },
      {
        navn: "Scoringssone (prioritet)",
        referanseverdi: "D 27,48 % / C 24,43 %",
        kilde: "Tippeligaen 2015",
      },
    ],
    fokuspunkter: [
      {
        id: "a15-innlegg-soner",
        tekst: "Kjernefunn: 33,85 % av alle mål kommer etter innlegg i åpent spill, men bare 3,5 % av innlegg ender i scoring",
      },
      {
        id: "a15-direkte",
        tekst: "Kjernefunn: 68,32 % av innleggsmålene er «direkte» (innlegger + målscorer) – boksrollen må ha direkte mindset",
        rolle: "Spiss",
      },
      {
        id: "a15-gjenvinning",
        tekst: "Kjernefunn: 73 % av innleggsmål kommer mot etablert forsvar og 27 % etter overgang – planlegg relasjoner på side",
      },
      {
        id: "a15-boks",
        tekst: "Rollekrav: bemann 4 soner ved innlegg – 1. stolpe, C, D og bakre stolpe – med tydelige løpsroller",
      },
      {
        id: "a15-rollefordeling",
        tekst: "Roller: innleggslegger må vinne posisjon før innlegg, 9 angriper C/1. stolpe, motsatt kant løper bakre, 8/10 fyller D, 6 + motsatt back/stopper sikrer og låser andreball",
      },
    ],
    ovelser: [
      { kode: "uefa-a15-01" },
      { kode: "uefa-a15-02" },
      { kode: "uefa-a15-03" },
    ],
    coachingCues: [
      {
        kategori: "Innleggslegger",
        gjor: "Ikke slå fordi du kan – slå fordi vi har vunnet posisjon",
        ikkeGjor: "Ikke slå innlegg uten at vi har vunnet kant/posisjon",
      },
      {
        kategori: "D-løp",
        gjor: "D-løper på plass før innlegget går",
        ikkeGjor: "Ikke kom for seint i D (da mister vi #1-sonen)",
      },
      {
        kategori: "Boks",
        gjor: "1. stolpe / C: angrip ballen – ikke vent",
        ikkeGjor: "Ikke bli passiv på første aksjon i boks",
      },
      {
        kategori: "Ettertrykk",
        gjor: "Ettertrykk 5 sek: først press, så sikring",
        ikkeGjor: "Ikke stopp etter innlegget – situasjonen varer videre",
      },
    ],
    kildefil: "A15-innlegg-2015-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A16: Rosenborgs angrepsspill (Jørgen Ferstad)
  // Kilde: docs/uefa/A16-rbk-angrep-2016-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a16-rosenborg-angrep",
    kode: "A16",
    tittel: "Rosenborgs målsjanser",
    forfatter: "Jørgen Ferstad",
    tema: "RBK 2016 – faser og suksesskriterier",
    roller: ["Sentral midtbane", "Indreløper", "Vinger", "Spiss"],
    sammendrag:
      "Ferstad analyserer 16 RBK-kamper (2016) for å finne hvor og hvordan laget skaper målsjanser – og hva som kjennetegner suksess i etablert angrep, overgang og dødball. Datagrunnlaget er 147 målsjanser (9,19 pr kamp) fordelt på 54 % etablert angrep, 29 % overgang og 17 % dødball. 52 % av sjansene kommer etter innlegg, og 58 % av sjanseproduksjonen kommer fra høyre. Total uttelling i materialet er 31 mål på 147 sjanser (21 %), med høy dødballuttelling (40 %) og tydelige «trykkperioder» i 61–75. minutt.",
    kpier: [
      {
        navn: "Målsjanser pr kamp",
        referanseverdi: "147 på 16 kamper = 9,19",
        kilde: "Datagrunnlag",
      },
      {
        navn: "Fasefordeling",
        referanseverdi: "Etablert 54 % (80) / overgang 29 % (42) / dødball 17 % (25)",
        kilde: "Datagrunnlag",
      },
      {
        navn: "Innlegg som virkemiddel",
        referanseverdi: "52 % innlegg (77/147) / 48 % kombinasjon (70/147)",
        kilde: "Datagrunnlag",
      },
      {
        navn: "Sideproduksjon",
        referanseverdi: "58 % høyre (85) / 42 % venstre (62)",
        kilde: "Datagrunnlag",
      },
      {
        navn: "Innlegg→sjanse (høyre/venstre)",
        referanseverdi: "49 (64 %) fra høyre / 28 (36 %) fra venstre",
        kilde: "Datagrunnlag",
      },
      {
        navn: "Uttelling (totalt)",
        referanseverdi: "31 mål / 147 sjanser = 21 % (1,94 mål/kamp)",
        kilde: "Datagrunnlag",
      },
      {
        navn: "Uttelling (dødball / overgang / etablert)",
        referanseverdi: "Dødball 10/25=40 %; overgang 8/42=19 %; etablert 13/80≈16 %",
        kilde: "Datagrunnlag (etablert utledet)",
      },
      {
        navn: "Trykkperiode",
        referanseverdi: "61–75 min: 36 sjanser (=25 % av alle)",
        kilde: "Datagrunnlag",
      },
    ],
    fokuspunkter: [
      {
        id: "a16-faser",
        tekst: "Kampbilde: 147 sjanser (9,19 pr kamp) – etablert 54 % (80), overgang 29 % (42), dødball 17 % (25)",
      },
      {
        id: "a16-innlegg",
        tekst: "Etablert angrep: «gjennombrudd bredt» – vinn kant via vending + indreløper i mellomrom og skap overtall (2v1/3v2/4v3) før innlegg/cutback",
      },
      {
        id: "a16-relasjon",
        tekst: "Relasjoner slår tilfeldige løp: samme-side relasjoner og kontinuitet i roller trekkes fram som suksesskriterium",
      },
      {
        id: "a16-boks",
        tekst: "Innlegg: avtalte boksroller – motsatt kant angriper 1. stolpe, spiss drar mot bakre, og ettertrykk rundt D",
      },
      {
        id: "a16-dodb",
        tekst: "Dødball: høy uttelling kobles til kvalitet på serve + beredskap for andreball/ettertrykk",
      },
      {
        id: "a16-overgang",
        tekst: "Overgang: straff ubalanse – gå når muligheten er der uansett kampstatus; ellers sikre og etablér for kantgjennombrudd",
      },
      {
        id: "a16-6075",
        tekst: "Trykkperiode: 61–75 min er topproduktiv (25 % av sjansene) – planlegg friske løp/tempo der",
      },
    ],
    ovelser: [
      { kode: "uefa-a16-01" },
      { kode: "uefa-a16-02" },
      { kode: "uefa-a16-03" },
    ],
    coachingCues: [
      { kategori: "Etablert", gjor: "Vinn kant – vend spillet!", ikkeGjor: "Ikke gå i innlegg før vi har vunnet kant" },
      { kategori: "Boks", gjor: "Fyll boks: motsatt kant 1!", ikkeGjor: "Ikke bli stående uten avtalte løp" },
      { kategori: "Boks", gjor: "9’er: bakre!", ikkeGjor: "Ikke bli flatt i samme rom" },
      { kategori: "Ettertrykk", gjor: "Ettertrykk!", ikkeGjor: "Ikke stopp etter første avslutning/serve" },
      { kategori: "Overgang", gjor: "Straff ubalanse – gå!", ikkeGjor: "Ikke sikre deg bort fra gode kontringsmuligheter" },
    ],
    kildefil: "A16-rbk-angrep-2016-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A17: Spissrollen i RBK (Erik Selnæs)
  // Kilde: docs/uefa/A17-spissrollen-rbk-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a17-spissrollen",
    kode: "A17",
    tittel: "Spissrollen i RBK",
    forfatter: "Erik Selnæs",
    tema: "Midtspiss i 4-3-3",
    roller: ["Spiss"],
    sammendrag:
      "Selnæs kartlegger hva som faktisk kjennetegner «RBK-spissen» i 4-3-3 gjennom intervjuer med 5 tidligere spisser og 5 trenere. Rollen beskrives som et tydelig feilvendt oppspillspunkt med høy klokskap/spillforståelse, boks-/avslutningskvalitet og fysisk styrke – mens ren bakromsfart og lange pasninger vurderes som mindre viktig. Spillerne opplever arbeidsoppgavene som svært tydelige, både i etablert angrep og i press. Defensivt er spissen pressleder: stenger sentrum og leder spillet til avtalt side.",
    kpier: [
      {
        navn: "Feilvendt-oppspill",
        referanseverdi: "Mottak feilvendt → kontroll + avlevering på 1–2 touch (kvalitet over volum)",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Relasjonsutløsning",
        referanseverdi: "Spill av → utløse tredjemann/ving/8 i neste aksjon (innen 1–2 ledd)",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Boksbidrag",
        referanseverdi: "Førstekontakter i boks (1-touch/volley/hode) + løp som skaper rom for andre",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Pressledelse",
        referanseverdi: "Press tvinger spill til avtalt side + ballvinning innen 6–8 sek etter fella settes",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Avtale-treff",
        referanseverdi: "Treffer kampavtalen i nøkkelsituasjoner (MatchPrep-kort)",
        kilde: "Kampdimensjon",
      },
    ],
    fokuspunkter: [
      {
        id: "a17-klokskap",
        tekst: "Kjernekrav: klokskap/spillforståelse + tydelige avtaler styrer rollen (mer enn ren bakromsfart)",
        rolle: "Spiss",
      },
      {
        id: "a17-feilvendt",
        tekst: "Angrep: vær feilvendt oppspillspunkt – lås stopper, vinn første kontakt og spill av på 1–2 touch",
        rolle: "Spiss",
      },
      {
        id: "a17-relasjon",
        tekst: "Angrep: spill av og utløse tredjemann/ving/8 i neste aksjon (vegger, dyp/tilbake, timing foran ballfører)",
        rolle: "Spiss",
      },
      {
        id: "a17-boks",
        tekst: "Boks: avklar rolle før innlegg og bruk definerte løp (1. stolpe/bakre/stop–rykk) for å komme fri",
        rolle: "Spiss",
      },
      {
        id: "a17-avtaler",
        tekst: "MatchPrep: bygg «avtale-kort» på triggers i etablert (sideback/stopper/6 vender opp/1v1 på kant/8 truer rom 2/innlegg)",
        rolle: "Spiss",
      },
      {
        id: "a17-press",
        tekst: "Forsvar: pressleder – steng sentrum og led spillet til avtalt side (høyt/mellom/lavt press med samme retning)",
        rolle: "Spiss",
      },
    ],
    ovelser: [
      { kode: "uefa-a17-01" },
      { kode: "uefa-a17-02" },
      { kode: "uefa-a17-03" },
    ],
    coachingCues: [
      {
        kategori: "Feilvendt",
        gjor: "Lås stopper – vinn første kontakt – spill av på 1–2 touch.",
        ikkeGjor: "Ikke ta unødvendige touch eller mist ballen feilvendt.",
      },
      {
        kategori: "Klokskap",
        gjor: "Vær klok: gjør valgene før du får ball.",
        ikkeGjor: "Ikke vent til ballen er på fot før du bestemmer deg.",
      },
      {
        kategori: "Press",
        gjor: "Steng sentrum – led til side!",
        ikkeGjor: "Ikke press uten retning eller avtale.",
      },
      {
        kategori: "Boks",
        gjor: "I boks: kom deg fri – ikke bare inn.",
        ikkeGjor: "Ikke løp blindt inn i markering.",
      },
    ],
    kildefil: "A17-spissrollen-rbk-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A18: Angrep mot etablert forsvar (Hiep Tran)
  // Kilde: docs/uefa/A18-hiep-tran-angrep-etablert-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a18-angrep-etablert",
    kode: "A18",
    tittel: "Angrep mot lav blokk",
    forfatter: "Hiep Tran",
    tema: "Virkemidler mot etablert forsvar",
    roller: ["Sentral midtbane", "Indreløper", "Vinger", "Back"],
    sammendrag:
      "Tran sammenligner Rosenborg, Bayern, Barcelona og Varegg i angrep mot lav blokk (bakre + midtre ledd godt inne på egen halvdel, frontledd fra ca. midtstreken eller lavere). Toppnivå kjennetegnes av tålmodighet, mange vendinger (høyere i banen) og tydelig kampplan for hvordan lav blokk skal «låses opp»: enten via sidekorridor → innlegg/cut-back (Bayern), eller via rettvendt i mellomrom → sentralt gjennombrudd (Barcelona/Varegg). Et nøkkelprinsipp er ballfører-pådrag når 1. pressledd ikke får reelt trykk: avansér, bind 2. ledd og slipp ball i riktig øyeblikk. Struktur i angrep påvirker også gjenvinning etter balltap (kontring på kontring).",
    kpier: [
      {
        navn: "Etablerte angrep pr kamp",
        referanseverdi: "Toppnivå-referanse ~40+; nivåtilpasset mål 25–40",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Vellykkede angrep pr kamp",
        referanseverdi: "Referanse i materialet ~5–6 pr kamp",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Vendinger (totalt / i angrepshalvdel)",
        referanseverdi: "Bruk som indikator på evne til å flytte lav blokk med hensikt",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Gjennombrudd i mellomrom (forsøk/treff)",
        referanseverdi: "Bygg kapasitet (prinsipp): Barca 82/5 kamper, Varegg 98/5 kamper",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Pådrag/1v1-aksjoner",
        referanseverdi: "Hvor ofte dere setter 2. ledd i valg før dere slipper ball",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Gjenvinning etter balltap",
        referanseverdi: "Antall gjenvinninger (ev. innen 6–8 sek) – koble til restforsvar/balanse",
        kilde: "Kampdimensjon",
      },
    ],
    fokuspunkter: [
      {
        id: "a18-tall",
        tekst: "Kampbilde: toppnivå har flere etablerte angrep (40+ pr kamp), RBK færre (mer direkte) – bygg kapasitet på tålmodighet høyere i banen",
      },
      {
        id: "a18-vending-hensikt",
        tekst: "Vending med hensikt: «trekk dem over → slå motsatt → angrip rommet». Hvis rommet nøytraliseres: vend igjen (tving ny flytting)",
      },
      {
        id: "a18-profiler",
        tekst: "Kampplan: velg hovedprofil før kamp – Bayern (sidekorridor → innlegg/cut-back) eller Barca (rettvendt i mellomrom → sentralt gjennombrudd)",
      },
      {
        id: "a18-padrag",
        tekst: "Ballfører-pådrag: når 1. pressledd ikke får reelt trykk → avansér, bind 2. ledd og slipp i riktig øyeblikk",
        rolle: "Sentral midtbane",
      },
      {
        id: "a18-mellomrom",
        tekst: "Mellomrom: bruk siden som lokkemiddel, finn rettvendt mottak sentralt og spill fram (ikke bare sikkert)",
        rolle: "Indreløper",
      },
      {
        id: "a18-sidekorridor",
        tekst: "Sidekorridor: skap 1v1/2v1 med over-/underlapp og finn innlegg/cut-back med kvalitet (lave innlegg/45-graders pasninger)",
        rolle: "Vinger",
      },
      {
        id: "a18-trigger-vending",
        tekst: "Trigger for vending: når blokka er overflyttet og motsatt side har 1v1/ledig korridor – vending er middel for å skape ubalanse",
      },
      {
        id: "a18-trigger-padrag",
        tekst: "Trigger for pådrag: når 1. pressledd ikke får trykk – gå med ball og tving 2. ledd til valg (press/komprimering)",
      },
      {
        id: "a18-restforsvar",
        tekst: "Angrep som tåler balltap: balanse/restforsvar avgjør om dere kan vinne ballen tilbake (gjenvinning som gjenganger i vellykkede angrep)",
      },
      {
        id: "a18-varegg",
        tekst: "Varegg-funn: høy andel gjennombrudd i mellomrom kan gi høy uttelling på lavere nivå (25/32 vellykkede = 78%)",
      },
    ],
    ovelser: [
      { kode: "uefa-a18-01" },
      { kode: "uefa-a18-02" },
      { kode: "uefa-a18-03" },
    ],
    coachingCues: [
      {
        kategori: "Vending",
        gjor: "Trekk dem over – slå motsatt – angrip.",
        ikkeGjor: "Ikke vend for å vende – vending må skape ubalanse.",
      },
      {
        kategori: "Pådrag",
        gjor: "Bind 2. ledd med pådrag – slipp i rett øyeblikk.",
        ikkeGjor: "Ikke spill fra deg ballen før du har satt 2. ledd i valg.",
      },
      {
        kategori: "Mellomrom",
        gjor: "Rettvendt i mellomrom: spill fram – ikke bare sikkert.",
        ikkeGjor: "Ikke stopp angrepet med unødvendig støttepasning når du kan true framover.",
      },
      {
        kategori: "Gjenvinning",
        gjor: "Mister vi ball: vinn den tilbake – hvis ikke, steng sentrum først.",
        ikkeGjor: "Ikke jag ukontrollert – fall av og steng sentralt hvis dere ikke vinner ballen.",
      },
    ],
    kildefil: "A18-hiep-tran-angrep-etablert-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A19: Angrep mot etablert forsvar (Ståle Andersen)
  // Kilde: docs/uefa/A19-angrep-mot-etablert-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a19-angrep-etablert",
    kode: "A19",
    tittel: "Angrep mot etablert/delvis etablert forsvar",
    forfatter: "Ståle Andersen",
    tema: "KFUM/VIF – spill mot lav blokk",
    roller: ["Sentral midtbane", "Indreløper", "Vinger", "Spiss"],
    sammendrag:
      "Andersen beskriver hva KFUM (2007–2010) og Vålerenga (2010) vektlegger for å lykkes i angrep mot etablert/delvis etablert forsvar. KFUM er tydelige på en tålmodig tilnærming: det er lov å spille på tvers og bakover for å vente på et «godt nok» gjennombrudd, og laget skiller mellom å være gjennombruddshissig vs gjennombruddsdyktig. I VIF sin definisjon regnes angrepet fortsatt som «etablert» hvis laget gjenvinner ballen innen 5 sek og angriper på nytt. Resultatdata peker også på at KFUM ofte scorer etter 3–5 trekk i fasen, og at målfordelingen (VIF/VM-trend) har stor andel etablert angrep.",
    kpier: [
      {
        navn: "VIF målfordeling (2010)",
        referanseverdi: "47% etablert/delvis etablert, 28% overganger, 25% dødball",
        kilde: "Oppgave (resultat)",
      },
      {
        navn: "VM-trend (FIFA-data i oppgaven)",
        referanseverdi: "42,8% etablerte angrep, 27,6% overganger, 29,6% dødball",
        kilde: "Oppgave (trend)",
      },
      {
        navn: "KFUM: trekk før scoring (mønstergjenkjenning)",
        referanseverdi: "0:5, 1:8, 2:5, 3:11, 4:13, 5:9, 6+:7 (flest etter 3–5 trekk)",
        kilde: "Oppgave (KFUM)",
      },
      {
        navn: "Tålmodighet + kvalitet",
        referanseverdi: "Andel angrep der laget velger støtte/tvers for å vente på «grønt lys» (flere riktige avbrudd, færre tvangsgjennombrudd)",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Gjenvinning ≤5 sek",
        referanseverdi: "Antall gjenvinninger innen 5 sek etter balltap (VIF-definisjon: fortsatt etablert angrep)",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Trekk-bøtter før sjanse",
        referanseverdi: "Fordel sjanser/scoringer i 0–1 / 2–3 / 4+ trekk (KFUM: flest mål etter 3–5)",
        kilde: "Kampdimensjon",
      },
    ],
    fokuspunkter: [
      {
        id: "a19-tamodighet",
        tekst: "Tålmodighet: lov å spille på tvers og bakover for å vente på «godt nok» gjennombrudd (gjennombruddsdyktig, ikke gjennombruddshissig)",
      },
      {
        id: "a19-bevar-ball",
        tekst: "Bevar ball for å skape ubalanse: sirkuler til motstander flytter seg feil – så går dere gjennom",
      },
      {
        id: "a19-vending",
        tekst: "Vending som låse-opp-verktøy: brukes aktivt for å finne overtall og gunstige rom før gjennombrudd",
      },
      {
        id: "a19-gjennombruddskriterier",
        tekst: "MatchPrep: definer «grønt lys» for gjennombrudd (ubalanse, rettvendt mottaker, timet løp, pasningsbein hos nøkkelspillere)",
      },
      {
        id: "a19-oppbygging",
        tekst: "Igangsetting bakfra: keeper som vendingsspiller, stoppere bredt, anker som sikring/spillpunkt – felles førstvalg for ballførende stopper",
        rolle: "Sentral midtbane",
      },
      {
        id: "a19-stopper-5valg",
        tekst: "5 faste valg for stopper: (1) ut på back → inn i mellomrom på siden, (2) motsatt indreløper krysser inn, (3) opp på spiss ballside → sett rettvendte midtbaner, (4) direkte i bakrom (ofte andrebevegelsen), (5) inn på anker for sidebytte – eller vend hjem og start på nytt",
      },
      {
        id: "a19-gjenvinning",
        tekst: "Gjenvinning er del av etablert angrep: mål gjenvinning ≤5 sek og nytt angrep (hvis ikke: fall av og steng sentralt)",
      },
      {
        id: "a19-trekk",
        tekst: "KFUM-modell: følg fordeling av scoringer/sjanser etter antall trekk (flest mål etter 3–5 trekk i materialet)",
      },
    ],
    ovelser: [
      { kode: "uefa-a19-01" },
      { kode: "uefa-a19-02" },
    ],
    coachingCues: [
      {
        kategori: "Tålmodighet",
        gjor: "Vent – flytt dem – så stikk.",
        ikkeGjor: "Ikke tving gjennombrudd når motstander er i balanse.",
      },
      {
        kategori: "Vending",
        gjor: "Vend hvis vi ikke har overtall.",
        ikkeGjor: "Ikke gå for gjennombrudd uten at vending/forflytning har skapt rom.",
      },
      {
        kategori: "Gjenvinning",
        gjor: "5 sek! (gjenvinn eller fall av)",
        ikkeGjor: "Ikke jag i 15 sek uten struktur – fall av hvis dere ikke vinner ballen.",
      },
      {
        kategori: "Anker",
        gjor: "Anker = sikkerhet + sidebytte.",
        ikkeGjor: "Ikke mist anker som spillpunkt når dere må «starte på nytt».",
      },
    ],
    kildefil: "A19-angrep-mot-etablert-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A20: Touch og scoringer (Stian Lund)
  // Kilde: docs/uefa/A20-touch-scoringsanalyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a20-touch-scoringsanalyse",
    kode: "A20",
    tittel: "Touch & scoring",
    forfatter: "Stian Lund",
    tema: "Få touch nær mål (Strømsgodset 2010)",
    roller: ["Spiss", "Vinger", "Indreløper"],
    sammendrag:
      "Kjerneidé: jo nærmere mål, jo viktigere å kunne avslutte på få touch – særlig 1-touch. Det handler ikke om touch-rekord, men om å beherske avslutningsteknikk og timing i avgjørende øyeblikk. I materialet (Strømsgodset 2010, etablert+overgang) er 1-touch dominerende både på mål (57%) og sjanser (56%). Samtidig viser tallene at målgivende pasning ofte går på 1–2 touch (28%/28%), og at hurtige restarter (frispark/innkast) kan skape sjanser (14% av tredjesistepasning-kategorien).",
    kpier: [
      {
        navn: "Mål på 1 touch",
        referanseverdi: "57% (20/35) – etablert+overgang",
        kilde: "Oppgave (SIF 2010)",
      },
      {
        navn: "Sjanser på 1 touch",
        referanseverdi: "56% (54/96) – etablert+overgang",
        kilde: "Oppgave (SIF 2010)",
      },
      {
        navn: "Sjanser på 2 touch (" + "lekkasje" + ")",
        referanseverdi: "25% – målsetning: ned mot <25% over tid",
        kilde: "Kampdimensjon",
      },
      {
        navn: "Målgivende pasning (1–2 touch)",
        referanseverdi: "28% på 1 touch + 28% på 2 touch (timing > touch-jakt)",
        kilde: "Oppgave (SIF 2010)",
      },
      {
        navn: "Quick restart-sjanser",
        referanseverdi: "Egen telling pr kamp (oppgaven viser 14% i tredjesiste-kategorien)",
        kilde: "Kampdimensjon",
      },
    ],
    fokuspunkter: [
      {
        id: "a20-1touch-bilder",
        tekst: "Skap 1-touch-bilder: cut-back langs bakken, innlegg riktig fot, returer i D/16, stikk i boks",
      },
      {
        id: "a20-boksroller",
        tekst: "Avtal boksroller: 1. stolpe / bakre / D-retur / sikring (gir flere kontrollerte 1-touch situasjoner)",
      },
      {
        id: "a20-sistepasning",
        tekst: "Målgiver: 1–2 touch er normalt (28/28). Vinn tid med timing og relasjon, ikke bare færre touch",
      },
      {
        id: "a20-2touch-lekkasje",
        tekst: "Avslutter: reduser 2-touch-sjanser der 1-touch er mulig (2 touch er 25% av sjansene, men 14% av målene)",
      },
      {
        id: "a20-quick-restart",
        tekst: "Quick restart-pakke: 2–3 faste triggere på frispark/innkast – kjør raskt før motstander er satt",
      },
    ],
    ovelser: [
      { kode: "uefa-a20-01" },
      { kode: "uefa-a20-02" },
      { kode: "uefa-a20-03" },
    ],
    coachingCues: [
      {
        kategori: "Avslutter",
        gjor: "Se mål før mottak – 1 touch!",
        ikkeGjor: "Ikke ta ekstra touch hvis 1-touch er mulig.",
      },
      {
        kategori: "Målgiver",
        gjor: "Timing – slipp den nå!",
        ikkeGjor: "Ikke jag touch; vinn tid med riktig øyeblikk.",
      },
      {
        kategori: "Lag",
        gjor: "Skap 1-touch-bildet.",
        ikkeGjor: "Ikke spill på feil fot i boks når dere vil ha 1-touch.",
      },
      {
        kategori: "Etter brudd/fast",
        gjor: "Kjør raskt!",
        ikkeGjor: "Ikke vent til de er organisert.",
      },
    ],
    kildefil: "A20-touch-scoringsanalyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A21: Notorisk målscorer (Totto Dahlum)
  // Kilde: docs/uefa/A21-notorisk-maalscorer-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a21-notorisk-mal",
    kode: "A21",
    tittel: "Hvem er den notoriske målscoreren?",
    forfatter: "Totto Dahlum",
    tema: "Psykologiske/motoriske kjennetegn",
    roller: ["Spiss"],
    sammendrag:
      "En notorisk målscorer bygges over tid av en indre driv (\"den indre stemmen\") som presser fram kvalitetsrepetisjon, konkurranse, struktur og selvstendighet – mer enn \"medfødt avslutning\". Dahlum bruker egne erfaringer og intervjuer med Rushfeldt, Brattbakk og Belsvik som referanser.",
    kpier: [
      { navn: "Bestått-serier", referanseverdi: "10/10 i valgt sone (logges)", kilde: "Kampnært" },
      { navn: "Avslutning under press", referanseverdi: "Poengsystem: teknikk/ro under tid-press", kilde: "Kampnært" },
      { navn: "Egentreninger med sluttprodukt", referanseverdi: "1–3 / uke (avslutning inngår)", kilde: "Vaner" },
      { navn: "Konkurransebolker", referanseverdi: "1–3 / uke (press/konsekvens)", kilde: "Vaner" },
    ],
    fokuspunkter: [
      { id: "a21-1010", tekst: "Bygg 10/10-standard: ikke \"gjennomført\", men \"bestått\" (kvalitet > volum)", rolle: "Spiss" },
      { id: "a21-kampnart", tekst: "Tren med mening: legg inn konkurranse/konsekvens så det blir mentalt kamp-likt", rolle: "Spiss" },
      { id: "a21-system", tekst: "System slår humør: små faste rutiner som alltid gjøres (hverdag over tid)", rolle: "Spiss" },
      { id: "a21-egenansvar", tekst: "Egenansvar: kvalitet kan bygges alene – ikke avhengig av andre", rolle: "Spiss" },
    ],
    ovelser: [
      { kode: "uefa-a21-01" },
      { kode: "uefa-a21-02" },
      { kode: "uefa-a21-03" },
    ],
    coachingCues: [
      { kategori: "Standard", gjor: "10/10 – ikke 8/10", ikkeGjor: "Ikke stopp når det \"ser greit ut\"" },
      { kategori: "Repetisjon", gjor: "Kvalitet i rep (samme detalj hver gang)", ikkeGjor: "Ikke jag volum uten standard" },
      { kategori: "Kamp-likt", gjor: "Gjør det kamp-likt – spill om noe", ikkeGjor: "Ikke tren uten konsekvens/press" },
      { kategori: "Egenansvar", gjor: "Du er ikke avhengig av andre – ta økta", ikkeGjor: "Ikke vent på at noen \"fikser\" treningen" },
    ],
    kildefil: "A21-notorisk-maalscorer-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A22: Sidebacken høyt i banen (Dag Riisnæs)
  // Kilde: docs/uefa/A22-sidebacken-hoyt-i-banen-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a22-sidebacken",
    kode: "A22",
    tittel: "Sidebacken høyt i banen",
    forfatter: "Dag Riisnæs",
    tema: "Back som gjennombruddsvåpen mot etablert forsvar",
    roller: ["Sideback", "Back", "Sentral midtbane", "Indreløper", "Vinger"],
    sammendrag:
      "Riisnæs viser at backinvolvering høyt i banen (etter at motstanders fremste pressledd er borte) gir stor gevinst mot etablert/delvis etablert forsvar – i form av gjennombrudd, sjanser og scoringer. Formasjon er sekundært; nøkkelen er å vinne tid i pasningsspill, vende raskt og finne \"gratisrommet\" på svak side, med tydelige retningslinjer og balanse (restforsvar).",
    kpier: [
      { navn: "Andel mål mot etablert/delvis etablert", referanseverdi: "37% (105/285)", kilde: "CL 2005/06" },
      { navn: "Av disse: med back høyt involvert", referanseverdi: "44% (46/105)", kilde: "CL 2005/06" },
      { navn: "Andel av alle mål via back høyt", referanseverdi: "16,1% (46/285)", kilde: "CL 2005/06" },
      { navn: "Milan-case: etableringer med back høyt", referanseverdi: "69% (40/58)", kilde: "Milan–Barcelona" },
    ],
    fokuspunkter: [
      { id: "a22-vinn-tid", tekst: "Vinn tid med pasningsspill → vend raskt → finn gratisrommet (ofte motsatt side)" },
      { id: "a22-trigger", tekst: "Definer når back skal frigjøres høyt: \"pressledd borte\" (delvis etablert) er nøkkelbildet" },
      { id: "a22-kant-inn", tekst: "Kant inn – back ut: frigjør korridor for overlap/underlap/cutback", rolle: "Sideback" },
      { id: "a22-rest", tekst: "Balanse/restforsvar først: én går – én sikrer når kontringstrussel er høy", rolle: "Sentral midtbane" },
      { id: "a22-trening", tekst: "Tren back-høyt-bildet også fra ballerobring rundt midten (ikke bare fra keeper)" },
    ],
    ovelser: [],
    coachingCues: [
      { kategori: "Vending", gjor: "Vend! Back er fri!", ikkeGjor: "Ikke bli på ballsiden når de er smale" },
      { kategori: "Korridor", gjor: "Kant inn – back ut!", ikkeGjor: "Ikke lås både kant og back i samme rom" },
      { kategori: "Balanse", gjor: "Balanse før du går!", ikkeGjor: "Ikke gå høyt uten sikring" },
      { kategori: "Beslutning", gjor: "Valg før utførelse (hvor er rommet nå?)", ikkeGjor: "Ikke autopilot-innlegg" },
    ],
    kildefil: "A22-sidebacken-hoyt-i-banen-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A23: Atletico Madrid – forsvar (Alexander Øren)
  // Kilde: docs/uefa/A23-alexander-oren-atletico-forsvar.txt
  // ──────────────────────────────────────────
  {
    id: "a23-atletico-forsvar",
    kode: "A23",
    tittel: "Atletico Madrid: forsvarssuksess",
    forfatter: "Alexander Øren",
    tema: "Organisering av 4-4-2-forsvar i CL 2015/16",
    roller: ["Back", "Sideback", "Stopper", "Sentral midtbane", "Vinger", "Spiss"],
    sammendrag:
      "Øren analyserte alle 13 Champions League-kampene til Atletico Madrid 2015/16. Diego Simeones lag slapp inn kun 8 mål (0,6 per kamp) og 64 målsjanser (4,9 pr kamp) ved å variere mellom høyt press, mellom-/lav blokk og ekstrem sentrums-kompakthet. 69 % av sjansene imot kom i etablert spill, men Atletico lot motstanderen slå innlegg (57 mot Bayern) fordi 3+2-rest og boksdominans håndterte dem. Analyse av kontringer, dødball og gjenvinningspress viser hvorfor Atletico er referansen for organisert 4-4-2-forsvar.",
    kpier: [
      { navn: "Mål imot pr. kamp", referanseverdi: "0,6", kilde: "Kap. 3.1" },
      { navn: "Mål imot etter innlegg", referanseverdi: "4 av 8", kilde: "Kap. 3.1" },
      { navn: "Målsjanser imot", referanseverdi: "4,9 pr kamp (64 total)", kilde: "Kap. 3.2" },
      { navn: "Sjanser vs etablert", referanseverdi: "69 % (44 av 64)", kilde: "Kap. 3.2" },
      { navn: "Kontringer imot", referanseverdi: "≤7 pr kamp (maks i Benfica-hjemme)", kilde: "Kap. 3.3" },
      { navn: "Innlegg mot Bayern", referanseverdi: "57 innlegg → 1 baklengs", kilde: "Kap. 3.6.6" },
    ],
    fokuspunkter: [
      { id: "a23-hoypress", tekst: "Start kampene med 4-4-2 høyt press – vinn ball de første 10" },
      { id: "a23-mellomblokk", tekst: "Midtblokk: smal 4-4-2, stopp sentrale pasninger" },
      { id: "a23-lavblokk", tekst: "Lav blokk: front styrer ut i korridor – aksepter innlegg" },
      { id: "a23-3pluss2", tekst: "Restforsvar 3+2 uansett blokk", rolle: "Sentral midtbane" },
      { id: "a23-gjenvinning", tekst: "Gjenpress: markeringsorientert på balltap, press + sikring" },
    ],
    ovelser: [],
    coachingCues: [
      { kategori: "Press", gjor: "Ut med spiss/kant – styr oppbygging inn i felle", ikkeGjor: "Ikke halvpress i front" },
      { kategori: "Blokk", gjor: "Hold avstandene korte fra spiss til back", ikkeGjor: "Ikke slippe mellomrom" },
      { kategori: "Innlegg", gjor: "Kant faller inn – back møter, resten sikrer boks", ikkeGjor: "Ikke la alle gå i duell" },
      { kategori: "Kontring imot", gjor: "Gjenpress eller taktisk frispark", ikkeGjor: "Ikke la begge backer stå høyt" },
    ],
    kildefil: "A23-alexander-oren-atletico-forsvar.txt",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A24 – Etablert forsvar i 1-4-2-3-1 (Chelsea 2015/16) (Ole Martin Nesselquist)
  // Kilde: docs/uefa/A24-etablert-forsvar-4231-analyse-v2.md
  // Råkilde: docs/uefa/A24-ole-martin-nesselquist-etablert-forsvar.txt
  // ──────────────────────────────────────────
  {
    id: "a24-chelsea-forsvar",
    kode: "A24",
    tittel: "Etablert forsvar i 1-4-2-3-1 (Chelsea 2015/16)",
    forfatter: "Ole Martin Nesselquist",
    tema: "Steng sentralt → led utover → press hardt når ballen er bredt",
    roller: ["Keeper", "Back", "Stopper", "Sentral midtbane", "Vinger", "Spiss"],
    sammendrag:
      "I etablert forsvar handler det om posisjonell balanse: nekte spill gjennom oss og bak oss, styre hvor motstander får spille, og være forberedt på innlegg og bakrom. Chelsea-logikken i 1-4-2-3-1 er å stenge sentralt, lede utover og presse hardt når ballen er bredt. Laget jobber med et felles triggerspråk (ball i luft, feilvendt, dårlig touch) og bytter mellom høyt press (mer mannsorientert) og lavt press (sone som utgangspunkt med tydelige valg i sonen).",
    kpier: [
      { navn: "Sentrale gjennombrudd imot (10-rom)", referanseverdi: "Lavt", kilde: "Kampdimensjon → KPI" },
      { navn: "Ballvinning ved motstanders back", referanseverdi: "Høyt", kilde: "Kampdimensjon → KPI" },
      { navn: "Innlegg stoppet før innleggsfot (dødlinje)", referanseverdi: "Høyt", kilde: "Kampdimensjon → KPI" },
      { navn: "Vridninger imot etter bred ball", referanseverdi: "Lavt", kilde: "Kampdimensjon → KPI" },
      { navn: "Pressøyeblikk-reaksjon på 3 triggere", referanseverdi: "Høy andel (samlet push)", kilde: "Kampdimensjon → KPI" },
    ],
    fokuspunkter: [
      { id: "a24-system", tekst: "1-4-2-3-1 som blir 1-4-3-3 i høyt press og 1-4-4-1-1 i lavt press" },
      { id: "a24-regler", tekst: "Grunnregel: ikke gjennom oss først, ikke bak oss deretter (korte avstander i/mellom ledd)" },
      { id: "a24-led-utover", tekst: "Romprioritering: mye folk sentralt – led utover, og steng korte vridninger tilbake" },
      { id: "a24-triggere", tekst: "Felles triggerspråk: ball i luft / feilvendt / dårlig touch = samlet push" },
      { id: "a24-bred-3", tekst: "Bred ball: 3’er-blokk (back + kant + sentral midt) – én presser, to sikrer", rolle: "Back" },
      { id: "a24-boks-3", tekst: "Innlegg: boks-3’er (2 stoppere + motsatt back) blir hjemme; 6/8 beskytter straffemerke", rolle: "Stopper" },
    ],
    ovelser: [],
    coachingCues: [
      { kategori: "Kompakt", gjor: "Ikke gjennom oss! Vær smal, korte avstander", ikkeGjor: "Ikke åpne midten" },
      { kategori: "Styring", gjor: "Led utover – gi heller bredt rom enn sentralt gjennombrudd", ikkeGjor: "Ikke slippe vridning enkelt tilbake" },
      { kategori: "Trigger", gjor: "Pressøyeblikk (luft/feilvendt/dårlig touch) – alle opp samtidig", ikkeGjor: "Ikke press alene" },
      { kategori: "Bred ball", gjor: "Bred 3’er: én presser, to sikrer", ikkeGjor: "Ikke to i press uten sikring" },
      { kategori: "Boks", gjor: "Boks-3’er blir! Sikre straffemerke og bakre stolpe", ikkeGjor: "Ikke dra boks-3’eren ut" },
    ],
    kildefil: "A24-etablert-forsvar-4231-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A25: FFK baklengs (Even Juliussen)
  // Kilde: docs/uefa/A25-ffk-forsvar-2012-analyse-v2.md
  // Råkilde: docs/uefa/A25-even-juliussen-ffk-forsvar.txt
  // ──────────────────────────────────────────
  {
    id: "a25-ffk-baklengs",
    kode: "A25",
    tittel: "FFK forsvar (2012) – innslupne mål",
    forfatter: "Even Juliussen",
    tema: "Ramma vs press, avstander/dybde og push-ups i backledd",
    roller: ["Back", "Stopper", "Sentral midtbane", "Vinger"],
    sammendrag:
      "FFK 2012 slipper inn mye i etablert forsvar og på dødball (59 mål på 30 kamper = 1,97 pr kamp). Nøkkelutfordringer er felles beslutningsregel («ramma vs press»), dybde/kompakthet i og mellom ledd, backledd som faller av for tidlig og mangler felles push-up etter klarering, samt relasjoner i rommet bak/mellom back–stopper. I tillegg må laget ha en tydelig closing-atferd siden 25,42 % av baklengsmålene kommer siste 15 minutter.",
    kpier: [
      { navn: "Andel baklengsmål siste 15 min", referanseverdi: "<18 % (ned fra 25,42 %)", kilde: "Kampdimensjon → KPI" },
      { navn: "Mål imot i etablert forsvar (andel)", referanseverdi: "<38 % (ned fra 44,07 %)", kilde: "Kampdimensjon → KPI" },
      { navn: "Mål imot på dødball (andel)", referanseverdi: "<30 % (ned fra 37,29 %)", kilde: "Kampdimensjon → KPI" },
      { navn: "Balltap som gir baklengs – sentralt", referanseverdi: "<45 % (ned fra 56,76 %)", kilde: "Kampdimensjon → KPI" },
      { navn: "Push-up etter klarering", referanseverdi: "Alle ledd opp innen 3–4 sek", kilde: "Kampdimensjon → KPI" },
    ],
    fokuspunkter: [
      { id: "a25-ramma-press", tekst: "Felles beslutningsregel: «ligg i ramma» vs «gå i press» (unngå at laget sprekker opp)" },
      { id: "a25-dybde", tekst: "Dybde + kompakt lag i og mellom ledd (reduser sikringsavstander)" },
      { id: "a25-pushup", tekst: "Backledd: ikke falle av for tidlig – push-up i samklang etter klarering/støtte", rolle: "Back" },
      { id: "a25-bak-mellom", tekst: "Steng rommet bak og mellom back–stopper (triangel: back/stopper/CM)", rolle: "Stopper" },
      { id: "a25-closing", tekst: "Kampstyring siste 15 min: closing-atferd (risiko/avstander/duellkraft)" },
    ],
    ovelser: [
      { kode: "uefa-a25-01" },
      { kode: "uefa-a25-02" },
      { kode: "uefa-a25-03" },
      { kode: "uefa-a25-04" },
    ],
    coachingCues: [
      { kategori: "Ramme", gjor: "Ramma! (samle, komprimer, nekt mellomrom)", ikkeGjor: "Ikke halv-press uten sikring" },
      { kategori: "1F", gjor: "Bremse–lede! (skap dybde, ikke stup)", ikkeGjor: "Ikke la 1F dra laget ut av posisjon" },
      { kategori: "Backledd", gjor: "Backlinje: hold igjen – ikke falle av, og opp sammen etter klarering", ikkeGjor: "Ikke bli hengende dypt" },
      { kategori: "Relasjon", gjor: "Steng bak–mellom (back/stopper/CM triangel)", ikkeGjor: "Ikke gi gratisrom bak og mellom" },
      { kategori: "Closing", gjor: "Siste 15: risikokontroll + klarering/andreball", ikkeGjor: "Ikke gamble når vi skal lukke kamp" },
    ],
    kildefil: "A25-ffk-forsvar-2012-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // G01: Keeper (spillbasert keeperutvikling) (Håkon Grøttland)
  // Kilde: docs/uefa/G01-keeper-spillbasert-utvikling-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "g01-keeper-spillbasert",
    kode: "G01",
    tittel: "Keeper – spillbasert keeperutvikling",
    forfatter: "Håkon Grøttland",
    tema: "Kamplik trening som tvinger valg + samhandling",
    roller: ["Keeper"],
    sammendrag:
      "Keepertrening bør i hovedsak være kamplik og spillbasert. En god keeperøvelse tvinger fram valg før handling, realistisk tid/rom/motstand og samhandling med laget. Mye av keeperens jobb er å avverge før skudd (innlegg/gjennomspill) og å løse 1v1 med riktig timing på romtaking/blokkering. Kvalitet kan følges gjennom repetisjoner i kampbilder – ikke isolerte serier.",
    kpier: [
      { navn: "1v1 løst med riktig valg", referanseverdi: "Høy andel", kilde: "Kampdimensjon → KPI" },
      { navn: "Innlegg håndtert (holde/bokse/avvente)", referanseverdi: "Høy andel", kilde: "Kampdimensjon → KPI" },
      { navn: "Avverging før skudd (bryte gjennomspill/innlegg)", referanseverdi: "Høy andel", kilde: "Kampdimensjon → KPI" },
    ],
    fokuspunkter: [
      { id: "g01-spillbasert", tekst: "Design økter som gir valg + motstand + samhandling (spillvarianter fremfor serier)", rolle: "Keeper" },
      { id: "g01-avverge", tekst: "Avverge før skudd: jobb med innlegg + gjennomspill (ballerobrer-rollen)", rolle: "Keeper" },
      { id: "g01-1v1", tekst: "1v1: riktig timing på romtaking/blokkering når ballen er fri", rolle: "Keeper" },
      { id: "g01-kommunikasjon", tekst: "Kommunikasjon + posisjonering: styre/organisere og samhandle", rolle: "Keeper" },
    ],
    ovelser: [
      { kode: "uefa-g01-01" },
      { kode: "uefa-g01-02" },
      { kode: "uefa-g01-03" },
    ],
    coachingCues: [
      { kategori: "Valg", gjor: "Velg før du går!", ikkeGjor: "Ikke autopilot" },
      { kategori: "1v1", gjor: "Rom! (ta rom når ballen er fri)", ikkeGjor: "Ikke bli stående på strek uten bilde" },
      { kategori: "Skudd", gjor: "Set! (grunnstilling i skuddøyeblikk)", ikkeGjor: "Ikke vær på vei" },
      { kategori: "Grep", gjor: "Bak ball! Lås!", ikkeGjor: "Ikke gi retur uten plan" },
    ],
    kildefil: "G01-keeper-spillbasert-utvikling-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // G02: Keeper (hva keeper møter i kamp) (Tor Martin Hegrenes)
  // Kilde: docs/uefa/G02-keeper-hva-moter-i-kamp-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "g02-keeper-kampdimensjon",
    kode: "G02",
    tittel: "Keeper – hva keeper møter i kamp (treningsfordeling)",
    forfatter: "Tor Martin Hegrenes",
    tema: "Kampdimensjon styrer prioritering: defensivt, igangsetting, dødball",
    roller: ["Keeper"],
    sammendrag:
      "Hegrenes argumenterer for at keepertrening bør styres av hva keepere faktisk møter i kamp. Med datagrunnlag fra 30 kamper (Tippeliga, Bundesliga, La Liga) synliggjøres en praktisk prioritering av treningstid: defensive spillsituasjoner, offensive igangsettinger og defensive dødballer. Økt-design skal gi valg + utførelse under realistisk tid/press, særlig i igangsetting etter tilbakespill.",
    kpier: [
      { navn: "Fordeling i trening (def/spill/sett)", referanseverdi: "31% / 28% / 42%", kilde: "Prioriteringsliste" },
      { navn: "Igangsettinger: dødball-andel", referanseverdi: "≈41%", kilde: "Kampdimensjon" },
      { navn: "Fot ved igangsetting", referanseverdi: "80–85%", kilde: "Kampdimensjon" },
    ],
    fokuspunkter: [
      { id: "g02-spesifisitet", tekst: "Spesifisitet: øvelser må gi valg + utførelse med nok repetisjoner", rolle: "Keeper" },
      { id: "g02-tilbakespill", tekst: "Tilbakespill: posisjonering for å bli spillbar, flere valg, og tid/press-regel", rolle: "Keeper" },
      { id: "g02-prioritering", tekst: "Bruk kampdimensjon til å prioritere tid (defensivt, igangsetting, defensive dødballer)", rolle: "Keeper" },
    ],
    ovelser: [
      { kode: "uefa-g02-01" },
      { kode: "uefa-g02-02" },
      { kode: "uefa-g02-03" },
    ],
    coachingCues: [
      { kategori: "Scan", gjor: "Scan – velg tempo!", ikkeGjor: "Ikke spill uten å se" },
      { kategori: "Spillbar", gjor: "Vær spillbar!", ikkeGjor: "Ikke gjem deg bak press" },
      { kategori: "Valg", gjor: "Flere valg!", ikkeGjor: "Ikke lås deg på én løsning" },
      { kategori: "Trykk", gjor: "Tid/press-regel!", ikkeGjor: "Ikke tren uten kamptrykk" },
    ],
    kildefil: "G02-keeper-hva-moter-i-kamp-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A26: Innlegg imot – TUIL (Gaute Helstrup)
  // Kilde: docs/uefa/A26-gaute-helstrup-innlegg-forsvar.txt
  // ──────────────────────────────────────────
  {
    id: "a26-innlegg-forsvar",
    kode: "A26",
    tittel: "Forsvar mot innlegg",
    forfatter: "Gaute Helstrup",
    tema: "TUIL 2010 – farlig sone, posisjonell balanse og sluttfase",
    roller: ["Back", "Stopper", "Sentral midtbane", "Vinger"],
    sammendrag:
      "Helstrup analyserte innlegg mot etablert/delvis etablert forsvar i TUILs 8 siste kamper i Adeccoligaen 2010. 125 innlegg (88,65 % av alle innlegg) ble analysert: 70 % av avslutningene og 78 % av sjansene kom etter pause. 88,8 % av sjansene kom etter innlegg fra «farlig sone». TUIL hadde oftest numerisk overtall i farlig sone (4,41 forsvarere vs 3,08 angripere), men var i posisjonell ubalanse ved 59,2 % av innleggene – og dette hang tydelig sammen med sjanser/avslutninger. Funnene peker på to prioriteringer i praksis: (1) stopp innlegg i farlig sone, og (2) «telle opp» og fordele roller i boks (første/midtre/bakre sone + returrom), med felles push-up/andreball-atferd.",
    kpier: [
      { navn: "Avklaringer", referanseverdi: "53,6 % (67/125)", kilde: "Resultat av innlegg" },
      { navn: "Sjanser", referanseverdi: "9 av 125 (7,2 %) – 8 fra farlig sone", kilde: "Sjanser" },
      { navn: "Posisjonell balanse", referanseverdi: "Ubalanse i 59,2 %", kilde: "Posisjonell balanse" },
      { navn: "Farlig sone sjanser", referanseverdi: "88,8 %", kilde: "Innlegg fra farlig sone" },
      { navn: "Bakre sone avslutning", referanseverdi: "46 %", kilde: "Resultat pr sone" },
      { navn: "Returrom avslutning", referanseverdi: "28,6 %", kilde: "Resultat pr sone" },
    ],
    fokuspunkter: [
      { id: "a26-farligsone", tekst: "Farlig sone først: stopp innlegg før ballen slås" },
      { id: "a26-telleopp", tekst: "Telle opp i boks: første/midtre/bakre sone + returrom" },
      { id: "a26-posisjon", tekst: "Posisjonell balanse: ikke bli lokket ut – ha kontroll i farlige rom" },
      { id: "a26-pushup", tekst: "Push-up/andreball: opp sammen etter klarering, tette mellomrom" },
      { id: "a26-sluttkamp", tekst: "Sluttfase-protokoll: 2. omgang gir flest sjanser/avslutninger" },
    ],
    ovelser: [{ kode: "uefa-a26-01" }, { kode: "uefa-a26-02" }, { kode: "uefa-a26-03" }],
    coachingCues: [
      { kategori: "Farlig sone", gjor: "Farlig sone først!", ikkeGjor: "Ikke tillat kryss fra farlig sone" },
      { kategori: "Telling", gjor: "Telle opp! (1/midt/bak/retur)", ikkeGjor: "Ikke bli ballfokusert" },
      { kategori: "Bakre stolpe", gjor: "Bakre stolpe!", ikkeGjor: "Ikke la bakre sone stå åpen" },
      { kategori: "Returrom", gjor: "Returrom!", ikkeGjor: "Ikke la andreball bli fri" },
      { kategori: "Push-up", gjor: "Opp sammen!", ikkeGjor: "Ikke bli stående lavt etter klarering" },
    ],
    kildefil: "A26-forsvar-mot-innlegg-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },
  {
    id: "a09-overgangsspill",
    kode: "A09",
    tittel: "Overgangsspill",
    forfatter: "Bjarte Lunde Aarsheim",
    tema: "Overgangssikring, presshøyde og førstevalg etter brudd",
    roller: ["Spiss", "Vinger", "Back", "Sentral midtbane", "Indreløper", "Stopper"],
    sammendrag: `Kjerneidé: For å skape målsjanser på overganger må laget være organisert nok til å vinne gunstige brudd (høyt/lavt), og dyktig nok i førstevalgene etter brudd (valg + bevegelse + kvalitet).

Nøkkeltall (4 kamper):
- 97 gunstige brudd: 43 høyt / 54 lavt
- 22 vellykkede overganger → 17 målsjanser
- Output: 6 mål + 2 straffer (som også gir mål)
- 52 mislykkede overganger
- Valg etter brudd: mellomrom 43 / direkte bakrom 29 / vekk fra press 27

Hovedprinsipper:
- 1.forsvarer er signalspiller: vinn når vi har balanse, sink når vi er i ubalanse
- Restforsvar («def i off») = 3 + 2
- Skap trusler i flere rom samtidig (ikke spill på første løp)
- Valg-hierarki: frem hvis mulig, ellers vekk fra press for ny ballfører`,
    kpier: [
      { navn: "Gunstige brudd", referanseverdi: "97 (43 høye / 54 lave)", kilde: "Kampdimensjon (4 kamper)" },
      { navn: "Vellykkede overganger", referanseverdi: "22 (17 sjanser, 6 mål, 2 straffer)", kilde: "Kampdimensjon (4 kamper)" },
      { navn: "Mislykkede overganger", referanseverdi: "52 (4 kamper)", kilde: "Kampdimensjon (4 kamper)" },
      { navn: "Vellykket overgang-rate", referanseverdi: "22/97 (≈23 %)", kilde: "Kampdimensjon (4 kamper)" },
      { navn: "Sjanse-rate (etter vellykket overgang)", referanseverdi: "17/22 (≈77 %)", kilde: "Kampdimensjon (4 kamper)" },
      { navn: "Valg etter brudd", referanseverdi: "Bakrom 29 / Mellomrom 43 / Vekk fra press 27", kilde: "Kampdimensjon (4 kamper)" },
      { navn: "Brudd pr kamp", referanseverdi: "Randaberg 33 / Viking2 27 / Madla 20 / VBK 17", kilde: "Kampdimensjon (4 kamper)" },
    ],
    fokuspunkter: [
      { id: "a09-1f", tekst: "Førsteforsvarer = signalspiller: vinn når vi har balanse, sink når vi er i ubalanse (nærmeste er 1F)", rolle: "Stopper" },
      { id: "a09-3pluss2", tekst: "Restforsvar («def i off») = 3 + 2 – rollene må fylles av de som er nærmest (ikke alltid samme to)", rolle: "Sentral midtbane" },
      { id: "a09-kilder", tekst: "Brudd kommer fra: god 1F, 2. ball/1. pasning/klarering med mening, og gode 2./3. forsvarere" },
      { id: "a09-flere-rom", tekst: "I overgangen: skap trusler i flere rom samtidig – ikke spill på første løp (timing/utførelse)", rolle: "Spiss" },
      { id: "a09-hierarki", tekst: "Valg-hierarki etter brudd: frem i lengderetning når det er der – ellers vekk fra press for ny ballfører rettvendt", rolle: "Sentral midtbane" },
    ],
    ovelser: [
      { kode: "uefa-a09-01" },
      { kode: "uefa-a09-02" },
    ],
    coachingCues: [
      { kategori: "1F", gjor: "Nærmeste er 1F – vinn eller sink (les klima)", ikkeGjor: "Ikke løp i press uten at laget står etter" },
      { kategori: "Balanse", gjor: "3+2 igjen før vi overbelaster", ikkeGjor: "Ikke send alle foran ball" },
      { kategori: "Overgang", gjor: "Ikke spill på første løp – skap flere trusler", ikkeGjor: "Ikke lås deg på én pasning" },
      { kategori: "1. pasning", gjor: "Første pasning: frem hvis mulig – ellers vekk fra press", ikkeGjor: "Ikke tving bakrom for enhver pris" },
    ],
    kildefil: "A09-bjarte-lunde-aarsheim-overgang-analyse.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2014-oppgave-bjarte-lunde-aarsheim.pdf",
  },
];
