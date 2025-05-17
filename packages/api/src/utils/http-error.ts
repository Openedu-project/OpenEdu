export const HTTPErrorCodeMessages = {
  UNKNOWN: 'unknown.title',
  NETWORK_ERROR: 'networkError.title',
  AUTHENTICATION_ERROR: 'authenticationError',
  AUTHORIZATION_ERROR: 'authorizationError',
  BAD_REQUEST_ERROR: 'badRequestError',
  NOT_FOUND: 'apiNotFound',
  RATE_LIMIT_ERROR: 'rateLimitError',
  SERVER_ERROR: 'serverError.title',
  TIMEOUT_ERROR: 'timeoutError',
} as const;

export type HTTPErrorCodeKey = keyof typeof HTTPErrorCodeMessages;
export type HTTPErrorCode = HTTPErrorCodeKey[number];

export interface HTTPErrorMetadata {
  data: {
    message: string;
  };
  msg: string;
  code: number;
}

export interface IErrorDetails {
  status?: number;
  message: string | HTTPErrorCode;
  stack?: string;
  metadata?: HTTPErrorMetadata;
  originalError?: Error;
}

export class HTTPError extends Error {
  status?: number;
  metadata?: HTTPErrorMetadata;
  message: string | HTTPErrorCode;
  originalError?: Error;
  code: string | HTTPErrorCode;

  constructor(details: IErrorDetails) {
    super(details.message);
    this.message = details.message;
    this.name = 'HTTPError';
    this.status = details.status;
    this.metadata = details.metadata;
    this.originalError = details.originalError;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.code = Object.values(HTTPErrorCodeMessages).includes(details.message as any)
      ? (details.message as HTTPErrorCode)
      : HTTPErrorCodeMessages.UNKNOWN;

    if (details.stack) {
      this.stack = details.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
