/* eslint-disable @typescript-eslint/no-explicit-any */
export const noop = () => {};

/**
 * Returns a promise that resolves after a specified delay.
 * The delay can be random within the specified duration if enabled.
 *
 * @param {number} duration - The maximum duration in milliseconds for the delay.
 * @param {boolean} [enableRandom=true] - If true, the delay will be randomized within the duration.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
export const delay = (duration: number, enableRandom = true): Promise<void> => {
  return new Promise((resolve) => {
    const timeout = enableRandom ? Math.random() * duration : duration;

    setTimeout(resolve, timeout);
  });
};

/**
 * Copies the given text to the clipboard.
 *
 * @param {string} text - The text to be copied to the clipboard.
 * @returns {void}
 */
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

/**
 * Creates a debounced function that delays the execution of the given function
 * until after the specified wait time has elapsed since the last time it was invoked.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {(...args: Parameters<T>) => void} - The debounced version of the original function.
 *
 * @example
 * const debouncedLog = debounce(() => console.log('Called!'), 200);
 * window.addEventListener('resize', debouncedLog);
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = undefined;
      fn.apply(this, args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}

/**
 * Creates a throttled function that only invokes the given function at most once
 * per every specified wait time.
 *
 * @param {Function} fn - The function to throttle.
 * @param {number} wait - The number of milliseconds to wait before invoking the function again.
 * @returns {(...args: Parameters<T>) => void} - The throttled version of the original function.
 *
 * @example
 * const throttledLog = throttle(() => console.log('Called!'), 200);
 * window.addEventListener('scroll', throttledLog);
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return function (this: any, ...args: Parameters<T>): void {
    const now = new Date().getTime();

    if (now - lastCall >= wait) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Formats a price number into an Indonesian Rupiah (Rp) currency string.
 *
 * @param price - The price to be formatted.
 * @returns The formatted price string in the format 'RpX.XXX.XXX'.
 */
export const toIDR = (price: number): string => {
  try {
    if (typeof price !== 'number') throw new Error();

    return 'Rp' + new Intl.NumberFormat('id-ID').format(price);
  } catch {
    return '-';
  }
};

/**
 * Redirects the browser to a specified URL.
 *
 * @param {string} url - The URL to redirect to.
 *
 * @example
 * // Redirects the browser to 'https://example.com'
 * redirectNative('https://example.com');
 */
export const redirectNative = (url: string) => {
  window.location.href = url;
};

/**
 * Opens the specified URL in a new browser tab.
 *
 * @param {string} url - The URL to open in a new tab.
 *
 * @example
 * // Opens 'https://example.com' in a new browser tab
 * openToNewTabNative('https://example.com');
 */
export const openToNewTabNative = (url: string) => {
  window.open(url, '_blank');
};
