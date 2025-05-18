'use client';

import type { HTTPError } from '@oe/api';
import { setSessionCookieFromToken, useGetMe } from '@oe/api';
import type { IUser } from '@oe/api';
import type React from 'react';
import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '#hooks/socket';

interface AuthContextType {
  me: IUser | null;
  isMeLoading: boolean;
  meError: HTTPError | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { dataMe, isLoadingMe, errorMe, mutateMe } = useGetMe();
  useSocket(!!dataMe);

  useEffect(() => {
    // Kiểm tra xem có token trong fragment không
    const checkFragment = async () => {
      if (typeof window !== 'undefined') {
        const fragment = window.location.hash.substring(1);
        const params = new URLSearchParams(fragment);
        const token = params.get('token');

        if (token) {
          try {
            // Gọi server action để lưu cookie
            await Promise.all([setSessionCookieFromToken(token), mutateMe()]);

            // Xóa fragment từ URL
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
          } catch (error) {
            console.error('Auth error:', error);
          }
        }
      }
    };

    checkFragment();
  }, [mutateMe]);

  return (
    <AuthContext.Provider
      value={{
        me: dataMe,
        isMeLoading: isLoadingMe,
        meError: errorMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
