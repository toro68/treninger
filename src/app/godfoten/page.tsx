import type { Metadata } from "next";

import { AppHeader } from "@/components/AppHeader";
import { Godfoten } from "@/components/Godfoten";

export const metadata: Metadata = {
  title: "Godfoten: angrep og forsvar",
  description: "Godfoten-siden med angrepspostulatene og forsvarspostulatene fra Roseborg-miljøet.",
};

export default function GodfotenPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
        <Godfoten />
      </div>
    </div>
  );
}