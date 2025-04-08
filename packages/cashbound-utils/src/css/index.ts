type CXArgs =
  | string
  | { [key: string]: boolean | void | null }
  | Array<CXArgs>
  | void
  | null;

/**
 * Combines multiple class names or objects into a single string.
 *
 * @param  args - The class names or objects to be combined.
 * @returns  A string containing the combined class names.
 */
export const cx = (...args: Array<CXArgs>): string => {
  let cls = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg == null) continue;

    let toAdd: string;
    switch (typeof arg) {
      case 'object': {
        if (Array.isArray(arg)) {
          toAdd = cx(...arg);
        } else {
          toAdd = '';
          for (const k in arg) {
            if (arg[k] && k) {
              if (toAdd) toAdd += ' ';
              toAdd += k;
            }
          }
        }
        break;
      }

      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      if (cls) cls += ' ';
      cls += toAdd;
    }
  }

  return cls;
};

/////////////////////////////////////////////////////////////////////////////
// Unit Converter Utils
/////////////////////////////////////////////////////////////////////////////

/**
 * Converts a number to a pixel string representation.
 *
 * @param arg - The number to be converted.
 * @returns A string representing the number with 'px' appended.
 */
export const numberToPx = (arg: number) => {
  if (typeof arg === 'number') {
    return `${arg}px`;
  }

  return '';
};

/**
 * Converts a pixel string representation to a number.
 *
 * @param arg - The pixel string to be converted.
 * @returns The parsed number, or 0 if the input is not a valid pixel string.
 */
export const pxToNumber = (arg: string) => {
  if (typeof arg === 'string' && arg.includes('px')) {
    const result = Number(arg.replace('px', ''));

    if (!Number.isNaN(result)) return result;

    return 0;
  }

  return 0;
};

/////////////////////////////////////////////////////////////////////////////
// Color Converter Utils
/////////////////////////////////////////////////////////////////////////////

/**
 * Converts a hex color code to an RGBA color code.
 * @param {string} hex - The hex color code (e.g., "#RRGGBB" or "#RGB").
 * @param {number} [alpha=1] - The alpha value (0 to 1).
 * @returns {string} The RGBA color code.
 */
export function hexToRgba(hex: string, alpha = 1) {
  // Remove the leading '#' if present
  hex = hex.replace(/^#/, '');

  // Check if the input is a valid hex code
  if (!/^([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex)) {
    throw new Error('Invalid hex color code');
  }

  // If shorthand hex code, expand it to full form
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Extract the RGB components from the hex code
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Ensure alpha is within the valid range
  if (alpha < 0 || alpha > 1) {
    throw new Error('Alpha value must be between 0 and 1');
  }

  // Return the RGBA color code
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
