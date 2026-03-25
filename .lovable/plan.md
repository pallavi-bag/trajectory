

## Simplify Mentor Match Cards

**File:** `src/pages/Results.tsx` (only file changed)

### Changes to `MentorCard` component

**1. Score display — remove bordered box, go inline**
- Remove the `<div className="flex flex-col items-end border...">` container
- Replace with plain inline elements in the top-right:
  - Score number: `text-primary font-bold text-xl`
  - "Trajectory" label: `text-[10px] text-muted-foreground uppercase`
  - Alignment label below: `text-[10px]` with existing color logic
- For best match (index 0): append a small "· Best match" text next to score in primary color instead of a separate badge

**2. Reduce chips — show only top 1–2 matched topics**
- Remove the separate industry chip row (lines 72–76)
- Filter `mentor.topics` to only those matching `seekerTopics`, take first 2
- If no matched topics, show first topic from mentor as fallback
- Single `flex gap-1.5` row with 1–2 chips max

**3. Best match badge**
- Remove the standalone pill badge
- Integrate as subtle text label next to the score: `· Best match` in `text-primary text-[10px]`

**4. Match explanation — shorter**
- Truncate `reason` to first sentence only (split on `.` take first)
- Keep italic muted style

**5. Visual hierarchy — 3 clear rows**
- Row 1: Avatar + Name/Title (left) — Score block (right) — `mb-4`
- Row 2: 1–2 topic chips — `mb-3`
- Row 3: Short reason text

**6. Spacing**
- Card padding stays `p-5`
- Increase gap between cards from `space-y-3` to `space-y-4`
- Increase margin between rows inside card (`mb-3` → `mb-4` for top row)

### No changes to
- `data.ts` (matching/scoring logic)
- `buildReason` function
- `MatchResult` interface
- Any other files

