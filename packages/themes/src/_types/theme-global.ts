export type ThemeVariables = {
  [key: string]: string;
};

export type ThemeGlobalColorConfig = {
  light: ThemeVariables;
  dark: ThemeVariables;
};

export type ThemeMode = 'light' | 'dark';

export type ThemeGlobalFontConfig = {
  primary: string;
  secondary: string;
  sub: string;
};

export type ThemeGlobalRadiusKey = 'default' | 'sm' | 'md' | 'lg' | 'xl';

export interface ThemeGlobalRadiusConfig {
  default: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export type ThemeGlobal = {
  colorVariables: ThemeGlobalColorConfig;
  fonts: ThemeGlobalFontConfig;
  radius: ThemeGlobalRadiusConfig;
};
