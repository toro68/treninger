"use client";

import { useState, useEffect } from "react";
// GlossaryTooltip er tilgjengelig for fremtidig bruk
// import { GlossaryTooltip } from "@/components/GlossaryTooltip";

type FocusItem = {
  id: string;
  text: string;
};

const focusItems: FocusItem[] = [
  // === GENERELT ===
  {
    id: "kampplan",
    text: "Ha en klar kampplan",
  },
  {
    id: "forsvartillangrep",
    text: "Godt forsvar starter effektive angrep - behersk begge deler",
  },
  {
    id: "kommunikasjon",
    text: "Kommunikasjon: Hjelp hverandre. Mann i rygg. Ditt navn/ja for å signalisere når du er ledig. \"Rett side\" = returløp bak ball",
  },
  {
    id: "orientering",
    text: "Orientering: Sjekk over skulder, vit hvor medspillere/motspillere er",
  },
  {
    id: "kampenballen",
    text: "Kampen om ballen: Vinn dueller, bruk kraft, vær først på ball",
  },
  // === ANGREP ===
  {
    id: "spillbarhet",
    text: "Gjør deg spillbar - juster avstand og vinkel",
  },
  {
    id: "sla-og-ga",
    text: "Slå og gå: Ikke stå i ro etter pasning. Kom ut av pasningsskygge",
  },
  {
    id: "bevegelse",
    text: "Bevegelse: Foran/bak/forbi ball for å skape rom",
  },
  {
    id: "roaapnetrue",
    text: "Ro, åpne, true: Ballfører viser ro, åpner med førstetouchen, truer motstander",
  },
  {
    id: "prioriterterom",
    text: "Prioriterte rom: Bakrom, mellomrom sentralt, framrom sentralt",
  },
  {
    id: "avslutning",
    text: "Avslutning: Les keeperen, følg opp returer, prioriter plassering",
  },
  {
    id: "innlegg",
    text: "Innlegg: Blindsideløp, time løpet, slå tidlig mellom keeper og forsvar",
  },
  // === FORSVAR (Bangsbo + Dugger) ===
  {
    id: "sikringskjede",
    text: "Sikringskjede: Første mann presser, andre sikrer, tredje balanserer - flytt som én enhet",
  },
  {
    id: "presspåpasning",
    text: "Press på pasning: Start bevegelsen idet pasningen spilles - nærm deg i kurve for å stenge én side",
  },
  {
    id: "retningsbestemmelse",
    text: "Retningsbestemmelse: Tving motstanderen dit DU vil - mot sidelinje, bakover, eller på svak fot",
  },
  {
    id: "stapabeina",
    text: "Stå på beina: Hold lavt tyngdepunkt, vent på dårlig touch - selg deg ikke på finter",
  },
  {
    id: "blokkering",
    text: "Blokkering: Steng skuddvinkel, bruk kroppen aktivt nær mål - ikke vend deg bort",
  },
  {
    id: "takling",
    text: "Takling: Blokktakling med fastlåst ankel og kroppsvekt. Glidende kun som siste utvei",
  },
  {
    id: "soneforsvar",
    text: "Soneforsvar: Kompakt/smalt, når én duellerer faller andre et hakk ned - steng sentralt rom",
  },
  {
    id: "leddavstand",
    text: "Leddavstand: Hold 10-15m mellom linjene. Hele linjen flytter seg mot ballen",
  },
  {
    id: "pumping",
    text: "Pumping: Juster ledd raskt opp/ned for å holde kontroll på rom",
  },
  {
    id: "innleggsforsvar",
    text: "Innleggsforsvar: Første stolpe dekkes, sentralt heading-klar, bakre stolpe sikres - keeper kommanderer",
  },
  {
    id: "duellforduellen",
    text: "Duell før duellen: Gå i kroppen FØR innlegget, fjern fart og timing på motstanderens løp",
  },
  {
    id: "undertall",
    text: "Undertall: Forsinke er viktigere enn å vinne ball. Dekk sentralt, tving bredt, kjøp tid",
  },
  {
    id: "farlighetsgrader",
    text: "Farlighetsgrader: Langt fra mål = forsinke rolig. Nær mål = blokkér alt, klarér høyt/bredt",
  },
  {
    id: "offsidelinje",
    text: "Offsidelinje: Alle opp samtidig på signal fra midtstopper - én som er sen ødelegger fellen",
  },
  // === DØDBALL FORSVAR (Dugger) ===
  {
    id: "hjornespark",
    text: "Hjørnespark: Sone eller mann - eig din sone, angrip ballen, klarér høyt og bredt",
  },
  {
    id: "murfrispark",
    text: "Mur ved frispark: Keeper plasserer muren, stå i ro til skuddet, dekk keeperens blinde side",
  },
  // === OVERGANGER ===
  {
    id: "genpress",
    text: "Gjenvinning: Aggressivt i 5-6 sekunder etter balltap - hele laget presser som én enhet",
  },
  {
    id: "kontring",
    text: "Kontring: Ved ballvinning - første touch fremover, kontringsspillere starter løpet umiddelbart",
  },
  {
    id: "bakrom",
    text: "Bakrom: Forsvar ved å falle. Høyt forsvar = stort bakrom å angripe",
  },
  {
    id: "mellomrom",
    text: "Mellomrom: Kort bakrom = angrip mellomrom mellom forsvar og midtbane",
  },
  // === OPPBYGGING ===
  {
    id: "spilleutbakfra",
    text: "Spille ut bakfra: Keeper/stopper som startpunkt - hold roen, spill på rett side av press",
  },
  // === NFF SONEFORSVAR ===
  {
    id: "nff-forsteforsvarer",
    text: "Førsteforsvarer (NFF): Du er signalspiller - din handling definerer hva resten av laget gjør. Nærmest ball = førsteforsvarer",
  },
  {
    id: "nff-leding",
    text: "Leding (NFF): Led ballfører ut mot sidelinje - der er det trangest. Bruk bueløp for å stenge rommet du vil beskytte",
  },
  {
    id: "nff-andreforsvarer",
    text: "Andreforsvarer/Sikring (NFF): Nærmeste midtbane sikrer kant i press, nærmeste stopper sikrer stopper i press",
  },
  {
    id: "nff-tredjeforsvarer",
    text: "Tredjeforsvarer (NFF): Dekk rom og ta ut pasningslinjer. Kommuniser: 'Dekk venstre' stenger pasningsforbindelse",
  },
  {
    id: "nff-presshøyde",
    text: "Presshøyde (NFF): Høyt press = kortere vei til mål, krever samstemthet. Lavt press = bevare struktur, vente på feil",
  },
  {
    id: "nff-balanse",
    text: "Balanse (NFF): Lavt forsvar i balanse = fantastisk utgangspunkt for ballvinning og overgang. Én meter fram fra førsteforsvarer ødelegger pasningsvinkler",
  },
  // === NFF ANGREP ===
  {
    id: "nff-hovmesterblikk",
    text: "Hovmesterblikket (NFF): Ballfører trenger gode vinkler og avstander fra alle medspillere. Gjør deg spillbar - ikke bare ballførers ansvar",
  },
  {
    id: "nff-romforhold",
    text: "Romforhold (NFF): Prioriterte rom i rekkefølge: Bakrom → Mellomrom sentralt → Framrom sentralt",
  },
  {
    id: "nff-beggeveier",
    text: "Begge veier (NFF): Gode spillere behersker både angrep og forsvar. Spiss gjør fenomenal jobb i fremste forsvarsledd",
  },
];

