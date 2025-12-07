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
      { navn: "Tempo-switch (<6 sek)", referanseverdi: "14 pr kamp", kilde: "Kap. 6.6" },
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
      "Selmer analyserte 342 Tippeliga- og 277 Champions League-scoringer og fant store forskjeller i avslutningskvalitet: CL-spillere scorer 70 % lavt i hjørnet (vs 41,5 % i TL), 86 % av målene er kontrollert, og de fleste avslutninger tas fra sone 1c på få touch. Norske spillere må forberede seg bedre (orientering, valg, teknikk) og trene på scenebaserte avslutninger hvor tid og rom defineres.",
    kpier: [
      { navn: "Lavt i hjørnet", referanseverdi: "70 % (CL) / 41,5 % (TL)", kilde: "Tabell 1" },
      { navn: "Kontrollerte scoringer", referanseverdi: "86 % (CL) / 49 % (TL)", kilde: "Kap. 6.3" },
      { navn: "Curl/plassering", referanseverdi: "73 % (CL) / 30 % (TL)", kilde: "Kap. 6.4" },
      { navn: "Scoring sone 1c", referanseverdi: "59,5 % (CL) / 34,5 % (TL)", kilde: "Kap. 6.5" },
    ],
    fokuspunkter: [
      { id: "a03-lavt", tekst: "Avslutt lavt i hjørnet – 0,5 m over bakken, 1 m fra stolpe", rolle: "Spiss" },
      { id: "a03-kontroll", tekst: "Ha kontroll i avslutningen – 1-2 touch, se keeper", rolle: "Sentral midtbane" },
      { id: "a03-sone1c", tekst: "Søk sone 1c: fyll boksen (spiss, kant, motsatt)" },
      { id: "a03-6sek", tekst: "Scoring innen 6 sek etter turnover" },
      { id: "a03-plassering", tekst: "Curl/plassering fremfor kraft", rolle: "Vinger" },
    ],
    ovelser: [
      { kode: "uefa-a03-01" },
      { kode: "uefa-a03-02" },
    ],
    coachingCues: [
      { kategori: "Plassering", gjor: "Plasser lavt og hardt", ikkeGjor: "Ikke fokuser på kraft uten kontroll" },
      { kategori: "Tempo", gjor: "Første touch mot mål", ikkeGjor: "Ikke stopp ballen" },
      { kategori: "Scoringssone", gjor: "Fyll sone 1c", ikkeGjor: "Ikke bli stående utenfor" },
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
      "Jacobsen analyserte 340 scoringer (Barcelona, Bayern, Manchester United, Strømsgodset, Nordstrand) og fant at toppklubbene avslutter på 4–8 sek med 1–3 touch per spiller. Tredjespilleren (spilleren før assist) må orientere i mellomrom, gjøre hurtige valg og sette tempoet. Norske lag bruker flere touch og mer tid; Strømsgodset ligger nærmest toppnivå. Oppgaven oversettes til KPI-er, øvelser og kampplanpunkter for å heve kvaliteten i siste tredjedel.",
    kpier: [
      { navn: "Tid fra tredjespiller til mål", referanseverdi: "4–8 sek (Barcelona/Bayern) / 6–12 sek (Strømsgodset)", kilde: "Kap. 4.3" },
      { navn: "Touch per spiller", referanseverdi: "1–3 touch (78 % av scoringene)", kilde: "Kap. 4.4" },
      { navn: "Tredjespiller-posisjon", referanseverdi: "68 % mellomrom", kilde: "Videoanalyse" },
    ],
    fokuspunkter: [
      { id: "a02-touch", tekst: "Tredjespiller: maks 2 touch, orienter før mottak", rolle: "Sentral midtbane" },
      { id: "a02-tid", tekst: "Mål innen 6 sek fra tredjespiller touch (mål 3 per kamp)" },
      { id: "a02-assist", tekst: "Assister: les press, spill på 1-2 touch", rolle: "Vinger" },
      { id: "a02-malscorer", tekst: "Målscorer: ta første touch mot mål / 1-touch avslutning", rolle: "Spiss" },
      { id: "a02-orientering", tekst: "Orientering før og under kontakt – alle", rolle: "Indreløper" },
    ],
    ovelser: [
      { kode: "uefa-a02-01" },
      { kode: "uefa-a02-02" },
    ],
    coachingCues: [
      { kategori: "Orientering", gjor: "Se før du får ballen", ikkeGjor: "Ikke spill uten blikk" },
      { kategori: "Tempo", gjor: "1-2 touch = tempo", ikkeGjor: "Ikke tillat 5+ touch" },
      { kategori: "Mål", gjor: "Minne om 'Mål = 6 sek'", ikkeGjor: "Ikke la spillerne trekke ned tempo" },
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
    tema: "3-5-2 struktur, press og gjenvinning",
    roller: ["Stopper", "Vingback", "Sentral midtbane", "Indreløper", "Spiss"],
    sammendrag:
      "Case-studie av Juventus 2011–2013 (Conte) viser hvordan 3-5-2 skaper defensiv balanse og offensiv kontroll: tre stoppere + regista gir sentralt overtall, vingbacker leverer tidlige innlegg, og spissduoen jobber i motsatte løp. 20 % av målene kommer fra gjenvinning fordi laget alltid har spiller-overtall rundt ball. Ødegaard oversetter struktur og rollekrav til en norsk klubbkontekst.",
    kpier: [
      { navn: "Høy gjenvinning som gir skudd", referanseverdi: "3 per kamp", kilde: "Juventus analyse 2011/12" },
      { navn: "Tidlige innlegg fra vingback", referanseverdi: "6 per kamp", kilde: "Serie A rapport 2012" },
      { navn: "Regista linjebrytende pasninger", referanseverdi: "10+ per kamp", kilde: "Conte-staben" },
      { navn: "Strukturbytter 3-5-2 ↔ 4-3-3", referanseverdi: "1-2 per kamp", kilde: "Juventus taktiske noter" },
    ],
    fokuspunkter: [
      { id: "a01-press-signal", tekst: "Spiss styrer inn sentralt → indreløper støter, regista faller", rolle: "Spiss" },
      { id: "a01-vingback", tekst: "Vingback: først bredde, så lynraskt returløp ved balltap", rolle: "Vingback" },
      { id: "a01-regista", tekst: "Regista: 10+ linjebrytende pasninger og 5 defensive avskjæringer", rolle: "Sentral midtbane" },
      { id: "a01-spissduo", tekst: "Spissduo: motsatte løp – en bakrom, en i fot", rolle: "Spiss" },
      { id: "a01-flex", tekst: "Planlegg når vi går fra 3-5-2 til 4-3-3 (Conte-switch)" },
    ],
    ovelser: [
      { kode: "uefa-a01-01" },
      { kode: "uefa-a01-02" },
    ],
    coachingCues: [
      { kategori: "Press", gjor: "Spiss signaliserer, resten følger", ikkeGjor: "Ikke la én gå alene" },
      { kategori: "Vingback", gjor: "Ros returløp og gjenvinning", ikkeGjor: "Overse manglende restforsvar" },
      { kategori: "Regista", gjor: "Løft blikket, slå tredje mann", ikkeGjor: "Hold ballen for lenge" },
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
    roller: ["Stopper", "Back"],
    sammendrag:
      "Basma beskriver sin vei fra knøtt til RBK og destillerer syv suksesskriterier: talentgrunnlag, vilje til å ta konsekvenser, treningsvillighet, klubber/trenere som tror på deg, trygt utviklingsmiljø, egne valg og fokus på livet etter fotballen. Oppgaven gir en normativ modell for norsk spillerutvikling.",
    kpier: [
      { navn: "Treningstimer årlig (10–16 år)", referanseverdi: "400–600 timer", kilde: "Kap. 1.2–1.3" },
      { navn: "Klubb/trener som tror", referanseverdi: "≥1 per steg", kilde: "Kap. 2.4" },
      { navn: "Etter-fotball-plan", referanseverdi: "På plass innen steg 5", kilde: "Kap. 2.7" },
    ],
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
      "Iversen analyserer Euro 2012 for å identifisere rollespesifikke ferdighetskrav for sentrale midtbanespillere. Data viser at pasningssikkerhet er det mest kritiske kravet (85 % treffprosent vs. 68 % for andre roller), spesielt freoverrettede pasninger. Defensivt er evnen til å skape balanse viktigere enn rene ballvinneregenskaper. Rollen er avgjørende for å hindre kontringer og var direkte involvert i 29 % av målene i mesterskapet.",
    kpier: [
      { navn: "Pasningspresisjon (total)", referanseverdi: "85 %", kilde: "Analyse" },
      { navn: "Pasningspresisjon (fremover)", referanseverdi: "77,3 %", kilde: "Analyse" },
      { navn: "Andel pasninger fremover", referanseverdi: "54,2 %", kilde: "Analyse" },
      { navn: "Skapte ubalansesituasjoner", referanseverdi: "3,76 pr. kamp", kilde: "Analyse" },
      { navn: "Direkte involvert i scoringer", referanseverdi: "29 %", kilde: "Analyse" }
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
    oppgaveUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-bjarte-lunde-aarsheim.pdf",
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
      "Rushfeldt kombinerer 20 års erfaring som toppspiss med videodata fra egne mål og scoringer fra Barcelona, Real Madrid, Man City/United. Han destillerer 14 punkter som kjennetegner gode målscorere: posisjonering, orientering, avslutningsteknikk, mentalitet og gjentagende trening. Målscoring er trenbart; toppavsluttere har repeterbare rutiner.",
    kpier: [
      { navn: "Touch per avslutning", referanseverdi: "1–2 touch dominerer", kilde: "Foredrag" },
      { navn: "Scoringer fra sone 1", referanseverdi: "Majoritet", kilde: "Statistikk" },
      { navn: "Returmål", referanseverdi: "1 per kamp", kilde: "Foredrag" },
      { navn: "Tredjespiller-bevegelser", referanseverdi: "8 per kamp", kilde: "Foredrag" },
    ],
    fokuspunkter: [
      { id: "a07-orientering", tekst: "Orientering før mottak", rolle: "Spiss" },
      { id: "a07-mental", tekst: "Tåle å mislykkes – mental robusthet", rolle: "Spiss" },
      { id: "a07-forste", tekst: "Første touch inn i avslutning", rolle: "Spiss" },
      { id: "a07-varier", tekst: "Varier bevegelse (bakrom, forrige stolpe, motsatt)", rolle: "Spiss" },
      { id: "a07-etterarbeid", tekst: "Etterarbeid – jakt returer", rolle: "Spiss" },
    ],
    ovelser: [
      { kode: "uefa-a07-01" },
      { kode: "uefa-a07-02" },
    ],
    coachingCues: [
      { kategori: "Orientering", gjor: "Se før du får den", ikkeGjor: "Stå passivt og vent" },
      { kategori: "Avslutning", gjor: "Første touch inn – skyt!", ikkeGjor: "Ta for mange touch" },
      { kategori: "Mental", gjor: "Miss? Finn ballen igjen", ikkeGjor: "Gi opp etter bom" },
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
      "Holme analyserte åtte topp-playmakere (Özil, Messi, Xavi, Iniesta, Mata, Fabregas, Hamsik, Silva) i CL 2012/13 og splittet hver assist i tre faser: komme på ball, gjøre muligheten reell og avgjørende pasning. Funnene viser at playmakeren mottar 80 % av ballene i mellomrom, bruker 1–2 touch på mindre enn 2 sekunder i fase 2 og leverer avgjørende pasninger fra halvspor mot blindside. Dette omsettes til konkrete KPI-er og treningsprinsipper for norske playmakere.",
    kpier: [
      { navn: "Touch (fase 2)", referanseverdi: "1–2 touch", kilde: "Kap. 5.4.2" },
      { navn: "Tid på ball (fase 2)", referanseverdi: "< 2 sek", kilde: "Kap. 5.4.1" },
      { navn: "Mottak i mellomrom", referanseverdi: "80 %", kilde: "Kap. 5.3" },
      { navn: "Posisjon for assist", referanseverdi: "Halvspor/mellomrom", kilde: "Kap. 5.5" },
    ],
    fokuspunkter: [
      { id: "a08-fase1", tekst: "Fase 1: bevegelse i mellomrom, åpen kropp" },
      { id: "a08-fase2", tekst: "Fase 2: 1–2 touch under press – se før du får ball" },
      { id: "a08-fase3", tekst: "Fase 3: halvspor → blindside, presis avgjørende pasning" },
      { id: "a08-roller", tekst: "Spiss/kant må koordinere løp med playmaker" },
    ],
    ovelser: [
      { kode: "uefa-a08-01" },
      { kode: "uefa-a08-02" },
    ],
    coachingCues: [
      { kategori: "Orientering", gjor: "Se før du får den", ikkeGjor: "Ikke motta uten plan" },
      { kategori: "Touch", gjor: "Åpen kropp – to touch", ikkeGjor: "Ikke stå på hælene" },
      { kategori: "Pasning", gjor: "Slå blindside når løpet går", ikkeGjor: "Ikke bli sidelengs" },
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
      "Pereira bruker VM-2014-data til å bygge en constraints-basert treningsmatrise for vinger. Tallene viser at toppvinger utfører assist, innlegg og avslutninger under 1–3 meters press, med 1–4 sekunder og 1–3 touch. I stedet for detaljinstruksjon anbefales non-lineær pedagogikk der baner og regler styrer mellomromsinngang, tidlige innlegg og lavt plasserte skudd slik at læringen skjer implicit, tett på Rosenborgs spillestil.",
    kpier: [
      { navn: "Presser ved assist", referanseverdi: "1–3 m (75 %)", kilde: "Kap. 5.1" },
      { navn: "Tid før assist", referanseverdi: "1–4 sek (77,7 %)", kilde: "Kap. 5.1" },
      { navn: "Touch før assist", referanseverdi: "1–3 touch (60,7 %)", kilde: "Kap. 5.1" },
      { navn: "Område avgjørende pasning", referanseverdi: "Siste tredel (91 %)", kilde: "Kap. 5.1" },
      { navn: "Presser ved innlegg", referanseverdi: "1–3 m (67 %)", kilde: "Kap. 5.2" },
      { navn: "Touch før innlegg", referanseverdi: "≤4 touch (76 %)", kilde: "Kap. 5.2" },
      { navn: "Hvem scorer etter innlegg", referanseverdi: "Spiss 56 % / motsatt ving 31 %", kilde: "Kap. 5.2" },
      { navn: "Presser ved avslutning", referanseverdi: "1–2 m (84 %)", kilde: "Kap. 5.3" },
    ],
    fokuspunkter: [
      { id: "uefa-a10-fokus-orientering", tekst: "Vinger: orienter før mottak – løsning klar før ball", rolle: "Vinger" },
      { id: "uefa-a10-fokus-1v1", tekst: "Test back tidlig – mål 8–10 1v1-forsøk, 50 % suksess", rolle: "Vinger" },
      { id: "uefa-a10-fokus-innlegg", tekst: "Minst 4 innlegg pr. omgang mellom keeper og backrekke", rolle: "Vinger" },
      { id: "uefa-a10-fokus-bakrom", tekst: "Tru bakrom før du tilbyr i fot – tim med 6-er som vender", rolle: "Vinger" },
      { id: "uefa-a10-fokus-gjenvinning", tekst: "Tilbakesporing 5–6 sek etter balltap – 10 forsøk / 3 suksess", rolle: "Vinger" },
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
      "Struktur for angrepsspill med fokus på prioriterte rom (bakrom, mellomrom, framrom), timing av løp, og hvordan ulike roller samspiller i offensive faser. Balanserer hurtighet med kontroll gjennom en 4-fase-modell.",
    kpier: [
      { navn: "Bakromsløp per omgang", referanseverdi: "5-8 forsøk" },
      { navn: "Skudd fra mellomrom", referanseverdi: "3-5 per kamp" },
      { navn: "Tredjeløp", referanseverdi: "2-3 per omgang" },
      { navn: "Ball-til-skudd tid", referanseverdi: "<10 sek" },
    ],
    fokuspunkter: [
      { id: "a12-f1", tekst: "Bakrom først – strekk forsvarslinja før du tilbyr deg til fot" },
      { id: "a12-f2", tekst: "Mellomrommet: Søk rommet mellom forsvar og midtbane sentralt", rolle: "Indreløper" },
      { id: "a12-f3", tekst: "Tredjeløp: Når to spillere kombinerer, løp i rom som tredjemann" },
      { id: "a12-f4", tekst: "Spiss faller, indreløper løper – timing er alt", rolle: "Spiss" },
      { id: "a12-f5", tekst: "Hold bredde med vingene – komprimér ikke sentralt", rolle: "Vinger" },
    ],
    ovelser: [
      { kode: "uefa-a12-01" },
      { kode: "uefa-a12-02" },
    ],
    coachingCues: [
      {
        kategori: "Timing",
        gjor: "Vent på igangsetter – løp når pasningen spilles",
        ikkeGjor: "Ikke løp for tidlig og bli stående offside",
      },
      {
        kategori: "Romforståelse",
        gjor: "Les motstanderens linje – finn hullet",
        ikkeGjor: "Ikke stå i samme linje som medspiller",
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
      "Orkla FK kombinerer skole- og klubbøkter for å utvikle sidebacker og indreløpere i Eggen-inspirert 4-3-3. Sidebacker skal frispille IL rettvendt, lede 1v1 defensivt og sikre 3+2-balansen, mens indreløpere må orientere før mottak, true to rom og fylle boksen med fire løp. All rolletrening skjer i spill-mot-spill med tydelig tilbakemelding mellom trener og spiller.",
    kpier: [
      { navn: "SB 1v1-stopp", referanseverdi: ">=70 % i sone 2", kilde: "Kap. 4.4" },
      { navn: "SB repeterende sprint", referanseverdi: "6-8 maks løp/omgang", kilde: "Kap. 4.4" },
      { navn: "IL rettvendte mottak", referanseverdi: "10+ pr kamp", kilde: "Kap. 4.3" },
      { navn: "IL innløp i boks", referanseverdi: "Minst 4 innløp pr angrep", kilde: "Kap. 4.3" },
      { navn: "3+2 før overbelastning", referanseverdi: "100 %", kilde: "Kap. 4.4" },
    ],
    fokuspunkter: [
      { id: "a13-sb-frispill", tekst: "Sideback: frispill IL rettvendt i rom 2 – vurder kant/SM", rolle: "Sideback" },
      { id: "a13-il-kombinasjon", tekst: "Indreløper: tru to rom hver gang du mottar", rolle: "Indreløper" },
      { id: "a13-3pluss2", tekst: "Overbelast kun når vi har 3 bak + 2 sikring" },
      { id: "a13-gjenvinning", tekst: "SB/IL: reaksjon <1 sek ved balltap – bestem deg", rolle: "Sideback" },
      { id: "a13-skolerolle", tekst: "Overfør skole-possesion til kampplan (puls + presisjon)" },
    ],
    ovelser: [
      { kode: "uefa-a13-01" },
      { kode: "uefa-a13-02" },
    ],
    coachingCues: [
      { kategori: "Sideback", gjor: "Frispill først – overlapp når vi har kontroll", ikkeGjor: "Ikke forlat linja uten sikring" },
      { kategori: "Indreløper", gjor: "To rom hver gang – tru sentralt/utvendig", ikkeGjor: "Ikke stå igjen i samme linje" },
      { kategori: "Balanse", gjor: "3+2 før vi fyller boks", ikkeGjor: "Ikke miste 3+2 ved sidebytte" },
    ],
    kildefil: "A13-sideback-indreloper-analyse-v2.md",
    oppgaveUrl: "https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/",
  },

  // ──────────────────────────────────────────
  // A14: Indreløper i 4-3-1-2 (Magnus Oltedal)
  // Kilde: docs/uefa/A14-indreloper-4312-analyse-v2.md
  // ──────────────────────────────────────────
  {
    id: "a14-indreloper-4312",
    kode: "A14",
    tittel: "Indreløper i diamant",
    forfatter: "Magnus Oltedal",
    tema: "Indreløperrolle i 4-3-1-2",
    roller: ["Indreløper", "Sentral midtbane"],
    sammendrag:
      "Oltedal kobler Egil Olsen sin planlagte spillestil og italiensk struktur for å definere indreløperens rolle i 4-3-1-2. Spillerne må scanne før mottak, gi regista to støttevinkler, styre tempo og være to-veis (3F-gjenvinning + boksinvolvering). Treningen organiseres som situasjonslæring: possession i diamant, 8v6 gjennombrudd og 11v11 scenarier.",
    kpier: [
      { navn: "Touch pr involvering", referanseverdi: "1–2 touch", kilde: "Kap. læringsmomenter" },
      { navn: "3F-gjenvinning", referanseverdi: ">=8 forsøk pr kamp", kilde: "Dimensjoner" },
      { navn: "Støttevinkler for regista", referanseverdi: "90 % tilgjengelighet", kilde: "Arbeidsområder" },
      { navn: "Boksinvolvering", referanseverdi: "4–6 løp pr omgang", kilde: "Italiensk praksis" },
      { navn: "Kreative aksjoner", referanseverdi: "5+ vegg/tredjemann", kilde: "Italiensk praksis" },
    ],
    fokuspunkter: [
      { id: "a14-scanning", tekst: "IL: Scanning før mottak – gi 6-eren to vinkler", rolle: "Indreløper" },
      { id: "a14-two-move", tekst: "Two-move pattern: dra ut back, skjær inn i mellomrom/bakrom", rolle: "Indreløper" },
      { id: "a14-3f", tekst: "3F-press: motsatt IL leder gjenvinning innen 5 sek", rolle: "Indreløper" },
      { id: "a14-boks", tekst: "5 i boks: IL + vingback + spisser fyller rom 1-4", rolle: "Indreløper" },
      { id: "a14-leder", tekst: "Kaptein: eierskap til rollekrav – video + presise cues", rolle: "Sentral midtbane" },
    ],
    ovelser: [
      { kode: "uefa-a14-01" },
      { kode: "uefa-a14-02" },
    ],
    coachingCues: [
      { kategori: "Scanning", gjor: "Blikk før ball – orienter 360°", ikkeGjor: "Ikke motta uten å ha plan" },
      { kategori: "Two moves", gjor: "Start bredt, tru diagonalt", ikkeGjor: "Ikke stå i samme linje som regista" },
      { kategori: "Gjenvinning", gjor: "3F = du – press innen 5 sek", ikkeGjor: "Ikke jogg tilbake" },
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
      "Ved å analysere alle scoringer i Tippeligaen 2015 viser Kristiansen at innlegg i åpent spill står bak 34 % av målene (3,5 % av alle innlegg ender i scoring). 96 % av scoringene kommer innenfor 16 m, og 68 % er direkte avslutninger (innlegger + målscorer). Lag som strukturerer soner og roller (Strømsgodset) blir mest effektive. Finn kvalitets-sone (A-C), bemann boks med 3+1, og tren gjenvinning etter blokkert innlegg.",
    kpier: [
      { navn: "Andel mål fra innlegg", referanseverdi: "34 %", kilde: "Tippeligaen 2015" },
      { navn: "Scoring pr innlegg", referanseverdi: "3,5 %", kilde: "Tippeligaen 2015" },
      { navn: "Direkte scoring", referanseverdi: "68 %", kilde: "Tippeligaen 2015" },
      { navn: "Mål innenfor 16 m", referanseverdi: "96 %", kilde: "Tippeligaen 2015" },
      { navn: "Innlegg etablert vs overgang", referanseverdi: "73/27 %", kilde: "Tippeligaen 2015" },
    ],
    fokuspunkter: [
      {
        id: "a15-innlegg-soner",
        tekst: "Innlegg fra sone A-C – fortsett løpet helt inn i A/B ved kortlinja før du legger inn",
        rolle: "Vinger",
      },
      { id: "a15-direkte", tekst: "Direkte innlegg → mål: sett opp mønster mellom innlegger og målscorer", rolle: "Spiss" },
      { id: "a15-gjenvinning", tekst: "Blokkert innlegg = 5 sek gjenvinning før reorganisering" },
      { id: "a15-boks", tekst: "Minst tre i boks + bakre 45° før ballen går inn", rolle: "Indreløper" },
      { id: "a15-rollefordeling", tekst: "Gi spesialistene klare roller (leveranse vs avslutter)" },
    ],
    ovelser: [
      { kode: "uefa-a15-01" },
      { kode: "uefa-a15-02" },
    ],
    coachingCues: [
      {
        kategori: "Innlegg",
        gjor: "Driv løpet helt inn i sone A/B (nær kortlinja) før du legger inn",
        ikkeGjor: "Ikke løft tidlige innlegg fra 25 meter uten plan",
      },
      { kategori: "Boks", gjor: "Tre i boks + bakre 45°", ikkeGjor: "Ikke stå flatt på linje" },
      { kategori: "Gjenvinning", gjor: "Re-press 5 sek etter blokk", ikkeGjor: "Ikke jogg tilbake" },
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
      "Analysen av alle RBK-målsjanser i Tippeligaen 2016 viser at identiteten (angrip uansett motstander) er tilbake. Rundt 60 % av sjansene skapes i etablert angrep med kombinasjoner og gullsone-innlegg, mens kontringer står for ca. 30 %. Strukturert 4-3-3, boksbemanning (rom 1–3) og 6-sek-kontring bygger suksessen.",
    kpier: [
      { navn: "Målsjanser etablert", referanseverdi: "~60 %", kilde: "Kap. 5.1" },
      { navn: "Målsjanser kontring", referanseverdi: "~30 %", kilde: "Kap. 5.1" },
      { navn: "Mål totalt", referanseverdi: "65", kilde: "Tabell" },
      { navn: "Innleggssuksess", referanseverdi: "24 % av scoringene", kilde: "Kap. 6.2" },
    ],
    fokuspunkter: [
      { id: "a16-faser", tekst: "Etablert (60 %) → kombinasjon på kant før innlegg" },
      { id: "a16-kontring", tekst: "Kontring: 6 sek – spiss dypt, kant stang, IL bakre" },
      { id: "a16-gull", tekst: "Innlegg fra gullsonen – ikke ansvarsfraskrivelse" },
      { id: "a16-boks", tekst: "Boksbemanning: rom 1-3 + bakre bue" },
      { id: "a16-gjenvinning", tekst: "Kontring på kontring – gjenvinn i sone 2" },
    ],
    ovelser: [
      { kode: "uefa-a16-01" },
      { kode: "uefa-a16-02" },
    ],
    coachingCues: [
      { kategori: "Kant", gjor: "L-løp før innlegg", ikkeGjor: "Ikke slå blindt" },
      { kategori: "Spiss", gjor: "Rom 1→2", ikkeGjor: "Ikke bli stående flatt" },
      { kategori: "Kontring", gjor: "6 sek – løp tre linjer", ikkeGjor: "Ikke safe" },
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
      "Fem tidligere RBK-spisser og fem trenere beskriver hva som kjennetegner midtspissen i klubbens 4-3-3: fysisk robust, relasjonelt smart og mentalt robust. Rollen krever målgaranti (15+), boksbevegelser i rom 1-3, og evne til å være førsteforsvarer.",
    kpier: [
      { navn: "Mål pr sesong", referanseverdi: "15+", kilde: "Trenerintervju" },
      { navn: "Boksbevegelser", referanseverdi: "Rom 1-3 fylt hver gang", kilde: "Spillerintervju" },
      { navn: "Veggsituasjoner", referanseverdi: "10+ kombinasjoner pr kamp", kilde: "Oppsummering" },
      { navn: "Press-initiativ", referanseverdi: "Spiss starter 90 % av pressene", kilde: "Trenerintervju" },
    ],
    fokuspunkter: [
      { id: "a17-boks", tekst: "Spiss: rom 1-3 + bakre 45° – fyll alle", rolle: "Spiss" },
      { id: "a17-press", tekst: "Førsteforsvarer: du setter press-signalet", rolle: "Spiss" },
      { id: "a17-kombinasjon", tekst: "1-2 med IL/kant minst 10 ganger", rolle: "Spiss" },
      { id: "a17-unik", tekst: "Bygg mønster rundt spissens spesialitet", rolle: "Spiss" },
    ],
    ovelser: [
      { kode: "uefa-a17-01" },
      { kode: "uefa-a17-02" },
    ],
    coachingCues: [
      { kategori: "Boks", gjor: "Rom 1→2→3", ikkeGjor: "Ikke bli stående" },
      { kategori: "Press", gjor: "Trigge press, led lag", ikkeGjor: "Ikke falle av uten signal" },
      { kategori: "Relasjoner", gjor: "Fall-retur-boks", ikkeGjor: "Ikke vent på ballen" },
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
      { navn: "Spillvendinger pr kamp", referanseverdi: "RBK/Varegg 10-20, Bayern/Barca 50+", kilde: "Kap. 5" },
      { navn: "Vellykkede angrep", referanseverdi: "RBK 18/88, Bayern 30/163, Barca 37/204, Varegg 32/191", kilde: "Resultat" },
      { navn: "Innlegg involvert", referanseverdi: "RBK 9/18, Varegg 16/32", kilde: "Analyse" },
      { navn: "Gjenvinning", referanseverdi: "RBK høy, Varegg lav", kilde: "Kap. 5" },
    ],
    fokuspunkter: [
      { id: "a18-vending", tekst: "Spillvending før gjennombrudd – flytt motstander først" },
      { id: "a18-gullsoner", tekst: "RBK/Bayern: angrip rommet mellom back og stopper etter vending", rolle: "Vinger" },
      { id: "a18-sentrum", tekst: "Barcelona/Varegg: bruk sidekorridor for å rettvende i mellomrom", rolle: "Sentral midtbane" },
      { id: "a18-gjenvinning", tekst: "Kontring på kontring – struktur i angrep gir gjenvinningspress" },
    ],
    ovelser: [
      { kode: "uefa-a18-01" },
      { kode: "uefa-a18-02" },
    ],
    coachingCues: [
      { kategori: "Spillvending", gjor: "Vend både lavt og høyt", ikkeGjor: "Ikke tving gjennom uten ubalanse" },
      { kategori: "Relasjoner", gjor: "Back-IL-kant over/underlap", ikkeGjor: "Ikke isoler én mot fire" },
      { kategori: "Gjenvinning", gjor: "3+2 sikring = vinn tilbake", ikkeGjor: "Ikke gi opp ballen lett" },
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
      { navn: "KFUM mål etablert", referanseverdi: "62 (42,8 %)", kilde: "Kap. 7" },
      { navn: "KFUM mål delvis", referanseverdi: "40 (27,6 %)", kilde: "Kap. 7" },
      { navn: "KFUM mål overgang", referanseverdi: "43 (29,6 %)", kilde: "Kap. 7" },
      { navn: "VIF 2010 etablerte mål", referanseverdi: "ref. kap. 7.8", kilde: "Analyse" },
    ],
    fokuspunkter: [
      { id: "a19-tamodighet", tekst: "Tålmodig bearbeiding – la ballen gjøre jobben" },
      { id: "a19-relasjon", tekst: "Back-IL-kant: triangelspill før gjennombrudd" },
      { id: "a19-gjenvinning", tekst: "Kontring på kontring – 1.F på ball innen 3 sek" },
    ],
    ovelser: [
      { kode: "uefa-a19-01" },
      { kode: "uefa-a19-02" },
    ],
    coachingCues: [
      { kategori: "Individuell", gjor: "Sterk 1A/1F", ikkeGjor: "Ikke gi opp duellen" },
      { kategori: "Relasjon", gjor: "Triangler", ikkeGjor: "Ikke spill blindt fremover" },
      { kategori: "Struktur", gjor: "3+2 sikring", ikkeGjor: "Ikke bli for direkte" },
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
      "Analyse av Strømsgodsets mål/sjanser i Tippeligaen 2010 viser klar sammenheng mellom få touch og effektivitet: 71 % av avslutningene var på ett touch, 59 % av målgivende pasninger og 46 % av tredjepasninger. Spillerutvikling må derfor eksponere ungdommer for tempo, orientering og presisjon på ett/totouch.",
    kpier: [
      { navn: "Ett-touch avslutning", referanseverdi: "71 %", kilde: "SIF 2010" },
      { navn: "Ett-touch assist", referanseverdi: "59 %", kilde: "SIF 2010" },
      { navn: "Ett-touch tredjepas", referanseverdi: "46 %", kilde: "SIF 2010" },
      { navn: "Kombinasjon ≤1 touch", referanseverdi: "39 %", kilde: "SIF 2010" },
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
    ovelser: [
      { kode: "uefa-a22-01" },
      { kode: "uefa-a22-02" },
      { kode: "uefa-a22-03" },
      { kode: "uefa-a22-04" },
      { kode: "uefa-a22-05" },
    ],
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
      { navn: "Innlegg til baklengs", referanseverdi: "4 av 8 baklengs (Atletico-case for sideback)" , kilde: "Drøfting innlegg" },
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
      "Lunde Aarsheim analyserte 97 gunstige brudd og fant bare 22 vellykkede overganger. Løsningen er en overgangspyramide (bakrom → mellomrom → vekk fra press), tydelige 3+2-balansering og signalstyrt presshøyde (høy 4-4-2 diamant vs. lav 4-4-2 sone). Klar rollefordeling for spiss/kant/sentral midt gjør det lettere å treffe første pasning og å stå igjen med restforsvar dersom laget mister ballen igjen. Som hovedregel ønsker vi å opprette balanse med 3 forsvarsspillere og 2 midtbanespillere. Disse sentrerer og konsentrer seg for et eventuelt balltap.",
    kpier: [
      { navn: "Gunstige brudd", referanseverdi: "97 (43 høye / 54 lave)", kilde: "Analyse" },
      { navn: "Vellykkede overganger", referanseverdi: "22 (17 sjanser, 6 mål, 2 straffer)", kilde: "Analyse" },
      { navn: "Valg etter brudd", referanseverdi: "Bakrom 29 / Mellomrom 43 / Vekk fra press 27", kilde: "Analyse" },
      { navn: "Brudd pr kamp", referanseverdi: "Randaberg 33 / Viking2 27 / Madla 20 / VBK 17", kilde: "Analyseskjema" },
    ],
    fokuspunkter: [
      { id: "a09-press", tekst: "1.forsvarer signaliserer press – resten må stå etter", rolle: "Stopper" },
      { id: "a09-3pluss2", tekst: "3+2-balansen: tre bak + to sikrere – hvem som helst kan fylle rollen", rolle: "Sentral midtbane" },
      { id: "a09-pyramide", tekst: "Overgangspyramide: bakrom → mellomrom → vekk fra press" },
      { id: "a09-spiss", tekst: "Spiss starter bakromsløp umiddelbart ved brudd", rolle: "Spiss" },
      { id: "a09-indreloper", tekst: "Indreløper: motsatt bevegelse for å åpne rom", rolle: "Indreløper" },
    ],
    ovelser: [
      { kode: "uefa-b01-01" },
      { kode: "uefa-b01-02" },
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
