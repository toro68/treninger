"use client";

import { useState } from "react";

import { uefaExercises } from "@/data/uefa-exercises";
import { uefaAnalyses, type Rolle, type UEFAAnalyse } from "@/data/uefaAnalyses";

type PositionCard = {
  name: string;
  description: string;
  tasks: string[];
  roles: Rolle[];
};

const positionCards: PositionCard[] = [
  {
    name: "Keeper",
    description: "Styr laget bakfra og vær en aktiv del av spillmodellen.",
    tasks: [
      "Angrep: vær spillbar som vendingspunkt og velg kort, mellom eller langt med klar hensikt.",
      "Forsvar: ha startposisjon som gjør deg i stand til å rydde bakrom tidlig.",
      "Kommunikasjon: gi tidlige, tydelige signaler til bakre ledd og ved innlegg.",
      "Dødballer: organiser mur og boksforsvar med klare roller.",
    ],
    roles: ["Keeper"],
  },
  {
    name: "Back",
    description: "Skap bredde i angrep og kontroll på sidekorridor i forsvar.",
    tasks: [
      "Forsvar: led motstander utover og sikre rommet mellom back og stopper.",
      "Angrep: gå når timing og restforsvar er avklart, ikke bare når rommet ser stort ut.",
      "Relasjon: skap trekant med ving og indreløper på din side.",
      "Ved innlegg mot: forsvar bakre rom og avklar hvem som tar løpene i boksen.",
    ],
    roles: ["Back", "Sideback", "Høyreback", "Venstreback", "Vingback"],
  },
  {
    name: "Midtstopper",
    description: "Styr dybde, avstand og retning i laget uten ball.",
    tasks: [
      "Ledelse: styr linjen opp, ned og sideveis med tydelige kommandoer.",
      "Forsvar: kontroller bakrom og vær tydelig på når laget skal falle eller holde.",
      "Boksforsvar: vinn første duell og organiser rommet foran mål.",
      "Angrep: før frem når du har kontroll, men uten å eksponere restforsvaret.",
    ],
    roles: ["Stopper"],
  },
  {
    name: "Sentral midtbane (6-er)",
    description: "Balansepunktet mellom struktur, pasningskvalitet og gjenvinning.",
    tasks: [
      "Vær spillbar før laget trenger deg og orienter før mottak.",
      "Skjerm rommet foran stopperne og steng sentrale pasningslinjer.",
      "Sikre sentralt når laget angriper på kant.",
      "Sett tempo med riktig valg, ikke bare med raske valg.",
    ],
    roles: ["Sentral midtbane"],
  },
  {
    name: "Indreløper (8-er)",
    description: "Bind sammen leddene og skap fart inn i mellomrom, bakrom og boks.",
    tasks: [
      "Gjør deg spillbar i mellomrom med riktig kroppsstilling og oversikt.",
      "Avstem med 6-er og back: én går, én sikrer.",
      "Søk boks når angrepet utvikles i sidekorridor.",
      "Ved balltap: vær klar til å bli første pressledd eller sikre nærmeste rom.",
    ],
    roles: ["Indreløper", "Offensiv midtbane"],
  },
  {
    name: "Ving",
    description: "Skap sluttprodukt under tidspress og fyll boksen når ballen er motsatt.",
    tasks: [
      "Start bredt for å åpne rom og tru både bakrom og fot.",
      "Jobb hjem slik at back og ving forsvarer som en relasjon.",
      "Ta raske valg i siste tredel: 1v1, innlegg, cutback eller tilbake for ny rytme.",
      "Motsatt side: trekk inn og vær klar for bakre løp eller gjenvinning.",
    ],
    roles: ["Vinger", "Høyrevinger", "Venstrevinger"],
  },
  {
    name: "Spiss",
    description: "Strekk laget, led presset og avgjør i boksen.",
    tasks: [
      "Vær første forsvarer og styr motstanders oppspill i ønsket retning.",
      "Tru bakrom for å åpne mellomrom for laget bak deg.",
      "I boksen: time løp sent og angrip rette scoringssoner.",
      "Veksle mellom å møte og strekke slik at relasjonene rundt deg får tydelige bilder.",
    ],
    roles: ["Spiss"],
  },
];

const exerciseById = new Map(uefaExercises.map((exercise) => [exercise.id, exercise]));

const uniqueStrings = (values: string[]) => Array.from(new Set(values));

const matchesPointRole = (roles: Rolle[], pointRole?: Rolle) => !pointRole || roles.includes(pointRole);

const getAnalysesForRoles = (roles: Rolle[]) =>
  uefaAnalyses
    .filter((analysis) => analysis.roller.some((role) => roles.includes(role)))
    .sort((left, right) => left.kode.localeCompare(right.kode));

