# ZenFlare Plans & Roadmap

Planned milestones and priorities for the ZenFlare platform.

---

## Vision (reminder)

**Slogan (full):** ZenFlare: From the first line to production. No noise, just flow.

**Goal:** One all-in-one flow — write in IDE with Zen zone + Flare, deploy with one push, observe with one clear message and a calm dashboard.

---

## Phase 0 — Foundation (done)

- [x] Repo structure and monorepo layout
- [x] README, ARCHITECTURE, SLOGAN, PLANS, CREDITS, BRANDING, DEPLOY, TESTING
- [x] Branding: logo, icons, BRANDING.md
- [x] LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY
- [x] Package skeletons: `ide-extension`, `deploy`, `observability`
- [x] TypeScript, pnpm workspaces, CI (build + test), deploy-pages

---

## Phase 1 — IDE Extension (MVP, in progress)

**Target:** VS Code only first.

- [x] Zen zone: dim non-focused regions (current line by cursor)
- [x] Flare: cyclomatic complexity module, show glow when above threshold (configurable)
- [x] Commands: Toggle Zen Zone, Show Flare (selection); settings: zenZone.enabled, flare.complexityThreshold
- [x] Unit tests: complexity (Node --test); launch config (F5)
- [ ] Flare click: open refactor panel (local or API); apply diff
- [ ] Icon and marketplace listing (ZenFlare branding)

**Stretch:** JetBrains plugin skeleton.

---

## Phase 2 — Deploy (MVP, in progress)

- [ ] Deploy API: receive webhook (e.g. GitHub push) or IDE “Deploy” request
- [ ] Framework detection (e.g. Next, Vite, Nuxt, CRA) and build command
- [ ] Build runner (sandboxed), artifact storage
- [ ] Hosting: serve static + optional server; SSL, custom domain later
- [ ] “Light pulse” feedback (IDE or web) when deploy succeeds
- [ ] Image optimization and cache headers (basic)

**Stretch:** Deploy from IDE with one click (auth + project link).

---

## Phase 3 — Observability (MVP, in progress)

- [x] API: `/ingest/logs`, `/alerts/summary`, `/api/dashboard/state`
- [x] Zen-Dashboard: waves + breathing flames (calm/warning/problem); served at `/dashboard`; assets for local dev
- [ ] Log ingestion (agent or SDK) from deployed apps
- [ ] Error grouping and root-cause summary (e.g. “DB failed for query X”)
- [ ] One-message alert to Slack/Telegram with link or fix action
- [ ] Zen-Dashboard: waves or “breathing” flames for load; red = problem
- [ ] Optional: link Deploy project to Observability project

**Stretch:** In-app “Fix” button that deep-links to code or runbook.

---

## Phase 4 — Polish & scale

- [ ] Auth and projects: one account, multiple projects
- [ ] Billing (optional)
- [ ] JetBrains plugin (full)
- [ ] More frameworks and runtimes for Deploy
- [ ] More alert channels and dashboard widgets
- [ ] Public docs site (with logo and slogan)

---

## Priorities

1. **Zen zone + Flare** — Core differentiator in the IDE.
2. **Deploy from push** — No Docker/CI config.
3. **One alert, not a thousand logs** — Core Observability promise.
4. **Zen-Dashboard** — Calm UI (waves/flames), not chaotic graphs.

---

## References

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [SLOGAN.md](SLOGAN.md)
- [README.md](../README.md)
