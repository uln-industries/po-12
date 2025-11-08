"use client";

import { forwardRef } from "react";
import classes from "./lcd.module.scss";

type CoolFigureProps = {
  queuedSelectedPattern?: number | null;
};

const CoolFigure = forwardRef<SVGSVGElement, CoolFigureProps>(
  ({ queuedSelectedPattern: isSwitchingPatterns }, ref) => {

  // the sounds playing change once per beat.
  // update the animation state based on the sounds playing.

  return (
    <svg
      ref={ref}
      width="95"
      height="78"
      viewBox="0 0 95 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* top left mallet */}
      <g data-anim-show="hittingHighHat" className={classes.hidden}>
        <g
          data-anim-show="finishedHittingClap hittingHighHat"
          className={classes.hidden}
        >
          <rect
            x="21.8363"
            y="44.0744"
            width="2.5"
            height="10"
            rx="1.25"
            transform="rotate(135.027 21.8363 44.0744)"
            fill="currentColor"
          />
          <rect
            x="21.1292"
            y="44.0741"
            width="1.5"
            height="9"
            rx="0.75"
            transform="rotate(135.027 21.1292 44.0741)"
            stroke="currentColor"
          />
        </g>
        <rect
          x="10.1554"
          y="33.4173"
          width="5"
          height="1.5"
          transform="rotate(44.1785 10.1554 33.4173)"
          fill="currentColor"
        />
        <circle cx="8.5" cy="32.5" r="2.5" fill="currentColor" />
      </g>

      {/* center left mallet */}
      <g data-anim-show="finishedHittingDrum" className={classes.hidden}>
        <g
          data-anim-show="hittingClap finishedHittingDrum"
          className={classes.hidden}
        >
          <rect
            x="21.5"
            y="46.5"
            width="2.5"
            height="10"
            rx="1.25"
            transform="rotate(90 21.5 46.5)"
            fill="currentColor"
          />
          <rect
            x="21"
            y="47"
            width="1.5"
            height="9"
            rx="0.75"
            transform="rotate(90 21 47)"
            stroke="currentColor"
          />
        </g>
        <rect
          x="8.15543"
          y="42.4173"
          width="5"
          height="1.5"
          transform="rotate(44.1785 8.15543 42.4173)"
          fill="currentColor"
        />
        <circle cx="6.5" cy="41.5" r="2.5" fill="currentColor" />
      </g>

      {/* bottom left mallet */}
      <g data-anim-show="hittingDrum" className={classes.hidden}>
        <g
          data-anim-show="finishedHittingClap hittingDrum"
          className={classes.hidden}
        >
          <rect
            x="14.7678"
            y="57.8552"
            width="2.5"
            height="10"
            rx="1.25"
            transform="rotate(-135 14.7678 57.8552)"
            fill="currentColor"
          />
          <rect
            x="14.7678"
            y="57.1481"
            width="1.5"
            height="9"
            rx="0.75"
            transform="rotate(-135 14.7678 57.1481)"
            stroke="currentColor"
          />
        </g>
        <rect x="7" y="56" width="5.5" height="1.5" fill="currentColor" />
        <circle
          cx="5.53553"
          cy="56.4739"
          r="2.5"
          transform="rotate(-45 5.53553 56.4739)"
          fill="currentColor"
        />
      </g>

      {/* top left head of the guy */}
      <g className={isSwitchingPatterns ? classes.visible : classes.hidden}>
        <rect
          x="12.9392"
          y="3.46082"
          width="16"
          height="1.5"
          transform="rotate(46.1985 12.9392 3.46082)"
          fill="currentColor"
        />

        <rect
          x="19.3165"
          y="2.88696"
          width="12"
          height="5"
          transform="rotate(46.1985 19.3165 2.88696)"
          fill="currentColor"
        />
        <g>
          <rect
            x="10.3539"
            y="8.71118"
            width="2.5"
            height="4"
            rx="1.25"
            transform="rotate(-43.8015 10.3539 8.71118)"
            fill="currentColor"
          />
          <rect
            x="11.0609"
            y="8.72597"
            width="1.5"
            height="3"
            rx="0.75"
            transform="rotate(-43.8015 11.0609 8.72597)"
            stroke="currentColor"
          />
        </g>

        <path
          d="M20.2246 18.6425C19.6796 19.1652 19.037 19.5754 18.3335 19.8497C17.63 20.124 16.8793 20.257 16.1244 20.2413C15.3695 20.2255 14.625 20.0611 13.9336 19.7576C13.2422 19.4541 12.6173 19.0174 12.0947 18.4724C11.572 17.9275 11.1618 17.2849 10.8875 16.5813C10.6132 15.8778 10.4801 15.1272 10.4959 14.3722C10.5117 13.6173 10.6761 12.8729 10.9796 12.1814C11.283 11.49 11.7198 10.8651 12.2647 10.3425L16.2447 14.4925L20.2246 18.6425Z"
          fill="currentColor"
        />
        <rect
          x="13.5426"
          y="8.42427"
          width="12"
          height="2.5"
          transform="rotate(46.1985 13.5426 8.42427)"
          fill="currentColor"
        />
      </g>

      {/* rightmost head of guy */}
      <g className={classes.hidden}>
        <rect
          width="16"
          height="1.5"
          transform="matrix(-0.692162 0.721743 0.721743 0.692162 60.6833 26.4608)"
          fill="currentColor"
        />
        <rect
          width="12"
          height="5"
          transform="matrix(-0.692162 0.721743 0.721743 0.692162 54.3059 25.887)"
          fill="currentColor"
        />

        <g>
          <rect
            width="2.5"
            height="4"
            rx="1.25"
            transform="matrix(-0.721742 -0.692162 -0.692162 0.721742 63.2686 31.7112)"
            fill="currentColor"
          />
          <rect
            x="-0.706952"
            y="0.0147903"
            width="1.5"
            height="3"
            rx="0.75"
            transform="matrix(-0.721742 -0.692162 -0.692162 0.721742 62.0616 31.226)"
            stroke="currentColor"
          />
        </g>
        <path
          d="M53.3979 41.6425C53.9429 42.1652 54.5854 42.5754 55.289 42.8497C55.9925 43.124 56.7431 43.2571 57.4981 43.2413C58.253 43.2255 58.9974 43.0611 59.6889 42.7576C60.3803 42.4542 61.0052 42.0174 61.5278 41.4725C62.0505 40.9275 62.4607 40.2849 62.735 39.5814C63.0093 38.8778 63.1423 38.1272 63.1265 37.3723C63.1107 36.6173 62.9464 35.8729 62.6429 35.1815C62.3394 34.49 61.9027 33.8652 61.3577 33.3425L57.3778 37.4925L53.3979 41.6425Z"
          fill="currentColor"
        />
        <rect
          width="12"
          height="2.5"
          transform="matrix(-0.692162 0.721743 0.721743 0.692162 60.0799 31.4243)"
          fill="currentColor"
        />
      </g>

      {/* hand pointing up at the top left */}
      <g className={isSwitchingPatterns ? classes.visible : classes.hidden}>
        <g>
          <rect
            x="4"
            y="16.7678"
            width="2.5"
            height="4"
            rx="1.25"
            transform="rotate(-45 4 16.7678)"
            fill="currentColor"
          />
          <rect
            x="4.70711"
            y="16.7678"
            width="1.5"
            height="3"
            rx="0.75"
            transform="rotate(-45 4.70711 16.7678)"
            stroke="currentColor"
          />
        </g>
        <g>
          <rect
            x="5"
            y="17.7678"
            width="2.5"
            height="4.98391"
            rx="1.25"
            transform="rotate(-45 5 17.7678)"
            fill="currentColor"
          />
          <rect
            x="5.70711"
            y="17.7678"
            width="1.5"
            height="3.98391"
            rx="0.75"
            transform="rotate(-45 5.70711 17.7678)"
            stroke="currentColor"
          />
        </g>
        <circle cx="7.75" cy="20.5" r="2.5" fill="currentColor" />
      </g>

      {/* hand pointing at the tumblers before them */}
      <g className={classes.hidden}>
        <g>
          <rect
            width="2.5"
            height="4"
            rx="1.25"
            transform="matrix(-8.42937e-08 -1 -1 8.42937e-08 63.8559 49.6991)"
            fill="currentColor"
          />
          <rect
            x="-0.5"
            y="-0.5"
            width="1.5"
            height="3"
            rx="0.75"
            transform="matrix(-8.42937e-08 -1 -1 8.42937e-08 62.8559 48.6991)"
            stroke="currentColor"
          />
        </g>
        <g>
          <rect
            width="2.5"
            height="4.98391"
            rx="1.25"
            transform="matrix(-8.42937e-08 -1 -1 8.42937e-08 62.4417 49.6991)"
            fill="currentColor"
          />
          <rect
            x="-0.5"
            y="-0.5"
            width="1.5"
            height="3.98391"
            rx="0.75"
            transform="matrix(-8.42937e-08 -1 -1 8.42937e-08 61.4417 48.6991)"
            stroke="currentColor"
          />
        </g>

        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 62.1007 49.6865)"
          fill="currentColor"
        />
        <g>
          <rect
            width="2.5"
            height="4"
            rx="1.25"
            transform="matrix(-0.719889 -0.694089 -0.694089 0.719889 91.3231 31.7675)"
            fill="currentColor"
          />
          <rect
            x="-0.706989"
            y="0.0128996"
            width="1.5"
            height="3"
            rx="0.75"
            transform="matrix(-0.719889 -0.694089 -0.694089 0.719889 90.1161 31.2804)"
            stroke="currentColor"
          />
        </g>
      </g>

      {/* hand sticking in between the tumblers */}
      <g className={classes.hidden}>
        <g>
          <rect
            width="2.5"
            height="4.98391"
            rx="1.25"
            transform="matrix(-0.719889 -0.694089 -0.694089 0.719889 90.3415 32.7856)"
            fill="currentColor"
          />
          <rect
            x="-0.706989"
            y="0.0128996"
            width="1.5"
            height="3.98391"
            rx="0.75"
            transform="matrix(-0.719889 -0.694089 -0.694089 0.719889 89.1345 32.2985)"
            stroke="currentColor"
          />
        </g>
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(-0.999834 0.0182428 0.0182428 0.999834 90.0958 33.0223)"
          fill="currentColor"
        />
      </g>

      {/* guys main hat */}
      <g className={isSwitchingPatterns ? classes.hidden : classes.visible}>
        <rect x="15" y="32" width="16" height="1.5" fill="currentColor" />
        <rect x="19" y="27" width="12" height="5" fill="currentColor" />
      </g>

      {/* torso situation. does not move */}
      <g className={isSwitchingPatterns ? classes.hidden : classes.visible}>
        <g>
          <rect
            x="17"
            y="37.5"
            width="2.5"
            height="4"
            rx="1.25"
            transform="rotate(-90 17 37.5)"
            fill="currentColor"
          />
          <rect
            x="17.5"
            y="37"
            width="1.5"
            height="3"
            rx="0.75"
            transform="rotate(-90 17.5 37)"
            stroke="currentColor"
          />
        </g>
        <path
          d="M31 37.25C31 38.0051 30.8513 38.7528 30.5623 39.4504C30.2733 40.1481 29.8498 40.7819 29.3159 41.3159C28.7819 41.8498 28.1481 42.2733 27.4504 42.5623C26.7528 42.8513 26.0051 43 25.25 43C24.4949 43 23.7472 42.8513 23.0496 42.5623C22.3519 42.2733 21.7181 41.8498 21.1841 41.3159C20.6502 40.7819 20.2267 40.1481 19.9377 39.4504C19.6487 38.7528 19.5 38.0051 19.5 37.25L25.25 37.25H31Z"
          fill="currentColor"
        />
        <rect x="19" y="35" width="12" height="2.5" fill="currentColor" />
        <rect x="24" y="42" width="2" height="3" fill="currentColor" />
        <path d="M25 43L27.8146 46H22.1854L25 43Z" fill="currentColor" />
        <path
          d="M22.25 46H27.75L26.5 52.5H23.5L22.25 46Z"
          fill="currentColor"
        />
      </g>

      {/* left leg */}
      <g className={isSwitchingPatterns ? classes.hidden : classes.visible}>
        <g>
          <rect
            x="22.25"
            y="69.186"
            width="3"
            height="14.96"
            rx="1.5"
            transform="rotate(-163.101 22.25 69.186)"
            fill="currentColor"
          />
          <rect
            x="21.9169"
            y="68.5623"
            width="2"
            height="13.96"
            rx="1"
            transform="rotate(-163.101 21.9169 68.5623)"
            stroke="currentColor"
          />
        </g>
        <path
          d="M22.5 58.5L23.5688 54.25L26.799 54.25L25.5 58L22.5 58.5Z"
          fill="currentColor"
        />
      </g>

      {/* right leg */}
      <g
        data-anim-hide="hittingKick"
        className={
          isSwitchingPatterns ? classes.hidden : classes.visible
        }
      >
        <rect
          x="25.5"
          y="61.8434"
          width="3.25"
          height="8"
          rx="1.625"
          transform="rotate(-16.3275 25.5 61.8434)"
          fill="currentColor"
        />
        <rect
          x="26.1204"
          y="62.1827"
          width="2.25"
          height="7"
          rx="1.125"
          transform="rotate(-16.3275 26.1204 62.1827)"
          stroke="currentColor"
        />
        <path d="M27 56.5L29.5 64L26 63L27 56.5Z" fill="currentColor" />
      </g>

      {/* top right arm and hand \m/ */}
      <g className={classes.hidden}>
        <g data-anim-show="hittingBell1" className={classes.hidden}>
          <rect
            x="35.0711"
            y="37"
            width="2.5"
            height="10"
            rx="1.25"
            transform="rotate(45 35.0711 37)"
            fill="currentColor"
          />
          <rect
            x="35.0711"
            y="37.7071"
            width="1.5"
            height="9"
            rx="0.75"
            transform="rotate(45 35.0711 37.7071)"
            stroke="currentColor"
          />
        </g>
        <circle cx="36" cy="34" r="2.5" fill="currentColor" />
        <rect
          x="34.0899"
          y="29.4539"
          width="5.9887"
          height="2.51065"
          rx="1.25532"
          transform="rotate(67.378 34.0899 29.4539)"
          fill="currentColor"
        />
        <rect
          x="40.0752"
          y="30.1067"
          width="6.96216"
          height="2.51065"
          rx="1.25532"
          transform="rotate(113.464 40.0752 30.1067)"
          fill="currentColor"
        />
      </g>

      {/* middle right arm */}
      <g className={classes.hidden}>
        <g data-anim-show="hittingBell2" className={classes.hidden}>
          <rect
            x="29"
            y="48.5"
            width="2.5"
            height="11"
            rx="1.25"
            transform="rotate(-90 29 48.5)"
            fill="currentColor"
          />
          <rect
            x="29.5"
            y="48"
            width="1.5"
            height="10"
            rx="0.75"
            transform="rotate(-90 29.5 48)"
            stroke="currentColor"
          />
        </g>
        <circle cx="45.5" cy="47" r="2.5" fill="currentColor" />
      </g>

      {/* the leg that hits the foot pedal */}
      <g data-anim-show="hittingKick" className={classes.hidden}>
        <path
          d="M28.5398 55.7872C28.2484 55.1613 28.5196 54.4178 29.1455 54.1265L38.3965 49.8203L39.4515 52.0868L30.2005 56.3929C29.5746 56.6843 28.8311 56.4131 28.5398 55.7872Z"
          fill="currentColor"
        />
        <path
          d="M47.9825 55.832C48.296 56.5204 47.9921 57.3326 47.3037 57.6461L42.202 59.9697L41.0666 57.4768L46.1683 55.1532C46.8567 54.8397 47.6689 55.1436 47.9825 55.832Z"
          fill="currentColor"
        />
        <rect
          x="44.5968"
          y="58.0028"
          width="2.5"
          height="10.2654"
          transform="rotate(143.157 44.5968 58.0028)"
          fill="currentColor"
        />
      </g>

      {/* the foot pedal */}
      <g>
        <circle cx="37.25" cy="65.5" r="3.5" fill="currentColor" />
        <rect
          x="42"
          y="66"
          width="18"
          height="3"
          fill="currentColor"
          data-anim-show="hittingKick"
          className={classes.hidden}
        />
        <rect
          x="41"
          y="62.1687"
          width="18"
          height="3"
          transform="rotate(-20.0417 41 62.1687)"
          fill="currentColor"
          data-anim-hide="hittingKick"
          className={classes.visible}
        />
      </g>

      {/* stick for the bells */}
      <g className={classes.visible}>
        <rect x="41" y="20" width="1.5" height="15" fill="currentColor" />
        <rect
          x="41"
          y="36"
          width="1.5"
          height="8"
          fill="currentColor"
          data-anim-hide="hittingBell1"
          className={classes.visible}
        />
      </g>

      {/* the bell at left */}
      <g data-anim-show="hittingBell1" className={classes.hidden}>
        <path
          d="M40 16.5C40 18.9853 37.9654 21 35.4556 21C32.9458 21 30.9112 18.9853 30.9112 16.5C30.9112 14.0147 32.9458 12 35.4556 12C37.9654 12 40 14.0147 40 16.5Z"
          fill="currentColor"
        />
        <rect
          width="9.03767"
          height="6.27855"
          transform="matrix(0.71233 0.701845 -0.708803 0.705407 32.4502 13.1166)"
          fill="currentColor"
        />
        <circle cx="27.25" cy="21.25" r="2.25" fill="currentColor" />
      </g>

      {/* the bell at right */}
      <g data-anim-hide="hittingBell1" className={classes.visible}>
        <path
          d="M45.9694 11.8584C48.4529 11.9538 50.386 14.1175 50.2871 16.6912C50.1882 19.2649 48.0948 21.274 45.6114 21.1786C43.1279 21.0831 41.1948 18.9194 41.2937 16.3457C41.3926 13.772 43.486 11.763 45.9694 11.8584Z"
          fill="currentColor"
        />
        <rect
          width="9.15867"
          height="6.36178"
          transform="matrix(0.719755 -0.694228 0.668105 0.744067 42.2911 19.4705)"
          fill="currentColor"
        />
        <circle cx="54" cy="21.5" r="2.5" fill="currentColor" />
      </g>

      {/* the drum at the bottom */}
      <g>
        <rect y="67.5" width="9.5" height="1.5" fill="currentColor" />
        <path d="M2.5 60H7.5L9 68H1L2.5 60Z" fill="currentColor" />
      </g>
    </svg>
  );
});

CoolFigure.displayName = "CoolFigure";

export default CoolFigure;
