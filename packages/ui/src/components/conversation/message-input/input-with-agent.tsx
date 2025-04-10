import type { z } from '@oe/api/utils/zod';
import { CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { INPUT_BUTTON } from '../constants';
import type { InputFieldProps } from '../type';
import type { chatSchema } from '../utils';
import { InputDefault } from './input-default';

export const InputWithAgent = ({
  handleKeyDown,
  setInputType,
  inputRef,
  canChangeType,
  type,
  handleInputChange,
  form,
}: InputFieldProps<z.infer<typeof chatSchema>>) => {
  const buttonData = INPUT_BUTTON.find(button => button.type === type);
  const tAI = useTranslations('aiAssistant');

  return (
    <>
      <div className="flex shrink-0 items-center gap-1">
        {buttonData?.icon}
        <p className="mcaption-semibold12">{tAI(buttonData?.textKey as string)}</p>

        {canChangeType && (
          <Button
            variant="ghost"
            type="button"
            size="icon"
            className="!p-2 h-8 w-8"
            onClick={() => setInputType?.('ai_search')}
          >
            <CircleX className="h-4 w-4" />
          </Button>
        )}
      </div>
      <InputDefault
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
        handleInputChange={handleInputChange}
        form={form}
      />
    </>
  );
};
