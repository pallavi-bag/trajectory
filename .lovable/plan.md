

## Update Mentor Result Cards — UI Only

**File:** `src/pages/Results.tsx`

### MentorCard Rewrite

Replace the entire `MentorCard` component with the new design. No changes to matching logic, data types, or any other files.

**Card wrapper:**
- Change from `<button>` to `<div>` with `onClick` (or keep button). Use `rounded-2xl` (16px), `p-5` (20px), `cursor-pointer`
- Best match card: `bg-[#f7fdfb]`, `border border-[0.5px] border-[#9FE1CB]`
- Other cards: `bg-white`, `border border-[0.5px] border-border`
- Remove the old `border-l-[3px]` best match styling and `shadow-sm`

**Best match badge (top-left, before header):**
- Only on index 0: small `<span>` with `★ Best match`, `bg-[#1D9E75] text-white text-[10px] rounded-[4px] px-2 py-0.5 mb-2 inline-block`

**Header row:**
- Left: avatar circle (initials) + name + subtitle (`seniorityLabel · industry` if available, else just `seniorityLabel`)
- Right: score number `text-[22px] font-bold` — color `text-[#1D9E75]` for best match, `text-muted-foreground` for others. Below it: "match" label `text-[10px] text-muted-foreground`
- Below score: 5 small square dots (6×6px, rounded-sm). Derive from score: score≥90 → 5 filled, ≥80 → 4 filled + 1 partial, ≥70 → 3 filled + 1 partial + 1 weak, etc. Filled = `bg-[#1D9E75]`, partial = `bg-[#9FE1CB]`, weak = `bg-gray-200`

**Topic pills:**
- Same filtering logic (top 1–2 matched topics)
- Style: `border border-[0.5px] border-[#1D9E75] text-[#0F6E56] rounded-[20px] text-[11px] px-2.5 py-0.5`

**Divider:**
- `<hr className="border-t border-[0.5px] border-border my-3" />`

**Footer row:**
- Left: reason sentence, `text-[13px]`. Bold key phrases in `text-[#0F6E56]` — bold the first topic match found in the reason string
- Right: "View profile →" link, `text-[11px] text-[#1D9E75] hover:underline shrink-0`

**Remove entirely:**
- "Trajectory" label
- "High alignment" / alignment labels
- Old bordered score box
- Old italic reason style

### Helper additions (same file)
- `getScoreDots(score)` — returns array of 5 items with status `'filled' | 'partial' | 'weak'` based on normalized score thresholds
- `boldFirstTopic(reason, topics)` — returns JSX with the first matched topic in the reason string wrapped in `<strong className="text-[#0F6E56]">`

