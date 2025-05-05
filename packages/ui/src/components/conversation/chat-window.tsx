'use client';
import type { IAgenConfigs } from '@oe/api';
import { API_ENDPOINT, createAPIUrl, useGetConversationDetails } from '@oe/api';
import { GENERATING_STATUS } from '@oe/core';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { Skeleton } from '#shadcn/skeleton';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from './constants';
import { TRANSLATE_AGENT_KEY } from './constants';
import { EmptyChat } from './empty-chat';
import { useSendMessageHandler } from './hooks/useMessageHandler';
import { InputFrame } from './message-input/input-frame';
import { PromptGrid } from './prompt/prompt-grid';
import { PromptPopup } from './prompt/prompt-popup';
import type { IChatWindowProps } from './type';

const MessageContainer = dynamic(() => import('./message/message-container').then(mod => mod.MessageContainer), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex w-full max-w-3xl grow flex-col gap-4 xl:max-w-4xl">
      <div className="flex flex-col items-end gap-6">
        <Skeleton className="h-12 w-2/3 rounded-[20px]" />
        <Skeleton className="h-24 w-full rounded-[20px]" />
      </div>
    </div>
  ),
});

export function ChatWindow({ id, agent, className }: IChatWindowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { mutate: globalMutate } = useSWRConfig();
  const tAI = useTranslations('aiAssistant');

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
    <div className={cn('scrollbar flex h-full flex-col overflow-y-auto', className)}>
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
      <InputFrame id={id} messagesEndRef={messagesEndRef} agent={agent} reset={!id} />
      {messages.length === 0 && !id && (
        <PromptGrid
          className="mx-auto mt-4 max-w-3xl px-2 md:mt-8 xl:max-w-4xl"
          name={tAI(TRANSLATE_AGENT_KEY[agent])}
          agent={agent}
          litmited={8}
          PromptPopup={PromptPopup}
        />
      )}
    </div>
  );
}
