import { useRef, useState, useEffect, useCallback, useMemo } from "react";

/**
 * Listen to the current beat of the pocket operator.
 */
const useCurrentBeat = (bpm: number) => {
  const [currentBeat, setCurrentBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
  const beatRef = useRef(0);

  /**
   * Drive beat progression with requestAnimationFrame so we only
   * update React state once per frame instead of dozens of times.
   */
  useEffect(() => {
    if (!playing) {
      return;
    }

    const tick = (timestamp: number) => {
      if (lastTickRef.current == null) {
        lastTickRef.current = timestamp;
      }

      const delta = timestamp - (lastTickRef.current ?? timestamp);
      lastTickRef.current = timestamp;

      // 16th note duration in ms.
      const stepDuration = 60000 / Math.max(bpm, 1) / 4;
      const increment = delta / stepDuration;

      if (increment > 0) {
        beatRef.current += increment;
        setCurrentBeat(beatRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTickRef.current = null;
    };
  }, [playing, bpm]);

  /**
   * Pause the pocket operator's continuous playback.
   */
  const pause = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    setPlaying(false);
    beatRef.current = 0;
    lastTickRef.current = null;
    setCurrentBeat(0);
  }, []);

  /**
   * Start the pocket operator's continuous playback.
   */
  const play = useCallback(() => {
    setPlaying((isPlaying) => {
      if (isPlaying) {
        return isPlaying;
      }
      lastTickRef.current = null;
      return true;
    });
  }, []);

  /**
   * Toggle the playing state of the pocket operator.
   */
  const togglePlaying = useMemo(
    () => (playing ? pause : play),
    [playing, pause, play]
  );

  return { currentBeat, playing, togglePlaying, pause };
};

export default useCurrentBeat;
