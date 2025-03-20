import type { AbstractIntlMessages } from 'next-intl';
import type { ReactNode } from 'react';

import type { SWRConfiguration } from 'swr';
import { AuthProvider } from './auth-provider';
// import { AuthProvider } from './auth-provider';
import IntlProvider from './intl-provider';
import SWRProvider from './swr-provider';

export default function Provider({
  messages,
  locale,
  children,
  ...rest
}: {
  messages: AbstractIntlMessages;
  locale: string;
  children: ReactNode;
} & Omit<SWRConfiguration, 'children'>) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <SWRProvider {...rest}>
        <AuthProvider>{children}</AuthProvider>
      </SWRProvider>
    </IntlProvider>
  );
}
