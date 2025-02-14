import { getThemeConfigServer } from "@oe/api/services/theme";
import { getMetadata } from "@oe/themes";
import ThemeWebPage from "@oe/themes/components/web/theme-web-page";
import { NotFoundPage } from "@oe/ui/common/pages";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  return getMetadata(themeSystem?.[0]?.value);
}

export default async function Partners() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  if (!themeSystem?.[0]?.value) {
    return <NotFoundPage />;
  }

  return (
    <ThemeWebPage pageKey="partners" themeSystem={themeSystem?.[0]?.value} />
  );
}
