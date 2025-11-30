import { describe, it, expect, beforeEach } from "vitest";
import { useSessionStore } from "./sessionStore";

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
      resetPlan();
      expect(useSessionStore.getState().plannedBlocks).toBeNull();
    });
  });
});
