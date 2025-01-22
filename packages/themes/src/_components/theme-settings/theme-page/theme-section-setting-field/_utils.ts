import type { ThemeFieldConfig, ThemeFieldValue } from '@oe/themes/types/theme-page/index';
import { type FileType, isFileType } from '@oe/ui/components/uploader';

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const getFieldType = (value: unknown): 'text' | 'number' | 'boolean' | 'file' | 'object' | 'array' | 'link' => {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (typeof value === 'object' && value !== null && !isFileType(value as FileType)) {
    return 'object';
  }
  if (typeof value === 'string') {
    // Check if the string starts with '/' to identify it as a link
    if (value.startsWith('/') || isValidUrl(value)) {
      return 'link';
    }
    return 'text';
  }
  if (typeof value === 'number') {
    return 'number';
  }
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  if (isFileType(value as FileType)) {
    return 'file';
  }
  return 'text';
};

export const getInitialValue = (type: ReturnType<typeof getFieldType>): ThemeFieldValue | ThemeFieldConfig | [] => {
  switch (type) {
    case 'text':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'file':
      return { mime: 'image/png' };
    case 'object':
      return {};
    case 'array':
      return [];
    case 'link':
      return typeof window !== 'undefined' ? window.location.pathname : '/';
    default:
      return '';
  }
};
