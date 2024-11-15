'use client';

import { TIME_ZONE } from '@oe/core/utils/datetime';
import { IntlErrorCode, NextIntlClientProvider } from 'next-intl';

import type { AbstractIntlMessages } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
};

export default function IntlProvider({ messages, locale, children }: Props) {
  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone={TIME_ZONE}
      getMessageFallback={({ namespace, key, error }) => {
        const path = [namespace, key].filter(part => part !== null).join('.');

        if (error.code === IntlErrorCode.MISSING_MESSAGE) {
          return key;
        }
        return `Dear developer, please fix this message: ${path}`;
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
