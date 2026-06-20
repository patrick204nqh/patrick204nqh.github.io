---
name: "PATRICK204NQH"
description: "Personal portfolio — precise, explorative, grounded."
colors:
  ink: "#e8edf5"
  ink-dim: "rgba(232,237,245,0.65)"
  ink-muted: "rgba(232,237,245,0.45)"
  surface: "#0b0e17"
  surface-alt: "#111624"
  surface-border: "rgba(255,255,255,0.06)"
  accent: "#7ab7ef"
  accent-hover: "#a3cffa"
  accent-glow: "rgba(122,183,239,0.08)"
  sky-top: "#0c0f25"
  sky-bottom: "#161b33"
  sea: "#020414"
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
    backgroundColor: "rgba(255,255,255,0.09)"
    textColor: "{ink}"
    rounded: "{rounded.glass}"
    padding: "0.6rem 1rem 0.6rem 1.25rem"
  hero-link:
    backgroundColor: "transparent"
    textColor: "rgba(255,255,255,0.6)"
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

# Design System: PATRICK204NQH — The Open Water

## 1. Overview

**Creative North Star: "The Open Water"**

A single vessel on deep water, navigating under shifting skies. Dark and quiet by default — the ocean at night. The sky-blue accent is a beacon, not a decoration: it appears sparingly to signal interaction and direction. The interface is flat by default; depth comes from the hero background (fixed sea animation) rather than from shadows or layered cards.

Density is comfortable, never crowded. Text is the primary medium — project descriptions, writing, code. Interactive elements use a liquid glass treatment inspired by iOS navigation: subtle blur, saturate, and contrast filters with an animated radial-gradient distortion layer. The effect is purposeful and contained to interactive surfaces (nav, buttons, links), never applied decoratively.

**Key Characteristics:**
- Dark ocean palette with sky-blue accent (≤10% of any screen)
- Flat surfaces with tonal border separation, no drop shadows
- Liquid glass treatment on interactive elements only
- Monospace labels for metadata, DM Sans for display, Inter for body
- Scroll reveal with cubic-bezier easing, no bounce or elastic
- Hero background stays fixed while content scrolls over it

## 2. Colors

The palette is anchored in deep ocean tones with a single sky-blue accent. Dark mode is the default; light mode inverts surfaces and text while keeping the accent in a deeper blue.

### Primary
- **Sky Blue Beacon** (`#7ab7ef` / `#4a90d9` light): The sole accent. Used for section labels, hover borders, interactive indicators. Appears on ≤10% of any given screen.

### Neutral
- **Deep Water** (`#0b0e17` / `#f5f7fa` light): Body background. Near-black in dark mode, near-white in light mode.
- **Trench** (`#111624` / `#eef1f6` light): Subtle surface variant for code blocks and secondary backgrounds.
- **Foam** (`rgba(232,237,245,0.65)` / `rgba(15,23,42,0.65)` dark): Primary body text at 65% opacity for legibility.
- **Spray** (`rgba(232,237,245,0.45)` / `rgba(15,23,42,0.4)`): Muted text for metadata and footer.
- **Bulkhead** (`rgba(255,255,255,0.06)` / `rgba(0,0,0,0.06)`): Border and divider color.

### Named Rules
**The Beacon Rule.** The accent is used on ≤10% of any given screen. Its rarity is the point — it signals where to look and what to touch. Overuse drowns the signal.

**The One-Ocean Rule.** Dark mode is the default. Light mode inverts surfaces and text but the accent remains in the same blue family. The hero always stays dark — the sea doesn't change when you flip the lights.

## 3. Typography

**Display Font:** DM Sans (with Inter fallback)
**Body Font:** Inter (with system-ui fallback)
**Label/Mono Font:** SF Mono / Fira Code / Cascadia Code (system monospace fallback)

**Character:** Clean and technical without being cold. DM Sans brings a slightly warmer, more approachable feel to headlines. Inter handles body text with precision. Monospace is reserved for code, metadata timestamps, and label-like UI text — a nod to the developer audience without being a terminal aesthetic.

### Hierarchy
- **Display** (600, `clamp(2rem, 5.5vw, 3.75rem)`, 1.1): Hero name and tagline. DM Sans, tight letter-spacing. Text-shadow for readability over video background.
- **Headline** (550, `clamp(1.5rem, 3vw, 2.25rem)`, 1.2): Section headings. DM Sans, max 28ch width.
- **Title** (550, 1rem, 1.3): Card titles and subsection headings. DM Sans.
- **Body** (400, 15px, 1.7): All prose content. Inter, max 60ch line length.
- **Label** (450, 0.8rem, 1): Navigation links and metadata. Uppercase with letter-spacing for section labels.
- **Mono** (400, 0.75–0.9rem, 1.5): Code, timestamps, hero-kicker, project metadata.

