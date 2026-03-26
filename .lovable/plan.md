

## Plan: Rewrite intro note templates without raw bio/superpower

### Change (1 file)

**`src/pages/MentorProfile.tsx`** — Update the `generateNote` function to remove all references to `mentor.bio` and `mentor.superpower`. Use only `mentor.name`, `mentor.topics`, `seekerInput.careerStage`, and `seekerInput.topics`.

New templates:

**Warm:**
> Hi {name},
>
> Your profile caught my attention — especially your work in {mentor.topics[0]} and {mentor.topics[1] or mentor.topics[0]}.
>
> I'm a {stage} looking to get better at {seekerTopic}. I'd love to learn from someone who's been in the trenches with this.
>
> Would you be open to a short conversation? I'll keep it focused and respect your time.

**Direct:**
> Hi {name},
>
> I'm a {stage} looking for guidance on {seekerTopic}. Your experience in {mentorTopic} stood out to me.
>
> Would you be open to a 20-minute call?

**Curious:**
> Hi {name},
>
> I've been thinking a lot about {seekerTopic} lately, and one question I keep coming back to is how to navigate it at scale. Your background in {mentorTopic} and {mentor.topics[1] or mentorTopic} makes me think you'd have a great perspective.
>
> I'm currently a {stage}. Would love to hear how you'd approach it — open to a chat?

Variables used: `mentor.name`, `mentor.topics[0]`, `mentor.topics[1]` (with fallback to `[0]`), `seekerInput.careerStage`, `seekerInput.topics[0]`. No `mentor.bio` or `mentor.superpower` anywhere.

