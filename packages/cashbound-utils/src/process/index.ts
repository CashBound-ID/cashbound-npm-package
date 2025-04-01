import { CashboundError, castingError, TimeoutError } from '@/error';

interface AbortProcessArgs<T> {
  defaultErrorMessage?: string;
  delay?: number;
  fn: Promise<T>;
}

interface AbortProcessResponseType<T> {
  error?: Error;
  result?: T;
}

/**
 * Aborts a process after a specified delay.
 *
 * @template T - The type of the result expected from the process.
 * @param args - The arguments for aborting the process.
 * @returns  A promise resolving to the response of the aborted process.
 */
export async function abortProcess<T>(
  args: AbortProcessArgs<T>
): Promise<AbortProcessResponseType<T>> {
  try {
    const {
      defaultErrorMessage = 'Time Out Async Proces',
      delay = 5000,
      fn
    } = args;
    const abortInstance = new AbortController();
    const timeoutInstance = setTimeout(() => {
      abortInstance.abort();
    }, delay);

    const response = await new Promise<T>((resolve, reject) => {
      fn.then((response) => resolve(response)).catch((e) => reject(e));

      abortInstance.signal.addEventListener('abort', () => {
        clearTimeout(timeoutInstance);
        reject(new TimeoutError(defaultErrorMessage));
      });
    });
    clearTimeout(timeoutInstance);

    return { result: response };
  } catch (e) {
    return {
      error: castingError(e)
    };
  }
}

interface CreateAbortSignalArgs {
  defaultErrorMessage?: string;
  delay?: number;
}

/**
 * Creates an abort signal with the given timeout in milliseconds
 * (polyfill if abortsignal is undefined on browser).
 *
 * @param {number} milisecond - The timeout duration in milliseconds.
 * @returns {AbortSignal} - An abort signal instance.
 */
export const createAbortSignal = (args: CreateAbortSignalArgs): AbortSignal => {
  const { defaultErrorMessage = 'Time Out Async Proces', delay = 5000 } = args;

  const controller = new AbortController();
  setTimeout(
    () => controller.abort(new TimeoutError(defaultErrorMessage)),
    delay
  );
  return controller.signal;
};

/**
 * Combines multiple AbortSignal instances into a single AbortSignal.
 * The returned signal will be aborted if any of the input signals are aborted.
 *
 * @param {AbortSignal[]} signals - An array of AbortSignal instances to combine.
 * @throws {CashboundError} Throws an error if the argument is not an array or if any element is not an AbortSignal.
 * @returns {AbortSignal} A new AbortSignal that will be aborted if any of the input signals are aborted.
 */
export const combineAbortSignal = (signals: AbortSignal[]) => {
  if (!Array.isArray(signals)) {
    throw new CashboundError('The argument must be an array of AbortSignals.');
  }

  const controller = new AbortController();
  const signal = controller.signal;

  const abortHandler = () => {
    if (!signal.aborted) {
      controller.abort();

      // Remove event listeners from all signals
      signals.forEach((s) => {
        s.removeEventListener('abort', abortHandler);
      });
    }
  };

  for (const s of signals) {
    if (!(s instanceof AbortSignal)) {
      throw new TypeError('All elements must be AbortSignal instances.');
    }

    s.addEventListener('abort', abortHandler);
  }

  // Check if any signal is already aborted
  signals.forEach((s) => {
    if (s.aborted) controller.abort();
  });

  return signal;
};
