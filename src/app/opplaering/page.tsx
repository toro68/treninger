import { LearnZonalDefense } from "@/components/LearnZonalDefense";
import { LearnAttack } from "@/components/LearnAttack";
import { LearnRoles } from "@/components/LearnRoles";
import { Learn433Positions } from "@/components/Learn433Positions";
import { ZonalDefense } from "@/components/ZonalDefense";
import Link from "next/link";

export default function OpplaeringPage() {
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
              className="rounded-t-lg border-b-2 border-black px-4 py-2 text-sm font-medium text-zinc-900"
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

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">
            Metodisk progresjon
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto">
            Lær spillmodellen steg for steg. Hvert tema bygger på det forrige - 
            start med grunnleggende forståelse før du går videre.
          </p>
        </div>

        {/* Three learning components - all expanded by default */}
        <LearnZonalDefense defaultOpen={true} />
        <LearnAttack defaultOpen={true} />
        <LearnRoles defaultOpen={true} />
        <Learn433Positions defaultOpen={true} />

        {/* Detailed soneforsvar reference */}
        <ZonalDefense />

        {/* Footer info */}
        <div className="mt-8 p-4 rounded-lg bg-zinc-100 text-center">
          <p className="text-sm text-zinc-600">
            Innholdet er basert på{" "}
            <a
              href="https://tiim.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              tiim.no
            </a>{" "}
            (NFF), Landslagsskolens metodikk og UEFA A-oppgaver.
          </p>
        </div>
      </main>
    </div>
  );
}
