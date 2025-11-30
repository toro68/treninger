import { recommendedDuration, getUnit, useSessionStore, SessionBlock, DurationUnit } from "@/store/sessionStore";
import { getExerciseCode } from "@/data/exercises";
import { openPrintWindowForSession, PrintablePart } from "@/utils/sessionPrint";
import { useState, useMemo } from "react";

type ClipboardCapableNavigator = Navigator & {
  clipboard?: Pick<Clipboard, "writeText">;
};

type SessionPart = {
  key: string;
  title: string;
  subtitle: string;
  blocks: { block: SessionBlock; globalIndex: number }[];
};

export const SessionTimeline = () => {
  const generateSession = useSessionStore((state) => state.generateSession);
  const playerCount = useSessionStore((state) => state.playerCount);
  const setPlannedBlocks = useSessionStore((state) => state.setPlannedBlocks);
  const resetPlan = useSessionStore((state) => state.resetPlan);

  // Generer sessionBlocks når avhengighetene endres
  const sessionBlocks = useMemo(() => {
    return generateSession();
  }, [generateSession]);

  const [hydrated, setHydrated] = useState(false);

  // Hydration check - runs once on mount
  if (typeof window !== "undefined" && !hydrated) {
    setHydrated(true);
  }

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [shareStatus, setShareStatus] = useState<
    "idle" | "copied" | "shared" | "error"
  >("idle");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showCooldown, setShowCooldown] = useState(true);

  // Grupper blokker i 5 deler
  const parts: SessionPart[] = [
    {
      key: "skadefri",
      title: "1. Skadefri",
      subtitle: "Fast oppvarming",
      blocks: [],
    },
    {
      key: "oppvarming",
      title: "2. Oppvarming",
      subtitle: "Valgfri",
      blocks: [],
    },
    {
      key: "stasjoner",
      title: "3. Stasjoner",
      subtitle: "",
      blocks: [],
    },
    {
      key: "spill",
      title: "4. Spill",
      subtitle: "",
      blocks: [],
    },
    {
      key: "avslutning",
      title: "5. Avslutning",
      subtitle: "Utstrekking og styrke",
      blocks: [],
    },
  ];

  sessionBlocks.forEach((block, index) => {
    const cat = block.exercise.category;
    if (cat === "fixed-warmup") {
      parts[0].blocks.push({ block, globalIndex: index });
    } else if (cat === "warmup") {
      parts[1].blocks.push({ block, globalIndex: index });
    } else if (cat === "station") {
      parts[2].blocks.push({ block, globalIndex: index });
    } else if (cat === "game") {
      parts[3].blocks.push({ block, globalIndex: index });
    } else if (cat === "cooldown") {
      parts[4].blocks.push({ block, globalIndex: index });
    }
  });

  // Oppdater stasjon-subtitle
  const stationCount = parts[2].blocks.length;
  if (stationCount > 0) {
    const playersPerStation = Math.floor(playerCount / stationCount);
    parts[2].subtitle = `${stationCount} øvelse${stationCount > 1 ? "r" : ""} · ${playersPerStation} spillere per stasjon`;
  }

  const totalMinutes = sessionBlocks.reduce(
    (acc, block) => acc + recommendedDuration(block),
    0
  );

  const handleDurationChange = (index: number, value: number) => {
    if (Number.isNaN(value) || value <= 0) return;
    const updated = sessionBlocks.map((block, idx) =>
      idx === index ? { ...block, customDuration: value } : block
    );
    setPlannedBlocks(updated);
  };

  const handleUnitChange = (index: number, unit: DurationUnit) => {
    const updated = sessionBlocks.map((block, idx) =>
      idx === index ? { ...block, customUnit: unit } : block
    );
    setPlannedBlocks(updated);
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...sessionBlocks];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setPlannedBlocks(updated);
    setDragIndex(null);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sessionBlocks.length) return;
    const updated = [...sessionBlocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setPlannedBlocks(updated);
  };

  const removeBlock = (index: number) => {
    const updated = sessionBlocks.filter((_, idx) => idx !== index);
    setPlannedBlocks(updated);
  };

  const buildShortSummary = () => {
    return sessionBlocks
      .map(
        (block, index) =>
          `${index + 1}. [${getExerciseCode(block.exercise)}] ${block.exercise.name} – ${recommendedDuration(block)} ${getUnit(block)}`
      )
      .join("\n");
  };

  const buildFullSummary = () => {
    const partNames = ["SKADEFRI", "OPPVARMING", "STASJONER", "SPILL", "AVSLUTNING"];
    let result = "";

    parts.forEach((part, partIndex) => {
      if (part.blocks.length === 0) return;

      result += `\n${partNames[partIndex]}\n`;
      result += "─".repeat(20) + "\n";

      part.blocks.forEach(({ block }) => {
        const duration = recommendedDuration(block);
        const unit = getUnit(block);
        result += `\n[${getExerciseCode(block.exercise)}] ${block.exercise.name} (${duration} ${unit})\n`;
        result += `${block.exercise.description}\n`;

        if (block.exercise.coachingPoints.length > 0) {
          result += "\nCoaching:\n";
          block.exercise.coachingPoints.forEach((point) => {
            result += `• ${point}\n`;
          });
        }

        if (block.exercise.variations.length > 0) {
          result += "\nVariasjoner:\n";
          block.exercise.variations.forEach((variation) => {
            result += `• ${variation}\n`;
          });
        }
      });
    });

    return result;
  };

  const handleCopy = async (full: boolean) => {
    const summary = full ? buildFullSummary() : buildShortSummary();
    const sharePayload = `Treningsøkt (${totalMinutes} min)\n${summary}`;

    const nav =
      typeof navigator !== "undefined"
        ? (navigator as ClipboardCapableNavigator)
        : undefined;
    try {
      if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(sharePayload);
        setShareStatus("copied");
      } else {
        setShareStatus("error");
      }
    } catch (error) {
      console.error("Copy failed", error);
      setShareStatus("error");
    }

    setShowShareOptions(false);
    setTimeout(() => setShareStatus("idle"), 2500);
  };

  const handlePrint = () => {
    setShowShareOptions(false);
    const printableParts: PrintablePart[] = parts.map((part) => ({
      title: part.title,
      subtitle: part.subtitle,
      blocks: part.blocks.map(({ block }) => block),
    }));

    try {
      openPrintWindowForSession({
        parts: printableParts,
        totalMinutes,
        playerCount,
      });
    } catch (error) {
      console.error("Print failed", error);
      setShareStatus("error");
    }
  };

  const hasContent = sessionBlocks.length > 0;

  if (!hydrated) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Øktplan</h2>
        <p className="mt-4 text-sm text-zinc-500">Laster...</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-zinc-900">Øktplan</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-sm font-semibold text-emerald-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
            </svg>
            {totalMinutes} min
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          <div className="relative">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:border-zinc-400 active:bg-zinc-100"
            >
              Del økt
            </button>
            {showShareOptions && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 min-w-[160px]">
                <div className="px-3 py-1.5 text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Kopier tekst</div>
                <button
                  onClick={() => handleCopy(false)}
                  className="w-full px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                    <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                  </svg>
                  Kort versjon
                </button>
                <button
                  onClick={() => handleCopy(true)}
                  className="w-full px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                    <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                  </svg>
                  Full versjon
                </button>
                <hr className="my-1 border-zinc-100" />
                <div className="px-3 py-1.5 text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Eksporter</div>
                <button
                  onClick={handlePrint}
                  className="w-full px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 14 6v4a1.5 1.5 0 0 1-1.5 1.5H12v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h-.5A1.5 1.5 0 0 1 2 10V6a1.5 1.5 0 0 1 1.5-1.5H4V4Zm1.5 6v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V10h-5Zm5-5.5V4a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0-.5.5v.5h5Z" clipRule="evenodd" />
                  </svg>
                  Skriv ut / PDF
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => resetPlan()}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:border-zinc-400 active:bg-zinc-100"
          >
            Nullstill
          </button>
        </div>
      </div>

      {shareStatus !== "idle" && (
        <p
          className={`mt-2 text-xs ${
            shareStatus === "error" ? "text-red-500" : "text-emerald-600"
          }`}
        >
          {shareStatus === "copied" && "Kopiert til utklippstavle"}
          {shareStatus === "shared" && "Delt"}
          {shareStatus === "error" && "Kunne ikke dele"}
        </p>
      )}

      {!hasContent ? (
        <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 rounded-full bg-zinc-100 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-zinc-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-zinc-600">Start med å velge øvelser</p>
          <p className="mt-1 text-xs text-zinc-400">Marker øvelser fra listen til venstre</p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {parts.map((part) => {
            const isCollapsible = part.key === "avslutning";
            const isVisible = !isCollapsible || showCooldown;

            return (
              <div key={part.key}>
                {isCollapsible ? (
                  <button
                    onClick={() => setShowCooldown(!showCooldown)}
                    className={`flex items-center gap-3 mb-2 w-full rounded-xl border px-3 py-2 text-left transition ${
                      showCooldown
                        ? "border-zinc-200 bg-gradient-to-r from-zinc-50 to-slate-50"
                        : "border-zinc-100 bg-white"
                    }`}
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-800">{part.title}</h3>
                      {part.subtitle && (
                        <span className="text-xs text-zinc-500">{part.subtitle}</span>
                      )}
                    </div>
                    {part.subtitle && (
                      <span className="sr-only">{part.subtitle}</span>
                    )}
                    <span className={`ml-auto text-sm font-semibold transition ${showCooldown ? "text-zinc-600" : "text-zinc-400"}`}>
                      {showCooldown ? "Skjul" : "Vis"}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-zinc-800">{part.title}</h3>
                    {part.subtitle && (
                      <span className="text-xs text-zinc-400">{part.subtitle}</span>
                    )}
                  </div>
                )}

                {isVisible && (
                  <>
                    {part.blocks.length === 0 ? (
                      <p className="text-xs text-zinc-400 italic pl-2">Ingen valgt</p>
                    ) : (
                      <div className="space-y-1.5">
                        {part.blocks.map(({ block, globalIndex }) => (
                          <div
                            key={block.id}
                            role="group"
                            draggable
                            aria-label={`${block.exercise.name} blokk`}
                            onDragStart={() => handleDragStart(globalIndex)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(globalIndex)}
                            className={`flex items-center gap-2 rounded-lg border bg-zinc-50 px-3 py-2 transition ${
                              dragIndex === globalIndex ? "border-black" : "border-zinc-100"
                            }`}
                          >
                            {/* Flytt-knapper for mobil */}
                            <div className="flex flex-col gap-0.5 sm:hidden">
                              <button
                                onClick={() => moveBlock(globalIndex, "up")}
                                disabled={globalIndex === 0}
                                className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs disabled:opacity-30"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => moveBlock(globalIndex, "down")}
                                disabled={globalIndex === sessionBlocks.length - 1}
                                className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs disabled:opacity-30"
                              >
                                ↓
                              </button>
                            </div>

                            <p className="flex-1 text-sm text-zinc-900 truncate">
                              <span className="inline-flex items-center justify-center min-w-[24px] h-5 px-1 rounded bg-zinc-200 text-[10px] font-medium text-zinc-600 mr-1.5">
                                {getExerciseCode(block.exercise)}
                              </span>
                              {block.exercise.name}
                            </p>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <input
                                type="number"
                                min={1}
                                max={99}
                                value={recommendedDuration(block)}
                                onChange={(event) =>
                                  handleDurationChange(globalIndex, Number(event.target.value))
                                }
                                className="w-12 rounded border border-zinc-200 px-1.5 py-1 text-center text-xs focus:border-black focus:outline-none"
                              />
                              <select
                                value={getUnit(block)}
                                onChange={(e) => handleUnitChange(globalIndex, e.target.value as DurationUnit)}
                                className="rounded border border-zinc-200 px-1 py-1 text-xs text-zinc-600 focus:border-black focus:outline-none bg-white cursor-pointer"
                              >
                                <option value="min">min</option>
                                <option value="reps">reps</option>
                              </select>
                              {!block.exercise.alwaysIncluded && (
                                <button
                                  onClick={() => removeBlock(globalIndex)}
                                  className="rounded p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600"
                                  title="Fjern"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
