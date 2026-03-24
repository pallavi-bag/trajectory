

# 3-Step Mentor Registration Flow

## Summary
Replace the current single-page `MentorPreferences.tsx` with a multi-step wizard (3 steps + review + success). All state managed via `useState` at the top level, steps rendered conditionally.

## File Changes

### 1. `src/pages/MentorPreferences.tsx` — Full rewrite (~400 lines)

**State**: Single `useState` object holding all form fields + `step` number (1-4, where 4 = success). An `errors` state object for validation. All state preserved across steps via parent component.

**Progress Indicator** (all steps 1-3):
- Horizontal stepper: three labeled steps ("Who you are", "How you can help", "Tell your story") connected by lines
- Current step highlighted with `bg-primary text-primary-foreground` circle, completed steps get a checkmark, upcoming steps are `bg-border`
- Below the main heading area, subtle and minimal

**Step 1 — Who you are**:
- Title + subtitle as specified
- 4 fields: Name (text input), Title (text input), Role level (select dropdown with 11 options from spec), Industry (select dropdown with 13 options from spec)
- All marked with red `*`
- "Next →" button validates all 4 fields, shows inline errors if empty
- Reuses existing input/select styling patterns from current MentorPreferences

**Step 2 — How you can help**:
- Open to mentoring toggle (reuse existing toggle pattern)
- Topics multi-select chips (reuse existing chip pattern from current file, with counter "0/4 selected", min 1 required)
- Availability dropdown (reuse existing AVAILABILITY_OPTIONS from data.ts)
- Max mentees dropdown (1, 2, 3, No limit)
- "Back" (ghost) + "Next →" (primary) buttons
- Validates: topics >= 1, availability selected, maxMentees selected

**Step 3 — Tell your story**:
- Bio textarea (optional), Superpower text input (required `*`), LinkedIn text input (optional, validate URL format only if non-empty)
- **Review section** below fields: card showing all collected data (name, title, role level, industry, topics as chips, availability, max mentees) with heading "How seekers will see you"
- "Back" (ghost) + "Save profile →" (primary) buttons
- Validates: superpower required

**Success State** (step 4):
- Centered content with checkmark icon
- "You're now part of the network" heading
- Body text + "Every great trajectory starts with the right guidance." tagline
- "Back to home" button → `navigate("/")`

**No other files touched.** Route stays at `/become-mentor`. Imports `TOPICS`, `AVAILABILITY_OPTIONS` from data.ts. Uses existing `Button`, `Input`, `Textarea` components. All dropdown styling matches current select pattern with `ChevronDown` icon.

### Constants (defined at top of file)
```
ROLE_LEVELS = ["Associate Product Manager", "Product Manager", "Senior Product Manager", "Principal Product Manager", "Group Product Manager", "Director of Product", "VP Product", "Head of Product", "Chief Product Officer", "Founder", "Other"]

INDUSTRIES = ["Banking/Finance/FinTech", "Computing/IoT/Consumer Tech", "Data/Analytics", "EdTech", "Enterprise Software/SaaS", "Healthcare/Nanotechnology/Wearable", "Manufacturing", "Media/Entertainment/Social", "Nonprofit/Philanthropy", "Real Estate Tech", "Retail/eCommerce", "Transportation/Travel/Hospitality", "Other"]
```

### Validation approach
- `errors` state: `Record<string, string>` — keyed by field name
- `validate(step)` function checks required fields for that step, returns boolean
- Errors shown as `<p className="text-sm text-destructive mt-1">` below each field
- Errors cleared when user modifies the field

