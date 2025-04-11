import type { IFileResponse } from '@oe/api';
import { ajaxUpload } from '@oe/api';
import type { z } from '@oe/api';
import { uniqueID } from '@oe/core';
import { useTranslations } from 'next-intl';
import { type ClipboardEvent, useCallback, useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import type { FileStatusType, FileType } from '#components/uploader';
import { FormFieldWithLabel } from '#shadcn/form';
import { toast } from '#shadcn/sonner';
import { cn } from '#utils/cn';
import { MAX_FILES, MAX_SIZE_BYTES } from '../constants';
import type { InputFieldProps } from '../type';
import type { chatSchema } from '../utils';

export const InputDefault = ({
  handleKeyDown,
  inputRef,
  className,
  handleInputChange,
  placeholder,
  form,
}: InputFieldProps<z.infer<typeof chatSchema>>) => {
  const tAI = useTranslations('aiAssistant');
  const t = useTranslations('uploader');
  const loadingFileRef = useRef<string | null>(null);

  const { append, update } = useFieldArray({
    control: form?.control,
    name: 'files',
  });

  const handleAjaxUploadSuccess = useCallback(
    (file: FileType, response: IFileResponse) => {
      const successFile = {
        ...file,
        ...response,
        fileId: file.fileId,
        status: 'finished' as FileStatusType,
      };
      const index = form?.getValues('files')?.findIndex(f => f.fileId === loadingFileRef.current) ?? -1;
      update(index, successFile);
      loadingFileRef.current = '';
    },
    [update, form]
  );
  const handleAjaxUploadProgress = useCallback(
    (file: FileType, percent: number) => {
      if (loadingFileRef.current) {
        return;
      }
      const fileId = `loading_image_${uniqueID()}`;
      loadingFileRef.current = fileId;
      append({
        ...file,
        mime: 'image',
        fileId: fileId,
        status: 'generating' as FileStatusType,
        progress: percent,
      });
    },
    [append]
  );
  const handleAjaxUploadError = useCallback(
    (file: FileType) => {
      const errorFile = {
        ...file,
        name: 'image',
        mime: (file as unknown as File).type,
        fileId: file.fileId,
        status: 'error' as FileStatusType,
      };
      const index = form?.getValues('files')?.findIndex(f => f.fileId === loadingFileRef.current) ?? -1;
      update(index, errorFile);
      loadingFileRef.current = '';
    },
    [update, form]
  );

  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    if (e.clipboardData.items) {
      const items = Array.from(e.clipboardData.items);

      // Find image items in the clipboard
      const imageItems = items.filter(item => item.type.indexOf('image') !== -1);

      if (imageItems.length > 0) {
        e.preventDefault();

        const item = imageItems.at(-1);
        const blob = item?.getAsFile();

        if (!blob) {
          return;
        }
        const filesData = form?.watch('files');
        const totalSizeByte = filesData?.reduce((sum, file) => sum + (file.size as number), 0) ?? 0;

        // Check file limited
        if ((filesData?.length ?? 0) + 1 > MAX_FILES) {
          toast.error(t('limitUpload', { number: MAX_FILES }));
          return;
        }

        if (totalSizeByte + blob.size > MAX_SIZE_BYTES) {
          toast.error(t('fileTooBig', { size: MAX_SIZE_BYTES }));
          return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(blob);

        try {
          await ajaxUpload({
            name: 'files',
            file: blob,
            onProgress: handleAjaxUploadProgress.bind(null, blob as unknown as FileType),
            onSuccess: handleAjaxUploadSuccess.bind(null, blob as unknown as FileType),
            onError: handleAjaxUploadError.bind(null, blob as unknown as FileType),
          });
        } catch (error) {
          console.error('Upload failed:', error);
        }
      }
    }
  };

  return (
    <FormFieldWithLabel name="message" className={cn('w-full grow', className)} showErrorMessage={false}>
      <TextareaAutosize
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        placeholder={placeholder ?? tAI('inputPlaceholder')}
        className={cn(
          'mcaption-regular16 no-scrollbar block h-[22px] w-full resize-none bg-transparent focus-within:outline-hidden'
        )}
        maxRows={5}
        ref={inputRef}
        onPaste={handlePaste}
      />
    </FormFieldWithLabel>
  );
};
