"use client";

import { useState } from "react";
import {
  uefaFormations,
  type UEFAFormation,
} from "@/data/uefaFormations";
import { uefaAnalyses } from "@/data/uefaAnalyses";

// ============================================
// ANALYSE-KORT MED EKSPANSJON
// ============================================

const AnalyseKort = ({ analyse }: { analyse: typeof uefaAnalyses[number] }) => {
  const [erUtvidet, setErUtvidet] = useState(false);

  return (
    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-emerald-800">
            {analyse.kode}: {analyse.tittel}
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            {analyse.forfatter} – {analyse.tema}
          </p>
        </div>
        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded shrink-0">
          UEFA A
        </span>
      </div>
      <p
        className={`text-xs text-zinc-600 mt-2 ${
          erUtvidet ? "" : "line-clamp-2"
        }`}
      >
        {analyse.sammendrag}
      </p>
      <button
        onClick={() => setErUtvidet(!erUtvidet)}
        className="mt-2 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
      >
        {erUtvidet ? "Vis mindre" : "Les mer »"}
      </button>
    </div>
  );
};

// ============================================
// KOMPONENT
// ============================================

export const FormasjonerSeksjon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [valgtFormasjon, setValgtFormasjon] = useState<UEFAFormation | null>(
    null
  );
  const [aktivFane, setAktivFane] = useState<
    "oversikt" | "roller" | "prinsipper" | "analyser"
  >("oversikt");

  // Hent relaterte analyser for valgt formasjon
  const getRelaterteAnalyser = (formasjon: UEFAFormation) => {
    if (!formasjon.relaterteAnalyser) return [];
    return formasjon.relaterteAnalyser
      .map((id) => uefaAnalyses.find((a) => a.id === id))
      .filter(Boolean);
  };


  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-emerald-200/70 bg-gradient-to-r from-emerald-50 to-teal-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Formasjoner</h2>
          <p className="text-xs text-zinc-500">
            Taktiske formasjoner fra UEFA-analyser
          </p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Formasjonsvelger */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Velg formasjon:
            </label>
            <div className="flex flex-wrap gap-2">
              {uefaFormations.map((formasjon) => (
                <button
                  key={formasjon.id}
                  onClick={() => {
                    setValgtFormasjon(formasjon);
                    setAktivFane("oversikt");
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    valgtFormasjon?.id === formasjon.id
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {formasjon.navn}
                </button>
              ))}
            </div>
          </div>

          {/* Valgt formasjon */}
          {valgtFormasjon && (
            <div className="space-y-4">
              {/* Fane-navigasjon */}
              <div className="flex gap-1 border-b border-zinc-200">
                {[
                  { id: "oversikt", label: "Oversikt" },
                  { id: "roller", label: "Roller" },
                  { id: "prinsipper", label: "Taktikk" },
                  { id: "analyser", label: "Analyser" },
                ].map((fane) => (
                  <button
                    key={fane.id}
                    onClick={() =>
                      setAktivFane(
                        fane.id as "oversikt" | "roller" | "prinsipper" | "analyser"
                      )
                    }
                    className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                      aktivFane === fane.id
                        ? "border-emerald-600 text-emerald-600"
                        : "border-transparent text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    {fane.label}
                  </button>
                ))}
              </div>

              {/* Fane-innhold */}
              <div className="min-h-[200px]">
                {/* Oversikt */}
                {aktivFane === "oversikt" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        {valgtFormasjon.svgDiagram && (
                          <div
                            className="w-full h-auto p-4 border rounded-lg bg-green-50"
                            dangerouslySetInnerHTML={{ __html: valgtFormasjon.svgDiagram }}
                          />
                        )}
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <p className="text-sm text-zinc-600 leading-relaxed">
                          {valgtFormasjon.beskrivelse}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {valgtFormasjon.styrker && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-zinc-700">Styrker:</p>
                              <ul className="list-disc list-inside text-sm text-zinc-600 space-y-1">
                                {valgtFormasjon.styrker.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {valgtFormasjon.svakheter && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-zinc-700">Svakheter:</p>
                              <ul className="list-disc list-inside text-sm text-zinc-600 space-y-1">
                                {valgtFormasjon.svakheter.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Roller */}
                {aktivFane === "roller" && (
                  <div className="space-y-4">
                    {valgtFormasjon.spillerprofiler?.map((profil, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-zinc-50 rounded-lg space-y-2"
                      >
                        <h4 className="text-sm font-semibold text-zinc-800">
                          {profil.rolle}
                        </h4>
                        <p className="text-sm text-zinc-600">
                          {profil.profil}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Taktiske prinsipper */}
                {aktivFane === "prinsipper" && (
                  <div className="space-y-4">
                    {valgtFormasjon.taktiskePrinsipper.map(
                      (prinsippGruppe, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-zinc-50 rounded-lg space-y-2"
                        >
                          <h4 className="text-sm font-semibold text-zinc-800">
                            {prinsippGruppe.tittel}
                          </h4>
                          <ul className="list-disc list-inside text-sm text-zinc-600 space-y-1 pl-2">
                            {prinsippGruppe.detaljer.map((detalj, dIdx) => (
                              <li key={dIdx}>{detalj}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Relaterte analyser */}
                {aktivFane === "analyser" && (
                  <div className="space-y-4">
                    {getRelaterteAnalyser(valgtFormasjon).length > 0 ? (
                      <>
                        <p className="text-sm text-zinc-600">
                          UEFA-analyser som omhandler {valgtFormasjon.navn}:
                        </p>
                        <div className="space-y-3">
                          {getRelaterteAnalyser(valgtFormasjon).map(
                            (analyse) =>
                              analyse && (
                                <AnalyseKort key={analyse.id} analyse={analyse} />
                              )
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-zinc-500 text-center py-4">
                        Ingen direkte koblede analyser for denne formasjonen.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Placeholder når ingen formasjon er valgt */}
          {!valgtFormasjon && (
            <div className="text-center py-8 text-zinc-400">
              <p className="text-sm">
                Velg en formasjon over for å se detaljer
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
