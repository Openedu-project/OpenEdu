import { THEMES_SERVER, defaultThemeSystemConfig } from '@oe/themes';
import type { SectionsByPage, ThemePageKey, ThemeSystem } from '@oe/themes/types/index';
import { getTranslations } from 'next-intl/server';
import { getThemeComponent } from '../../_utils/function';

interface ThemePageProps {
  pageKey: ThemePageKey;
  themeSystem: ThemeSystem;
}

export default async function ThemeWebPage({ pageKey, themeSystem }: ThemePageProps) {
  const t = await getTranslations('themePage');
  if (!themeSystem) {
    return null;
  }

  const themeName = 'vbi';
  // const themeName = themeSystem.activedTheme;
  // const themeData = themeSystem?.availableThemes?.[themeName];
  const PageComponent = getThemeComponent<ThemePageKey, SectionsByPage[typeof pageKey]>(
    THEMES_SERVER,
    themeName,
    pageKey,
    'theme'
  );
  if (!PageComponent) {
    return null;
  }

  return (
    <PageComponent
      props={{
        themeName,
        selectedPage: pageKey,
        // pageConfig: themeData.pages?.[pageKey],
        // currentConfigSections: themeData.pages?.[pageKey].config,
        pageConfig: defaultThemeSystemConfig(t)?.availableThemes?.vbi?.pages?.[pageKey],
        currentConfigSections: defaultThemeSystemConfig(t)?.availableThemes?.vbi?.pages?.[pageKey].config,
      }}
    />
  );
}
