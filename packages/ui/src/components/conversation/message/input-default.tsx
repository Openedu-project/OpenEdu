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
  return (
    <FormFieldWithLabel name={'message' as Path<TFormValues>} className={cn('w-full', className)}>
      <TextareaAutosize
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        className={cn(
          'mcaption-regular12 lg:mcaption-regular14 block h-[20px] w-full resize-none bg-transparent focus-within:outline-none'
        )}
        maxRows={4}
        ref={inputRef}
      />
    </FormFieldWithLabel>
  );
};
