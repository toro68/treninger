import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { CoachingTips } from "@/components/CoachingTips";
import { MindsetSection } from "@/components/MindsetSection";

export const metadata: Metadata = {
  title: "Mindset og mentaltrening",
  description: "Fullversjon av mindset-notatene for trenere",
};

export default async function MindsetPage() {
  const filePath = path.join(process.cwd(), "mindset.md");
  const content = await fs.readFile(filePath, "utf-8");

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
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
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
              className="rounded-t-lg border-b-2 border-black px-4 py-2 text-sm font-medium text-zinc-900"
            >
              Mindset
            </Link>
          </nav>
        </div>
      </header>

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
