// touch-tracker.d.ts

declare module 'touch-tracker' {
  // Определяем тип для направления касания
  export type TouchDirection = 'left' | 'right' | 'up' | 'down' | '';

  // Определяем возвращаемый тип функции useTouchTracker
  export interface createTouchTrackerResult {
    touchDirection: TouchDirection;
    touchActive: boolean;
    sensitivity: number;
  }

  // Объявляем функцию useTouchTracker
  export function createTouchTracker(): createTouchTrackerResult;
}
