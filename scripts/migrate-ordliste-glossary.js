/* eslint-disable no-console */

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function slugifyTerm(term) {
  // Norwegian-friendly slug.
  return term
    .toLowerCase()
    .trim()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[–—]/g, "-")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

function parseLegacyTermsFromOrdlisteTsx(source) {
  // Extract { term: "...", definition: "...", example?: "..." } objects.
  // Assumption: legacy strings are double-quoted without embedded unescaped quotes.
  const matches = [...source.matchAll(/\{\s*term:\s*"([^"\n]+)"\s*,\s*definition:\s*"([\s\S]*?)"\s*(?:,\s*example:\s*"([\s\S]*?)")?\s*\}/g)];

  const byTerm = new Map();
  for (const m of matches) {
    const term = m[1].trim();
    const definition = m[2].replace(/\s+\n\s+/g, "\n").trim();
    const example = m[3] ? m[3].replace(/\s+\n\s+/g, "\n").trim() : undefined;

    if (!byTerm.has(term)) {
      byTerm.set(term, { term, definition, example });
    }
  }

  return byTerm;
}

function parseExistingTermToId(glossaryTsSource) {
  // Parses existing entries to preserve IDs.
  // Matches: someKey: { id: "...", term: "...",
  const re = /([A-Za-z0-9_\-]+)\s*:\s*\{[\s\S]*?\bid\s*:\s*"([^"]+)"[\s\S]*?\bterm\s*:\s*"([^"]+)"/g;
  const termToId = new Map();

  for (const m of glossaryTsSource.matchAll(re)) {
    const id = m[2];
    const term = m[3];
    termToId.set(term, id);
  }

  return termToId;
}

function buildMergedGlossary({ legacyByTerm, existingTermToId, existingGlossarySource }) {
  // Also keep existing terms that are not in legacy (so we don't lose e.g. newer additions).
  const existingEntries = new Map();
  const entryRe = /([A-Za-z0-9_\-]+)\s*:\s*\{[\s\S]*?\bid\s*:\s*"([^"]+)"[\s\S]*?\bterm\s*:\s*"([^"]+)"[\s\S]*?\bdefinition\s*:\s*([\s\S]*?)(?:\n\s*\}\s*,?)/g;

  for (const m of existingGlossarySource.matchAll(entryRe)) {
    const id = m[2];
    const term = m[3];
    existingEntries.set(term, id);
  }

  const usedIds = new Set();
  const merged = [];

  function uniqueId(baseId) {
    let id = baseId;
    let i = 2;
    while (usedIds.has(id)) {
      id = `${baseId}-${i}`;
      i += 1;
    }
    usedIds.add(id);
    return id;
  }

  // Seed usedIds with existing IDs to avoid collisions.
  for (const id of existingTermToId.values()) usedIds.add(id);

  // Add/overwrite from legacy.
  for (const { term, definition, example } of legacyByTerm.values()) {
    const preservedId = existingTermToId.get(term);
    const baseId = preservedId || slugifyTerm(term) || "term";
    const id = preservedId ? baseId : uniqueId(baseId);

    merged.push({ id, term, definition, example });
  }

  // Add any existing terms not present in legacy.
  for (const [term, id] of existingEntries.entries()) {
    if (legacyByTerm.has(term)) continue;

    // Try to keep the existing term by reading its definition/example via a looser regex.
    const re = new RegExp(
      String.raw`${id.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\s*:\
\s*\{[\\s\\S]*?term\s*:\s*"${term.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}"[\\s\\S]*?definition\s*:\s*(?:\n\s*)?(?:"([\\s\\S]*?)"|\`([\\s\\S]*?)\`)\s*(?:,\s*example\s*:\s*(?:\n\s*)?(?:"([\\s\\S]*?)"|\`([\\s\\S]*?)\`))?`);

    const m = existingGlossarySource.match(re);
    const definition = m ? (m[1] || m[2] || "").trim() : "";
    const example = m ? (m[3] || m[4] || "").trim() : "";

    merged.push({ id, term, definition, example: example || undefined });
  }

  // Sort stable by term (nb locale).
  merged.sort((a, b) => a.term.localeCompare(b.term, "nb"));

  return merged;
}

function tsStringLiteral(value) {
  // Use normal string literal; escape backslashes and quotes.
  const escaped = value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n/g, "\\n")
    .replace(/"/g, "\\\"");
  return `"${escaped}"`;
}

function generateGlossaryTermsTs(mergedEntries) {
  const lines = [];
  lines.push("export type GlossaryTerm = {");
  lines.push("  id: string;");
  lines.push("  term: string;");
  lines.push("  definition: string;");
  lines.push("  example?: string;");
  lines.push("};");
  lines.push("");
  lines.push("export const glossaryTerms: Record<string, GlossaryTerm> = {");

  for (const entry of mergedEntries) {
    lines.push(`  ${tsStringLiteral(entry.id)}: {`);
    lines.push(`    id: ${tsStringLiteral(entry.id)},`);
    lines.push(`    term: ${tsStringLiteral(entry.term)},`);
    lines.push(`    definition: ${tsStringLiteral(entry.definition)},`);
    if (entry.example) {
      lines.push(`    example: ${tsStringLiteral(entry.example)},`);
    }
    lines.push("  },");
  }

  lines.push("};");
  lines.push("");
  lines.push("export const getGlossaryTerm = (id: string): GlossaryTerm | undefined => glossaryTerms[id];");
  lines.push("");

  return lines.join("\n");
}

function main() {
  const repoRoot = process.cwd();
  const glossaryPath = path.join(repoRoot, "src/data/glossaryTerms.ts");

  const legacySource = execSync("git show HEAD:src/app/ordliste/page.tsx", {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  const existingSource = fs.readFileSync(glossaryPath, "utf8");

  const legacyByTerm = parseLegacyTermsFromOrdlisteTsx(legacySource);
  const existingTermToId = parseExistingTermToId(existingSource);

  const merged = buildMergedGlossary({ legacyByTerm, existingTermToId, existingGlossarySource: existingSource });
  const out = generateGlossaryTermsTs(merged);

  fs.writeFileSync(glossaryPath, out, "utf8");

  console.log(`Wrote ${merged.length} glossary terms to ${path.relative(repoRoot, glossaryPath)}`);
}

main();
