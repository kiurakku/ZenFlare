# ZenFlare — Deploy & CI/CD

## CI (build)

- **Workflow:** [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)
- **Triggers:** Push and pull requests to `main` / `master`
- **Steps:** Checkout → pnpm 9 → Node 20 → `pnpm install` → `pnpm build`
- **Badge:** [![CI](https://github.com/kiurakku/ZenFlare/actions/workflows/ci.yml/badge.svg)](https://github.com/kiurakku/ZenFlare/actions/workflows/ci.yml)

## Deploy Zen-Dashboard to GitHub Pages

- **Workflow:** [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)
- **Triggers:** Push to `main`, or manual `workflow_dispatch`
- **Artifact:** `packages/observability/dashboard` (static HTML/CSS/JS)
- **Enable Pages:** Repo **Settings → Pages → Build and deployment → Source:** **GitHub Actions**
- **URL:** `https://<username>.github.io/ZenFlare/` (replace `<username>` with your GitHub user or org)

## Local run

```bash
pnpm install
pnpm build
# Deploy API
cd packages/deploy && pnpm start
# Observability + Zen-Dashboard
cd packages/observability && pnpm start
# Open http://localhost:5000/dashboard
```

From first line to production. No noise, just flow.
