"use client";

import { twMerge } from "tailwind-merge";

type Zone = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  emphasis?: boolean;
  description?: string;
};

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

  // Bane-dimensjoner tilpasset proporsjoner fra A15
  const sixteenMeterWidth = 440;
  const sixteenMeterHeight = 200;
  const fiveMeterWidth = 220;
  const fiveMeterHeight = 80;
  
  // Beregn posisjoner
  const sixteenLeft = (innerWidth - sixteenMeterWidth) / 2;
  const sixteenRight = sixteenLeft + sixteenMeterWidth;
  const fiveLeft = (innerWidth - fiveMeterWidth) / 2;
  const fiveRight = fiveLeft + fiveMeterWidth;
  
  // Mål og stolper - målvidde ca 7.32m, skalert til diagram
  const goalWidth = 100;
  const goalLeft = innerWidth / 2 - goalWidth / 2;
  const goalRight = innerWidth / 2 + goalWidth / 2;

  // Soner basert på A15 figur 2 - A-F innenfor 16m, A/B/C innenfor 5m avgrenset av stengene
  const zones: Zone[] = [
    // G-soner (utenfor 16-meter) - venstre side
    { id: "zone-g-left", label: "G", x: 0, y: 0, width: sixteenLeft, height: sixteenMeterHeight, description: "Utenfor 16m venstre" },
    
    // E-soner: mellom 5m-linje og 16m-linje, ved dødlinje
    { id: "zone-e-left", label: "E", x: sixteenLeft, y: 0, width: fiveLeft - sixteenLeft, height: fiveMeterHeight, description: "Mellom 5m og 16m linje, venstre" },
    
    // A/B/C innenfor 5-meter, avgrenset av stolpene - A/B = første/bakre stolpe avhengig av innleggside
    { id: "zone-ab-left", label: "A/B", x: fiveLeft, y: 0, width: goalLeft - fiveLeft, height: fiveMeterHeight, emphasis: true, description: "Første/bakre stolpe (avhengig av innleggside)" },
    { id: "zone-c", label: "C", x: goalLeft, y: 0, width: goalWidth, height: fiveMeterHeight, emphasis: true, description: "Sentral sone foran mål (mellom stolpene)" },
    { id: "zone-ab-right", label: "A/B", x: goalRight, y: 0, width: fiveRight - goalRight, height: fiveMeterHeight, emphasis: true, description: "Første/bakre stolpe (avhengig av innleggside)" },
    
    { id: "zone-e-right", label: "E", x: fiveRight, y: 0, width: sixteenRight - fiveRight, height: fiveMeterHeight, description: "Mellom 5m og 16m linje, høyre" },
    
    // G-soner (utenfor 16-meter) - høyre side
    { id: "zone-g-right", label: "G", x: sixteenRight, y: 0, width: innerWidth - sixteenRight, height: sixteenMeterHeight, description: "Utenfor 16m høyre" },
    
    // Nedre rekke: F-soner på sidene, D i midten (mellom 5m-linje og 16m-linje)
    { id: "zone-f-left", label: "F", x: sixteenLeft, y: fiveMeterHeight, width: fiveLeft - sixteenLeft, height: sixteenMeterHeight - fiveMeterHeight, description: "Retursone venstre (mellom 5m og 16m)" },
    { id: "zone-d", label: "D", x: fiveLeft, y: fiveMeterHeight, width: fiveMeterWidth, height: sixteenMeterHeight - fiveMeterHeight, emphasis: true, description: "Sentral retursone (innenfor 5m bredde, bak 5m linje)" },
    { id: "zone-f-right", label: "F", x: fiveRight, y: fiveMeterHeight, width: sixteenRight - fiveRight, height: sixteenMeterHeight - fiveMeterHeight, description: "Retursone høyre (mellom 5m og 16m)" },
    
    // G-sone (utenfor 16-meter) - bunn/midten av banen
    { id: "zone-g-center", label: "G", x: 0, y: sixteenMeterHeight, width: innerWidth, height: innerHeight - sixteenMeterHeight, description: "Utenfor 16m sentralt" },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="scoring-zones-title"
      className={twMerge("w-full h-auto", className)}
    >
      <title id="scoring-zones-title">Scoringssoner for innlegg (A/B, C, D, E, F, G) - Kilde: Gard Kristiansen UEFA A-lisens</title>
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
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              fill={zone.emphasis ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}
              stroke="#dc2626"
              strokeWidth={2}
              strokeDasharray={zone.label === "G" ? "6 4" : undefined}
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
        <circle cx={innerWidth / 2} cy={130} r={4} fill="#fff" />
        
        {/* Straffesparkbue - mindre radius */}
        <path
          d={`M ${sixteenLeft + 100} ${sixteenMeterHeight} A 60 60 0 0 0 ${sixteenRight - 100} ${sixteenMeterHeight}`}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={2}
        />
      </g>
    </svg>
  );
};
