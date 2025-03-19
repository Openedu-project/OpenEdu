import type { ThemeFieldConfig, ThemeFieldValue } from '@oe/themes/types';
import type React from 'react';

export type SettingsFieldType = 'text' | 'number' | 'boolean' | 'file' | 'object' | 'array' | 'link' | 'id';

export interface ThemePageSettingFieldProps {
  label: string;
  value: ThemeFieldValue;
  onChange: (value: ThemeFieldValue) => void;
  type?: SettingsFieldType;
  path: string[];
}

export interface ThemePageSettingObjectFieldProps {
  label: string;
  value: ThemeFieldConfig;
  onChange: (value: ThemeFieldConfig) => void;
  path: string[];
}

export interface ThemePageSettingArrayFieldProps {
  label: string;
  value: Array<ThemeFieldValue | ThemeFieldConfig>;
  onChange: (value: Array<ThemeFieldValue | ThemeFieldConfig>) => void;
  onAdd: (value: Array<ThemeFieldValue | ThemeFieldConfig>) => void;
  onRemove: (value: Array<ThemeFieldValue | ThemeFieldConfig>) => void;
  path: string[];
  renderItem?: (
    value: ThemeFieldValue | ThemeFieldConfig,
    index: number,
    onChange: (value: ThemeFieldValue | ThemeFieldConfig) => void,
    path: string[]
  ) => React.ReactNode;
}
