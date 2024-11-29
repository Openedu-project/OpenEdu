import type { TThemeTypeConfig } from '@oe/themes/types';
import { create } from 'zustand';

interface ThemeStore {
  // For system-wide settings (Components/SEO)
  selectedMenu: TThemeTypeConfig;
  selectedSettingKey: string | null;

  // For page-specific sections
  selectedPage: string;
  // selectedPageSection: string | null;

  // Actions
  setSelectedMenu: (menu: TThemeTypeConfig) => void;
  setSelectedSettingKey: (key: string) => void;
  setSelectedPage: (page: string) => void;
  // setSelectedPageSection: (section: string) => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
  selectedMenu: 'page',
  selectedSettingKey: null,
  selectedPage: 'homepage',
  // selectedPageSection: null,

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
}));