const checklistItems = [
  "Laguttak på Spond og i Fiks",
  "Kampbag",
  "4 baller",
  "Vester",
  "Kapteinsbind",
  "Isposer",
  "Førstehjelp",
];

export const MatchPrep = () => {
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") {
      return new Set();
    }
    const stored = window.localStorage.getItem("match-prep-checked");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem("match-prep-checked", JSON.stringify([...checked]));
  }, [checked]);

  const toggleChecked = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setChecked(next);
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-sky-200/70 bg-gradient-to-r from-sky-50 to-blue-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Kamp</h2>
          <p className="text-xs text-zinc-500">Fokus og huskeliste før avspark</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Huskeliste */}
          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Huskeliste</h3>
            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
              <ul className="text-xs text-zinc-700 space-y-1">
                {checklistItems.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Oppmann */}
          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Oppmann</h3>
            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
              <p className="text-xs text-zinc-700">
                Kommunikasjon med dommer og motstander - kampvert
              </p>
            </div>
          </div>

          {/* Fokus */}
          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Fokus</h3>
            <div className="space-y-2">
              {focusItems.map((item) => {
                const isChecked = checked.has(item.id);
                return (
                  <label
                    key={item.id}
                    className={`block rounded-lg border px-3 py-2 cursor-pointer transition ${
                      isChecked
                        ? "border-zinc-300 bg-zinc-50"
                        : "border-zinc-100 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleChecked(item.id)}
                        className="mt-0.5 h-4 w-4 accent-black"
                      />
                      <p
                        className={`text-xs ${
                          isChecked ? "text-zinc-400 line-through" : "text-zinc-700"
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {checked.size > 0 && (
            <button
              onClick={() => setChecked(new Set())}
              className="text-xs text-zinc-500 hover:underline"
            >
              Nullstill avhuking
            </button>
          )}
        </div>
      )}
    </section>
  );
};
