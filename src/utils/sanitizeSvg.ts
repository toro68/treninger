export const sanitizeSvgMarkup = (svg: string): string => {
  if (!svg) return svg;

  // Remove scripts completely
  let out = svg.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

  // Remove inline event handlers (onload, onclick, ...)
  out = out
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "");

  // Strip javascript: URLs in href-like attributes
  out = out.replace(/javascript:/gi, "");

  return out;
};
