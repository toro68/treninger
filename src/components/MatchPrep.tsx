"use client";

import { useState, useEffect } from "react";

type FocusItem = {
  id: string;
  text: string;
};

const focusItems: FocusItem[] = [
  {
    id: "kampplan",
    text: "Ha en klar kampplan",
  },
  {
    id: "forsvartillangrep",
    text: "Godt forsvar starter effektive angrep - behersk begge deler",
  },
  {
    id: "spillbarhet",
    text: "Gjør deg spillbar - juster avstand og vinkel",
  },
  {
    id: "sla-og-ga",
    text: "Slå og gå: Ikke stå i ro etter pasning. Kom ut av pasningsskygge",
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
  {
    id: "genpress",
    text: "Gjenvinning: Aggressivt i sekundene etter balltap",
  },
  {
    id: "pumping",
    text: "Pumping: Juster ledd raskt opp/ned for å holde kontroll på rom",
  },
  {
    id: "leddavstand",
    text: "Leddavstand: Hold 12-15m mellom midtbane og forsvar. Flytt dere likt for å holde kompakt",
  },
  {
    id: "duellforduellen",
    text: "Duell før duellen: Gå i kroppen før innlegg, fjern fart og timing",
  },
  {
    id: "stapabeina",
    text: "Stå på beina: I press, ikke selg deg på finter, hold kontroll",
  },
  {
    id: "forsvar",
    text: "Forsvar: Krymp tid og rom, fall av ved høyt press fra motstander",
  },
  {
    id: "soneforsvar",
    text: "Soneforsvar: Kompakt/smalt, når én duellerer faller andre et hakk ned",
  },
  {
    id: "bakrom",
    text: "Bakrom: Forsvar ved å falle. Høyt forsvar = stort bakrom å angripe",
  },
  {
    id: "mellomrom",
    text: "Mellomrom: Kort bakrom = angrip mellomrom mellom forsvar og midtbane",
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
