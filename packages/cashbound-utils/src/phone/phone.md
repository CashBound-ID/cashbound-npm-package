# Phone Number Utils

This document provides an overview of two utility functions for handling phone numbers in JavaScript: `formattingPhoneNumber` and `sanitizePhoneNumber`. These functions help format and cleanse phone numbers for consistent representation.

## How to Use
### Importing utils

First, import the utilities from your module:

```typescript
import { formattingPhoneNumber, sanitizePhoneNumber } from '@cashbound-id/utils/phone';
```

## 1. `formattingPhoneNumber`

This method formats a phone number string by adding separators and a country code. It expects the phone number to be in a specific format and cleans it by removing non-digit characters.

### Signature

```typescript
formattingPhoneNumber(phoneNumber: string): string
```

### Parameters
- phoneNumber: The phone number string to be formatted (string).

### Returns
- A formatted phone number with separators and a country code (string).

### Example Usage
```typescript
const formattedNumber = formattingPhoneNumber('08123456789');
console.log(formattedNumber); // Output: "+62 812 345 6789"
```

## 2. `sanitizePhoneNumber`
This method cleanses a phone number by removing country code prefixes and ensuring it starts with a '0'. It performs the following steps:
- Removes any whitespace from the input string.
- Removes any of the specified country code prefixes: (+62), (62), +62, or 62.
- Ensures the resulting phone number starts with a '0'.

### Signature
```typescript
sanitizePhoneNumber(phoneNumber: string): string
```

### Parameters
- phoneNumber: The phone number string to be cleansed (string).

### Returns
- The cleansed phone number string (string).

### Example Usage
```typescript
const cleanedNumber = sanitizePhoneNumber('+62 812 345 6789');
console.log(cleanedNumber); // Output: "08123456789"
```