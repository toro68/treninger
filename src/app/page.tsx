"use client";

import { PlayerSetup } from "@/components/PlayerSetup";
import { ExerciseList } from "@/components/ExerciseList";
import { SessionTimeline } from "@/components/SessionTimeline";
import { EquipmentList } from "@/components/EquipmentList";
import { useState } from "react";
import { Filters, ThemeFilter } from "@/components/Filters";
import { ExerciseManager } from "@/components/ExerciseManager";
import { CoachingTips } from "@/components/CoachingTips";
import { MatchPrep } from "@/components/MatchPrep";
import { Roles } from "@/components/Roles";
import { CornerOrganization } from "@/components/CornerOrganization";
import { TeamOrganization } from "@/components/TeamOrganization";

export default function Home() {
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("alle");

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* App Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <h1 className="text-lg font-bold text-zinc-900">Treningsplanlegger</h1>
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">J16</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
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
                <ExerciseList
                  title="Avslutning"
                  category="cooldown"
                />
              </div>
            </section>
          </div>

          {/* Høyre kolonne - Øktplan */}
          <div className="space-y-6">
            <SessionTimeline />
            <EquipmentList />
            <CoachingTips />
            <MatchPrep />
            <Roles />
            <TeamOrganization />
            <CornerOrganization />
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
              <ExerciseList
                title="Avslutning"
                category="cooldown"
              />
            </div>
          </section>

          {/* Øktplan nederst på mobil */}
          <SessionTimeline />
          <EquipmentList />
          <CoachingTips />
          <MatchPrep />
          <Roles />
          <TeamOrganization />
          <CornerOrganization />
        </div>
      </div>
    </div>
  );
}
