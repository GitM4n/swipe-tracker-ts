// swipe-tracker.d.ts

declare module 'swipe-tracker' {
  export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | '';

  export interface createSwipeTrackerResult {
    swipeDirection: SwipeDirection;
    swipeActive: boolean;
    sensitivity: number;
  }

  export function createSwipeTracker(): createSwipeTrackerResult;
}
