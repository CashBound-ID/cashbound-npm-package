import { fetchAPI } from '@/api';

type Args = Parameters<typeof fetchAPI>[0];

const MOCK_ARGS: Args = {
  headers: {
    Authorization: 'Bearer gahfabeg71367814anbfasnfbam'
  },
  method: 'GET',
  url: new URL('https://www.google.com/')
};

describe('Testing API utils', () => {
  beforeEach(jest.clearAllMocks);

  it('Testing with response 200 should be return success', async () => {
    fetchMock.mockResponse(JSON.stringify({ status: 'ok' }), {
      status: 200
    });

    expect(await fetchAPI(MOCK_ARGS)).toStrictEqual({
      response: { status: 'ok' }
    });
  });

  it('Testing with response is 400 should be return error response', async () => {
    fetchMock.mockResponse(JSON.stringify({ status: 'not found' }), {
      status: 404
    });

    expect(await fetchAPI(MOCK_ARGS)).toStrictEqual({
      error: new Error(`API Error`),
      requestBody: {
        headers: {
          Authorization: 'Bearer gahfabeg71367814anbfasnfbam'
        },
        method: 'GET'
      },
      response: { status: 'not found' }
    });
  });

  it('Testing with response returning text not json should be return error response', async () => {
    fetchMock.mockResponseOnce('Internal Server Error', {
      status: 500
    });

    expect(await fetchAPI(MOCK_ARGS)).toStrictEqual({
      error: expect.objectContaining({
        message: `invalid json response body at  reason: Unexpected token 'I', "Internal S"... is not valid JSON`
      })
    });

    fetchMock.mockResponseOnce('null', {
      status: 500
    });

    expect(
      await fetchAPI({
        ...MOCK_ARGS,
        defaultErrorMessage: 'Sample Error Message'
      })
    ).toStrictEqual({
      error: expect.objectContaining({
        message: 'Sample Error Message'
      })
    });
  });

  it('Testing with fetch API returning error because timeout error', async () => {
    jest.useFakeTimers();
    fetchMock.mockResponse(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ body: JSON.stringify({ status: 'ok' }) }),
            5000
          )
        )
    );

    const process = fetchAPI(MOCK_ARGS);
    jest.advanceTimersByTime(10000);

    expect(await process).toMatchInlineSnapshot(`
      {
        "error": [AbortError: The operation was aborted. ],
      }
    `);
  });

  it('Testing with fetch API returning error because trigger abort controller signal', async () => {
    jest.useFakeTimers();
    fetchMock.mockResponse(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ body: JSON.stringify({ status: 'ok' }) }),
            5000
          )
        )
    );

    const controller = new AbortController();

    const process = fetchAPI({
      ...MOCK_ARGS,
      delay: 10000,
      signals: [controller.signal]
    });
    /**
     * Simulate abort by abort controller
     */
    jest.advanceTimersByTime(500);
    controller.abort();

    jest.advanceTimersByTime(10000);
    expect(await process).toMatchInlineSnapshot(`
      {
        "error": [AbortError: The operation was aborted. ],
      }
    `);
  });
});
