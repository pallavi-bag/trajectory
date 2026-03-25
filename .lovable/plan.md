

## Rewrite Match Reason, Add Keyword Bolding & Strip IC Codes from Display

**Files changed:** `src/lib/data.ts`, `src/pages/Results.tsx`, `src/pages/MentorProfile.tsx`

### 1. `src/lib/data.ts` — Rewrite `buildReason()` sentence (lines 296–304)

Change the reason template to a natural sentence. Source data stays untouched — raw `seniorityLabel` (with IC codes) is used in the string, and stripping happens only at render time.

- **With topic match:** `"She is a {seniorityLabel} in {industry} with expertise in {matched topics}, who {transitionNote}."`
- **Without topic match:** `"A {seniorityLabel} in {industry} with experience in {first topic}, who {transitionNote}."`

### 2. `src/pages/Results.tsx`

- **Add `stripLevelCode()` helper** — strips `· IC3`, `· IC4`, `· Dir+` from display strings only
- **Replace `boldFirstTopic()` with `boldKeywords()`** — collects cleaned seniority label, industry, and matched topics as keywords; sorts by length descending; splits text via single regex pass; wraps matches in `<strong className="text-[#0F6E56] font-semibold">`
- **Apply `stripLevelCode()` to reason text** before bolding, and to the subtitle on line 80
- **Pass cleaned keywords** to `boldKeywords()`

### 3. `src/pages/MentorProfile.tsx`

- **Add same `stripLevelCode()` helper**
- Apply to subtitle (line 44–46: `mentor.title · mentor.industry` — already clean, but the stats grid on line 53 shows `mentor.seniorityLabel` which needs stripping)

### What stays unchanged
- All mentor data objects, types, and matching logic in `data.ts`
- Card structure, layout, styling
- All other files

