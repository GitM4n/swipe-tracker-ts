/**
 * A utility for detecting swipe events on the window or a specific element.
 *
 * Usage example:
 * ```typescript
 * import { createSwipeDetector } from "swipe-detector";
 *
 * const swipeobject = document.querySelector('.swipe-object');
 * const detector = createSwipeDetector(swipeobject);
 *
 * detector.swipeLeft(()=>{
 *   console.log('left')
 * })
 * ```
 */
interface SwipeDetector {
    swipeLeft: (callback: () => void) => void;
    swipeRight: (callback: () => void) => void;
    swipeUp: (callback: () => void) => void;
    swipeDown: (callback: () => void) => void;
}
export declare function createSwipeDetector(element: HTMLElement): SwipeDetector;
export {};
