"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { getExerciseCode } from "@/data/exercises";
import {
  getPlayerMessageTheme,
  getPlayerMessageThemeLabel,
  getSessionTheoryItem,
  type PlayerMessageTheme,
} from "@/data/sessionTheory";
import { AppHeader } from "@/components/AppHeader";
import { decodeSharedSessionToken } from "@/utils/sessionShare";
import { getOutfieldPlayerCount, getUnit, recommendedDuration, type SessionBlock } from "@/store/sessionStore";
import { buildSessionParts, getStationPlanSummary } from "@/utils/sessionParts";

function SharedSessionPageContent() {
  const searchParams = useSearchParams();
  const sharedSession = useMemo(
    () => decodeSharedSessionToken(searchParams.get("s")),
    [searchParams]
  );

  const parts = useMemo(() => {
    if (!sharedSession) return [];

    return buildSessionParts(
      sharedSession.sessionBlocks,
      getOutfieldPlayerCount(sharedSession.playerCount, sharedSession.keeperCount)
    );
  }, [sharedSession]);

  const stationPlanSummary = useMemo(() => getStationPlanSummary(parts), [parts]);

  const totalMinutes = useMemo(
    () => sharedSession?.sessionBlocks.reduce((sum, block) => sum + recommendedDuration(block), 0) ?? 0,
    [sharedSession]
  );

  const shortOverview = useMemo(() => {
    const blockLabel = (block: SessionBlock) =>
      block.customTitle?.trim() || block.exercise.name;

    return parts.flatMap((part) => {
      const duration = part.blocks.reduce(
        (sum, { block }) => sum + recommendedDuration(block),
        0
      );

      let label: string;
      if (part.baseKey === "skadefri") {
        label = "Skadefri";
      } else if (part.baseKey === "stasjoner") {
        return [
          {
            key: `${part.key}-group`,
            kind: "stationGroup" as const,
            heading: "Stasjoner:",
            items: part.blocks.map(({ block, globalIndex }) => ({
              key: `${part.key}-${globalIndex}`,
              duration: recommendedDuration(block),
              label: blockLabel(block),
            })),
          },
        ];
      } else if (part.baseKey === "reserve") {
        label = "Reserve";
      } else {
        const block = part.blocks[0]?.block;
        label = block ? blockLabel(block) : "Øvelse";
      }

      return [{ key: part.key, duration, label, kind: "exercise" as const }];
    });
  }, [parts]);

  const selectedTheoryItems = useMemo(() => {
    if (!sharedSession) return [];
    return [...sharedSession.selectedTheoryIds]
      .map((id) => getSessionTheoryItem(id))
      .filter((item) => !!item);
  }, [sharedSession]);

  const favoriteExercises = useMemo(() => {
    if (!sharedSession) return [];

    const seen = new Set<string>();
    return sharedSession.exerciseLibrary
      .filter((exercise) => sharedSession.favoriteExerciseIds.has(exercise.id))
      .filter((exercise) => {
        if (seen.has(exercise.id)) return false;
        seen.add(exercise.id);
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name, "nb"));
  }, [sharedSession]);

  const favoriteExerciseIdsInSession = useMemo(() => {
    if (!sharedSession) return new Set<string>();
    return new Set(sharedSession.sessionBlocks.map((block) => block.exercise.id));
  }, [sharedSession]);

  const favoriteExercisesInSession = useMemo(
    () => favoriteExercises.filter((exercise) => favoriteExerciseIdsInSession.has(exercise.id)),
    [favoriteExercises, favoriteExerciseIdsInSession]
  );

  const favoriteAlternativeExercises = useMemo(
    () => favoriteExercises.filter((exercise) => !favoriteExerciseIdsInSession.has(exercise.id)),
    [favoriteExercises, favoriteExerciseIdsInSession]
  );

  const coachNames = sharedSession?.coachNames ?? [];
  const coachSummaryLabel = coachNames.length === 1 ? "Trener på økta" : "Trenere på økta";
  const playerSummary = sharedSession
    ? sharedSession.keeperCount > 0
      ? `${sharedSession.playerCount} spillere (${getOutfieldPlayerCount(sharedSession.playerCount, sharedSession.keeperCount)} utespillere + ${sharedSession.keeperCount} keepere)`
      : `${sharedSession.playerCount} spillere`
    : "";

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

  const groupedPlayerMessages = useMemo(() => {
    const playerItems = selectedTheoryItems.filter((item) => item.category === "spillerbudskap");

    return ([
      "grunnspill",
      "roller-og-formasjon",
      "forsvar-og-gjenvinning",
      "avslutning-og-boks",
      "dodbalsituasjoner",
    ] as PlayerMessageTheme[])
      .map((theme) => ({
        theme,
        label: getPlayerMessageThemeLabel(theme),
        items: playerItems.filter((item) => getPlayerMessageTheme(item) === theme),
      }))
      .filter((group) => group.items.length > 0);
  }, [selectedTheoryItems]);

  const sessionTitle = sharedSession?.sessionTitle?.trim() || "Treningsøkt";
  const sessionComment = sharedSession?.sessionComment?.trim();

  if (!sharedSession) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <AppHeader />
        <main id="main" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
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
      <main id="main" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          {shortOverview.length > 0 ? (
            <section className="mb-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">Kortversjon · stikkord</p>
              <ul className="mt-2 space-y-1.5 text-xs text-sky-950">
                {shortOverview.map((item) => {
                  if (item.kind === "stationGroup") {
                    return (
                      <li key={item.key}>
                        <div className="rounded-xl border-2 border-dashed border-sky-400 bg-white/70 px-3 py-2">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-800">
                            {item.heading}
                            <span className="ml-1 font-normal normal-case tracking-normal text-sky-700">
                              kjøres samtidig · roter
                            </span>
                          </p>
                          <ul className="mt-1.5 space-y-1.5">
                            {item.items.map((stationItem) => (
                              <li key={stationItem.key} className="flex flex-wrap items-baseline gap-x-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-2.5 py-1">
                                  <span className="font-medium">{stationItem.label}</span>
                                  <span className="text-sky-700">{stationItem.duration}m</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={item.key} className="flex flex-wrap items-baseline gap-x-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-2.5 py-1">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-sky-700">{item.duration}m</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Fullversjon</p>
              <h1 className="mt-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">{sessionTitle}</h1>
              {sessionComment ? (
                <p className="mt-3 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                  {sessionComment}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-zinc-600">
              <span className="rounded-full bg-zinc-100 px-3 py-1.5">{totalMinutes} min</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1.5">{playerSummary}</span>
              {stationPlanSummary ? (
                <span className="rounded-full bg-zinc-100 px-3 py-1.5">{stationPlanSummary}</span>
              ) : null}
            </div>
          </div>

          {coachNames.length > 0 ? (
            <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">{coachSummaryLabel}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-sky-950">
                {coachNames.map((coachName) => (
                  <span
                    key={coachName}
                    className="inline-flex items-center rounded-full border border-sky-200 bg-white px-3 py-1"
                  >
                    {coachName}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {favoriteExercises.length > 0 ? (
            <details className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/60 px-4 py-3">
              <summary className="cursor-pointer select-none text-sm font-semibold text-amber-950 marker:text-amber-700">
                {`Favoritter og alternativer (${favoriteExercises.length})`}
              </summary>
              <div className="mt-3 space-y-4 text-sm text-zinc-700">
                {favoriteAlternativeExercises.length > 0 ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">Tilgjengelige alternativer</p>
                    <ul className="mt-2 space-y-2">
                      {favoriteAlternativeExercises.map((exercise) => (
                        <li key={exercise.id}>
                          <details className="group rounded-xl border border-amber-100 bg-white px-3 py-2">
                            <summary className="flex cursor-pointer select-none items-baseline gap-2 list-none marker:hidden">
                              <span aria-hidden className="text-amber-700 transition group-open:rotate-90">▸</span>
                              <span className="font-medium text-zinc-900">[{getExerciseCode(exercise)}] {exercise.name}</span>
                              <span className="text-xs text-zinc-500">
                                {exercise.category} · {exercise.theme} · {exercise.playersMin}-{exercise.playersMax} spillere · {exercise.duration} min
                              </span>
                            </summary>
                            <div className="mt-3 space-y-3 border-t border-amber-100 pt-3">
                              {exercise.description.trim() ? (
                                <p className="text-sm leading-6 text-zinc-700">{exercise.description}</p>
                              ) : null}
                              {exercise.coachingPoints.length > 0 ? (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching</p>
                                  <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                                    {exercise.coachingPoints.map((point) => (
                                      <li key={point}>• {point}</li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {exercise.variations.length > 0 ? (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Variasjoner</p>
                                  <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                                    {exercise.variations.map((variation) => (
                                      <li key={variation}>• {variation}</li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {exercise.equipment.length > 0 ? (
                                <p className="text-xs text-zinc-600">
                                  <span className="font-semibold text-zinc-700">Utstyr:</span>{" "}
                                  {exercise.equipment.join(", ")}
                                </p>
                              ) : null}
                              {exercise.imageUrl ? (
                                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={exercise.imageUrl}
                                    alt={`Diagram for ${exercise.name}`}
                                    className="block max-h-[280px] w-full object-contain"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                              ) : null}
                            </div>
                          </details>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {favoriteExercisesInSession.length > 0 ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">Allerede i denne økta</p>
                    <ul className="mt-2 space-y-2">
                      {favoriteExercisesInSession.map((exercise) => (
                        <li key={exercise.id}>
                          <details className="group rounded-xl border border-amber-100 bg-white px-3 py-2">
                            <summary className="flex cursor-pointer select-none items-baseline gap-2 list-none marker:hidden">
                              <span aria-hidden className="text-amber-700 transition group-open:rotate-90">▸</span>
                              <span className="font-medium text-zinc-900">[{getExerciseCode(exercise)}] {exercise.name}</span>
                              <span className="text-xs text-zinc-500">{exercise.category} · {exercise.theme}</span>
                            </summary>
                            <div className="mt-3 space-y-3 border-t border-amber-100 pt-3">
                              {exercise.description.trim() ? (
                                <p className="text-sm leading-6 text-zinc-700">{exercise.description}</p>
                              ) : null}
                              {exercise.coachingPoints.length > 0 ? (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching</p>
                                  <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                                    {exercise.coachingPoints.map((point) => (
                                      <li key={point}>• {point}</li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {exercise.variations.length > 0 ? (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Variasjoner</p>
                                  <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                                    {exercise.variations.map((variation) => (
                                      <li key={variation}>• {variation}</li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {exercise.equipment.length > 0 ? (
                                <p className="text-xs text-zinc-600">
                                  <span className="font-semibold text-zinc-700">Utstyr:</span>{" "}
                                  {exercise.equipment.join(", ")}
                                </p>
                              ) : null}
                              {exercise.imageUrl ? (
                                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={exercise.imageUrl}
                                    alt={`Diagram for ${exercise.name}`}
                                    className="block max-h-[280px] w-full object-contain"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                              ) : null}
                            </div>
                          </details>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </details>
          ) : null}

          <div className="mt-6 space-y-6">
            {parts.map((part) => {
              const isStationPart = part.baseKey === "stasjoner";

              return (
              <section
                key={part.key}
                className={`rounded-2xl border p-4 sm:p-5 ${
                  isStationPart
                    ? "border-sky-200 bg-sky-50/60"
                    : "border-zinc-200 bg-zinc-50/50"
                }`}
              >
                <div className={`flex flex-col gap-2 border-b pb-3 sm:flex-row sm:items-start sm:justify-between ${
                  isStationPart ? "border-sky-200" : "border-zinc-200"
                }`}>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-zinc-900">{part.title}</h2>
                      {isStationPart ? (
                        <span className="inline-flex items-center rounded-full border border-sky-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-800">
                          Samtidig
                        </span>
                      ) : null}
                    </div>
                    {isStationPart ? (
                      <p className="mt-1 text-sm leading-6 text-sky-950">
                        Disse stasjonene kjøres samtidig. Del spillerne på gruppene under og roter samlet etter tiden.
                      </p>
                    ) : null}
                  </div>
                  {part.subtitle ? <p className={`text-xs ${isStationPart ? "text-sky-800" : "text-zinc-500"}`}>{part.subtitle}</p> : null}
                </div>

                {part.sectionComment?.trim() ? (
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                    <span className="font-semibold text-amber-950">Kommentar til seksjon:</span> {part.sectionComment.trim()}
                  </div>
                ) : null}

                <div className="mt-4 space-y-4">
                  {part.blocks.map(({ block }, blockIndex) => {
                    const blockTitle = block.customTitle?.trim() || block.exercise.name;
                    const blockComment = block.customComment?.trim();
                    const alternativeExercises = (block.alternativeExerciseIds ?? [])
                      .map((id) => sharedSession.exerciseLibrary.find((candidate) => candidate.id === id))
                      .filter((exercise) => !!exercise);

                    return (
                      <article
                        key={block.id}
                        className={`rounded-2xl border bg-white p-4 sm:p-5 ${
                          isStationPart ? "border-sky-200 shadow-sm" : "border-zinc-200"
                        }`}
                      >
                        {isStationPart ? (
                          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-3">
                            <p className="inline-flex items-center rounded-full bg-sky-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                              {`Stasjon ${blockIndex + 1}`}
                            </p>
                            <p className="text-xs font-medium text-sky-800">Kjøres samtidig med de andre stasjonene</p>
                          </div>
                        ) : null}
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
                            {block.exercise.description.trim() ? (
                              <p className="mt-2 text-sm leading-6 text-zinc-700">{block.exercise.description}</p>
                            ) : null}
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
                          <details className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                            <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wide text-zinc-500 marker:text-zinc-400">
                              Coaching
                            </summary>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              {block.exercise.coachingPoints.map((point) => (
                                <li key={point}>• {point}</li>
                              ))}
                            </ul>
                          </details>
                        ) : null}

                        {block.exercise.variations.length > 0 ? (
                          <details className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                            <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wide text-zinc-500 marker:text-zinc-400">
                              Variasjoner
                            </summary>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              {block.exercise.variations.map((variation) => (
                                <li key={variation}>• {variation}</li>
                              ))}
                            </ul>
                          </details>
                        ) : null}

                        {alternativeExercises.length > 0 ? (
                          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-900">Alternativer til denne øvelsen</h4>
                            <ul className="mt-2 space-y-2 text-sm text-zinc-700">
                              {alternativeExercises.map((exercise) => (
                                <li key={exercise.id} className="rounded-xl border border-amber-100 bg-white px-3 py-2">
                                  <span className="font-medium text-zinc-900">[{getExerciseCode(exercise)}] {exercise.name}</span>
                                  <span className="ml-2 text-xs text-zinc-500">{exercise.category} · {exercise.theme}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </section>
              );
            })}

            {selectedTheoryItems.length > 0 ? (
              <section className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 sm:p-5">
                <div className="flex flex-col gap-1 border-b border-sky-200 pb-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-base font-semibold text-zinc-900">Teori og trenermomenter</h2>
                  <p className="text-xs text-sky-700">Valgt i planleggeren for fullversjonen</p>
                </div>

                <div className="mt-4 space-y-3">
                  {groupedTheoryItems.map((group) => (
                    group.category === "spillerbudskap" ? (
                      <div key={group.category} className="rounded-2xl border border-sky-100 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                          {group.title}
                        </p>
                        <div className="mt-4 space-y-3 border-t border-sky-100 pt-4">
                          {groupedPlayerMessages.map((themeGroup) => (
                            <details
                              key={themeGroup.theme}
                              className="rounded-2xl border border-sky-100 bg-sky-50/40 p-4"
                              open={themeGroup.theme === "grunnspill" || themeGroup.theme === "avslutning-og-boks"}
                            >
                              <summary className="cursor-pointer list-none">
                                <h3 className="text-sm font-semibold text-zinc-900">{themeGroup.label}</h3>
                                <p className="mt-1 text-sm text-zinc-600">
                                  {themeGroup.items.length} valgt
                                </p>
                              </summary>

                              <div className="mt-3 space-y-3 border-t border-sky-100 pt-3">
                                {themeGroup.items.map((item) => (
                                  <article key={item.id} className="rounded-2xl bg-white p-4">
                                    <h4 className="text-sm font-semibold text-zinc-900">{item.title}</h4>
                                    <p className="mt-2 text-sm leading-6 text-zinc-700">{item.summary}</p>
                                    {item.imageUrl ? (
                                      <div className="mt-3 overflow-hidden rounded-2xl border border-sky-100 bg-sky-50">
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
                                    {item.sections?.length ? (
                                      <details className="mt-3 rounded-2xl bg-sky-50/70 p-4">
                                        <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-wide text-sky-800">
                                          Vis detaljer
                                        </summary>
                                        <div className="mt-3 space-y-3">
                                          {item.sections.map((section) => (
                                            <section key={section.title} className="space-y-2 rounded-2xl bg-white p-4">
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
                                        </div>
                                      </details>
                                    ) : null}
                                  </article>
                                ))}
                              </div>
                            </details>
                          ))}
                        </div>
                      </div>
                    ) : (
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
                    )
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
