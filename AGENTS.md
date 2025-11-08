# Animation Performance Snapshot

## What’s Already Fixed
- `src/hooks/useFigureAnimator.ts` now owns all LCD figure motion: SVG nodes are tagged with `data-arm` attributes and toggled via refs/classes, so React never re-renders the 300+ line figure just to blink limbs.
- `src/components/LCD/SewingMachine/useSpoolAnimator.ts` mirrors that approach for the sewing machine. Queue pulses flip classes on the tagged spools, and timers are scoped/cleared per animation.
- `src/hooks/useCurrentBeat.ts` switched from a `setInterval + flushSync` loop to a single `requestAnimationFrame` driver. Beat progress lives in refs and is published to React at most once per paint, keeping UI in sync without blocking renders.

## Current Runtime Characteristics
1. **PocketOperator render cadence** – Components that depend on `currentBeat` (metronome, keypad LEDs, spool indicator) still re-render at frame rate while playing, which keeps fractional beat UI accurate. Manual button presses remain instantaneous because `triggerAnimation`/sampler playback run outside React.
2. **Timers + cleanup** – Both figure and spool animators track outstanding timeouts per limb/spool and clear them before starting a new sequence. Unmounting the LCD or pausing playback cancels everything, so there are no lingering updates or console noise.
3. **React state surface** – The only high-frequency state now is `currentBeat`. Pattern selection, queued indicators, and SVG visibility all update through refs or low-rate React state, so the tree no longer churns 10–15 times per beat.

## Remaining Opportunities
1. **Partition `currentBeat` consumers** – Many components need only the integer beat index. Splitting `currentBeat` into `beatIndex` (React state) + `beatPhase` (ref for imperative hooks) would cut re-renders to ~16 per bar while still letting metronome/spool animators read continuous time.
2. **Keypad glow without re-render** – `src/components/PocketOperator/numberedButton.tsx` flashes buttons via React props. Mirroring the figure approach (data attributes + class toggles driven from `useFigureAnimator`) would remove another set of high-frequency renders.
3. **Transport event bus** – Publishing beat ticks through a tiny event emitter (instead of React state) would let UI pieces subscribe imperatively, leaving React to handle only discrete UX changes (recording, selection, etc.).

## Suggested Next Steps
1. Prototype a `useBeatClock` that exposes `{ beatIndex, subscribe(fn) }`. Convert LCD metronome + keypad glow to the subscription API while keeping React state for derived UI (e.g., `BottomBeatIndicator`).
2. Introduce a DOM-based keypad animator that receives beat events and immediate button presses, applying `classes.highlighted` via refs. Measure render counts in React DevTools to confirm the 16-per-bar goal.
3. Once the above lands, audit remaining `currentBeat` props; anything still needing fractional beats can read from a shared ref exposed by `useBeatClock`, eliminating unnecessary component updates.
