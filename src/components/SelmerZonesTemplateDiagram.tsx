"use client";

import { twMerge } from "tailwind-merge";
import { getFiveMeterHeight, getPenaltyGeometry, getPitchBoxX, PITCH_MARKS } from "./diagram/pitchGeometry";

type Zone = {
  id: string;
  label?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  emphasis?: boolean;
};

export interface SelmerZonesTemplateDiagramProps {
  className?: string;
}

/**
 * Mal for A03 (Tom Selmer) sin sone-inndeling i og rundt 16m:
 * - 1v / 1cv / 1ch / 1h øverst
 * - 2cv / 2ch nederst (inne i 16m-boksen)
 */
export const SelmerZonesTemplateDiagram = ({ className }: SelmerZonesTemplateDiagramProps) => {
  const width = 800;
  const height = 420;
  const margin = 20;

  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  const sixteenMeterWidth = PITCH_MARKS.sixteenMeterWidth;
  const sixteenMeterHeight = PITCH_MARKS.sixteenMeterHeight;
  const fiveMeterWidth = PITCH_MARKS.fiveMeterWidth;
  const fiveMeterHeight = getFiveMeterHeight(sixteenMeterHeight);

  const { sixteenLeft, sixteenRight, fiveLeft } = getPitchBoxX(innerWidth);
  const { penaltySpotY, penaltyArcRadius, penaltyArcY, penaltyArcLeftX, penaltyArcRightX } = getPenaltyGeometry(
    innerWidth,
    sixteenMeterHeight
  );

  // Deler 16m-dybden i to nivåer slik det ofte tegnes i A03-skisser.
  // (Prosentandel for å gi en visuelt god match med referansebildet.)
  const splitY = Math.round(sixteenMeterHeight * 0.56);

  const midX = innerWidth / 2;

  const zones: Zone[] = [
    // Utenfor 16m-boksen (wide channels) – venstre/høyre
    { id: "1v", label: "1v", x: 0, y: 0, width: sixteenLeft, height: splitY },
    { id: "1h", label: "1h", x: sixteenRight, y: 0, width: innerWidth - sixteenRight, height: splitY },

    // Inne i 16m-boksen – øvre rad
    { id: "1cv", label: "1cv", x: sixteenLeft, y: 0, width: midX - sixteenLeft, height: splitY, emphasis: true },
    { id: "1ch", label: "1ch", x: midX, y: 0, width: sixteenRight - midX, height: splitY, emphasis: true },

    // Inne i 16m-boksen – nedre rad
    { id: "2cv", label: "2cv", x: sixteenLeft, y: splitY, width: midX - sixteenLeft, height: sixteenMeterHeight - splitY },
    { id: "2ch", label: "2ch", x: midX, y: splitY, width: sixteenRight - midX, height: sixteenMeterHeight - splitY },

    // Wide channels nederst (ofte tegnet uten label, men vi beholder ruten som referanse)
    { id: "2v", x: 0, y: splitY, width: sixteenLeft, height: sixteenMeterHeight - splitY },
    { id: "2h", x: sixteenRight, y: splitY, width: innerWidth - sixteenRight, height: sixteenMeterHeight - splitY },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="selmer-zones-template-title"
      className={twMerge("w-full h-auto", className)}
    >
      <title id="selmer-zones-template-title">A03 soner i og rundt 16m – mal</title>

      <defs>
        <linearGradient id="pitchGradient-selmer-template" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b7d3c" />
          <stop offset="100%" stopColor="#226030" />
        </linearGradient>
        <pattern id="pitchGrass-selmer-template" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="rgba(255,255,255,0.04)" />
          <rect width="8" height="4" fill="rgba(255,255,255,0.02)" />
        </pattern>
      </defs>

      {/* Bakgrunn */}
      <rect width={width} height={height} rx={24} fill="url(#pitchGradient-selmer-template)" />
      <rect width={width} height={height} rx={24} fill="url(#pitchGrass-selmer-template)" />

      <g transform={`translate(${margin}, ${margin})`}>
        {/* Soner (før banelinjer) */}
        {zones.map((zone) => (
          <g key={zone.id}>
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              fill={zone.emphasis ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}
              stroke="#111827"
              strokeOpacity={0.55}
              strokeWidth={2}
            />
            {zone.label ? (
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#111827"
                fontSize={zone.label.length > 2 ? 22 : 26}
                fontWeight={700}
                opacity={0.9}
              >
                {zone.label}
              </text>
            ) : null}
          </g>
        ))}

        {/* Pitch outline */}
        <rect x={0} y={0} width={innerWidth} height={innerHeight} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={3} />

        {/* Mål (orientering) */}
        <rect x={innerWidth / 2 - 50} y={-8} width={100} height={10} fill="#fff" stroke="rgba(255,255,255,0.8)" strokeWidth={2} />

        {/* Fem-meter */}
        <rect x={fiveLeft} y={0} width={fiveMeterWidth} height={fiveMeterHeight} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />

        {/* Seksten-meter */}
        <rect x={sixteenLeft} y={0} width={sixteenMeterWidth} height={sixteenMeterHeight} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={3} />

        {/* Straffesparkpunkt */}
        <circle cx={innerWidth / 2} cy={penaltySpotY} r={4} fill="#fff" />

        {/* Straffesparkbue */}
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
