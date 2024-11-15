import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useRef, useState, useImperativeHandle } from 'react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import type { UploadTriggerProps } from './types';
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
    singleImage,
    file,
    onChange,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    ref,
    ...rest
  } = props;
  const t = useTranslations('uploader');
  const rootRef = useRef<HTMLDivElement>(null);
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
      onDragEnter?.(event);
    },
    [draggable, onDragEnter]
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      if (draggable) {
        event.preventDefault();
        setDragOver(false);
      }
      onDragLeave?.(event);
    },
    [draggable, onDragLeave]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      if (draggable) {
        event.preventDefault();
      }
      onDragOver?.(event);
    },
    [draggable, onDragOver]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      if (draggable) {
        event.preventDefault();
        setDragOver(false);
        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
      }
      onDrop?.(event);
    },
    [draggable, onChange, onDrop]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    [onChange]
  );

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    clearInput: handleClearInput,
    input: inputRef.current,
  }));

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    ...rest,
    disabled,
  };

  if (!(disabled || readOnly)) {
    buttonProps.onClick = handleClick;
    buttonProps.onDragEnter = handleDragEnter;
    buttonProps.onDragLeave = handleDragLeave;
    buttonProps.onDragOver = handleDragOver;
    buttonProps.onDrop = handleDrop;
  }

  const trigger = children ? (
    React.cloneElement(React.Children.only(children as React.ReactElement), {
      ...buttonProps,
      className: cn(
        '[&_*]:pointer-events-none px-4 py-2 rounded border',
        dragOver ? 'border-primary' : '',
        disabled ? 'cursor-not-allowed opacity-50' : '',
        singleImage ? 'w-24 h-24 flex items-center justify-center' : '',
        React.isValidElement(children)
          ? (children.props as React.ButtonHTMLAttributes<HTMLButtonElement>).className
          : undefined
      ),
    } as React.ButtonHTMLAttributes<HTMLButtonElement>)
  ) : (
    <Button
      {...buttonProps}
      variant="outline"
      className={cn(
        'h-full w-full flex-col border-0 p-2 text-center font-normal font-secondary [&_*]:pointer-events-none',
        dragOver ? 'border border-primary' : '',
        disabled ? 'cursor-not-allowed opacity-50' : ''
      )}
    >
      <Upload className="mx-auto" />
      <span className="mt-2">{t('dragAndDrop')}</span>
      <span className="mt-1 text-xs">
        {accept ? t('acceptedFormats', { formats: accept }) : t('allFileTypesAccepted')}
      </span>
      <span className="mt-1 text-xs">{t('maxFileSize', { size: formatSize(maxSizeBytes) })}</span>
    </Button>
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        'inline-flex flex-col',
        singleImage ? 'grow' : '',
        !children && 'w-full',
        file && singleImage && 'w-0'
      )}
    >
      <input
        type="file"
        name={name}
        multiple={multiple}
        disabled={disabled}
        readOnly={readOnly}
        accept={accept}
        ref={inputRef}
        onChange={handleChange}
        className="-left-[999px] absolute"
      />
      {file && singleImage ? null : trigger}
      {maxSizeBytes && !singleImage && (
        <span className="text-xs italic">{t('maxFileSize', { size: formatSize(maxSizeBytes) })}</span>
      )}
    </div>
  );
};
