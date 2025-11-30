// src/components/ExerciseDiagram.tsx
// Grunnleggende komponent for å visualisere fotballøvelser

import React from "react";

// ============================================
// TYPER
// ============================================

export type Team = "A" | "B" | "neutral" | "goalkeeper";

export interface PlayerPosition {
  id: string;
  x: number; // 0-100 (prosent av banebredde)
  y: number; // 0-100 (prosent av banelengde)
  team: Team;
  label?: string; // Valgfri label (f.eks. "GK", "1", "S")
}

export interface BallPosition {
  x: number;
  y: number;
}

export interface Movement {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: "run" | "pass" | "dribble" | "shot";
  curved?: boolean;
}

export interface Zone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  label?: string;
}

export interface ExerciseDiagramProps {
  /** Bredde på diagrammet i piksler */
  width?: number;
  /** Høyde på diagrammet i piksler */
  height?: number;
  /** Spillerposisjoner */
  players?: PlayerPosition[];
  /** Ballposisjon */
  ball?: BallPosition;
  /** Bevegelser (løp, pasninger, skudd) */
  movements?: Movement[];
  /** Soner/områder på banen */
  zones?: Zone[];
  /** Vis halv bane (true) eller hel bane (false) */
  halfPitch?: boolean;
  /** Vis kjegler/markører */
  cones?: { x: number; y: number }[];
  /** Vis mål */
  showGoals?: boolean;
  /** Vis minimål i stedet for vanlige mål */
  miniGoals?: { x: number; y: number; rotation?: number }[];
  /** Bakgrunnsfarge */
  pitchColor?: string;
  /** Valgfri tittel */
  title?: string;
}

// ============================================
// FARGER
// ============================================

const COLORS = {
  pitch: "#2d5a27",
  pitchLines: "#ffffff",
  teamA: "#ef4444", // Rød
  teamB: "#3b82f6", // Blå
  neutral: "#fbbf24", // Gul
  goalkeeper: "#22c55e", // Grønn
  ball: "#ffffff",
  ballStroke: "#000000",
  run: "#ffffff",
  pass: "#fbbf24",
  dribble: "#a855f7",
  shot: "#ef4444",
  cone: "#ff6b00",
  goal: "#ffffff",
  zone: "rgba(255, 255, 255, 0.15)",
};

// ============================================
// HJELPEFUNKSJONER
// ============================================

const getTeamColor = (team: Team): string => {
  switch (team) {
    case "A":
      return COLORS.teamA;
    case "B":
      return COLORS.teamB;
    case "neutral":
      return COLORS.neutral;
    case "goalkeeper":
      return COLORS.goalkeeper;
    default:
      return COLORS.teamA;
  }
};

const getMovementColor = (type: Movement["type"]): string => {
  switch (type) {
    case "run":
      return COLORS.run;
    case "pass":
      return COLORS.pass;
    case "dribble":
      return COLORS.dribble;
    case "shot":
      return COLORS.shot;
    default:
      return COLORS.run;
  }
};

// ============================================
// SUBKOMPONENTER
// ============================================

