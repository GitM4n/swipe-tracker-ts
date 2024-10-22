# Swipe Detector

A swipe detector in TypeScript

## Installation

```bash
npm install swipe-detect

```

## Usage 

 ```typescript
 import { createSwipeDetector } from "swipe-detect";
 
 const swipeobject = document.querySelector('.swipe-object');
 const detector = createSwipeDetector(swipeobject);
 
 detector.swipeLeft(()=>{
  console.log('left')
 })
 ```

