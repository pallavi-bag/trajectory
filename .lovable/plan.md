

## Extend Mentee Input Form

### Summary
Add three new fields (Goal textarea, Industry dropdown, Availability dropdown) to `src/pages/Landing.tsx`, organized into three visual groups with subtle spacing. Pass new values into the matching system.

### Changes — `src/pages/Landing.tsx` only

**New state variables:**
- `goal` (string, default `""`)
- `industry` (string, default `""`)
- `availability` (string, default `""`)

**New constants** (defined in the component file):
- `INDUSTRIES` — exact same list as mentor form (Banking/Finance/FinTech through Other)
- Import `AVAILABILITY_OPTIONS` from `@/lib/data`

**Updated `handleSubmit`:**
- Pass `goal`, `industry` into the `SeekerInput` object (these fields already exist on the type)

**Form restructured into 3 groups** using `space-y-6` between groups, `space-y-4` within each group. No section headers — just spacing.

**Group 1 — What do you need help with:**
1. Focus Area (existing, unchanged)
2. Goal textarea (new)
   - Label: "What do you need help with?"
   - Helper text below label: "Share your goal in your own words" (text-xs, muted)
   - Placeholder: "I want to transition from engineering to product management and need help preparing for interviews"
   - Uses a `<textarea>` styled to match existing inputs (rounded-lg, border, same classes), ~3 rows

**Group 2 — Where are you now:**
3. Seniority Level (existing, unchanged)
4. Industry dropdown (new)
   - Label: "Your current industry"
   - Native `<select>` with ChevronDown icon, same pattern as Seniority
   - Placeholder option: "Select your industry…"

**Group 3 — What works for you:**
5. Availability dropdown (new)
   - Label: "How often do you want to connect?"
   - Native `<select>` with ChevronDown icon, same pattern
   - Options from `AVAILABILITY_OPTIONS`: 1–2/month, Weekly, As needed, Async only
   - Placeholder option: "Select availability…"

**`canSubmit`** remains `topics.length > 0 && stage` — new fields are optional.

**No other files changed.** Matching logic, scoring, data types all stay as-is.

