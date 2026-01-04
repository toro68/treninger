"use client";

import { useState } from "react";

type LearningPhase = {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
  learningMoments: string[];
  practiceFormats: string[];
  keyQuestions: string[];
  sourceLabel: string;
  sourceUrl?: string;
};

const phases: LearningPhase[] = [
  {
    id: "r-1",
    name: "Generell spillforståelse",
    description: "Alle spillere må kunne både angrep OG forsvar",
    prerequisites: [],
    learningMoments: [
      "Det finnes ikke 'forsvarsspillere' og 'angrepsspillere' - alle må kunne begge deler",
      "Forståelse av lagfunksjoner: hva gjør VI i ulike situasjoner?",
      "Grunnleggende: hva betyr det å spille sammen?",
      "Les spillet: hvor er ballen, hvor er medspillere, hvor er motstandere?",
    ],
    practiceFormats: [
      "Smålagsspill der alle roterer posisjoner",
      "Spill uten faste posisjoner (kaos-spill)",
      "Diskusjonsøkter: Hva skjedde? Hva kunne vi gjort?",
    ],
    keyQuestions: ["Hva er min viktigste oppgave akkurat NÅ?", "Hvem trenger hjelp?"],
    sourceLabel: "tiim.no/landslagsskolens-spillmodell",
    sourceUrl: "https://tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "r-2",
    name: "Posisjonsspesifikk introduksjon",
    description: "3-5 hovedoppgaver per posisjon",
    prerequisites: ["Generell spillforståelse etablert"],
    learningMoments: [
      "Hver posisjon har 3-5 HOVEDOPPGAVER - ikke alt på en gang",
      "Keeper: organisere, kommunisere, starte angrep",
      "Midtstopper: sikring, heading, spille fremover",
      "Back: sikring, 1v1, overlap/underlap",
      "6er: skjerme, vende spill, sikring i overganger",
      "8er: fremstøt, boks-til-boks, koble forsvar-angrep",
      "10er: mellomrom, vendepunkt, assistpoeng",
      "Spiss: holde ball, dybdeløp, avslutninger",
      "Kant: 1v1, innlegg, innoverløp",
    ],
    practiceFormats: [
      "Posisjonsspesifikke stasjoner",
      "Spill med fokus på én posisjon om gangen",
      "Video av toppspillere i samme rolle",
    ],
    keyQuestions: [
      "Hva er mine 3 viktigste oppgaver?",
      "Hva er jeg BEST på i min posisjon?",
    ],
    sourceLabel: "tiim.no/landslagsskolens-spillmodell",
    sourceUrl: "https://tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "r-3",
    name: "Fasespesifikke oppgaver",
    description: "Hva gjør JEG i hver spillfase?",
    prerequisites: ["Posisjonsspesifikk introduksjon mestret"],
    learningMoments: [
      "Koble posisjon til fase: Hva gjør en BACK i F1? I A2?",
      "F1 (etablert forsvar): Min soneplassering, pumping, pressing-trigger",
      "F2 (overgangsforsvar): Hvem tar jeg? Hvem sikrer jeg?",
      "F3 (høy gjenvinning): Min rolle i motpress",
      "A1 (bearbeiding): Hvor tilbyr jeg meg? Avstander",
      "A2 (inn i rom): Når går jeg i bakrom? Når støtter jeg?",
      "A3 (avslutning): Hvor skal jeg være ved innlegg?",
    ],
    practiceFormats: [
      "Fasespesifikke øvelser med rollefokus",
      "Video-analyse av egne kamper",
      "Spill med 'fasekort' - hva gjør du når?",
    ],
    keyQuestions: [
      "Hva gjør JEG når vi er i fase X?",
      "Hvor skal jeg være? Hva skal jeg se etter?",
    ],
    sourceLabel: "tiim.no/landslagsskolens-spillmodell",
    sourceUrl: "https://tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "r-9",
    name: "UEFA: Overgang – ansvar for restforsvar (3+2)",
    description: "Hvem sikrer når vi angriper?",
    prerequisites: ["Fasespesifikke oppgaver"],
    learningMoments: [
      "Enkel regel: restforsvar (‘def i off’) = 3 + 2",
      "Rollene fylles av de som er nærmest – ikke alltid samme to",
      "Førsteforsvarer som signalspiller: vinn når vi har balanse, sink når vi er i ubalanse",
      "Etter brudd: frem hvis mulig – ellers vekk fra press for ny rettvendt ballfører",
    ],
    practiceFormats: [
      "Angrepsspill med ‘3+2-krav’ før overbelastning/boksfyll",
      "Overgangsspill: tap ball → 2–3 nærmeste går, resten sikrer/stopper første pasning frem",
      "Kampnær: stopp- og start med frys – hvem har ansvar for bakrom/returrom?",
    ],
    keyQuestions: [
      "Har vi 3+2 igjen før vi sender flere i boks?",
      "Hvis vi mister ballen: hvem er 1F – og hvem sikrer bakrom?",
    ],
    sourceLabel: "UEFA A09 (Bjarte Lunde Aarsheim)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2014-oppgave-bjarte-lunde-aarsheim.pdf",
  },
  {
    id: "r-4",
    name: "Relasjonell samhandling",
    description: "Hvordan samhandler jeg med de rundt meg?",
    prerequisites: ["Fasespesifikke oppgaver forstått"],
    learningMoments: [
      "Trekanter: jeg og mine to nærmeste - alltid pasningsalternativ",
      "Sikringsprinsipper: hvem sikrer hvem?",
      "Avstemming: høyre-venstre, foran-bak",
      "Kommunikasjon: hva trenger de andre å vite?",
      "Back + kant + 8er = angrepsflyt på siden",
      "6er + midtstoppere = sikringstriangel",
      "Kant + spiss = sluttprodukt-kobling",
    ],
    practiceFormats: [
      "Smågruppe-spill (3v3, 4v4) med faste roller",
      "Kombinasjonsspill i trekanter",
      "Spill der poeng gis for samhandling",
    ],
    keyQuestions: [
      "Hvem er mine to nærmeste relasjoner?",
      "Hvordan kommuniserer vi?",
      "Hvem sikrer meg når jeg går?",
    ],
    sourceLabel: "tiim.no/landslagsskolens-spillmodell",
    sourceUrl: "https://tiim.no/landslagsskolens-spillmodell",
  },
  {
    id: "r-5",
    name: "UEFA: 6-er / anker (balanse + pasningskvalitet)",
    description: "Rollekrav fra kampdata: stabilitet først",
    prerequisites: ["Relasjonell samhandling forstått"],
    learningMoments: [
      "Må kunne: balanse før ballvinning (steng sentralt først)",
      "Må kunne: scanning x2 (før ballen kommer + idet ballen reiser)",
      "Må kunne: pasningssikkerhet i trange rom (førstevalg = sikre neste ledd)",
      "Må kunne: spille rettvendt neste ledd (to trekk frem når det er mulig)",
      "Coaching-cues: ‘Balanse først’ – ‘skann igjen’ – ‘spillbar uten å være dekket’",
    ],
    practiceFormats: [
      "Øvelse: 4v2/5v2 i trange rom med 6-er som vendingspunkt (bonus for linjebrytende pasning)",
      "8v8 med ‘balansekrav’: 6-er må alltid sikre sentralt ved angrep på kant",
      "Video: klipp av 6-er sin posisjonering ved balltap (restforsvar)",
    ],
    keyQuestions: [
      "Er jeg spillbar for stoppere/ankerpunkt – uten å være dekket?",
      "Hvis vi mister ballen nå: hvem stopper første pasning frem?",
    ],
    sourceLabel: "UEFA A06 (Øyvind Iversen)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oyvind-iversen.pdf",
  },
  {
    id: "r-6",
    name: "UEFA: 10-er / playmaker (skape sjanser under press)",
    description: "Rask løsning i 0–3 meter + presisjon i siste pasning",
    prerequisites: ["UEFA: 6-er / anker (balanse + pasningskvalitet)"],
    learningMoments: [
      "Må kunne: mikrojustering før mottak (skape 0,5–1 m og riktig vinkel)",
      "Må kunne: rett-/sidevendt mottak med beslutning (0–2 sek på ball)",
      "Må kunne: kamuflasje (samme kroppsstilling → ny pasning)",
      "Må kunne: siste pasning med vekt/presisjon (‘på sølvfat’)",
      "Coaching-cues: ‘Bilde før ball’ – ‘1–2 touch’ – ‘kamufler’",
    ],
    practiceFormats: [
      "Øvelse: 4v4+3 med 10-er i mellomrom: poeng for ‘assist-pass’ eller brudd til avslutning",
      "Constraints: maks 2 touch i mellomrom (men fri touch bak ball)",
      "Kampnær øvelse: 10-er får ball feilvendt → må skape rettvendt 3. mann",
    ],
    keyQuestions: [
      "Har jeg informasjon før mottak – eller må jeg først sikre og skape ny vinkel?",
      "Hvilken pasning gir størst sjanse, ikke bare størst risiko?",
    ],
    sourceLabel: "UEFA A08 (Gard Holme)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/idrett---676258---uefa-a-2014-oppgave-gard-holme.pdf",
  },
  {
    id: "r-8",
    name: "UEFA: Kant/winger (tid/rom-press + sluttprodukt)",
    description: "Avgjør på kort tid – med presisjon",
    prerequisites: ["Relasjonell samhandling forstått"],
    learningMoments: [
      "Må kunne: avgjøre under tid/press (1–4 sek, 1–3 m) med få berøringer",
      "Må kunne: slå innlegg/cut-back/45° under press (presisjon > kraft)",
      "Må kunne: løp inn i boks etter innlegg (motsatt kant på bakre/målrom)",
      "Må kunne: velge tidlig (1v1, innlegg/cut-back, eller tilbake for ny rytme)",
      "Coaching-cues: ‘Tid!’ – ‘to berøringer max’ – ‘målrom/cut-back’",
    ],
    practiceFormats: [
      "Øvelse: 1v1 på kant med krav om sluttprodukt innen 4 sek",
      "Innlegg/cut-back mot målrom med boksroller (spiss + motsatt kant)",
      "Constraints: små baner + poengsystem for riktig valg under press",
    ],
    keyQuestions: [
      "Hva er beste sluttprodukt nå – og har jeg tid til det?",
      "Hvem fyller boksen: spiss, motsatt kant, indreløper?",
    ],
    sourceLabel: "UEFA A10 (Hugo Pereira)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2015-oppgave-hugo-pereira.pdf",
  },
  {
    id: "r-7",
    name: "UEFA: Spiss (1–2 touch, 11 m-sone, returer)",
    description: "Målscorer-vaner som kan trenes",
    prerequisites: ["Fasespesifikke oppgaver"],
    learningMoments: [
      "Må kunne: 1–2 touch i boks (ta beslutning før ball)",
      "Må kunne: 5–11 m-sone (kom deg inn i 11 m før sjansen)",
      "Må kunne: blindsideløp (ligg i blindsone lenge, rykk på ball)",
      "Må kunne: returer/andreball (returrom er alltid din jobb)",
      "Coaching-cues: ‘inn i 11 m’ – ‘blindsiden’ – ‘følg skuddet’",
    ],
    practiceFormats: [
      "Øvelse: avslutning i 11 m-sone med 1-touch-krav",
      "Innlegg + 2. ball: spiss må alltid følge inn i returrom",
      "Spissduo: møte–stikk med tydelig rollefordeling",
    ],
    keyQuestions: [
      "Er jeg i ‘riktig sone’ når ballen skal inn?",
      "Hvor går returen hvis skuddet blir blokkert eller keeper gir retur?",
    ],
    sourceLabel: "UEFA A07 (Sigurd Rushfeldt)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-oppgave-sigurd-rushfeldt.pdf",
  },
  {
    id: "r-10",
    name: "UEFA: Keeper (igangsetter + sweeper + feltkontroll)",
    description: "Keeperen er en del av spillmodellen – ikke bare skuddstopper",
    prerequisites: ["Fasespesifikke oppgaver"],
    learningMoments: [
      "Må kunne: igangsette (raskt og riktig valg: kort, mellom, langt)",
      "Må kunne: sweeper (rydd bakrom – startposisjon og timing)",
      "Må kunne: feltkontroll når vi ‘tåler innlegg’ (ta eller bokse – tydelig)",
      "Må kunne: organisere i etablert forsvar (styr linje + gi tidlige signaler)",
      "Coaching-cues: ‘startposisjon’ – ‘tidlig signal’ – ‘kom og ta/ta og bli’",
    ],
    practiceFormats: [
      "Øvelse: innlegg + andreball med keeper-kommando (keeper må rope tidlig og eie valg)",
      "Spill: 6v6 + keeper, der keeper gir poeng for riktig igangsetting (skape rettvendt neste ledd)",
      "Sweeper-løype: gjennombruddspasning bak – keeper avgjør bli/kom",
    ],
    keyQuestions: [
      "Hvor er startposisjonen min nå – og hva er farligst hvis vi mister ballen?",
      "Kan jeg eie feltet (ta/bokse), eller må jeg prioritere retning/andreball?",
    ],
    sourceLabel: "UEFA A01 (Even Ødegaard)",
    sourceUrl: "https://www.fotball.no/globalassets/trener/uefa-a-oppgaver/uefa-a-2013-even-odegaard.pdf",
  },
];

