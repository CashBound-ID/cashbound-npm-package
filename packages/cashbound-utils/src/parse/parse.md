# Parse Utils

This documentation explains how to use the utility functions for safely parsing various types of data.

## How to Use

### Importing the Utilities

First, import the utilities from your module:

```typescript
import {
  safeParseToString,
  safeParseToNumber,
  safeParseJSON,
  safeStringifyJSON,
  safeParseBoolean
} from '@cashbound-id/utils/parse';
```

## Available Methods
### `safeParseToString`

Safely parses an input to a string.

#### Example Usage:

```typescript
const input1 = 42;
const input2 = null;
const input3 = "Hello, World!";

console.log(safeParseToString(input1)); // "42"
console.log(safeParseToString(input2)); // ""
console.log(safeParseToString(input3)); // "Hello, World!"
```

### `safeParseToNumber`
Safely parses an input to a number.

```typescript
const input1 = "123";
const input2 = "abc";
const input3 = null;

console.log(safeParseToNumber(input1)); // 123
console.log(safeParseToNumber(input2)); // 0
console.log(safeParseToNumber(input3)); // 0
```

### `safeParseJSON`
Safely parses a JSON string.

```typescript
const validJson = '{"name": "John", "age": 30}';
const invalidJson = "not a json";
const defaultValue = { name: "Default", age: 0 };

console.log(safeParseJSON(validJson, defaultValue)); // { name: "John", age: 30 }
console.log(safeParseJSON(invalidJson, defaultValue)); // { name: "Default", age: 0 }
safeStringifyJSON(input: unknown): string
```

### `safeStringifyJSON`
Safely stringifies an input to JSON.

```typescript
const obj = { name: "Jane", age: 25 };
const invalidInput = undefined;

console.log(safeStringifyJSON(obj)); // '{"name":"Jane","age":25}'
console.log(safeStringifyJSON(invalidInput)); // ''
```

### `safeParseBoolean`
Safely parses an input to a boolean.

```typescript
const input1 = "true";
const input2 = "false";
const input3 = 1;
const input4 = null;
const input5 = true;

console.log(safeParseBoolean(input1)); // true
console.log(safeParseBoolean(input2)); // false
console.log(safeParseBoolean(input3)); // false
console.log(safeParseBoolean(input4)); // false
console.log(safeParseBoolean(input5)); // true
```