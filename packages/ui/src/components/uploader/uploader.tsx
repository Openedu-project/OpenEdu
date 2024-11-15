'use client';
import type { IFileResponse } from '@oe/api/types/file';
import type { ErrorStatus } from '@oe/api/utils/ajax-upload';
import { ajaxUpload } from '@oe/api/utils/ajax-upload';
import type React from 'react';
import { Fragment, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '#utils/cn';
import { CropModal } from './crop-modal';
import type { FileType, UploadTriggerInstance, UploaderProps } from './types';
import { UploadFileItem } from './upload-file-item';
import { UploadTrigger } from './upload-trigger';
import { useFileList } from './useFileList';
import { getFiles, isImage } from './utils';

const Uploader = (props: UploaderProps) => {
  const {
    className,
    itemClassName,
    listType = 'text',
    defaultFileList,
    fileList: fileListProp,
    fileListVisible = true,
    draggable,
    name = 'files',
    multiple = false,
    disabled = false,
    readOnly,
    plaintext,
    accept,
    children,
    removable = true,
    disabledFileItem,
    maxPreviewFileSize,
    method = 'POST',
    autoUpload = true,
    action,
    headers,
    withCredentials = false,
    disableMultipart,
    timeout = 0,
    data = {},
    ref,
    minSizeBytes = 0,
    maxSizeBytes = 5 * 1024 * 1024,
    aspectRatio = 4 / 3,
    crop = false,
    onRemove,
    onUpload,
    shouldUpload,
    shouldQueueUpdate,
    renderFileInfo,
    renderThumbnail,
    onPreview,
    onChange,
    onSuccess,
    onError,
    onProgress,
    onReupload,
    ...rest
  } = props;
  const [cropFile, setCropFile] = useState<File | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const xhrs = useRef<Record<string, XMLHttpRequest>>({});
  const trigger = useRef<UploadTriggerInstance>(null);

  const [fileList, dispatch] = useFileList(fileListProp || defaultFileList);

  useEffect(() => {
    if (typeof fileListProp !== 'undefined') {
      dispatch({ type: 'init', files: fileListProp });
    }
  }, [dispatch, fileListProp]);

  const validateAndProcessFile = (file: FileType): FileType => {
    const updatedFile = { ...file };
    if (file.blobFile) {
      if (file.blobFile.size < minSizeBytes || file.blobFile.size > maxSizeBytes) {
        updatedFile.status = 'error';
        updatedFile.error = file.blobFile.size < minSizeBytes ? 'fileTooSmall' : 'fileTooBig';
      } else if (crop && isImage(file.blobFile)) {
        updatedFile.status = 'uploading';
        setCropFile(file.blobFile);
      } else {
        updatedFile.status = 'inited';
      }
    }
    return updatedFile;
  };

  const updateFileStatus = useCallback(
    (nextFile: FileType) => {
      dispatch({ type: 'updateFile', file: nextFile });
    },
    [dispatch]
  );

  const cleanInputValue = useCallback(() => {
    trigger.current?.clearInput();
  }, []);

  const handleAjaxUploadSuccess = useCallback(
    (file: FileType, response: IFileResponse, event: ProgressEvent, xhr: XMLHttpRequest) => {
      const nextFile: FileType = {
        ...file,
        status: 'finished',
        progress: 100,
      };
      updateFileStatus(nextFile);
      onSuccess?.(response, nextFile, event, xhr);
    },
    [onSuccess, updateFileStatus]
  );

  const handleAjaxUploadError = useCallback(
    (file: FileType, status: ErrorStatus, event: ProgressEvent, xhr: XMLHttpRequest) => {
      const nextFile: FileType = {
        ...file,
        status: 'error',
      };
      updateFileStatus(nextFile);
      onError?.(status, nextFile, event, xhr);
    },
    [onError, updateFileStatus]
  );

  const handleAjaxUploadProgress = useCallback(
    (file: FileType, percent: number, event: ProgressEvent, xhr: XMLHttpRequest) => {
      const nextFile: FileType = {
        ...file,
        status: 'uploading',
        progress: percent,
      };

      updateFileStatus(nextFile);
      onProgress?.(percent, nextFile, event, xhr);
    },
    [onProgress, updateFileStatus]
  );

  const handleUploadFile = useCallback(
    async (file: FileType) => {
      const { xhr, data: uploadData } = await ajaxUpload({
        name,
        timeout,
        headers,
        data,
        method,
        withCredentials,
        disableMultipart,
        file: file.blobFile as File,
        url: action,
        onError: handleAjaxUploadError.bind(null, file),
        onSuccess: handleAjaxUploadSuccess.bind(null, file),
        onProgress: handleAjaxUploadProgress.bind(null, file),
      });

      updateFileStatus({ ...file, status: 'uploading' });

      if (file.id) {
        xhrs.current[file.id] = xhr;
      }

      onUpload?.(file, uploadData, xhr);
      setCropFile(null);
    },
    [
      name,
      timeout,
      headers,
      data,
      method,
      withCredentials,
      disableMultipart,
      action,
      handleAjaxUploadError,
      handleAjaxUploadSuccess,
      handleAjaxUploadProgress,
      updateFileStatus,
      onUpload,
    ]
  );

  const handleAjaxUpload = useCallback(() => {
    for (const file of fileList.current) {
      const checkState = shouldUpload?.(file);

      if (checkState instanceof Promise) {
        checkState.then(res => {
          if (res) {
            handleUploadFile(file);
          }
        });
        return;
      }
      if (checkState === false) {
        return;
      }

      if (file.status === 'inited') {
        handleUploadFile(file);
      }
    }

    cleanInputValue();
  }, [cleanInputValue, fileList, handleUploadFile, shouldUpload]);

  const handleUploadTriggerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = getFiles(event);
    let newFileList: FileType[] = Array.from(files || []).map(file => ({
      blobFile: file,
      name: file.name,
      status: 'inited',
      id: `_${Math.random().toString(36).substring(2, 12)}`,
    }));

    if (!multiple) {
      newFileList = newFileList.slice(-1);
    }

    const validatedFileList = newFileList.map(validateAndProcessFile);

    let nextFileList: FileType[];
    if (multiple) {
      nextFileList = [...fileList.current, ...validatedFileList];
    } else {
      nextFileList = validatedFileList;
    }

    const checkState = shouldQueueUpdate?.(nextFileList, validatedFileList);

    if (checkState === false) {
      cleanInputValue();
      return;
    }

    const upload = () => {
      onChange?.(nextFileList, event);
      if (rootRef.current) {
        dispatch({ type: multiple ? 'push' : 'replace', files: validatedFileList }, () => {
          autoUpload && handleAjaxUpload();
        });
      }
    };

    if (checkState instanceof Promise) {
      checkState.then(res => {
        res && upload();
      });
      return;
    }

    upload();
  };

  const handleCropComplete = useCallback(
    (croppedFile: File) => {
      const uploadFiles = fileList.current.map(f =>
        f.status === 'uploading' && f.name === croppedFile.name
          ? { ...f, blobFile: croppedFile, status: 'inited' as const }
          : f
      );

      dispatch({ type: 'init', files: uploadFiles }, () => {
        handleAjaxUpload();
      });
    },
    [fileList, handleAjaxUpload, dispatch]
  );

  const handleCropCancel = useCallback(() => {
    setCropFile(null);
    dispatch({
      type: 'init',
      files: fileList.current.filter(f => f.status !== 'uploading'),
    });
  }, [fileList, dispatch]);

  const handleRemoveFile = (id: string | number, event: React.MouseEvent) => {
    const file = fileList.current.find(f => f.id === id);
    const nextFileList = fileList.current.filter(f => f.id !== id);

    if (file?.id && xhrs.current?.[file.id]?.readyState !== 4) {
      xhrs.current[file.id]?.abort();
    }

    dispatch({ type: 'remove', id });

    onRemove?.(file as FileType);
    onChange?.(nextFileList, event);
    cleanInputValue();
  };

  const handleReupload = (file: FileType) => {
    const validatedFile = validateAndProcessFile(file);

    if (validatedFile.status === 'inited' && autoUpload) {
      handleUploadFile(validatedFile);
    }
    onReupload?.(validatedFile);
  };

  // public API
  const start = (file?: FileType) => {
    if (file) {
      const validatedFile = validateAndProcessFile(file);
      if (validatedFile.status === 'inited') {
        handleUploadFile(validatedFile);
      }
      return;
    }
    const validatedFileList = fileList.current.map(validateAndProcessFile);
    dispatch({ type: 'init', files: validatedFileList }, () => {
      handleAjaxUpload();
    });
  };

  const handleFileItemClick = () => {
    trigger.current?.clearInput();
    trigger.current?.input?.click();
  };

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    start,
  }));

  const renderList: React.ReactNode[] = [
    <UploadTrigger
      {...rest}
      name={name}
      key="trigger"
      multiple={multiple}
      draggable={draggable}
      disabled={disabled}
      readOnly={readOnly}
      accept={accept}
      maxSizeBytes={maxSizeBytes}
      ref={trigger as React.RefObject<UploadTriggerInstance>}
      onChange={handleUploadTriggerChange}
      singleImage={!multiple && listType === 'picture'}
      file={fileList.current.length > 0 ? fileList.current[0] : undefined}
    >
      {children}
    </UploadTrigger>,
  ];

  if (fileListVisible) {
    renderList.push(
      <Fragment key="items">
        {fileList.current.map((file, index) => (
          <UploadFileItem
            key={file.id || file.id || index}
            file={file}
            maxPreviewFileSize={maxPreviewFileSize}
            listType={listType}
            disabled={disabledFileItem}
            onPreview={onPreview}
            onReupload={handleReupload}
            onCancel={handleRemoveFile}
            renderFileInfo={renderFileInfo}
            renderThumbnail={renderThumbnail}
            removable={removable && !readOnly && !plaintext}
            allowReupload={!(readOnly || plaintext)}
            singleImage={!multiple && listType === 'picture'}
            onClick={!multiple && listType === 'picture' ? handleFileItemClick : undefined}
            className={itemClassName}
          />
        ))}
      </Fragment>
    );
  }

  if (plaintext) {
    return (
      <div className={listType === 'picture' ? 'flex flex-wrap' : ''}>
        {fileList.current.length > 0 ? renderList[1] : null}
      </div>
    );
  }

  if (listType === 'picture') {
    renderList.reverse();
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative flex w-full gap-2 rounded p-4',
        listType === 'picture' ? 'flex-wrap' : 'flex-col',
        !children && 'flex h-48 flex-col items-center justify-center border p-0',
        className
      )}
    >
      {renderList}
      {cropFile && (
        <CropModal
          file={cropFile as File}
          aspectRatio={aspectRatio}
          onComplete={handleCropComplete}
          onCancel={handleCropCancel}
          cropProps={crop}
        />
      )}
    </div>
  );
};

export default Uploader;
