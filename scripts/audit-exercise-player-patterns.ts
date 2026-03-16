import { allExercises, getExerciseCode } from "../src/data/exercises";
import type { Exercise } from "../src/data/exercises";

type MatchSource = "name" | "description" | "sourceRef";

type Candidate = {
  source: MatchSource;
  pattern: string;
  expectedPlayers: number;
  excerpt: string;
};

type Finding = {
  exercise: Exercise;
  candidates: Candidate[];
};

const HIGH_CONFIDENCE_SOURCES = new Set<MatchSource>(["name", "sourceRef"]);

const formatExercise = (exercise: Exercise) =>
  `[${getExerciseCode(exercise)}] ${exercise.id} · ${exercise.name} · players=${exercise.playersMin}-${exercise.playersMax} · source=${exercise.source ?? "egen"}`;

const addCandidate = (
  candidates: Candidate[],
  seen: Set<string>,
  source: MatchSource,
  pattern: string,
  expectedPlayers: number,
  excerpt: string
) => {
  const key = `${source}:${pattern}:${expectedPlayers}`;
  if (seen.has(key)) return;
  seen.add(key);
  candidates.push({ source, pattern, expectedPlayers, excerpt });
};

const collectCandidatesFromText = (text: string, source: MatchSource): Candidate[] => {
  const normalized = text.replace(/[–—]/g, "-");
  const candidates: Candidate[] = [];
  const seen = new Set<string>();
  const occupiedRanges: Array<{ start: number; end: number }> = [];

  const patternDefs: Array<{
    pattern: string;
    regex: RegExp;
    toExpected: (match: RegExpExecArray) => number | null;
  }> = [
    {
      pattern: "gk+AvB+gk",
      regex: /gk\s*\+\s*(\d+)\s*v\s*(\d+)\s*\+\s*gk/gi,
      toExpected: (match) => Number(match[1]) + Number(match[2]) + 2,
    },
    {
      pattern: "A+BvC+D",
      regex: /(\d+)\s*\+\s*(\d+)\s*v\s*(\d+)\s*\+\s*(\d+)/gi,
      toExpected: (match) =>
        Number(match[1]) + Number(match[2]) + Number(match[3]) + Number(match[4]),
    },
    {
      pattern: "A+BvC",
      regex: /(\d+)\s*\+\s*(\d+)\s*v\s*(\d+)/gi,
      toExpected: (match) => Number(match[1]) + Number(match[2]) + Number(match[3]),
    },
    {
      pattern: "AvB+C",
      regex: /(\d+)\s*v\s*(\d+)\s*\+\s*(\d+)/gi,
      toExpected: (match) => Number(match[1]) + Number(match[2]) + Number(match[3]),
    },
    {
      pattern: "AvB",
      regex: /(\d+)\s*v\s*(\d+)/gi,
      toExpected: (match) => Number(match[1]) + Number(match[2]),
    },
  ];

  for (const { pattern, regex, toExpected } of patternDefs) {
    for (const match of normalized.matchAll(regex)) {
      const start = match.index ?? -1;
      const end = start + match[0].length;
      const overlaps = occupiedRanges.some((range) => start < range.end && end > range.start);
      if (overlaps) continue;

      const expectedPlayers = toExpected(match);
      if (expectedPlayers === null || !Number.isFinite(expectedPlayers)) continue;
      occupiedRanges.push({ start, end });
      addCandidate(candidates, seen, source, pattern, expectedPlayers, match[0]);
    }
  }

  return candidates;
};

const collectCandidates = (exercise: Exercise): Candidate[] => {
  return [
    ...collectCandidatesFromText(exercise.name, "name"),
    ...collectCandidatesFromText(exercise.description, "description"),
    ...collectCandidatesFromText(exercise.sourceRef ?? "", "sourceRef"),
  ];
};

const isCoveredByRange = (exercise: Exercise, expectedPlayers: number) =>
  expectedPlayers >= exercise.playersMin && expectedPlayers <= exercise.playersMax;

const main = () => {
  const findings: Finding[] = [];

  for (const exercise of allExercises) {
    const candidates = collectCandidates(exercise).filter(
      (candidate) => !isCoveredByRange(exercise, candidate.expectedPlayers)
    );

    if (candidates.length === 0) continue;
    if (!candidates.some((candidate) => HIGH_CONFIDENCE_SOURCES.has(candidate.source))) continue;
    findings.push({ exercise, candidates });
  }

  findings.sort((a, b) => {
    const aMinExpected = Math.min(...a.candidates.map((candidate) => candidate.expectedPlayers));
    const bMinExpected = Math.min(...b.candidates.map((candidate) => candidate.expectedPlayers));
    const aDelta = Math.min(
      ...a.candidates.map((candidate) =>
        Math.min(
          Math.abs(candidate.expectedPlayers - a.exercise.playersMin),
          Math.abs(candidate.expectedPlayers - a.exercise.playersMax)
        )
      )
    );
    const bDelta = Math.min(
      ...b.candidates.map((candidate) =>
        Math.min(
          Math.abs(candidate.expectedPlayers - b.exercise.playersMin),
          Math.abs(candidate.expectedPlayers - b.exercise.playersMax)
        )
      )
    );

    if (aDelta !== bDelta) return bDelta - aDelta;
    if (aMinExpected !== bMinExpected) return aMinExpected - bMinExpected;
    return a.exercise.name.localeCompare(b.exercise.name, "nb");
  });

  console.log(`Suspicious exercises: ${findings.length}`);

  for (const finding of findings) {
    console.log(`\n- ${formatExercise(finding.exercise)}`);
    for (const candidate of finding.candidates) {
      console.log(
        `  • expected=${candidate.expectedPlayers} from ${candidate.source} (${candidate.pattern}): ${candidate.excerpt}`
      );
    }
  }
};

main();