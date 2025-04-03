'use client';

import type { IAgenConfigs, TAgentType } from '@oe/api/types/conversation';
import { type RefObject, useEffect, useMemo, useRef } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from '../constants';
import { useSendMessageHandler } from '../hooks/useMessageHandler';
import MessageInput from './message-input';

export function InputFrame({
  className,
  id,
  agent = 'ai_search',
  containerRef,
  updateWidth = false,
  reset = false,
}: {
  className?: string;
  id?: string;
  agent?: TAgentType;
  containerRef?: RefObject<HTMLDivElement | null>;
  updateWidth?: boolean;
  reset?: boolean;
}) {
  const { resetMessages, selectedModel, setWidth, setSelectedModel, resetStatus, setThinking } = useConversationStore();
  const sendMessage = useSendMessageHandler(agent, id, undefined, containerRef);

  useEffect(() => {
    if (reset) {
      setSelectedModel(undefined);
      resetStatus();
      setThinking(false);
      resetMessages();
    }
  }, [reset, setSelectedModel, resetStatus, setThinking, resetMessages]);

  const messageType = useMemo(() => {
    if (agent !== 'ai_search') {
      return [];
    }
    return Object.entries(AGENT_OPTIONS)
      .filter(([key]) => selectedModel?.configs[key as keyof IAgenConfigs])
      .map(([_, value]) => value);
  }, [selectedModel, agent]);

  const inputRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getWidth = () => {
      if (inputRef?.current && updateWidth) {
        const width = inputRef.current.getBoundingClientRect().width;
        if (width > 0) {
          setWidth(width);
        }
      }
    };

    getWidth();
    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  return (
    <div className={cn('max-w-3xl bg-background pt-2 xl:max-w-4xl', className)} ref={inputRef}>
      <MessageInput
        messageType={messageType}
        sendMessage={sendMessage}
        showInputOption
        className="w-full"
        resetOnSuccess
      />
    </div>
  );
}
