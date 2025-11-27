"use client";

import { useState } from "react";

export const CornerOrganization = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <h2 className="text-lg font-semibold text-zinc-900">Corner-organisering</h2>
        <span className="text-sm text-zinc-500">{isOpen ? "Skjul" : "Vis"}</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-2">
              Keeper – Ansvar ved defensive cornere
            </h3>
            <p className="text-xs text-zinc-600 mb-3">
              Du er sjefen i feltet. Sørg for at alle er på plass før motstanderen tar corneren. Bruk stemmen høyt og tydelig.
            </p>
          </div>

          {/* Organisering */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-700 mb-2">Organisering</h4>

            <div className="space-y-3">
              {/* Sone 1 */}
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h5 className="text-xs font-semibold text-zinc-800 mb-1">
                  Første stolpe (Sone 1)
                </h5>
                <p className="text-xs text-zinc-700 mb-1">
                  Pek ut en tøff hodespiller til å stå på hjørnet av 5-meteren nærmest cornerflagget.
                </p>
                <p className="text-xs text-zinc-600 italic">
                  Beskjed: "Stå på hjørnet! Du skal stange unna alt som kommer i din sone!"
                </p>
              </div>

              {/* Sone 2 */}
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h5 className="text-xs font-semibold text-zinc-800 mb-1">
                  Krigersonen (Sone 2 - 5-meteren)
                </h5>
                <p className="text-xs text-zinc-700 mb-1">
                  Plasser midtstopperne pluss én sterk spiller til på linje langs 5-meteren (parallelt med mållinjen).
                </p>
                <p className="text-xs text-zinc-600 italic">
                  Beskjed: "Dere tre er frie! Dere skal ikke markere, men angripe ballen og heade den langt vekk."
                </p>
              </div>

              {/* Markering */}
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h5 className="text-xs font-semibold text-zinc-800 mb-1">
                  Markering
                </h5>
                <p className="text-xs text-zinc-700 mb-1">
                  Sjekk at resten av laget har hver sin motstander.
                </p>
                <p className="text-xs text-zinc-600 italic">
                  Beskjed: "Ta ut hver sin spiller! Ingen står alene!"
                </p>
              </div>
            </div>
          </div>

          {/* Aksjon */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-700 mb-2">Aksjon (Når ballen kommer)</h4>

            <div className="space-y-2">
              <div className="rounded-lg border border-zinc-100 bg-white p-3">
                <p className="text-xs text-zinc-700 mb-1">
                  <span className="font-semibold">Vurder ballbanen:</span> Er den innenfor din rekkevidde?
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-white p-3">
                <p className="text-xs text-zinc-700 mb-1">
                  <span className="font-semibold">"KEEPER!":</span> Hvis du går ut for å ta den, rop høyt og tidlig. Da må de andre flytte seg. Vær tøff i duellen – bruk gjerne kneet opp for beskyttelse.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-white p-3">
                <p className="text-xs text-zinc-700 mb-1">
                  <span className="font-semibold">"UT!" eller "VEKK!":</span> Hvis du blir stående på streken, rop at forsvaret skal få ballen unna.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-white p-3">
                <p className="text-xs text-zinc-700">
                  <span className="font-semibold">Returrom:</span> Vær våken med en gang ballen er headet ut. Organiser laget raskt ut av boksen (push-out) for å sette motstander i offside.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