## 4. Elevation

Flat by default. The design does not use drop shadows for depth. Surfaces are separated by 1px borders at `var(--border)` opacity. The only exception is the hero background (`hero-bg`), which uses `position: fixed` to create a genuine layered scrolling effect — the sea stays in place while content scrolls over it. This is the single elevation technique in the system; adding shadows would compete with it.

**The Flat-By-Default Rule.** Surfaces are separated by tonal borders, not shadows. The hero-bg's fixed positioning is the only elevation treatment. If a surface needs to feel distinct, use a border or background tint, never a `box-shadow`.

## 5. Components

### Liquid Glass Navigation
- **Shape:** Pill-shaped, full-width rounded bar (`border-radius: 20px`).
- **Background:** Semi-transparent with `backdrop-filter: blur() saturate(1.165) contrast(1.12)`. Opacity and blur intensity increase on scroll (Apple-style).
- **Distortion Layer:** `::before` pseudo-element with an animated radial gradient (`rgba(96,165,250,0.2) → transparent`) that slowly rotates 0°→180°, simulating liquid refraction. `filter: blur(8px)`, `will-change: transform`.
- **Highlight:** Inset `box-shadow` top edge for glass rim lighting.
- **Items:** Inline links with underline-on-hover via `::after`. Theme toggle icon button.
- **Mobile:** Padding reduces, touch targets at least 44px.

### Pill Links (Hero CTAs)
- **Shape:** Full pill (`border-radius: 100px`).
- **Rest:** Transparent background, `rgba(255,255,255,0.6)` text, `rgba(255,255,255,0.1)` border.
- **Hover:** `rgba(255,255,255,0.08)` background, full-white text, `translateY(-1px)` lift. No liquid glass overlay — the pill is clean.

### Project Cards
- **Shape:** Rounded rectangle (`border-radius: 12px`).
- **Rest:** `var(--bg)` background, `var(--border)` border. No shadow.
- **Hover:** Border shifts to accent color, background gets `var(--glow)` tint.
- **Content:** Stacked — title (link), description, metadata row (language, stars, date).

### Contact Links
- **Shape:** Rounded row (`border-radius: 14px`).
- **Rest:** `var(--bg)` background, `var(--border)` border, icon + label + value layout.
- **Hover:** Border to accent, background to `var(--accent-dim)`, row shifts 4px right.
- **Content:** Three-part layout — icon (fixed width), label (monospace uppercase), value (monospace).

### Theme Toggle
- **Shape:** Icon button, no border.
- **Rest:** `var(--text-dim)` color.
- **Hover:** `var(--text)` color, 20° rotation.
- **Behavior:** Toggles `data-theme="light"` on `<html>`. Preference stored in `sessionStorage`.

### About Flow Nodes
- **Shape:** Vertical list with bottom border separators.
- **Marker:** Right arrow (`→`) in accent color, 50% opacity.
- **Content:** Two-column — marker + text block (heading + description).
- **No hover state.** Purely structural content, not interactive.

## 6. Do's and Don'ts

### Do:
- **Do** use the liquid glass effect on the navigation bar and consider it for primary interactive surfaces. The `::before` radial-gradient animation is the signature.
- **Do** keep the sky-blue accent to ≤10% of any screen. Let it be the thing that draws the eye.
- **Do** use `backdrop-filter: blur() saturate() contrast()` for glass surfaces. Pair with `inset box-shadow` for the rim highlight.
- **Do** separate surfaces with tonal borders, not shadows. The flat-by-default rule.
- **Do** use mono type for metadata, timestamps, and code — it signals developer context.
- **Do** respect `prefers-reduced-motion` — all animations have fallbacks.
- **Do** test hero text on the video background. Maintain `text-shadow` for readability.
- **Do** keep the hero background fixed while content scrolls over it. This is the primary elevation technique.

### Don't:
- **Don't** use drop shadows anywhere on content surfaces. No `box-shadow` on cards, buttons, or sections.
- **Don't** apply the liquid glass effect decoratively. Only on interactive components — nav, buttons, links.
- **Don't** use gradient text (`background-clip: text`). All text is solid color.
- **Don't** use side-stripe borders (`border-left`/`border-right` as accent).
- **Don't** use the SaaS hero-metric template (big number + small label + stats).
- **Don't** put generic SaaS-cream or warm-tinted neutral backgrounds. The brand's neutral is the ocean's dark blue-gray.
- **Don't** use the tiny uppercase tracked eyebrow above every section. One system-level label is voice; every section is AI grammar.
- **Don't** use bounce or elastic easing. `cubic-bezier(0.22, 1, 0.36, 1)` for reveals, linear for state transitions.
- **Don't** let heading text overflow its container — test at every breakpoint.
