import {
  CashboundError,
  castingError,
  throwError,
  TimeoutError,
  UnauthorizedError
} from '@/error';

describe('Testing Error Utils', () => {
  it('Testing CashboundError class should be working properly', () => {
    const error = new CashboundError('Sample Error');
    expect(error.message).toBe('Sample Error');
    expect(error.stackTrace).toBeInstanceOf(Array);
  });

  it('Testing UnauthorizedError class should be working properly', () => {
    const error = new UnauthorizedError('Sample Error');
    expect(error.message).toBe('Unauthorized Error: Sample Error');
    expect(error.httpStatusCode).toBe(401);
    expect(error.stackTrace).toBeInstanceOf(Array);

    const error2 = new UnauthorizedError('Sample Error', 400);
    expect(error2.message).toBe('Unauthorized Error: Sample Error');
    expect(error2.httpStatusCode).toBe(400);
  });

  it('Testing TimeoutError class should be working properly', () => {
    const error = new TimeoutError('Sample Error');
    expect(error.message).toBe('Timeout Error: Sample Error');
    expect(error.stackTrace).toBeInstanceOf(Array);
  });

  describe('Testing casting error method', () => {
    it.each`
      testCase                                                       | args                         | expectedErrorMessage
      ${'should return the same error message if args is Error'}     | ${new Error('Sample Error')} | ${'Sample Error'}
      ${'should return the same error message if args is string'}    | ${'Sample string'}           | ${'Sample string'}
      ${'should return the same error message if args is integer'}   | ${990}                       | ${'990'}
      ${'should return the same error message if args is array'}     | ${[1, 2, 3]}                 | ${'Unknown error: 1,2,3'}
      ${'should return the same error message if args is object'}    | ${{ name: 'john doe' }}      | ${'Unknown error: [object Object]'}
      ${'should return the same error message if args is null'}      | ${null}                      | ${'Unknown error: null'}
      ${'should return the same error message if args is undefined'} | ${undefined}                 | ${'Unknown error: undefined'}
    `('$testCase', ({ args, expectedErrorMessage }) => {
      const error = castingError(args);

      expect(error.message).toBe(expectedErrorMessage);
    });
  });

  it('should log the error message and throw an Error with the default error message', () => {
    const errorMessage = 'Test error message';

    expect(() => throwError(errorMessage)).toThrow(
      "Oops! Something went wrong on our end. We're fixing it"
    );

    expect(() => throwError(errorMessage, 'Exposed Error Message')).toThrow(
      'Exposed Error Message'
    );
  });
});
