import type { AbstractIntlMessages } from "next-intl";
import type { ReactNode } from "react";

import type { SWRConfiguration } from "swr";
import { AuthProvider } from "./auth-provider";
// import { AuthProvider } from './auth-provider';
import IntlProvider from "./intl-provider";
import SWRProvider from "./swr-provider";
import { ThemeProvider } from "./theme-provider";

export default function Provider({
  messages,
  locale,
  children,
  // theme,
  ...rest
}: {
  messages: AbstractIntlMessages;
  locale: string;
  // theme: ThemeDefinition;
  children: ReactNode;
} & Omit<SWRConfiguration, "children">) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <SWRProvider {...rest}>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </SWRProvider>
    </IntlProvider>
  );
}
