import { useEffect, useId, useRef } from "react";

type SessionTimelineShareMenuProps = {
  fullSessionShareUrl: string;
  showShareOptions: boolean;
  onToggle: () => void;
  onClose: () => void;
  onCopyCompact: () => void;
  onCopyLink: () => void;
  onPrint: () => void;
};

export const SessionTimelineShareMenu = ({
  fullSessionShareUrl,
  showShareOptions,
  onToggle,
  onClose,
  onCopyCompact,
  onCopyLink,
  onPrint,
}: SessionTimelineShareMenuProps) => {
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showShareOptions) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showShareOptions, onClose]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={showShareOptions}
        aria-haspopup="menu"
        aria-controls={showShareOptions ? menuId : undefined}
        onClick={onToggle}
        className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:border-zinc-400 active:bg-zinc-100"
      >
        Del økt
      </button>
      {showShareOptions && (
      <div
        id={menuId}
        role="menu"
        aria-label="Del økt"
        className="absolute right-0 top-full mt-1 z-20 min-w-[160px] rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
      >
        <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">Kompakt i planlegger</div>
        <button
          type="button"
          role="menuitem"
          onClick={onCopyCompact}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
          </svg>
          Kopier kompakt tekst
        </button>
        <hr className="my-1 border-zinc-100" />
        <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">Fullversjon</div>
        <button
          type="button"
          role="menuitem"
          onClick={onCopyLink}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M7.25 3A2.25 2.25 0 0 0 5 5.25v1.5a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 1 7.25 4.5h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 0 0 1.5h1.5A2.25 2.25 0 0 0 13 8.75v-3.5A2.25 2.25 0 0 0 10.75 3h-3.5ZM3 7.25A2.25 2.25 0 0 1 5.25 5h3.5A2.25 2.25 0 0 1 11 7.25v3.5A2.25 2.25 0 0 1 8.75 13h-3.5A2.25 2.25 0 0 1 3 10.75v-3.5Zm2.25-.75a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75h-3.5Z" clipRule="evenodd" />
          </svg>
          Kopier lenke til fullversjon
        </button>
        {fullSessionShareUrl ? (
          <a
            href={fullSessionShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={onClose}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M9.78 2.97a.75.75 0 0 1 0 1.06L6.81 7h4.44a.75.75 0 0 1 0 1.5H6.81l2.97 2.97a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" transform="matrix(-1 0 0 1 16 0)" />
            </svg>
            Åpne fullversjon
          </a>
        ) : null}
        <hr className="my-1 border-zinc-100" />
        <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">Eksporter</div>
        <button
          type="button"
          role="menuitem"
          onClick={onPrint}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v.5h.5A1.5 1.5 0 0 1 14 6v4a1.5 1.5 0 0 1-1.5 1.5H12v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h-.5A1.5 1.5 0 0 1 2 10V6a1.5 1.5 0 0 1 1.5-1.5H4V4Zm1.5 6v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V10h-5Zm5-5.5V4a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0-.5.5v.5h5Z" clipRule="evenodd" />
          </svg>
          Skriv ut / PDF
        </button>
      </div>
      )}
    </div>
  );
};
