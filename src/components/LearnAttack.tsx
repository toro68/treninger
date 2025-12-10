"use client";

import { useState } from "react";

type LearningPhase = {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
  learningMoments: string[];
  practiceFormats: string[];
  keyQuestions: string[];
  source: string;
};

const phases: LearningPhase[] = [
  {
    id: "a-1",
    name: "A1: Bearbeiding",
    description: "Motstander på plass - vi må jobbe for å skape rom",
    prerequisites: [],
    learningMoments: [
      "Ro med ball, åpne i førstetouch, true med blikk og fot",
      "Spille kontrollert fremover - søke igjennom før rundt",
      "Fra små rom til store rom, opp og ned, inn og ut",
      "Unngå å gi bort 'presseøyeblikk'",
      "Riktig avstand og vinkel til ballfører",
    ],
    practiceFormats: [
      "Rondo med overgangsmål",
      "Posisjonsspill 5v3 → 5v5",
      "Spill med 'vendingssoner'",
    ],
    keyQuestions: [
      "Kan jeg vende opp? Kan jeg spille fremover?",
      "Hvor er rommet?",
    ],
    source: "tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "a-2",
    name: "A2: Inn i prioriterte rom",
    description: "Ballfører kan nå alle prioriterte rom",
    prerequisites: ["A1 mestret"],
    learningMoments: [
      "Angrip hurtig fremover - bakrom først, så mellomrom",
      "True flere rom samtidig med bevegelse og posisjon",
      "Fart og timing i bakromstrussel",
      "Spillere bak ball: initiativ forbi ballfører eller støtteposisjon",
      "Organisert offensiv markering - klar for omstilling",
    ],
    practiceFormats: [
      "Oppbyggingsspill 7v7 med fokus på mellomrom",
      "Spill med 'A2-sone' der fremoverpass gir bonus",
      "Øv rettvendt mottak → fremoverpass",
    ],
    keyQuestions: [
      "Er motstander i ubalanse? → Angrip bakrom",
      "Hvor er rettvendt medspiller?",
    ],
    source: "tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "a-3",
    name: "A3: Avslutning",
    description: "Ballfører kan skape direkte trusler mot boks",
    prerequisites: ["A2 mestret"],
    learningMoments: [
      "True 1. stolpe, bakre stolpe og 45°",
      "Timing = lese ballførers blikk og touch",
      "Plassering før kraft i avslutning",
      "Kort tid mellom nest siste touch og avslutning",
      "Se på keeper, så på ball",
    ],
    practiceFormats: [
      "Innlegg med bevegelser - 3 spillere i boks",
      "Avslutningsøvelser med tidspress",
      "Spill med 'mål fra innlegg teller dobbelt'",
    ],
    keyQuestions: [
      "Hvor skal jeg være når innlegget kommer?",
      "Har jeg tid til et touch til?",
    ],
    source: "tiim.no/landslagsskolens-spillmodell",
  },
];

export const LearnAttack = ({ defaultOpen = true }: { defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-emerald-200/70 bg-gradient-to-r from-emerald-50 to-green-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Angrepsspill</h2>
          <p className="text-xs text-zinc-500">Fra A1 bearbeiding til A3 avslutning</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {phases.map((phase, index) => {
            const isExpanded = expandedPhase === phase.id;

            return (
              <div
                key={phase.id}
                className={`rounded-lg border ${isExpanded ? "border-emerald-200 bg-emerald-50" : "border-zinc-100 bg-white"}`}
              >
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  className="w-full px-3 py-2 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      isExpanded ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                    }`}>
                      A{index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">{phase.name}</h3>
                      <p className="text-xs text-zinc-500">{phase.description}</p>
                    </div>
                  </div>
                  <span className="text-zinc-400">{isExpanded ? "−" : "+"}</span>
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 space-y-3">
                    {phase.prerequisites.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                          Forutsetninger
                        </h4>
                        <ul className="text-xs text-zinc-600 space-y-0.5">
                          {phase.prerequisites.map((p, i) => (
                            <li key={i}>✓ {p}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">
                        Læringsmomenter
                      </h4>
                      <ul className="text-xs text-zinc-700 space-y-0.5">
                        {phase.learningMoments.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                        Øvingsformer
                      </h4>
                      <ul className="text-xs text-zinc-600 space-y-0.5">
                        {phase.practiceFormats.map((f, i) => (
                          <li key={i}>→ {f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-md bg-emerald-100 p-2">
                      <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">
                        Spør spillerne
                      </h4>
                      <ul className="text-xs text-emerald-800 space-y-0.5">
                        {phase.keyQuestions.map((q, i) => (
                          <li key={i}>❓ {q}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-zinc-400">
                      Kilde:{" "}
                      <a
                        href={`https://${phase.source}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline"
                      >
                        {phase.source}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100 mt-4">
            Kilde:{" "}
            <a
              href="https://tiim.no/artikkel/landslagsskolens-spillmodell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Landslagsskolens spillmodell
            </a>{" "}
            (NFF/tiim.no)
          </p>
        </div>
      )}
    </section>
  );
};
