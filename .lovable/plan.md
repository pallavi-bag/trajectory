

# Fix "Back to Home" Routing

## Problem
Several pages have "back to home" or fallback navigations that route to `/mentee` instead of `/` (the new landing page). The "Return home" button in Confirmation and "Back to home" in MentorPreferences should go to `/`.

## Changes

### 1. `src/pages/Confirmation.tsx` (line 46)
- Change "Return home" button from `navigate("/mentee")` → `navigate("/")`
- Keep "Find another match" pointing to `/mentee` (correct)

### 2. `src/pages/MentorPreferences.tsx` (line 35)
- Change "Back to home" button from `navigate("/mentee")` → `navigate("/")`

### 3. `src/pages/DMHandoff.tsx` (line 16)
- Fallback redirect when mentor not found: already goes to `/` — no change needed

### 4. `src/pages/MentorProfile.tsx` (line 16)
- Fallback redirect when mentor not found: already goes to `/` — no change needed

### 5. `src/components/Navbar.tsx` (line 7)
- Logo link already points to `/` — no change needed

**No other files need changes.** The "Back" buttons in Results and MentorProfile correctly point to `/mentee` (the search form) or `/results`, which is appropriate navigation context.

