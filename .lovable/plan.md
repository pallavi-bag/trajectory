

## Plan: Prefill intro note textarea with seeker+mentor template

### Change (1 file)

**`src/pages/MentorProfile.tsx`** — Add a `useEffect` that sets the intro note when the mentor is loaded and the note is empty:

```ts
useEffect(() => {
  if (mentor && !introNote) {
    const stage = seekerInput.careerStage?.split("(")[0]?.trim() || "product professional";
    const seekerTopic = seekerInput.topics?.[0] || "growing in my career";
    const mentorTopic = mentor.topics?.[0] || "your area of expertise";

    setIntroNote(
      `Hi ${mentor.name},\n\nI came across your profile and it really resonated — ${mentor.bio}\n\nI'm currently a ${stage} and I'm focused on ${seekerTopic}. Your experience in ${mentorTopic} is exactly what I'm hoping to learn from.\n\nWould you be open to a conversation?`
    );
  }
}, [mentor]);
```

The textarea already uses `introNote` as its value and `setIntroNote` on change, so it will be prefilled but fully editable. No other UI changes.

