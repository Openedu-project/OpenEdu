import { HTTPError, type HTTPErrorCode, HTTPErrorCodeMessages } from './http-error';

import { isHTTPError, isNetworkError } from './error-handling';

interface RetryOptions {
  maxRetries: number;
  baseDelayMs: number;
  backoffFactor: number;
  jitterFactor: number;
  retryableErrors: HTTPErrorCode[];
}

const defaultRetryOptions: RetryOptions = {
  maxRetries: 3,
  baseDelayMs: 1000,
  backoffFactor: 2,
  jitterFactor: 0.2, // 20% jitter
  retryableErrors: [HTTPErrorCodeMessages.NETWORK_ERROR, HTTPErrorCodeMessages.RATE_LIMIT_ERROR],
};

function calculateDelay(attempt: number, options: RetryOptions): number {
  const baseDelay = options.baseDelayMs * options.backoffFactor ** attempt;
  const jitterRange = baseDelay * options.jitterFactor;
  const jitter = Math.random() * jitterRange - jitterRange / 2;

  return Math.max(0, Math.floor(baseDelay + jitter));
}

export async function withRetry<T>(fn: () => Promise<T>, options: Partial<RetryOptions> = {}): Promise<T> {
  const retryOptions: RetryOptions = { ...defaultRetryOptions, ...options };
  let lastError: HTTPError | null = null;

  for (let attempt = 0; attempt < retryOptions.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (isHTTPError(error) && retryOptions.retryableErrors.includes(error.message as HTTPErrorCode)) {
        lastError = error;
        const delay = calculateDelay(attempt, retryOptions);

        console.info(`Retry attempt ${attempt + 1} after ${delay}ms`);

        await new Promise(resolve => setTimeout(resolve, delay));
      } else if (isNetworkError(error)) {
        throw new HTTPError({ message: HTTPErrorCodeMessages.NETWORK_ERROR });
      } else {
        throw new HTTPError({ message: HTTPErrorCodeMessages.UNKNOWN });
      }
    }
  }

  throw lastError || new HTTPError({ message: HTTPErrorCodeMessages.UNKNOWN });
}
