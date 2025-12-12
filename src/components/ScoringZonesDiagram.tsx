"use client";

import { twMerge } from "tailwind-merge";
import { getFiveMeterHeight, getPenaltyGeometry, getPitchBoxX, PITCH_MARKS } from "./diagram/pitchGeometry";

type RectZone = {
  type: "rect";
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  emphasis?: boolean;
  description?: string;
};

type PolygonZone = {
  type: "polygon";
  id: string;
  label: string;
  points: string;
  emphasis?: boolean;
  description?: string;
  labelX: number;
  labelY: number;
};

type Zone = RectZone | PolygonZone;

interface ScoringZonesDiagramProps {
  className?: string;
  showLabels?: boolean;
}

export const ScoringZonesDiagram = ({ className }: ScoringZonesDiagramProps) => {
  const width = 800;
  const height = 420;
  const margin = 20;
  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  // Forenklede banelinjer (proporsjoner) – brukes kun for visuell orientering
  const sixteenMeterWidth = PITCH_MARKS.sixteenMeterWidth;
  const sixteenMeterHeight = PITCH_MARKS.sixteenMeterHeight;
  const fiveMeterWidth = PITCH_MARKS.fiveMeterWidth;
  const fiveMeterHeight = getFiveMeterHeight(sixteenMeterHeight);

  const { sixteenLeft, sixteenRight, fiveLeft, fiveRight } = getPitchBoxX(innerWidth);

  // Realistiske proporsjoner rundt straffemerket/straffebuen (skalert mot 16.5m-lengden)
  const { penaltySpotY, penaltyArcRadius, penaltyArcY, penaltyArcLeftX, penaltyArcRightX } = getPenaltyGeometry(
    innerWidth,
    sixteenMeterHeight
  );

  // Innleggssoner (A–F) – tilpasset referansebildet
  // - C/D: over 16m-linja (delt i to)
  // - E/F: under 16m-linja (delt i to)
  // - A/B: inne i 16m, fra 16m-kant til 5m-kant, med diagonal i B ned mot 16m-hjørnet
  const leftColWidth = sixteenLeft;
  const rightColWidth = innerWidth - sixteenRight;
  const lowerColExtra = 24;

  const zoneCHeight = sixteenMeterHeight / 2;
  const zoneDHeight = sixteenMeterHeight / 2;
  const belowSixteenHeight = innerHeight - sixteenMeterHeight;
  const zoneEHeight = belowSixteenHeight / 2;
  const zoneFHeight = belowSixteenHeight - zoneEHeight;

  const zoneAHeight = fiveMeterHeight;

  const zones: Zone[] = [
    // Venstre sidekolonne
    { type: "rect", id: "zone-c-left", label: "C", x: 0, y: 0, width: leftColWidth, height: zoneCHeight },
    { type: "rect", id: "zone-d-left", label: "D", x: 0, y: zoneCHeight, width: leftColWidth, height: zoneDHeight },
    { type: "rect", id: "zone-e-left", label: "E", x: 0, y: sixteenMeterHeight, width: leftColWidth + lowerColExtra, height: zoneEHeight },
    { type: "rect", id: "zone-f-left", label: "F", x: 0, y: sixteenMeterHeight + zoneEHeight, width: leftColWidth + lowerColExtra, height: zoneFHeight },

    // Venstre A/B (inne ved boksen)
    {
      type: "rect",
      id: "zone-a-left",
      label: "A",
      x: sixteenLeft,
      y: 0,
      width: fiveLeft - sixteenLeft,
      height: zoneAHeight,
      emphasis: true,
    },
    {
      type: "polygon",
      id: "zone-b-left",
      label: "B",
      points: `${sixteenLeft},${zoneAHeight} ${fiveLeft},${zoneAHeight} ${sixteenLeft},${sixteenMeterHeight}`,
      labelX: (sixteenLeft + fiveLeft + sixteenLeft) / 3,
      labelY: (zoneAHeight + zoneAHeight + sixteenMeterHeight) / 3,
      emphasis: true,
    },

    // Høyre sidekolonne
    { type: "rect", id: "zone-c-right", label: "C", x: sixteenRight, y: 0, width: rightColWidth, height: zoneCHeight },
    { type: "rect", id: "zone-d-right", label: "D", x: sixteenRight, y: zoneCHeight, width: rightColWidth, height: zoneDHeight },
    { type: "rect", id: "zone-e-right", label: "E", x: sixteenRight - lowerColExtra, y: sixteenMeterHeight, width: rightColWidth + lowerColExtra, height: zoneEHeight },
    {
      type: "rect",
      id: "zone-f-right",
      label: "F",
      x: sixteenRight - lowerColExtra,
      y: sixteenMeterHeight + zoneEHeight,
      width: rightColWidth + lowerColExtra,
      height: zoneFHeight,
    },

    // Høyre A/B (inne ved boksen)
    {
      type: "rect",
      id: "zone-a-right",
      label: "A",
      x: fiveRight,
      y: 0,
      width: sixteenRight - fiveRight,
      height: zoneAHeight,
      emphasis: true,
    },
    {
      type: "polygon",
      id: "zone-b-right",
      label: "B",
      points: `${fiveRight},${zoneAHeight} ${sixteenRight},${zoneAHeight} ${sixteenRight},${sixteenMeterHeight}`,
      labelX: (fiveRight + sixteenRight + sixteenRight) / 3,
      labelY: (zoneAHeight + zoneAHeight + sixteenMeterHeight) / 3,
      emphasis: true,
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="scoring-zones-title"
      className={twMerge("w-full h-auto", className)}
    >
      <title id="scoring-zones-title">Innleggssoner (A–F) – basert på Gard H. Kristiansens UEFA A-analyse</title>
      <defs>
        <linearGradient id="pitchGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b7d3c" />
          <stop offset="100%" stopColor="#226030" />
        </linearGradient>
        <pattern id="pitchGrass" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="rgba(255,255,255,0.04)" />
          <rect width="8" height="4" fill="rgba(255,255,255,0.02)" />
        </pattern>
      </defs>

      {/* Bakgrunn */}
      <rect width={width} height={height} rx={24} fill="url(#pitchGradient)" />
      <rect width={width} height={height} rx={24} fill="url(#pitchGrass)" />

      <g transform={`translate(${margin}, ${margin})`}>
        {/* Soner - tegn først slik at banelinjer kommer over */}
        {zones.map((zone) => (
          <g key={zone.id}>
            {zone.type === "rect" ? (
              <>
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
                  fontSize={zone.width < 100 ? 20 : 28}
                  fontWeight={700}
                >
                  {zone.label}
                </text>
              </>
            ) : (
              <>
                <polygon
                  points={zone.points}
                  fill={zone.emphasis ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}
                  stroke="#dc2626"
                  strokeWidth={2}
                />
                <text
                  x={zone.labelX}
                  y={zone.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize={28}
                  fontWeight={700}
                >
                  {zone.label}
                </text>
              </>
            )}
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

        {/* Mål */}
        <rect
          x={innerWidth / 2 - 50}
          y={-8}
          width={100}
          height={10}
          fill="#fff"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth={2}
        />

        {/* Fem-meter */}
        <rect
          x={fiveLeft}
          y={0}
          width={fiveMeterWidth}
          height={fiveMeterHeight}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={2}
        />

        {/* Seksten-meter */}
        <rect
          x={sixteenLeft}
          y={0}
          width={sixteenMeterWidth}
          height={sixteenMeterHeight}
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth={3}
        />

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
