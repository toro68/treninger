import Image from "next/image";
import Link from "next/link";

import { sessionTheoryItems } from "@/data/sessionTheory";

const drilloSectionGroups = [
  {
    id: "grunnmodell",
    label: "Grunnmodell",
    description: "Få prinsipper. Samme språk i angrep, forsvar og overgang.",
    sectionIds: [
      "theory-drillo-spilleprinsippmodellen",
      "theory-drillo-gjennombrudd-forst",
      "theory-drillo-dybde-bredde-bevegelse",
    ],
  },
  {
    id: "forsvar-og-press",
    label: "Forsvar og press",
    description: "Press, sikring og presshøyde må passe avstandene laget faktisk klarer å holde.",
    sectionIds: [
      "theory-drillo-soneforsvar",
      "theory-drillo-presshoyde",
      "theory-drillo-forste-og-andreball",
    ],
  },
  {
    id: "dodball",
    label: "Dødball",
    description: "Få varianter, klare roller og kontroll på første- og andreball i begge bokser.",
    sectionIds: [
      "theory-drillo-dodball-effektivitet",
      "theory-offensiv-corner-roller",
      "theory-defensiv-corner-prinsipper",
      "theory-frispark-boks-og-mur",
      "theory-andreball-beredskap",
    ],
  },
] as const;

const drilloSectionIds = drilloSectionGroups.flatMap((group) => group.sectionIds);

const drilloItems = drilloSectionIds
  .map((id) => sessionTheoryItems.find((item) => item.id === id))
  .filter((item) => item !== undefined);

const drilloGroups = drilloSectionGroups.map((group) => ({
  ...group,
  items: group.sectionIds
    .map((id) => drilloItems.find((item) => item.id === id))
    .filter((item) => item !== undefined),
}));

export const Drillo = () => {
  return (
    <section className="space-y-6">
      <section className="rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">Egil Olsen / Effektiv fotball</p>
          <h1 className="text-3xl font-bold text-zinc-900">Drillo: effektiv fotball i praksis</h1>
          <p className="max-w-3xl text-sm leading-6 text-zinc-700">
            Denne siden samler de viktigste kamp- og spillprinsippene fra Effektiv fotball. Stoffet brukes som
            teori og kampstøtte, mens Drillo-merkede øvelser ligger i øktplanleggeren.
          </p>
          <p className="max-w-3xl text-sm leading-6 text-sky-900">
            Søk etter <strong>Drillo:</strong> i øktplanleggeren for å finne oppspills- og dødballøvelsene.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/kamp"
            className="inline-flex rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Gå til kampmodulen
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-sky-400"
          >
            Gå til øktplanleggeren
          </Link>
        </div>
      </section>

      {drilloGroups.map((group) => (
        <section key={group.id} className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-5">
          <div className="space-y-2 px-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{group.label}</p>
            <p className="max-w-3xl text-sm leading-6 text-zinc-600">{group.description}</p>
          </div>

          <div className="space-y-4">
            {group.items.map((item) => {
              const imageSrc = item.imageUrl?.startsWith("/book-illustrations/drillo/") ? item.imageUrl : undefined;

              return (
                <section key={item.id} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="space-y-2 border-b border-zinc-100 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Drillo</p>
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
                        </article>
                      ) : null}
                    </div>
                  ) : null}

                  {imageSrc ? (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-sky-50">
                      <Image src={imageSrc} alt={item.title} width={960} height={640} className="h-auto w-full object-cover" />
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
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
};

export default Drillo;