import { CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FieldValues } from 'react-hook-form';
import { Button } from '#shadcn/button';
import { INPUT_BUTTON } from '../constant';
import type { InputFieldProps } from '../type';
import { InputDefault } from './input-default';

export const InputPresentation = <TFormValues extends FieldValues>({
  handleKeyDown,
  setInputType,
  inputRef,
  canChangeType,
}: InputFieldProps<TFormValues>) => {
  const buttonData = INPUT_BUTTON.find(button => button.type === 'ai_slide');
  const tAI = useTranslations('aiAssistant');

  return (
    <>
      <div className="flex shrink-0 items-center gap-1 border-r">
        {buttonData?.icon}
        <p className="mcaption-semibold12 hidden lg:block">{tAI(buttonData?.textKey)}</p>

        {canChangeType && (
          <Button
            variant="ghost"
            type="button"
            size="icon"
            className="!p-2 h-8 w-8"
            onClick={() => setInputType?.('chat')}
          >
            <CircleX className="h-4 w-4" />
          </Button>
        )}
      </div>
      <InputDefault inputRef={inputRef} handleKeyDown={handleKeyDown} />
    </>
  );
};
