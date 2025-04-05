import { Check, Eye, Loader2, Paperclip, Pencil, RotateCw, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useCallback, useState } from 'react';
import { Button } from '#shadcn/button';
import { Progress } from '#shadcn/progress';
import { cn } from '#utils/cn';
import type { UploadFileItemProps } from './types';
import { usePreviewImage } from './usePreview';
import { MAX_SIZE_BYTES, MIN_SIZE_BYTES, formatSize, isImage } from './utils';

export const UploadFileItem = (props: UploadFileItemProps) => {
  const t = useTranslations('uploader');
  const tErrors = useTranslations('errors');
  const {
    disabled,
    allowReupload = true,
    file,
    listType = 'text',
    className,
    removable = true,
    minSizeBytes = MIN_SIZE_BYTES,
    maxSizeBytes = MAX_SIZE_BYTES,
    thumbnailClassName,
    removeClassName,
    buttonsPosition = 'top-right',
    allowRename = false,
    renderFileInfo,
    renderThumbnail,
    onReupload,
    onRemove,
    onPreview,
    onFileNameChange,
    ...rest
  } = props;
  // const [showPreview, setShowPreview] = useState(false);
  const { previewImage } = usePreviewImage(file, listType);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(file.name);
  // const [error, setError] = useState<string | null>(null);

  const handleNameChange = useCallback(() => {
    if (!editName) {
      // setError("Name is required");
      return;
    }

    if (editName !== file.name) {
      onFileNameChange?.(file, editName);
    }
    setIsEditing(false);
  }, [editName, file, onFileNameChange]);

  const renderFileName = () => {
    return (
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="h-5 border-primary border-b text-base outline-hidden"
            />
            <Button type="button" variant="ghost" className="h-6 w-6 p-0" onClick={handleNameChange}>
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="truncate text-sm">{file.name}</span>
            {allowRename && (
              <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => setIsEditing(!isEditing)}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleRemove = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (disabled) {
        return;
      }
      onRemove?.(file);
    },
    [disabled, file, onRemove]
  );

  const handleReupload = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) {
        return;
      }
      onReupload?.(file);
    },
    [disabled, file, onReupload]
  );

  const handlePreview = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (disabled || !isImage(file.originFile as File)) {
        return;
      }
      onPreview?.(file);
    },
    [disabled, file, onPreview]
  );

  const renderProgressBar = () => {
    const { percent = 0, status } = file;

    return (
      <Progress
        value={percent}
        className={cn(
          'absolute bottom-0 left-12 h-1 w-full',
          !disabled && status === 'uploading' ? 'visible' : 'invisible'
        )}
      />
    );
  };

  const renderPreview = () => {
    const thumbnail =
      previewImage || file.url ? (
        <img
          role="presentation"
          src={previewImage || file.url}
          alt={file.name}
          aria-label={`Preview: ${file.name}`}
          className={cn('h-full w-full object-contain', thumbnailClassName)}
          onClick={handlePreview}
          onKeyDown={() => {
            void 0;
          }}
        />
      ) : (
        <Paperclip className="h-4 w-4" />
      );

    return (
      <>
        <div
          className={cn('flex items-center justify-center', listType === 'picture' ? 'absolute inset-0' : 'h-12 w-12')}
        >
          {renderThumbnail ? renderThumbnail(file, thumbnail) : thumbnail}
        </div>
      </>
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
          'mr-1 flex h-8 w-8 items-center justify-center rounded-full p-0',
          file.status === 'error' ? 'hover:text-destructive' : '',
          removeClassName
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
            : tErrors(file.error as string);
      return (
        <div
          className={cn(
            'flex items-center gap-2 text-xs',
            listType === 'picture' && 'absolute inset-0 flex flex-col items-center justify-center bg-foreground/70'
          )}
        >
          <span className="mt-1 text-center text-xs">{errorMessage}</span>
          {allowReupload && file.error !== 'fileTooSmall' && file.error !== 'fileTooBig' && (
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
    if (file.status !== 'error' && ((file?.originFile?.size ?? 0) > 0 || (file?.size ?? 0) > 0)) {
      return (
        <span className="text-muted-foreground text-xs">{formatSize(file?.originFile?.size ?? file?.size ?? 0)}</span>
      );
    }
    return null;
  };

  const renderFilePanel = () => {
    const fileElement = renderFileName();
    return (
      <div className="relative flex min-w-0 flex-1 flex-col py-1">
        {renderFileInfo ? renderFileInfo(file, fileElement) : fileElement}
        {renderErrorStatus()}
        {renderFileSize()}
      </div>
    );
  };

  const renderActionButtons = () => {
    if (!(removable || isImage(file.originFile as File))) {
      return null;
    }

    const containerClasses = cn('absolute inset-0 hidden group-hover:block', 'bg-foreground/30 backdrop-blur-xs');

    const buttonClasses = cn(
      'flex items-center justify-center gap-1',
      buttonsPosition === 'center' ? 'absolute inset-0 flex' : 'absolute top-1 right-1 flex'
    );

    const actionButtonClass = cn(
      'flex items-center justify-center rounded-full p-0',
      'bg-muted transition-colors',
      buttonsPosition === 'center' ? 'h-8 w-8' : 'h-6 w-6'
    );

    return (
      <div className={containerClasses}>
        <div className={buttonClasses}>
          {isImage(file.originFile as File) && (
            <Button variant="ghost" onClick={handlePreview} disabled={disabled} className={actionButtonClass}>
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {removable && (
            <Button
              variant="ghost"
              onClick={handleRemove}
              disabled={disabled}
              className={cn(
                actionButtonClass,
                file.status === 'error' ? 'hover:text-destructive' : '',
                removeClassName
              )}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  if (listType === 'picture') {
    return (
      <div
        {...rest}
        className={cn(
          'group relative h-24 w-24 overflow-hidden rounded border',
          file.status === 'error' ? 'border-destructive text-destructive' : '',
          disabled ? 'opacity-50' : '',
          className
        )}
      >
        {renderIcon()}
        {renderPreview()}
        {renderErrorStatus()}
        {renderActionButtons()}
      </div>
    );
  }

  return (
    <div
      {...rest}
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
