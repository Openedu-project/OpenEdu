import type { ThemeFieldConfig, ThemeFieldValue } from '@oe/themes/types/theme-page';
import { type FileType, isFileType } from '@oe/ui/components/uploader';

export const getFieldType = (value: unknown): 'text' | 'number' | 'boolean' | 'file' | 'object' | 'array' => {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (typeof value === 'object' && value !== null && !isFileType(value as FileType)) {
    return 'object';
  }
  if (typeof value === 'string') {
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
    default:
      return '';
  }
};
