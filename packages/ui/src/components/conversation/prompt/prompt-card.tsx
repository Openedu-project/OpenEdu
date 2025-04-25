'use client';
import { isLogin } from '@oe/api';
import type { TAgentType } from '@oe/api';
import { animated, useSpring } from '@react-spring/web';
import { MoveRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button } from '#shadcn/button';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';

const AnimatedDiv = animated('div');

export const ExpandPromptCard = ({
  text,
  side = 'bottom',
  disabled,
  callbackFn,
}: {
  agent?: TAgentType;
  text: string;
  side?: 'bottom' | 'top';
  disabled?: boolean;
  callbackFn?: () => void;
}) => {
  const { setInputValue } = useConversationStore();
  const { setLoginRequiredModal } = useLoginRequiredStore();

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const textSpring = useSpring({
    height: isHovered ? `${Math.max(textRef?.current?.clientHeight ?? 0, 60)}px` : '60px',
    opacity: 1,
    config: { tension: 220, friction: 40 },
  });
  const openNewChatWithPrompt = async () => {
    if (!isHovered) {
      setIsHovered(true);
      return;
    }
    const login = await isLogin();

    if (!login) {
      setLoginRequiredModal(true);
      return;
    }
    setInputValue(text);
    callbackFn?.();
  };

  return (
    <div className="relative px-2">
      <div className={cn('invisible hidden lg:flex', 'flex-col items-end whitespace-normal rounded-3xl p-1.5 md:p-3')}>
        <div className="relative w-full">
          <div className="h-[60px]" />
        </div>
      </div>

      <div
        ref={cardRef}
        className={cn(
          'left-0 w-full lg:absolute',
          side === 'top' && 'bottom-0',
          side === 'bottom' && 'top-0',
          'transition-all duration-300'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          zIndex: isHovered ? 50 : 1,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Button
          variant="outline"
          className={cn(
            'mcaption-regular14 group relative h-auto w-full animate-fadeIn flex-col items-end whitespace-normal rounded-3xl bg-background p-3',
            'before:absolute before:top-0 before:left-0 before:z-[-1]',
            'before:rounded-3xl before:bg-white before:content-[""]',
            'before:h-full before:w-full',
            'hover:bg-primary/10',
            isHovered && 'bg-primary/10'
          )}
          onClick={openNewChatWithPrompt}
          disabled={disabled}
        >
          <div className="relative w-full">
            <AnimatedDiv style={textSpring} className="overflow-hidden">
              <p ref={textRef} className="mcaption-regular14 text-start">
                {text}
              </p>
            </AnimatedDiv>
          </div>

          <MoveRight className={cn('mt-2 hidden h-4 w-4 text-primary group-hover:block', isHovered && 'block')} />
        </Button>
      </div>
    </div>
  );
};
