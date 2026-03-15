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
    text: "Romforståelse: Bakrom og mellomrom sentralt",
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
    text: "Romforhold (NFF): Snakk om bakrom (bak siste ledd) og mellomrom (mellom ledd)",
  },
  {
    id: "nff-beggeveier",
    text: "Begge veier (NFF): Gode spillere behersker både angrep og forsvar. Spiss gjør fenomenal jobb i fremste forsvarsledd",
  },
];

const rbkFocusItems: FocusItem[] = [
  {
    id: "rbk-press-sammen",
    text: "RBK: Press sammen eller fall sammen - hele laget må reagere likt på balltap.",
  },
  {
    id: "rbk-korte-avstander",
    text: "RBK: Høyt press krever korte avstander mellom leddene og reelt press på ballfører.",
  },
  {
    id: "rbk-spill-framover",
    text: "RBK: Spill framover når du kan. Støttepasning brukes for å komme fram, ikke for å gjemme ballen.",
  },
  {
    id: "rbk-bakrom-forst",
    text: "RBK: Tru bakrom tidlig ved ballvinning. Når bakrommet trues, åpnes mellomrommet.",
  },
  {
    id: "rbk-stotte-rundt-ball",
    text: "RBK: Ballfører skal ha støtte på begge sider, framover og minst ett alternativ bak.",
  },
  {
    id: "rbk-pluss-en-bak",
    text: "RBK: I oppbygging ønsker vi pluss én i bakerste ledd for å spille kontrollert forbi første pressledd.",
  },
  {
    id: "rbk-keeper-oppbygging",
    text: "RBK: Keeper er en del av angrepet og skal være spillbar i frispilling og sweepe rom bak forsvaret.",
  },
  {
    id: "rbk-en-back-gar",
    text: "RBK: Når én back går i angrep, må motsatt side sikre restforsvaret.",
  },
];

const godfotenAttackPostulates: FocusItem[] = [
  {
    id: "godfoten-angrep-1",
    text: "Angrep: Spillet i lengderetningen av banen avgjør kampen.",
  },
  {
    id: "godfoten-angrep-2",
    text: "Angrep: Vend med ballen når du kan. Spill støtte bare når du må, og da så tidlig som mulig.",
  },
  {
    id: "godfoten-angrep-3",
    text: "Angrep: Når én møter, bør en annen stikke. Motsatte bevegelser skaper ubalanse.",
  },
  {
    id: "godfoten-angrep-4",
    text: "Angrep: Hold alltid bredde på angrepssida, og strekk opp hvis mulig.",
  },
  {
    id: "godfoten-angrep-5",
    text: "Angrep: Ikke slå på første bevegelse uten gjennombrudd. Let etter rom for andre- og tredjeangriper.",
  },
  {
    id: "godfoten-angrep-6",
    text: "Angrep: Vinkle pasningen inn i oppbyggingen og ut i selve gjennombruddet.",
  },
  {
    id: "godfoten-angrep-7",
    text: "Angrep: Utfordre med ball på siste tredel og søk overtall på kantene for opprulling.",
  },
  {
    id: "godfoten-angrep-8",
    text: "Angrep: Spill dere helst presist ut via backfirer, men velg også langt oppspill eller løft i bakrom når det er klokt.",
  },
  {
    id: "godfoten-angrep-9",
    text: "Angrep: Ballfører skal alltid ha en medspiller i støtte.",
  },
  {
    id: "godfoten-angrep-10",
    text: "Angrep: Tru alltid bakrommet, særlig når motstander ligger høyt.",
  },
  {
    id: "godfoten-angrep-11",
    text: "Angrep: Utnytt rom mellom motstanders lagdeler og mellom spillerne i lagdelene.",
  },
  {
    id: "godfoten-angrep-12",
    text: "Angrep: Ballførers posisjon bestemmer innløpene. Les innlegget tidlig.",
  },
  {
    id: "godfoten-angrep-13",
    text: "Angrep: Angrip første stolpe, rommet foran keeper og bakre stolpe ved innlegg.",
  },
  {
    id: "godfoten-angrep-14",
    text: "Angrep: Fra dødlinja eller nær mål, let etter skrått bakover eller bakre stolpe.",
  },
  {
    id: "godfoten-angrep-15",
    text: "Angrep: Når tidlig innlegg ikke kommer, søk ny posisjon og vær klar for gjenvinning.",
  },
  {
    id: "godfoten-angrep-16",
    text: "Angrep: Du har bedre tid enn du tror foran mål.",
  },
];

