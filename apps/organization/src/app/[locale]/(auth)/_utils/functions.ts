import type { AllSectionKeys, ThemeSystem } from '@oe/themes/types';
import type { FileType } from '@oe/ui/components/uploader';

export const getBannerByPageKey = (authPageKey: AllSectionKeys, themeSystem?: ThemeSystem) => {
  const themeName = themeSystem?.activedTheme;
  if (!themeName) {
    return undefined;
  }

  return themeSystem?.availableThemes?.[themeName]?.pages?.auth?.config?.[authPageKey]?.props?.banner as FileType;
};
