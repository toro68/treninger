/**
 * UEFA-øvelser fra analyserte UEFA A-oppgaver
 *
 * Disse øvelsene er ekstrahert fra docs/uefa/*-ANALYSERT.md
 * og brukes både i treningsseksjonen og UEFA-panelet.
 *
 * Kodeformat: uefa-[oppgavekode]-[nummer], f.eks. "uefa-a10-01"
 * Visningskode: UEFA-A10-01 (for UI)
 */

import type { ExerciseData } from "./exercises";

export const uefaExercises: ExerciseData[] = [
  {
    id: "uefa-a01-03",
    exerciseNumber: 549,
    name: "Figur 25: Generell 2v1",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "angrep",
    equipment: ["baller", "kjegler"],
    description:
      "Generell form: 2 spillere utfordrer 1 motspiller, og ny gruppe settes i gang når motspiller er passert.",
    coachingPoints: [
      "Ballfører: utfordre med fart og timing",
      "Medspiller: skap vinkel og støtte – vær spillbar",
      "Når forsvarer er passert: start ny gruppe",
    ],
    variations: [
      "Forsvarer passiv → aktiv",
      "Begrens antall touch (2–3) før avslutning",
    ],
    source: "uefa",
    sourceRef: "A01 Even Ødegaard – Figur 25 (generell tilnærming)",
  },

  {
    id: "uefa-a01-04",
    exerciseNumber: 550,
    name: "Figur 26: Kant 1v1 + overlapp + innlegg",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "innlegg",
    equipment: ["baller", "kjegler", "mål"],
    description:
      "Spesifikk spillsituasjon: kantspiller utfordrer sideback og får overlapp fra egen sideback. Øvelsen kan avsluttes med innlegg.",
    coachingPoints: [
      "Kantspiller: utfordre 1v1 og les sideback",
      "Back: timet overlapp – løp forbi når sideback binder",
      "Innlegg: slå når du har fordel og løp i boks er klare",
    ],
    variations: [
      "Legg til 1 forsvarer i boks (passiv → aktiv)",
      "Krav om cutback-variant ved gjennombrudd",
    ],
    source: "uefa",
    sourceRef: "A01 Even Ødegaard – Figur 26 (spesifikk tilnærming)",
  },
  // ══════════════════════════════════════════════════════════
  // A10: Moderne vingerrolle (Hugo Pereira)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a10-01",
    exerciseNumber: 505,
    name: "Assist fase 1: Gk+7v7+Gk med låste linjer",
    category: "game",
    duration: 18,
    playersMin: 16,
    playersMax: 18,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål", "vester"],
    description:
      "Gk+7v7+Gk på ca. 45x35 meter, med boks som angrepsreferanse. Spilles i formasjon 1-4-3 eller 1-4-1-2. Dutch rule: spillet starter alltid hos keeper. Tre spillere må være igjen på egen halvdel når laget har ball, og forsvarende lag får bare forsvare posisjonelt i to korridorer.",
    coachingPoints: [
      "Skap situasjoner der vingen mottar rettvendt i offensiv halvdel.",
      "Bruk bredde og mellomrom for å gi vingen tilgang til mål og bakrom.",
      "Tving frem etablert angrep i stedet for rene kontringer.",
      "Behold nok spillere i to linjer slik at vingen kan utforske mellomrom og bakrom.",
    ],
    variations: [
      "Spill 1-4-3 eller 1-4-1-2.",
      "Lås tre spillere på egen halvdel ved ballbesittelse.",
      "Begrens forsvarsspillet til to korridorer for å åpne rom til vingen.",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Assist fase 1, Game form: Gk+7v7+Gk",
  },

  {
    id: "uefa-a10-02",
    exerciseNumber: 512,
    name: "Assist fase 1: Gk+7v7+Gk + joker",
    category: "game",
    duration: 15,
    playersMin: 17,
    playersMax: 17,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål", "vester"],
    description:
      "Gk+7v7+Gk + 1 joker på ca. 45x35 meter. Bruk boks som referanse og spill mot to store mål. Vingen har én berøring på egen halvdel og frie berøringer offensivt. Kildemodellen anbefaler høyrefotet vinge på venstre side og venstrefotet vinge på høyre side for å åpne mellomrom.",
    coachingPoints: [
      "Skap mange mottak der vingen får ballen vendt mot mål.",
      "La vingen variere mellom løp i lengde, bredde og inn i mellomrom.",
      "Bruk joker for å hindre fast mannsmarkering og åpne flere mottaksrom.",
      "Still krav til førsteberøring og posisjon før ballen kommer.",
    ],
    variations: [
      "Bruk en-touch for vingen på defensiv halvdel og fri touch offensivt.",
      "Spill med inverterte vinger for å åpne sentrale rom.",
      "Behold samme baneformat, men varier om joker spiller sentralt eller sidevendt støtte.",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Assist fase 1, Game form: Gk+7v7+Gk + Jk",
  },

  {
    id: "uefa-a10-03",
    exerciseNumber: 515,
    name: "Innlegg fase 1: Gk+6v6+Gk",
    category: "game",
    duration: 15,
    playersMin: 14,
    playersMax: 14,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål", "vester"],
    description:
      "Gk+6v6+Gk på ca. 40x40 meter med boks som referanse. Spilles mot to store mål. Dutch rule-adaptasjon: trener setter i gang fra sidelinjen. Sidekorridorer er markert, og forsvarende lag kan bare forsvare i to korridorer. Øvelsen skal gi crossing-situasjoner mot balansert forsvar.",
    coachingPoints: [
      "Få vingen inn i innleggsposisjon mot organisert bakre ledd.",
      "Jobb med 5–10 meter mellom ledd og 10–20 meter rom bak forsvarslinjen.",
      "La vingen erfare ulike vertikale bevegelser i forsvarslinja.",
      "Skap crossing-situasjoner uten at spillet bryter opp i åpne kontringer.",
    ],
    variations: [
      "Bruk coach-ball fra sidelinje for å kontrollere startbildet.",
      "Begrens forsvarsspillet til to korridorer.",
      "Juster korridorbredde for å påvirke mellomrom og bakrom.",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Innlegg fase 1, Game form: Gk+6v6+Gk",
  },

  {
    id: "uefa-a10-04",
    exerciseNumber: 517,
    name: "Innlegg fase 1: Gk+2v2+Gk + 2 jokere",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 8,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål", "vester"],
    description:
      "Gk+2v2+Gk + 2 sidelinjejokere på ca. 20x45 meter. Dutch rule: spillet starter hos keeper. Vingene er jokere i sidekorridorene og har 1–3 touch. Øvelsen prioriterer mottak nær sidelinje og bevegelser i bredde og lengde før innlegg.",
    coachingPoints: [
      "La vingen motta vendt mot mål i sidekorridor og siste tredel.",
      "Jobb med vertikale og brede bevegelser før mottak.",
      "Bruk jokere til å øke frekvensen av innleggsposisjoner.",
      "Still krav til førsteberøring og videre aksjon i få touch.",
    ],
    variations: [
      "Begrens vingen til 1–3 touch i korridoren.",
      "La jokere være bundet til sidelinjen eller slippe litt inn i banen.",
      "Juster lengde/bredde for å styre hvor ofte vingen kommer frem i siste tredel.",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Innlegg fase 1, Game form: Gk+2v2+Gk + 2 Jk",
  },

  {
    id: "uefa-a10-05",
    exerciseNumber: 544,
    name: "Innlegg fase 2: Gk+7v7+Gk",
    category: "game",
    duration: 15,
    playersMin: 16,
    playersMax: 16,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål", "vester"],
    description:
      "Gk+7v7+Gk på ca. 60x45 meter med boks som referanse. Sidekorridorer er markert. Mål etter cutback eller innlegg bakover gir ekstra poeng. Dutch rule gjelder, og i sidekorridoren er vingen begrenset til én touch. Øvelsen retter seg mot fase 2: fra mulighet til realitet i innleggssituasjoner.",
    coachingPoints: [
      "Skap crossing under 2–3 meters press og lite tid.",
      "Koble antall touch til type innlegg og tidspunkt for innlegg.",
      "Tving frem rask beslutning hos vingen i siste tredel.",
      "Bruk sidekorridor og touch-begrensning for å øke tempo og presisjon.",
    ],
    variations: [
      "Én touch i sidekorridor.",
      "Ekstrapoeng for cutback/bakoverinnlegg.",
      "Dutch rule ved alle restarter.",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Innlegg fase 2, Game form: Gk+7v7+Gk",
  },

  {
    id: "uefa-a10-06",
    exerciseNumber: 546,
    name: "Innlegg fase 3: Gk+4v4+Gk + 2 jokere",
    category: "station",
    duration: 14,
    playersMin: 12,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål", "vester"],
    description:
      "Gk+4v4+Gk + 2 vingejokere på ca. 30x45 meter. To markerte sidekorridorer der bare jokerne kan spille, med maks to touch. Dutch rule ved restart, og mål på første touch gir ekstra poeng. Øvelsen trener selve den avgjørende pasningen i crossing-situasjonen.",
    coachingPoints: [
      "La vingen krysse fra definerte soner med høyt press rundt ballfører.",
      "Prioriter innsidefot, kamuflasje og førsteberøringsavslutning i boksen.",
      "Skap nok avslutningsvalg til at vingen må velge riktig målrom og vekting.",
      "Bruk jokerrollen til å holde høy frekvens i avgjørende pasninger.",
    ],
    variations: [
      "Maks to touch i sidekorridor.",
      "Ekstrapoeng for førsteberøringsmål.",
      "Restart alltid fra keeper.",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Innlegg fase 3, Game form: Gk+4v4+Gk + 2 Jkrs",
  },

  {
    id: "uefa-a10-07",
    exerciseNumber: 547,
    name: "Innlegg fase 3: Gk+5v5+Gk",
    category: "game",
    duration: 16,
    playersMin: 12,
    playersMax: 12,
    theme: "angrep",
    equipment: ["kjegler", "baller", "stormål", "vester"],
    description:
      "Gk+5v5+Gk på ca. 30x50 meter. To sidekorridorer der bare vingene kan spille med maks to touch i angrepsfasen. Dutch rule ved restart. Mål inne i femmeteren gir ekstra poeng, og mål utenfor sekstenmeteren gir også ekstra poeng. Øvelsen prioriterer hvem som scorer etter innlegg og hvor avslutningene kommer.",
    coachingPoints: [
      "Prioriter samspill mellom vinge og spiss i boksen.",
      "Legg til rette for avslutninger i femmeter og sentralt i seksten.",
      "Gi også rom for avslutning utenfor boks når crossing-bildet tilsier det.",
      "Bruk sidekorridorene for å styre kvalitet og retning på innlegget.",
    ],
    variations: [
      "Maks to touch for vinger i angrepsfasen.",
      "Ekstrapoeng for mål i femmeteren.",
      "Ekstrapoeng for mål utenfor sekstenmeteren.",
    ],
    source: "uefa",
    sourceRef: "A10 Hugo Pereira – Innlegg fase 3, Game form: Gk+5v5+Gk",
  },

  // ══════════════════════════════════════════════════════════
  // A12: Hurtig og kontrollert angrepsspill (Anders Fredriksen)
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // A13: Rolletrening sideback/indreløper (Arnstein Røen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a13-01",
    exerciseNumber: 506,
    name: "3v3 + keeper – SB/IL",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 8,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "3v3 + keeper(e) på 30x33 m. Vekt på 1–1 ferdighet offensivt og defensivt, omstillingshurtighet, frekvens (quickness), medtak/ta av press og avslutningsferdighet.",
    coachingPoints: [
      "1–1 ferdighet offensivt og defensivt",
      "Omstillingshurtighet og frekvens (quickness)",
      "Medtak/ta av press og avslutningsferdighet",
    ],
    variations: [
      "2v2 + keeper(e) (juster areal)",
      "4v4 + keeper(e) (juster areal)",
      "Bruk offsideregel ved behov for flere 1–1 situasjoner",
    ],
    source: "uefa",
    sourceRef: "A13 Arnstein Røen – Sideback/Indreløper",
  },

  {
    id: "uefa-a13-02",
    exerciseNumber: 534,
    name: "7v7+kantsoner",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["mål", "kjegler", "baller"],
    description:
      "7v7 + keeper(e) på 50x66,5 m i 3-3-1 med innleggssoner og kantspillere (sonespillere). Vekt på relasjoner SB–IL, innløp i boks og vurderinger i omstilling.",
    coachingPoints: [
      "Offensivt: utnytte overtall og komme med innløp i boks",
      "Vurder klima: kontring, overtall eller undertall",
      "Defensivt: rask omstilling – vurder gjenvinne eller reorganisere",
    ],
    variations: [
      "Sonespiller kan ta med ball inn i banen",
      "Motsatt sonespiller skjærer ved innlegg",
      "Offsideregel også for sonespillerne",
    ],
    source: "uefa",
    sourceRef: "A13 Arnstein Røen – Sideback/Indreløper",
  },

  {
    id: "uefa-a13-03",
    exerciseNumber: 600,
    name: "11v11 – oppspill + presshøyde",
    category: "game",
    duration: 25,
    playersMin: 20,
    playersMax: 22,
    theme: "overgang",
    equipment: ["mål", "kjegler", "baller", "vester"],
    description:
      "11v11 hel bane med kampforberedende progresjon: coach ett lag i oppspillsvarianter, la motstander variere presshøyde (høyt som base, avtal fall-av), coach så defensiv struktur med variasjon i presshøyde, og avslutt med vanlig spill der begge strukturer praktiseres.",
    coachingPoints: [
      "Avklar presshøyde-modus og trigger for fall-av",
      "Gjenvinning: 1F først, støtte i tre ledd",
      "SB–IL-relasjon: frispill IL rettvendt i rom 2 når mulig",
      "Etablert angrep: krev 4 samtidige innløp i boks",
    ],
    variations: [
      "Sett måltall: gjenvinning ≤6–8 sek eller fall av til 3 ledd",
      "Begrens antall sekunder i oppspill (for å trigge pressbeslutninger)",
      "Start fra ulike død-baller/keeper for å variere kampbildet",
    ],
    source: "uefa",
    sourceRef: "A13 Arnstein Røen – Sideback/Indreløper",
  },

  // ══════════════════════════════════════════════════════════
  // A14: Indreløper i 4-3-1-2 (Magnus Oltedal)
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // A15: Innlegg i Tippeligaen (Gard H. Kristiansen)
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // A16: Rosenborgs angrepsspill (Jørgen Ferstad)
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // A17: Spissrollen i RBK (Erik Selnæs)
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // A18: Angrep mot etablert forsvar (Hiep Tran)
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // A19: Hva bør vektlegges i angrep mot etablert forsvar (Ståle Andersen)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a19-01",
    exerciseNumber: 483,
    name: "Strukturspill 16-meter til 16-meter",
    category: "station",
    duration: 20,
    playersMin: 14,
    playersMax: 18,
    theme: "angrep",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description:
      "Spill fra 16-meter til 16-meter med smalere bredde. Så langt det lar seg gjøre skal spillerne være i sine roller. I eksempelet fra kilden møter en fast backfirer angrepstreer og midtbanetreer som normalt er i startellever. Banen kan gjøres enda smalere for å gjøre det vanskeligere å spille gjennom pressledd.",
    coachingPoints: [
      "Hold roller og relasjoner tydelige i strukturen",
      "Vurder når dere skal spille gjennom pressledd og når dere skal starte på nytt",
      "Bruk smal bane til å trene timing og kvalitet i gjennomspill",
    ],
    variations: [
      "Gjør banen enda smalere for å øke kravene til timing og presisjon",
      "Juster antall spillere, men behold struktur og rollekrav",
    ],
    source: "uefa",
    sourceRef: "A19 Ståle Andersen – Angrep etablert",
  },

  {
    id: "uefa-a19-02",
    exerciseNumber: 540,
    name: "Ballbesittelse 8v8 + 2 frie (5-sek gjenvinning)",
    category: "rondo",
    duration: 18,
    playersMin: 16,
    playersMax: 20,
    theme: "angrep",
    equipment: ["kjegler", "baller", "vester"],
    description:
      "Ballbesittende øvelse på avgrenset område uten mål: 8v8 + 2 frie. Kjør 4-5 drag på 2-4 minutter med ulike kriterier per runde: størrelse, touchbegrensning, baller under knehøyde eller frie betingelser. Poeng gis for antall pasninger eller for gjenvinning innen 5 sekunder.",
    coachingPoints: [
      "Bevar ball til motstander er flyttet feil eller dere vinner et tydelig rom",
      "5 sek-regel: mistes ballen, må laget jage eller falle av med klar retning",
      "Varier kriterier, men hold intensiteten høy og valgene presise",
    ],
    variations: [
      "Tre lag à seks spillere der laget som mister ball må jage",
      "La balljagende lag få poeng for antall brudd i intervallet",
    ],
    source: "uefa",
    sourceRef: "A19 Ståle Andersen – Angrep etablert",
  },

  // ══════════════════════════════════════════════════════════
  // A20: Touch og scoringer (Stian Lund)
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // A21: Notorisk målscorer (Totto Dahlum)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-a21-01",
    exerciseNumber: 511,
    name: "Murvegg halvsprett mellom krittstrekene",
    category: "station",
    duration: 15,
    playersMin: 1,
    playersMax: 4,
    theme: "avslutning",
    equipment: ["mål", "baller", "kjegler"],
    description:
      "Tegn to vannrette krittstreker på murveggen 8-10 meter foran spilleren, og marker en linje på bakken ca. 8 meter fra veggen. Spilleren returnerer ballen på halvsprett med ett touch og skal treffe mellom strekene på veggen. Ballen må i veggen før den, via maks to sprett i bakken, returneres fra bak streken.",
    coachingPoints: [
      "Stabil og balansert overkropp gir bedre utgangspunkt for å lykkes",
      "Jobb kontinuerlig med føttene for å justere for returvinkel fra veggen",
      "Varier fot etter returene, men krev treff mellom strekene hver gang",
    ],
    variations: [
      "Sett resultatkrav som 8 av 10 eller 10 av 10 treff mellom strekene",
      "Endre hvilken fot som brukes på returene fra veggen",
    ],
    source: "uefa",
    sourceRef: "A21 Totto Dahlum – Notorisk målscorer",
  },

  {
    id: "uefa-a21-02",
    exerciseNumber: 514,
    name: "Åpent mål fra kort hold",
    category: "station",
    duration: 10,
    playersMin: 1,
    playersMax: 4,
    theme: "avslutning",
    equipment: ["mål", "baller", "kjegler"],
    description:
      "Når scoringsfølelsen må bygges opp igjen, start med enkle repetisjoner som nesten er dømt til å ende i mål: skyt i åpent mål uten keeper fra kort hold. Derfra kan dere bygge videre til keeper, kjente situasjoner og mer kampnære avslutninger.",
    coachingPoints: [
      "Begynn med aktiviteter som nesten er dømt til å resultere i mål",
      "Bruk enkle repetisjoner for å finne nettsusen og scoringsmodus igjen",
      "Øk vanskelighetsgraden først når tryggheten er tilbake",
    ],
    variations: [
      "Sett inn keeper når åpent mål fra kort hold sitter stabilt",
      "Gå videre til kjente kampsituasjoner fra korte avstander",
    ],
    source: "uefa",
    sourceRef: "A21 Totto Dahlum – Notorisk målscorer",
  },

  {
    id: "uefa-a21-03",
    exerciseNumber: 608,
    name: "15-20 min innlegg og avslutning etter trening",
    category: "station",
    duration: 20,
    playersMin: 2,
    playersMax: 6,
    theme: "avslutning",
    equipment: ["baller", "kjegler", "mål"],
    description:
      "Etter fellestrening: bruk 15-20 minutter på innlegg og avslutning/scoring. Tren kjente kampsituasjoner med innlegger eller annen pasningslegger, og jobb videre med detaljene som trengs for å lykkes i scoringsøyeblikket.",
    coachingPoints: [
      "Bruk ekstra minutter etter trening til å forsterke det som skjer i kamp",
      "Jobb med innlegg, avslutning og ro i scoringsøyeblikket",
      "Reflekter etterpå over hva som fungerte og hva som må forbedres",
    ],
    variations: [
      "Varier mellom innlegg fra dødlinje, server fra pasningslegger og avslutning alene med keeper",
      "Legg inn åpne eller voktede mål avhengig av hva som skal vedlikeholdes",
    ],
    source: "uefa",
    sourceRef: "A21 Totto Dahlum – Notorisk målscorer",
  },

  // ══════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════
  // G01: Keeper (Håkon Grøttland)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-g01-01",
    exerciseNumber: 613,
    name: "7v7 med felles midtbane (keepervalg)",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 16,
    theme: "keeper",
    equipment: ["mål", "baller", "kjegler", "vester"],
    description:
      "7v7 med felles midtbane for å trigge hyppige overganger og rettvendte situasjoner i mellomrom. Keeper får mange kampnære valg: gjennomspill, distanseskudd og timing på romtaking.",
    coachingPoints: [
      "Velg før du går (les ballfører, løp og avstand)",
      "Kommunikasjon: styr bakre ledd og pressretning",
      "Vær set i skuddøyeblikk, bak ball og lås grep",
    ],
    variations: [
      "Tid/press-regel: keeper har maks 3 sek ved tilbakespill",
      "Poengbonus for «avverging før skudd» (bryte gjennomspill)",
    ],
    source: "uefa",
    sourceRef: "G01 Håkon Grøttland – Keeper (spillbasert keeperutvikling)",
  },

  {
    id: "uefa-g01-02",
    exerciseNumber: 614,
    name: "3v3 inne i 16m (næravslutning + 1v1)",
    category: "station",
    duration: 12,
    playersMin: 7,
    playersMax: 9,
    theme: "keeper",
    equipment: ["mål", "baller", "vester"],
    description:
      "3v3 spilles inne i 16-meteren. Trener står klar med ny ball for høy repetisjon. Keeper får mange næravslutninger og 1v1-avgjørelser (romtaking/blokkering vs stå).",
    coachingPoints: [
      "Rom! når ballen er fri – tim utgang",
      "Blokkering: kroppsposisjon og forflytning ut av mål",
      "Set før skudd – ikke være på vei",
    ],
    variations: [
      "Start hver rep med gjennomspill for å trigge 1v1",
      "Begrens touch for angriperne for å øke tempo i avslutning",
    ],
    source: "uefa",
    sourceRef: "G01 Håkon Grøttland – Keeper (spillbasert keeperutvikling)",
  },

  {
    id: "uefa-g01-03",
    exerciseNumber: 615,
    name: "6v6 med sidekorridor-frisoner (innlegg)",
    category: "game",
    duration: 18,
    playersMin: 14,
    playersMax: 14,
    theme: "keeper",
    equipment: ["mål", "baller", "kjegler", "vester"],
    description:
      "6v6 der det er frisoner i sidekorridor som angrep kan bruke for å komme til innlegg. Keeper trener feltarbeid, valg (holde/bokse/avvente) og etterarbeid på retur/andreball.",
    coachingPoints: [
      "Avverge før skudd: les innlegg og bryt før avslutning",
      "Kommuniser boksroller og markering",
      "Bak ball, lås grep når du kan holde",
    ],
    variations: [
      "Gi bonuspoeng for innlegg som håndteres uten retur",
      "Øk trykket: legg inn ekstra angriper i boks (overtall)",
    ],
    source: "uefa",
    sourceRef: "G01 Håkon Grøttland – Keeper (spillbasert keeperutvikling)",
  },

  // ══════════════════════════════════════════════════════════
  // G02: Keeper (Tor Martin Hegrenes)
  // ══════════════════════════════════════════════════════════

  {
    id: "uefa-g02-01",
    exerciseNumber: 616,
    name: "Spill med skuddsoner (valg + returer)",
    category: "game",
    duration: 18,
    playersMin: 12,
    playersMax: 16,
    theme: "keeper",
    equipment: ["mål", "baller", "kjegler", "vester"],
    description:
      "Spillform med markerte skuddsoner der lag får poeng for avslutninger fra bestemte soner/vinkler. Keeper trener posisjonering, grunnstilling i skuddøyeblikk og samhandling på returer/press.",
    coachingPoints: [
      "Set i skuddøyeblikk",
      "Bak ball og håndtering av returer",
      "Kommuniser: hvem tar skytter, hvem tar returrom",
    ],
    variations: [
      "Bonus for scoring etter retur (tving keeper/lag til andreball-fokus)",
      "Begrens tid på ball før skudd for å øke kamptrykk",
    ],
    source: "uefa",
    sourceRef: "G02 Tor Martin Hegrenes – Keeper (kampdimensjon og prioritering)",
  },

  {
    id: "uefa-g02-02",
    exerciseNumber: 617,
    name: "Vende på keeperne (tilbakespill + igangsetting)",
    category: "game",
    duration: 16,
    playersMin: 12,
    playersMax: 16,
    theme: "keeper",
    equipment: ["mål", "baller", "kjegler", "vester"],
    description:
      "Spillform der laget får poeng for å spille inn på keeper og ut igjen, før man angriper motsatt. Trener posisjonering for å bli spillbar, flere valgmuligheter og beslutning under tid/press.",
    coachingPoints: [
      "Vær spillbar før tilbakespill (vinkel + avstand)",
      "Scan – velg tempo (hurtig/rolig igangsetting)",
      "Tid/press-regel for å forsterke kamptrykk",
    ],
    variations: [
      "Maks 2 touch for keeper ved tilbakespill",
      "Poengbonus hvis igangsetting bryter første pressledd",
    ],
    source: "uefa",
    sourceRef: "G02 Tor Martin Hegrenes – Keeper (kampdimensjon og prioritering)",
  },

  {
    id: "uefa-g02-03",
    exerciseNumber: 618,
    name: "Server til keeper (igangsetting + omstilling)",
    category: "game",
    duration: 18,
    playersMin: 12,
    playersMax: 18,
    theme: "keeper",
    equipment: ["mål", "baller", "vester"],
    description:
      "Start hver sekvens med server til keeper (varier: innlegg/gjennomspill/skudd) før spillet fortsetter. Sikrer mange kampnære igangsettinger og defensive situasjoner i samme økt.",
    coachingPoints: [
      "Flere valg før du spiller (2–3 løsninger)",
      "Kommunikasjon og organisering i overgang til forsvar",
      "Tid/press-regel på første aksjon",
    ],
    variations: [
      "Veksle start: skudd i trafikk annenhver rep",
      "Poeng hvis laget scorer innen 10 sek etter igangsetting",
    ],
    source: "uefa",
    sourceRef: "G02 Tor Martin Hegrenes – Keeper (kampdimensjon og prioritering)",
  },

  // ══════════════════════════════════════════════════════════
  // A11: RBK i angrep (Svein Maalen)
  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // A06: Den sentrale midtbanerollen (Øyvind Iversen)
  // ══════════════════════════════════════════════════════════
  {
    id: "uefa-a09-01",
    exerciseNumber: 552,
    name: "Bakre firer + 2 sentrale mot 6/8 angripere",
    category: "station",
    duration: 15,
    playersMin: 13,
    playersMax: 15,
    theme: "overgang",
    equipment: ["mål", "småmål", "kjegler", "vester", "baller"],
    description:
      "Keeper, bakre firer og to sentrale midtbanespillere forsvarer eget mål mot 6 eller 8 angripere. Ved brudd scorer forsvarslaget ved å klarere inn i markert sone eller spille pasning i 3/4-mål satt opp i rom laget ønsker å angripe i overgang.",
    coachingPoints: [
      "Bakre ledd: hindre scoring og vinn dueller med kontroll bak ball.",
      "Komprimer bak duell og pump ut når laget kan flytte etter.",
      "Ved brudd: klarer vekk fra farlig rom etter retningslinjene eller sett i gang overgang med presis første pasning.",
    ],
    variations: [
      "Bruk 6 eller 8 angripere avhengig av nivå og belastning.",
      "La scoring ved brudd være klarering i sone eller pasning i småmål.",
      "Juster banebredde for å styre hvor mange brudd og hvilke overgangsrom som oppstår.",
    ],
    source: "uefa",
    sourceRef: "A09 Bjarte Lunde Aarsheim – Treningsøvelser: Arbeide med bakre firer",
  },
  {
    id: "uefa-a09-02",
    exerciseNumber: 553,
    name: "Overtallsspill på siste 1/3-del",
    category: "station",
    duration: 20,
    playersMin: 17,
    playersMax: 17,
    theme: "overgang",
    equipment: ["mål", "kjegler", "vester", "baller"],
    description:
      "9 mot 6 mot to mål med keepere på halv bane med full bredde. Overgangen starter med utkast fra keeper. Laget søker tidlig sentralt gjennom direkte bakrom, sentral midtbane eller pasning inn til innoverkant i mellomrom, mens back skaper bredde på ballside hvis motstander komprimerer.",
    coachingPoints: [
      "Utnytt gjenvinning fra stopper og bli rettvendt så tidlig som mulig.",
      "Skap overtall med god timing på pasning og løp.",
      "True ulike rom samtidig og skap gode vinkler rundt ballfører.",
      "Oppnå gjennombrudd og avslutt angrepet med kvalitet.",
    ],
    variations: [
      "Legg inn restriksjoner for å forsterke læringsmoment, for eksempel kun spill i lengderetning etter støttepasning.",
      "Krev at scoring må komme etter spill over markert linje eller etter at laget har angrepet via sentralt rom.",
      "Juster baneform mellom full bredde og smalere/lang bane for å styre om overgangene går sentralt eller bredt.",
    ],
    source: "uefa",
    sourceRef: "A09 Bjarte Lunde Aarsheim – Treningsøvelser: Overtallsspill på siste 1/3 del",
  },

  // ══════════════════════════════════════════════════════════
  // LEGG TIL FLERE UEFA-ØVELSER HER
  // ══════════════════════════════════════════════════════════
];

// ============================================
// HJELPEFUNKSJONER
// ============================================

/**
 * Konverterer intern id til visningskode
 * "uefa-a10-01" → "UEFA-A10-01"
 */
export const getUEFADisplayCode = (id: string): string => {
  if (!id.startsWith("uefa-")) return id;
  return id.replace("uefa-", "UEFA-").toUpperCase();
};

/**
 * Konverterer visningskode til intern id
 * "UEFA-A10-01" → "uefa-a10-01"
 */
export const uefaCodeToId = (code: string): string => {
  return code.toLowerCase().replace("uefa-", "uefa-");
};

/**
 * Finn UEFA-øvelse etter kode (case-insensitive)
 * Aksepterer både "UEFA-A10-01" og "uefa-a10-01"
 */
export const getUEFAExerciseByCode = (code: string): ExerciseData | undefined => {
  const normalizedId = code.toLowerCase().replace(/^uefa-/, "uefa-");
  return uefaExercises.find((ex) => ex.id === normalizedId);
};

/**
 * Finn alle UEFA-øvelser for en gitt oppgavekode (f.eks. "A10")
 */
export const getUEFAExercisesByAnalysis = (analysisCode: string): ExerciseData[] => {
  const prefix = `uefa-${analysisCode.toLowerCase()}-`;
  return uefaExercises.filter((ex) => ex.id.startsWith(prefix));
};
