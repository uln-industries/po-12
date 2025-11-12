import { useState, useMemo, useEffect, useRef } from "react";

import InstructionsCardButton from "./InstructionsCardButton";
import classes from "./instructionsPaper.module.scss";
import { cn } from "@/lib/utils";

// Animation timing constants
const CHAR_DELAY_MS = 40;
const INITIAL_DELAY_MS = 200; // Reduced from 1000ms for faster start
const SENTENCE_PAUSE_MS = 400;

// Card rotation/position variance constants
const ROTATION_X_VARIANCE = 10;
const ROTATION_Y_VARIANCE = 10;
const ROTATION_Z_VARIANCE = 3;
const POSITION_VARIANCE = 10;

type ProductTourIntroProps = {
  onClickNo: () => void;
  onClickYes: () => void;
  tilt: { x: number; y: number };
  show: boolean;
};

const ProductTourIntro = ({
  onClickNo,
  onClickYes,
  tilt: { x, y },
  show,
}: ProductTourIntroProps) => {
  return (
    <div
      className={cn(
        classes.firstIntroCardBox,
        show && classes.firstIntroCardBoxShown
      )}
      style={{
        transform: `rotateX(${y}deg) rotateY(${x}deg)`,
        top: show ? "12%" : "-200px",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div>
        This device plays audio! Turn up your volume. Would you like a tour?
      </div>
      <div style={{ fontWeight: "bold", marginTop: "8px", color: "#8B4513" }}>
        ⚠️ This will erase any current patterns.
      </div>
      <div className="flex justify-end w-full gap-8">
        <InstructionsCardButton onClick={onClickNo}>no</InstructionsCardButton>

        <InstructionsCardButton onClick={onClickYes}>
          yes
        </InstructionsCardButton>
      </div>
    </div>
  );
};

type ProductTourNoteProps = {
  step: {
    text: string;
    classNameToClick: string;
  };
  tilt: { x: number; y: number };
  hide: boolean;
  isCurrentStep: boolean;
  onClose: () => void;
  restartTour: () => void;
  highlightNextButton: (className: string) => void;
  onNext?: () => void;
};

const ProductTourNote = ({
  step,
  tilt: { x, y },
  hide,
  isCurrentStep,
  onClose,
  restartTour,
  highlightNextButton,
  onNext,
}: ProductTourNoteProps) => {
  const rotationXSkew = useMemo(
    () => (Math.random() - 0.5) * ROTATION_X_VARIANCE,
    []
  );
  const rotationYSkew = useMemo(
    () => (Math.random() - 0.5) * ROTATION_Y_VARIANCE,
    []
  );
  const rotationZSkew = useMemo(
    () => (Math.random() - 0.5) * ROTATION_Z_VARIANCE,
    []
  );
  const positionSkew = useMemo(
    () => (Math.random() - 0.5) * POSITION_VARIANCE,
    []
  );

  const [wordsDisplayed, setWordsDisplayed] = useState("");
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const wordsSeenSoFar = useRef("");
  const currentCharIndex = useRef(0);
  const queuedChars = useRef<{ char: string; classNameToClick: string }[]>([]);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle text animation with interval instead of recursive setTimeout
  useEffect(() => {
    if (!isCurrentStep) return;

    // Clear any existing interval
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    // Reset animation state when step changes
    if (queuedChars.current.length > 0) {
      currentCharIndex.current = 0;
      setIsAnimationComplete(false);

      // Start animation after initial delay
      const startTimeout = setTimeout(() => {
        animationIntervalRef.current = setInterval(() => {
          if (currentCharIndex.current >= queuedChars.current.length) {
            if (animationIntervalRef.current) {
              clearInterval(animationIntervalRef.current);
            }
            setIsAnimationComplete(true);
            return;
          }

          const { char, classNameToClick } = queuedChars.current[
            currentCharIndex.current
          ];

          if (char === ".") {
            setWordsDisplayed((prev) => prev + char);
            currentCharIndex.current++;
            // Pause briefly after sentences for better readability
            if (animationIntervalRef.current) {
              clearInterval(animationIntervalRef.current);
            }
            setTimeout(() => {
              if (isCurrentStep) {
                animationIntervalRef.current = setInterval(
                  animateNextChar,
                  CHAR_DELAY_MS
                );
              }
            }, SENTENCE_PAUSE_MS);
          } else if (char === "|") {
            // Special character - highlight the next button
            highlightNextButton(classNameToClick);
            currentCharIndex.current++;
          } else {
            setWordsDisplayed((prev) => prev + char);
            currentCharIndex.current++;
          }
        }, CHAR_DELAY_MS);
      }, INITIAL_DELAY_MS);

      return () => {
        clearTimeout(startTimeout);
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }
      };
    }

    function animateNextChar() {
      if (currentCharIndex.current >= queuedChars.current.length) {
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }
        setIsAnimationComplete(true);
        return;
      }

      const { char, classNameToClick } = queuedChars.current[
        currentCharIndex.current
      ];

      if (char === "|") {
        highlightNextButton(classNameToClick);
        currentCharIndex.current++;
      } else {
        setWordsDisplayed((prev) => prev + char);
        currentCharIndex.current++;
      }
    }
  }, [isCurrentStep, highlightNextButton]);

  // Update character queue when step changes
  useEffect(() => {
    const { text, classNameToClick } = step;
    const newText = text.replace(wordsSeenSoFar.current, "").split("");
    queuedChars.current.push(
      ...newText.map((char) => ({
        char,
        classNameToClick,
      }))
    );
    wordsSeenSoFar.current = text;
  }, [step]);

  // Skip animation and show full text
  const handleSkipAnimation = () => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    // Show complete text without special characters
    const fullText = step.text.replace(/\|/g, "");
    setWordsDisplayed(fullText);
    setIsAnimationComplete(true);

    // Trigger button highlight immediately
    highlightNextButton(step.classNameToClick);

    // Proceed to next step if handler provided
    if (onNext) {
      onNext();
    }
  };

  return (
    <div
      className={classes.introCardBox}
      style={{
        transform: `rotateX(${y * rotationXSkew}deg) rotateY(${
          x * rotationYSkew
        }deg) rotateZ(${rotationZSkew}deg)`,
        marginTop: `${positionSkew}px`,
        top: hide ? "-200px" : "12%",
      }}
    >
      <div style={{ minHeight: "60px" }}>{wordsDisplayed}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <InstructionsCardButton onClick={onClose}>
            skip tour
          </InstructionsCardButton>
          <InstructionsCardButton onClick={restartTour}>
            restart
          </InstructionsCardButton>
        </div>
        {!isAnimationComplete && (
          <InstructionsCardButton onClick={handleSkipAnimation}>
            next →
          </InstructionsCardButton>
        )}
      </div>
    </div>
  );
};

export { ProductTourIntro };
export default ProductTourNote;
