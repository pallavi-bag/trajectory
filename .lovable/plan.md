

## Plan: Regenerate intro note when mentor changes

### Change (1 file)

**`src/pages/MentorProfile.tsx`** — Update the `useEffect` on line 52-56:

- Remove the `!introNote` guard so the note always regenerates when the mentor changes
- Reset `activeTone` to `"warm"` when mentor changes
- Add `mentor.id` as the dependency (stable identifier) instead of the full `mentor` object

```ts
useEffect(() => {
  if (mentor) {
    setActiveTone("warm");
    setIntroNote(generateNote("warm", mentor, seekerInput));
  }
}, [mentor?.id]);
```

This ensures navigating to a different mentor profile always generates a fresh intro note with the correct name and topics.

