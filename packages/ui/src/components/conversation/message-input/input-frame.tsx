'use client';

import type { IAgenConfigs, TAgentType } from '@oe/api';
import { type RefObject, useEffect, useMemo, useRef } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from '../constants';
import { useSendMessageHandler } from '../hooks/useMessageHandler';
import { MessageInput } from './message-input';

export function InputFrame({
  className,
  id,
  agent = 'ai_search',
  messagesEndRef,
  reset = false,
}: {
  className?: string;
  id?: string;
  agent?: TAgentType;
  messagesEndRef?: RefObject<HTMLDivElement | null>;
  reset?: boolean;
}) {
  const { resetMessages, selectedModel, setSelectedModel, resetStatus, setThinking, setNewConversationId } =
    useConversationStore();
  const sendMessage = useSendMessageHandler(agent, id, undefined, messagesEndRef);

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
    setNewConversationId('');
  }, []);

  return (
    <div className={cn('mx-auto w-full max-w-3xl bg-background pt-2 xl:max-w-4xl', className)} ref={inputRef}>
      <MessageInput
        messageType={messageType}
        sendMessage={sendMessage}
        showInputOption
        className="w-full"
        resetOnSuccess
        chatId={id}
      />
    </div>
  );
}
