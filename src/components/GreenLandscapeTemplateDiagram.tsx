"use client";

import { twMerge } from "tailwind-merge";

export interface GreenLandscapeTemplateDiagramProps {
  className?: string;
}

/**
 * Mal: helt grønn, liggende (samme dimensjon som øvrige maler: 800x420).
 * Ingen banelinjer – kun bakgrunn.
 */
export const GreenLandscapeTemplateDiagram = ({ className }: GreenLandscapeTemplateDiagramProps) => {
  const width = 800;
  const height = 420;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="green-landscape-template-title"
      className={twMerge("w-full h-auto", className)}
    >
      <title id="green-landscape-template-title">Helt grønn mal (liggende)</title>
      <rect width={width} height={height} rx={24} fill="#226030" />
    </svg>
  );
};
