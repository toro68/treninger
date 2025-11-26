"use client";

import { PlayerSetup } from "@/components/PlayerSetup";
import { ExerciseList } from "@/components/ExerciseList";
import { SessionTimeline } from "@/components/SessionTimeline";
import { EquipmentList } from "@/components/EquipmentList";
import { useState } from "react";
import { Filters, ThemeFilter } from "@/components/Filters";
import { SelectedExercises } from "@/components/SelectedExercises";
import { ExerciseManager } from "@/components/ExerciseManager";

export default function Home() {
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("alle");

  return (
    <div className="min-h-screen bg-zinc-50 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <PlayerSetup />
          <ExerciseManager />
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900">Øvelser</h2>
                <span className="text-xs text-zinc-500">Filtrer etter tema</span>
              </div>
              <Filters activeTheme={themeFilter} onThemeChange={setThemeFilter} />
            </div>
            <div className="mt-6 space-y-8">
              <ExerciseList
                title="Oppvarming"
                category="warmup"
                theme={themeFilter === "alle" ? undefined : themeFilter}
              />
              <ExerciseList
                title="Stasjoner"
                category="station"
                theme={themeFilter === "alle" ? undefined : themeFilter}
              />
              <ExerciseList
                title="Spill"
                category="game"
                theme={themeFilter === "alle" ? undefined : themeFilter}
              />
            </div>
          </section>
        </div>
        <div className="space-y-6">
          <SessionTimeline />
          <SelectedExercises />
          <EquipmentList />
        </div>
      </div>
    </div>
  );
}
