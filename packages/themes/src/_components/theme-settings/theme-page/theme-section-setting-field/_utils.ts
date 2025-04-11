import { type FileType, isFileType } from '@oe/ui';
import type { ThemeFieldConfig, ThemeFieldValue } from '#types';
import type { SettingsFieldType } from './_type';

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const generateTimestampId = () => {
  const timestamp = Date.now();
  return `id-${timestamp}`;
};

export const getFieldType = (value: unknown): SettingsFieldType => {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (typeof value === 'object' && value !== null && !isFileType(value as FileType)) {
    return 'object';
  }
  if (typeof value === 'string') {
    // Check if the string starts with '/' to identify it as a link
    if (value.startsWith('/') || isValidUrl(value) || value.startsWith('http')) {
      return 'link';
    }
    if (value.startsWith('id-')) {
      return 'id';
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
    case 'id':
      return generateTimestampId();
    default:
      return '';
  }
};
