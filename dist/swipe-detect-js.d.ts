// swipe-detect-js.d.ts

declare module 'swipe-detect-js' {
  export interface createSwipeDetectorResult {
    swipeLeft: (callback: () => void) => void;
    swipeRight: (callback: () => void) => void;
    swipeUp: (callback: () => void) => void;
    swipeDown: (callback: () => void) => void;
    removeEventListeners: () => void;
  }

  export function createSwipeDetector(element: HTMLElement): createSwipeDetectorResult;
}
