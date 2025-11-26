import { useMemo } from "react";
import { useSessionStore } from "@/store/sessionStore";
import { exercises } from "@/data/exercises";

export type ThemeFilter = string | "alle";

export const Filters = ({
  activeTheme,
  onThemeChange,
}: {
  activeTheme: ThemeFilter;
  onThemeChange: (value: ThemeFilter) => void;
}) => {
  const playerCount = useSessionStore((state) => state.playerCount);

  const availableThemes = useMemo(() => {
    const themeCounts: Record<string, number> = {};
    exercises.forEach((exercise) => {
      const matchesPlayerCount =
        playerCount >= exercise.playersMin &&
        playerCount <= exercise.playersMax;

      if (!matchesPlayerCount) return;
      const key = exercise.theme;
      themeCounts[key] = (themeCounts[key] ?? 0) + 1;
    });
    return Object.keys(themeCounts);
  }, [playerCount]);

  return (
    <div className="flex flex-wrap gap-2">
      {["alle", ...availableThemes].map((theme) => (
        <button
          key={theme}
          onClick={() => onThemeChange(theme as ThemeFilter)}
          className={`rounded-full border px-4 py-1 text-sm transition ${
            activeTheme === theme
              ? "border-black bg-black text-white"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
          }`}
        >
          {theme === "alle" ? "Alle tema" : theme}
        </button>
      ))}
    </div>
  );
};
