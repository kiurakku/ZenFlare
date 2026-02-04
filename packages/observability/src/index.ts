/**
 * ZenFlare Observability — API entry.
 * One message instead of a thousand logs; Zen-Dashboard (calm waves / breathing flames).
 * From first line to production. No noise, just flow.
 */

import express, { Request, Response, NextFunction } from "express";
import path from "path";

const app = express();
app.use(express.json());

function log(message: string, extra?: Record<string, unknown>) {
  const payload = {
    ts: new Date().toISOString(),
    service: "zenflare-observability",
    message,
    ...extra,
  };
  console.log(JSON.stringify(payload));
}

app.use((req: Request, _res: Response, next: NextFunction) => {
  log("http_request", { method: req.method, path: req.path });
  next();
});

const PORT = process.env.PORT || 5000;

type Status = "calm" | "warning" | "problem";

interface LogEvent {
  level: "info" | "warn" | "error";
  message: string;
  service?: string;
  timestamp: number;
}

interface AlertSummary {
  message: string;
  service?: string;
  lastErrorAt?: number;
}

const logs: LogEvent[] = [];
let lastAlert: AlertSummary | null = null;

function recordEvents(events: LogEvent[]) {
  for (const ev of events) {
    logs.push(ev);
  }
  // trim to last 1000 events
  if (logs.length > 1000) {
    logs.splice(0, logs.length - 1000);
  }

  const latestError = [...logs].reverse().find((e) => e.level === "error");
  if (latestError) {
    lastAlert = {
      message:
        latestError.message ||
        "Stay calm. Something failed — check the failing service.",
      service: latestError.service,
      lastErrorAt: latestError.timestamp,
    };
  }
}

function statusFromLevel(level: "info" | "warn" | "error"): Status {
  if (level === "error") return "problem";
  if (level === "warn") return "warning";
  return "calm";
}

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "zenflare-observability" });
});
app.get("/healthz", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "zenflare-observability" });
});

app.post("/ingest/logs", (req: Request, res: Response) => {
  const body = req.body || {};

  const now = Date.now();
  let events: LogEvent[] = [];

  if (Array.isArray(body.events)) {
    events = body.events.map((e: any) => ({
      level:
        e.level === "error" || e.level === "warn"
          ? e.level
          : ("info" as const),
      message: typeof e.message === "string" ? e.message : "event",
      service: typeof e.service === "string" ? e.service : undefined,
      timestamp:
        typeof e.timestamp === "number" && !Number.isNaN(e.timestamp)
          ? e.timestamp
          : now,
    }));
  } else if (body) {
    events = [
      {
        level:
          body.level === "error" || body.level === "warn"
            ? body.level
            : ("info" as const),
        message:
          typeof body.message === "string"
            ? body.message
            : "single event payload",
        service: typeof body.service === "string" ? body.service : undefined,
        timestamp:
          typeof body.timestamp === "number" && !Number.isNaN(body.timestamp)
            ? body.timestamp
            : now,
      },
    ];
  }

  recordEvents(events);

  res.status(202).json({
    message: "Logs received. One message when something breaks.",
    count: events.length,
  });
});

app.post("/alerts/summary", (_req: Request, res: Response) => {
  if (!lastAlert) {
    res.json({
      message: "Stay calm. No recent errors detected.",
      summary: "ZenFlare Observability — all calm.",
    });
    return;
  }

  res.json({
    message: "Stay calm. One message, not a thousand logs.",
    summary: lastAlert.message,
    service: lastAlert.service,
    lastErrorAt: lastAlert.lastErrorAt,
  });
});

const defaultServers = [
  { id: "s1", name: "API" },
  { id: "s2", name: "Worker" },
  { id: "s3", name: "DB" },
];

app.get("/api/dashboard/state", (_req: Request, res: Response) => {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // last 5 minutes

  const recent = logs.filter((l) => now - l.timestamp <= windowMs);

  const byService = new Map<
    string,
    { total: number; errors: number; warns: number; lastLevel: LogEvent["level"] }
  >();

  for (const ev of recent) {
    const service = ev.service || "API";
    if (!byService.has(service)) {
      byService.set(service, {
        total: 0,
        errors: 0,
        warns: 0,
        lastLevel: "info",
      });
    }
    const agg = byService.get(service)!;
    agg.total += 1;
    if (ev.level === "error") agg.errors += 1;
    if (ev.level === "warn") agg.warns += 1;
    agg.lastLevel = ev.level;
  }

  const servers = defaultServers.map((base) => {
    const agg = byService.get(base.name) || {
      total: 0,
      errors: 0,
      warns: 0,
      lastLevel: "info" as const,
    };
    const level: LogEvent["level"] =
      agg.errors > 0 ? "error" : agg.warns > 0 ? "warn" : "info";
    const status = statusFromLevel(level);
    const load =
      agg.total === 0 ? 0.3 : Math.min(1, 0.2 + Math.log10(agg.total + 1));

    return {
      id: base.id,
      name: base.name,
      load,
      status,
    };
  });

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
  log("service_started", {
    port: PORT,
    dashboardUrl: `http://localhost:${PORT}/dashboard`,
  });
});
