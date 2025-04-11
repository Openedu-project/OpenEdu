import { getThemeConfigServer } from "@oe/api";
import { getMetadata } from "@oe/themes";
import { ThemeWebPage } from "@oe/themes";
import { NotFoundPage } from "@oe/ui";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  return getMetadata(themeSystem?.[0]?.value);
}

export default async function Partners() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme;
  if (!(themeSystem?.[0]?.value && themeName)) {
    return <NotFoundPage />;
  }

  return (
    <ThemeWebPage
      selectedPage="about-us"
      themeName={themeName}
      pageConfig={themeSystem?.[0]?.value?.availableThemes?.[themeName]?.pages}
    />
  );
}
