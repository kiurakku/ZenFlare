/**
 * ZenFlare Observability — API entry.
 * One message instead of a thousand logs; Zen-Dashboard (calm waves / breathing flames).
 * From first line to production. No noise, just flow.
 */

import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "zenflare-observability" });
});

app.post("/ingest/logs", (req: Request, res: Response) => {
  const body = req.body || {};
  res.status(202).json({
    message: "Logs received. One message when something breaks.",
    count: Array.isArray(body.events) ? body.events.length : 1,
  });
});

app.post("/alerts/summary", (_req: Request, res: Response) => {
  res.json({
    message: "Stay calm. One message, not a thousand logs.",
    summary: "ZenFlare Observability — one flow.",
  });
});

const servers = [
  { id: "s1", name: "API", load: 0.3, status: "calm" },
  { id: "s2", name: "Worker", load: 0.8, status: "warning" },
  { id: "s3", name: "DB", load: 0.5, status: "calm" },
];

app.get("/api/dashboard/state", (_req: Request, res: Response) => {
  res.json({
    servers,
    message: "Red flame = problem. Calm waves = flow.",
  });
});

const dashboardPath = path.join(__dirname, "..", "dashboard");
const rootDir = path.join(__dirname, "..", "..", "..");
app.use("/assets", express.static(path.join(rootDir, "src", "public")));
app.use("/assets/icons", express.static(path.join(rootDir, "assets", "icons")));
app.use("/dashboard", express.static(dashboardPath));
app.get("/dashboard", (_req: Request, res: Response) => {
  res.sendFile(path.join(dashboardPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`ZenFlare Observability listening on port ${PORT}`);
  console.log(`Zen-Dashboard: http://localhost:${PORT}/dashboard`);
});
