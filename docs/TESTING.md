# ZenFlare — Testing

Unit tests and CI for ZenFlare packages.

---

## Run tests

From repo root:

```bash
pnpm test
```

Runs tests in all packages:

- **@zenflare/ide-extension** — `cyclomaticComplexity`, `getComplexityLabel` (Node `--test`).
- **@zenflare/deploy** — `detectFramework`, `getBuildPlan` (Node `--test`).
- **@zenflare/observability** — placeholder (integration tests TBD).

---

## Per-package

```bash
cd packages/ide-extension && pnpm test   # complexity tests
cd packages/deploy && pnpm test          # detect tests
cd packages/observability && pnpm test   # no-op (TBD)
```

---

## CI

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs on push/PR to `main`:

1. Checkout
2. pnpm 9, Node 20
3. `pnpm install`
4. `pnpm build`
5. `pnpm test`

Test failures fail the workflow.

---

## Test files

| Package           | File                 | What is tested                    |
|-------------------|----------------------|-----------------------------------|
| ide-extension     | `src/complexity.test.ts` | Cyclomatic complexity, label     |
| deploy            | `src/detect.test.ts`    | Framework detection, build plan  |

---

## Reports

No coverage report yet. CI output shows test results. To add coverage later: `c8` or `vitest --coverage`.

From first line to production. No noise, just flow.