/** Fotballbane (hel eller halv) */
const Pitch = ({
  width,
  height,
  halfPitch,
  pitchColor,
}: {
  width: number;
  height: number;
  halfPitch: boolean;
  pitchColor: string;
}) => {
  const padding = 10;
  const pitchWidth = width - padding * 2;
  const pitchHeight = height - padding * 2;

  // Dimensjoner i prosent av banen
  const penaltyAreaWidth = 44; // 44% av bredden
  const penaltyAreaHeight = 18; // 18% av lengden
  const goalAreaWidth = 20;
  const goalAreaHeight = 6;
  const centerCircleRadius = 10;
  const penaltySpotDistance = 12;
  const cornerRadius = 2;

  return (
    <g>
      {/* Bakgrunn */}
      <rect
        x={padding}
        y={padding}
        width={pitchWidth}
        height={pitchHeight}
        fill={pitchColor}
        rx={4}
      />

      {/* Ytre ramme */}
      <rect
        x={padding}
        y={padding}
        width={pitchWidth}
        height={pitchHeight}
        fill="none"
        stroke={COLORS.pitchLines}
        strokeWidth={2}
        rx={4}
      />

      {/* Midtlinje (kun hel bane) */}
      {!halfPitch && (
        <line
          x1={padding}
          y1={height / 2}
          x2={width - padding}
          y2={height / 2}
          stroke={COLORS.pitchLines}
          strokeWidth={2}
        />
      )}

      {/* Midtsirkel */}
      {!halfPitch && (
        <circle
          cx={width / 2}
          cy={height / 2}
          r={(centerCircleRadius / 100) * pitchHeight}
          fill="none"
          stroke={COLORS.pitchLines}
          strokeWidth={2}
        />
      )}

      {/* Midtpunkt */}
      {!halfPitch && (
        <circle
          cx={width / 2}
          cy={height / 2}
          r={3}
          fill={COLORS.pitchLines}
        />
      )}

      {/* Straffefelt (bunn) */}
      <rect
        x={padding + (pitchWidth * (100 - penaltyAreaWidth)) / 200}
        y={height - padding - (pitchHeight * penaltyAreaHeight) / 100}
        width={(pitchWidth * penaltyAreaWidth) / 100}
        height={(pitchHeight * penaltyAreaHeight) / 100}
        fill="none"
        stroke={COLORS.pitchLines}
        strokeWidth={2}
      />

      {/* Målfelt (bunn) */}
      <rect
        x={padding + (pitchWidth * (100 - goalAreaWidth)) / 200}
        y={height - padding - (pitchHeight * goalAreaHeight) / 100}
        width={(pitchWidth * goalAreaWidth) / 100}
        height={(pitchHeight * goalAreaHeight) / 100}
        fill="none"
        stroke={COLORS.pitchLines}
        strokeWidth={2}
      />

      {/* Straffepunkt (bunn) */}
      <circle
        cx={width / 2}
        cy={height - padding - (pitchHeight * penaltySpotDistance) / 100}
        r={3}
        fill={COLORS.pitchLines}
      />

      {/* Straffebue (bunn) */}
      <path
        d={`M ${padding + (pitchWidth * (100 - penaltyAreaWidth)) / 200 + 10} ${
          height - padding - (pitchHeight * penaltyAreaHeight) / 100
        } 
           A ${(pitchHeight * 10) / 100} ${(pitchHeight * 10) / 100} 0 0 1 ${
          width - padding - (pitchWidth * (100 - penaltyAreaWidth)) / 200 - 10
        } ${height - padding - (pitchHeight * penaltyAreaHeight) / 100}`}
        fill="none"
        stroke={COLORS.pitchLines}
        strokeWidth={2}
      />

      {/* Hjørnebuer (bunn) */}
      <path
        d={`M ${padding} ${height - padding - (pitchHeight * cornerRadius) / 100} 
           A ${(pitchHeight * cornerRadius) / 100} ${(pitchHeight * cornerRadius) / 100} 0 0 0 ${
          padding + (pitchWidth * cornerRadius) / 100
        } ${height - padding}`}
        fill="none"
        stroke={COLORS.pitchLines}
        strokeWidth={2}
      />
      <path
        d={`M ${width - padding} ${height - padding - (pitchHeight * cornerRadius) / 100} 
           A ${(pitchHeight * cornerRadius) / 100} ${(pitchHeight * cornerRadius) / 100} 0 0 1 ${
          width - padding - (pitchWidth * cornerRadius) / 100
        } ${height - padding}`}
        fill="none"
        stroke={COLORS.pitchLines}
        strokeWidth={2}
      />

      {/* Topp-del (kun hel bane) */}
      {!halfPitch && (
        <>
          {/* Straffefelt (topp) */}
          <rect
            x={padding + (pitchWidth * (100 - penaltyAreaWidth)) / 200}
            y={padding}
            width={(pitchWidth * penaltyAreaWidth) / 100}
            height={(pitchHeight * penaltyAreaHeight) / 100}
            fill="none"
            stroke={COLORS.pitchLines}
            strokeWidth={2}
          />

          {/* Målfelt (topp) */}
          <rect
            x={padding + (pitchWidth * (100 - goalAreaWidth)) / 200}
            y={padding}
            width={(pitchWidth * goalAreaWidth) / 100}
            height={(pitchHeight * goalAreaHeight) / 100}
            fill="none"
            stroke={COLORS.pitchLines}
            strokeWidth={2}
          />

          {/* Straffepunkt (topp) */}
          <circle
            cx={width / 2}
            cy={padding + (pitchHeight * penaltySpotDistance) / 100}
            r={3}
            fill={COLORS.pitchLines}
          />

          {/* Hjørnebuer (topp) */}
          <path
            d={`M ${padding} ${padding + (pitchHeight * cornerRadius) / 100} 
               A ${(pitchHeight * cornerRadius) / 100} ${(pitchHeight * cornerRadius) / 100} 0 0 1 ${
              padding + (pitchWidth * cornerRadius) / 100
            } ${padding}`}
            fill="none"
            stroke={COLORS.pitchLines}
            strokeWidth={2}
          />
          <path
            d={`M ${width - padding} ${padding + (pitchHeight * cornerRadius) / 100} 
               A ${(pitchHeight * cornerRadius) / 100} ${(pitchHeight * cornerRadius) / 100} 0 0 0 ${
              width - padding - (pitchWidth * cornerRadius) / 100
            } ${padding}`}
            fill="none"
            stroke={COLORS.pitchLines}
            strokeWidth={2}
          />
        </>
      )}
    </g>
  );
};

