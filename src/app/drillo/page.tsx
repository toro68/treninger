import type { Metadata } from "next";

import { AppHeader } from "@/components/AppHeader";
import { Drillo } from "@/components/Drillo";

export const metadata: Metadata = {
  title: "Drillo: effektiv fotball",
  description: "Drillo-siden med nøkkelprinsipper fra Effektiv fotball for kampforståelse, press, gjennombrudd og dødball.",
};

export default function DrilloPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
        <Drillo />
      </div>
    </div>
  );
}