const BLOCKED_TAGS = new Set([
  "script",
  "foreignobject",
  "iframe",
  "frame",
  "object",
  "embed",
  "link",
  "meta",
  "style",
]);

const URL_ATTRS = new Set(["href", "xlink:href", "src"]);
const SAFE_DATA_IMAGE_PATTERN = /^data:image\/(?:png|jpe?g|gif|webp);base64,/i;

const hasUnsafeUrlFunction = (value: string) => {
  const normalized = value.replace(/\s+/g, "");
  return /url\(/i.test(normalized) && !/^url\(#/i.test(normalized);
};

const isSafeUrl = (value: string) => {
  const normalized = value.trim();

  if (!normalized) return false;
  if (normalized.startsWith("#")) return true;
  if (normalized.startsWith("/") && !normalized.startsWith("//")) return true;
  if (normalized.startsWith("./") || normalized.startsWith("../")) return true;
  if (SAFE_DATA_IMAGE_PATTERN.test(normalized)) return true;

  return false;
};

const fallbackSanitizeSvg = (svg: string) =>
  svg
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<foreignObject[\s\S]*?>[\s\S]*?<\/foreignObject>/gi, "")
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/\sstyle\s*=\s*"[^"]*"/gi, "")
    .replace(/\sstyle\s*=\s*'[^']*'/gi, "")
    .replace(/\s(?:href|xlink:href|src)\s*=\s*"(?:https?:|data:image\/svg\+xml|data:text\/html)[^"]*"/gi, "")
    .replace(/\s(?:href|xlink:href|src)\s*=\s*'(?:https?:|data:image\/svg\+xml|data:text\/html)[^']*'/gi, "")
    .replace(/javascript:/gi, "");

const sanitizeSvgElement = (element: Element) => {
  [...element.children].forEach((child) => {
    const childName = child.tagName.toLowerCase();

    if (BLOCKED_TAGS.has(childName)) {
      child.remove();
      return;
    }

    sanitizeSvgElement(child);
  });

  [...element.attributes].forEach((attribute) => {
    const name = attribute.name.toLowerCase();
    const value = attribute.value;

    if (name.startsWith("on") || name === "style" || name === "srcdoc") {
      element.removeAttribute(attribute.name);
      return;
    }

    if (
      /javascript:/i.test(value) ||
      /^data:text\/html/i.test(value) ||
      hasUnsafeUrlFunction(value)
    ) {
      element.removeAttribute(attribute.name);
      return;
    }

    if (URL_ATTRS.has(name) && !isSafeUrl(value)) {
      element.removeAttribute(attribute.name);
    }
  });
};

export const sanitizeSvgMarkup = (svg: string): string => {
  if (!svg) return svg;

  if (typeof DOMParser === "undefined" || typeof XMLSerializer === "undefined") {
    return fallbackSanitizeSvg(svg);
  }

  try {
    const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
    const root = doc.documentElement;

    if (!root || root.tagName.toLowerCase() === "parsererror") {
      return fallbackSanitizeSvg(svg);
    }

    if (root.tagName.toLowerCase() !== "svg") {
      return "";
    }

    sanitizeSvgElement(root);
    return new XMLSerializer().serializeToString(root);
  } catch {
    return fallbackSanitizeSvg(svg);
  }
};
