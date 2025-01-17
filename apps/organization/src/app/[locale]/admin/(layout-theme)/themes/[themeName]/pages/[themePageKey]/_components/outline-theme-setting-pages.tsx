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
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface OutlineThemeSettingPagesProps {
  selectedSidebarPageKey: ThemeSidebarPageKey;
}

const OutlineThemeSettingPages = ({ selectedSidebarPageKey }: OutlineThemeSettingPagesProps) => {
  const { themeName, themePageKey } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useGetTheme();
  const t = useTranslations('themePageSettings');

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
      const res = await createOrUpdateThemeConfig({
        config: currentThemeSystem,
        id: theme?.[0]?.id,
      });
      if (res) {
        setIsLoading(false);
        toast.success(t('updateSuccess'));
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(t('updateFaile'));
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
