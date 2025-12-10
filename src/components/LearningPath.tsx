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

type LearningTrack = {
  id: string;
  title: string;
  description: string;
  phases: LearningPhase[];
};

const learningTracks: LearningTrack[] = [
  {
    id: "soneforsvar",
    title: "Soneforsvar",
    description: "Fra prinsipper til automatisert samhandling",
    phases: [
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
    ],
  },
  {
    id: "angrep",
    title: "Angrepsspill",
    description: "Fra A1 bearbeiding til A3 avslutning",
    phases: [
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
    ],
  },
  {
    id: "roller",
    title: "Rolleforståelse",
    description: "Fra generell til spesifikk rolletrening",
    phases: [
      {
        id: "r-1",
        name: "1. Generell spillforståelse",
        description: "Alle må forstå alle faser",
        prerequisites: [],
        learningMoments: [
          "Hver spiller må kunne: angrep OG forsvar",
          "Forstå fasene: A1, A2, A3, F1, F2, F3",
          "'Begge veier'-spillere er trenden",
          "Dyrking av statusroller gir tap på sikt",
        ],
        practiceFormats: [
          "Rotér posisjoner i smålagsspill",
          "La alle prøve alle roller",
          "Diskuter faser etter hver øvelse",
        ],
        keyQuestions: [
          "Hvilken fase er vi i nå?",
          "Hva er målet i denne fasen?",
        ],
        source: "tiim.no/soneforsvar",
      },
      {
        id: "r-2",
        name: "2. Posisjonsspesifikk introduksjon",
        description: "Lære hovedoppgavene til din posisjon",
        prerequisites: ["Generell spillforståelse"],
        learningMoments: [
          "Lær 3-5 hovedoppgaver per posisjon",
          "Forstå forskjellen på angreps- og forsvarsoppgaver",
          "Lær relasjoner: Hvem samarbeider jeg mest med?",
          "Forstå formasjonen du spiller i",
        ],
        practiceFormats: [
          "Rolle-spesifikke økter (1x uke)",
          "Video av toppspillere i din rolle",
          "Øv med 'spillerkort' med oppgaver",
        ],
        keyQuestions: [
          "Hva er mine 3 viktigste oppgaver i forsvar?",
          "Hvem er mine nærmeste relasjoner?",
        ],
        source: "tiim.no/rolletrening",
      },
      {
        id: "r-3",
        name: "3. Fasespesifikke oppgaver",
        description: "Hva gjør JEG i hver spillfase?",
        prerequisites: ["Posisjonsspesifikk introduksjon"],
        learningMoments: [
          "F1: Hva er min pressoppgave?",
          "F2: Hvordan hindrer jeg tilgang til prioriterte rom?",
          "F3: Hvordan hindrer jeg mål?",
          "A1: Hvordan gjør jeg meg spillbar?",
          "A2: Hvordan truer jeg prioriterte rom?",
          "A3: Hvordan kommer jeg til avslutning?",
        ],
        practiceFormats: [
          "Fase-fokuserte smålagsspill",
          "Situasjonsøvelser per fase",
          "Video-analyse av egen rolle i hver fase",
        ],
        keyQuestions: [
          "Hva gjør jeg når vi er i F2?",
          "Hvor skal jeg være i A3?",
        ],
        source: "tiim.no/landslagsskolens-spillmodell",
      },
      {
        id: "r-4",
        name: "4. Relasjonell samhandling",
        description: "Hvordan fungerer jeg med medspillere?",
        prerequisites: ["Fasespesifikke oppgaver"],
        learningMoments: [
          "Trekanter: Back-kant-indreløper",
          "Sikringsprinsipper: Hvem sikrer hvem?",
          "Avstemming: En går, en sikrer (3+2)",
          "Kommunikasjon: Klart språk for posisjoner",
        ],
        practiceFormats: [
          "Smålagsspill med faste relasjoner",
          "Øv kommunikasjon på stopp-start",
          "'Relasjonsboks' - kun 2-3 spillere med oppgaver",
        ],
        keyQuestions: [
          "Hvem sikrer meg når jeg presser?",
          "Hvordan kommuniserer vi bytting?",
        ],
        source: "tiim.no/rolletrening",
      },
    ],
  },
];

const phaseColors: Record<string, string> = {
  soneforsvar: "violet",
  angrep: "emerald",
  roller: "amber",
};

