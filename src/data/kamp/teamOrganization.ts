export type TeamOrganizationTone = "red" | "sky" | "zinc";

export type TeamOrganizationCard = {
  title: string;
  description: string;
  tone?: TeamOrganizationTone;
};

export const pressHeightCards: TeamOrganizationCard[] = [
  {
    title: "Høyt Press",
    description:
      "Kortere vei til mål ved ballvinning. Krever samstemthet - alle må lese likt. Tvinger feil høyt oppe.",
    tone: "red",
  },
  {
    title: "Lavt Press",
    description:
      "Bevarer struktur og balanse. Venter på feil. Fantastisk utgangspunkt for overganger ved ballvinning.",
    tone: "sky",
  },
];

export const lowPressReminder: TeamOrganizationCard = {
  title: "Viktig ved lavt press",
  description:
    "Én meter fram hos førsteforsvarer ødelegger pasningsvinkler for motstanderen. Hold linjen!",
};

export const establishedDefenseCards: TeamOrganizationCard[] = [
  {
    title: "Kompakthet",
    description:
      "Kort og smalt for å krympe motstanderens tid og rom. Liten avstand i bredden, nekt rom gjennom ledd.",
  },
  {
    title: "Pumping/Dybde",
    description:
      "Leddene justerer kontinuerlig opp og ned for å kontrollere rom mellom ledd og bak forsvar.",
  },
  {
    title: "Sideforskyvning",
    description:
      "Forskyv kollektivt mot ballsiden (ballorientert forsvar). Sikrer kontroll sentralt.",
  },
  {
    title: "Prioriterte Rom",
    description: "Kontroller: Bakrom og Mellomrom sentralt.",
  },
  {
    title: "Mål",
    description: "Vinn ball, eller nekt kontrollerte fremoverpasninger.",
  },
];

export const establishedAttackCards: TeamOrganizationCard[] = [
  {
    title: "Bredde og Dybde",
    description:
      "Bruk backs og kanter for bred bane, dyp angriper for lang bane. Skaper rom i motstanderens ledd.",
  },
  {
    title: "Spillbarhet/Støtte",
    description:
      "Skap mange trekanter og linjer. Juster kontinuerlig avstand og vinkel for å gjøre deg spillbar.",
  },
  {
    title: "Bevegelse",
    description:
      "Motsatte og samtidige bevegelser skaper rom. Første bevegelse skaper rom for andre (andrebevegelse).",
  },
  {
    title: "Restforsvar (Defensiv balanse)",
    description:
      "Spillere bak ball inntar organisert posisjon for å minimere motstanderens overgangsmuligheter ved balltap.",
  },
  {
    title: "Gjennombrudd",
    description:
      "Søk gjennombrudd ofte (gjennom, over eller rundt). Se etter bakrom og mellomrom sentralt.",
  },
];

export const defensiveCornerCards: TeamOrganizationCard[] = [
  {
    title: "Markering/Dekking",
    description:
      "Velg soneforsvar (dekker rom), mann-mot-mann (dekker spillere), eller kombinasjon.",
  },
  {
    title: "Posisjonering",
    description:
      "Plasser spillere raskt mellom eget mål og motstander. Sidestilt kroppsstilling for å se ball og motstander.",
  },
  {
    title: "Stolpedekning",
    description: "Én spiller tar kontroll mellom presspiller og første stolpe.",
  },
  {
    title: "Dueller",
    description:
      "Vær først på ball, vis offervilje. \"Ta duellen før duellen\" - gå i kroppen for å fjerne fart og timing.",
  },
  {
    title: "Keeperens rolle",
    description:
      "Kommuniser press og markering, kontroller mål, vær klar for skudd og returer. (Se Corner-organisering for detaljer)",
  },
  {
    title: "Returberedskap",
    description:
      "Mange mål scores på returer. Unngå \"ball watching\", fortsett markering til situasjonen er avklart.",
  },
];

export const offensiveCornerCards: TeamOrganizationCard[] = [
  {
    title: "Bokskraft/Dybde",
    description:
      "Spillere med kraft og kløkt i boksen. Avsluttere søker rom bak forsvarslinje.",
  },
  {
    title: "Løp og Timing",
    description:
      "Bruk blindsideløp (rom bak nærmeste forsvarer). Timing avgjørende for å nå ball først.",
  },
  {
    title: "Avslutning",
    description: "Prioriter plassering fremfor kraft.",
  },
];
