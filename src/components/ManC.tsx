import Link from "next/link";

import { SelectableTheoryMessageCard } from "@/components/SelectableTheoryMessageCard";
import { sessionTheoryItems } from "@/data/sessionTheory";

const mancSectionGroups = [
  {
    id: "grunnmodell",
    label: "The City Way",
    description: "Grunnideen er at struktur i angrep også skal gjøre laget klart for forsvar og gjenvinning.",
    sectionIds: [
      "theory-manc-rondo-cruyff-quote",
      "theory-manc-city-way-overview",
      "theory-manc-ready-attack-ready-defend",
      "theory-manc-ball-does-the-work",
      "theory-manc-position-between-behind",
      "theory-manc-overloads-with-purpose",
    ],
  },
  {
    id: "oppbygging",
    label: "Angrep",
    description: "Side 33 til 35 beskriver tre tydelige oppbyggingsfaser fra kort utspill til gjennombrudd og innlegg i siste tredel.",
    sectionIds: [
      "theory-manc-build-up-phases",
      "theory-manc-build-up-phase-1",
      "theory-manc-build-up-phase-2",
      "theory-manc-build-up-phase-3",
    ],
  },
  {
    id: "avslutning",
    label: "Avslutning",
    description: "Korte spillerbudskap for hvordan City vil skape og avslutte angrep i siste tredel.",
    sectionIds: [
      "theory-manc-finishing-overload-and-timing",
      "theory-manc-finishing-fill-box-and-returrom",
    ],
  },
  {
    id: "forsvar",
    label: "Forsvar og Overgang",
    description: "Side 36 til 38 viser hvordan høyt press, midtblokk og boksforsvar henger sammen med gjenvinning og angrepsbalanse.",
    sectionIds: [
      "theory-manc-press-from-front",
      "theory-manc-midfield-defending",
      "theory-manc-box-defending",
    ],
  },
] as const;

const mancSectionIds = mancSectionGroups.flatMap((group) => group.sectionIds);

const mancItems = mancSectionIds
  .map((id) => sessionTheoryItems.find((item) => item.id === id))
  .filter((item) => item !== undefined);

const mancGroups = mancSectionGroups.map((group) => ({
  ...group,
  items: group.sectionIds
    .map((id) => mancItems.find((item) => item.id === id))
    .filter((item) => item !== undefined),
}));

export const ManC = () => {
  return (
    <section className="space-y-6">
      <section className="rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">Manchester City Academy / The City Way</p>
          <h1 className="text-3xl font-bold text-zinc-900">ManC: The City Way-prinsipper</h1>
          <p className="max-w-3xl text-sm leading-6 text-zinc-700">
            Denne siden samler hovedprinsippene fra The City Way-delen i boken til Darren Bowman, med utgangspunkt i side 30 til 38.
            Målet er å ha et eget ManC-språk for oppbygging, press, romkontroll og overgang.
          </p>
          <p className="max-w-3xl text-sm leading-6 text-sky-900">
            Søk etter <strong>ManC</strong> i øktplanleggeren for å finne øvelsene som bygger på de samme prinsippene.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Gå til øktplanleggeren
          </Link>
          <Link
            href="/kamp"
            className="inline-flex rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-sky-400"
          >
            Gå til kampmodulen
          </Link>
          <div className="rounded-full border border-sky-300 bg-white px-4 py-2 text-sm text-zinc-700">
            Kilde: The Manchester City Game Model, side 30 til 38
          </div>
        </div>
      </section>

      {mancGroups.map((group) => (
        <section key={group.id} className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-5">
          <div className="space-y-2 px-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{group.label}</p>
            <p className="max-w-3xl text-sm leading-6 text-zinc-600">{group.description}</p>
          </div>

          <div className="space-y-4">
            {group.items.map((item) => (
              <section key={item.id} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="space-y-2 border-b border-zinc-100 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">ManC</p>
                  <h2 className="text-2xl font-bold text-zinc-900">{item.title}</h2>
                  <p className="text-sm leading-6 text-zinc-600">{item.summary}</p>
                </div>

                {item.coachNote || item.playerMessage ? (
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {item.coachNote ? (
                      <article className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Kort trenerpoeng</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-700">{item.coachNote}</p>
                      </article>
                    ) : null}
                    {item.playerMessage ? (
                      <article className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">Spillerbudskap</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-700">{item.playerMessage}</p>
                        {item.category === "spillerbudskap" ? (
                          <div className="mt-3">
                            <SelectableTheoryMessageCard
                              theoryId={item.id}
                              title={item.title}
                              summary={item.summary}
                              sourceLabel="Velg til økta"
                              showPlayerMessage={false}
                            />
                          </div>
                        ) : null}
                      </article>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-4 space-y-4">
                  {item.sections?.map((section) => (
                    <article key={section.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <h3 className="text-base font-semibold text-zinc-900">{section.title}</h3>
                      {section.paragraphs?.length ? (
                        <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-700">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      ) : null}
                      {section.bullets?.length ? (
                        <ul className="mt-3 space-y-1 text-sm leading-6 text-zinc-700">
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>• {bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
};

export default ManC;
