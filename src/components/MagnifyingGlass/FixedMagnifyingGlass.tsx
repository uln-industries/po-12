import React, { useState, useEffect, useRef } from "react";
import classes from "./magnifyingGlass.module.scss";
import { withinBbox } from "@/lib/dom";

// Magnifying glass configuration constants
const MAGNIFY_RADIUS = 65;
const ELEMENT_PADDING = 10;
const CLICK_ANIMATION_SHRINK = 5;
const BORDER_RADIUS_OFFSET = 2;
const INITIAL_HIDDEN_POSITION = -100;

const DEFAULT_BORDER_RADIUS_CONFIG = {
  borderRadius: "100%",
};

type BorderRadiusConfig = {
  borderRadius: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
};

/**
 * Get the border radius configuration.
 * @param elem  the element to get the config from
 * @param borderRadiusOffset the offset from the element to introduce if needed
 */
const getBorderRadiusConfig = (
  elem: Element,
  borderRadiusOffset: number
): BorderRadiusConfig => {
  const style = window.getComputedStyle(elem);

  const currentBorderRadius = Number.parseInt(style.borderRadius, 10);
  const borderTopLeftRadius = Number.parseInt(style.borderTopLeftRadius, 10);
  const borderTopRightRadius = Number.parseInt(style.borderTopRightRadius, 10);
  const borderBottomLeftRadius = Number.parseInt(
    style.borderBottomLeftRadius,
    10
  );
  const borderBottomRightRadius = Number.parseInt(
    style.borderBottomRightRadius,
    10
  );
  return {
    borderRadius: `${currentBorderRadius + borderRadiusOffset}px`,
    borderTopLeftRadius: borderTopLeftRadius
      ? `${borderTopLeftRadius + borderRadiusOffset}px`
      : undefined,
    borderTopRightRadius: borderTopRightRadius
      ? `${borderTopRightRadius + borderRadiusOffset}px`
      : undefined,
    borderBottomLeftRadius: borderBottomLeftRadius
      ? `${borderBottomLeftRadius + borderRadiusOffset}px`
      : undefined,
    borderBottomRightRadius: borderBottomRightRadius
      ? `${borderBottomRightRadius + borderRadiusOffset}px`
      : undefined,
  };
};

type FixedMagnifyingGlassProps = {
  classNameToTarget?: string;
  onClick: () => void;
};

/**
 * Magnifying glass fixed to a particular element during tutorial.
 * Highlights the target element and responds to clicks.
 */
const FixedMagnifyingGlass = ({
  classNameToTarget,
  onClick,
}: FixedMagnifyingGlassProps) => {
  const [targetedElement, setTargetedElement] = useState<Element | null>(null);
  const [position, setPosition] = useState({
    x: INITIAL_HIDDEN_POSITION,
    y: INITIAL_HIDDEN_POSITION,
  });
  const [offsetRadius, setOffsetRadius] = useState(0);

  const [width, setWidth] = useState(MAGNIFY_RADIUS);
  const [height, setHeight] = useState(MAGNIFY_RADIUS);
  const [borderRadiusConfig, setBorderRadiusConfig] =
    useState<BorderRadiusConfig>(DEFAULT_BORDER_RADIUS_CONFIG);

  // whenever the class name to target changes, change the targeted element
  useEffect(() => {
    const element = document.querySelector(`.${classNameToTarget}`);
    if (!element) {
      console.warn("Could not find element with class name", classNameToTarget);
    }
    setTargetedElement(element);
  }, [classNameToTarget]);

  // if the targeted element changes, adjust the cached width, height, etc
  useEffect(() => {
    if (!targetedElement) {
      return;
    }

    // set up the targeted element
    const bbox = targetedElement.getBoundingClientRect();

    const nextWidth = bbox.width + ELEMENT_PADDING;
    const nextHeight = bbox.height + ELEMENT_PADDING;

    setPosition({
      x: bbox.left + bbox.width / 2,
      y: bbox.top + bbox.height / 2,
    });

    setWidth(nextWidth);
    setHeight(nextHeight);

    setBorderRadiusConfig(
      getBorderRadiusConfig(targetedElement, BORDER_RADIUS_OFFSET)
    );

    // allow for the position to update when the window resizes
    const handleResize = () => {
      if (!targetedElement) {
        return;
      }

      const bbox = targetedElement.getBoundingClientRect();

      setPosition({
        x: bbox.left + bbox.width / 2,
        y: bbox.top + bbox.height / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [targetedElement]);

  const pointerDownFiredWithinBbox = useRef(false);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      pointerDownFiredWithinBbox.current =
        (targetedElement &&
          withinBbox(event, targetedElement.getBoundingClientRect())) ||
        false;

      if (pointerDownFiredWithinBbox.current) {
        setOffsetRadius((prevRadius) => prevRadius - CLICK_ANIMATION_SHRINK);
      }
    };

    const handlePointerUp = () => {
      setOffsetRadius(0);

      if (pointerDownFiredWithinBbox.current) {
        // Remove event listeners before calling onClick to prevent stale references
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointerdown", handlePointerDown);

        onClick();
        pointerDownFiredWithinBbox.current = false;
      }
    };

    // Use pointer events for unified mouse/touch handling
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [targetedElement, onClick]);

  return (
    <div
      className={classes.magnifyingGlassContainer}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className={classes.magnifyingGlass}>
        <div
          className={classes.lens}
          style={{
            width: `${width + offsetRadius}px`,
            height: `${height + offsetRadius}px`,
            ...borderRadiusConfig,
          }}
        >
          <div className={classes.lensBody} style={{ ...borderRadiusConfig }} />
        </div>
      </div>
    </div>
  );
};

export default FixedMagnifyingGlass;
