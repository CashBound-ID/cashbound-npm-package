# Observer Utils
This utils provides an overview of how to use the `resizeObserverHandler` and `intersectObserverHandler` functions. These handlers allow you to observe changes in size and visibility of DOM elements, respectively.

## How to Use
### Importing the Utilities

First, import the utilities from your module:

```typescript
import { resizeObserverHandler, intersectObserverHandler } from '@cashbound-id/utils/observer';
```

## Available Methods
### Resize Observer Handler

The `resizeObserverHandler` function allows you to register and unregister elements to observe for resizing events.

#### Usage

```typescript
import { resizeObserverHandler } from 'your-module-path';

const resizer = resizeObserverHandler();
const element = document.getElementById('my-element');

const resizeCallback = (entry) => {
  console.log('Element resized:', entry.contentRect);
};

// Register the element to be observed
resizer.register({ element, fn: resizeCallback });

// To unregister later
resizer.unregister();
```

#### Response

- **disconnect**: Disconnects the observer and stops observing all elements.
- **register(args: ResizerObserverStateType)**: Registers an element to be observed for resizing.
  - **Parameters**: 
    - `args`: An object containing:
      - `element`: The DOM element to be observed.
      - `fn`: A callback function that receives the `ResizeObserverEntry` when the element is resized.
- **unregister**: Unregisters the currently observed element.

### Intersection Observer Handler

The `intersectObserverHandler` function allows you to register and unregister elements to observe their intersection with the viewport.

#### Usage

```typescript
import { intersectObserverHandler } from 'your-module-path';

const intersector = intersectObserverHandler();
const element = document.getElementById('my-element');

const intersectionCallback = (entry) => {
  if (entry.isIntersecting) {
    console.log('Element is in view:', entry.target);
  }
};

// Register the element to be observed
intersector.register({ element, fn: intersectionCallback });

// To unregister later
intersector.unregister();
```

#### Response

- **disconnect**: Disconnects the observer and stops observing all elements.
- **register(args: IntersectObserverStateType)**: Registers an element to be observed for intersection with the viewport.
  - **Parameters**: 
    - `args`: An object containing:
      - `element`: The DOM element to be observed.
      - `fn`: A callback function that receives the `IntersectionObserverEntry` when the element intersects with the viewport.
- **unregister**: Unregisters the currently observed element.


