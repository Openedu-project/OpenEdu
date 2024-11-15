import type React from 'react';
import type { ActionType, FileType } from './types';

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const MIME = ['image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];

export function isImage(file: File) {
  return MIME.includes(file?.type);
}

export function previewFile(file: File, callback: (result: string | ArrayBuffer | null) => void) {
  if (!isImage(file)) {
    return callback(null);
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export const formatSize = (size = 0): string => {
  if (size === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));

  return `${Number.parseFloat((size / k ** i).toFixed(2))} ${sizes[i]}`;
};

export const getFiles = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLInputElement>) => {
  if ('dataTransfer' in event) {
    return event.dataTransfer?.files;
  }
  if (event.target) {
    return (event.target as HTMLInputElement).files;
  }
  return [];
};

export const createFile = (file: FileType) => {
  const { id } = file;
  return {
    ...file,
    id: id || `_${Math.random().toString(36).substring(2, 12)}`,
    progress: 0,
  };
};

export function fileListReducer(files: FileType[], action: ActionType) {
  switch (action.type) {
    case 'push':
      return [...files, ...action.files];

    case 'remove':
      return files.filter(f => f.id !== action.id);

    case 'replace':
      return action.files;

    case 'updateFile':
      return files.map(file => {
        return file.id === action.file.id ? action.file : file;
      });

    case 'init':
      return (
        action.files?.map(file => {
          return { ...(files?.find(f => f.id === file.id) || createFile(file)), ...file };
        }) || []
      );
    default:
      throw new Error('Unknown action type');
  }
}
