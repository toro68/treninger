import { deriveSessionBlocks, recommendedDuration, getUnit, useSessionStore, SessionBlock, DurationUnit, getExerciseFitScore, getActivePlanningSection, getOutfieldPlayerCount, getSectionPlayerCounts, type PlanningSectionMode } from "@/store/sessionStore";
import { Exercise, getExerciseCode } from "@/data/exercises";
import { openPrintWindowForSession, PrintablePart } from "@/utils/sessionPrint";
import { buildSharedSessionUrl } from "@/utils/sessionShare";
import { buildSessionParts } from "@/utils/sessionParts";
import {
  buildFullSessionSummary,
  buildSessionShareText,
  buildShortSessionSummary,
  copyTextToClipboard,
  getAlternativeExercises,
  hasSessionCommentSuggestion,
  SESSION_COMMENT_SUGGESTION,
  toggleSessionCommentSuggestion,
  toPrintableParts,
} from "@/utils/sessionTimelineShare";
import {
  addAlternativeExerciseToBlock,
  applySectionCommentToBlocks,
  removeAlternativeExerciseFromBlock,
  removeSessionBlockAtIndex,
  reorderSessionBlocks,
  toggleCoachAssignmentForBlock,
  toggleStationRoundStartForBlock,
  updateSessionBlockAtIndex,
} from "@/utils/sessionTimelineBlocks";
import { SessionTimelineSavedSessionsPanel } from "./SessionTimelineSavedSessionsPanel";
import { SessionTimelineSectionPlanner } from "./SessionTimelineSectionPlanner";
import { SessionTimelineShareMenu } from "./SessionTimelineShareMenu";
import { SessionTimelineTheoryPanel } from "./SessionTimelineTheoryPanel";
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

