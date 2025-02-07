import { useEffect, useRef } from 'react';

import { useCallback } from 'react';

export const useReconnection = (isAuthenticated: boolean, accessToken: string) => {
  const reconnectCount = useRef(0);
  const isUnmounted = useRef(false);

  const shouldReconnect = useCallback(() => {
    const shouldTry = !isUnmounted.current && isAuthenticated && !!accessToken && reconnectCount.current < 10;

    if (shouldTry) {
      reconnectCount.current += 1;
    }
    return shouldTry;
  }, [isAuthenticated, accessToken]);

  const reconnectInterval = useCallback((attemptNumber: number) => {
    return Math.min(3000 * attemptNumber, 30000);
  }, []);

  useEffect(() => {
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  return { shouldReconnect, reconnectInterval, isUnmounted };
};
