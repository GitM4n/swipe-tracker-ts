# touchTracker

A touch tracker in TypeScript

## Installation


```bash
npm install touch-tracker

```

## Usage 

```ts
  const touchTracker = createTouchTracker();

  touchTracker.sensivity = 200 //set value optional, default 100

  window.addEventListener('touchend', () => {
    if (touchTracker.touchActive) {
      if (touchTracker.touchDirection === 'left') {
        console.log('Swiped left');
      }
    }
  });

```

