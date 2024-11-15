import { Loader2, Paperclip, RotateCw, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { Progress } from '#shadcn/progress';
import { cn } from '#utils/cn';
import type { UploadFileItemProps } from './types';
import { formatSize, previewFile } from './utils';

export const UploadFileItem = (props: UploadFileItemProps) => {
  const t = useTranslations('uploader');
  const {
    disabled,
    allowReupload = true,
    file,
    listType = 'text',
    className,
    removable = true,
    maxPreviewFileSize = 1024 * 1024 * 5, // 5MB
    minSizeBytes = 0,
    maxSizeBytes = 5 * 1024 * 1024,
    singleImage,
    onClick,
    renderFileInfo,
    renderThumbnail,
    onPreview,
    onCancel,
    onReupload,
    ref,
    ...rest
  } = props;

  const [previewImage, setPreviewImage] = useState(file.url ? file.url : null);

  const getThumbnail = useCallback(
    (callback: (previewImage: string | ArrayBuffer | null) => void) => {
      if (!~['picture-text', 'picture'].indexOf(listType)) {
        return;
      }

      if (!file.blobFile || file?.blobFile?.size > maxPreviewFileSize) {
        return;
      }

      previewFile(file.blobFile, callback);
    },
    [file, listType, maxPreviewFileSize]
  );

  useEffect(() => {
    if (!file.url) {
      getThumbnail(previewImage => {
        setPreviewImage(previewImage as string);
      });
    }
  }, [file.url, getThumbnail]);

  const handlePreview = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      onPreview?.(file, event);
    },
    [disabled, file, onPreview]
  );

  const handleRemove = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (disabled) {
        return;
      }
      onCancel?.(file.id as number | string, event);
    },
    [disabled, file.id, onCancel]
  );

  const handleReupload = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) {
        return;
      }
      onReupload?.(file, event);
    },
    [disabled, file, onReupload]
  );

  const renderProgressBar = () => {
    const { progress = 0, status } = file;

    return (
      <Progress
        value={progress}
        className={cn(
          'absolute bottom-0 left-12 h-1 w-full',
          !disabled && status === 'uploading' ? 'visible' : 'invisible'
        )}
      />
    );
  };

  const renderPreview = () => {
    const thumbnail = previewImage ? (
      <img
        role="presentation"
        src={previewImage}
        alt={file.name}
        onClick={handlePreview}
        aria-label={`Preview: ${file.name}`}
        onKeyDown={() => {
          void 0;
        }}
        className="h-full w-full object-contain"
      />
    ) : (
      <Paperclip className="h-4 w-4" />
    );

    return (
      <div
        className={cn('flex items-center justify-center', listType === 'picture' ? 'absolute inset-0' : 'h-12 w-12')}
      >
        {renderThumbnail ? renderThumbnail(file, thumbnail) : thumbnail}
      </div>
    );
  };

  const renderIcon = () => {
    const uploading = file.status === 'uploading';
    if (uploading) {
      return (
        <div
          className={cn(
            'flex items-center justify-center',
            listType === 'text' ? 'w-12' : 'absolute inset-0 z-10 bg-foreground/50 text-background',
            listType === 'picture-text' ? 'w-12' : ''
          )}
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      );
    }

    if (listType === 'picture' || listType === 'picture-text') {
      return null;
    }

    return (
      <div className="flex w-12 items-center justify-center">
        <Paperclip className="h-4 w-4" />
      </div>
    );
  };

  const renderRemoveButton = () => {
    if (!removable) {
      return null;
    }

    return (
      <Button
        variant="ghost"
        onClick={handleRemove}
        disabled={disabled}
        className={cn(
          'flex w-10 items-center justify-center p-0',
          listType === 'picture' ? 'absolute top-1 right-1 hidden h-6 w-6 bg-muted p-0 group-hover:flex' : '',
          file.status === 'error' ? 'hover:text-destructive' : ''
        )}
      >
        <X className="h-4 w-4" />
      </Button>
    );
  };

  const renderErrorStatus = () => {
    if (file.status === 'error') {
      const errorMessage =
        file.error === 'fileTooSmall'
          ? t('fileTooSmall', { size: formatSize(minSizeBytes) })
          : file.error === 'fileTooBig'
            ? t('fileTooBig', { size: formatSize(maxSizeBytes) })
            : t('uploadFail');
      return (
        <div
          className={cn(
            'flex items-center gap-2 text-xs',
            listType === 'picture' && 'absolute inset-0 flex flex-col items-center justify-center bg-foreground/70'
          )}
        >
          <span className="text-center">{errorMessage}</span>
          {allowReupload && (
            <Button
              onClick={handleReupload}
              variant="ghost"
              disabled={disabled}
              className={cn(
                'h-4 w-4 p-0 hover:bg-transparent hover:text-destructive/80',
                listType === 'picture' && 'ml-2 h-6 w-6 p-0 hover:bg-transparent'
              )}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    }
    return null;
  };

  const renderFileSize = () => {
    if (file.status !== 'error' && file.blobFile) {
      return <span className="text-xs">{formatSize(file?.blobFile?.size)}</span>;
    }
    return null;
  };

  const renderFilePanel = () => {
    const fileElement = (
      <div
        className="truncate"
        tabIndex={-1}
        onKeyDown={() => {
          void 0;
        }}
        onClick={handlePreview}
        aria-label={`Preview: ${file.name}`}
      >
        {file.name}
      </div>
    );
    return (
      <div className="relative flex min-w-0 flex-1 flex-col pb-1">
        {renderFileInfo ? renderFileInfo(file, fileElement) : fileElement}
        {renderErrorStatus()}
        {renderFileSize()}
      </div>
    );
  };

  if (listType === 'picture') {
    return (
      <div
        {...rest}
        ref={ref}
        className={cn(
          'group relative h-24 w-24 overflow-hidden rounded border',
          file.status === 'error' ? 'border-destructive text-destructive' : '',
          disabled ? 'opacity-50' : '',
          singleImage && 'h-full w-full',
          className
        )}
        onClick={onClick}
      >
        {renderIcon()}
        {renderPreview()}
        {renderErrorStatus()}
        {renderRemoveButton()}
      </div>
    );
  }

  return (
    <div
      {...rest}
      ref={ref}
      className={cn(
        'relative flex h-12 w-full items-center gap-2 overflow-hidden rounded border',
        file.status === 'error' ? 'border-destructive text-destructive' : '',
        disabled ? 'opacity-50' : '',
        className
      )}
    >
      {renderIcon()}
      {listType === 'picture-text' && renderPreview()}
      {renderFilePanel()}
      {renderRemoveButton()}
      {renderProgressBar()}
    </div>
  );
};
