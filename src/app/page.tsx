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
import { useShallow } from "zustand/react/shallow";
import { AppHeader } from "@/components/AppHeader";
import type { Exercise, ExerciseCategory } from "@/data/exercises";

type VisibleExerciseSection = {
  key: string;
  title: string;
  category: ExerciseCategory;
  exercises: Exercise[];
};

export const deriveSourceFilter = (
  highlightExerciseId: string | null,
  sourceFilterState: SourceFilter
): SourceFilter => (highlightExerciseId ? ["uefa"] : sourceFilterState);

export const applyHighlightedExercise = ({
  highlightExerciseId,
  exerciseLibrary,
  setSearchQuery,
  setHighlightExercise,
  setSourceFilter,
}: {
  highlightExerciseId: string | null;
  exerciseLibrary: { id: string; name: string }[];
  setSearchQuery: (query: string) => void;
  setHighlightExercise: (id: string | null) => void;
  setSourceFilter: (sourceFilter: SourceFilter) => void;
}) => {
  if (!highlightExerciseId) return;
  const match = exerciseLibrary.find((exercise) => exercise.id === highlightExerciseId);
  setSourceFilter(["uefa"]);
  if (match) {
    setSearchQuery(match.name);
  }
  setHighlightExercise(null);
};

export const deriveVisibleExerciseSections = (
  groupedExercises: Record<string, Exercise[]>
): VisibleExerciseSection[] => {
  const cooldownExercises = (groupedExercises.cooldown ?? []).filter(
    (exercise) => exercise.theme !== "styrke"
  );
  const strengthExercises = (groupedExercises.cooldown ?? []).filter(
    (exercise) => exercise.theme === "styrke"
  );

  const sections: VisibleExerciseSection[] = [
    {
      key: "warmup",
      title: "Oppvarming",
      category: "warmup",
      exercises: groupedExercises.warmup ?? [],
    },
    {
      key: "rondo",
      title: "Rondo",
      category: "rondo",
      exercises: groupedExercises.rondo ?? [],
    },
    {
      key: "station",
      title: "Stasjoner",
      category: "station",
      exercises: groupedExercises.station ?? [],
    },
    {
      key: "game",
      title: "Spill",
      category: "game",
      exercises: groupedExercises.game ?? [],
    },
    {
      key: "strength",
      title: "Styrke",
      category: "cooldown",
      exercises: strengthExercises,
    },
    {
      key: "cooldown",
      title: "Avslutning",
      category: "cooldown",
      exercises: cooldownExercises,
    },
  ];

  return sections.filter((section) => section.exercises.length > 0);
};

export default function Home() {
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [filterByPlayerCount, setFilterByPlayerCount] = useState(true);
  const [showDiagrams, setShowDiagrams] = useState(false);
  const {
    highlightExerciseId,
    setHighlightExercise,
    setSearchQuery,
    exerciseLibrary,
    playerCount,
    keeperCount,
    stationCount,
    planningSectionMode,
    favoriteIds,
    searchQuery,
  } = useSessionStore(
    useShallow((state) => ({
      highlightExerciseId: state.highlightExerciseId,
      setHighlightExercise: state.setHighlightExercise,
      setSearchQuery: state.setSearchQuery,
      exerciseLibrary: state.exerciseLibrary,
      playerCount: state.playerCount,
      keeperCount: state.keeperCount,
      stationCount: state.stationCount,
      planningSectionMode: state.planningSectionMode,
      favoriteIds: state.favoriteIds,
      searchQuery: state.searchQuery,
    }))
  );

  // Derive sourceFilter from highlightExerciseId
  const [sourceFilterState, setSourceFilter] = useState<SourceFilter>([]);
  const sourceFilter = deriveSourceFilter(highlightExerciseId, sourceFilterState);

  useEffect(() => {
    applyHighlightedExercise({
      highlightExerciseId,
      exerciseLibrary,
      setSearchQuery,
      setHighlightExercise,
      setSourceFilter,
    });
  }, [exerciseLibrary, highlightExerciseId, setHighlightExercise, setSearchQuery, setSourceFilter]);

  const groupedExercises = useMemo(() => {
    const categories = new Set<string>([
      "warmup",
      "rondo",
      "station",
      "game",
      "cooldown",
    ]);
    return filterAndGroupExercises({
      exerciseLibrary,
      playerCount,
      keeperCount,
      stationCount,
      planningSectionMode,
      favoriteIds,
      favoritesOnly,
      theme: themeFilter,
      sourceFilter,
      filterByPlayerCount,
      searchQuery,
      categories,
    });
  }, [
    exerciseLibrary,
    playerCount,
    keeperCount,
    stationCount,
    planningSectionMode,
    favoriteIds,
    favoritesOnly,
    themeFilter,
    sourceFilter,
    filterByPlayerCount,
    searchQuery,
  ]);

  const visibleExerciseSections = useMemo(
    () => deriveVisibleExerciseSections(groupedExercises),
    [groupedExercises]
  );

  const hasActiveFilters =
    themeFilter.length > 0 ||
    sourceFilter.length > 0 ||
    favoritesOnly ||
    filterByPlayerCount ||
    searchQuery.length > 0;

  const resetAllFilters = () => {
    setThemeFilter([]);
    setSourceFilter([]);
    setFavoritesOnly(false);
    setFilterByPlayerCount(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid gap-6 xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4 xl:col-span-2 xl:space-y-6">
            <PlayerSetup />
            <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-zinc-900">Øvelser</h2>
                  <ExerciseCodeLegend />
                </div>
                <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
                  Biblioteket filtreres mot seksjonen du bygger akkurat nå: enten én øvelse for alle, eller 2–4 parallelle stasjoner med delt spillerantall.
                </div>
                <Filters
                  activeThemes={themeFilter}
                  onThemeChange={setThemeFilter}
                  sourceFilter={sourceFilter}
                  onSourceFilterChange={setSourceFilter}
                  favoritesOnly={favoritesOnly}
                  onFavoritesOnlyChange={setFavoritesOnly}
                  filterByPlayerCount={filterByPlayerCount}
                  onFilterByPlayerCountChange={setFilterByPlayerCount}
                />
              </div>
              <div className="mt-4 space-y-6 lg:mt-6 lg:space-y-8">
                {visibleExerciseSections.length > 0 ? (
                  visibleExerciseSections.map((section) => (
                    <ExerciseList
                      key={section.key}
                      title={section.title}
                      category={section.category}
                      exercises={section.exercises}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-8 text-center">
                    <p className="text-sm text-zinc-600">
                      Ingen øvelser matcher filtrene for denne seksjonen.
                    </p>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={resetAllFilters}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1"
                      >
                        Nullstill alle filtre
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-6 xl:col-span-1">
            <SessionTimeline />
            <EquipmentList />
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
          <button
            type="button"
            aria-expanded={showDiagrams}
            onClick={() => setShowDiagrams((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1"
          >
            <h2 className="text-lg font-semibold text-zinc-900">Diagrammer</h2>
            <span className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Maler</span>
              <span className="text-lg leading-none text-zinc-700">{showDiagrams ? "−" : "+"}</span>
            </span>
          </button>
          {showDiagrams && (
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
          )}
        </section>
      </div>
    </div>
  );
}
