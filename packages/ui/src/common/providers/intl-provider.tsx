import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function IntlProvider({ children }: Props) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
