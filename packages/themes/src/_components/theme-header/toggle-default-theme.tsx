'use client';

import { useGetTheme } from '@oe/api/hooks/useTheme';
import { createOrUpdateThemeConfig } from '@oe/api/services/theme';
import type { ISystemConfigRes } from '@oe/api/types/system-config';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { Tooltip } from '@oe/ui/shadcn/tooltip';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import type { ThemeSystem } from '../../_types/index';
import type { ThemeName } from '../../_types/theme-page';
import { DEFAULT_THEME } from '../../_utils/constants';

const ToggleDefaultTheme = ({
  selectedTheme,
  themeSystemRes,
  id,
}: {
  selectedTheme?: ThemeName;
  themeSystemRes?: ISystemConfigRes<ThemeSystem>[];
  id?: string;
}) => {
  const { themeName } = useParams();
  const [checked, setChecked] = useState(themeName === selectedTheme);
  const translate = useTranslations('themeHeader');
  const { mutateTheme } = useGetTheme(themeSystemRes);
  //TODO: remove logic use the default_theme if the actived theme was undefined.
  const handleSetSelectedTheme = async (checked: boolean) => {
    if (!checked && DEFAULT_THEME === themeName) {
      toast.error(translate('notPrevTheme'));
      return;
    }
    if (!(checked || selectedTheme)) {
      toast.error(translate('notPrevTheme'));
      return;
    }

    if (!themeSystemRes?.[0]?.value?.availableThemes) {
      toast.error(translate('notPrevTheme'));
      return;
    }

    try {
      const currentThemeSystem: ThemeSystem = {
        activedTheme: (checked ? themeName : selectedTheme) as ThemeName,
        availableThemes: themeSystemRes?.[0]?.value?.availableThemes,
      };
      const res = await createOrUpdateThemeConfig({
        config: currentThemeSystem,
        id,
      });

      if (!res) {
        toast.error('error');
        return;
      }

      if (checked) {
        toast.success(translate('success'));
      } else {
        toast.warning(translate('disableSuccess'));
      }
      setChecked(checked);
      await mutateTheme();
    } catch {
      toast.error('error');
    }
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <Switch checked={checked} onCheckedChange={handleSetSelectedTheme} className="border border-background" />
      <Tooltip content={<p>{translate('tooltipActiveTheme')}</p>}>
        <p className="font-normal text-accent text-sm">{translate('activeTheme')}</p>
      </Tooltip>
    </div>
  );
};

export { ToggleDefaultTheme };
