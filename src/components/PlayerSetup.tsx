import { useSessionStore } from "@/store/sessionStore";
import { ChangeEvent } from "react";

export const PlayerSetup = () => {
  const playerCount = useSessionStore((state) => state.playerCount);
  const setPlayerCount = useSessionStore((state) => state.setPlayerCount);
  const stationCount = useSessionStore((state) => state.stationCount);
  const setStationCount = useSessionStore((state) => state.setStationCount);

  const handlePlayerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 4 && value <= 40) {
      setPlayerCount(value);
    }
  };

  const handleStationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 6) {
      setStationCount(value);
    }
  };

  const incrementPlayers = () => {
    if (playerCount < 40) setPlayerCount(playerCount + 1);
  };

  const decrementPlayers = () => {
    if (playerCount > 4) setPlayerCount(playerCount - 1);
  };

  const incrementStations = () => {
    if (stationCount < 6) setStationCount(stationCount + 1);
  };

  const decrementStations = () => {
    if (stationCount > 1) setStationCount(stationCount - 1);
  };

  const playersPerStation = Math.floor(playerCount / stationCount);
  const remainder = playerCount % stationCount;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Oppsett</h2>
      
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Antall spillere */}
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">Antall spillere</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={decrementPlayers}
                disabled={playerCount <= 4}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                −
              </button>
              <input
                type="number"
                min={4}
                max={40}
                value={playerCount}
                onChange={handlePlayerChange}
                className="w-16 rounded-xl border border-zinc-200 px-3 py-2 text-center text-lg font-semibold text-zinc-900 focus:border-black focus:outline-none"
              />
              <button
                type="button"
                onClick={incrementPlayers}
                disabled={playerCount >= 40}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </label>
        </div>

        {/* Antall stasjoner */}
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">Antall stasjoner</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={decrementStations}
                disabled={stationCount <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={6}
                value={stationCount}
                onChange={handleStationChange}
                className="w-16 rounded-xl border border-zinc-200 px-3 py-2 text-center text-lg font-semibold text-zinc-900 focus:border-black focus:outline-none"
              />
              <button
                type="button"
                onClick={incrementStations}
                disabled={stationCount >= 6}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </label>
        </div>
      </div>

      {/* Info om spillere per stasjon */}
      <div className="mt-4 rounded-xl bg-sky-50 border border-sky-100 px-4 py-3">
        <p className="text-sm text-sky-800">
          <span className="font-semibold">{playersPerStation} spillere</span> per stasjon
          {remainder > 0 && (
            <span className="text-sky-600"> ({remainder} til overs)</span>
          )}
        </p>
      </div>
    </section>
  );
};
