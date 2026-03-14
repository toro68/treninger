import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/AppHeader';
import { RBK } from '@/components/RBK';

export const metadata: Metadata = {
  title: 'K.T. Eggen og Godfoten',
  description: 'Skilt oversikt over øvelser av Knut Torbjørn Eggen og Godfoten-notater fra Nils Arne Eggen',
};

export default async function RBKPage() {
  const filePath = path.join(process.cwd(), 'docs', 'books', 'godfoten.txt');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
        <RBK />

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">Kildesamling</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Samlet tekstutdrag og arbeidsnotater, med tydelig skille mellom Godfoten-sporet og
            øvelsesheftet til Knut Torbjørn Eggen.
          </p>
          <pre className="mt-4 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-zinc-800">
            {content}
          </pre>
        </article>
      </div>
    </div>
  );
}