# Contributing to ZenFlare

Thank you for considering contributing. ZenFlare follows the slogan: *From first line to production. No noise, just flow.*

---

## Before you start

- Read the [README](README.md), [ARCHITECTURE.md](ARCHITECTURE.md), and [docs/PLANS.md](docs/PLANS.md).
- Check [GitHub Issues](https://github.com/kiurakku/ZenFlare/issues) for existing work and discussions.
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## How to contribute

1. **Fork** the repo and clone it.
2. **Branch** from `main` (e.g. `feature/zen-zone`, `fix/deploy-webhook`).
3. **Setup:** From repo root, run `pnpm install` (see [README](README.md) when scripts are added).
4. **Code** in the relevant package: `packages/ide-extension`, `packages/deploy`, or `packages/observability`.
5. **Test** and lint (commands will be documented in each package).
6. **Commit** with clear messages (e.g. "feat(ide): add Zen zone dimming").
7. **Push** and open a **Pull Request** against `main`.

---

## Project structure

- `packages/ide-extension` — VS Code (and later JetBrains) extension: Zen zone, Flare, refactor.
- `packages/deploy` — Deploy API and build/host pipeline.
- `packages/observability` — Log aggregation, alerts, Zen-Dashboard.
- `docs/` — SLOGAN, PLANS, ARCHITECTURE, BRANDING, CREDITS.
- `assets/` — Icons, favicon; see [docs/BRANDING.md](docs/BRANDING.md).

---

## Code style

- TypeScript where applicable.
- Follow existing style in the package (ESLint/Prettier when added).
- Prefer small, focused PRs.

---

## Security

For security-sensitive issues or vulnerabilities, see [SECURITY.md](SECURITY.md).

---

## Questions

Open a [GitHub Discussion](https://github.com/kiurakku/ZenFlare/discussions) or an [Issue](https://github.com/kiurakku/ZenFlare/issues).
