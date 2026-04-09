import { useSessionStore } from "@/store/sessionStore";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export const PlayerSetup = () => {
  const playerCount = useSessionStore((state) => state.playerCount);
  const keeperCount = useSessionStore((state) => state.keeperCount);
  const setPlayerCount = useSessionStore((state) => state.setPlayerCount);
  const setKeeperCount = useSessionStore((state) => state.setKeeperCount);
  const coachNames = useSessionStore((state) => state.coachNames);
  const addCoachName = useSessionStore((state) => state.addCoachName);
  const removeCoachName = useSessionStore((state) => state.removeCoachName);
  const [coachInput, setCoachInput] = useState("");
  const outfieldPlayerCount = Math.max(1, playerCount - keeperCount);
  const minOutfieldPlayerCount = Math.max(1, 4 - keeperCount);
  const maxOutfieldPlayerCount = Math.max(minOutfieldPlayerCount, 40 - keeperCount);

  const handlePlayerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= minOutfieldPlayerCount && value <= maxOutfieldPlayerCount) {
      setPlayerCount(value + keeperCount);
    }
  };

  const incrementPlayers = () => {
    if (outfieldPlayerCount < maxOutfieldPlayerCount) setPlayerCount(playerCount + 1);
  };

  const decrementPlayers = () => {
    if (outfieldPlayerCount > minOutfieldPlayerCount) setPlayerCount(playerCount - 1);
  };

  const handleKeeperChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 0 && value < playerCount) {
      setKeeperCount(value);
    }
  };

  const incrementKeepers = () => {
    if (keeperCount < playerCount - 1) setKeeperCount(keeperCount + 1);
  };

  const decrementKeepers = () => {
    if (keeperCount > 0) setKeeperCount(keeperCount - 1);
  };

  const handleCoachSubmit = () => {
    const trimmedName = coachInput.trim();
    if (!trimmedName) return;
    addCoachName(trimmedName);
    setCoachInput("");
  };

  const handleCoachKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    handleCoachSubmit();
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Oppsett</h2>
      
      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">Antall utespillere</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={decrementPlayers}
                disabled={outfieldPlayerCount <= minOutfieldPlayerCount}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                −
              </button>
              <input
                type="number"
                min={minOutfieldPlayerCount}
                max={maxOutfieldPlayerCount}
                value={outfieldPlayerCount}
                onChange={handlePlayerChange}
                className="min-w-0 flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-center text-lg font-semibold text-zinc-900 focus:border-black focus:outline-none"
              />
              <button
                type="button"
                onClick={incrementPlayers}
                disabled={outfieldPlayerCount >= maxOutfieldPlayerCount}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">Antall keepere</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={decrementKeepers}
                disabled={keeperCount <= 0}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <input
                type="number"
                min={0}
                max={Math.max(0, playerCount - 1)}
                value={keeperCount}
                onChange={handleKeeperChange}
                className="min-w-0 flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-center text-lg font-semibold text-zinc-900 focus:border-black focus:outline-none"
              />
              <button
                type="button"
                onClick={incrementKeepers}
                disabled={keeperCount >= playerCount - 1}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-lg font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
        <p className="text-sm text-emerald-900">
          {playerCount} totalt = {outfieldPlayerCount} utespillere + {keeperCount} keeper{keeperCount === 1 ? "" : "e"}.
        </p>
      </div>

      <div className="mt-4 rounded-xl bg-sky-50 border border-sky-100 px-4 py-3">
        <p className="text-sm text-sky-800">
          Velg hvordan spillerne deles opp for hver seksjon inne i øktplanen: én øvelse for alle, eller 2–4 stasjoner.
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Trenere</h3>
            <p className="mt-1 text-xs text-zinc-500">
              Disse navnene kan hukes av på hver øvelse i øktplanen.
            </p>
          </div>
          <span className="rounded-full bg-white px-2.5 py-1 text-xs text-zinc-500">
            {coachNames.length} navn
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {coachNames.map((coachName) => (
            <span
              key={coachName}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700"
            >
              {coachName}
              <button
                type="button"
                onClick={() => removeCoachName(coachName)}
                className="rounded-full px-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                title={`Fjern ${coachName}`}
                aria-label={`Fjern ${coachName}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="coach-name-input">
            Legg til trenernavn
          </label>
          <input
            id="coach-name-input"
            type="text"
            value={coachInput}
            onChange={(event) => setCoachInput(event.target.value)}
            onKeyDown={handleCoachKeyDown}
            placeholder="Legg til trenernavn"
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCoachSubmit}
            className="rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Legg til
          </button>
        </div>
      </div>
    </section>
  );
};
