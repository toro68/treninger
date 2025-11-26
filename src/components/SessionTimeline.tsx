import { recommendedDuration, useSessionStore } from "@/store/sessionStore";
import { useState } from "react";

export const SessionTimeline = () => {
  const generateSession = useSessionStore((state) => state.generateSession);
  const sessionBlocks = generateSession();
  const setPlannedBlocks = useSessionStore((state) => state.setPlannedBlocks);
  const resetPlan = useSessionStore((state) => state.resetPlan);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [shareStatus, setShareStatus] = useState<
    "idle" | "copied" | "shared" | "error"
  >("idle");

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
  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
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

  const planSummary = sessionBlocks
    .map(
      (block, index) =>
        `${index + 1}. ${block.exercise.name} – ${recommendedDuration(block)} min`
    )
    .join("\n");

  const sharePayload = `Treningsøkt (${totalMinutes} min)\n${planSummary}`;

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await navigator.share({ title: "Treningsøkt", text: sharePayload });
        setShareStatus("shared");
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(sharePayload);
        setShareStatus("copied");
      } else {
        setShareStatus("error");
      }
    } catch (error) {
      console.error("Share failed", error);
      setShareStatus("error");
    }

    setTimeout(() => setShareStatus("idle"), 2500);
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Øktplan</h2>
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
          <span>Totalt {totalMinutes} min</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="rounded-full border border-zinc-200 px-3 py-0.5 text-xs text-zinc-600 transition hover:border-zinc-400"
            >
              Del / kopier
            </button>
            <button
              onClick={() => resetPlan()}
              className="rounded-full border border-zinc-200 px-3 py-0.5 text-xs text-zinc-600 transition hover:border-zinc-400"
            >
              Standardrekkefølge
            </button>
          </div>
        </div>
      </div>
      {shareStatus !== "idle" && (
        <p
          className={`mt-3 text-xs ${
            shareStatus === "error" ? "text-red-500" : "text-emerald-600"
          }`}
        >
          {shareStatus === "copied" && "Kopiert til utklippstavle"}
          {shareStatus === "shared" && "Delt via systemdeling"}
          {shareStatus === "error" && "Kunne ikke dele – kopier manuelt"}
        </p>
      )}
      <ol className="mt-4 space-y-3">
        {sessionBlocks.map((block, index) => (
          <li
            key={block.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4"
          >
            <div>
              <p className="text-sm text-zinc-500">{`Steg ${index + 1}`}</p>
              <p className="font-semibold text-zinc-900">{block.exercise.name}</p>
              <p className="text-sm text-zinc-600">{block.exercise.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-sm text-zinc-700">
              <label className="text-xs uppercase tracking-wide text-zinc-500">
                Varighet (min)
                <input
                  type="number"
                  min={5}
                  max={45}
                  value={recommendedDuration(block)}
                  onChange={(event) =>
                    handleDurationChange(index, Number(event.target.value))
                  }
                  className="mt-1 w-20 rounded-lg border border-zinc-200 px-2 py-1 text-right text-sm focus:border-black focus:outline-none"
                />
              </label>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};
