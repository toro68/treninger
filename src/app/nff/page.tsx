import type { Metadata } from "next";

import { AppHeader } from "@/components/AppHeader";
import { Nff } from "@/components/Nff";

export const metadata: Metadata = {
  title: "NFF: 11-er og ferdig spill",
  description: "NFF-siden med prinsipper for 11-er-fotball, soneforsvar, læring og overgangen mot ferdig spill.",
};

export default function NffPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
        <Nff />
      </div>
    </div>
  );
}