"use client";

import { twMerge } from "tailwind-merge";

export interface A01Figure26OverlapTemplateDiagramProps {
  className?: string;
}

/**
 * A01 – Figur 26 (spesifikk spillsituasjon):
 * Kantspiller utfordrer sideback, får overlapp fra egen back og kan avslutte med innlegg.
 */
export const A01Figure26OverlapTemplateDiagram = ({ className }: A01Figure26OverlapTemplateDiagramProps) => {
  const width = 800;
  const height = 420;
  const margin = 20;

  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  // Horisontal orientering: angrep mot høyre (16m-boks på høyre side)
  const COLORS = {
    red: "#ef4444",
    blue: "#3b82f6",
    line: "rgba(255,255,255,0.65)",
    lineSoft: "rgba(255,255,255,0.35)",
  } as const;

  const penaltyAreaDepth = Math.round(innerWidth * 0.22);
  const penaltyAreaHeight = Math.round(innerHeight * 0.56);
  const penaltyAreaTop = Math.round((innerHeight - penaltyAreaHeight) / 2);
  const penaltyAreaLeft = innerWidth - penaltyAreaDepth;

  const goalAreaDepth = Math.round(penaltyAreaDepth * 0.45);
  const goalAreaHeight = Math.round(penaltyAreaHeight * 0.5);
  const goalAreaTop = Math.round((innerHeight - goalAreaHeight) / 2);
  const goalAreaLeft = innerWidth - goalAreaDepth;

  const player = (
    id: string,
    x: number,
    y: number,
    label: string,
    variant: "attacker" | "defender" | "neutral" = "attacker"
  ) => {
    const fill = variant === "defender" ? COLORS.blue : variant === "neutral" ? "rgba(255,255,255,0.92)" : COLORS.red;
    const stroke = "rgba(255,255,255,0.85)";

    return (
      <g key={id}>
        <circle cx={x} cy={y} r={14} fill={fill} stroke={stroke} strokeWidth={3} />
        <text
          x={x}
          y={y + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={12}
          fontWeight={800}
        >
          {label}
        </text>
      </g>
    );
  };

  const arrowPath = (from: { x: number; y: number }, to: { x: number; y: number }, curved?: boolean) => {
    if (!curved) return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const cx = from.x + dx * 0.55;
    const cy = from.y + dy * 0.45 - 35;
    return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
  };

  const arrow = (
    id: string,
    from: { x: number; y: number },
    to: { x: number; y: number },
    opts?: { dashed?: boolean; curved?: boolean; emphasis?: boolean }
  ) => {
    const dashed = opts?.dashed;
    const curved = opts?.curved;
    const emphasis = opts?.emphasis;

    return (
      <path
        key={id}
        d={arrowPath(from, to, curved)}
        fill="none"
        stroke={emphasis ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)"}
        strokeWidth={emphasis ? 4 : 3}
        strokeLinecap="round"
        strokeDasharray={dashed ? "7 7" : undefined}
        markerEnd="url(#arrowHead-a01-fig26)"
      />
    );
  };

  // Plasseringer (illustrative, lik referansen)
  const winger = { x: Math.round(penaltyAreaLeft - penaltyAreaDepth * 0.55), y: Math.round(penaltyAreaTop + penaltyAreaHeight * 0.78) };
  const fullback = { x: Math.round(penaltyAreaLeft - penaltyAreaDepth * 0.85), y: Math.round(penaltyAreaTop + penaltyAreaHeight * 0.92) };
  const sideback = { x: Math.round(penaltyAreaLeft - penaltyAreaDepth * 0.35), y: Math.round(penaltyAreaTop + penaltyAreaHeight * 0.78) };
  const overlapReceive = { x: Math.round(penaltyAreaLeft - penaltyAreaDepth * 0.35), y: Math.round(penaltyAreaTop + penaltyAreaHeight * 0.36) };
  const crossTarget = { x: Math.round(penaltyAreaLeft + penaltyAreaDepth * 0.55), y: Math.round(penaltyAreaTop + penaltyAreaHeight * 0.55) };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="a01-fig26-title"
      className={twMerge("w-full h-auto", className)}
    >
      <title id="a01-fig26-title">A01 – Figur 26: Kant 1v1 + overlapp + innlegg</title>

      <defs>
        <linearGradient id="pitchGradient-a01-fig26" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b7d3c" />
          <stop offset="100%" stopColor="#226030" />
        </linearGradient>
        <pattern id="pitchGrass-a01-fig26" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="rgba(255,255,255,0.04)" />
          <rect width="8" height="4" fill="rgba(255,255,255,0.02)" />
        </pattern>
        <marker
          id="arrowHead-a01-fig26"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.9)" />
        </marker>
      </defs>

      <rect width={width} height={height} rx={24} fill="url(#pitchGradient-a01-fig26)" />
      <rect width={width} height={height} rx={24} fill="url(#pitchGrass-a01-fig26)" />

      <g transform={`translate(${margin}, ${margin})`}>
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

        {/* Mål (høyre) */}
        <rect
          x={innerWidth}
          y={Math.round(innerHeight / 2 - 50)}
          width={10}
          height={100}
          fill="#fff"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth={2}
        />

        {/* Seksten-meter (høyre) */}
        <rect
          x={penaltyAreaLeft}
          y={penaltyAreaTop}
          width={penaltyAreaDepth}
          height={penaltyAreaHeight}
          fill="none"
          stroke={COLORS.line}
          strokeWidth={3}
        />

        {/* Fem-meter (høyre) */}
        <rect
          x={goalAreaLeft}
          y={goalAreaTop}
          width={goalAreaDepth}
          height={goalAreaHeight}
          fill="none"
          stroke={COLORS.lineSoft}
          strokeWidth={2.5}
        />

        {/* Touchline-markør (kant nede) */}
        <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke={COLORS.lineSoft} strokeWidth={3} />

        {/* Spillere */}
        {player("wing", winger.x, winger.y, "K", "attacker")}
        {player("fb", fullback.x, fullback.y, "B", "attacker")}
        {player("sb", sideback.x, sideback.y, "SB", "defender")}
        {player("str", crossTarget.x, crossTarget.y, "S", "attacker")}

        {/* Bevegelser */}
        {arrow("dribble", { x: winger.x, y: winger.y }, { x: winger.x + 70, y: winger.y - 6 }, { emphasis: true })}
        {arrow("overlapRun", { x: fullback.x, y: fullback.y }, { x: overlapReceive.x, y: overlapReceive.y }, { dashed: true, curved: true })}
        {arrow("passToOverlap", { x: winger.x + 8, y: winger.y - 2 }, { x: overlapReceive.x - 6, y: overlapReceive.y + 2 }, { curved: true })}
        {arrow(
          "cross",
          { x: overlapReceive.x + 18, y: overlapReceive.y - 2 },
          { x: crossTarget.x - 10, y: crossTarget.y - 8 },
          { emphasis: true, curved: true }
        )}

        <text x={18} y={14} textAnchor="start" fill="rgba(255,255,255,0.8)" fontSize={12} fontWeight={700}>
          Kant 1v1 → overlapp → innlegg
        </text>
        <text x={penaltyAreaLeft} y={penaltyAreaTop - 10} textAnchor="start" fill="rgba(255,255,255,0.6)" fontSize={11} fontWeight={700}>
          16m
        </text>
      </g>
    </svg>
  );
};