export const LearningPath = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string>("soneforsvar");
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const currentTrack = learningTracks.find((t) => t.id === activeTrack);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-sky-200/70 bg-gradient-to-r from-sky-50 to-cyan-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Opplæringsplan</h2>
          <p className="text-xs text-zinc-500">Progresjon for soneforsvar, angrep og roller</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Track selector */}
          <div className="flex gap-2 border-b border-zinc-100 pb-3">
            {learningTracks.map((track) => {
              const trackColor = phaseColors[track.id];
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setActiveTrack(track.id);
                    setExpandedPhase(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition ${
                    activeTrack === track.id
                      ? `bg-${trackColor}-600 text-white`
                      : `bg-zinc-100 text-zinc-700 hover:bg-zinc-200`
                  }`}
                  style={{
                    backgroundColor: activeTrack === track.id 
                      ? track.id === "soneforsvar" ? "#7c3aed" 
                        : track.id === "angrep" ? "#059669"
                        : "#d97706"
                      : undefined
                  }}
                >
                  {track.title}
                </button>
              );
            })}
          </div>

          {/* Track description */}
          {currentTrack && (
            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
              <p className="text-xs text-zinc-600">{currentTrack.description}</p>
            </div>
          )}

          {/* Learning phases */}
          {currentTrack && (
            <div className="space-y-2">
              {currentTrack.phases.map((phase, index) => {
                const isExpanded = expandedPhase === phase.id;
                const borderColor = activeTrack === "soneforsvar" ? "border-violet-200" 
                  : activeTrack === "angrep" ? "border-emerald-200"
                  : "border-amber-200";
                const bgColor = activeTrack === "soneforsvar" ? "bg-violet-50" 
                  : activeTrack === "angrep" ? "bg-emerald-50"
                  : "bg-amber-50";
                const textColor = activeTrack === "soneforsvar" ? "text-violet-700" 
                  : activeTrack === "angrep" ? "text-emerald-700"
                  : "text-amber-700";

                return (
                  <div
                    key={phase.id}
                    className={`rounded-lg border ${isExpanded ? borderColor : "border-zinc-100"} ${isExpanded ? bgColor : "bg-white"}`}
                  >
                    <button
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                      className="w-full px-3 py-2 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          isExpanded ? `${bgColor} ${textColor}` : "bg-zinc-100 text-zinc-600"
                        }`}
                        style={{
                          backgroundColor: isExpanded 
                            ? activeTrack === "soneforsvar" ? "#ede9fe" 
                              : activeTrack === "angrep" ? "#d1fae5"
                              : "#fef3c7"
                            : undefined,
                          color: isExpanded
                            ? activeTrack === "soneforsvar" ? "#6d28d9" 
                              : activeTrack === "angrep" ? "#047857"
                              : "#b45309"
                            : undefined
                        }}
                        >
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
                        {/* Prerequisites */}
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

                        {/* Learning moments */}
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide mb-1"
                            style={{
                              color: activeTrack === "soneforsvar" ? "#6d28d9" 
                                : activeTrack === "angrep" ? "#047857"
                                : "#b45309"
                            }}
                          >
                            Læringsmomenter
                          </h4>
                          <ul className="text-xs text-zinc-700 space-y-0.5">
                            {phase.learningMoments.map((m, i) => (
                              <li key={i}>• {m}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Practice formats */}
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

                        {/* Key questions */}
                        <div className="rounded-md p-2"
                          style={{
                            backgroundColor: activeTrack === "soneforsvar" ? "#f5f3ff" 
                              : activeTrack === "angrep" ? "#ecfdf5"
                              : "#fffbeb"
                          }}
                        >
                          <h4 className="text-xs font-semibold uppercase tracking-wide mb-1"
                            style={{
                              color: activeTrack === "soneforsvar" ? "#6d28d9" 
                                : activeTrack === "angrep" ? "#047857"
                                : "#b45309"
                            }}
                          >
                            Spør spillerne
                          </h4>
                          <ul className="text-xs space-y-0.5"
                            style={{
                              color: activeTrack === "soneforsvar" ? "#5b21b6" 
                                : activeTrack === "angrep" ? "#065f46"
                                : "#92400e"
                            }}
                          >
                            {phase.keyQuestions.map((q, i) => (
                              <li key={i}>❓ {q}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Source */}
                        <p className="text-xs text-zinc-400">
                          Kilde:{" "}
                          <a
                            href={`https://${phase.source}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            style={{
                              color: activeTrack === "soneforsvar" ? "#7c3aed" 
                                : activeTrack === "angrep" ? "#059669"
                                : "#d97706"
                            }}
                          >
                            {phase.source}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pedagogical principle */}
          <div className="rounded-lg border border-violet-200 bg-violet-50 p-3 text-xs text-violet-800 mt-4">
            Kampdag? Åpne soneforsvar-tråden i opplæringsseksjonen for å friske opp prinsipper og roller.
          </div>

          <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 mt-4">
            <h4 className="text-xs font-semibold text-sky-800 mb-1">Pedagogisk prinsipp</h4>
            <p className="text-xs text-sky-700">
              «Retningslinjene for soneforsvar har til hensikt å forenkle spillsituasjonen for spillerne. 
              Læringsmomentene bygger på hverandre. Som trener må du være tålmodig, slik at læring skjer. 
              Derfor må du følge en læringskronologi.»
            </p>
            <p className="text-xs text-sky-600 mt-1 italic">— tiim.no/soneforsvar</p>
          </div>

          {/* Source */}
          <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100">
            Basert på{" "}
            <a
              href="https://tiim.no/tema/spillmodeller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline"
            >
              Landslagsskolens spillmodell
            </a>{" "}
            og{" "}
            <a
              href="https://tiim.no/artikkel/soneforsvar-fra-prinsipper-til-laeringsmomenter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline"
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
