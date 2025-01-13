'use client';
import { createOrUpdateThemeConfig } from '@oe/api/services/theme';
import { defaultThemeSystemConfig } from '@oe/themes';
import ThemeList from '@oe/themes/_components/theme-list/theme-list';
import type { ThemeName } from '@oe/themes/types/theme-page';
import type { ThemeSystem } from '@oe/themes/types/theme-system-config';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';

export default function ThemeListPage({ themeSystem }: { themeSystem?: ThemeSystem }) {
  const tThemeConfig = useTranslations('themePage');

  const handleCreateNewTheme = async () => {
    const initialData = defaultThemeSystemConfig(tThemeConfig);
    try {
      const res = await createOrUpdateThemeConfig({ config: initialData });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {themeSystem && (
        <ThemeList
          themesData={Object.keys(themeSystem.availableThemes) as ThemeName[]}
          // themesData={['academia','scholar','vbi']}
          selectedTheme={themeSystem.activedTheme}
        />
      )}

      <Button onClick={handleCreateNewTheme} className="mt-4 w-fit">
        Create new Theme
      </Button>
    </>
  );
}
