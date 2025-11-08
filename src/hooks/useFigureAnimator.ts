import { useCallback, useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { includes } from "@/lib/array";
import type { AnimationState } from "@/lib/utils";
import lcdClasses from "@/components/LCD/lcd.module.scss";

const hittingDrumSounds = [2, 5, 11, 12];
const hittingKickSounds = [1];
const hittingHighHatSounds = [3];
const hittingBellSounds = [4, 7, 8, 13, 14];
const hittingClapSounds = [6, 9, 10];

const defaultAnimationState: AnimationState = {
  hittingKick: false,
  hittingHighHat: false,
  hittingDrum: false,
  finishedHittingDrum: false,
  hittingClap: false,
  finishedHittingClap: false,
  hittingBell1: false,
  hittingBell2: false,
};

type FigureFlag = keyof AnimationState;

type AnimationTrack = "bell" | "drum" | "clap" | "highHat" | "kick";

const animationTracks: AnimationTrack[] = [
  "bell",
  "drum",
  "clap",
  "highHat",
  "kick",
];

type ControlledNode = {
  el: Element;
  showKeys: FigureFlag[];
  hideKeys: FigureFlag[];
};

type UseFigureAnimatorParams = {
  figureRef: RefObject<SVGSVGElement | null>;
  soundsPlaying: number[];
  bpm: number;
  suspend?: boolean;
};

const visibleClass = lcdClasses.visible ?? "visible";
const hiddenClass = lcdClasses.hidden ?? "hidden";

const parseKeys = (value: string | null): FigureFlag[] =>
  value?.split(/\s+/).filter(Boolean).map((key) => key as FigureFlag) ?? [];

const useFigureAnimator = ({
  figureRef,
  soundsPlaying,
  bpm,
  suspend = false,
}: UseFigureAnimatorParams) => {
  const stateRef = useRef<AnimationState>({ ...defaultAnimationState });
  const nodesRef = useRef<ControlledNode[]>([]);
  const suspendRef = useRef(false);
  const timersRef = useRef<Record<AnimationTrack, number[]>>({
    bell: [],
    drum: [],
    clap: [],
    highHat: [],
    kick: [],
  });

  const toggleVisibility = useCallback((node: Element, visible: boolean) => {
    node.classList.toggle(visibleClass, visible);
    node.classList.toggle(hiddenClass, !visible);
  }, []);

  const renderState = useCallback(() => {
    const state = stateRef.current;
    const isSuspended = suspendRef.current;

    nodesRef.current.forEach((node) => {
      let shouldShow = node.showKeys.length > 0 ?
        node.showKeys.some((key) => state[key]) :
        true;

      if (node.hideKeys.length > 0) {
        const shouldHide = node.hideKeys.some((key) => state[key]);
        shouldShow = node.showKeys.length > 0 ? shouldShow && !shouldHide : !shouldHide;
      }

      if (isSuspended) {
        shouldShow = false;
      }

      toggleVisibility(node.el, shouldShow);
    });
  }, [toggleVisibility]);

  const resetState = useCallback(() => {
    stateRef.current = { ...defaultAnimationState };
    renderState();
  }, [renderState]);

  const clearTimers = useCallback((track?: AnimationTrack) => {
    if (track) {
      timersRef.current[track].forEach((id) => clearTimeout(id));
      timersRef.current[track] = [];
      return;
    }

    animationTracks.forEach((key) => {
      timersRef.current[key].forEach((id) => clearTimeout(id));
      timersRef.current[key] = [];
    });
  }, []);

  const setState = useCallback(
    (patch: Partial<AnimationState> | ((prev: AnimationState) => AnimationState)) => {
      const nextState =
        typeof patch === "function"
          ? (patch as (prev: AnimationState) => AnimationState)(stateRef.current)
          : { ...stateRef.current, ...patch };

      stateRef.current = nextState;
      renderState();
    },
    [renderState]
  );

  const scheduleTimer = useCallback(
    (track: AnimationTrack, callback: () => void, delay: number) => {
      const id = window.setTimeout(callback, delay);
      timersRef.current[track].push(id);
    },
    []
  );

  const oneBeatInterval = useMemo(() => 60000 / 16 / bpm, [bpm]);

  const hittingBellAnimation = useCallback(
    (interval: number) => {
      clearTimers("bell");
      const bellInterval = interval / 2;

      scheduleTimer("bell", () =>
        setState({ hittingBell1: true, hittingBell2: false }),
      0);

      const toggleBell = () =>
        setState((prev) => ({
          ...prev,
          hittingBell1: !prev.hittingBell1,
          hittingBell2: !prev.hittingBell2,
        }));

      scheduleTimer("bell", toggleBell, bellInterval);
      scheduleTimer("bell", toggleBell, bellInterval * 2);
      scheduleTimer("bell", toggleBell, bellInterval * 3);
      scheduleTimer("bell", () =>
        setState({ hittingBell1: false, hittingBell2: false }),
      bellInterval * 4);
    },
    [clearTimers, scheduleTimer, setState]
  );

  const hittingDrumAnimation = useCallback(
    (interval: number) => {
      clearTimers("drum");
      setState({
        hittingDrum: true,
        finishedHittingDrum: false,
        finishedHittingClap: false,
      });

      scheduleTimer(
        "drum",
        () =>
          setState({
            hittingDrum: false,
            finishedHittingDrum: true,
          }),
        interval
      );
    },
    [clearTimers, scheduleTimer, setState]
  );

  const hittingClapAnimation = useCallback(
    (interval: number) => {
      clearTimers("clap");
      setState({
        hittingClap: true,
        finishedHittingClap: false,
        finishedHittingDrum: false,
      });

      scheduleTimer(
        "clap",
        () =>
          setState({
            hittingClap: false,
            finishedHittingClap: true,
          }),
        interval
      );
    },
    [clearTimers, scheduleTimer, setState]
  );

  const hittingHighHatAnimation = useCallback(
    (interval: number) => {
      clearTimers("highHat");
      setState({
        hittingHighHat: true,
        finishedHittingDrum: false,
        finishedHittingClap: false,
      });

      scheduleTimer(
        "highHat",
        () =>
          setState({
            hittingHighHat: false,
            finishedHittingDrum: true,
          }),
        interval
      );
    },
    [clearTimers, scheduleTimer, setState]
  );

  const hittingKickAnimation = useCallback(
    (interval: number) => {
      clearTimers("kick");
      setState({ hittingKick: true });

      scheduleTimer(
        "kick",
        () => setState({ hittingKick: false }),
        interval
      );
    },
    [clearTimers, scheduleTimer, setState]
  );

  const interpretSounds = useCallback(
    (interval: number, soundsTriggered: number[]) => {
      if (!soundsTriggered.length) return;

      if (includes(soundsTriggered, hittingBellSounds)) {
        hittingBellAnimation(interval);
      }

      if (includes(soundsTriggered, hittingDrumSounds)) {
        hittingDrumAnimation(interval);
      }

      if (includes(soundsTriggered, hittingClapSounds)) {
        hittingClapAnimation(interval);
      }

      if (includes(soundsTriggered, hittingHighHatSounds)) {
        hittingHighHatAnimation(interval);
      }

      if (includes(soundsTriggered, hittingKickSounds)) {
        hittingKickAnimation(interval);
      }
    },
    [
      hittingBellAnimation,
      hittingDrumAnimation,
      hittingClapAnimation,
      hittingHighHatAnimation,
      hittingKickAnimation,
    ]
  );

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;

    const nodes: ControlledNode[] = Array.from(
      figure.querySelectorAll<SVGElement>("[data-anim-show],[data-anim-hide]")
    ).map((node) => ({
      el: node,
      showKeys: parseKeys(node.getAttribute("data-anim-show")),
      hideKeys: parseKeys(node.getAttribute("data-anim-hide")),
    }));

    nodesRef.current = nodes;
    renderState();

    return () => {
      nodesRef.current = [];
    };
  }, [figureRef, renderState]);

  useEffect(() => {
    suspendRef.current = Boolean(suspend);
    if (suspend) {
      clearTimers();
      resetState();
      return;
    }

    renderState();
  }, [suspend, clearTimers, resetState, renderState]);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!soundsPlaying.length || suspendRef.current) {
      return;
    }

    const frame = window.requestAnimationFrame(() =>
      interpretSounds(oneBeatInterval, soundsPlaying)
    );

    return () => window.cancelAnimationFrame(frame);
  }, [soundsPlaying, interpretSounds, oneBeatInterval]);

  const triggerAnimation = useCallback(
    (soundIndex: number) => {
      if (suspendRef.current) return;
      interpretSounds(oneBeatInterval, [soundIndex + 1]);
    },
    [interpretSounds, oneBeatInterval]
  );

  return { triggerAnimation };
};

export default useFigureAnimator;
