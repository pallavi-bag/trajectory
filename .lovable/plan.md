

## Plan: Add tone chip buttons above intro note textarea

### Changes (1 file)

**`src/pages/MentorProfile.tsx`**

1. Add `useState` for active tone (default `"warm"`), type: `"warm" | "direct" | "curious"`.

2. Create a helper function `generateNote(tone, mentor, seekerInput)` returning three template variants:
   - **Warm**: Friendly/grateful — mentions mentor bio, ends with thank you
   - **Direct**: No fluff — states stage, topic, asks for a call
   - **Curious**: Opens with a question, ties to mentor background

   All use the same dynamic variables (`mentor.name`, `mentor.bio`, `seekerInput.careerStage`, `seekerInput.topics[0]`, `mentor.topics[0]`).

3. Update the existing `useEffect` to use `generateNote("warm", ...)` instead of inline template.

4. Add three pill buttons between the label and textarea (inside the `mb-5` div). Clicking a pill sets `activeTone` and calls `setIntroNote(generateNote(tone, ...))`. Active pill gets a filled style (e.g. `bg-primary text-white`), inactive gets outline style.

5. Textarea remains unchanged — fully editable, value bound to `introNote`.

### Template drafts

**Warm:**
> Hi {name},
>
> I came across your profile and it really resonated — {bio}
>
> I'm currently a {stage} and I'm focused on {seekerTopic}. Your experience in {mentorTopic} is exactly what I'm hoping to learn from.
>
> Thank you for sharing your time — it means a lot. Would you be open to a conversation?

**Direct:**
> Hi {name},
>
> I'm a {stage} looking for guidance on {seekerTopic}. Your experience in {mentorTopic} stood out to me.
>
> Would you be open to a 20-minute call?

**Curious:**
> Hi {name},
>
> I've been thinking a lot about {seekerTopic} lately, and one question I keep coming back to is how to navigate it at scale. Your background in {mentorTopic} — especially {bio} — makes me think you'd have a great perspective.
>
> I'm currently a {stage}. Would love to hear how you'd approach it — open to a chat?

