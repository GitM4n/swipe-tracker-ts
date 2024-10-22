# swipeTracker

A swipe tracker in TypeScript

## Installation

```bash
npm install swipe-tracker

```

## Usage 

 ```typescript
 import { createSwipeTracker } from "swiper-tracker";
 
 const swipeobject = document.querySelector('.swipe-object');
 const tracker = createSwipeTracker(swipeobject);
 
 tracker.swipeLeft(()=>{
  console.log('left')
 })
 ```

