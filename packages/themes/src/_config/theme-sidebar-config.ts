import { createAPIUrl } from '@oe/api/utils/fetch';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';

import type {
  AllGroupSidebarKeys,
  AllSidebarKeys,
  GroupMenuItem,
  SimpleMenuItem,
  TThemeMenuDefinition,
  ThemeConfigKey,
  ThemeFeaturedContentKey,
  ThemeName,
  ThemePageKey,
  ThemeSidebarGlobalKey,
} from '../_types/index';

const MENU_STRUCTURE = {
  THEME_SETTINGS: [
    { key: 'colors', label: 'Color' },
    { key: 'fonts', label: 'Font' },
    { key: 'radius', label: 'Radius' },
  ],
  LAYOUT_COMPONENTS: [
    { key: 'header', label: 'Header' },
    { key: 'footer', label: 'Footer' },
    { key: 'navigation', label: 'Navigation' },
  ],
  COMMON_COMPONENTS: [
    { key: 'button', label: 'Button' },
    { key: 'card', label: 'Card' },
    { key: 'form', label: 'Form' },
    { key: 'table', label: 'Table' },
  ],
  METADATA: [
    { key: 'metadata', label: 'Metadata Settings' },
    { key: 'analytics', label: 'Analytics Integration' },
  ],
  PAGES: [
    { key: 'auth' as ThemePageKey, label: 'Auth / Layout' },
    { key: 'homepage' as ThemePageKey, label: 'Homepage' },
    { key: 'about-us' as ThemePageKey, label: 'About Us' },
    { key: 'partners' as ThemePageKey, label: 'Partners' },
  ],
  FEATURES_POPULAR: [{ key: 'course', label: 'Course' }],
} as const;

// Utility function to generate paths
const generatePath = (
  themeName: ThemeName,
  configKey: ThemeConfigKey,
  pageKey?: ThemePageKey | ThemeFeaturedContentKey,
  settingKey?: AllSidebarKeys
): string => {
  const baseUrl = createAPIUrl({ endpoint: ADMIN_ROUTES.themeDetail, params: { themeName } });
  return [baseUrl, configKey, pageKey, settingKey].filter(Boolean).join('/');
};

const createMenuItem = (key: AllSidebarKeys, label: string, href: string): SimpleMenuItem<AllSidebarKeys> => ({
  type: 'item',
  key,
  label,
  href,
  items: [],
});

const createGroupMenuItem = <T extends AllGroupSidebarKeys>(
  key: T,
  label: string,
  items: SimpleMenuItem<AllSidebarKeys>[]
): GroupMenuItem<T, AllSidebarKeys> => ({
  type: 'group',
  key,
  label,
  items,
});

const createPageSections = (
  themeName: ThemeName,
  pageKey: ThemePageKey,
  label: string
): GroupMenuItem<ThemePageKey, AllSidebarKeys>[] => [
  createGroupMenuItem(
    pageKey,
    label,
    pageKey === 'auth'
      ? [createMenuItem('theme', 'Theme', generatePath(themeName, 'pages', pageKey))]
      : [
          createMenuItem('theme', 'Theme', generatePath(themeName, 'pages', pageKey)),
          createMenuItem('metadata', 'Metadata', generatePath(themeName, 'pages', pageKey, 'metadata')),
        ]
  ),
];

// Export functions with improved type safety
export const getGlobalThemeMenu = (themeName: ThemeName): SimpleMenuItem<ThemeSidebarGlobalKey>[] =>
  MENU_STRUCTURE.THEME_SETTINGS.map(({ key, label }) =>
    createMenuItem(
      key as ThemeSidebarGlobalKey,
      label,
      generatePath(themeName, 'globals', undefined, key as AllSidebarKeys)
    )
  );

export const getComponentsMenu = (themeName: ThemeName): TThemeMenuDefinition<AllGroupSidebarKeys, AllSidebarKeys> => [
  createGroupMenuItem(
    'layout-components',
    'Layout',
    MENU_STRUCTURE.LAYOUT_COMPONENTS.map(({ key, label }) =>
      createMenuItem(
        key as AllSidebarKeys,
        label,
        generatePath(themeName, 'components', undefined, key as AllSidebarKeys)
      )
    )
  ),
  createGroupMenuItem(
    'common-components',
    'Common Components',
    MENU_STRUCTURE.COMMON_COMPONENTS.map(({ key, label }) =>
      createMenuItem(
        key as AllSidebarKeys,
        label,
        generatePath(themeName, 'components', undefined, key as AllSidebarKeys)
      )
    )
  ),
];

export const getFeaturesMenu = (themeName: ThemeName): TThemeMenuDefinition<AllGroupSidebarKeys, AllSidebarKeys> => [
  createGroupMenuItem(
    'features-popular',
    'Popular',
    MENU_STRUCTURE.FEATURES_POPULAR.map(({ key, label }) =>
      createMenuItem(
        key as AllSidebarKeys,
        label,
        generatePath(themeName, 'features', 'popular', key as AllSidebarKeys)
      )
    )
  ),
];

export const getMetadataMenu = (themeName: ThemeName): TThemeMenuDefinition<AllGroupSidebarKeys, AllSidebarKeys> =>
  MENU_STRUCTURE.METADATA.map(({ key, label }) =>
    createMenuItem(
      key as ThemeSidebarGlobalKey,
      label,
      generatePath(themeName, 'metadata', undefined, key as AllSidebarKeys)
    )
  );

export const getPagesMenu = (themeName: ThemeName) =>
  MENU_STRUCTURE.PAGES.flatMap(({ key, label }) => createPageSections(themeName, key, label));
