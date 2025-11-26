import { useSessionStore } from "@/store/sessionStore";
import { useMemo, useState } from "react";
import { EquipmentFilters } from "./EquipmentFilters";

export const EquipmentList = () => {
  const generateSession = useSessionStore((state) => state.generateSession);
  const sessionBlocks = useMemo(() => generateSession(), [generateSession]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const equipmentMap = new Map<string, { count: number }>();

  sessionBlocks.forEach((block) => {
    block.exercise.equipment.forEach((item) => {
      const key = item.toLowerCase();
      const current = equipmentMap.get(key)?.count ?? 0;
      equipmentMap.set(key, { count: current + 1 });
    });
  });

  if (equipmentMap.size === 0) {
    return null;
  }

  const filteredEquipment = [...equipmentMap.entries()].filter(([item]) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.includes(item.toLowerCase());
  });

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Utstyr</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Tall viser hvor mange øvelser som trenger hvert element.
          </p>
        </div>
        <button
          onClick={() => setActiveFilters([])}
          className="text-xs text-zinc-500 underline-offset-2 hover:underline"
        >
          Nullstill filter
        </button>
      </div>
      <div className="mt-4">
        <EquipmentFilters selected={activeFilters} onChange={setActiveFilters} />
      </div>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        {filteredEquipment
          .sort((a, b) => b[1].count - a[1].count)
          .map(([item, info]) => (
            <li
              key={item}
              className="flex items-center justify-between rounded-xl border border-zinc-100 px-3 py-2"
            >
              <span className="font-medium capitalize">{item}</span>
              <span className="text-xs text-zinc-500">{info.count} øvelser</span>
            </li>
          ))}
      </ul>
    </section>
  );
};
