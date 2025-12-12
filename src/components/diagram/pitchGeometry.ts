// Standardmål (meter)
const PENALTY_AREA_DEPTH_M = 16.5;
const PENALTY_AREA_WIDTH_M = 40.32;
const GOAL_AREA_DEPTH_M = 5.5;
const GOAL_AREA_WIDTH_M = 18.32;
const PENALTY_SPOT_M = 11;
const PENALTY_ARC_RADIUS_M = 9.15;

// Vi forankrer dybden (16.5m) i piksler og beregner resten fra standardforhold
const SIXTEEN_METER_HEIGHT_PX = 200;
const SIXTEEN_METER_WIDTH_PX = Math.round((PENALTY_AREA_WIDTH_M / PENALTY_AREA_DEPTH_M) * SIXTEEN_METER_HEIGHT_PX);
const FIVE_METER_WIDTH_PX = Math.round((GOAL_AREA_WIDTH_M / PENALTY_AREA_WIDTH_M) * SIXTEEN_METER_WIDTH_PX);

export const PITCH_MARKS = {
  sixteenMeterWidth: SIXTEEN_METER_WIDTH_PX,
  sixteenMeterHeight: SIXTEEN_METER_HEIGHT_PX,
  fiveMeterWidth: FIVE_METER_WIDTH_PX,
} as const;

export function getFiveMeterHeight(sixteenMeterHeight: number) {
  return Math.round((GOAL_AREA_DEPTH_M / PENALTY_AREA_DEPTH_M) * sixteenMeterHeight);
}

export function getPitchBoxX(innerWidth: number) {
  const sixteenLeft = (innerWidth - PITCH_MARKS.sixteenMeterWidth) / 2;
  const sixteenRight = sixteenLeft + PITCH_MARKS.sixteenMeterWidth;

  const fiveLeft = (innerWidth - PITCH_MARKS.fiveMeterWidth) / 2;
  const fiveRight = fiveLeft + PITCH_MARKS.fiveMeterWidth;

  return { sixteenLeft, sixteenRight, fiveLeft, fiveRight };
}

export function getPenaltyGeometry(innerWidth: number, sixteenMeterHeight: number) {
  const penaltySpotY = (PENALTY_SPOT_M / PENALTY_AREA_DEPTH_M) * sixteenMeterHeight;
  const penaltyArcRadius = (PENALTY_ARC_RADIUS_M / PENALTY_AREA_DEPTH_M) * sixteenMeterHeight;
  const penaltyArcY = sixteenMeterHeight;

  const dy = penaltyArcY - penaltySpotY;
  const penaltyArcDx = Math.sqrt(Math.max(0, penaltyArcRadius * penaltyArcRadius - dy * dy));

  const penaltyArcLeftX = innerWidth / 2 - penaltyArcDx;
  const penaltyArcRightX = innerWidth / 2 + penaltyArcDx;

  return {
    penaltySpotY,
    penaltyArcRadius,
    penaltyArcY,
    penaltyArcDx,
    penaltyArcLeftX,
    penaltyArcRightX,
  };
}
