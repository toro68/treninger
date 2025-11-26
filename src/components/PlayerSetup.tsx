import { useSessionStore } from "@/store/sessionStore";
import { ChangeEvent } from "react";

export const PlayerSetup = () => {
  const playerCount = useSessionStore((state) => state.playerCount);
  const stationCount = useSessionStore((state) => state.stationCount);
  const setPlayerCount = useSessionStore((state) => state.setPlayerCount);
  const setStationCount = useSessionStore((state) => state.setStationCount);

  const handlePlayerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(Number(event.target.value));
  };

  const handleStationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStationCount(Number(event.target.value));
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Oppsett</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-zinc-600">Spillere</span>
          <input
            type="number"
            min={4}
            max={30}
            value={playerCount}
            onChange={handlePlayerChange}
            className="rounded-xl border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-black focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-zinc-600">Stasjoner</span>
          <select
            value={stationCount}
            onChange={handleStationChange}
            className="rounded-xl border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-black focus:outline-none"
          >
            {[1, 2, 3, 4].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
};
