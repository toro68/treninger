"use client";

import { MatchPrep } from "@/components/MatchPrep";
import { Roles } from "@/components/Roles";
import { CornerOrganization } from "@/components/CornerOrganization";
import { TeamOrganization } from "@/components/TeamOrganization";
import { UEFASeksjon } from "@/components/UEFASeksjon";
import { FormasjonerSeksjon } from "@/components/FormasjonerSeksjon";
import { AppHeader } from "@/components/AppHeader";

export default function KampPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">Kampforberedelse</h2>
            <p className="mt-2 text-sm text-zinc-500">Alt du trenger før, under og etter kamp</p>
          </div>
          
          <MatchPrep />
          <FormasjonerSeksjon />
          <UEFASeksjon />
          <Roles />
          <TeamOrganization />
          <CornerOrganization />
        </div>
      </div>
    </div>
  );
}
