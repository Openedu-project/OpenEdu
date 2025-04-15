'use client';
import type { IAgenConfigs } from '@oe/api';
import { API_ENDPOINT, createAPIUrl, useGetConversationDetails } from '@oe/api';
import { GENERATING_STATUS } from '@oe/core';
import { useEffect, useMemo, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from './constants';
import { EmptyChat } from './empty-chat';
import { useSendMessageHandler } from './hooks/useMessageHandler';
import { InputFrame } from './message-input/input-frame';
import { MessageContainer } from './message/message-container';
import type { IChatWindowProps } from './type';

export function ChatWindow({ id, agent, className }: IChatWindowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { mutate: globalMutate } = useSWRConfig();

  const {
    isNewChat,
    setMessages,
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

  const sendMessage = useSendMessageHandler(agent, id);
  const shouldFetch = useRef<boolean>(!isNewChat);
  const { data: messageData, mutate } = useGetConversationDetails({
    shouldFetch: shouldFetch.current,
    id,
    params: {
      per_page: 10,
      sort: 'create_at desc',
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isNewChat) {
      setSelectedAgent(agent);
      resetMessages();
      resetGenMessage();
      resetStatus();
      resetOpenWebSource();
    }

    const apiKey = createAPIUrl({
      endpoint: API_ENDPOINT.COM_CHANNELS_ID,
      params: { id },
    });
    globalMutate((key: string) => !!key?.includes('/api/com-v1/channels/') && !key?.includes(apiKey), undefined, {
      revalidate: false,
    });
  }, [id, agent, setSelectedAgent]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
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
          messagesEndRef={messagesEndRef}
          mutate={mutate}
        />
      ) : (
        <EmptyChat agent={agent} />
      )}
      <InputFrame id={id} messagesEndRef={messagesEndRef} updateWidth agent={agent} />
    </div>
  );
}