/** Mål */
const Goal = ({
  x,
  y,
  width: goalWidth,
  facing,
}: {
  x: number;
  y: number;
  width: number;
  facing: "up" | "down";
}) => {
  const goalHeight = 8;
  const postWidth = 3;

  return (
    <g>
      {/* Målramme */}
      <rect
        x={x - goalWidth / 2}
        y={facing === "down" ? y : y - goalHeight}
        width={goalWidth}
        height={goalHeight}
        fill="none"
        stroke={COLORS.goal}
        strokeWidth={3}
      />
      {/* Nett (stiplet) */}
      <rect
        x={x - goalWidth / 2 + postWidth}
        y={facing === "down" ? y + postWidth : y - goalHeight + postWidth}
        width={goalWidth - postWidth * 2}
        height={goalHeight - postWidth}
        fill="none"
        stroke={COLORS.goal}
        strokeWidth={1}
        strokeDasharray="3,3"
        opacity={0.5}
      />
    </g>
  );
};

/** Minimål */
const MiniGoal = ({
  x,
  y,
  rotation = 0,
}: {
  x: number;
  y: number;
  rotation?: number;
}) => {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      <rect
        x={-15}
        y={-3}
        width={30}
        height={6}
        fill="none"
        stroke={COLORS.goal}
        strokeWidth={2}
      />
    </g>
  );
};

/** Spiller */
const Player = ({
  x,
  y,
  team,
  label,
}: {
  x: number;
  y: number;
  team: Team;
  label?: string;
}) => {
  const radius = 12;

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={getTeamColor(team)}
        stroke="#000"
        strokeWidth={2}
      />
      {label && (
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={10}
          fontWeight="bold"
        >
          {label}
        </text>
      )}
    </g>
  );
};

/** Ball */
const Ball = ({ x, y }: { x: number; y: number }) => {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={6}
        fill={COLORS.ball}
        stroke={COLORS.ballStroke}
        strokeWidth={1.5}
      />
      {/* Pentagon-mønster for fotball-look */}
      <circle
        cx={x}
        cy={y}
        r={3}
        fill={COLORS.ballStroke}
      />
    </g>
  );
};

/** Kjegle */
const Cone = ({ x, y }: { x: number; y: number }) => {
  return (
    <polygon
      points={`${x},${y - 8} ${x - 6},${y + 4} ${x + 6},${y + 4}`}
      fill={COLORS.cone}
      stroke="#000"
      strokeWidth={1}
    />
  );
};