export const LearnRoles = ({ defaultOpen = true }: { defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-amber-200/70 bg-gradient-to-r from-amber-50 to-yellow-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Rolleforståelse</h2>
          <p className="text-xs text-zinc-500">Fra generell forståelse til relasjonell samhandling</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {phases.map((phase, index) => {
            const isExpanded = expandedPhase === phase.id;

            return (
              <div
                key={phase.id}
                className={`rounded-lg border ${isExpanded ? "border-amber-200 bg-amber-50" : "border-zinc-100 bg-white"}`}
              >
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  className="w-full px-3 py-2 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      isExpanded ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-600"
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">{phase.name}</h3>
                      <p className="text-xs text-zinc-500">{phase.description}</p>
                    </div>
                  </div>
                  <span className="text-zinc-400">{isExpanded ? "−" : "+"}</span>
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 space-y-3">
                    {phase.prerequisites.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                          Forutsetninger
                        </h4>
                        <ul className="text-xs text-zinc-600 space-y-0.5">
                          {phase.prerequisites.map((p, i) => (
                            <li key={i}>✓ {p}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                        Læringsmomenter
                      </h4>
                      <ul className="text-xs text-zinc-700 space-y-0.5">
                        {phase.learningMoments.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                        Øvingsformer
                      </h4>
                      <ul className="text-xs text-zinc-600 space-y-0.5">
                        {phase.practiceFormats.map((f, i) => (
                          <li key={i}>→ {f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-md bg-amber-100 p-2">
                      <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                        Spør spillerne
                      </h4>
                      <ul className="text-xs text-amber-800 space-y-0.5">
                        {phase.keyQuestions.map((q, i) => (
                          <li key={i}>❓ {q}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-zinc-400">
                      Kilde:{" "}
                      {phase.sourceUrl ? (
                        <a
                          href={phase.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:underline"
                        >
                          {phase.sourceLabel}
                        </a>
                      ) : (
                        <span>{phase.sourceLabel}</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100 mt-4">
            Kilde:{" "}
            <a
              href="https://tiim.no/artikkel/landslagsskolens-spillmodell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              Landslagsskolens spillmodell
            </a>{" "}
            (NFF/tiim.no)
          </p>
        </div>
      )}
    </section>
  );
};
