import { useSessionStore } from "@/store/sessionStore";
import { useMemo, useState } from "react";

const EQUIPMENT_LABELS: Record<string, string> = {
  vester: "Vester",
  markør: "Markører (Bob)",
  kjegler: "Kjegler",
  baller: "Baller",
  mål: "Mål",
  småmål: "Småmål",
  stenger: "Stenger",
  stiger: "Stiger",
};

const EQUIPMENT_ALIASES: Record<string, string> = {
  "små mål": "småmål",
  markeringsmatter: "markør",
  "markeringsmatter (bob)": "markør",
};

const normalizeEquipment = (raw: string) => {
  const item = raw.toLowerCase().trim();
  return EQUIPMENT_ALIASES[item] ?? item;
};

export const EquipmentList = () => {
  const generateSession = useSessionStore((state) => state.generateSession);
  const sessionBlocks = useMemo(() => generateSession(), [generateSession]);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [hasMounted, setHasMounted] = useState(false);

  // Use layout effect for hydration to avoid cascading renders
  if (typeof window !== "undefined" && !hasMounted) {
    setHasMounted(true);
  }

  // Samle utstyr fra øvelser
  const equipmentSet = new Set<string>();
  sessionBlocks.forEach((block) => {
    block.exercise.equipment.forEach((item) => {
      equipmentSet.add(normalizeEquipment(item));
    });
  });

  // Legg til basisutstyr kun når det finnes øvelser
  if (sessionBlocks.length > 0) {
    ["baller", "kjegler", "vester"].forEach((item) => equipmentSet.add(item));
  }

  const smartBaseline = ["baller", "kjegler", "vester"];

  // Fjern baseline-elementer dersom de ikke er relevante
  const filteredEquipment = [...equipmentSet].filter((item) => {
    if (!smartBaseline.includes(item)) return true;
    return sessionBlocks.some((block) =>
      block.exercise.equipment.some(
        (eq) => normalizeEquipment(eq) === item
      )
    );
  });

  const equipmentList = filteredEquipment.sort((a, b) => a.localeCompare(b, "nb"));

  // Vent på hydration før vi viser utstyrlisten
  if (!hydrated) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Utstyr</h2>
        <p className="mt-3 text-sm text-zinc-500">Laster...</p>
      </section>
    );
  }

  if (equipmentList.length === 0) {
    return null;
  }

  const toggleChecked = (item: string) => {
    const next = new Set(checked);
    if (next.has(item)) {
      next.delete(item);
    } else {
      next.add(item);
    }
    setChecked(next);
  };

  const allChecked = equipmentList.every((item) => checked.has(item));

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Utstyr</h2>
        {checked.size > 0 && (
          <button
            onClick={() => setChecked(new Set())}
            className="text-xs text-zinc-500 hover:underline"
          >
            Nullstill
          </button>
        )}
      </div>

      <ul className="mt-3 space-y-2">
        {equipmentList.map((item) => {
          const isChecked = checked.has(item);
          return (
            <li key={item}>
              <label
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer transition ${
                  isChecked
                    ? "border-zinc-300 bg-zinc-100 text-zinc-400 line-through"
                    : "border-zinc-100 bg-zinc-50 text-zinc-900"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleChecked(item)}
                  className="h-5 w-5 accent-black"
                />
                <span>{EQUIPMENT_LABELS[item] ?? item}</span>
              </label>
            </li>
          );
        })}
      </ul>

      {allChecked && equipmentList.length > 0 && (
        <p className="mt-3 text-sm text-emerald-600">Alt utstyr klart!</p>
      )}
    </section>
  );
};
