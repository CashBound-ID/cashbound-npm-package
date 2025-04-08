/**
 * Formats a phone number string by adding separators and country code.
 *
 * This function expects the phone number to be in a specific format,
 * cleaning it by removing non-digit characters and then applying a pattern
 * based on the length of the last group of digits.
 *
 * @param {string} phoneNumber - The phone number string to be formatted.
 * @returns {string} The formatted phone number with separators and country code.
 *
 * @example
 * const formattedNumber = formattingPhoneNumber('08123456789');
 * console.log(formattedNumber); // Output: "+62 812 345 6789"
 */

export const formattingPhoneNumber = (phoneNumber: string): string => {
  let formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
  if (formattedPhoneNumber.startsWith('0')) {
    formattedPhoneNumber = `62${formattedPhoneNumber.slice(1)}`;
  } else if (!formattedPhoneNumber.startsWith('62')) {
    formattedPhoneNumber = `62${formattedPhoneNumber}`;
  }

  const lastGroupLength = formattedPhoneNumber.replace(/\D/g, '').length - 9;
  const patternString = `^(\\d{2})(\\d{3})(\\d{4})(\\d{${lastGroupLength}})$`;
  const phonePattern = new RegExp(patternString);

  return formattedPhoneNumber.replace(phonePattern, '+$1 $2 $3 $4');
};

/**
 * Cleanses a phone number by removing country code prefixes and ensuring it starts with a '0'.
 *
 * This function takes a phone number string and performs the following steps:
 * 1. Removes any whitespace from the input string.
 * 2. Removes any of the specified country code prefixes: (+62), (62), +62, or 62.
 * 3. Ensures the resulting phone number starts with a '0'.
 *
 * @param {string} phoneNumber - The phone number string to be cleansed.
 * @returns {string} The cleansed phone number string.
 */
export const sanitizePhoneNumber = (phoneNumber: string): string => {
  const patterns = ['(+62)', '(62)', '+62', '62'];
  let sanitizedNumber = phoneNumber.replace(/\s/g, '');
  let found = false;

  patterns.forEach((pattern) => {
    if (!found && sanitizedNumber.startsWith(pattern)) {
      found = true;
      sanitizedNumber = sanitizedNumber.replace(pattern, '');
    }
  });

  if (!sanitizedNumber.startsWith('0')) {
    sanitizedNumber = `0${sanitizedNumber}`;
  }

  return sanitizedNumber;
};
