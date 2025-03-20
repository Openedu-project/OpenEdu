'use client';
import { useGetTheme } from '@oe/api/hooks/useTheme';
import { createOrUpdateThemeConfig } from '@oe/api/services/theme';
import type { ISystemConfigRes } from '@oe/api/types/system-config';
import type { ThemeName } from '@oe/themes/types';
import { ScrollArea } from '@oe/ui/shadcn/scroll-area';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { ThemeSystem } from '../../_types';
import { ThemeCard } from './theme-card';

interface ThemeListProps {
  themeSystemRes?: ISystemConfigRes<ThemeSystem>[];
}

export default function ThemeList({ themeSystemRes }: ThemeListProps) {
  const { theme, mutateTheme } = useGetTheme(themeSystemRes);
  const t = useTranslations('themeList');

  const handleRemove = async (name: ThemeName) => {
    const configId = theme?.[0]?.id;
    const currentAvailableThemes = theme?.[0]?.value?.availableThemes || {};

    // Check if theme exists before attempting to delete
    if (!currentAvailableThemes?.[name]) {
      toast.error(t('delInvalid'));
      return;
    }

    // Create a new object without the specified theme
    delete currentAvailableThemes?.[name];

    const data: ThemeSystem = {
      activedTheme: theme?.[0]?.value?.activedTheme as ThemeName | undefined,
      availableThemes: currentAvailableThemes,
    };

    try {
      const res = await createOrUpdateThemeConfig({
        config: data,
        id: configId,
      });
      if (!res) {
        toast.error(t('delFail'));
        return;
      }
      toast.success(t('delSuccess'));
      await mutateTheme();
    } catch (error) {
      console.error(error);
    }
  };

  // Sort to put active theme first
  const sortedThemes = useMemo(() => {
    const availableThemes = theme?.[0]?.value?.availableThemes;
    const activeTheme = theme?.[0]?.value?.activedTheme;

    if (!availableThemes) {
      return [];
    }

    // Convert to array of [key, value] pairs
    const themeEntries = Object.entries(availableThemes);

    // Move active theme to first
    return themeEntries.sort(([key1], [key2]) => {
      if (key1 === activeTheme) {
        return -1;
      }
      if (key2 === activeTheme) {
        return 1;
      }
      return 0;
    });
  }, [theme]);

  return (
    <ScrollArea>
      <div className="flex-1 space-y-4 rounded bg-background p-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedThemes?.map(([key, value]) => (
            <ThemeCard
              key={key}
              name={key as ThemeName}
              theme={value?.info || { name: key }}
              isActived={theme?.[0]?.value?.activedTheme === key}
              variant="my-theme"
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
