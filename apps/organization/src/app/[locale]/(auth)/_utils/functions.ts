import type { AllSectionKeys, ThemeSystem } from '@oe/themes';
import type { FileType } from '@oe/ui';

export const getBannerByPageKey = (authPageKey: AllSectionKeys, themeSystem?: ThemeSystem) => {
  const themeName = themeSystem?.activedTheme;
  if (!themeName) {
    return undefined;
  }

  return themeSystem?.availableThemes?.[themeName]?.pages?.auth?.config?.[authPageKey]?.props?.banner as FileType;
};
