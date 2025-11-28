"use client";

import Link from "next/link";
import { useState } from "react";

interface Term {
  term: string;
  definition: string;
  example?: string;
}

interface Category {
  name: string;
  terms: Term[];
}

const glossaryData: Category[] = [
  {
    name: "NFF Terminologi (Forsvar)",
    terms: [
      {
        term: "1F (Førsteforsvarer)",
        definition: "Den forsvarsspilleren som er nærmest ballfører. Jobben er å gå i press, lede spillet eller vinne ball.",
        example: "Når du er 1F, rop: 'Jeg støter!' eller 'Gå!'"
      },
      {
        term: "2F (Andreforsvarer)",
        definition: "Sikring. Spilleren som ligger bak 1F for å stoppe motstanderen hvis 1F blir driblet eller spilt forbi.",
        example: "Når backen støter (1F), må stopperen falle av som 2F og rope 'Jeg sikrer!'"
      },
      {
        term: "3F (Tredjeforsvarer)",
        definition: "Resten av forsvaret. Deres jobb er dekning (passe på rom) og markering (passe på spillere) lengre unna ballen.",
        example: "Vingen på motsatt side trekker inn som 3F for å holde laget kompakt."
      }
    ]
  },
  {
    name: "Angrepsspill",
    terms: [
      {
        term: "Possession",
        definition: "Kontrollert ballbesittelse for å flytte motstanderen, trekke ut markeringer og skape rom før gjennombrudd.",
        example: "Vi spiller possession for å dra presset til én side før vi bryter motsatt."
      },
      {
        term: "Kontraangrep",
        definition: "Ekstremt hurtig angrep rett etter gjenvinning mens motstanderen fortsatt er i ubalanse.",
        example: "Keeper kaster ballen raskt ut til vingen som løper i kontra."
      },
      {
        term: "Oppbyggingsspill",
        definition: "Planlagt fase der keeper, stoppere og sentral midtbane rullerer ball for å lokke press og finne progresjon gjennom ledd.",
        example: "Keeper starter via stopperne, sentral midtbane tilbyr seg i mellomrom og vi vender spill."
      },
      {
        term: "Gjennombrudd",
        definition: "Handling eller pasning som bryter siste forsvarslinje, enten med ballføring eller løp i bakrom.",
        example: "Spissen gjorde et gjennombrudd bak backrekken."
      },
      {
        term: "Veggspill",
        definition: "Kort pasningsutveksling der avleverer får ballen tilbake umiddelbart fra samme medspiller (1-2).",
        example: "Midtbanespiller og spiss bruker veggspill for å komme forbi stopperen."
      },
      {
        term: "Overlap",
        definition: "Når en spiller uten ball løper forbi ballfører på utsiden for å skape overtall og bredde.",
        example: "Backen gjør overlap på vingen langs sidelinjen."
      },
      {
        term: "Underlap",
        definition: "Når en spiller uten ball løper på innsiden av ballfører for å true mellomrom eller løpe inn i boks.",
        example: "Indreløperen gjør underlap på vingen og løper inn i boksen."
      },
      {
        term: "Dybdeløp",
        definition: "Koordinert løp bak forsvarslinjen for å true bakrom og gi pasningslinje i lengderetning.",
        example: "Vingen gjør dybdeløp når midtbanespilleren får ballen."
      },
      {
        term: "Blindsideløp",
        definition: "Løp på forsvarerens blinde side med tempo slik at de ikke rekker å reagere.",
        example: "Indreløperen gjør blindsideløp bak backen."
      },
      {
        term: "Knekkeløp",
        definition: "Løp hvor angriperen endrer retning eller tempo brått for å skape markeringstap før gjennombrudd.",
        example: "Spissen gjør knekkeløp - først ut, så inn bak stopperens rygg."
      },
      {
        term: "Motløp",
        definition: "Løp mot ballfører for å møte, sikre ball og eventuelt spille videre på en medspiller i fart.",
        example: "Spissen gjør motløp for å skape rom for vingen."
      }
    ]
  },
  {
    name: "Forsvarsspill & Overganger",
    terms: [
      {
        term: "Gjenvinning (5-sek)",
        definition: "Å jage ballen umiddelbart etter tap. Vi prøver å vinne den tilbake på 5 sekunder før vi faller av.",
        example: "Mistet ball? Ikke heng med hodet – jakt gjenvinning med en gang!"
      },
      {
        term: "Kompakthet",
        definition: "Kort avstand mellom lagdelene (lengde) og spillerne (bredde). Gjør det trangt for motstander.",
        example: "Laget må være kompakt – pump opp backrekka!"
      },
      {
        term: "Sideforskyvning",
        definition: "Hele laget flytter seg mot den siden ballen er på.",
        example: "Når ballen er på venstre, må høyre ving trekke inn mot midten."
      },
      {
        term: "Offsidefelle",
        definition: "Backrekken løper fremover i riktig øyeblikk for å sette motspillere i offside.",
        example: "Stopperen styrer linja – 'Ut!'"
      }
    ]
  },
  {
    name: "Roller i 4-3-3",
    terms: [
      {
        term: "Anker (6)",
        definition: "Den dype midtbanespilleren. Beskytter forsvaret og er vendingspunkt i angrep.",
        example: "Ankeret må alltid være spillbar for stopperne."
      },
      {
        term: "Indreløper (8/10)",
        definition: "Midtbanespillere som løper 'boks-til-boks'. Skaper trekanter, støtter kantene og går på løp inn i feltet.",
        example: "Indreløperne må true mellomrommet."
      },
      {
        term: "Kantspiller (7/11)",
        definition: "Angrepsspillere på sidene. Skal utfordre 1v1, true bakrom og slå innlegg.",
        example: "Kanten må holde bredden for å strekke forsvaret."
      },
      {
        term: "Spiss (9)",
        definition: "Den fremste angriperen. Binder opp stoppere og truer bakrom.",
        example: "Spissen må være tålmodig og ligge på linje med stopperne."
      }
    ]
  },
  {
    name: "Kommunikasjon (Rop)",
    terms: [
      {
        term: "Tid!",
        definition: "Ballfører har ingen press på seg. Kan orientere seg og se opp.",
        example: "'Tid!' betyr: Ro ned, du har kontroll."
      },
      {
        term: "Mann!", // Evt "Rygg!"
        definition: "Advarsel om at en motspiller kommer i press bakfra/nært.",
        example: "'Mann!' betyr: Beskytt ballen eller spill enkelt tilbake."
      },
      {
        term: "Snu!",
        definition: "Du har rom til å vende opp med ballen mot mål.",
        example: "'Snu!' betyr: Ikke spill støtte, du kan angripe!"
      },
      {
        term: "Hold!",
        definition: "Ikke støt frem, men hold posisjonen og forsink angrepet.",
        example: "1F roper 'Hold!' for å samle forsvaret."
      }
    ]
  }
];

