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
  stepIndex: number;
  tilt: { x: number; y: number };
  hide: boolean;
  isCurrentStep: boolean;
  onClose: () => void;
  restartTour: () => void;
  highlightNextButton: (className: string) => void;
  onNext?: () => void;
  allowCloseAfterStep?: boolean;
};

const ProductTourNote = ({
  step,
  stepIndex,
  tilt: { x, y },
  hide,
  isCurrentStep,
  onClose,
  restartTour,
  highlightNextButton,
  onNext,
  allowCloseAfterStep = false,
}: ProductTourNoteProps) => {
  const { text: stepText, classNameToClick: stepTargetClassName } = step;
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
  const startDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sentencePauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastStepIndexRef = useRef(stepIndex);

  const clearAnimationTimers = () => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
    if (startDelayTimeoutRef.current) {
      clearTimeout(startDelayTimeoutRef.current);
      startDelayTimeoutRef.current = null;
    }
    if (sentencePauseTimeoutRef.current) {
      clearTimeout(sentencePauseTimeoutRef.current);
      sentencePauseTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (lastStepIndexRef.current === stepIndex) {
      return;
    }

    lastStepIndexRef.current = stepIndex;
    clearAnimationTimers();
    wordsSeenSoFar.current = "";
    queuedChars.current = [];
    currentCharIndex.current = 0;
    setWordsDisplayed("");
    setIsAnimationComplete(false);
  }, [stepIndex]);

  // Update character queue when the tour text changes
  useEffect(() => {
    const previouslySeen = wordsSeenSoFar.current;
    const appendedText = previouslySeen && stepText.startsWith(previouslySeen)
      ? stepText.slice(previouslySeen.length)
      : stepText;

    if (!appendedText) {
      return;
    }

    const remainingChars =
      currentCharIndex.current < queuedChars.current.length
        ? queuedChars.current.slice(currentCharIndex.current)
        : [];

    const newChars = appendedText
      .split("")
      .map((char) => ({ char, classNameToClick: stepTargetClassName }));

    queuedChars.current = [...remainingChars, ...newChars];
    currentCharIndex.current = 0;
    wordsSeenSoFar.current = stepText;
  }, [stepTargetClassName, stepText]);

  // Handle text animation with interval instead of recursive setTimeout
  useEffect(() => {
    if (!isCurrentStep || queuedChars.current.length === 0) {
      return;
    }

    setIsAnimationComplete(false);
    clearAnimationTimers();

    const startTyping = () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }

      animationIntervalRef.current = setInterval(() => {
        if (currentCharIndex.current >= queuedChars.current.length) {
          clearAnimationTimers();
          queuedChars.current = [];
          currentCharIndex.current = 0;
          setIsAnimationComplete(true);
          return;
        }

        const { char, classNameToClick } =
          queuedChars.current[currentCharIndex.current];

        if (char === "|") {
          highlightNextButton(classNameToClick);
          currentCharIndex.current++;
          return;
        }

        if (char === ".") {
          setWordsDisplayed((prev) => prev + char);
          currentCharIndex.current++;
          if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
            animationIntervalRef.current = null;
          }
          if (sentencePauseTimeoutRef.current) {
            clearTimeout(sentencePauseTimeoutRef.current);
          }
          sentencePauseTimeoutRef.current = setTimeout(() => {
            if (!isCurrentStep) {
              return;
            }
            startTyping();
          }, SENTENCE_PAUSE_MS);
          return;
        }

        setWordsDisplayed((prev) => prev + char);
        currentCharIndex.current++;
      }, CHAR_DELAY_MS);
    };

    startDelayTimeoutRef.current = setTimeout(startTyping, INITIAL_DELAY_MS);

    return () => {
      clearAnimationTimers();
    };
  }, [highlightNextButton, isCurrentStep, stepText]);

  // Skip animation and show full text
  const handleSkipAnimation = () => {
    clearAnimationTimers();

    // Show complete text without special characters
    const fullText = stepText.replace(/\|/g, "");
    setWordsDisplayed(fullText);
    setIsAnimationComplete(true);
    queuedChars.current = [];
    currentCharIndex.current = 0;
    wordsSeenSoFar.current = stepText;

    // Trigger button highlight immediately
    highlightNextButton(stepTargetClassName);

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
        <div style={{ display: "flex", gap: "8px" }}>
          {allowCloseAfterStep && isAnimationComplete && (
            <InstructionsCardButton onClick={onClose}>
              close card
            </InstructionsCardButton>
          )}
          {!isAnimationComplete && (
            <InstructionsCardButton onClick={handleSkipAnimation}>
              next →
            </InstructionsCardButton>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductTourIntro };
export default ProductTourNote;
