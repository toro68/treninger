import { useSessionStore } from "@/store/sessionStore";
import { ChangeEvent } from "react";

export const PlayerSetup = () => {
  const playerCount = useSessionStore((state) => state.playerCount);
  const setPlayerCount = useSessionStore((state) => state.setPlayerCount);

  const handlePlayerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 4 && value <= 30) {
      setPlayerCount(value);
    }
  };

  const increment = () => {
    if (playerCount < 30) setPlayerCount(playerCount + 1);
  };

  const decrement = () => {
    if (playerCount > 4) setPlayerCount(playerCount - 1);
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Oppsett</h2>
      <div className="mt-3">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-zinc-600">Antall spillere</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decrement}
              disabled={playerCount <= 4}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              −
            </button>
            <input
              type="number"
              min={4}
              max={30}
              value={playerCount}
              onChange={handlePlayerChange}
              className="w-16 rounded-xl border border-zinc-200 px-3 py-2 text-center text-lg font-semibold text-zinc-900 focus:border-black focus:outline-none"
            />
            <button
              type="button"
              onClick={increment}
              disabled={playerCount >= 30}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
            <span className="ml-2 text-sm text-zinc-500">spillere</span>
          </div>
        </label>
      </div>
    </section>
  );
};
