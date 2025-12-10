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
    id: "r-1",
    name: "Generell spillforståelse",
    description: "Alle spillere må kunne både angrep OG forsvar",
    prerequisites: [],
    learningMoments: [
      "Det finnes ikke 'forsvarsspillere' og 'angrepsspillere' - alle må kunne begge deler",
      "Forståelse av lagfunksjoner: hva gjør VI i ulike situasjoner?",
      "Grunnleggende: hva betyr det å spille sammen?",
      "Les spillet: hvor er ballen, hvor er medspillere, hvor er motstandere?",
    ],
    practiceFormats: [
      "Smålagsspill der alle roterer posisjoner",
      "Spill uten faste posisjoner (kaos-spill)",
      "Diskusjonsøkter: Hva skjedde? Hva kunne vi gjort?",
    ],
    keyQuestions: ["Hva er min viktigste oppgave akkurat NÅ?", "Hvem trenger hjelp?"],
    source: "tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "r-2",
    name: "Posisjonsspesifikk introduksjon",
    description: "3-5 hovedoppgaver per posisjon",
    prerequisites: ["Generell spillforståelse etablert"],
    learningMoments: [
      "Hver posisjon har 3-5 HOVEDOPPGAVER - ikke alt på en gang",
      "Keeper: organisere, kommunisere, starte angrep",
      "Midtstopper: sikring, heading, spille fremover",
      "Back: sikring, 1v1, overlap/underlap",
      "6er: skjerme, vende spill, sikring i overganger",
      "8er: fremstøt, boks-til-boks, koble forsvar-angrep",
      "10er: mellomrom, vendepunkt, assistpoeng",
      "Spiss: holde ball, dybdeløp, avslutninger",
      "Kant: 1v1, innlegg, innoverløp",
    ],
    practiceFormats: [
      "Posisjonsspesifikke stasjoner",
      "Spill med fokus på én posisjon om gangen",
      "Video av toppspillere i samme rolle",
    ],
    keyQuestions: [
      "Hva er mine 3 viktigste oppgaver?",
      "Hva er jeg BEST på i min posisjon?",
    ],
    source: "tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "r-3",
    name: "Fasespesifikke oppgaver",
    description: "Hva gjør JEG i hver spillfase?",
    prerequisites: ["Posisjonsspesifikk introduksjon mestret"],
    learningMoments: [
      "Koble posisjon til fase: Hva gjør en BACK i F1? I A2?",
      "F1 (etablert forsvar): Min soneplassering, pumping, pressing-trigger",
      "F2 (overgangsforsvar): Hvem tar jeg? Hvem sikrer jeg?",
      "F3 (høy gjenvinning): Min rolle i motpress",
      "A1 (bearbeiding): Hvor tilbyr jeg meg? Avstander",
      "A2 (inn i rom): Når går jeg i bakrom? Når støtter jeg?",
      "A3 (avslutning): Hvor skal jeg være ved innlegg?",
    ],
    practiceFormats: [
      "Fasespesifikke øvelser med rollefokus",
      "Video-analyse av egne kamper",
      "Spill med 'fasekort' - hva gjør du når?",
    ],
    keyQuestions: [
      "Hva gjør JEG når vi er i fase X?",
      "Hvor skal jeg være? Hva skal jeg se etter?",
    ],
    source: "tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "r-4",
    name: "Relasjonell samhandling",
    description: "Hvordan samhandler jeg med de rundt meg?",
    prerequisites: ["Fasespesifikke oppgaver forstått"],
    learningMoments: [
      "Trekanter: jeg og mine to nærmeste - alltid pasningsalternativ",
      "Sikringsprinsipper: hvem sikrer hvem?",
      "Avstemming: høyre-venstre, foran-bak",
      "Kommunikasjon: hva trenger de andre å vite?",
      "Back + kant + 8er = angrepsflyt på siden",
      "6er + midtstoppere = sikringstriangel",
      "Kant + spiss = sluttprodukt-kobling",
    ],
    practiceFormats: [
      "Smågruppe-spill (3v3, 4v4) med faste roller",
      "Kombinasjonsspill i trekanter",
      "Spill der poeng gis for samhandling",
    ],
    keyQuestions: [
      "Hvem er mine to nærmeste relasjoner?",
      "Hvordan kommuniserer vi?",
      "Hvem sikrer meg når jeg går?",
    ],
    source: "tiim.no/landslagsskolens-spillmodell",
  },
];

export const LearnRoles = ({ defaultOpen = true }: { defaultOpen?: boolean }) => {
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
            ? "border-amber-200/70 bg-gradient-to-r from-amber-50 to-yellow-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Rolleforståelse</h2>
          <p className="text-xs text-zinc-500">Fra generell forståelse til relasjonell samhandling</p>
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
                className={`rounded-lg border ${isExpanded ? "border-amber-200 bg-amber-50" : "border-zinc-100 bg-white"}`}
              >
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  className="w-full px-3 py-2 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      isExpanded ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-600"
                    }`}>
                      {index + 1}
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
                      <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
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

                    <div className="rounded-md bg-amber-100 p-2">
                      <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                        Spør spillerne
                      </h4>
                      <ul className="text-xs text-amber-800 space-y-0.5">
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
                        className="text-amber-600 hover:underline"
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
              className="text-amber-600 hover:underline"
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
