import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SearchField } from "./SearchField";

describe("SearchField", () => {
  it("exposes an accessible name for the search input", () => {
    render(<SearchField />);

    expect(
      screen.getByRole("searchbox", { name: "Søk i øvelsesbiblioteket" })
    ).toBeInTheDocument();
  });
});
