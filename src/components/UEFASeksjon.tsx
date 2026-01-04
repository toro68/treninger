"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { uefaAnalyses, type Fokuspunkt, type UEFAAnalyse } from "@/data/uefaAnalyses";
import { getUEFAExerciseByCode, getUEFADisplayCode } from "@/data/uefa-exercises";
import { useSessionStore } from "@/store/sessionStore";
import { GlossaryTooltip } from "@/components/GlossaryTooltip";
import { ScoringZonesDiagram } from "@/components/ScoringZonesDiagram";
import { SelmerZonesTemplateDiagram } from "@/components/SelmerZonesTemplateDiagram";

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
  const [valgtAnalyse, setValgtAnalyse] = useState<UEFAAnalyse | null>(null);
  const [aktivFane, setAktivFane] = useState<"oversikt" | "kpi" | "fokus" | "ovelser" | "coaching">("oversikt");
  
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
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="text-sm font-medium text-zinc-700" htmlFor="uefa-analyse-select">
                Velg oppgave
              </label>
              <select
                id="uefa-analyse-select"
                className="w-full sm:w-[420px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
                value={valgtAnalyse?.id ?? ""}
                onChange={(e) => {
                  const valgtId = e.target.value;
                  if (!valgtId) {
                    setValgtAnalyse(null);
                    return;
                  }
                  const analyse = sortedAnalyses.find((a) => a.id === valgtId);
                  if (analyse) handleVelgAnalyse(analyse);
                }}
              >
                <option value="">— Velg —</option>
                {sortedAnalyses.map((analyse) => (
                  <option key={analyse.id} value={analyse.id}>
                    {analyse.kode}: {analyse.tittel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Valgt analyse */}
          {valgtAnalyse && (
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
                                  <li>• Høyt press på signaler (nese mot eget mål, lang tverspasning, dårlig touch/klarering).</li>
                                  <li>• Vingback leder inn, ytre stopper skyver, resten sideforskyver.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-amber-700">Angrepsfundament</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Vingback permanent bredde for å åpne rom sentralt – bakrom prioriteres.</li>
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
                                <li>• Ved vending: motsatt vingback går aggressivt inn og leder mot indreløper/sentral midt.</li>
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
                                <li>• To feller: stopper mister ball med høye vingbacker, eller førsteforsvarer passeres (forsink alltid!).</li>
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
                                <li>• Tempo-forskjellen: skyldes pasningskraft, førstetouch og samtidige løp i fart (ikke bare færre touch).</li>
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
                                <li>• Automatisering: tren på kamplike repetisjoner for å skape ro i avslutningsøyeblikket.</li>
                                <li>• Innlegg: tidligere mellom forsvar og keeper, ofte langs bakken (45°/cutback).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fasemodell
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Fase 1 – forberedelse: skap tid (medtak/bevegelse), orientering og valg før mottak.</li>
                                <li>• Fase 2 – utførelse: «pasning i hjørnet» (innside/utside/curl) – lavt og kontrollert.</li>
                                <li>• Fase 3 – etterarbeid: jakt returer og vær på plass for andreball (være «på» etter skudd).</li>
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
                                  <li>• 16 av 21 ett-touch med innsiden av foten (presisjon).</li>
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
                                <li>• Fremoverpasninger: snitt 54 % (opp mot 60 % når laget ligger under).</li>
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
                                <li>• «Avslutninger: ofte fra distanse for å hindre kontring (lav uttelling).»</li>
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

                      {valgtAnalyse.kode === "A07" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                              Målscorer – nøkkelgrep
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-amber-900">
                              <li>• 3 styringsprinsipper: avslutt fort, riktig sone (16 m/11 m) og ha en plan.</li>
                              <li>• 70 % av målene på 1 touch (85 % på 1–2 touch).</li>
                              <li>• 94 % av målene innenfor 16 m (75 % innenfor 11 m).</li>
                              <li>• Innlegg + returer er store bidragsytere (37 % innlegg / ~10 % returer).</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avslutt fort – bygg repertoar for 1–2 touch.</li>
                                <li>• Kom deg inn i 16 m (helst 11 m) før sjansen.</li>
                                <li>• Ha en plan i typiske situasjoner (1v1, skrå vinkel, innlegg, retur).</li>
                                <li>• Bevegelse i boks: blindsiden lenge, rykk på ball.</li>
                                <li>• Presisjon nær mål, kraft på distanse: innenfor 16 m → sikker innside/plassering.</li>
                                <li>• Etterarbeid: returløp er en vane (alltid).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• 1 touch (egne mål): 70 %.</li>
                                <li>• 1–2 touch (egne mål): 85 % (toppklubber: 83 %).</li>
                                <li>• Mål innenfor 16 m: 94 % (innenfor 11 m: 75 %).</li>
                                <li>• Mål etter innlegg (toppklubber): 37 %.</li>
                                <li>• Mål etter returer (egne mål): ~10 %.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Planlegg hvordan vi får ballen inn i 11 m-sonen (innlegg/cut-back/returer).</li>
                                <li>• Avklar «første touch = løsning» i boks (1 touch når mulig).</li>
                                <li>• Trigger: skudd/innlegg → returløp inn i returrom med en gang.</li>
                                <li>• KPI i kamp: 1-touch i boks, avslutninger fra 11 m-sone, returløp.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Er du usikker på tid, har du dårlig tid».</li>
                                <li>• «1 touch i boks – bestem før mottak».</li>
                                <li>• «Blindsiden lenge – rykk på ball!»</li>
                                <li>• «Retur er din jobb – alltid».</li>
                                <li>• «Nært mål = presisjon (innside)».</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A07-maalscorer-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oppgave-sigurd-rushfeldt.pdf"
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
                              <li>• 3 moduser: Direkte (bakrom), Mellomrom (true 2. ledd), Kontroll (vekk fra press).</li>
                              <li>• 1.forsvarer er signalspiller: vinn når vi har balanse, sink når vi er i ubalanse.</li>
                              <li>• Restforsvar («def i off») = 3+2 i beredskap (posisjonell/numerisk).</li>
                              <li>• Skap trusler i flere rom samtidig – ikke spill på første løp (timing/utførelse).</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Gunstige brudd: 97 (43 høye / 54 lave).</li>
                                <li>• Vellykket overgang-rate: 22/97 (≈23 %).</li>
                                <li>• Sjanse-rate (etter vellykket overgang): 17/22 (≈77 %).</li>
                                <li>• Valg etter brudd: mellomrom 43 / bakrom 29 / vekk fra press 27.</li>
                                <li>• Mislykkede overganger: 52 (på 4 kamper).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Roller og triggere
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Nærmeste er 1F: vinn eller sink (les klima).</li>
                                <li>• 3+2 igjen før vi overbelaster (balansekrav).</li>
                                <li>• Skap trusler i flere rom samtidig (flere pasningsalternativer).</li>
                                <li>• Valg: frem i lengderetning hvis mulig – ellers vekk fra press.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Variert presshøyde: diamant (høyt) vs. lav blokk (lav risiko).</li>
                                <li>• Avklar valg-hierarki: frem når det er der – ellers vekk fra press.</li>
                                <li>• Sikre 3+2-roller før vi sender ekstra folk i angrep.</li>
                                <li>• Kontinuitet: relasjoner krever faste mønstre (Brodd brukte 40 spillere).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues & Metodikk
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Nærmeste er 1F!» – vinn eller sink.</li>
                                <li>• «Ikke spill på første løp» – unngå 1. bevegelse-fellen.</li>
                                <li>• «Bevar roen» – gå fra aggressivt forsvar til ro med ball.</li>
                                <li>• Rolletrening: stoppere må trene på kontrollerte klareringer.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A09-bjarte-lunde-aarsheim-overgang-analyse.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2014-oppgave-bjarte-lunde-aarsheim.pdf"
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
                              <li>• Kampdata: nøkkelsituasjoner skjer under tett press (ofte 1–3 m) og kort tid (typisk 1–4 sek).</li>
                              <li>• Decisive pass: 1–2 m press i 89 % og oftest fra siste tredjedel (91 %).</li>
                              <li>• Innlegg: målrom 5 m + sentralt i boksen; spiss scorer 56 % / motsatt kant 31 %.</li>
                              <li>• Scoring: 82 % i boks og 64 % lavt plassert – tren kampnære «safe» valg under press.</li>
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
                                <li>• Handlinger før assist: 2-touch (67 %).</li>
                                <li>• Decisive pass: 1–2 m press (89 %); siste tredjedel (91 %).</li>
                                <li>• Innlegg: press 1 m (44 %) / 2 m (38 %); touch ≤4 (76 %).</li>
                                <li>• Etter innlegg: spiss 56 % / motsatt kant 31 % / midtbane 12 %.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Rolle- og treningsfokus
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Før ball: kom rettvendt og kom i scoringsrom (korridor + mellomrom).</li>
                                <li>• Med ball: løs under ekstremt tid/rom-press – oppdatert før 1. touch.</li>
                                <li>• 1. touch → fart/retning, kort ball–kropp-avstand.</li>
                                <li>• Siste handling: decisive pass/innlegg/avslutning under 1–2 m press.</li>
                                <li>• Innlegg/avslutning: tren mot målrom 5 m + straffemerke og lav plassering.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Læringspunkter fra rapporten
                            </h4>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                              <li>• 3 faser å trene: før ball → med ball → siste handling.</li>
                              <li>• Assist/skapende: avgjørende aksjon innen ≤4 sek er kampnært mål.</li>
                              <li>• Decisive pass: skjer ofte under 1–2 m press (89 %) og fra siste tredjedel (91 %).</li>
                              <li>• Innlegg: styr mot målrom 5 m + sentral 16 m; koordiner spiss + motsatt kant i boks.</li>
                              <li>• Scoring: 82 % i boks og 64 % lavt plassert – tren lav, kontrollert avslutning under press.</li>
                              <li>• Øvelser: bruk constraints (soner/touch/poeng) for å skape kampnært tid/rom-press.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer kantens startpunkt: bred korridor vs mellomrom – med intensjon mot mål.</li>
                                <li>• Avtal boksroller før kamp: spiss i 5 m / 1. sone + motsatt kant på bakre/retur.</li>
                                <li>• Tren siste handling kampnært: decisive pass og avslutning med forsvarer tett (1–2 m).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Se før du får den – du har 1–4 sek!»</li>
                                <li>• «1. touch mot mål – ikke stopp opp i press.»</li>
                                <li>• «Kamufler – innside som skjuler retning.»</li>
                                <li>• «Innlegg: 5m + straffemerke først!»</li>
                                <li>• «Avslutt lavt når du har kontroll.»</li>
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
                              <li>• 5 trenerperioder: sjanser for/mot fungerer som «speil» på spillestil og konsekvens.</li>
                              <li>• Sjanse-differanse (for–mot) er sterk styringsvariabel for poengfangst.</li>
                              <li>• Tommelfingerregel: &gt;2 poeng/kamp ≈ skape ca. 2x så mange sjanser som man slipper til.</li>
                              <li>• Spillestil måles i angrepstype (kontring/etablert/dødball) og i «def i off» (balanse/restforsvar).</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Poeng pr. kamp: Eggen 2,4 / Hamrén 2,1.</li>
                                <li>• Sjanser for pr. kamp: Tørum 8,4 / Henriksen 6,1 / Hamrén 8,1 / Eggen 9,5 / Jönsson 9,7.</li>
                                <li>• Sjanser mot pr. kamp: Tørum 5,9 / Henriksen 3,8 / Hamrén 4,0 / Eggen 4,4 / Jönsson 5,7.</li>
                                <li>• Store sjanser pr. kamp: Hamrén 1,9 → Jönsson 2,7 (Eggen 2,6).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Styr etter diff: mål «8–10 sjanser for + maks ~4 mot» (praktisk kampmål).</li>
                                <li>• «Def i off»: angrip samlet og vær klare til gjenvinning/restforsvar ved balltap.</li>
                                <li>• Stil-kontrakt: Hamrén-modus (kontroll/lav risiko) vs Eggen-modus (mer gjennombrudd/kontring).</li>
                                <li>• Kvalitet &gt; volum: tren «rene» store sjanser, ikke bare mange avslutninger.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Bestem kamp-klima: Eggen-modus (mer framover) eller Hamrén-modus (kontroll + def i off).</li>
                                <li>• Restforsvar-regel i siste tredjedel: minimum 3+2 igjen (praktisk startpunkt).</li>
                                <li>• Overgangsregler: ved ubalanse → kontring; ellers sikre og etablere kontroll.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Diff! Vi skal skape dobbelt så mange som vi slipper til.»</li>
                                <li>• «Def i off! Angrip samlet – vær klare til å vinne igjen.»</li>
                                <li>• «Når vi mister: nærmeste trykker, resten sikrer midten.»</li>
                                <li>• «Ikke jag skudd – jag STORE sjanser.»</li>
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
                              <li>• Ca. 65% av mål kommer etter ≤4 pasninger, men 60%+ kommer etter &gt;10 sek (få pasninger ≠ alltid superkort tid).</li>
                              <li>• Direkte angrep dominerer i forkant av mål: ca. 60–40 i favør direkte (≤5 pasninger).</li>
                              <li>• Behersk begge gir: direkte når ubalanse/rom er der – ellers sikre og bygge kontrollert.</li>
                              <li>• Flytt bruddsonen opp: internasjonalt kommer flere målangrep fra brudd i 2/4–3/4 (kortere avstander → bedre gjenvinning).</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Andel mål/sjanser fra ≤4 pasninger (ca. 65% i materialet).</li>
                                <li>• Direkte-andel i forkant av mål/sjanse: ca. 60–70% retningsverdi.</li>
                                <li>• Angrep som ender i sjanse innen 10–16 sek (men vær obs: mye skjer også etter 16+ sek).</li>
                                <li>• Brudd i 2/4–3/4 som fører til sjanse/mål (mål: øke over tid).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Velg riktig etter brudd: direkte når ubalanse – sikre når ikke.</li>
                                <li>• Tren på å fullføre overgang (ikke gi «kontring på egen kontring»).</li>
                                <li>• Bygg vaner som flytter bruddsonen til 2/4–3/4 (kortere avstander + kollektivt trykk).</li>
                                <li>• Forstå «hurtig»: ofte få pasninger, men ikke nødvendigvis &lt;10 sek.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklar «valg etter brudd»-regel: ubalanse + støtte + løpskraft → direkte og fullfør; ellers sikre og bygg nytt.</li>
                                <li>• Definer press-/gjenvinningsambisjon: vil dere oftere vinne ball i 2/4–3/4, må avstander og kollektivt trykk opp.</li>
                                <li>• Sett 2–3 kamp-KPIer: direkte-andel, brudd i 2/4–3/4, og avslutninger etter 10–16+ sek (tålmodighet).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Se ubalanse først: kan vi gå nå – eller må vi sikre?»</li>
                                <li>• «Når vi går, så går vi fullt: framover, støtte, boks.»</li>
                                <li>• «Kort avstand ved balltap – vinn neste ball i midtsonen.»</li>
                                <li>• «Direkte ≠ hastverk: få pasninger, men riktig timing.»</li>
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
                              <li>• Gjenvinning er viktigst: 1F først, press i tre ledd.</li>
                              <li>• Presshøyde som standard: høyt press, med avtalt fall-av ved behov.</li>
                              <li>• Sideback må tåle 1v1 i sidekorridor uten gratis stopper-sikring.</li>
                              <li>• Angrep i 3 faser med 3. angriper – og minst 4 samtidige løp i boks i etablert angrep.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Gjenvinningstid etter balltap: ≤6–8 sek (eller fall av til 3 ledd).</li>
                                <li>• Etablert angrep: ≥4 samtidige innløp i boks.</li>
                                <li>• SB→IL rettvendt i mellomrom/rom 2: tell suksesser pr omgang.</li>
                                <li>• 1v1-situasjoner SB/IL (off+def): «mange nok» – tell pr økt/kamp.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• 1F først: fullfør press på støttepasning bakover.</li>
                                <li>• Sidekorridor-dueller: SB står alene i 1v1 (evt. hjelp fra IL).</li>
                                <li>• SB→IL: frispill rettvendt i rom 2 og skap 2v1 på back.</li>
                                <li>• Etablert angrep: fire løp – fire rom (definer boksjobber).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Velg presshøyde-modus: høyt som base, avtal når dere faller av.</li>
                                <li>• 11v11-progresjon: coach oppspill, la motstander justere presshøyde, coach defensiv struktur, avslutt med vanlig spill.</li>
                                <li>• Ukeplan: veksle relasjonelt (1F vs 2F/3F) og strukturelt (press/sikring/dekke rom/markere) med intensitetsstyring.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Gjenvinn først – vi presser i tre ledd.»</li>
                                <li>• «SB: tør å stå i 1v1 – du får ikke gratis sikring.»</li>
                                <li>• «IL: scan – 1. touch av press – spill rettvendt.»</li>
                                <li>• «I boks: fire løp – fire rom.»</li>
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
                              <li>• 4-3-1-2 mangler naturlige høye breddeholdere → bredde må skapes av roller.</li>
                              <li>• Angrep: ballside 8 er breddeholder; motsatt 8 stabiliserer smalt/innenfor («én går – én blir»).</li>
                              <li>• «Regel-bilde»: start smalt → bli rettvendt i mellomrom → gå ut (innenfra og ut).</li>
                              <li>• Forsvar: ønsk ofte spill mot sidekorridor → støt innenfra-og-ut og steng pasning innover.</li>
                              <li>• Kompakthet som ramme: ca. 30 m lengde / 40 m bredde.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                KPI-er
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Etablert forsvar: lengde ≤ 30 m.</li>
                                <li>• Etablert forsvar: bredde ≤ 40 m.</li>
                                <li>• Rollebalanse: «én går – én blir» (hvor ofte går ballside 8 uten at motsatt 8 sikrer?).</li>
                                <li>• Strukturkontekst: Tippeligaen 2015 (39 % én / 61 % to) og Serie A 2015/16 (76 % én / 24 % to).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Angrep: ballside 8 går bredt for å dra ut ledd og skape rom sentralt.</li>
                                <li>• Balanse: motsatt 8 sikrer smalt/innenfor når ballside 8 går.</li>
                                <li>• Mellomrom: start smalt → bli rettvendt → gå ut (innenfra og ut).</li>
                                <li>• Forsvar: lås spill mot sidekorridor og støt innenfra-og-ut.</li>
                                <li>• Ramme: prioriter 30/40 før dere «jager» ball.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklar breddeansvar på sterk side: når går 8 bredt, og når tar back høy bredde (særlig etter spillvending)?</li>
                                <li>• Definer pressretning: ønsk ofte utfall mot sidekorridor, slik at 8 kan møte spillet innenfra-og-ut.</li>
                                <li>• Sett minimumskrav til kompakthet før kamp (30/40) og repeter i walk-through.</li>
                                <li>• Avklar presshøyde-modus: aggressivt (høyt), mellompress (felle), lavt (kompakt).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Ballside 8: skap bredde. Motsatt 8: bli igjen og balanser.»</li>
                                <li>• «Smalt først – bli rettvendt i mellomrom – så ut (innenfra og ut).»</li>
                                <li>• «Jobb innenfra og ut når vi støter.»</li>
                                <li>• «Hold laget kort og smalt (30/40) før vi går i brudd.»</li>
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
                              <li>• 33,85 % av alle mål i TL 2015 kom etter innlegg i åpent spill (262 av 774).</li>
                              <li>• Samtidig endte bare 3,5 % av alle innlegg i åpent spill med scoring.</li>
                              <li>• 68,32 % av innleggsmålene er «direkte» (innlegger + målscorer) – direkte mindset i boks.</li>
                              <li>• 73 % av innleggsmål kommer mot etablert forsvar (27 % etter overgang) → bygg relasjoner på side.</li>
                              <li>• Scoringssoner: D (27,48 %) og C (24,43 %) er toppsonene.</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Tall i analysen
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Andel mål etter innlegg (åpent spill): 33,85 % (262/774).</li>
                                <li>• Suksessrate pr innlegg (åpent spill): 3,5 %.</li>
                                <li>• Direkte andel av innleggsmål: 68,32 % (179/262) = ca. 23 % av alle mål.</li>
                                <li>• Etablert vs overgang (innleggsmål): 73 % / 27 %.</li>
                                <li>• Scoringssone: D 27,48 % / C 24,43 % (deretter 1. stolpe og bakre).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Fokusområder
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Kom til riktig innleggsposisjon før du slår (vinn kant/overtall først).</li>
                                <li>• Bemann 4 soner: 1. stolpe, C, D og bakre stolpe (tydelige løpsroller).</li>
                                <li>• Direkte mindset i boks – men med organisert ettertrykk (andreball-lås).</li>
                                <li>• Etablert angrep er hovedarena → bygg faste relasjoner på side.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Kampplan (MatchPrep)
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer innleggsplanen: hvem slår oftest (kant/back), og hvilken type (cutback til D vs luft i C/bakre).</li>
                                <li>• Avtal boksroller: 9 = C/1. stolpe, motsatt kant = bakre, 8/10 = D, 6 = rest/ettertrykk.</li>
                                <li>• Forbered dere på etablert angrep (73 % av innleggsmålene) med faste relasjoner på side.</li>
                                <li>• Triggerord: «VINN KANT», «D!», «FØRSTE!», «BAKRE!», «ETTERTRYKK!»</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Coaching cues
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Ikke slå fordi du kan – slå fordi vi har vunnet posisjon.»</li>
                                <li>• «D-løper på plass før innlegget går.»</li>
                                <li>• «1. stolpe / C: angrip ballen – ikke vent.»</li>
                                <li>• «Ettertrykk 5 sek! Først press, så sikring.»</li>
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
                                <li>• 147 målsjanser på 16 kamper = 9,19 pr kamp.</li>
                                <li>• Faser: 54 % etablert (80), 29 % overgang (42), 17 % dødball (25).</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Virkemiddel: 52 % av sjansene etter innlegg (48 % kombinasjon).</li>
                                <li>• Side-skjevhet: 58 % av sjansene fra høyre (85 vs 62).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Etablert (54 %)</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Gjennombrudd bredt: vending av spill → overtall på kant → innlegg/cutback.
                              </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Overgang (29 %)</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Straff ubalanse når muligheten er der – uansett kampstatus.
                              </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Dødball (17 %)</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Høy uttelling (40 %) – kvalitet i serve + ettertrykk/andreball.
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Sjanser pr kamp: ~9 (egen referanse).</li>
                                <li>• Fasefordeling: etablert/overgang/dødball.</li>
                                <li>• Innlegg som motor: andel sjanser etter innlegg (RBK: 52 %).</li>
                                <li>• Sideproduksjon: høyre/venstre (RBK: 58/42).</li>
                                <li>• Uttelling totalt: mål/sjanser (RBK: 21 %).</li>
                                <li>• Trykkperioden 60–75: sjanser i 61–75 (RBK: 25 %).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Etablert: vending + indreløper i mellomrom → overtall bredt → innlegg/cutback.</li>
                                <li>• Relasjoner: «samme side» og kontinuitet i roller over tid.</li>
                                <li>• Boksroller: motsatt kant 1. stolpe, 9’er bakre, ettertrykk rundt D.</li>
                                <li>• Dødball: prioriter serve-kvalitet + andreball/ettertrykk.</li>
                                <li>• Overgang: straff ubalanse når den er der – ellers sikre og etablér.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Kampplan (MatchPrep)</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Mot lav blokk: planlegg «vinn kant» ofte (vending → overtall bredt → innlegg/cutback).</li>
                                <li>• Definer boksroller før kamp: motsatt kant 1. stolpe, 9’er bakre, minst én fyller/ettertrykker rundt D.</li>
                                <li>• Plan for 60–75: tydelig topproduktiv periode – tempo/risiko/bytter.</li>
                                <li>• Dødballpakke: serve-kvalitet + tydelig andreball/ettertrykk-beredskap.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Vinn kant – vend spillet!»</li>
                                <li>• «Fyll boks: motsatt kant 1!»</li>
                                <li>• «9’er: bakre!»</li>
                                <li>• «Ettertrykk!»</li>
                                <li>• «Straff ubalanse – gå!»</li>
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
                              RBK-spissen i 4-3-3 – kjernefunn
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-rose-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Feilvendt oppspillspunkt + «klokskap»: tydelig oppspillspunkt, god feilvendt – men først og fremst smart.</li>
                                <li>• Lav prioritet på ren bakromsfart (lavest av ferdighetene; snitt 3,2).</li>
                                <li>• Tydelige avtaler: arbeidsoppgavene oppleves «veldig tydelige» i etablert og press.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Lite behov for langpasningsspiss (ifølge spillersvarene).</li>
                                <li>• RBK-filter: ikke «bare bakromsjeger» – rollen skal gjøre andre gode.</li>
                                <li>• Defensivt ansvar: pressleder – steng sentrum og led til avtalt side.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Feilvendt</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Lås stopper, vinn første kontakt og spill av på 1–2 touch – kvalitet over volum.
                              </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Relasjon</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Spill av og utløse tredjemann/ving/8 i neste aksjon (vegg/dyp/tilbake, timing foran ballfører).
                              </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Pressleder</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Steng sentrum → led til side. Spill inn i avtalt felle og vinn ball innen 6–8 sek.
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Feilvendt-oppspill: kontroll + avlevering på 1–2 touch.</li>
                                <li>• Relasjonsutløsning: spill av → tredjemann/ving/8 i neste aksjon.</li>
                                <li>• Boksbidrag: førstekontakter i boks + løp som skaper rom.</li>
                                <li>• Pressledelse: tving til avtalt side + ballvinning innen 6–8 sek.</li>
                                <li>• Avtale-treff: hvor ofte spissen følger kampavtalen i nøkkelsituasjoner.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Angrep: gjør andre gode (spill av + utløse tredjemann).</li>
                                <li>• Boks: kom deg fri (ikke bare inn) – definerte løp og timing.</li>
                                <li>• Avtaler: tydelige triggers i etablert (sideback/stopper/6 vender opp/1v1/8 truer/innlegg).</li>
                                <li>• Press: samme retning i høyt/mellom/lavt press – steng sentrum og led til side.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Kampplan (MatchPrep)</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Etablert: bygg «avtale-kort» på triggers (sideback/stopper/6 vender opp/1v1 på kant/8 truer rom 2/innlegg).</li>
                                <li>• Presshøyde-modus: høyt = styrer, mellom = felle, lavt = retning + vær oppspillspunkt ved brudd.</li>
                                <li>• Økt 1: Feilvendt-oppspill + tredjemann (UEFA-A17-01).</li>
                                <li>• Økt 2: Innlegg/boksroller (UEFA-A17-02).</li>
                                <li>• Økt 3: Pressledelse (UEFA-A17-03).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Lås stopper – vinn første kontakt – spill av på 1–2 touch.»</li>
                                <li>• «Vær klok: gjør valgene før du får ball.»</li>
                                <li>• «Steng sentrum – led til side!»</li>
                                <li>• «I boks: kom deg fri – ikke bare inn.»</li>
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
                              Angrep mot lav blokk – mønster å trene
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-emerald-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Toppnivå: 40+ etablerte angrep pr kamp i snitt (tålmodighet + mange vendinger høyere i banen).</li>
                                <li>• To veier: sidekorridor → innlegg/cut-back (Bayern) eller rettvendt i mellomrom → sentralt gjennombrudd (Barca/Varegg).</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Nøkkel: ballfører-pådrag når 1. pressledd ikke får trykk → bind 2. ledd og slipp i rett øyeblikk.</li>
                                <li>• Struktur i angrep påvirker gjenvinning: «kontring på kontring» hvis dere tåler balltap.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Vending med hensikt</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                «Trekk dem over → slå motsatt → angrip rommet». Hvis rommet nøytraliseres: vend igjen.
                              </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Pådrag + mellomrom</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Når 1F ikke får trykk: ballfører avansér, bind 2F og finn rettvendt i mellomrom før avslutning.
                              </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Restforsvar + gjenvinning</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Angrep må tåle balltap: vinn ballen tilbake (gjerne innen 6–8 sek), hvis ikke – steng sentrum først.
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Etablerte angrep pr kamp: mål 25–40 (toppref ~40+).</li>
                                <li>• Vellykkede angrep pr kamp: referanse ~5–6.</li>
                                <li>• Vendinger totalt / i angrepshalvdel: evne til å flytte lav blokk.</li>
                                <li>• Gjennombrudd i mellomrom: forsøk + treff (Varegg 78% av vellykkede via mellomrom).</li>
                                <li>• Pådrag/1v1: hvor ofte dere binder 2. ledd før dere slipper ball.</li>
                                <li>• Gjenvinning etter balltap (ev. innen 6–8 sek): koble til struktur/balanse.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Vending med hensikt: trekk over → slå motsatt → angrip. Hvis null rom: vend igjen.</li>
                                <li>• Velg kamp-profil: Bayern (sidekorridor → innlegg/cut-back) eller Barca (mellomrom → gjennombrudd).</li>
                                <li>• Trigger pådrag: når 1F ikke får trykk – ballfører må avansere og binde 2F.</li>
                                <li>• Mellomrom: rettvendt = spill fram (ikke bare sikkert).</li>
                                <li>• Struktur/restforsvar: nok sikring til å kunne gjenvinne etter balltap.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklar løsningsprofil: Bayern (vend → 1v1/2v1 side → innlegg/cut-back) eller Barca (side lokker → rettvendt i mellomrom → gjennombrudd).</li>
                                <li>• Triggerkort: vending når blokka er overflyttet; pådrag når 1F ikke får trykk.</li>
                                <li>• Økt 1: Vending med hensikt (UEFA-A18-01).</li>
                                <li>• Økt 2: Pådrag for å åpne mellomrom (UEFA-A18-02).</li>
                                <li>• Økt 3: Lav blokk-lås opp (UEFA-A18-03).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Trekk dem over – slå motsatt – angrip.»</li>
                                <li>• «Bind 2. ledd med pådrag – slipp i rett øyeblikk.»</li>
                                <li>• «Rettvendt i mellomrom: spill fram – ikke bare sikkert.»</li>
                                <li>• «Mister vi ball: vinn den tilbake – hvis ikke, steng sentrum først.»</li>
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
                              Angrep mot etablert/delvis etablert (KFUM/VIF) – kjernegrep
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-blue-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Gjennombruddsdyktig, ikke gjennombruddshissig: lov å spille på tvers/bakover for å vente på «grønt lys».</li>
                                <li>• VIF-definisjon: gjenvinner dere innen 5 sek etter balltap, er dere fortsatt i etablert angrep.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Bruk vending som låse-opp: flytt blokka til den gjør feil – så går dere gjennom.</li>
                                <li>• KFUM-mønster: mange mål kommer etter 3–5 trekk i fasen.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Tålmodighet</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vent – flytt dem – så stikk. Avbryt når motstander er i balanse og bygg nytt angrep.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Vending</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vend hvis dere ikke har overtall. Bruk keeper/anker som spillpunkt for å «starte på nytt».</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gjenvinning</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                5 sek: gjenvinn eller fall av. Målet er nytt etablert angrep uten at dere mister struktur.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• VIF (2010): 47% av målene fra etablert/delvis etablert, 28% overgang, 25% dødball.</li>
                                <li>• VM-trend (FIFA i oppgaven): 42,8% etablerte angrep, 27,6% overganger, 29,6% dødball.</li>
                                <li>• KFUM: flest mål etter 3–5 trekk (0:5, 1:8, 2:5, 3:11, 4:13, 5:9, 6+:7).</li>
                                <li>• Kamp: tell gjenvinning ≤5 sek (og om det blir nytt etablert angrep).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer «grønt lys» for gjennombrudd (ubalanse, rettvendt mottaker, timet løp).</li>
                                <li>• 5 faste valg for ballførende stopper (valgkort i MatchPrep).</li>
                                <li>• Anker = sikkerhet + sidebytte (spillpunkt når dere må starte på nytt).</li>
                                <li>• Vending som verktøy før gjennombrudd, ikke som nødløsning.</li>
                                <li>• 5 sek gjenvinningsregel: vinn ballen tilbake eller fall av og steng sentralt.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: KFUM nærrom-possession (UEFA-A19-01) – tåle press + valg i små rom.</li>
                                <li>• Økt 2: Spill mot delvis etablert (UEFA-A19-02) – «grønt lys» + 5 sek gjenvinning.</li>
                                <li>• Kamp: logg (a) 0–1 / 2–3 / 4+ trekk før sjanse, (b) gjenvinning ≤5 sek, (c) hva som ga «grønt lys».</li>
                                <li>• Etter kamp: evaluer kvaliteten på avbrudd/vendinger og hvor ofte dere tvinger gjennom.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Vent – flytt dem – så stikk.»</li>
                                <li>• «Vend hvis vi ikke har overtall.»</li>
                                <li>• «5 sek! (gjenvinn eller fall av)»</li>
                                <li>• «Anker = sikkerhet + sidebytte.»</li>
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
                              Touch & scoring – Strømsgodset 2010
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-indigo-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Mål (n=35): 1 touch 57%, 2 touch 14%, 3 touch 9%, 4 touch 6%, 5+ 14%.</li>
                                <li>• Sjanser (n=96): 1 touch 56%, 2 touch 25%, 3 touch 8%, 4 touch 4%, 5+ 7%.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Konklusjon: jo nærmere mål, jo færre touch (særlig 1-touch i boks).</li>
                                <li>• Ikke touch-jakt: «riktig touch + timing» skaper uttelling.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Avslutter</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Bygg 1-touch som standard i boks (innlegg/cutback/returer) – med krav om kvalitet.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Målgiver</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                1–2 touch er normalt (28/28). Vinn tid med timing og relasjon, ikke bare færre touch.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Quick restart</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Hurtig frispark/innkast kan gi sjanser før de organiserer seg. Avklar 2–3 triggere.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Andel mål på 1 touch: ≥57% (benchmark).</li>
                                <li>• Andel sjanser på 2 touch: ned mot &lt;25% (reduser «lekkasje»).</li>
                                <li>• Målgivende pasning 1–2 touch: høy andel (28/28).</li>
                                <li>• Quick restart-sjanser (innkast/frispark): egen telling pr kamp.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer «1-touch-bilder» dere skal fram til (cutback/innlegg/retur/stikk).</li>
                                <li>• Avtal boksroller: 1. stolpe / bakre / D-retur / sikring.</li>
                                <li>• Målgiver: 1–2 touch med timing (slipp den nå!).</li>
                                <li>• Reduser 2-touch-sjanser der 1-touch er mulig.</li>
                                <li>• Quick restart-pakke: 2–3 triggere (hurtig før de er satt).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: Cutback-bank (UEFA-A20-01) – 1-touch i boks.</li>
                                <li>• Økt 2: Sistepasning i lommen (UEFA-A20-02) – maks 2 touch på sistepas.</li>
                                <li>• Økt 3: Quick restart-spill (UEFA-A20-03) – 5 sek start, avslutning innen 10 sek.</li>
                                <li>• Kamp: tell 1-touch-mål, 2-touch-sjanser og quick restart-sjanser.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Se mål før mottak – 1 touch!»</li>
                                <li>• «Timing – slipp den nå!»</li>
                                <li>• «Skap 1-touch-bildet»</li>
                                <li>• «Kjør raskt!»</li>
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
                              A21 – notorisk målscorer (Totto Dahlum)
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-rose-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Kjerneidé: «indre stemme» bygger kvalitet over tid – ikke bare medfødt avslutning.</li>
                                <li>• 10/10-standard: bestått serier før du avslutter.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Tren kamp-likt mentalt: konkurranse/konsekvens og tidspress.</li>
                                <li>• System slår humør: små rutiner hver dag + egenansvar.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Perfeksjonisme</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Kvalitet i repetisjon: «bestått» før du går videre (10/10-standard).</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Konkurranse</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Gi trening mening: press/konsekvens så avslutning blir mentalt kampnær.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Struktur</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vaner hver dag: små faste rutiner som alltid gjøres – også alene.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Bestått-serier: 10/10 i valgt sone (logges).</li>
                                <li>• Under press: poeng for å holde teknikk/ro (konsekvensbolk).</li>
                                <li>• Vaner: egentreninger med sluttprodukt (avslutning) pr uke.</li>
                                <li>• Vaner: konkurransebolker (press/konsekvens) pr uke.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Bygg 10/10-standard (bestått, ikke bare gjennomført).</li>
                                <li>• Tren med mening: konkurranse/press/konsekvens.</li>
                                <li>• System slår humør: faste rutiner som alltid gjøres.</li>
                                <li>• Egenansvar: kvalitet kan bygges uten at laget er der.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: Garasje/vegg – 10 av 10 (UEFA-A21-01).</li>
                                <li>• Økt 2: Avslutning med konsekvens (UEFA-A21-02).</li>
                                <li>• Økt 3: Selvstendig kvalitet (UEFA-A21-03) – 3 x 4 min.</li>
                                <li>• Kamp: 2–3 visualiseringer + kort serie som må bestås.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «10/10 – ikke 8/10.»</li>
                                <li>• «Kvalitet i rep!»</li>
                                <li>• «Gjør det kamp-likt – spill om noe.»</li>
                                <li>• «Du er ikke avhengig av andre – ta økta.»</li>
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
                              Sidebacken høyt i banen – Dag Riisnæs (A22)
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-blue-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• CL 2005/06: 285 mål totalt; 105 (37%) mot etablert/delvis etablert.</li>
                                <li>• 46 av 105 (44%) kom etter backinvolvering høyt i banen.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• 46 av 285 = 16,1% av alle mål kom via «back høyt» i disse fasene.</li>
                                <li>• Milan-case: 40 av 58 etableringer i siste tredjedel (69%) hadde back høyt.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gratisrom</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Vinn tid med pasningsspill → vend raskt → finn rommet (ofte motsatt side).</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Kant inn – back ut</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Frigjør korridor for overlap/underlap/cutback uten at formasjon må være «diamant».</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Balanse</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Restforsvar først: én går – én sikrer når kontringstrussel er høy.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Referanse (toppnivå): 37% (105/285) mål mot etablert/delvis etablert.</li>
                                <li>• Av disse: 44% (46/105) med back høyt involvert.</li>
                                <li>• Andel av alle mål via back høyt: 16,1% (46/285).</li>
                                <li>• Milan-case: 69% (40/58) etableringer i siste tredjedel med back høyt.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Trigger: når fremste pressledd er borte – se etter back på svak side.</li>
                                <li>• Rask vending når motstander er smal → back får rom på motsatt.</li>
                                <li>• Tren «back høyt»-bilder også etter ballerobring rundt midten.</li>
                                <li>• Coach på valg mer enn utførelse: «hvor er rommet nå?»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Vend! Back er fri!»</li>
                                <li>• «Kant inn – back ut!»</li>
                                <li>• «Balanse før du går!»</li>
                                <li>• «Valg før utførelse – hvor er rommet nå?»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A22-sidebacken-hoyt-i-banen-analyse-v2.md</code>. Oppgave{" "}
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
                              Etablert forsvar i 1-4-2-3-1 (Chelsea 2015/16)
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-indigo-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Kjerneidé: posisjonell balanse → nekte gjennombrudd og styre hvor de får spille.</li>
                                <li>• Logikk: <strong>steng sentralt → led utover → press hardt når ballen er bredt</strong>.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Vær forberedt på <strong>innlegg</strong> og <strong>bakrom</strong> i lavere perioder.</li>
                                <li>• Felles triggerspråk gjør at laget kan gå samlet fra lavt → høyere press.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Grunnsystem</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                1-4-2-3-1 som blir 1-4-3-3 i høyt press og 1-4-4-1-1 i lavt press.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Hovedprinsipp</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Ikke gjennom oss → ikke bak oss. Korte avstander, og led utover for å beskytte midten.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Pressøyeblikk</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                «Skru på» ved <strong>ball i luft</strong>, <strong>feilvendt</strong> eller <strong>dårlig touch</strong> – alle opp samtidig.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Presshøyde – høyt press</p>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Mer mannsorientert, men med «sone-innrømmelse» sentralt.</li>
                                <li>• Stoppere prioriterer bakrom + balanse (ikke følge ukritisk).</li>
                                <li>• Målbilde: led til <strong>motstanders back</strong> og vinn ballen der.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Presshøyde – lavt press</p>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Sone som utgangspunkt: ta ut «farligst i sone».</li>
                                <li>• Korte avstander, komprimering og sikring på innsiden.</li>
                                <li>• Vær forberedt på <strong>innlegg</strong> og <strong>bakromsbolder</strong>.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Lavt press – 3’er-blokk på bred ball</h4>
                            <div className="mt-2 grid gap-3 md:grid-cols-2">
                              <ul className="space-y-1 text-sm text-zinc-700">
                                <li>• Bred 3’er: <strong>back + kant + sentral midt</strong>.</li>
                                <li>• Regel: <strong>én presser</strong>, <strong>to sikrer</strong> (hver side).</li>
                                <li>• Bakrom: les kropp/blikk + løp, avklar tidlig «presser/sikrer».</li>
                              </ul>
                              <ul className="space-y-1 text-sm text-zinc-700">
                                <li>• Boks-3’er: <strong>2 stoppere + motsatt back</strong> blir hjemme.</li>
                                <li>• 6/8 forsvarer rundt <strong>straffemerket</strong>, motsatt kant kommer inn.</li>
                                <li>• Kritisk: boks-3’eren går aldri ut av posisjon.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Sentrale gjennombrudd imot (mottak/pasning i «10-rommet»).</li>
                                <li>• Ballvinning ved back etter leding til bred sone.</li>
                                <li>• Innlegg stoppet før innleggsfot (dødlinje).</li>
                                <li>• Vridninger imot etter bred ball (ut av «fella»).</li>
                                <li>• Reaksjon på pressøyeblikk (samlet push på 3 triggere).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Kampplan (MatchPrep)</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Velg presshøyde på forhånd, men bruk felles pressøyeblikk uansett.</li>
                                <li>• Avklar sentrallinje-regler i høyt press (bakrom/balanse først).</li>
                                <li>• Avtal boksroller på innlegg (boks-3’er blir + straffemerke-sone).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Ikke gjennom oss!» – vær smal, korte avstander.</li>
                                <li>• «Led utover» – ikke åpne midten.</li>
                                <li>• «Pressøyeblikk!» (luft/feilvendt/dårlig touch) – alle opp.</li>
                                <li>• «Bred 3’er:» én presser, to sikrer.</li>
                                <li>• «Boks-3’er blir!» – ikke dra dere ut.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A24-etablert-forsvar-4231-analyse-v2.md</code>. Oppgave{" "}
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
                              A25 – FFK forsvar (2012) – innslupne mål
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-rose-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Kjernen: mye baklengs i <strong>etablert</strong> + <strong>dødball</strong> – dybde/avstander og «ramma vs press».</li>
                                <li>• Backledd faller ofte av for tidlig og mangler felles <strong>push-up</strong> etter klarering.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Nøkkeltall: <strong>59 mål / 30 kamper</strong> (= 1,97 pr kamp).</li>
                                <li>• <strong>25,42 %</strong> av baklengsmålene kommer <strong>siste 15 min</strong> → closing-plan.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Hovedregel</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Felles valg: <strong>«Ramma»</strong> vs <strong>«Press»</strong>. Når vi spriker her, sprekker laget opp.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Avstander</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Dybde + kompakt lag i og mellom ledd. Reduser sikringsavstander og nekt mellomrom.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Backledd</p>
                              <p className="mt-2 text-sm text-zinc-900">
                                Ikke falle av for tidlig – og <strong>push-up</strong> i samklang etter klarering/støtte.</p>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Presshøyde-modus</h4>
                            <div className="mt-2 grid gap-3 md:grid-cols-3">
                              <div>
                                <p className="text-xs font-medium text-zinc-600 mb-1">Kontrollert</p>
                                <p className="text-sm text-zinc-700">Ligg i ramma, vent på trigger, press med sikring (ikke halv-press).</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-zinc-600 mb-1">Aggressivt</p>
                                <p className="text-sm text-zinc-700">Kort, tydelig periode når 1F + sikring er på plass (vinne ball uten å bli spilt av).</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-zinc-600 mb-1">Lavt (closing)</p>
                                <p className="text-sm text-zinc-700">Siste 15: kompakt, færre gambles, prioriter klarering/andreball og nekt rom i/foran 16.</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">KPI-er</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Andel baklengsmål siste 15 min: <strong>&lt;18 %</strong> (ned fra 25,42 %).</li>
                                <li>• Mål imot i etablert forsvar: <strong>&lt;38 %</strong> (ned fra 44,07 %).</li>
                                <li>• Mål imot på dødball: <strong>&lt;30 %</strong> (ned fra 37,29 %).</li>
                                <li>• Balltap som gir baklengs – sentralt: <strong>&lt;45 %</strong> (ned fra 56,76 %).</li>
                                <li>• Push-up etter klarering: <strong>alle ledd opp innen 3–4 sek</strong>.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Kampplan (MatchPrep)</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Avklar «ramma» og 2–3 triggere for «nå går vi».</li>
                                <li>• Definer 1F-prinsipp: hvem bremser/leder, hvem sikrer bak/inni.</li>
                                <li>• Plan mot innlegg/cutback: steng rommet bak/mellom back–stopper, CM i sikring.</li>
                                <li>• «Siste 15»-protokoll: risikokontroll + klarering/andreball + friske bein i nøkkelroller.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Øvelser (MatchPrep)</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• UEFA-A25-01: «Ramma vs press» – 7v7 + 2 jokere.</li>
                                <li>• UEFA-A25-02: Back–stopper–CM triangel-sikring mot innlegg/cutback.</li>
                                <li>• UEFA-A25-03: «Push-up etter klarering» – 10 min closing-spill.</li>
                                <li>• UEFA-A25-04: Dødballpakke (innkast + straffe/corner-fokus).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «<strong>Ramma!</strong>» (samle – komprimer – nekt mellomrom)</li>
                                <li>• «<strong>Bremse–lede!</strong>» (1F skaper dybde, ikke stuper)</li>
                                <li>• «<strong>Backlinje: hold igjen – ikke falle av!</strong>»</li>
                                <li>• «<strong>Opp sammen!</strong>» (push-up etter klarering – alle ledd)</li>
                                <li>• «<strong>Steng bak–mellom!</strong>» (back/stopper/CM triangel-sikring)</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A25-ffk-forsvar-2012-analyse-v2.md</code>. Oppgave{" "}
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
                                <li>• Avklaringsrate ≥60 % (nå 53,6 %).</li>
                                <li>• Sjanser pr 100 innlegg ≤6 (nå 7,2).</li>
                                <li>• Posisjonell ubalanse ≤40 % (nå 59,2).</li>
                                <li>• Avslutning bakre stolpe ≤25 % (nå 46 %).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Fokusområder</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Definer &rsquo;farlig vs ufarlig&rsquo; sone – stopp kryss i farlig.</li>
                                <li>• Telle opp i boks: 1/midt/bak + returrom.</li>
                                <li>• Bakre stolpe + returrom: ikke gi fri avslutning.</li>
                                <li>• Sluttfasetiltak – bytter, ro, ballbesittelse.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Matchplan</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Økt 1: UEFA-A26-02 Boksroller (1/midt/bak + returrom).</li>
                                <li>• Økt 2: UEFA-A26-01 Farlig vs ufarlig sone (stopp kryss).</li>
                                <li>• Økt 3: UEFA-A26-03 Sluttfase (push-up + andreball).</li>
                                <li>• Kamp: loggfør innlegg og sjanser per omgang.</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Farlig sone først!»</li>
                                <li>• «Telle opp!»</li>
                                <li>• «Bakre stolpe!»</li>
                                <li>• «Returrom!»</li>
                                <li>• «Opp sammen!»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A26-forsvar-mot-innlegg-analyse-v2.md</code>. Oppgave{" "}
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

                      {valgtAnalyse.kode === "G01" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">
                              G01 – Keeper (spillbasert keeperutvikling)
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-blue-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Rød tråd: <strong>kamplik, spillbasert</strong> keepertrening som tvinger valg og samhandling.</li>
                                <li>• God øvelse: keeper må <strong>velge før han handler</strong> (realistisk tid/rom/motstand).</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Roller i situasjon: angrepsspiller / ballerobrer / redningsmann.</li>
                                <li>• Fokus: avverge før skudd (innlegg/gjennomspill) + 1v1 (romtaking/blokkering).</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Kampbilder</p>
                              <p className="mt-2 text-sm text-zinc-900">Tell repetisjoner i 1v1, innlegg, og «før-skudd-avverging».</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">MatchPrep</p>
                              <p className="mt-2 text-sm text-zinc-900">Legg keeperfokus inn i spilløkter via format som fremtvinger situasjonene.</p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Spillformer</p>
                              <p className="mt-2 text-sm text-zinc-900">7v7 felles midtbane, 3v3 i 16, og 6v6 med sidekorridor-innlegg.</p>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Øvelser (MatchPrep)</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• UEFA-G01-01: 7v7 med felles midtbane (gjennomspill/skudd).</li>
                                <li>• UEFA-G01-02: 3v3 inne i 16m (næravslutning + 1v1).</li>
                                <li>• UEFA-G01-03: 6v6 med frisoner i sidekorridor (innlegg/feltarbeid).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Velg før du går!»</li>
                                <li>• «Rom!»</li>
                                <li>• «Set!»</li>
                                <li>• «Bak ball! Lås!»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/G01-keeper-spillbasert-utvikling-analyse-v2.md</code>.
                            </p>
                          </div>
                        </div>
                      )}

                      {valgtAnalyse.kode === "G02" && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-slate-50 to-blue-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">
                              G02 – Keeper (kampdimensjon → treningsfordeling)
                            </p>
                            <div className="mt-2 grid gap-3 text-sm text-cyan-900 md:grid-cols-2">
                              <ul className="space-y-1">
                                <li>• Poeng: tren på det keeper faktisk møter i kamp (30 kamper: 10+10+10).</li>
                                <li>• Fot dominerer igangsetting: ca. <strong>80–85%</strong>.</li>
                              </ul>
                              <ul className="space-y-1">
                                <li>• Prioritering i trening: <strong>31%</strong> defensivt, <strong>28%</strong> igangsetting, <strong>42%</strong> defensive dødballer.</li>
                                <li>• Tilbakespill: bli spillbar, ha flere valg, og tren med tid/press.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Øvelsesbank</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• UEFA-G02-01: Spill med skuddsoner (skudd/retur/samhandling).</li>
                                <li>• UEFA-G02-02: Vende på keeperne (inn på keeper og ut igjen før angrep).</li>
                                <li>• UEFA-G02-03: Server til keeper hver sekvens (igangsetting + omstilling).</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching cues</h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• «Scan – velg tempo!»</li>
                                <li>• «Vær spillbar!»</li>
                                <li>• «Flere valg!»</li>
                                <li>• «Tid/press-regel!»</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/G02-keeper-hva-moter-i-kamp-analyse-v2.md</code>.
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
                              <li>• Fase 1: mikrojusteringer (midt i rommet) slår doble bevegelser (35,4 % vs 1,3 %).</li>
                              <li>• Fase 2: løs under ekstremt press (0–3 m i 84,5 %) på kort tid (0–2 sek = 59,8 %).</li>
                              <li>• Fase 3: forløsning via presisjon (innside) + romforståelse (bakrom/innlegg).</li>
                            </ul>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-200 p-3">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Hovedprinsipper
                              </h4>
                              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                                <li>• Mikroposisjonering (midt i rommet) slår doble bevegelser.</li>
                                <li>• Rett/sidevendt mottak for å spille fremover raskt.</li>
                                <li>• Løs under ekstremt tid/press (0–2 sek, 0–3 m).</li>
                                <li>• Forløsning = presisjon + romforståelse (bakrom/innlegg).</li>
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
                                <li>• Touch (fase 2): 1 touch = 27,8 % (3 touch = 24,7 %).</li>
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
                                <li>• «Se før du får den» – ha scannet ferdig.</li>
                                <li>• «Små steg – finn midten av rommet».</li>
                                <li>• «Vekt den – på sølvfat» (fase 3).</li>
                                <li>• «Kamufler før du stikker» – ikke telegraphér.</li>
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200 p-3 text-sm text-zinc-600">
                            <p className="font-semibold text-zinc-900 mb-1">Mer i analysen</p>
                            <p className="text-xs text-zinc-500">
                              Fullversjon: <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded">docs/uefa/A08-playmaker-analyse-v2.md</code>. Oppgave:{" "}
                              <a
                                href="https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/idrett---676258---uefa-a-2014-oppgave-gard-holme.pdf"
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

          {/* Placeholder når ingen analyse er valgt */}
          {!valgtAnalyse && (
            <div className="text-center py-8 text-zinc-400">
              <p className="text-sm">Velg et tema over for å se analyse</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
