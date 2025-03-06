'use client';

import type { IAgenConfigs, TAgentType } from '@oe/api/types/conversation';
import { useMemo } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from '../constants';
import { useHandleSendMessage } from '../utils';
import MessageInput from './message-input';

export function InputFrame({
  className,
  id,
  agent = 'ai_search',
}: { className?: string; id?: string; agent?: TAgentType }) {
  const sendMessage = useHandleSendMessage(agent, id);
  const { selectedModel } = useConversationStore();
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

  return (
    <div className={cn('max-w-4xl bg-background pt-2', className)}>
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
