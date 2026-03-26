

## Plan: Equal-height mentor cards with clamped reason text

### Changes (1 file: `src/pages/Results.tsx`)

1. **Card container (line 71)**: Add `flex flex-col h-full` to make each card a flex column that stretches to fill its parent.

2. **Footer row (line 132)**: Add `mt-auto` so the footer pins to the bottom of the card, ensuring consistent layout regardless of content length.

3. **Parent list (line 204)**: Change `space-y-4` to a grid with `items-stretch`:
   ```
   grid grid-cols-1 gap-4 items-stretch
   ```

4. **Match reason text (line 133)**: Already has `overflow-hidden line-clamp-2`. No change needed — Tailwind's `line-clamp-2` already applies the required `-webkit-box` styles.

These changes ensure all cards stretch to the same height within each row, the footer stays pinned at the bottom, and long match reasons are clamped to 2 lines.

