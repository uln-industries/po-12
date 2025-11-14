import { useEffect } from "react";
import InstructionsPaper from "./InstructionsPaper";
import classes from "./instructionsModal.module.scss";
import type { Dispatch, SetStateAction } from "react";

type InstructionsModalProps = {
  showing: boolean;
  setShowing: Dispatch<SetStateAction<boolean>>;
  takeTour: () => void;
};

/**
 * Modal wrapper for the instructions paper.
 * Shows the paper in a centered modal overlay.
 */
const InstructionsModal = ({
  showing,
  setShowing,
  takeTour,
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
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showing, setShowing]);

  if (!showing) return null;

  return (
    <div
      className={classes.modalOverlay}
      onClick={() => setShowing(false)}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <InstructionsPaper
          setShowing={setShowing}
          takeTour={takeTour}
        />
      </div>
    </div>
  );
};

export default InstructionsModal;