const getMatchFocus = (analyses: UEFAAnalyse[], roles: Rolle[]) =>
  uniqueStrings(
    analyses.flatMap((analysis) =>
      analysis.fokuspunkter
        .filter((point) => matchesPointRole(roles, point.rolle))
        .map((point) => point.tekst),
    ),
  ).slice(0, 4);

const getLearningCues = (analyses: UEFAAnalyse[]) =>
  uniqueStrings(
    analyses.flatMap((analysis) => analysis.coachingCues.map((cue) => `${cue.kategori}: ${cue.gjor}`)),
  ).slice(0, 4);

const getTrainingExercises = (analyses: UEFAAnalyse[]) => {
  const seen = new Set<string>();
  const exercises = [];

  for (const analysis of analyses) {
    for (const reference of analysis.ovelser) {
      const exercise = exerciseById.get(reference.kode);
      if (exercise && !seen.has(exercise.id)) {
        seen.add(exercise.id);
        exercises.push(exercise);
      }
    }
  }

  return exercises.slice(0, 3);
};

const roleSections = positionCards.map((card) => {
  const analyses = getAnalysesForRoles(card.roles);

  return {
    ...card,
    analyses,
    matchFocus: getMatchFocus(analyses, card.roles),
    learningCues: getLearningCues(analyses),
    trainingExercises: getTrainingExercises(analyses),
    sourceLabels: uniqueStrings(analyses.map((analysis) => `${analysis.kode} ${analysis.forfatter}`)),
  };
});

export const Roles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUefaDetail, setShowUefaDetail] = useState(true);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Roller (4-3-3)</h2>
          <p className="text-xs text-zinc-500">Kamp, trening og læring per posisjon</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3">
            <p className="text-sm font-medium text-zinc-900">UEFA-basert rollelag</p>
            <p className="mt-1 text-xs text-zinc-600">
              Kampfokus, treningsformer og coaching-cues under er hentet fra de verifiserte UEFA-oppgavene og
              øvelsene i appen. Grunnoppgavene er beholdt som korte rollebeskrivelser for kampbruk.
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span className="text-xs text-zinc-600">Vis UEFA-basert kamp, trening og læring</span>
            <button
              type="button"
              onClick={() => setShowUefaDetail(!showUefaDetail)}
              className={`rounded-full px-3 py-1 text-xs transition ${
                showUefaDetail
                  ? "bg-amber-600 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {showUefaDetail ? "På" : "Av"}
            </button>
          </div>

          {roleSections.map((position) => (
            <div key={position.name} className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-zinc-900">{position.name}</h3>
                <p className="mt-1 text-xs text-zinc-500">{position.description}</p>
              </div>

              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Grunnoppgaver
                </h4>
                <ul className="space-y-1 text-xs text-zinc-700">
                  {position.tasks.map((task, index) => (
                    <li key={index}>• {task}</li>
                  ))}
                </ul>
              </div>

              {showUefaDetail && (
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-zinc-200 bg-white p-3">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                      Kampfokus fra UEFA
                    </h4>
                    {position.matchFocus.length > 0 ? (
                      <ul className="space-y-1 text-xs text-zinc-700">
                        {position.matchFocus.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-zinc-500">Ingen egne kampfokus funnet for denne rollen.</p>
                    )}
                  </div>

                  <div className="rounded-lg border border-zinc-200 bg-white p-3">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Trening fra UEFA
                    </h4>
                    {position.trainingExercises.length > 0 ? (
                      <ul className="space-y-2 text-xs text-zinc-700">
                        {position.trainingExercises.map((exercise) => (
                          <li key={exercise.id}>
                            <span className="font-medium text-zinc-900">{exercise.name}</span>
                            <span className="block text-zinc-500">{exercise.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-zinc-500">
                        Ingen direkte UEFA-øvelser registrert for rollen. Bruk kampfokus og læringscues som
                        styring av treningsinnhold.
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg border border-zinc-200 bg-white p-3">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                      Læringscues fra UEFA
                    </h4>
                    {position.learningCues.length > 0 ? (
                      <ul className="space-y-1 text-xs text-zinc-700">
                        {position.learningCues.map((cue) => (
                          <li key={cue}>• {cue}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-zinc-500">Ingen egne coaching-cues funnet for denne rollen.</p>
                    )}
                  </div>
                </div>
              )}

              {showUefaDetail && position.sourceLabels.length > 0 && (
                <p className="mt-3 border-t border-zinc-200 pt-3 text-xs text-zinc-400">
                  UEFA-kilder: {position.sourceLabels.join(" · ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
