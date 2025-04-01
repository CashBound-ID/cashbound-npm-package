# Error Utils

This utils provides custom error classes and utility functions for error handling in JavaScript/TypeScript applications. The main components are `CashboundError`, `UnauthorizedError`, `TimeoutError`, and utility functions like `castingError` and `throwError`.

## How to Use

### Importing the Utilities

First, import the utilities from your module:

```typescript
import {
  CashboundError,
  UnauthorizedError,
  TimeoutError,
  castingError,
  throwError
} from '@cashbound-id/utils/error';
```

## Available Methods & Class
### 1. Creating Custom Errors
You can create instances of the custom error classes like this:

**CashboundError**
Custom error class that extends the built-in Error class.
```typescript
import { CashboundError } from '@cashbound-id/utils/error';

try {
  throw new CashboundError('This is a custom error message');
} catch (error) {
  console.error(error.message); // This is a custom error message
  console.error(error.stackTrace); // Displays the stack trace
}
```

**UnauthorizedError**
Represents an unauthorized error, extending CashboundError.
```typescript
import { UnauthorizedError } from '@cashbound-id/utils/error';

try {
  throw new UnauthorizedError('Unauthorized access');
} catch (error) {
  console.error(error.message); // Unauthorized access
  console.error(error.httpStatusCode); // 401
  console.error(error.stackTrace); // Displays the stack trace
}
```

**TimeoutError**
Represents a timeout error, extending CashboundError.
```typescript
import { TimeoutError } from '@cashbound-id/utils/error';

try {
  throw new TimeoutError('The request timed out');
} catch (error) {
  console.error(error.message); // The request timed out
  console.error(error.stackTrace); // Displays the stack trace
}
```

### 2. Casting Errors
The castingError function can be used to convert different types of input into a CashboundError.

```typescript
import { castingError } from '@cashbound-id/utils/error';

const error = castingError('This is a string error message');
console.error(error.message); // This is a string error message
console.error(error.stackTrace); // Displays the stack trace

const anotherError = castingError(404);
console.error(anotherError.message); // 404
console.error(anotherError.stackTrace); // Displays the stack trace

const unknownError = castingError({ message: 'Some object error' });
console.error(unknownError.message); // Unknown error: [object Object]
console.error(unknownError.stackTrace); // Displays the stack trace
```

### 3. Throwing Errors
You can use the throwError function to log and throw an error with a default message.

```typescript
import { throwError } from '@cashbound-id/utils/error';

try {
  throwError('This will log and throw an error');
} catch (error) {
  console.error(error.message); // Oops! Something went wrong on our end. We're fixing it
  console.error(error.stackTrace); // Displays the stack trace
}
```
