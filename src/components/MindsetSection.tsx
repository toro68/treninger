"use client";

import { useState } from "react";

// ============================================
// TYPER
// ============================================

type MindsetCategory = "tankesett" | "tilbakemelding" | "verktoy" | "garderobe";

interface MindsetTip {
  id: string;
  category: MindsetCategory;
  title: string;
  description: string;
  doThis: string;
  dontDoThis?: string;
  example?: string;
}

interface GarderobeQuestion {
  id: string;
  timing: "før" | "underveis" | "etter";
  question: string;
  purpose?: string;
}

// ============================================
// DATA
// ============================================

const mindsetTips: MindsetTip[] = [
  // Tankesett
  {
    id: "tankesett-1",
    category: "tankesett",
    title: "Fra «være god» til «bli bedre»",
    description: "Fokus på å være god skaper stress og behov for å bevise. Fokus på å bli bedre åpner for læring.",
    doThis: "«Er vi her for å bevise at vi er gode, eller for å bli bedre?»",
    dontDoThis: "«Vi må vise at vi er best i dag»",
  },
  {
    id: "tankesett-2",
    category: "tankesett",
    title: "Lærende vs. låst tankesett",
    description: "I låst tankesett er vi opptatt av å bevise. I lærende tankesett er vi opptatt av å utvikle oss.",
    doThis: "«Kanskje jeg kan lære noe av dette?»",
    dontDoThis: "«Vil jeg lykkes eller ikke?»",
  },
  {
    id: "tankesett-3",
    category: "tankesett",
    title: "Trappetrinn-modellen",
    description: "Det som er vanskelig nå, vil være lett om et år. Minn på tidligere progresjon.",
    doThis: "«Hva var vanskelig for et år siden som er lett nå?»",
    dontDoThis: "«Dette burde du kunne nå»",
  },
  
  // Tilbakemelding
  {
    id: "tilbakemelding-1",
    category: "tilbakemelding",
    title: "Ros prosess, ikke talent",
    description: "Ros for talent gjør at spillere gir opp raskere ved motgang. Ros for innsats bygger utholdenhet.",
    doThis: "«Nå ser jeg at du konsentrerer deg godt»",
    dontDoThis: "«Så flink du er» / «Du er et talent»",
    example: "Barn som ble rost for innsats sto i utfordringer lenger enn de som ble rost for intelligens.",
  },
  {
    id: "tilbakemelding-2",
    category: "tilbakemelding",
    title: "Beskriv handlinger, ikke person",
    description: "Konkrete tilbakemeldinger på valg og handlinger gir spilleren noe å jobbe med.",
    doThis: "«Du orienterte deg bra før du mottok»",
    dontDoThis: "«Du er smart»",
  },
  {
    id: "tilbakemelding-3",
    category: "tilbakemelding",
    title: "«Lære å gå»-mentalitet",
    description: "Et barn faller i snitt 212 ganger i døgnet når det lærer å gå. Vi heier likevel.",
    doThis: "Vis at du har overbevisning om at de vil klare det til slutt",
    dontDoThis: "Sukking eller himling med øynene når spilleren bommer",
  },
  
  // Verktøy
  {
    id: "verktoy-1",
    category: "verktoy",
    title: "Still lærende spørsmål",
    description: "Hjernen svarer på det du spør om. Endre spørsmålene for å endre fokus.",
    doThis: "«Hva kan du gjøre annerledes neste gang?»",
    dontDoThis: "«Hvorfor fikk du det ikke til?»",
  },
  {
    id: "verktoy-2",
    category: "verktoy",
    title: "Sett intensjon før økten",
    description: "RAS (hjernens oppmerksomhetsvelger) leter etter det du fokuserer på.",
    doThis: "«I dag skal jeg lete etter modige initiativ»",
    dontDoThis: "Gå inn uten plan for hva du vil se etter",
  },
  {
    id: "verktoy-3",
    category: "verktoy",
    title: "Vær til stede",
    description: "Du kan ikke gi gode prosess-tilbakemeldinger hvis du ikke har sett prosessen.",
    doThis: "Legg bort telefonen og vær mentalt til stede",
    dontDoThis: "Scrolle på mobilen under økten",
  },
  {
    id: "verktoy-4",
    category: "verktoy",
    title: "Bytt spørsmål",
    description: "«Hvorfor er jeg mislykket?» gir dårlige svar. Bedre spørsmål gir bedre svar.",
    doThis: "«Hva er bra med denne situasjonen?»",
    dontDoThis: "«Hvorfor skjer dette alltid?»",
  },
];

