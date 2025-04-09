'use client';

import { useCreateOrUpdateThemeConfig, useGetTheme } from '@oe/api/hooks/useTheme';
import { initialThemeGlobal } from '@oe/themes';
import { ThemeSettingGlobal } from '@oe/themes/components/theme-settings/index';
import type { ThemeCollection, ThemeGlobal, ThemeName, ThemeSidebarGlobalKey, ThemeSystem } from '@oe/themes/types';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function GlobalThemeSetting() {
  const translate = useTranslations('themeNoti');
  const { settingKey, themeName } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, mutateTheme } = useGetTheme();
  const { createOrUpdateThemeConfig } = useCreateOrUpdateThemeConfig();
  const currentTheme = theme?.[0]?.value;
  const themeDefinition = currentTheme?.availableThemes?.[themeName as ThemeName];

  const updateThemeSystem = useCallback(
    (themeGlobal: ThemeGlobal): ThemeSystem => ({
      activedTheme: themeName as ThemeName,
      availableThemes: {
        ...currentTheme?.availableThemes,
        [themeName as ThemeName]: {
          ...themeDefinition,
          globals: themeGlobal,
        },
      } as ThemeCollection,
    }),
    [currentTheme, themeDefinition, themeName]
  );

  const handleSubmitThemeGlobal = useCallback(
    async (themeGlobal: ThemeGlobal) => {
      setIsSubmitting(true);
      try {
        const updatedSystem = updateThemeSystem(themeGlobal);
        const response = await createOrUpdateThemeConfig({
          config: updatedSystem,
          id: theme?.[0]?.id,
        });

        if (!response) {
          throw new Error('Failed to update theme config');
        }

        toast.success(translate('global.success'));
        mutateTheme();
      } catch (error) {
        toast.error(translate('global.error'));
        console.error('Theme update error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [theme, updateThemeSystem, translate, mutateTheme, createOrUpdateThemeConfig]
  );

  return (
    <ThemeSettingGlobal
      isLoading={isSubmitting}
      settingKey={settingKey as ThemeSidebarGlobalKey}
      themeGlobalData={themeDefinition?.globals || initialThemeGlobal}
      onSubmit={handleSubmitThemeGlobal}
    />
  );
}
