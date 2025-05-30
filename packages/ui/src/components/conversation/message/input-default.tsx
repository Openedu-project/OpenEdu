import { useTranslations } from 'next-intl';
import type { FieldValues, Path } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { FormFieldWithLabel } from '#shadcn/form';
import { cn } from '#utils/cn';
import type { InputFieldProps } from '../type';

export const InputDefault = <TFormValues extends FieldValues>({
  handleKeyDown,
  inputRef,
  className,
  handleInputChange,
}: InputFieldProps<TFormValues>) => {
  const tAI = useTranslations('aiAssistant');
  return (
    <FormFieldWithLabel
      name={'message' as Path<TFormValues>}
      className={cn('w-full', className)}
      showErrorMessage={false}
    >
      <TextareaAutosize
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        placeholder={tAI('inputPlaceholder')}
        className={cn(
          'mcaption-regular16 no-scrollbar block h-[22px] w-full resize-none bg-transparent pl-3 focus-within:outline-none'
        )}
        maxRows={4}
        ref={inputRef}
      />
    </FormFieldWithLabel>
  );
};
