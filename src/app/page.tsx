"use client";

import PocketOperator from "../components/PocketOperator";
import classes from "./page.module.scss";
import { useState, useEffect, useMemo } from "react";
import { usePatterns } from "@/hooks/usePattern";
import useCurrentBeat from "@/hooks/useCurrentBeat";

import { SelectingMode } from "@/lib/utils";
import InstructionsModal from "@/components/InstructionsPaper/InstructionsModal";
import HelpButton from "@/components/HelpButton/HelpButton";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import ProductTour from "@/components/ProductTour";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useSelectedPattern from "@/hooks/useSelectedPattern";
import useBPM from "@/hooks/useBPM";

const defaultTilt = { x: 0, y: 0 };

const PocketOperatorWrapper = () => {
  const onTouchDevice = useIsTouchDevice();

  const [show, setShowing] = useState(false);

  const [productTourMode, setProductTourMode] = useLocalStorage<
    "finished" | "intro" | "tour" | undefined
  >("pocketOperatorProductTourMode", undefined);

  // right when we start, transition in to showing the intro mode.
  // this makes sure the intro doesn't show up in the preview
  useEffect(() => {
    setTimeout(() => setProductTourMode((curMode) => curMode ?? "intro"), 100);
  }, [setProductTourMode]);

  const {
    patterns,
    supportedPatternIndices,
    togglePatternNote,
    setPatternsFromFile,
    setUploadFailed,
    uploadingState,
    resetPatterns,
  } = usePatterns();

  const { bpm, setBPM, goToNextBPM, resetBPM } = useBPM();

  const [selectedSound, setSelectedSound] = useLocalStorage(
    "pocketOperatorSelectedSound",
    1
  );

  const resetSelectedSound = () => setSelectedSound(1);

  const [selectingMode, setSelectingMode] = useState<SelectingMode>(
    SelectingMode.DEFAULT
  );
  const resetSelectingMode = () => setSelectingMode(SelectingMode.DEFAULT);

  // are we currently recording?
  const [recording, setRecording] = useState<boolean>(false);

  const { currentBeat, playing, togglePlaying, pause } = useCurrentBeat(bpm);

  // the current index of the beat, or -1 if not playing
  // used to show how the beat progresses across the device
  const currentBeatIndex = useMemo(
    () => (playing ? Math.floor(currentBeat) % 16 : -1),
    [currentBeat, playing]
  );

  const {
    currentPattern,
    selectedPattern,
    queueSelectedPattern,
    queuedSelectedPattern,
  } = useSelectedPattern({
    currentBeatIndex,
    patterns,
    playing,
    bpm,
  });

  return (
    <div className={classes.pocketOperatorPageContainer}>
      <div className={classes.container}>
        <div className={classes.pocketOperatorInTotal}>
          <PocketOperator
            className={classes.body}
            patternConfig={{
              patterns,
              supportedPatternIndices,
              togglePatternNote,
              setPatternsFromFile,
              setUploadFailed,
              uploadingState,
              bpm,
              setBPM,
              goToNextBPM,
              selectedSound,
              setSelectedSound,
              selectingMode,
              setSelectingMode,
              recording,
              setRecording,
              currentBeat,
              playing,
              togglePlaying,
              currentBeatIndex,
              currentPattern,
              selectedPattern,
              queueSelectedPattern,
              queuedSelectedPattern,
            }}
          />
        </div>
      </div>

      {productTourMode === "finished" && (
        <>
          <HelpButton
            onClick={() => setShowing(true)}
            onTouchDevice={onTouchDevice}
          />
          <InstructionsModal
            showing={show}
            setShowing={setShowing}
            takeTour={() => {
              setShowing(false);
              setProductTourMode("intro");
            }}
          />
        </>
      )}

      <ProductTour
        productTourMode={productTourMode}
        setProductTourMode={setProductTourMode}
        onTourStart={() => {
          resetPatterns();
          resetBPM();
          resetSelectedSound();
          resetSelectingMode();
          setRecording(false);
          pause();
        }}
        tilt={defaultTilt}
      />
    </div>
  );
};

export default PocketOperatorWrapper;
