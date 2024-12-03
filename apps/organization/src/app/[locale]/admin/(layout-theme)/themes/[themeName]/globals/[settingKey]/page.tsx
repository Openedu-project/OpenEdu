'use client';

import { useGetTheme } from '@oe/api/hooks/useTheme';
import { createOrUpdateThemeConfig } from '@oe/api/services/theme';
import { initialThemeGlobal } from '@oe/themes';
import { ThemeSettingGlobal } from '@oe/themes/_components/theme-settings/index';
import type {
  ThemeCollection,
  ThemeGlobal,
  ThemeName,
  ThemeSidebarGlobalKey,
  ThemeSystem,
} from '@oe/themes/types/index';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function GlobalThemeSetting() {
  const translate = useTranslations('themeNoti');
  const { settingKey, themeName } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useGetTheme();

  const currentTheme = theme?.[0]?.value;
  const themeDefinition = currentTheme?.availableThemes?.[themeName as ThemeName];

  const updateThemeSystem = (themeGlobal: ThemeGlobal): ThemeSystem => ({
    activedTheme: themeName as ThemeName,
    availableThemes: {
      ...currentTheme?.availableThemes,
      [themeName as ThemeName]: {
        ...themeDefinition,
        globals: themeGlobal,
      },
    } as ThemeCollection,
  });

  const handleSubmitThemeGlobal = async (themeGlobal: ThemeGlobal) => {
    if (!themeDefinition) {
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedSystem = updateThemeSystem(themeGlobal);
      const response = await createOrUpdateThemeConfig({
        config: updatedSystem,
      });

      if (!response) {
        throw new Error('Failed to update theme config');
      }

      toast.success(translate('global.success'));
    } catch (error) {
      toast.error(translate('global.error'));
      console.error('Theme update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!themeDefinition) {
    return null;
  }

  return (
    <ThemeSettingGlobal
      isLoading={isSubmitting}
      settingKey={settingKey as ThemeSidebarGlobalKey}
      themeGlobalData={themeDefinition.globals || initialThemeGlobal}
      onSubmit={handleSubmitThemeGlobal}
    />
  );
}
