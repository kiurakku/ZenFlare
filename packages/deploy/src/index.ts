/**
 * ZenFlare Deploy — API entry.
 * One push or one click → framework detection, build, host, "light pulse" feedback.
 * From first line to production. No noise, just flow.
 */

import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Health for orchestrators
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "zenflare-deploy" });
});

// Webhook: e.g. GitHub push → trigger build
app.post("/webhook/deploy", (req, res) => {
  const { repo, branch, projectId } = req.body || {};
  // TODO: validate, enqueue build, return job id
  res.status(202).json({
    message: "Deploy queued. You’ll see the light pulse when it’s live.",
    jobId: `job-${Date.now()}`,
    repo: repo || "unknown",
    branch: branch || "main",
  });
});

// IDE "Deploy" button → same flow
app.post("/api/deploy", (req, res) => {
  const { projectId, commitSha } = req.body || {};
  res.status(202).json({
    message: "Deploy queued. No Docker, no pipeline — just flow.",
    jobId: `job-${Date.now()}`,
  });
});

app.listen(PORT, () => {
  console.log(`ZenFlare Deploy listening on port ${PORT}`);
});
