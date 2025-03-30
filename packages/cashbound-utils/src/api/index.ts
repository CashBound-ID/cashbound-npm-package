import { castingError, TimeoutError } from '@/error';
import { combineAbortSignal, createAbortSignal } from '@/process';

interface FetchAPIResponseType<T> {
  error?: Error;
  requestBody?: ResponseInit;
  response?: T;
}

interface FetchAPIArgs extends Partial<RequestInit> {
  defaultErrorMessage?: string;
  delay?: number;
  signals?: AbortSignal[];
  url: URL;
}

/**
 * Fetches data from a given URL with optional request parameters and abort signals.
 *
 * @template T - The type of the expected response.
 * @param {FetchAPIArgs} args - The arguments for the fetch operation.
 * @param {string} [args.defaultErrorMessage="Oops! Something went wrong on our end. We're fixing it"] -
 * The default error message if the fetch fails.
 * @param {AbortSignal[]} [args.signals=[]] - An array of AbortSignal instances to control the fetch request.
 * @param {URL} args.url - The URL to fetch data from.
 * @param {RequestInit} [args] - Additional request options (e.g., method, headers).
 *
 * @returns {Promise<FetchAPIResponseType<T>>} A promise that resolves to an object containing either the response
 * or an error. The object may include:
 * - error: An Error object if the fetch fails.
 * - response: The parsed JSON response if the fetch is successful.
 *
 * @throws {Error} Throws an error if the URL is invalid or if parsing the response fails.
 */
export const fetchAPI = async <T>(
  args: FetchAPIArgs
): Promise<FetchAPIResponseType<T>> => {
  const {
    defaultErrorMessage = "Oops! Something went wrong on our end. We're fixing it",
    delay = 5000,
    signals = [],
    url,
    ...res
  } = args || {};

  try {
    const instance = await fetch(url.toString(), {
      ...res,
      signal: combineAbortSignal([...signals, createAbortSignal({ delay })])
    });
    const result = await instance.json();

    if (result !== null && typeof result !== 'undefined') {
      if (!instance.ok && (instance.status >= 400 || instance.status === 404)) {
        return {
          error: new Error(`API Error`),
          requestBody: res,
          response: result
        };
      }

      return { response: result };
    }

    throw new Error(defaultErrorMessage);
  } catch (e) {
    if (e instanceof TimeoutError) {
      const timeoutEvent = new CustomEvent('TimeoutError');
      window.dispatchEvent(timeoutEvent);
    }

    if (e instanceof Error) return { error: e };

    return { error: castingError(e) };
  }
};
