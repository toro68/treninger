import { afterEach, describe, expect, it, vi } from "vitest";

import { createIdSegment, createPrefixedId } from "./createId";

describe("createId", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("uses crypto.randomUUID when available", () => {
    vi.stubGlobal("crypto", { randomUUID: () => "uuid-test" });

    expect(createIdSegment()).toBe("uuid-test");
    expect(createPrefixedId("saved")).toBe("saved-uuid-test");
  });

  it("falls back when crypto.randomUUID is unavailable", () => {
    vi.stubGlobal("crypto", {});
    vi.spyOn(Date, "now").mockReturnValue(123456789);
    vi.spyOn(Math, "random").mockReturnValue(0.123456789);

    expect(createPrefixedId("custom")).toMatch(/^custom-21i3v9-[a-z0-9]+$/);
  });
});
