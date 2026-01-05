"use client";

import { MatchPrep } from "@/components/MatchPrep";
import { Roles } from "@/components/Roles";
import { CornerOrganization } from "@/components/CornerOrganization";
import { TeamOrganization } from "@/components/TeamOrganization";
import { UEFASeksjon } from "@/components/UEFASeksjon";
import { FormasjonerSeksjon } from "@/components/FormasjonerSeksjon";
import Link from "next/link";

export default function KampPage() {
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
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Trening
            </Link>
            <Link
              href="/kamp"
              prefetch={false}
              className="rounded-t-lg border-b-2 border-black px-4 py-2 text-sm font-medium text-zinc-900"
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
