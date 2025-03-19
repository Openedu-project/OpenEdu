import LogRocket from 'logrocket';

const LOGGED_ENVIRONMENTS = ['production'];

export const initLogger = () => {
  if (typeof window === 'undefined') {
    return;
  }
  if (LOGGED_ENVIRONMENTS.includes(process.env.NODE_ENV || '')) {
    const appId = process.env.NEXT_PUBLIC_LOGROCKET_APP_ID || 'your-organization/openedu-fe';
    LogRocket.init(appId, {
      release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      console: {
        shouldAggregateConsoleErrors: true,
        isEnabled: true,
      },
      network: {
        isEnabled: true,
        requestSanitizer: request => {
          // Remove sensitive information from requests if needed
          // Example: request.headers['Authorization'] = '***';
          return request;
        },
        responseSanitizer: response => {
          // Remove sensitive information from responses if needed
          return response;
        },
      },
    });
  }
};

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
export const logger = {
  info: (message: string, data?: Record<string, string | number>) => {
    if (typeof window !== 'undefined') {
      LogRocket.log(message, data);
    }
  },

  warn: (message: string, data?: Record<string, string | number>) => {
    if (typeof window !== 'undefined') {
      LogRocket.warn(message, data);
    }
  },

  error: (error: Error | string, data?: Record<string, string | number>) => {
    const errorMessage = error instanceof Error ? error.message : error;

    if (typeof window !== 'undefined') {
      if (error instanceof Error) {
        LogRocket.captureException(error, {
          tags: {
            ...data,
          },
        });
      } else {
        LogRocket.error(errorMessage, data);
      }
    }
  },

  // Track important events
  track: (eventName: string, properties?: Record<string, string | number>) => {
    if (typeof window !== 'undefined') {
      LogRocket.track(eventName, properties);
    }
  },
};

export default logger;
