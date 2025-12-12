"use client";

import { twMerge } from "tailwind-merge";
import { getFiveMeterHeight, getPenaltyGeometry, getPitchBoxX, PITCH_MARKS } from "./diagram/pitchGeometry";

type RectZone = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  emphasis?: boolean;
};

export interface ScoringZonesTemplateDiagramProps {
  className?: string;
}

/**
 * Mal for scoringssoner (E/F/G + A/B/C/D) slik de ofte vises i analyse-skisser.
 * Dette er ment som et utgangspunkt for å lage flere sonediagrammer raskt.
 */
export const ScoringZonesTemplateDiagram = ({ className }: ScoringZonesTemplateDiagramProps) => {
  const width = 800;
  const height = 420;
  const margin = 20;

  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  // Samme "banemarkeringer" som i Innleggssoner-diagrammet, for konsistent visuell referanse
  const sixteenMeterWidth = PITCH_MARKS.sixteenMeterWidth;
  const sixteenMeterHeight = PITCH_MARKS.sixteenMeterHeight;
  const fiveMeterWidth = PITCH_MARKS.fiveMeterWidth;
  const fiveMeterHeight = getFiveMeterHeight(sixteenMeterHeight);

  const { sixteenLeft, fiveLeft, fiveRight } = getPitchBoxX(innerWidth);
  const { penaltySpotY, penaltyArcRadius, penaltyArcY, penaltyArcLeftX, penaltyArcRightX } = getPenaltyGeometry(
    innerWidth,
    sixteenMeterHeight
  );

  // Sonegeometri – matcher banelinjene (5m/16m) slik at "linjene" sitter pent
  const splitY = sixteenMeterHeight; // horisontal sonegrense mellom øvre blokk og nedre "G" (16m-linja)

  const sideGWidth = sixteenLeft; // side-G flukter med 16m-kantene
  const topRowHeight = fiveMeterHeight; // tilsvarer 5m-dybden
  const secondRowHeight = sixteenMeterHeight - fiveMeterHeight; // resten av 16m-boksen

  // Innenfor 16m: E/F på hver side (mellom 16m-kant og 5m-kant), og A/B/C/D innenfor 5m-bredden
  const flankWidth = fiveLeft - sixteenLeft;
  const cWidth = Math.round(fiveMeterWidth * 0.22);
  const abWidth = (fiveMeterWidth - cWidth) / 2;

  const zones: RectZone[] = [
    // Side G (venstre/høyre) i øvre blokk
    { id: "g-left-top", label: "G", x: 0, y: 0, width: sideGWidth, height: splitY },
    { id: "g-right-top", label: "G", x: innerWidth - sideGWidth, y: 0, width: sideGWidth, height: splitY },

    // Øverste rad i midten: E | A/B | C | A/B | E
    { id: "e-left", label: "E", x: sixteenLeft, y: 0, width: flankWidth, height: topRowHeight },
    { id: "ab-left", label: "A/B", x: fiveLeft, y: 0, width: abWidth, height: topRowHeight, emphasis: true },
    { id: "c", label: "C", x: fiveLeft + abWidth, y: 0, width: cWidth, height: topRowHeight, emphasis: true },
    { id: "ab-right", label: "A/B", x: fiveLeft + abWidth + cWidth, y: 0, width: abWidth, height: topRowHeight, emphasis: true },
    { id: "e-right", label: "E", x: fiveRight, y: 0, width: flankWidth, height: topRowHeight },

    // Rad 2 i midten: F | D | F
    { id: "f-left", label: "F", x: sixteenLeft, y: topRowHeight, width: flankWidth, height: secondRowHeight },
    { id: "d", label: "D", x: fiveLeft, y: topRowHeight, width: fiveMeterWidth, height: secondRowHeight, emphasis: true },
    { id: "f-right", label: "F", x: fiveRight, y: topRowHeight, width: flankWidth, height: secondRowHeight },

    // Nedre G (stor)
    { id: "g-bottom", label: "G", x: 0, y: splitY, width: innerWidth, height: innerHeight - splitY },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="scoring-zones-template-title"
      className={twMerge("w-full h-auto", className)}
    >
      <title id="scoring-zones-template-title">Scoringssoner – mal</title>

      <defs>
        <linearGradient id="pitchGradient-scoring-template" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b7d3c" />
          <stop offset="100%" stopColor="#226030" />
        </linearGradient>
        <pattern id="pitchGrass-scoring-template" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="rgba(255,255,255,0.04)" />
          <rect width="8" height="4" fill="rgba(255,255,255,0.02)" />
        </pattern>
      </defs>

      {/* Bakgrunn */}
      <rect width={width} height={height} rx={24} fill="url(#pitchGradient-scoring-template)" />
      <rect width={width} height={height} rx={24} fill="url(#pitchGrass-scoring-template)" />

      <g transform={`translate(${margin}, ${margin})`}>
        {/* Soner */}
        {zones.map((zone) => (
          <g key={zone.id}>
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              fill={zone.emphasis ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}
              stroke="#dc2626"
              strokeWidth={2}
            />
            <text
              x={zone.x + zone.width / 2}
              y={zone.y + zone.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize={zone.label.length > 1 ? 18 : 30}
              fontWeight={700}
            >
              {zone.label}
            </text>
          </g>
        ))}

        {/* Pitch outline */}
        <rect
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={3}
        />

        {/* Mål (orientering) */}
        <rect x={innerWidth / 2 - 50} y={-8} width={100} height={10} fill="#fff" stroke="rgba(255,255,255,0.8)" strokeWidth={2} />

        {/* Fem-meter */}
        <rect x={fiveLeft} y={0} width={fiveMeterWidth} height={fiveMeterHeight} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />

        {/* Seksten-meter */}
        <rect x={sixteenLeft} y={0} width={sixteenMeterWidth} height={sixteenMeterHeight} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={3} />

        {/* Straffesparkpunkt */}
        <circle cx={innerWidth / 2} cy={penaltySpotY} r={4} fill="#fff" />

        {/* Straffesparkbue (9,15 m) – kun delen utenfor 16m (nedover) */}
        <path
          d={`M ${penaltyArcLeftX} ${penaltyArcY} A ${penaltyArcRadius} ${penaltyArcRadius} 0 0 0 ${penaltyArcRightX} ${penaltyArcY}`}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={2}
        />
      </g>
    </svg>
  );
};
