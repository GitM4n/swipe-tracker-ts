# swipeTracker

A swipe tracker in TypeScript

## Installation

```bash
npm install swipe-tracker

```

## Usage 

```ts
  const swipeTracker = createSwipeTracker();
  
  window.addEventListener('touchend', () => {
    if (swipeTracker.swipeActive) {
      if (swipeTracker.swipeDirection === 'left') {
        // do something
      }
    }
  });

```

