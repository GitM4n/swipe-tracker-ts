// swipe-tracker.d.ts

declare module 'swipe-tracker' {
  export interface createSwipeTrackerResult {
    swipeLeft: (callback: () => void) => void;
    swipeRight: (callback: () => void) => void;
    swipeUp: (callback: () => void) => void;
    swipeDown: (callback: () => void) => void;
  }

  export function createSwipeTracker(element: HTMLElement): createSwipeTrackerResult;
}
