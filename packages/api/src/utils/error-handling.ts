import { HTTPError, type HTTPErrorCode, HTTPErrorCodeMessages } from './http-error';

import type { HTTPResponse } from '#types/fetch';
import type { HTTPErrorMetadata } from './http-error';

export function isHTTPError(error: unknown): error is HTTPError {
  return error instanceof HTTPError;
}

export async function handleResponse<T>(response: Response): Promise<HTTPResponse<T>> {
  if (!response.ok) {
    let metadata: string | HTTPErrorMetadata | undefined;

    try {
      metadata = (await response?.json()) as HTTPErrorMetadata;
    } catch {
      metadata = undefined;
    }

    console.log('-------Fetch metadata-------', metadata);

    const error = new HTTPError({
      status: response.status,
      message: metadata ? String(metadata.code) : getErrorCodeFromStatus(response.status),
      metadata,
    });

    throw error;
  }

  return response.json() as unknown as HTTPResponse<T>;
}

export function handleError(error: unknown) {
  if (isHTTPError(error)) {
    return error;
  }
  if (isNetworkError(error)) {
    return new HTTPError({ message: HTTPErrorCodeMessages.NETWORK_ERROR });
  }
  return new HTTPError({ message: HTTPErrorCodeMessages.UNKNOWN });
}

export function getErrorCodeFromStatus(status: number): HTTPErrorCode {
  switch (true) {
    case status === 400: {
      return HTTPErrorCodeMessages.BAD_REQUEST_ERROR;
    }
    case status === 401: {
      return HTTPErrorCodeMessages.AUTHENTICATION_ERROR;
    }
    case status === 403: {
      return HTTPErrorCodeMessages.AUTHORIZATION_ERROR;
    }
    case status === 404: {
      return HTTPErrorCodeMessages.NOT_FOUND;
    }
    case status === 429: {
      return HTTPErrorCodeMessages.RATE_LIMIT_ERROR;
    }
    case status >= 500: {
      return HTTPErrorCodeMessages.SERVER_ERROR;
    }
    default: {
      return HTTPErrorCodeMessages.UNKNOWN;
    }
  }
}

const isError = (value: unknown): value is Error => Object.prototype.toString.call(value) === '[object Error]';

const errorMessages: Set<string> = new Set([
  'network error', // Chrome
  'Failed to fetch', // Chrome
  'NetworkError when attempting to fetch resource.', // Firefox
  'The Internet connection appears to be offline.', // Safari 16
  'Load failed', // Safari 17+
  'Network request failed', // `cross-fetch`
  'fetch failed', // Undici (Node.js)
  'terminated', // Undici (Node.js)
]);

export function isNetworkError(error: unknown): boolean {
  const isValid =
    error !== null &&
    error !== undefined &&
    isError(error) &&
    error.name === 'TypeError' &&
    typeof error.message === 'string';

  if (!isValid) {
    return false;
  }

  // We do an extra check for Safari 17+ as it has a very generic error message.
  // Network errors in Safari have no stack.
  if (error.message === 'Load failed') {
    return error.stack === undefined;
  }

  return errorMessages.has(error.message);
}
