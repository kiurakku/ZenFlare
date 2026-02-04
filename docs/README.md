# ZenFlare Docs

Central docs for the ZenFlare platform. All text in English.

---

## Product & vision

| Doc | Description |
|-----|-------------|
| [SLOGAN.md](SLOGAN.md) | Full slogan, taglines, vision statement |
| [CREDITS.md](CREDITS.md) | Cloud9, ARS7 acknowledgments |
| [BRANDING.md](BRANDING.md) | Logo, icons, favicon, colors |

---

## Architecture & plans

| Doc | Description |
|-----|-------------|
| [ARCHITECTURE.md](../ARCHITECTURE.md) | High-level architecture (IDE, Deploy, Observability) |
| [PLANS.md](PLANS.md) | Roadmap, phases, priorities |
| [DEPLOY.md](DEPLOY.md) | CI/CD, GitHub Pages, local run |
| [TESTING.md](TESTING.md) | Unit tests, CI, per-package |

---

## Repo

- [README](../README.md) — Overview and quick start
- [CONTRIBUTING](../CONTRIBUTING.md) — How to contribute
- [CODE_OF_CONDUCT](../CODE_OF_CONDUCT.md) — Code of conduct
- [SECURITY](../SECURITY.md) — Security reporting
- [LICENSE](../LICENSE) — MIT + acknowledgments

---

## End-to-end demo (IDE → Deploy → Observability)

Minimal local flow without accounts/billing:

1. **IDE extension (Zen Zone + Flare)**
   - Open this repo in VS Code.
   - Press **F5** to run the ZenFlare extension (or use the existing launch config).
   - Open any TypeScript/JavaScript file and move the cursor: non-focused lines dim, active line stays bright.
   - Select a more complex block and run `ZenFlare: Show Flare (refactor)`:
     - you’ll see complexity info;
     - for high complexity a refactor quick pick appears (add TODO or extract helper function), and the chosen edit is applied.

2. **Deploy service (one push → hosted demo)**
   - In a terminal, run:
     - `cd packages/deploy`
     - `pnpm build`
     - `pnpm start` (starts HTTP API on port 4000).
   - Call the Deploy API once (for example with `curl` or REST client) to queue a demo deploy:
     - `POST http://localhost:4000/api/deploy` with a small `packageJson` payload.
   - Poll `GET http://localhost:4000/api/deploy/<jobId>` until `status` is `done` and `lightPulse` is `true`.
   - Open `http://localhost:4000/project/demo` — this is the hosted demo artifact (\"light pulse\" page).

3. **Observability + Zen-Dashboard (one message, calm flames)**
   - In another terminal, run:
     - `cd packages/observability`
     - `pnpm build`
     - `pnpm start` (starts HTTP API + Zen-Dashboard on port 5000).
   - Send a few log events to Observability:
     - `POST http://localhost:5000/ingest/logs` with JSON body (single event or `{ \"events\": [...] }`) containing `level`, `message`, and optional `service` (e.g. `\"API\"`, `\"Worker\"`, `\"DB\"`).
   - Call `POST http://localhost:5000/alerts/summary` to see the aggregated \"one message\" alert for the latest error.
   - Open `http://localhost:5000/dashboard`:
     - calm flames for services with only info logs;
     - warning/problem flames for services with `warn`/`error` logs;
     - state updates every few seconds from `/api/dashboard/state`.

This flow demonstrates the full path: **write with Zen Zone/Flare → trigger a demo deploy → send logs → see the calm Zen-Dashboard and one aggregated alert.**

---

**ZenFlare: From first line to production. No noise, just flow.**
