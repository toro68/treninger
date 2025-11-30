export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  example?: string;
};

export const glossaryTerms: Record<string, GlossaryTerm> = {
  etasje: {
    id: "etasje",
    term: "Etasjer (banedeling)",
    definition:
      "Banen deles horisontalt i fire etasjer: 1. etasje = egen bakre tredel, 2. etasje = midtre defensiv, 3. etasje = midtre offensiv, 4. etasje = siste tredel mot motstanders mål. Brukes for å beskrive hvor vi vil vinne ballen eller bryte linjer.",
    example: "Brudd i 2./3. etasje betyr gjenvinning i de to midterste sonene der vi raskt kan true bakrom.",
  },
  tredjemann: {
    id: "tredjemann",
    term: "Tredjemann",
    definition:
      "Spilleren som mottar pasningen etter at to medspillere allerede har kombinert. Kritisk for å bryte linjer og opprettholde tempo (sent i A02).",
    example: "Tredjemann starter løpet idet pasning #2 slås og kommer rettvendt i mellomrommet.",
  },
  treplustwo: {
    id: "treplustwo",
    term: "3+2-sikring",
    definition:
      "Balanseprinsipp: minst tre spillere bak ball + to sentrale sikringer før laget sender mange i angrep. Hindrer kontring på kontring (A12).",
    example: "Indreløper må bli igjen til vi har 3+2, ellers blir vi sårbare ved balltap.",
  },
  frysse_sla: {
    id: "frys-se-sla",
    term: "Frys–se–slå",
    definition:
      "Mentalt cue fra Fredriksen (A12): Etter ballvinning – frys ballen, løft blikket og slå først når rommet er definert (tempo-kontroll).",
    example: "Ballvinner frys-se-slår: tar et øyeblikk for å lese bakrom før pasningen går.",
  },
};

export const getGlossaryTerm = (id: string): GlossaryTerm | undefined => glossaryTerms[id];