const garderobeQuestions: GarderobeQuestion[] = [
  // Før
  {
    id: "før-1",
    timing: "før",
    question: "Hva er din intensjon i dag?",
    purpose: "Setter fokus for økten",
  },
  {
    id: "før-2",
    timing: "før",
    question: "Er vi her for å bevise at vi er gode, eller for å bli bedre?",
    purpose: "Skifter fra låst til lærende tankesett",
  },
  {
    id: "før-3",
    timing: "før",
    question: "Hva vil du prøve på i dag, selv om det kanskje ikke går første gang?",
    purpose: "Åpner for å ta sjanser",
  },
  
  // Underveis
  {
    id: "underveis-1",
    timing: "underveis",
    question: "Ok, det funket ikke. Hva gjør du annerledes i neste situasjon?",
    purpose: "Fokuserer på løsning, ikke problem",
  },
  {
    id: "underveis-2",
    timing: "underveis",
    question: "Hva får vi til akkurat nå? Hva fungerer?",
    purpose: "Finner det positive å bygge på",
  },
  
  // Etter
  {
    id: "etter-1",
    timing: "etter",
    question: "Hva var det vanskeligste du prøvde på i dag?",
    purpose: "Roser forsøk uansett utfall",
  },
  {
    id: "etter-2",
    timing: "etter",
    question: "Hva lærte du som du tar med deg videre?",
    purpose: "Forankrer læring",
  },
  {
    id: "etter-3",
    timing: "etter",
    question: "Hvem så en lagkamerat legge ned god innsats i dag?",
    purpose: "Bygger lagkultur",
  },
  {
    id: "etter-4",
    timing: "etter",
    question: "Hvor var du for ett år siden, og hva mestrer du nå?",
    purpose: "Perspektiv ved skuffelse",
  },
];

const trenerSjekkliste = [
  {
    id: "sjekk-1",
    question: "Hva er min intensjon?",
    hint: "Skal jeg være den som bygger trygghet?",
  },
  {
    id: "sjekk-2",
    question: "Er telefonen bortgjemt?",
    hint: "Er jeg 100% til stede?",
  },
  {
    id: "sjekk-3",
    question: "Hva skal jeg se etter?",
    hint: "Feil eller fremgang? (Det du leter etter, finner du.)",
  },
];

// ============================================
// KATEGORI-CONFIG
// ============================================

const categoryConfig: Record<MindsetCategory, { label: string; color: string; bgColor: string }> = {
  tankesett: { label: "Tankesett", color: "text-purple-700", bgColor: "bg-purple-50" },
  tilbakemelding: { label: "Tilbakemelding", color: "text-blue-700", bgColor: "bg-blue-50" },
  verktoy: { label: "Verktøy", color: "text-amber-700", bgColor: "bg-amber-50" },
  garderobe: { label: "Garderobe", color: "text-green-700", bgColor: "bg-green-50" },
};

const timingConfig: Record<string, { label: string; color: string }> = {
  før: { label: "Før trening/kamp", color: "text-blue-600" },
  underveis: { label: "Underveis / i pausen", color: "text-amber-600" },
  etter: { label: "Etter økten", color: "text-green-600" },
};

// ============================================
// KOMPONENTER
// ============================================

