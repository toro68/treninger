"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { uefaAnalyses, type Fokuspunkt, type UEFAAnalyse } from "@/data/uefaAnalyses";
import { uefaFormations, type UEFAFormation } from "@/data/uefaFormations";
import { getUEFAExerciseByCode, getUEFADisplayCode } from "@/data/uefa-exercises";
import { useSessionStore } from "@/store/sessionStore";
import { GlossaryTooltip } from "@/components/GlossaryTooltip";
import { ScoringZonesDiagram } from "@/components/ScoringZonesDiagram";
import { SelmerZonesTemplateDiagram } from "@/components/SelmerZonesTemplateDiagram";
import { SvgDownloadButton } from "@/components/SvgDownloadButton";

const GENERELLE_FOKUSPUNKTER: Fokuspunkt[] = [
  {
    id: "generelt-roller",
    tekst: "Avklar roller i hver fase: ballfører, støtte, trussel (dybde/bakrom) og sikring (balanse).",
  },
  {
    id: "generelt-orientering",
    tekst: "Krav til orientering før mottak: se etter rom, press og neste pasning før ballen kommer.",
  },
  {
    id: "generelt-kroppsvinkel",
    tekst: "Søk rettvendt kroppsvinkel – spillere i mellomrom må kunne true fremover på første touch.",
  },
  {
    id: "generelt-stotteavstand",
    tekst: "Sjekk støtteavstander: nok nærhet for veggspill, nok bredde/dybde for å strekke blokka.",
  },
  {
    id: "generelt-2v1",
    tekst: "Skap 2v1 før dere spiller gjennom: bruk trekant, tredjemann og timing for å fristille ballfører.",
  },
  {
    id: "generelt-temposkifte",
    tekst: "Tren på temposkifte: rolig for å flytte motstander, raskt i gjennombrudd når øyeblikket er der.",
  },
  {
    id: "generelt-beslutning",
    tekst: "Evaluer beslutningene: riktig valg + riktig tidspunkt (ikke bare «flere aksjoner»).",
  },
  {
    id: "generelt-mistet-ball",
    tekst: "Ved balltap: umiddelbar reaksjon hvis mulig – hvis ikke, fall av og steng sentralt først.",
  },
  {
    id: "generelt-enkle-ord",
    tekst: "Bruk enkle trigger-ord i coaching: «vend», «hold», «stikk», «spill tilbake», «press».",
  },
  {
    id: "generelt-kvalitet",
    tekst: "Prioritér kvalitet over kvantitet: balltempo, pasningsvinkel og første touch skaper marginene.",
  },
];

// ============================================
// KOMPONENT
// ============================================

