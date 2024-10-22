
/**
 * A utility for tracking swipe events on the window or a specific element.
 * 
 * Usage example:
 * ```typescript
 * import { createSwipeTracker } from "swiper-tracker";
 *
 * const swipeobject = document.querySelector('.swipe-object');
 * const tracker = createSwipeTracker(swipeobject);
 *
 * tracker.swipeLeft(()=>{
 *   console.log('left')
 * })
 * ```
 */
interface SwipeTracker {
  swipeLeft: (callback: () => void) => void;
  swipeRight: (callback: () => void) => void;
  swipeUp: (callback: () => void) => void;
  swipeDown: (callback: () => void) => void;
}

export function createSwipeTracker(element: HTMLElement): SwipeTracker {
  let swipeActive = false;
  let sensitivity = 50;

  let swipeStartX = 0;
  let swipeStartY = 0;
  let swipeCurrentX = 0;
  let swipeCurrentY = 0;

  let swipeLeftCallback: () => void = () => {};
  let swipeRightCallback: () => void = () => {};
  let swipeUpCallback: () => void = () => {};
  let swipeDownCallback: () => void = () => {};

  function swipeStart(event: TouchEvent): void {
    reset();
    swipeStartX = event.touches[0].clientX;
    swipeStartY = event.touches[0].clientY;
  }

  function swipeMove(event: TouchEvent): void {
    swipeCurrentX = event.touches[0].clientX;
    swipeCurrentY = event.touches[0].clientY;

    if (Math.abs(swipeStartX - swipeCurrentX) < sensitivity && Math.abs(swipeStartY - swipeCurrentY) < sensitivity) {
      return;
    }

    swipeActive = true;
  }

  function swipeEnd(): void {
    if (swipeActive) {
      if (isSwipeLeft()) {
        swipeLeftCallback(); 
      }
      else if (isSwipeRight()) {
        swipeRightCallback(); 
      }
      else if (isSwipeUp()) {
        swipeUpCallback();   
      }
      else if (isSwipeDown()) {
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
    return swipeCurrentX + sensitivity < swipeStartX;
  }

  function isSwipeRight(): boolean {
    return swipeCurrentX - sensitivity > swipeStartX;
  }

  function isSwipeUp(): boolean {
    return swipeStartY - sensitivity > swipeCurrentY;
  }

  function isSwipeDown(): boolean {
    return swipeStartY + sensitivity < swipeCurrentY;
  }

  element.addEventListener('touchstart', swipeStart);
  element.addEventListener('touchmove', swipeMove);
  element.addEventListener('touchend', swipeEnd);

  // Return the object with methods to set the callbacks
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
  };
}
