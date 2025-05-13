import type { z } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import type { InputFieldProps } from '../type';
import type { chatSchema } from '../utils';
import { InputDefault } from './input-default';
import { InputWithAgent } from './input-with-agent';

export const InputField = ({
  form,
  type,
  handleKeyDown,
  setInputType,
  handleInputChange,
  inputRef,
  canChangeType,
  className,
}: InputFieldProps<z.infer<typeof chatSchema>>) => {
  const tAI = useTranslations('aiAssistant');

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (form?.getValues('message') === '@') {
      form?.setValue('message', '');
    }
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
          form={form}
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
          form={form}
        />
      );
    }
  }
};
