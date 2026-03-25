

## Align Mentor Detail Page with List Cards — Visual Consistency

**File:** `src/pages/MentorProfile.tsx` (only file changed)

### Key mismatches to fix

| Property | Results list cards | Detail page (current) | Fix |
|---|---|---|---|
| Container width | `max-w-2xl` | `max-w-3xl` | Change to `max-w-2xl` |
| Card padding | `p-5` | `p-6` | Change to `p-5` |
| Avatar size | `w-10 h-10`, `text-sm` | `w-[52px] h-[52px]`, `text-lg` | Match list: `w-10 h-10`, `text-sm` |
| Name font | `text-sm font-semibold` | `text-xl font-bold` | Change to `text-base font-semibold` (slightly larger than list, but same weight) |
| Subtitle font | `text-xs` | `text-sm` | Change to `text-xs` |
| Name tag | `<h1>` | — | Change to `<p>` |
| Chip styling | `border-[0.5px] border-[#1D9E75] text-[#0F6E56] rounded-[20px] text-[11px] px-2.5 py-0.5` | `text-xs px-2.5 py-1 rounded-full border border-primary text-primary` | Match list card chip styling exactly |
| Card border | `border-[0.5px] border-border` | `border border-border` | Use `border-[0.5px]` |
| Stats cell padding | `p-3.5` | — | Reduce to `p-3` |
| Stats label | `text-xs` | — | Keep |
| Stats value | `text-sm font-medium` | — | Change to `text-[13px] font-medium` |

### Specific changes

**Container (line 23):**
- `max-w-3xl` → `max-w-2xl`

**Card 1 (line 33):**
- `p-6` → `p-5`
- `border border-border` → `border-[0.5px] border-border bg-white`

**Header (lines 35–48):**
- Avatar: `w-[52px] h-[52px]` → `w-10 h-10`, `text-lg` → `text-sm`, `font-bold` → `font-semibold`
- Gap: `gap-4` → `gap-3`
- Name: `<h1 className="text-xl font-bold">` → `<p className="text-base font-semibold">`
- Subtitle: `text-sm` → `text-xs`

**Stats grid (lines 51–74):**
- Cell padding: `p-3.5` → `p-3`
- Value font: `text-sm` → `text-[13px]`

**Superpower block (line 77):**
- Padding: `p-4` → `p-3.5`
- Label: keep `text-xs`
- Value: `text-sm` → `text-[13px]`

**Bio (line 84):**
- `text-sm` → `text-[13px]`

**Topic chips (lines 88–97):**
- Replace styling to match list cards exactly: `border-[0.5px] border-[#1D9E75] text-[#0F6E56] rounded-[20px] text-[11px] px-2.5 py-0.5`

**Card 2 (line 101):**
- `p-6` → `p-5`
- `border border-border` → `border-[0.5px] border-border bg-white`

**Card 2 internals:**
- Label: keep `text-sm`
- Textarea: keep `text-sm`
- Preview block padding: `p-4` → `p-3.5`
- Preview label: `text-sm` → `text-[13px]`

No changes to content, fields, copy, or functionality.

