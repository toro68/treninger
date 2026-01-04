"use client";

import { useState } from "react";

type PositionModule = {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
  mustHave: string[];
  coachingCues: string[];
  practiceFormats: string[];
  keyQuestions: string[];
  sourceLabel: string;
  sourceUrl?: string;
};

const positions: PositionModule[] = [
  {
    id: "433-k",
    name: "Keeper (4-3-3)",
    description: "Igangsetter + sweeper + feltkontroll",
    prerequisites: [],
    mustHave: [
      "Igangsette med riktig valg (kort/mellom/langt) – ikke autopilot",
      "Startposisjon som gjør deg spillbar og klar for bakrom",
      "Sweeper-beslutning: bli/kom (timing + retning i klarering)",
      "Feltkontroll på innlegg: ta eller bokse – tydelig kommando",
      "Organisere linje og bokssone (første/midt/bakre) før innlegg",
    ],
    coachingCues: ["Bilde før ball", "Startposisjon", "Tidlig signal"],
    practiceFormats: [
      "Øvelse: innlegg + andreball (keeper må rope tidlig og eie valg)",
      "Spill: 6v6 + keeper der keeper gir poeng for riktig igangsetting",
    ],
    keyQuestions: [
      "Har vi balanse (3+2) før jeg setter i gang raskt?",
      "Skal jeg ta eller bokse dette innlegget – og hvorfor?",
    ],
    sourceLabel: "UEFA A01 (Even Ødegaard)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-even-odegaard.pdf",
  },
  {
    id: "433-ms",
    name: "Midtstoppere (4-3-3)",
    description: "Sikring + duell + spille fremover",
    prerequisites: ["Keeper som igangsetter"],
    mustHave: [
      "Styreforsvar: 1F/2F/3F-logikk (press/sikring/dekke rom)",
      "Sikre rom bak (dybdekontroll) – ikke bli stående flatt",
      "Vinne dueller i luft/mark (timing + kroppsstilling)",
      "Spille fremover når mulig (finne 6/8 eller motsatt side)",
      "Kommunisere linje (opp/hold/fall) og ansvar på innlegg",
    ],
    coachingCues: ["Først sikre sentralt", "Snakk tidlig", "Se bakrom"],
    practiceFormats: [
      "Øvelse: 6v4 oppbygging – stoppere må finne 6/8 på 1–2 trekk",
      "Spill: forsvar mot innlegg med boksroller (første/midt/bakre) + andreball",
    ],
    keyQuestions: [
      "Er vi i balanse til å støte, eller må vi sikre bakrom først?",
      "Hvem er farligst i boksen (første/midt/bakre)?",
    ],
    sourceLabel: "tiim.no/landslagsskolens-spillmodell",
    sourceUrl: "https://tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "433-b",
    name: "Backer (4-3-3)",
    description: "1v1, timing på støtte og sikring",
    prerequisites: ["Relasjon stopper–6er forstått"],
    mustHave: [
      "1v1 defensivt: lede + timing i press (ikke selge deg)",
      "Sikre bakrom når kant går i press/vi er høyt",
      "Timing i støtte: når overlapp/underlapp gir fordel",
      "Innlegg/cut-back: presisjon og valg (ikke bare slå)",
      "Vite når du skal holde igjen (restforsvar/balanse)",
    ],
    coachingCues: ["Vent–les–press", "Sikre bakrom", "Kvalitet på siste"],
    practiceFormats: [
      "Øvelse: 1v1 på kant + støtte (kant/8/back) med krav om sluttprodukt",
      "Spill: 7v7 der back ikke kan gå samtidig på begge sider (balansekrav)",
    ],
    keyQuestions: [
      "Har jeg sikring bak meg hvis jeg går?",
      "Skal jeg utfordre (1v1) eller skape 2v1 med støtte?",
    ],
    sourceLabel: "tiim.no/landslagsskolens-spillmodell",
    sourceUrl: "https://tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "433-6",
    name: "6-er (anker) (4-3-3)",
    description: "Balanse før ballvinning + trygg progresjon",
    prerequisites: ["Midtstoppernes oppbygging forstått"],
    mustHave: [
      "Balanse før ballvinning (steng sentralt først)",
      "Scanning x2 (før ball + idet ballen reiser)",
      "Spillbar i mellomrom uten å bli markert ut",
      "Pasningssikkerhet under press (førstevalg = sikre neste ledd)",
      "Restforsvar-sjekk ved angrep (hva kan gå galt ved balltap?)",
    ],
    coachingCues: ["Balanse først", "Skann igjen", "Spillbar"],
    practiceFormats: [
      "Øvelse: 5v2/6v3 i trange rom med 6-er som vendingspunkt (bonus for linjebrudd)",
      "Spill: 8v8 med ‘3+2’-krav før mange fyller boks",
    ],
    keyQuestions: [
      "Er jeg spillbar uten å være dekket?",
      "Hvis vi mister ballen nå: hvem stopper første pasning frem?",
    ],
    sourceLabel: "UEFA A06 (Øyvind Iversen)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oyvind-iversen.pdf",
  },
  {
    id: "433-8",
    name: "8-ere (indreløpere) (4-3-3)",
    description: "Koble ledd + skape rettvendt neste ledd",
    prerequisites: ["6-er grunnprinsipper"],
    mustHave: [
      "Mikrojustering før mottak (skape vinkel/rom)",
      "Rett-/sidevendt mottak med beslutning (0–2 sek på ball i trykk)",
      "Tredjemannsbevegelse: møte–slippe–gå",
      "Siste pasning/cut-back når du er høy (presisjon > kraft)",
      "Gjenvinning/overgang: være første som reagerer (5-sek/retning)",
    ],
    coachingCues: ["Bilde før ball", "Rettvendt", "Spill og gå"],
    practiceFormats: [
      "Øvelse: 4v4+3 med 8-ere i mellomrom (poeng for brudd → avslutning)",
      "Spill: ‘siste 3’-regel der 8-er må være involvert før avslutning",
    ],
    keyQuestions: [
      "Kan jeg gjøre ballfører rettvendt på neste handling?",
      "Er det nå vi skal bryte (tempo), eller sikre (ro)?",
    ],
    sourceLabel: "UEFA A08 (Gard Holme)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/idrett---676258---uefa-a-2014-oppgave-gard-holme.pdf",
  },
  {
    id: "433-kant",
    name: "Kanter (4-3-3)",
    description: "1v1 + sluttprodukt under tid/press",
    prerequisites: ["Back + indreløper-relasjon"],
    mustHave: [
      "Avgjøre under tid/press (1–4 sek, 1–3 m) med få berøringer",
      "Innlegg/cut-back/45° med presisjon under press",
      "Løp inn i boks på bakre/målrom når ball er motsatt",
      "Velge tidlig: 1v1, sluttprodukt eller tilbake for ny rytme",
      "Motpress etter balltap (første 5 sek) – helst mot ballfører",
    ],
    coachingCues: ["Tid!", "To touch max", "Målrom/cut-back"],
    practiceFormats: [
      "Øvelse: 1v1 på kant med krav om sluttprodukt innen 4 sek",
      "Innlegg/cut-back med boksroller (spiss + motsatt kant + 8-er)",
    ],
    keyQuestions: [
      "Hva er beste sluttprodukt nå – og har jeg tid til det?",
      "Hvem fyller boksen: spiss, motsatt kant, indreløper?",
    ],
    sourceLabel: "UEFA A10 (Hugo Pereira)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2015-oppgave-hugo-pereira.pdf",
  },
  {
    id: "433-9",
    name: "Spiss (9-er) (4-3-3)",
    description: "1–2 touch, 5–11 m-sone, returer, blindsideløp",
    prerequisites: ["Kanter som leverer sluttprodukt"],
    mustHave: [
      "1–2 touch i boks (beslutning før ball)",
      "5–11 m-sone (kom deg inn i 11 m før sjansen)",
      "Blindsideløp (ligg i blindsone lenge, rykk på ball)",
      "Returer/andreball (returrom er alltid din jobb)",
      "Første press/1F-signal i gjenvinning (vinn når balanse, sink når ubalanse)",
    ],
    coachingCues: ["Inn i 11 m", "Blindsiden", "Følg skuddet"],
    practiceFormats: [
      "Øvelse: avslutning i 11 m-sone med 1-touch-krav + returløp",
      "Innlegg + andreball: spiss må alltid følge inn i returrom",
    ],
    keyQuestions: [
      "Er jeg i riktig sone når ballen skal inn?",
      "Hvor går returen hvis skuddet blir blokkert eller keeper gir retur?",
    ],
    sourceLabel: "UEFA A07 (Sigurd Rushfeldt)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oppgave-sigurd-rushfeldt.pdf",
  },
];

