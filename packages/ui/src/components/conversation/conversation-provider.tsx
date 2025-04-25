'use client';

import type { HTTPError } from '@oe/api';
import { useGetMe } from '@oe/api';
import type { IUser } from '@oe/api';
import type React from 'react';
import { createContext, useMemo } from 'react';
import { useSocket } from '#hooks/socket';

interface AuthContextType {
  me: IUser | null;
  isLoading: boolean;
  error: HTTPError | null;
}

const ConversationContext = createContext<AuthContextType | undefined>(undefined);

export function ConversationProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
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
  useSocket(isAuthenticated, id);

  return <ConversationContext.Provider value={authContextValue}>{children}</ConversationContext.Provider>;
}
