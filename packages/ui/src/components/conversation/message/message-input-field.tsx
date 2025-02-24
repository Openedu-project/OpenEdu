import { useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { InputFieldProps } from '../type';
import { InputDefault } from './input-default';
import { InputImageAnalysis } from './input-image-analysis';
import { InputWithAgent } from './input-with-agent';

export const InputField = <TFormValues extends FieldValues>({
  form,
  type,
  handleKeyDown,
  setInputType,
  handleInputChange,
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
          handleInputChange={handleInputChange}
        />
      );
    }
    case 'ai_search': {
      return <InputDefault inputRef={inputRef} handleKeyDown={handleKeyDown} handleInputChange={handleInputChange} />;
    }
    default: {
      return (
        <InputWithAgent
          handleKeyDown={handleKeyDown}
          setInputType={setInputType}
          inputRef={inputRef}
          canChangeType={canChangeType}
          type={type}
          handleInputChange={handleInputChange}
        />
      );
    }
  }
};
