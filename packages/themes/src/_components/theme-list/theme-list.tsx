'use client';
import { useGetTheme } from '@oe/api/hooks/useTheme';
import { createOrUpdateThemeConfig } from '@oe/api/services/theme';
import type { ISystemConfigRes } from '@oe/api/types/system-config';
import type { ThemeName } from '@oe/themes/types/theme-page/index';
import { ScrollArea } from '@oe/ui/shadcn/scroll-area';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
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

    // Remove item from object by key
    if (!currentAvailableThemes?.[name]) {
      toast.error(t('delInvalid'));
      return;
    }
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
  return (
    <ScrollArea>
      <div className="flex-1 space-y-4 rounded bg-background p-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(theme?.[0]?.value?.availableThemes ? Object.entries(theme?.[0]?.value?.availableThemes) : undefined)?.map(
            ([key, value]) => (
              <ThemeCard
                key={key}
                name={key as ThemeName}
                theme={value?.info || { name: key }}
                isActived={theme?.[0]?.value?.activedTheme === key}
                variant="my-theme"
                onRemove={handleRemove}
              />
            )
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
