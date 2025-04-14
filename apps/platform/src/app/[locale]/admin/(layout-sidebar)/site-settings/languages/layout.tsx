import type { ReactNode } from "react";

import { LanguagesLayout } from "@oe/dashboard";

export default function LanguagesSiteSettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LanguagesLayout>{children}</LanguagesLayout>;
}
