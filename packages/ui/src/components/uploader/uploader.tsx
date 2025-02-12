import type { IFileResponse } from '@oe/api/types/file';
import { type ErrorStatus, ajaxUpload } from '@oe/api/utils/ajax-upload';
import { uniqueID } from '@oe/core/utils/unique';
import { useTranslations } from 'next-intl';
import { type RefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '#utils/cn';
import { CropModal } from './crop-modal';
import { ImagePreviewModal } from './image-preview-modal';
import type { FileStatusType, FileType, UploadTriggerInstance, UploadTriggerProps, UploaderProps } from './types';
import { UploadFileItem } from './upload-file-item';
import { UploadTrigger } from './upload-trigger';
import { MAX_SIZE_BYTES, MIN_SIZE_BYTES, createFile, formatSize, isDuplicateFile, isImage } from './utils';

export const Uploader = (props: UploaderProps) => {
  const {
    listType = 'text',
    minSizeBytes = MIN_SIZE_BYTES,
    maxSizeBytes = MAX_SIZE_BYTES,
    aspectRatio,
    crop = false,
    removable = true,
    draggable = true,
    defaultFileList = [],
    children,
    multiple,
    fileListVisible = true,
    ref,
    fileItemProps,
    triggerProps,
    cropProps,
    className,
    accept,
    value,
    allowRename,
    contentClassName = '',
    isShowInformation = true,
    renderTrigger,
    renderFileList,
    onChange,
    ...restProps
  } = props;
  const t = useTranslations('uploader');
  const [files, setFiles] = useState<FileType[]>(defaultFileList.map(createFile));
  const [cropFile, setCropFile] = useState<FileType | null>(null);

  const xhrRef = useRef<XMLHttpRequest>(null);
  const trigger = useRef<UploadTriggerInstance>(null);
  const filesRef = useRef<FileType[]>([]);

  useEffect(() => {
    if (value) {
      setFiles(value.map(createFile));
    }
  }, [value]);

  useImperativeHandle(ref, () => ({
    upload: () => {
      const pendingFiles = files.filter(f => f.status === 'inited');
      for (const file of pendingFiles) {
        uploadFile(file);
      }
    },
    abort: () => {
      if (xhrRef.current) {
        xhrRef.current.abort();
        xhrRef.current = null;
      }
    },
  }));

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const handleFileNameChange = useCallback(
    (file: FileType, newName: string) => {
      const updated = files.map(f => (f.fileId === file.fileId ? { ...f, name: newName } : f));
      setFiles(updated);
      onChange?.(updated as IFileResponse[]);
    },
    [files, onChange]
  );

  const handlePreview = useCallback(
    (file: FileType) => {
      const index = files.findIndex(f => f.fileId === file.fileId);
      setPreviewIndex(index);
    },
    [files]
  );

  const validateFile = useCallback(
    (file: FileType): FileType => {
      const updatedFile = { ...file };
      if (file.originFile) {
        if (file.originFile.size < minSizeBytes || file.originFile.size > maxSizeBytes) {
          updatedFile.status = 'error';
          updatedFile.error = file.originFile.size < minSizeBytes ? 'fileTooSmall' : 'fileTooBig';
        } else if (crop && isImage(file.originFile) && !multiple) {
          updatedFile.status = 'uploading';
          setCropFile(file);
        } else {
          updatedFile.status = 'inited';
        }
      }
      return updatedFile;
    },
    [minSizeBytes, maxSizeBytes, crop, multiple]
  );

  const handleChange = useCallback(
    async (inputFiles: FileList | File[]) => {
      let newFiles: FileType[] = Array.from(inputFiles)
        .filter(file => !isDuplicateFile(file, files.map(f => f.originFile).filter(Boolean) as File[]))
        .map(file => ({
          fileId: uniqueID(),
          name: file.name,
          status: 'inited',
          originFile: file,
        }));

      if (!multiple) {
        newFiles = newFiles.slice(-1);
      }

      const validatedFileList = newFiles.map(validateFile);

      let nextFileList: FileType[];
      if (multiple) {
        nextFileList = [...files, ...validatedFileList];
      } else {
        nextFileList = validatedFileList;
      }

      filesRef.current = nextFileList;
      setFiles(nextFileList);

      for (const file of nextFileList) {
        if (file.status === 'inited') {
          await uploadFile(file);
        }
      }
    },
    [multiple, validateFile, files]
  );

  const handleAjaxUploadProgress = useCallback((file: FileType, percent: number) => {
    const updated = filesRef.current.map(f => (f.fileId === file.fileId ? { ...f, percent } : f));
    setFiles(updated);
  }, []);

  const handleAjaxUploadSuccess = useCallback(
    (file: FileType, response: IFileResponse) => {
      const successFile = {
        ...file,
        ...response,
        fileId: file.fileId,
        status: 'finished' as FileStatusType,
      };

      // Cập nhật filesRef với trạng thái mới nhất
      filesRef.current = filesRef.current.map(f => (f.fileId === file.fileId ? successFile : f));

      // Cập nhật state UI
      setFiles(filesRef.current);

      // Kiểm tra nếu tất cả files đã upload xong
      const allFinished = filesRef.current.every(f => f.status === 'finished' || f.status === 'error');

      if (allFinished) {
        onChange?.(filesRef.current as IFileResponse[]);
      }
    },
    [onChange]
  );

  const handleAjaxUploadError = useCallback((file: FileType, status: ErrorStatus) => {
    const updated = filesRef.current.map(f =>
      f.fileId === file.fileId ? ({ ...f, status: 'error', error: status.errorCode } as FileType) : f
    );
    setFiles(updated);
  }, []);

  const uploadFile = useCallback(
    async (file: FileType) => {
      if (!file.originFile) {
        return;
      }

      const updatedFile = {
        ...file,
        status: 'uploading' as FileStatusType,
        percent: 0,
      };
      filesRef.current = filesRef.current.map(f => (f.fileId === file.fileId ? updatedFile : f));
      setFiles(filesRef.current);
      const { xhr } = await ajaxUpload({
        name: 'files',
        file: file.originFile,
        onProgress: handleAjaxUploadProgress.bind(null, file),
        onSuccess: handleAjaxUploadSuccess.bind(null, file),
        onError: handleAjaxUploadError.bind(null, file),
      });
      xhrRef.current = xhr;
      trigger.current?.clearInput();
    },
    [handleAjaxUploadProgress, handleAjaxUploadSuccess, handleAjaxUploadError]
  );

  const handleRemove = useCallback(
    (file: FileType) => {
      const updated = files.filter(f => f.fileId !== file.fileId);
      onChange?.(updated as IFileResponse[]);
      // setFiles(updated); // update files

      trigger.current?.clearInput();
    },
    [files, onChange]
  );

  const handleCropComplete = useCallback(
    async (croppedFile: FileType) => {
      const updated = files.map(f =>
        f.fileId === croppedFile.fileId ? ({ ...f, originFile: croppedFile.originFile } as FileType) : f
      );

      setFiles(updated);
      uploadFile(croppedFile);
      trigger.current?.clearInput();
    },
    [files, uploadFile]
  );

  const handleCropCancel = useCallback(() => {
    setCropFile(null);
    setFiles(files.filter(f => f.status !== 'uploading'));
    trigger.current?.clearInput();
  }, [files]);

  const defaultTriggerProps: UploadTriggerProps = {
    onChange: handleChange,
    file: fileListVisible || multiple ? undefined : files[0],
    ref: trigger as RefObject<UploadTriggerInstance>,
    maxSizeBytes,
    draggable,
    multiple,
    accept,
    fileItemProps: {
      ...fileItemProps,
      listType,
      minSizeBytes,
      maxSizeBytes,
      onRemove: handleRemove,
      onReupload: (file: FileType) => uploadFile(file),
      onPreview: handlePreview,
      allowRename,
      onFileNameChange: handleFileNameChange,
    },
    ...restProps,
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'relative flex w-full gap-2 rounded',
          listType === 'picture' ? 'flex-wrap' : 'flex-col',
          !children && 'flex h-48 flex-col items-center justify-center p-0',
          !children && fileListVisible && !renderTrigger && 'h-full min-h-32',
          className
        )}
      >
        {renderTrigger ? (
          renderTrigger(defaultTriggerProps)
        ) : (
          <UploadTrigger {...defaultTriggerProps} contentClassName={contentClassName}>
            {children}
          </UploadTrigger>
        )}
        {fileListVisible &&
          files.map(file => (
            <UploadFileItem
              {...fileItemProps}
              key={file.fileId}
              file={file}
              listType={listType}
              minSizeBytes={minSizeBytes}
              maxSizeBytes={maxSizeBytes}
              onRemove={handleRemove}
              onReupload={(file: FileType) => uploadFile(file)}
              onPreview={handlePreview}
              allowRename={allowRename}
              onFileNameChange={handleFileNameChange}
            />
          ))}
        {cropFile?.originFile ? (
          <CropModal
            cropProps={cropProps}
            file={cropFile}
            onCancel={handleCropCancel}
            onComplete={handleCropComplete}
            aspectRatio={aspectRatio}
          />
        ) : null}
        {previewIndex !== null && (
          <ImagePreviewModal
            images={files}
            initialIndex={previewIndex}
            isOpen={previewIndex !== null}
            onClose={() => setPreviewIndex(null)}
          />
        )}
      </div>
      {isShowInformation && maxSizeBytes && children && (
        <>
          <span className="text-xs italic">
            {accept ? t('acceptedFormats', { formats: accept }) : t('allFileTypesAccepted')}
          </span>
          <span className="text-xs italic">{t('maxFileSize', { size: formatSize(maxSizeBytes) })}</span>
        </>
      )}
    </div>
  );
};
