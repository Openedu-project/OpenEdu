'use client'
import ThemeSidebar from "@oe/themes/_components/theme-sidebar/theme-sidebar-content";
import type {
  ThemeConfigKey,
  ThemeName,
} from "@oe/themes/types/index";
import { parseThemePath } from "@oe/themes/utils/function";
import { usePathname } from "next/navigation";

const OutlineThemeSidebar = () => {
  const pathName = usePathname();
  const currentParams = parseThemePath(pathName || "");

  if (!pathName) {
    return;
  }
  
  return (
    <ThemeSidebar
      themeName={currentParams.themeName as ThemeName}
      configKey={currentParams.themeConfig as ThemeConfigKey}
      groupKey={currentParams?.itemSettingKey ? currentParams?.groupSettingKey:undefined}
      activedSidbarKey={currentParams.itemSettingKey || currentParams.groupSettingKey}
    />
  );
};
export default OutlineThemeSidebar;
