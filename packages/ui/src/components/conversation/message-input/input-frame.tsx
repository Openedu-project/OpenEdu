'use client';

import type { IAgenConfigs, TAgentType } from '@oe/api/types/conversation';
import { type RefObject, useEffect, useMemo, useRef } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from '../constants';
import { useSendMessageHandler } from '../utils';
import MessageInput from './message-input';

export function InputFrame({
  className,
  id,
  agent = 'ai_search',
  containerRef,
}: { className?: string; id?: string; agent?: TAgentType; containerRef?: RefObject<HTMLDivElement | null> }) {
  const sendMessage = useSendMessageHandler(agent, id, undefined, containerRef);
  const { selectedModel, setWidth } = useConversationStore();
  const messageType = useMemo(
    () =>
      [
        'ai_search',
        ...Object.entries(AGENT_OPTIONS)
          .filter(([key]) => selectedModel?.configs[key as keyof IAgenConfigs])
          .map(([_, value]) => value),
      ] as TAgentType[],
    [selectedModel]
  );

  const inputRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const updateWidth = () => {
      if (inputRef?.current) {
        const width = inputRef.current.getBoundingClientRect().width;
        if (width > 0) {
          setWidth(width);
        }
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className={cn('max-w-3xl bg-background pt-2 xl:max-w-4xl', className)} ref={inputRef}>
      <MessageInput
        messageType={messageType}
        sendMessage={sendMessage}
        showInputOption
        className="w-full"
        generating={false}
        resetOnSuccess
      />
    </div>
  );
}
