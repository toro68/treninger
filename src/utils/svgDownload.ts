export function sanitizeSvgFileName(input: string) {
  const base = input
    .trim()
    .replace(/\.svg$/i, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return (base.length ? base : "diagram") + ".svg";
}

function ensureSvgNamespaces(svg: SVGElement) {
  if (!svg.getAttribute("xmlns")) {
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }
  if (!svg.getAttribute("xmlns:xlink")) {
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  }
}

export function downloadSvgElement(svg: SVGElement, fileName: string) {
  const cloned = svg.cloneNode(true) as SVGElement;
  ensureSvgNamespaces(cloned);

  const serialized = new XMLSerializer().serializeToString(cloned);
  const content = `<?xml version="1.0" encoding="UTF-8"?>\n${serialized}\n`;

  const blob = new Blob([content], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = sanitizeSvgFileName(fileName);
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}
