"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { getExerciseCode } from "@/data/exercises";
import { getSessionTheoryItem } from "@/data/sessionTheory";
import { AppHeader } from "@/components/AppHeader";
import { decodeSharedSessionToken } from "@/utils/sessionShare";
import { getUnit, recommendedDuration } from "@/store/sessionStore";

function SharedSessionPageContent() {
  const searchParams = useSearchParams();
  const sharedSession = useMemo(
    () => decodeSharedSessionToken(searchParams.get("s")),
    [searchParams]
  );

  const parts = useMemo(() => {
    if (!sharedSession) return [];

    const grouped = [
      { key: "skadefri", title: "1. Skadefri", subtitle: "Spillerne styrer selv", blocks: [] as typeof sharedSession.sessionBlocks },
      { key: "styrke", title: "2. Styrke", subtitle: "Valgfri", blocks: [] as typeof sharedSession.sessionBlocks },
      { key: "oppvarming", title: "3. Oppvarming", subtitle: "Valgfri", blocks: [] as typeof sharedSession.sessionBlocks },
      { key: "rondo", title: "4. Rondo", subtitle: "Valgfri", blocks: [] as typeof sharedSession.sessionBlocks },
      { key: "stasjoner", title: "5. Stasjoner", subtitle: "", blocks: [] as typeof sharedSession.sessionBlocks },
      { key: "spill", title: "6. Spill", subtitle: "", blocks: [] as typeof sharedSession.sessionBlocks },
      { key: "avslutning", title: "7. Avslutning", subtitle: "Restitusjon og evaluering", blocks: [] as typeof sharedSession.sessionBlocks },
    ];

    sharedSession.sessionBlocks.forEach((block) => {
      const category = block.exercise.category;
      if (category === "fixed-warmup") grouped[0].blocks.push(block);
      else if (category === "cooldown" && block.exercise.theme === "styrke") grouped[1].blocks.push(block);
      else if (category === "warmup" || category === "aktivisering") grouped[2].blocks.push(block);
      else if (category === "rondo") grouped[3].blocks.push(block);
      else if (category === "station") grouped[4].blocks.push(block);
      else if (category === "game") grouped[5].blocks.push(block);
      else if (category === "cooldown") grouped[6].blocks.push(block);
    });

    const stationCount = grouped[4].blocks.length;
    if (stationCount > 0) {
      const playersPerStation = Math.floor(sharedSession.playerCount / stationCount);
      grouped[4].subtitle = `${stationCount} øvelse${stationCount > 1 ? "r" : ""} · ${playersPerStation} spillere per stasjon`;
    }

    return grouped.filter((part) => part.blocks.length > 0);
  }, [sharedSession]);

  const totalMinutes = useMemo(
    () => sharedSession?.sessionBlocks.reduce((sum, block) => sum + recommendedDuration(block), 0) ?? 0,
    [sharedSession]
  );

  const selectedTheoryItems = useMemo(() => {
    if (!sharedSession) return [];
    return [...sharedSession.selectedTheoryIds]
      .map((id) => getSessionTheoryItem(id))
      .filter((item) => !!item);
  }, [sharedSession]);

  const groupedTheoryItems = useMemo(() => {
    return [
      {
        category: "spillerbudskap" as const,
        title: "Spillerbudskap",
        description: "Samlet budskap som kan brukes direkte mot spillergruppen.",
        items: selectedTheoryItems.filter((item) => item.category === "spillerbudskap"),
      },
      {
        category: "trenerfokus" as const,
        title: "Trenerfokus",
        description: "Punkter du kan bruke som styring, observasjon og coaching under økta.",
        items: selectedTheoryItems.filter((item) => item.category === "trenerfokus"),
      },
      {
        category: "læringsprinsipp" as const,
        title: "Læringsprinsipp",
        description: "Prinsipper som forklarer hvordan økta bør trenes og fasiliteres.",
        items: selectedTheoryItems.filter((item) => item.category === "læringsprinsipp"),
      },
    ].filter((group) => group.items.length > 0);
  }, [selectedTheoryItems]);

  const sessionTitle = sharedSession?.sessionTitle?.trim() || "Treningsøkt";
  const sessionComment = sharedSession?.sessionComment?.trim();

  if (!sharedSession) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <AppHeader />
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-semibold text-zinc-900">Kunne ikke åpne økta</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Lenken er ugyldig eller ufullstendig. Be om en ny lenke til økta.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              Til planleggeren
            </Link>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Fullversjon</p>
              <h1 className="mt-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">{sessionTitle}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                Delt øktvisning med alle beskrivelser, coachingpunkter, variasjoner og alternative øvelser.
              </p>
              {sessionComment ? (
                <p className="mt-3 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                  {sessionComment}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-zinc-600">
              <span className="rounded-full bg-zinc-100 px-3 py-1.5">{totalMinutes} min</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1.5">{sharedSession.playerCount} spillere</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1.5">{sharedSession.stationCount} stasjoner</span>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {parts.map((part) => (
              <section key={part.key} className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 sm:p-5">
                <div className="flex flex-col gap-1 border-b border-zinc-200 pb-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-base font-semibold text-zinc-900">{part.title}</h2>
                  {part.subtitle ? <p className="text-xs text-zinc-500">{part.subtitle}</p> : null}
                </div>

                <div className="mt-4 space-y-4">
                  {part.blocks.map((block) => {
                    const blockTitle = block.customTitle?.trim() || block.exercise.name;
                    const blockComment = block.customComment?.trim();
                    const alternativeExercises = (block.alternativeExerciseIds ?? [])
                      .map((id) => sharedSession.sessionBlocks.find((candidate) => candidate.exercise.id === id)?.exercise)
                      .filter((exercise) => !!exercise);

                    return (
                      <article key={block.id} className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-zinc-900">
                              <span className="mr-2 inline-flex min-w-[34px] items-center justify-center rounded-full bg-zinc-200 px-2 py-1 text-[11px] font-medium text-zinc-700">
                                {getExerciseCode(block.exercise)}
                              </span>
                              {blockTitle}
                            </h3>
                            {blockTitle !== block.exercise.name ? (
                              <p className="mt-2 text-xs text-zinc-500">Basert på: {block.exercise.name}</p>
                            ) : null}
                            {block.exercise.category === "fixed-warmup" ? (
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-900">
                                  Spillerstyrt
                                </span>
                              </div>
                            ) : null}
                            {block.assignedCoachNames?.length ? (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {block.assignedCoachNames.map((coachName) => (
                                  <span
                                    key={coachName}
                                    className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-900"
                                  >
                                    {coachName}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                            <p className="mt-2 text-sm leading-6 text-zinc-700">{block.exercise.description}</p>
                            {blockComment ? (
                              <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                                <span className="font-semibold text-amber-950">Kommentar:</span> {blockComment}
                              </div>
                            ) : null}
                          </div>
                          <div className="shrink-0 rounded-2xl bg-zinc-100 px-3 py-2 text-xs text-zinc-600">
                            {recommendedDuration(block)} {getUnit(block)} · {block.exercise.playersMin}-{block.exercise.playersMax} spillere
                          </div>
                        </div>

                        {block.exercise.imageUrl ? (
                          <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={block.exercise.imageUrl}
                              alt={`Diagram for ${block.exercise.name}`}
                              className="block max-h-[320px] w-full object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ) : null}

                        {block.exercise.coachingPoints.length > 0 ? (
                          <div className="mt-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching</h4>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              {block.exercise.coachingPoints.map((point) => (
                                <li key={point}>• {point}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        {block.exercise.variations.length > 0 ? (
                          <div className="mt-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Variasjoner</h4>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              {block.exercise.variations.map((variation) => (
                                <li key={variation}>• {variation}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        {alternativeExercises.length > 0 ? (
                          <div className="mt-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Alternative øvelser</h4>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              {alternativeExercises.map((exercise) => (
                                <li key={exercise.id}>• [{getExerciseCode(exercise)}] {exercise.name}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}

            {selectedTheoryItems.length > 0 ? (
              <section className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 sm:p-5">
                <div className="flex flex-col gap-1 border-b border-sky-200 pb-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-base font-semibold text-zinc-900">Teori og trenermomenter</h2>
                  <p className="text-xs text-sky-700">Valgt i planleggeren for fullversjonen</p>
                </div>

                <div className="mt-4 space-y-3">
                  {groupedTheoryItems.map((group) => (
                    <details key={group.category} className="rounded-2xl border border-sky-100 bg-white p-4">
                      <summary className="cursor-pointer list-none">
                        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                          {group.title}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-zinc-900">
                          {group.title} for økta
                        </h3>
                        <p className="mt-2 pr-6 text-sm leading-6 text-zinc-700">
                          {group.items.length} valgt {group.items.length === 1 ? "tema" : "temaer"}. {group.description}
                        </p>
                        <p className="mt-2 text-xs font-medium text-sky-800">Trykk for å vise alle</p>
                      </summary>

                      <div className="mt-4 space-y-3 border-t border-sky-100 pt-4">
                        {group.items.map((item) => (
                          <article key={item.id} className="rounded-2xl bg-sky-50/70 p-4">
                            <h4 className="text-sm font-semibold text-zinc-900">{item.title}</h4>
                            <p className="mt-2 text-sm leading-6 text-zinc-700">{item.summary}</p>
                            {item.imageUrl ? (
                              <div className="mt-3 overflow-hidden rounded-2xl border border-sky-100 bg-white">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.title}
                                  width={960}
                                  height={640}
                                  className="h-auto w-full object-cover"
                                />
                              </div>
                            ) : null}
                            {item.playerMessage ? (
                              <p className="mt-3 text-sm leading-6 text-zinc-700">
                                <span className="font-semibold text-zinc-900">Til spillerne:</span> {item.playerMessage}
                              </p>
                            ) : null}
                            {item.coachNote ? (
                              <p className="mt-2 text-sm leading-6 text-zinc-700">
                                <span className="font-semibold text-zinc-900">Til trener:</span> {item.coachNote}
                              </p>
                            ) : null}
                            {item.sections?.map((section) => (
                              <section key={section.title} className="mt-3 space-y-2 rounded-2xl bg-white p-4">
                                <h5 className="text-xs font-semibold uppercase tracking-wide text-sky-800">
                                  {section.title}
                                </h5>
                                {section.paragraphs?.map((paragraph) => (
                                  <p key={paragraph} className="text-sm leading-6 text-zinc-700">
                                    {paragraph}
                                  </p>
                                ))}
                                {section.bullets?.length ? (
                                  <ul className="space-y-1 text-sm leading-6 text-zinc-700">
                                    {section.bullets.map((bullet) => (
                                      <li key={bullet}>• {bullet}</li>
                                    ))}
                                  </ul>
                                ) : null}
                              </section>
                            ))}
                          </article>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function SharedSessionPage() {
  return (
    <Suspense fallback={null}>
      <SharedSessionPageContent />
    </Suspense>
  );
}
