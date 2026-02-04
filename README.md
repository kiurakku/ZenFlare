<p align="center">
  <img src="src/public/logo.png" alt="ZenFlare" width="160" height="160" />
</p>

# ZenFlare

[![CI](https://github.com/kiurakku/ZenFlare/actions/workflows/ci.yml/badge.svg)](https://github.com/kiurakku/ZenFlare/actions/workflows/ci.yml)
[![Deploy Zen-Dashboard](https://github.com/kiurakku/ZenFlare/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/kiurakku/ZenFlare/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> CI і Deploy‑воркфлови відображаються через бейджі вище; їхній колір показує поточний статус (зелений = усе ок, червоний = останній ран упав, дивись вкладку Actions).

**The single Cloud platform for "Full calm"**

> **ZenFlare: From the first line to production. No noise, just flow.**  
> You start in the IDE; one push takes you live; one message tells you when something breaks — one continuous flow, no tool overload.

[Full slogan & taglines →](docs/SLOGAN.md)

---

ZenFlare is an **all-in-one** solution for developers: you don’t switch between tabs or drown in alerts and pipelines. You get a clean result in a calm, focused environment.

Modern IT is overloaded: Jira, GitHub, Sentry, AWS, Slack… ZenFlare offers the opposite — **minimalism**. You get more than hosting; you get **developer peace of mind**.

---

## Three stages. One flow.

### 1. **ZenFlare IDE Extension** — Writing stage

You write code in **VS Code** or **JetBrains**.

| What it does | What you see |
|--------------|--------------|
| **Zen zone** | The plugin doesn’t just underline errors. It dims all code except the function you’re working on — so nothing distracts. |
| **Intelligent flare** | As soon as code gets complex (high cyclomatic complexity), a soft glow appears on the side. One click — and AI suggests a refactor so the code stays clean. |

### 2. **ZenFlare Deploy** — Launch stage

Code is ready. You **don’t** configure Dockerfiles or CI/CD pipelines.

| What it does | What you see |
|--------------|--------------|
| **One click / one push** | From the IDE or via `git push`, the project goes straight to ZenFlare hosting. |
| **Magic under the hood** | The system detects the framework, optimizes images and caching. You only see the “light pulse” animation — and the site is live. |

### 3. **ZenFlare Observability** — Support stage

After deploy, the real value kicks in. Instead of a flood of “Error 500” — one clear signal.

| What it does | What you see |
|--------------|--------------|
| **One message instead of thousands of logs** | If something fails on the server, ZenFlare analyzes logs and sends **one** message to Slack/Telegram: *“Stay calm. The DB failed due to this request. Here’s a button to fix it.”* |
| **Zen-Dashboard** | Server load isn’t chaotic graphs — it’s calm waves or “breathing” flames. Red flame = problem there. |

---

## Stack and repository

- [Architecture →](ARCHITECTURE.md) · [Plans & roadmap →](docs/PLANS.md) · [Branding & icons →](docs/BRANDING.md)

| Component | Description |
|-----------|-------------|
| `packages/ide-extension` | VS Code / JetBrains extension (Zen zone, Flare, refactoring) |
| `packages/deploy` | Deploy service: framework detection, optimization, hosting |
| `packages/observability` | Log aggregation, alerts, Zen-Dashboard |

---

## Quick start (in development)

```bash
# Clone
git clone https://github.com/kiurakku/ZenFlare.git
cd ZenFlare

# Ensure you use pnpm from package.json (pnpm@9) and Node >= 18
pnpm install
pnpm build
pnpm test
```

- **IDE Extension:** Open repo in VS Code, press **F5** (Run → Run ZenFlare Extension) or run from `.vscode/launch.json`.
- **Deploy API:** `cd packages/deploy && pnpm start` (port 4000).
- **Observability + Zen-Dashboard:** `cd packages/observability && pnpm start` (port 5000, `/dashboard`).
- **Tests:** `pnpm test` runs unit tests for `ide-extension` (complexity) and `deploy` (framework detection). See [docs/TESTING.md](docs/TESTING.md).

**Site** (landing + Zen-Dashboard) is deployed to **GitHub Pages** on every push to `main`: landing with logo, banners (`bg1`, `Bg+logo`, `phone+logo`), video (`vid/phone+logo.mp4`), and Zen-Dashboard (waves + breathing flames). Enable Pages in **Settings → Pages → Source: GitHub Actions**. Live: `https://<user>.github.io/ZenFlare/`.

---

## License and acknowledgments

This project is distributed under the **[MIT License](LICENSE)**.

ZenFlare was created with inspiration from:

- **Cloud9** — for the cloud-based IDE concept and quiet developer experience.
- **The ARS7 team** — for their contribution to the architecture and vision of the “full calm” platform.

Details are in [LICENSE](LICENSE) and in [Credits](docs/CREDITS.md).

---

## Contributing

We welcome contributors. Before sending a PR:

- read [CONTRIBUTING.md](CONTRIBUTING.md);
- follow the [Code of Conduct](CODE_OF_CONDUCT.md);
- for security issues — [SECURITY.md](SECURITY.md).

---

## Contact

- **Repository:** [github.com/kiurakku/ZenFlare](https://github.com/kiurakku/ZenFlare)
- **Issues:** [GitHub Issues](https://github.com/kiurakku/ZenFlare/issues)

---

<p align="center">
  <strong>ZenFlare</strong> — one flow from code to production. No noise.
</p>
