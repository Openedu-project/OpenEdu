"use client";

// import { initialThemeGlobal, updateGlobalTheme } from '@oe/themes';
import type { ThemeDefinition } from "@oe/themes/types/index";
import { type ReactNode, createContext, useContext } from "react";

const ThemeContext = createContext<ThemeDefinition | null>(null);

export function ThemeProvider({
  // theme,
  children,
}: {
  // theme: ThemeDefinition;
  children: ReactNode;
}) {
  // useEffect(() => {
  //   updateGlobalTheme(theme?.globals ?? initialThemeGlobal);
  // }, [theme]);

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return theme;
};
