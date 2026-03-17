import Image from "next/image";
import { deriveSessionBlocks, recommendedDuration, getUnit, useSessionStore, SessionBlock, DurationUnit, getExerciseFitScore, getActivePlanningSection, getSectionPlayerCounts, type PlanningSectionMode } from "@/store/sessionStore";
import { Exercise, getExerciseCode } from "@/data/exercises";
import { getSessionTheoryCategoryLabel, sessionTheoryItems } from "@/data/sessionTheory";
import { openPrintWindowForSession, PrintablePart } from "@/utils/sessionPrint";
import { buildSharedSessionUrl } from "@/utils/sessionShare";
import { buildSessionParts } from "@/utils/sessionParts";
import { useState, useEffect, useMemo } from "react";

const CATEGORY_LABELS: Record<Exercise["category"], string> = {
  "fixed-warmup": "Skadefri",
  warmup: "Oppvarming",
  aktivisering: "Aktivisering",
  rondo: "Rondo",
  station: "Stasjon",
  game: "Spill",
  cooldown: "Avslutning",
};

type ClipboardCapableNavigator = Navigator & {
  clipboard?: Pick<Clipboard, "writeText">;
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
  const planningSectionMode = useSessionStore((state) => state.planningSectionMode);
  const coachNames = useSessionStore((state) => state.coachNames);
  const sessionTitle = useSessionStore((state) => state.sessionTitle);
  const sessionComment = useSessionStore((state) => state.sessionComment);
  const selectedTheoryIds = useSessionStore((state) => state.selectedTheoryIds);
  const planningSectionTarget = useSessionStore((state) => state.planningSectionTarget);
  const setSessionTitle = useSessionStore((state) => state.setSessionTitle);
  const setSessionComment = useSessionStore((state) => state.setSessionComment);
  const setStationCount = useSessionStore((state) => state.setStationCount);
  const setPlanningSectionMode = useSessionStore((state) => state.setPlanningSectionMode);
  const setPlanningSectionTarget = useSessionStore((state) => state.setPlanningSectionTarget);
  const setPlannedBlocks = useSessionStore((state) => state.setPlannedBlocks);
  const resetPlan = useSessionStore((state) => state.resetPlan);
  const toggleTheory = useSessionStore((state) => state.toggleTheory);
  const savedSessions = useSessionStore((state) => state.savedSessions);
  const activeSavedSessionId = useSessionStore((state) => state.activeSavedSessionId);
  const saveCurrentSession = useSessionStore((state) => state.saveCurrentSession);
  const loadSavedSession = useSessionStore((state) => state.loadSavedSession);
  const deleteSavedSession = useSessionStore((state) => state.deleteSavedSession);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(useSessionStore.persist.hasHydrated());

    const unsubscribeHydrate = useSessionStore.persist.onHydrate(() => {
      setHydrated(false);
    });
    const unsubscribeFinishHydration = useSessionStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return () => {
      unsubscribeHydrate();
      unsubscribeFinishHydration();
    };
  }, []);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [alternativeMenuForBlockId, setAlternativeMenuForBlockId] = useState<string | null>(null);
  const [customizeMenuForBlockId, setCustomizeMenuForBlockId] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<
    "idle" | "copied" | "shared" | "error"
  >("idle");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showCooldown, setShowCooldown] = useState(true);
  const [showSavedSessions, setShowSavedSessions] = useState(false);
  const [sectionCommentEditorForPartKey, setSectionCommentEditorForPartKey] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "loaded" | "deleted" | "error">("idle");

  const activeSavedSession = useMemo(
    () => savedSessions.find((session) => session.id === activeSavedSessionId) ?? null,
    [savedSessions, activeSavedSessionId]
  );
  const savedSessionsButtonLabel = showSavedSessions
    ? "Skjul lagrede"
    : activeSavedSession
      ? "Oppdater lagret økt"
      : "Lagrede økter";

  useEffect(() => {
    if (!activeSavedSession) return;
    setSessionName(activeSavedSession.name);
  }, [activeSavedSession]);

  useEffect(() => {
    if (!activeSavedSession) return;
    setShowSavedSessions(true);
  }, [activeSavedSession]);

  // Grupper blokker i faste deler (matcher kategoriene som vises i UI)
  const parts = useMemo(() => buildSessionParts(sessionBlocks, playerCount), [sessionBlocks, playerCount]);
  const partByGlobalIndex = useMemo(() => {
    const map = new Map<number, typeof parts[number]>();
    parts.forEach((part) => {
      part.blocks.forEach(({ globalIndex }) => {
        map.set(globalIndex, part);
      });
    });
    return map;
  }, [parts]);
  const stationParts = useMemo(
    () => parts.filter((part) => part.baseKey === "stasjoner"),
    [parts]
  );

  const totalMinutes = sessionBlocks.reduce(
    (acc, block) => acc + recommendedDuration(block),
    0
  );
  const activeSection = useMemo(
    () =>
      getActivePlanningSection({
        sessionBlocks,
        playerCount,
        planningSectionMode,
        stationCount,
        planningSectionTarget,
      }),
    [sessionBlocks, playerCount, planningSectionMode, stationCount, planningSectionTarget]
  );
  const nextSectionNumber = parts.length + 1;
  const isIncompleteStationSection =
    planningSectionMode === "stations" &&
    activeSection.selectedCount > 0 &&
    activeSection.selectedCount < activeSection.requiredCount;
  const missingStations = isIncompleteStationSection
    ? activeSection.requiredCount - activeSection.selectedCount
    : 0;
  const isPlanningNextSection = planningSectionTarget === "next-section";
  const explicitSectionTarget =
    planningSectionTarget !== "auto" && planningSectionTarget !== "next-section"
      ? planningSectionTarget
      : null;
  const displayedSectionNumber = activeSection.sectionNumber;
  const displayedPlayerCounts =
    planningSectionMode === "stations" ? activeSection.playerCounts : [playerCount];
  const displayedRequiredCount = activeSection.requiredCount;
  const displayedSelectedCount = activeSection.selectedCount;
  const activeSectionSplitLabel =
    displayedPlayerCounts.length === 1
      ? `${displayedPlayerCounts[0]} spillere sammen`
      : displayedPlayerCounts.join(" + ");
  const showIncompleteStationSection = isIncompleteStationSection && !isPlanningNextSection;

  const getAlternativeExercises = (block: SessionBlock): Exercise[] =>
    (block.alternativeExerciseIds ?? [])
      .map((id) => exerciseLibrary.find((exercise) => exercise.id === id))
      .filter((exercise): exercise is Exercise => !!exercise);

  const updateBlockAtIndex = (
    index: number,
    updater: (block: SessionBlock) => SessionBlock
  ) => {
    const updated = sessionBlocks.map((block, idx) =>
      idx === index ? updater(block) : block
    );
    setPlannedBlocks(updated);
  };

  const getAvailableAlternatives = (block: SessionBlock): Exercise[] => {
    const existing = new Set(block.alternativeExerciseIds ?? []);
    const blockIndex = sessionBlocks.findIndex((entry) => entry.id === block.id);
    const currentPart = partByGlobalIndex.get(blockIndex);
    const relevantPlayersPerStation =
      currentPart?.baseKey === "stasjoner"
        ? Math.max(
            ...getSectionPlayerCounts(
              playerCount,
              "stations",
              currentPart.blocks[0]?.block.sectionStationCount ?? currentPart.blocks.length
            )
          )
        : undefined;

    return exerciseLibrary
      .filter((exercise) => exercise.id !== block.exercise.id)
      .filter((exercise) => !existing.has(exercise.id))
      .sort((a, b) => {
        const aCategoryMatch = a.category === block.exercise.category ? 0 : 1;
        const bCategoryMatch = b.category === block.exercise.category ? 0 : 1;
        if (aCategoryMatch !== bCategoryMatch) return aCategoryMatch - bCategoryMatch;

        const aThemeMatch = a.theme === block.exercise.theme ? 0 : 1;
        const bThemeMatch = b.theme === block.exercise.theme ? 0 : 1;
        if (aThemeMatch !== bThemeMatch) return aThemeMatch - bThemeMatch;

        const aFit = getExerciseFitScore(a, playerCount, relevantPlayersPerStation);
        const bFit = getExerciseFitScore(b, playerCount, relevantPlayersPerStation);
        if (aFit !== bFit) return aFit - bFit;

        const aDurationDiff = Math.abs(a.duration - block.exercise.duration);
        const bDurationDiff = Math.abs(b.duration - block.exercise.duration);
        if (aDurationDiff !== bDurationDiff) return aDurationDiff - bDurationDiff;

        return a.name.localeCompare(b.name, "nb");
      });
  };

  const handleDurationChange = (index: number, value: number) => {
    if (Number.isNaN(value) || value <= 0) return;
    updateBlockAtIndex(index, (block) => ({ ...block, customDuration: value }));
  };

  const handleUnitChange = (index: number, unit: DurationUnit) => {
    updateBlockAtIndex(index, (block) => ({ ...block, customUnit: unit }));
  };

  const handleBlockTextChange = (
    index: number,
    field: "customTitle" | "customComment",
    value: string
  ) => {
    updateBlockAtIndex(index, (block) => ({
      ...block,
      [field]: value.trim() ? value : undefined,
    }));
  };

  const handleSectionCommentChange = (partKey: string, value: string) => {
    const part = parts.find((entry) => entry.key === partKey);
    if (!part) return;

    const blockIndexes = new Set(part.blocks.map(({ globalIndex }) => globalIndex));
    const normalizedValue = value.trim() ? value : undefined;

    setPlannedBlocks(
      sessionBlocks.map((block, index) =>
        blockIndexes.has(index)
          ? {
              ...block,
              sectionComment: normalizedValue,
            }
          : block
      )
    );
  };

  const toggleCoachAssignment = (index: number, coachName: string) => {
    updateBlockAtIndex(index, (block) => {
      const nextCoachNames = new Set(block.assignedCoachNames ?? []);
      if (nextCoachNames.has(coachName)) {
        nextCoachNames.delete(coachName);
      } else {
        nextCoachNames.add(coachName);
      }

      const assignedCoachNames = [...nextCoachNames];
      return {
        ...block,
        assignedCoachNames: assignedCoachNames.length > 0 ? assignedCoachNames : undefined,
      };
    });
  };

  const toggleStationRoundStart = (index: number) => {
    const block = sessionBlocks[index];
    const isStationBlock =
      block?.planningMode === "station" ||
      (block?.planningMode === undefined && block?.exercise.category === "station");
    if (!block || !isStationBlock) return;

    const previousBlock = sessionBlocks[index - 1];
    const previousIsStationBlock =
      previousBlock?.planningMode === "station" ||
      (previousBlock?.planningMode === undefined && previousBlock?.exercise.category === "station");
    if (!previousBlock || !previousIsStationBlock) return;

    updateBlockAtIndex(index, (currentBlock) => ({
      ...currentBlock,
      stationRoundStart: currentBlock.stationRoundStart ? undefined : true,
    }));
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
    setCustomizeMenuForBlockId((current) =>
      current === removed?.id ? null : current
    );
    if (removed && !removed.exercise.alwaysIncluded) {
      toggleExercise(removed.exercise.id);
    }
  };

  const resolvedSessionTitle = sessionTitle.trim() || "Treningsøkt";

  const buildShortSummary = () => {
    return parts
      .map((part) => {
        const header = `${part.title}${part.subtitle ? ` (${part.subtitle})` : ""}`;
        const sectionComment = part.sectionComment?.trim()
          ? `\nKommentar til seksjon: ${part.sectionComment.trim()}`
          : "";
        const blockLines = part.blocks.map(({ block, globalIndex }) => {
          const title = block.customTitle?.trim() || block.exercise.name;
          const comment = block.customComment?.trim();
          const alternatives = getAlternativeExercises(block);
          const alternativeText =
            alternatives.length > 0
              ? ` (alt: ${alternatives.map((exercise) => exercise.name).join(" / ")})`
              : "";
          const coachText =
            block.assignedCoachNames && block.assignedCoachNames.length > 0
              ? ` [ansvar: ${block.assignedCoachNames.join(", ")}]`
              : "";
          const commentText = comment ? `\n   Kommentar: ${comment}` : "";
          return `${globalIndex + 1}. [${getExerciseCode(block.exercise)}] ${title} – ${recommendedDuration(block)} ${getUnit(block)}${alternativeText}${coachText}${commentText}`;
        });

        return `${header}${sectionComment}\n${blockLines.join("\n")}`;
      })
      .join("\n\n");
  };

  const buildFullSummary = () => {
    let result = "";

    parts.forEach((part) => {
      if (part.blocks.length === 0) return;

      result += `\n${part.title.toUpperCase()}\n`;
      result += "─".repeat(20) + "\n";
      if (part.sectionComment?.trim()) {
        result += `Kommentar til seksjon: ${part.sectionComment.trim()}\n`;
      }

      part.blocks.forEach(({ block }, blockIndex) => {
        const duration = recommendedDuration(block);
        const unit = getUnit(block);
        const title = block.customTitle?.trim() || block.exercise.name;
        const comment = block.customComment?.trim();
        const alternatives = getAlternativeExercises(block);
        const stationLabel = part.baseKey === "stasjoner" ? `Stasjon ${blockIndex + 1}: ` : "";
        result += `\n${stationLabel}[${getExerciseCode(block.exercise)}] ${title} (${duration} ${unit})\n`;
        if (title !== block.exercise.name) {
          result += `Basert på: ${block.exercise.name}\n`;
        }
        if (block.assignedCoachNames?.length) {
          result += `Ansvar: ${block.assignedCoachNames.join(", ")}\n`;
        }
        if (block.exercise.description.trim()) {
          result += `${block.exercise.description}\n`;
        }
        if (comment) {
          result += `\nKommentar:\n${comment}\n`;
        }

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
      sessionTitle,
      sessionComment,
      playerCount,
      stationCount,
      coachNames,
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
    const commentSection = sessionComment.trim() ? `${sessionComment.trim()}\n\n` : "";
    const sharePayload = `${resolvedSessionTitle} (${totalMinutes} min)\n${commentSection}${summary}`;

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
      sectionComment: part.sectionComment,
      baseKey: part.baseKey,
      blocks: part.blocks.map(({ block }) => block),
    }));

    try {
      openPrintWindowForSession({
        parts: printableParts,
        sessionTitle,
        sessionComment,
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

    if (sessionName.trim()) {
      setSessionName(sessionName.trim());
    }
    setShowSavedSessions(true);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const handleLoadSession = (id: string) => {
    const ok = loadSavedSession(id);
    if (ok) {
      const loadedSession = savedSessions.find((session) => session.id === id);
      if (loadedSession) {
        setSessionName(loadedSession.name);
      }
    }
    setSaveStatus(ok ? "loaded" : "error");
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const handleDeleteSession = (id: string) => {
    deleteSavedSession(id);
    setSaveStatus("deleted");
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const hasContent = sessionBlocks.length > 0;
  const coachSummaryLabel = coachNames.length === 1 ? "Trener på økta" : "Trenere på økta";

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
            {savedSessionsButtonLabel}
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

      <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Deltakere</p>
            <p className="mt-1 text-sm text-zinc-700">{playerCount} spillere</p>
          </div>
          <div className="min-w-0 sm:max-w-[70%]">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{coachSummaryLabel}</p>
            {coachNames.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {coachNames.map((coachName) => (
                  <span
                    key={coachName}
                    className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700"
                  >
                    {coachName}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-sm text-zinc-500">Ingen trenere lagt til ennå.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50/70 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Seksjon {displayedSectionNumber}</h3>
            <p className="text-xs text-zinc-600">
              Velg om denne delen av økta skal være én felles øvelse eller {" "}
              {"2–4"} parallelle stasjoner. Biblioteket til venstre filtreres mot {activeSectionSplitLabel}.
            </p>
          </div>
          <span className="text-xs font-medium text-sky-800">
            {planningSectionMode === "stations"
              ? `${displayedSelectedCount}/${displayedRequiredCount} stasjoner valgt`
              : "1 øvelse for alle"}
          </span>
        </div>
        {stationParts.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {stationParts.map((part) => {
              const partTarget = `section-${part.orderNumber}` as const;
              const isSelected =
                planningSectionTarget === partTarget ||
                (planningSectionTarget === "auto" && displayedSectionNumber === part.orderNumber && !isPlanningNextSection);

              return (
                <button
                  key={part.key}
                  type="button"
                  onClick={() => setPlanningSectionTarget(partTarget)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    isSelected
                      ? "border-amber-700 bg-amber-700 text-white"
                      : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                  }`}
                >
                  {`Rediger seksjon ${part.orderNumber}`}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPlanningSectionTarget("next-section")}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                isPlanningNextSection
                  ? "border-sky-700 bg-sky-700 text-white"
                  : "border-sky-200 bg-white text-sky-900 hover:border-sky-400"
              }`}
            >
              {`Planlegg seksjon ${parts.length + 1}`}
            </button>
          </div>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          {([
            { mode: "single", label: "1 øvelse" },
            { mode: "stations", label: "2 stasjoner", count: 2 },
            { mode: "stations", label: "3 stasjoner", count: 3 },
            { mode: "stations", label: "4 stasjoner", count: 4 },
          ] as Array<{ mode: PlanningSectionMode; label: string; count?: number }>).map((option) => {
            const isActive =
              option.mode === planningSectionMode &&
              (option.mode !== "stations" || option.count === stationCount);
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => {
                  setPlanningSectionMode(option.mode);
                  if (option.count) {
                    setStationCount(option.count);
                  }
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-sky-200 bg-white text-sky-900 hover:border-sky-400"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {planningSectionMode === "stations" ? (
          <p className="mt-2 text-xs text-sky-900">Fordeling i denne seksjonen: {displayedPlayerCounts.join(" + ")} spillere.</p>
        ) : null}
        {showIncompleteStationSection ? (
          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-3 text-xs text-amber-950">
            <p className="font-semibold">Seksjonen er ikke ferdig ennå.</p>
            <p className="mt-1">
              Du har valgt {activeSection.selectedCount} av {activeSection.requiredCount} stasjoner. Neste valg blir stasjon {activeSection.selectedCount + 1}, og det mangler {missingStations} stasjon{missingStations === 1 ? "" : "er"} før neste seksjon starter.
            </p>
          </div>
        ) : null}
        {isPlanningNextSection ? (
          <div className="mt-3 rounded-2xl border border-sky-200 bg-white/80 px-3 py-3 text-xs text-sky-950">
            <p className="font-semibold">Du planlegger neste seksjon eksplisitt.</p>
            <p className="mt-1">
              Endringer i antall stasjoner gjelder seksjon {displayedSectionNumber}. Forrige uferdige seksjon blir ikke endret før du velger å redigere den eksplisitt.
            </p>
          </div>
        ) : explicitSectionTarget ? (
          <div className="mt-3 rounded-2xl border border-amber-200 bg-white/80 px-3 py-3 text-xs text-amber-950">
            <p className="font-semibold">Du redigerer en valgt seksjon eksplisitt.</p>
            <p className="mt-1">
              Endringer i antall stasjoner og nye valg fra biblioteket går til seksjon {displayedSectionNumber} til du velger en annen seksjon.
            </p>
          </div>
        ) : null}
      </div>

      {hasContent ? (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Tilpass øktplanen</h3>
              <p className="text-xs text-zinc-600">
                Legg inn egen tittel og en kort kommentar som følger lagring, deling og utskrift.
              </p>
            </div>
            <span className="text-xs text-amber-900">Vises i fullversjonen</span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <label className="flex flex-col gap-1.5 text-xs font-medium text-zinc-700">
              Økttittel
              <input
                type="text"
                value={sessionTitle}
                onChange={(event) => setSessionTitle(event.target.value)}
                placeholder="F.eks. Angrep mot samlet forsvar"
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm font-normal text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-medium text-zinc-700">
              Kommentar til hele økta
              <textarea
                value={sessionComment}
                onChange={(event) => setSessionComment(event.target.value)}
                rows={3}
                placeholder="Hva vil du justere, vektlegge eller minne trenerteamet på?"
                className="resize-y rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm font-normal text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>
          </div>
        </div>
      ) : null}

      {showSavedSessions && (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-3">
          {activeSavedSession ? (
            <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
              Redigerer lagret økt: <span className="font-semibold">{activeSavedSession.name}</span>. Endringer kan oppdateres direkte.
            </div>
          ) : null}
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
              {activeSavedSession ? "Oppdater lagret økt" : "Lagre økt"}
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Nåværende økt ligger allerede lagret lokalt i nettleseren. Her kan du lagre navngitte økter, oppdatere den du jobber med, og hente dem fram igjen.
          </p>

          <div className="mt-3 space-y-2 border-t border-zinc-200 pt-3">
            {savedSessions.length === 0 ? (
              <p className="text-xs text-zinc-500">Ingen navngitte økter lagret ennå.</p>
            ) : (
              savedSessions.map((savedSession) => (
                <div
                  key={savedSession.id}
                  className={`flex flex-col gap-2 rounded-lg border bg-white p-3 sm:flex-row sm:items-center sm:justify-between ${
                    savedSession.id === activeSavedSessionId ? "border-emerald-300 ring-1 ring-emerald-200" : "border-zinc-200"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{savedSession.name}</p>
                    <p className="text-xs text-zinc-500">
                      {savedSession.playerCount} spillere · seksjonsvalg opptil {savedSession.stationCount} stasjoner · lagret {new Date(savedSession.updatedAt).toLocaleString("nb-NO")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {savedSession.id === activeSavedSessionId ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
                        Aktiv
                      </span>
                    ) : null}
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
          <p className="mt-1 text-xs text-zinc-400">Velg oppsett for seksjonen over, og legg deretter inn øvelse eller stasjoner fra listen til venstre</p>
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
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-800">{part.title}</h3>
                    {part.subtitle && (
                      <span className="text-xs text-zinc-400">{part.subtitle}</span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setSectionCommentEditorForPartKey((current) =>
                          current === part.key ? null : part.key
                        )
                      }
                      className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[11px] text-amber-900 transition hover:border-amber-400"
                    >
                      {sectionCommentEditorForPartKey === part.key || part.sectionComment?.trim()
                        ? "Skjul seksjonskommentar"
                        : "Kommentar til seksjon"}
                    </button>
                  </div>
                )}

                {(part.sectionComment?.trim() || sectionCommentEditorForPartKey === part.key) && !isCollapsible ? (
                  <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                    <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Kommentar til seksjonen
                      <textarea
                        value={part.sectionComment ?? ""}
                        onChange={(event) => handleSectionCommentChange(part.key, event.target.value)}
                        rows={3}
                        placeholder="Praktiske beskjeder, fokus eller coaching som gjelder hele seksjonen"
                        className="resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-zinc-900 focus:border-amber-500 focus:outline-none"
                      />
                    </label>
                  </div>
                ) : null}

                {isVisible && (
                  <>
                    {part.blocks.length === 0 ? (
                      <p className="text-xs text-zinc-400 italic pl-2">Ingen valgt</p>
                    ) : (
                      <div className="space-y-1.5">
                        {part.blocks.map(({ block, globalIndex }, blockIndex) => (
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
                                {(() => {
                                  const alternativeExercises = getAlternativeExercises(block);
                                  const availableAlternatives = getAvailableAlternatives(block);

                                  return (
                                    <>
                                {part.baseKey === "stasjoner" ? (
                                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                                    {`Stasjon ${blockIndex + 1}`}
                                  </p>
                                ) : null}
                                <p className="text-sm text-zinc-900 truncate">
                                  <span className="inline-flex items-center justify-center min-w-[24px] h-5 px-1 rounded bg-zinc-200 text-[10px] font-medium text-zinc-600 mr-1.5">
                                    {getExerciseCode(block.exercise)}
                                  </span>
                                  {block.customTitle?.trim() || block.exercise.name}
                                </p>
                                {block.customTitle?.trim() && block.customTitle.trim() !== block.exercise.name ? (
                                  <p className="mt-1 text-xs text-zinc-500">Basert på: {block.exercise.name}</p>
                                ) : null}
                                {block.exercise.category === "fixed-warmup" ? (
                                  <div className="mt-2 flex flex-wrap gap-1.5">
                                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-900">
                                      Spillerstyrt
                                    </span>
                                  </div>
                                ) : null}
                                {block.assignedCoachNames?.length ? (
                                  <div className="mt-2 flex flex-wrap gap-1.5">
                                    {block.assignedCoachNames.map((coachName) => (
                                      <span
                                        key={coachName}
                                        className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] font-medium text-sky-900"
                                      >
                                        {coachName}
                                      </span>
                                    ))}
                                  </div>
                                ) : null}
                                {block.customComment?.trim() ? (
                                  <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-950">
                                    <span className="font-semibold">Kommentar:</span> {block.customComment.trim()}
                                  </div>
                                ) : null}
                                {alternativeExercises.length > 0 && (
                                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                                      Alternativer til denne øvelsen
                                    </p>
                                    <div className="mt-2 space-y-2">
                                      {alternativeExercises.map((exercise) => (
                                        <div
                                          key={exercise.id}
                                          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-100 bg-white px-3 py-2 text-xs text-amber-950"
                                        >
                                          <div className="min-w-0">
                                            <p className="font-medium text-zinc-900">
                                              <span className="mr-1.5 inline-flex min-w-[24px] items-center justify-center rounded bg-amber-100 px-1 py-0.5 text-[10px] font-semibold text-amber-900">
                                                {getExerciseCode(exercise)}
                                              </span>
                                              {exercise.name}
                                            </p>
                                            <p className="mt-1 text-[11px] text-zinc-500">
                                              {CATEGORY_LABELS[exercise.category]} · {exercise.theme}
                                            </p>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => removeAlternativeExercise(globalIndex, exercise.id)}
                                            className="rounded-full border border-amber-200 bg-white px-2 py-1 text-[11px] text-amber-900 transition hover:border-amber-400"
                                            title="Fjern alternativ"
                                          >
                                            Fjern
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {!block.exercise.alwaysIncluded && (
                                  <div className="mt-2 flex flex-wrap items-center gap-2">
                                    {block.exercise.category === "station" &&
                                    globalIndex > 0 &&
                                    sessionBlocks[globalIndex - 1]?.exercise.category === "station" ? (
                                      <button
                                        type="button"
                                        onClick={() => toggleStationRoundStart(globalIndex)}
                                        className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                                          block.stationRoundStart
                                            ? "border-sky-300 bg-sky-50 text-sky-900"
                                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                                        }`}
                                      >
                                        {block.stationRoundStart ? "Slå sammen med forrige runde" : "Ny stasjonsrunde"}
                                      </button>
                                    ) : null}
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
                                        <option value="">Velg alternativ fra hele biblioteket</option>
                                        {Object.entries(
                                          availableAlternatives.reduce<Record<string, Exercise[]>>((groups, exercise) => {
                                            const label = CATEGORY_LABELS[exercise.category];
                                            groups[label] ??= [];
                                            groups[label].push(exercise);
                                            return groups;
                                          }, {})
                                        ).map(([label, exercises]) => (
                                          <optgroup key={label} label={label}>
                                            {exercises.map((exercise) => (
                                              <option key={exercise.id} value={exercise.id}>
                                                {getExerciseCode(exercise)} {exercise.name}
                                              </option>
                                            ))}
                                          </optgroup>
                                        ))}
                                      </select>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setCustomizeMenuForBlockId((current) =>
                                          current === block.id ? null : block.id
                                        )
                                      }
                                      className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[11px] text-amber-900 transition hover:border-amber-400"
                                    >
                                      {customizeMenuForBlockId === block.id ? "Skjul tekstfelt" : "Tilpass tekst"}
                                    </button>
                                  </div>
                                )}
                                {block.exercise.alwaysIncluded ? (
                                  <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setCustomizeMenuForBlockId((current) =>
                                          current === block.id ? null : block.id
                                        )
                                      }
                                      className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[11px] text-amber-900 transition hover:border-amber-400"
                                    >
                                      {customizeMenuForBlockId === block.id ? "Skjul tekstfelt" : "Tilpass tekst"}
                                    </button>
                                  </div>
                                ) : null}
                                {(customizeMenuForBlockId === block.id || block.customTitle?.trim() || block.customComment?.trim()) ? (
                                  <div className="mt-3 rounded-xl border border-amber-200 bg-white p-3">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                      <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                                        Egen tittel
                                        <input
                                          type="text"
                                          value={block.customTitle ?? ""}
                                          onChange={(event) =>
                                            handleBlockTextChange(globalIndex, "customTitle", event.target.value)
                                          }
                                          placeholder={block.exercise.name}
                                          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-normal normal-case tracking-normal text-zinc-900 focus:border-amber-500 focus:outline-none"
                                        />
                                      </label>
                                      <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2">
                                        Kommentar til blokka
                                        <textarea
                                          value={block.customComment ?? ""}
                                          onChange={(event) =>
                                            handleBlockTextChange(globalIndex, "customComment", event.target.value)
                                          }
                                          rows={3}
                                          placeholder="Tilpasninger, fokus eller praktiske beskjeder for denne øvelsen"
                                          className="resize-y rounded-lg border border-zinc-200 px-3 py-2 text-sm font-normal normal-case tracking-normal text-zinc-900 focus:border-amber-500 focus:outline-none"
                                        />
                                      </label>
                                    </div>
                                  </div>
                                ) : null}
                                {coachNames.length > 0 && block.exercise.category !== "fixed-warmup" ? (
                                  <div className="mt-3 rounded-xl border border-zinc-200 bg-white/80 p-2.5">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                                      Ansvarlige trenere
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {coachNames.map((coachName) => {
                                        const checked = block.assignedCoachNames?.includes(coachName) ?? false;
                                        return (
                                          <label
                                            key={coachName}
                                            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] transition ${
                                              checked
                                                ? "border-sky-300 bg-sky-50 text-sky-900"
                                                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                                            }`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={checked}
                                              onChange={() => toggleCoachAssignment(globalIndex, coachName)}
                                              className="h-3.5 w-3.5 rounded border-zinc-300 text-sky-600 focus:ring-sky-500"
                                            />
                                            <span>{coachName}</span>
                                          </label>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ) : null}
                                    </>
                                  );
                                })()}
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
                        {isIncompleteStationSection && part === parts[parts.length - 1] && part.baseKey === "stasjoner"
                          ? Array.from({ length: missingStations }, (_, index) => {
                              const stationNumber = activeSection.selectedCount + index + 1;
                              return (
                                <div
                                  key={`missing-station-${stationNumber}`}
                                  className="rounded-lg border border-dashed border-amber-300 bg-amber-50/70 px-3 py-3 text-xs text-amber-950"
                                >
                                  <p className="font-semibold uppercase tracking-wide">Stasjon {stationNumber}</p>
                                  <p className="mt-1 text-amber-800">Ikke valgt ennå. Velg en øvelse fra biblioteket for å fullføre seksjonen.</p>
                                </div>
                              );
                            })
                          : null}
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

                    {item.imageUrl ? (
                      <div className="mt-3 overflow-hidden rounded-lg border border-sky-100 bg-sky-50">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={960}
                          height={640}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    ) : null}

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
