

# UX Refinement — Mentor Flow

## Changes to `src/pages/MentorPreferences.tsx`

### 1. Progress Indicator — Trajectory-inspired icons
Replace numbered circles + text labels with icon-based stepper:
- Step 1: `User` icon, Step 2: `Heart` icon (guidance), Step 3: `Sparkles` icon
- Completed = `bg-primary` circle with `Check` icon
- Current = `bg-primary` highlighted circle with step icon in `text-primary-foreground`
- Upcoming = `bg-border` muted circle with step icon in `text-muted-foreground`
- Connected by horizontal lines (`h-px`, primary when completed, border otherwise)
- Small labels below each icon: "Profile", "Guidance", "Story" — `text-[11px]`
- Remove the large step headings ("Who you are" etc.) from inside each step content — the section titles become smaller contextual labels within the form groups instead

### 2. Desktop Layout
- Change outer container from `max-w-lg` (~512px) to `max-w-3xl` (~768px)
- Keep `mx-auto py-8 px-6` centering

### 3. Step 2 — Progressive Disclosure
- Show toggle first; when `openToMentoring` is OFF, hide Topics/Availability/Max mentees and show helper text "Turn this on to start receiving mentor requests"
- When ON, reveal fields with a smooth transition (CSS `overflow-hidden` + `max-height` + `opacity` transition, or wrap in a div with `animate-fade-in`)
- Group revealed fields under a subtle section label: "Mentoring preferences" (`text-sm font-semibold text-foreground mt-4 mb-2`)
- Validation on Step 2 skipped if toggle is OFF (user can proceed without filling preferences)

### 4. Visual Hierarchy
- Increase step content spacing from `space-y-6` to `space-y-8`
- Field groups get slightly more breathing room
- Labels stay `text-sm font-medium`, helpers stay `text-xs text-muted-foreground`

### 5. Review Section
- Increase row spacing from `space-y-3` to `space-y-4`
- Add `shadow-sm` to the review card for subtle depth
- Keep existing structure (labels left, values right, topics as chips)

### 6. Step Transitions
- Wrap each step's content in a div with `animate-fade-in` class (already defined in tailwind config)

### No changes to:
- Field names, validation rules, required indicators
- Colors, typography, design system
- Other files

