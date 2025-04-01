# Date Utils

This module provides a set of utility functions for formatting and converting date and time values. It includes functions to format numerical time units, convert between date strings and `Date` objects, and modify `Date` objects to specific time settings.

## How to Use

### Importing the Utilities

First, import the utilities from your module:

```typescript
import {
  formatTimeUnit,
  convertStringToDate,
  convertDateToString,
  convertEpochToDate,
  convertDateToEpoch,
  setToMidnight,
  setToEndOfDay,
  setToFirstDayOfMonth
} from '@cashbound-id/utils/date';
```

## Available Methods
### Formatting & Convert Date Utils
#### 1. `formatTimeUnit`
Formats a time unit value by adding a leading zero if it's less than 10.

```typescript
const formattedTime = formatTimeUnit(5); // Output: '05'
const formattedTime2 = formatTimeUnit(12); // Output: '12'
```

#### 2. `convertStringToDate`
Converts a date string to a Date object. Returns undefined if the input is invalid or empty.

```typescript
const date = convertStringToDate('2023-09-20'); // Output: Date object
const invalidDate = convertStringToDate('invalid-date'); // Output: undefined
```

#### 3. `convertDateToString`
Converts a Date object to a formatted string using the specified format. The format is compatible with dayjs format strings. Returns undefined for invalid dates.

```typescript
const formattedDate = convertDateToString(new Date(), 'YYYY-MM-DD'); // Output: '2024-09-20'
const invalidFormat = convertDateToString(undefined as any, 'YYYY-MM-DD'); // Output: undefined
```

#### 4. `convertEpochToDate`
Converts a numerical epoch value (in seconds) to a Date object. Returns undefined if the input is invalid.

```typescript
const dateFromEpoch = convertEpochToDate(1695196800); // Output: Date object for '2023-09-20'
const invalidEpoch = convertEpochToDate(-1); // Output: undefined
```

#### 5. `convertDateToEpoch`
Converts a Date object to an epoch timestamp (in seconds). Returns undefined for invalid or empty inputs.

```typescript
const epochTime = convertDateToEpoch(new Date('2023-09-20')); // Output: epoch timestamp in seconds
const invalidEpoch = convertDateToEpoch(undefined as any); // Output: undefined
```

### Date Modification Methods
#### 1. `setToMidnight`
Sets the time of the provided Date object to midnight (00:00:00.000).

```typescript
const date = new Date();
const midnightDate = setToMidnight(date); // Output: Date object set to midnight
```

#### 2. `setToEndOfDay`
Sets the time of the provided Date object to end of day (23:59:59.000).

```typescript
const date = new Date();
const midnightDate = setToEndOfDay(date); // Output: Date object set to end of day
```

#### 3. `setToFirstDayOfMonth`
Sets the provided Date object to the first day of the month and sets the time to midnight (00:00:00.000).

```typescript
const date = new Date();
const firstDayOfMonth = setToFirstDayOfMonth(date); // Output: Date object set to the first day of the month at midnight
```

