import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState, useEffect, useRef } from "react";
import type { Pattern } from "@/lib/types";

/**
 * Use the selected pattern stored on local storage.
 */
const useSelectedPattern = ({
  currentBeatIndex,
  patterns,
  playing,
  bpm,
}: {
  currentBeatIndex: number;
  patterns: Pattern[];
  playing: boolean;
  bpm: number;
}) => {
  const [selectedPattern, setSelectedPattern] = useLocalStorage(
    "pocketOperatorSelectedPattern",
    1
  );

  const [queuedSelectedPattern, queueSelectedPattern] = useState<number | null>(
    null
  );

  const [prequeuedSelectedPattern, prequeueSelectedPattern] = useState<
    number | null
  >(null);

  const manualQueueTimeoutRef = useRef<number | null>(null);

  const clearManualQueueTimeout = () => {
    if (manualQueueTimeoutRef.current) {
      clearTimeout(manualQueueTimeoutRef.current);
      manualQueueTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    // if we have prequeued a selected pattern and we start the beat move it to the queue
    if (prequeuedSelectedPattern && currentBeatIndex === 12) {
      queueSelectedPattern(prequeuedSelectedPattern);
      prequeueSelectedPattern(null);
    } else if (queuedSelectedPattern && currentBeatIndex === 15) {
      // if we have a pattern queued, and we're at the start of a new beat, set it
      setSelectedPattern(queuedSelectedPattern);
      queueSelectedPattern(null);
    }
  }, [
    prequeuedSelectedPattern,
    prequeueSelectedPattern,
    queueSelectedPattern,
    queuedSelectedPattern,
    setSelectedPattern,
    currentBeatIndex,
  ]);

  const queueSelectedPatternExternal = (patternNumber: number) => {
    if (playing) {
      prequeueSelectedPattern(patternNumber);
    } else {
      // if not playing, we set the pattern right away,
      // but also keep the queued indicator alive for a brief animation window
      queueSelectedPattern(patternNumber);
      setSelectedPattern(patternNumber);

      clearManualQueueTimeout();
      const queueDuration = (60000 / bpm / 6) * 6;

      manualQueueTimeoutRef.current = window.setTimeout(() => {
        queueSelectedPattern(null);
        manualQueueTimeoutRef.current = null;
      }, queueDuration);
    }
  };

  // the currently selected pattern
  const currentPattern = patterns[selectedPattern - 1];

  useEffect(() => clearManualQueueTimeout, []);

  return {
    currentPattern,
    selectedPattern,
    queuedSelectedPattern,
    queueSelectedPattern: queueSelectedPatternExternal,
    setSelectedPattern,
  };
};

export default useSelectedPattern;
