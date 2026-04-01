import type { Exercise } from "@/data/exercises";
import { getExplicitSectionNumber, getStationSectionInfoByNumber, getTrailingStationSectionInfo, normalizeStationSectionMetadata, buildTimelineSections } from "./sessionSections";
import { getOutfieldPlayerCount, getSectionPlayerCounts } from "./sessionPlayerCounts";
import type { PlanningSectionMode, PlanningSectionTarget, SessionBlock } from "./sessionStore";

export type ActivePlanningSection = {
  sectionNumber: number;
  playerCounts: number[];
  selectedCount: number;
  requiredCount: number;
  isComplete: boolean;
};

export const getActivePlanningSection = ({
  sessionBlocks,
  playerCount,
  keeperCount = 0,
  planningSectionMode,
  stationCount,
  planningSectionTarget = "auto",
}: {
  sessionBlocks: SessionBlock[];
  playerCount: number;
  keeperCount?: number;
  planningSectionMode: PlanningSectionMode;
  stationCount: number;
  planningSectionTarget?: PlanningSectionTarget;
}): ActivePlanningSection => {
  const completedSections = buildTimelineSections(sessionBlocks).length;
  const outfieldPlayerCount = getOutfieldPlayerCount(playerCount, keeperCount);

  if (planningSectionMode === "single") {
    return {
      sectionNumber: completedSections + 1,
      playerCounts: [outfieldPlayerCount],
      selectedCount: 0,
      requiredCount: 1,
      isComplete: false,
    };
  }

  const configuredCount = Math.max(2, Math.min(4, stationCount));
  const explicitSectionNumber = getExplicitSectionNumber(planningSectionTarget);

  if (planningSectionTarget === "next-section") {
    return {
      sectionNumber: completedSections + 1,
      playerCounts: getSectionPlayerCounts(playerCount, "stations", configuredCount, keeperCount),
      selectedCount: 0,
      requiredCount: configuredCount,
      isComplete: false,
    };
  }

  if (explicitSectionNumber !== null) {
    const explicitSection = getStationSectionInfoByNumber(sessionBlocks, explicitSectionNumber);
    if (explicitSection) {
      return {
        sectionNumber: explicitSection.sectionNumber,
        playerCounts: getSectionPlayerCounts(
          playerCount,
          "stations",
          explicitSection.requiredCount,
          keeperCount
        ),
        selectedCount: explicitSection.selectedCount,
        requiredCount: explicitSection.requiredCount,
        isComplete: explicitSection.isComplete,
      };
    }
  }

  const trailingStationSection = getTrailingStationSectionInfo(sessionBlocks);
  const trailingRequiredCount = trailingStationSection?.requiredCount ?? configuredCount;
  const trailingCount = trailingStationSection?.count ?? 0;
  const selectedCount =
    trailingCount > 0 && trailingCount < trailingRequiredCount ? trailingCount : 0;
  const requiredCount = selectedCount > 0 ? trailingRequiredCount : configuredCount;

  return {
    sectionNumber: completedSections + (selectedCount > 0 ? 0 : 1),
    playerCounts: getSectionPlayerCounts(playerCount, "stations", requiredCount, keeperCount),
    selectedCount,
    requiredCount,
    isComplete: selectedCount === 0,
  };
};

export const appendBlockForPlanningSection = ({
  blocks,
  exercise,
  planningSectionMode,
  stationCount,
  planningSectionTarget,
}: {
  blocks: SessionBlock[];
  exercise: Exercise;
  planningSectionMode: PlanningSectionMode;
  stationCount: number;
  planningSectionTarget: PlanningSectionTarget;
}): SessionBlock[] => {
  if (planningSectionMode === "single") {
    return [
      ...blocks,
      {
        id: exercise.id,
        exercise,
        planningMode: "single",
        sectionStationCount: undefined,
      },
    ];
  }

  const normalizedStationCount = Math.max(2, Math.min(4, stationCount));
  const explicitSectionNumber = getExplicitSectionNumber(planningSectionTarget);

  if (explicitSectionNumber !== null) {
    const explicitSection = getStationSectionInfoByNumber(blocks, explicitSectionNumber);

    if (explicitSection && explicitSection.selectedCount < explicitSection.requiredCount) {
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(explicitSection.endIndex + 1, 0, {
        id: exercise.id,
        exercise,
        planningMode: "station",
        sectionStationCount: explicitSection.requiredCount,
      });

      return normalizeStationSectionMetadata(updatedBlocks) ?? updatedBlocks;
    }
  }

  const trailingStationSection = getTrailingStationSectionInfo(blocks);
  const trailingCount = trailingStationSection?.count ?? 0;
  const trailingRequiredCount = trailingStationSection?.requiredCount ?? normalizedStationCount;
  const shouldStartNewStationRound =
    planningSectionTarget === "next-section" ||
    trailingCount === 0 || trailingCount >= trailingRequiredCount;
  const previousBlock = blocks.at(-1);

  return [
    ...blocks,
    {
      id: exercise.id,
      exercise,
      planningMode: "station",
      sectionStationCount: normalizedStationCount,
      stationRoundStart:
        shouldStartNewStationRound && previousBlock ? true : undefined,
    },
  ];
};