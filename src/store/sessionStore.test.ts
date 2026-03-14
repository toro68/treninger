import { describe, it, expect, beforeEach } from "vitest";
import { filterAndGroupExercises, getUnit, recommendedDuration, useSessionStore } from "./sessionStore";
import type { Exercise } from "@/data/exercises";

describe("sessionStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useSessionStore.setState({
      playerCount: 16,
      stationCount: 4,
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

    it("should update stationCount", () => {
      const { setStationCount } = useSessionStore.getState();
      setStationCount(6);
      expect(useSessionStore.getState().stationCount).toBe(6);
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
  });

  describe("savedSessions", () => {
    it("should save the current session with a name", () => {
      const state = useSessionStore.getState();
      const exercise = state.exerciseLibrary.find((item) => item.category !== "fixed-warmup");

      expect(exercise).toBeDefined();

      useSessionStore.setState({
        selectedExerciseIds: new Set([exercise!.id]),
        plannedBlocks: [
          {
            id: exercise!.id,
            exercise: exercise!,
            assignedCoachNames: ["Tor Inge", "Dawid"],
          },
        ],
      });

      const result = useSessionStore.getState().saveCurrentSession("Min testøkt");

      expect(result.ok).toBe(true);
      expect(useSessionStore.getState().savedSessions).toHaveLength(1);
      expect(useSessionStore.getState().savedSessions[0].name).toBe("Min testøkt");
      expect(useSessionStore.getState().savedSessions[0].coachNames).toContain("Tor Inge");
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
        playerCount: 18,
        stationCount: 3,
        coachNames: ["Tor Inge", "Tor Harald", "Dawid", "Rune", "John Arne", "Ekstra trener"],
        selectedExerciseIds: new Set([exercise!.id]),
        plannedBlocks: [
          {
            id: exercise!.id,
            exercise: exercise!,
            customDuration: 14,
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
      expect(useSessionStore.getState().playerCount).toBe(18);
      expect(useSessionStore.getState().stationCount).toBe(3);
      expect(useSessionStore.getState().coachNames).toContain("Ekstra trener");
      expect(useSessionStore.getState().selectedExerciseIds.has(exercise!.id)).toBe(true);
      expect(useSessionStore.getState().plannedBlocks?.[0].customDuration).toBe(14);
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

    it("should use total player count for games even when stations are enabled", () => {
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
        categories: new Set<string>(["station", "game"]),
        filterByPlayerCount: true,
      });

      expect(grouped.station?.map((ex) => ex.id)).toEqual(["station-small"]);
      expect(grouped.game?.map((ex) => ex.id)).toEqual(["game-full-group"]);
    });
  });

  describe("strength defaults", () => {
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
