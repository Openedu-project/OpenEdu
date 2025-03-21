'use client';
import LogRocket from 'logrocket';
import { useEffect } from 'react';

export default function LogRocketHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (['production'].includes(process.env.NODE_ENV || '')) {
      const appId = process.env.NEXT_PUBLIC_LOGROCKET_APP_ID ?? '';
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
  }, []);

  return null;
}
