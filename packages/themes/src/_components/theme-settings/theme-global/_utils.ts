import type { ThemeGlobal, ThemeGlobalFontConfig, ThemeMode } from '../../../_types';
import type { CSSVariableOptions } from './_types';

// Base CSS variable setter
export const setRootCSSVariable = (name: string, value: string | number, options: CSSVariableOptions = {}): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const { prefix = '', unit = '' } = options;
  const variableName = prefix ? `--${prefix}-${name}` : name.startsWith('--') ? name : `--${name}`;
  const formattedValue = `${value}${unit}`;

  document.documentElement.style.setProperty(variableName, formattedValue);
};

// Font variables
export const setFontVariable = (key: keyof ThemeGlobalFontConfig, value: string): void => {
  setRootCSSVariable(key, value, { prefix: 'font' });
};

// Radius variables
export const setRadiusVariable = (value: number): void => {
  setRootCSSVariable('radius', value, { unit: 'rem' });
};

// Color scheme variables
export const setColorScheme = (variables: Record<string, string>): void => {
  for (const [name, value] of Object.entries(variables)) {
    setRootCSSVariable(name, value);
  }
};

const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Main theme update function
export const updateGlobalTheme = (themeGlobal: ThemeGlobal): void => {
  const { colorVariables, radius, fonts } = themeGlobal;

  // Update light and dark color schemes
  setColorScheme(colorVariables.light);
  if (getSystemTheme() === 'light') {
    setColorScheme(colorVariables.light);
  } else {
    setColorScheme(colorVariables.dark);
  }

  // Update border radius
  setRadiusVariable(radius.default);

  // Update fonts
  for (const [key, value] of Object.entries(fonts)) {
    setFontVariable(key as keyof ThemeGlobalFontConfig, value);
  }
};

export const getFontDisplayName = (key: string): string => {
  return (
    key
      .replace(/([A-Z])/g, ' $1')
      // biome-ignore lint/performance/useTopLevelRegex: <explanation>
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim()
  );
};

const HEX_PATTERN = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export const hexToHsl = (hex: string): string | undefined => {
  // Validate and parse hex color
  const result = HEX_PATTERN.exec(hex);
  if (!result) {
    return undefined;
  }

  if (!(result[1] && result[2] && result[3])) {
    return undefined;
  }

  // Convert hex to RGB
  const r = Number.parseInt(result[1], 16) / 255;
  const g = Number.parseInt(result[2], 16) / 255;
  const b = Number.parseInt(result[3], 16) / 255;

  // Find min and max values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h /= 6;
  }

  // Convert to degrees and percentages
  const hDegrees = Math.round(h * 360);
  const sPercent = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `${hDegrees} ${sPercent}% ${lPercent}%`;
};

export const hslToHex = (hue: number, saturation: number, lightness: number): string => {
  // Handle special cases
  if (lightness === 100) {
    return '#ffffff';
  } // White
  if (lightness === 0) {
    return '#000000';
  } // Black
  if (saturation === 0) {
    // Pure gray, lightness determines the shade
    const value = Math.round((lightness * 255) / 100)
      .toString(16)
      .padStart(2, '0');
    return `#${value}${value}${value}`;
  }

  // Normalize inputs
  const h = hue % 360;
  const s = Math.max(0, Math.min(100, saturation)) / 100;
  const l = Math.max(0, Math.min(100, lightness)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  // Convert to 0-255 range and then to hex
  const toHex = (value: number): string => {
    const hex = Math.round((value + m) * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
};

export const hslStringToHex = (hslString: string): string | undefined => {
  const numbers = hslString.split(' ').map(part => Number.parseFloat(part));
  if (numbers.length !== 3) {
    return undefined;
  }

  const [h, s, l] = numbers;
  if (!(h && l && s)) {
    return undefined;
  }

  // Validate ranges
  if (
    Number.isNaN(h) ||
    Number.isNaN(s) ||
    Number.isNaN(l) ||
    h < 0 ||
    h >= 360 ||
    s < 0 ||
    s > 100 ||
    l < 0 ||
    l > 100
  ) {
    return undefined;
  }

  return hslToHex(h, s, l);
};
