import type { ReactNode } from 'react';
import type { SWRConfiguration } from 'swr';
import { AuthProvider } from './auth-provider';
import { IntlProvider } from './intl-provider';
import { SWRProvider } from './swr-provider';

export function Provider({
  children,
  ...rest
}: {
  children: ReactNode;
} & Omit<SWRConfiguration, 'children'>) {
  return (
    <IntlProvider>
      <SWRProvider {...rest}>
        <AuthProvider>{children}</AuthProvider>
      </SWRProvider>
    </IntlProvider>
  );
}
