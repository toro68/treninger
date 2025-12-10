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
    id: "sf-1",
    name: "1. Forstå hvorfor",
    description: "Soneforsvar forholder seg til spillsituasjon og medspillere - ikke motspillere",
    prerequisites: [],
    learningMoments: [
      "Forskjellen på sone- og markeringsforsvar",
      "Soneforsvar prioriterer: 1F (press) → 2F (sikring) → 3F (dekke rom)",
      "Markeringsforsvar prioriterer: 3F → 1F → 2F → sweeper",
      "Et godt forsvar er starten på effektive angrep",
    ],
    practiceFormats: [
      "Vis video av begge typer forsvar",
      "Diskuter i garderoben før trening",
      "Bruk tavle for å vise forskjellene",
    ],
    keyQuestions: [
      "Hva ser du på når du forsvarer? Motspiller eller ball/medspillere?",
      "Hvem bestemmer hvor du skal stå?",
    ],
    source: "tiim.no/soneforsvar",
  },
  {
    id: "sf-2",
    name: "2. Hvem er førsteforsvarer (1F)?",
    description: "Signalspiller som definerer lagets forsvar",
    prerequisites: ["Forstå forskjellen sone/markering"],
    learningMoments: [
      "Hovedregel: Spilleren nærmest ballfører er 1F",
      "Unntak 1: Back med spiller på yttersia = opphold, ikke press",
      "Unntak 2: Ikke bytt 1F når ballfører fører på tvers",
      "1F sin handling bestemmer resten av lagets handlinger",
    ],
    practiceFormats: [
      "Spill 4v4 med offside - hvem er 1F?",
      "Frys spillet - pek på hvem som er 1F",
      "Øv på å kommunisere '1F!' når du går i press",
    ],
    keyQuestions: [
      "Hvem er nærmest ballen akkurat nå?",
      "Hva gjør resten av laget når 1F går i press?",
    ],
    source: "tiim.no/soneforsvar",
  },
  {
    id: "sf-3",
    name: "3. Leding og screening",
    description: "Hvor vil du ha motspilleren?",
    prerequisites: ["Forstå hvem som er 1F"],
    learningMoments: [
      "Led mot sidelinja - der er det trangt",
      "Led inn hvis sikringsspiller er på innersida",
      "Led ut hvis du er alene uten sikring",
      "Screening: Nekte pasningslinje samtidig som du leder",
      "Bueløp for å stenge pasningskorridor",
    ],
    practiceFormats: [
      "2v1 situasjoner - hvor leder 1F?",
      "3v2 med fokus på å stenge pasningslinjer",
      "Spill med regel: ballfører MÅ ledes ut",
    ],
    keyQuestions: [
      "Har jeg sikring? → Led inn. Ingen sikring? → Led ut",
      "Hvilken pasningslinje må jeg stenge?",
    ],
    source: "tiim.no/soneforsvar",
  },
  {
    id: "sf-4",
    name: "4. Andreforsvareren (2F) - sikring",
    description: "Alltid ha en sikringsspiller bak 1F",
    prerequisites: ["Forstå 1F og leding"],
    learningMoments: [
      "Sikringsavstand: Større ved stor fart, mindre ved liten fart",
      "Nærmeste midtbanespiller sikrer kant i press",
      "Nærmeste stopper sikrer back i press",
      "Unntak nær 16m: Stoppere blir, midtbane/kant sikrer",
      "Verst mulig: 1A tar både 1F og 2F i ett jafs",
    ],
    practiceFormats: [
      "4v4 med fokus på sikringsavstand",
      "Frys spillet - hvem sikrer hvem?",
      "Øv kommunikasjon: 'Jeg sikrer deg!'",
    ],
    keyQuestions: [
      "Hvem sikrer 1F akkurat nå?",
      "Hva skjer hvis ballfører har stor fart?",
    ],
    source: "tiim.no/soneforsvar",
  },
  {
    id: "sf-5",
    name: "5. Sideforskyving og konsentrering",
    description: "Gjøre det trangt i bredderetningen",
    prerequisites: ["Forstå 1F, 2F og leding"],
    learningMoments: [
      "Ca. 10m avstand mellom forsvarsspillere",
      "Ball på kant: 5m-linja er rettesnor for motsatt side",
      "Midtbaneleddet sideforskyver 3-5m mer enn bakre ledd",
      "Konsentrering når ball er sentralt",
      "Jo smalere, jo vanskeligere å tre pasninger gjennom",
    ],
    practiceFormats: [
      "6v6 + keepere - fokus på 10m-avstander",
      "Spill med 'sideforskyvningskorridor' markert",
      "Frys spillet - mål avstander mellom spillere",
    ],
    keyQuestions: [
      "Hvor langt er det til nærmeste medspiller?",
      "Har vi konsentrert når ball er sentralt?",
    ],
    source: "tiim.no/soneforsvar",
  },
  {
    id: "sf-6",
    name: "6. Pumping og push-out",
    description: "Dybde - opp og ned som en enhet",
    prerequisites: ["Sideforskyving mestret"],
    learningMoments: [
      "Push-out: Ved klarering → hele laget rykker ut",
      "Pumping ut: Ved støttepasning, nøling, upresis pasning",
      "Pumping ned: Når bakrom trues og 1F ikke har press",
      "'Lese fot' - se om ballfører lader for gjennombrudd",
      "Det vanskeligste relasjonelle elementet!",
    ],
    practiceFormats: [
      "8v8 med fokus på pumping",
      "Trener roper 'støtte!' - laget pumper ut",
      "Video-analyse av egen pumping",
    ],
    keyQuestions: [
      "Har vi press på ballfører? → Pump ut. Ikke press? → Fall",
      "Hva gjør ballfører med kroppen?",
    ],
    source: "tiim.no/soneforsvar",
  },
  {
    id: "sf-7",
    name: "7. Presshøyde og press-signaler",
    description: "Når presser vi høyt vs. lavt?",
    prerequisites: ["Pumping mestret"],
    learningMoments: [
      "Press-signaler: Støttepasning, dårlig touch, feilvendt, ball til back",
      "Høyt press: Mer markeringsorientert, ta ut spillere foran",
      "Lavt press: Klassisk sone, stå kontrollert, vent på feil",
      "Å ligge lavt er IKKE trøbbel - det er en styrkeposisjon",
      "Tre ledd er alltid gunstig for godt forsvar",
    ],
    practiceFormats: [
      "9v9 med varierende presshøyde",
      "Innøv felles press-signaler",
      "Spill perioder: 5 min høyt, 5 min lavt",
    ],
    keyQuestions: [
      "Er vi bedre eller dårligere enn motstanderen?",
      "Hva er stilling i kampen?",
    ],
    source: "tiim.no/soneforsvar",
  },
];

export const LearnZonalDefense = ({ defaultOpen = true }: { defaultOpen?: boolean }) => {
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
            ? "border-violet-200/70 bg-gradient-to-r from-violet-50 to-purple-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Soneforsvar</h2>
          <p className="text-xs text-zinc-500">Fra prinsipper til automatisert samhandling</p>
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
                className={`rounded-lg border ${isExpanded ? "border-violet-200 bg-violet-50" : "border-zinc-100 bg-white"}`}
              >
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  className="w-full px-3 py-2 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      isExpanded ? "bg-violet-100 text-violet-700" : "bg-zinc-100 text-zinc-600"
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
                      <h4 className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">
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

                    <div className="rounded-md bg-violet-100 p-2">
                      <h4 className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">
                        Spør spillerne
                      </h4>
                      <ul className="text-xs text-violet-800 space-y-0.5">
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
                        className="text-violet-600 hover:underline"
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
              href="https://tiim.no/artikkel/soneforsvar-fra-prinsipper-til-laeringsmomenter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 hover:underline"
            >
              Soneforsvar - fra prinsipper til læringsmomenter
            </a>{" "}
            (NFF/tiim.no)
          </p>
        </div>
      )}
    </section>
  );
};
