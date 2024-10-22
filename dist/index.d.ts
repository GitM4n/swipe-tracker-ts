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
export declare function createTouchTracker(): TouchTracker;
export {};
