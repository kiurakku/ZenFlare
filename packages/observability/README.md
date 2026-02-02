# @zenflare/observability

ZenFlare Observability — one message instead of a thousand logs; Zen-Dashboard with calm waves or "breathing" flames (red = problem).

**Slogan:** *From first line to production. No noise, just flow.*

---

## Features

- **Ingest:** `POST /ingest/logs` — agent or SDK sends logs; we group and analyze.
- **Alert:** One summary to Slack/Telegram: "Stay calm. DB failed for this query. Here’s a button to fix it."
- **Zen-Dashboard:** `GET /api/dashboard/state` — load as calm waves or flames; red = problem (UI TODO).

---

## Build & run

```bash
pnpm install
pnpm build
pnpm start
```

Dev: `pnpm dev`.

---

## Logo & branding

See [BRANDING.md](../../docs/BRANDING.md). Dashboard: use wave/flame motif and ZenFlare colors.
