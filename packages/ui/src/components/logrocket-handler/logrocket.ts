import LogRocket from 'logrocket';

interface LogData {
  url?: string;
  method?: string;
  status?: number;
  statusText?: string;
  duration?: number;
  requestId?: string;
  headers?: Record<string, string>;
  responseBody?: unknown;
  phase?: string;
}

/**
 * Identify user - call after user login
 */
export const identifyUser = (userId: string, userInfo: Record<string, string | number> = {}) => {
  if (typeof window === 'undefined') {
    return;
  }

  LogRocket.identify(userId, {
    ...userInfo,
  });
};

/**
 * Logger utility for both client and server
 */
export const apiLogger = {
  info: (message: string, data?: LogData): void => {
    if (typeof window !== 'undefined') {
      LogRocket.log(message, data);
    }
  },

  warn: (message: string, data?: LogData): void => {
    if (typeof window !== 'undefined') {
      LogRocket.warn(message, data);
    }
  },

  error: (error: Error | string, data?: LogData): void => {
    const errorMessage = error instanceof Error ? error.message : error;

    if (typeof window !== 'undefined') {
      if (error instanceof Error) {
        const { headers, responseBody, ...logData } = data || {};
        LogRocket.captureException(error, {
          tags: {
            type: 'api_error',
            ...logData,
          },
        });
      } else {
        LogRocket.error(errorMessage, {
          type: 'api_error',
          ...data,
        });
      }
    }
  },
};
