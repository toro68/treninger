"use client";

import { useState, useEffect } from "react";

type Tip = {
  id: string;
  category: string;
  title: string;
  do: string;
  dont?: string;
};

const tips: Tip[] = [
  // Ros og tilbakemelding
  {
    id: "ros-1",
    category: "Ros",
    title: "Ros prosess, ikke talent",
    do: "«Jeg så du orienterte deg før du fikk ballen. Smart!»",
    dont: "«Du er så teknisk» / «Du er en født målscorer»",
  },
  {
    id: "ros-2",
    category: "Ros",
    title: "Ros innsats og strategi",
    do: "«Innsatsen din i gjenvinningen var rå, du ga deg ikke!»",
    dont: "«Bra fordi du vant duellen»",
  },
  {
    id: "ros-3",
    category: "Ros",
    title: "Ros fremgang",
    do: "«Innleggene kommer mye bedre nå enn forrige uke»",
    dont: "«Du er god på innlegg»",
  },
  // Feil og mot
  {
    id: "feil-1",
    category: "Feil",
    title: "Bruk ordet «ennå»",
    do: "«Du har ikke spikret teknikken ennå, men du er nærmere nå»",
    dont: "«Du får ikke til langpasninger»",
  },
  {
    id: "feil-2",
    category: "Feil",
    title: "Feir modige forsøk",
    do: "«Kjempebra initiativ! Det var riktig tanke. Prøv igjen!»",
    dont: "Sukk eller rist på hodet ved bomskudd",
  },
  {
    id: "feil-3",
    category: "Feil",
    title: "Del dine egne feil",
    do: "«Jeg bommet på taktikken i 1. omgang. Her er hva jeg lærte...»",
    dont: "Lat som du alltid har svaret",
  },
  // Fokus og mål
  {
    id: "fokus-1",
    category: "Fokus",
    title: "Flytt fokus fra resultat til utvikling",
    do: "«I dag vil jeg se at dere tør å spille dere ut bakfra»",
    dont: "«Vi må vinne denne»",
  },
  {
    id: "fokus-2",
    category: "Fokus",
    title: "Evaluer læring, ikke utfall",
    do: "«Hva lærte vi som vi kan bruke på trening tirsdag?»",
    dont: "«Hvorfor tapte vi?»",
  },
  {
    id: "fokus-3",
    category: "Fokus",
    title: "Innsats = mestring",
    do: "«Hjernen er som en muskel. Den blir sterkere når dere sliter litt»",
    dont: "«Hvis du må jobbe hardt, er du kanskje ikke god nok»",
  },
  // Kampdag
  {
    id: "kamp-1",
    category: "Kampdag",
    title: "Pep-talk fokus",
    do: "«Våg å prøve! Det er sånn vi blir bedre»",
    dont: "«Ikke gjør feil nå»",
  },
  {
    id: "kamp-2",
    category: "Kampdag",
    title: "Definer lagsuksess",
    do: "«Vi vant fordi vi fulgte planen og jobbet for hverandre»",
    dont: "«Bra kamp, vi vant!»",
  },
  {
    id: "kamp-3",
    category: "Kampdag",
    title: "Støtt lagvenninne",
    do: "Lær spillerne å rope: «Bra forsøk! Ta den neste!»",
    dont: "Kritisere lagvenninne som feiler",
  },
];

export const CoachingTips = () => {
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") {
      return new Set();
    }
    const stored = window.localStorage.getItem("coaching-tips-checked");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(
      "coaching-tips-checked",
      JSON.stringify([...checked])
    );
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

  const categories = [...new Set(tips.map((t) => t.category))];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-emerald-200/70 bg-gradient-to-r from-emerald-50 to-lime-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Trenerveiledning</h2>
          <p className="text-xs text-zinc-500">Growth mindset klar for bruk</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-zinc-500">
            Growth Mindset-tips for å bygge trygghet og spilleglede
          </p>

          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-zinc-700 mb-2">{category}</h3>
              <div className="space-y-2">
                {tips
                  .filter((t) => t.category === category)
                  .map((tip) => {
                    const isChecked = checked.has(tip.id);
                    return (
                      <label
                        key={tip.id}
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
                            onChange={() => toggleChecked(tip.id)}
                            className="mt-0.5 h-4 w-4 accent-black"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isChecked ? "text-zinc-400" : "text-zinc-900"}`}>
                              {tip.title}
                            </p>
                            <p className="mt-1 text-xs text-emerald-700">
                              {tip.do}
                            </p>
                            {tip.dont && (
                              <p className="text-xs text-zinc-400 line-through">
                                {tip.dont}
                              </p>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
              </div>
            </div>
          ))}

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
