import { Exercise, getExerciseCode } from "@/data/exercises";
import { getUnit, recommendedDuration, SessionBlock } from "@/store/sessionStore";

export type PrintablePart = {
  title: string;
  subtitle?: string;
  baseKey?: string;
  blocks: SessionBlock[];
};

const resolveAlternativeExercises = (
  block: SessionBlock,
  exerciseLibrary: Exercise[]
) =>
  (block.alternativeExerciseIds ?? [])
    .map((id) => exerciseLibrary.find((exercise) => exercise.id === id))
    .filter((exercise): exercise is Exercise => !!exercise);

const buildSectionMarkup = (part: PrintablePart, exerciseLibrary: Exercise[]) => {
  if (part.blocks.length === 0) {
    return "";
  }

  const exercisesMarkup = part.blocks
    .map((block, index) => {
      const duration = recommendedDuration(block);
      const unit = getUnit(block);
      const code = getExerciseCode(block.exercise);
      const title = block.customTitle?.trim() || block.exercise.name;
      const comment = block.customComment?.trim();
      const equipment = block.exercise.equipment.join(", ");
      const alternativeExercises = resolveAlternativeExercises(block, exerciseLibrary);
      const assignedCoaches = (block.assignedCoachNames ?? [])
        .map((coachName) => `<span class="coach-tag">${coachName}</span>`)
        .join("");

      const coachingPoints = block.exercise.coachingPoints
        .map((point) => `<li>${point}</li>`)
        .join("");

      const variations = block.exercise.variations
        .map((variation) => `<li>${variation}</li>`)
        .join("");

      const alternatives = alternativeExercises
        .map(
          (exercise) =>
            `<li><span class="code">${getExerciseCode(exercise)}</span> ${exercise.name}</li>`
        )
        .join("");

      const stationLabel =
        part.baseKey === "stasjoner"
          ? `<div class="station-label">Stasjon ${index + 1}</div>`
          : "";

      return `
        <div class="exercise">
          <div class="exercise-name">
            <span class="code">${code}</span>
            ${title}
          </div>
          ${stationLabel}
          ${title !== block.exercise.name ? `<div class="exercise-origin">Basert på: ${block.exercise.name}</div>` : ""}
          ${assignedCoaches ? `<div class="coach-list">${assignedCoaches}</div>` : ""}
          <div class="exercise-meta">
            ${duration} ${unit} • ${block.exercise.playersMin}-${block.exercise.playersMax} spillere • ${block.exercise.theme}${
              equipment ? ` • ${equipment}` : ""
            }
          </div>
          <div class="exercise-desc">${block.exercise.description}</div>
          ${comment ? `<div class="exercise-comment"><span class="coaching-title">Kommentar:</span> ${comment}</div>` : ""}
          ${
            coachingPoints
              ? `
                <div class="coaching">
                  <span class="coaching-title">Coaching:</span>
                  <ul>${coachingPoints}</ul>
                </div>
              `
              : ""
          }
          ${
            variations
              ? `
                <div class="variations">
                  <span class="coaching-title">Variasjoner:</span>
                  <ul>${variations}</ul>
                </div>
              `
              : ""
          }
          ${
            alternatives
              ? `
                <div class="alternatives">
                  <span class="coaching-title">Alternative øvelser:</span>
                  <ul>${alternatives}</ul>
                </div>
              `
              : ""
          }
        </div>
      `;
    })
    .join("");

  return `
    <div class="section">
      <div class="section-title">
        <span>${part.title}</span>
        ${part.subtitle ? `<small>${part.subtitle}</small>` : ""}
      </div>
      ${exercisesMarkup}
    </div>
  `;
};

const baseStyles = `
  body { font-family: system-ui, -apple-system, sans-serif; padding: 32px; max-width: 900px; margin: 0 auto; color: #111827; background: #fff; }
  h1 { font-size: 24px; margin-bottom: 4px; }
  .meta { color: #6b7280; font-size: 14px; margin-bottom: 24px; }
  .section { margin-bottom: 32px; }
  .section-title { font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; display: flex; justify-content: space-between; align-items: baseline; }
  .section-title small { font-size: 12px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.02em; }
  .exercise { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
  .exercise-name { font-weight: 600; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
  .exercise-name .code { display: inline-flex; align-items: center; justify-content: center; min-width: 32px; padding: 2px 8px; font-size: 11px; text-transform: uppercase; border-radius: 999px; background: #e5e7eb; color: #374151; }
  .station-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #6b7280; margin-bottom: 8px; }
  .exercise-meta { font-size: 12px; color: #6b7280; margin-bottom: 8px; }
  .exercise-origin { font-size: 12px; color: #6b7280; margin-bottom: 8px; }
  .coach-list { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
  .coach-tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 999px; background: #e0f2fe; color: #0f172a; font-size: 11px; font-weight: 600; }
  .exercise-desc { font-size: 13px; line-height: 1.35; }
  .exercise-comment, .coaching, .variations, .alternatives { margin-top: 10px; font-size: 12px; }
  .coaching-title { font-weight: 600; color: #374151; display: inline-block; margin-bottom: 2px; }
  .alternatives .code { display: inline-flex; align-items: center; justify-content: center; min-width: 28px; margin-right: 6px; padding: 1px 6px; font-size: 10px; text-transform: uppercase; border-radius: 999px; background: #e5e7eb; color: #374151; }
  ul { margin: 0 0 0 18px; padding: 0; }
  ul li { margin-bottom: 2px; }
  @media print { body { padding: 20px; } }
`;

export const buildPrintDocument = ({
  parts,
  sessionTitle,
  sessionComment,
  totalMinutes,
  playerCount,
  exerciseLibrary,
}: {
  parts: PrintablePart[];
  sessionTitle?: string;
  sessionComment?: string;
  totalMinutes: number;
  playerCount: number;
  exerciseLibrary: Exercise[];
}) => {
  const sections = parts.map((part) => buildSectionMarkup(part, exerciseLibrary)).join("");
  const title = sessionTitle?.trim() || "Treningsøkt";
  const comment = sessionComment?.trim();

  return `
    <!DOCTYPE html>
    <html lang="no">
      <head>
        <meta charSet="utf-8" />
        <title>${title}</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="meta">${totalMinutes} minutter • ${playerCount} spillere</div>
        ${comment ? `<div class="meta">${comment}</div>` : ""}
        ${sections}
      </body>
    </html>
  `;
};

export const openPrintWindowForSession = (params: {
  parts: PrintablePart[];
  sessionTitle?: string;
  sessionComment?: string;
  totalMinutes: number;
  playerCount: number;
  exerciseLibrary: Exercise[];
}) => {
  if (typeof window === "undefined") return;
  if (params.parts.length === 0) return;

  const markup = buildPrintDocument(params);
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    throw new Error("Kunne ikke åpne utskriftsvindu");
  }

  printWindow.document.write(markup);
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
};
