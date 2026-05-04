import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { MatchPrep } from "./MatchPrep";

const storageKey = "match-prep-checked";

describe("MatchPrep", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders checklist and focus data from the match prep data file", () => {
    render(<MatchPrep />);

    fireEvent.click(screen.getByRole("button", { name: /Kamp/i }));

    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual(
      expect.arrayContaining([expect.stringContaining("Laguttak på Spond og i Fiks")])
    );
    expect(screen.getByRole("checkbox", { name: /Ha en klar kampplan/i })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /RBK: Press sammen/i })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Drillo: Se etter gjennombrudd/i })).toBeInTheDocument();
  });

  it("hydrates checked focus items from localStorage", () => {
    window.localStorage.setItem(storageKey, JSON.stringify(["kampplan"]));

    render(<MatchPrep />);
    fireEvent.click(screen.getByRole("button", { name: /Kamp/i }));

    expect(screen.getByRole("checkbox", { name: /Ha en klar kampplan/i })).toBeChecked();
  });

  it("persists and resets checked focus items", async () => {
    render(<MatchPrep />);
    fireEvent.click(screen.getByRole("button", { name: /Kamp/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /Ha en klar kampplan/i }));

    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(storageKey) ?? "[]")).toContain("kampplan");
    });

    fireEvent.click(screen.getByRole("button", { name: /Nullstill avhuking/i }));

    await waitFor(() => {
      expect(window.localStorage.getItem(storageKey)).toBe("[]");
    });
  });
});
