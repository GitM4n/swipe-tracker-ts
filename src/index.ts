type SwipeDirection = 'left' | 'right' | 'up' | 'down' | '';

/**
 * A utility for tracking swipe events on the window.
 * It returns an object with three properties:
 * - swipeDirection: string that indicates the direction of the swipe movement (left, right, up, down, or '').
 * - swipeActive: boolean that indicates whether the swipe tracking is active or not.
 * - sensitivity: number that represents the sensitivity of the swipe tracking (default: 50).
 * 
 * The utility provides four functions to check if the swipe movement is in a specific direction:
 * - isSwipeLeft
 * - isSwipeRight
 * - isSwipeUp
 * - isSwipeDown
 * 
 * @example 
 * const swipeTracker = createSwipeTracker();
 * 
 * window.addEventListener('touchend', () => {
 *   if (swipeTracker.swipeActive) {
 *     if (swipeTracker.swipeDirection === 'left') {
 *       // do something
 *     }
 *   }
 * });
 */

interface SwipeTracker {
  swipeDirection: SwipeDirection;
  swipeActive: boolean;
  sensitivity: number;
}

export function createSwipeTracker(): SwipeTracker {
  let swipeDirection: SwipeDirection = '';
  let swipeActive = false;
  let sensitivity = 50;

  let swipeStartX = 0;
  let swipeStartY = 0;
  let swipeCurrentX = 0;
  let swipeCurrentY = 0;

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

    if (isswipeLeft()) {
      swipeDirection = 'left';
    } else if (isswipeRight()) {
      swipeDirection = 'right';
    } else if (isswipeUp()) {
      swipeDirection = 'up';
    } else if (isswipeDown()) {
      swipeDirection = 'down';
    }
  }

  function reset(): void {
    swipeCurrentX = 0;
    swipeCurrentY = 0;
    swipeDirection = '';
    swipeActive = false;
  }

  function isswipeLeft(): boolean {
    return swipeCurrentX + sensitivity < swipeStartX;
  }

  function isswipeRight(): boolean {
    return swipeCurrentX - sensitivity > swipeStartX;
  }

  function isswipeUp(): boolean {
    return swipeStartY - sensitivity > swipeCurrentY;
  }

  function isswipeDown(): boolean {
    return swipeStartY + sensitivity < swipeCurrentY;
  }

  window.addEventListener('touchstart', swipeStart);
  window.addEventListener('touchmove', swipeMove);

  return {
    get swipeDirection(): SwipeDirection {
      return swipeDirection;
    },
    get swipeActive(): boolean {
      return swipeActive;
    },
    get sensitivity(): number {
      return sensitivity;
    },
    set sensitivity(value: number) {
      sensitivity = value;
    }
  };
}
