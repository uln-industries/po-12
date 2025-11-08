# Animation Optimization Notes

## Current Flow
- `src/hooks/useDeviceAnimations.ts:35-245` keeps an `AnimationState` object in React state, flips eight booleans per beat, and exposes `animationState` plus `triggerAnimation`. Every change goes through `flushSync` and bubbles through `PocketOperator -> LCD -> CoolFigure`, forcing the entire instrument UI to re-render just to flicker SVG sub-groups.
- `src/components/LCD/CoolFigure.tsx:11-360` consumes those booleans to choose between `classes.visible` and `classes.hidden` for dozens of `<g>` nodes. The SVG is fully re-created on every state transition even though the geometry never changes.
- Pattern queueing uses the same tactic: `src/hooks/useSelectedPattern.ts:55-78` animates the sewing-machine spool by calling `setQueuedSpoolState` inside five `setTimeout` blocks, again wrapped in `flushSync`, and `SpoolList` reads the number to show or hide `<g>` wrappers.

## Bottlenecks We Should Tackle
1. **State thrash at the top of the tree** – Because `useDeviceAnimations` lives in `PocketOperator`, each of the 5–6 `setTimeout` calls inside `hittingBellAnimation`, `hittingDrumAnimation`, etc. (`src/hooks/useDeviceAnimations.ts:54-188`) re-renders the full pocket operator. A 120 BPM pattern that hits drums and bells simultaneously easily produces 15+ renders per beat.
2. **`flushSync` amplifies the cost** – Both `setAnimations` and `triggerAnimation` wrap updates in `flushSync` (`src/hooks/useDeviceAnimations.ts:46-49` and `238-241`), forcing React to synchronously reconcile the entire tree multiple times in the same frame. That blocks paints and causes the “spurious rerender” spikes the user is seeing.
3. **Timers are unmanaged** – None of the animation helpers clear their `setTimeout` handles when the component unmounts or when a different sound interrupts the current one (`src/hooks/useDeviceAnimations.ts:85-185`). A beat change schedules work even if the next render decides different sounds should play, so React may process stale timers that flip the booleans back and forth.
4. **Queue animation repeats the pattern** – The spool highlight logic (`src/hooks/useSelectedPattern.ts:64-77`) fires six synchronous state updates for a single tap while nothing else on screen actually needs to re-render. That work should be scoped to the sewing machine’s DOM instead of the global pattern hook.
5. **SVG diffing is wasted effort** – `CoolFigure` only toggles visibility classes (`src/components/LCD/CoolFigure.tsx:38-360`), yet React still reconciles the entire 300+ line SVG subtree every time a boolean flips. The same is true for `SpoolList` toggling `<g>` wrappers (`src/components/LCD/SewingMachine/SpoolList.tsx:9-82`).

## Imperative Direction
- Render each animated SVG once, tag movable parts with `data-arm`, `data-spool`, etc., and keep a `ref` to the root element. A `useFigureAnimator` hook can expose `play("bell")`, `play("drum")`, etc., and internally toggle `classList` on the tagged nodes without touching React state.
- Replace the boolean object with a tiny controller (even a plain object held in `useRef`) that stores active timers per animation. When a new sound arrives, cancel existing timers for the same limb before starting a new timeline via `requestAnimationFrame` or `setTimeout`. This keeps the animation bookkeeping in JS while isolates React from the churn.
- Emit beat events directly from the sampler/transport layer (where `soundsPlaying` is already computed) and let the controller listen once. That avoids `useLayoutEffect` + `setTimeout` (`src/hooks/useDeviceAnimations.ts:225-233`), which currently enqueues extra macro-tasks just to schedule the same work.
- For the sewing machine, consider CSS keyframes triggered by adding/removing a class on the spool container. `queueSelectedPattern` could simply add `is-queuing` for one bar and rely on `animationend` (or a single `setTimeout` scoped to that component) instead of six synchronous `flushSync` updates.

## Proposed Next Steps
1. Add stable `data-*` markers to the SVG limbs/spools and introduce refs so an imperative controller can reach them.
2. Move `useDeviceAnimations` logic into a DOM-focused hook that keeps timers in refs, toggles class names directly, and only exposes a cheap `triggerAnimation` function to `PocketOperator`.
3. Strip `animationState` out of the React prop chain and confirm `LCD`/`CoolFigure` render once per beat rather than half a dozen times per animation.
4. Apply the same pattern to the spool queue animation: encapsulate it inside the sewing machine component with CSS keyframes or imperative class toggles so `useSelectedPattern` stops issuing visual updates.

Let me know if you want a spike branch that prototypes the DOM controller; it should be straightforward to add logging to compare render counts before/after.

## Implementation Plan (Future PR)
1. **Instrument the SVGs**
   - `src/components/LCD/CoolFigure.tsx:31-360` – add `data-arm="kick"`, `data-arm="bell"`, etc., on the `<g>` wrappers that currently swap `classes.visible/hidden`. Export a `forwardRef` version so callers can access the root `<svg>`.
   - `src/components/LCD/SewingMachine/SpoolList.tsx:9-82` – tag each spool `<g>` with `data-spool="0..3"` and expose a ref from `SewingMachine/index.tsx` to the containing node for imperative class toggles.
2. **Build `useFigureAnimator`**
   - Create `src/hooks/useFigureAnimator.ts` next to `useDeviceAnimations.ts`.
   - Internally grab the `CoolFigure` ref once, cache DOM lookups (e.g., `figureRef.current?.querySelector('[data-arm="bell"]')`), and keep timer IDs in `useRef<Record<string, number>>`.
   - Provide `playFromSounds(soundsPlaying: number[])` and `triggerManual(soundIndex: number)` helpers. Map sound numbers using the same arrays from `src/hooks/useDeviceAnimations.ts:7-16`, but keep them in a module constant for reuse.
   - In `src/components/PocketOperator/PocketOperator.tsx:126-257`, replace the `useDeviceAnimations` call with the new hook, stop passing `animationState` through props, and wire the returned `play` callbacks into `soundsPlaying`/`onButtonClick`. Remove the `animationState` prop from `src/components/LCD/LCD.tsx:20-64` and `CoolFigure`.
3. **Move spool animation local**
   - Extend `src/components/LCD/SewingMachine/index.tsx` (and `SewingMachine.tsx:8-87`) to accept a simple `queuePulse` boolean or event callback instead of `spoolState`.
   - Implement `useSpoolAnimator` inside `src/components/LCD/SewingMachine` that toggles `.is-queuing` on the tagged spools using either `classList` + timers or a CSS keyframe defined in `src/components/LCD/lcd.module.scss`.
   - Update `src/hooks/useSelectedPattern.ts:55-90` to drop the `setQueuedSpoolState` logic and instead notify the sewing-machine component (e.g., via a callback or context) when a queue animation should start. Ensure the previous `flushSync` calls disappear.
