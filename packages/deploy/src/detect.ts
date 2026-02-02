/**
 * Framework detection for ZenFlare Deploy.
 * Picks build command and public dir from repo (package.json, config files).
 */

export type Framework =
  | "next"
  | "vite"
  | "nuxt"
  | "cra"
  | "static"
  | "unknown";

export interface DetectResult {
  framework: Framework;
  buildCommand: string;
  outputDir: string;
  installCommand: string;
}

const FRAMEWORKS: Record<
  Framework,
  { buildCommand: string; outputDir: string; installCommand: string }
> = {
  next: { buildCommand: "next build", outputDir: ".next", installCommand: "pnpm install" },
  vite: { buildCommand: "pnpm build", outputDir: "dist", installCommand: "pnpm install" },
  nuxt: { buildCommand: "nuxt build", outputDir: ".output", installCommand: "pnpm install" },
  cra: { buildCommand: "npm run build", outputDir: "build", installCommand: "npm ci" },
  static: { buildCommand: "echo no-build", outputDir: "public", installCommand: "echo no-install" },
  unknown: { buildCommand: "npm run build", outputDir: "dist", installCommand: "npm ci" },
};

/**
 * Detect framework from package.json (and later from config files).
 */
export function detectFramework(packageJson: Record<string, unknown>): Framework {
  const deps = {
    ...(packageJson.dependencies as Record<string, string> || {}),
    ...(packageJson.devDependencies as Record<string, string> || {}),
  };

  if (deps["next"]) return "next";
  if (deps["vite"] || deps["@vitejs/plugin-react"]) return "vite";
  if (deps["nuxt"]) return "nuxt";
  if (deps["react-scripts"]) return "cra";

  const scripts = (packageJson.scripts as Record<string, string>) || {};
  if (scripts["build"]) return "unknown";
  return "static";
}

export function getBuildPlan(framework: Framework): DetectResult {
  const plan = FRAMEWORKS[framework];
  return {
    framework,
    buildCommand: plan.buildCommand,
    outputDir: plan.outputDir,
    installCommand: plan.installCommand,
  };
}
