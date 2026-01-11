"use client";

import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import NumberedButton from "./numberedButton";
import useFigureAnimator from "@/hooks/useFigureAnimator";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Button, { ButtonStatus } from "./POButton";
import LCD from "../LCD";
import classes from "./pocketOperator.module.scss";
import { SelectingMode } from "@/lib/utils";
import type { Note, Pattern } from "@/lib/types";
import { importPatternFile, exportPatternFile } from "@/lib/file";

import useSampler from "@/hooks/useSampler";
import {
  SCurve,
  Metronome,
  Asterisk,
  Play,
  Record,
  GoodEnoughArrow,
  Grip,
} from "../icons";

import POKnob from "./POKnob";

import useKeyInteractions from "@/hooks/useKeyInteractions";

// 4x4 grid of buttons numbered 1-16
const buttonGrid = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

type PatternConfig = {
  patterns: Pattern[];
  supportedPatternIndices: number[];
  togglePatternNote: (
    patternIndex: number,
    beatIndex: number,
    note: number
  ) => void;
  setPatternsFromFile: (file: File) => void;
  setUploadFailed: () => void;
  uploadingState?: "fail" | "success";
  bpm: number;
  setBPM: (bpm: number) => void;
  goToNextBPM: () => void;
  selectedSound: number;
  setSelectedSound: (sound: number) => void;
  selectingMode: SelectingMode;
  setSelectingMode: Dispatch<SetStateAction<SelectingMode>>;
  recording: boolean;
  setRecording: Dispatch<SetStateAction<boolean>>;
  currentBeat: number;
  playing: boolean;
  togglePlaying: () => void;
  currentBeatIndex: number;
  currentPattern: Pattern;
  selectedPattern: number;
  queueSelectedPattern: (pattern: number) => void;
  queuedSelectedPattern: number | null;
};

type PocketOperatorProps = {
  className: string;
  patternConfig: PatternConfig;
};

/**
 * Flat pocket operator. Has all of the functionality we want.
 */
