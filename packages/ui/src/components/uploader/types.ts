import type { IFileResponse } from '@oe/api/types/file';
import type { ErrorStatus } from '@oe/api/utils/ajax-upload';
import type React from 'react';
import type { ReactCropProps } from 'react-image-crop';

export type ActionType =
  | { type: 'push'; files: FileType[] }
  | { type: 'remove'; id: string | number }
  | { type: 'replace'; files: FileType[] }
  | { type: 'updateFile'; file: FileType }
  | { type: 'init'; files: FileType[] };

export interface FileType extends Partial<IFileResponse> {
  name?: string;
  blobFile?: File;
  status?: 'inited' | 'uploading' | 'error' | 'finished';
  progress?: number;
  url?: string;
  error?: string;
}

export interface UploadFileItemProps {
  file: FileType;
  listType?: 'text' | 'picture-text' | 'picture';
  disabled?: boolean;
  className?: string;
  maxPreviewFileSize?: number;
  removable?: boolean;
  allowReupload?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
  minSizeBytes?: number;
  maxSizeBytes?: number;
  singleImage?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  renderFileInfo?: (file: FileType, fileElement: React.ReactNode) => React.ReactNode;
  renderThumbnail?: (file: FileType, thumbnail: React.ReactNode) => React.ReactNode;
  onCancel?: (id: number | string, event: React.MouseEvent) => void;
  onPreview?: (file: FileType, event: React.MouseEvent) => void;
  onReupload?: (file: FileType, event: React.MouseEvent) => void;
}

export interface UploadTriggerProps {
  name?: string;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  draggable?: boolean;
  accept?: string;
  maxSizeBytes?: number;
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<UploadTriggerInstance>;
  singleImage?: boolean;
  file?: FileType;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDragEnter?: React.DragEventHandler<HTMLButtonElement>;
  onDragLeave?: React.DragEventHandler<HTMLButtonElement>;
  onDragOver?: React.DragEventHandler<HTMLButtonElement>;
  onDrop?: React.DragEventHandler<HTMLButtonElement>;
}

export interface UploadTriggerInstance {
  clearInput: () => void;
  input: HTMLInputElement | null;
}

export interface UploaderInstance {
  root: HTMLElement | null;
  start: (file?: FileType) => void;
}

export interface UploaderProps extends Omit<UploadTriggerProps, 'onChange' | 'onError' | 'onProgress' | 'ref'> {
  itemClassName?: string;
  action?: string;
  autoUpload?: boolean;
  defaultFileList?: FileType[];
  fileList?: FileType[];
  data?: Record<string, unknown>;
  disabledFileItem?: boolean;
  disableMultipart?: boolean;
  plaintext?: boolean;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  listType?: 'text' | 'picture-text' | 'picture';
  maxPreviewFileSize?: number;
  removable?: boolean;
  fileListVisible?: boolean;
  draggable?: boolean;
  method?: string;
  ref?: React.RefObject<UploaderInstance>;
  minSizeBytes?: number;
  maxSizeBytes?: number;
  aspectRatio?: number;
  crop?: boolean | Partial<ReactCropProps>;
  shouldQueueUpdate?: (fileList: FileType[], newFile: FileType[] | FileType) => boolean | Promise<boolean>;
  shouldUpload?: (file: FileType) => boolean | Promise<boolean>;
  onChange?: (fileList: FileType[], event: React.ChangeEvent | React.MouseEvent) => void;
  onUpload?: (file: FileType, uploadData: FormData | File, xhr: XMLHttpRequest) => void;
  onReupload?: (file: FileType) => void;
  onPreview?: (file: FileType, event: React.SyntheticEvent) => void;
  onError?: (status: ErrorStatus, file: FileType, event: ProgressEvent, xhr: XMLHttpRequest) => void;
  onSuccess?: (response: IFileResponse, file: FileType, event: ProgressEvent, xhr: XMLHttpRequest) => void;
  onProgress?: (percent: number, file: FileType, event: ProgressEvent, xhr: XMLHttpRequest) => void;
  onRemove?: (file: FileType) => void;
  renderFileInfo?: (file: FileType, fileElement: React.ReactNode) => React.ReactNode;
  renderThumbnail?: (file: FileType, thumbnail: React.ReactNode) => React.ReactNode;
}

export type FileStatusType = 'inited' | 'uploading' | 'error' | 'finished';

export interface FileProgressType {
  status?: FileStatusType;
  progress?: number;
}