const godfotenDefensePostulates: FocusItem[] = [
  {
    id: "godfoten-forsvar-1",
    text: "Forsvar: Sjokkpress høyt når presset på ball er reelt og laget er samlet.",
  },
  {
    id: "godfoten-forsvar-2",
    text: "Forsvar: Ved lavt press skal spisser og midtbane trekke ned, men laget fortsatt være kompakt.",
  },
  {
    id: "godfoten-forsvar-3",
    text: "Forsvar: Hold korte sideveis avstander så laget kan forskyve raskt.",
  },
  {
    id: "godfoten-forsvar-4",
    text: "Forsvar: Press og led innover, men bare når resten av laget er nært nok til å sikre.",
  },
  {
    id: "godfoten-forsvar-5",
    text: "Forsvar: Når førsteforsvarer støter, må andre falle av og sikre - spesielt i backfirer.",
  },
  {
    id: "godfoten-forsvar-6",
    text: "Forsvar: Midtbane må følge gjennomløp når begge midtstoppere er okkupert.",
  },
  {
    id: "godfoten-forsvar-7",
    text: "Forsvar: Konsentrer laget når ballen er sentral og truende. Nekt spill foran stopperne.",
  },
  {
    id: "godfoten-forsvar-8",
    text: "Forsvar: Gå mens ballen går. Flytt deg før mottaket, ikke etterpå.",
  },
  {
    id: "godfoten-forsvar-9",
    text: "Forsvar: Ved balltap skal førsteforsvar etableres straks.",
  },
];

const drilloFocusItems: FocusItem[] = [
  {
    id: "drillo-gjennombrudd-forst",
    text: "Drillo: Se etter gjennombrudd først. Støttepasning er bare nyttig hvis den skaper neste framoverrettede aksjon.",
  },
  {
    id: "drillo-kompakt-sone",
    text: "Drillo: Forsvar kompakt i sone. Én presser, én sikrer, resten dekker rom og flytter samlet.",
  },
  {
    id: "drillo-hindre-gjennombrudd",
    text: "Drillo: Hindre gjennombrudd før alt annet. Beskytt rommet gjennom laget, ikke bare i duellen.",
  },
  {
    id: "drillo-presshoyde",
    text: "Drillo: Velg presshøyde bevisst. Høyt eller lavt press må være et felles valg, ikke tilfeldighet.",
  },
  {
    id: "drillo-dybde-og-avstand",
    text: "Drillo: Hold gode avstander i laget. For store strekk ødelegger både press og sikring.",
  },
  {
    id: "drillo-bredde-og-konsentrering",
    text: "Drillo: Med ball bruker vi bredde for å åpne rom. Uten ball konsentrerer vi rundt det farlige rommet.",
  },
  {
    id: "drillo-forste-andreball",
    text: "Drillo: Vær rigget for første- og andreball. Nedfallsrommet må eies før duellen er avgjort.",
  },
  {
    id: "drillo-dodball",
    text: "Drillo: Dødball krever tydelige roller. Alle skal vite hvem som angriper, sikrer eller rydder returen.",
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

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">RBK-fokus</h3>
            <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3">
              <div className="space-y-2">
                {rbkFocusItems.map((item) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`block rounded-lg border px-3 py-2 cursor-pointer transition ${
                        isChecked
                          ? "border-amber-300 bg-amber-100/70"
                          : "border-amber-100 bg-white/80"
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
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Godfoten: angrepspostulatene</h3>
            <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3">
              <div className="space-y-2">
                {godfotenAttackPostulates.map((item) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`block rounded-lg border px-3 py-2 cursor-pointer transition ${
                        isChecked
                          ? "border-rose-300 bg-rose-100/70"
                          : "border-rose-100 bg-white/80"
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
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Godfoten: forsvarspostulatene</h3>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
              <div className="space-y-2">
                {godfotenDefensePostulates.map((item) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`block rounded-lg border px-3 py-2 cursor-pointer transition ${
                        isChecked
                          ? "border-emerald-300 bg-emerald-100/70"
                          : "border-emerald-100 bg-white/80"
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
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Drillo: effektiv fotball</h3>
            <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-3">
              <div className="space-y-2">
                {drilloFocusItems.map((item) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`block rounded-lg border px-3 py-2 cursor-pointer transition ${
                        isChecked
                          ? "border-sky-300 bg-sky-100/70"
                          : "border-sky-100 bg-white/80"
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
