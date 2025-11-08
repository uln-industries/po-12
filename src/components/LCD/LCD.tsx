import SoundTumblers from "./ABSoundTumblers";
import PatternIndicators from "./PatternIndicators";

import SewingMachine from "./SewingMachine";
import TimeBox from "./TimeBox";
import classes from "./lcd.module.scss";

import CoolFigure from "./CoolFigure";

import { SuccessIcon, FailIcon, PlayingIcon, RecordingIcon } from "./icons";
import MetronomeAndMode from "./MetronomeAndMode";
import BottomBeatIndicator from "./BottomBeatIndicator";
import { cn } from "@/lib/utils";
import type { RefObject } from "react";

type LCDProps = {
  bpm: number;
  setBPM: (bpm: number) => void;
  selectedSound: number;
  selectedPattern: number;
  setSelectedPattern: (pattern: number) => void;
  currentBeat: number;
  playing: boolean;
  setPlaying: () => void;
  recording: boolean;
  setRecording: (recording: boolean) => void;
  queuedSelectedPattern: number | null;
  figureRef: RefObject<SVGSVGElement | null>;
  tumblerALevel: number;
  tumblerBLevel: number;
  uploadingState: "fail" | "success" | undefined;
};

/**
 * The LCD screen of the pocket operator.
 */
const LCD = ({
  bpm,
  setBPM,
  selectedSound,
  selectedPattern,
  setSelectedPattern,
  currentBeat,
  playing,
  setPlaying,
  recording,
  setRecording,
  queuedSelectedPattern,
  figureRef,
  tumblerALevel,
  tumblerBLevel,
  uploadingState,
}: LCDProps) => {
  const currentBeatInteger = Math.floor(currentBeat % 16);

  return (
    <div className={cn(classes.lcd, "pocketOperatorMouseTarget")}>
      <MetronomeAndMode currentBeat={currentBeat} bpm={bpm} setBPM={setBPM} />
      <TimeBox bpm={bpm} selectedSound={selectedSound} playing={playing} />
      <BottomBeatIndicator currentBeat={currentBeat} />
      <div className={classes.playPauseIcons}>
        <div onClick={setPlaying} role="button" aria-label="Play from LCD">
          <PlayingIcon className={playing ? classes.visible : classes.hidden} />
        </div>
        <div
          onClick={() => setRecording(!recording)}
          role="button"
          aria-label="Pause from LCD"
        >
          <RecordingIcon
            className={recording ? classes.visible : classes.hidden}
          />
        </div>
        <div>
          <FailIcon
            className={
              uploadingState === "fail" ? classes.visible : classes.hidden
            }
          />
        </div>
        <div>
          <SuccessIcon
            className={
              uploadingState === "success" ? classes.visible : classes.hidden
            }
          />
        </div>
      </div>
      <div className={classes.sewingMachineBlock}>
        <SewingMachine
          playing={playing}
          currentBeat={currentBeat}
          queuedSelectedPattern={queuedSelectedPattern}
          bpm={bpm}
        />
      </div>
      <div className={classes.coolFigureBlock}>
        <CoolFigure ref={figureRef} queuedSelectedPattern={queuedSelectedPattern} />
      </div>
      <PatternIndicators
        currentBeat={currentBeatInteger}
        queuedSelectedPattern={queuedSelectedPattern}
        selectedPattern={selectedPattern}
        setSelectedPattern={setSelectedPattern}
      />
      <div className={classes.soundTumblerLineBox}>
        <SoundTumblers
          tumblerALevel={tumblerALevel}
          tumblerBLevel={tumblerBLevel}
        />
      </div>
    </div>
  );
};

export default LCD;
