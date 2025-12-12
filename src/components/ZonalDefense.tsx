"use client";

import { useState } from "react";

export const ZonalDefense = ({ defaultOpen = true }: { defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeTab, setActiveTab] = useState<"roller" | "leding" | "kollektiv" | "kompakt" | "fall" | "mellomrom" | "innlegg" | "press" | "unntak">("roller");

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-emerald-200/70 bg-gradient-to-r from-emerald-50 to-green-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Soneforsvar (NFF)</h2>
          <p className="text-xs text-zinc-500">Dybdekunnskap fra Norges Fotballforbund</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Tab Navigation */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {[
              { id: "roller" as const, label: "Roller" },
              { id: "leding" as const, label: "Leding" },
              { id: "kollektiv" as const, label: "Kollektiv" },
              { id: "kompakt" as const, label: "Kompakt" },
              { id: "fall" as const, label: "Når falle" },
              { id: "mellomrom" as const, label: "Mellomrom" },
              { id: "innlegg" as const, label: "Innlegg" },
              { id: "press" as const, label: "Presshøyde" },
              { id: "unntak" as const, label: "Unntak" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  activeTab === tab.id
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Roller Tab */}
          {activeTab === "roller" && (
            <div className="space-y-3">
              {/* F1/F2/F3 oversikt */}
              <div className="rounded-lg border border-zinc-300 bg-gradient-to-r from-zinc-50 to-slate-50 p-4">
                <h4 className="text-sm font-bold text-zinc-900 mb-3">Forsvarsfaser (NFF Landslagsskolen)</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-md bg-emerald-100 p-2 text-xs text-emerald-900">
                    <strong>F1: Presse</strong>
                    <p className="mt-1">Vi er på plass. Motstander kan ikke nå alle prioriterte rom.</p>
                  </div>
                  <div className="rounded-md bg-amber-100 p-2 text-xs text-amber-900">
                    <strong>F2: Hindre tilgang</strong>
                    <p className="mt-1">Vi er delvis på plass. Motstander kan nå prioriterte rom.</p>
                  </div>
                  <div className="rounded-md bg-rose-100 p-2 text-xs text-rose-900">
                    <strong>F3: Hindre mål</strong>
                    <p className="mt-1">Motstander kan skape direkte trusler mot vår boks.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-4">
                <h4 className="text-sm font-bold text-emerald-900 mb-2">
                  Førsteforsvarer (1F) = Signalspiller
                </h4>
                <p className="text-xs text-emerald-800 mb-3">
                  Spilleren nærmest ballfører er førsteforsvarer - den viktigste spilleren i soneforsvaret. 
                  Din handling definerer hva de andre ti spillerne skal gjøre.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-emerald-900">
                  <strong>Før involvering:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Oversikt over ball, medspillere, prioriterte rom og trusler</li>
                    <li>Vurder: &quot;i press&quot; eller &quot;kontrollerer rom&quot;?</li>
                    <li>Velg pressøyeblikk ut fra avstand, motstanders kroppsposisjon, blikk, fot og touch</li>
                    <li>Kontroll på overkroppen for raskt å kunne gå i alle retninger</li>
                  </ul>
                </div>
                <div className="bg-white/60 rounded-md p-2 text-xs text-emerald-900 mt-2">
                  <strong>Under involvering:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Kom tett i press med rett fart, kort ned stegene inn i press</li>
                    <li>Bevisst på rom rundt seg for å stenge av spillpunkter</li>
                    <li>Aktiv armbruk ved duellspill og kroppskontakt</li>
                    <li>Utnytt dårlige, lange og for mange touch</li>
                    <li>Forsøk å ta rommet mellom ballfører og ball</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                <h4 className="text-sm font-bold text-emerald-800 mb-2">
                  Førsteforsvarer – læringsmomenter
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900">
                  <div className="bg-white/60 rounded-md p-2">
                    <strong>Snappe ballen</strong>
                    <p className="text-emerald-700">Bryt ballbanen med riktig timing</p>
                  </div>
                  <div className="bg-white/60 rounded-md p-2">
                    <strong>Takle</strong>
                    <p className="text-emerald-700">Ha sikringsspiller i avpasset avstand</p>
                  </div>
                  <div className="bg-white/60 rounded-md p-2">
                    <strong>Møte feilvendt mottaker</strong>
                    <p className="text-emerald-700">Hold tett press, unngå takling (frispark)</p>
                  </div>
                  <div className="bg-white/60 rounded-md p-2">
                    <strong>Møte rettvendt ballfører</strong>
                    <p className="text-emerald-700">Sideveis kroppsstilling, lavt tyngdepunkt, led i ufarlig retning</p>
                  </div>
                  <div className="bg-white/60 rounded-md p-2">
                    <strong>Ved stor fart/ubalanse</strong>
                    <p className="text-emerald-700">Rygg, led til ufarlig område, grip inn ved scoringsmulighet</p>
                  </div>
                  <div className="bg-white/60 rounded-md p-2">
                    <strong>2v1-situasjon</strong>
                    <p className="text-emerald-700">Rygg mellom angriperne, avskjær pasning</p>
                  </div>
                  <div className="bg-white/60 rounded-md p-2 sm:col-span-2">
                    <strong>Tilbake på rett side</strong>
                    <p className="text-emerald-700">Løp opp ballfører etter å ha blitt passert – kom deg på forsvarssiden igjen</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-600 mt-2 italic">Kilde: Trenerbloggen / NFF</p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="text-sm font-bold text-blue-900 mb-2">
                  Andreforsvarer (2F) = Sikring
                </h4>
                <p className="text-xs text-blue-800 mb-3">
                  Nærmeste spiller til førsteforsvarer. Sikrer på rett side eller dekker rom.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-blue-900">
                  <strong>Hvem sikrer hvem:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Nærmeste midtbane sikrer kant i press</li>
                    <li>Nærmeste midtbane sikrer midtbane i press</li>
                    <li>Nærmeste stopper sikrer back i press</li>
                    <li>Nærmeste stopper sikrer stopper i press</li>
                  </ul>
                </div>
                <div className="bg-white/60 rounded-md p-2 text-xs text-blue-900 mt-2">
                  <strong>Sikringsavstand:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Stor avstand ved høy fart på ballfører</li>
                    <li>Liten avstand når ballfører står stille</li>
                    <li><span className="text-red-700 font-medium">Verst:</span> Når førsteangriperen tar både 1F og 2F i ett jafs!</li>
                  </ul>
                </div>
                <div className="bg-amber-100 rounded-md p-2 text-xs text-amber-900 mt-2">
                  <strong>Unntak nær 16m:</strong> Stoppere blir i boksen - back får sikring fra midtbane eller kant på &quot;feil&quot; side.
                </div>
              </div>

              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="text-sm font-bold text-purple-900 mb-2">
                  Tredjeforsvarer = Romkontroll
                </h4>
                <p className="text-xs text-purple-800 mb-3">
                  Alle andre spillere på forsvarslaget. Dekker rom og/eller tar ut definerte angrepsspillere.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-purple-900">
                  <strong>Kommunikasjon:</strong>
                  <p className="mt-1">
                    Fra keeper → bakre ledd → midtbane → fremre ledd. 
                    &quot;Dekk venstre&quot; bryter pasningsforbindelse inn i mellomrom.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Leding Tab */}
          {activeTab === "leding" && (
            <div className="space-y-3">
              <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4">
                <h4 className="text-sm font-bold text-amber-900 mb-2">
                  Sidelinja er førsteforsvarerens beste venn
                </h4>
                <p className="text-xs text-amber-800">
                  Der er det trangest, og mulighetene for ballvinning øker. Hovedregel: Led ballfører ut mot sidelinja.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <h4 className="text-sm font-bold text-zinc-900 mb-2">Bueløp - ikke rett på!</h4>
                <p className="text-xs text-zinc-700 mb-2">
                  Ta korteste vei mot førsteangriper, MEN: Bruk bueløp for å stenge rommet du vil beskytte.
                </p>
                <div className="bg-white rounded-md p-2 text-xs text-zinc-600">
                  <strong>Eksempel:</strong> Ønsker du ikke pasning på yttersiden/kanten? → Led inn med bueløp.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <h4 className="text-xs font-bold text-green-900 mb-1">Led INN når:</h4>
                  <ul className="text-xs text-green-800 space-y-1 list-disc list-inside">
                    <li>Du har sikring på innsiden</li>
                    <li>Dere er i overtall inne</li>
                    <li>Du vil nekte ytterside-pasning</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                  <h4 className="text-xs font-bold text-orange-900 mb-1">Led UT når:</h4>
                  <ul className="text-xs text-orange-800 space-y-1 list-disc list-inside">
                    <li>Du er alene uten sikring</li>
                    <li>Dere er i undertall sentralt</li>
                    <li>Lede vekk fra dominant motstander</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Kollektiv Tab */}
          {activeTab === "kollektiv" && (
            <div className="space-y-3">
              {/* Konkrete mål */}
              <div className="rounded-lg border-2 border-zinc-300 bg-gradient-to-r from-zinc-50 to-slate-50 p-4">
                <h4 className="text-sm font-bold text-zinc-900 mb-2">Soneforsvar - konkrete avstander</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-emerald-100 rounded-md p-2 text-xs">
                    <strong className="text-emerald-900">Bredde i ledd:</strong>
                    <p className="text-emerald-800">~10 meter mellom spillere. Mindre når ballfører er i leddet.</p>
                  </div>
                  <div className="bg-sky-100 rounded-md p-2 text-xs">
                    <strong className="text-sky-900">Dybde mellom ledd:</strong>
                    <p className="text-sky-800">~25 meter fra toppspiss til bakre ledd. ~30 meter i bredden (halve banen).</p>
                  </div>
                  <div className="bg-amber-100 rounded-md p-2 text-xs">
                    <strong className="text-amber-900">Ball på kant:</strong>
                    <p className="text-amber-800">5-meters bortre linje er rettesnor for motsatt side.</p>
                  </div>
                  <div className="bg-violet-100 rounded-md p-2 text-xs">
                    <strong className="text-violet-900">Midtbane vs bakre:</strong>
                    <p className="text-violet-800">Midtbaneleddet sideforskyver 3-5m mer enn bakre ledd.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
                <h4 className="text-sm font-bold text-sky-900 mb-2">Pumping</h4>
                <p className="text-xs text-sky-800 mb-2">
                  Leddene justerer kontinuerlig opp og ned for å kontrollere rom.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-sky-900">
                  <strong>Rykk ut når angrepslaget:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Slår støttepasning (ikke fare for gjennombrudd)</li>
                    <li>Slår en upresis pasning</li>
                    <li>Nøler eller går seg fast</li>
                  </ul>
                </div>
                <p className="text-xs text-sky-700 mt-2 italic">
                  &quot;Lagets evne til å pushe ut og å pumpe – i riktig øyeblikk – er avgjørende. Her skiller vi klinten fra hveten.&quot; — NFF
                </p>
              </div>

              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h4 className="text-sm font-bold text-indigo-900 mb-2">Sideforskyvning</h4>
                <p className="text-xs text-indigo-800 mb-2">
                  Forskyv kollektivt mot ballsiden. Hele midtbaneleddet og bakre ledd flytter seg som én enhet.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-indigo-900">
                  <strong>Sideforskyving:</strong> ~10m mellom forsvarsspillere. Svært få angrepslag klarer å snu spillet til motsatt side før 1F rekker over.
                </div>
              </div>

              <div className="rounded-lg border border-violet-200 bg-violet-50 p-4">
                <h4 className="text-sm font-bold text-violet-900 mb-2">Konsentrering</h4>
                <p className="text-xs text-violet-800 mb-2">
                  Kort og smalt - krymper motstanderens tid og rom. Jo tettere dere står, desto vanskeligere å spille gjennom.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-violet-900">
                  <strong>NFF-prinsippet:</strong> Jo mindre struktur i laget, desto vanskeligere å gjøre en god førsteforsvarerjobb.
                </div>
              </div>

              <div className="rounded-lg border-2 border-rose-300 bg-rose-50 p-4">
                <h4 className="text-sm font-bold text-rose-900 mb-2">Balanse = Overgangspotensial</h4>
                <p className="text-xs text-rose-800">
                  Et lag i posisjonell balanse lavt på banen er et <strong>fantastisk utgangspunkt for ballvinning og overgang</strong>. 
                  Hvilke angrepslag klarer gjennombrudd mot et lag i balanse? Svært få.
                </p>
              </div>
            </div>
          )}

          {/* Kompakt Tab */}
          {activeTab === "kompakt" && (
            <div className="space-y-3">
              {/* F1 Hovedprinsipp */}
              <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-4">
                <h4 className="text-sm font-bold text-emerald-900 mb-2">F1: Presse – Lede – Styre</h4>
                <p className="text-xs text-emerald-800 mb-2">
                  <strong>Mål:</strong> Vinne ball og hindre at motstander kommer i posisjon til å nå prioriterte rom.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-emerald-900">
                  <strong>Hovedprinsipp:</strong> Hindre motstander i å oppnå numerisk og posisjonelt overtak rundt ballen og i sentrum av banen.
                </div>
              </div>

              <div className="rounded-lg border-2 border-violet-300 bg-violet-50 p-4">
                <h4 className="text-sm font-bold text-violet-900 mb-2">Konsentrering = Kort og Smalt</h4>
                <p className="text-xs text-violet-800 mb-3">
                  Hovedprinsippet i soneforsvar: Krympe motstanderens tid og rom ved å stå tett.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-violet-900">
                  <strong>Jo større konsentrering:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Desto vanskeligere å tre pasninger gjennom ledd</li>
                    <li>Desto vanskeligere med presise gjennombruddspasninger</li>
                    <li>Desto mer tvinges angrepslaget til å spille rundt</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h4 className="text-sm font-bold text-indigo-900 mb-2">Sideforskyvning (Ballorientert)</h4>
                <p className="text-xs text-indigo-800 mb-3">
                  Hele laget forskyver mot ballsiden. Midtbaneleddet og bakre ledd flytter seg som én enhet.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-white/60 rounded-md p-2 text-xs text-indigo-900">
                    <strong>Ball på venstre:</strong>
                    <p className="mt-1">Høyre kant trekker inn mot midten, hele laget forskyver venstre.</p>
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-indigo-900">
                    <strong>Ball sentralt:</strong>
                    <p className="mt-1">Kompakt midt - begge sider klemmer inn.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
                <h4 className="text-sm font-bold text-sky-900 mb-2">Dybde (Leddavstand)</h4>
                <p className="text-xs text-sky-800 mb-2">
                  Avstanden mellom leddene må være kontrollert. For stor avstand = rom i mellomrom.
                  For liten avstand = rom i bakrom.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-sky-900">
                  <strong>Tommelfingerregel:</strong> 10-15 meter mellom leddene. Juster etter press og ballposisjon.
                </div>
              </div>

              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                <h4 className="text-sm font-bold text-teal-900 mb-2">Rett Side av Ball</h4>
                <p className="text-xs text-teal-800 mb-3">
                  Alle spillere må være på rett side - mellom ball og eget mål. 
                  En spiller på feil side ødelegger hele strukturen.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-100 rounded-md p-2 text-xs text-green-900">
                    <strong>✓ Rett side:</strong>
                    <p className="mt-1">Mellom ball og mål. Kan forsvare umiddelbart.</p>
                  </div>
                  <div className="bg-red-100 rounded-md p-2 text-xs text-red-900">
                    <strong>✗ Feil side:</strong>
                    <p className="mt-1">Bak ballen. Må sprinte for å komme i posisjon.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <h4 className="text-sm font-bold text-amber-900 mb-2">Prioriterte Rom å Beskytte</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-red-100 rounded-md p-2 text-xs text-center">
                    <strong className="text-red-900">Bakrom</strong>
                    <p className="text-red-800 mt-1">Beskytt rommet bak ledd</p>
                  </div>
                  <div className="bg-orange-100 rounded-md p-2 text-xs text-center">
                    <strong className="text-orange-900">Mellomrom sentralt</strong>
                    <p className="text-orange-800 mt-1">Nekt rettvendte mottak</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fall Tab - NÅR FALLE */}
          {activeTab === "fall" && (
            <div className="space-y-3">
              <div className="rounded-lg border-2 border-rose-300 bg-rose-50 p-4">
                <h4 className="text-sm font-bold text-rose-900 mb-2">Når skal laget falle?</h4>
                <p className="text-xs text-rose-800 mb-3">
                  Å &quot;falle&quot; betyr at forsvarslinjene trekker seg bakover mot eget mål. 
                  Dette gjøres for å beskytte bakrommet og holde strukturen.
                </p>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h4 className="text-sm font-bold text-red-900 mb-2">Fall når:</h4>
                <ul className="text-xs text-red-800 space-y-2 list-disc list-inside">
                  <li><strong>Ball truer bakrom:</strong> Når motstanderen har ball i posisjon til å spille i bakrommet, må linjene falle for å dekke.</li>
                  <li><strong>Førsteforsvarer blir slått:</strong> Når førsteforsvarer tapte duell eller ble spilt forbi, må andreforsvarer og resten falle tilbake.</li>
                  <li><strong>Motstanderen har fart:</strong> Når angrepsspiller har kontroll og fart fremover, fall for å hindre gjennombrudd.</li>
                  <li><strong>Dere er i undertall:</strong> Ved overganger mot dere, fall tilbake og kjøp tid for at laget skal komme i balanse.</li>
                  <li><strong>Press blir brutt:</strong> Hvis det høye presset glipper, fall organisert ned i lavere blokk.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="text-sm font-bold text-green-900 mb-2">Ikke fall når:</h4>
                <ul className="text-xs text-green-800 space-y-2 list-disc list-inside">
                  <li><strong>Ball spilles bakover:</strong> Når motstander spiller bakover, push-out! Rykk frem og krympe rom.</li>
                  <li><strong>Dere har kontroll:</strong> Når førsteforsvarer har god posisjon og sikring er på plass.</li>
                  <li><strong>Ball er på kant uten fart:</strong> Ballfører har ikke mulighet til å true bakrom direkte.</li>
                  <li><strong>Dere presser høyt:</strong> Ved planlagt høyt press - fall kun hvis presset blir brutt.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <h4 className="text-sm font-bold text-amber-900 mb-2">Hvordan falle riktig</h4>
                <div className="space-y-2 mt-2">
                  <div className="bg-white/60 rounded-md p-2 text-xs text-amber-900">
                    <strong>Fall som en enhet:</strong> Alle linjene faller samtidig. Ikke la ett ledd bli igjen.
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-amber-900">
                    <strong>Hold avstanden:</strong> 10-15 meter mellom leddene, også når dere faller.
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-amber-900">
                    <strong>Falle skrått:</strong> Fall mot ballsiden - ikke rett bakover. Hold sideforskyvningen.
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-amber-900">
                    <strong>Stopp i rett tid:</strong> Ikke fall helt ned i egen 16-meter med mindre det er nødvendig. 
                    Stopp når bakrommet er dekket.
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
                <h4 className="text-sm font-bold text-sky-900 mb-2">Pumping: Dynamisk opp og ned</h4>
                <p className="text-xs text-sky-800 mb-2">
                  God forsvar handler ikke bare om å falle - det handler om å justere kontinuerlig.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-white/60 rounded-md p-2 text-xs text-sky-900">
                    <strong>Push-out:</strong>
                    <p className="mt-1">Ball bakover = linjene rykker frem</p>
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-sky-900">
                    <strong>Fall:</strong>
                    <p className="mt-1">Ball truer bakrom = linjene faller</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mellomrom Tab */}
          {activeTab === "mellomrom" && (
            <div className="space-y-3">
              <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50 p-4">
                <h4 className="text-sm font-bold text-indigo-900 mb-2">Hva er mellomrommet?</h4>
                <p className="text-xs text-indigo-800 mb-3">
                  Mellomrommet er rommet mellom to ledd - typisk mellom midtbaneleddet og forsvarsleddet.
                  Dette er et av de farligste rommene på banen fordi angripere her er vendt mot mål med plass til å akselerere.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-indigo-900">
                  <strong>Hvorfor farlig:</strong> En angriper som mottar ball i mellomrommet har ofte:
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Tid til å vende og se fremover</li>
                    <li>Rom til å drive med ball</li>
                    <li>Mulighet til å spille i bakrommet</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-violet-200 bg-violet-50 p-4">
                <h4 className="text-sm font-bold text-violet-900 mb-2">Hvordan stenge mellomrommet</h4>
                <div className="space-y-2 mt-2">
                  <div className="bg-white/60 rounded-md p-2 text-xs text-violet-900">
                    <strong>1. Kort leddavstand:</strong> Hold 10-15 meter mellom midtbane og forsvar. 
                    Mindre avstand = mindre mellomrom å spille i.
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-violet-900">
                    <strong>2. Sideforskyvning:</strong> Når ballen er på kant, forskyver hele laget mot ballen.
                    Mellomrommet sentralt blir trangt fordi spillere klemmer inn.
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-violet-900">
                    <strong>3. Dekke pasningslinjer:</strong> Tredjeforsvarere dekker rom mellom seg og ballen.
                    Stå slik at du tar ut pasningslinjen til mellomrommet.
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-violet-900">
                    <strong>4. Kommunikasjon:</strong> Keeper og stoppere roper: &quot;Dekk venstre&quot;, &quot;Steng rommet&quot;.
                    Midtbanen justerer etter kommando.
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                <h4 className="text-sm font-bold text-teal-900 mb-2">Når motstander truer mellomrommet</h4>
                <p className="text-xs text-teal-800 mb-2">
                  Hvis motstander har spillere i mellomrommet som er farlige:
                </p>
                <div className="space-y-2 mt-2">
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>Alternativ A - Stopper går ut:</strong> Stopper rykker ut og møter angriperen før de får kontroll.
                    Krever at andre stopper sikrer og at midtbane faller inn.
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>Alternativ B - Midtbane faller:</strong> Sentral midtbane faller ned og dekker rommet.
                    Bedrer strukturen men gir rom foran.
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>Alternativ C - Screene pasningen:</strong> Midtbanespiller posisjonerer seg slik at pasning inn i mellomrom blokkeres.
                    Tvinger ballfører til å spille bredt eller bakover.
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <h4 className="text-sm font-bold text-amber-900 mb-2">Mellomrom vs. Bakrom - balanse</h4>
                <p className="text-xs text-amber-800 mb-2">
                  Det er en avveining: Rykker dere frem for å stenge mellomrom, åpner bakrommet. 
                  Faller dere for å dekke bakrom, åpner mellomrommet.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-amber-900">
                  <strong>Løsningen:</strong> Pumping. Juster kontinuerlig basert på ballposisjon og trussel.
                  Ball bakover = push-out (steng mellomrom). Ball fremover = fall (steng bakrom).
                </div>
              </div>
            </div>
          )}

          {/* Innlegg Tab */}
          {activeTab === "innlegg" && (
            <div className="space-y-3">
              <div className="rounded-lg border-2 border-rose-300 bg-rose-50 p-4">
                <h4 className="text-sm font-bold text-rose-900 mb-2">Forsvarsarbeid før innlegg</h4>
                <p className="text-xs text-rose-800 mb-3">
                  Målet er å hindre innlegget - eller gjøre det så dårlig som mulig.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-rose-900">
                  <strong>Førsteforsvarer på kant:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Press på innleggsfoten</li>
                    <li>Tving innlegger på svak fot</li>
                    <li>Blokkér innlegget</li>
                    <li>Led innover (bort fra innleggsposisjon)</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h4 className="text-sm font-bold text-orange-900 mb-2">Duell FØR duellen</h4>
                <p className="text-xs text-orange-800 mb-2">
                  Gå i kroppen på angriperen <strong>før</strong> innlegget slås. Fjern fart og timing på løpet.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-orange-900">
                  <strong>Ikke vent på ballen:</strong> Finn din mann og hold kontakt hele veien.
                </div>
              </div>

              <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
                <h4 className="text-sm font-bold text-sky-900 mb-2">Sonedekning i boksen</h4>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-red-100 rounded-md p-2 text-xs text-center">
                    <strong className="text-red-900">Første stolpe</strong>
                    <p className="text-red-800 mt-1">Alltid dekket</p>
                  </div>
                  <div className="bg-amber-100 rounded-md p-2 text-xs text-center">
                    <strong className="text-amber-900">Sentralt</strong>
                    <p className="text-amber-800 mt-1">Heading-klar</p>
                  </div>
                  <div className="bg-blue-100 rounded-md p-2 text-xs text-center">
                    <strong className="text-blue-900">Bakre stolpe</strong>
                    <p className="text-blue-800 mt-1">Sikring</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h4 className="text-sm font-bold text-indigo-900 mb-2">Keeperens kommando</h4>
                <p className="text-xs text-indigo-800 mb-2">
                  Keeper eier boksen og kommanderer forsvaret ved innlegg.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-indigo-900">
                  <strong>Keeper roper:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>&quot;Keeper!&quot; = Keeper tar ballen</li>
                    <li>&quot;Vekk!&quot; = Forsvar klarerer</li>
                    <li>&quot;Hold!&quot; = Offside-felle</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <h4 className="text-sm font-bold text-zinc-900 mb-2">Etter innlegget</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-green-100 rounded-md p-2 text-xs text-green-900">
                    <strong>Ved klarering:</strong>
                    <p className="mt-1">Høyt og bredt - ut av faresonen</p>
                  </div>
                  <div className="bg-red-100 rounded-md p-2 text-xs text-red-900">
                    <strong>Ved retur:</strong>
                    <p className="mt-1">Hold markering - ikke slipp mann!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Presshøyde Tab */}
          {activeTab === "press" && (
            <div className="space-y-3">
              <div className="rounded-lg border-2 border-sky-300 bg-sky-50 p-4">
                <h4 className="text-sm font-bold text-sky-900 mb-2">Presshøyde og samstemthet</h4>
                <p className="text-xs text-sky-800 mb-3">
                  Hvor lagpresset settes, avgjøres av flere forhold: Styrkeforhold, motstanders spillestil, og stillingen i kampen.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-sky-900">
                  <strong>Felles forståelse:</strong> Når og hvordan vi setter inn presset og justerer presshøyden er avgjørende for om vi lykkes.
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <h4 className="text-sm font-bold text-emerald-900 mb-2">Høyt press - tvinge langt utspill</h4>
                <p className="text-xs text-emerald-800 mb-2">
                  Forsvarslaget blir mer markeringsorientert i det høye presset. Ta ansvar for spillere foran deg i din sone.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-emerald-900">
                  <strong>Oppskrift mot kort igangsetting:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Steng én side - spiss legger seg på stopper</li>
                    <li>Spiss leder ut, nekter vending via samme stopper</li>
                    <li>Kant på ballside går høyt for ballvinning - led inn</li>
                    <li>Nærmeste midtbane går i press om stopper frispilles</li>
                    <li>Bakre ledd markerer ut og dekker rom</li>
                    <li>Makter angrepslaget å vende? Fall ned i lavere press</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <h4 className="text-sm font-bold text-amber-900 mb-2">Planlagt lavere presshøyde</h4>
                <p className="text-xs text-amber-800 mb-2">
                  Settes på høyde med toppen av angrepslagets midtbanebue.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-amber-900">
                  <strong>Midtbaneleddet:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Spilleren nærmest ballfører presser</li>
                    <li>Ha mindre avstander mellom de som dekker rom</li>
                    <li>Være så smale at de spiller rundt og ikke gjennom</li>
                    <li>100% enige om hvor vi leder</li>
                    <li><strong>Nøkkel:</strong> Ny ballfører → ny spiller som presser</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-violet-200 bg-violet-50 p-4">
                <h4 className="text-sm font-bold text-violet-900 mb-2">Planlagt lavt press</h4>
                <p className="text-xs text-violet-800 mb-2">
                  La det bakre angrepsleddet ha ball. Målet er å få dem til å tre pasning der det er trangest.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-violet-900">
                  <strong>K-5-3-2 lavt press:</strong> Femmeren bak blir til fire når ytre spiller (back) presser angrepskanten. Fire i forsvarsleddet verner rom rundt og i egen 16-meter.
                </div>
                <p className="text-xs text-violet-700 mt-2 italic">
                  &quot;Å kunne ligge lavt og kontrollert krever forståelse av at det lønner seg. Vi har kontroll – her slipper de ikke til!&quot;
                </p>
              </div>

              <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
                <h4 className="text-sm font-bold text-rose-900 mb-2">Når presset glipper - &quot;Golden Moment&quot;</h4>
                <p className="text-xs text-rose-800 mb-2">
                  Når vi mister ballen eller presset glipper: Nærmeste forsvarsspiller må <strong>oppholde</strong>.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-rose-900">
                  <strong>Retningslinjer:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Førsteforsvarer: Opphold - ikke selg deg!</li>
                    <li>Spillere på feil side: Jobb deg ned på rett side</li>
                    <li>Juster alle avstander</li>
                    <li>Vern om bakrom</li>
                    <li><strong>Mål:</strong> Bli smale og trange igjen</li>
                  </ul>
                </div>
                <p className="text-xs text-rose-700 mt-2 italic">
                  &quot;Evnen til å oppholde skiller klinten fra hveten.&quot; — NFF
                </p>
              </div>

              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                <h4 className="text-sm font-bold text-teal-900 mb-2">Å bli spilt lave - slik kommer dere opp</h4>
                <div className="space-y-2 mt-2">
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>1.</strong> Gjør forsvarslaget trangt i både bredde- og lengderetning
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>2.</strong> Spissene (feil side) må vinne klareringsballer - push-out!
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>3.</strong> Ta ut angrepslagets støttespillere - sandwicher
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>4.</strong> Pumping: Skvise rommet ved støttepasninger
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>5.</strong> Dødball (kast på motstanders halvdel) = mulighet til å bite seg fast
                  </div>
                  <div className="bg-white/60 rounded-md p-2 text-xs text-teal-900">
                    <strong>6.</strong> Signalspiller - forstyrr rytmen og få laget til å pumpe etter
                  </div>
                </div>
                <p className="text-xs text-teal-700 mt-2 italic">
                  &quot;Å bli spilt lave er ikke ensbetydende med trøbbel. Er vi gode i det lave presset, gir det muligheter når vi erobrer ballen.&quot;
                </p>
              </div>
            </div>
          )}

          {/* Unntak Tab */}
          {activeTab === "unntak" && (
            <div className="space-y-3">
              <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
                <h4 className="text-sm font-bold text-yellow-900 mb-2">
                  Unntak 1: Back i 1-mot-2
                </h4>
                <p className="text-xs text-yellow-800">
                  Når back er nærmest ballfører men har angrepsspiller på yttersiden: 
                  Dette er ofte en 1-mot-2-situasjon som krever tålmodighet og samhandling.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-yellow-900 mt-2">
                  <strong>Alternativer:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Er det krise? → Gå for ballerobring</li>
                    <li>Ellers? → Opphold (kjøp tid)</li>
                    <li>Kommuniser til stopper/midtbane at de må ta over førsteforsvareroppgaven</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
                <h4 className="text-sm font-bold text-yellow-900 mb-2">
                  Unntak 2: Ikke bytt ved kort pasning
                </h4>
                <p className="text-xs text-yellow-800">
                  Når angrepsspiller fører ball inn i ny sone eller spiller kort pasning: 
                  Ikke hensiktsmessig å bytte førsteforsvarer.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-yellow-900 mt-2">
                  <strong>Regel:</strong> Ikke bytt førsteforsvarerrolle før ballfører har slått en pasning videre - 
                  spesielt viktig når førsteangriper kan avslutte eller slå farlig ball.
                </div>
              </div>

              <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
                <h4 className="text-sm font-bold text-yellow-900 mb-2">
                  Unntak 3: Nær 16-meter
                </h4>
                <p className="text-xs text-yellow-800">
                  Når dere nærmer dere egen 16-meter: Vi vil ikke ha stoppere ut av boksen.
                </p>
                <div className="bg-white/60 rounded-md p-2 text-xs text-yellow-900 mt-2">
                  <strong>Løsninger:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Back må klare seg alene</li>
                    <li>Back får sikring fra nærmeste midtbane</li>
                    <li>Back får hjelp av kant på &quot;feil&quot; side av ballen</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                <h4 className="text-sm font-bold text-teal-900 mb-2">
                  Signalspiller på &quot;tokt&quot;
                </h4>
                <p className="text-xs text-teal-800">
                  Noen ganger sender vi fram en spiller alene for å ødelegge pasningsrytmen eller få laget til å pumpe etter.
                  Da har vi ingen sikringsspiller - men det er planlagt.
                </p>
              </div>
            </div>
          )}

          {/* Footer quote */}
          <div className="rounded-lg bg-zinc-100 p-3 text-center">
            <p className="text-xs text-zinc-600 italic">
              &quot;Godt forsvarsspill er en hedersbetegnelse. Dyrking av statusroller og statusferdigheter gir tap på sikt.&quot;
            </p>
            <p className="text-xs text-zinc-500 mt-1">— NFF Soneforsvar</p>
            <a 
              href="https://tiim.no/artikkel/soneforsvar-fra-prinsipper-til-laeringsmomenter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 hover:text-emerald-700 underline mt-2 inline-block"
            >
              Les mer på tiim.no →
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