export const UEFASeksjon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aktivSeksjon, setAktivSeksjon] = useState<"analyser" | "formasjoner">("analyser");
  const [valgtAnalyse, setValgtAnalyse] = useState<UEFAAnalyse | null>(null);
  const [valgtFormasjon, setValgtFormasjon] = useState<UEFAFormation | null>(null);

  const formationSvgRef = useRef<HTMLDivElement | null>(null);
  const [aktivFane, setAktivFane] = useState<"oversikt" | "kpi" | "fokus" | "ovelser" | "coaching">("fokus");
  // aktivFormasjonFane er forberedt for fremtidig bruk i formasjon-faner
  const [, setAktivFormasjonFane] = useState<"oversikt" | "roller" | "prinsipper">("oversikt");
  
  const setHighlightExercise = useSessionStore((state) => state.setHighlightExercise);
  const sortedAnalyses = useMemo(
    () => [...uefaAnalyses].sort((a, b) => a.kode.localeCompare(b.kode, "nb", { numeric: true })),
    []
  );

  const handleVelgAnalyse = (analyse: UEFAAnalyse) => {
    setValgtAnalyse(analyse);
    setAktivFane("fokus");
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
                  { id: "fokus", label: "Læringsmomenter" },
                  { id: "ovelser", label: "Øvelser" },
                  { id: "coaching", label: "Coaching" },
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
                      <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                        {valgtAnalyse.sammendrag}
                      </p>

                      {valgtAnalyse.kode === "A01" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                              Juventus 3-5-2 – kampplan
                            </p>
                            <div className="grid gap-3 md:grid-cols-2 text-sm text-amber-900">
                              <div>
                                <p className="text-xs font-semibold text-amber-700">Forsvarsfundament</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Default: 5-3-2 lav blokk – steng mellom-/bakrom og led mot rom 1–2.</li>
                                  <li>• Høyt press på signaler (nese mot mål, tverspasning, dårlig touch/klarering).</li>
                                  <li>• Vingback leder inn, ytre stopper skyver, resten sideforskyver.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-amber-700">Angrepsfundament</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Vingback permanent bredde for å åpne rom sentralt.</li>
                                  <li>• Ytre stopper frispilles og fører for å skape 2v1 eller tre opp.</li>
                                  <li>• Spissrelasjon møte–stikk + indreløper tredje mann, boksfyll + returrom.</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Pressmekanismer
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Lavt press: fem bak + tett midtbane – led mot rom 1–2.</li>
                                <li>• Vingback kan ikke gå? Indreløper presser back, vingback tar kant, ytre stopper tar spiss.</li>
                                <li>• Ved vending: motsatt vingback går aggressivt inn og leder mot indreløper/ytre stopper.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Risikostyring
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Høyt press åpner bakrom – enten presset sitter, eller laget faller.</li>
                                <li>• Ved innlegg: behold tre stoppere i boks; motsatt vingback tar bakre stolpe.</li>
                                <li>• Stopper som fører må vurdere risiko når vingbacker står høyt.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Angrepsmønstre
                            </h4>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              <li>• Vingback = vendingsspiller; se etter spiss som møter/stikker eller indreløper i mellomrom.</li>
                              <li>• Når gjennombrudd ikke sitter: vend via anker/bakre ledd og angrip på nytt.</li>
                              <li>• Innlegg: 2 spisser + motsatt indreløper + motsatt vingback i boks; sentral midt + ballside indreløper sikrer returrom.</li>
                              <li>• Indreløpere forventes sluttprodukt (skudd i mellomrom, fylle boks).</li>
                            </ul>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Gjenvinning & overgang
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• 5-sekundersregel + kontradekning («def i off»).</li>
                                <li>• Brudd i lavt press kommer ofte dypt – indreløpere/vingbacker må ha løpskraft.</li>
                                <li>• To feller: stopper mister ball med høye vingbacker, eller førsteforsvarer passeres og tempo i bakre treer avgjør.</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Roller (kompakt)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Stopper: styr linja, våg å føre men vurder risiko.</li>
                                <li>• Vingback: bredde, vendingspunkt, returløp.</li>
                                <li>• Anker: tilby deg sentralt, vend tempo, slå stikkere.</li>
                                <li>• Indreløper: strekk mellomrom, møt eller gå tredje mann, lever sluttprodukt.</li>
                                <li>• Spiss: møte–stikk og press på stoppere.</li>
                                <li>• Keeper: sweeper + tydelig kommunikasjon.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Treningsprinsipper
                            </h4>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              <li>• Avklar roller per fase (ballfører, støtte, trussel, sikring).</li>
                              <li>• Orientering og rettvendt kroppsvinkel før mottak.</li>
                              <li>• Skap 2v1 før gjennombrudd, tren temposkifte og umiddelbar reaksjon ved balltap.</li>
                              <li>• Enkel coaching: «vend», «hold», «stikk», «press» – kvalitet &gt; kvantitet.</li>
                            </ul>
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
                              <li>• Sekvens: tredjespiller → målgivende → målscorer.</li>
                              <li>• Tempo skiller nivåene: snitt 6,37 sek (topplag) vs 7,09 (Strømsgodset) vs 7,9 (Nordstrand).</li>
                              <li>• Berøringer: tredjespiller pro-lag 2,17 i snitt; målscorer bruker hovedsakelig 1–2.</li>
                              <li>• Felles for lagene: kant involveres når tredjespilleren har ballen.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Tredjespiller setter rytmen: orientering før/under mottak og raske valg under press.</li>
                                <li>• Færre berøringer jo nærmere mål: tredjespiller 1–4 (tendens), målgivende 1–3, målscorer 1–2 (tendens).</li>
                                <li>• Kant involveres: sett opp kant/back for 1v1/innleggsrom og gjennombrudd.</li>
                                <li>• Etter avlevering: tredjespiller kan løpe inn i boks/45° for å binde stopper og åpne rom.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fasemodell
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Fase 1 – tredjespiller: scan → rettvendt mottak → tempoøkning.</li>
                                <li>• Fase 2 – målgivende: sett opp kant/back eller spill gjennom for å skape siste pasning/innlegg.</li>
                                <li>• Fase 3 – målscorer: få berøringer og tydelige løp i boks (2–3 foran mål).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Treningsfokus (5)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Orientering + mottak i fart (tredjespiller).</li>
                                <li>• Få-touch i siste tredjedel (færre berøringer jo nærmere mål).</li>
                                <li>• Relasjonelle løp: back–kant–indre løper/spiss for å skape 2v1.</li>
                                <li>• Hurtig spillvending → angrep motsatt kant (vendingsspill).</li>
                                <li>• Tredjespillerens gjenbesøk i boks etter pasning (bind stopper / åpne rom).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Rollebeskrivelser
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Tredjespiller (10/8): orientering, raske valg under press, sett opp kant/back.</li>
                                <li>• Målgivende (kant/back): lever presist i høy fart – innlegg/sistepasning tidlig nok.</li>
                                <li>• Målscorer: få berøringer og tydelig bevegelse i boks (angrip 1. stolpe/bakre/returrom).</li>
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
                              <li>• Lavt i hjørnet: 70,0 % (CL) vs 41,5 % (Tippeligaen) – førstevalg er ofte hjørne, ikke kraft.</li>
                              <li>• Kontroll: 86,0 % (CL) vs 49,0 % (Tippeligaen) – ro og presisjon i avslutningsøyeblikket.</li>
                              <li>• Curl/plassering: 73 % (CL) vs 30 % (Tippeligaen) – pasningsferdighet i avslutning.</li>
                              <li>• Sone 1cv/1ch: 59,5 % (CL) vs 34,5 % (Tippeligaen) – skap flere avslutninger nærmere mål.</li>
                            </ul>
                          </div>

                          <div className="rounded-2xl border border-zinc-200 bg-white shadow-inner">
                            <SelmerZonesTemplateDiagram className="max-h-[320px]" />
                            <div className="px-4 pb-4 text-xs text-zinc-500">
                              Avslutningssoner (A03) – fra 5m til 16m innenfor 16m-boksen.
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Scoringsforberedelse: skaff deg tid via medtak/bevegelse og relasjonelle handlinger.</li>
                                <li>• Plassering foran kraft: lavt i hjørnet (def.: maks 0,5 m over bakken og maks 1 m fra stolpen).</li>
                                <li>• Skap flere avslutninger i sone 1cv/1ch (mellom 5-meteren og straffemerket).</li>
                                <li>• Innlegg: tidligere mellom forsvar og keeper, ofte langs bakken (45°/cutback).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fasemodell
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Fase 1 – forberedelse: skap tid (medtak/bevegelse), se keeper og rom.</li>
                                <li>• Fase 2 – utførelse: «pasning i hjørnet» (innside/utside/curl) fremfor maks kraft når du har valg.</li>
                                <li>• Fase 3 – etterarbeid: 2./3. bevegelse i boks og jakt returrom.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Motstander-analyse
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Keeper: hvor er han sårbar (lavt hjørne / chip / 1v1)?</li>
                                <li>• Forsvar: kan vi nå sone 1cv/1ch via tidlig innlegg langs bakken eller veggspill?</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Rollebeskrivelser
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Spiss: skap tid, plasser lavt i hjørnet og angrip sone 1cv/1ch.</li>
                                <li>• Kant/back: lever tidlig innlegg mellom forsvar og keeper (ofte langs bakken).</li>
                                <li>• Indreløper/10-er: sett opp avslutter via relasjoner (2./3. løp og Z-løp).</li>
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

                          <div className="grid gap-3 md:grid-cols-2" data-testid="a04-konkrete-laringspunkter">
                            <div className="rounded-xl border border-zinc-200 p-3 space-y-3">
                              <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                  Konkrete læringspunkter
                                </h4>
                                <p className="text-sm text-zinc-600">
                                  Hovedfunn som utfordrer vanlige oppfatninger
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                                  Myten om ett-touch-spillet
                                </p>
                                <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                                  <li>• Barcelona spiller ikke primært på ett touch.</li>
                                  <li>• 25 % av involveringene er ett-touch; 20 % i scoringsangrep.</li>
                                  <li>• Snittet øker til 2,9 touch når de skal score (vs 2,5 generelt).</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                                  Kontroll fremfor tempo
                                </p>
                                <p className="text-sm text-zinc-700">
                                  Barca prioriterer ballkontroll og rytmestyring over konstant hurtighet.
                                </p>
                              </div>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3 space-y-2">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Praktiske treningsøkter
                              </h4>
                              <div className="space-y-1 text-sm text-zinc-700">
                                <p><span className="font-semibold">1. Nøyaktighet og tempo.</span> Diskuter når 1, 2 eller 3 touch er best.</p>
                                <p><span className="font-semibold">2. Bevegelseskvalitet.</span> Vinkler til ballfører og presis timing.</p>
                                <p><span className="font-semibold">3. Persepsjonstrening.</span> Økter der spillerne må lese situasjonen.</p>
                                <p><span className="font-semibold">4. Funksjonell teknikk.</span> Teknikk med tydelig kampoverføring.</p>
                                <p><span className="font-semibold">5. Spill og problemløsning.</span> Veksle mellom avventende og direkte spill.</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 space-y-4" data-testid="a04-trenerarbeid">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Konkrete tips til trenerarbeid
                            </h4>
                            <div className="space-y-3 text-sm text-zinc-700">
                              <div>
                                <p className="font-semibold text-zinc-900">1. Ballkontroll og presisjon</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Velg riktig antall touch for situasjonen.</li>
                                  <li>• Ikke press spillerne til å spille direkte hver gang.</li>
                                  <li>• Kvalitet i utførelse &gt; kvantitet av tempo.</li>
                                  <li>• Korte, presise innsidepasninger med beste fot.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">2. Roller og individuelle forskjeller</p>
                                <div className="mt-1 space-y-1">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fra analysen</p>
                                  <ul className="space-y-1">
                                    <li>• Messi 3,0 touch – frihet til å drible.</li>
                                    <li>• Xavi 2,8 touch – dirigent som styrer rytmen.</li>
                                    <li>• Busquets 2,1 touch – ryddegutt som spiller enkelt.</li>
                                    <li>• Backene: to-touch 40 %+.</li>
                                  </ul>
                                </div>
                                <p className="mt-1">Trenerkonklusjon: bygg på spillernes styrker – ikke alle skal spille likt.</p>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">3. Når skal ett-touch brukes?</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Feilvendt eller under press.</li>
                                  <li>• Tidsnød eller trangt område.</li>
                                  <li>• Ballen ligger perfekt.</li>
                                  <li>• Laget leder og vil «olé» motstanderen.</li>
                                  <li>• Ønsker å unngå skader i dueller.</li>
                                </ul>
                                <p className="mt-1 text-zinc-700">Ikke primært for kombinasjonsspill mot mål.</p>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">4. Bevegelse og posisjonering</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Alltid vinkler til ballfører og støtte tilgjengelig.</li>
                                  <li>• Medløpsbevegelser i nærrom; motsatt side truer bakrom.</li>
                                  <li>• Messi-rollen får frihet til å vandre.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">5. Herredømme gjennom possesjon</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Eie ballen = eie kampen.</li>
                                  <li>• Gjennombruddsavventende spill – vent på beste mulighet.</li>
                                  <li>• Skap samme klima i hver kamp via tålmodig oppbygging.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">6. Tidlig gjenvinning</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Umiddelbart, intenst press ved balltap.</li>
                                  <li>• Kombiner possesjon + gjenvinning for kvelningsfølelse.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">7. Spesifisitet i trening</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Tren på scenene dere møter (etablert forsvar).</li>
                                  <li>• 14 av 16 mål mot etablert blokk – repliker dette.</li>
                                  <li>• Gjenvinning fra siste tredjedel må være fast del.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">8. Teknisk utførelse</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• 16 av 21 ett-touch med innsiden av foten.</li>
                                  <li>• Spill til mottakers riktige fot (lengst fra press).</li>
                                  <li>• Korte, kontrollerte pasninger.</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 space-y-2" data-testid="a04-konklusjon">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Viktigste konklusjon for trenere
                            </h4>
                            <p className="text-sm font-semibold text-zinc-900">
                              «God ballkontroll vs. høyt tempo» – svaret er kontroll.
                            </p>
                            <ul className="space-y-1 text-sm text-zinc-700">
                              <li>• Skap herredømme gjennom possesjon og kontrollerte 2–3 touch.</li>
                              <li>• Vinn ballen tilbake umiddelbart og tving kampen inn i kjente mønstre.</li>
                              <li>• La nøkkelspillere (Xavi/Messi-rollen) ta tiden de trenger.</li>
                              <li>• Vent tålmodig på rette mulighet fremfor å jage tempo.</li>
                            </ul>
                            <p className="text-sm text-zinc-700">
                              Ikke vær redd for ekstra touch som gir kontroll – differensier roller slik Barca gjør med Messi (dribler), Xavi (dirigent) og Busquets (rydder).
                            </p>
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

                          <div className="rounded-xl border border-zinc-200 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Presshøyde-modus
                            </h4>
                            <div className="mt-2 space-y-4 text-sm text-zinc-700">
                              <div>
                                <p className="font-semibold text-zinc-900">Aggressivt press (høyt, umiddelbart)</p>
                                <p className="text-xs text-zinc-500">
                                  Angrip ballføreren før de rekker å etablere kontroll.
                                </p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Triggere: feilvendt mottaker, dårlig førstetouch, keeper/back i eget felt.</li>
                                  <li>• Bruk siderommet, få pasningsalternativer (&lt;3) eller egne dødballer som signal.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">Mellompress (kontrollert, felle)</p>
                                <p className="text-xs text-zinc-500">
                                  La motstanderen få ball, styr dem mot ønsket sone og press hardt der.
                                </p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Triggere: motstander er organisert, vi vil styre mot side/svak spiller, kort oppbygging.</li>
                                  <li>• MatchPrep: definer fellesone (f.eks. mot svak back) og vinn ballen der.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">Lavt press (passivt, kompakt blokk)</p>
                                <p className="text-xs text-zinc-500">
                                  Fall av i kompakt formasjon og gjør det trangt sentralt.
                                </p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Triggere: leder med ett mål (siste 15), teknisk overlegen motstander, bortekamp mot topplag.</li>
                                  <li>• Brukes også når laget er slitne og må spare energi.</li>
                                </ul>
                              </div>
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
                              <li>• Valg etter brudd i prioritert rekkefølge: direkte i bakrom, mellomrom, eller vekk fra press.</li>
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
                                <li>• Avklar valg i prioritert rekkefølge: direkte i bakrom, mellomrom, eller vekk fra press.</li>
                                <li>• Sikre 3+2-roller før vi sender ekstra folk i angrep.</li>
                                <li>• KPI: vellykket / mislykket / tar ikke overgangen.</li>
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
                                <li>• Orientering før mottak – løsning klar før første touch.</li>
                                <li>• Tren på avgjørende aksjoner under tett press (ofte 1–3 m) med lite tid/rom.</li>
                                <li>• Knytt touch til valg: få touch i assist/innlegg og rask utførelse.</li>
                                <li>• Innlegg: variér 1-touch vs. etter dribling, og les relasjonen spiss/motsatt ving i boks.</li>
                                <li>• Avslutning: prioriter lavt plasserte skudd og treff mål under press.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Læringspunkter fra rapporten
                            </h4>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              <li>• Forvent tett press: ved assist/innlegg/avslutning er forsvarer ofte 1–3 m unna.</li>
                              <li>• Assist (fase 2): 1–4 sek med ball er vanlig, og 1–3 touch forekommer ofte.</li>
                              <li>• Innlegg (fase 2): ofte ≤4 touch før innlegg; type aksjon varierer, med særlig forekomst av 1-touch innlegg eller innlegg etter dribling.</li>
                              <li>• Avgjørende pasning (assist fase 3): skjer i stor grad fra siste tredel (91 %).</li>
                              <li>• Øvelse UEFA-A10-03: Gk+6v6+Gk med kantsoner og forsvar låst til to korridorer; vingen leser når back forlater linjen, cut-back gir 2 poeng.</li>
                              <li>• Scoring: press på første touch er ofte 1–2 m (84 %). Tren på å plassere lavt (64 %) og avslutte inne i boksen (82 %).</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer pressavstand for vingene og hvilke rom de skal angripe.</li>
                                <li>• Velg constraints (soner/touch/poeng) som fremprovoserer ønskede valg under press.</li>
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
                                <li>• Sjanser pr. kamp: Eggen 9,5 / Jönsson 9,7 (Henriksen 6,1).</li>
                                <li>• Sjanser mot pr. kamp: Hamrén 4,0 / Jönsson 5,7.</li>
                                <li>• Kontringsandel (RBK-sjanser): Hamrén 25,5 % → Eggen 30,3 %.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Sjanser for/mot: høyere differanse gir flere poeng over tid.</li>
                                <li>• Tommelfingerregel i materialet: over 2 poeng pr. kamp krever ofte omtrent dobbelt så mange sjanser som man slipper til.</li>
                                <li>• Angrepstype påvirker balanse: mer kontringer kan gi mer begge veier.</li>
                                <li>• Koble tall til video: hvilke valg i etablert vs. kontring gir sjanser?</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              <li>• Avklar hvilke angrepstyper dere ønsker å prioritere (etablert/kontring/dødball) og hva det betyr for balanse.</li>
                              <li>• Avklar presshøyde (press eller fall) før kampstart.</li>
                              <li>• Loggfør sjanser for/mot og sjansetype – bruk video i etterkant.</li>
                              <li>• Evaluer hvilke situasjoner som gir sjanser mot (kontring vs. etablert forsvar).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Press eller fall – ikke bli halvhjertet».</li>
                                <li>• «Finn tredje spiller før siste pas».</li>
                                <li>• «Restforsvar på plass før vi overbelaster».</li>
                                <li>• «Tallene må eies – koble KPI → video etter kamp».</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A11-svein-maalen-rbk-angrep-analyse.md</code>. Oppgave:{" "}
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
                              <li>• Mål-angrep: følg tid og antall pasninger (knytt til scoringer/sjanser).</li>
                              <li>• Mange mål kommer innen få pasninger (opp mot ca. 65% innen maks 4 pasninger).</li>
                              <li>• Samtidig kommer mange mål etter lengre enn 10 sekunder (ca. 60%+).</li>
                              <li>• Direkte angrep (maks 5 trekk) har hovedvekt (ca. 60/40), men begge uttrykk må beherskes.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Snitt trekk før mål: ≈ 5,5.</li>
                                <li>• Mål innen maks 4 pasninger: opp mot ca. 65%.</li>
                                <li>• Mål etter lengre enn 10 sek: ca. 60%+.</li>
                                <li>• Direkte angrep (maks 5 trekk): ca. 60/40 i favør direkte.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Mål-angrep: vurder tid og pasningsantall (knytt til scoring).</li>
                                <li>• Direkte vs. possession: velg riktig uttrykk i kamp.</li>
                                <li>• Bruddhøyde: se hvor i banen ballvinningene som leder til mål skjer.</li>
                                <li>• Korte vs. lengre angrep: tren og evaluer begge.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklar når laget skal angripe direkte vs. etablere mer kontroll.</li>
                                <li>• Lag en enkel logg: tid og antall pasninger på målangrep/sjanser.</li>
                                <li>• Evaluer bruddhøyde og hva som skjer rett etter ballvinning.</li>
                                <li>• Bruk funnene til å justere kampplan og trening.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Tell trekk og tid – gjør det konkret.»</li>
                                <li>• «Velg: direkte nå, eller etabler og kontroller.»</li>
                                <li>• «Koble tall til video – lær av sekvensene.»</li>
                                <li>• «Ikke jag korte angrep som mål i seg selv.»</li>
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
                              <li>• Oppgaven tester to hypoteser om indreløperrollen i 4-3-1-2.</li>
                              <li>• Angrep: indreløper på sterk side, i tospann med back samme side, skaper bredde i mellomrommet.</li>
                              <li>• Forsvar: systemet fordrer høyt press, og indreløper skyver innenfra og ut mot motstanderback for å stenge pasningsalternativer sentralt.</li>
                              <li>• Balltap: kollektiv umiddelbar reaksjon – alle løper de første sekundene.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Angrep: er ballside-bredde i mellomrommet ivaretatt (IL + back)?</li>
                                <li>• Forsvar: klarer vi å lede spillet ut (ikke inn) og stenge pasningslinjer sentralt?</li>
                                <li>• Når ball går til back: kommer vi i skyv/press innenfra og ut?</li>
                                <li>• Balltap: reagerer laget umiddelbart (løper de første sekundene)?</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Angrep: relasjon IL + back på sterk side (rollefordeling og eventuelle rollerulleringer).</li>
                                <li>• Forsvar: pressvinkler innenfra og ut for å tvinge spillet mot sidekorridor.</li>
                                <li>• Synkronisering i høyt press mellom spisspar, mellomromsspiller og midtbane.</li>
                                <li>• Balltap: «klikkmentalitet» – hele laget reagerer samtidig.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklar pressretning: hvem tvinger ut, hvem skyver på back, hvem stenger sentralt.</li>
                                <li>• Avklar rollefordeling på sterk side i angrep: IL + back skaper bredde i mellomrommet.</li>
                                <li>• Avklar hva som er «plan A» i forsvar (høyt press), og når laget må falle av.</li>
                                <li>• Evaluer etter kamp: ledet vi spillet ut, og reagerte vi umiddelbart ved balltap?</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Skap bredde i mellomrommet på ballside (IL + back).»</li>
                                <li>• «Skyv innenfra og ut – steng pasning inn.»</li>
                                <li>• «Balltap: løp de første sekundene.»</li>
                                <li>• «Tving spillet ut – ikke gi gratis pasning sentralt.»</li>
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
                              Innleggssoner (A–F) – hentet fra Gard H. Kristiansens analyse (Tippeligaen 2015).
                            </div>
                          </div>

                          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                            <p className="text-xs font-semibold text-sky-800 uppercase tracking-wide">
                              Innlegg i Tippeligaen – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-sky-900">
                              <li>• Ca. 34 % av TL-mål 2015 kom fra innlegg i åpent spill.</li>
                              <li>• Innlegg nærmere mål gir høyere sannsynlighet for scoring enn de dypeste sonene.</li>
                              <li>• 68,32 % av innleggs-scoringene er registrert som «direkte» (innlegger + målscorer).</li>
                              <li>• Analysen skiller også på etablert angrep vs overgang, og på mål etter gjenvinning i forkant.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Tall i analysen
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Andel mål fra innlegg i åpent spill: ca. 34 %.</li>
                                <li>• Scoring pr innlegg: 3,5 %.</li>
                                <li>• Direkte scoring (innlegger + målscorer): 68,32 % av innleggs-scoringene (179 av 262).</li>
                                <li>• Mål innenfor 16 m: 96 % av innleggs-scoringene.</li>
                                <li>• Etablert vs overgang: 73 % / 27 %.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Bruk samme sonekoding (A–F for innlegg og bokstavsoner for scoring) når dere evaluerer egne kamper.</li>
                                <li>• Skill på direkte innleggs-scoringer vs scoringer med flere involverte før avslutning.</li>
                                <li>• Skill på innlegg mot etablert forsvar vs innlegg i overgang.</li>
                                <li>• Se på lag- og spillerforskjeller: hvem leverer, hvem scorer, og i hvilke soner.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Kartlegg egne og motstanders innleggssoner og scoringssoner med samme koding som i analysen.</li>
                                <li>• Se etter mønstre i direkte scoringer (innlegger + målscorer) versus andre typer innleggs-mål.</li>
                                <li>• Skille på innlegg mot etablert forsvar og innlegg i overgang når dere analyserer kampbildet.</li>
                                <li>• Identifiser hvilke spillere/roller som er mest involvert i innleggs-situasjoner og scoringer.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Hvilken sone slo vi innlegget fra?»</li>
                                <li>• «Var dette en direkte innleggs-scoring eller via flere involverte?»</li>
                                <li>• «Kom situasjonen i etablert angrep eller i overgang?»</li>
                                <li>• «Var gjenvinning i forkant en del av situasjonen?»</li>
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
                                <li>• «Kant: vurder innlegg inn i slottet – med riktig timing.»</li>
                                <li>• «Spiss: avklar rolle ved innlegg (foran/bakre).»</li>
                                <li>• «Kontring: utnytt ubalanse når muligheten er der.»</li>
                                <li>• «Etter innlegg: vær klar for returer.»</li>
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
                                <li>• Rollekrav: klokskap/spillforståelse løftes frem av trenerne.</li>
                                <li>• Oppspillspunkt: kunne brukes feilvendt og binde sammen laget.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Boks/luft: god i lufta og i boksen + målskårer-egenskaper.</li>
                                <li>• Pressrolle: steng sentralt og led spillet mot én side.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Boks</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Avklar rolle og bevegelse i boks ved innlegg.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Relasjon</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vær tydelig oppspillspunkt feilvendt og bygg relasjoner (vegg/dyp/tilbake) med IL/kant.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Press</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Steng sentralt og led motstanderens spill mot én side.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Evaluer rollekrav: feilvendt/oppspillspunkt, boks/luft og målskårer-egenskaper.</li>
                                <li>• Evaluer relasjoner: avtaler og timing med IL/kant.</li>
                                <li>• Evaluer press: stenge sentralt og lede til én side.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Rollekrav: spillforståelse/klokskap + tydelig oppspillspunkt feilvendt.</li>
                                <li>• Relasjoner: avklar møte/strekke, veggspill og dyp/tilbake med IL/kant.</li>
                                <li>• Boks/luft: bevegelse og rolleavklaring ved innlegg.</li>
                                <li>• Pressrolle: steng sentralt og led mot én side.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: RBK-spiss boksbevegelser (UEFA-A17-01) – avklar rolle ved innlegg.</li>
                                <li>• Økt 2: Spissrelasjoner 5v4 (UEFA-A17-02) – møte/strekke og vegg/dyp/tilbake.</li>
                                <li>• Kampdag: se etter tydelighet i avtaler + boksrolle + pressretning.</li>
                                <li>• Etter kamp: evaluer med 1–6-skala og video der det er mulig.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Vær et tydelig oppspillspunkt feilvendt.»</li>
                                <li>• «Steng sentralt – led til én side.»</li>
                                <li>• «Avklar rolle før innlegg.»</li>
                                <li>• «Rollen kan tilpasses, men kjernekrav må være på plass.»</li>
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
                                <li>• Vending av spill som virkemiddel: RBK 114 (5 kamper), Bayern 228 (4), Barcelona 343 (5), Varegg 93 (5).</li>
                                <li>• Tålmodig bearbeiding før man forsøker gjennombrudd mot lav blokk.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Gjenvinning rett etter brudd/avskjæring kan gi nye sjanser før motstander reorganiserer seg.</li>
                                <li>• Back–IL–kant-triangel skaper overlast og fristiller rommet mellom back og stopper.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Spillvending</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vend lavt → høyt for å flytte blokka og skape bedre vilkår for gjennombrudd.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Rom mellom back og stopper</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Angrip rommet mellom back og stopper etter vending. Kant/back kan bytte høyde, og indreløper kan true mellomrom/bakrom.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gjenvinning</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Etter brudd/avskjæring (og mens motstander reorganiserer seg) kan gjenvinningspress gi ny sjanse – «kontring på kontring».</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Etablerte angrep: RBK 99 (5), Bayern 163 (4), Barcelona 204 (5), Varegg 191 (5).</li>
                                <li>• Vellykkede angrep: RBK 20, Bayern 30, Barcelona 37, Varegg 32.</li>
                                <li>• Vending av spill: RBK 114, Bayern 228, Barcelona 343, Varegg 93.</li>
                                <li>• Varegg: 78% (25/32) vellykkede angrep via gjennombrudd i mellomrom.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Vend før gjennombrudd – tving lav blokk til å flytte.</li>
                                <li>• Bruk siden for å rettvende indreløper/10-eren i mellomrom.</li>
                                <li>• Back/IL/kant: definer roller (overlapp, underlapp, timing i rom).</li>
                                <li>• Tempo og kvalitet i vendingen (ballfart + presisjon) avgjør om du får «gratis» meter.</li>
                                <li>• Fristill ballfører med støtte og avstand – skap 2v1 før du prøver å spille gjennom.</li>
                                <li>• Etter vending: angrip rommet mellom back og stopper med løp + pasning (ikke bare innlegg).</li>
                                <li>• Balanse i angrep gjør gjenvinningspress mulig.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: Spillvending til rom mellom back og stopper (UEFA-A18-01) – valgfritt krav om vending før gjennombrudd.</li>
                                <li>• Økt 2: Gjenvinning i lav blokk (UEFA-A18-02) – «kontring på kontring».</li>
                                <li>• Kamp: tell spillvendinger og gjenvinningsmål i sanntid.</li>
                                <li>• Etter kamp: evaluer kvalitet i leveranser (innlegg vs cut-back) etter vending.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Vend – vurder – slå.»</li>
                                <li>• «Back/IL/kant = trekant, aldri på linje.»</li>
                                <li>• «Kontring på kontring – balanse klar!»</li>
                                <li>• «Rettvend 10-eren via siden.»</li>
                                <li>• «Fri ballfører før du spiller gjennom.»</li>
                                <li>• «Etter vending: se rommet mellom back og stopper.»</li>
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
                                <li>• Kontinuitet over tid skaper relasjoner (KFUM: 14 av 16 i 2008-troppen var fra klubben).</li>
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
                                Back/IL/kant-triangel, over-/underlapp, hurtig possession i nærrom.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gjenvinning</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Gjenvinning kan gi nye angrep mot ubalanse («kontring på kontring»). Balanse i angrep gjør gjenvinningspress mulig.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• VIF (2010): 47% av målene fra etablert/delvis etablert, 28% overgang, 25% dødball.</li>
                                <li>• VIF (2010): 70 mål og 195 sjanser (inkl. mål).</li>
                                <li>• KFUM (2009–2010): 58 mål mot etablert + delvis etablert (nesten halvparten av målene).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Tålmodig bearbeiding før gjennombrudd.</li>
                                <li>• Triangelspill back–IL–kant før siste pas.</li>
                                <li>• 1A/1F-roller definert i alle økter.</li>
                                <li>• Kontinuitet i stall og roller over tid.</li>
                                <li>• Skap rettvendt 1A i nærrom (vend, veggspill, tredje mann).</li>
                                <li>• Vurder vending som «reset» når lav blokk er i balanse – flytt og angrip på nytt.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: KFUM nærrom-possession (UEFA-A19-01) – 1A/1F-trening.</li>
                                <li>• Økt 2: 8v8 mot lav blokk (UEFA-A19-02) – triangel & tålmodighet.</li>
                                <li>• Kamp: noter hva som skaper gjennombrudd (relasjoner, vending, 1v1, overlapp).</li>
                                <li>• Etter kamp: evaluer tålmodighet + balanse ved balltap.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Sterk 1A – ta duellen, behold roen.»</li>
                                <li>• «Gjenkjenn over/underlapp.»</li>
                                <li>• «Struktur før fart.»</li>
                                <li>• «Vinn ballen tilbake når muligheten er der.»</li>
                                <li>• «Flytt blokka – så stikk.»</li>
                                <li>• «Siste pasning kommer etter relasjon, ikke før.»</li>
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
                                <li>• 46 av 285 CL-mål (2005/06) kom etter backinvolvering høyt i banen.</li>
                                <li>• Mot etablert/delvis etablert forsvar: 46 av 105 (44 %) involverte høy back.</li>
                                <li>• Milan vs Barcelona (2 kamper): 4 av 9 sjanser etter backinvolvering (i etablert/delvis etablert).</li>
                                <li>• Balanse/restforsvar: prinsipp om 3+2 når back går.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Frigjør backen gjennom hurtig vending og indreløper som trekker inn.</li>
                                <li>• Back starter løp før ballen spilles – møt ball med fart.</li>
                                <li>• Midtbane må lese når back går og sikre 3+2.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
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
                                <li>• Definer &rsquo;farlig vs ufarlig&rsquo; sone – stopp kryss i farlig.</li>
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
                              <li>• Fase 1: lavt/midt i mellomrom + åpen kropp ved mottak (88,3 % / 80,3 %).</li>
                              <li>• Fase 2: kort tid på ball (0–2 sek = 59,8 %) → mye avgjøres før mottak.</li>
                              <li>• Fase 3: presis + timet avgjørende pasning (ofte fra sentral sone/mellomrom).</li>
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
                                <li>• Presis avgjørende pasning fra sentral sone/mellomrom.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Høyde i mellomrom: lavt/midt i rommet = 88,3 %.</li>
                                <li>• Kroppsvinkel ved mottak: rett-/sidevendt = 80,3 %.</li>
                                <li>• Tid på ball (fase 2): 0–2 sek = 59,8 %.</li>
                                <li>• Touch (fase 2): 1 touch = 27,8 % (2 touch = 24,7 %).</li>
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
                                <li>• Fase 3: avgjørende pasning med timing, koordiner med spiss/kant.</li>
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
                                <li>• «Vær presis og treff timing mot løp».</li>
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
                      {[...valgtAnalyse.fokuspunkter, ...GENERELLE_FOKUSPUNKTER].map((fp) => (
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
                {aktivFane === "coaching" && (
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
                    <div className="space-y-2">
                      <div className="flex justify-end">
                        <SvgDownloadButton
                          containerRef={formationSvgRef}
                          fileName={valgtFormasjon.navn}
                        />
                      </div>
                      <div
                        ref={formationSvgRef}
                        className="w-full h-auto p-4 border rounded-lg bg-green-50"
                        dangerouslySetInnerHTML={{ __html: valgtFormasjon.svgDiagram }}
                      />
                    </div>
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
