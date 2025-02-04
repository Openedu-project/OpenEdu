import { useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { InputFieldProps } from '../type';
import { InputDefault } from './input-default';
import { InputImageAnalysis } from './input-image-analysis';
import { InputPresentation } from './input-presentation';

export const InputField = <TFormValues extends FieldValues>({
  form,
  type,
  handleKeyDown,
  setInputType,
  inputRef,
  canChangeType,
}: InputFieldProps<TFormValues>) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form?.reset();
  }, [type]);

  switch (type) {
    case 'ai_image_analysis': {
      return (
        <InputImageAnalysis
          handleKeyDown={handleKeyDown}
          setInputType={setInputType}
          inputRef={inputRef}
          canChangeType={canChangeType}
        />
      );
    }
    case 'ai_slide': {
      return (
        <InputPresentation
          handleKeyDown={handleKeyDown}
          setInputType={setInputType}
          inputRef={inputRef}
          canChangeType={canChangeType}
        />
      );
    }
    default: {
      return <InputDefault inputRef={inputRef} handleKeyDown={handleKeyDown} />;
    }
  }
};
