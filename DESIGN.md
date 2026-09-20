---
name: "PATRICK204NQH"
description: "Personal portfolio — precise, explorative, grounded."
colors:
  ink: "#0a2e4a"
  ink-dim: "rgba(10,46,74,0.72)"
  ink-muted: "rgba(10,46,74,0.5)"
  surface: "#ffffff"
  surface-alt: "#eef5fb"
  surface-border: "rgba(10,46,74,0.1)"
  accent: "#2f7fc4"
  accent-hover: "#1e6bb0"
  accent-glow: "rgba(47,127,196,0.06)"
  sky-top: "#7dc4fc"
  sky-bottom: "#d9ecfb"
  sea: "#a9cfe8"
typography:
  display:
    fontFamily: "DM Sans, Inter, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5.5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-1.5px"
  body:
    fontFamily: "Inter, -apple-system, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  mono:
    fontFamily: "SF Mono, Fira Code, Cascadia Code, monospace"
    fontSize: "0.8rem"
rounded:
  pill: "100px"
  glass: "20px"
  card: "12px"
  contact: "14px"
spacing:
  section: "6rem"
  section-mobile: "3rem"
  container: "42rem"
components:
  nav-glass:
    backgroundColor: "rgba(255,255,255,0.55)"
    textColor: "{ink}"
    rounded: "{rounded.glass}"
    padding: "0.6rem 1rem 0.6rem 1.25rem"
  hero-link:
    backgroundColor: "rgba(255,255,255,0.5)"
    textColor: "{ink}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.25rem"
  project-card:
    backgroundColor: "{surface}"
    textColor: "{ink}"
    rounded: "{rounded.card}"
    padding: "1rem 1.25rem"
  contact-link:
    backgroundColor: "{surface}"
    textColor: "{ink}"
    rounded: "{rounded.contact}"
    padding: "1rem 1.25rem"
---

# Design System: PATRICK204NQH — Bright Open Water

## 1. Overview

**Creative North Star: "Bright Open Water"** — a single vessel on open sea at
midday, sailing under a clear sky. The day version of the same journey: light,
airy, confident. Deep-sea blue is the ink; the sky is the canvas; the sky-blue
accent is ambient light, not a rare beacon — it can appear wherever the sun
would touch. The interface is flat and mostly typographic; the hero is a
sunlit sky with a horizon and the ship mark. The only elevation is the hero's
horizon line, not shadows.

The 3D scene (cciv — a ship on open water) eventually replaces the static hero
visual. The system is designed to receive it as a full-bleed frame without a
redesign: the palette already is the daylight scene.

**Key Characteristics:**
- Light by default — daylight sea, no dark theme
- Deep-sea blue ink on near-white surfaces, sky-blue as ambient light
- Ship mark (monoline SVG) as the only illustration — at the horizon in the
  hero, in the footer
- Flat surfaces separated by hairline borders, no drop shadows
- DM Sans for display, Inter for body, mono for metadata
- Scroll reveal with cubic-bezier easing, respecting `prefers-reduced-motion`
- Hero is a static CSS sky gradient — no hero JavaScript, fast LCP

## 2. Colors

Daylight palette anchored in sky and deep water. One theme only — the day
theme; a dusk variant is deferred until the 3D scene lands.

### Primary
- **Deep Sea Ink** (`#0a2e4a`): All text and the ship mark. Near-navy, reads
  as ink with a blue cast.
- **Sky Blue** (`#2f7fc4`, hover `#1e6bb0`): Accent — links, hover borders,
  interactive indicators. Deepened from the old beacon `#7ab7ef` for AA
  contrast on white.

### Neutral
- **Spray** (`#ffffff`): Surface. True white, the sea foam of the system.
- **Low Tide** (`#eef5fb`): Subtle surface variant for code blocks and
  secondary backgrounds.
- **Foam** (`rgba(10,46,74,0.72)` / `#0a2e4a` at 72%): Primary body text.
- **Spray** mixed (`rgba(10,46,74,0.5)`): Muted text for metadata and footer.
- **Bulkhead** (`rgba(10,46,74,0.1)`): Border and divider color.

### Sky
- **Sky Top** (`#7dc4fc`) → **Sky Bottom** (`#d9ecfb`): The hero gradient.
- **Sea** (`#a9cfe8`): The horizon band at the base of the hero.

### Named Rules
**The Daylight Rule.** One theme. Light surfaces, deep-sea ink, sky-blue
accent. No dark mode — the site is a day sail. A dusk variant may return with
the 3D scene, styled to match the scene's own lighting, not bolted on.

**The Horizon Rule.** The hero's horizon is the only elevation treatment in
the system. Everything else separates by hairline borders, never shadows.

## 3. Typography

Unchanged from "The Open Water" — these were already right.

**Display Font:** DM Sans (with Inter fallback)
**Body Font:** Inter (with system-ui fallback)
**Label/Mono Font:** SF Mono / Fira Code / Cascadia Code (system monospace fallback)

**Character:** Clean and technical without being cold. DM Sans brings a
slightly warmer, more approachable feel to headlines. Inter handles body text
with precision. Monospace is reserved for code, metadata timestamps, and
label-like UI text — a nod to the developer audience without being a terminal
aesthetic.

