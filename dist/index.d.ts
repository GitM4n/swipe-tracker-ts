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
export declare function createSwipeTracker(): SwipeTracker;
export {};
