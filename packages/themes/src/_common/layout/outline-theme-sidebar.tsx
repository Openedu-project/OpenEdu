"use client";
import { usePathname } from "next/navigation";
import type { ThemeConfigKey, ThemeName, ThemeSystem } from "#types";
import { ThemeSidebar } from "../../_components/theme-sidebar/theme-sidebar-content";
import { parseThemePath } from "../../_utils/function";

const OutlineThemeSidebar = ({
  themeSystem,
}: {
  themeSystem?: ThemeSystem;
}) => {
  const pathName = usePathname();
  const currentParams = parseThemePath(pathName || "");
  const themeName = currentParams.themeName;

  if (!pathName) {
    return;
  }

  return (
    <ThemeSidebar
      themeSystem={themeSystem}
      themeName={themeName as ThemeName}
      configKey={currentParams.themeConfig as ThemeConfigKey}
      groupKey={
        currentParams?.itemSettingKey
          ? currentParams?.groupSettingKey
          : undefined
      }
      activedSidbarKey={
        currentParams.itemSettingKey || currentParams.groupSettingKey
      }
    />
  );
};
export { OutlineThemeSidebar };
