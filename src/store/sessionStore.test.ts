import { describe, it, expect, beforeEach } from "vitest";
import { filterAndGroupExercises, getActivePlanningSection, getUnit, recommendedDuration, useSessionStore } from "./sessionStore";
import type { Exercise } from "@/data/exercises";
import { buildSessionParts } from "@/utils/sessionParts";

describe("sessionStore", () => {
  beforeEach(() => {
    window.localStorage.removeItem("treninger-session");

    // Reset store state before each test
    useSessionStore.setState({
      sessionTitle: "",
      sessionComment: "",
      playerCount: 16,
      stationCount: 4,
      planningSectionMode: "single",
      coachNames: ["Tor Inge", "Tor Harald", "Dawid", "Rune", "John Arne"],
      selectedExerciseIds: new Set(),
      favoriteIds: new Set(),
      searchQuery: "",
      highlightExerciseId: null,
      plannedBlocks: null,
      customExercises: [],
      exerciseOverrides: {},
      exerciseLibrary: useSessionStore.getState().exerciseLibrary,
      savedSessions: [],
    });
  });

  describe("playerCount", () => {
    it("should have default playerCount of 16", () => {
      const state = useSessionStore.getState();
      expect(state.playerCount).toBe(16);
    });

    it("should update playerCount", () => {
      const { setPlayerCount } = useSessionStore.getState();
      setPlayerCount(20);
      expect(useSessionStore.getState().playerCount).toBe(20);
    });
  });

  describe("stationCount", () => {
    it("should have default stationCount of 4", () => {
      const state = useSessionStore.getState();
      expect(state.stationCount).toBe(4);
    });

    it("should clamp stationCount to section range", () => {
      const { setStationCount } = useSessionStore.getState();
      setStationCount(6);
      expect(useSessionStore.getState().stationCount).toBe(4);
    });
  });

  describe("toggleExercise", () => {
    it("should add exercise id to selectedExerciseIds", () => {
      const { toggleExercise } = useSessionStore.getState();
      toggleExercise("test-id");
      expect(useSessionStore.getState().selectedExerciseIds.has("test-id")).toBe(true);
    });

    it("should remove exercise id if already selected", () => {
      useSessionStore.setState({
        selectedExerciseIds: new Set(["test-id"]),
      });
      const { toggleExercise } = useSessionStore.getState();
      toggleExercise("test-id");
      expect(useSessionStore.getState().selectedExerciseIds.has("test-id")).toBe(false);
    });

    it("should append toggled exercises into the active station section", () => {
      const state = useSessionStore.getState();
      const exercises = state.exerciseLibrary.filter(
        (exercise) => exercise.category === "game"
      );

      expect(exercises.length).toBeGreaterThanOrEqual(2);

      useSessionStore.setState({
        planningSectionMode: "stations",
        stationCount: 2,
      });

      const { toggleExercise } = useSessionStore.getState();
      toggleExercise(exercises[0]!.id);
      toggleExercise(exercises[1]!.id);

      const nextState = useSessionStore.getState();
      const sessionBlocks = nextState.plannedBlocks ?? [];
      const parts = buildSessionParts(sessionBlocks, nextState.playerCount);

      expect(parts.at(-1)?.title).toBe("2. Stasjoner");
      expect(parts.at(-1)?.blocks.map((entry) => entry.block.id)).toEqual([
        exercises[0]!.id,
        exercises[1]!.id,
      ]);
      expect(parts.at(-1)?.blocks.every((entry) => entry.block.planningMode === "station")).toBe(true);
    });

    it("should start a new station section after completing a smaller one even if stationCount changes", () => {
      const state = useSessionStore.getState();
      const exercises = state.exerciseLibrary.filter(
        (exercise) => exercise.category === "game"
      );

      expect(exercises.length).toBeGreaterThanOrEqual(3);

      useSessionStore.setState({
        planningSectionMode: "stations",
        stationCount: 2,
      });

      const { toggleExercise, setStationCount } = useSessionStore.getState();
      toggleExercise(exercises[0]!.id);
      toggleExercise(exercises[1]!.id);

      setStationCount(3);
      toggleExercise(exercises[2]!.id);

      const nextState = useSessionStore.getState();
      const sessionBlocks = nextState.plannedBlocks ?? [];
      const parts = buildSessionParts(sessionBlocks, nextState.playerCount);

      expect(parts.map((part) => part.title)).toEqual([
        "1. Skadefri",
        "2. Stasjoner",
        "3. Stasjoner",
      ]);
      expect(parts[1]?.blocks.map((entry) => entry.block.id)).toEqual([
        exercises[0]!.id,
        exercises[1]!.id,
      ]);
      expect(parts[2]?.blocks.map((entry) => entry.block.id)).toEqual([
        exercises[2]!.id,
      ]);
      expect(parts[2]?.subtitle).toBe("3 stasjoner · 5 + 5 + 6 spillere");
    });
  });

  describe("getActivePlanningSection", () => {
    it("should keep a completed 2-station section completed after stationCount changes to 3", () => {
      const state = useSessionStore.getState();
      const exercises = state.exerciseLibrary.filter(
        (exercise) => exercise.category === "game"
      );

      expect(exercises.length).toBeGreaterThanOrEqual(2);

      const activeSection = getActivePlanningSection({
        sessionBlocks: [
          {
            id: exercises[0]!.id,
            exercise: exercises[0]!,
            planningMode: "station",
            sectionStationCount: 2,
          },
          {
            id: exercises[1]!.id,
            exercise: exercises[1]!,
            planningMode: "station",
            sectionStationCount: 2,
          },
        ],
        playerCount: 16,
        planningSectionMode: "stations",
        stationCount: 3,
      });

      expect(activeSection.sectionNumber).toBe(2);
      expect(activeSection.selectedCount).toBe(0);
      expect(activeSection.requiredCount).toBe(3);
      expect(activeSection.playerCounts).toEqual([5, 5, 6]);
    });
  });

  describe("toggleFavorite", () => {
    it("should add exercise id to favoriteIds", () => {
      const { toggleFavorite } = useSessionStore.getState();
      toggleFavorite("fav-id");
      expect(useSessionStore.getState().favoriteIds.has("fav-id")).toBe(true);
    });

    it("should remove exercise id from favoriteIds if already favorited", () => {
      useSessionStore.setState({
        favoriteIds: new Set(["fav-id"]),
      });
      const { toggleFavorite } = useSessionStore.getState();
      toggleFavorite("fav-id");
      expect(useSessionStore.getState().favoriteIds.has("fav-id")).toBe(false);
    });
  });

  describe("searchQuery", () => {
    it("should update searchQuery", () => {
      const { setSearchQuery } = useSessionStore.getState();
      setSearchQuery("rondo");
      expect(useSessionStore.getState().searchQuery).toBe("rondo");
    });
  });

  describe("highlightExerciseId", () => {
    it("should set highlightExerciseId", () => {
      const { setHighlightExercise } = useSessionStore.getState();
      setHighlightExercise("highlight-test");
      expect(useSessionStore.getState().highlightExerciseId).toBe("highlight-test");
    });

    it("should clear highlightExerciseId when set to null", () => {
      useSessionStore.setState({ highlightExerciseId: "some-id" });
      const { setHighlightExercise } = useSessionStore.getState();
      setHighlightExercise(null);
      expect(useSessionStore.getState().highlightExerciseId).toBeNull();
    });
  });

  describe("generateSession", () => {
    it("should return empty array when no exercises selected", () => {
      const { generateSession } = useSessionStore.getState();
      const session = generateSession();
      // Only fixed-warmup with alwaysIncluded should be present
      const nonFixedBlocks = session.filter(
        (block) => block.exercise.category !== "fixed-warmup"
      );
      expect(nonFixedBlocks.length).toBe(0);
    });

    it("should include selected exercises in session", () => {
      const state = useSessionStore.getState();
      const library = state.exerciseLibrary;
      
      // Find an exercise that isn't fixed-warmup
      const testExercise = library.find((ex) => ex.category !== "fixed-warmup");
      if (testExercise) {
        useSessionStore.setState({
          selectedExerciseIds: new Set([testExercise.id]),
        });
        const { generateSession } = useSessionStore.getState();
        const session = generateSession();
        const found = session.find((block) => block.exercise.id === testExercise.id);
        expect(found).toBeDefined();
      }
    });
  });

  describe("plannedBlocks", () => {
    it("should set plannedBlocks", () => {
      const { setPlannedBlocks, exerciseLibrary } = useSessionStore.getState();
      const testBlocks = [
        { id: "block-1", exercise: exerciseLibrary[0] },
      ];
      setPlannedBlocks(testBlocks);
      expect(useSessionStore.getState().plannedBlocks).toEqual(testBlocks);
    });

    it("should reset plannedBlocks to null", () => {
      const { setPlannedBlocks, resetPlan, exerciseLibrary } = useSessionStore.getState();
      setPlannedBlocks([{ id: "block-1", exercise: exerciseLibrary[0] }]);
      useSessionStore.setState({
        searchQuery: "rondo",
        highlightExerciseId: "uefa-1",
        selectedExerciseIds: new Set([exerciseLibrary[0].id]),
      });
      resetPlan();
      expect(useSessionStore.getState().plannedBlocks).toBeNull();
      expect(useSessionStore.getState().searchQuery).toBe("");
      expect(useSessionStore.getState().highlightExerciseId).toBeNull();
      expect(useSessionStore.getState().selectedExerciseIds.size).toBe(0);
    });

    it("should add a custom exercise directly to the session plan", () => {
      const { addExerciseToPlan } = useSessionStore.getState();

      addExerciseToPlan({
        id: "custom-test",
        exerciseNumber: 0,
        name: "Egen øvelse i plan",
        category: "station",
        duration: 14,
        playersMin: 6,
        playersMax: 12,
        theme: "pasning",
        equipment: ["baller", "kjegler"],
        description: "Legges rett inn i aktiv plan.",
        coachingPoints: ["Få opp tempo"],
        variations: ["To touch"],
        source: "egen",
      });

      const state = useSessionStore.getState();
      const added = state.customExercises.find((exercise) => exercise.name === "Egen øvelse i plan");

      expect(added).toBeDefined();
      expect(state.selectedExerciseIds.has(added!.id)).toBe(true);
      expect(state.plannedBlocks?.some((block) => block.exercise.id === added!.id)).toBe(true);
    });

    it("should append an existing exercise directly to the session plan", () => {
      const state = useSessionStore.getState();
      const exercise = state.exerciseLibrary.find((item) => item.category === "game");

      expect(exercise).toBeDefined();

      useSessionStore.getState().appendExerciseToPlan(exercise!);

      const nextState = useSessionStore.getState();
      expect(nextState.selectedExerciseIds.has(exercise!.id)).toBe(true);
      expect(nextState.plannedBlocks?.at(-1)?.exercise.id).toBe(exercise!.id);
    });
  });

  describe("savedSessions", () => {
    it("should save the current session with a name", () => {
      const state = useSessionStore.getState();
      const exercise = state.exerciseLibrary.find((item) => item.category !== "fixed-warmup");

      expect(exercise).toBeDefined();

      useSessionStore.setState({
        sessionTitle: "Angrep siste tredel",
        sessionComment: "Ekstra fokus pa timing i bakrom.",
        selectedExerciseIds: new Set([exercise!.id]),
        plannedBlocks: [
          {
            id: exercise!.id,
            exercise: exercise!,
            sectionComment: "Start med tydelig rollefordeling i seksjonen.",
            customTitle: "Spill med klare roller",
            customComment: "Kort coaching mellom dragene.",
            assignedCoachNames: ["Tor Inge", "Dawid"],
          },
        ],
      });

      const result = useSessionStore.getState().saveCurrentSession("Min testøkt");

      expect(result.ok).toBe(true);
  expect(useSessionStore.getState().activeSavedSessionId).toBe(result.id);
      expect(useSessionStore.getState().savedSessions).toHaveLength(1);
      expect(useSessionStore.getState().savedSessions[0].name).toBe("Min testøkt");
      expect(useSessionStore.getState().savedSessions[0].sessionTitle).toBe("Angrep siste tredel");
      expect(useSessionStore.getState().savedSessions[0].sessionComment).toBe("Ekstra fokus pa timing i bakrom.");
      expect(useSessionStore.getState().savedSessions[0].coachNames).toContain("Tor Inge");
      expect(useSessionStore.getState().savedSessions[0].plannedBlocks?.[0].sectionComment).toBe("Start med tydelig rollefordeling i seksjonen.");
      expect(useSessionStore.getState().savedSessions[0].plannedBlocks?.[0].customTitle).toBe("Spill med klare roller");
      expect(useSessionStore.getState().savedSessions[0].plannedBlocks?.[0].customComment).toBe("Kort coaching mellom dragene.");
      expect(useSessionStore.getState().savedSessions[0].plannedBlocks?.[0].assignedCoachNames).toEqual([
        "Tor Inge",
        "Dawid",
      ]);
    });

    it("should load a previously saved session", () => {
      const state = useSessionStore.getState();
      const exercise = state.exerciseLibrary.find((item) => item.category !== "fixed-warmup");

      expect(exercise).toBeDefined();

      useSessionStore.setState({
        sessionTitle: "Lasteklar økt",
        sessionComment: "Hold igjen én spiller i restforsvar.",
        playerCount: 18,
        stationCount: 3,
        coachNames: ["Tor Inge", "Tor Harald", "Dawid", "Rune", "John Arne", "Ekstra trener"],
        selectedExerciseIds: new Set([exercise!.id]),
        plannedBlocks: [
          {
            id: exercise!.id,
            exercise: exercise!,
            customDuration: 14,
            sectionComment: "Felles trigger for press i denne delen.",
            customComment: "Vær streng på første pressledd.",
            assignedCoachNames: ["Ekstra trener"],
          },
        ],
      });

      const saveResult = useSessionStore.getState().saveCurrentSession("Lasteøkt");
      expect(saveResult.ok).toBe(true);

      useSessionStore.setState({
        playerCount: 10,
        stationCount: 2,
        selectedExerciseIds: new Set(),
        plannedBlocks: null,
      });

      const savedId = useSessionStore.getState().savedSessions[0].id;
      const loaded = useSessionStore.getState().loadSavedSession(savedId);

      expect(loaded).toBe(true);
      expect(useSessionStore.getState().activeSavedSessionId).toBe(savedId);
      expect(useSessionStore.getState().sessionTitle).toBe("Lasteklar økt");
      expect(useSessionStore.getState().sessionComment).toBe("Hold igjen én spiller i restforsvar.");
      expect(useSessionStore.getState().playerCount).toBe(18);
      expect(useSessionStore.getState().stationCount).toBe(3);
      expect(useSessionStore.getState().coachNames).toContain("Ekstra trener");
      expect(useSessionStore.getState().selectedExerciseIds.has(exercise!.id)).toBe(true);
      expect(useSessionStore.getState().plannedBlocks?.[0].customDuration).toBe(14);
      expect(useSessionStore.getState().plannedBlocks?.[0].sectionComment).toBe("Felles trigger for press i denne delen.");
      expect(useSessionStore.getState().plannedBlocks?.[0].customComment).toBe("Vær streng på første pressledd.");
      expect(useSessionStore.getState().plannedBlocks?.[0].assignedCoachNames).toEqual(["Ekstra trener"]);
    });

    it("should delete a saved session", () => {
      const state = useSessionStore.getState();
      const exercise = state.exerciseLibrary.find((item) => item.category !== "fixed-warmup");

      expect(exercise).toBeDefined();

      useSessionStore.setState({
        selectedExerciseIds: new Set([exercise!.id]),
        plannedBlocks: [{ id: exercise!.id, exercise: exercise! }],
      });

      useSessionStore.getState().saveCurrentSession("Slett meg");
      const savedId = useSessionStore.getState().savedSessions[0].id;

      useSessionStore.getState().deleteSavedSession(savedId);

      expect(useSessionStore.getState().savedSessions).toHaveLength(0);
      expect(useSessionStore.getState().activeSavedSessionId).toBeNull();
    });

    it("should update the active saved session without creating a duplicate", () => {
      const state = useSessionStore.getState();
      const exercise = state.exerciseLibrary.find((item) => item.category !== "fixed-warmup");

      expect(exercise).toBeDefined();

      useSessionStore.setState({
        sessionTitle: "Første versjon",
        selectedExerciseIds: new Set([exercise!.id]),
        plannedBlocks: [{ id: exercise!.id, exercise: exercise! }],
      });

      const initialResult = useSessionStore.getState().saveCurrentSession("Økt som oppdateres");

      expect(initialResult.ok).toBe(true);

      useSessionStore.setState({
        sessionTitle: "Oppdatert versjon",
        sessionComment: "Ny kommentar etter redigering.",
      });

      const updateResult = useSessionStore.getState().saveCurrentSession("Økt som oppdateres v2");

      expect(updateResult.ok).toBe(true);
      expect(useSessionStore.getState().savedSessions).toHaveLength(1);
      expect(useSessionStore.getState().savedSessions[0].id).toBe(initialResult.id);
      expect(useSessionStore.getState().savedSessions[0].name).toBe("Økt som oppdateres v2");
      expect(useSessionStore.getState().savedSessions[0].sessionTitle).toBe("Oppdatert versjon");
      expect(useSessionStore.getState().savedSessions[0].sessionComment).toBe("Ny kommentar etter redigering.");
    });

    it("should rehydrate legacy saved sessions from persisted storage", async () => {
      const state = useSessionStore.getState();
      const exercise = state.exerciseLibrary.find((item) => item.category !== "fixed-warmup");

      expect(exercise).toBeDefined();

      window.localStorage.setItem(
        "treninger-session",
        JSON.stringify({
          state: {
            playerCount: 16,
            stationCount: 4,
            selectedExerciseIds: [],
            favoriteIds: [],
            plannedBlocks: null,
            savedSessions: [
              {
                id: 123,
                sessionTitle: "Gammel lagret økt",
                playerCount: 14,
                stationCount: 2,
                plannedBlocks: [
                  {
                    exercise: { id: exercise!.id },
                    customDuration: 9,
                  },
                ],
                createdAt: "2026-01-01T10:00:00.000Z",
                updatedAt: "2026-01-02T10:00:00.000Z",
              },
            ],
            searchQuery: "",
            customExercises: [],
            exerciseOverrides: {},
          },
        })
      );

      await useSessionStore.persist.rehydrate();

      const savedSessions = useSessionStore.getState().savedSessions;
      expect(savedSessions).toHaveLength(1);
      expect(savedSessions[0].id).toBe("saved-123");
      expect(savedSessions[0].name).toBe("Gammel lagret økt");
      expect(savedSessions[0].selectedExerciseIds).toEqual([exercise!.id]);
      expect(savedSessions[0].plannedBlocks?.[0].id).toBe(exercise!.id);
    });
  });

  describe("filterAndGroupExercises", () => {
    it("should filter by theme across categories (including category 'rondo')", () => {
      const library: Exercise[] = [
        {
          id: "w1",
          exerciseNumber: 1,
          name: "Warmup rondo",
          category: "warmup",
          duration: 5,
          playersMin: 4,
          playersMax: 12,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
        {
          id: "s1",
          exerciseNumber: 1,
          name: "Station rondo",
          category: "station",
          duration: 10,
          playersMin: 4,
          playersMax: 12,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
        {
          id: "g1",
          exerciseNumber: 1,
          name: "Game rondo",
          category: "game",
          duration: 15,
          playersMin: 4,
          playersMax: 12,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
        {
          id: "r1",
          exerciseNumber: 1,
          name: "Rondo category exercise",
          category: "rondo",
          duration: 15,
          playersMin: 4,
          playersMax: 12,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
        {
          id: "other",
          exerciseNumber: 1,
          name: "Other theme",
          category: "game",
          duration: 10,
          playersMin: 4,
          playersMax: 12,
          theme: "pressing",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const categories = new Set<string>(["warmup", "station", "game", "rondo"]);
      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 16,
        stationCount: 4,
        theme: "rondo",
        categories,
      });

      expect(grouped.warmup?.map((ex) => ex.id)).toEqual(["w1"]);
      expect(grouped.station?.map((ex) => ex.id)).toEqual(["s1"]);
      expect(grouped.game?.map((ex) => ex.id)).toEqual(["g1"]);
      expect(grouped.rondo?.map((ex) => ex.id)).toEqual(["r1"]);
      expect(grouped.game?.some((ex) => ex.id === "other")).toBe(false);
    });

    it("should filter exercises by players per station when filterByPlayerCount is enabled", () => {
      const library: Exercise[] = [
        {
          id: "small-group",
          exerciseNumber: 1,
          name: "Small group exercise",
          category: "station",
          duration: 10,
          playersMin: 4,
          playersMax: 6,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
        {
          id: "large-group",
          exerciseNumber: 2,
          name: "Large group exercise",
          category: "station",
          duration: 10,
          playersMin: 10,
          playersMax: 16,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const categories = new Set<string>(["station"]);
      
      // 16 spillere / 4 stasjoner = 4 spillere per stasjon
      // Bare "small-group" (4-6 spillere) skal vises
      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 16,
        stationCount: 4,
        planningSectionMode: "stations",
        categories,
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["small-group"]);
      expect(grouped.station?.some((ex) => ex.id === "large-group")).toBe(false);
    });

    it("should show all exercises when filterByPlayerCount is disabled", () => {
      const library: Exercise[] = [
        {
          id: "small-group",
          exerciseNumber: 1,
          name: "Small group exercise",
          category: "station",
          duration: 10,
          playersMin: 4,
          playersMax: 6,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
        {
          id: "large-group",
          exerciseNumber: 2,
          name: "Large group exercise",
          category: "station",
          duration: 10,
          playersMin: 10,
          playersMax: 16,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const categories = new Set<string>(["station"]);
      
      // Uten filterByPlayerCount skal begge vises
      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 16,
        stationCount: 4,
        categories,
        filterByPlayerCount: false,
      });

      expect(grouped.station?.length).toBe(2);
      expect(grouped.station?.some((ex) => ex.id === "small-group")).toBe(true);
      expect(grouped.station?.some((ex) => ex.id === "large-group")).toBe(true);
    });

    it("should exclude scalable odd-group exercises when player count filter is enabled", () => {
      const library: Exercise[] = [
        {
          id: "pair-drill",
          exerciseNumber: 1,
          name: "1v1 pair drill",
          category: "station",
          duration: 10,
          playersMin: 2,
          playersMax: 2,
          theme: "1v1",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
          scalable: true,
        },
        {
          id: "seven-player-rondo",
          exerciseNumber: 2,
          name: "7-player rondo",
          category: "station",
          duration: 10,
          playersMin: 7,
          playersMax: 7,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 7,
        stationCount: 2,
        planningSectionMode: "single",
        categories: new Set<string>(["station"]),
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["seven-player-rondo"]);
      expect(grouped.station?.some((ex) => ex.id === "pair-drill")).toBe(false);
    });

    it("should keep scalable exercises that divide evenly inside a section", () => {
      const library: Exercise[] = [
        {
          id: "pair-drill",
          exerciseNumber: 1,
          name: "1v1 pair drill",
          category: "station",
          duration: 10,
          playersMin: 2,
          playersMax: 2,
          theme: "1v1",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
          scalable: true,
        },
      ];

      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 10,
        stationCount: 2,
        planningSectionMode: "single",
        categories: new Set<string>(["station"]),
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["pair-drill"]);
    });

    it("should keep scalable exercises when the player count divides cleanly", () => {
      const library: Exercise[] = [
        {
          id: "too-small-group",
          exerciseNumber: 1,
          name: "2v2 possession",
          category: "station",
          duration: 10,
          playersMin: 2,
          playersMax: 4,
          theme: "possession",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
          scalable: true,
        },
        {
          id: "ten-player-game",
          exerciseNumber: 2,
          name: "10-player game",
          category: "game",
          duration: 12,
          playersMin: 8,
          playersMax: 12,
          theme: "spill",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 10,
        stationCount: 2,
        planningSectionMode: "single",
        categories: new Set<string>(["station", "game"]),
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["too-small-group"]);
      expect(grouped.game?.map((ex) => ex.id)).toEqual(["ten-player-game"]);
    });

    it("should filter all exercise categories against the active section player split", () => {
      const library: Exercise[] = [
        {
          id: "station-small",
          exerciseNumber: 1,
          name: "Station small",
          category: "station",
          duration: 10,
          playersMin: 4,
          playersMax: 6,
          theme: "rondo",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
        {
          id: "game-full-group",
          exerciseNumber: 2,
          name: "Game full group",
          category: "game",
          duration: 12,
          playersMin: 14,
          playersMax: 18,
          theme: "spill",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 16,
        stationCount: 4,
        planningSectionMode: "stations",
        categories: new Set<string>(["station", "game"]),
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["station-small"]);
      expect(grouped.game).toBeUndefined();
    });

    it("should keep only exercises that fit every uneven station group", () => {
      const library: Exercise[] = [
        {
          id: "fits-both",
          exerciseNumber: 1,
          name: "10-11 possession",
          category: "station",
          duration: 10,
          playersMin: 10,
          playersMax: 11,
          theme: "spill",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
        {
          id: "only-ten",
          exerciseNumber: 2,
          name: "Only 10 players",
          category: "station",
          duration: 10,
          playersMin: 10,
          playersMax: 10,
          theme: "spill",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 21,
        stationCount: 2,
        planningSectionMode: "stations",
        categories: new Set<string>(["station"]),
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["fits-both"]);
    });

    it("should filter Tiim situasjonsøvelser through the dedicated source chip", () => {
      const library: Exercise[] = [
        {
          id: "tiim-situasjon",
          exerciseNumber: 1,
          name: "A1-A2 Situasjonsøvelse - 19",
          category: "station",
          duration: 12,
          playersMin: 6,
          playersMax: 12,
          theme: "spill",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
          source: "tiim",
          sourceUrl: "https://tiim.no/ovelse/a1-a2-situasjonsovelse-19",
        },
        {
          id: "tiim-vanlig",
          exerciseNumber: 2,
          name: "Pasningssirkel",
          category: "station",
          duration: 12,
          playersMin: 6,
          playersMax: 12,
          theme: "pasning",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
          source: "tiim",
          sourceUrl: "https://tiim.no/ovelse/pasningssirkel",
        },
      ];

      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 12,
        categories: new Set<string>(["station"]),
        sourceFilter: "tiim-situasjon",
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["tiim-situasjon"]);
    });

    it("should support 21 players split into 7 + 7 + 7", () => {
      const library: Exercise[] = [
        {
          id: "fits-seven",
          exerciseNumber: 1,
          name: "7-player pattern",
          category: "station",
          duration: 10,
          playersMin: 7,
          playersMax: 7,
          theme: "spill",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 21,
        stationCount: 3,
        planningSectionMode: "stations",
        categories: new Set<string>(["station"]),
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["fits-seven"]);
    });

    it("should support 21 players split into 5 + 5 + 5 + 6", () => {
      const library: Exercise[] = [
        {
          id: "fits-five-six",
          exerciseNumber: 1,
          name: "5-6 player pattern",
          category: "station",
          duration: 10,
          playersMin: 5,
          playersMax: 6,
          theme: "spill",
          equipment: [],
          description: "",
          coachingPoints: [],
          variations: [],
        },
      ];

      const grouped = filterAndGroupExercises({
        exerciseLibrary: library,
        playerCount: 21,
        stationCount: 4,
        planningSectionMode: "stations",
        categories: new Set<string>(["station"]),
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["fits-five-six"]);
    });
  });

  describe("strength defaults", () => {
    it("includes a generic strength placeholder with the speaker reminder", () => {
      const strengthExercise = useSessionStore
        .getState()
        .exerciseLibrary.find((exercise) => exercise.id === "styrke-generic");

      expect(strengthExercise).toBeDefined();
      expect(strengthExercise?.name).toBe("Styrke");
      expect(strengthExercise?.theme).toBe("styrke");
      expect(strengthExercise?.description).toBe("Husk høyttaler.");
      expect(strengthExercise?.coachingPoints).toEqual([]);
      expect(strengthExercise?.variations).toEqual([]);
    });

    it("includes a generic shooting placeholder with open suggestions", () => {
      const shootingExercise = useSessionStore
        .getState()
        .exerciseLibrary.find((exercise) => exercise.id === "skudd-generic");

      expect(shootingExercise).toBeDefined();
      expect(shootingExercise?.name).toBe("Skudd");
      expect(shootingExercise?.theme).toBe("avslutning");
      expect(shootingExercise?.description).toContain("tredjemannsløp");
      expect(shootingExercise?.description).toContain("volley");
      expect(shootingExercise?.description).toContain("andreballer");
    });

    it("uses exercise duration and minutes for strength blocks", () => {
      const strengthExercise = useSessionStore
        .getState()
        .exerciseLibrary.find(
          (exercise) => exercise.category === "cooldown" && exercise.theme === "styrke"
        );

      expect(strengthExercise).toBeDefined();

      const block = {
        id: strengthExercise!.id,
        exercise: strengthExercise!,
      };

      expect(recommendedDuration(block)).toBe(strengthExercise!.duration);
      expect(getUnit(block)).toBe("min");
    });
  });
});
