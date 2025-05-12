'use client';

import type { HTTPError } from '@oe/api';
import { useGetMe } from '@oe/api';
import type { IUser } from '@oe/api';
import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useSocket } from '#hooks/socket';

interface AuthContextType {
  me: IUser | null;
  isMeLoading: boolean;
  meError: HTTPError | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { dataMe, isLoadingMe, errorMe } = useGetMe();
  console.info('🚀 ~ MeProvider ~ dataMe:', dataMe);
  const authContextValue = useMemo(
    () => ({
      me: dataMe,
      isMeLoading: isLoadingMe,
      meError: errorMe,
    }),
    [dataMe, isLoadingMe, errorMe]
  );
  const isAuthenticated = !!dataMe;
  useSocket(isAuthenticated);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <SessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
//       <MeProvider>{children}</MeProvider>
//     </SessionProvider>
//   );
// }

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
