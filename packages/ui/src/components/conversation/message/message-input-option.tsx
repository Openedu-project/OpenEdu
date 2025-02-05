import type { TAgentType } from '@oe/api/types/conversation';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { INPUT_BUTTON } from '../constants';

interface IInputOptionProps {
  messageType?: TAgentType[];
  className?: string;
  handleSelect: (option: TAgentType) => void;
}

export const InputOption = ({ messageType, className, handleSelect }: IInputOptionProps) => {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className={cn('flex gap-2', className)}>
      {INPUT_BUTTON.map(button => (
        <Button
          key={button.type}
          variant="ghost"
          type="button"
          className="!rounded-full before:!rounded-full relative flex items-center gap-1 border border-primary bg-primary/5 before:absolute before:z-[-1] before:h-full before:w-full before:bg-white before:content-['']"
          onClick={() => handleSelect(button.type)}
          disabled={!messageType?.includes(button.type)}
        >
          {button.icon}
          <span className="mcaption-semibold12 hidden md:block">{tAI(button.textKey)}</span>
        </Button>
      ))}
    </div>
  );
};
