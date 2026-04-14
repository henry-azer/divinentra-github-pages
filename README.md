# DIVI**N**ENTRA

**Engineering What Matters.**

Corporate portfolio and landing page for [Divinentra](https://divinentra.com) — a technology company building privacy-first products and delivering consulting, custom development, and B2B solutions.

---

## Overview

A modern, animation-driven single-page website built with zero dependencies. Features a Canvas particle network, cinematic scroll reveals, and interactive micro-animations — all in vanilla HTML, CSS, and JavaScript.

### Sections

| Section | Description |
|---------|-------------|
| **Hero** | Typewriter headline, animated particle background, dual CTAs |
| **About** | Company mission with animated orbit rings visual |
| **Services** | Custom Development, Consulting & Strategy, B2B Solutions |
| **Products** | Product showcase with floating phone mockup |
| **Expertise** | Orbiting tech constellation + engineering principles |
| **Contact** | Email CTA, GitHub, and LinkedIn |

### Pages

- `index.html` — Main single-page site
- `privacy-policy.html` — Privacy policy
- `terms-of-service.html` — Terms of service

---

## Tech Stack

- **HTML5** — Semantic markup, Open Graph, SEO meta
- **CSS3** — Custom properties, Grid, Flexbox, CSS animations, responsive breakpoints
- **JavaScript** — Canvas API, Intersection Observer, requestAnimationFrame
- **Fonts** — [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Hosting** — GitHub Pages

No frameworks. No build step. No dependencies.

---

## Design System

### Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `--black` | `#000000` | Primary background |
| `--white` | `#FFFFFF` | Primary text |
| `--accent` | `#00E5A0` | CTAs, highlights, interactive states |
| `--gray-400` | `#9CA3AF` | Secondary text |
| `--gray-800` | `#1F1F1F` | Card surfaces |
| `--gray-900` | `#0A0A0A` | Alternate section backgrounds |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | Inter | 700 – 900 |
| Body | Inter | 400 – 500 |
| Monospace | JetBrains Mono | 400 |

### Branding

The **DIVINENTRA** wordmark uses Inter weight 900 in white, with the **N** highlighted in neon mint (`#00E5A0`).

---

## Animation Layers

### 1. Particle Network (Canvas)

Full-viewport particle system with mouse-reactive connections. Accent-colored particles glow with mint. Retina-aware rendering via `devicePixelRatio`.

### 2. Scroll Reveals (Intersection Observer)

Content fades, slides, and scales into view as the user scrolls. Staggered timing for grouped elements.

### 3. Micro-Interactions

- **Magnetic buttons** — CTAs follow cursor on hover
- **3D card tilt** — Service cards rotate in perspective on mousemove
- **Text scramble** — Tech pills decode from random characters on reveal
- **Typewriter** — Hero heading types character by character

All interactions are disabled on touch devices.

---

## Project Structure

```
divinentra-github-pages/
├── index.html                 # Single-page site
├── privacy-policy.html        # Privacy policy
├── terms-of-service.html      # Terms of service
├── CNAME                      # Custom domain (divinentra.com)
├── css/
│   └── styles.css             # Design tokens, components, responsive
├── js/
│   ├── particles.js           # Canvas particle network
│   └── main.js                # Navigation, reveals, micro-interactions
└── assets/
    └── screenshots/
        └── padlock/
            └── home-dark.png  # Product showcase screenshot
```

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| >= 1024px | Full desktop layout, all animations active |
| 768 – 1023px | Tablet — stacked grids, reduced spacing |
| < 768px | Mobile — hamburger nav, single column, reduced particles, touch-safe (no tilt/magnetic) |

---

## Deployment

Hosted on **GitHub Pages**, served from the root of the `main` branch.

```bash
git push origin main
```

Custom domain configured via `CNAME` file pointing to `divinentra.com`.

---

## Performance

- **Total code size:** ~84 KB (excluding images)
- **Dependencies:** 0
- **Build step:** None
- **First paint:** < 0.5s
- **Retina support:** Canvas renders at native device pixel ratio

---

## Contact

- **Email** — [henry.azer@outlook.com](mailto:henry.azer@outlook.com)
- **LinkedIn** — [linkedin.com/in/henry-azer](https://www.linkedin.com/in/henry-azer)
- **GitHub** — [github.com/henry-azer](https://github.com/henry-azer)

---

## License

Copyright 2026 Divinentra. All rights reserved.