### Hierarchy
- **Display** (600, `clamp(2rem, 5.5vw, 3.75rem)`, 1.1): Hero name and
  tagline. DM Sans, tight letter-spacing.
- **Headline** (550, `clamp(1.5rem, 3vw, 2.25rem)`, 1.2): Section headings.
  DM Sans, max 28ch width.
- **Title** (550, 1rem, 1.3): Card titles and subsection headings. DM Sans.
- **Body** (400, 15px, 1.7): All prose content. Inter, max 60ch line length.
- **Label** (450, 0.8rem, 1): Navigation links and metadata. Uppercase with
  letter-spacing for section labels.
- **Mono** (400, 0.75–0.9rem, 1.5): Code, timestamps, project metadata.

## 4. Elevation

Flat by default — the daylight rule. No drop shadows for depth. Surfaces are
separated by 1px `rgba(10,46,74,0.1)` borders. The single exception is the
hero's horizon: the sky gradient meets a flat sea band, and the ship mark
rides the line. A real 3D scene (cciv) will occupy this same slot later.

**The Flat-By-Default Rule.** Surfaces are separated by tonal borders, never
shadows. If a surface needs to feel distinct, use a border or background tint,
never a `box-shadow`. (The nav glass is translucent white over the page —
that is a material, not a shadow.)

## 5. Components

### Glass Navigation
- **Shape:** Pill-shaped, full-width rounded bar (`border-radius: 20px`).
- **Background:** `rgba(255,255,255,0.55)` with `backdrop-filter: blur(12px)`
  — frosted glass over whatever scrolls beneath.
- **Items:** Wordmark left (`PATRICK204NQH`, mono), links right
  (Home / Projects / Blog) with underline-on-hover via `::after`. No theme
  toggle — one theme.
- **Mobile:** Padding reduces, touch targets at least 44px.

### Pill Links (Hero CTAs)
- **Shape:** Full pill (`border-radius: 100px`).
- **Rest:** `rgba(255,255,255,0.5)` background, ink text,
  `rgba(255,255,255,0.6)` border.
- **Hover:** `#ffffff` background, `translateY(-1px)` lift.
- Primary CTA ("View projects"): `#2f7fc4` background, white text — one per
  screen.

### Project Cards
- **Shape:** Rounded rectangle (`border-radius: 12px`).
- **Rest:** `#ffffff` background, `rgba(10,46,74,0.1)` border. No shadow.
- **Hover:** Border shifts to sky blue, background gets `rgba(47,127,196,0.06)`
  tint.
- **Content:** Stacked — title (link), description, metadata row (language,
  stars, date).

### Contact Links
- **Shape:** Rounded row (`border-radius: 14px`).
- **Rest:** `#ffffff` background, hairline border, icon + label + value
  layout.
- **Hover:** Border to sky blue, background to `rgba(47,127,196,0.1)`, row
  shifts 4px right.
- **Content:** Three-part layout — icon (fixed width), label (monospace
  uppercase), value (monospace).

### About Flow Nodes
- **Shape:** Vertical list with bottom border separators.
- **Marker:** Right arrow (`→`) in sky blue, 50% opacity.
- **Content:** Two-column — marker + text block (heading + description).
- **No hover state.** Purely structural content, not interactive.

### Hero
- **Shape:** Full-viewport sky gradient (`#7dc4fc` → `#d9ecfb`), flat sea
  band (`#a9cfe8`) across the bottom ~20%, ship mark floating on the horizon
  line.
- **Content:** Mono kicker, display h1 (slogan), body tagline, pill CTAs.
- **Static.** CSS only — no hero JavaScript. This is the slot the cciv 3D
  scene takes when ready.

## 6. Do's and Don'ts

### Do:
- **Do** use deep-sea ink (`#0a2e4a`) for all text on light surfaces.
- **Do** keep surfaces flat — hairline borders, no drop shadows anywhere.
- **Do** use the sky gradient + horizon in the hero and nowhere else. It is
  the scene, not a decoration.
- **Do** keep the ship mark (monoline SVG, byte-identical to favicon) as the
  only illustration.
- **Do** use mono type for metadata, timestamps, and labels — it signals
  developer context.
- **Do** respect `prefers-reduced-motion` — all animations have fallbacks.
- **Do** keep accent usage purposeful: links, hover states, the primary CTA.
  On white, the deep sky blue is the sun — it should appear where the eye
  should go.

### Don't:
- **Don't** use drop shadows on content surfaces. No `box-shadow` on cards,
  buttons, or sections.
- **Don't** use gradient text (`background-clip: text`). All text is solid
  color.
- **Don't** use side-stripe borders (`border-left`/`border-right` as accent).
- **Don't** use the SaaS hero-metric template (big number + small label +
  stats) — the stats live on the projects page, not the hero.
- **Don't** introduce a dark theme "for night readers" — the day theme is the
  identity; dusk returns with the 3D scene or not at all.
- **Don't** use the tiny uppercase tracked eyebrow above every section. One
  system-level label is voice; every section is AI grammar.
- **Don't** use bounce or elastic easing. `cubic-bezier(0.22, 1, 0.36, 1)` for
  reveals, linear for state transitions.
- **Don't** let heading text overflow its container — test at every
  breakpoint.