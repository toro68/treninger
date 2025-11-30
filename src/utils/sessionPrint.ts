import { getExerciseCode } from "@/data/exercises";
import { getUnit, recommendedDuration, SessionBlock } from "@/store/sessionStore";

export type PrintablePart = {
  title: string;
  subtitle?: string;
  blocks: SessionBlock[];
};

const buildSectionMarkup = (part: PrintablePart) => {
  if (part.blocks.length === 0) {
    return "";
  }

  const exercisesMarkup = part.blocks
    .map((block) => {
      const duration = recommendedDuration(block);
      const unit = getUnit(block);
      const code = getExerciseCode(block.exercise);
      const equipment = block.exercise.equipment.join(", ");

      const coachingPoints = block.exercise.coachingPoints
        .map((point) => `<li>${point}</li>`)
        .join("");

      const variations = block.exercise.variations
        .map((variation) => `<li>${variation}</li>`)
        .join("");

      return `
        <div class="exercise">
          <div class="exercise-name">
            <span class="code">${code}</span>
            ${block.exercise.name}
          </div>
          <div class="exercise-meta">
            ${duration} ${unit} • ${block.exercise.playersMin}-${block.exercise.playersMax} spillere • ${block.exercise.theme}${
              equipment ? ` • ${equipment}` : ""
            }
          </div>
          <div class="exercise-desc">${block.exercise.description}</div>
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
  .exercise-meta { font-size: 12px; color: #6b7280; margin-bottom: 8px; }
  .exercise-desc { font-size: 13px; line-height: 1.35; }
  .coaching, .variations { margin-top: 10px; font-size: 12px; }
  .coaching-title { font-weight: 600; color: #374151; display: inline-block; margin-bottom: 2px; }
  ul { margin: 0 0 0 18px; padding: 0; }
  ul li { margin-bottom: 2px; }
  @media print { body { padding: 20px; } }
`;

export const buildPrintDocument = ({
  parts,
  totalMinutes,
  playerCount,
}: {
  parts: PrintablePart[];
  totalMinutes: number;
  playerCount: number;
}) => {
  const sections = parts.map(buildSectionMarkup).join("");

  return `
    <!DOCTYPE html>
    <html lang="no">
      <head>
        <meta charSet="utf-8" />
        <title>Treningsøkt</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <h1>Treningsøkt</h1>
        <div class="meta">${totalMinutes} minutter • ${playerCount} spillere</div>
        ${sections}
      </body>
    </html>
  `;
};

export const openPrintWindowForSession = (params: {
  parts: PrintablePart[];
  totalMinutes: number;
  playerCount: number;
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