/** Bevegelsespil (løp, pasning, skudd) */
const MovementArrow = ({
  from,
  to,
  type,
  curved,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: Movement["type"];
  curved?: boolean;
}) => {
  const color = getMovementColor(type);
  const dashArray = type === "run" ? "8,4" : type === "dribble" ? "4,4" : "none";
  const strokeWidth = type === "shot" ? 3 : 2;

  // Beregn pilspiss
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const arrowLength = 10;
  const arrowAngle = Math.PI / 6;

  const arrowPoint1 = {
    x: to.x - arrowLength * Math.cos(angle - arrowAngle),
    y: to.y - arrowLength * Math.sin(angle - arrowAngle),
  };
  const arrowPoint2 = {
    x: to.x - arrowLength * Math.cos(angle + arrowAngle),
    y: to.y - arrowLength * Math.sin(angle + arrowAngle),
  };

  // Kurve-kontrollpunkt
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const perpX = -(to.y - from.y) * 0.3;
  const perpY = (to.x - from.x) * 0.3;

  const pathD = curved
    ? `M ${from.x} ${from.y} Q ${midX + perpX} ${midY + perpY} ${to.x} ${to.y}`
    : `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  return (
    <g>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />
      {/* Pilspiss */}
      <polygon
        points={`${to.x},${to.y} ${arrowPoint1.x},${arrowPoint1.y} ${arrowPoint2.x},${arrowPoint2.y}`}
        fill={color}
      />
    </g>
  );
};

/** Sone/område */
const ZoneRect = ({
  x,
  y,
  width,
  height,
  color,
  label,
  pitchWidth,
  pitchHeight,
  padding,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  label?: string;
  pitchWidth: number;
  pitchHeight: number;
  padding: number;
}) => {
  const actualX = padding + (x / 100) * pitchWidth;
  const actualY = padding + (y / 100) * pitchHeight;
  const actualWidth = (width / 100) * pitchWidth;
  const actualHeight = (height / 100) * pitchHeight;

  return (
    <g>
      <rect
        x={actualX}
        y={actualY}
        width={actualWidth}
        height={actualHeight}
        fill={color || COLORS.zone}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
        strokeDasharray="4,4"
        rx={4}
      />
      {label && (
        <text
          x={actualX + actualWidth / 2}
          y={actualY + actualHeight / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={12}
          fontWeight="bold"
          opacity={0.8}
        >
          {label}
        </text>
      )}
    </g>
  );
};

// ============================================
// HOVEDKOMPONENT
// ============================================

export const ExerciseDiagram: React.FC<ExerciseDiagramProps> = ({
  width = 400,
  height = 300,
  players = [],
  ball,
  movements = [],
  zones = [],
  halfPitch = true,
  cones = [],
  showGoals = true,
  miniGoals = [],
  pitchColor = COLORS.pitch,
  title,
}) => {
  const padding = 10;
  const pitchWidth = width - padding * 2;
  const pitchHeight = height - padding * 2;

  // Konverter prosentposisjoner til piksler
  const toPixelX = (percent: number) => padding + (percent / 100) * pitchWidth;
  const toPixelY = (percent: number) => padding + (percent / 100) * pitchHeight;

  return (
    <div className="inline-block">
      {title && (
        <div className="text-sm font-medium text-zinc-700 mb-2">{title}</div>
      )}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="rounded-lg shadow-md"
      >
        {/* Bane */}
        <Pitch
          width={width}
          height={height}
          halfPitch={halfPitch}
          pitchColor={pitchColor}
        />

        {/* Soner */}
        {zones.map((zone) => (
          <ZoneRect
            key={zone.id}
            x={zone.x}
            y={zone.y}
            width={zone.width}
            height={zone.height}
            color={zone.color}
            label={zone.label}
            pitchWidth={pitchWidth}
            pitchHeight={pitchHeight}
            padding={padding}
          />
        ))}

        {/* Mål */}
        {showGoals && (
          <>
            <Goal x={width / 2} y={height - padding} width={60} facing="down" />
            {!halfPitch && (
              <Goal x={width / 2} y={padding} width={60} facing="up" />
            )}
          </>
        )}

        {/* Minimål */}
        {miniGoals.map((goal, i) => (
          <MiniGoal
            key={i}
            x={toPixelX(goal.x)}
            y={toPixelY(goal.y)}
            rotation={goal.rotation}
          />
        ))}

        {/* Kjegler */}
        {cones.map((cone, i) => (
          <Cone key={i} x={toPixelX(cone.x)} y={toPixelY(cone.y)} />
        ))}

        {/* Bevegelser (tegnes før spillere så de er under) */}
        {movements.map((movement) => (
          <MovementArrow
            key={movement.id}
            from={{ x: toPixelX(movement.from.x), y: toPixelY(movement.from.y) }}
            to={{ x: toPixelX(movement.to.x), y: toPixelY(movement.to.y) }}
            type={movement.type}
            curved={movement.curved}
          />
        ))}

        {/* Spillere */}
        {players.map((player) => (
          <Player
            key={player.id}
            x={toPixelX(player.x)}
            y={toPixelY(player.y)}
            team={player.team}
            label={player.label}
          />
        ))}

        {/* Ball */}
        {ball && <Ball x={toPixelX(ball.x)} y={toPixelY(ball.y)} />}
      </svg>
    </div>
  );
};

// ============================================
// EKSEMPLER / PRESETS
// ============================================

/** Eksempel: Rondo 5v2 */
export const Rondo5v2Diagram = () => (
  <ExerciseDiagram
    width={300}
    height={300}
    halfPitch={false}
    showGoals={false}
    players={[
      { id: "1", x: 50, y: 10, team: "A", label: "1" },
      { id: "2", x: 90, y: 35, team: "A", label: "2" },
      { id: "3", x: 90, y: 65, team: "A", label: "3" },
      { id: "4", x: 50, y: 90, team: "A", label: "4" },
      { id: "5", x: 10, y: 50, team: "A", label: "5" },
      { id: "6", x: 40, y: 45, team: "B", label: "P" },
      { id: "7", x: 60, y: 55, team: "B", label: "P" },
    ]}
    ball={{ x: 50, y: 10 }}
    movements={[
      { id: "m1", from: { x: 50, y: 10 }, to: { x: 90, y: 35 }, type: "pass" },
    ]}
    cones={[
      { x: 20, y: 20 },
      { x: 80, y: 20 },
      { x: 80, y: 80 },
      { x: 20, y: 80 },
    ]}
    zones={[
      { id: "z1", x: 20, y: 20, width: 60, height: 60, label: "Rondo" },
    ]}
    title="Rondo 5v2"
  />
);

/** Eksempel: Overgangsspill */
export const TransitionDiagram = () => (
  <ExerciseDiagram
    width={400}
    height={500}
    halfPitch={false}
    players={[
      // Lag A (rødt) - angriper
      { id: "a1", x: 50, y: 85, team: "A", label: "9" },
      { id: "a2", x: 25, y: 70, team: "A", label: "7" },
      { id: "a3", x: 75, y: 70, team: "A", label: "11" },
      { id: "a4", x: 40, y: 55, team: "A", label: "8" },
      { id: "a5", x: 60, y: 55, team: "A", label: "10" },
      // Lag B (blått) - forsvarer
      { id: "b1", x: 35, y: 90, team: "B", label: "4" },
      { id: "b2", x: 65, y: 90, team: "B", label: "5" },
      { id: "b3", x: 50, y: 75, team: "B", label: "6" },
      // Keeper
      { id: "gk", x: 50, y: 97, team: "goalkeeper", label: "GK" },
    ]}
    ball={{ x: 40, y: 55 }}
    movements={[
      { id: "m1", from: { x: 40, y: 55 }, to: { x: 50, y: 85 }, type: "pass" },
      { id: "m2", from: { x: 25, y: 70 }, to: { x: 20, y: 85 }, type: "run" },
      { id: "m3", from: { x: 75, y: 70 }, to: { x: 65, y: 85 }, type: "run", curved: true },
    ]}
    zones={[
      { id: "bakrom", x: 15, y: 82, width: 70, height: 15, color: "rgba(239, 68, 68, 0.2)", label: "Bakrom" },
    ]}
    title="Overgangsspill - bakromsløp"
  />
);

export default ExerciseDiagram;
