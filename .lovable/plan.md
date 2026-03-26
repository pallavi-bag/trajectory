

## Plan: Fixed-height mentor cards with clamped reason text

### Change (1 file)

**`src/pages/Results.tsx`**

1. **Line 71**: Add `min-h-[200px]` to the card's outer `div` className.

2. **Line 133**: Add line-clamp styles to the match reason `<p>` tag. Change:
   ```
   className="text-[13px] text-muted-foreground leading-relaxed"
   ```
   to:
   ```
   className="text-[13px] text-muted-foreground leading-relaxed overflow-hidden line-clamp-2"
   ```
   Tailwind's `line-clamp-2` applies `-webkit-line-clamp: 2`, `-webkit-box-orient: vertical`, and `display: -webkit-box` automatically.

