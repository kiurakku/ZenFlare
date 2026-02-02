/**
 * Unit tests for framework detection (Node --test).
 * Run: pnpm test (from packages/deploy) or node --test dist/detect.test.js
 */
const { describe, it } = require("node:test");
const assert = require("node:assert");
const { detectFramework, getBuildPlan } = require("./detect");

describe("detectFramework", () => {
  it("detects next", () => {
    assert.strictEqual(
      detectFramework({ dependencies: { next: "14.0.0" } }),
      "next"
    );
  });
  it("detects vite", () => {
    assert.strictEqual(
      detectFramework({ devDependencies: { vite: "5.0.0" } }),
      "vite"
    );
  });
  it("detects nuxt", () => {
    assert.strictEqual(
      detectFramework({ dependencies: { nuxt: "3.0.0" } }),
      "nuxt"
    );
  });
  it("detects cra", () => {
    assert.strictEqual(
      detectFramework({ dependencies: { "react-scripts": "5.0.0" } }),
      "cra"
    );
  });
  it("returns unknown when build script exists", () => {
    assert.strictEqual(
      detectFramework({ scripts: { build: "tsc" } }),
      "unknown"
    );
  });
  it("returns static when no build", () => {
    assert.strictEqual(detectFramework({ scripts: {} }), "static");
  });
});

describe("getBuildPlan", () => {
  it("returns plan for next", () => {
    const plan = getBuildPlan("next");
    assert.strictEqual(plan.framework, "next");
    assert.ok(plan.buildCommand.includes("next"));
    assert.strictEqual(plan.outputDir, ".next");
  });
  it("returns plan for vite", () => {
    const plan = getBuildPlan("vite");
    assert.strictEqual(plan.framework, "vite");
    assert.strictEqual(plan.outputDir, "dist");
  });
});
