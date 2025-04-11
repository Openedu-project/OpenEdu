'use client';

// import { initialThemeGlobal, updateGlobalTheme } from "../../../index";
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect } from 'react';
import type { ThemeDefinition } from '#types';
import { updateGlobalTheme } from '../../_components/theme-settings/theme-global/_utils';
import { initialThemeGlobal } from '../../_config/theme-global-initial';

const ThemeContext = createContext<ThemeDefinition | null>(null);

export function ThemeProvider({
  theme,
  children,
}: {
  theme?: ThemeDefinition;
  children: ReactNode;
}) {
  useEffect(() => {
    if (theme) {
      updateGlobalTheme(theme?.globals ?? initialThemeGlobal);
    }
  }, [theme]);

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return theme;
};
