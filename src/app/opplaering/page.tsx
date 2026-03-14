import { LearnZonalDefense } from "@/components/LearnZonalDefense";
import { LearnAttack } from "@/components/LearnAttack";
import { LearnRoles } from "@/components/LearnRoles";
import { Learn433Positions } from "@/components/Learn433Positions";
import { ZonalDefense } from "@/components/ZonalDefense";
import { AppHeader } from "@/components/AppHeader";

export default function OpplaeringPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

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
