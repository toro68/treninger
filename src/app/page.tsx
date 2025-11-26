"use client";

import { PlayerSetup } from "@/components/PlayerSetup";
import { ExerciseList } from "@/components/ExerciseList";
import { SessionTimeline } from "@/components/SessionTimeline";
import { EquipmentList } from "@/components/EquipmentList";
import { useState } from "react";
import { Filters, ThemeFilter } from "@/components/Filters";
import { ExerciseManager } from "@/components/ExerciseManager";
import { CoachingTips } from "@/components/CoachingTips";

export default function Home() {
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("alle");

  return (
    <div className="min-h-screen bg-zinc-50 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Desktop: 2-kolonner side ved side */}
        <div className="hidden lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          {/* Venstre kolonne - Velg øvelser */}
          <div className="space-y-6">
            <PlayerSetup />
            <ExerciseManager />
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-zinc-900">Øvelser</h2>
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

          {/* Høyre kolonne - Øktplan */}
          <div className="space-y-6">
            <SessionTimeline />
            <EquipmentList />
            <CoachingTips />
          </div>
        </div>

        {/* Mobil: Alt i én kolonne, øktplan nederst */}
        <div className="lg:hidden space-y-4">
          <PlayerSetup />
          <ExerciseManager />
          <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-zinc-900">Øvelser</h2>
              <Filters activeTheme={themeFilter} onThemeChange={setThemeFilter} />
            </div>
            <div className="mt-4 space-y-6">
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

          {/* Øktplan nederst på mobil */}
          <SessionTimeline />
          <EquipmentList />
          <CoachingTips />
        </div>
      </div>
    </div>
  );
}
