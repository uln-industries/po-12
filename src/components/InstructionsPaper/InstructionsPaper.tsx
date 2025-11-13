import { cn } from "@/lib/utils";
import classes from "./instructionsPaper.module.scss";
import { useState } from "react";
import {
  OneButtonIcon,
  SixteenButtonIcon,
  DotgridIcon,
  SCurveIcon,
  MetronomeIcon,
  RecordIcon,
  PlayIcon,
} from "./icons";
import InstructionsCardButton from "./InstructionsCardButton";
import type { Dispatch, SetStateAction } from "react";

type InstructionsPaperProps = {
  tilt: { x: number; y: number };
  showing: boolean;
  setShowing: Dispatch<SetStateAction<boolean>>;
  pinned: boolean;
  setPinned: Dispatch<SetStateAction<boolean>>;
  takeTour: () => void;
  onTouchDevice: boolean;
};

/**
 * A paper that unfolds to reveal instructions that you can read.
 */
const InstructionsPaper = ({
  tilt: { x, y },
  showing,
  setShowing,
  pinned,
  setPinned,
  takeTour,
  onTouchDevice,
}: InstructionsPaperProps) => {
  // Always show as open when in modal
  const [open, setOpen] = useState(true);

  return (
    <div
      className={cn(classes.stage, classes.open, classes.inModal)}
      style={{
        transform: `rotateX(${y}deg) rotateY(${x}deg)`,
        width: "312px",
        height: "312px",
        color: "rgba(0, 0, 0, 0.75)",
        textShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={cn(classes.box, classes.box1)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div>
          PO-12 rhythm
          <br />
          manual
          <br />
          [po en]
          <br />
        </div>
      </div>
      <div className={cn(classes.box, classes.box2)}>
        <ul className={classes.noteMenuList}>
          <li>
            [<OneButtonIcon /> - <SixteenButtonIcon />
            ]: play note
          </li>
          <li>
            [<DotgridIcon />
            ]: choose pattern
          </li>
          <li>
            [<SCurveIcon />
            ]: choose sound
          </li>
          <li>
            [<MetronomeIcon />
            ]: change bpm
          </li>
          <li>
            [<RecordIcon />
            ]: record
          </li>
          <li>
            [<PlayIcon />
            ]: play
          </li>
        </ul>
      </div>
      <div className={cn(classes.box, classes.box3)}>
        <ul className={classes.instructionsPaperList}>
          <li>
            <div>{"] import"}</div> <div>{"export [→"}</div>
          </li>
        </ul>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "between",
            alignItems: "start",
          }}
        >
          <div className={classes.instructionsPaperKeymap}>
            <div className={classes.instructionsPaperRow}>
              <div className={classes.instructionsPaperCell}>1</div>
              <div className={classes.instructionsPaperCell}>2</div>
              <div className={classes.instructionsPaperCell}>3</div>
              <div className={classes.instructionsPaperCell}>4</div>
            </div>

            <div className={classes.instructionsPaperRow}>
              <div className={classes.instructionsPaperCell}>q</div>
              <div className={classes.instructionsPaperCell}>w</div>
              <div className={classes.instructionsPaperCell}>e</div>
              <div className={classes.instructionsPaperCell}>r</div>
            </div>

            <div className={classes.instructionsPaperRow}>
              <div className={classes.instructionsPaperCell}>a</div>
              <div className={classes.instructionsPaperCell}>s</div>
              <div className={classes.instructionsPaperCell}>d</div>
              <div className={classes.instructionsPaperCell}>f</div>
            </div>

            <div className={classes.instructionsPaperRow}>
              <div className={classes.instructionsPaperCell}>z</div>
              <div className={classes.instructionsPaperCell}>x</div>
              <div className={classes.instructionsPaperCell}>c</div>
              <div className={classes.instructionsPaperCell}>v</div>
            </div>
          </div>

          <div
            className={classes.instructionsPaperKeymap}
            style={{
              fontSize: "13px",
            }}
          >
            <div className={classes.instructionsPaperRow}>
              <SCurveIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>j</div>
            </div>
            <div className={classes.instructionsPaperRow}>
              <DotgridIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>k</div>
            </div>
            <div className={classes.instructionsPaperRow}>
              <MetronomeIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>l</div>
            </div>
            <div className={classes.instructionsPaperRow}>
              <RecordIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>&#183;</div>
            </div>
          </div>
        </div>
      </div>
      <div className={cn(classes.box, classes.box4)}>
        <div>
          This is an unlicensed partial reimplementation of a hardware device.
          All design credit goes to Teenage Engineering.
        </div>

        <div className={classes.instructionsPaperKeymapContainer}>
          <div className={classes.instructionsPaperKeymap}>
            <div className={classes.instructionsPaperRow}>
              <PlayIcon />
              {" ↔ "}
              <div className={classes.instructionsPaperKey}>&#9141;</div>
            </div>
          </div>
          <a
            href="https://teenage.engineering/store/po-12"
            target="_blank"
            className={classes.instructionsPaperLink}
          >
            link: buy original
          </a>

          <a
            href="https://teenage.engineering/guides/po-12/en"
            target="_blank"
            className={classes.instructionsPaperLink}
          >
            link: full manual
          </a>

          <span>
            by{" "}
            <a
              href="https://twitter.com/@jakeissnt"
              target="_blank"
              className={classes.instructionsPaperLink}
            >
              @jakeissnt
            </a>{" "}
          </span>
          <div className={classes.instructionsCardButtonBlock}>
            <InstructionsCardButton
              onClick={() => {
                setOpen(false);
                takeTour();
              }}
            >
              take tour
            </InstructionsCardButton>
            <InstructionsCardButton
              onClick={() => setPinned((pinned) => !pinned)}
              disabled={onTouchDevice}
            >
              {pinned ? "unpin" : "pin"}
            </InstructionsCardButton>
            <InstructionsCardButton
              onClick={() => {
                setOpen(false);
                setShowing(false);
                setPinned(false);
              }}
            >
              close
            </InstructionsCardButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPaper;
