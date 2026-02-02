# ZenFlare Branding & Assets

Logo, icons, and visual identity for ZenFlare.

---

## Logo

**Primary logo:** `src/public/logo.png`

- Additional assets: `Bg+logo.jpeg`, `bg1.jpg`, `bg2.jpg`, `bg3.jpg`, `phone+logo.jpg`, `vid/phone+logo.mp4` (hero, banners, video).
- Cloud + star motif with motion/flare elements; white/gray on dark.
- Use for: README, site landing, Zen-Dashboard, docs, social preview.

**Usage:**

- Prefer the logo on dark or neutral backgrounds.
- Minimum clear space: ~20% of logo height on each side.
- Don’t stretch; keep aspect ratio.

**Lockup with slogan:**

```
[Logo] ZenFlare — From first line to production. No noise, just flow.
```

See [SLOGAN.md](SLOGAN.md) for full taglines.

---

## Icons

| Asset | Path | Use |
|-------|------|-----|
| App icon (square) | `assets/icons/icon-512.png` | PWA, app stores, IDE extension |
| Favicon | `assets/icons/favicon.ico` or `favicon.svg` | Browser tab, bookmarks |
| Flare icon (small) | `assets/icons/flare.svg` | Flare UI in IDE, badges |
| OG image | `assets/og.png` | Social preview (optional; can use logo) |

**Flare icon:** A small “glow” or spark motif for the “intelligent flare” in the IDE. Can be derived from the logo’s flare/star element.

**Favicon:** 32×32 or SVG; can be a simplified cloud+star or single flame.

---

## Where files live

```
ZenFlare/
├── src/public/
│   └── logo.jpeg          # Main logo
├── assets/
│   ├── icons/
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── flare.svg
│   │   └── icon-512.png
│   └── og.png             # Optional social preview
├── packages/ide-extension/
│   └── resources/         # Extension icon (e.g. 128×128)
└── docs/
    └── BRANDING.md        # This file
```

Add the actual icon files under `assets/icons/` as they are designed. This doc defines the intended structure.

---

## Colors (suggested)

- **Background (dark):** `#0a0a0a` or `#111` — for logo and “Zen” UIs.
- **Primary (light):** `#ffffff` / `#e5e5e5` — logo and text on dark.
- **Accent (flare):** Soft glow; e.g. `rgba(255,255,255,0.6)` or a warm tint for “breathing” flames in the dashboard.

---

## References

- [SLOGAN.md](SLOGAN.md) — Taglines and lockup text.
- [README.md](../README.md) — Logo in hero.
