"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { uefaAnalyses, type UEFAAnalyse } from "@/data/uefaAnalyses";
import { uefaFormations, type UEFAFormation } from "@/data/uefaFormations";
import { getUEFAExerciseByCode, getUEFADisplayCode } from "@/data/uefa-exercises";
import { useSessionStore } from "@/store/sessionStore";
import { GlossaryTooltip } from "@/components/GlossaryTooltip";
import { ScoringZonesDiagram } from "@/components/ScoringZonesDiagram";

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
  const sortedAnalyses = useMemo(
    () => [...uefaAnalyses].sort((a, b) => a.kode.localeCompare(b.kode, "nb", { numeric: true })),
    []
  );

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
                {sortedAnalyses.map((analyse) => (
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
                  <div className="space-y-4">
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
                    <div className="space-y-2">
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {valgtAnalyse.sammendrag}
                      </p>

                      {valgtAnalyse.kode === "A01" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                              Juventus 3-5-2 – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-amber-900">
                              <li>• Press inn sentralt: spiss styrer, indreløper støter, regista sikrer.</li>
                              <li>• Vingback-balanse: først bredde/innlegg, så lynraskt returløp for femmerlinje.</li>
                              <li>• Regista KPI: minst 10 linjebrytende pasninger + 5 defensive avskjæringer.</li>
                              <li>• Spissduo: motsatte bevegelser – én bakrom, én i fot.</li>
                              <li>• Conte-switch: planlegg når dere går 3-5-2 ↔ 4-3-3.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Press inn sentralt – tre stoppere + regista tar bort midten.</li>
                                <li>• Overtall i midten – 4v3 sikrer frispilling.</li>
                                <li>• Gjenvinning som våpen – fem spillere rundt ball etter tap.</li>
                                <li>• Spissduo i motsatte løp for å splitte stopperne.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fasemodell
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Fase 1 – frispilling: stoppere bredt, regista dropper, vingback høy.</li>
                                <li>• Fase 2 – gjennombrudd: indreløper som tredje mann, tidlig innlegg.</li>
                                <li>• Fase 3 – gjenvinning: fem spillere rundt ball → press/gjenangrep.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Motstander-analyse
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Kartlegg hvor motstanderen bygger opp og styr press-signalet dit.</li>
                                <li>• Vurder kantspillere som kan straffe vingbackene – planlegg ekstra sikring.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Rollebeskrivelser
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Stoppere: aggressiv duellstyring, ansvar for restforsvar.</li>
                                <li>• Vingbacker: permanent bredde, tidlige innlegg, returløp etter hvert angrep.</li>
                                <li>• Regista: tempo i frispilling, 360° orientering, defensivt anker.</li>
                                <li>• Indreløpere: én støter, én sikrer – avklart før kamp.</li>
                                <li>• Spissduo: motsatte bevegelser og press-cues.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A01-even-odegard-analysed-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2014-oppgave-even-odegard.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A02" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                              Tredjespilleren – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-emerald-900">
                              <li>• Sekvens: tredjespiller → assist → målscorer på 4–8 sek (mål 6 sek).</li>
                              <li>• 1–3 touch for alle tre spillere for å holde tempoet.</li>
                              <li>• Kontinuerlig orientering (før og under kontakt).</li>
                              <li>• Strukturell støtte: kant/back bredde, spiss bakrom, midtbane sikrer.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Tredjespiller setter rytmen – orientering + maks 2 touch.</li>
                                <li>• Tempo/touch: internasjonalt 78 % av scoringene på 1–3 touch.</li>
                                <li>• Orientering hele veien («se før du får ballen»).</li>
                                <li>• Struktur: kant/back for bredde, spiss for bakrom.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fasemodell
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Fase 1 – tredjespiller: posisjon, orientering, maks 2 touch.</li>
                                <li>• Fase 2 – assist: hurtig valg på 1–2 touch.</li>
                                <li>• Fase 3 – målscorer: riktig rom og hurtig avslutning.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Motstander-analyse
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Hvor mye press får tredjespiller? Planlegg motsvar.</li>
                                <li>• Skal vi bruke kort corner for å skape tredjespiller eller gå langt?</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Rollebeskrivelser
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Tredjespiller (10/8): orientering, maks 2 touch, tempo.</li>
                                <li>• Assist (kant/back): 1–2 touch, les press, lever presist.</li>
                                <li>• Målscorer: første touch mot mål, avslutt innen 1–2 touch.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A02-angrep-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2014-oppgave-per-inge-jacobsen.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A03" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                            <p className="text-xs font-semibold text-red-800 uppercase tracking-wide">
                              Scoringsferdighet – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-red-900">
                              <li>• 70 % av CL-målene går lavt i hjørnet – tren plassering over kraft.</li>
                              <li>• 86 % av scoringene er kontrollert og skjer fra sentral avslutningssone.</li>
                              <li>• Scoringssekvens på 6 sek fra turnover – definer tid/rom i øvelser.</li>
                              <li>• Curl/plassering (73 %) slår kraft (30 %) – «se keeper» før avslutning.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Scoringsforberedelse: orientering og ro før mottak.</li>
                                <li>• Plassering foran kraft – lavt hjørne, 0,5 m over bakken.</li>
                                <li>• Søk sentral avslutningssone (5m–11m) oftere.</li>
                                <li>• Kontroll i avslutningen – 1–2 touch, følg returer.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fasemodell
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Fase 1 – forberedelse: bevegelse, orientering, førstetouch.</li>
                                <li>• Fase 2 – utførelse: plasser/curl lavt på få touch.</li>
                                <li>• Fase 3 – etterarbeid: følg returer, vær klar for andreball.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Motstander-analyse
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Hvilke lag åpner sentral avslutningssone? Utnytt hull i boksen.</li>
                                <li>• Registrer keeperens svakheter (lavt hjørne, returrom) og straff dem.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Rollebeskrivelser
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Spiss: søk sone 1c, avslutt på 1 touch.</li>
                                <li>• Kant: motsatt stolpe-løp, vær klar på returer.</li>
                                <li>• 10-er: orientering mellom linjer, sett tempo i sluttfasen.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A03-avslutning-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa_a_2012_oppgave_tom_selmer.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A04" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                            <p className="text-xs font-semibold text-sky-800 uppercase tracking-wide">
                              Barca-rytme – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-sky-900">
                              <li>• 25 % ett-touch og 36 % to-touch (snitt 2,1) i scoringsangrep.</li>
                              <li>• Tempo styres av touch-krav: ett-touch for å bryte linjer, to-touch for kontroll.</li>
                              <li>• Definér tydelige tempo-switches («Tempo!» vs «Kontroll!»).</li>
                              <li>• «Maurtue»-bevegelse: fyll rom rundt ball for å holde flyt.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Rytmestyring via touch-antall.</li>
                                <li>• Ett-touch = linjebrekk, to-touch = kontroll.</li>
                                <li>• Tempo-switch ved resultat og press.</li>
                                <li>• «Stoppe klokka» når laget leder.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fasemodell
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Fase 1 – Oppbygging: 2–3 touch, flytte laget.</li>
                                <li>• Fase 2 – Akselerasjon: ett-touch rundt boksen.</li>
                                <li>• Fase 3 – Kontroll: ro ned, forbered ny akselerasjon.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Motstander-analyse
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Kartlegg når motstanderen mister strukturen – gire opp da.</li>
                                <li>• Ved ledelse: vurder når det er tryggest å «fryse» kampen.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Rollebeskrivelser
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Dirigent (Xavi): setter touch-krav og tempo.</li>
                                <li>• Indreløpere: ett-touch veggspill i «maurtua».</li>
                                <li>• Vinger/falsk nier: gjenkjenne når de holder ball vs slipper.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A04-barca-rytme-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa_a_2012_oppgave_finn_bredo_olsen.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A05" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                              Suksesskriterier – kort fortalt
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-amber-900">
                              <li>• Talent må følges av vilje til konsekvenser – ofre komfort for utvikling.</li>
                              <li>• Treningsvillighet: 400–600 timer årlig (10–16 år) med kvalitet.</li>
                              <li>• Klubber/trenere som tror på deg i hvert steg er avgjørende.</li>
                              <li>• Trygt utviklingsmiljø og riktige valg gir rom for progresjon.</li>
                              <li>• Plan for livet etter fotball bygges mens karrieren utvikles.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Suksesskriterier (7)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>1. Talent – identifiser og bygg videre.</li>
                                <li>2. Vilje til konsekvenser – stå i kravene.</li>
                                <li>3. Treningsvillighet – mengde + kvalitet.</li>
                                <li>4. Klubb/trener må tro på deg.</li>
                                <li>5. Trygt utviklingsmiljø.</li>
                                <li>6. Egen vurdering – ta riktige valg.</li>
                                <li>7. Fokus på livet etter fotball.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Utviklingssteg
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Steg 1: Barnefotball – lek og støtte (ROS).
                                </li>
                                <li>• Steg 2: Ungdom – hospitering, holdninger.</li>
                                <li>• Steg 3–5: Bærum → KIL/Stabæk → RBK – profesjonalisering, mental robusthet.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Roller og ansvar
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Spiller: prosessorientert, tar ansvar for egen plan.</li>
                                <li>• Trener: gir tro, følger opp individuelt.</li>
                                <li>• Klubb/foreldre: trygg arena + tilrettelegging for mengdetrening.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Oppfølging & evaluering
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Personlig utviklingsplan for hver spiller (100 %).</li>
                                <li>• Loggfør treningstid og hospitering i hvert steg.</li>
                                <li>• Mentor/trener som «tror» på spilleren i alle faser.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A05-basma-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa_a_2012_oppgave_christer_basma.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A06" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                              Sentral midtbane – Euro 2012
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-emerald-900">
                              <li>• 85 % pasningspresisjon totalt / 77,3 % fremover.</li>
                              <li>• 54 % av pasningene går fremover – tempo styres av 6/8.</li>
                              <li>• 29 % av scoringene involverte sentral midt direkte.</li>
                              <li>• Rollen avgjør kampklima: tempo, balanse, gjenvinning.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Pasningssikkerhet under press (mål ≥85 %).</li>
                                <li>• Orientering før mottak for å vende fremover.</li>
                                <li>• Defensiv balanse / restforsvar.</li>
                                <li>• Offensive bidrag: linjebrudd, tredjemann.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampdimensjon → KPI
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Touch pr kamp: 60–80.</li>
                                <li>• Pasninger inn i siste tredjedel: 20–30 (indreløper).</li>
                                <li>• Fremoverpasninger ≥70 % selv når vi ligger under.</li>
                                <li>• Sekundærpress: avklar hvem trykker/sikrer innen 6 sek.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer kampklima: presshøyde, blokk, scoringsstatus.</li>
                                <li>• Triggerkort mot 4-4-2, 4-3-3 og 3-5-2.</li>
                                <li>• Scanning-rutine i oppvarming for 6/8.</li>
                                <li>• KPI: touch, fremover%, gjenvinninger ≤6 sek.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Slå pasning med intensjon – bryt linjen.»</li>
                                <li>• «Vær spillbar – tenk to trekk frem.»</li>
                                <li>• «6/8 styrer tempo: ro ned ved ledelse, skru opp ved jag.»</li>
                                <li>• «Sekundærpress: avklar hvem trykker og hvem sikrer.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A06-sentral-midt-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oyvind-iversen.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A09" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                            <p className="text-xs font-semibold text-red-800 uppercase tracking-wide">
                              Overgangsspill – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-red-900">
                              <li>• 97 gunstige brudd, men kun 22 vellykkede → kvalitet må opp.</li>
                              <li>• Overgangspyramide: bakrom → mellomrom → vekk fra press.</li>
                              <li>• Signalstyrt presshøyde (4-4-2 diamant vs. lav sone).</li>
                              <li>• 3+2-balanse og klar rollefordeling for å tåle tapte brudd.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Gunstige brudd: 97 (43 høye / 54 lave).</li>
                                <li>• Vellykkede overganger: 22 (17 sjanser, 6 mål, 2 straffer).</li>
                                <li>• Valg etter brudd: bakrom 29 / mellomrom 43 / vekk fra press 27.</li>
                                <li>• Brudd per kamp: Randaberg 33 / Viking2 27 / Madla 20 / VBK 17.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Roller og triggere
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• 1.forsvarer signaliserer press – resten må stå etter.</li>
                                <li>• 3+2 restforsvar før vi overbelaster (balansekrav).</li>
                                <li>• Spiss starter bakromsløp, kant varierer, indreløper går motsatt.</li>
                                <li>• Sentral midt velger mellom bakrom/mellomrom/vekk fra press.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definér presshøyde for kampen (diamant vs. lav blokk).</li>
                                <li>• Avklar overgangspyramiden: bakrom først, deretter mellomrom.</li>
                                <li>• Sikre 3+2-roller før vi sender ekstra folk i angrep.</li>
                                <li>• KPI: vellykkede overganger &gt; mislykkede / sjanser innen 8 sek.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Frys – se – slå» på første pasning etter brudd.</li>
                                <li>• «Press sammen» vs. «fall og sikre» – kommuniser lynraskt.</li>
                                <li>• «Bakrom stengt? finn rettvendt i mellomrom».</li>
                                <li>• «Restforsvar på plass før vi overbelaster».</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A09-bjarte-lunde-aarsheim-overgang-analyse.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2014-oppgave-bjarte-lunde-aarsheim.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A10" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-purple-200 bg-purple-50 p-3">
                            <p className="text-xs font-semibold text-purple-800 uppercase tracking-wide">
                              Vingerrollen – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-purple-900">
                              <li>• Assist/innlegg skjer under 1–3 meters press med 1–4 sek og 1–3 touch.</li>
                              <li>• Området for avgjørende pasning er nesten alltid siste tredjedel.</li>
                              <li>• Motsatt ving scorer 31 % av innleggsmålene – koordiner løp.</li>
                              <li>• Constraints-basert læring: baneregler styrer mellomrom, tidlige innlegg og lavt skudd.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Presser ved assist: 1–3 m (75 %).</li>
                                <li>• Tid før assist: 1–4 sek (77,7 %).</li>
                                <li>• Touch før assist: 1–3 (60,7 %).</li>
                                <li>• Presser ved innlegg: 1–3 m (67 %); touch ≤4 (76 %).</li>
                                <li>• Hvem scorer: spiss 56 % / motsatt ving 31 %.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Rolle- og treningsfokus
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Orientering før mottak – løsning klar før ballen kommer.</li>
                                <li>• Test back tidlig – 8–10 1v1-forsøk per kamp.</li>
                                <li>• Minst fire innlegg per omgang mellom keeper og backrekke.</li>
                                <li>• Tru bakrom før du tilbyr i fot; tim mot 6-er som vender.</li>
                                <li>• Gjenvinning: 5–6 sek tilbakesporing etter balltap.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Læringspunkter fra rapporten
                            </h4>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              <li>• Forvent 1–3 meters press i alle avgjørende aksjoner – planlegg løsning før mottak og aksepter maks 1–4 sekunder og 1–3 touch.</li>
                              <li>• Fase 1 (før ball): start bredt, tru bakrom i 5–10 meter og møt i mellomrom først når 6-er vender åpent.</li>
                              <li>• Fase 2 (mulighet → realitet): bruk små baner (35×25), ett touch i kant og maks tre i mellomrom – presset styrer om du går for cut-back eller løft.</li>
                              <li>• Fase 3 (avgjørende pasning): 91 % skjer i siste tredel – sett KPI om minst fire innlegg mellom keeper og backrekke per omgang og logg roller på første/bakre stolpe.</li>
                              <li>• Øvelse UEFA-A10-03: Gk+6v6+Gk med kantsoner og forsvar låst til to korridorer; vingen leser når back forlater linjen, cut-back gir 2 poeng.</li>
                              <li>• Scoringsøkter: 84 % av avslutningene kommer med presser 1–2 m unna – repeter lavt/hardt skudd inne i 16, svak fot gir 2 poeng, bom gir 10 sek pause.</li>
                              <li>• Dødball: ving i bakre sone defensivt som første kontringsløper (&gt;30 m), offensivt roterer mellom kort corner (2v1) og bakroms-cut-back.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer pressavstand for vingene og hvilke rom de skal angripe.</li>
                                <li>• Sett KPI: 4 innlegg/omgang, 50 % suksess i 1v1.</li>
                                <li>• Gjenvinningsplikt innen 5–6 sek – logg forsøk.</li>
                                <li>• Rollen til motsatt ving/spiss i boks (første/bakre stolpe).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Sjekk over skulder før mottak».</li>
                                <li>• «Innlegg tidlig – cut-back basert på press».</li>
                                <li>• «Plasser lavt og hardt, treff innen ramma».</li>
                                <li>• «Tru bakrom før du tilbyr i fot».</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A10-implicit-winger-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2015-oppgave-hugo-pereira.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A11" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                            <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
                              RBK i angrep 2006–2011 – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-blue-900">
                              <li>• Poengfangst korrelerer med sjansedifferanse og balanse.</li>
                              <li>• Eggen/Hamrén: gjennombrudd + kontringsbalanse → høy differanse.</li>
                              <li>• Jönsson skapte flest sjanser, men lekket bakover – balanse viktig.</li>
                              <li>• Dødballer og kontringsfokus påvirker både sjansestørrelse og sjanser imot.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Poeng pr. kamp: Eggen 2,4 / Hamrén 2,1.</li>
                                <li>• Sjanser pr. kamp: Jönsson 9,7 / Henriksen 6,1.</li>
                                <li>• Sjanser mot etablert: Eggen 1,2 / Jönsson 2,6.</li>
                                <li>• Kontringsandel: Eggen 30 % / Hamrén 25 %.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Hold 2:1 sjansedifferanse hver omgang.</li>
                                <li>• Kontring første 6 sek – ellers sikre balanse.</li>
                                <li>• Serv kvalitet &gt;80 % i riktig sone på dødball.</li>
                                <li>• Tim server/løp – restforsvar må være klart.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              <li>• Sett KPI: sjansedifferanse (≥2:1), sjanser for ≥9, sjanser mot ≤4.</li>
                              <li>• Avklar presshøyde (press eller fall) før kampstart.</li>
                              <li>• Loggfør dødballkvalitet (serv &gt;80 % + løp).</li>
                              <li>• Evaluer sjanser mot etablert pr. omgang.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Press eller fall – ikke bli halvhjertet».</li>
                                <li>• «Finn tredje spiller før siste pas».</li>
                                <li>• «Serv kvalitet &gt;80 % – avtalt sone, restforsvar klart».</li>
                                <li>• «Tallene må eies – koble KPI → video etter kamp».</li>
                                <li>• «Restforsvar på plass før vi overbelaster».</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A22-dag-riisnas-sideback.txt</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A12" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                              Hurtig og kontrollert angrep – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-emerald-900">
                              <li>• 4-fasemodell: bakrom → mellomrom → tredjemann → kontroll.</li>
                              <li>• Bakrom prioriteres først; mellomrommet fylles av indreløpere/10.</li>
                              <li>• Spiss faller, indreløper løper – timing avgjør tredje mann.</li>
                              <li>• Vinger holder bredde og bidrar til kontringsbalanse.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Bakromsløp pr. omgang: 5–8.</li>
                                <li>• Skudd fra mellomrom: 3–5 pr. kamp.</li>
                                <li>• Tredjeløp: 2–3 pr. omgang.</li>
                                <li>• Ball-til-skudd tid: &lt; 10 sekunder.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Bakrom først – strekk linjen før fot-mottak.</li>
                                <li>• Mellomrommet: rettvend indreløper/10 umiddelbart.</li>
                                <li>• Tredjemannsløp når to spillere kombinerer.</li>
                                <li>• Vinger holder bredde, komprimer ikke midten.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definér prioriterte rom i oppspillsfasene.</li>
                                <li>• Sett KPI for bakromsløp, tredjemannsløp og skuddtempo.</li>
                                <li>• Avklar rollepar: spiss+indreløper, ving+back.</li>
                                <li>• Evaluer hvor ofte vi når fase 3 (rettvend tredje mann).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Bakrom først – strekk linjen!»</li>
                                <li>• «Rettvend mellomrom – spill videre på første touch.»</li>
                                <li>• «Tredjemann: løp når to kombinerer.»</li>
                                <li>• «Vinger: hold bredde, ikke komprimer midten.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A12-anders-fredriksen-angrepsspill-ANALYSE-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2013-oppgave-anders-fredriksen.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A13" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                            <p className="text-xs font-semibold text-green-800 uppercase tracking-wide">
                              Sideback + indreløper – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-green-900">
                              <li>• Sidebacker skal frispille IL rettvendt og lede 1v1 defensivt.</li>
                              <li>• Indreløpere må orientere, tru to rom og fylle boksen med fire løp.</li>
                              <li>• 3+2-balansen må sitte før vi overbelaster på kant.</li>
                              <li>• Alt skjer i spill-mot-spill – rollepar trener sammen.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• SB 1v1-stopp: ≥70 % i sone 2.</li>
                                <li>• SB repeterende sprint: 6–8 maks-løp per omgang.</li>
                                <li>• IL rettvendte mottak: 10+ pr. kamp.</li>
                                <li>• IL innløp i boks: minst 4 per angrep.</li>
                                <li>• 3+2 før overbelastning: 100 %.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Sideback: frispill IL rettvendt i rom 2 – vurder kant/SM.</li>
                                <li>• Indreløper: tru to rom hver gang du mottar.</li>
                                <li>• Overbelast kun når 3 bak + 2 sikring er på plass.</li>
                                <li>• Kombiner lek og struktur – alt skjer i kamp-lignende spill.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklar hvilke sider vi overbelaster og hvem som sikrer.</li>
                                <li>• Sett KPI for SB 1v1 og IL rettvendthet før kamp.</li>
                                <li>• Rollebrief: SB + IL får klare oppgaver (returløp, balanse).</li>
                                <li>• Evaluer i PostMatch: hvor ofte nådde vi 3+2 før overbelastning?</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «SB: frispill IL rettvendt – finn rom 2!»</li>
                                <li>• «IL: tru to rom – rettvend og gå i boks.»</li>
                                <li>• «3+2? Ellers vent med overbelastning.»</li>
                                <li>• «Lek i representativt spill – ingen isolerte drillfaser.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A13-sideback-indreloper-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2013-oppgave-arnstein-roen.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A14" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-orange-200 bg-orange-50 p-3">
                            <p className="text-xs font-semibold text-orange-800 uppercase tracking-wide">
                              Indreløper i diamant – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-orange-900">
                              <li>• 4-3-1-2-diamant krever at IL dekker hele flaten (bredde + dybde).</li>
                              <li>• IL skal være førsteforsvarer i press og bidra med dype løp i angrep.</li>
                              <li>• Rollen kombinerer indreløper, kant og 10-er oppgaver.</li>
                              <li>• Trening skjer i representativt spill – fokus på returløp og “to-roms” orientering.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Touch per angrep: maks 2 før ball videre.</li>
                                <li>• Returløp innen 5 sek etter balltap.</li>
                                <li>• Antall bakromsløp pr. omgang: ≥4.</li>
                                <li>• Antall pressgjenvinninger per kamp: ≥5.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Orientering “to rom”: mellomrom og bakrom.</li>
                                <li>• Synkroniser med spissens bevegelser (fall/løp).</li>
                                <li>• Pressvinkler som leder inn i diamantens trap.</li>
                                <li>• Bevegelse ved frispilling (tilby diagonal støtte).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklar IL sine press- og returløpsroller i diamant.</li>
                                <li>• Sett KPI for bakromsløp og gjenvinninger per kamp.</li>
                                <li>• Rollebrief: IL skal alltid sikre restforsvar når back overbelaster.</li>
                                <li>• Evaluer ILs involvering i både bredde og dybde per omgang.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Orienter to rom før du mottar.»</li>
                                <li>• «Press fra utsiden – led inn i diamantens felle.»</li>
                                <li>• «Returløp innen 5 sek – ingen hvile.»</li>
                                <li>• «Gå bak spissen når han faller.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A14-indreloper-4312-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa_a_2013_oppgave_magnus_oltedal.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A15" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-sky-100 bg-white shadow-inner">
                            <ScoringZonesDiagram className="max-h-[320px]" />
                            <div className="px-4 pb-4 text-xs text-zinc-500">
                              Scoringssoner fra A/B til G – hentet fra Gard H. Kristiansens analyse (Tippeligaen 2015).
                            </div>
                          </div>

                          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                            <p className="text-xs font-semibold text-sky-800 uppercase tracking-wide">
                              Innlegg i Tippeligaen – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-sky-900">
                              <li>• 34 % av TL-mål 2015 kom fra innlegg i åpent spill – planlegg soner og roller.</li>
                              <li>• 24 % av scoringene kommer fra A/B-sonene – jobb deg inn før du leverer.</li>
                              <li>• 68 % er direkte innlegg → målscorer – krev 3 spillere + bakre 45° i boks.</li>
                              <li>• 1/3 av scoringene skjer etter gjenvinning på blokkert innlegg – re-press i 5 sek.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Andel mål fra innlegg: ≥35 % (kampmålbilde).</li>
                                <li>• Scoring per innlegg: ≥5 % (1 mål per 20 leveranser).</li>
                                <li>• Direkte innleggsmål: ≥70 % av innleggs-scoringene.</li>
                                <li>• Innlegg fra sone A-C: ≥80 % av forsøkene.</li>
                                <li>• Gjenvinningsmål: ≥1 pr kamp (blokkerte innlegg → 5 sek press).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer innleggs-kart (soner A-F) og prioriter A/B før levering.</li>
                                <li>• Boksbemanning: 3 spillere i rom 1–3 + bakre 45° før ballen går inn.</li>
                                <li>• Skille på etablerte vs overgangsinnlegg – styr tempo og antall touch.</li>
                                <li>• Gjenvinningspress i innleggsfasen: to nærmeste presser, én sikrer.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Kartlegg motstanders leveranse- og scoringssoner – sett pressfeller på dype soner.</li>
                                <li>• Definer spesialister: hvem leverer, hvem angriper rom 1–3, hvem gjenvinner.</li>
                                <li>• Sett KPI for effektivitet (mål/innlegg, A-C-andel, gjenvinningsmål) før kamp.</li>
                                <li>• Planlegg restforsvar og kontringsikkerhet når back/ving fyller boks.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Driv løpet helt inn i sone A/B (nær kortlinja) før du legger inn.»</li>
                                <li>• «3 i boks + bakre 45° før innlegget går.»</li>
                                <li>• «Direkte = tempo: innlegger + målscorer løser det alene.»</li>
                                <li>• «Blokkering = 5 sek re-press før reorganisering.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A15-innlegg-2015-analyse-v2.md</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A16" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                              Rosenborg 2016 – signaturgrep
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-amber-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• 60 % av sjansene kommer i etablert angrep via kantkombinasjoner + gullsone-innlegg.</li>
                                <li>• 29–30 % på kontring: 6 sek-regel med tre løp (spiss dypt, kant stang, IL bakre).</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• 52 % av målsjansene etter innlegg, 24 % av scoringene fra gullsonen.</li>
                                <li>• 65 mål / +40 målforskjell (69 poeng) – 9,2 sjanser per kamp i snitt.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Etablert (60 %)</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Kombiner i mellomrom → kant i gullsonen. Boks fylles rom 1–3 før innlegget går.
                              </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Kontring (≈30 %)</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Gjenvinn i sone 2–3, spill på 80 % risiko og løp tre linjer innen 6 sek.
                              </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Dødball (≈10 %)</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                40 % uttelling på dødballsjanser – kvalitet i serv + rom 1–3 prioriteres.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Målsjanser etablert angrep: ≥10 pr kamp.</li>
                                <li>• Målsjanser kontring: ≥3 pr kamp.</li>
                                <li>• Innlegg fra gullsonen: ≥6 pr kamp.</li>
                                <li>• Kontring på kontring: ≥2 pr kamp (gjenvinn i sone 2).</li>
                                <li>• Rom 1–3 fylt før innlegg: 100 % av forsøkene.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Etablert: kombinasjon på kant før gullsone-innlegg.</li>
                                <li>• Kontring: spiss dypt, kant i stang, IL bakre – 6 sek fra gjenvinning.</li>
                                <li>• Gullsonen: ingen «ansvarsfraskrivelse» – slå fra 18–20 m.</li>
                                <li>• Boksbemanning: rom 1–3 + bakre bue.</li>
                                <li>• Kontring på kontring: gjenvinn i sone 2.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan (MD-4 → MD-1)</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• MD-4: kombinasjon + innlegg (UEFA-A16-01) – scanning og L-løp.</li>
                                <li>• MD-2: fase-spill 4-3-3 vs 4-4-2 (UEFA-A16-02) med fasedefinerte bonusmål.</li>
                                <li>• MD-1: kampplanvideo + stopp/start – påminn boksroller og 6 sek-kontring.</li>
                                <li>• Kampklokke: 60–75 min er topproduktiv; planlegg friske løp der.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Rolig i kombinasjon – ett touch, så fremover.»</li>
                                <li>• «Kant: L-løp, stopp, stikk – slå i gullsonen.»</li>
                                <li>• «Spiss: Rom 1 → 2 – ikke bli stående flatt.»</li>
                                <li>• «Kontring = 6 sek! Løp tre linjer.»</li>
                                <li>• «Kontring på kontring – gjenvinn i sone 2.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A16-rbk-angrep-2016-analyse-v2.md</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A17" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                              RBK-spissrollen – signaturkrav
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-rose-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Målgaranti: RBK krever 15+ mål pr sesong + bidrag i Europa.</li>
                                <li>• Boksritual: rom 1 → 2 → 3 + bakre 45° fylles hver gang ballen går inn.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Relasjoner: minst ti vegg/kombinasjoner med IL/kant pr kamp.</li>
                                <li>• Førsteforsvarer: 90 % av press-signalene skal trigges av spissen.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Boks</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                L-løp og romrotasjon (1 → 2 → 3). Ingen statisk posisjonering, alltid bakre 45°.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Relasjon</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Fall-retur-boks med IL/kant. Veggspill og blindside-løp er default.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Press</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Spissen styrer presshøyde. Signal = touch på stopper/bekk → sprint, resten følger.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Mål/assist: ≥1 pr kamp.</li>
                                <li>• Kombinasjoner med IL/kant: ≥10 pr kamp.</li>
                                <li>• Press-triggere: ≥5 tydelige signaler som laget følger.</li>
                                <li>• Boksbevegelser: rom 1/2/3 + 45° fylt før hver leveranse.</li>
                                <li>• Gjenvinningsløp: full sprint innen 5 sek etter tap.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definér «unik ferdighet» (fart, tyngde, timing) og bygg kampmønster rundt den.</li>
                                <li>• Stram restforsvar når spiss trekker dypt – IL/back må fylle rom.</li>
                                <li>• Mental robusthet: spissen står i RBK-krav (Europa, gull).</li>
                                <li>• Koble spissens bevegelse til vingens preferanse (Helland vs. Gamst-type).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: RBK-spisspakke (UEFA-A17-01) – repetér L-løp + romrotasjon.</li>
                                <li>• Økt 2: Relasjon 5v4 (UEFA-A17-02) – spiss som nav i fall-retur.</li>
                                <li>• Kampdag: målsetting 15+ løp i boks og 10 kombinasjoner.</li>
                                <li>• Etter kamp: evaluer press-signaler og bidrag i restforsvar.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Rom 1 → 2 → 3 – du eier boksen.»</li>
                                <li>• «Førsteforsvarer: signal nå!»</li>
                                <li>• «Fall – retur – boks!»</li>
                                <li>• «Spill på styrken din – resten tilpasser seg.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A17-spissrollen-rbk-analyse-v2.md</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A18" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                              Angrep mot lav blokk – signaturgrep
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-emerald-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Spillvendinger er nøkkel: Bayern 84, Barcelona 343, RBK 23 på kortere kampgrunnlag.</li>
                                <li>• Angrep teller først når vi har flyttet blokka: tålmodig bearbeiding før gullsone.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Stram 3+2-rest gjør «kontring på kontring» mulig.</li>
                                <li>• Back–IL–kant-triangel skaper overlast og fristiller gullsonen.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Spillvending</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vend lavt → høyt for å flytte blokka. Før førstegangs-gjennombrudd må ballen ha vært over begge sider.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gullsoner</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Angrip rommet mellom back og stopper etter vending. Kant/back bytter høyde, IL fyller bakre bue.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gjenvinning</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                3+2-sikring gjør at blokkert innlegg gir ny sjanse innen 5 sek – «kontring på kontring».</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Spillvendinger pr kamp: ≥15 (RBK 5-kamp snitt 4,6 → løft!).</li>
                                <li>• Vellykkede etablerte angrep: ≥10 pr kamp.</li>
                                <li>• Gjenvinningsmål: ≥1 pr kamp etter blokk/avskjæring.</li>
                                <li>• Planlagte mønster (innlegg/gjennombrudd) → sjanse: ≥50 %.</li>
                                <li>• 3+2-rest på plass før hver cross.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Vend før gjennombrudd – tving lav blokk til å flytte.</li>
                                <li>• Bruk siden for å rettvende indreløper/10-eren i mellomrom.</li>
                                <li>• Back/IL/kant: definer roller (overlapp, underlapp, forsterk bakre).</li>
                                <li>• Restforsvar: 3+2 = stopper + back + 6’er + motsatt IL/kant.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: Spillvending til gullsone (UEFA-A18-01) – krav om vending før scoring.</li>
                                <li>• Økt 2: Gjenvinning i lav blokk (UEFA-A18-02) – «kontring på kontring» 5 sek.</li>
                                <li>• Kamp: tell spillvendinger og gjenvinningsmål i sanntid.</li>
                                <li>• Etter kamp: evaluer kvalitet i gullsone-leveranser (innlegg vs cut-back).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Vend – vurder – slå.»</li>
                                <li>• «Back/IL/kant = trekant, aldri på linje.»</li>
                                <li>• «Kontring på kontring – 3+2 klar!»</li>
                                <li>• «Rettvend 10-eren via siden.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A18-hiep-tran-angrep-etablert-analyse-v2.md</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A19" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-slate-50 to-stone-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">
                              Angrep mot lav blokk (KFUM/VIF) – kjernegrep
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-blue-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• «3 kvaliteter»: sterk 1.angriper, sterk 1.forsvarer, pasningsspiller.</li>
                                <li>• Kontinuitet over tid (70 % samme stall) skaper relasjoner.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Tålmodig ballbesittelse – la ballen gjøre jobben før gjennombrudd.</li>
                                <li>• Relasjonelle triangler (back–IL–kant) før siste pas.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Tålmodighet</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Ballen skal jobbe: flytt blokka, ikke tving direktepasning når motstander er i balanse.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Relasjoner</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Back/IL/kant-triangel, over-/underlapp, to-touch-possession i nærrom.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gjenvinning</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                1.forsvarer skal på ball innen 3 sek. Struktur (3+2) gir kontring på kontring.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Etablerte angrep pr kamp: ≥15.</li>
                                <li>• Mål fra etablert spill: ≥40 % av totalen.</li>
                                <li>• Gjenvinningsmål: ≥3 pr måned.</li>
                                <li>• Kontinuitet: ≥70 % av start-XI fra samme stall.</li>
                                <li>• 1.angriper vinner duell ≥60 %.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Tålmodig bearbeiding før gjennombrudd.</li>
                                <li>• Triangelspill back–IL–kant før siste pas.</li>
                                <li>• 1A/1F-roller definert i alle økter.</li>
                                <li>• Kontinuitet i stall og roller over tid.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: KFUM nærrom-possession (UEFA-A19-01) – 1A/1F-trening.</li>
                                <li>• Økt 2: 8v8 mot lav blokk (UEFA-A19-02) – triangel & tålmodighet.</li>
                                <li>• Kamp: måle andel mål fra etablert og gjenvinningsmål.</li>
                                <li>• Etter kamp: sjekk kontinuitet (XI fra egen stall).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Sterk 1A – ta duellen, behold roen.»</li>
                                <li>• «Gjenkjenn over/underlapp.»</li>
                                <li>• «Struktur før fart.»</li>
                                <li>• «1F på ball innen 3 sek!»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A19-angrep-mot-etablert-analyse-v2.md</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A20" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-violet-50 to-fuchsia-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-800">
                              Ett-touch kultur – Strømsgodset 2010
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-indigo-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• 71 % av målene = én-touch avslutning, 24 % = to touch.</li>
                                <li>• 59 % av assistene og 46 % av tredjepassene ble slått på første touch.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• 39 % av scoringene hadde både ett-touch assist og avslutning.</li>
                                <li>• Få touch krever orientering, støttevinkler og teknikk under press.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Orientering</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                «Blikk før ball» for alle tre involverte – ellers er ett-touch umulig.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Støtte</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vinkler for veggspill / cut-back må være til stede før ballen går.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Tempo + presisjon</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Ett-touch er verdiløst uten presisjon – behold kvalitet.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Ett-touch avslutning: ≥70 % av målene.</li>
                                <li>• Ett-touch assist: ≥60 %.</li>
                                <li>• Tredjepas på ett touch: ≥50 %.</li>
                                <li>• Kombinasjoner ≤3 touch: ≥50 % av scoringene.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Orientering før mottak i siste tredel.</li>
                                <li>• Skap støttevinkler og bevegelse for veggspill.</li>
                                <li>• Tren teknikk under press (kroppsvinkel, første touch).</li>
                                <li>• Balansér tempo og kvalitet – tillat balltap i læring.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: Ett-touch finishing carousel (UEFA-A20-01).</li>
                                <li>• Økt 2: 3-involveringsangrep 7v7 (UEFA-A20-02).</li>
                                <li>• Kamp: registrer touch på de tre siste involveringene.</li>
                                <li>• Etter kamp: videoanalyse av orientering før mottak.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Blikk først, ball etterpå.»</li>
                                <li>• «Spilleren kommer – ballen går.»</li>
                                <li>• «Tempo + presisjon.»</li>
                                <li>• «Ikke lås deg i tre touch.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A20-touch-scoringsanalyse-v2.md</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A21" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 via-purple-50 to-amber-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                              Notorisk målscorer – mental mappe
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-rose-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Indre stemme og perfeksjonisme driver repetisjoner («gjentakelsen er det perfektes mor»).</li>
                                <li>• Visualisering før situasjon → handling uten frykt.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Selvstendighet: skaper egne økter (garasjevegg, tennisbane).</li>
                                <li>• Konkurranseinstinkt: «Best når det gjelder» – elsker press.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gjentakelse</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                10/10 på hver profil før du slutter – kvalitet &gt; kvantitet.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Detaljer</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Summen av små grep (løp, rytme, returer) skaper mål.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Press</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                «Nå satser jeg livet» – tren på å elske avgjørende øyeblikk.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Mental rutine før kamp (visualisering) dokumentert.</li>
                                <li>• Egenaktivitet: ≥3 målrettede avslutningsøkter i uka.</li>
                                <li>• Visualiseringslogg etter økter/kamper.</li>
                                <li>• Repetisjonstreff: 10/10 per profil.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Bygg «indre stemme»: visualiser, snakk til deg selv.</li>
                                <li>• Eierskap: spiss designer egne repetisjoner.</li>
                                <li>• Detaljfokus i hvert løp og avslutning.</li>
                                <li>• Konkurranseinstinkt – skap press-scenarier i trening.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: Perfeksjonisme-runden (UEFA-A21-01) – 10/10.</li>
                                <li>• Økt 2: Visualiseringsstafett (UEFA-A21-02).</li>
                                <li>• Kampdag: mental sjekkliste (indre stemme, scenario).</li>
                                <li>• Etter kamp: logg hvordan presset ble håndtert.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Hør på stemmen – du vil score.»</li>
                                <li>• «Detaljer avgjør.»</li>
                                <li>• «Repetisjon til det sitter.»</li>
                                <li>• «Ikke ta snarveier.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A21-notorisk-maalscorer-analyse-v2.md</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A22" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">
                              Sidebacken høyt i banen – Champions League-funn
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-blue-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• 46 av 285 CL-mål (2005/06) involverte back i fase 2.</li>
                                <li>• 44 % av scoringene mot etablert/delvis etablert forsvar kom etter høy back.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Milan/Werder (diamant) brukte hurtige vendinger og 3+2-balanse for å gjøre backen til breddeholder.</li>
                                <li>• 4 av 9 Milan-sjanser vs Barcelona kom via backløp.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Vending</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vend før gjennombrudd – når fremste pressledd er borte skal back inn i korridor.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Bredde</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Midtbane trekker inn, back blir breddeholderen som skaper overlast/pådrag.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">3+2-balanse</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                To stoppere + en sikrende midtbane pluss to ekstra gir trygghet ved balltap.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Back involvert i ≥40 % av målene mot etablert forsvar.</li>
                                <li>• Hurtige spillvendinger som ender hos back: ≥10 pr kamp.</li>
                                <li>• Restforsvar 3+2 på plass før innlegg.</li>
                                <li>• Registrer sjanser via høy back – mål minst 4 pr kamp (Milan vs Barca).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Frigjør backen gjennom hurtig vending og indreløper som trekker inn.</li>
                                <li>• Back starter løp før ballen spilles – møt ball med fart.</li>
                                <li>• Midtbane må lese når back går og sikre 3+2.</li>
                                <li>• Tren på ballerobring ± midten – ikke bare frispilling.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: 3+2-frigjøring (UEFA-A22-01) – vend før backløp.</li>
                                <li>• Økt 2: Hurtig vending + overlast (UEFA-A22-02/-03).</li>
                                <li>• Økt 3: Balanse + innlegg (UEFA-A22-04/-05).</li>
                                <li>• Kamp: logg antall backinvolveringer og restforsvar.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Vend – frigjør – flytt!»</li>
                                <li>• «Backen er bredde – sett fart før ball.»</li>
                                <li>• «3+2 før vi fyller boks.»</li>
                                <li>• «Midtbane: dra inn, åpne korridor.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A22-dag-riisnas-sideback.txt</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A23" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 via-rose-50 to-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-red-800">
                              Atletico Madrid – forsvarssuksess
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-red-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• 8 baklengs på 13 CL-kamper (0,6 per kamp).</li>
                                <li>• 64 målsjanser imot (4,9 pr kamp) – 69 % i etablert spill.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Semier vs Bayern: 57 innlegg imot, men kun ett mål.</li>
                                <li>• Stram 4-4-2 som varierer mellom høyt press, mellom- og lav blokk.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Høyt press</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                4-4-2 front styrer oppspill flatt, backledd står høyt – mål: vinne ball første 10 min.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Mellom-/lav blokk</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Smalt 4-4-2, front styrer mot korridor, stopperne aksepterer rom bak.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gjenvinning</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Markeringsorientert gjenpress – spiss/kant tar mann, resten sikrer.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Mål imot ≤0,6 pr kamp.</li>
                                <li>• Målsjanser imot ≤5 pr kamp (44 av 64 i etablert).</li>
                                <li>• Kontringer imot ≤7 (høyeste tall i Benfica-hjemme).</li>
                                <li>• Innlegg kontrollert: 50+ uten baklengs (ref. Bayern).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer presshøyde for hver fase (høyt/mellom/lav blokk).</li>
                                <li>• 3+2 restforsvar uansett – kant faller inn når back presses.</li>
                                <li>• Tillat innlegg – dominer boks (Godin/Giménez). </li>
                                <li>• Gjenpress vs kontring: spiss/kant tar mann, resten sikrer.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: 4-4-2 høyt press (spiss/kant styrer).</li>
                                <li>• Økt 2: Mellom/lav blokk + innleggshåndtering.</li>
                                <li>• Økt 3: Gjenpress og kontring imot.</li>
                                <li>• Kamp: loggfør sjanser, kontringer og innlegg mot oss.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «4-4-2 – kort mellom spiss og back.»</li>
                                <li>• «Press-signal = tving oppspill bredt.»</li>
                                <li>• «Back møter, kant faller inn.»</li>
                                <li>• «Gjenpress eller frispark – ingen halvveisløsninger.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A23-alexander-oren-atletico-forsvar.txt</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A24" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-slate-50 to-sky-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-800">
                              Chelsea 4-2-3-1 – etablert forsvar
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-indigo-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Mourinho-årene: under 1 baklengs pr kamp – kompakt blokk.</li>
                                <li>• 2015/16: flere mål imot pga. dårlig press, lengre avstander, svak boksforsvar.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• 4-2-3-1 blir 4-4-2 i press. Matic/Fabregas styrer romprioritering.</li>
                                <li>• Nesselquist beskriver rollekrav for alle posisjoner + mental tilnærming.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Høyt press</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                10’er går opp ved siden av spiss, kant styrer inn – press/balanse signalisert av Costa.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Lav blokk</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Hele laget under ball, 4-4-2/4-5-1 – prioriter sentrumsrom, aksepter innlegg.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Boksforsvar</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Stopper i sone, back + ving plukker menn; keeper aktiv i innleggsfelt.</p>
                            </div>
                          </div>

                          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-sky-800">Førsteforsvarer (1F) – læringsmomenter</h4>
                            <div className="mt-2 grid gap-3 md:grid-cols-2">
                              <ul className="space-y-0.5 text-sm text-sky-900">
                                <li>• <strong>Snappe ballen</strong> – bryt ballbane med riktig timing</li>
                                <li>• <strong>Takle</strong> – ha sikringsspiller i avpasset avstand</li>
                                <li>• <strong>Feilvendt mottaker</strong> – hold tett press, unngå takling</li>
                                <li>• <strong>Rettvendt ballfører</strong> – sideveis kropp, lavt tyngdepunkt</li>
                              </ul>
                              <ul className="space-y-0.5 text-sm text-sky-900">
                                <li>• <strong>Stor fart/ubalanse</strong> – rygg, led til ufarlig område</li>
                                <li>• <strong>2v1-situasjon</strong> – rygg mellom, avskjær pasning</li>
                                <li>• <strong>Passert</strong> – løp opp og tilbake på forsvarssiden</li>
                                <li>• <strong>Mål:</strong> erobre ball, ikke bli utspilt, hindre skudd</li>
                              </ul>
                            </div>
                            <p className="mt-2 text-xs text-sky-600 italic">Kilde: Trenerbloggen / NFF</p>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Mål imot ≤1 pr kamp (referanse Mourinho-år).</li>
                                <li>• Avstand spiss–stopper 10–12 m.</li>
                                <li>• Innlegg/boks – stopp 75 % før avslutning.</li>
                                <li>• Press-triggere dokumenteres (Costa/10’er).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Tydelig formasjonsskifte 4-2-3-1 → 4-4-2 uten ball.</li>
                                <li>• Matic/Fabregas balanserer når back/kant støter.</li>
                                <li>• Vinger faller inn i boks ved innlegg.</li>
                                <li>• Mental approach: forsvar = mulighet, ikke frykt.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: 4-4-2 høyt press mot 3-2-oppbygging.</li>
                                <li>• Økt 2: Lav blokk + innlegg/boksdueller.</li>
                                <li>• Økt 3: 6-ere balanserer når back/kant støter.</li>
                                <li>• Gjennomgang: mental trening (approach vs avoidance).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «4-4-2 uten ball – avstand 10 m.»</li>
                                <li>• «Costa signal – gå!»</li>
                                <li>• «Back møter, kant sikrer.»</li>
                                <li>• «Keeper: approach, ikke avoidance.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A24-ole-martin-nesselquist-etablert-forsvar.txt</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A25" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 via-amber-50 to-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                              FFK 2012 – lær av baklengsmålene
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-rose-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• 59 baklengs: 44 % etablert, 37 % dødball, 19 % overgang.</li>
                                <li>• Høyre side tapte mest ball; avslutninger mot oss = kort hold, høyre for keeper.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Flere mål imot i sluttfasen – kampene avgjort mot FFK.</li>
                                <li>• Soneforsvar uten dybde = store mellomrom og for lite push-up.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Soneforsvar 4-4-2 – avstander og roller</h4>
                            <div className="mt-2 grid gap-3 md:grid-cols-2">
                              <div>
                                <p className="text-xs font-medium text-emerald-700 mb-1">Avstander</p>
                                <ul className="space-y-0.5 text-sm text-emerald-900">
                                  <li>• 8–10 m mellom spissene</li>
                                  <li>• 8–10 m mellom spillere i midtbaneledd</li>
                                  <li>• 8–10 m mellom spillere i bakre firer</li>
                                  <li>• 10–12 m mellom bakre firer og midtbane</li>
                                  <li>• 10–12 m mellom midtbane og spisser</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-emerald-700 mb-1">Roller (1F/2F/3F)</p>
                                <ul className="space-y-0.5 text-sm text-emerald-900">
                                  <li>• <strong>1F</strong> = presser ballfører</li>
                                  <li>• <strong>2F</strong> = sikrer (avstand + vinkel)</li>
                                  <li>• <strong>3F</strong> = markerer</li>
                                  <li>• Soneorientert til 16 m → markerende innenfor</li>
                                  <li>• Sideforskyving = motsatt kant/back inn mot bakre stolpe</li>
                                </ul>
                              </div>
                            </div>
                            <p className="mt-2 text-xs text-emerald-600 italic">Kilde: Trenerbloggen / NFF</p>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Etablert</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Kompakt sone, 3+2 balanse, backledd må push opp – ikke åpne mellomrom.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Overgang</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Sikre bak høyre kant/back, plan for balltap (risiko større hjemme).</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Dødball</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                37 % av målene – avtalt sone/mann + restforsvar.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Totale baklengs ≤40.</li>
                                <li>• Andel etablert mål ≤35 %.</li>
                                <li>• Dødballmål ≤25 %.</li>
                                <li>• Balltap høyreside ≤1 som ender i baklengs pr kamp.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Sone + dybde i bakre fire – push opp etter klarering.</li>
                                <li>• Sikre bak risiko – reduser balltap på høyresiden.</li>
                                <li>• Dødball: roller, sone/mann, restforsvar.</li>
                                <li>• Sluttfase-mentalitet – struktur for 75–90 min.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: sone + push-up (4-4-2/4-5-1).</li>
                                <li>• Økt 2: Dødballarbeid (sone/mann/rest).</li>
                                <li>• Økt 3: Balltapscenarier på høyresiden + overgangsmottiltak.</li>
                                <li>• Kamp: loggfør når mål imot kommer → tiltak.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Push opp! Ikke lag eget mellomrom.»</li>
                                <li>• «Sikre bak høyresiden.»</li>
                                <li>• «Dødball = plan + rest.»</li>
                                <li>• «Sluttfasen er vår – approach!»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A25-even-juliussen-ffk-forsvar.txt</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A26" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-blue-50 to-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">
                              Innlegg mot – lærdom fra TUIL 2010
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-cyan-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• 125 innlegg analysert – 88,65 % i etablert/delvis etablert spill.</li>
                                <li>• 70 % av avslutningene og 78 % av sjansene kom etter pause.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• 88,8 % av sjansene kom etter innlegg fra farlig sone.</li>
                                <li>• Posisjonell ubalanse i 59,2 % av situasjonene (ubalanse = sjanse).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Farlig sone</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Stoppe innlegg i farlig sone og ha overblikk (3+2) i boks.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Balanse</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Push opp, tette mellomrom – ikke la numerisk/hybrid balanse lure deg.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">2. omgang</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Sluttfase-plan – bytter, kommunikasjon, hvile i angrep.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklaringsrate ≥55 % (nå 53,6 %).</li>
                                <li>• Sjanser pr 100 innlegg ≤6 (nå 7,2).</li>
                                <li>• Posisjonell ubalanse ≤40 % (nå 59,2).</li>
                                <li>• Avslutning bakre stolpe ≤25 % (nå 46 %).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer 'farlig vs ufarlig' sone – stopp kryss i farlig.</li>
                                <li>• Sonestopper vs markering – tydelig ansvar.</li>
                                <li>• Motsatt back/ving i boks – ikke la liten spiller alene.</li>
                                <li>• Sluttfasetiltak – bytter, ro, ballbesittelse.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: Boks-arbeid (1v1 + sone).</li>
                                <li>• Økt 2: Innlegg fra farlig og ufarlig sone – juster blokk.</li>
                                <li>• Økt 3: Sluttfase og posisjonell balanse.</li>
                                <li>• Kamp: loggfør innlegg og sjanser per omgang.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Farlig sone først!»</li>
                                <li>• «Push og tette rom.»</li>
                                <li>• «Vinger inn i returrom.»</li>
                                <li>• «Sluttfase = skjerpings.»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A26-gaute-helstrup-innlegg-forsvar.txt</code>. Oppgave{" "}
                              <a
                                href="https://www.fotball.no/trener/uefa-a-lisens/uefa-a-lisens-oppgaver/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "A08" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3">
                            <p className="text-xs font-semibold text-indigo-800 uppercase tracking-wide">
                              Høy playmaker – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-indigo-900">
                              <li>• 3 faser: komme på ball → gå fra mulighet til realitet → avgjørende pasning.</li>
                              <li>• 80 % av mottakene skjer i mellomrom (halvspor).</li>
                              <li>• Fase 2: 1–2 touch, tid &lt; 2 sek under press.</li>
                              <li>• Fase 3: halvspor → blindside (stikk, chip, vegg).</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Bevegelse og kroppsvinkel i fase 1 for å komme på ball.</li>
                              <li>• Orientering før mottak («se før du får den»).</li>
                                <li>• Hurtig håndtering (1–2 touch) i fase 2.</li>
                                <li>• Presis avgjørende pasning fra halvspor/blinside.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Touch per fase 2: 1–2 (majoritet).</li>
                                <li>• Tid på ball (fase 2): &lt; 2 sek ved press.</li>
                                <li>• Bevegelse i forkant: 80 % mottak i mellomrom.</li>
                                <li>• Position for assist: halvspor/mellomrom.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Fase 1: bevegelse/åpen kropp i mellomrom.</li>
                                <li>• Fase 2: 1–2 touch, scanning, «første touch = løsning».</li>
                                <li>• Fase 3: halvspor → blindside, koordiner med spiss/kant.</li>
                                <li>• Roller: spiss/kant må timingen når playmaker setter fart.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Se før du får den».</li>
                                <li>• «Åpen kropp – 2 touch».</li>
                                <li>• «Slå blindside når løpet går».</li>
                                <li>• Ikke la playmaker gjemme seg – krevd av triggerord.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A08-playmaker-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/idrett---676258---uefa-a-2014-oppgave-gard-holme.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                fotball.no (PDF)
                              </a>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
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
