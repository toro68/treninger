"use client";

import { twMerge } from "tailwind-merge";

export interface A01Figure25GeneralTemplateDiagramProps {
  className?: string;
}

/**
 * A01 – Figur 25 (generell form):
 * 2 angripere utfordrer 1 forsvarer. Ny gruppe settes i gang når forsvarer er passert.
 */
export const A01Figure25GeneralTemplateDiagram = ({ className }: A01Figure25GeneralTemplateDiagramProps) => {
  const width = 800;
  const height = 420;
  const margin = 20;

  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  // Utsnitt: fra 16m-linja (venstre) til midtbanesirkel (høyre)
  const sixteenLineX = Math.round(innerWidth * 0.18);
  const midLineX = Math.round(innerWidth * 0.82);
  const centerY = Math.round(innerHeight * 0.5);
  const centerCircleRadius = Math.round(innerHeight * 0.24);

  const COLORS = {
    red: "#ef4444",
    blue: "#3b82f6",
    line: "rgba(255,255,255,0.65)",
    lineSoft: "rgba(255,255,255,0.35)",
  } as const;

  const player = (id: string, x: number, y: number, variant: "red" | "blue", label?: string) => {
    const fill = variant === "red" ? COLORS.red : COLORS.blue;
    return (
      <g key={id}>
        <circle cx={x} cy={y} r={12} fill={fill} stroke="rgba(255,255,255,0.85)" strokeWidth={2.5} />
        {label ? (
          <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={11} fontWeight={800}>
            {label}
          </text>
        ) : null}
      </g>
    );
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

    const stroke = emphasis ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)";
    const strokeWidth = emphasis ? 5 : 3;

    const path = (() => {
      if (!curved) return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
      const cx = (from.x + to.x) / 2;
      const cy = Math.min(from.y, to.y) - 28;
      return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
    })();

    return (
      <path
        key={id}
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashed ? "7 7" : undefined}
        markerEnd="url(#arrowHead-a01-fig25)"
      />
    );
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="a01-fig25-title"
      className={twMerge("w-full h-auto", className)}
    >
      <title id="a01-fig25-title">A01 – Figur 25: Generell 2v1 mot 1</title>

      <defs>
        <linearGradient id="pitchGradient-a01-fig25" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b7d3c" />
          <stop offset="100%" stopColor="#226030" />
        </linearGradient>
        <pattern id="pitchGrass-a01-fig25" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="rgba(255,255,255,0.04)" />
          <rect width="8" height="4" fill="rgba(255,255,255,0.02)" />
        </pattern>
        <marker
          id="arrowHead-a01-fig25"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.9)" />
        </marker>
      </defs>

      <rect width={width} height={height} rx={24} fill="url(#pitchGradient-a01-fig25)" />
      <rect width={width} height={height} rx={24} fill="url(#pitchGrass-a01-fig25)" />

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

        {/* 16m-boks (venstre) */}
        <rect
          x={0}
          y={Math.round(innerHeight * 0.22)}
          width={sixteenLineX}
          height={Math.round(innerHeight * 0.56)}
          fill="none"
          stroke={COLORS.line}
          strokeWidth={3}
        />

        {/* 5m-boks (venstre, liten) */}
        <rect
          x={0}
          y={Math.round(innerHeight * 0.36)}
          width={Math.round(sixteenLineX * 0.46)}
          height={Math.round(innerHeight * 0.28)}
          fill="none"
          stroke={COLORS.lineSoft}
          strokeWidth={2.5}
        />

        {/* 16m-linje (start) */}
        <line x1={sixteenLineX} y1={18} x2={sixteenLineX} y2={innerHeight - 18} stroke={COLORS.line} strokeWidth={3} />

        {/* Midtlinje (slutt) */}
        <line x1={midLineX} y1={18} x2={midLineX} y2={innerHeight - 18} stroke={COLORS.lineSoft} strokeWidth={3} strokeDasharray="10 8" />

        {/* Midtbanesirkel (høyre) – vi viser venstre del av sirkelen i utsnittet */}
        <circle cx={midLineX} cy={centerY} r={centerCircleRadius} fill="none" stroke={COLORS.lineSoft} strokeWidth={3} />

        {/* "Ball-lager" / kø (4 baller) */}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={Math.round(sixteenLineX * 0.22)}
            cy={Math.round(innerHeight * 0.26) + i * 22}
            r={6}
            fill={COLORS.red}
            stroke="rgba(255,255,255,0.75)"
            strokeWidth={2}
          />
        ))}

        {/* Spillere (rød = angriper, blå = forsvarer) */}
        {player("a1", Math.round(sixteenLineX * 0.95), Math.round(innerHeight * 0.36), "red", "A1")}
        {player("a2", Math.round(sixteenLineX * 0.98), Math.round(innerHeight * 0.50), "red", "A2")}
        {player("d1", Math.round(innerWidth * 0.53), Math.round(innerHeight * 0.46), "blue")}

        {/* Ventende ny gruppe (høyre) */}
        {player("w1", Math.round(midLineX + centerCircleRadius * 0.25), Math.round(centerY - centerCircleRadius * 0.35), "red")}
        {player("w2", Math.round(midLineX + centerCircleRadius * 0.25), Math.round(centerY + centerCircleRadius * 0.35), "red")}

        {/* Bevegelser */}
        {arrow(
          "m1",
          { x: Math.round(sixteenLineX * 0.95), y: Math.round(innerHeight * 0.36) },
          { x: Math.round(innerWidth * 0.63), y: Math.round(innerHeight * 0.34) },
          { emphasis: true }
        )}
        {arrow(
          "m2",
          { x: Math.round(sixteenLineX * 0.98), y: Math.round(innerHeight * 0.50) },
          { x: Math.round(innerWidth * 0.61), y: Math.round(innerHeight * 0.54) },
          { dashed: true }
        )}

        <text x={sixteenLineX} y={14} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize={12} fontWeight={700}>
          Start
        </text>
        <text x={midLineX} y={14} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={12} fontWeight={700}>
          Ny gruppe
        </text>
      </g>
    </svg>
  );
};
