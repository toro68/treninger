import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CustomExerciseCreator } from "./CustomExerciseCreator";

describe("CustomExerciseCreator", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates robust custom exercise ids with a slugged name", () => {
    const onSubmitExercise = vi.fn();
    vi.stubGlobal("crypto", { randomUUID: () => "exercise-uuid" });

    render(<CustomExerciseCreator onSubmitExercise={onSubmitExercise} />);

    fireEvent.click(screen.getByRole("button", { name: "Ny øvelse" }));
    fireEvent.change(screen.getByLabelText("Navn"), {
      target: { value: "6v4 med overgang" },
    });
    fireEvent.change(screen.getByLabelText("Beskrivelse"), {
      target: { value: "Angrep mot ubalansert forsvar etter brudd." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Legg til øvelse" }));

    expect(onSubmitExercise).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "custom-exercise-uuid-6v4-med-overgang",
        name: "6v4 med overgang",
      })
    );
  });
});
