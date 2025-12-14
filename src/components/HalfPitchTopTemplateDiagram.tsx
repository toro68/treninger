"use client";

import { twMerge } from "tailwind-merge";
import { LANDSCAPE_PITCH_M, getPenaltyArcDyMeters, getLandscapePitchRect, m2px } from "./diagram/landscapePitchGeometry";

export type HalfPitchTopBackground = "green" | "white";

export interface HalfPitchTopTemplateDiagramProps {
  className?: string;
  /** Bakgrunnsfarge for mal (standard: green). */
  background?: HalfPitchTopBackground;
}

/**
 * Mal: halv bane (mål øverst) i liggende format (800x420).
 * Samme uttrykk som sone-malene, men uten markerte soner.
 */
export const HalfPitchTopTemplateDiagram = ({ className, background = "green" }: HalfPitchTopTemplateDiagramProps) => {
  const width = 800;
  const height = 420;
  const margin = 20;

  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  // Ekte dimensjoner (meter)
  const pitchWidthM = LANDSCAPE_PITCH_M.fullWidth; // 68
  const halfLengthM = LANDSCAPE_PITCH_M.fullLength / 2; // 52.5

  const isWhite = background === "white";

  // Litt "runoff" over mållinja for å få plass til målet (uten ekstra kantlinjer)
  // NB: I hvit mal skalerer vi kun på ekte banemål (68 × 52.5). Runoff/"mål-dybde"
  // påvirker ikke proporsjonene, og tegnes evt. utenfor banen.
  const runwayTopM = isWhite ? 0 : LANDSCAPE_PITCH_M.goalDepth;
  const pitchLengthM = halfLengthM + runwayTopM;

  const { pitchLeft, pitchTop, pitchWidthPx, scale } = getLandscapePitchRect(
    innerWidth,
    innerHeight,
    pitchWidthM,
    pitchLengthM
  );

  // Vi tegner top-down: y øker nedover
  const goalDepthPx = m2px(LANDSCAPE_PITCH_M.goalDepth, scale);
  const goalWidthPx = m2px(LANDSCAPE_PITCH_M.goalWidth, scale);
  const penaltyAreaDepthPx = m2px(LANDSCAPE_PITCH_M.penaltyAreaDepth, scale);
  const penaltyAreaWidthPx = m2px(LANDSCAPE_PITCH_M.penaltyAreaWidth, scale);
  const goalAreaDepthPx = m2px(LANDSCAPE_PITCH_M.goalAreaDepth, scale);
  const goalAreaWidthPx = m2px(LANDSCAPE_PITCH_M.goalAreaWidth, scale);
  const penaltySpotPx = m2px(LANDSCAPE_PITCH_M.penaltySpot, scale);
  const circleRadiusPx = m2px(LANDSCAPE_PITCH_M.centerCircleRadius, scale);
  // Avstanden (horisontalt) fra straffemerket til punktet der sirkelen treffer 16m-linja.
  // Helperen er den samme som brukes i sidevisning (verdien er sqrt(9.15^2 - 5.5^2)).
  const penaltyArcDxPx = m2px(getPenaltyArcDyMeters(), scale);

  const goalLineY = pitchTop + m2px(runwayTopM, scale);
  const centerX = pitchLeft + pitchWidthPx / 2;
  const midLineY = goalLineY + m2px(halfLengthM, scale);

  const penaltyArea = {
    x: centerX - penaltyAreaWidthPx / 2,
    y: goalLineY,
    w: penaltyAreaWidthPx,
    h: penaltyAreaDepthPx,
  };

  const goalArea = {
    x: centerX - goalAreaWidthPx / 2,
    y: goalLineY,
    w: goalAreaWidthPx,
    h: goalAreaDepthPx,
  };

  const goal = {
    x: centerX - goalWidthPx / 2,
    y: goalLineY - goalDepthPx,
    w: goalWidthPx,
    h: goalDepthPx,
  };

  const penaltySpot = { x: centerX, y: goalLineY + penaltySpotPx };
  const penaltyAreaLineY = goalLineY + penaltyAreaDepthPx;

  const strokeStrong = isWhite ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)";
  const stroke = isWhite ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)";
  const strokeLight = isWhite ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.45)";
  const dot = isWhite ? "#111827" : "#fff";

  const titleText = `Halv bane (mål øverst) – mal (${isWhite ? "hvit" : "grønn"})`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={titleText}
      className={twMerge("w-full h-auto", className)}
    >
      <title>{titleText}</title>

      <defs>
        {!isWhite && (
          <>
            <linearGradient id="pitchGradient-half-top-template" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b7d3c" />
              <stop offset="100%" stopColor="#226030" />
            </linearGradient>
            <pattern id="pitchGrass-half-top-template" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="rgba(255,255,255,0.04)" />
              <rect width="8" height="4" fill="rgba(255,255,255,0.02)" />
            </pattern>
          </>
        )}
      </defs>

      {isWhite ? (
        <rect width={width} height={height} rx={24} fill="#ffffff" />
      ) : (
        <>
          <rect width={width} height={height} rx={24} fill="url(#pitchGradient-half-top-template)" />
          <rect width={width} height={height} rx={24} fill="url(#pitchGrass-half-top-template)" />
        </>
      )}

      <g transform={`translate(${margin}, ${margin})`}>
        {/* Pitch outline (kun selve banen, ikke runoff over mållinja) */}
        <rect
          x={pitchLeft}
          y={goalLineY}
          width={pitchWidthPx}
          height={m2px(halfLengthM, scale)}
          fill="none"
          stroke={stroke}
          strokeWidth={3}
        />

        {/* Mål (uten ekstra strek bak) */}
        <rect x={goal.x} y={goal.y} width={goal.w} height={goal.h} fill="none" stroke={strokeStrong} strokeWidth={2} />

        {/* 5m og 16m */}
        <rect x={goalArea.x} y={goalArea.y} width={goalArea.w} height={goalArea.h} fill="none" stroke={stroke} strokeWidth={2} />
        <rect x={penaltyArea.x} y={penaltyArea.y} width={penaltyArea.w} height={penaltyArea.h} fill="none" stroke={strokeStrong} strokeWidth={3} />

        {/* Straffesparkpunkt */}
        <circle cx={penaltySpot.x} cy={penaltySpot.y} r={4} fill={dot} />

        {/* Straffesparkbue (9,15 m) – kun delen utenfor 16m (nedover) */}
        <path
          d={`M ${penaltySpot.x - penaltyArcDxPx} ${penaltyAreaLineY} A ${circleRadiusPx} ${circleRadiusPx} 0 0 0 ${penaltySpot.x + penaltyArcDxPx} ${penaltyAreaLineY}`}
          fill="none"
          stroke={strokeLight}
          strokeWidth={2}
        />

        {/* Midtlinje (nedre kant) + halv midtsirkel inn i banen */}
        <path
          d={`M ${centerX - circleRadiusPx} ${midLineY} A ${circleRadiusPx} ${circleRadiusPx} 0 0 1 ${centerX + circleRadiusPx} ${midLineY}`}
          fill="none"
          stroke={strokeLight}
          strokeWidth={2}
        />
        <circle cx={centerX} cy={midLineY} r={3} fill={dot} />
      </g>
    </svg>
  );
};
