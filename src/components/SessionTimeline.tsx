import { deriveSessionBlocks, recommendedDuration, getUnit, useSessionStore, SessionBlock, DurationUnit, getExerciseFitScore } from "@/store/sessionStore";
import { Exercise, getExerciseCode } from "@/data/exercises";
import { getSessionTheoryCategoryLabel, sessionTheoryItems } from "@/data/sessionTheory";
import { openPrintWindowForSession, PrintablePart } from "@/utils/sessionPrint";
import { buildSharedSessionUrl } from "@/utils/sessionShare";
import { useState, useEffect, useMemo } from "react";

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
  const selectedExerciseIds = useSessionStore((state) => state.selectedExerciseIds);
  const plannedBlocks = useSessionStore((state) => state.plannedBlocks);
  const exerciseLibrary = useSessionStore((state) => state.exerciseLibrary);
  const sessionBlocks = useMemo(
    () => deriveSessionBlocks({ selectedExerciseIds, exerciseLibrary, plannedBlocks }),
    [selectedExerciseIds, exerciseLibrary, plannedBlocks]
  );
  const playerCount = useSessionStore((state) => state.playerCount);
  const stationCount = useSessionStore((state) => state.stationCount);
  const selectedTheoryIds = useSessionStore((state) => state.selectedTheoryIds);
  const setPlannedBlocks = useSessionStore((state) => state.setPlannedBlocks);
  const resetPlan = useSessionStore((state) => state.resetPlan);
  const toggleTheory = useSessionStore((state) => state.toggleTheory);
  const savedSessions = useSessionStore((state) => state.savedSessions);
  const saveCurrentSession = useSessionStore((state) => state.saveCurrentSession);
  const loadSavedSession = useSessionStore((state) => state.loadSavedSession);
  const deleteSavedSession = useSessionStore((state) => state.deleteSavedSession);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(id);
  }, []);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [alternativeMenuForBlockId, setAlternativeMenuForBlockId] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<
    "idle" | "copied" | "shared" | "error"
  >("idle");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showCooldown, setShowCooldown] = useState(true);
  const [showSavedSessions, setShowSavedSessions] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "loaded" | "deleted" | "error">("idle");

  // Grupper blokker i 6 deler (matcher kategoriene som vises i UI)
  const parts = useMemo<SessionPart[]>(() => {
    const grouped: SessionPart[] = [
      { key: "skadefri",   title: "1. Skadefri",   subtitle: "Fast oppvarming",        blocks: [] },
      { key: "oppvarming", title: "2. Oppvarming",  subtitle: "Valgfri",                blocks: [] },
      { key: "rondo",      title: "3. Rondo",       subtitle: "Valgfri",                blocks: [] },
      { key: "stasjoner",  title: "4. Stasjoner",   subtitle: "",                       blocks: [] },
      { key: "spill",      title: "5. Spill",       subtitle: "",                       blocks: [] },
      { key: "avslutning", title: "6. Avslutning",  subtitle: "Utstrekking og styrke",  blocks: [] },
    ];

    sessionBlocks.forEach((block, index) => {
      const cat = block.exercise.category;
      if (cat === "fixed-warmup")                  grouped[0].blocks.push({ block, globalIndex: index });
      else if (cat === "warmup" || cat === "aktivisering") grouped[1].blocks.push({ block, globalIndex: index });
      else if (cat === "rondo")                    grouped[2].blocks.push({ block, globalIndex: index });
      else if (cat === "station")                  grouped[3].blocks.push({ block, globalIndex: index });
      else if (cat === "game")                     grouped[4].blocks.push({ block, globalIndex: index });
      else if (cat === "cooldown")                 grouped[5].blocks.push({ block, globalIndex: index });
    });

    const stationCount = grouped[3].blocks.length;
    if (stationCount > 0) {
      const playersPerStation = Math.floor(playerCount / stationCount);
      grouped[3].subtitle = `${stationCount} øvelse${stationCount > 1 ? "r" : ""} · ${playersPerStation} spillere per stasjon`;
    }

    return grouped;
  }, [sessionBlocks, playerCount]);

  const totalMinutes = sessionBlocks.reduce(
    (acc, block) => acc + recommendedDuration(block),
    0
  );

  const getAlternativeExercises = (block: SessionBlock): Exercise[] =>
    (block.alternativeExerciseIds ?? [])
      .map((id) => exerciseLibrary.find((exercise) => exercise.id === id))
      .filter((exercise): exercise is Exercise => !!exercise);

  const getAvailableAlternatives = (block: SessionBlock): Exercise[] => {
    const existing = new Set(block.alternativeExerciseIds ?? []);
    const playersPerStation =
      stationCount > 0 ? Math.floor(playerCount / stationCount) : playerCount;
    const relevantPlayersPerStation =
      block.exercise.category === "station" || block.exercise.category === "rondo"
        ? playersPerStation
        : undefined;

    return exerciseLibrary
      .filter((exercise) => exercise.category === block.exercise.category)
      .filter((exercise) => exercise.id !== block.exercise.id)
      .filter((exercise) => !existing.has(exercise.id))
      .sort((a, b) => {
        const aFit = getExerciseFitScore(a, playerCount, relevantPlayersPerStation);
        const bFit = getExerciseFitScore(b, playerCount, relevantPlayersPerStation);
        if (aFit !== bFit) return aFit - bFit;

        const aThemeMatch = a.theme === block.exercise.theme ? 0 : 1;
        const bThemeMatch = b.theme === block.exercise.theme ? 0 : 1;
        if (aThemeMatch !== bThemeMatch) return aThemeMatch - bThemeMatch;

        const aDurationDiff = Math.abs(a.duration - block.exercise.duration);
        const bDurationDiff = Math.abs(b.duration - block.exercise.duration);
        if (aDurationDiff !== bDurationDiff) return aDurationDiff - bDurationDiff;

        return a.name.localeCompare(b.name, "nb");
      })
      .slice(0, 5);
  };

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

  const addAlternativeExercise = (index: number, alternativeExerciseId: string) => {
    if (!alternativeExerciseId) return;
    const updated = sessionBlocks.map((block, idx) => {
      if (idx !== index) return block;
      const nextIds = new Set(block.alternativeExerciseIds ?? []);
      nextIds.add(alternativeExerciseId);
      return {
        ...block,
        alternativeExerciseIds: [...nextIds],
      };
    });
    setPlannedBlocks(updated);
    setAlternativeMenuForBlockId(null);
  };

  const removeAlternativeExercise = (index: number, alternativeExerciseId: string) => {
    const updated = sessionBlocks.map((block, idx) => {
      if (idx !== index) return block;
      const nextIds = (block.alternativeExerciseIds ?? []).filter(
        (id) => id !== alternativeExerciseId
      );
      return {
        ...block,
        alternativeExerciseIds: nextIds.length > 0 ? nextIds : undefined,
      };
    });
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

  const toggleExercise = useSessionStore((state) => state.toggleExercise);

  const removeBlock = (index: number) => {
    const removed = sessionBlocks[index];
    const updated = sessionBlocks.filter((_, idx) => idx !== index);
    setPlannedBlocks(updated);
    setAlternativeMenuForBlockId((current) =>
      current === removed?.id ? null : current
    );
    if (removed && !removed.exercise.alwaysIncluded) {
      toggleExercise(removed.exercise.id);
    }
  };

  const buildShortSummary = () => {
    return sessionBlocks
      .map((block, index) => {
        const alternatives = getAlternativeExercises(block);
        const alternativeText =
          alternatives.length > 0
            ? ` (alt: ${alternatives.map((exercise) => exercise.name).join(" / ")})`
            : "";
        return `${index + 1}. [${getExerciseCode(block.exercise)}] ${block.exercise.name} – ${recommendedDuration(block)} ${getUnit(block)}${alternativeText}`;
      })
      .join("\n");
  };

  const buildFullSummary = () => {
    const partNames = [
      "SKADEFRI",
      "OPPVARMING",
      "RONDO",
      "STASJONER",
      "SPILL",
      "AVSLUTNING",
    ];
    let result = "";

    parts.forEach((part, partIndex) => {
      if (part.blocks.length === 0) return;

      result += `\n${partNames[partIndex]}\n`;
      result += "─".repeat(20) + "\n";

      part.blocks.forEach(({ block }) => {
        const duration = recommendedDuration(block);
        const unit = getUnit(block);
        const alternatives = getAlternativeExercises(block);
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

        if (alternatives.length > 0) {
          result += "\nAlternative øvelser:\n";
          alternatives.forEach((exercise) => {
            result += `• [${getExerciseCode(exercise)}] ${exercise.name}\n`;
          });
        }
      });
    });

    return result;
  };

  const handleCopyShareLink = async () => {
    if (typeof window === "undefined") {
      setShareStatus("error");
      return;
    }

    const shareUrl = buildSharedSessionUrl({
      origin: window.location.origin,
      playerCount,
      stationCount,
      selectedExerciseIds,
      selectedTheoryIds,
      plannedBlocks: sessionBlocks,
    });

    const nav =
      typeof navigator !== "undefined"
        ? (navigator as ClipboardCapableNavigator)
        : undefined;

    try {
      if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(shareUrl);
        setShareStatus("copied");
      } else {
        setShareStatus("error");
      }
    } catch (error) {
      console.error("Share link copy failed", error);
      setShareStatus("error");
    }

    setShowShareOptions(false);
    setTimeout(() => setShareStatus("idle"), 2500);
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
        exerciseLibrary,
      });
    } catch (error) {
      console.error("Print failed", error);
      setShareStatus("error");
    }
  };

  const handleSaveSession = () => {
    const result = saveCurrentSession(sessionName);
    if (!result.ok) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2500);
      return;
    }

    setSessionName("");
    setShowSavedSessions(true);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const handleLoadSession = (id: string) => {
    const ok = loadSavedSession(id);
    setSaveStatus(ok ? "loaded" : "error");
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const handleDeleteSession = (id: string) => {
    deleteSavedSession(id);
    setSaveStatus("deleted");
    setTimeout(() => setSaveStatus("idle"), 2500);
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
          <button
            onClick={() => setShowSavedSessions(!showSavedSessions)}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:border-zinc-400 active:bg-zinc-100"
          >
            {showSavedSessions ? "Skjul lagrede" : "Lagrede økter"}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:border-zinc-400 active:bg-zinc-100"
            >
              Del økt
            </button>
            {showShareOptions && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 min-w-[160px]">
                <div className="px-3 py-1.5 text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Kompakt i planlegger</div>
                <button
                  onClick={() => handleCopy(false)}
                  className="w-full px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                    <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                  </svg>
                  Kopier kompakt tekst
                </button>
                <hr className="my-1 border-zinc-100" />
                <div className="px-3 py-1.5 text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Fullversjon</div>
                <button
                  onClick={handleCopyShareLink}
                  className="w-full px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M7.25 3A2.25 2.25 0 0 0 5 5.25v1.5a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 1 7.25 4.5h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 0 0 1.5h1.5A2.25 2.25 0 0 0 13 8.75v-3.5A2.25 2.25 0 0 0 10.75 3h-3.5ZM3 7.25A2.25 2.25 0 0 1 5.25 5h3.5A2.25 2.25 0 0 1 11 7.25v3.5A2.25 2.25 0 0 1 8.75 13h-3.5A2.25 2.25 0 0 1 3 10.75v-3.5Zm2.25-.75a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75h-3.5Z" clipRule="evenodd" />
                  </svg>
                  Kopier lenke til fullversjon
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

      {(shareStatus !== "idle" || saveStatus !== "idle") && (
        <p
          className={`mt-2 text-xs ${
            shareStatus === "error" || saveStatus === "error" ? "text-red-500" : "text-emerald-600"
          }`}
        >
          {shareStatus === "copied" && "Kopiert til utklippstavle"}
          {shareStatus === "shared" && "Delt"}
          {shareStatus === "error" && "Kunne ikke dele"}
          {saveStatus === "saved" && "Økten er lagret"}
          {saveStatus === "loaded" && "Lagret økt er lastet inn"}
          {saveStatus === "deleted" && "Lagret økt er slettet"}
          {saveStatus === "error" && "Kunne ikke lagre eller laste økt"}
        </p>
      )}

      {showSavedSessions && (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={sessionName}
              onChange={(event) => setSessionName(event.target.value)}
              placeholder="Navn på økten"
              className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900"
            />
            <button
              type="button"
              onClick={handleSaveSession}
              className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-700"
            >
              Lagre økt
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Nåværende økt ligger allerede lagret lokalt i nettleseren. Her kan du i tillegg lagre flere navngitte økter og hente dem fram igjen.
          </p>

          <div className="mt-3 space-y-2 border-t border-zinc-200 pt-3">
            {savedSessions.length === 0 ? (
              <p className="text-xs text-zinc-500">Ingen navngitte økter lagret ennå.</p>
            ) : (
              savedSessions.map((savedSession) => (
                <div
                  key={savedSession.id}
                  className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{savedSession.name}</p>
                    <p className="text-xs text-zinc-500">
                      {savedSession.playerCount} spillere · {savedSession.stationCount} stasjoner · lagret {new Date(savedSession.updatedAt).toLocaleString("nb-NO")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleLoadSession(savedSession.id)}
                      className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700 transition hover:border-zinc-400"
                    >
                      Last inn
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSession(savedSession.id)}
                      className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:border-red-400 hover:bg-red-50"
                    >
                      Slett
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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
                            className={`rounded-lg border bg-zinc-50 px-3 py-2 transition ${
                              dragIndex === globalIndex ? "border-black" : "border-zinc-100"
                            }`}
                          >
                            <div className="flex items-center gap-2">
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

                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-zinc-900 truncate">
                                  <span className="inline-flex items-center justify-center min-w-[24px] h-5 px-1 rounded bg-zinc-200 text-[10px] font-medium text-zinc-600 mr-1.5">
                                    {getExerciseCode(block.exercise)}
                                  </span>
                                  {block.exercise.name}
                                </p>
                                {getAlternativeExercises(block).length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-1.5">
                                    {getAlternativeExercises(block).map((exercise) => (
                                      <span
                                        key={exercise.id}
                                        className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] text-amber-900"
                                      >
                                        <span className="font-medium">Alt:</span>
                                        <span>{getExerciseCode(exercise)} {exercise.name}</span>
                                        <button
                                          type="button"
                                          onClick={() => removeAlternativeExercise(globalIndex, exercise.id)}
                                          className="rounded-full px-1 text-amber-700 hover:bg-amber-100"
                                          title="Fjern alternativ"
                                        >
                                          ×
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {!block.exercise.alwaysIncluded && (
                                  <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setAlternativeMenuForBlockId((current) =>
                                          current === block.id ? null : block.id
                                        )
                                      }
                                      className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] text-zinc-600 transition hover:border-zinc-400"
                                    >
                                      Legg til alternativ
                                    </button>
                                    {alternativeMenuForBlockId === block.id && (
                                      <select
                                        defaultValue=""
                                        onChange={(event) => {
                                          addAlternativeExercise(globalIndex, event.target.value);
                                          event.currentTarget.value = "";
                                        }}
                                        className="max-w-full rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] text-zinc-700 focus:border-black focus:outline-none"
                                      >
                                        <option value="">Velg alternativ i samme kategori</option>
                                        {getAvailableAlternatives(block).map((exercise) => (
                                          <option key={exercise.id} value={exercise.id}>
                                            {getExerciseCode(exercise)} {exercise.name}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 self-start">
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
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}

          <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-800">Teori nederst i fullversjonen</h3>
                <p className="text-xs text-zinc-500">
                  Huk av korte teoribiter du vil ha med som trenernotat og spillerbudskap.
                </p>
              </div>
              <span className="text-xs text-sky-700">
                {selectedTheoryIds.size} valgt
              </span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {sessionTheoryItems.map((item) => {
                const checked = selectedTheoryIds.has(item.id);
                return (
                  <article
                    key={item.id}
                    className={`rounded-xl border px-3 py-2 transition ${
                      checked
                        ? "border-sky-300 bg-white shadow-sm"
                        : "border-sky-100 bg-white/70 hover:border-sky-200"
                    }`}
                  >
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTheory(item.id)}
                        className="mt-0.5 h-4 w-4 rounded border-sky-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-wide text-sky-700">
                          {getSessionTheoryCategoryLabel(item.category)}
                        </span>
                        <span className="mt-0.5 block text-sm font-medium text-zinc-900">{item.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-zinc-600">{item.summary}</span>
                      </span>
                    </label>

                    {item.sections?.length ? (
                      <details className="mt-3 rounded-lg bg-sky-50/70 px-3 py-2 text-sm text-zinc-700">
                        <summary className="cursor-pointer list-none font-medium text-sky-800 marker:hidden">
                          Vis detaljer
                        </summary>
                        <div className="mt-3 space-y-3">
                          {item.sections.map((section) => (
                            <section key={section.title} className="space-y-2">
                              <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                {section.title}
                              </h4>
                              {section.paragraphs?.map((paragraph) => (
                                <p key={paragraph} className="text-xs leading-5 text-zinc-700">
                                  {paragraph}
                                </p>
                              ))}
                              {section.bullets?.length ? (
                                <ul className="space-y-1 text-xs leading-5 text-zinc-700">
                                  {section.bullets.map((bullet) => (
                                    <li key={bullet}>• {bullet}</li>
                                  ))}
                                </ul>
                              ) : null}
                            </section>
                          ))}
                        </div>
                      </details>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
