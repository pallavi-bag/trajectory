

## Convert Mentor Detail Page to Card-Based Layout

**File:** `src/pages/MentorProfile.tsx` (only file changed)

### Outer container
- Widen from `max-w-2xl` to `max-w-3xl` (~768px effective) to match result card widths
- Keep `mx-auto py-8 px-6`
- Back button stays above cards

### Card 1 — Mentor Profile
Wrap lines 32–95 in a `<div>` with `bg-white rounded-2xl border border-[0.5px] border-border p-6 mb-6`

Contents (same data, restructured):
- **Header**: avatar + name + title/industry (unchanged)
- **Stats grid**: 2-col grid with seniority, industry, availability, LinkedIn (unchanged styling, but use `bg-[#f8f9fa]` cells to sit inside the white card)
- **Superpower**: keep the `bg-tint border-l-4` block but inside the card, add `mt-5`
- **Bio**: below superpower, `mt-4`
- **Topic chips**: below bio, `mt-4`

### Card 2 — Connect / Interaction
Wrap lines 97–136 in a `<div>` with `bg-white rounded-2xl border border-[0.5px] border-border p-6`

Contents (same fields):
- "Write an intro note" label + textarea
- Message preview block
- CTA button — stays `w-full`, inside the card with `mt-4`

### Spacing adjustments
- `mb-5` between header and stats grid
- `mt-5` between stats and superpower
- `mt-4` between superpower and bio
- `mt-4` between bio and chips
- `mb-5` between textarea and preview
- `mt-4` between preview and CTA

No changes to content, fields, copy, or functionality.

