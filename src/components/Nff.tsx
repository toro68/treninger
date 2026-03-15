import Link from "next/link";

import { sessionTheoryItems } from "@/data/sessionTheory";

const nffSectionIds = [
  "theory-nff-relasjonell-kompetanse",
  "theory-nff-fra-nier-til-ellever",
  "theory-nff-felles-sprak-og-spillide",
  "theory-nff-soneforsvar-hvorfor",
  "theory-nff-pa-rett-side",
  "theory-nff-presshoyde-samstemthet",
] as const;

const nffItems = nffSectionIds
  .map((id) => sessionTheoryItems.find((item) => item.id === id))
  .filter((item) => item !== undefined);

const renderSection = (item: (typeof nffItems)[number]) => {
  if (!item) return null;

  return (
    <section key={item.id} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-2 border-b border-zinc-100 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-700">NFF</p>
        <h2 className="text-2xl font-bold text-zinc-900">{item.title}</h2>
        <p className="text-sm leading-6 text-zinc-600">{item.summary}</p>
      </div>

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
};

export const Nff = () => {
  return (
    <section className="space-y-6">
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-800">NFF / 11-er fotball</p>
          <h1 className="text-3xl font-bold text-zinc-900">NFF: konkrete tips for 11-er</h1>
          <p className="max-w-3xl text-sm leading-6 text-zinc-700">
            Denne siden samler enkle og konkrete NFF-poeng for 11-er-fotball. Tyngdepunktet er angrepsstruktur,
            rolleforståelse, soneforsvar og press.
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
            className="inline-flex rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-red-400"
          >
            Gå til øktplanleggeren
          </Link>
        </div>
      </section>

      {nffItems.map((item) => renderSection(item))}
    </section>
  );
};

export default Nff;