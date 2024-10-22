type TouchDirection = 'left' | 'right' | 'up' | 'down' | '';

/**
 * A utility for tracking touch events on the window.
 * It returns an object with three properties:
 * - touchDirection: string that indicates the direction of the touch movement (left, right, up, down, or '').
 * - touchActive: boolean that indicates whether the touch tracking is active or not.
 * - sensitivity: number that represents the sensitivity of the touch tracking (default: 50).
 * 
 * The utility provides four functions to check if the touch movement is in a specific direction:
 * - isTouchLeft
 * - isTouchRight
 * - isTouchUp
 * - isTouchDown
 * 
 * @example 
 * const touchTracker = createTouchTracker();
 * 
 * window.addEventListener('touchend', () => {
 *   if (touchTracker.touchActive) {
 *     if (touchTracker.touchDirection === 'left') {
 *       // do something
 *     }
 *   }
 * });
 */

interface TouchTracker {
  touchDirection: TouchDirection;
  touchActive: boolean;
  sensitivity: number;
}

export function createTouchTracker(): TouchTracker {
  let touchDirection: TouchDirection = '';
  let touchActive = false;
  let sensitivity = 50;

  let touchStartX = 0;
  let touchStartY = 0;
  let touchCurrentX = 0;
  let touchCurrentY = 0;

  function touchStart(event: TouchEvent): void {
    reset();
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }

  function touchMove(event: TouchEvent): void {
    touchCurrentX = event.touches[0].clientX;
    touchCurrentY = event.touches[0].clientY;

    if (Math.abs(touchStartX - touchCurrentX) < sensitivity && Math.abs(touchStartY - touchCurrentY) < sensitivity) {
      return;
    }

    touchActive = true;

    if (isTouchLeft()) {
      touchDirection = 'left';
    } else if (isTouchRight()) {
      touchDirection = 'right';
    } else if (isTouchUp()) {
      touchDirection = 'up';
    } else if (isTouchDown()) {
      touchDirection = 'down';
    }
  }

  function reset(): void {
    touchCurrentX = 0;
    touchCurrentY = 0;
    touchDirection = '';
    touchActive = false;
  }

  function isTouchLeft(): boolean {
    return touchCurrentX + sensitivity < touchStartX;
  }

  function isTouchRight(): boolean {
    return touchCurrentX - sensitivity > touchStartX;
  }

  function isTouchUp(): boolean {
    return touchStartY - sensitivity > touchCurrentY;
  }

  function isTouchDown(): boolean {
    return touchStartY + sensitivity < touchCurrentY;
  }

  window.addEventListener('touchstart', touchStart);
  window.addEventListener('touchmove', touchMove);

  return {
    get touchDirection(): TouchDirection {
      return touchDirection;
    },
    get touchActive(): boolean {
      return touchActive;
    },
    get sensitivity(): number {
      return sensitivity;
    },
    set sensitivity(value: number) {
      sensitivity = value;
    }
  };
}
