"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import type { SWRConfiguration } from "swr";
// import { AuthProvider } from "./auth-provider";
// import { IntlProvider } from "./intl-provider";
// import { SWRProvider } from "./swr-provider";

// const IntlProvider = dynamic(
//   () => import("./intl-provider").then((mod) => mod.IntlProvider)
//   // { ssr: false }
// );
const SWRProvider = dynamic(
  () => import("./swr-provider").then((mod) => mod.SWRProvider),
  { ssr: false }
);
const AuthProvider = dynamic(
  () => import("./auth-provider").then((mod) => mod.AuthProvider),
  { ssr: false }
);

export function Provider({
  children,
  ...rest
}: {
  children: ReactNode;
} & Omit<SWRConfiguration, "children">) {
  return (
    // <IntlProvider>
    <SWRProvider {...rest}>
      <AuthProvider>{children}</AuthProvider>
    </SWRProvider>
    // </IntlProvider>
  );
}
