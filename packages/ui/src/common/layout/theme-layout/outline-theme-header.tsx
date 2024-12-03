'use client';

import ThemeHeaderContent from '@oe/themes/_components/theme-header/theme-header-content';
import { usePathname } from 'next/navigation';
import { parseThemePath } from './_utils/functions';

export default function OutlineThemeHeader() {
  const pathName = usePathname();
  const currentParams = parseThemePath(pathName || '');

  if (!currentParams?.themeConfig) {
    return;
  }
  return <ThemeHeaderContent configKey={currentParams?.themeConfig} />;
}
