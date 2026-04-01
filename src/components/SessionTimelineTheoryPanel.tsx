import Image from "next/image";
import { getSessionTheoryCategoryLabel, sessionTheoryItems } from "@/data/sessionTheory";

type SessionTimelineTheoryPanelProps = {
  selectedTheoryIds: Set<string>;
  onToggleTheory: (id: string) => void;
};

export const SessionTimelineTheoryPanel = ({
  selectedTheoryIds,
  onToggleTheory,
}: SessionTimelineTheoryPanelProps) => (
  <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-zinc-800">Teori nederst i fullversjonen</h3>
        <p className="text-xs text-zinc-500">
          Huk av korte teoribiter du vil ha med som trenernotat og spillerbudskap.
        </p>
      </div>
      <span className="text-xs text-sky-700">{selectedTheoryIds.size} valgt</span>
    </div>

    <div className="mt-3 grid gap-2">
      {sessionTheoryItems.map((item) => {
        const checked = selectedTheoryIds.has(item.id);
        return (
          <article
            key={item.id}
            className={`rounded-xl border px-3 py-2 transition ${
              checked
                ? "border-sky-300 bg-white shadow-sm"
                : "border-sky-100 bg-white/70 hover:border-sky-200"
            }`}
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleTheory(item.id)}
                className="mt-0.5 h-4 w-4 rounded border-sky-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {getSessionTheoryCategoryLabel(item.category)}
                </span>
                <span className="mt-0.5 block text-sm font-medium text-zinc-900">{item.title}</span>
                <span className="mt-1 block text-xs leading-5 text-zinc-600">{item.summary}</span>
              </span>
            </label>

            {item.imageUrl ? (
              <div className="mt-3 overflow-hidden rounded-lg border border-sky-100 bg-sky-50">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={960}
                  height={640}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : null}

            {item.sections?.length ? (
              <details className="mt-3 rounded-lg bg-sky-50/70 px-3 py-2 text-sm text-zinc-700">
                <summary className="cursor-pointer list-none font-medium text-sky-800 marker:hidden">
                  Vis detaljer
                </summary>
                <div className="mt-3 space-y-3">
                  {item.sections.map((section) => (
                    <section key={section.title} className="space-y-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        {section.title}
                      </h4>
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph} className="text-xs leading-5 text-zinc-700">
                          {paragraph}
                        </p>
                      ))}
                      {section.bullets?.length ? (
                        <ul className="space-y-1 text-xs leading-5 text-zinc-700">
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>• {bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              </details>
            ) : null}
          </article>
        );
      })}
    </div>
  </div>
);