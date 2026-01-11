"use client";

import { useState } from "react";
import { NFF_ZONAL_DEFENSE_LEADING, NFF_ZONAL_DEFENSE_ROLES } from "@/data/nff-zonal-defense";

export const TeamOrganization = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-slate-200/70 bg-gradient-to-r from-slate-50 to-zinc-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Organisering</h2>
          <p className="text-xs text-zinc-500">Gameplan for hele laget</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6">
          {/* NFF Soneforsvar - Roller */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
              Soneforsvar: Roller (NFF)
            </h3>

            <div className="space-y-2">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <h4 className="text-xs font-semibold text-emerald-900 mb-1">
                  {NFF_ZONAL_DEFENSE_ROLES["1f"].title}
                </h4>
                <p className="text-xs text-emerald-800">
                  {NFF_ZONAL_DEFENSE_ROLES["1f"].description}
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <h4 className="text-xs font-semibold text-blue-900 mb-1">
                  {NFF_ZONAL_DEFENSE_ROLES["2f"].title}
                </h4>
                <p className="text-xs text-blue-800">
                  {NFF_ZONAL_DEFENSE_ROLES["2f"].description}
                </p>
              </div>

              <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
                <h4 className="text-xs font-semibold text-purple-900 mb-1">
                  {NFF_ZONAL_DEFENSE_ROLES["3f"].title}
                </h4>
                <p className="text-xs text-purple-800">
                  {NFF_ZONAL_DEFENSE_ROLES["3f"].description}
                </p>
              </div>
            </div>
          </div>

          {/* NFF Leding */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
              Leding av ballfører (NFF)
            </h3>

            <div className="space-y-2">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <h4 className="text-xs font-semibold text-amber-900 mb-1">
                  {NFF_ZONAL_DEFENSE_LEADING.sideline.title}
                </h4>
                <p className="text-xs text-amber-800">
                  {NFF_ZONAL_DEFENSE_LEADING.sideline.description}
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">
                  {NFF_ZONAL_DEFENSE_LEADING.curveRun.title}
                </h4>
                <p className="text-xs text-zinc-700">
                  {NFF_ZONAL_DEFENSE_LEADING.curveRun.description}
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">
                  {NFF_ZONAL_DEFENSE_LEADING.leadIn.title}
                </h4>
                <p className="text-xs text-zinc-700">
                  {NFF_ZONAL_DEFENSE_LEADING.leadIn.bullets.join(". ")}.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">
                  {NFF_ZONAL_DEFENSE_LEADING.leadOut.title}
                </h4>
                <p className="text-xs text-zinc-700">
                  {NFF_ZONAL_DEFENSE_LEADING.leadOut.bullets.join(". ")}.
                </p>
              </div>
            </div>
          </div>

          {/* NFF Presshøyde */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
              Presshøyde (NFF)
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <h4 className="text-xs font-semibold text-red-900 mb-1">Høyt Press</h4>
                <p className="text-xs text-red-800">
                  Kortere vei til mål ved ballvinning. Krever samstemthet - alle må lese likt. Tvinger feil høyt oppe.
                </p>
              </div>

              <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
                <h4 className="text-xs font-semibold text-sky-900 mb-1">Lavt Press</h4>
                <p className="text-xs text-sky-800">
                  Bevarer struktur og balanse. Venter på feil. Fantastisk utgangspunkt for overganger ved ballvinning.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 mt-2">
              <h4 className="text-xs font-semibold text-zinc-800 mb-1">Viktig ved lavt press</h4>
              <p className="text-xs text-zinc-700">
                Én meter fram hos førsteforsvarer ødelegger pasningsvinkler for motstanderen. Hold linjen!
              </p>
            </div>
          </div>

          {/* Etablert spill - Forsvar */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Etablert Spill: Forsvar (når motstanderen har ballen)
            </h3>

            <div className="space-y-2">
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Kompakthet</h4>
                <p className="text-xs text-zinc-700">
                  Kort og smalt for å krympe motstanderens tid og rom. Liten avstand i bredden, nekt rom gjennom ledd.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Pumping/Dybde</h4>
                <p className="text-xs text-zinc-700">
                  Leddene justerer kontinuerlig opp og ned for å kontrollere rom mellom ledd og bak forsvar.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Sideforskyvning</h4>
                <p className="text-xs text-zinc-700">
                  Forskyv kollektivt mot ballsiden (ballorientert forsvar). Sikrer kontroll sentralt.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Prioriterte Rom</h4>
                <p className="text-xs text-zinc-700">
                  Kontroller: Bakrom og Mellomrom sentralt.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Mål</h4>
                <p className="text-xs text-zinc-700">
                  Vinn ball, eller nekt kontrollerte fremoverpasninger.
                </p>
              </div>
            </div>
          </div>

          {/* Etablert spill - Angrep */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Etablert Spill: Angrep (når laget har ballen)
            </h3>

            <div className="space-y-2">
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Bredde og Dybde</h4>
                <p className="text-xs text-zinc-700">
                  Bruk backs og kanter for bred bane, dyp angriper for lang bane. Skaper rom i motstanderens ledd.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Spillbarhet/Støtte</h4>
                <p className="text-xs text-zinc-700">
                  Skap mange trekanter og linjer. Juster kontinuerlig avstand og vinkel for å gjøre deg spillbar.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Bevegelse</h4>
                <p className="text-xs text-zinc-700">
                  Motsatte og samtidige bevegelser skaper rom. Første bevegelse skaper rom for andre (andrebevegelse).
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Restforsvar (Defensiv balanse)</h4>
                <p className="text-xs text-zinc-700">
                  Spillere bak ball inntar organisert posisjon for å minimere motstanderens overgangsmuligheter ved balltap.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Gjennombrudd</h4>
                <p className="text-xs text-zinc-700">
                  Søk gjennombrudd ofte (gjennom, over eller rundt). Se etter bakrom og mellomrom sentralt.
                </p>
              </div>
            </div>
          </div>

          {/* Defensive cornere */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Dødballer: Defensiv Corner
            </h3>

            <div className="space-y-2">
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Markering/Dekking</h4>
                <p className="text-xs text-zinc-700">
                  Velg soneforsvar (dekker rom), mann-mot-mann (dekker spillere), eller kombinasjon.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Posisjonering</h4>
                <p className="text-xs text-zinc-700">
                  Plasser spillere raskt mellom eget mål og motstander. Sidestilt kroppsstilling for å se ball og motstander.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Stolpedekning</h4>
                <p className="text-xs text-zinc-700">
                  Én spiller tar kontroll mellom presspiller og første stolpe.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Dueller</h4>
                <p className="text-xs text-zinc-700">
                  Vær først på ball, vis offervilje. &quot;Ta duellen før duellen&quot; - gå i kroppen for å fjerne fart og timing.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Keeperens rolle</h4>
                <p className="text-xs text-zinc-700">
                  Kommuniser press og markering, kontroller mål, vær klar for skudd og returer. (Se Corner-organisering for detaljer)
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Returberedskap</h4>
                <p className="text-xs text-zinc-700">
                  Mange mål scores på returer. Unngå &quot;ball watching&quot;, fortsett markering til situasjonen er avklart.
                </p>
              </div>
            </div>
          </div>

          {/* Offensive cornere */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Dødballer: Offensiv Corner
            </h3>

            <div className="space-y-2">
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Bokskraft/Dybde</h4>
                <p className="text-xs text-zinc-700">
                  Spillere med kraft og kløkt i boksen. Avsluttere søker rom bak forsvarslinje.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Løp og Timing</h4>
                <p className="text-xs text-zinc-700">
                  Bruk blindsideløp (rom bak nærmeste forsvarer). Timing avgjørende for å nå ball først.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">Avslutning</h4>
                <p className="text-xs text-zinc-700">
                  Prioriter plassering fremfor kraft.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
