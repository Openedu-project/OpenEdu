'use client';
import { useGetConversationDetails } from '@oe/api/hooks/useConversation';
import type { IAgenConfigs } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useEffect, useMemo, useRef } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from './constants';
import EmptyChat from './empty-chat';
import { useSendMessageHandler } from './hooks/useMessageHandler';
import { InputFrame } from './message-input/input-frame';
import { MessageContainer } from './message/message-container';
import type { IChatWindowProps } from './type';

export function ChatWindow({ id, initData, agent, className }: IChatWindowProps) {
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
    setGenMessage,
    setStatus,
    setResetPage,
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    resetOpenWebSource();
    console.log('initData :>> ', initData);
    if (!isNewChat) {
      setSelectedAgent(agent);
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

    return () => {
      prevId.current = id;
    };
  }, [id, agent, setSelectedAgent]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setResetPage(false);
    if (messageData?.results && !isNewChat) {
      const genMsgData = messageData.results.messages.find(msg => GENERATING_STATUS.includes(msg.status ?? ''));
      if (genMsgData) {
        setGenMessage(
          genMsgData,
          () => {
            setStatus('generating');
            setResetPage(true);
          },
          true
        );
      }
      setMessages(
        [...messageData.results.messages.filter(msg => !GENERATING_STATUS.includes(msg.status ?? ''))].reverse()
      );
    }
  }, [messageData, setMessages]);

  const messageType = useMemo(
    () =>
      Object.entries(AGENT_OPTIONS)
        .filter(([key]) => selectedModel?.configs[key as keyof IAgenConfigs])
        .map(([_, value]) => value),
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
          mutate={mutate}
        />
      ) : (
        <EmptyChat agent={agent} />
      )}
      <InputFrame id={id} containerRef={containerRef} updateWidth agent={agent} />
    </div>
  );
}
