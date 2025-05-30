'use client';

import { useGetMe } from '@oe/api/hooks/useMe';
import type { IUser } from '@oe/api/types/user';
import type { HTTPError } from '@oe/api/utils/http-error';
import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useSocket } from '#hooks/socket';

interface AuthContextType {
  me: IUser | null;
  isLoading: boolean;
  error: HTTPError | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { dataMe, isLoadingMe, errorMe } = useGetMe();
  const authContextValue = useMemo(
    () => ({
      me: dataMe,
      isLoading: isLoadingMe,
      error: errorMe,
    }),
    [dataMe, isLoadingMe, errorMe]
  );
  const isAuthenticated = !!dataMe;
  useSocket(isAuthenticated);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
