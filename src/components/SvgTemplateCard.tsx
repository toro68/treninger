"use client";

import { ReactNode, useCallback, useMemo, useRef } from "react";
import { downloadSvgElement } from "@/utils/svgDownload";

type Props = {
  title: string;
  fileName: string;
  children: ReactNode;
  className?: string;
};

export function SvgTemplateCard({ title, fileName, children, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleId = useMemo(() => {
    const safe = fileName
      .toLowerCase()
      .replace(/\.svg$/i, "")
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `svg-template-${safe || "title"}`;
  }, [fileName]);

  const onDownload = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    downloadSvgElement(svg, fileName);
  }, [fileName]);

  return (
    <div className={"rounded-xl border border-zinc-200 p-3 " + (className ?? "")} aria-labelledby={titleId}>
      <div className="flex items-center justify-between gap-3">
        <h3 id={titleId} className="text-sm font-semibold text-zinc-900">
          {title}
        </h3>
        <button
          type="button"
          onClick={onDownload}
          className="shrink-0 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Last ned SVG
        </button>
      </div>
      <div ref={containerRef} className="mt-2">
        {children}
      </div>
    </div>
  );
}
