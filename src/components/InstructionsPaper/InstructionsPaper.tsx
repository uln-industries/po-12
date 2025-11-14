import classes from "./instructionsPaper.module.scss";
import {
  OneButtonIcon,
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
  const panelControls = [
    { icon: <OneButtonIcon />, label: "note trig", detail: "1-16" },
    { icon: <DotgridIcon />, label: "pattern", detail: "select bank" },
    { icon: <SCurveIcon />, label: "sound", detail: "swap voice" },
    { icon: <MetronomeIcon />, label: "bpm", detail: "tempo + swing" },
    { icon: <RecordIcon />, label: "record", detail: "hold + trig" },
    { icon: <PlayIcon />, label: "play", detail: "transport" },
  ];

  const controlShortcuts = [
    { icon: <SCurveIcon />, label: "sound", key: "j" },
    { icon: <DotgridIcon />, label: "pattern", key: "k" },
    { icon: <MetronomeIcon />, label: "bpm", key: "l" },
    { icon: <RecordIcon />, label: "record", key: "·" },
    { icon: <PlayIcon />, label: "play", key: "⎵" },
  ];

  const transferShortcuts = [
    { label: "import pattern", key: "]" },
    { label: "export pattern", key: "[" },
  ];

  const noteRows = [
    ["1", "2", "3", "4"],
    ["q", "w", "e", "r"],
    ["a", "s", "d", "f"],
    ["z", "x", "c", "v"],
  ];

  return (
    <div className={classes.instructionsContainer}>
      <div className={classes.instructionsHeader}>
        <h2>PO-12 rhythm manual</h2>
      </div>

      <div className={classes.instructionsContent}>
        <div className={classes.instructionsGrid}>
          <section className={classes.instructionsSection}>
            <div className={classes.sectionHeading}>
              <h3>Panel</h3>
              <span className={classes.sectionMeta}>icon → function</span>
            </div>
            <ul className={classes.panelGrid}>
              {panelControls.map(({ icon, label, detail }) => (
                <li key={label} className={classes.panelItem}>
                  {icon}
                  <div className={classes.panelCopy}>
                    <span>{label}</span>
                    {detail ? <small>{detail}</small> : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={classes.instructionsSection}>
            <div className={classes.sectionHeading}>
              <h3>Ctrl keys</h3>
              <span className={classes.sectionMeta}>left hand</span>
            </div>
            <div className={classes.controlShortcuts}>
              {controlShortcuts.map(({ icon, label, key }) => (
                <div key={label} className={classes.controlShortcut}>
                  {icon}
                  <div className={classes.shortcutCopy}>
                    <span>{label}</span>
                    <div className={classes.instructionsPaperKey}>{key}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.utilityShortcuts}>
              {transferShortcuts.map(({ label, key }) => (
                <div key={label} className={classes.utilityShortcut}>
                  <span>{label}</span>
                  <span className={classes.utilityKey}>{key}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={classes.instructionsSection}>
            <div className={classes.sectionHeading}>
              <h3>Note grid</h3>
              <span className={classes.sectionMeta}>mirrors keypad</span>
            </div>
            <div className={classes.instructionsPaperKeymap}>
              {noteRows.map((row, rowIndex) => (
                <div key={`note-row-${rowIndex}`} className={classes.instructionsPaperRow}>
                  {row.map((key) => (
                    <div key={key} className={classes.instructionsPaperCell}>
                      {key}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className={`${classes.instructionsSection} ${classes.aboutSection}`}>
          <div className={classes.sectionHeading}>
            <h3>About</h3>
            <span className={classes.sectionMeta}>credits</span>
          </div>
          <p className={classes.disclaimer}>
            Tribute interface for PO-12 rhythm. Teenage Engineering owns the original hardware + art.
          </p>
          <div className={classes.links}>
            <a
              href="https://teenage.engineering/store/po-12"
              target="_blank"
              rel="noopener noreferrer"
            >
              buy original
            </a>
            <span>•</span>
            <a
              href="https://teenage.engineering/guides/po-12/en"
              target="_blank"
              rel="noopener noreferrer"
            >
              full manual
            </a>
            <span>•</span>
            <a href="https://twitter.com/@jakeissnt" target="_blank" rel="noopener noreferrer">
              @jakeissnt
            </a>
          </div>
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
