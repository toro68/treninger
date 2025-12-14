"use client";

import { RefObject, useCallback } from "react";
import { downloadSvgElement } from "@/utils/svgDownload";

type Props = {
  containerRef: RefObject<HTMLElement | null>;
  fileName: string;
  className?: string;
  label?: string;
};

export function SvgDownloadButton({
  containerRef,
  fileName,
  className,
  label = "Last ned SVG",
}: Props) {
  const onDownload = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const svg = container.querySelector("svg");
    if (!svg) return;
    downloadSvgElement(svg, fileName);
  }, [containerRef, fileName]);

  return (
    <button
      type="button"
      onClick={onDownload}
      className={
        className ??
        "rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
      }
    >
      {label}
    </button>
  );
}
