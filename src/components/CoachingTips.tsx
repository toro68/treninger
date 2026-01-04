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
  // Treningsdesign (basert på Nonlinear Pedagogy)
  {
    id: "trening-1",
    category: "Treningsdesign",
    title: "Forenkle hele spillet",
    do: "Bruk smålagsspill (3v3, 4v4) som beholder spillets kompleksitet",
    dont: "Drill isolerte ferdigheter uten motstand eller beslutninger",
  },
  {
    id: "trening-2",
    category: "Treningsdesign",
    title: "Manipuler begrensninger",
    do: "Endre regler, banestørrelse eller antall for å fremkalle ønsket atferd",
    dont: "Si nøyaktig hva spilleren skal gjøre i hver situasjon",
  },
  {
    id: "trening-3",
    category: "Treningsdesign",
    title: "Ekstern fokus i instruksjoner",
    do: "«Spill ballen til rommet bak forsvareren»",
    dont: "«Bøy kneet 45 grader når du slår»",
  },
  {
    id: "trening-4",
    category: "Treningsdesign",
    title: "Mindre feedback, mer oppdagelse",
    do: "Still spørsmål: «Hva så du?» «Hva kunne du gjort annerledes?»",
    dont: "Korrigere hver eneste ballberøring",
  },
  {
    id: "trening-5",
    category: "Treningsdesign",
    title: "Variasjon er læring",
    do: "Varier øvelser, motstandere, banestørrelse → fleksible spillere",
    dont: "Gjenta samme drill identisk 100 ganger",
  },
  {
    id: "trening-6",
    category: "Treningsdesign",
    title: "Representativ trening",
    do: "Øvelsen må ligne på kampsituasjonen den forbereder til",
    dont: "Trene pasninger i kø uten press eller tidsaspekt",
  },
  // Spillerutvikling (basert på Michelsen/Fagermo UEFA-oppgaver)
  {
    id: "utvikling-1",
    category: "Spillerutvikling",
    title: "Egentrening er nøkkelen",
    do: "Oppmuntre til daglig egentrening med ball - de beste gjør det hver dag",
    dont: "Tro at organisert trening alene er nok",
  },
  {
    id: "utvikling-2",
    category: "Spillerutvikling",
    title: "Uorganisert lek",
    do: "La spillerne leke fritt med ball - lystbetont aktivitet bygger indre motivasjon",
    dont: "Styre all aktivitet - alvoret kommer tidsnok",
  },
  {
    id: "utvikling-3",
    category: "Spillerutvikling",
    title: "Smålagsspill utvikler",
    do: "Mye 3v3, 4v4, futsal → hurtig teknikk, dribleegenskaper, raske avgjørelser",
    dont: "Bare spille 11v11 på stor bane",
  },
  {
    id: "utvikling-4",
    category: "Spillerutvikling",
    title: "Tren med eldre",
    do: "La talenter hospitere med eldre lag - ut av komfortsonen",
    dont: "Glem tilhørighet til eget lag - begge deler er viktig",
  },
  {
    id: "utvikling-5",
    category: "Spillerutvikling",
    title: "Mental styrke",
    do: "Lær spillere å tåle motgang uten å bukke under",
    dont: "Beskytte mot all motgang - det bygger ikke robusthet",
  },
  // Gruppeledelse (basert på Vikvang FIRO-teori)
  {
    id: "gruppe-1",
    category: "Gruppeledelse",
    title: "Gruppefaser (FIRO)",
    do: "Kjenn fasene: Tilhørighet → Kontroll → Samhørighet. Tilpass lederstil",
    dont: "Lede alle grupper likt uansett modenhet",
  },
  {
    id: "gruppe-2",
    category: "Gruppeledelse",
    title: "Individ + kollektiv",
    do: "Kombiner felles beskjeder med individuelle samtaler",
    dont: "Bare snakke til hele gruppen - noen trenger én-til-én",
  },
  {
    id: "gruppe-3",
    category: "Gruppeledelse",
    title: "Kjenn spillerne",
    do: "Vet hvem som er introvert/ekstrovert - tilpass kommunikasjon",
    dont: "Behandle alle likt - noen trenger konkreter, andre frihet",
  },
  {
    id: "gruppe-4",
    category: "Gruppeledelse",
    title: "Flytsone",
    do: "Balanse mellom utfordring og ferdighet - juster press per spiller",
    dont: "Samme krav til alle uansett nivå",
  },
  // Veiledning (basert på Mortensholm fotballdidaktikk + Pettersen valg/kognisjon)
  {
    id: "veiledning-1",
    category: "Veiledning",
    title: "Valg viktigere enn teknikk",
    do: "Fokuser på HVA spilleren ser og velger, ikke bare utførelsen",
    dont: "Bare trene teknikk uten beslutninger",
  },
  {
    id: "veiledning-2",
    category: "Veiledning",
    title: "Medbestemmelse gir motivasjon",
    do: "La spillere påvirke øvelser, regler, lagtaktikk",
    dont: "Bestemme alt selv - autonomi bygger indre motivasjon",
  },
  {
    id: "veiledning-3",
    category: "Veiledning",
    title: "Stopp spillet riktig",
    do: "Frys i gylne øyeblikk: «Hva ser du nå? Hvilke valg har du?»",
    dont: "Stoppe for ofte eller bare ved feil",
  },
  {
    id: "veiledning-4",
    category: "Veiledning",
    title: "Video som verktøy",
    do: "Vis klipp og still spørsmål: «Hva skjer her? Hva kunne du gjort?»",
    dont: "Bare fortelle hva som var feil",
  },
  {
    id: "veiledning-5",
    category: "Veiledning",
    title: "Persepsjon før handling",
    do: "Tren spillere til å skanne: se før du får ballen",
    dont: "Bare fokusere på hva som skjer ETTER ballmottak",
  },
  // Trenerrollen (basert på Valla C12 + Fredlund C22)
  {
    id: "trener-1",
    category: "Trenerrollen",
    title: "Se hele mennesket",
    do: "Følg opp 24-timersutøveren: søvn, mat, skole, trivsel",
    dont: "Bare fokusere på det fotballfaglige",
  },
  {
    id: "trener-2",
    category: "Trenerrollen",
    title: "Trygghet først",
    do: "Bygg trygge rammer og anerkjennelse - gjelder 6-åring og 24-åring",
    dont: "Hoppe over relasjon og gå rett på prestasjonskrav",
  },
  {
    id: "trener-3",
    category: "Trenerrollen",
    title: "Video med spilleren",
    do: "La spilleren analysere selv: «Finn 3 gode situasjoner og 1 du vil forbedre»",
    dont: "Bare vise feil og instruere løsningen",
  },
  {
    id: "trener-4",
    category: "Trenerrollen",
    title: "Gode situasjoner først",
    do: "Vis mest gode prestasjoner på video - ufarliggjør feil som del av spillet",
    dont: "Kun fokusere på det som gikk galt",
  },
  {
    id: "trener-5",
    category: "Trenerrollen",
    title: "Tilpasset oppfølging",
    do: "Noen trenger tett kontakt, andre bare en klapp på skulderen",
    dont: "Behandle alle helt likt - alle har ulike behov",
  },
  {
    id: "trener-6",
    category: "Trenerrollen",
    title: "Autoritet uten å være autoritær",
    do: "Vær faglig sterk, tydelig og trygg - da kommer respekten",
    dont: "Bruke makt og frykt for å lede",
  },
];

export const CoachingTips = () => {
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") {
      return new Set();
    }
    const stored = window.localStorage.getItem("coaching-tips-checked");
    if (!stored) return new Set();
    try {
      const parsed = JSON.parse(stored);
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
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