const PocketOperator = ({
  className,
  patternConfig: {
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
  },
}: PocketOperatorProps) => {
  // Tumbler levels: [0, 8]. set by the two knobs
  const [tumblerALevel, setTumblerALevel] = useState(4);
  const [tumblerBLevel, setTumblerBLevel] = useState(4);

  const { play: playSample } = useSampler();

  /**
   * The current array of sounds that should be playing on this beat.
   */
  const soundsPlaying = useMemo(
    () =>
      playing
        ? currentPattern.notes[currentBeatIndex].map((v: Note) => v.note)
        : [],

    // We do not refresh with the current pattern as
    // we do not retrigger the current beat whenever the current pattern changes!
    // We wait for the next time to come around.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBeatIndex, playing]
  );

  const figureRef = useRef<SVGSVGElement | null>(null);

  const { triggerAnimation } = useFigureAnimator({
    figureRef,
    soundsPlaying,
    bpm,
    suspend: Boolean(queuedSelectedPattern),
  });

  /**
   * Interpret a numeric button click,
   * playing a sound or toggling a note in a pattern.
   */
  const onButtonClick = useCallback(
    (buttonNumber: number) => {
      const currentButtonIndex = buttonNumber - 1;

      switch (selectingMode) {
        case SelectingMode.SOUND:
          setSelectedSound(buttonNumber);
          setSelectingMode(SelectingMode.DEFAULT);
          break;
        case SelectingMode.PATTERN:
          queueSelectedPattern(buttonNumber);
          setSelectingMode(SelectingMode.DEFAULT);
          break;
        default:
          if (recording) {
            // if we're recording, add the sound to the current pattern
            togglePatternNote(selectedPattern, buttonNumber, selectedSound);
          } else {
            try {
              triggerAnimation(currentButtonIndex);
              playSample([currentButtonIndex]);
            } catch (e) {
              console.error(
                "[PocketOperator.onButtonClick] Error playing sample",
                e
              );
            }
          }
      }
    },
    [
      setSelectedSound,
      queueSelectedPattern,
      setSelectingMode,
      triggerAnimation,
      selectingMode,
      playSample,
      togglePatternNote,
      recording,
      selectedSound,
      selectedPattern,
    ]
  );

  /**
   * Play the sounds that are currently queued to play.
   */
  useEffect(() => {
    // soundsPlaying are 1 indexed, playSample is 0 indexed
    playSample(soundsPlaying.map((n) => n - 1));
  }, [soundsPlaying, playSample]);

  const { keyedButtons } = useKeyInteractions({
    onButtonClick,
    setSelectingMode,
    setRecording,
    setPlaying: togglePlaying,
    goToNextBPM,
  });

  const numberedButtonProps = {
    currentBeat,
    keyedButtons,
    playing,
    soundsPlaying,
    onButtonClick,
    selectedSound,
    selectedPattern,
    selectingMode,
    currentBeatIndex,
    currentPattern,
    supportedPatternIndices,
    recording,
  };

  return (
    <div className={className}>
      <div
        className={cn(classes.leftCutout, "importPatternsButton")}
        role="button"
        aria-label="Upload patterns"
        onClick={() =>
          importPatternFile().then(setPatternsFromFile).catch(setUploadFailed)
        }
      >
        <div>JAM</div>
        <div className={classes.tooltip1}>
          <span className={classes.tooltipText}>
            Upload your patterns from disk.
          </span>
        </div>
      </div>
      <div className={classes.operatorText}>
        <div>pocket operator</div>
      </div>
      <div
        className={cn(classes.rightCutout, "exportPatternsButton")}
        role="button"
        aria-label="Export patterns"
        onClick={() => exportPatternFile(patterns)}
      >
        <GoodEnoughArrow />
        <div className={classes.tooltip2}>
          <span className={classes.tooltipText}>
            Export and download your patterns.
          </span>
        </div>
      </div>
      <LCD
        uploadingState={uploadingState}
        selectedSound={selectedSound}
        bpm={bpm}
        setBPM={setBPM}
        selectedPattern={selectedPattern}
        setSelectedPattern={queueSelectedPattern}
        currentBeat={currentBeat}
        playing={playing}
        setPlaying={togglePlaying}
        recording={recording}
        setRecording={setRecording}
        queuedSelectedPattern={queuedSelectedPattern}
        tumblerALevel={tumblerALevel}
        tumblerBLevel={tumblerBLevel}
        figureRef={figureRef}
      />
      <div className={classes.buttonsTop}>
        <Button
          ariaLabel="selectSoundButton"
          status={
            selectingMode === SelectingMode.SOUND
              ? ButtonStatus.HIGHLIGHTED
              : ButtonStatus.NONE
          }
          hovered={selectingMode === SelectingMode.SOUND}
          onClick={() => setSelectingMode(SelectingMode.SOUND)}
        >
          <SCurve />
        </Button>
        <Button
          ariaLabel="selectPatternButton"
          status={
            selectingMode === SelectingMode.PATTERN
              ? ButtonStatus.HIGHLIGHTED
              : ButtonStatus.NONE
          }
          onClick={() => setSelectingMode(SelectingMode.PATTERN)}
        >
          <Grip />
        </Button>
        <Button ariaLabel="switchBPMButton" onRelease={goToNextBPM}>
          <Metronome />
        </Button>
        <POKnob
          className="knobA"
          level={tumblerALevel}
          setLevel={setTumblerALevel}
        />
        <POKnob
          className="knobB"
          level={tumblerBLevel}
          setLevel={setTumblerBLevel}
        />
      </div>
      <div className={classes.buttons}>
        <div className={classes.buttonRow}>
          {buttonGrid[0].map((buttonNumber) => (
            <NumberedButton
              key={buttonNumber}
              buttonNumber={buttonNumber}
              {...numberedButtonProps}
            />
          ))}
          <Button disabledBecause="" ariaLabel="Special function button">
            <Asterisk width={24} height={24} />
          </Button>
        </div>
        <div className={classes.buttonRow}>
          {buttonGrid[1].map((buttonNumber) => (
            <NumberedButton
              key={buttonNumber}
              buttonNumber={buttonNumber}
              {...numberedButtonProps}
            />
          ))}
          <Button disabledBecause="" ariaLabel="Effects button">
            FX
          </Button>
        </div>

        <div className={classes.buttonRow}>
          {buttonGrid[2].map((buttonNumber) => (
            <NumberedButton
              key={buttonNumber}
              buttonNumber={buttonNumber}
              {...numberedButtonProps}
            />
          ))}
          <Button
            status={playing ? ButtonStatus.NOTED : ButtonStatus.NONE}
            ariaLabel="playButton"
            onClick={togglePlaying}
          >
            <Play width={16} height={16} />
          </Button>
        </div>

        <div className={classes.buttonRow}>
          {buttonGrid[3].map((buttonNumber) => (
            <NumberedButton
              key={buttonNumber}
              buttonNumber={buttonNumber}
              {...numberedButtonProps}
            />
          ))}
          <Button
            flipColors
            ariaLabel="recordButton"
            status={recording ? ButtonStatus.NOTED : ButtonStatus.NONE}
            onClick={() =>
              setRecording((currentlyRecording) => !currentlyRecording)
            }
          >
            <Record />
          </Button>
        </div>
      </div>
      <div className={classes.bottomCutoutContainer}>
        <div className={classes.bottomCutout} />
      </div>
    </div>
  );
};

export default PocketOperator;
