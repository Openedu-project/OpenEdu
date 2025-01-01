import type { IFileResponse } from '@oe/api/types/file';
import type { InputHTMLAttributes, MouseEvent, RefObject } from 'react';
import type { ReactNode } from 'react';
import type { ReactCropProps } from 'react-image-crop';

export type FileStatusType = 'inited' | 'uploading' | 'error' | 'finished';
export type ListType = 'text' | 'picture-text' | 'picture';

export interface FileType extends Partial<IFileResponse> {
  fileId: string | number;
  status: FileStatusType;
  percent?: number;
  originFile?: File;
  error?: string | number | null;
}

export interface UploaderInstance {
  upload: () => void;
  abort: () => void;
}

export interface UploaderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  listType?: ListType;
  minSizeBytes?: number;
  maxSizeBytes?: number;
  aspectRatio?: number;
  crop?: boolean | Partial<ReactCropProps>;
  removable?: boolean;
  draggable?: boolean;
  defaultFileList?: IFileResponse[];
  children?: ReactNode;
  ref?: RefObject<UploaderInstance>;
  fileListVisible?: boolean;
  cropProps?: Partial<ReactCropProps>;
  fileItemProps?: Partial<UploadFileItemProps>;
  triggerProps?: Partial<UploadTriggerProps>;
  value?: IFileResponse[];
  onChange?: (files: IFileResponse[]) => void;
}

export type UploadTriggerInstance = {
  clearInput: () => void;
  input: HTMLInputElement | null;
};

export interface UploadTriggerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  children?: ReactNode;
  draggable?: boolean;
  maxSizeBytes?: number;
  ref?: RefObject<UploadTriggerInstance>;
  file?: FileType;
  fileItemProps?: Partial<UploadFileItemProps>;
  onChange?: (files: FileList) => void;
}

export interface UploadFileItemProps {
  file: FileType;
  listType?: ListType;
  disabled?: boolean;
  className?: string;
  removable?: boolean;
  thumbnailClassName?: string;
  removeClassName?: string;
  allowReupload?: boolean;
  minSizeBytes?: number;
  maxSizeBytes?: number;
  buttonsPosition?: 'top-right' | 'center';
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  renderFileInfo?: (file: FileType, fileElement: ReactNode) => ReactNode;
  renderThumbnail?: (file: FileType, thumbnail: ReactNode) => ReactNode;
  onRemove?: (file: FileType) => void;
  onPreview?: (file: FileType) => void;
  onReupload?: (file: FileType) => void;
}

export interface CropModalProps {
  file: FileType | null;
  aspectRatio?: number;
  cropProps?: boolean | Partial<ReactCropProps>;
  onComplete: (croppedFile: FileType) => void;
  onCancel: () => void;
}
