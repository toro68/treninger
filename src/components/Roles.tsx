"use client";

import { useState } from "react";

type TaskGroup = {
  phase: string;
  items: string[];
};

type Position = {
  name: string;
  tasks: string[];
  detailed?: TaskGroup[];
};

const positions: Position[] = [
  {
    name: "Keeper",
    tasks: [
      "Angrep: Vær aktiv støttespiller (vendingspunkt), vri spillet, vurder kort/langt utspill",
      "Forsvar: Vær \"sweeper\" - posisjon deg langt ute for å klarere gjennombruddspasninger i bakrom",
      "Kommunikasjon: Bruk overblikket til å veilede forsvar om press og markering i boksen",
      "Dødballer: Organiser mur ved frispark, organisér forsvar ved defensive cornere (se Corner-organisering)",
    ],
    detailed: [
      {
        phase: "A1 - Oppspill (tiim.no)",
        items: [
          "Ta dybde i banen for bedre oversikt",
          "Utnytt pressfri sone til å finne beste løsning",
          "Ball fra høyre = se etter rom til venstre",
          "Spill bak første pressledd når mulig",
        ],
      },
      {
        phase: "F3 - Hindre mål (tiim.no)",
        items: [
          "Styr mur ved frispark",
          "Organiser soneforsvar ved corner",
          "Plasser folk på stengene",
          "Kommuniser tydelig når forsvar er klart",
          "Box-spill: Avgjør når du skal gå ut på innlegg",
        ],
      },
    ],
  },
  {
    name: "Back",
    tasks: [
      "Sideforskyving: Ball på motsatt side = trekk inn mot midten (ca. stolpen) for å dekke rom og sikre midtstopperne",
      "1F (Førsteforsvarer): Led motstanderen utover mot linja når du er nærmest ballfører på kant",
      "Angrep: Overlapp eller skap overtall i siderommet, gi dybde og bredde",
      "Sikre innleggssiden ved innlegg fra motsatt kant",
      "Kommuniser med midtstopper om hvem tar hvem",
    ],
    detailed: [
      {
        phase: "F2 - Forsinke/organisere (tiim.no)",
        items: [
          "IKKE ta 1F-rollen når ball er foran bakre ledd - skaper 2:1",
          "Ligg smalt - hindre pasning mellom back og stopper",
          "Styr kant: \"Jeg går\" eller \"Du presser, jeg blir\"",
          "Snappe upresise pasninger - \"hunting high and low\"",
          "Ved cross fra motsatt side: Bryt ballbanen eller gå i press",
        ],
      },
      {
        phase: "F3 - 1:1 situasjoner (tiim.no)",
        items: [
          "Driblekant: Sidestill deg, vent på utfall, se på ball - ikke finter",
          "Rask kant: Inn i kropp FØR gass, brems med kroppen",
          "Høyrebeint kant: Steng yttersida. Venstrebeint: Steng innersia",
          "Ved 16-meter: Led ALLTID utover",
          "Vegg-spill: Følg kanten, IKKE ball - indreløper tar veggen",
        ],
      },
      {
        phase: "Innlegg/avslutning (tiim.no)",
        items: [
          "Hindre innlegg - akselerere og retardere kjapt",
          "ALDRI vend \"ræva til\" ved innlegg",
          "Motsatt back: Ansvar for blindsideløp bak",
          "Blokkere skudd og cutback - mot og oppofrende",
        ],
      },
      {
        phase: "Bakre ledd som enhet (tiim.no)",
        items: [
          "Bakover når ballfører lader go'foten",
          "Framover ved klarering/gjennombruddspasninger",
          "Sidelengs når motstander vrir spillet",
          "Konsentrere når ball er sentralt",
        ],
      },
    ],
  },
  {
    name: "Midtstopper",
    tasks: [
      "Ledelse: Organiser linje (opp/ned) og sideforskyving",
      "Forsvar: Kontroller bakrommet, fall av når motstander truer med å slå bak (\"lese fot\")",
      "Pumping: Rop \"UT!\" og flytt linja raskt opp når motstander spiller støttepasning eller mister kontroll. Gjør laget kompakt, reduser rom",
      "Dødballer: Organiser +1 i overtall ved offensive cornere og frispark nær motstanders mål",
      "Angrep: Vær trygg med ball, før over ledd for å skape overtall på midtbanen",
      "Vinn luftdueller, vær sist inne på innlegg",
    ],
    detailed: [
      {
        phase: "F1 - Vinne ball høyt (tiim.no)",
        items: [
          "Press motstanders back når ball vris til din side",
          "Ta motstanders kant ved høyt press",
          "Sideforskyv raskt ved vendinger",
        ],
      },
      {
        phase: "F2 - Forsinke/lede (tiim.no)",
        items: [
          "Hold ca 10m til nærmeste medspiller",
          "Konsentrer når ball er sentralt",
          "Sikre medspiller som går i press",
          "Kommuniser \"fall\" eller \"hold\"",
        ],
      },
      {
        phase: "F3 - Hindre mål (tiim.no)",
        items: [
          "Vinn dueller i egen boks (hode/kropp)",
          "Blokkere skudd - kast deg i banen",
          "Dekk rom foran mål ved innlegg",
          "Styr bakre ledd som en enhet",
          "Håndter to spisser uten å kalle ned midtbane (4 mot 2)",
        ],
      },
    ],
  },
  {
    name: "Sentral midtbane (6-er)",
    tasks: [
      "Angrep: Hovmesterblikk - orienter før motta. Kan du vende opp, eller spille støtte? Snu spillet til ledig rom. Stort bakrom = angrip det",
      "Forsvar: Screen rommet foran midtstopperne, steng pasningslinjer inn i mellomrom",
      "Balanse: Ligg dypere ved angrep, sikre mot kontringer, vinn klareringer (gjenvinning)",
      "Essens: Lagets hjerte - alltid spillbar i angrep, skjold foran forsvar",
    ],
    detailed: [
      {
        phase: "F2 - Forsinke/sikre (tiim.no)",
        items: [
          "Kom fra \"feil side til rett side\" ved vendinger",
          "Opphold ballfører når back har spiller på yttersia",
          "Sikre back som går i press",
          "Dekk rom mellom linjene",
        ],
      },
      {
        phase: "F3 - Foran egen boks (tiim.no)",
        items: [
          "Ta veggen ved vegg-spill mot back",
          "Bli i sonen - ikke følg spillere ut på kant",
          "Blokkere skuddforsøk fra distanse",
        ],
      },
    ],
  },
  {
    name: "Indreløper (8-er)",
    tasks: [
      "Angrep: Søk mellomrommet (bak motstanders midtbane). Dype løp inn i boksen når vi kommer rundt på kant",
      "Sideforskyving: Flytt deg sideveis med ballen. Hold 8-10m avstand til 6-er. Ball på motsatt side = ligg sentralt foran eget mål, ikke ute på siden",
      "Sikring: Når ving/back på din side presser, fall ned og inn for å sikre dem",
      "Relasjon: Lag trekanter med back og ving",
    ],
  },
  {
    name: "Ving (Kant)",
    tasks: [
      "Angrep: Tru bakrommet! Start bredt for å skape rom, skjær inn eller gå rundt",
      "Forsvar (din side): Jobb hjem, legg deg på linje med midtbanen (4-5-1). Ligg foran egen back, hindre motstanders back, skap 2v1 fordel",
      "Forsvar (motsatt side): Trekk inn mot midten (midtbanesirkelen), ikke stå ute ved sidelinja. Vær klar til å snappe dårlig pasning eller starte kontring",
      "Gjenvinning: Ved balltap, vinn ballen umiddelbart tilbake (høyt press)",
    ],
    detailed: [
      {
        phase: "Bakromsløp A2-A3 (tiim.no)",
        items: [
          "Stå bredt i utgangsposisjon - trekk med deg back",
          "Les rom mellom motstanders back og stopper",
          "Stort rom: Skjær inn diagonalt i bakrom",
          "Lite rom: Hold bredden, gjør deg spillbar ytterst",
          "Time løpet - start FØR pasningen kommer",
          "Ta med ball fremover med første touch",
        ],
      },
      {
        phase: "Som ballfører - siste 1/3 (tiim.no)",
        items: [
          "Tru forsvareren i BEGGE retninger",
          "Finte troverdig motsatt vei før retningsbytte",
          "Se på forsvarerens tyngdepunkt - ikke ballen",
          "Ha høyt tempo i gjennomføring av finte",
        ],
      },
      {
        phase: "Avslutning fra motsatt side (tiim.no)",
        items: [
          "Angrip boks når ball er på motsatt side",
          "Start løpet FØR innlegget kommer",
          "Kom inn med innsiden av foten klar",
          "Avslutt raskt - sikt på hjørnene",
        ],
      },
    ],
  },
  {
    name: "Spiss",
    tasks: [
      "Forsvar (1F): Du er vår første forsvarer. Led motstanders midtstopper til én side for å hindre spill-vri",
      "Angrep: Tru bakrommet for å strekke motstanderens forsvar - skaper rom for indreløperne i mellomrommet",
      "I boksen: Vær tålmodig, ikke løp for tidlig. Kom deg fri i blindside rett før innlegget slås",
      "Hold opp ball og spill medspillere inn i spill",
    ],
    detailed: [
      {
        phase: "F1 - Lede press (tiim.no)",
        items: [
          "Start presset - trigger for laget",
          "Steng pasningslinje til midtstopper",
          "Led motstander til ønsket side",
          "Press keeper ved tilbakespill",
        ],
      },
      {
        phase: "A2 - Bevegelse (tiim.no)",
        items: [
          "Timing på bakromsløp",
          "Dropp ned for å tilby støtte",
          "Trekk med deg stopper - skap rom for andre",
          "Peil deg inn på blindsone til stopper",
        ],
      },
      {
        phase: "A3 - Avslutning (tiim.no)",
        items: [
          "Vær først på innlegg - angrip ballen",
          "Posisjoner deg i scoringssoner",
          "Avslutt raskt - før keeper setter seg",
          "Følg opp returer",
        ],
      },
    ],
  },
];

