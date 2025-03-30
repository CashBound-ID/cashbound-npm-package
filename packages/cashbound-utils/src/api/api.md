# API Utils

The `fetchAPI` function allows you to fetch data from a specified URL with optional request parameters and abort signals. This function provides a way to handle requests gracefully, including timeouts and error management.

## How to Use
### Importing the Utilities

First, import the utilities from your module:

```typescript
import { fetchAPI } from '@cashbound-id/utils/api';
```

### Function Signature
```
fetchAPI<T>(args: FetchAPIArgs): Promise<FetchAPIResponseType<T>>
```
### Parameters
- `defaultErrorMessage` (optional):
  - Type: string
  - Default: "Oops! Something went wrong on our end. We're fixing it"
  - Description: The error message returned if the fetch operation fails.
- `delay` (optional):
  - Type: number
  - Default: 5000
  - Description: The timeout duration in milliseconds before aborting the fetch request.
- `signals` (optional):
  - Type: AbortSignal[]
  - Default: []
  - Description: An array of AbortSignal instances to control the fetch request, allowing for external aborting.
- `url`:
  - Type: URL
  - Description: The URL from which to fetch data.
- `...res` (optional):
  - Type: Partial<RequestInit>
  - Description: Additional request options (e.g., method, headers).
  
### Returns
A promise that resolves to an object of type FetchAPIResponseType<T>, which may include:
- error: An Error object if the fetch fails.
- response: The parsed JSON response if the fetch is successful.

### Example Usage
#### Basic Fetch
```typescript
import { fetchAPI } from '@cashbound-id/utils/api';

const fetchData = async () => {
  const url = new URL('https://api.example.com/data');
  
  const { response, error } = await fetchAPI({
    url,
    method: 'GET', // Optional: Specify the HTTP method
  });

  if (error) {
    console.error('Fetch failed:', error);
  } else {
    console.log('Fetched data:', response);
  }
};

fetchData();
```

#### Fetch with Custom Delay and Abort Signals
```typescript
import { fetchAPI } from '@cashbound-id/utils/api';

const fetchDataWithAbort = async () => {
  const url = new URL('https://api.example.com/data');
  const abortController = new AbortController();

  const { response, error } = await fetchAPI({
    url,
    method: 'GET',
    delay: 3000, // Custom delay of 3 seconds
    signals: [abortController.signal], // Additional abort signals
  });

  if (error) {
    console.error('Fetch failed:', error);
  } else {
    console.log('Fetched data:', response);
  }

  // Simulate aborting the request after 1 second
  setTimeout(() => {
    abortController.abort();
    console.log('Fetch aborted');
  }, 1000);
};

fetchDataWithAbort();
```

#### Error Handling
The fetchAPI function automatically handles errors and will return an error object in case of failure. You can check the error property of the returned object to determine if the fetch was unsuccessful.

```typescript
const fetchDataWithErrors = async () => {
  const url = new URL('https://api.example.com/data');

  const { response, error } = await fetchAPI({ url });

  if (error) {
    if (error instanceof TimeoutError) {
      console.error('Request timed out:', error);
    } else {
      console.error('Fetch error:', error);
    }
  } else {
    console.log('Fetched data:', response);
  }
};

fetchDataWithErrors();
```