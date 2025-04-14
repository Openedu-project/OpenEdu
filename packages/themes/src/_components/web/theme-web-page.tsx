import { NotFoundPage } from '@oe/ui';
import type { SectionsByPage, ThemePageKey, ThemeSystem } from '#types';
import { getThemeComponent } from '../../_utils/function';
import { THEMES_SERVER } from '../../index';

interface ThemePageProps {
  pageKey: ThemePageKey;
  themeSystem: ThemeSystem;
}

export function ThemeWebPage({ pageKey, themeSystem }: ThemePageProps) {
  if (!themeSystem) {
    return <NotFoundPage />;
  }

  if (!themeSystem?.activedTheme) {
    return <div>Please select theme at admin</div>;
  }

  const themeName = themeSystem.activedTheme;
  const themeData = themeSystem.availableThemes?.[themeName];

  if (!themeData) {
    return <div>No data</div>;
  }

  const PageComponent = getThemeComponent<ThemePageKey, SectionsByPage[typeof pageKey]>(
    THEMES_SERVER,
    themeName,
    pageKey,
    'theme'
  );

  if (!PageComponent) {
    return <NotFoundPage />;
  }

  return (
    <PageComponent
      props={{
        themeName,
        selectedPage: pageKey,
        pageConfig: themeData.pages?.[pageKey],
        currentConfigSections: themeData.pages?.[pageKey]?.config,
      }}
    />
  );
}