export const SessionTimeline = () => {
  const selectedExerciseIds = useSessionStore((state) => state.selectedExerciseIds);
  const plannedBlocks = useSessionStore((state) => state.plannedBlocks);
  const exerciseLibrary = useSessionStore((state) => state.exerciseLibrary);
  const sessionBlocks = useMemo(
    () => deriveSessionBlocks({ selectedExerciseIds, exerciseLibrary, plannedBlocks }),
    [selectedExerciseIds, exerciseLibrary, plannedBlocks]
  );
  const playerCount = useSessionStore((state) => state.playerCount);
  const keeperCount = useSessionStore((state) => state.keeperCount);
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

  const fullSessionShareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";

    return buildSharedSessionUrl({
      origin: window.location.origin,
      sessionTitle,
      sessionComment,
      playerCount,
      keeperCount,
      stationCount,
      coachNames,
      selectedExerciseIds,
      selectedTheoryIds,
      plannedBlocks: sessionBlocks,
    });
  }, [sessionTitle, sessionComment, playerCount, keeperCount, stationCount, coachNames, selectedExerciseIds, selectedTheoryIds, sessionBlocks]);

  useEffect(() => {
    if (!activeSavedSession) return;
    setSessionName(activeSavedSession.name);
  }, [activeSavedSession]);

  useEffect(() => {
    if (!activeSavedSession) return;
    setShowSavedSessions(true);
  }, [activeSavedSession]);

  // Grupper blokker i faste deler (matcher kategoriene som vises i UI)
  const outfieldPlayerCount = useMemo(
    () => getOutfieldPlayerCount(playerCount, keeperCount),
    [playerCount, keeperCount]
  );
  const parts = useMemo(() => buildSessionParts(sessionBlocks, outfieldPlayerCount), [sessionBlocks, outfieldPlayerCount]);
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
        keeperCount,
        planningSectionMode,
        stationCount,
        planningSectionTarget,
      }),
    [sessionBlocks, playerCount, keeperCount, planningSectionMode, stationCount, planningSectionTarget]
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

  const updateBlockAtIndex = (
    index: number,
    updater: (block: SessionBlock) => SessionBlock
  ) => {
    const updated = updateSessionBlockAtIndex(sessionBlocks, index, updater);
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
              currentPart.blocks[0]?.block.sectionStationCount ?? currentPart.blocks.length,
              keeperCount
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

    setPlannedBlocks(applySectionCommentToBlocks(sessionBlocks, part, value));
  };

  const toggleCoachAssignment = (index: number, coachName: string) => {
    setPlannedBlocks(toggleCoachAssignmentForBlock(sessionBlocks, index, coachName));
  };

  const toggleStationRoundStart = (index: number) => {
    setPlannedBlocks(toggleStationRoundStartForBlock(sessionBlocks, index));
  };

  const addAlternativeExercise = (index: number, alternativeExerciseId: string) => {
    const updated = addAlternativeExerciseToBlock(sessionBlocks, index, alternativeExerciseId);
    setPlannedBlocks(updated);
    setAlternativeMenuForBlockId(null);
  };

  const removeAlternativeExercise = (index: number, alternativeExerciseId: string) => {
    const updated = removeAlternativeExerciseFromBlock(sessionBlocks, index, alternativeExerciseId);
    setPlannedBlocks(updated);
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const preventNestedDrag = (event: React.SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    const updated = reorderSessionBlocks(sessionBlocks, dragIndex, index);
    setPlannedBlocks(updated);
    setDragIndex(null);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sessionBlocks.length) return;
    const updated = reorderSessionBlocks(sessionBlocks, index, newIndex);
    setPlannedBlocks(updated);
  };

  const toggleExercise = useSessionStore((state) => state.toggleExercise);

  const removeBlock = (index: number) => {
    const removed = sessionBlocks[index];
    const updated = removeSessionBlockAtIndex(sessionBlocks, index);
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

  const playerSummary =
    keeperCount > 0
      ? `${playerCount} spillere (${outfieldPlayerCount} utespillere + ${keeperCount} keepere)`
      : `${playerCount} spillere`;

  const handleCopyShareLink = async () => {
    if (!fullSessionShareUrl) {
      setShareStatus("error");
      return;
    }

    try {
      if (await copyTextToClipboard(fullSessionShareUrl)) {
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
    const summary = full
      ? buildFullSessionSummary({ parts, exerciseLibrary })
      : buildShortSessionSummary({ parts, exerciseLibrary });
    const sharePayload = buildSessionShareText({
      sessionTitle,
      sessionComment,
      totalMinutes,
      playerSummary,
      summary,
    });
    try {
      if (await copyTextToClipboard(sharePayload)) {
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
    const printableParts: PrintablePart[] = toPrintableParts(parts);

    try {
      openPrintWindowForSession({
        parts: printableParts,
        sessionTitle,
        sessionComment,
        totalMinutes,
        playerCount,
        keeperCount,
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
  const hasSuggestedSessionComment = hasSessionCommentSuggestion(sessionComment);

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
          <SessionTimelineShareMenu
            fullSessionShareUrl={fullSessionShareUrl}
            showShareOptions={showShareOptions}
            onToggle={() => setShowShareOptions(!showShareOptions)}
            onClose={() => setShowShareOptions(false)}
            onCopyCompact={() => handleCopy(false)}
            onCopyLink={handleCopyShareLink}
            onPrint={handlePrint}
          />
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

      <SessionTimelineSectionPlanner
        activeSection={activeSection}
        activeSectionSplitLabel={activeSectionSplitLabel}
        displayedPlayerCounts={displayedPlayerCounts}
        displayedRequiredCount={displayedRequiredCount}
        displayedSectionNumber={displayedSectionNumber}
        displayedSelectedCount={displayedSelectedCount}
        explicitSectionTarget={explicitSectionTarget}
        isIncompleteStationSection={isIncompleteStationSection}
        isPlanningNextSection={isPlanningNextSection}
        missingStations={missingStations}
        partsLength={parts.length}
        planningSectionMode={planningSectionMode}
        planningSectionTarget={planningSectionTarget}
        setPlanningSectionMode={setPlanningSectionMode}
        setPlanningSectionTarget={setPlanningSectionTarget}
        setStationCount={setStationCount}
        showIncompleteStationSection={showIncompleteStationSection}
        stationCount={stationCount}
        stationParts={stationParts}
      />

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

          <div className="mt-3 grid gap-3">
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

          <label className="mt-3 inline-flex items-start gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs text-zinc-700">
            <input
              type="checkbox"
              checked={hasSuggestedSessionComment}
              onChange={(event) =>
                setSessionComment(
                  toggleSessionCommentSuggestion(sessionComment, event.target.checked)
                )
              }
              className="mt-0.5 h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
            />
            <span>{SESSION_COMMENT_SUGGESTION}</span>
          </label>
        </div>
      ) : null}

      {showSavedSessions ? (
        <SessionTimelineSavedSessionsPanel
          activeSavedSession={activeSavedSession}
          activeSavedSessionId={activeSavedSessionId}
          savedSessions={savedSessions}
          sessionName={sessionName}
          onSessionNameChange={setSessionName}
          onSaveSession={handleSaveSession}
          onLoadSession={handleLoadSession}
          onDeleteSession={handleDeleteSession}
        />
      ) : null}

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
                                  const alternativeExercises = getAlternativeExercises(
                                    block,
                                    exerciseLibrary
                                  );
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
                                    <div className="grid gap-3">
                                      <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                                        Egen tittel
                                        <input
                                          type="text"
                                          draggable={false}
                                          onDragStart={preventNestedDrag}
                                          onPointerDown={preventNestedDrag}
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
                                          draggable={false}
                                          onDragStart={preventNestedDrag}
                                          onPointerDown={preventNestedDrag}
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
                                              draggable={false}
                                              onDragStart={preventNestedDrag}
                                              onPointerDown={preventNestedDrag}
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
                                  draggable={false}
                                  onDragStart={preventNestedDrag}
                                  onPointerDown={preventNestedDrag}
                                  min={1}
                                  max={99}
                                  value={recommendedDuration(block)}
                                  onChange={(event) =>
                                    handleDurationChange(globalIndex, Number(event.target.value))
                                  }
                                  className="w-12 rounded border border-zinc-200 px-1.5 py-1 text-center text-xs focus:border-black focus:outline-none"
                                />
                                <select
                                  draggable={false}
                                  onDragStart={preventNestedDrag}
                                  onPointerDown={preventNestedDrag}
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

          <SessionTimelineTheoryPanel
            selectedTheoryIds={selectedTheoryIds}
            onToggleTheory={toggleTheory}
          />
        </div>
      )}
    </section>
  );
};
