

## Plan: Log seeker data in MentorProfile

`seekerInput` is already destructured from `useAppState()` in `src/pages/MentorProfile.tsx` (line 18). The only change needed is adding a `console.log` inside the component body.

### Change (1 file)

**`src/pages/MentorProfile.tsx`** — Add a console.log after the hook destructuring (around line 18-19):

```ts
const { seekerInput, introNote, setIntroNote, seekerName, matchResults, mentorsList } = useAppState();

console.log("[MentorProfile] seekerInput:", seekerInput);
```

This will log the full `SeekerInput` object (`goal`, `topics`, `careerStage`, `industry`, `availability`) every render so you can confirm it's flowing through correctly.

