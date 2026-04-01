import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormasjonerSeksjon } from "./FormasjonerSeksjon";
import { Roles } from "./Roles";
import { TeamOrganization } from "./TeamOrganization";

describe("kampseksjoner", () => {
  it("shows a fallback message instead of a blank tactics tab", () => {
    render(<FormasjonerSeksjon />);

    fireEvent.click(screen.getByRole("button", { name: /Formasjoner/i }));
    fireEvent.click(screen.getByRole("button", { name: "4-3-3" }));
    fireEvent.click(screen.getByRole("button", { name: "Taktikk" }));

    expect(
      screen.getByText(/Ingen taktiske prinsipper registrert ennå for 4-3-3/i)
    ).toBeInTheDocument();
  });

  it("prioritizes role-specific UEFA focus for roles", () => {
    render(<Roles />);

    fireEvent.click(screen.getByRole("button", { name: /Roller/i }));

    expect(
      screen.getByText(/Førsteforsvarer = signalspiller: vinn når vi har balanse/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Default = 5-3-2 lav blokk – steng mellom-\/bakrom/i)
    ).not.toBeInTheDocument();
  });

  it("shows the NFF curve-run example text", () => {
    render(<TeamOrganization />);

    fireEvent.click(screen.getByRole("button", { name: /Organisering/i }));

    expect(
      screen.getByText(/Ønsker du ikke pasning på yttersiden\/kanten\?/i)
    ).toBeInTheDocument();
  });
});