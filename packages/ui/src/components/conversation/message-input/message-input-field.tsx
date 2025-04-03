import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { InputFieldProps } from '../type';
import { InputDefault } from './input-default';
import { InputWithAgent } from './input-with-agent';

export const InputField = <TFormValues extends FieldValues>({
  form,
  type,
  handleKeyDown,
  setInputType,
  handleInputChange,
  inputRef,
  canChangeType,
  className,
}: InputFieldProps<TFormValues>) => {
  const tAI = useTranslations('aiAssistant');

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form?.reset();
  }, [type]);

  switch (type) {
    case 'ai_search': {
      return (
        <InputDefault
          inputRef={inputRef}
          handleKeyDown={handleKeyDown}
          className={className}
          handleInputChange={handleInputChange}
          placeholder={tAI('inputPlaceholderWithTip')}
        />
      );
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
          className={className}
        />
      );
    }
  }
};
