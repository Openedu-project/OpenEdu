import type { ComponentType } from 'react';
import type {
  AllGroupSidebarKeys,
  AllSectionKeys,
  AllSidebarKeys,
  GroupMenuItem,
  PageSectionConfig,
  SectionProps,
  SectionsByPage,
  ThemeCollection,
  ThemeConfigKey,
  ThemeName,
  ThemePageKey,
  ThemeParams,
  ThemeRender,
} from '../_types/index';

/* ====================================== */
/* THEME PAGE - RENDER CONTENT COMPONENT  */
/* ====================================== */
export function getThemeComponent<Page extends ThemePageKey, Section extends SectionsByPage[Page]>(
  themeRenderData: ThemeRender,
  themeName: ThemeName,
  pageKey: Page,
  sectionKey: Section
): ComponentType<SectionProps<Page, Section>> {
  const pageConfig = themeRenderData[themeName][pageKey];

  if (!pageConfig) {
    throw new Error(`No configuration found for theme ${themeName} and page ${pageKey}`);
  }

  // Type assertion to handle the indexing
  const sectionComponent = (pageConfig as Record<Section, ComponentType<SectionProps<Page, Section>>>)[sectionKey];
  const defaultComponent = pageConfig.theme as ComponentType<SectionProps<Page, Section>>;

  return sectionComponent || defaultComponent;
}

export function getAvailableSections<T extends ThemePageKey>(pageKey: T): SectionsByPage[T][] {
  const sectionMap: Record<ThemePageKey, readonly string[]> = {
    homepage: ['hero', 'features', 'testimonials', 'cta'] as const,
    'about-us': ['header', 'team', 'mission', 'contact'] as const,
    auth: ['login', 'signup'] as const,
  };

  return sectionMap[pageKey] as SectionsByPage[T][];
}

// Type guard to check if a section is valid for a page
export function isValidSection<T extends ThemePageKey>(pageKey: T, section: string): section is SectionsByPage[T] {
  return getAvailableSections(pageKey).includes(section as SectionsByPage[T]);
}

// create a section config
export function createSection<Page extends ThemePageKey, Section extends SectionsByPage[Page]>({
  props,
  order,
}: { props: SectionProps<Page, Section>; order: number }): PageSectionConfig<Page> {
  return {
    enable: true, // Default to true if not provided
    order,
    props,
  };
}

// get section config
export const getSectionConfig = (
  defaultThemeConfigs: ThemeCollection,
  selectedTheme: ThemeName,
  selectedPage: ThemePageKey,
  selectedSectionKey: AllSectionKeys
) => {
  const themeConfig = defaultThemeConfigs?.[selectedTheme].pages?.[selectedPage]?.config;
  const sectionConfig = themeConfig
    ? themeConfig?.[selectedSectionKey as SectionsByPage[typeof selectedPage]]
    : undefined;

  return sectionConfig;
};
/* ===================== */
/* THEME PAGE - SIDEBAR  */
/* ===================== */

export function createSectionItems<T extends AllSidebarKeys>(sections: T[], pageKey: string) {
  return sections.map(section => ({
    key: section,
    label: formatSectionLabel(section),
    href: `/pages/${pageKey}/${section}`,
    items: [],
  }));
}

export function formatSectionLabel(section: string): string {
  return section
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper to create page sections configuration
export function createSectionsByPage<T extends AllSidebarKeys>(
  sections: T[],
  pageKey: ThemePageKey,
  groupLabel: string
): GroupMenuItem<ThemePageKey, AllSidebarKeys>[] {
  return [
    {
      type: 'group' as const,
      key: pageKey,
      label: groupLabel,
      items: createSectionItems<AllSidebarKeys>(sections, pageKey),
    },
  ];
}

export const getHSLPreview = (hslString: string) => {
  if (!hslString.includes(' ')) {
    return '';
  }
  return `hsl(${hslString})`;
};

export function findUniqueItems<T>(array1: T[], array2: T[]): T[] {
  const symmetricDifference = [...array1.filter(x => !array2.includes(x)), ...array2.filter(x => !array1.includes(x))];
  return [...new Set(symmetricDifference)];
}

export function parseThemePath(pathname: string): ThemeParams {
  // Remove leading and trailing slashes
  const cleanPath = pathname.replace(/^\/|\/$/g, '');

  // Split the path into segments
  const segments = cleanPath.split('/');

  // Find the index of 'themes' to ensure we're parsing from the correct position
  const themesIndex = segments.findIndex(segment => segment === 'themes');

  // Return empty object if we don't find 'themes' in the path
  if (themesIndex === -1) {
    return {};
  }

  return {
    themeName: segments[themesIndex + 1] as ThemeName,
    themeConfig: segments[themesIndex + 2] as ThemeConfigKey,
    groupSettingKey: segments[themesIndex + 3] as AllGroupSidebarKeys | AllSidebarKeys,
    itemSettingKey: segments[themesIndex + 4] as AllSidebarKeys,
  };
}
