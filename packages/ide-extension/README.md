# @zenflare/ide-extension

ZenFlare IDE Extension — **Zen zone** and **Flare** inside VS Code (and later JetBrains).

- **Zen zone:** Dim all code except the function you’re working on.
- **Flare:** When complexity is high, a soft glow appears; one click → AI refactor suggestion.

**Slogan:** *From first line to production. No noise, just flow.*

---

## Commands

| Command | Description |
|--------|-------------|
| `ZenFlare: Toggle Zen Zone` | Turn Zen zone (dim non-focused code) on/off. |
| `ZenFlare: Show Flare (refactor)` | Show Flare for selection; refactor suggestion (coming soon). |

---

## Configuration

- `zenflare.zenZone.enabled` — Enable Zen zone (default: `true`).
- `zenflare.flare.complexityThreshold` — Cyclomatic complexity above this shows Flare (default: `10`).

---

## Build & test

```bash
pnpm install
pnpm build
pnpm test
```

Then run from VS Code: **F5** (Run → Run ZenFlare Extension) or use `.vscode/launch.json`. Or package and install the VSIX.

- **Tests:** `src/complexity.test.ts` — cyclomatic complexity and label (Node `--test`).

---

## Logo & icons

See [BRANDING.md](../../docs/BRANDING.md). Extension icon: use `resources/icon.png` (128×128) from main logo or `assets/icons/`.
