/**
 * ZenFlare Deploy — API entry.
 * One push or one click → framework detection, build, host, "light pulse" feedback.
 * From first line to production. No noise, just flow.
 */

import express, { Request, Response } from "express";
import path from "path";
import { detectFramework, getBuildPlan } from "./detect";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

type JobStatus = "queued" | "building" | "done" | "failed";
interface DeployJob {
  jobId: string;
  status: JobStatus;
  repo?: string;
  branch?: string;
  framework?: string;
  createdAt: number;
  completedAt?: number;
  outputUrl?: string;
}

const jobs = new Map<string, DeployJob>();

function createJob(repo?: string, branch?: string): DeployJob {
  const jobId = `job-${Date.now()}`;
  const job: DeployJob = {
    jobId,
    status: "queued",
    repo,
    branch,
    createdAt: Date.now(),
  };
  jobs.set(jobId, job);
  setTimeout(() => {
    const j = jobs.get(jobId);
    if (j && j.status === "queued") {
      j.status = "building";
      setTimeout(() => {
        j.status = "done";
        j.completedAt = Date.now();
        // For now we host a static demo artifact at /project/demo.
        j.outputUrl = "/project/demo";
      }, 1500);
    }
  }, 100);
  return job;
}

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "zenflare-deploy" });
});

// Minimal static hosting layer for demo deployments.
const rootDir = path.join(__dirname, "..", "..", "..");
const demoStaticDir = path.join(rootDir, "packages", "deploy", "demo-static");
app.use("/project/demo", express.static(demoStaticDir));
app.get("/project/demo", (_req: Request, res: Response) => {
  res.sendFile(path.join(demoStaticDir, "index.html"));
});

app.post("/webhook/deploy", (req: Request, res: Response) => {
  const { repo, branch, projectId, packageJson } = req.body || {};
  const pkg = packageJson || {};
  const framework = detectFramework(pkg);
  const plan = getBuildPlan(framework);
  const job = createJob(repo || "unknown", branch || "main");
  job.framework = framework;
  res.status(202).json({
    message: "Deploy queued. You'll see the light pulse when it's live.",
    jobId: job.jobId,
    repo: job.repo,
    branch: job.branch,
    framework,
    buildCommand: plan.buildCommand,
    outputDir: plan.outputDir,
  });
});

app.post("/api/deploy", (req: Request, res: Response) => {
  const { projectId, commitSha, packageJson } = req.body || {};
  const pkg = packageJson || {};
  const framework = detectFramework(pkg);
  const plan = getBuildPlan(framework);
  const job = createJob();
  job.framework = framework;
  res.status(202).json({
    message: "Deploy queued. No Docker, no pipeline — just flow.",
    jobId: job.jobId,
    framework,
    buildCommand: plan.buildCommand,
    outputDir: plan.outputDir,
  });
});

app.get("/api/deploy/:jobId", (req: Request, res: Response) => {
  const job = jobs.get(req.params.jobId);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json({
    jobId: job.jobId,
    status: job.status,
    repo: job.repo,
    branch: job.branch,
    framework: job.framework,
    createdAt: job.createdAt,
    completedAt: job.completedAt,
    lightPulse: job.status === "done",
    previewUrl: job.outputUrl,
  });
});

app.listen(PORT, () => {
  console.log(`ZenFlare Deploy listening on port ${PORT}`);
});
