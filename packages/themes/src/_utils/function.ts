import type { NestedObject } from '@oe/core/utils/object';
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
  ThemeFieldConfig,
  ThemeFieldValue,
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
): ComponentType<SectionProps<Page, Section>> | undefined {
  const pageConfig = themeRenderData[themeName][pageKey];

  if (!pageConfig) {
    // throw new Error(`No configuration found for theme ${themeName} and page ${pageKey}`);
    return undefined;
  }

  // Type assertion to handle the indexing
  const sectionComponent = (pageConfig as Record<Section, ComponentType<SectionProps<Page, Section>>>)[sectionKey];
  const defaultComponent = pageConfig.theme as ComponentType<SectionProps<Page, Section>>;

  return sectionComponent || defaultComponent;
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
    groupSettingKey: segments[themesIndex + 4] ? (segments[themesIndex + 3] as AllGroupSidebarKeys) : undefined,
    itemSettingKey: (segments[themesIndex + 4] as AllSidebarKeys) || (segments[themesIndex + 3] as AllSidebarKeys),
  };
}

type DeepPartial<T> = T extends NestedObject
  ? {
      [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    }
  : T;

export function deepMergeByPath<T extends NestedObject>(target: T, source: NestedObject, path: string[]): T {
  if (path.length === 0) {
    return target;
  }

  const result = structuredClone(target);
  let current: NestedObject = result;
  const lastIndex = path.length - 1;

  for (let i = 0; i < lastIndex; i++) {
    const key = path[i];
    if (key) {
      if (!(key in current)) {
        return result;
      }
      const nextLevel = current[key];
      if (isObject(nextLevel)) {
        current = nextLevel;
      } else {
        return result;
      }
    }
  }

  const lastKey = path[lastIndex];

  if (lastKey && lastKey in current && isObject(current[lastKey]) && isObject(source)) {
    current[lastKey] = deepMerge(current[lastKey], source);
  }

  return result;
}

function isObject(value: unknown): value is NestedObject {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function deepMerge<T extends NestedObject>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (key in source) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue as DeepPartial<typeof targetValue>);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as T[typeof key];
      }
    }
  }

  return result;
}

export const convertValueAndPathToConfig = (
  prev: ThemeFieldConfig,
  path: string[],
  value: ThemeFieldValue | ThemeFieldConfig
) => {
  const newValues = { ...prev };
  let current = newValues;

  // Filter out any undefined or empty path segments
  const validPath = path.filter((segment): segment is string => segment !== undefined && segment !== '');

  for (let i = 0; i < validPath.length - 1; i++) {
    const key = validPath[i];
    if (key && typeof key === 'string') {
      if (!current[key]) {
        current[key] = Array.isArray(value) ? [] : {};
      }
      current = current[key] as ThemeFieldConfig;
    }
  }

  const lastKey = validPath[validPath.length - 1];
  if (lastKey) {
    current[lastKey] = value;
  }

  return newValues;
};
