import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useRef, useState, useImperativeHandle } from 'react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import type { UploadTriggerProps } from './types';
import { UploadFileItem } from './upload-file-item';
import { formatSize } from './utils';

export const UploadTrigger = (props: UploadTriggerProps) => {
  const {
    name,
    accept,
    multiple,
    disabled,
    readOnly,
    children,
    className,
    draggable,
    maxSizeBytes,
    fileItemProps,
    file,
    onChange,
    ref,
    ...rest
  } = props;
  const t = useTranslations('uploader');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleClearInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      if (draggable) {
        event.preventDefault();
        setDragOver(true);
      }
    },
    [draggable]
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      if (draggable) {
        event.preventDefault();
        setDragOver(false);
      }
    },
    [draggable]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      if (draggable) {
        event.preventDefault();
      }
    },
    [draggable]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      if (draggable) {
        event.preventDefault();
        setDragOver(false);
        onChange?.(event.dataTransfer.files);
      }
    },
    [draggable, onChange]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        onChange?.(event.target.files);
      }
    },
    [onChange]
  );

  useImperativeHandle(ref, () => ({
    clearInput: handleClearInput,
    input: inputRef.current,
  }));

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    disabled,
  };

  if (!(disabled || readOnly)) {
    buttonProps.onClick = handleClick;
    buttonProps.onDragEnter = handleDragEnter;
    buttonProps.onDragLeave = handleDragLeave;
    buttonProps.onDragOver = handleDragOver;
    buttonProps.onDrop = handleDrop;
  }

  const renderTrigger = () => {
    if (children) {
      if (!multiple && file) {
        return (
          <UploadFileItem
            {...fileItemProps}
            file={file}
            className={cn(
              React.isValidElement(children)
                ? (children.props as React.ButtonHTMLAttributes<HTMLButtonElement>).className
                : undefined
            )}
          />
        );
      }

      return React.cloneElement(React.Children.only(children as React.ReactElement), {
        ...buttonProps,
        className: cn(
          '[&_*]:pointer-events-none px-4 py-2 rounded',
          dragOver ? 'border-primary' : '',
          disabled ? 'cursor-not-allowed opacity-50' : '',
          React.isValidElement(children)
            ? (children.props as React.ButtonHTMLAttributes<HTMLButtonElement>).className
            : undefined
        ),
      } as React.ButtonHTMLAttributes<HTMLButtonElement>);
    }

    if (!multiple && file) {
      return (
        <UploadFileItem
          {...fileItemProps}
          file={file}
          className={cn(
            'h-full w-full flex-col border-2 border-dashed p-4 text-center font-normal font-secondary',
            dragOver ? 'border-primary' : '',
            disabled ? 'cursor-not-allowed opacity-50' : ''
          )}
        />
      );
    }

    return (
      <Button
        {...buttonProps}
        variant="outline"
        className={cn(
          'h-full w-full flex-col border-2 border-dashed p-4 text-center font-normal font-secondary [&_*]:pointer-events-none',
          dragOver ? 'border-primary' : '',
          disabled ? 'cursor-not-allowed opacity-50' : ''
        )}
      >
        {!multiple && file ? (
          <UploadFileItem {...fileItemProps} file={file} />
        ) : (
          <>
            <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
            <span className="mt-2">{t('dragAndDrop')}</span>
            <span className="mt-1 text-xs">
              {accept ? t('acceptedFormats', { formats: accept }) : t('allFileTypesAccepted')}
            </span>
            {maxSizeBytes && (
              <span className="mt-1 text-xs">{t('maxFileSize', { size: formatSize(maxSizeBytes) })}</span>
            )}
          </>
        )}
      </Button>
    );
  };

  return (
    <div className={cn('inline-flex flex-col', !children && 'h-full w-full', className)}>
      <input
        type="file"
        name={name}
        multiple={multiple}
        disabled={disabled}
        readOnly={readOnly}
        accept={accept}
        ref={inputRef}
        onChange={handleChange}
        className="-left-[999px] absolute w-0"
        {...rest}
      />
      {renderTrigger()}
      {/* {maxSizeBytes && !singleImage && (
        <span className="text-xs italic">{t('maxFileSize', { size: formatSize(maxSizeBytes) })}</span>
      )} */}
    </div>
  );
};
