'use client';
import { useGetTheme } from '@oe/api/hooks/useTheme';
import { createOrUpdateThemeConfig } from '@oe/api/services/theme';
import type { ISystemConfigRes } from '@oe/api/types/system-config';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { defaultThemeSystemConfig } from '../../_config/initial';
import type { ThemeName, ThemeSystem } from '../../_types';
import { ThemeTemplatesModal } from './theme-templates-modal';

interface CloneNewThemeModalModal {
  themeSystemRes?: ISystemConfigRes<ThemeSystem>[];
}

const CloneNewTheme = ({ themeSystemRes }: CloneNewThemeModalModal) => {
  const tThemeConfig = useTranslations('themePage');
  const t = useTranslations('themeList');
  const initialData = defaultThemeSystemConfig(tThemeConfig);

  const [open, setOpen] = useState(false);
  const { theme, mutateTheme } = useGetTheme(themeSystemRes);

  const alreadyClonedThemes = theme?.[0]?.value?.availableThemes
    ? (Object.keys(theme?.[0]?.value?.availableThemes) as ThemeName[])
    : undefined;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(
    (themeNames: ThemeName[]) => {
      handleNewThemeCloned(themeNames);
      handleClose();
    },
    [handleClose]
  );

  const handleNewThemeCloned = useCallback(
    async (themeNames: ThemeName[]) => {
      const configId = theme?.[0]?.id;
      const currentAvailableThemes = theme?.[0]?.value?.availableThemes || {};

      let clonedThemes = {};

      for (const name of themeNames) {
        if (initialData.availableThemes?.[name]) {
          clonedThemes = {
            ...clonedThemes,
            [name]: initialData.availableThemes[name],
          };
        }
      }

      if (Object.keys(clonedThemes)?.length > 0) {
        const mergedThemes = {
          ...currentAvailableThemes, // Existing themes come first
          ...clonedThemes, // New themes override existing ones if names conflict
        };

        const data: ThemeSystem = {
          activedTheme: theme?.[0]?.value?.activedTheme as ThemeName | undefined,
          availableThemes: mergedThemes,
        };

        try {
          const res = await createOrUpdateThemeConfig({
            config: data,
            id: configId,
          });
          if (!res) {
            toast.error(t('cloneFail'));
            return;
          }
          toast.success(t('cloneSuccess'));
          await mutateTheme();
        } catch (error) {
          console.error(error);
        }
      }
    },
    [theme, initialData?.availableThemes, t, mutateTheme]
  );

  return (
    <>
      <Button onClick={() => setOpen(true)} leftSection={<Plus className="h-4 w-4" />}>
        {t('addNewTheme')}
      </Button>
      {open && (
        <ThemeTemplatesModal
          alreadyClonedThemes={alreadyClonedThemes}
          countAlreadyClonedThemes={alreadyClonedThemes?.length ?? 0}
          countSystemTemplates={Object.keys(initialData.availableThemes)?.length ?? 0}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

CloneNewTheme.displayName = 'CloneNewTheme';
export { CloneNewTheme };
