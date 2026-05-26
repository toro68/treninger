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
  const explicitSectionNumber = getExplicitSectionNumber(planningSectionTarget);

  if (planningSectionMode === "reserve") {
    return {
      sectionNumber: completedSections + 1,
      playerCounts: [outfieldPlayerCount],
      selectedCount: 0,
      requiredCount: 1,
      isComplete: false,
    };
  }

  if (planningSectionMode === "single") {
    if (
      explicitSectionNumber !== null &&
      explicitSectionNumber >= 1 &&
      explicitSectionNumber <= completedSections
    ) {
      return {
        sectionNumber: explicitSectionNumber,
        playerCounts: [outfieldPlayerCount],
        selectedCount: 1,
        requiredCount: 1,
        isComplete: true,
      };
    }
    return {
      sectionNumber: completedSections + 1,
      playerCounts: [outfieldPlayerCount],
      selectedCount: 0,
      requiredCount: 1,
      isComplete: false,
    };
  }

  const configuredCount = Math.max(2, Math.min(4, stationCount));

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
  if (planningSectionMode === "reserve") {
    return [
      ...blocks,
      {
        id: exercise.id,
        exercise,
        planningMode: "reserve",
        sectionStationCount: undefined,
      },
    ];
  }

  if (planningSectionMode === "single") {
    const reserveStartIndex = blocks.findIndex(
      (block) => block.planningMode === "reserve"
    );
    const insertionIndex = reserveStartIndex === -1 ? blocks.length : reserveStartIndex;
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(insertionIndex, 0, {
      id: exercise.id,
      exercise,
      planningMode: "single",
      sectionStationCount: undefined,
    });
    return updatedBlocks;
  }

  const normalizedStationCount = Math.max(2, Math.min(4, stationCount));
  const explicitSectionNumber = getExplicitSectionNumber(planningSectionTarget);
  const reserveStartIndex = blocks.findIndex(
    (block) => block.planningMode === "reserve"
  );
  const planningBlocks = reserveStartIndex === -1 ? blocks : blocks.slice(0, reserveStartIndex);
  const reserveBlocks = reserveStartIndex === -1 ? [] : blocks.slice(reserveStartIndex);

  if (explicitSectionNumber !== null) {
    const explicitSection = getStationSectionInfoByNumber(planningBlocks, explicitSectionNumber);

    if (explicitSection && explicitSection.selectedCount < explicitSection.requiredCount) {
      const updatedBlocks = [...planningBlocks];
      updatedBlocks.splice(explicitSection.endIndex + 1, 0, {
        id: exercise.id,
        exercise,
        planningMode: "station",
        sectionStationCount: explicitSection.requiredCount,
      });

      const normalized = normalizeStationSectionMetadata(updatedBlocks) ?? updatedBlocks;
      return [...normalized, ...reserveBlocks];
    }

    if (!explicitSection) {
      const sections = buildTimelineSections(planningBlocks);
      const sectionBlocks = sections[explicitSectionNumber - 1];

      if (sectionBlocks && sectionBlocks.length < normalizedStationCount) {
        const startIndex = sections
          .slice(0, explicitSectionNumber - 1)
          .reduce((sum, section) => sum + section.length, 0);
        const endIndex = startIndex + sectionBlocks.length - 1;
        const updatedBlocks = planningBlocks.map((block, index) => {
          if (index < startIndex || index > endIndex) return block;

          return {
            ...block,
            planningMode: "station" as const,
            sectionStationCount: normalizedStationCount,
          };
        });

        updatedBlocks.splice(endIndex + 1, 0, {
          id: exercise.id,
          exercise,
          planningMode: "station",
          sectionStationCount: normalizedStationCount,
        });

        const normalized = normalizeStationSectionMetadata(updatedBlocks) ?? updatedBlocks;
        return [...normalized, ...reserveBlocks];
      }
    }
  }

  const trailingStationSection = getTrailingStationSectionInfo(planningBlocks);
  const trailingCount = trailingStationSection?.count ?? 0;
  const trailingRequiredCount = trailingStationSection?.requiredCount ?? normalizedStationCount;
  const shouldStartNewStationRound =
    planningSectionTarget === "next-section" ||
    trailingCount === 0 || trailingCount >= trailingRequiredCount;
  const previousBlock = planningBlocks.at(-1);

  return [
    ...planningBlocks,
    {
      id: exercise.id,
      exercise,
      planningMode: "station",
      sectionStationCount: normalizedStationCount,
      stationRoundStart:
        shouldStartNewStationRound && previousBlock ? true : undefined,
    },
    ...reserveBlocks,
  ];
};