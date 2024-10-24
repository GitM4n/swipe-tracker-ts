/**
 * A utility for detecting swipe events on a specified HTML element.
 *
 * This utility provides a simple API to detect swipe gestures (left, right, up, down)
 * on any HTML element. It allows you to set callbacks for each swipe direction and manage
 * event listeners dynamically (adding/removing) based on the interaction requirements.
 *
 * ### Features:
 * - Supports four swipe directions: left, right, up, and down.
 * - Adjustable swipe sensitivity.
 * - Add and remove event listeners dynamically.
 *
 * ### Usage:
 *
 * ```typescript
 * import { createSwipeDetector } from "swipe-detect-js";
 *
 * const swipeobject = document.querySelector('.swipe-object');
 * const detector = createSwipeDetector(swipeobject, { sensitivity: 100 }); // Sensitivity is optional
 *
 * detector.swipeLeft(() => {
 *   console.log('Swiped left');
 * });
 *
 * detector.swipeRight(() => {
 *   console.log('Swiped right');
 * });
 *
 * // You can also remove event listeners if needed:
 * detector.removeEventListeners();
 *
 * // And re-add them later:
 * detector.addEventListeners();
 * ```
 *
 * ### Parameters:
 *
 * - `element`: The target HTML element where swipe gestures will be detected.
 * - `sensitivity` (optional): The minimum distance (in pixels) required to trigger a swipe gesture.
 *    Default value is 50.
 *
 * ### Methods:
 *
 * - `swipeLeft(callback: () => void): void`
 *   - Registers a callback function to be called when a left swipe is detected.
 *
 * - `swipeRight(callback: () => void): void`
 *   - Registers a callback function to be called when a right swipe is detected.
 *
 * - `swipeUp(callback: () => void): void`
 *   - Registers a callback function to be called when an upward swipe is detected.
 *
 * - `swipeDown(callback: () => void): void`
 *   - Registers a callback function to be called when a downward swipe is detected.
 *
 * - `removeEventListeners(): void`
 *   - Removes all attached event listeners from the target element. This is useful if
 *     you want to disable swipe detection temporarily or completely.
 *
 * - `addEventListeners(): void`
 *   - Re-attaches event listeners to the target element. Use this method after calling
 *     `removeEventListeners()` to resume swipe detection.
 *
 * ### Notes:
 * - The swipe detection is based on touch events (`touchstart`, `touchmove`, and `touchend`), making it
 *   ideal for mobile devices and touch-screen interfaces. It won't work on non-touch devices unless
 *   additional mouse handling is implemented.
 *
 * - The sensitivity parameter controls how much movement is needed to trigger a swipe event.
 *   A higher value makes swipes harder to trigger (requires more movement).
 *
 * - Use the `removeEventListeners()` method when you want to stop listening for swipe gestures,
 *   which can improve performance in certain scenarios.
 *
 * @param element - The HTML element to detect swipe events on.
 * @param sensitivity - (Optional) The sensitivity level for swipe detection, default is 50 pixels.
 * @returns SwipeDetector - An object containing methods to register swipe callbacks and manage event listeners.
 */

interface SwipeDetector {
  swipeLeft: (callback: () => void) => void;
  swipeRight: (callback: () => void) => void;
  swipeUp: (callback: () => void) => void;
  swipeDown: (callback: () => void) => void;
  removeEventListeners: () => void;
  addEventListeners: () => void;
}

export function createSwipeDetector(
  element: HTMLElement,
  options?:{
    sensitivity?: number;
  }
): SwipeDetector {
  let swipeActive = false;
  let swipeStartX = 0;
  let swipeStartY = 0;
  let swipeCurrentX = 0;
  let swipeCurrentY = 0;
  let sensitivity = options?.sensitivity || 50;

  let swipeLeftCallback: () => void = () => {};
  let swipeRightCallback: () => void = () => {};
  let swipeUpCallback: () => void = () => {};
  let swipeDownCallback: () => void = () => {};

  function swipeStart(event: TouchEvent): void {
    swipeStartX = event.touches[0].clientX;
    swipeStartY = event.touches[0].clientY;
  }

  function swipeMove(event: TouchEvent): void {
    swipeCurrentX = event.touches[0].clientX;
    swipeCurrentY = event.touches[0].clientY;

    if (
      Math.abs(swipeStartX - swipeCurrentX) < sensitivity &&
      Math.abs(swipeStartY - swipeCurrentY) < sensitivity
    ) {
      return;
    }
    swipeActive = true;
  }

  function swipeEnd(): void {
    if (swipeActive) {
      if (isSwipeLeft()) {
        swipeLeftCallback();
      } else if (isSwipeRight()) {
        swipeRightCallback();
      } else if (isSwipeUp()) {
        swipeUpCallback();
      } else if (isSwipeDown()) {
        swipeDownCallback();
      }
    }
    reset();
  }

  function reset(): void {
    swipeCurrentX = 0;
    swipeCurrentY = 0;
    swipeActive = false;
  }

  function isSwipeLeft(): boolean {
    return (
      swipeCurrentX + sensitivity < swipeStartX &&
      Math.abs(swipeCurrentX - swipeStartX) >
        Math.abs(swipeCurrentY - swipeStartY)
    );
  }

  function isSwipeRight(): boolean {
    return (
      swipeCurrentX - sensitivity > swipeStartX &&
      Math.abs(swipeCurrentX - swipeStartX) >
        Math.abs(swipeCurrentY - swipeStartY)
    );
  }

  function isSwipeUp(): boolean {
    return (
      swipeStartY - sensitivity > swipeCurrentY &&
      Math.abs(swipeStartY - swipeCurrentY) >
        Math.abs(swipeCurrentX - swipeStartX)
    );
  }

  function isSwipeDown(): boolean {
    return (
      swipeStartY + sensitivity < swipeCurrentY &&
      Math.abs(swipeStartY - swipeCurrentY) >
        Math.abs(swipeCurrentX - swipeStartX)
    );
  }

  function addEventListeners(): void {
    element.addEventListener("touchstart", swipeStart);
    element.addEventListener("touchmove", swipeMove);
    element.addEventListener("touchend", swipeEnd);
  }

  function removeEventListeners(): void {
    element.removeEventListener("touchstart", swipeStart);
    element.removeEventListener("touchmove", swipeMove);
    element.removeEventListener("touchend", swipeEnd);
  }

  addEventListeners();

  return {
    swipeLeft(callback: () => void): void {
      swipeLeftCallback = callback;
    },
    swipeRight(callback: () => void): void {
      swipeRightCallback = callback;
    },
    swipeUp(callback: () => void): void {
      swipeUpCallback = callback;
    },
    swipeDown(callback: () => void): void {
      swipeDownCallback = callback;
    },
    removeEventListeners,
    addEventListeners,
  };
}
