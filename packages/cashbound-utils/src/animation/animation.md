# Request Animation Handler Utils
This document provides an overview of the requestAnimationHandler function, which manages animations using requestAnimationFrame.

## Overview
The requestAnimationHandler function sets up an animation loop that calls a provided animation function at each frame, passing the progress percentage of the animation. This allows for smooth animations that are synchronized with the browser's refresh rate.

## How to Use
### Importing the Utilities

First, import the utilities from your module:

```typescript
import { requestAnimationHandler } from '@cashbound-id/utils/animation';
```

### Signature
```typescript
requestAnimationHandler(args: RequestAnimationHandlerArgs): void
```

### Parameters
args: An object containing the arguments for the animation handler.
- animateFn: A function that is called for each frame of the animation. It receives the progress percentage (from 0 to 1) as an argument.
- duration: The duration of the animation in milliseconds (number).
- onFinish: A function to call when the animation finishes (function).
- registerRequestAnimationFn: A function to register the requestAnimationFrame ID, which can be used for managing the animation loop.

### Example Usage
Here’s an example of how to use the requestAnimationHandler function:

```typescript
requestAnimationHandler({
  animateFn: (percentage) => {
    console.log(`Animation progress: ${percentage * 100}%`);
  },
  duration: 1000,
  onFinish: () => {
    console.log('Animation finished');
  },
  registerRequestAnimationFn: (requestId) => {
    // Optionally store or manage the request ID
  }
});
```

### How It Works
- Animation Loop: The function uses requestAnimationFrame to create a loop that runs the doAnimate function.
- Progress Calculation: The percentage of the animation progress is calculated based on the elapsed time since the start of the animation.
- Frame Update: The animateFn is called with the current progress percentage.
- Completion: When the elapsed time reaches the specified duration, the onFinish function is called to indicate the end of the animation.