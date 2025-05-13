import { getSession } from '@oe/api';
import { useEffect, useState } from 'react';

export const useSocketAuth = (isAuthenticated: boolean) => {
  const [socketAuth, setSocketAuth] = useState({
    accessToken: '',
    referrer: '',
    error: null as Error | null,
  });

  useEffect(() => {
    const initSocketAuth = async () => {
      try {
        if (isAuthenticated) {
          const token = await getSession();

          setSocketAuth({
            accessToken: token?.accessToken ?? '',
            referrer: token?.referrer ?? '',
            error: null,
          });
        } else {
          setSocketAuth({
            accessToken: '',
            referrer: '',
            error: null,
          });
        }
      } catch (error) {
        setSocketAuth(prev => ({
          ...prev,
          error: error as Error,
        }));
      }
    };

    initSocketAuth();
  }, [isAuthenticated]);

  return socketAuth;
};
