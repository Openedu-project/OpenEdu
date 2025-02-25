import ThemeList from "@oe/themes/_components/theme-list/theme-list";
import type { ThemeName } from "@oe/themes/types/theme-page/index";
import type { ThemeSystem } from "@oe/themes/types/theme-system-config";

export default function ThemeListPage({
  themeSystem,
}: {
  themeSystem?: ThemeSystem;
}) {
  return (
    <>
      <ThemeList
        userThemeList={
          themeSystem?.availableThemes
            ? (Object.keys(themeSystem?.availableThemes) as ThemeName[])
            : undefined
        }
        currentActiveTheme={themeSystem?.activedTheme}
      />
    </>
  );
}
