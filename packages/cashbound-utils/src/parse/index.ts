/**
 * Safely parses an input to a string.
 *
 * @param {unknown} input - The input to be parsed.
 * @returns {string} The parsed string or an empty string if parsing fails.
 */
export const safeParseToString = (input: unknown): string => {
  try {
    if (typeof input === 'undefined' || input === null) throw new Error();

    if (typeof input === 'string') return input;

    if (typeof input === 'number' || typeof input === 'boolean') {
      return String(input);
    }

    throw new Error();
  } catch {
    return '';
  }
};

/**
 * Safely parses an input to a number.
 *
 * @param {unknown} input - The input to be parsed.
 * @returns {number} The parsed number or 0 if parsing fails.
 */
export const safeParseToNumber = (input: unknown): number => {
  try {
    if (typeof input === 'undefined' || input === null) throw new Error();

    // If input is already a number, return it
    if (typeof input === 'number') {
      return input;
    }

    // If input is a string, try parsing it into a number
    if (typeof input === 'string') {
      const parsedNumber = Number(input);

      if (!isNaN(parsedNumber)) return parsedNumber;
    }

    throw new Error();
  } catch {
    return 0;
  }
};

/**
 * Safely parses a JSON string.
 *
 * @param {string | null | undefined} input - The JSON string to be parsed.
 * @param {T} defaultValue - The default value to return if parsing fails.
 * @returns {T} The parsed JSON object or the default value if parsing fails.
 */
export const safeParseJSON = <T>(
  input: string | null | undefined,
  defaultValue: T
): T => {
  try {
    if (typeof input === 'string') {
      return JSON.parse(input);
    }

    throw new Error();
  } catch {
    return defaultValue;
  }
};

/**
 * Safely stringifies an input to JSON.
 *
 * @param {unknown} input - The input to be stringified.
 * @returns {string} The stringified JSON or an empty string if stringification fails.
 */
export const safeStringifyJSON = (input: unknown) => {
  try {
    if (input === null || input === undefined) throw new Error();

    return JSON.stringify(input);
  } catch {
    return '';
  }
};

/**
 * Safely parses an input to a boolean.
 *
 * @param {unknown} input - The input to be parsed.
 * @returns {boolean} The parsed boolean or false if parsing fails.
 */
export const safeParseBoolean = (input: unknown): boolean => {
  try {
    if (typeof input === 'boolean') return input;

    if (typeof input === 'string' && (input === 'true' || input === 'false')) {
      return input === 'true';
    }

    throw new Error();
  } catch {
    return false;
  }
};
