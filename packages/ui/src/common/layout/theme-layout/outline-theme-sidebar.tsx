'use client';

import ThemeSidebar from '@oe/themes/_components/theme-sidebar/theme-sidebar-content';
import type { AllSidebarKeys, ThemeConfigKey, ThemeName, ThemePageKey } from '@oe/themes/types/index';
import { usePathname } from 'next/navigation';
import { parseThemePath } from './_utils/functions';

const OutlineThemeSidebar = () => {
  const pathName = usePathname();
  const currentParams = parseThemePath(pathName || '');

  if (!pathName) {
    return;
  }
  return (
    <ThemeSidebar
      themeName={currentParams.themeName as ThemeName}
      configKey={currentParams.themeConfig as ThemeConfigKey}
      pageKey={currentParams.themeConfig === 'pages' ? (currentParams.groupSettingKey as ThemePageKey) : undefined}
      activedSidbarKey={
        (currentParams.themeConfig === 'pages'
          ? currentParams.itemSettingKey || 'theme'
          : currentParams.itemSettingKey || currentParams.groupSettingKey) as AllSidebarKeys
      }
    />
  );
};
export default OutlineThemeSidebar;
