

## Update `src/lib/data.ts` — Additive Changes Only

**No changes** to UI files, routing, or scoring weights.

### 1. Add new types (after `MatchResult` interface, ~line 26)
- Add `SignalStrength` type: `'strong' | 'partial' | 'weak'`
- Add `MatchSignal` interface: `{ label: string; strength: SignalStrength }`
- Add `signals: MatchSignal[]` field to `MatchResult` interface

### 2. Replace `buildReason()` (lines 296–304)
- Add `isGenericSuperpower()` helper
- Replace `buildReason` with cascading logic: transitionNote → superpower → bio first sentence → fallback

### 3. Add `buildSignals()` function (before `runMatching`, ~line 305)
- Takes individual sub-scores + topicMatch boolean
- Returns array of `MatchSignal` with human-readable labels and strength levels based on score thresholds

### 4. Update `runMatching()` loop (lines 317–339)
- Extract intermediate scores into named variables (`sectorScore`, `goalScore`, `availScore`, `isTopicMatch`)
- Recompute final `score` from named vars (same formula, no weight changes)
- Add `signals: buildSignals(...)` to the pushed result object

