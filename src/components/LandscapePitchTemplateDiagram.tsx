"use client";

import { twMerge } from "tailwind-merge";
import { getLandscapePitchRect, getPenaltyArcDyMeters, LANDSCAPE_PITCH_M, m2px } from "./diagram/landscapePitchGeometry";

export type LandscapePitchMode = "full" | "half";
export type LandscapeGoalSide = "left" | "right";
export type LandscapePitchBackground = "green" | "white";

export interface LandscapePitchTemplateDiagramProps {
  className?: string;
  mode?: LandscapePitchMode;
  /** For halv bane: hvilken side målet står på. */
  goalSide?: LandscapeGoalSide;
  /** Bakgrunnsfarge for mal (standard: green). */
  background?: LandscapePitchBackground;
}

/**
 * Mal: Liggende bane.
 * - `mode="full"`: hel bane
 * - `mode="half"`: halv bane med mål på venstre eller høyre side
 */
export const LandscapePitchTemplateDiagram = ({
  className,
  mode = "full",
  goalSide = "left",
  background = "green",
}: LandscapePitchTemplateDiagramProps) => {
  const width = 800;
  const height = 420;
  const margin = 20;

  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  const isWhite = background === "white";

  // For å unngå "mye grønt bak mål" i malene: inkluder mål-dybden som runoff innenfor
  // selve "banerektangelet" (outline). Feltlinjer (mållinje/16m/5m) tegnes likevel relativt til mållinja.
  const basePitchLengthM = mode === "full" ? LANDSCAPE_PITCH_M.fullLength : LANDSCAPE_PITCH_M.fullLength / 2;
  // NB: I hvit mal skalerer vi kun på ekte banemål (105×68 / 52.5×68).
  const runwayLeftM = isWhite ? 0 : LANDSCAPE_PITCH_M.goalDepth;
  const runwayRightM = isWhite ? 0 : mode === "full" ? LANDSCAPE_PITCH_M.goalDepth : 0;
  const pitchLengthM = basePitchLengthM + runwayLeftM + runwayRightM;
  const pitchWidthM = LANDSCAPE_PITCH_M.fullWidth;

  const { pitchLeft, pitchTop, pitchWidthPx, pitchHeightPx, scale } = getLandscapePitchRect(
    innerWidth,
    innerHeight,
    pitchLengthM,
    pitchWidthM
  );

  const centerY = pitchTop + pitchHeightPx / 2;

  const penaltyAreaDepthPx = m2px(LANDSCAPE_PITCH_M.penaltyAreaDepth, scale);
  const penaltyAreaWidthPx = m2px(LANDSCAPE_PITCH_M.penaltyAreaWidth, scale);
  const goalAreaDepthPx = m2px(LANDSCAPE_PITCH_M.goalAreaDepth, scale);
  const goalAreaWidthPx = m2px(LANDSCAPE_PITCH_M.goalAreaWidth, scale);

  const penaltySpotPx = m2px(LANDSCAPE_PITCH_M.penaltySpot, scale);
  const circleRadiusPx = m2px(LANDSCAPE_PITCH_M.centerCircleRadius, scale);

  const penaltyArcDyPx = m2px(getPenaltyArcDyMeters(), scale);

  const goalLineLeftX = pitchLeft + m2px(runwayLeftM, scale);
  const goalLineRightX = pitchLeft + pitchWidthPx - m2px(runwayRightM, scale);

  const basePitchLengthPx = m2px(basePitchLengthM, scale);

  const leftPenaltyArea = {
    x: goalLineLeftX,
    y: centerY - penaltyAreaWidthPx / 2,
    w: penaltyAreaDepthPx,
    h: penaltyAreaWidthPx,
  };

  const rightPenaltyArea = {
    x: goalLineRightX - penaltyAreaDepthPx,
    y: centerY - penaltyAreaWidthPx / 2,
    w: penaltyAreaDepthPx,
    h: penaltyAreaWidthPx,
  };

  const leftGoalArea = {
    x: goalLineLeftX,
    y: centerY - goalAreaWidthPx / 2,
    w: goalAreaDepthPx,
    h: goalAreaWidthPx,
  };

  const rightGoalArea = {
    x: goalLineRightX - goalAreaDepthPx,
    y: centerY - goalAreaWidthPx / 2,
    w: goalAreaDepthPx,
    h: goalAreaWidthPx,
  };

  const halfWayX = goalLineLeftX + m2px(basePitchLengthM / 2, scale);

  const leftPenaltySpot = { x: goalLineLeftX + penaltySpotPx, y: centerY };
  const rightPenaltySpot = { x: goalLineRightX - penaltySpotPx, y: centerY };

  const renderFull = mode === "full";

  const lineStrong = isWhite ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)";
  const line = isWhite ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.55)";
  const lineSoft = isWhite ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.45)";
  const spotFill = isWhite ? "#111827" : "#fff";

  // Speil halv bane om målet skal stå på høyre side
  const flipHalf = !renderFull && goalSide === "right";
  const flipTransform = flipHalf
    ? `translate(${pitchLeft * 2 + pitchWidthPx} 0) scale(-1 1)`
    : undefined;

  const pitchGroupProps = flipTransform ? { transform: flipTransform } : undefined;

  const titleText = `Liggende bane – ${renderFull ? "hel" : "halv"} (${isWhite ? "hvit" : "grønn"})`;

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
            <linearGradient id="pitchGradient-landscape-template" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b7d3c" />
              <stop offset="100%" stopColor="#226030" />
            </linearGradient>
            <pattern id="pitchGrass-landscape-template" width="8" height="8" patternUnits="userSpaceOnUse">
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
          <rect width={width} height={height} rx={24} fill="url(#pitchGradient-landscape-template)" />
          <rect width={width} height={height} rx={24} fill="url(#pitchGrass-landscape-template)" />
        </>
      )}

      <g transform={`translate(${margin}, ${margin})`}>
        {/* Pitch outline (kun selve banen, ikke runoff bak mål) */}
        <rect
          x={goalLineLeftX}
          y={pitchTop}
          width={basePitchLengthPx}
          height={pitchHeightPx}
          fill="none"
          stroke={lineStrong}
          strokeWidth={3}
          rx={2}
        />

        <g {...pitchGroupProps}>
          {/* Midtlinje + midtsirkel */}
          {renderFull ? (
            <>
              <line
                x1={halfWayX}
                y1={pitchTop}
                x2={halfWayX}
                y2={pitchTop + pitchHeightPx}
                stroke={lineStrong}
                strokeWidth={3}
              />
              <circle cx={halfWayX} cy={centerY} r={circleRadiusPx} fill="none" stroke={lineStrong} strokeWidth={3} />
              <circle cx={halfWayX} cy={centerY} r={4} fill={spotFill} />
            </>
          ) : (
            <>
              {/* Halv midtsirkel inn i banen */}
              <path
                d={`M ${goalLineLeftX + m2px(basePitchLengthM, scale)} ${centerY - circleRadiusPx} A ${circleRadiusPx} ${circleRadiusPx} 0 0 0 ${goalLineLeftX + m2px(basePitchLengthM, scale)} ${centerY + circleRadiusPx}`}
                fill="none"
                stroke={lineSoft}
                strokeWidth={3}
              />
            </>
          )}

          {/* Venstre mål og felt */}
          <rect x={leftPenaltyArea.x} y={leftPenaltyArea.y} width={leftPenaltyArea.w} height={leftPenaltyArea.h} fill="none" stroke={line} strokeWidth={3} />
          <rect x={leftGoalArea.x} y={leftGoalArea.y} width={leftGoalArea.w} height={leftGoalArea.h} fill="none" stroke={lineSoft} strokeWidth={2.5} />
          <circle cx={leftPenaltySpot.x} cy={leftPenaltySpot.y} r={4} fill={spotFill} />
          <path
            d={`M ${leftPenaltyArea.x + leftPenaltyArea.w} ${leftPenaltySpot.y - penaltyArcDyPx} A ${circleRadiusPx} ${circleRadiusPx} 0 0 1 ${leftPenaltyArea.x + leftPenaltyArea.w} ${leftPenaltySpot.y + penaltyArcDyPx}`}
            fill="none"
            stroke={lineSoft}
            strokeWidth={2.5}
          />

          {/* Høyre mål og felt (kun hel bane) */}
          {renderFull ? (
            <>
              <rect x={rightPenaltyArea.x} y={rightPenaltyArea.y} width={rightPenaltyArea.w} height={rightPenaltyArea.h} fill="none" stroke={line} strokeWidth={3} />
              <rect x={rightGoalArea.x} y={rightGoalArea.y} width={rightGoalArea.w} height={rightGoalArea.h} fill="none" stroke={lineSoft} strokeWidth={2.5} />
              <circle cx={rightPenaltySpot.x} cy={rightPenaltySpot.y} r={4} fill={spotFill} />
              <path
                d={`M ${rightPenaltyArea.x} ${rightPenaltySpot.y - penaltyArcDyPx} A ${circleRadiusPx} ${circleRadiusPx} 0 0 0 ${rightPenaltyArea.x} ${rightPenaltySpot.y + penaltyArcDyPx}`}
                fill="none"
                stroke={lineSoft}
                strokeWidth={2.5}
              />
            </>
          ) : null}
        </g>
      </g>
    </svg>
  );
};
