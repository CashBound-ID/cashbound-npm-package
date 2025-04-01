# CSS Utils

This document provides an overview of utility functions for class name combination, unit conversion, and color conversion.

## How to Use

### Importing the Utilities

First, import the utilities from your module:

```typescript
import { cx, numberToPx, pxToNumber, hexToRgba } from '@cashbound-id/utils/css';
```

## Available Methods
### 1. `cx`
Combines multiple class names or objects into a single string. This is useful for conditionally applying class names in your components.

```typescript
const className = cx('base-class', { 'active-class': isActive, 'hidden-class': isHidden });
// Output: 'base-class active-class' if isActive is true and isHidden is false
```

### 2. `numberToPx`
Converts a number to a pixel string representation.

```typescript
const pixelValue = numberToPx(16); // Output: '16px'
const invalidValue = numberToPx(NaN); // Output: ''
```

### 3. `pxToNumber`
Converts a pixel string representation to a number. If the input is not a valid pixel string, it returns 0.

```typescript
const numberValue = pxToNumber('20px'); // Output: 20
const invalidPixel = pxToNumber('invalid'); // Output: 0
```

### 4. `hexToRgba`
Converts a hex color code to an RGBA color code. The alpha parameter is optional and defaults to 1.

```typescript
const rgbaColor = hexToRgba('#ff5733'); // Output: 'rgba(255, 87, 51, 1)'
const rgbaWithAlpha = hexToRgba('#ff5733', 0.5); // Output: 'rgba(255, 87, 51, 0.5)'
const invalidHex = hexToRgba('#invalid'); // Throws an error: 'Invalid hex color code'
```