import type { TAgentType } from '@oe/api/types/conversation';
import { useTranslations } from 'next-intl';
import { Button, type ButtonProps } from '#shadcn/button';
import { Tooltip } from '#shadcn/tooltip';
import { cn } from '#utils/cn';
import { INPUT_BUTTON } from '../constants';
import type { IInputButton } from '../type';

interface IInputOptionProps {
  messageType?: TAgentType[];
  className?: string;
  handleSelect: (option: TAgentType) => void;
  buttonClassName?: string;
  hiddenDisableAgent?: boolean;
  align?: 'vertical' | 'horizontal';
  selectedIndex?: number;
}

interface IAgentButtonProps extends ButtonProps {
  handleSelect?: (option: TAgentType) => void;
  align?: 'vertical' | 'horizontal';
  active?: boolean;
  agent: IInputButton;
}

export const AgentButton = ({
  handleSelect,
  className,
  align = 'horizontal',
  active,
  agent,
  disabled,
  ...props
}: IAgentButtonProps) => {
  const tAI = useTranslations('aiAssistant');

  return (
    <Button
      key={agent.type}
      variant="ghost"
      type="button"
      className={cn(
        "!rounded-full before:!rounded-full relative flex items-center gap-1 border border-primary bg-primary/5 before:absolute before:z-[-1] before:h-full before:w-full before:bg-white before:content-['']",
        className,
        active && 'bg-primary/10',
        disabled && 'cursor-not-allowed opacity-50'
      )}
      onClick={() => handleSelect?.(agent.type)}
      {...props}
    >
      {agent.icon}
      <span className={cn('mcaption-semibold12', align === 'horizontal' && 'hidden md:block')}>
        {tAI(agent.textKey)}
      </span>
    </Button>
  );
};

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
      {INPUT_BUTTON.filter(btn => messageType?.includes(btn.type) || !hiddenDisableAgent).map((button, index) => {
        if (messageType?.includes(button.type)) {
          return (
            <AgentButton
              key={button.type}
              agent={button}
              handleSelect={handleSelect}
              className={buttonClassName}
              active={selectedIndex === index}
            />
          );
        }
        return (
          <Tooltip key={button.type} content={tAI('agentMessage')}>
            <AgentButton agent={button} disabled className={buttonClassName} />
          </Tooltip>
        );
      })}
    </div>
  );
};
