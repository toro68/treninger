import { describe, expect, it } from "vitest";

import { tiimExercises } from "./tiim-exercises";

const getExerciseByName = (name: string) => {
  const exercise = tiimExercises.find((candidate) => candidate.name === name);
  expect(exercise).toBeDefined();
  return exercise!;
};

describe("tiimExercises", () => {
  it("prioritizes explicit Tiim tema values for theme mapping", () => {
    expect(getExerciseByName("2v2 - Komme til avslutning, score mål").theme).toBe(
      "avslutning"
    );
    expect(getExerciseByName("NY: Scoringsduell").theme).toBe("avslutning");
    expect(
      getExerciseByName("NY: Spille oss fremover i banen - 2v1, 2v2 og 2v3").theme
    ).toBe("oppbygging");
    expect(getExerciseByName("Først til hjørnet").theme).toBe("lek");
  });

  it("uses more specific fallback rules before defaulting to teknikk", () => {
    expect(getExerciseByName("Føringskrysset").theme).toBe("ballkontroll");
    expect(getExerciseByName("Gladiator").theme).toBe("ballkontroll");
    expect(getExerciseByName("Nord-Sør-Øst-Vest, med og uten ball").theme).toBe(
      "ballkontroll"
    );
    expect(getExerciseByName("Vendingsstafett").theme).toBe("ballkontroll");
    expect(getExerciseByName("A1-A2 Situasjonsøvelse - 18").theme).toBe(
      "smålagsspill"
    );
  });

  it("marks mixed-format Tiim exercises as non-scalable", () => {
    expect(
      getExerciseByName("NY: 1v1 og 2v2 - Score mål-hindre mål").scalable
    ).toBe(false);
    expect(
      getExerciseByName("NY: Spille oss fremover i banen - 2v1, 2v2 og 2v3").scalable
    ).toBe(false);
  });

  it("splits concatenated Tiim variations into separate entries", () => {
    expect(
      getExerciseByName("NY: 1v1 og 2v2 - Score mål-hindre mål").variations
    ).toEqual(["Banestørrelse", "Antall spillere", "Mål med keepere"]);
    expect(
      getExerciseByName("NY: Spille oss fremover i banen - 2v1, 2v2 og 2v3").variations
    ).toEqual(["Banestørrelse", "Antall angreps- og forsvarspillere"]);
  });
});
