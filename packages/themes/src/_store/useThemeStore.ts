import type { TThemeTypeConfig } from '@oe/themes/types';
import { create } from 'zustand';
import type { ThemeName } from '../index';

interface ThemeStore {
  // For system-wide settings (Components/SEO)
  selectedMenu: TThemeTypeConfig;
  selectedSettingKey: string | null;

  // For page-specific sections
  selectedPage: string;
  // selectedPageSection: string | null;

  selectedTheme: ThemeName | null;

  // Actions
  setSelectedMenu: (menu: TThemeTypeConfig) => void;
  setSelectedSettingKey: (key: string) => void;
  setSelectedPage: (page: string) => void;
  // setSelectedPageSection: (section: string) => void;
  setSelectedTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
  selectedMenu: 'page',
  selectedSettingKey: null,
  selectedPage: 'homepage',
  // selectedPageSection: null,
  selectedTheme: null,

  setSelectedMenu: menu =>
    set({
      selectedMenu: menu,
      selectedSettingKey: null, // Reset setting when menu changes
    }),
  setSelectedSettingKey: key => set({ selectedSettingKey: key }),
  setSelectedPage: page =>
    set({
      selectedPage: page,
      selectedSettingKey: null,
      // selectedPageSection: null, // Reset section when page changes
    }),
  // setSelectedPageSection: section => set({ selectedPageSection: section }),
  setSelectedTheme: selectedTheme => set({ selectedTheme }),
}));
