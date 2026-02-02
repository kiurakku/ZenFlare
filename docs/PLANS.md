# ZenFlare Plans & Roadmap

Planned milestones and priorities for the ZenFlare platform.

---

## Vision (reminder)

**Slogan (full):** ZenFlare: From the first line to production. No noise, just flow.

**Goal:** One all-in-one flow — write in IDE with Zen zone + Flare, deploy with one push, observe with one clear message and a calm dashboard.

---

## Phase 0 — Foundation (current)

- [x] Repo structure and monorepo layout
- [x] README, ARCHITECTURE, SLOGAN, PLANS, CREDITS
- [x] Branding: logo, icons, BRANDING.md
- [ ] LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY
- [ ] Package skeletons: `ide-extension`, `deploy`, `observability`
- [ ] Shared config: TypeScript, ESLint, pnpm workspaces

---

## Phase 1 — IDE Extension (MVP)

**Target:** VS Code only first.

- [ ] Zen zone: dim non-focused regions (current function/block by cursor)
- [ ] Flare: compute cyclomatic complexity (e.g. per function), show glow when above threshold
- [ ] Flare click: open refactor panel (local or API); apply diff
- [ ] Settings: enable/disable Zen zone and Flare, complexity threshold
- [ ] Icon and marketplace listing (ZenFlare branding)

**Stretch:** JetBrains plugin skeleton.

---

## Phase 2 — Deploy (MVP)

- [ ] Deploy API: receive webhook (e.g. GitHub push) or IDE “Deploy” request
- [ ] Framework detection (e.g. Next, Vite, Nuxt, CRA) and build command
- [ ] Build runner (sandboxed), artifact storage
- [ ] Hosting: serve static + optional server; SSL, custom domain later
- [ ] “Light pulse” feedback (IDE or web) when deploy succeeds
- [ ] Image optimization and cache headers (basic)

**Stretch:** Deploy from IDE with one click (auth + project link).

---

## Phase 3 — Observability (MVP)

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
