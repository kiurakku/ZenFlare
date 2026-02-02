/**
 * Cyclomatic complexity for ZenFlare Flare (refactor hint when high).
 * Counts decision points: if, else, for, while, switch, case, &&, ||, ?:, catch.
 */

export function cyclomaticComplexity(source: string): number {
  if (!source || typeof source !== "string") return 1;
  let count = 1;
  const patterns = [
    /\bif\s*\(/g,
    /\belse\b/g,
    /\bfor\s*\(/g,
    /\bwhile\s*\(/g,
    /\bswitch\s*\(/g,
    /\bcase\s+/g,
    /\?\s*[^:]+:/g,
    /\|\|/g,
    /&&/g,
    /\bcatch\s*\(/g,
  ];
  for (const re of patterns) {
    const matches = source.match(re);
    if (matches) count += matches.length;
  }
  return count;
}

export function getComplexityLabel(complexity: number, threshold: number): "calm" | "flare" {
  return complexity >= threshold ? "flare" : "calm";
}