export default function OrdlistePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtreringslogikk
  const filteredGlossary = glossaryData.map((category) => {
    const filteredTerms = category.terms.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.term.toLowerCase().includes(searchLower) ||
        item.definition.toLowerCase().includes(searchLower) ||
        (item.example && item.example.toLowerCase().includes(searchLower))
      );
    });

    return { ...category, terms: filteredTerms };
  }).filter(category => category.terms.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link 
              href="/"
              className="text-blue-400 hover:text-blue-300 text-sm mb-2 inline-block"
            >
              ← Tilbake til treningsplanlegger
            </Link>
            <h1 className="text-3xl font-bold text-white">📖 Fotballordliste</h1>
            <p className="text-gray-400 mt-2">
              J14-språket: Fra 1F til Gjenvinning
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 sticky top-4 z-20">
          <div className="relative">
            <input
              type="text"
              placeholder="Søk etter ord (f.eks. 'sikring', 'anker', 'press')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/90 text-white border border-gray-700 rounded-xl py-4 px-6 pl-12 shadow-lg backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-gray-500"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
        </div>

        {/* Quick Links (kun hvis ikke søk er aktivt) */}
        {!searchTerm && (
          <div className="bg-gray-800/50 rounded-xl p-4 mb-8 backdrop-blur-sm overflow-x-auto">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Kategorier:</h2>
            <div className="flex flex-nowrap gap-2">
              {glossaryData.map((category) => (
                <a
                  key={category.name}
                  href={`#${category.name.toLowerCase().replace(/[^a-zæøå0-9]/g, '-')}`}
                  className="whitespace-nowrap px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-8">
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map((category) => (
              <section 
                key={category.name}
                id={category.name.toLowerCase().replace(/[^a-zæøå0-9]/g, '-')}
                className="scroll-mt-28"
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {category.name}
                </h2>
                <div className="grid gap-3">
                  {category.terms.map((item) => (
                    <div
                      key={item.term}
                      className="bg-gray-800/60 rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/30 transition-all hover:bg-gray-800/80"
                    >
                      <h3 className="text-lg font-bold text-blue-400 mb-2">
                        {item.term}
                      </h3>
                      <p className="text-gray-200 mb-3 leading-relaxed">
                        {item.definition}
                      </p>
                      {item.example && (
                        <div className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-blue-500/50">
                          <p className="text-gray-400 text-sm italic">
                            <span className="not-italic mr-2">🗣️</span> 
                            {item.example}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">Ingen treff på "{searchTerm}" 🤷‍♂️</p>
              <p className="text-sm mt-2">Prøv et annet ord eller sjekk stavingen.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">
            Mangler du et ord? Spør treneren på neste økt! ⚽️
          </p>
        </div>
      </div>
    </div>
  );
}
