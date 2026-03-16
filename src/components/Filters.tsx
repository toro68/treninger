import { getSectionPlayerCounts, matchesExercisePlayerCountFilter, useSessionStore } from "@/store/sessionStore";
import { ExerciseSource } from "@/data/exercises";
import { useMemo } from "react";
import { SearchField } from "@/components/SearchField";

export type ThemeFilter = string | "alle";
export type SourceFilter = ExerciseSource | "egen" | null; // null = vis alle

// Konfigurasjon for hver kilde
const sourceConfig: Record<string, { label: string; description: string; activeClass: string; dotClass: string }> = {
  egen: {
    label: "Egne",
    description: "Våre egne øvelser",
    activeClass: "border-zinc-600 bg-zinc-100 text-zinc-800",
    dotClass: "bg-zinc-600"
  },
  tiim: {
    label: "tiim.no",
    description: "Øvelser fra NFF",
    activeClass: "border-emerald-500 bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-500"
  },
  eggen: {
    label: "Eggen",
    description: "Knut Torbjørn Eggen",
    activeClass: "border-amber-500 bg-amber-50 text-amber-700",
    dotClass: "bg-amber-500"
  },
  godfoten: {
    label: "Godfoten",
    description: "Nils Arne Eggen",
    activeClass: "border-orange-500 bg-orange-50 text-orange-700",
    dotClass: "bg-orange-500"
  },
  dbu: {
    label: "DBU",
    description: "Den røde tråd",
    activeClass: "border-red-500 bg-red-50 text-red-700",
    dotClass: "bg-red-500"
  },
  rondo: {
    label: "DiBernardo",
    description: "The Science of Rondo",
    activeClass: "border-purple-500 bg-purple-50 text-purple-700",
    dotClass: "bg-purple-500"
  },
  hyballa: {
    label: "Hyballa",
    description: "German Passing Drills",
    activeClass: "border-blue-500 bg-blue-50 text-blue-700",
    dotClass: "bg-blue-500"
  },
  bangsbo: {
    label: "Bangsbo",
    description: "Forsvar",
    activeClass: "border-cyan-500 bg-cyan-50 text-cyan-700",
    dotClass: "bg-cyan-500"
  },
  dugger: {
    label: "Dugger",
    description: "World Class Defense",
    activeClass: "border-rose-500 bg-rose-50 text-rose-700",
    dotClass: "bg-rose-500"
  },
  drillo: {
    label: "Drillo",
    description: "Effektiv fotball",
    activeClass: "border-sky-600 bg-sky-50 text-sky-700",
    dotClass: "bg-sky-600"
  },
  prickett: {
    label: "Prickett",
    description: "3v3 Soccer Coaching",
    activeClass: "border-lime-500 bg-lime-50 text-lime-700",
    dotClass: "bg-lime-500"
  },
  "101youth": {
    label: "101 Youth",
    description: "Youth Football Coaching",
    activeClass: "border-orange-500 bg-orange-50 text-orange-700",
    dotClass: "bg-orange-500"
  },
  seeger: {
    label: "Seeger",
    description: "Soccer Games Compendium",
    activeClass: "border-indigo-500 bg-indigo-50 text-indigo-700",
    dotClass: "bg-indigo-500"
  },
  matkovich: {
    label: "Matkovich",
    description: "Elite Soccer Drills",
    activeClass: "border-teal-500 bg-teal-50 text-teal-700",
    dotClass: "bg-teal-500"
  },
  worldclass: {
    label: "50 Games",
    description: "50 Small-Sided Games",
    activeClass: "border-sky-500 bg-sky-50 text-sky-700",
    dotClass: "bg-sky-500"
  },
  uefa: {
    label: "UEFA",
    description: "UEFA A-analyser",
    activeClass: "border-blue-600 bg-blue-50 text-blue-700",
    dotClass: "bg-blue-600"
  }
};

