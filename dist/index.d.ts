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
export declare function createSwipeTracker(element: HTMLElement): SwipeTracker;
export {};
