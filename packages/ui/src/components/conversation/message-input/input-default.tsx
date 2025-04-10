import type { IFileResponse } from '@oe/api/types/file';
import { ajaxUpload } from '@oe/api/utils/ajax-upload';
import type { z } from '@oe/api/utils/zod';
import { useTranslations } from 'next-intl';
import { type ClipboardEvent, useCallback } from 'react';
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
  const { append } = useFieldArray({
    control: form?.control,
    name: 'files',
  });

  const fields = form?.watch('files');
  const handleAjaxUploadSuccess = useCallback(
    (file: FileType, response: IFileResponse) => {
      const successFile = {
        ...file,
        ...response,
        fileId: file.fileId,
        status: 'finished' as FileStatusType,
      };

      append(successFile);
    },
    [append]
  );

  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    if (e.clipboardData.items) {
      const items = Array.from(e.clipboardData.items);

      // Find image items in the clipboard
      const imageItems = items.filter(item => item.type.indexOf('image') !== -1);

      if (imageItems.length > 0) {
        e.preventDefault();

        // Process each image
        for (const item of imageItems) {
          const blob = item.getAsFile();
          if (!blob) {
            continue;
          }
          const totalSizeByte = fields?.reduce((sum, file) => sum + (file.size as number), 0) ?? 0;

          // Check file limited
          if ((fields?.length ?? 0) + 1 > MAX_FILES) {
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
              onSuccess: handleAjaxUploadSuccess.bind(null, blob as unknown as FileType),
            });
          } catch (error) {
            console.error('Upload failed:', error);
          }
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
