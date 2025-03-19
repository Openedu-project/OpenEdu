'use client';
import ThemeSidebar from '@oe/themes/_components/theme-sidebar/theme-sidebar-content';
import type { ThemeConfigKey, ThemeName, ThemeSystem } from '@oe/themes/types';
import { parseThemePath } from '@oe/themes/utils/function';
import { usePathname } from 'next/navigation';

const OutlineThemeSidebar = ({
  themeSystem,
}: {
  themeSystem?: ThemeSystem;
}) => {
  const pathName = usePathname();
  const currentParams = parseThemePath(pathName || '');
  const themeName = currentParams.themeName;

  if (!pathName) {
    return;
  }

  return (
    <ThemeSidebar
      themeSystem={themeSystem}
      themeName={themeName as ThemeName}
      configKey={currentParams.themeConfig as ThemeConfigKey}
      groupKey={currentParams?.itemSettingKey ? currentParams?.groupSettingKey : undefined}
      activedSidbarKey={currentParams.itemSettingKey || currentParams.groupSettingKey}
    />
  );
};
export default OutlineThemeSidebar;
