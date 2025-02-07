import { getCookie } from '@oe/core/utils/cookie';
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
          const [token, ref] = await Promise.all([
            getCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY),
            getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY),
          ]);

          setSocketAuth({
            accessToken: token ?? '',
            referrer: ref ?? '',
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
