# Swipe Detector

A swipe detector in TypeScript

## Installation

```bash
npm install swipe-detector

```

## Usage 

 ```typescript
 import { createSwipeDetector } from "swipe-detector";
 
 const swipeobject = document.querySelector('.swipe-object');
 const detector = createSwipeDetector(swipeobject);
 
 detector.swipeLeft(()=>{
  console.log('left')
 })
 ```

