

# Plan: Create Trajectory Landing Page

## Summary
Create a new `src/pages/LandingPage.tsx` with 5 sections (Hero, Trajectory Score, Persona Cards, Katherine Johnson Strip, Footer), add a `/home` route in `App.tsx`. No existing files modified except `App.tsx` (one route addition).

## Files Changed

### 1. `src/App.tsx` — Add one route
- Import `LandingPage` from `./pages/LandingPage`
- Add `<Route path="/home" element={<LandingPage />} />` inside the Layout route group

### 2. `src/pages/LandingPage.tsx` — New file (~450 lines)

**Section 1 — Hero** (`bg-nav`, full-width, relative container)
- Starfield: `useEffect` generates 55 absolutely-positioned 2x2px white dots with CSS `@keyframes` twinkle animation (opacity 0.15↔0.7, infinite, random durations 2-5s)
- Two concentric gold orbit rings (absolute, top-right, `border` with `rgba(201,184,130,0.12)` / `0.06`)
- Content (z-10, centered, `max-w-2xl mx-auto`):
  - Eyebrow pill: "Women in Product · Mentor Matching" — gold text, `border border-white/20 rounded-full`
  - H1 (serif via inline `fontFamily: 'Georgia, serif'`): "Precision-matching for" + italic gold second line "WIP community"
  - Subline: "Trajectory surfaces the WIP member who's been exactly where you are, scored across six criteria and ranked by how closely your path aligns." — `text-nav-foreground/55`
  - Two buttons: "Find my mentor →" (primary, `rounded-full`, scrolls to `#seeker-section`) and "Become a mentor" (ghost, scrolls to `#mentor-section`)
  - Proof bar: 3 stats ("6 match criteria scored", "3 fields to your first match", "WIP DMs no new tools needed") with `border-t border-white/[0.08] mt-12 pt-8`

**Section 2 — Trajectory Score** (`bg-background`)
- `IntersectionObserver` triggers fade-in (opacity 0→1, translateY 24→0) on enter
- Eyebrow: "The matching engine" in `text-primary` uppercase
- H2 (serif): "Not a list. A ranked score for every mentor you see."
- Subline about Trajectory Score
- Demo card (`bg-card border rounded-2xl`):
  - Header: "RK" avatar circle (`bg-tint text-primary`), "Riya Kapoor" + "Senior PM · Fintech · 4–7 yrs", right side shows "Trajectory Score" label + animated counter 0→100
  - 5 score bars (Seniority gap/30, Sector alignment/25, Goal alignment/25, Availability/12, Company type/8) — bars animate width from 0→100% with 160ms stagger on intersection
  - Match reason: `bg-tint border border-primary/15 rounded-xl` italic text

**Section 3 — Persona Cards** (`bg-secondary`, `id="seeker-section"`)
- Eyebrow: "Who it's for", H2: "Two paths. One product.", subline
- 2-col grid:
  - **Card A (Seeker)**: teal icon circle, "For seekers" tag, heading, body copy, "Find my mentor →" primary button → `navigate("/")`
  - **Card B (Mentor)** (`id="mentor-section"`): purple icon circle, "For mentors" tag, heading, body copy, "Set up my profile →" outline purple button → `navigate("/become-mentor")`

**Section 4 — Katherine Johnson Strip** (`bg-nav`)
- One decorative orbit ring (absolute, bottom-left, gold border)
- Eyebrow: "Team Katherine Johnson · WIP Women's History Hackathon 2026" in gold
- Quote (serif italic): "She calculated trajectories that others said were impossible. We define your career path through data." — word "trajectories" in gold, non-italic
- Attribution in `text-nav-foreground/35`

**Section 5 — Footer** (`bg-background border-t border-border`)
- Flex row: left = "Trajectory." serif wordmark, right = attribution text

## Technical Details
- Smooth scroll via `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`
- IntersectionObserver with `threshold: 0.2` for score section animations
- Score counter uses `requestAnimationFrame` loop over ~1.5s
- Bar stagger via `transitionDelay` inline styles
- All icons are inline SVGs (search person icon, heart/plus icon)
- Serif font via inline `fontFamily: 'Georgia, "Times New Roman", serif'` (no new font imports)
- No imports from `data.ts` or `context.tsx`

