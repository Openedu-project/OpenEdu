'use client';

import { getCookie } from '@oe/core/utils/cookie';
import { useRouter } from 'next/navigation';
import { type FC, type ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY);
      setIsAuthenticated(!!token);
      if (!token) {
        router.refresh();
      }
    };
    checkAuth();

    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, [router.refresh]);

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
