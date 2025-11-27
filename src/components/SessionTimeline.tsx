import { recommendedDuration, useSessionStore, SessionBlock } from "@/store/sessionStore";
import { useState } from "react";

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
  const sessionBlocks = generateSession();
  const playerCount = useSessionStore((state) => state.playerCount);
  const setPlannedBlocks = useSessionStore((state) => state.setPlannedBlocks);
  const resetPlan = useSessionStore((state) => state.resetPlan);

  const [hydrated] = useState(() => typeof window !== "undefined");

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
          `${index + 1}. ${block.exercise.name} – ${recommendedDuration(block)} min`
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
        result += `\n${block.exercise.name} (${duration} min)\n`;
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

  const handleShare = async (full: boolean) => {
    const summary = full ? buildFullSummary() : buildShortSummary();
    const sharePayload = `Treningsøkt (${totalMinutes} min)\n${summary}`;

    const nav =
      typeof navigator !== "undefined"
        ? (navigator as ClipboardCapableNavigator)
        : undefined;
    try {
      if (nav && "share" in nav && typeof nav.share === "function") {
        await nav.share({ title: "Treningsøkt", text: sharePayload });
        setShareStatus("shared");
      } else if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(sharePayload);
        setShareStatus("copied");
      } else {
        setShareStatus("error");
      }
    } catch (error) {
      console.error("Share failed", error);
      setShareStatus("error");
    }

    setShowShareOptions(false);
    setTimeout(() => setShareStatus("idle"), 2500);
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
              Del
            </button>
            {showShareOptions && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                <button
                  onClick={() => handleShare(false)}
                  className="w-full px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50"
                >
                  Kort versjon
                </button>
                <button
                  onClick={() => handleShare(true)}
                  className="w-full px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50"
                >
                  Full versjon
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
          <p className="text-sm font-medium text-zinc-600">Ingen øvelser valgt</p>
          <p className="mt-1 text-xs text-zinc-400">Velg øvelser fra listen for å bygge økten</p>
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
                        ? "border-rose-200/70 bg-gradient-to-r from-rose-50 to-pink-50"
                        : "border-rose-100 bg-white"
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
                    <span className={`ml-auto text-sm font-semibold transition ${showCooldown ? "text-rose-500" : "text-zinc-400"}`}>
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
                              {block.exercise.name}
                            </p>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <input
                                type="number"
                                min={1}
                                max={60}
                                value={recommendedDuration(block)}
                                onChange={(event) =>
                                  handleDurationChange(globalIndex, Number(event.target.value))
                                }
                                className="w-12 rounded border border-zinc-200 px-1.5 py-1 text-center text-xs focus:border-black focus:outline-none"
                              />
                              <span className="text-xs text-zinc-400">min</span>
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
