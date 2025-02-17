import type { ThemePageKey } from './theme-page';

/* Sidebar keys */
export type ThemeSidebarPageKey = 'theme' | 'metadata'; // sidebar - item key of each group
export type ThemeSidebarGlobalKey = 'fonts' | 'colors' | 'radius';
export type ThemeSidebarComponentKey = 'header' | 'footer' | 'card' | 'button' | 'navigation' | 'form' | 'table';
export type ThemeSibarMetadataKey = 'metadata' | 'analytics';
export type ThemeSidebarPopularKey = 'course' | 'blog';
export type AllSidebarKeys =
  | ThemeSidebarPageKey
  | ThemeSidebarGlobalKey
  | ThemeSidebarComponentKey
  | ThemeSibarMetadataKey
  | ThemeSidebarPopularKey;
export type AllGroupSidebarKeys =
  | ThemeGroupSidebarComponentKey
  | ThemeGroupSidebarPageKey
  | ThemeGroupSidebarFeaturesKey;

// export type ThemeGroupSidebarGlobalKey // No group
export type ThemeGroupSidebarPageKey = ThemePageKey;
export type ThemeGroupSidebarComponentKey = 'layout-components' | 'common-components';
export type ThemeGroupSidebarFeaturesKey = 'popular';
// export type ThemeGroupSidebarMetadataKey // No group

/** SIDEBAR - PAGE SECTION */
export interface MenuItem<K extends AllSidebarKeys> {
  key: AllSidebarKeys;
  label: string;
  href: string;
  items: MenuItem<K>[];
}

export interface MenuGroup<T extends AllGroupSidebarKeys, K extends AllSidebarKeys> {
  key: T;
  label: string;
  items: MenuItem<K>[];
}

export interface SimpleMenuItem<K extends AllSidebarKeys> extends MenuItem<K> {
  type: 'item';
}

export interface GroupMenuItem<T extends AllGroupSidebarKeys, K extends AllSidebarKeys> {
  type: 'group';
  key: T;
  label: string;
  items: MenuItem<K>[];
}
// T group key
// K item key
export type TThemeMenuDefinition<T extends AllGroupSidebarKeys, K extends AllSidebarKeys> = Array<
  SimpleMenuItem<K> | GroupMenuItem<T, K>
>;
