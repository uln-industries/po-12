import { useEffect } from "react";
import InstructionsPaper from "./InstructionsPaper";
import classes from "./instructionsModal.module.scss";
import type { Dispatch, SetStateAction } from "react";

type InstructionsModalProps = {
  showing: boolean;
  setShowing: Dispatch<SetStateAction<boolean>>;
  pinned: boolean;
  setPinned: Dispatch<SetStateAction<boolean>>;
  takeTour: () => void;
  onTouchDevice: boolean;
};

/**
 * Modal wrapper for the instructions paper.
 * Shows the paper in a centered modal overlay.
 */
const InstructionsModal = ({
  showing,
  setShowing,
  pinned,
  setPinned,
  takeTour,
  onTouchDevice,
}: InstructionsModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (showing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showing]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showing) {
        setShowing(false);
        setPinned(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showing, setShowing, setPinned]);

  if (!showing) return null;

  return (
    <div
      className={classes.modalOverlay}
      onClick={() => {
        setShowing(false);
        setPinned(false);
      }}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <InstructionsPaper
          setShowing={setShowing}
          pinned={pinned}
          setPinned={setPinned}
          takeTour={takeTour}
          onTouchDevice={onTouchDevice}
        />
      </div>
    </div>
  );
};

export default InstructionsModal;
