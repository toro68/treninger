import { getSectionPlayerCounts, type SessionBlock } from "@/store/sessionStore";

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
  sectionComment?: string;
  blocks: SessionPartBlock[];
};

const getPartBaseKey = (block: SessionBlock) => {
  if (block.planningMode === "station") {
    return "stasjoner";
  }

  const category = block.exercise.category;

  if (category === "fixed-warmup") {
    return "skadefri";
  }

  if (block.planningMode !== "single" && category === "station") {
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
    const previousBaseKey = previousBlock ? getPartBaseKey(previousBlock) : null;
    const previousPart = parts[parts.length - 1];
    const startsNewStationRound =
      baseKey === "stasjoner" &&
      block.stationRoundStart === true &&
      previousBaseKey === "stasjoner";

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
        sectionComment: undefined,
        blocks: [],
      });
    }

    parts[parts.length - 1].blocks.push({
      block,
      globalIndex,
    });
  });

  parts.forEach((part) => {
    part.sectionComment = part.blocks
      .map(({ block }) => block.sectionComment?.trim())
      .find((comment): comment is string => !!comment);

    if (part.baseKey === "skadefri") {
      part.title = `${part.orderNumber}. Skadefri`;
      part.subtitle = "Spillerne styrer selv";
      return;
    }

    if (part.baseKey === "stasjoner") {
      part.title = `${part.orderNumber}. Stasjoner`;
      const stationCount = part.blocks[0]?.block.sectionStationCount ?? part.blocks.length;
      if (stationCount > 0) {
        const playerCounts = getSectionPlayerCounts(playerCount, "stations", stationCount);
        const splitLabel =
          new Set(playerCounts).size === 1
            ? `${playerCounts[0]} spillere per stasjon`
            : `${playerCounts.join(" + ")} spillere`;
        part.subtitle = `${stationCount} stasjon${stationCount > 1 ? "er" : ""} · ${splitLabel}`;
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
    .map((part) => part.blocks[0]?.block.sectionStationCount ?? part.blocks.length)
    .filter((count) => count > 0);

  if (stationCounts.length === 0) return null;
  if (stationCounts.length === 1) {
    return `${stationCounts[0]} stasjon${stationCounts[0] > 1 ? "er" : ""}`;
  }

  return `${stationCounts.join(" + ")} stasjoner`;
};