"use client";

import Link from "next/link";
import { useState } from "react";
import { glossaryTerms } from "@/data/glossaryTerms";

interface Term {
  term: string;
  definition: string;
  example?: string;
}

interface Category {
  name: string;
  terms: Term[];
}

const glossaryData: Category[] = [
  {
    name: "Alle ord",
    terms: Object.values(glossaryTerms)
      .map((t) => ({ term: t.term, definition: t.definition, example: t.example }))
      .sort((a, b) => a.term.localeCompare(b.term, "nb")),
  },
];

export default function OrdlistePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGlossary = glossaryData
    .map((category) => {
      const filteredTerms = category.terms.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          item.term.toLowerCase().includes(searchLower) ||
          item.definition.toLowerCase().includes(searchLower) ||
          (item.example && item.example.toLowerCase().includes(searchLower))
        );
      });
      return { ...category, terms: filteredTerms };
    })
    .filter((category) => category.terms.length > 0);

  return (
    <div className="min-h-screen bg-zinc-50">
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="-mb-px flex gap-1">
            <Link href="/" prefetch={false} className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700">Trening</Link>
            <Link href="/kamp" prefetch={false} className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700">Kamp</Link>
            <Link href="/opplaering" prefetch={false} className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700">Opplæring</Link>
            <Link href="/ordliste" prefetch={false} className="rounded-t-lg border-b-2 border-black px-4 py-2 text-sm font-medium text-zinc-900">Ordliste</Link>
            <Link href="/mindset" prefetch={false} className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700">Mindset</Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Fotballordliste</h1>
        </div>
        <div className="sticky top-4 z-20 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Søk etter ord (f.eks. 'sikring', 'anker', 'press')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 pl-12 text-zinc-900 shadow-sm placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide text-zinc-400">Søk</span>
          </div>
        </div>
        {!searchTerm && (
          <div className="mb-8 overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-medium text-zinc-500">Kategorier:</h2>
            <div className="flex flex-nowrap gap-2">
              {glossaryData.map((category) => (
                <a key={category.name} href={"#" + category.name.toLowerCase().replace(/[^a-zæøå0-9]/g, "-")} className="whitespace-nowrap rounded-lg bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-200">{category.name}</a>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-8">
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map((category) => (
              <section key={category.name} id={category.name.toLowerCase().replace(/[^a-zæøå0-9]/g, "-")} className="scroll-mt-28">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-zinc-900">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  {category.name}
                </h2>
                <div className="grid gap-3">
                  {category.terms.map((item) => (
                    <div key={item.term} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200">
                      <h3 className="mb-2 text-lg font-bold text-blue-600">{item.term}</h3>
                      <p className="mb-3 leading-relaxed text-zinc-700">{item.definition}</p>
                      {item.example && (
                        <div className="rounded-xl border-l-4 border-blue-200 bg-blue-50 p-3">
                          <p className="text-sm italic text-blue-900/80"><span className="mr-2 not-italic">Sitat:</span>{item.example}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="py-12 text-center text-zinc-500">
              <p className="text-xl">Ingen treff på &quot;{searchTerm}&quot;</p>
              <p className="mt-2 text-sm">Prøv et annet ord eller sjekk stavingen.</p>
            </div>
          )}
        </div>
        <div className="mt-12 border-t border-zinc-200 pt-8 text-center">
          <p className="text-sm text-zinc-500">Mangler du et ord? Spør treneren på neste økt!</p>
        </div>
      </div>
    </div>
  );
}
