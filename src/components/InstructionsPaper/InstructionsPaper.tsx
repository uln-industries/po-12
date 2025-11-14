import classes from "./instructionsPaper.module.scss";
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
  setShowing: Dispatch<SetStateAction<boolean>>;
  takeTour: () => void;
};

/**
 * A simplified instructions card that displays help information.
 */
const InstructionsPaper = ({
  setShowing,
  takeTour,
}: InstructionsPaperProps) => {
  return (
    <div className={classes.instructionsContainer}>
      <div className={classes.instructionsHeader}>
        <h2>PO-12 rhythm manual</h2>
      </div>

      <div className={classes.instructionsContent}>
        <section className={classes.instructionsSection}>
          <h3>Controls</h3>
          <ul className={classes.controlsList}>
            <li>
              <OneButtonIcon /> - <SixteenButtonIcon />: play note
            </li>
            <li>
              <DotgridIcon />: choose pattern
            </li>
            <li>
              <SCurveIcon />: choose sound
            </li>
            <li>
              <MetronomeIcon />: change bpm
            </li>
            <li>
              <RecordIcon />: record
            </li>
            <li>
              <PlayIcon />: play
            </li>
          </ul>
        </section>

        <section className={classes.instructionsSection}>
          <h3>Keyboard Shortcuts</h3>
          <div className={classes.keymapGrid}>
            <div className={classes.keymapSection}>
              <h4>Notes</h4>
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
            </div>

            <div className={classes.keymapSection}>
              <h4>Controls</h4>
              <div className={classes.controlKeymap}>
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
                <div className={classes.instructionsPaperRow}>
                  <PlayIcon />
                  {" ↔ "}
                  <div className={classes.instructionsPaperKey}>&#9141;</div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.importExportHint}>
            <span>] import</span>
            <span>export [→</span>
          </div>
        </section>

        <section className={classes.instructionsSection}>
          <h3>About</h3>
          <p className={classes.disclaimer}>
            This is an unlicensed partial reimplementation of a hardware device.
            All design credit goes to Teenage Engineering.
          </p>
          <div className={classes.links}>
            <a
              href="https://teenage.engineering/store/po-12"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy original
            </a>
            <a
              href="https://teenage.engineering/guides/po-12/en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Full manual
            </a>
          </div>
          <p className={classes.attribution}>
            by{" "}
            <a
              href="https://twitter.com/@jakeissnt"
              target="_blank"
              rel="noopener noreferrer"
            >
              @jakeissnt
            </a>
          </p>
        </section>
      </div>

      <div className={classes.instructionsFooter}>
        <InstructionsCardButton onClick={takeTour}>
          take tour
        </InstructionsCardButton>
        <InstructionsCardButton onClick={() => setShowing(false)}>
          close
        </InstructionsCardButton>
      </div>
    </div>
  );
};

export default InstructionsPaper;
