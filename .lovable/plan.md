

## Plan: Fix LinkedIn link — show plain text when URL is missing

### Change (1 file)

**`src/pages/MentorProfile.tsx`** — In the stats grid rendering (around line 95-103), update the `isLink` branch to check `mentor.linkedin` at render time:

- If `mentor.linkedin` is truthy → render the existing `<a>` tag (already has `target="_blank"` and `rel="noopener noreferrer"`)
- If `mentor.linkedin` is falsy → render `"View profile"` as a plain `<p>` with the same `text-[13px] font-medium` styling but muted color, no anchor tag

The stats array entry for LinkedIn stays as-is (always included). Only the render logic changes.

