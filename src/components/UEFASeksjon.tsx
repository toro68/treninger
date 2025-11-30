"use client";

import { useState } from "react";
import Link from "next/link";
import { uefaAnalyses, type UEFAAnalyse } from "@/data/uefaAnalyses";
import { uefaFormations, type UEFAFormation } from "@/data/uefaFormations";
import { getUEFAExerciseByCode, getUEFADisplayCode } from "@/data/uefa-exercises";
import { useSessionStore } from "@/store/sessionStore";
import { GlossaryTooltip } from "@/components/GlossaryTooltip";

// ============================================
// KOMPONENT
// ============================================

export const UEFASeksjon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aktivSeksjon, setAktivSeksjon] = useState<"analyser" | "formasjoner">("analyser");
  const [valgtAnalyse, setValgtAnalyse] = useState<UEFAAnalyse | null>(null);
  const [valgtFormasjon, setValgtFormasjon] = useState<UEFAFormation | null>(null);
  const [aktivFane, setAktivFane] = useState<"oversikt" | "kpi" | "fokus" | "ovelser" | "cues">("oversikt");
  // aktivFormasjonFane er forberedt for fremtidig bruk i formasjon-faner
  const [, setAktivFormasjonFane] = useState<"oversikt" | "roller" | "prinsipper">("oversikt");
  
  const setHighlightExercise = useSessionStore((state) => state.setHighlightExercise);

  const handleVelgAnalyse = (analyse: UEFAAnalyse) => {
    setValgtAnalyse(analyse);
    setAktivFane("oversikt");
  };

  // Håndter klikk på øvelse - naviger til treningssiden og highlight
  const handleExerciseClick = (kode: string) => {
    setHighlightExercise(kode);
  };

  // Hjelpefunksjon for å hente øvelsesdetaljer
  const getOvelseDetaljer = (kode: string) => {
    const ovelse = getUEFAExerciseByCode(kode);
    if (!ovelse) {
      return { navn: "Øvelse mangler", kategori: "Ukjent", finnes: false };
    }
    return {
      navn: ovelse.name,
      kategori: ovelse.theme,
      finnes: true,
    };
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-purple-200/70 bg-gradient-to-r from-purple-50 to-indigo-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">UEFA-analyser</h2>
          <p className="text-xs text-zinc-500">Innsikt fra UEFA A-oppgaver</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Tema-velger */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Velg tema:
            </label>
            {/* Fane-navigasjon for hovedseksjoner (Analyser / Formasjoner) */}
            <div className="flex gap-1 border-b border-zinc-200 mb-4">
              <button
                onClick={() => { setAktivSeksjon("analyser"); setValgtAnalyse(null); setValgtFormasjon(null); }}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  aktivSeksjon === "analyser"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-700"
                }`}
              >
                Analyser
              </button>
              <button
                onClick={() => { setAktivSeksjon("formasjoner"); setValgtAnalyse(null); setValgtFormasjon(null); }}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  aktivSeksjon === "formasjoner"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-700"
                }`}
              >
                Formasjoner
              </button>
            </div>

            {aktivSeksjon === "analyser" && (
              <div className="flex flex-wrap gap-2">
                {uefaAnalyses.map((analyse) => (
                  <button
                    key={analyse.id}
                    onClick={() => handleVelgAnalyse(analyse)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      valgtAnalyse?.id === analyse.id
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {analyse.kode}: {analyse.tittel}
                  </button>
                ))}
              </div>
            )}
            
            {aktivSeksjon === "formasjoner" && (
              <div className="flex flex-wrap gap-2">
                {uefaFormations.map((formation) => (
                  <button
                    key={formation.id}
                    onClick={() => {
                      setValgtFormasjon(formation);
                      setAktivFormasjonFane("oversikt");
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      valgtFormasjon?.id === formation.id
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {formation.navn}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Valgt analyse */}
          {aktivSeksjon === "analyser" && valgtAnalyse && (
            <div className="space-y-4">
              {/* Fane-navigasjon */}
              <div className="flex gap-1 border-b border-zinc-200">
                {[
                  { id: "oversikt", label: "Oversikt" },
                  { id: "kpi", label: "KPI-er" },
                  { id: "fokus", label: "Fokuspunkter" },
                  { id: "ovelser", label: "Øvelser" },
                  { id: "cues", label: "Coaching" },
                ].map((fane) => (
                  <button
                    key={fane.id}
                    onClick={() => setAktivFane(fane.id as typeof aktivFane)}
                    className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                      aktivFane === fane.id
                        ? "border-blue-600 text-blue-600"
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
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {valgtAnalyse.tema}
                      </span>
                      {valgtAnalyse.roller.map((rolle) => (
                        <span key={rolle} className="px-2 py-1 bg-green-100 text-green-700 rounded">
                          {rolle}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {valgtAnalyse.sammendrag}
                    </p>
                    <p className="text-xs text-zinc-400">
                      Kilde: {valgtAnalyse.forfatter} (UEFA A-oppgave)
                      {valgtAnalyse.oppgaveUrl && (
                        <>
                          {" — "}
                          <a
                            href={valgtAnalyse.oppgaveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Åpne oppgave
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                )}

                {/* KPI-er */}
                {aktivFane === "kpi" && (
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-500 mb-3">
                      Referanseverdier fra toppnivå for evaluering:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-zinc-200">
                            <th className="text-left py-2 font-medium text-zinc-700">Indikator</th>
                            <th className="text-left py-2 font-medium text-zinc-700">Mål</th>
                            <th className="text-left py-2 font-medium text-zinc-400">Kilde</th>
                          </tr>
                        </thead>
                        <tbody>
                          {valgtAnalyse.kpier.map((kpi, idx) => (
                            <tr key={idx} className="border-b border-zinc-100">
                              <td className="py-2 text-zinc-600">{kpi.navn}</td>
                              <td className="py-2 font-medium text-zinc-900">{kpi.referanseverdi}</td>
                              <td className="py-2 text-zinc-400 text-xs">{kpi.kilde || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Fokuspunkter */}
                {aktivFane === "fokus" && (
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-500 mb-3">
                      Kan kopieres til kampplan (MatchPrep):
                    </p>
                    <ul className="space-y-2">
                      {valgtAnalyse.fokuspunkter.map((fp) => (
                        <li
                          key={fp.id}
                          className="flex items-start gap-2 p-2 bg-zinc-50 rounded-lg"
                        >
                          <span className="text-green-500 mt-0.5">✓</span>
                        <div>
                          <span className="text-sm text-zinc-700">
                            {fp.id === "a12-brudd-hoyde" ? (
                              <GlossaryTooltip termId="etasje">{fp.tekst}</GlossaryTooltip>
                            ) : fp.id === "a12-balanse-3plus2" ? (
                              <GlossaryTooltip termId="treplustwo">{fp.tekst}</GlossaryTooltip>
                            ) : fp.id === "a12-tempo-switch" ? (
                              <GlossaryTooltip termId="frys-se-sla">{fp.tekst}</GlossaryTooltip>
                            ) : fp.id === "a02-touch" || fp.id === "a02-tid" ? (
                              <GlossaryTooltip termId="tredjemann">{fp.tekst}</GlossaryTooltip>
                            ) : (
                              fp.tekst
                            )}
                          </span>
                           {fp.rolle && (
                             <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                               {fp.rolle}
                             </span>
                           )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Øvelser */}
                {aktivFane === "ovelser" && (
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-500 mb-3">
                      Klikk for å gå til øvelsen i treningsseksjonen:
                    </p>
                    {valgtAnalyse.ovelser.length > 0 ? (
                      <ul className="space-y-2">
                        {valgtAnalyse.ovelser.map((ov) => {
                          const detaljer = getOvelseDetaljer(ov.kode);
                          
                          if (!detaljer.finnes) {
                            return (
                              <li
                                key={ov.kode}
                                className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200"
                              >
                                <div>
                                  <span className="text-xs font-mono text-zinc-400">
                                    {getUEFADisplayCode(ov.kode)}
                                  </span>
                                  <p className="text-sm font-medium text-red-600">
                                    {detaljer.navn}
                                  </p>
                                </div>
                                <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-600">
                                  {detaljer.kategori}
                                </span>
                              </li>
                            );
                          }
                          
                          return (
                            <li key={ov.kode}>
                              <Link
                                href="/"
                                onClick={() => handleExerciseClick(ov.kode)}
                                className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-colors"
                              >
                                <div>
                                  <span className="text-xs font-mono text-zinc-400">
                                    {getUEFADisplayCode(ov.kode)}
                                  </span>
                                  <p className="text-sm font-medium text-zinc-700">
                                    {detaljer.navn}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-600">
                                    {detaljer.kategori}
                                  </span>
                                  <span className="text-blue-500">→</span>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-sm text-zinc-400 italic">Ingen øvelser definert ennå</p>
                    )}
                  </div>
                )}

                {/* Coaching cues */}
                {aktivFane === "cues" && (
                  <div className="space-y-3">
                    <p className="text-sm text-zinc-500 mb-3">
                      Tips til trener under kamp/trening:
                    </p>
                    {valgtAnalyse.coachingCues.map((cue, idx) => (
                      <div key={idx} className="p-3 bg-zinc-50 rounded-lg space-y-2">
                        <p className="text-xs font-medium text-zinc-500 uppercase">
                          {cue.kategori}
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-zinc-700">{cue.gjor}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-red-500">✗</span>
                            <span className="text-zinc-500">{cue.ikkeGjor}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Valgt formasjon */}
          {aktivSeksjon === "formasjoner" && valgtFormasjon && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-zinc-900">{valgtFormasjon.navn}</h3>
              </div>
              
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

                  {valgtFormasjon.spillerprofiler && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-zinc-700">Nøkkelroller:</p>
                      {valgtFormasjon.spillerprofiler.map((profil, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-semibold">{profil.rolle}: </span>
                          <span className="text-zinc-600">{profil.profil}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {valgtFormasjon.relaterteAnalyser && (
                     <div className="space-y-2">
                        <p className="text-sm font-medium text-zinc-700">Relaterte analyser:</p>
                        <div className="flex flex-wrap gap-2">
                          {valgtFormasjon.relaterteAnalyser.map((analyseId) => {
                            const analyse = uefaAnalyses.find(a => a.id === analyseId);
                            if (!analyse) return null;
                            return (
                              <button
                                key={analyse.id}
                                onClick={() => {
                                  setAktivSeksjon("analyser");
                                  handleVelgAnalyse(analyse);
                                }}
                                className="px-2 py-1 rounded-md text-xs font-medium transition-colors bg-purple-100 text-purple-700 hover:bg-purple-200"
                              >
                                {analyse.kode}: {analyse.tittel}
                              </button>
                            )
                          })}
                        </div>
                     </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder når ingen analyse/formasjon er valgt */}
          {(!valgtAnalyse && aktivSeksjon === "analyser") && (
            <div className="text-center py-8 text-zinc-400">
              <p className="text-sm">Velg et tema over for å se analyse</p>
            </div>
          )}
          {(!valgtFormasjon && aktivSeksjon === "formasjoner") && (
            <div className="text-center py-8 text-zinc-400">
              <p className="text-sm">Velg en formasjon over for å se detaljer</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
