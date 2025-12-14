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
  sourceLabel: string;
  sourceUrl?: string;
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
    sourceLabel: "tiim.no/landslagsskolens-spillmodell",
    sourceUrl: "https://tiim.no/landslagsskolens-spillmodell",
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
    sourceLabel: "tiim.no/landslagsskolens-spillmodell",
    sourceUrl: "https://tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "a-3",
    name: "A3: Rytme (ro → akselerasjon → sluttprodukt)",
    description: "Skifte gir med tydelige touch- og tempo-valg",
    prerequisites: ["A2 mestret"],
    learningMoments: [
      "Rytme er et valg: ro for å flytte – akselerasjon for å bryte",
      "Touch-regel: 2-touch for kontroll, 1-touch når vi skal bryte linjer",
      "Tempo-switch: bestem på forhånd hva som er signalet (press, resultat, tid)",
      "Vendingsvalg: vend når du har dratt presset til én side – ikke som autopilot",
    ],
    practiceFormats: [
      "Spill med ‘Tempo!’-signal: 10 sek med 1-touch i siste tredjedel",
      "Possession → ‘switch’-regel: scoring teller kun etter en rask vending",
      "Posisjonsspill med touch-koder (2-touch i base, 1-touch i ‘break’-sone)",
    ],
    keyQuestions: [
      "Skal vi kontrollere eller bryte nå?",
      "Hvem er vendingspunktet på motsatt side?",
    ],
    sourceLabel: "UEFA A04 (Finn Bredo Olsen)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa_a_2012_oppgave_finn_bredo_olsen.pdf",
  },
  {
    id: "a-4",
    name: "A4: ‘Siste 3’ – tempo og tredjespiller",
    description: "<7 sek fra tredjespiller til avslutning",
    prerequisites: ["A3 mestret"],
    learningMoments: [
      "KPI: jakt <7 sek fra ‘tredje sist’ (tredjespiller) til avslutning",
      "Tredjespiller (10/8): skann før mottak, rettvendt første touch, raske valg under press",
      "Touch-prinsipp: færre touch jo nærmere mål (målscorer ofte 1–2)",
      "Tredjemannsbevegelse: spill på 3. mann i fart, ikke bare ‘ball til fot’",
    ],
    practiceFormats: [
      "Øvelse: tredjespiller → målgivende → avslutning med klokke (telles høyt)",
      "Spill med ‘3 siste involverte’-bonus: scoring teller dobbelt hvis 3. sist er involvert",
      "Small-sided: maks 2 touch for ‘tredjespiller’-rollen i siste tredjedel",
    ],
    keyQuestions: [
      "Hvem er tredjespiller akkurat nå?",
      "Hvordan får vi en rettvendt ballfører som kan øke tempo?",
    ],
    sourceLabel: "UEFA A02 (Per Inge Jacobsen)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2013-oppgave-per-inge-jacobsen.pdf",
  },
  {
    id: "a-5",
    name: "A5: Avslutningsvalg (kontroll før kraft)",
    description: "Vent–les–plasser + lavt i hjørnet",
    prerequisites: ["A4 mestret"],
    learningMoments: [
      "Førstevalg: lavt i hjørnet (tenk ‘pasning i hjørnet’)",
      "Velg presisjon: kontroll, plassering og curl når du har tid",
      "1v1 med keeper: vent – se – plasser/chipp (utfordre keeperen først)",
      "Skaff tid før avslutning: medtak bort fra press + bevegelse som skaper rom",
    ],
    practiceFormats: [
      "Avslutning med beslutningssignal: ‘kontroll’ (plassering) vs ‘tidspress’ (tidlig avslutning)",
      "1v1 mot keeper med ‘vent–les–plasser’-fokus",
      "Avslutninger fra ulike vinkler med krav om lavt plassert",
    ],
    keyQuestions: [
      "Har jeg tid nok til å velge plassering?",
      "Hva gjør keeper – og når må jeg avslutte?",
    ],
    sourceLabel: "UEFA A03 (Tom Selmer)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa_a_2012_oppgave_tom_selmer.pdf",
  },
  {
    id: "a-6",
    name: "A6: Innlegg langs bakken (cut-back/45°) + 2./3.-bevegelse",
    description: "Skap rom med første løp – utnytt med neste",
    prerequisites: ["A5 mestret"],
    learningMoments: [
      "Tidlige innlegg mellom keeper og forsvar, ofte langs bakken (45°/cut-back)",
      "2. og 3. bevegelse i boks: første løp skaper rom, neste løp utnytter",
      "Fyll rom 1. stolpe, bakre stolpe og 45°/returrom – hver gang",
      "Avslutter: kom på blindsiden lenge – rykk på ball",
    ],
    practiceFormats: [
      "Innlegg/cut-back-serie: 10 reps fra hver side med faste boksroller",
      "Spill på siste tredjedel: scoring teller kun etter cut-back/45°",
      "Boksbevegelser: ‘første løp’ uten ball → ‘andre bølge’ avslutning",
    ],
    keyQuestions: [
      "Hvilket målrom angriper vi: 1. stolpe, bakre eller 45°?",
      "Hvem tar første løp – og hvem kommer på andre bølge?",
    ],
    sourceLabel: "UEFA A03 (Tom Selmer)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa_a_2012_oppgave_tom_selmer.pdf",
  },
  {
    id: "a-7",
    name: "A7: Målscorer-kultur (1-touch, 11 m, returer)",
    description: "Bygg vaner som gir flere mål",
    prerequisites: ["A6 mestret"],
    learningMoments: [
      "1-touch som standard i boks (ofte 1–2 touch totalt)",
      "Riktig sone: innenfor 16 m – helst 11 m – før sjansen",
      "Blindsiden lenge, rykk på ball (timing > fart)",
      "Etterarbeid: returer er en vane – alltid inn i returrom",
    ],
    practiceFormats: [
      "Avslutninger i 11 m-sone med 1-touch-krav",
      "Innlegg + returoppfølging (2. ball) som egen deløvelse",
      "Kampnære repetisjoner: 6–8 sek sekvenser til avslutning",
    ],
    keyQuestions: [
      "Er jeg i 11 m-sonen når innlegget går?",
      "Hvor er returen hvis skuddet blokkeres eller keeper gir retur?",
    ],
    sourceLabel: "UEFA A07 (Sigurd Rushfeldt)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oppgave-sigurd-rushfeldt.pdf",
  },
  {
    id: "a-8",
    name: "A8: Overgangsspill etter brudd",
    description: "8–10 sek KPI og tydelig prioriteringsrekkefølge",
    prerequisites: ["A4 mestret"],
    learningMoments: [
      "KPI: skap avslutning innen 8–10 sek etter brudd når det er mulig",
      "Prioritering: frem i lengderetning hvis det er der – ellers vekk fra press for ny rettvendt ballfører",
      "Ikke autopilot på første løp: skap trusler i flere rom samtidig",
    ],
    practiceFormats: [
      "Overgangsspill med klokke: 10 sek til avslutning eller ‘reset’",
      "3-løp-regel: minst to samtidige trusler (bakrom + støtte) før gjennombruddspasning",
    ],
    keyQuestions: [
      "Kan vi spille frem nå – eller må vi først vekk fra press?",
      "Har vi flere trusler, eller spiller vi på første løp hver gang?",
    ],
    sourceLabel: "UEFA A09 (Bjarte Lunde Aarsheim)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2014-oppgave-bjarte-lunde-aarsheim.pdf",
  },
  {
    id: "a-9",
    name: "A9: Kant/winger – sluttprodukt under tid/rom-press",
    description: "1v1 → innlegg/cut-back med kvalitet",
    prerequisites: ["A6 mestret"],
    learningMoments: [
      "Kant avgjør ofte under tett press (1–3 m) og kort tidsvindu (1–4 sek)",
      "Velg tidlig: slå, gå forbi, eller spill tilbake – basert på rom og press",
      "Innlegg/cut-back trenes mot konkrete målrom (5 m + sentralt i boks)",
    ],
    practiceFormats: [
      "Constraints: små soner + poeng for presist innlegg/cut-back til målrom",
      "1v1 på kant med krav om sluttprodukt innen 4 sek",
    ],
    keyQuestions: [
      "Hva er ‘safe’ sluttprodukt her: cut-back, tidlig innlegg eller 1v1?",
      "Hvem fyller boksen (spiss/motsatt kant/indreløper)?",
    ],
    sourceLabel: "UEFA A10 (Hugo Pereira)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2015-oppgave-hugo-pereira.pdf",
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
          <p className="text-xs text-zinc-500">Fra bearbeiding til sluttprodukt (tempo, valg, vaner)</p>
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
                      {phase.sourceUrl ? (
                        <a
                          href={phase.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline"
                        >
                          {phase.sourceLabel}
                        </a>
                      ) : (
                        <span>{phase.sourceLabel}</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100 mt-4">
            Kilder: Landslagsskolens spillmodell (NFF/tiim.no) + UEFA A-oppgaver
          </p>
        </div>
      )}
    </section>
  );
};
