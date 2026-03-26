

## Plan: Clamp reason text in MentorCard

### Changes (1 file)

**`src/pages/Results.tsx`**

1. **Delete line ~68**: `const shortReason = reason.split(".")[0] + ".";`
2. **Update the `<p>` tag** (~line 111): Add `line-clamp-2 min-h-[2.6rem]` classes
3. **Update the text reference**: Change `shortReason` → `reason` inside that `<p>` (and in the `boldKeywords` call)

