/* eslint-disable @typescript-eslint/no-explicit-any */

import { safeParseToString } from '@/parse';

interface URLQueryParameterType {
  key: string;
  value: string;
}

/////////////////////////////////////////////////////////////////////////////
// Private Method
/////////////////////////////////////////////////////////////////////////////

/**
 * Constructs URL query parameters recursively from a given key and value.
 *
 * @param {string} formattedKey - The formatted key for the query parameter.
 * @param {any} currentValue - The current value of the query parameter.
 * @returns {URLQueryParameterType[]} An array of URLQueryParameterType representing the constructed URL query parameters.
 *
 * @example
 * const params = _buildURLQueryParameterItemRecursive('user', { name: 'John', age: 30 });
 * // Output: [{ key: 'user[name]', value: 'John' }, { key: 'user[age]', value: '30' }]
 */
const _buildURLQueryParameterItemRecursive = (
  formattedKey: string,
  currentValue: any
): URLQueryParameterType[] => {
  if (
    typeof currentValue === 'string' ||
    typeof currentValue === 'number' ||
    typeof currentValue === 'boolean'
  ) {
    return [{ key: formattedKey, value: safeParseToString(currentValue) }];
  }

  if (typeof currentValue === 'object') {
    return buildURLQueryParameters(currentValue, formattedKey);
  }

  return [];
};

/**
 * Constructs URL query parameters from a given parameter object.
 *
 * @param {any} parameter - The parameter object to be converted into URL query parameters.
 * @param {string | undefined} previousKey - The previous key if any.
 * @returns {URLQueryParameterType[]} An array of URLQueryParameterType representing the constructed URL query parameters.
 *
 * @example
 * const params = buildURLQueryParameters({ user: { name: 'John', age: 30 } });
 * // Output: [{ key: 'user[name]', value: 'John' }, { key: 'user[age]', value: '30' }]
 */
export const buildURLQueryParameters = (
  parameter: any,
  previousKey: string | undefined = undefined
): URLQueryParameterType[] => {
  if (Array.isArray(parameter)) {
    return parameter.reduce<URLQueryParameterType[]>(
      (result, currentValue, index) => {
        let formattedKey = `[${index}]`;
        if (previousKey) formattedKey = `${previousKey}[${index}]`;

        result.push(
          ..._buildURLQueryParameterItemRecursive(formattedKey, currentValue)
        );

        return result;
      },
      []
    );
  }

  if (typeof parameter === 'object' && parameter) {
    return Object.keys(parameter).reduce<URLQueryParameterType[]>(
      (result, currentKey) => {
        const currentValue = parameter[currentKey];
        let formattedKey: string = currentKey;
        if (previousKey) formattedKey = `${previousKey}[${currentKey}]`;

        result.push(
          ..._buildURLQueryParameterItemRecursive(formattedKey, currentValue)
        );

        return result;
      },
      []
    );
  }

  return [];
};

/////////////////////////////////////////////////////////////////////////////
// Public Method
/////////////////////////////////////////////////////////////////////////////

interface URLTransformType {
  parameter?: any;
  url: string;
}

/**
 * Constructs a URL with query parameters from a base URL and a parameter object.
 *
 * @param {URLTransformType} args - An object containing the base URL and parameter object.
 * @returns {URL} A new URL object with the constructed query parameters.
 *
 * @example
 * const url = constructURL({ url: 'https://example.com', parameter: { user: { name: 'John', age: 30 } } });
 * // Output: new URL('https://example.com/?user[name]=John&user[age]=30')
 */
export const constructURL = (args: URLTransformType): URL => {
  const { parameter, url } = args;
  const result = new URL(url);

  buildURLQueryParameters(parameter).forEach((item) => {
    result.searchParams.set(item.key, item.value);
  });

  return result;
};

/**
 * Parses a URL object and returns the base URL and its query parameters as a nested object.
 *
 * @param {URL} url - The URL object to parse.
 * @returns {URLTransformType} An object containing the base URL and nested query parameters.
 *
 * @example
 * const url = new URL('https://example.com/?user[name]=John&user[age]=30');
 * const result = parseURL(url);
 * // Output: { parameter: { user: { name: 'John', age: '30' } }, url: 'https://example.com' }
 */
export const parseURL = (url: URL): URLTransformType => {
  const queryParameter = {};
  const params = url.searchParams;
  const origin = url.origin;

  params.forEach((value, key) => {
    const keys = key.split(/\[|\]/).filter((k) => k); // Split key into parts

    keys.reduce<Record<string, any>>((acc, part, index) => {
      if (index === keys.length - 1) {
        acc[part] = value;
      } else {
        acc[part] = acc[part] || (isNaN(Number(keys[index + 1])) ? {} : []);
      }
      return acc[part];
    }, queryParameter);
  });

  return {
    parameter: queryParameter,
    url: origin
  };
};
