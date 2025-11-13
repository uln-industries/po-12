import classes from "./helpButton.module.scss";
import { cn } from "@/lib/utils";

type HelpButtonProps = {
  onClick: () => void;
  onTouchDevice: boolean;
};

/**
 * A floating help button that opens the instructions modal.
 */
const HelpButton = ({ onClick, onTouchDevice }: HelpButtonProps) => {
  return (
    <button
      className={cn(
        classes.helpButton,
        onTouchDevice ? classes.mobile : classes.desktop
      )}
      onClick={onClick}
      aria-label="Open instructions"
      type="button"
    >
      ?
    </button>
  );
};

export default HelpButton;
