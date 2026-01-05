"use client";

import { PlayerSetup } from "@/components/PlayerSetup";
import { ExerciseList } from "@/components/ExerciseList";
import { SessionTimeline } from "@/components/SessionTimeline";
import { EquipmentList } from "@/components/EquipmentList";
import { useEffect, useMemo, useState } from "react";
import { Filters, ThemeFilter, SourceFilter } from "@/components/Filters";
import { ExerciseCodeLegend } from "@/components/ExerciseCodeLegend";
import { filterAndGroupExercises, useSessionStore } from "@/store/sessionStore";
import { ScoringZonesDiagram } from "@/components/ScoringZonesDiagram";
import { ScoringZonesTemplateDiagram } from "@/components/ScoringZonesTemplateDiagram";
import { SelmerZonesTemplateDiagram } from "@/components/SelmerZonesTemplateDiagram";
import { LandscapePitchTemplateDiagram } from "@/components/LandscapePitchTemplateDiagram";
import { SvgTemplateCard } from "@/components/SvgTemplateCard";
import { GreenLandscapeTemplateDiagram } from "@/components/GreenLandscapeTemplateDiagram";
import { GreenSquareTemplateDiagram } from "@/components/GreenSquareTemplateDiagram";
import { HalfPitchTopTemplateDiagram } from "@/components/HalfPitchTopTemplateDiagram";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("alle");
  const [filterByPlayerCount, setFilterByPlayerCount] = useState(false);
  const {
    highlightExerciseId,
    setHighlightExercise,
    setSearchQuery,
    exerciseLibrary,
    playerCount,
    stationCount,
    favoriteIds,
    searchQuery,
  } = useSessionStore(
    useShallow((state) => ({
      highlightExerciseId: state.highlightExerciseId,
      setHighlightExercise: state.setHighlightExercise,
      setSearchQuery: state.setSearchQuery,
      exerciseLibrary: state.exerciseLibrary,
      playerCount: state.playerCount,
      stationCount: state.stationCount,
      favoriteIds: state.favoriteIds,
      searchQuery: state.searchQuery,
    }))
  );

  // Derive sourceFilter from highlightExerciseId
  const [sourceFilterState, setSourceFilter] = useState<SourceFilter>(null);
  const sourceFilter: SourceFilter = highlightExerciseId ? "uefa" : sourceFilterState;
  const activeTheme = themeFilter === "alle" ? undefined : themeFilter;

  useEffect(() => {
    if (!highlightExerciseId) return;
    const match = exerciseLibrary.find((exercise) => exercise.id === highlightExerciseId);
    if (match) {
      setSearchQuery(match.name);
    }
    setHighlightExercise(null);
  }, [exerciseLibrary, highlightExerciseId, setHighlightExercise, setSearchQuery]);

  const groupedExercises = useMemo(() => {
    const categories = new Set<string>([
      "warmup",
      "aktivisering",
      "rondo",
      "station",
      "game",
      "cooldown",
    ]);
    return filterAndGroupExercises({
      exerciseLibrary,
      playerCount,
      stationCount,
      favoriteIds,
      theme: activeTheme,
      sourceFilter,
      filterByPlayerCount,
      searchQuery,
      categories,
    });
  }, [
    exerciseLibrary,
    playerCount,
    stationCount,
    favoriteIds,
    activeTheme,
    sourceFilter,
    filterByPlayerCount,
    searchQuery,
  ]);

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
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">Staal J15-J16</span>
        </div>
        {/* Navigation */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex gap-1 -mb-px">
            <Link
              href="/"
              prefetch={false}
              className="rounded-t-lg border-b-2 border-black px-4 py-2 text-sm font-medium text-zinc-900"
            >
              Trening
            </Link>
            <Link
              href="/kamp"
              prefetch={false}
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Kamp
            </Link>
            <Link
              href="/opplaering"
              prefetch={false}
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Opplæring
            </Link>
            <Link
              href="/ordliste"
              prefetch={false}
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Ordliste
            </Link>
            <Link
              href="/mindset"
              prefetch={false}
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Mindset
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
	        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
	          <div className="space-y-4 lg:space-y-6">
	            <PlayerSetup />
	            <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
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
              <div className="mt-4 space-y-6 lg:mt-6 lg:space-y-8">
                <ExerciseList
                  title="Oppvarming"
                  category="warmup"
                  exercises={groupedExercises.warmup ?? []}
                />
                <ExerciseList
                  title="Aktivisering"
                  category="aktivisering"
                  exercises={groupedExercises.aktivisering ?? []}
                />
                <ExerciseList
                  title="Rondo"
                  category="rondo"
                  exercises={groupedExercises.rondo ?? []}
                />
                <ExerciseList
                  title="Stasjoner"
                  category="station"
                  exercises={groupedExercises.station ?? []}
                />
                <ExerciseList
                  title="Spill"
                  category="game"
                  exercises={groupedExercises.game ?? []}
                />
                <ExerciseList
                  title="Avslutning"
                  category="cooldown"
                  exercises={groupedExercises.cooldown ?? []}
                />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <SessionTimeline />
            <EquipmentList />
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">Diagrammer</h2>
            <span className="text-xs text-zinc-500">Maler</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <SvgTemplateCard title="Innleggssoner (A–F)" fileName="innleggssoner-a-f.svg">
              <ScoringZonesDiagram className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Scoringssoner (mal)" fileName="scoringssoner-mal.svg">
              <ScoringZonesTemplateDiagram className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="A03 soner i og rundt 16m (mal)" fileName="a03-soner-16m-mal.svg">
              <SelmerZonesTemplateDiagram className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Liggende bane (hel)" fileName="liggende-bane-hel.svg">
              <LandscapePitchTemplateDiagram mode="full" className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Liggende bane (hel – hvit)" fileName="liggende-bane-hel-hvit.svg">
              <LandscapePitchTemplateDiagram mode="full" background="white" className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Liggende bane (halv – mål venstre)" fileName="liggende-bane-halv-mal-venstre.svg">
              <LandscapePitchTemplateDiagram mode="half" goalSide="left" className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Liggende bane (halv – mål høyre)" fileName="liggende-bane-halv-mal-hoyre.svg">
              <LandscapePitchTemplateDiagram mode="half" goalSide="right" className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Halv bane (mål øverst)" fileName="halv-bane-mal-maal-overst.svg">
              <HalfPitchTopTemplateDiagram className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Halv bane (mål øverst – hvit)" fileName="halv-bane-mal-maal-overst-hvit.svg">
              <HalfPitchTopTemplateDiagram background="white" className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Helt grønn (liggende)" fileName="helt-gronn-liggende.svg">
              <GreenLandscapeTemplateDiagram className="max-h-[260px]" />
            </SvgTemplateCard>
            <SvgTemplateCard title="Helt grønn (kvadrat)" fileName="helt-gronn-kvadrat.svg">
              <GreenSquareTemplateDiagram className="max-h-[260px]" />
            </SvgTemplateCard>
          </div>
        </section>
      </div>
    </div>
  );
}
