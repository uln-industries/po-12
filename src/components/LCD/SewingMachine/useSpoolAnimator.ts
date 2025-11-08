import { useCallback, useEffect, useRef } from "react";
import type { RefObject } from "react";
import classes from "../lcd.module.scss";

const visibleClass = classes.visible ?? "visible";
const hiddenClass = classes.hidden ?? "hidden";

const spoolSequence = [1, 2, 3, 2, 1, 0];

const getSpoolForBeat = (currentBeat: number) => {
  const phase = currentBeat % 4;

  if (phase < 0.8) return 1;
  if (phase < 1.6) return 2;
  if (phase < 2.4) return 3;
  if (phase < 3.2) return 2;
  return 1;
};

type UseSpoolAnimatorParams = {
  spoolRef: RefObject<SVGGElement | null>;
  queuedSelectedPattern: number | null;
  playing: boolean;
  currentBeat: number;
  bpm: number;
};

const useSpoolAnimator = ({
  spoolRef,
  queuedSelectedPattern,
  playing,
  currentBeat,
  bpm,
}: UseSpoolAnimatorParams) => {
  const manualTimersRef = useRef<number[]>([]);

  const toggleSpool = useCallback(
    (spoolIndex: number) => {
      const root = spoolRef.current;
      if (!root) return;

      const nodes = root.querySelectorAll<SVGElement>("[data-spool]");
      nodes.forEach((node) => {
        const index = Number(node.getAttribute("data-spool"));
        const isActive = index === spoolIndex;
        node.classList.toggle(visibleClass, isActive);
        node.classList.toggle(hiddenClass, !isActive);
      });
    },
    [spoolRef]
  );

  const clearManualTimers = useCallback(() => {
    manualTimersRef.current.forEach((id) => clearTimeout(id));
    manualTimersRef.current = [];
  }, []);

  useEffect(() => {
    if (!queuedSelectedPattern) {
      clearManualTimers();
      toggleSpool(0);
    }
  }, [queuedSelectedPattern, clearManualTimers, toggleSpool]);

  useEffect(() => {
    if (!queuedSelectedPattern || !playing) {
      return;
    }

    toggleSpool(getSpoolForBeat(currentBeat));
  }, [queuedSelectedPattern, playing, currentBeat, toggleSpool]);

  useEffect(() => {
    if (!queuedSelectedPattern || playing) {
      clearManualTimers();
      return;
    }

    clearManualTimers();
    const stepDuration = 60000 / Math.max(bpm, 1) / 6;

    spoolSequence.forEach((spool, index) => {
      const id = window.setTimeout(
        () => toggleSpool(spool),
        stepDuration * (index + 1)
      );
      manualTimersRef.current.push(id);
    });

    return clearManualTimers;
  }, [queuedSelectedPattern, playing, bpm, toggleSpool, clearManualTimers]);
};

export default useSpoolAnimator;
