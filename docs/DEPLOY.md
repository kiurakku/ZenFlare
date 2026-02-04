# ZenFlare — Deploy & CI/CD

## Site (landing + Zen-Dashboard)

- **Landing:** `site/index.html` — hero with logo, slogan, banners (`bg1.jpg`, `Bg+logo.jpeg`), video (`vid/phone+logo.mp4`), CTA to Zen-Dashboard and GitHub.
- **Zen-Dashboard:** `packages/observability/dashboard/` — waves + breathing flames; design matches logo (dark `#0a0a0a`, flare accents).
- **Assets:** `src/public/` (logo, banners, video) and `assets/icons/` (favicon, flare) are copied into the deployed site.

## CI (build)

- **Workflow:** [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)
- **Triggers:** Push and pull requests to `main` / `master`
- **Steps:** Checkout → pnpm (версія з `packageManager` у `package.json`) → Node 20 → `pnpm install` → `pnpm lint` → `pnpm build` → `pnpm test`
- **Badge:** [![CI](https://github.com/kiurakku/ZenFlare/actions/workflows/ci.yml/badge.svg)](https://github.com/kiurakku/ZenFlare/actions/workflows/ci.yml)

## Deploy Zen-Dashboard to GitHub Pages

- **Workflow:** [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)
- **Triggers:** Push to `main`, or manual `workflow_dispatch`
- **Artifact:** вміст директорії `build/`, куди збираються:
  - `site/index.html` та `site/404.html` (лендінг);
  - `packages/observability/dashboard/` (Zen-Dashboard);
  - `src/public/` → `build/assets/` (лого, банери, відео);
  - `assets/icons/` → `build/assets/icons/` (favicon, flare-іконки).
- **Enable Pages:** Repo **Settings → Pages → Build and deployment → Source:** **GitHub Actions**
- **URL:** `https://<username>.github.io/ZenFlare/` (replace `<username>` with your GitHub user or org)

## Local run

```bash
pnpm install
pnpm build
# Deploy API (port 4000)
cd packages/deploy && pnpm start

# Observability API + Zen-Dashboard (port 5000)
cd packages/observability && pnpm start

# Open dashboard
# http://localhost:5000/dashboard
```

## Docker / containers

For a containerized local setup you can use the provided Dockerfiles and `docker-compose.yml`:

```bash
# Build and start Deploy + Observability
docker-compose up --build

# Deploy API: http://localhost:4000
# Observability + Zen-Dashboard: http://localhost:5000/dashboard
```

Both services expose `/health` and `/healthz` endpoints and log JSON lines to stdout (timestamp, service name, message, extra fields) which can be collected by any log aggregation system.

From first line to production. No noise, just flow.
