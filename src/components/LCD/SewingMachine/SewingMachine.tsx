import SpoolIndicator from "./SpoolIndicator";
import SpoolFeeder from "./SpoolFeeder";
import SpoolStamp from "./SpoolStamp";
import SpoolList from "./SpoolList";
import SpinningWheel from "./SpinningWheel";
import { useRef } from "react";
import useSpoolAnimator from "./useSpoolAnimator";

const lightningLeftEnabled = false;
const lightningRightEnabled = false;

type SewingMachineProps = {
  playing: boolean;
  currentBeat: number;
  queuedSelectedPattern: number | null;
  bpm: number;
};

/**
 * The sewing machine on the pocket operator.
 */
const SewingMachine = ({
  playing,
  currentBeat,
  queuedSelectedPattern,
  bpm,
}: SewingMachineProps) => {
  const spoolRef = useRef<SVGGElement | null>(null);

  useSpoolAnimator({
    spoolRef,
    queuedSelectedPattern,
    playing,
    currentBeat,
    bpm,
  });
  return (
    <div>
      <svg
        width="113"
        height="92"
        viewBox="0 0 113 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SpoolIndicator currentBeat={currentBeat} />
        <SpoolFeeder playing={playing} currentBeat={currentBeat} />

        {/* thing on top of spool */}
        <path
          d="M72.5 0.5L72.5 3.5L71 3.5L71 0.5L72.5 0.5Z"
          fill="currentColor"
        />
        <SpoolList
          spoolRef={spoolRef}
        />

        {/* the bottom part of the machine */}
        <rect x="12" y="75" width="73" height="14" fill="currentColor" />
        <rect x="19" y="89" width="9" height="3" fill="currentColor" />
        <rect x="68" y="89" width="9" height="3" fill="currentColor" />
        <rect x="12" y="67" width="73" height="6" fill="currentColor" />

        {/* other parts of the stamp */}
        <rect x="24" y="52" width="4" height="4" fill="currentColor" />

        <rect x="30" y="52" width="3" height="3" fill="currentColor" />
        <rect x="33" y="54" width="6" height="1" fill="currentColor" />
        <SpoolStamp
          currentBeat={currentBeat}
          lightningLeftEnabled={lightningLeftEnabled}
          lightningRightEnabled={lightningRightEnabled}
        />

        <path
          d="M18 20L21.5 17H25V49H18C18 36.5032 18 32.4968 18 20Z"
          fill="currentColor"
        />
        <rect x="88" y="21" width="5" height="14" fill="currentColor" />
        <rect x="27" y="17" width="7" height="32" fill="currentColor" />
        <rect x="34" y="17" width="24" height="19" fill="currentColor" />
        <rect x="30" y="14" width="4" height="3" fill="currentColor" />

        {/* right part of the machine. contains the even and odd spinning wheel */}
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M58 17H80C82.7614 17 85 19.2386 85 22V35.5H80V36C80 31.5817 76.4183 28 72 28C67.5817 28 64 31.5817 64 36C64 40.4183 67.5817 44 72 44C76.4183 44 80 40.4183 80 36V37H85V54H80V55C80 50.5817 76.4183 47 72 47C67.5817 47 64 50.5817 64 55C64 59.4183 67.5817 63 72 63C76.4183 63 80 59.4183 80 55V55.5H85V67H58V17Z"
            fill="currentColor"
          />

          <circle cx="72" cy="55" r="3" fill="currentColor" />
          <circle cx="72" cy="36" r="3" fill="currentColor" />
          <SpinningWheel currentBeat={currentBeat} />
        </g>
      </svg>
    </div>
  );
};

export default SewingMachine;
