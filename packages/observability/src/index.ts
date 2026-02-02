/**
 * ZenFlare Observability — API entry.
 * One message instead of a thousand logs; Zen-Dashboard (calm waves / breathing flames).
 * From first line to production. No noise, just flow.
 */

import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "zenflare-observability" });
});

// Ingest logs (agent or SDK)
app.post("/ingest/logs", (req, res) => {
  const body = req.body || {};
  // TODO: parse, group errors, root-cause; store for alerts
  res.status(202).json({
    message: "Logs received. One message when something breaks.",
    count: Array.isArray(body.events) ? body.events.length : 1,
  });
});

// Alert: one summary for Slack/Telegram
app.post("/alerts/summary", (_req, res) => {
  // TODO: generate one-message summary, send to Slack/Telegram
  res.json({
    message: "Stay calm. One message, not a thousand logs.",
    summary: "ZenFlare Observability — one flow.",
  });
});

// Zen-Dashboard: calm waves / breathing flames (API for UI)
app.get("/api/dashboard/state", (_req, res) => {
  res.json({
    servers: [
      { id: "s1", load: 0.3, status: "calm" },
      { id: "s2", load: 0.8, status: "warning" },
    ],
    message: "Red flame = problem. Calm waves = flow.",
  });
});

app.listen(PORT, () => {
  console.log(`ZenFlare Observability listening on port ${PORT}`);
});
