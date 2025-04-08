import type { IFileResponse } from '@oe/api/types/file';
import { uniqueID } from '@oe/core/utils/unique';
import type { FileType } from './types';

export const MAX_PREVIEW_FILE_SIZE = 1024 * 1024 * 5; // 5MB
export const MIN_SIZE_BYTES = 0;
export const MAX_SIZE_BYTES = 5 * 1024 * 1024;

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

export const createFile = (file: IFileResponse | FileType): FileType => {
  return {
    ...file,
    fileId: (file as FileType)?.fileId ?? (file as IFileResponse)?.id ?? uniqueID(),
    status: (file as FileType).status ?? 'finished',
  };
};

export const isDuplicateFile = (newFile: File, existingFiles: File[]) => {
  return existingFiles.some(
    existingFile =>
      existingFile.name === newFile.name &&
      existingFile.size === newFile.size &&
      existingFile.lastModified === newFile.lastModified
  );
};

export function isFileType(value: FileType) {
  // return (
  //   typeof value === 'object' &&
  //   value !== null &&
  //   'url' in value &&
  //   'mime' in value &&
  //   'name' in value &&
  //   'ext' in value
  // );
  // return (
  //   typeof value === 'object' &&value !== null&& 'url' in value
  // );
  return MIME.includes(value?.mime || '');
}
