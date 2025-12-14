"use client";

import { twMerge } from "tailwind-merge";

export interface GreenSquareTemplateDiagramProps {
  className?: string;
}

/**
 * Mal: helt grønn, kvadratisk (420x420).
 * Ingen banelinjer – kun bakgrunn.
 */
export const GreenSquareTemplateDiagram = ({ className }: GreenSquareTemplateDiagramProps) => {
  const size = 420;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-labelledby="green-square-template-title"
      className={twMerge("w-full h-auto", className)}
    >
      <title id="green-square-template-title">Helt grønn mal (kvadrat)</title>
      <rect width={size} height={size} rx={24} fill="#226030" />
    </svg>
  );
};