const TipCard = ({ tip }: { tip: MindsetTip }) => {
  const [expanded, setExpanded] = useState(false);
  const config = categoryConfig[tip.category];

  return (
    <div className={`rounded-lg border border-zinc-200 ${config.bgColor} p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className={`text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
          <h4 className="mt-1 font-medium text-zinc-900">{tip.title}</h4>
          <p className="mt-1 text-sm text-zinc-600">{tip.description}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-zinc-400 hover:text-zinc-600"
        >
          {expanded ? "−" : "+"}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-2 border-t border-zinc-200 pt-3">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <p className="text-sm text-zinc-700">{tip.doThis}</p>
          </div>
          {tip.dontDoThis && (
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <p className="text-sm text-zinc-500">{tip.dontDoThis}</p>
            </div>
          )}
          {tip.example && (
            <div className="mt-2 rounded bg-white/50 p-2 text-xs text-zinc-600 italic">
              {tip.example}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const GarderobeSection = () => {
  const [activeTiming, setActiveTiming] = useState<"før" | "underveis" | "etter">("før");
  const timings: ("før" | "underveis" | "etter")[] = ["før", "underveis", "etter"];

  const filteredQuestions = garderobeQuestions.filter(q => q.timing === activeTiming);

  return (
    <div className="space-y-4">
      {/* Timing tabs */}
      <div className="flex gap-2">
        {timings.map((timing) => (
          <button
            key={timing}
            onClick={() => setActiveTiming(timing)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${
              activeTiming === timing
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {timingConfig[timing].label}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-2">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="rounded-lg border border-zinc-200 bg-white p-3"
          >
            <p className="font-medium text-zinc-900">«{q.question}»</p>
            {q.purpose && (
              <p className="mt-1 text-xs text-zinc-500">→ {q.purpose}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TrenerSjekkliste = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setChecked(next);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-700">Sjekkliste før garderoben:</p>
      {trenerSjekkliste.map((item) => (
        <label
          key={item.id}
          className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition ${
            checked.has(item.id)
              ? "border-green-300 bg-green-50"
              : "border-zinc-200 bg-white hover:bg-zinc-50"
          }`}
        >
          <input
            type="checkbox"
            checked={checked.has(item.id)}
            onChange={() => toggle(item.id)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-300"
          />
          <div>
            <p className="font-medium text-zinc-900">{item.question}</p>
            <p className="text-sm text-zinc-500">{item.hint}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

// ============================================
// HOVEDKOMPONENT
// ============================================

export const MindsetSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"tips" | "garderobe" | "sjekk">("tips");
  const [activeCategory, setActiveCategory] = useState<MindsetCategory | "alle">("alle");

  const categories: (MindsetCategory | "alle")[] = ["alle", "tankesett", "tilbakemelding", "verktoy"];
  
  const filteredTips = activeCategory === "alle" 
    ? mindsetTips 
    : mindsetTips.filter(t => t.category === activeCategory);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">Mindset og mentaltrening</h3>
          <p className="text-sm text-zinc-500">Tankesett, tilbakemeldinger og garderobepraten</p>
        </div>
        <span className="text-xl text-zinc-400">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="border-t border-zinc-100 p-4">
          {/* Tabs */}
          <div className="mb-4 flex gap-2 border-b border-zinc-100 pb-3">
            <button
              onClick={() => setActiveTab("tips")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                activeTab === "tips"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              Tips
            </button>
            <button
              onClick={() => setActiveTab("garderobe")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                activeTab === "garderobe"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              Garderobepraten
            </button>
            <button
              onClick={() => setActiveTab("sjekk")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                activeTab === "sjekk"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              Sjekkliste
            </button>
          </div>

          {/* Content */}
          {activeTab === "tips" && (
            <div className="space-y-4">
              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      activeCategory === cat
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {cat === "alle" ? "Alle" : categoryConfig[cat].label}
                  </button>
                ))}
              </div>

              {/* Tips grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredTips.map((tip) => (
                  <TipCard key={tip.id} tip={tip} />
                ))}
              </div>

              {/* Kilde */}
              <p className="text-xs text-zinc-400 pt-2">
                Basert på Carol Dwecks forskning om mindset og foredrag av Tom Rudi Veiteberg
              </p>
            </div>
          )}

          {activeTab === "garderobe" && <GarderobeSection />}
          
          {activeTab === "sjekk" && <TrenerSjekkliste />}
        </div>
      )}
    </section>
  );
};

export default MindsetSection;
