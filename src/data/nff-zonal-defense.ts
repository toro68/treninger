export type NffZonalDefenseRoleId = "1f" | "2f" | "3f";

export type NffZonalDefenseRole = {
  id: NffZonalDefenseRoleId;
  title: string;
  description: string;
};

export const NFF_ZONAL_DEFENSE_ROLES: Record<NffZonalDefenseRoleId, NffZonalDefenseRole> = {
  "1f": {
    id: "1f",
    title: "Førsteforsvarer (1F) = Signalspiller",
    description:
      "Spilleren nærmest ballfører er førsteforsvarer - den viktigste spilleren i soneforsvaret. Din handling definerer hva resten av laget skal gjøre.",
  },
  "2f": {
    id: "2f",
    title: "Andreforsvarer (2F) = Sikring",
    description: "Nærmeste spiller til førsteforsvarer. Sikrer på rett side eller dekker rom.",
  },
  "3f": {
    id: "3f",
    title: "Tredjeforsvarer = Romkontroll",
    description: "Alle andre spillere på forsvarslaget. Dekker rom og/eller tar ut definerte angrepsspillere.",
  },
};

export const NFF_ZONAL_DEFENSE_LEADING = {
  sideline: {
    title: "Sidelinja er førsteforsvarerens beste venn",
    description:
      "Der er det trangest, og mulighetene for ballvinning øker. Hovedregel: Led ballfører ut mot sidelinja.",
  },
  curveRun: {
    title: "Bueløp - ikke rett på!",
    description:
      "Ta korteste vei mot førsteangriper, MEN: Bruk bueløp for å stenge rommet du vil beskytte.",
    example: 'Ønsker du ikke pasning på yttersiden/kanten? → Led inn med bueløp.',
  },
  leadIn: {
    title: "Led INN når:",
    bullets: ["Du har sikring på innsiden", "Dere er i overtall inne", "Du vil nekte ytterside-pasning"],
  },
  leadOut: {
    title: "Led UT når:",
    bullets: ["Du er alene uten sikring", "Dere er i undertall sentralt", "Lede vekk fra dominant motstander"],
  },
} as const;

