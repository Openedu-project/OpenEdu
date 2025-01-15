import { THEMES } from '@oe/themes';
import type { SectionsByPage, ThemePageKey, ThemeSystem } from '@oe/themes/types/index';
import { getThemeComponent } from '../../_utils/function';

interface ThemePageProps {
  pageKey: ThemePageKey;
  themeSystem: ThemeSystem;
}

export default function ThemeWebPage({ pageKey, themeSystem }: ThemePageProps) {
  if (!themeSystem) {
    return null;
  }
  const themeName = themeSystem.activedTheme;
  const themeData = themeSystem?.availableThemes?.[themeName];
  const PageComponent = getThemeComponent<ThemePageKey, SectionsByPage[typeof pageKey]>(
    THEMES,
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
        pageConfig: themeData.pages?.[pageKey],
        currentConfigSections: themeData.pages?.[pageKey].config,
      }}
    />
  );
}
