import type { SessionBlock } from "@/store/sessionStore";

export type SessionPartBlock = {
  block: SessionBlock;
  globalIndex: number;
  sequenceNumber: number;
};

export type SessionPart = {
  key: string;
  baseKey: string;
  title: string;
  subtitle: string;
  blocks: SessionPartBlock[];
};

type SessionPartDefinition = {
  key: string;
  title: string;
  subtitle: string;
};

const getPartDefinition = (block: SessionBlock): SessionPartDefinition => {
  const category = block.exercise.category;

  if (category === "fixed-warmup") {
    return { key: "skadefri", title: "Skadefri", subtitle: "Spillerne styrer selv" };
  }

  if (category === "warmup" || category === "aktivisering") {
    return { key: "oppvarming", title: "Oppvarming", subtitle: "Valgfri" };
  }

  if (category === "rondo") {
    return { key: "rondo", title: "Rondo", subtitle: "Valgfri" };
  }

  if (category === "station") {
    return { key: "stasjoner", title: "Stasjoner", subtitle: "" };
  }

  if (category === "game") {
    return { key: "spill", title: "Spill", subtitle: "" };
  }

  if (category === "cooldown" && block.exercise.theme === "styrke") {
    return { key: "styrke", title: "Styrke", subtitle: "Valgfri" };
  }

  return { key: "avslutning", title: "Avslutning", subtitle: "Restitusjon og evaluering" };
};

export const buildSessionParts = (
  sessionBlocks: SessionBlock[],
  playerCount: number
): SessionPart[] => {
  const parts: SessionPart[] = [];

  sessionBlocks.forEach((block, globalIndex) => {
    const definition = getPartDefinition(block);
    const previousBlock = globalIndex > 0 ? sessionBlocks[globalIndex - 1] : null;
    const previousPart = parts[parts.length - 1];
    const startsNewStationRound =
      definition.key === "stasjoner" &&
      block.stationRoundStart === true &&
      previousBlock?.exercise.category === "station";

    const shouldStartNewPart =
      !previousPart || previousPart.baseKey !== definition.key || startsNewStationRound;

    if (shouldStartNewPart) {
      parts.push({
        key: `${definition.key}-${parts.length + 1}`,
        baseKey: definition.key,
        title: definition.title,
        subtitle: definition.subtitle,
        blocks: [],
      });
    }

    parts[parts.length - 1].blocks.push({
      block,
      globalIndex,
      sequenceNumber: globalIndex + 1,
    });
  });

  const countsByBaseKey = new Map<string, number>();
  parts.forEach((part) => {
    countsByBaseKey.set(part.baseKey, (countsByBaseKey.get(part.baseKey) ?? 0) + 1);
  });

  const seenByBaseKey = new Map<string, number>();

  parts.forEach((part) => {
    const repeatCount = countsByBaseKey.get(part.baseKey) ?? 0;
    const index = (seenByBaseKey.get(part.baseKey) ?? 0) + 1;
    seenByBaseKey.set(part.baseKey, index);

    if (repeatCount > 1) {
      part.title = `${part.title} ${index}`;
    }

    if (part.baseKey === "stasjoner") {
      const stationCount = part.blocks.length;
      if (stationCount > 0) {
        const playersPerStation = Math.floor(playerCount / stationCount);
        part.subtitle = `${stationCount} stasjon${stationCount > 1 ? "er" : ""} · ${playersPerStation} spillere per stasjon`;
      }
    }
  });

  return parts;
};

export const getStationPlanSummary = (parts: SessionPart[]) => {
  const stationCounts = parts
    .filter((part) => part.baseKey === "stasjoner")
    .map((part) => part.blocks.length)
    .filter((count) => count > 0);

  if (stationCounts.length === 0) return null;
  if (stationCounts.length === 1) {
    return `${stationCounts[0]} stasjon${stationCounts[0] > 1 ? "er" : ""}`;
  }

  return `${stationCounts.join(" + ")} stasjoner`;
};