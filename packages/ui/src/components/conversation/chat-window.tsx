'use client';
import { useGetConversationDetails } from '@oe/api/hooks/useConversation';
import { cancelConversation } from '@oe/api/services/conversation';
import type { IAgenConfigs, TAgentType } from '@oe/api/types/conversation';
import type { HTTPError } from '@oe/api/utils/http-error';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from './constants';
import EmptyChat from './empty-chat';
import { InputFrame } from './message-input/input-frame';
import { MessageContainer } from './message/message-container';
import type { IChatWindowProps } from './type';
import { useSendMessageHandler } from './utils';

export function ChatWindow({ id, initData, agent = 'ai_search', className }: IChatWindowProps) {
  const tError = useTranslations('errors');
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    isNewChat,
    setMessages,
    setIsNewChat,
    resetMessages,
    resetStatus,
    selectedModel,
    messages,
    resetGenMessage,
    setSelectedAgent,
    resetOpenWebSource,
  } = useConversationStore();

  const prevId = useRef<string>('');
  const sendMessage = useSendMessageHandler(agent, id);

  const { data: messageData, mutate } = useGetConversationDetails({
    id,
    params: {
      per_page: 10,
      sort: 'create_at desc',
    },
    fallback: initData,
  });

  const handleInitData = async () => {
    if (!isNewChat && id) {
      try {
        await cancelConversation(undefined, id);
        await mutate();
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPError).message));
      }
    }
  };

  const defaultAgent = useMemo(() => searchParams.get('agent'), [searchParams]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    resetOpenWebSource();

    if (!isNewChat) {
      setSelectedAgent((defaultAgent as TAgentType) ?? 'ai_search');
      resetGenMessage();
    }

    if (id && prevId.current === id) {
      return;
    }

    if (!id) {
      resetMessages();
      resetStatus();
      setIsNewChat(false);
      return;
    }
    handleInitData();

    return () => {
      prevId.current = id;
    };
  }, [id, defaultAgent]);

  useEffect(() => {
    if (messageData?.results) {
      setMessages([...messageData.results.messages].reverse());
    }
  }, [messageData, setMessages]);

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
    <div className={cn('flex h-full flex-col', className)}>
      {messages.length > 0 || id ? (
        <MessageContainer
          className="overflow-x-hidden"
          messageType={messageType}
          nextCursorPage={messageData?.pagination?.next_cursor}
          id={id ?? ''}
          sendMessage={sendMessage}
          containerRef={containerRef}
        />
      ) : (
        <EmptyChat />
      )}
      <InputFrame id={id} containerRef={containerRef} updateWidth />
    </div>
  );
}