export const Roles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetailed, setShowDetailed] = useState(true);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-violet-200/70 bg-gradient-to-r from-violet-50 to-indigo-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Roller (4-3-3)</h2>
          <p className="text-xs text-zinc-500">Oppgaver per posisjon</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Toggle for detailed view */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span className="text-xs text-zinc-600">Vis detaljerte oppgaver fra tiim.no</span>
            <button
              onClick={() => setShowDetailed(!showDetailed)}
              className={`px-3 py-1 text-xs rounded-full transition ${
                showDetailed
                  ? "bg-green-600 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {showDetailed ? "På" : "Av"}
            </button>
          </div>

          {positions.map((position) => (
            <div key={position.name}>
              <h3 className="text-sm font-semibold text-zinc-900 mb-2">
                {position.name}
              </h3>
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
                <ul className="text-xs text-zinc-700 space-y-1">
                  {position.tasks.map((task, index) => (
                    <li key={index}>• {task}</li>
                  ))}
                </ul>

                {/* Detailed tasks from tiim.no */}
                {showDetailed && position.detailed && (
                  <div className="mt-3 pt-3 border-t border-zinc-200 space-y-3">
                    {position.detailed.map((group, groupIndex) => (
                      <div key={groupIndex}>
                        <h4 className="text-xs font-semibold text-green-700 mb-1">
                          {group.phase}
                        </h4>
                        <ul className="text-xs text-zinc-600 space-y-0.5 pl-2">
                          {group.items.map((item, itemIndex) => (
                            <li key={itemIndex}>◦ {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Source attribution */}
          {showDetailed && (
            <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100">
              Detaljerte oppgaver fra{" "}
              <a
                href="https://tiim.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                tiim.no
              </a>{" "}
              (NFF)
            </p>
          )}
        </div>
      )}
    </section>
  );
};
