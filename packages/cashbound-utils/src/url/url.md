# URL Utils

This utility helps with constructing URLs from objects and parsing URLs into nested query parameters.

## How to Use
### Importing the Utilities

First, import the utilities from your module:

```typescript
import { constructURL, parseURL } from '@cashbound-id/utils/url';
```

## Available Methods
### 1. `constructURL`
Constructs a URL with query parameters from a base URL and a parameter object.

**Parameters:**
- "args": An object with two properties:
  - "url" (string): The base URL.
  - "parameter" (object | undefined): The object to convert into query parameters.

**Returns:**
- "URL": A URL object with query parameters.

**Example:**
```typescript
import { constructURL } from '@cashbound-id/utils/url';

const url = constructURL({ url: 'https://example.com', parameter: { user: { name: 'John', age: 30 } } });

// Output: new URL('https://example.com/?user[name]=John&user[age]=30')
```

### 2. `parseURL`
Parses a URL and returns an object containing its base URL and query parameters as a nested object.

**Parameters:**
- "url" (URL): The URL to parse.

**Returns:**
- "URLTransformType": An object with two properties:
  - "parameter" (object): Nested query parameters.
  - "url" (string): The base URL.

**Example:**
```typescript
import { parseURL } from '@cashbound-id/utils/url';

const url = new URL('https://example.com/?user[name]=John&user[age]=30');
const result = parseURL(url);

// Output: {
//   parameter: {
//     user: {
//       name: 'John',
//       age: '30'
//     }
//   },
//   url: 'https://example.com'
// }
```
