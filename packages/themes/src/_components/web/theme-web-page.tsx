import { THEMES_SERVER } from "@oe/themes";
import type {
  SectionsByPage,
  ThemePageKey,
  ThemeSystem,
} from "@oe/themes/types/index";
import { NotFoundPage } from "@oe/ui/common/pages";
import { getThemeComponent } from "../../_utils/function";

interface ThemePageProps {
  pageKey: ThemePageKey;
  themeSystem: ThemeSystem;
}

export default function ThemeWebPage({ pageKey, themeSystem }: ThemePageProps) {
  if (!themeSystem) {
    return <NotFoundPage />;
  }

  const themeName = themeSystem.activedTheme;
  const themeData = themeSystem?.availableThemes?.[themeName];
  const PageComponent = getThemeComponent<
    ThemePageKey,
    SectionsByPage[typeof pageKey]
  >(THEMES_SERVER, themeName, pageKey, "theme");

  return PageComponent ? (
    <PageComponent
      props={{
        themeName,
        selectedPage: pageKey,
        pageConfig: themeData.pages?.[pageKey],
        currentConfigSections: themeData.pages?.[pageKey]?.config,
      }}
    />
  ) : (
    <NotFoundPage />
  );
}
