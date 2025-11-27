"use client";

import { useState } from "react";

type Position = {
  name: string;
  tasks: string[];
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
  },
  {
    name: "Sentral midtbane (6-er)",
    tasks: [
      "Angrep: Hovmesterblikk - orienter før motta. Kan du vende opp, eller spille støtte? Snu spillet til ledig rom. Stort bakrom = angrip det",
      "Forsvar: Screen rommet foran midtstopperne, steng pasningslinjer inn i mellomrom",
      "Balanse: Ligg dypere ved angrep, sikre mot kontringer, vinn klareringer (gjenvinning)",
      "Essens: Lagets hjerte - alltid spillbar i angrep, skjold foran forsvar",
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
  },
  {
    name: "Spiss",
    tasks: [
      "Forsvar (1F): Du er vår første forsvarer. Led motstanders midtstopper til én side for å hindre spill-vri",
      "Angrep: Tru bakrommet for å strekke motstanderens forsvar - skaper rom for indreløperne i mellomrommet",
      "I boksen: Vær tålmodig, ikke løp for tidlig. Kom deg fri i blindside rett før innlegget slås",
      "Hold opp ball og spill medspillere inn i spill",
    ],
  },
];

export const Roles = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
