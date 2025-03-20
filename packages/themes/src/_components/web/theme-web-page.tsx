import { THEMES_SERVER } from '@oe/themes';
import type { SectionsByPage, ThemePageKey, ThemeSystem } from '@oe/themes/types';
import { NotFoundPage } from '@oe/ui/common/pages';
import { getThemeComponent } from '../../_utils/function';

interface ThemePageProps {
  pageKey: ThemePageKey;
  themeSystem: ThemeSystem;
}

export default function ThemeWebPage({ pageKey, themeSystem }: ThemePageProps) {
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
