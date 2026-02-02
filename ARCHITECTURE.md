# ZenFlare Architecture

High-level architecture of the ZenFlare platform: IDE extension, Deploy, and Observability.

---

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ZenFlare Platform                                  │
├─────────────────┬─────────────────────────────┬─────────────────────────────┤
│  IDE Extension  │         Deploy               │      Observability          │
│  (VS Code / JB) │  (build, host, optimize)    │  (logs, alerts, dashboard)  │
├─────────────────┼─────────────────────────────┼─────────────────────────────┤
│  • Zen zone     │  • Framework detection      │  • Log aggregation          │
│  • Flare (AI)   │  • Image/cache optimization │  • One-message alerts       │
│  • Refactor UI  │  • Git push → live          │  • Zen-Dashboard (waves)    │
└────────┬────────┴──────────────┬──────────────┴──────────────┬──────────────┘
         │                       │                              │
         ▼                       ▼                              ▼
    Editor APIs             ZenFlare Deploy API           ZenFlare Observability API
         │                       │                              │
         └───────────────────────┴──────────────────────────────┘
                                    │
                                    ▼
                         ZenFlare Cloud (auth, projects, config)
```

---

## 1. ZenFlare IDE Extension

**Role:** Focus and refactoring inside the editor.

| Layer | Responsibility |
|-------|----------------|
| **Zen zone** | Dim everything except the current function/block. Cursor/selection–driven. |
| **Flare** | Detect high cyclomatic complexity (or other metrics). Show soft glow; on click, call refactor API. |
| **Refactor** | Send snippet to ZenFlare refactor service (or local AI); apply suggested diff in editor. |

**Tech:** VS Code Extension API / JetBrains plugin API; optional LSP for complexity.

**Repositories / packages:** `packages/ide-extension` (e.g. VS Code first, JetBrains later).

---

## 2. ZenFlare Deploy

**Role:** From repo or IDE to live site with no manual Docker/CI.

| Layer | Responsibility |
|-------|----------------|
| **Ingest** | Git push webhook or IDE “Deploy” action → create build. |
| **Detect** | Detect framework (Next, Vite, Nuxt, etc.) and root; choose build command. |
| **Build** | Run build in sandbox; optimize images and caching (e.g. sharp, cache headers). |
| **Host** | Serve static/assets + optional server/edge; custom domain, SSL. |
| **Feedback** | “Light pulse” animation in IDE or in web UI when deploy finishes. |

**Tech:** Build runners (Node), object storage + CDN, optional edge (e.g. Workers). API for IDE and GitHub/GitLab webhooks.

**Repositories / packages:** `packages/deploy` (API + worker), `packages/deploy-cli` (optional).

---

## 3. ZenFlare Observability

**Role:** One clear signal instead of log spam.

| Layer | Responsibility |
|-------|----------------|
| **Ingest** | Collect logs and metrics from deployed apps (agent or SDK). |
| **Analyze** | Group errors, find root cause (e.g. “DB failed for this query”). |
| **Alert** | One message to Slack/Telegram with summary + “fix” link or action. |
| **Dashboard** | Zen-Dashboard: calm waves or “breathing” flames for load; red = problem. |

**Tech:** Log pipeline (e.g. Vector/Fluent), storage (e.g. ClickHouse or managed), alerting, web dashboard (React/Vue + WebSocket for live).

**Repositories / packages:** `packages/observability` (backend + dashboard app).

---

## 4. Cross-cutting

- **Auth:** Single ZenFlare account; used by IDE, Deploy, Observability.
- **Projects:** One project = one repo + N deploys + one observability scope.
- **Billing:** Optional later; not in initial scope.

---

## 5. Data flow (simplified)

1. **Write** — Developer codes in IDE; Zen zone and Flare run locally + optional cloud refactor.
2. **Deploy** — Push or click → Deploy API → build → host → “pulse” feedback.
3. **Observe** — App sends logs/metrics → Observability ingests → analyzes → one alert; dashboard shows waves/flames.

---

## 6. Docs and next steps

- [PLANS.md](docs/PLANS.md) — Roadmap and milestones.
- [README.md](README.md) — Product overview and quick start.
- Package READMEs in `packages/*` for per-component details.
