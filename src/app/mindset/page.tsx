import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { CoachingTips } from "@/components/CoachingTips";
import { MindsetSection } from "@/components/MindsetSection";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Mindset og mentaltrening",
  description: "Fullversjon av mindset-notatene for trenere",
};

export default async function MindsetPage() {
  const filePath = path.join(process.cwd(), "mindset.md");
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-zinc-900">Mindset og mentaltrening</h2>
          <p className="text-sm text-zinc-500">
            Praktiske verktøy for trenere kombinert med fullversjonen av mindset-notatene
          </p>
        </div>

        <section className="space-y-6">
          <MindsetSection />
          <CoachingTips />
        </section>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-3">Notater</h3>
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-zinc-800">
            {content}
          </pre>
        </article>
      </div>
    </div>
  );
}
