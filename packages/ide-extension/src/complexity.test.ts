/**
 * Unit tests for cyclomatic complexity (Node --test).
 * Run: pnpm test (from packages/ide-extension) or node --test out/complexity.test.js
 */
const { describe, it } = require("node:test");
const assert = require("node:assert");
const { cyclomaticComplexity, getComplexityLabel } = require("./complexity");

describe("cyclomaticComplexity", () => {
  it("returns 1 for empty string", () => {
    assert.strictEqual(cyclomaticComplexity(""), 1);
  });
  it("returns 1 for simple code", () => {
    assert.strictEqual(cyclomaticComplexity("const x = 1;"), 1);
  });
  it("increments for if", () => {
    assert.ok(cyclomaticComplexity("if (a) { }") >= 2);
  });
  it("increments for if/else", () => {
    assert.ok(cyclomaticComplexity("if (a) { } else { }") >= 3);
  });
  it("increments for for loop", () => {
    assert.ok(cyclomaticComplexity("for (let i=0;i<n;i++) {}") >= 2);
  });
  it("increments for &&", () => {
    assert.strictEqual(cyclomaticComplexity("a && b"), 2);
  });
  it("increments for ||", () => {
    assert.ok(cyclomaticComplexity("a || b") >= 2);
  });
});

describe("getComplexityLabel", () => {
  it("returns calm when below threshold", () => {
    assert.strictEqual(getComplexityLabel(5, 10), "calm");
  });
  it("returns flare when at threshold", () => {
    assert.strictEqual(getComplexityLabel(10, 10), "flare");
  });
  it("returns flare when above threshold", () => {
    assert.strictEqual(getComplexityLabel(15, 10), "flare");
  });
});
