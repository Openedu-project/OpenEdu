'use client';
import type { IAgenConfigs } from '@oe/api';
import { API_ENDPOINT, createAPIUrl, useGetConversationDetails } from '@oe/api';
import { GENERATING_STATUS } from '@oe/core';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { Skeleton } from '#shadcn/skeleton';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from './constants';
import { useSendMessageHandler } from './hooks/useMessageHandler';
import { InputFrame } from './message-input/input-frame';
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

export const ChatWindow = ({ id, agent, className, isLogin }: IChatWindowProps) => {
  const { mutate: globalMutate } = useSWRConfig();

  const {
    setMessages,
    resetMessages,
    resetStatus,
    selectedModel,
    resetGenMessage,
    resetOpenWebSource,
    setGenMessage,
    setStatus,
    setResetPage,
    pendingParams,
    setPendingParams,
    setSelectedAgent,
  } = useConversationStore();

  const sendMessage = useSendMessageHandler(agent, id);
  const shouldFetch = useRef<boolean>(!pendingParams);
  const shouldSendPendingMsg = useRef(!!pendingParams);

  const { data: messageData, mutate } = useGetConversationDetails({
    shouldFetch: shouldFetch.current && isLogin,
    id,
    params: {
      per_page: 10,
      sort: 'create_at desc',
    },
  });

  useEffect(() => {
    if (shouldFetch.current) {
      resetMessages();
      resetGenMessage();
      resetStatus();
      resetOpenWebSource();
      setSelectedAgent(agent);
    }

    const apiKey = createAPIUrl({
      endpoint: API_ENDPOINT.COM_CHANNELS_ID,
      params: { id },
    });

    //clear cache all previous conversation details
    globalMutate((key: string) => !!key?.includes('/api/com-v1/channels/') && !key?.includes(apiKey), undefined, {
      revalidate: false,
    });
  }, [id, globalMutate, resetGenMessage, resetOpenWebSource, resetStatus, resetMessages, setSelectedAgent, agent]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (pendingParams && shouldSendPendingMsg.current) {
      sendMessage(pendingParams);
      setPendingParams(undefined);
      shouldSendPendingMsg.current = false;
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (messageData?.results) {
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
    <div className={cn('flex h-full flex-col pb-1', className)}>
      <MessageContainer
        className="overflow-x-hidden"
        messageType={messageType}
        nextCursorPage={messageData?.pagination?.next_cursor}
        id={id ?? ''}
        sendMessage={sendMessage}
        mutate={mutate}
      />

      <InputFrame id={id} agent={agent} />
    </div>
  );
};
