import { useSessionStore } from "@/store/sessionStore";
import { ChangeEvent } from "react";

export const PlayerSetup = () => {
  const playerCount = useSessionStore((state) => state.playerCount);
  const setPlayerCount = useSessionStore((state) => state.setPlayerCount);

  const handlePlayerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(Number(event.target.value));
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Oppsett</h2>
      <div className="mt-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-zinc-600">Antall spillere</span>
          <input
            type="number"
            min={4}
            max={30}
            value={playerCount}
            onChange={handlePlayerChange}
            className="rounded-xl border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-black focus:outline-none"
          />
        </label>
      </div>
    </section>
  );
};
