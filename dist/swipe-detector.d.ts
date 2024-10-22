// swipe-detector.d.ts

declare module 'swipe-detector' {
  export interface createSwipeDetectorResult {
    swipeLeft: (callback: () => void) => void;
    swipeRight: (callback: () => void) => void;
    swipeUp: (callback: () => void) => void;
    swipeDown: (callback: () => void) => void;
  }

  export function createSwipeDetector(element: HTMLElement): createSwipeDetectorResult;
}
