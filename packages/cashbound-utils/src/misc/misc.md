# Utility Functions Documentation

This document provides an overview of several utility functions for common operations in JavaScript applications. Each function is explained, along with example usage.

## How to Use
### Importing Misc

First, import the utilities from your module:

```typescript
import {
  noop,
  delay,
  copyToClipboard,
  debounce,
  throttle,
  toIDR,
  redirectNative,
  openToNewTabNative
} from '@cashbound-id/utils/misc';
```

## Available Methods
### 1. `noop`

A no-operation function that does nothing. It can be used as a default callback when no operation is required.

#### Signature

```typescript
noop(): void
```

#### Example Usage

```typescript
noop(); // No operation performed
```

### 2. `delay`

Returns a promise that resolves after a specified delay. The delay can be randomized within the specified duration if enabled.

#### Signature

```typescript
delay(duration: number, enableRandom?: boolean): Promise<void>
```

#### Parameters

- duration: The maximum duration in milliseconds for the delay (number).
- enableRandom: If true, the delay will be randomized within the duration (boolean, default: true).

#### Returns

- A promise that resolves after the delay.

#### Example Usage

```typescript
delay(2000).then(() => console.log("Executed after 2 seconds"));
```

### 3. `copyToClipboard`

Copies the given text to the clipboard.

#### Signature

```typescript
copyToClipboard(text: string): void
```

#### Parameters

- text: The text to be copied to the clipboard (string).

#### Example Usage

```typescript
copyToClipboard("Hello, world!");
```

### 4. `debounce`

Creates a debounced function that delays the execution of the given function until after the specified wait time has elapsed since the last time it was invoked.

#### Signature

```typescript
debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void
```

#### Parameters

- fn: The function to debounce (function).
- delay: The number of milliseconds to delay (number).

#### Returns

- The debounced version of the original function.

#### Example Usage

```typescript
const debouncedLog = debounce(() => console.log("Called!"), 200);
window.addEventListener("resize", debouncedLog);
```

### 5. `throttle`

Creates a throttled function that only invokes the given function at most once per specified wait time.

#### Signature

```typescript
throttle<T extends (...args: any[]) => void>(fn: T, wait: number): (...args: Parameters<T>) => void
```

#### Parameters

- fn: The function to throttle (function).
- wait: The number of milliseconds to wait before invoking the function again (number).

#### Returns

- The throttled version of the original function.

#### Example Usage

```typescript
const throttledLog = throttle(() => console.log("Called!"), 200);
window.addEventListener("scroll", throttledLog);
```

### 6. `toIDR`

Formats a price number into an Indonesian Rupiah (Rp) currency string.

#### Signature

```typescript
toIDR(price: number): string
```

#### Parameters

- price: The price to be formatted (number).

#### Returns

- The formatted price string in the format 'RpX.XXX.XXX' (string).

#### Example Usage

```typescript
const formattedPrice = toIDR(100000);
console.log(formattedPrice); // Output: "Rp100.000"
```

### 7. `redirectNative`

Redirects the browser to a specified URL.

#### Signature

```typescript
redirectNative(url: string): void
```

#### Parameters

- url: The URL to redirect to (string).

#### Example Usage

```typescript
// Redirects the browser to "https://example.com"
redirectNative("https://example.com");
```

### 8. `openToNewTabNative`

Opens the specified URL in a new browser tab.

#### Signature

```typescript
openToNewTabNative(url: string): void
```

#### Parameters

- url: The URL to open in a new tab (string).

#### Example Usage

```typescript
// Opens "https://example.com" in a new browser tab
openToNewTabNative("https://example.com");
```