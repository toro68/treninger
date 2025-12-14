// Standardmål (meter) – brukt for proporsjoner i SVG
const FULL_PITCH_LENGTH_M = 105;
const FULL_PITCH_WIDTH_M = 68;

const PENALTY_AREA_DEPTH_M = 16.5;
const PENALTY_AREA_WIDTH_M = 40.32;

const GOAL_AREA_DEPTH_M = 5.5;
const GOAL_AREA_WIDTH_M = 18.32;

const GOAL_WIDTH_M = 7.32;
const GOAL_DEPTH_M = 2;

const PENALTY_SPOT_M = 11;
const CENTER_CIRCLE_RADIUS_M = 9.15;

export const LANDSCAPE_PITCH_M = {
  fullLength: FULL_PITCH_LENGTH_M,
  fullWidth: FULL_PITCH_WIDTH_M,
  penaltyAreaDepth: PENALTY_AREA_DEPTH_M,
  penaltyAreaWidth: PENALTY_AREA_WIDTH_M,
  goalAreaDepth: GOAL_AREA_DEPTH_M,
  goalAreaWidth: GOAL_AREA_WIDTH_M,
  goalWidth: GOAL_WIDTH_M,
  goalDepth: GOAL_DEPTH_M,
  penaltySpot: PENALTY_SPOT_M,
  centerCircleRadius: CENTER_CIRCLE_RADIUS_M,
} as const;

export type LandscapePitchRect = {
  pitchLeft: number;
  pitchTop: number;
  pitchWidthPx: number;
  pitchHeightPx: number;
  scale: number; // px per meter
  pitchLengthM: number;
  pitchWidthM: number;
};

export function getLandscapePitchRect(
  innerWidth: number,
  innerHeight: number,
  pitchLengthM: number,
  pitchWidthM: number
): LandscapePitchRect {
  const scale = Math.min(innerWidth / pitchLengthM, innerHeight / pitchWidthM);
  const pitchWidthPx = pitchLengthM * scale;
  const pitchHeightPx = pitchWidthM * scale;

  const pitchLeft = (innerWidth - pitchWidthPx) / 2;
  const pitchTop = (innerHeight - pitchHeightPx) / 2;

  return { pitchLeft, pitchTop, pitchWidthPx, pitchHeightPx, scale, pitchLengthM, pitchWidthM };
}

export function m2px(meters: number, scale: number) {
  return meters * scale;
}

export function getPenaltyArcDyMeters() {
  const dx = PENALTY_AREA_DEPTH_M - PENALTY_SPOT_M; // 16.5 - 11 = 5.5
  const r = CENTER_CIRCLE_RADIUS_M;
  const inside = Math.max(0, r * r - dx * dx);
  return Math.sqrt(inside);
}
