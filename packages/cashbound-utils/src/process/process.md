# Process Utils

This documentation explains how to use the `abortProcess` function and the `createAbortSignal` utility for handling abortable processes in JavaScript/TypeScript.

## How to Use

### Importing the Utilities

First, import the utilities from your module:

```typescript
import { abortProcess, combineAbortSignal, createAbortSignal } from '@cashbound-id/utils/process';
```

## Available Methods
### 1. `abortProcess`
The abortProcess function allows you to abort a promise-based operation after a specified delay. Here’s an example of how to use it:

```typescript
import { abortProcess } from '@cashbound-id/utils/process';

async function exampleProcess() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Process completed successfully!');
    }, 3000);
  });
}

(async () => {
  const response = await abortProcess({
    delay: 1000, // Abort after 1 seconds
    fn: exampleProcess() // The promise to be aborted
  });

  if (response.error) {
    console.error('Error:', response.error.message); // Handle the error
  } else {
    console.log('Result:', response.result); // Handle the successful result
  }
})();
```

### 2. `createAbortSignal`
The createAbortSignal function creates an abort signal with a specified timeout. This can be useful for managing cancellation in processes.

```typescript
import { createAbortSignal } from '@cashbound-id/utils/process';

const signal = createAbortSignal(5000); // Abort after 5 seconds

signal.addEventListener('abort', () => {
  console.log('Process aborted due to timeout.');
});

// Example usage with fetch
fetch('https://api.example.com/data', { signal })
  .then((response) => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted:', error.message);
    } else {
      console.error('Fetch error:', error);
    }
  });
```


### 3. `combineAbortSignal`

Combines multiple `AbortSignal` instances into a single `AbortSignal`. The returned signal will be aborted if any of the input signals are aborted.

```typescript
import { combineAbortSignal } from '@cashbound-id/utils/process';

// Create multiple AbortControllers
const controller1 = new AbortController();
const controller2 = new AbortController();
const controller3 = new AbortController();

// Get the signals from the controllers
const signal1 = controller1.signal;
const signal2 = controller2.signal;
const signal3 = controller3.signal;

// Combine the signals into one
const combinedSignal = combineAbortSignal([signal1, signal2, signal3]);

// Add an event listener to handle the abort event
combinedSignal.addEventListener('abort', () => {
  console.log('Combined signal was aborted.');
});

// Abort one of the original signals
controller2.abort(); // This will trigger the abort on the combined signal
```

