interface ErrorStackTraceType {
  columnNumber?: string;
  fileName?: string;
  functionName: string;
  lineNumber?: string;
}

/**
 * Retrieves the current stack trace and formats it into an array of ErrorStackTraceType objects.
 *
 * @returns {ErrorStackTraceType[]} An array of objects representing the stack trace.
 * Each object contains information about the function name, file name, line number, and column number.
 */
const _getStackTrace = (): ErrorStackTraceType[] => {
  const stack = new Error().stack;

  if (stack) {
    const stackLines = stack.split('\n');

    const traceArray = stackLines.slice(1).map<ErrorStackTraceType>((line) => {
      const match = line.match(/at (.+) \((.+):(\d+):(\d+)\)/);

      if (match) {
        return {
          columnNumber: match[4],
          fileName: match[2],
          functionName: match[1].trim(),
          lineNumber: match[3]
        };
      } else {
        return { functionName: line.trim() };
      }
    });

    return traceArray;
  }

  return [];
};

/**
 * Custom error class that extends the built-in Error class.
 * This class includes a stack trace represented as an array of ErrorStackTraceType objects.
 */
export class CashboundError extends Error {
  public stackTrace: ErrorStackTraceType[] = [];

  /**
   * Creates an instance of CashboundError.
   *
   * @param {string} args - The error message.
   */
  constructor(args: string) {
    super(args);
    this.stackTrace = _getStackTrace();
  }
}

/**
 * Represents an unauthorized error, extending CashboundError.
 */
export class UnauthorizedError extends CashboundError {
  public httpStatusCode?: number = undefined;

  constructor(args: string, httpStatusCode = 401) {
    super(`Unauthorized Error: ${args}`);
    this.httpStatusCode = httpStatusCode;
  }
}

/**
 * Represents a timeout error, extending CashboundError.
 */
export class TimeoutError extends CashboundError {
  constructor(args: string) {
    super(`Timeout Error: ${args}`);
  }
}

/**
 * Casts an unknown value to an Error object.
 * If the input value is already an Error instance, it returns it unchanged.
 * If the input value is a string or number, it creates a new CashboundError with the value converted to a string.
 * If the input value is of any other type, it creates a new CashboundError with an "Unknown error" message.
 *
 * @param {unknown} e - The value to cast to an Error object.
 * @returns {Error} The resulting Error object.
 */
export const castingError = (e: unknown): Error => {
  if (e instanceof Error) return e;

  if (typeof e === 'string' || typeof e === 'number') {
    return new CashboundError(String(e));
  }

  return new CashboundError(`Unknown error: ${e}`);
};

/**
 * Throws an error with the provided message and logs the message using the error logger.
 * This function is typically used for handling unexpected errors in the application.
 *
 * @param {string} message - The error message to throw and log.
 * @param {string} [defaultErrorMessage="Oops! Something went wrong on our end. We're fixing it"] - The default error message if not provided.
 * @throws {Error} Always throws a CashboundError object with the default error message.
 * @returns {never} This function never returns as it always throws an error.
 */
export const throwError = (
  message: string,
  defaultErrorMessage = "Oops! Something went wrong on our end. We're fixing it"
): never => {
  /**
   * INFO: for logging purpose
   */
  // eslint-disable-next-line no-console
  console.log(message);

  throw new CashboundError(defaultErrorMessage);
};
