import Link from "next/link";

import { sessionTheoryItems } from "@/data/sessionTheory";

const attackPostulates = sessionTheoryItems.find(
  (item) => item.id === "theory-roseborg-attack-postulates"
);

const defensePostulates = sessionTheoryItems.find(
  (item) => item.id === "theory-roseborg-defense-postulates"
);

const renderSection = (title: string, item: typeof attackPostulates) => {
  if (!item) return null;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-2 border-b border-zinc-100 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Godfoten</p>
        <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>
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

export const Godfoten = () => {
  return (
    <section className="space-y-6">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Nils Arne Eggen / Godfoten</p>
          <h1 className="text-3xl font-bold text-zinc-900">Godfoten: forsvar og angrepspostulater</h1>
          <p className="max-w-3xl text-sm leading-6 text-zinc-700">
            Denne siden er nå rendyrket som en teoriside for Godfoten-prinsippene. Øvelsene som tidligere lå her,
            finnes allerede i øktplanleggeren under kildene Eggen og Godfoten.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Gå til øktplanleggeren
          </Link>
          <div className="rounded-full border border-amber-300 bg-white px-4 py-2 text-sm text-zinc-700">
            Filtrer på kildene "Eggen" og "Godfoten" for å finne øvelsene
          </div>
        </div>
      </section>

      {renderSection("Angrepspostulatene", attackPostulates)}
      {renderSection("Forsvarspostulatene", defensePostulates)}
    </section>
  );
};

export default Godfoten;