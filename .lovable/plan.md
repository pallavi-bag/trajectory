

## Plan: Normalize LinkedIn URL before rendering

### Change (1 file)

**`src/pages/MentorProfile.tsx`** — Add a helper function and use it in the `href`:

```ts
function normalizeLinkedIn(url: string): string {
  if (url.startsWith("https://")) return url;
  if (url.startsWith("http://")) return url.replace("http://", "https://");
  if (url.startsWith("/in/")) return `https://www.linkedin.com${url}`;
  if (url.startsWith("linkedin.com")) return `https://www.${url}`;
  if (url.startsWith("www.linkedin.com")) return `https://${url}`;
  return `https://${url}`;
}
```

Then on line 94, change `href={mentor.linkedin}` to `href={normalizeLinkedIn(mentor.linkedin)}`.

