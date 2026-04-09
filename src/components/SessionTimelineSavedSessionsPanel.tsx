import type { SavedSession } from "@/store/sessionStore";

type SessionTimelineSavedSessionsPanelProps = {
  activeSavedSession: SavedSession | null;
  activeSavedSessionId: string | null;
  savedSessions: SavedSession[];
  sessionName: string;
  onSessionNameChange: (value: string) => void;
  onSaveSession: () => void;
  onLoadSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
};

export const SessionTimelineSavedSessionsPanel = ({
  activeSavedSession,
  activeSavedSessionId,
  savedSessions,
  sessionName,
  onSessionNameChange,
  onSaveSession,
  onLoadSession,
  onDeleteSession,
}: SessionTimelineSavedSessionsPanelProps) => (
  <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-3">
    {activeSavedSession ? (
      <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
        Redigerer lagret økt: <span className="font-semibold">{activeSavedSession.name}</span>. Endringer kan oppdateres direkte.
      </div>
    ) : null}
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <label className="sr-only" htmlFor="saved-session-name">
        Navn på økten
      </label>
      <input
        id="saved-session-name"
        type="text"
        value={sessionName}
        onChange={(event) => onSessionNameChange(event.target.value)}
        placeholder="Navn på økten"
        className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900"
      />
      <button
        type="button"
        onClick={onSaveSession}
        className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-700"
      >
        {activeSavedSession ? "Oppdater lagret økt" : "Lagre økt"}
      </button>
    </div>
    <p className="mt-2 text-xs text-zinc-500">
      Nåværende økt ligger allerede lagret lokalt i nettleseren. Her kan du lagre navngitte økter, oppdatere den du jobber med, og hente dem fram igjen.
    </p>

    <div className="mt-3 space-y-2 border-t border-zinc-200 pt-3">
      {savedSessions.length === 0 ? (
        <p className="text-xs text-zinc-500">Ingen navngitte økter lagret ennå.</p>
      ) : (
        savedSessions.map((savedSession) => (
          <div
            key={savedSession.id}
            className={`flex flex-col gap-2 rounded-lg border bg-white p-3 sm:flex-row sm:items-center sm:justify-between ${
              savedSession.id === activeSavedSessionId ? "border-emerald-300 ring-1 ring-emerald-200" : "border-zinc-200"
            }`}
          >
            <div>
              <p className="text-sm font-medium text-zinc-900">{savedSession.name}</p>
              <p className="text-xs text-zinc-500">
                {savedSession.playerCount} spillere · seksjonsvalg opptil {savedSession.stationCount} stasjoner · lagret {new Date(savedSession.updatedAt).toLocaleString("nb-NO")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {savedSession.id === activeSavedSessionId ? (
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
                  Aktiv
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => onLoadSession(savedSession.id)}
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700 transition hover:border-zinc-400"
              >
                Last inn
              </button>
              <button
                type="button"
                onClick={() => onDeleteSession(savedSession.id)}
                className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition hover:border-red-400 hover:bg-red-50"
              >
                Slett
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
