# @zenflare/deploy

ZenFlare Deploy — one push or one click; no Docker, no CI config. Framework detection, build, host, "light pulse" when live.

**Slogan:** *From first line to production. No noise, just flow.*

---

## Features

- **Webhook:** `POST /webhook/deploy` (e.g. GitHub push) → queue build.
- **IDE:** `POST /api/deploy` (projectId, commitSha) → same flow.
- **Framework detection:** Next, Vite, Nuxt, CRA, static; see `src/detect.ts`.
- **Light pulse:** Feedback in IDE or web when deploy finishes (TODO: WebSocket or polling).

---

## Build & run

```bash
pnpm install
pnpm build
pnpm start
```

Dev: `pnpm dev` (ts-node-dev).

---

## Logo & branding

See [BRANDING.md](../../docs/BRANDING.md). "Light pulse" animation: use ZenFlare flare/logo motif.
