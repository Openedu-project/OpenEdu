// import type { TThemeTypeConfig } from 'src/_types/header';
// import type { AllPageSectionKeys, AllSidebarKeys, ThemeName, ThemePageKey } from '@oe/themes/types/theme-page';
// import { create } from 'zustand';

// const INITIAL_SETTING_KEYS: Record<TThemeTypeConfig, AllSidebarKeys> = {
//   page: 'theme',
//   components: 'header',
//   'theme-ui': 'colors',
//   'site-setting': 'site-title',
// };

// interface ThemeStore {
//   selectedMenu: TThemeTypeConfig;
//   selectedPage?: ThemePageKey;
//   selectedTheme?: ThemeName;
//   selectedSettingKey: AllSidebarKeys;
//   selectedPageSection?: AllPageSectionKeys;

//   setSelectedMenu: (menu: TThemeTypeConfig) => void;
//   setSelectedSettingKey: (key: AllSidebarKeys) => void;
//   setSelectedPage: (page: ThemePageKey) => void;
//   setSelectedTheme: (theme: ThemeName) => void;
//   setSelectedPageSection: (key?: AllPageSectionKeys) => void;
// }

// export const useThemeStore = create<ThemeStore>(set => ({
//   selectedMenu: 'page',
//   selectedSettingKey: INITIAL_SETTING_KEYS.page, // Initialize with the default menu's first setting
//   selectedPage: 'homepage',
//   selectedPageSection: 'theme',
//   selectedTheme: undefined,

//   setSelectedMenu: menu =>
//     set({
//       selectedMenu: menu,
//       selectedSettingKey: INITIAL_SETTING_KEYS[menu], // Set the appropriate initial setting for the new menu
//     }),
//   setSelectedSettingKey: key => set({ selectedSettingKey: key }),
//   setSelectedPage: selectedPage => set({ selectedPage, selectedPageSection: 'theme' }),
//   setSelectedTheme: selectedTheme => set({ selectedTheme }),
//   setSelectedPageSection: selectedPageSection => set({ selectedPageSection }),
// }));
