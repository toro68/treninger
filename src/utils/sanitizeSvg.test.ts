import { describe, expect, it } from "vitest";

import { sanitizeSvgMarkup } from "./sanitizeSvg";

describe("sanitizeSvgMarkup", () => {
  it("removes external URL attributes from SVG markup", () => {
    const sanitized = sanitizeSvgMarkup(
      '<svg xmlns="http://www.w3.org/2000/svg"><image href="https://tracker.example/pixel.png" /><use xlink:href="http://tracker.example/icon.svg#x" /></svg>'
    );

    expect(sanitized).not.toContain("https://tracker.example");
    expect(sanitized).not.toContain("http://tracker.example");
  });

  it("removes protocol-relative URL attributes from SVG markup", () => {
    const sanitized = sanitizeSvgMarkup(
      '<svg xmlns="http://www.w3.org/2000/svg"><image href="//tracker.example/pixel.png" /></svg>'
    );

    expect(sanitized).not.toContain("//tracker.example");
  });

  it("keeps local references and safe raster data images", () => {
    const sanitized = sanitizeSvgMarkup(
      '<svg xmlns="http://www.w3.org/2000/svg"><use href="#player" /><image href="/book-illustrations/local.png" /><image href="data:image/png;base64,aGVsbG8=" /></svg>'
    );

    expect(sanitized).toContain("#player");
    expect(sanitized).toContain("/book-illustrations/local.png");
    expect(sanitized).toContain("data:image/png;base64,aGVsbG8=");
  });
});