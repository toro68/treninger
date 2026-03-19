import type { Metadata } from "next";

import { AppHeader } from "@/components/AppHeader";
import { ManC } from "@/components/ManC";

export const metadata: Metadata = {
  title: "ManC: The City Way",
  description: "ManC-siden med The City Way-prinsippene fra Manchester City Academy, inkludert oppbyggingsfaser, press og forsvar.",
};

export default function ManCPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
        <ManC />
      </div>
    </div>
  );
}