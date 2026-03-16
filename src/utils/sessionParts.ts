import type { SessionBlock } from "@/store/sessionStore";

export type SessionPartBlock = {
  block: SessionBlock;
  globalIndex: number;
};

export type SessionPart = {
  key: string;
  baseKey: string;
  orderNumber: number;
  title: string;
  subtitle: string;
  blocks: SessionPartBlock[];
};

const getPartBaseKey = (block: SessionBlock) => {
  const category = block.exercise.category;

  if (category === "fixed-warmup") {
    return "skadefri";
  }

  if (category === "station") {
    return "stasjoner";
  }

  return "ovelse";
};

export const buildSessionParts = (
  sessionBlocks: SessionBlock[],
  playerCount: number
): SessionPart[] => {
  const parts: SessionPart[] = [];

  sessionBlocks.forEach((block, globalIndex) => {
    const baseKey = getPartBaseKey(block);
    const previousBlock = globalIndex > 0 ? sessionBlocks[globalIndex - 1] : null;
    const previousPart = parts[parts.length - 1];
    const startsNewStationRound =
      baseKey === "stasjoner" &&
      block.stationRoundStart === true &&
      previousBlock?.exercise.category === "station";

    const shouldStartNewPart =
      !previousPart || previousPart.baseKey !== baseKey || startsNewStationRound || baseKey === "ovelse";

    if (shouldStartNewPart) {
      const orderNumber = parts.length + 1;
      parts.push({
        key: `${baseKey}-${orderNumber}`,
        baseKey,
        orderNumber,
        title: "",
        subtitle: "",
        blocks: [],
      });
    }

    parts[parts.length - 1].blocks.push({
      block,
      globalIndex,
    });
  });

  parts.forEach((part) => {
    if (part.baseKey === "skadefri") {
      part.title = `${part.orderNumber}. Skadefri`;
      part.subtitle = "Spillerne styrer selv";
      return;
    }

    if (part.baseKey === "stasjoner") {
      part.title = `${part.orderNumber}. Stasjoner`;
      const stationCount = part.blocks.length;
      if (stationCount > 0) {
        const playersPerStation = Math.floor(playerCount / stationCount);
        part.subtitle = `${stationCount} stasjon${stationCount > 1 ? "er" : ""} · ${playersPerStation} spillere per stasjon`;
      }
      return;
    }

    part.title = `${part.orderNumber}. Øvelse`;
    part.subtitle = "Samme for alle";
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