export const Filters = ({
  activeTheme,
  onThemeChange,
  sourceFilter,
  onSourceFilterChange,
  filterByPlayerCount,
  onFilterByPlayerCountChange,
}: {
  activeTheme: ThemeFilter;
  onThemeChange: (value: ThemeFilter) => void;
  sourceFilter: SourceFilter;
  onSourceFilterChange: (value: SourceFilter) => void;
  filterByPlayerCount: boolean;
  onFilterByPlayerCountChange: (value: boolean) => void;
}) => {
  const playerCount = useSessionStore((state) => state.playerCount);
  const stationCount = useSessionStore((state) => state.stationCount);
  const planningSectionMode = useSessionStore((state) => state.planningSectionMode);
  const exerciseLibrary = useSessionStore((state) => state.exerciseLibrary);
  const sectionPlayerCounts = useMemo(
    () => getSectionPlayerCounts(playerCount, planningSectionMode, stationCount),
    [playerCount, planningSectionMode, stationCount]
  );
  const sectionFilterLabel =
    sectionPlayerCounts.length === 1
      ? `${sectionPlayerCounts[0]} spillere i seksjonen`
      : `${sectionPlayerCounts.join(" + ")} spillere i seksjonen`;

  // Tell øvelser per kilde
  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    let egneCount = 0;
    exerciseLibrary.forEach((exercise) => {
      // "egen" er øvelser uten eksplisitt source
      const key = exercise.source || "egen";
      counts[key] = (counts[key] ?? 0) + 1;
      if (!exercise.source || exercise.source === "eggen") egneCount += 1;
    });
    // "Egne" inkluderer både helt egne og Eggen (samme logikk som i filterAndGroupExercises)
    counts.egen = egneCount;
    return counts;
  }, [exerciseLibrary]);

  // Beregn tilgjengelige temaer basert på kildefilter
  const availableThemes = useMemo(() => {
    const themeCounts: Record<string, number> = {};
    exerciseLibrary.forEach((exercise) => {
      if (
        filterByPlayerCount &&
        !matchesExercisePlayerCountFilter(exercise, playerCount, undefined, sectionPlayerCounts)
      ) {
        return;
      }
      
      // Filtrer på kilde
      if (sourceFilter !== null) {
        const exerciseSource = exercise.source || "egen";
        if (sourceFilter === "egen") {
          // Vis egne øvelser (inkludert K.T. Eggen, men ikke Godfoten)
          if (exercise.source && exerciseSource !== "eggen") return;
        } else if (exerciseSource !== sourceFilter) {
          return;
        }
      }
      
      const key = exercise.theme;
      themeCounts[key] = (themeCounts[key] ?? 0) + 1;
    });
    return Object.entries(themeCounts)
      .sort(([themeA], [themeB]) => {
        if (themeA === "rondo") return -1;
        if (themeB === "rondo") return 1;
        return themeA.localeCompare(themeB, "nb");
      })
      .map(([theme, count]) => ({ theme, count }));
  }, [exerciseLibrary, playerCount, sectionPlayerCounts, sourceFilter, filterByPlayerCount]);

  const totalThemeCount = useMemo(
    () => availableThemes.reduce((sum, entry) => sum + entry.count, 0),
    [availableThemes]
  );

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // Kilder som skal vises (med antall > 0)
  const availableSources = useMemo(() => {
    return Object.entries(sourceConfig).map(([key, config]) => ({
      key,
      ...config,
      count: sourceCounts[key] ?? 0
    }));
  }, [sourceCounts]);

  return (
    <div className="space-y-3">
      {/* Søk */}
      <SearchField />

      {/* Kildefilter */}
      <div className="flex flex-wrap items-center gap-2">
        {availableSources.map(({ key, label, activeClass, dotClass, count }) => {
          const isActive = sourceFilter === key;
          return (
            <button
              key={key}
              onClick={() => onSourceFilterChange(isActive ? null : key as SourceFilter)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
                isActive
                  ? activeClass
                  : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400"
              }`}
            >
              <span className={`inline-block h-2 w-2 rounded-full ${
                isActive ? dotClass : "bg-zinc-300"
              }`} />
              {label} ({count})
            </button>
          );
        })}
        {sourceFilter !== null && (
          <button
            onClick={() => onSourceFilterChange(null)}
            className="ml-1 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-200 transition"
          >
            Vis alle
          </button>
        )}
      </div>

      {/* Antallsfilter toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onFilterByPlayerCountChange(!filterByPlayerCount)}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
            filterByPlayerCount
              ? "border-black bg-black text-white shadow-sm"
              : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.156 11.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 1 2.015-1.043h4.032a2.5 2.5 0 0 1 2.015 1.043c.373.51.653 1.091.813 1.72A6.968 6.968 0 0 1 8 15a6.968 6.968 0 0 1-4.844-1.237Z" />
          </svg>
          Kun for {sectionFilterLabel}
        </button>
        {filterByPlayerCount && (
          <span className="text-xs text-zinc-500">
            {planningSectionMode === "stations"
              ? `(${playerCount} spillere fordeles som ${sectionPlayerCounts.join(" + ")})`
              : `(${playerCount} spillere i én felles øvelse)`}
          </span>
        )}
      </div>
      
      {/* Tema filter */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        <button
          key="alle"
          onClick={() => onThemeChange("alle")}
          className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
            activeTheme === "alle"
              ? "border-black bg-black text-white shadow-sm"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
          }`}
        >
          {`Alle (${totalThemeCount})`}
        </button>
        {availableThemes.map(({ theme, count }) => (
          <button
            key={theme}
            onClick={() => onThemeChange(theme as ThemeFilter)}
            className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
              activeTheme === theme
                ? "border-black bg-black text-white shadow-sm"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
            }`}
          >
            {`${capitalize(theme)} (${count})`}
          </button>
        ))}
      </div>
    </div>
  );
};
