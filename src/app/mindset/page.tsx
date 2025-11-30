import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mindset og mentaltrening",
  description: "Fullversjon av mindset-notatene for trenere",
};

export default async function MindsetPage() {
  const filePath = path.join(process.cwd(), "mindset.md");
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Ressurser</p>
            <h1 className="text-2xl font-semibold text-zinc-900">Mindset og mentaltrening</h1>
            <p className="text-sm text-zinc-500">Komplett notatbasert sammendrag fra mindset-foredraget</p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            ← Tilbake til øktplanlegger
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-zinc-800">
            {content}
          </pre>
        </article>
      </main>
    </div>
  );
}
