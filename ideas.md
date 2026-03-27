# GE Pilot BOM — Design Brainstorm

## Context
Internal enterprise tool for Google Workspace / Gemini Enterprise sales and delivery teams. Audience: AEs, FDEs, SAs, CSMs, Presales engineers. Purpose: structured, navigable Bill of Materials across 3 phases of a 4-week pilot. Must feel authoritative, Google-adjacent, and professional — not a consumer app.

---

<response>
<probability>0.07</probability>
<text>

## Idea A — "Google Material Enterprise Dark"

**Design Movement:** Material Design 3 meets enterprise command center — dark, dense, precise.

**Core Principles:**
1. Information density over whitespace — pack value into every pixel
2. Dark surface hierarchy — layered dark grays create depth without color
3. Google brand anchoring — blue/teal accents, Roboto/Google Sans typography
4. Status-driven UI — every card communicates its state at a glance

**Color Philosophy:**
- Background: #0F1117 (near-black with blue undertone)
- Surface: #1A1D27, #22263A (layered card surfaces)
- Accent: Google Blue #4285F4, Google Green #34A853, Google Red #EA4335
- Text: #E8EAED primary, #9AA0A6 secondary
- Intent: Command center authority — feels like Google Cloud Console

**Layout Paradigm:**
- Fixed left sidebar with phase navigation (vertical pill nav)
- Main content area: 2-column artifact grid
- Sticky header with progress tracker
- Collapsible artifact cards with smooth expand animations

**Signature Elements:**
- Colored left-border accents on cards (phase-specific color)
- Monospace font for checklist items (terminal feel)
- Subtle grid dot pattern on dark background

**Interaction Philosophy:**
- Cards expand inline with smooth height animation
- Checkboxes animate with a satisfying fill effect
- Phase transitions slide content horizontally

**Animation:**
- Card expand: height 0→auto with cubic-bezier(0.4, 0, 0.2, 1) 200ms
- Phase switch: translateX slide with fade, 300ms
- Checkbox: scale + fill animation 150ms

**Typography System:**
- Display: Google Sans Display Bold (headings)
- Body: Roboto 400/500 (descriptions, body text)
- Mono: Roboto Mono (checklist items, tags)
- Scale: 11px label → 13px body → 16px card title → 24px section → 36px hero

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Idea B — "Executive Briefing Document"

**Design Movement:** Swiss International Typographic Style — clean, grid-based, editorial authority.

**Core Principles:**
1. Typography as structure — hierarchy through type weight/size, not decoration
2. Generous whitespace — breathing room signals confidence
3. Monochrome with one accent — black, white, off-white, and a single Google blue
4. Document authenticity — feels like a printed internal memo elevated to digital

**Color Philosophy:**
- Background: #FAFAFA (warm off-white)
- Surface: #FFFFFF cards on #F0F0F0 page
- Accent: #1A73E8 (Google Blue) for interactive elements only
- Text: #1C1C1E primary, #6E6E73 secondary
- Intent: Authoritative, printable, timeless

**Layout Paradigm:**
- Single-column centered layout, max-width 860px
- Phase tabs at top (horizontal pill tabs)
- Full-width section dividers with large section numbers
- Cards stacked vertically with clear typographic hierarchy

**Signature Elements:**
- Large section numbers (01, 02, 03) in light gray behind headings
- Thin horizontal rules between sections
- Badge pills for artifact types (PROCESS, TEMPLATE, CHECKLIST)

**Interaction Philosophy:**
- Minimal animation — content reveals feel deliberate, not flashy
- Expand/collapse with subtle opacity + height transition
- Focus on readability over interactivity

**Animation:**
- Card expand: opacity 0→1 + height, 180ms ease
- Phase switch: simple fade, 200ms
- Checkbox: simple fill, 100ms

**Typography System:**
- Display: DM Serif Display (section headings)
- Body: DM Sans 400/500 (descriptions)
- Labels: DM Mono (artifact type badges, checklist items)
- Scale: 10px label → 14px body → 18px card title → 28px section → 48px hero

</text>
</response>

<response>
<probability>0.05</probability>
<text>

## Idea C — "Google Workspace Command Dashboard"

**Design Movement:** Modern SaaS dashboard — light, structured, data-forward with Google brand DNA.

**Core Principles:**
1. Sidebar-anchored navigation — phase context always visible
2. Card-based information architecture — each artifact is a self-contained unit
3. Color-coded phase identity — each phase has a distinct accent color
4. Progressive disclosure — summary visible, detail on demand

**Color Philosophy:**
- Background: #F8F9FA (Google's signature light gray)
- Surface: #FFFFFF cards with subtle shadow
- Phase 1 (Pre-Sales): Google Blue #1A73E8
- Phase 2 (Delivery): Google Green #188038
- Phase 3 (Conversion): Google Orange #E37400
- Text: #202124 primary, #5F6368 secondary
- Intent: Familiar Google Workspace aesthetic — trusted, professional, functional

**Layout Paradigm:**
- Left sidebar (240px) with phase navigation + progress indicators
- Top header with BOM title and stats bar
- Main content: 2-column responsive card grid
- Each card: type badge, title, description, expand button

**Signature Elements:**
- Phase-colored left accent bar on each card
- Progress stepper in sidebar showing completion %
- Sticky stats bar (Total Artifacts, Duration, Conversion Gate)

**Interaction Philosophy:**
- Cards expand with smooth accordion animation
- Sidebar highlights active phase with colored indicator
- Checkboxes track completion and update sidebar progress

**Animation:**
- Card expand: max-height transition 250ms ease-in-out
- Sidebar phase switch: background color transition 200ms
- Checkbox: checkmark draw animation 150ms
- Stats counter: number increment on page load

**Typography System:**
- Display: Google Sans Bold (headings, nav)
- Body: Google Sans Regular / Inter 400 (descriptions)
- Labels: Space Mono (artifact type badges)
- Scale: 11px badge → 13px body → 15px card title → 20px section → 32px hero

</text>
</response>

---

## Selected Design: **Idea C — "Google Workspace Command Dashboard"**

This is the right choice for an internal enterprise tool used by Google sales and delivery teams. It:
- Mirrors the Google Workspace aesthetic the audience uses daily (trust, familiarity)
- Uses phase-specific color coding (Blue/Green/Orange) to create clear visual separation
- Sidebar navigation keeps phase context always visible — critical for a 40-artifact document
- Progressive disclosure (expand/collapse cards) manages information density without overwhelming
- Completion tracking via checkboxes with sidebar progress creates accountability

**Design commitment:** Every component will reinforce this Google Workspace Command Dashboard identity — sidebar-anchored, card-based, phase-color-coded, with Google Sans typography and F8F9FA background.
