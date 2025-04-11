// theme-web-page.tsx
import { NotFoundPage } from '@oe/ui';
import { getTranslations } from 'next-intl/server';
import type { PageSectionConfigs, PagesConfig, SectionsByPage, ThemeName, ThemePageKey } from '#types';

interface ThemePageProps {
  pageConfig?: PagesConfig<ThemePageKey>;
  themeName: ThemeName;
  selectedPage: ThemePageKey;
  stateConfigSections?: PageSectionConfigs<ThemePageKey>;
  currentConfigSections?: PageSectionConfigs<ThemePageKey>;
}

type ThemeImportMap = {
  [Name in ThemeName]?: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [P in keyof SectionsByPage]?: () => Promise<any>;
  };
};

//TODO: define type
const THEME_IMPORTS: ThemeImportMap = {
  scholar: {
    homepage: () =>
      import('../../scholar/homepage/index').then(mod => ({
        default: mod.ScholarHomepage,
      })),
  },
  vbi: {
    homepage: () =>
      import('../../vbi/homepage/index').then(mod => ({
        default: mod.VbiHomepage,
      })),
    'about-us': () =>
      import('../../vbi/about-us/index').then(mod => ({
        default: mod.VbiAboutUs,
      })),
    partners: () =>
      import('../../vbi/partners/index').then(mod => ({
        default: mod.VbiPartners,
      })),
  },
  academia: {
    homepage: () =>
      import('../../academia/homepage/index').then(mod => ({
        default: mod.AcademiaHomepage,
      })),
  },
  avail: {
    homepage: () =>
      import('../../avail/homepage/index').then(mod => ({
        default: mod.AvailHomepage,
      })),
  },
  fenet: {
    homepage: () =>
      import('../../fenet/homepage/index').then(mod => ({
        default: mod.FenetHomepage,
      })),
  },
};

export async function ThemeWebPage({
  themeName,
  selectedPage,
  pageConfig,
}: // currentConfigSections,
// stateConfigSections,
ThemePageProps) {
  // if (!themeSystem) {
  //   return <NotFoundPage />;
  // }

  // if (!themeSystem?.activedTheme) {
  //   return <div>Please select theme at admin</div>;
  // }

  // const themeName = themeSystem.activedTheme;
  // const themeData = themeSystem.availableThemes?.[themeName];

  // if (!themeData) {
  //   return <div>No data</div>;
  // }

  // Get the correct path from the SERVER_THEME_PATHS
  // const importPath = SERVER_THEME_PATHS[themeName]?.[pageKey]?.theme;
  const t = await getTranslations('themeWebPage');
  const importFunction = THEME_IMPORTS?.[themeName]?.[selectedPage];

  if (!importFunction) {
    console.error(`No theme component path found for ${themeName}/${selectedPage}`);
    return <NotFoundPage />;
  }

  try {
    const { default: PageComponent } = await importFunction();

    if (!PageComponent) {
      return <NotFoundPage />;
    }

    return (
      pageConfig && (
        <PageComponent
          props={{
            themeName,
            selectedPage: selectedPage,
            pageConfig: pageConfig,
            currentConfigSections: pageConfig?.[selectedPage]?.config,
          }}
        />
      )
    );
  } catch (error) {
    console.error(`Failed to load theme component for ${themeName}/${selectedPage}:`, error);
    return (
      <div className="rounded bg-red-100 p-4 text-red-800">
        <h2 className="font-bold text-lg">{t('error')}</h2>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}
