import dayjs from 'dayjs';

/////////////////////////////////////////////////////////////////////////////
// Formatting & Convert Date Utils
/////////////////////////////////////////////////////////////////////////////

/**
 * Formats a numerical time unit value to ensure it has a leading zero if the value is less than 10.
 *
 * @param {number} value - The numerical value of the time unit.
 * @returns {string} - The formatted time unit value as a string, with a leading zero if necessary.
 */
export const formatTimeUnit = (value: number): string => {
  if (typeof value === 'number' && value >= 0 && value <= 59) {
    return String(value).padStart(2, '0');
  }

  return '00';
};

/**
 * Converts a date string into a Date object. If the input is undefined or null, it returns undefined.
 * If the string is invalid, it catches the error and also returns undefined.
 *
 * @param {string} date - The date string to be converted to a Date object.
 * @returns {Date | undefined} - A Date object if the input is a valid date string, otherwise undefined.
 */
export const convertStringToDate = (date: string): Date | undefined => {
  try {
    if (typeof date === 'string' && date) {
      const formattedDate = new Date(date);

      if (!Number.isNaN(formattedDate.getTime())) {
        return formattedDate;
      }
    }

    throw new Error();
  } catch {
    return undefined;
  }
};

/**
 * Format a numerical epoch value to Date.
 *
 * @param {number} value - The numerical value of the time unit.
 * @returns The formatted date value.
 */
export const convertEpochToDate = (value: number): Date | undefined => {
  try {
    if (typeof value === 'number' && value && value >= 0) {
      return new Date(value * 1000);
    }

    throw new Error();
  } catch {
    return undefined;
  }
};

/**
 * Converts a Date object to a formatted string using the specified format.
 * Returns undefined for invalid Date objects or errors.
 *
 * @param {Date | number | string} date - The Date argument to convert.
 * @param {string} format - The format string to use (compatible with dayjs formatting).
 * @returns {string | undefined} - The formatted date string or undefined if an error occurs.
 */
export const convertToFormattedDate = (
  date: Date | number | string,
  format: string
): string | undefined => {
  try {
    if (
      date instanceof Date ||
      typeof date === 'string' ||
      typeof date === 'number'
    ) {
      const result = dayjs(date).format(format);

      if (result !== 'Invalid Date') return result;
    }

    throw new Error();
  } catch {
    return undefined;
  }
};

/**
 * Converts a Date object to an epoch timestamp in seconds. Returns undefined for invalid or empty inputs.
 *
 * @param {Date | number | string} date - The Date object to convert.
 * @returns {number | undefined} - The epoch timestamp in seconds or undefined.
 */
export const convertToEpoch = (
  date: Date | number | string
): number | undefined => {
  try {
    let result: number | undefined;
    if (date instanceof Date) {
      result = date.getTime() / 1000;
    } else if (typeof date === 'string' || typeof date === 'number') {
      result = dayjs(date).unix();
    }

    if (!Number.isNaN(result)) return result;

    throw new Error();
  } catch {
    return undefined;
  }
};

/////////////////////////////////////////////////////////////////////////////
// Date Modification Utils
/////////////////////////////////////////////////////////////////////////////

/**
 * Sets the time of the given date to midnight (00:00:00.000).
 *
 * @param {Date} date - The date object to be modified.
 * @returns {Date} The modified date object with the time set to midnight.
 */
export const setBeginningOfDay = (date: Date): Date => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

/**
 * Sets the time of the given date to end of day (23:59:59.000).
 *
 * @param {Date} date - The date object to be modified.
 * @returns {Date} The modified date object with the time set to end of day.
 */
export const setEndOfDay = (date: Date): Date => {
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);
  date.setMilliseconds(0);

  return date;
};

/**
 * Sets the given date to the first day of the month and sets the time to midnight (00:00:00.000).
 *
 * @param {Date} date - The date object to be modified.
 * @returns {Date} The modified date object set to the first day of the month with the time set to midnight.
 */
export const setFirstDayOfMonth = (date: Date): Date => {
  date.setDate(1);

  return setBeginningOfDay(date);
};

/**
 * Sets the given date to the last day of the month and sets the time to midnight (00:00:00.000).
 *
 * @param {Date} date - The date object to be modified.
 * @returns {Date} The modified date object set to the first day of the month with the time set to midnight.
 */
export const setLastDayOfMonth = (date: Date): Date => {
  date.setDate(dayjs(date).daysInMonth());

  return setBeginningOfDay(date);
};
