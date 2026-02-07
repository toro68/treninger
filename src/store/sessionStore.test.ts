import { describe, it, expect, beforeEach } from "vitest";
import { filterAndGroupExercises, useSessionStore } from "./sessionStore";
import type { Exercise } from "@/data/exercises";

describe("sessionStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useSessionStore.setState({
      playerCount: 16,
      stationCount: 4,
      selectedExerciseIds: new Set(),
      favoriteIds: new Set(),
      searchQuery: "",
      highlightExerciseId: null,
      plannedBlocks: null,
      customExercises: [],
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
  });
});
