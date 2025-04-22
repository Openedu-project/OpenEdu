'use client';

import { useCreateOrUpdateThemeConfig, useGetTheme } from '@oe/api';
import type { ISystemConfigRes } from '@oe/api';
import { toast } from '@oe/ui';
import { Switch } from '@oe/ui';
import { Tooltip } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import type { ThemeSystem } from '../../_types/index';
import type { ThemeName } from '../../_types/theme-page';
import { updateGlobalTheme } from '../theme-settings/theme-global/_utils';

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
  const { theme, mutateTheme } = useGetTheme(themeSystemRes);
  const { createOrUpdateThemeConfig } = useCreateOrUpdateThemeConfig();

  //TODO: remove logic use the default_theme if the actived theme was undefined.
  const handleSetSelectedTheme = async (checked: boolean) => {
    if (!checked && selectedTheme === themeName) {
      toast.error(translate('notPrevTheme'));
      return;
    }
    if (!(checked || selectedTheme)) {
      toast.error(translate('notPrevTheme'));
      return;
    }

    if (!theme?.[0]?.value?.availableThemes) {
      toast.error(translate('notPrevTheme'));
      return;
    }

    const activedTheme = (checked ? themeName : selectedTheme) as ThemeName;
    try {
      const currentThemeSystem: ThemeSystem = {
        activedTheme: activedTheme,
        availableThemes: theme?.[0]?.value?.availableThemes,
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
      const newTheme = (await mutateTheme()) as ISystemConfigRes<ThemeSystem>[];
      // Apply the new theme globals
      newTheme?.[0]?.value?.availableThemes?.[activedTheme]?.globals &&
        updateGlobalTheme(newTheme?.[0]?.value?.availableThemes?.[activedTheme]?.globals);
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
