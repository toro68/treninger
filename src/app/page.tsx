"use client";

import { PlayerSetup } from "@/components/PlayerSetup";
import { ExerciseList } from "@/components/ExerciseList";
import { SessionTimeline } from "@/components/SessionTimeline";
import { EquipmentList } from "@/components/EquipmentList";
import { useState } from "react";
import { Filters, ThemeFilter, SourceFilter } from "@/components/Filters";
import { ExerciseManager } from "@/components/ExerciseManager";
import { ExerciseCodeLegend } from "@/components/ExerciseCodeLegend";
import { useSessionStore } from "@/store/sessionStore";
import Link from "next/link";

export default function Home() {
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("alle");
  const [filterByPlayerCount, setFilterByPlayerCount] = useState(false);
  const highlightExerciseId = useSessionStore((state) => state.highlightExerciseId);
  const setHighlightExercise = useSessionStore((state) => state.setHighlightExercise);

  // Derive sourceFilter from highlightExerciseId
  const [sourceFilterState, setSourceFilter] = useState<SourceFilter>(null);
  const sourceFilter: SourceFilter = highlightExerciseId ? "uefa" : sourceFilterState;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* App Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600">
              TP
            </span>
            <h1 className="text-lg font-bold text-zinc-900">Treningsplanlegger</h1>
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">J16</span>
        </div>
        {/* Navigation */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex gap-1 -mb-px">
            <Link
              href="/"
              className="rounded-t-lg border-b-2 border-black px-4 py-2 text-sm font-medium text-zinc-900"
            >
              Trening
            </Link>
            <Link
              href="/kamp"
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Kamp
            </Link>
            <Link
              href="/opplaering"
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Opplæring
            </Link>
            <Link
              href="/ordliste"
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Ordliste
            </Link>
            <Link
              href="/mindset"
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Mindset
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Desktop: 2-kolonner side ved side */}
        <div className="hidden lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          {/* Venstre kolonne - Velg øvelser */}
          <div className="space-y-6">
            <PlayerSetup />
            <ExerciseManager highlightExerciseId={highlightExerciseId} onHighlightConsumed={() => setHighlightExercise(null)} />
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-zinc-900">Øvelser</h2>
                  <ExerciseCodeLegend />
                </div>
                <Filters 
                  activeTheme={themeFilter} 
                  onThemeChange={setThemeFilter}
                  sourceFilter={sourceFilter}
                  onSourceFilterChange={setSourceFilter}
                  filterByPlayerCount={filterByPlayerCount}
                  onFilterByPlayerCountChange={setFilterByPlayerCount}
                />
              </div>
              <div className="mt-6 space-y-8">
                <ExerciseList
                  title="Oppvarming"
                  category="warmup"
                  theme={themeFilter === "alle" ? undefined : themeFilter}
                  sourceFilter={sourceFilter}
                  filterByPlayerCount={filterByPlayerCount}
                />
                <ExerciseList
                  title="Stasjoner"
                  category="station"
                  theme={themeFilter === "alle" ? undefined : themeFilter}
                  sourceFilter={sourceFilter}
                  filterByPlayerCount={filterByPlayerCount}
                />
                <ExerciseList
                  title="Spill"
                  category="game"
                  theme={themeFilter === "alle" ? undefined : themeFilter}
                  sourceFilter={sourceFilter}
                  filterByPlayerCount={filterByPlayerCount}
                />
                <ExerciseList
                  title="Avslutning"
                  category="cooldown"
                  sourceFilter={sourceFilter}
                  filterByPlayerCount={filterByPlayerCount}
                />
              </div>
            </section>
          </div>

          {/* Høyre kolonne - Øktplan */}
          <div className="space-y-6">
            <SessionTimeline />
            <EquipmentList />
          </div>
        </div>

        {/* Mobil: Alt i én kolonne, øktplan nederst */}
        <div className="lg:hidden space-y-4">
          <PlayerSetup />
          <ExerciseManager
            highlightExerciseId={highlightExerciseId}
            onHighlightConsumed={() => setHighlightExercise(null)}
          />
          <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900">Øvelser</h2>
                <ExerciseCodeLegend />
              </div>
              <Filters 
                activeTheme={themeFilter} 
                onThemeChange={setThemeFilter}
                sourceFilter={sourceFilter}
                onSourceFilterChange={setSourceFilter}
                filterByPlayerCount={filterByPlayerCount}
                onFilterByPlayerCountChange={setFilterByPlayerCount}
              />
            </div>
            <div className="mt-4 space-y-6">
              <ExerciseList
                title="Oppvarming"
                category="warmup"
                theme={themeFilter === "alle" ? undefined : themeFilter}
                sourceFilter={sourceFilter}
                filterByPlayerCount={filterByPlayerCount}
              />
              <ExerciseList
                title="Stasjoner"
                category="station"
                theme={themeFilter === "alle" ? undefined : themeFilter}
                sourceFilter={sourceFilter}
                filterByPlayerCount={filterByPlayerCount}
              />
              <ExerciseList
                title="Spill"
                category="game"
                theme={themeFilter === "alle" ? undefined : themeFilter}
                sourceFilter={sourceFilter}
                filterByPlayerCount={filterByPlayerCount}
              />
              <ExerciseList
                title="Avslutning"
                category="cooldown"
                sourceFilter={sourceFilter}
                filterByPlayerCount={filterByPlayerCount}
              />
            </div>
          </section>

          {/* Øktplan nederst på mobil */}
          <SessionTimeline />
          <EquipmentList />
        </div>
      </div>
    </div>
  );
}
