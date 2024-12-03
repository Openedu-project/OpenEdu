import type { colorPalette } from './_constants';

export type CSSVariableOptions = {
  prefix?: string;
  unit?: string;
};

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorValue {
  hex: string;
  rgb: [number, number, number];
}

export type ColorCategory = keyof typeof colorPalette;
