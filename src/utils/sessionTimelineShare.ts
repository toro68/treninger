import { Exercise, getExerciseCode } from "@/data/exercises";
import { getUnit, recommendedDuration, type SessionBlock } from "@/store/sessionStore";
import type { SessionPart } from "@/utils/sessionParts";
import type { PrintablePart } from "@/utils/sessionPrint";

export const SESSION_COMMENT_SUGGESTION =
  "Forslag til øvelser, men som vanlig er det fritt fram å endre på ting og velge andre øvelser på stasjonene.";

type ClipboardCapableNavigator = Navigator & {
  clipboard?: Pick<Clipboard, "writeText">;
};

export const hasSessionCommentSuggestion = (comment: string) =>
  comment.includes(SESSION_COMMENT_SUGGESTION);

export const toggleSessionCommentSuggestion = (comment: string, enabled: boolean) => {
  const normalizedComment = comment.trim();

  if (enabled) {
    if (hasSessionCommentSuggestion(normalizedComment)) return comment;
    return normalizedComment
      ? `${normalizedComment}\n\n${SESSION_COMMENT_SUGGESTION}`
      : SESSION_COMMENT_SUGGESTION;
  }

  if (!hasSessionCommentSuggestion(normalizedComment)) return comment;

  return normalizedComment
    .replace(`\n\n${SESSION_COMMENT_SUGGESTION}`, "")
    .replace(`${SESSION_COMMENT_SUGGESTION}\n\n`, "")
    .replace(SESSION_COMMENT_SUGGESTION, "")
    .trim();
};

const fallbackCopyText = (text: string) => {
  if (typeof document === "undefined") return false;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }

  return copied;
};

export const copyTextToClipboard = async (text: string) => {
  const nav =
    typeof navigator !== "undefined"
      ? (navigator as ClipboardCapableNavigator)
      : undefined;

  if (nav?.clipboard?.writeText) {
    try {
      await nav.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopyText(text);
    }
  }

  return fallbackCopyText(text);
};

export const getAlternativeExercises = (
  block: SessionBlock,
  exerciseLibrary: Exercise[]
): Exercise[] =>
  (block.alternativeExerciseIds ?? [])
    .map((id) => exerciseLibrary.find((exercise) => exercise.id === id))
    .filter((exercise): exercise is Exercise => !!exercise);

export const buildShortSessionSummary = ({
  parts,
  exerciseLibrary,
}: {
  parts: SessionPart[];
  exerciseLibrary: Exercise[];
}) =>
  parts
    .map((part) => {
      const header = `${part.title}${part.subtitle ? ` (${part.subtitle})` : ""}`;
      const sectionComment = part.sectionComment?.trim()
        ? `\nKommentar til seksjon: ${part.sectionComment.trim()}`
        : "";
      const blockLines = part.blocks.map(({ block, globalIndex }) => {
        const title = block.customTitle?.trim() || block.exercise.name;
        const comment = block.customComment?.trim();
        const alternatives = getAlternativeExercises(block, exerciseLibrary);
        const alternativeText =
          alternatives.length > 0
            ? ` (alt: ${alternatives.map((exercise) => exercise.name).join(" / ")})`
            : "";
        const coachText =
          block.assignedCoachNames && block.assignedCoachNames.length > 0
            ? ` [ansvar: ${block.assignedCoachNames.join(", ")}]`
            : "";
        const commentText = comment ? `\n   Kommentar: ${comment}` : "";
        return `${globalIndex + 1}. [${getExerciseCode(block.exercise)}] ${title} – ${recommendedDuration(block)} ${getUnit(block)}${alternativeText}${coachText}${commentText}`;
      });

      return `${header}${sectionComment}\n${blockLines.join("\n")}`;
    })
    .join("\n\n");

export const buildFullSessionSummary = ({
  parts,
  exerciseLibrary,
}: {
  parts: SessionPart[];
  exerciseLibrary: Exercise[];
}) => {
  let result = "";

  parts.forEach((part) => {
    if (part.blocks.length === 0) return;

    result += `\n${part.title.toUpperCase()}\n`;
    result += "─".repeat(20) + "\n";
    if (part.sectionComment?.trim()) {
      result += `Kommentar til seksjon: ${part.sectionComment.trim()}\n`;
    }

    part.blocks.forEach(({ block }, blockIndex) => {
      const duration = recommendedDuration(block);
      const unit = getUnit(block);
      const title = block.customTitle?.trim() || block.exercise.name;
      const comment = block.customComment?.trim();
      const alternatives = getAlternativeExercises(block, exerciseLibrary);
      const stationLabel = part.baseKey === "stasjoner" ? `Stasjon ${blockIndex + 1}: ` : "";
      result += `\n${stationLabel}[${getExerciseCode(block.exercise)}] ${title} (${duration} ${unit})\n`;
      if (title !== block.exercise.name) {
        result += `Basert på: ${block.exercise.name}\n`;
      }
      if (block.assignedCoachNames?.length) {
        result += `Ansvar: ${block.assignedCoachNames.join(", ")}\n`;
      }
      if (block.exercise.description.trim()) {
        result += `${block.exercise.description}\n`;
      }
      if (comment) {
        result += `\nKommentar:\n${comment}\n`;
      }

      if (block.exercise.coachingPoints.length > 0) {
        result += "\nCoaching:\n";
        block.exercise.coachingPoints.forEach((point) => {
          result += `• ${point}\n`;
        });
      }

      if (block.exercise.variations.length > 0) {
        result += "\nVariasjoner:\n";
        block.exercise.variations.forEach((variation) => {
          result += `• ${variation}\n`;
        });
      }

      if (alternatives.length > 0) {
        result += "\nAlternative øvelser:\n";
        alternatives.forEach((exercise) => {
          result += `• [${getExerciseCode(exercise)}] ${exercise.name}\n`;
        });
      }
    });
  });

  return result;
};

export const buildSessionShareText = ({
  sessionTitle,
  sessionComment,
  totalMinutes,
  playerSummary,
  summary,
}: {
  sessionTitle: string;
  sessionComment: string;
  totalMinutes: number;
  playerSummary: string;
  summary: string;
}) => {
  const resolvedSessionTitle = sessionTitle.trim() || "Treningsøkt";
  const commentSection = sessionComment.trim() ? `${sessionComment.trim()}\n\n` : "";
  return `${resolvedSessionTitle} (${totalMinutes} min • ${playerSummary})\n${commentSection}${summary}`;
};

export const toPrintableParts = (parts: SessionPart[]): PrintablePart[] =>
  parts.map((part) => ({
    title: part.title,
    subtitle: part.subtitle,
    sectionComment: part.sectionComment,
    baseKey: part.baseKey,
    blocks: part.blocks.map(({ block }) => block),
  }));
