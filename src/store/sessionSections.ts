import type { PlanningSectionTarget, SessionBlock } from "./sessionStore";

export type StationSectionInfo = {
  sectionNumber: number;
  startIndex: number;
  endIndex: number;
  selectedCount: number;
  requiredCount: number;
  isComplete: boolean;
};

export const isStationPlanningBlock = (block?: SessionBlock | null) =>
  !!block &&
  (block.planningMode === "station" ||
    (block.planningMode === undefined && block.exercise.category === "station"));

const normalizeStationSectionCount = (count: unknown) =>
  typeof count === "number" ? Math.max(2, Math.min(4, count)) : undefined;

export const getExplicitSectionNumber = (target: PlanningSectionTarget) => {
  if (!target.startsWith("section-")) return null;
  const sectionNumber = Number(target.slice("section-".length));
  return Number.isInteger(sectionNumber) && sectionNumber > 0 ? sectionNumber : null;
};

export const normalizeStationSectionMetadata = (
  blocks: SessionBlock[] | null
): SessionBlock[] | null => {
  if (!blocks || blocks.length === 0) return blocks;

  let currentRequiredCount: number | undefined;
  let currentSectionLength = 0;
  let previousWasStation = false;

  return blocks.map<SessionBlock>((block, index) => {
    const isStationBlock = isStationPlanningBlock(block);

    if (!isStationBlock) {
      previousWasStation = false;
      currentRequiredCount = undefined;
      currentSectionLength = 0;

      return {
        ...block,
        sectionStationCount: undefined,
        stationRoundStart: undefined,
      };
    }

    const requestedCount = normalizeStationSectionCount(block.sectionStationCount);
    const shouldStartNewSection =
      !previousWasStation ||
      block.stationRoundStart === true ||
      (currentRequiredCount !== undefined && currentSectionLength >= currentRequiredCount) ||
      (requestedCount !== undefined &&
        currentRequiredCount !== undefined &&
        requestedCount !== currentRequiredCount);

    if (shouldStartNewSection) {
      currentRequiredCount = requestedCount ?? currentRequiredCount ?? 2;
      currentSectionLength = 0;
    }

    currentSectionLength += 1;
    previousWasStation = true;

    return {
      ...block,
      planningMode: "station",
      sectionStationCount: currentRequiredCount,
      stationRoundStart: shouldStartNewSection && index > 0 ? true : undefined,
    };
  });
};

export const getTrailingStationSectionInfo = (blocks: SessionBlock[]) => {
  let count = 0;
  let requiredCount: number | undefined;

  for (let index = blocks.length - 1; index >= 0; index -= 1) {
    const block = blocks[index];
    if (!isStationPlanningBlock(block)) {
      break;
    }

    count += 1;
    if (requiredCount === undefined && typeof block.sectionStationCount === "number") {
      requiredCount = Math.max(2, Math.min(4, block.sectionStationCount));
    }
    if (block.stationRoundStart) {
      break;
    }
  }

  if (count === 0) return null;

  return {
    count,
    requiredCount: requiredCount ?? count,
  };
};

export const retuneTrailingStationSectionCount = (
  blocks: SessionBlock[] | null,
  stationCount: number
) => {
  if (!blocks || blocks.length === 0) return blocks;

  const normalizedStationCount = Math.max(2, Math.min(4, stationCount));
  const trailingSection = getTrailingStationSectionInfo(blocks);

  if (!trailingSection || trailingSection.count >= trailingSection.requiredCount) {
    return blocks;
  }

  const startIndex = blocks.length - trailingSection.count;

  return normalizeStationSectionMetadata(
    blocks.map((block, index) => {
      if (index < startIndex) return block;

      return {
        ...block,
        planningMode: "station",
        sectionStationCount: normalizedStationCount,
      };
    })
  );
};

export const buildTimelineSections = (sessionBlocks: SessionBlock[]) => {
  const sections: SessionBlock[][] = [];

  sessionBlocks.forEach((block) => {
    const isStationBlock = isStationPlanningBlock(block);
    const previousSection = sections.at(-1);
    const previousBlock = previousSection?.at(-1);
    const previousWasStation = isStationPlanningBlock(previousBlock);

    if (
      !previousSection ||
      !isStationBlock ||
      !previousWasStation ||
      block.stationRoundStart
    ) {
      sections.push([block]);
      return;
    }

    previousSection.push(block);
  });

  return sections;
};

export const getStationSectionInfos = (
  sessionBlocks: SessionBlock[]
): StationSectionInfo[] => {
  const sections = buildTimelineSections(sessionBlocks);
  const stationSections: StationSectionInfo[] = [];
  let startIndex = 0;

  sections.forEach((sectionBlocks, index) => {
    const endIndex = startIndex + sectionBlocks.length - 1;
    const firstBlock = sectionBlocks[0];
    const isStationSection = isStationPlanningBlock(firstBlock);

    if (isStationSection && firstBlock) {
      const requiredCount =
        normalizeStationSectionCount(firstBlock.sectionStationCount) ?? sectionBlocks.length;

      stationSections.push({
        sectionNumber: index + 1,
        startIndex,
        endIndex,
        selectedCount: sectionBlocks.length,
        requiredCount,
        isComplete: sectionBlocks.length >= requiredCount,
      });
    }

    startIndex = endIndex + 1;
  });

  return stationSections;
};

export const getStationSectionInfoByNumber = (
  sessionBlocks: SessionBlock[],
  sectionNumber: number
) =>
  getStationSectionInfos(sessionBlocks).find(
    (section) => section.sectionNumber === sectionNumber
  ) ?? null;