export const Learn433Positions = ({
  defaultOpen = true,
}: {
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          <h2 className="text-lg font-semibold text-zinc-900">4-3-3: Posisjonsopplæring</h2>
          <p className="text-xs text-zinc-500">Sjekklister + cues + én øvelse per rolle</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {positions.map((position, index) => {
            const isExpanded = expandedId === position.id;

            return (
              <div
                key={position.id}
                className={`rounded-lg border ${
                  isExpanded
                    ? "border-amber-200 bg-amber-50"
                    : "border-zinc-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : position.id)}
                  className="w-full px-3 py-2 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        isExpanded
                          ? "bg-amber-100 text-amber-700"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">{position.name}</h3>
                      <p className="text-xs text-zinc-500">{position.description}</p>
                    </div>
                  </div>
                  <span className="text-zinc-400">{isExpanded ? "−" : "+"}</span>
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 space-y-3">
                    {position.prerequisites.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                          Forutsetninger
                        </h4>
                        <ul className="text-xs text-zinc-600 space-y-0.5">
                          {position.prerequisites.map((p, i) => (
                            <li key={i}>✓ {p}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                        Må kunne (3–5)
                      </h4>
                      <ul className="text-xs text-zinc-700 space-y-0.5">
                        {position.mustHave.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                        Coaching-cues
                      </h4>
                      <ul className="text-xs text-zinc-600 space-y-0.5">
                        {position.coachingCues.map((c, i) => (
                          <li key={i}>→ {c}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                        Øvelse (minst én)
                      </h4>
                      <ul className="text-xs text-zinc-600 space-y-0.5">
                        {position.practiceFormats.map((f, i) => (
                          <li key={i}>→ {f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-md bg-amber-100 p-2">
                      <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                        Spør spillerne
                      </h4>
                      <ul className="text-xs text-amber-800 space-y-0.5">
                        {position.keyQuestions.map((q, i) => (
                          <li key={i}>❓ {q}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-zinc-400">
                      Kilde:{" "}
                      {position.sourceUrl ? (
                        <a
                          href={position.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:underline"
                        >
                          {position.sourceLabel}
                        </a>
                      ) : (
                        position.sourceLabel
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
