

## Add Trajectory Score to Mentor Match Cards

### Overview
Add a visual "Trajectory Score" display to each mentor match card in the top-right area, showing the numeric score normalized to /100, plus a qualitative alignment label. No changes to matching/scoring logic.

### Score Normalization
The raw score from `runMatching` has a theoretical max around 100 (30 seniority + 25 sector + 25 goal + 12 availability + 8 company = 100). We'll normalize: `Math.min(Math.round(score), 100)` and clamp to a floor of ~40 to avoid showing embarrassingly low numbers for partial matches.

Thresholds for qualitative labels:
- 80–100 → "High alignment"
- 60–79 → "Good alignment"
- Below 60 → "Moderate alignment"

### Changes to `src/pages/Results.tsx`

**MentorCard component** — Replace the current top-right badge area (lines 38–49) with a layout that includes:

1. Keep "Best match" and "Partial match" badges
2. Add a Trajectory Score block in the top-right:
   - Small label: "Trajectory Score" (text-[10px], muted)
   - Large number: e.g. "82/100" (text-lg, font-bold, primary color)
   - Qualitative label below: e.g. "Good alignment" (text-[10px], muted)

The score block will be a compact column (`flex flex-col items-end`) sitting in the existing `justify-between` flex row, stacked above the existing badges.

### Visual Design
- Score number uses `text-primary font-bold text-lg`
- "/100" suffix in `text-muted-foreground text-xs`
- "Trajectory Score" label in `text-[10px] text-muted-foreground uppercase tracking-wide`
- Qualitative label in `text-[10px]` with color coding: primary for high, gold for good, muted for moderate
- Contained in a subtle bordered box (`border border-border rounded-lg px-3 py-2 bg-background/50`)

### No other files changed
- `src/lib/data.ts` — untouched (scoring logic preserved)
- Landing page — untouched

