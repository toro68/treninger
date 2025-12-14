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
  /** Hvilken rolle dette gjelder spesielt */
  rolle?: Rolle;
};

/**
 * Referanse til øvelse i øvelsesbanken.
 * Kun kode lagres her – navn/kategori hentes dynamisk fra exercises.ts
 */
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
    sammendrag:
      "Rushfeldt peker på tre ting som bør styre treningen for målscorere: avslutte fort, være i riktig sone (innenfor 16 m – helst 11 m) og å ha en plan i typiske situasjoner. Tallmaterialet viser at de fleste mål kommer på 1–2 touch og nært mål, mens returer og innlegg utgjør en stor andel av scoringene. Poenget er å bygge vaner og besluttsomhet gjennom kampnære øvelser: bevegelse på blindsiden, forberedelse før mottak og etterarbeid på returer.",
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
    sammendrag:
      "Holme analyserte åtte topp-playmakere (Özil, Messi, Xavi, Iniesta, Mata, Fabregas, Hamsik, Silva) i CL 2012/13 og deler hver assistsituasjon i tre faser: komme på ball, gå fra mulighet til realitet og avgjørende pasning. Funnene peker på konkrete læringsmomenter: posisjonering i mellomrommet (lavt/midt i rommet i 88,3 % av situasjonene), kroppsvinkel ved mottak (rett-/sidevendt i 80,3 %) og rask håndtering i fase 2 (59,8 % av involveringene varer 0–2 sek). I fase 3 beskrives at assister oftest slås fra sentral sone/mellomrom rett utenfor 16-meteren, og at presisjon og timing mot løp (bakrom/rom i bakre ledd) er sentralt.",
    kpier: [
      { navn: "Høyde i mellomrom", referanseverdi: "Lavt/midt i rommet = 88,3 %", kilde: "Kap. 5.3.2" },
      { navn: "Kroppsvinkel ved mottak", referanseverdi: "Rett-/sidevendt = 80,3 %", kilde: "Kap. 5.3.3" },
      { navn: "Tid på ball (fase 2)", referanseverdi: "0–2 sek = 59,8 %", kilde: "Kap. 5.4.1" },
      { navn: "Antall touch (fase 2)", referanseverdi: "1 touch = 27,8 % (2 touch = 24,7 %)", kilde: "Kap. 5.4.2" },
    ],
    fokuspunkter: [
      { id: "a08-fase1", tekst: "Fase 1: posisjonér deg midt i mellomrommet og møt ball med åpen kropp" },
      { id: "a08-fase2", tekst: "Fase 2: forbered i forkant – kort tid på ball og krav til hurtig ballbehandling" },
      { id: "a08-fase3", tekst: "Fase 3: presisjon + timing i avgjørende pasning (ofte fra sentral sone/mellomrom)" },
      { id: "a08-roller", tekst: "Spiss/kant må koordinere løp med playmaker" },
    ],
    ovelser: [
      { kode: "uefa-a08-01" },
      { kode: "uefa-a08-02" },
    ],
    coachingCues: [
      { kategori: "Orientering", gjor: "Se før du får den", ikkeGjor: "Ikke motta uten plan" },
      { kategori: "Touch", gjor: "Åpen kropp – to touch", ikkeGjor: "Ikke stå på hælene" },
      { kategori: "Pasning", gjor: "Vær presis og treff timing mot løp", ikkeGjor: "Ikke hold igjen for lenge" },
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
    tittel: "Vingerrollen – implicit læring",
    forfatter: "Hugo Pereira",
    tema: "Vingerrolle, implicit læring, constraints",
    roller: ["Høyrevinger", "Venstrevinger", "Back"],
    sammendrag:
      "Pereira bruker VM-2014-data til å konkretisere hvilke betingelser vinger typisk lykkes under når de assisterer, slår innlegg og avslutter. I nøkkelsituasjonene er pressavstanden ofte 1–3 meter, og valg/utførelse skjer på få sekunder og få touch. Poenget i rapporten er å trene dette gjennom constraints (banestørrelse, soner, touchregler og poengsystem) heller enn detaljerte instrukser – slik at beslutning og teknikk utvikles implicit under realistisk press.",
    kpier: [
      { navn: "Presser ved assist", referanseverdi: "1–3 m (75 %)", kilde: "Kap. 5.1" },
      { navn: "Tid før assist", referanseverdi: "1–4 sek (77,7 %)", kilde: "Kap. 5.1" },
      { navn: "Touch før assist", referanseverdi: "1–3 touch (60,7 %)", kilde: "Kap. 5.1" },
      { navn: "Område avgjørende pasning", referanseverdi: "Siste tredel (91 %)", kilde: "Kap. 5.1" },
      { navn: "Presser ved innlegg", referanseverdi: "1–3 m (67 %)", kilde: "Kap. 5.2" },
      { navn: "Touch før innlegg", referanseverdi: "≤4 touch (76 %)", kilde: "Kap. 5.2" },
      { navn: "Hvem scorer etter innlegg", referanseverdi: "Spiss 56 % / motsatt ving 31 %", kilde: "Kap. 5.2" },
      { navn: "Presser ved avslutning", referanseverdi: "1–2 m (84 %)", kilde: "Kap. 5.3" },
      { navn: "Avslutninger i boks", referanseverdi: "82 %", kilde: "Kap. 5.3" },
      { navn: "Skuddplassering", referanseverdi: "Lavt plassert = 64 %", kilde: "Kap. 5.3" },
    ],
    fokuspunkter: [
      { id: "uefa-a10-fokus-orientering", tekst: "Orienter før mottak – planlegg løsning før første touch", rolle: "Vinger" },
      { id: "uefa-a10-fokus-press", tekst: "Aksepter tett press (ofte 1–3 m) i nøkkelsituasjoner – tren på å utføre med lite tid/rom", rolle: "Vinger" },
      { id: "uefa-a10-fokus-touch", tekst: "Knytt touch til valg: få touch i avgjørende øyeblikk (assist/innlegg/avslutning)", rolle: "Vinger" },
      { id: "uefa-a10-fokus-innlegg", tekst: "Innlegg: variér mellom 1-touch og innlegg etter dribling – les boks og relasjoner (spiss/motsatt ving)", rolle: "Vinger" },
      { id: "uefa-a10-fokus-avslutning", tekst: "Avslutning: prioriter lavt plasserte skudd og treff mål under press", rolle: "Vinger" },
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
        kategori: "Orientering",
        gjor: "Sjekk over skulder før mottak – planlegg løsningen",
        ikkeGjor: "Ikke motta på hælene uten informasjon",
      },
      {
        kategori: "Innlegg",
        gjor: "Slå tidlig/cut-back basert på press",
        ikkeGjor: "Ikke drible deg fast i hjørnet",
      },
      {
        kategori: "Avslutning",
        gjor: "Plasser lavt og hardt – spill safe",
        ikkeGjor: "Ikke skyte utenfor mål – treff alltid innen ramma",
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
      "Maalen analyserer målsjanser for og mot RBK i Tippeligaen 2006–2011 for å beskrive hvordan ulike trenerregimer gir ulike angrepsprofiler. Funnene peker på en klar sammenheng mellom sjansedifferanse og poengfangst: å skape mange sjanser er viktig, men å slippe til få er avgjørende for stabil poengsanking. Periodene under Eggen og Hamrén skiller seg ut med høy poengfangst, mens Jönsson skaper mye offensivt, men straffes av flere sjanser mot – særlig når laget ligger i etablert forsvar.",
    kpier: [
      { navn: "Poeng pr. kamp", referanseverdi: "Eggen 2,4 / Hamrén 2,1", kilde: "Sammendrag" },
      { navn: "Målsjanser pr. kamp", referanseverdi: "Eggen 9,5 / Jönsson 9,7 (Henriksen 6,1)", kilde: "Sammendrag" },
      { navn: "Sjanser mot pr. kamp", referanseverdi: "Hamrén 4,0 (Jönsson 5,7)", kilde: "Resultater: Sjanser for og sjanser mot" },
      {
        navn: "Sjansedifferanse → poeng",
        referanseverdi: ">2 poeng pr. kamp ≈ dobbelt så mange sjanser som man slipper til",
        kilde: "Resultater: Sjanser for og sjanser mot",
      },
      { navn: "Kontringsandel (RBK-sjanser)", referanseverdi: "Hamrén 25,5 % → Eggen 30,3 %", kilde: "Diskusjon (angrepstype)" },
      { navn: "Store sjanser", referanseverdi: "Henriksen 33 % (høyest)", kilde: "Diskusjon (store sjanser)" },
    ],
    fokuspunkter: [
      { id: "a11-differanse", tekst: "Styr etter sjansedifferanse (for/mot) – ikke bare mål" },
      { id: "a11-balanse", tekst: "Velg risikoprofil bevisst: mer gjennombrudd/kontring gir ofte mer begge veier" },
      { id: "a11-angrepstype", tekst: "Skill på etablerte angrep, kontring og dødball når du evaluerer sjansene" },
      { id: "a11-defensiv", tekst: "Defensiv trygghet kan øke poengfangst ved å redusere sjanser mot" },
    ],
    ovelser: [
      { kode: "uefa-a11-01" },
      { kode: "uefa-a11-02" },
      { kode: "uefa-a11-03" },
      { kode: "uefa-a11-04" },
      { kode: "uefa-a11-05" },
    ],
    coachingCues: [
      { kategori: "Måling", gjor: "Loggfør sjanser for/mot og sjansetype over tid", ikkeGjor: "Ikke styr kun etter sluttresultat" },
      { kategori: "Balanse", gjor: "Avklar når laget skal gå for gjennombrudd vs. sikre restforsvar", ikkeGjor: "Ikke bli halvveis mellom press og fall" },
      { kategori: "Diskusjon", gjor: "Koble tall til video og konkrete sekvenser", ikkeGjor: "Ikke la KPI-er bli mål i seg selv" },
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
    tema: "Angrepsprinsipper og bevegelsesmønster",
    roller: ["Spiss", "Offensiv midtbane", "Indreløper", "Vinger"],
    sammendrag:
      "Analyse av målangrep (norsk og internasjonalt) med fokus på tidsbruk, pasningsantall og hvor i banen bruddene som leder til mål kommer. Funnene peker på at forskjellene mellom lagene i stor grad er små, men at norske lag har en overvekt av svært korte angrep (maks 2 pasninger før mål). Samtidig rapporteres både en hovedvekt av direkte angrep (maks 5 trekk; ca. 60/40) og at mange mål kommer innen få pasninger (opp mot ca. 65% innen maks 4 pasninger), mens ca. 60%+ kommer etter lengre enn 10 sekunder.",
    kpier: [
      { navn: "Snitt trekk før mål", referanseverdi: "≈ 5,5", kilde: "Sammendrag" },
      { navn: "Korte angrep (Norge)", referanseverdi: "Overvekt på maks 2 pasninger før mål", kilde: "Sammendrag" },
      { navn: "Mål innen maks 4 pasninger", referanseverdi: "Opp mot ca. 65%", kilde: "Sammendrag" },
      { navn: "Mål etter >10 sekunder", referanseverdi: "Ca. 60%+", kilde: "Sammendrag" },
      { navn: "Direkte angrep (maks 5 trekk)", referanseverdi: "Ca. 60/40 i favør direkte", kilde: "Sammendrag" },
    ],
    fokuspunkter: [
      { id: "a12-f1", tekst: "Mål-angrep: vurder tid og pasningsantall (knytt til scoring)" },
      { id: "a12-f2", tekst: "Direkte vs. possession: behersk begge og velg riktig i kamp" },
      { id: "a12-f3", tekst: "Bruddhøyde: se hvor i banen ballvinningene som leder til mål skjer" },
      { id: "a12-f4", tekst: "Korte vs. lengre angrep: mål kan komme både tidlig og etter lengre etablering" },
    ],
    ovelser: [
      { kode: "uefa-a12-01" },
      { kode: "uefa-a12-02" },
    ],
    coachingCues: [
      {
        kategori: "Måling",
        gjor: "Loggfør tid og antall pasninger i angrep som ender i mål/sjanse",
        ikkeGjor: "Ikke trekk bastante konklusjoner fra enkelteksempler",
      },
      {
        kategori: "Valg",
        gjor: "Vurder når direkte angrep er best, og når laget bør etablere mer kontroll",
        ikkeGjor: "Ikke jag kort angrep som et mål i seg selv",
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
    tittel: "Rolletrening SB/IL",
    forfatter: "Arnstein Røen",
    tema: "4-3-3 rollekrav sideback og indreløper",
    roller: ["Sideback", "Indreløper"],
    sammendrag:
      "Orkla FK kombinerer skole- og klubbøkter for å utvikle sidebacker og indreløpere i Eggen-inspirert 4-3-3. Sidebacker skal frispille indreløper rettvendt i mellomrom/rom 2 og håndtere 1–1/1–2 defensivt, mens indreløpere skal identifisere rom og ta av press på første touch. Angrepsspillet beskrives i faser med samtidige bevegelser som truer ulike rom, og det vektlegges minst 4 innløp i boks ved etablert angrep.",
    kpier: [
      { navn: "Innløp i boks (etablert angrep)", referanseverdi: "Minst 4 (rom 1–3 + 45°)", kilde: "Kap. 4.4" },
      { navn: "Overlapp timing", referanseverdi: "«Aldri» seine overlapper (siste 20 m)", kilde: "Kap. 4.4" },
      { navn: "SB repeterende sprint", referanseverdi: "Gjenta hurtige løp på kort tid", kilde: "Kap. 4.4" },
      { navn: "SB 1–1 / 1–2 defensivt", referanseverdi: "Handlingsvalg og utførelse i duell/2v2", kilde: "Kap. 4.4" },
      { navn: "IL romforståelse + første touch", referanseverdi: "Identifiser rom + ta av press", kilde: "Kap. 4.4" },
    ],
    fokuspunkter: [
      { id: "a13-sb-frispill", tekst: "Sideback: frispill IL rettvendt i rom 2 – vurder kant/SM", rolle: "Sideback" },
      { id: "a13-il-kombinasjon", tekst: "Indreløper: identifiser rom og ta av press på første touch", rolle: "Indreløper" },
      { id: "a13-3pluss2", tekst: "Etablerte angrep: minst 4 innløp i boks (rom 1–3 + 45°)" },
      { id: "a13-gjenvinning", tekst: "Omstilling: vurder gjenvinne eller reorganisere – hvilke rom er farligst?", rolle: "Sideback" },
      { id: "a13-skolerolle", tekst: "Overfør skoleøkter (basis/possession) til klubbøkter og kamp" },
    ],
    ovelser: [
      { kode: "uefa-a13-01" },
      { kode: "uefa-a13-02" },
    ],
    coachingCues: [
      { kategori: "Sideback", gjor: "Frispill IL rettvendt – vurder tidlig overlap (unngå sein)", ikkeGjor: "Ikke kom for seint inn i overlapp" },
      { kategori: "Indreløper", gjor: "Identifiser rom tidlig – ta av press på første touch", ikkeGjor: "Ikke motta uten å ha sett deg rundt" },
      { kategori: "Innløp", gjor: "Ved etablert angrep: fyll boksen med minst 4 innløp", ikkeGjor: "Ikke bli for få i boks" },
    ],
    kildefil: "A13-sideback-indreloper-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
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
      "Oltedal beskriver indreløperrollen i 4-3-1-2 (diamant) gjennom observasjon og intervju. Offensivt blir et sentralt funn at indreløperen på den sterke siden, i tospann med back samme side, har ansvar for å skape bredde i mellomrommet. Defensivt framheves at systemet fordrer høyt press og at indreløperne skal bidra til at spillet ledes ut (ikke inn) ved å skyve innenfra og ut mot motstanderback og stenge pasningsalternativer innover. I omstilling etter balltap vektlegges en umiddelbar reaksjon («løpe de første sekundene»).",
    kpier: [
      {
        navn: "Bredde i mellomrommet (sterk side)",
        referanseverdi: "IL + back: skap bredde i mellomrommet",
        kilde: "Resultater (hypotese 1)",
      },
      {
        navn: "Pressretning",
        referanseverdi: "Led spillet ut (ikke inn) – tving motstander mot sidekorridor",
        kilde: "Resultater (hypotese 2)",
      },
      {
        navn: "Skyv i press mot back",
        referanseverdi: "Skyv innenfra og ut mot back – steng pasningsalternativer innover",
        kilde: "Kap. 7.2",
      },
      {
        navn: "Gjenvinning etter balltap",
        referanseverdi: "Umiddelbar reaksjon: løp de første sekundene",
        kilde: "Intervju (Bakke)",
      },
      {
        navn: "Presshøyde",
        referanseverdi: "4-3-1-2 fordrer høyt press (lavt press ofte resultat av at plan A ikke lyktes)",
        kilde: "Kap. 7.2",
      },
    ],
    fokuspunkter: [
      {
        id: "a14-bredde",
        tekst: "Angrep: indreløper på sterk side, i tospann med back, skaper bredde i mellomrommet",
        rolle: "Indreløper",
      },
      {
        id: "a14-led-ut",
        tekst: "Forsvar: jobb for at spillet ledes ut, ikke inn – tving motstander mot sidekorridor",
        rolle: "Indreløper",
      },
      {
        id: "a14-press-back",
        tekst: "Når ball går ut til back: skyv innenfra og ut og steng pasningsalternativer innover",
        rolle: "Indreløper",
      },
      {
        id: "a14-synkronisering",
        tekst: "Høyt press i 4-3-1-2 krever synkronisering mellom spisspar, mellomromsspiller og midtbane",
      },
      {
        id: "a14-balltap",
        tekst: "Balltap: ha «klikkmentalitet» – alle løper de første sekundene",
      },
    ],
    ovelser: [
      { kode: "uefa-a14-01" },
      { kode: "uefa-a14-02" },
    ],
    coachingCues: [
      {
        kategori: "Bredde",
        gjor: "Skap bredde i mellomrommet på ballside (i tospann med back)",
        ikkeGjor: "Ikke la ballside være ubesatt og lett å stenge",
      },
      {
        kategori: "Pressretning",
        gjor: "Skyv innenfra og ut mot back og steng alternativer innover",
        ikkeGjor: "Ikke gi gratis pasningslinjer inn sentralt",
      },
      {
        kategori: "Balltap",
        gjor: "Reager umiddelbart: løp de første sekundene etter balltap",
        ikkeGjor: "Ikke jogg deg i posisjon før første press er satt",
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
      "Kristiansen analyserer samtlige scoringer i Tippeligaen 2015 (uten dødball) og koder både hvor innlegget slås fra og hvor målet scores (soner med bokstaver). Funnene viser at innlegg i åpent spill står bak ca. 34 % av målene, og at 3,5 % av alle innlegg ender i scoring. 96 % av innleggs-scoringene blir satt innenfor 16-meteren, og en stor andel er «direkte» (innlegger + målscorer). Analysen viser også tydelige forskjeller mellom lag og spillere.",
    kpier: [
      { navn: "Andel mål fra innlegg", referanseverdi: "34 %", kilde: "Tippeligaen 2015" },
      { navn: "Scoring pr innlegg", referanseverdi: "3,5 %", kilde: "Tippeligaen 2015" },
      { navn: "Direkte scoring", referanseverdi: "68,32 %", kilde: "Tippeligaen 2015" },
      { navn: "Mål innenfor 16 m", referanseverdi: "96 %", kilde: "Tippeligaen 2015" },
      { navn: "Innlegg etablert vs overgang", referanseverdi: "73/27 %", kilde: "Tippeligaen 2015" },
    ],
    fokuspunkter: [
      {
        id: "a15-innlegg-soner",
        tekst: "Analysen koder innlegg i soner (A–F) og viser at innlegg nærmere mål oftere ender i scoring enn de dypeste sonene",
        rolle: "Vinger",
      },
      {
        id: "a15-direkte",
        tekst: "En stor andel av innleggs-scoringene er «direkte»: innlegger og målscorer er de eneste som er borti ballen",
        rolle: "Spiss",
      },
      { id: "a15-gjenvinning", tekst: "Forfatteren skiller også på mål etter innlegg som kommer etter gjenvinning i forkant" },
      {
        id: "a15-boks",
        tekst: "Innleggs-mål scores som oftest i soner nærmest mål og i stor grad innenfor 16-meteren",
        rolle: "Indreløper",
      },
      { id: "a15-rollefordeling", tekst: "Analysen viser store forskjeller mellom lag og spillere (både antall og effektivitet)" },
    ],
    ovelser: [
      { kode: "uefa-a15-01" },
      { kode: "uefa-a15-02" },
    ],
    coachingCues: [
      {
        kategori: "Innlegg",
        gjor: "Bruk sonekoding (A–F) som felles språk: hvor slår vi innlegg fra?",
        ikkeGjor: "Ikke snakk om «kvalitet» uten å beskrive sone og situasjon",
      },
      {
        kategori: "Scoring",
        gjor: "Skille på direkte scoring vs scoring med flere involverte før avslutning",
        ikkeGjor: "Ikke bland kategoriene når du evaluerer hva som fungerer",
      },
      { kategori: "Fase", gjor: "Skill på etablert angrep og overgang i analysen av innleggs-mål", ikkeGjor: "Ikke anta at alle innleggssituasjoner er like" },
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
      "Ferstad analyserer Rosenborgs målsjanser i Tippeligaen 2016 og diskuterer om «Rosenborg-identiteten» er tilbake. I hans datagrunnlag (16 kamper) registreres 147 målsjanser (9,19 pr kamp): 54 % i etablert angrep, 17 % på dødball og 29 % på kontring. 52 % av målsjansene kommer etter innlegg (77 av 147), med en tydelig høyreside-overvekt i innleggs-sjansene (64 %).",
    kpier: [
      { navn: "Målsjanser totalt", referanseverdi: "147 (9,19 pr kamp)", kilde: "Kap. 5.1" },
      { navn: "Målsjanser etablert", referanseverdi: "80/147 (54 %)", kilde: "Kap. 5.1" },
      { navn: "Målsjanser dødball", referanseverdi: "25/147 (17 %)", kilde: "Kap. 5.1" },
      { navn: "Målsjanser kontring", referanseverdi: "42/147 (29 %)", kilde: "Kap. 5.1" },
      { navn: "Mål totalt", referanseverdi: "65", kilde: "Tabell" },
      { navn: "Målsjanser etter innlegg", referanseverdi: "77/147 (52 %)", kilde: "Kap. 5.1" },
      { navn: "Innleggssjanser (høyre/venstre)", referanseverdi: "49/77 (64 %) / 28/77 (36 %)", kilde: "Kap. 5.1 / 6.2" },
      { navn: "Dødball-effektivitet", referanseverdi: "10 av 25 sjanser ender i scoring", kilde: "Kap. 7 (konklusjon)" },
    ],
    fokuspunkter: [
      { id: "a16-faser", tekst: "Faser i datagrunnlaget: etablert 54 % / dødball 17 % / kontring 29 %" },
      { id: "a16-innlegg", tekst: "Virkemidler: 52 % av målsjansene kommer etter innlegg (77/147)" },
      { id: "a16-hoyre", tekst: "Innleggssjanser: 64 % kommer fra høyresiden (49/77)" },
      { id: "a16-boks", tekst: "Ved innlegg: tydelig rollefordeling i boks (motsatt kant truer 1. stolpe, spiss ofte mot bakre/2. stolpe)" },
      { id: "a16-relasjon", tekst: "Kontinuitet og relasjoner på en side peker seg ut som et suksesskriterium (høyresiden)" },
    ],
    ovelser: [
      { kode: "uefa-a16-01" },
      { kode: "uefa-a16-02" },
    ],
    coachingCues: [
      { kategori: "Kant", gjor: "L-løp før innlegg", ikkeGjor: "Ikke slå blindt" },
      { kategori: "Spiss", gjor: "Avklar rolle ved innlegg (1. stolpe / bakre stolpe)", ikkeGjor: "Ikke bli stående flatt" },
      { kategori: "Kontring", gjor: "Utnytt ubalanse: framover med tempo når muligheten er der", ikkeGjor: "Ikke spill deg inn i ny balanse uten grunn" },
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
      "Fem tidligere RBK-spisser og fem trenere beskriver hva som kjennetegner midtspissen i klubbens 4-3-3. I trenerintervjuene løftes særlig klokskap/spillforståelse, evne til å være oppspillspunkt feilvendt, boks-/luftstyrke, målskårer-egenskaper og fysisk styrke. Defensivt beskrives rollen som å stenge sentralt og lede motstanderens spill over til en side.",
    kpier: [
      { navn: "Kjernekrav", referanseverdi: "Klokskap/spillforståelse (løftet av trenerne)", kilde: "Trenerintervju" },
      { navn: "Oppspillspunkt", referanseverdi: "Kunne brukes feilvendt og binde sammen laget", kilde: "Trenerintervju" },
      { navn: "Boks/luft", referanseverdi: "God i lufta og i boksen", kilde: "Trenerintervju" },
      { navn: "Defensivt", referanseverdi: "Stenge sentralt og lede spillet mot én side", kilde: "Trenerintervju" },
    ],
    fokuspunkter: [
      { id: "a17-oppspill", tekst: "Spiss: avklar møte/strekke som oppspillspunkt i etablerte situasjoner", rolle: "Spiss" },
      { id: "a17-relasjon", tekst: "Spiss: bygg relasjoner med IL/kant (veggspill, dyp/tilbake og timing)", rolle: "Spiss" },
      { id: "a17-innlegg", tekst: "Spiss: avklar rolle og bevegelse i boks ved innlegg", rolle: "Spiss" },
      { id: "a17-press", tekst: "Førsteforsvarer: steng sentralt og led spillet mot én side", rolle: "Spiss" },
    ],
    ovelser: [
      { kode: "uefa-a17-01" },
      { kode: "uefa-a17-02" },
    ],
    coachingCues: [
      { kategori: "Boks", gjor: "Avklar rolle før innlegg", ikkeGjor: "Ikke bli stående statisk" },
      { kategori: "Press", gjor: "Steng sentralt, led til én side", ikkeGjor: "Ikke press uten retning" },
      { kategori: "Relasjoner", gjor: "Vær tydelig oppspillspunkt feilvendt", ikkeGjor: "Ikke jag bakrom uten plan" },
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
      "Tran sammenligner Rosenborg, Bayern, Barcelona og Varegg for å se hvordan de bryter ned lag i lav blokk. Fellesnevnerne er strukturerte spillvendinger, planlagte relasjoner og gjenvinningspress; ulikhetene ligger i hva som skjer etter vending (kant vs sentrum vs direkte).",
    kpier: [
      {
        navn: "Vending av spill (totalt)",
        referanseverdi: "RBK 114 (5 kamper), Bayern 228 (4), Barca 343 (5), Varegg 93 (5)",
        kilde: "Oppsummeringstabell",
      },
      {
        navn: "Vellykkede angrep",
        referanseverdi: "RBK 20/99, Bayern 30/163, Barca 37/204, Varegg 32/191",
        kilde: "Resultat",
      },
      {
        navn: "Innlegg (totalt)",
        referanseverdi: "RBK 24, Bayern 69, Barca 36, Varegg 37",
        kilde: "Oppsummeringstabell",
      },
      {
        navn: "Gjenvinning (antall)",
        referanseverdi: "RBK 25, Bayern 58, Barca 86, Varegg 41",
        kilde: "Oppsummeringstabell",
      },
    ],
    fokuspunkter: [
      { id: "a18-vending", tekst: "Spillvending som virkemiddel: flytt blokk for å skape bedre vilkår, ikke vending for vendingens skyld" },
      { id: "a18-kvalitet-vending", tekst: "Kvalitet i vendinger: timing, presisjon og neste aksjon er viktigere enn antall" },
      { id: "a18-frigjor-ballforer", tekst: "Vending lavt kan frigjøre ballfører (midtstopper/6’er) til å ta med ballen fram og dra på seg press" },
      { id: "a18-gullsoner", tekst: "Angrip rommet mellom back og stopper etter vending (timing på kant/back)", rolle: "Vinger" },
      { id: "a18-1v1", tekst: "Pådrag 1v1 på kant: utfordre for å skape brudd eller spille til bedre posisjon" },
      { id: "a18-overlapp-innlegg", tekst: "Overlapp/underlapp som verktøy: skap 2v1 på kant og få fram innlegg/cut-back" },
      { id: "a18-sentrum", tekst: "Bruk siden for å rettvende i mellomrom når motstander har komprimert hardt", rolle: "Sentral midtbane" },
      { id: "a18-risiko", tekst: "Risikostyring: ikke tving gjennombrudd langs bakken når gevinsten ikke forsvarer risikoen" },
      { id: "a18-gjenvinning", tekst: "Kontring på kontring: etter brudd/avskjæring – trykk på mens motstander reorganiserer" },
      { id: "a18-varegg", tekst: "Lavere nivå: gjennombrudd i mellomrom kan gi stor gevinst når avstander/forflytninger er svakere" },
    ],
    ovelser: [
      { kode: "uefa-a18-01" },
      { kode: "uefa-a18-02" },
    ],
    coachingCues: [
      { kategori: "Spillvending", gjor: "Vend både lavt og høyt", ikkeGjor: "Ikke tving gjennom uten ubalanse" },
      { kategori: "Relasjoner", gjor: "Back-IL-kant over/underlap", ikkeGjor: "Ikke isoler én mot fire" },
      { kategori: "Gjenvinning", gjor: "Ha balanse i angrep – vær klar for gjenvinningspress", ikkeGjor: "Ikke gi opp ballen lett" },
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
    tittel: "Angrep mot etablert forsvar",
    forfatter: "Ståle Andersen",
    tema: "KFUM/VIF – spill mot lav blokk",
    roller: ["Sentral midtbane", "Indreløper", "Vinger", "Spiss"],
    sammendrag:
      "Andersen beskriver hvordan KFUM (2007–2010) og Vålerenga (2010) lykkes med ballbesittende spill mot lav blokk gjennom tålmodig struktur, sterke 1.A/1.F-spillere og relasjoner. Kontinuitet i spillerstall og trening på nærrom gjør at laget behersker de fleste faser.",
    kpier: [
      {
        navn: "KFUM mål (etablert/delvis)",
        referanseverdi: "58 mål (2009–2010) i spill mot etablert + delvis etablert",
        kilde: "Resultatdel",
      },
      {
        navn: "KFUM: trekk før avslutning (for disse 58)",
        referanseverdi: "0:5, 1:8, 2:5, 3:11, 4:13, 5:9, 6+:7",
        kilde: "Resultatdel",
      },
      {
        navn: "VIF målfordeling (2010)",
        referanseverdi: "47% etablert/delvis, 28% overgang, 25% dødball",
        kilde: "Resultatdel",
      },
      {
        navn: "VIF volum (2010)",
        referanseverdi: "70 mål, 195 sjanser (inkl. mål)",
        kilde: "Resultatdel",
      },
    ],
    fokuspunkter: [
      { id: "a19-tamodighet", tekst: "Tålmodig bearbeiding – la ballen gjøre jobben" },
      { id: "a19-relasjon", tekst: "Back-IL-kant: triangelspill før gjennombrudd" },
      { id: "a19-3kvaliteter", tekst: "3 kvaliteter som må prioriteres: sterk 1.angriper, sterk 1.forsvarer, pasningsspiller" },
      { id: "a19-naerrom", tekst: "Ferdigheter i nærrom: tåle press på liten flate og beholde gjennombruddskraft" },
      { id: "a19-struktur-smalag", tekst: "Struktur i smålagsspill: bruk formasjon/roller for å bygge relasjoner" },
      { id: "a19-powerplay", tekst: "Spill mot lav blokk (powerplay): rolletrening + relasjoner for å «rive» i motstander" },
      { id: "a19-vending", tekst: "Hurtige spillvendinger kan brukes for å finne overtall og skape ubalanse" },
      { id: "a19-tredjemann", tekst: "Se etter 3.-manns bevegelse i bakrom når motstander jager og mister struktur" },
      { id: "a19-gjenvinning", tekst: "Kontring på kontring – press raskt framover ved balltap" },
      { id: "a19-definisjon", tekst: "Vær enige om definisjoner i egen analyse (etablert/delvis/overgang/gjenvinning)" },
    ],
    ovelser: [
      { kode: "uefa-a19-01" },
      { kode: "uefa-a19-02" },
    ],
    coachingCues: [
      { kategori: "Individuell", gjor: "Sterk 1A/1F", ikkeGjor: "Ikke gi opp duellen" },
      { kategori: "Relasjon", gjor: "Triangler", ikkeGjor: "Ikke spill blindt fremover" },
      { kategori: "Struktur", gjor: "Balanse og sikring bak ball", ikkeGjor: "Ikke bli for direkte" },
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
    tittel: "Touch og scoring",
    forfatter: "Stian Lund",
    tema: "Siste tre involveringer før sjanse/mål",
    roller: ["Spiss", "Vinger", "Indreløper"],
    sammendrag:
      "Analyse av Strømsgodsets mål/sjanser i Tippeligaen 2010 (uten dødballer i touch-registreringen) viser at avslutninger ofte kommer på første/andre berøring: 57 % av målene ble scoret på 1 touch og 14 % på 2 touch (totalt 71 % på 1–2 touch). I fasen før avslutning var målgivende pasning 28 % på 1 touch (28 % på 2 touch), og tredjesistepasset 25 % på 1 touch (14 % på 2 touch). Spillerutvikling må derfor eksponere ungdommer for tempo, orientering og presisjon uten å ofre kvalitet.",
    kpier: [
      { navn: "Avslutning 1 touch (mål, eks dødball)", referanseverdi: "57 % (20 av 35)", kilde: "SIF 2010" },
      { navn: "Avslutning 1–2 touch (mål, eks dødball)", referanseverdi: "71 %", kilde: "SIF 2010" },
      { navn: "Målgivende 1 touch (til mål)", referanseverdi: "28 %", kilde: "SIF 2010" },
      { navn: "Tredjesistepass 1–2 touch (før mål)", referanseverdi: "39 % (25 % + 14 %)", kilde: "SIF 2010" },
    ],
    fokuspunkter: [
      { id: "a20-orientering", tekst: "Orientering før ball – planlegg ett-touch" },
      { id: "a20-stotte", tekst: "Skap støttevinkler for raske vegger" },
      { id: "a20-presisjon", tekst: "Tempo uten å miste teknisk kvalitet" },
    ],
    ovelser: [
      { kode: "uefa-a20-01" },
      { kode: "uefa-a20-02" },
    ],
    coachingCues: [
      { kategori: "Orientering", gjor: "Blikk først, ball etterpå", ikkeGjor: "Ikke være overrasket" },
      { kategori: "Tempo", gjor: "Spilleren kommer – ballen går", ikkeGjor: "Ikke drible unødvendig" },
      { kategori: "Teknikk", gjor: "Tempo + presisjon", ikkeGjor: "Ikke kompromitter kvaliteten" },
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
    tittel: "Den notoriske målscoreren",
    forfatter: "Totto Dahlum",
    tema: "Psykologiske/motoriske kjennetegn",
    roller: ["Spiss"],
    sammendrag:
      "Dahlum kombinerer egne erfaringer som toppscorer med intervjuer av Rushfeldt, Brattbakk og Belsvik. Fellesnevnerne er indre stemme/drive, perfeksjonisme, konkurranseinstinkt, selvstendighet og evne til å repetere under press.",
    kpier: [
      { navn: "Egenaktivitet", referanseverdi: "Selvstyrt trening 3+ økter ukentlig", kilde: "Intervjuer" },
      { navn: "Visualiseringsrutine", referanseverdi: "Scenario før kamp", kilde: "Teori" },
      { navn: "Repetisjon", referanseverdi: "10/10 per avslutningstype", kilde: "Prolog" },
    ],
    fokuspunkter: [
      { id: "a21-visualisering", tekst: "Visualiser situasjonen før kamp – se deg selv treffe", rolle: "Spiss" },
      { id: "a21-gjentakelse", tekst: "Gjentakelsen er det perfektes mor – repeter til det sitter" },
      { id: "a21-press", tekst: "Omfavn presset – best når det gjelder", rolle: "Spiss" },
    ],
    ovelser: [
      { kode: "uefa-a21-01" },
      { kode: "uefa-a21-02" },
    ],
    coachingCues: [
      { kategori: "Mental", gjor: "Hør på indre stemme", ikkeGjor: "Ikke søk snarveier" },
      { kategori: "Repetisjon", gjor: "Gjør jobben til 10/10", ikkeGjor: "Ikke stopp på 7" },
      { kategori: "Press", gjor: "Sett deg i press-scenario", ikkeGjor: "Ikke unngå vanskelige situasjoner" },
    ],
    kildefil: "A21-notorisk-maalscorer-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A22: Sidebacken høyt i banen (Dag Riisnæs)
  // Kilde: docs/uefa/A22-dag-riisnas-sideback.txt
  // ──────────────────────────────────────────
  {
    id: "a22-sidebacken",
    kode: "A22",
    tittel: "Sidebacken høyt i banen",
    forfatter: "Dag Riisnæs",
    tema: "Back som gjennombruddsvåpen mot etablert forsvar",
    roller: ["Sideback", "Back", "Sentral midtbane", "Indreløper", "Vinger"],
    sammendrag:
      "Riisnæs analyserte alle 285 scoringene i Champions League 2005/06 og fant at 46 av dem kom etter at en sideback ble frigjort høyt i banen. Hele 44 % av målene mot etablert/delvis etablert forsvar involverte back i fase 2. Ved å studere Milan og Werder Bremen viser han hvordan diamantstruktur, hurtige spillvendinger og 3+2-balanse gjør backen til breddeholder og gjennombruddstrussel.",
    kpier: [
      { navn: "Back-mål totalt", referanseverdi: "46 av 285", kilde: "Riisnæs, kap. 5.3" },
      { navn: "Back-mål mot etablert", referanseverdi: "44 % (46 av 105)", kilde: "Riisnæs, kap. 5.3" },
      { navn: "Milan sjanser vs Barca", referanseverdi: "4 av 9 via back", kilde: "Riisnæs, kap. 5.5" },
      { navn: "Restforsvar", referanseverdi: "3+2 bak når back går", kilde: "Riisnæs, kap. 5.7" },
    ],
    fokuspunkter: [
      { id: "a22-vending", tekst: "Vend før gjennombrudd – frigjør sideback" },
      { id: "a22-bredde", tekst: "Backen er breddeholder, midtbane konsentrerer" },
      { id: "a22-3pluss2", tekst: "3+2-rest sikrer mot overgang", rolle: "Sentral midtbane" },
      { id: "a22-lop", tekst: "Sideback: sett fart inn i korridor før ballen kommer", rolle: "Sideback" },
      { id: "a22-balanse", tekst: "Hold igjen motsatt IL/back for å dekke rom" },
    ],
    ovelser: [],
    coachingCues: [
      { kategori: "Vending", gjor: "Vend raskt og finn back i rom", ikkeGjor: "Ikke bli stående i frispilling" },
      { kategori: "Sideback", gjor: "Forhåndsposisjoner og sett fart", ikkeGjor: "Ikke vent på å få ball i fot" },
      { kategori: "Midtbane", gjor: "Dra inn og frigjør korridor", ikkeGjor: "Ikke lås bredden" },
      { kategori: "Balanse", gjor: "3+2 bak ball før vi fyller boks", ikkeGjor: "Ikke send alle i angrep" },
    ],
    kildefil: "A22-dag-riisnas-sideback.txt",
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
  // A24: Chelsea 4-2-3-1 etablert forsvar (Ole Martin Nesselquist)
  // Kilde: docs/uefa/A24-ole-martin-nesselquist-etablert-forsvar.txt
  // ──────────────────────────────────────────
  {
    id: "a24-chelsea-forsvar",
    kode: "A24",
    tittel: "Organiser 4-2-3-1 i etablert forsvar",
    forfatter: "Ole Martin Nesselquist",
    tema: "Chelsea FC 2015/16 – prinsipper, roller og justeringer",
    roller: ["Keeper", "Back", "Stopper", "Sentral midtbane", "Vinger", "Spiss"],
    sammendrag:
      "Nesselquist gjør en kvalitativ kampanalyse av Chelsea 2015/16 for å beskrive hvordan et 4-2-3-1-lag bør organiseres i etablert forsvar. Oppgaven sammenligner Mourinho-årenes kompakte blokk med sesongen der Chelsea kollapset, og peker på tre hovedårsaker: svakere press på ballfører, større rom mellom ledd og feil i innlegg/boksforsvar. Intervjuer med Haakon Lunov og Geir Jordet kobler taktiske valg til mental robusthet. Funnene gir konkrete retningslinjer for høyt press, lav blokk, romprioritering og individuell rolleforståelse.",
    kpier: [
      { navn: "Mål imot (2014/15 vs 2015/16)", referanseverdi: "<1 vs >1", kilde: "Innledning" },
      { navn: "Press-strip", referanseverdi: "Høyt press første 10 min", kilde: "Kap. høyt press" },
      { navn: "Kompakthet", referanseverdi: "4-4-2 uten ball – 10–12 m fra spiss til stopper", kilde: "Romprioritering" },
    ],
    fokuspunkter: [
      { id: "a24-hoypress", tekst: "4-2-3-1 blir 4-4-2 i høyt press – front tvinger oppspill i korridor" },
      { id: "a24-lavblokk", tekst: "Lav blokk: alle under ball, prioriter sentrumsrom" },
      { id: "a24-innlegg", tekst: "Boksforsvar: stopper i sone, back + ving sikrer", rolle: "Back" },
      { id: "a24-rollekrav", tekst: "6-ere (Matic/Fabregas) balanserer når kant/back støter" },
      { id: "a24-mental", tekst: "Unngå 'avoidance mentality' – bruk approach-fokus i forsvar" },
    ],
    ovelser: [],
    coachingCues: [
      { kategori: "Press", gjor: "4-2-3-1 → 4-4-2, Costa + 10'er styrer", ikkeGjor: "Ikke la front bli flat" },
      { kategori: "Blokk", gjor: "Hold 10–12 m fra spiss til stopper", ikkeGjor: "Ikke åpne lommer" },
      { kategori: "Innlegg", gjor: "Back møter, stopper i sone, indreløper plukker andreball", ikkeGjor: "Ikke ren mannsmark i boks" },
      { kategori: "Mental", gjor: "Approach – se forsvar som mulighet", ikkeGjor: "Ikke snakk kun om å unngå feil" },
    ],
    kildefil: "A24-ole-martin-nesselquist-etablert-forsvar.txt",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A25: FFK baklengs (Even Juliussen)
  // Kilde: docs/uefa/A25-even-juliussen-ffk-forsvar.txt
  // ──────────────────────────────────────────
  {
    id: "a25-ffk-baklengs",
    kode: "A25",
    tittel: "Analyser baklengs – FFK 2012",
    forfatter: "Even Juliussen",
    tema: "Forsvarssvakheter og balltap i Fredrikstad FK",
    roller: ["Back", "Stopper", "Sentral midtbane", "Vinger"],
    sammendrag:
      "Juliussen kartla alle 59 baklengsmålene til Fredrikstad FK i Tippeligaen 2012. 44 % kom i etablert forsvar, 37 % på dødball og 19 % på kontring. Hjemme/borte-tall var like dårlige, og de fleste målene kom i sluttfasene. Analyse av balltap viser overrisiko på høyresiden, lite dybde i backledd og dårlig 3+2-balanse. Oppgaven gir konkrete tiltak: strammere sone, push-ups i backledd, bedre hjemmetaktikk og tydeligere rollekrav i dødball/bredsituasjoner.",
    kpier: [
      { navn: "Totale baklengs", referanseverdi: "59 mål", kilde: "Sammendrag" },
      { navn: "Fordeling", referanseverdi: "44 % etablert / 37 % dødball / 19 % overgang", kilde: "Sammendrag" },
      { navn: "Balltap høyreside", referanseverdi: "Flest tap på høyre kant/back", kilde: "Balltap" },
      { navn: "Mål i sluttfase", referanseverdi: "Flest siste 15 min", kilde: "Når baklengs" },
    ],
    fokuspunkter: [
      { id: "a25-sone", tekst: "Stram sone og dybde i backledd – unngå eget store mellomrom" },
      { id: "a25-balltap", tekst: "Reduser risiko på høyresiden – sikring nær ball" },
      { id: "a25-dodball", tekst: "Tydelig ansvar dødball – stopper i sone, 3+2 rest" },
      { id: "a25-sluttfase", tekst: "Kampplan for siste 15 min (bytte, frispill, mentalitet)" },
    ],
    ovelser: [],
    coachingCues: [
      { kategori: "Backledd", gjor: "Push opp etter klareringer", ikkeGjor: "Ikke bli hengende dypt" },
      { kategori: "Balltap", gjor: "Sikre bak høy risk", ikkeGjor: "Ikke tape ball ute av balanse" },
      { kategori: "Dødball", gjor: "Avtalt sone/mann + restforsvar", ikkeGjor: "Ikke la alle stå i boks" },
      { kategori: "Sluttfase", gjor: "Mental plan – approach", ikkeGjor: "Ikke panikk-sikre" },
    ],
    kildefil: "A25-even-juliussen-ffk-forsvar.txt",
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
    tema: "TUIL 2010 – farlige soner og innlegg bakover",
    roller: ["Back", "Stopper", "Sentral midtbane", "Vinger"],
    sammendrag:
      "Helstrup analyserte alle innlegg i TUILs siste åtte kamper i Adeccoligaen 2010. 125 innlegg ble logget; 88,65 % oppstod i etablert/delvis etablert spill, 70 % av avslutningene kom etter pause og 88,8 % av sjansene kom etter innlegg fra 'farlig sone'. Motstanderne sendte i snitt 3 spillere i farlig sone, TUIL forsvarte med 4,4 – men var posisjonelt i ubalanse ved 59 % av situasjonene. Én av to baklengs kom fra midtre sone. Oppgaven peker på strukturelle (push-up, tette mellomrom), relasjonelle (sonespiller vs markering) og kampdimensjonelle justeringer.",
    kpier: [
      { navn: "Avklaringer", referanseverdi: "53,6 % (67/125)", kilde: "Resultat av innlegg" },
      { navn: "Sjanser", referanseverdi: "9 av 125 (7,2 %) – 8 fra farlig sone", kilde: "Sjanser" },
      { navn: "Posisjonell balanse", referanseverdi: "Ubalanse i 59,2 %", kilde: "Posisjonell balanse" },
      { navn: "Farlig sone sjanser", referanseverdi: "88,8 %", kilde: "Innlegg fra farlig sone" },
      { navn: "Bakre sone avslutning", referanseverdi: "46 %", kilde: "Resultat pr sone" },
    ],
    fokuspunkter: [
      { id: "a26-farligsone", tekst: "Prioriter farlig sone – stopp innlegg der" },
      { id: "a26-pushup", tekst: "Backledd: push opp etter klarering, tette mellomrom" },
      { id: "a26-posisjon", tekst: "Unngå posisjonell ubalanse ved 60 % av innleggene" },
      { id: "a26-innleggside", tekst: "Kjenn motstanders side (høyre vs venstre) – juster kant/back" },
      { id: "a26-sluttkamp", tekst: "Plan for 2. omgang – fleste avslutninger etter pause" },
    ],
    ovelser: [],
    coachingCues: [
      { kategori: "Sone", gjor: "Sonestopper følger ball OG mann", ikkeGjor: "Ikke la motstander passere mellom soner" },
      { kategori: "Back", gjor: "Back på ballside presser – motsatt back tar boks", ikkeGjor: "Ikke la liten back stå alene" },
      { kategori: "Midtbane", gjor: "Vinger inn i returrom/farlig sone", ikkeGjor: "Ikke bli stående og se" },
      { kategori: "Balanse", gjor: "Snakk push-up, posisjonering", ikkeGjor: "Ikke aksepter 59 % ubalanse" },
    ],
    kildefil: "A26-gaute-helstrup-innlegg-forsvar.txt",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },
  {
    id: "a09-overgangsspill",
    kode: "A09",
    tittel: "Overgangsspill",
    forfatter: "Bjarte Lunde Aarsheim",
    tema: "Overgangssikring, presshøyde og førstevalg etter brudd",
    roller: ["Spiss", "Vinger", "Back", "Sentral midtbane", "Indreløper", "Stopper"],
    sammendrag:
      "Lunde Aarsheim analyserte 97 gunstige brudd og fant bare 22 vellykkede overganger. Oppgaven beskriver valg etter brudd i prioritert rekkefølge (direkte i bakrom, mellomrom, eller vekk fra press), sammen med 3+2-balansering og signalstyrt presshøyde (høy 4-4-2 diamant vs. lav 4-4-2 sone). I analysen skilles det også mellom vellykket overgang, mislykket overgang og situasjoner der laget velger å ikke ta overgangen. Klar rollefordeling for spiss/kant/sentral midt gjør det lettere å treffe første pasning og å stå igjen med restforsvar dersom laget mister ballen igjen. Som hovedregel ønsker vi å opprette balanse med 3 forsvarsspillere og 2 midtbanespillere.",
    kpier: [
      { navn: "Gunstige brudd", referanseverdi: "97 (43 høye / 54 lave)", kilde: "Analyse" },
      { navn: "Vellykkede overganger", referanseverdi: "22 (17 sjanser, 6 mål, 2 straffer)", kilde: "Analyse" },
      { navn: "Valg etter brudd", referanseverdi: "Bakrom 29 / Mellomrom 43 / Vekk fra press 27", kilde: "Analyse" },
      { navn: "Brudd pr kamp", referanseverdi: "Randaberg 33 / Viking2 27 / Madla 20 / VBK 17", kilde: "Analyseskjema" },
    ],
    fokuspunkter: [
      { id: "a09-press", tekst: "1.forsvarer signaliserer press – resten må stå etter", rolle: "Stopper" },
      { id: "a09-3pluss2", tekst: "3+2-balansen: tre bak + to sikrere – hvem som helst kan fylle rollen", rolle: "Sentral midtbane" },
      { id: "a09-pyramide", tekst: "Valg etter brudd i prioritert rekkefølge: direkte i bakrom, mellomrom, eller vekk fra press" },
      { id: "a09-spiss", tekst: "Spiss starter bakromsløp umiddelbart ved brudd", rolle: "Spiss" },
      { id: "a09-indreloper", tekst: "Indreløper: motsatt bevegelse for å åpne rom", rolle: "Indreløper" },
    ],
    ovelser: [
      { kode: "uefa-a09-01" },
      { kode: "uefa-a09-02" },
    ],
    coachingCues: [
      { kategori: "Overgang", gjor: "Frys – se – slå første pasning med intensjon", ikkeGjor: "Ikke slå blindt i første bevegelse" },
      { kategori: "Press", gjor: "Aggressiv 1.forsvarer, smart sikring", ikkeGjor: "Ikke press stykkevis" },
      { kategori: "Valg", gjor: "Bakrom stengt? Finn rettvendt spiller i mellomrom", ikkeGjor: "Ikke tving en pasning som ikke er der" },
    ],
    kildefil: "A09-bjarte-lunde-aarsheim-overgang-analyse.md",
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2014-oppgave-bjarte-lunde-aarsheim.pdf",
  },
];
