

## Plan: Use shared topic in intro note templates

### Change (1 file)

**`src/pages/MentorProfile.tsx`** — Update `generateNote` function:

1. Replace `mentorTopic` / `mentorTopic2` with a single `sharedTopic`:
```ts
const sharedTopic = mentor.topics.find(t => seekerInput.topics.includes(t)) ?? mentor.topics[0] ?? "your area of expertise";
```

2. Update all three tone templates to use `sharedTopic` instead of `mentorTopic` and `mentorTopic2`:

- **Warm**: "Your profile caught my attention — especially your focus on {sharedTopic}."
- **Direct**: "Your experience in {sharedTopic} stood out to me."
- **Curious**: "Your background in {sharedTopic} makes me think you'd have a great perspective."

No other variables change. `mentor.bio` and `mentor.superpower` remain unused.

