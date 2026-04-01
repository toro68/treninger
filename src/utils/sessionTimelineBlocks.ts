import type { SessionBlock } from "@/store/sessionStore";
import { isStationPlanningBlock } from "@/store/sessionSections";
import type { SessionPart } from "@/utils/sessionParts";

export const updateSessionBlockAtIndex = (
  blocks: SessionBlock[],
  index: number,
  updater: (block: SessionBlock) => SessionBlock
) => blocks.map((block, currentIndex) => (currentIndex === index ? updater(block) : block));

export const applySectionCommentToBlocks = (
  blocks: SessionBlock[],
  part: SessionPart,
  value: string
) => {
  const blockIndexes = new Set(part.blocks.map(({ globalIndex }) => globalIndex));
  const normalizedValue = value.trim() ? value : undefined;

  return blocks.map((block, index) =>
    blockIndexes.has(index)
      ? {
          ...block,
          sectionComment: normalizedValue,
        }
      : block
  );
};

export const addAlternativeExerciseToBlock = (
  blocks: SessionBlock[],
  index: number,
  alternativeExerciseId: string
) => {
  if (!alternativeExerciseId) return blocks;

  return blocks.map((block, currentIndex) => {
    if (currentIndex !== index) return block;
    const nextIds = new Set(block.alternativeExerciseIds ?? []);
    nextIds.add(alternativeExerciseId);

    return {
      ...block,
      alternativeExerciseIds: [...nextIds],
    };
  });
};

export const removeAlternativeExerciseFromBlock = (
  blocks: SessionBlock[],
  index: number,
  alternativeExerciseId: string
) =>
  blocks.map((block, currentIndex) => {
    if (currentIndex !== index) return block;
    const nextIds = (block.alternativeExerciseIds ?? []).filter(
      (id) => id !== alternativeExerciseId
    );

    return {
      ...block,
      alternativeExerciseIds: nextIds.length > 0 ? nextIds : undefined,
    };
  });

export const reorderSessionBlocks = (
  blocks: SessionBlock[],
  fromIndex: number,
  toIndex: number
) => {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= blocks.length || toIndex >= blocks.length) {
    return blocks;
  }

  const updated = [...blocks];
  const [moved] = updated.splice(fromIndex, 1);
  updated.splice(toIndex, 0, moved);
  return updated;
};

export const toggleCoachAssignmentForBlock = (
  blocks: SessionBlock[],
  index: number,
  coachName: string
) =>
  updateSessionBlockAtIndex(blocks, index, (block) => {
    const nextCoachNames = new Set(block.assignedCoachNames ?? []);
    if (nextCoachNames.has(coachName)) {
      nextCoachNames.delete(coachName);
    } else {
      nextCoachNames.add(coachName);
    }

    const assignedCoachNames = [...nextCoachNames];
    return {
      ...block,
      assignedCoachNames: assignedCoachNames.length > 0 ? assignedCoachNames : undefined,
    };
  });

export const toggleStationRoundStartForBlock = (
  blocks: SessionBlock[],
  index: number
) => {
  const block = blocks[index];
  const previousBlock = blocks[index - 1];

  if (!isStationPlanningBlock(block) || !isStationPlanningBlock(previousBlock)) {
    return blocks;
  }

  return updateSessionBlockAtIndex(blocks, index, (currentBlock) => ({
    ...currentBlock,
    stationRoundStart: currentBlock.stationRoundStart ? undefined : true,
  }));
};

export const removeSessionBlockAtIndex = (blocks: SessionBlock[], index: number) =>
  blocks.filter((_, currentIndex) => currentIndex !== index);