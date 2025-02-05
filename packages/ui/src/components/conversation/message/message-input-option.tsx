import type { TAgentType } from '@oe/api/types/conversation';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { INPUT_BUTTON } from '../constants';

interface IInputOptionProps {
  messageType?: TAgentType[];
  className?: string;
  handleSelect: (option: TAgentType) => void;
  buttonClassName?: string;
  hiddenDisableAgent?: boolean;
  align?: 'vertical' | 'horizontal';
  selectedIndex?: number;
}

export const InputOption = ({
  messageType,
  className,
  handleSelect,
  buttonClassName,
  hiddenDisableAgent,
  align = 'horizontal',
  selectedIndex,
}: IInputOptionProps) => {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className={cn('flex gap-2', align === 'vertical' && 'flex-col', className)}>
      {INPUT_BUTTON.filter(btn => messageType?.includes(btn.type) || !hiddenDisableAgent).map((button, index) => (
        <Button
          key={button.type}
          variant="ghost"
          type="button"
          className={cn(
            "!rounded-full before:!rounded-full relative flex items-center gap-1 border border-primary bg-primary/5 before:absolute before:z-[-1] before:h-full before:w-full before:bg-white before:content-['']",
            buttonClassName,
            selectedIndex === index && 'bg-primary/10'
          )}
          onClick={() => handleSelect(button.type)}
          disabled={!messageType?.includes(button.type)}
        >
          {button.icon}
          <span className={cn('mcaption-semibold12', align === 'horizontal' && 'hidden md:block')}>
            {tAI(button.textKey)}
          </span>
        </Button>
      ))}
    </div>
  );
};
