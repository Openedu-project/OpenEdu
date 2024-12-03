'use client';
import { useGetTheme } from '@oe/api/hooks/useTheme';
import { createOrUpdateThemeConfig } from '@oe/api/services/theme';
import { ThemeSettingPages } from '@oe/themes/_components/theme-settings/index';
import type {
  ThemeCollection,
  ThemeDefinition,
  ThemeName,
  ThemePageKey,
  ThemeSidebarPageKey,
  ThemeSystem,
} from '@oe/themes/types/index';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface OutlineThemeSettingPagesProps {
  selectedSidebarPageKey: ThemeSidebarPageKey;
}

const OutlineThemeSettingPages = ({ selectedSidebarPageKey }: OutlineThemeSettingPagesProps) => {
  const { themeName, themePageKey } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useGetTheme();
  if (!theme?.[0]?.value?.availableThemes?.[themeName as ThemeName]) {
    return;
  }

  if (!(themeName && themePageKey)) {
    return;
  }

  const handleSubmit = async (specificTheme: ThemeDefinition) => {
    const currentThemeSystem: ThemeSystem = {
      activedTheme: themeName as ThemeName,
      availableThemes: {
        ...theme[0]?.value?.availableThemes,
        [themeName as ThemeName]: specificTheme,
      } as ThemeCollection,
    };

    try {
      setIsLoading(true);
      console.log(currentThemeSystem);
      const res = await createOrUpdateThemeConfig({ config: currentThemeSystem });
      // console.log(res);
      if (res) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ThemeSettingPages
        isLoading={isLoading}
        themeConfig={theme[0].value?.availableThemes?.[themeName as ThemeName]}
        themeName={themeName as ThemeName}
        selectedPage={themePageKey as ThemePageKey}
        selectedSidebarPageKey={selectedSidebarPageKey}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export { OutlineThemeSettingPages };
