import { useState, useCallback } from "react";
import FixedMagnifyingGlass from "./MagnifyingGlass/FixedMagnifyingGlass";
import ProductTourNote from "./InstructionsPaper/ProductTourNote";
import { ProductTourIntro } from "./InstructionsPaper/ProductTourNote";
import { type Step, TOUR_STEPS } from "./productTourInstructions";

type TiltConfig = {
  x: number;
  y: number;
};

type ProductTourContentsProps = {
  onFinish: () => void;
  tilt: TiltConfig;
  restartTour: () => void;
};

/**
 * Get the current step we're showing to users.
 * @param currentStep the step we're on so far
 * @param subStepIndex the index of the substep in that step
 * @returns what we should be showing right now.
 */
const getStepSoFar = (currentStep: Step, subStepIndex: number) => {
  const { substeps } = currentStep;

  const currentText = (substeps ?? [])
    .slice(0, subStepIndex + 1)
    .map((substep) => substep.text ?? "")
    .join("");

  const classNameToClick = substeps[subStepIndex].classNameToClick;

  return {
    text: currentText,
    classNameToClick,
  };
};

/**
 * Shows the steps of the product tour one by one.
 * Now only renders the current step card for better performance.
 */
const ProductTourContents = ({
  onFinish,
  tilt,
  restartTour,
}: ProductTourContentsProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentSubStepIndex, setCurrentSubStepIndex] = useState(0);

  /**
   * Show the next step of the product tour.
   */
  const goToNextStep = useCallback(() => {
    if (
      currentStepIndex === TOUR_STEPS.length - 1 &&
      currentSubStepIndex === TOUR_STEPS[currentStepIndex].substeps.length - 1
    ) {
      onFinish();
      return;
    }

    if (
      currentSubStepIndex ===
      TOUR_STEPS[currentStepIndex].substeps.length - 1
    ) {
      setCurrentStepIndex(currentStepIndex + 1);
      setCurrentSubStepIndex(0);
      return;
    }

    setCurrentSubStepIndex(currentSubStepIndex + 1);
  }, [currentStepIndex, currentSubStepIndex, onFinish]);

  const [classNameToClick, setClassNameToClick] = useState<string>();
  const highlightNextButton = useCallback((nextClassName: string) => {
    setClassNameToClick(nextClassName);
  }, []);

  // Only get the current step data instead of rendering all steps
  const currentStepData = TOUR_STEPS[currentStepIndex];
  const currentStep = getStepSoFar(currentStepData, currentSubStepIndex);
  const isFinalSubstep =
    currentStepIndex === TOUR_STEPS.length - 1 &&
    currentSubStepIndex === currentStepData.substeps.length - 1;

  return (
    <>
      <FixedMagnifyingGlass
        classNameToTarget={classNameToClick}
        onClick={goToNextStep}
      />
      <ProductTourNote
        tilt={tilt}
        step={currentStep}
        stepIndex={currentStepIndex}
        hide={false}
        onClose={onFinish}
        restartTour={restartTour}
        isCurrentStep={true}
        highlightNextButton={highlightNextButton}
        onNext={goToNextStep}
        allowCloseAfterStep={isFinalSubstep}
      />
    </>
  );
};

type ProductTourMode = "finished" | "intro" | "tour";

type ProductTourProps = {
  productTourMode: ProductTourMode | undefined;
  setProductTourMode: (mode: ProductTourMode) => void;
  onTourStart: () => void;
  tilt: TiltConfig;
};

/**
 * Configures the product tour. Helps the user progress through the tutorial.
 */
const ProductTour = ({
  productTourMode,
  setProductTourMode,
  onTourStart,
  tilt,
}: ProductTourProps) => {
  return (
    <>
      {productTourMode === "tour" && (
        <ProductTourContents
          tilt={tilt}
          onFinish={() => setProductTourMode("finished")}
          restartTour={() => setProductTourMode("intro")}
        />
      )}
      <ProductTourIntro
        tilt={tilt}
        onClickNo={() => setProductTourMode("finished")}
        onClickYes={() => {
          onTourStart();
          setProductTourMode("tour");
        }}
        show={productTourMode === "intro"}
      />
    </>
  );
};

export default ProductTour;
