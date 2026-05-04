import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useSessionStore } from "@/store/sessionStore";

import { PlayerSetup } from "./PlayerSetup";

describe("PlayerSetup", () => {
  beforeEach(() => {
    useSessionStore.setState({
      playerCount: 16,
      keeperCount: 0,
      coachNames: ["Tor Inge"],
    });
  });

  it("associates count inputs with labels without wrapping buttons in labels", () => {
    const { container } = render(<PlayerSetup />);

    expect(screen.getByLabelText("Antall utespillere")).toHaveAttribute(
      "id",
      "outfield-player-count"
    );
    expect(screen.getByLabelText("Antall keepere")).toHaveAttribute("id", "keeper-count");
    expect(container.querySelectorAll("label button")).toHaveLength(0);
  });
});