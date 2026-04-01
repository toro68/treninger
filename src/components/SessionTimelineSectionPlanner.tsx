import type { PlanningSectionMode, PlanningSectionTarget } from "@/store/sessionStore";
import type { ActivePlanningSection } from "@/store/sessionPlanning";
import type { SessionPart } from "@/utils/sessionParts";

type SessionTimelineSectionPlannerProps = {
  activeSection: ActivePlanningSection;
  activeSectionSplitLabel: string;
  displayedPlayerCounts: number[];
  displayedRequiredCount: number;
  displayedSectionNumber: number;
  displayedSelectedCount: number;
  explicitSectionTarget: string | null;
  isIncompleteStationSection: boolean;
  isPlanningNextSection: boolean;
  missingStations: number;
  partsLength: number;
  planningSectionMode: PlanningSectionMode;
  planningSectionTarget: PlanningSectionTarget;
  setPlanningSectionMode: (mode: PlanningSectionMode) => void;
  setPlanningSectionTarget: (target: PlanningSectionTarget) => void;
  setStationCount: (count: number) => void;
  showIncompleteStationSection: boolean;
  stationCount: number;
  stationParts: SessionPart[];
};

const SECTION_MODE_OPTIONS: Array<{
  mode: PlanningSectionMode;
  label: string;
  count?: number;
}> = [
  { mode: "single", label: "1 øvelse" },
  { mode: "stations", label: "2 stasjoner", count: 2 },
  { mode: "stations", label: "3 stasjoner", count: 3 },
  { mode: "stations", label: "4 stasjoner", count: 4 },
];

export const SessionTimelineSectionPlanner = ({
  activeSection,
  activeSectionSplitLabel,
  displayedPlayerCounts,
  displayedRequiredCount,
  displayedSectionNumber,
  displayedSelectedCount,
  explicitSectionTarget,
  isIncompleteStationSection,
  isPlanningNextSection,
  missingStations,
  partsLength,
  planningSectionMode,
  planningSectionTarget,
  setPlanningSectionMode,
  setPlanningSectionTarget,
  setStationCount,
  showIncompleteStationSection,
  stationCount,
  stationParts,
}: SessionTimelineSectionPlannerProps) => (
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
          {`Planlegg seksjon ${partsLength + 1}`}
        </button>
      </div>
    ) : null}
    <div className="mt-3 flex flex-wrap gap-2">
      {SECTION_MODE_OPTIONS.map((option) => {
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
);