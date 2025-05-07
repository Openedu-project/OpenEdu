'use client';
import { API_ENDPOINT, createAPIUrl } from '@oe/api';
import type { IConversationDetails, IMessage, TAgentType } from '@oe/api';
import { useGetConversationDetails } from '@oe/api';
import { GENERATING_STATUS } from '@oe/core';
import { ChevronsDown } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type KeyedMutator, useSWRConfig } from 'swr';
import { Button } from '#shadcn/button';
import { Skeleton } from '#shadcn/skeleton';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { HISTORY_DEFAULT_PARAMS } from '../constants';
import type { ISendMessageParams } from '../type';
import { GenMessage } from './gen-message';
import { MessageBox } from './message-box';

interface IContainerProps {
  id: string;
  nextCursorPage?: string;
  messageType: TAgentType[];
  className?: string;
  scrollBehavior?: 'auto' | 'smooth';
  sendMessage: ({
    messageInput,
    type,
    url,
    files,
    message_id,
    role,
  }: // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  ISendMessageParams) => void | Promise<unknown>;
  mutate: KeyedMutator<IConversationDetails>;
}
export const MessageContainer = ({
  id,
  sendMessage,
  nextCursorPage = '',
  messageType,
  className,
  scrollBehavior,
  mutate,
}: IContainerProps) => {
  const { cache, mutate: globalMutate } = useSWRConfig();

  const { messages, status, setMessages, isNewChat, setIsNewChat } = useConversationStore();
  const [shouldGetData, setShouldGetData] = useState<boolean>(false);
  const [initScrollBottom, setInitScrollBottom] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const nextKeyRef = useRef<string>(nextCursorPage);
  const prevScrollHeight = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = useGetConversationDetails({
    shouldFetch: shouldGetData && nextKeyRef.current.length > 0,
    id,
    params: {
      cursor: nextKeyRef.current,
      sort: 'create_at desc',
      per_page: 10,
    },
  });

  useEffect(() => {
    nextKeyRef.current = nextCursorPage;
  }, [nextCursorPage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setShouldGetData(false);
    if (!data) {
      return;
    }
    nextKeyRef.current = data?.pagination?.next_cursor ?? '';

    if (data.results?.messages) {
      setMessages([...data.results.messages.reverse(), ...messages]);
    }
    requestAnimationFrame(() => {
      if (containerRef.current) {
        const newScrollHeight = containerRef.current.scrollHeight;
        const scrollDiff = newScrollHeight - prevScrollHeight.current - 200;
        containerRef.current.scrollTop = scrollDiff;
      }
    });
  }, [data]);

  useEffect(() => {
    if (!containerRef.current || messages.length === 0 || initScrollBottom) {
      return;
    }
    handleScrollToBottom(scrollBehavior);
    setTimeout(() => {
      setInitScrollBottom(true);
    }, 1000);
    if (isNewChat) {
      setIsNewChat(false);

      // clear history of conversation
      const keysToReset = Array.from(cache.keys()).filter(
        key => typeof key === 'string' && key.includes(`${API_ENDPOINT.COM_CHANNELS}?`)
      );

      for (const key of keysToReset) {
        globalMutate(key, undefined, {
          revalidate: !!key?.includes(
            createAPIUrl({
              endpoint: API_ENDPOINT.COM_CHANNELS,
              queryParams: HISTORY_DEFAULT_PARAMS,
            })
          ),
        });
      }
    }
  }, [messages.length, initScrollBottom, scrollBehavior, isNewChat, setIsNewChat, globalMutate, cache.keys]);

  const handleScrollToBottom = useCallback((scrollBehavior?: 'auto' | 'smooth') => {
    messagesEndRef.current?.scrollIntoView({
      behavior: scrollBehavior ?? 'smooth',
      block: 'end',
    });
  }, []);

  const triggerScrollBottomButton = useCallback(() => {
    const position = messagesEndRef.current?.getBoundingClientRect();
    if (!position) {
      return;
    }

    const showButton = position.bottom > (window.innerHeight || document.documentElement.clientHeight) - 50;
    setShowScrollButton(showButton);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleScroll = useCallback(() => {
    if (!containerRef.current) {
      return;
    }
    const { scrollTop, scrollHeight } = containerRef.current;
    if (scrollTop < 100 && !shouldGetData && initScrollBottom) {
      prevScrollHeight.current = scrollHeight;
      setShouldGetData(true);
    }

    triggerScrollBottomButton();
  }, [initScrollBottom, shouldGetData]);

  const rewrite = (msg: IMessage) => {
    if (!msg.ai_agent_type || messageType.includes(msg.ai_agent_type)) {
      void sendMessage({
        message_id: msg.id,
        type: msg.ai_agent_type,
        status: 'pending',
        role: msg.sender.role,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('scrollbar relative flex grow flex-col gap-2 overflow-y-auto overflow-x-hidden', className)}
      onScroll={handleScroll}
    >
      <div className="mx-auto flex w-full max-w-3xl grow flex-col gap-4 xl:max-w-4xl">
        {isLoading && (
          <div className="flex flex-col items-end gap-4">
            <Skeleton className="h-10 w-2/3 rounded-[20px]" />
            <Skeleton className="h-20 w-full rounded-[20px]" />
          </div>
        )}
        {messages.map(msg => {
          if (!msg) {
            return null;
          }
          return (
            <MessageBox
              key={msg.id}
              id={msg.id}
              message={msg}
              loading={GENERATING_STATUS.includes(status ?? '')}
              rewrite={!msg.ai_agent_type || messageType.includes(msg.ai_agent_type) ? () => rewrite(msg) : undefined}
              sendMessage={sendMessage}
              messageType={messageType}
            />
          );
        })}
        <GenMessage containerRef={containerRef} mutate={mutate} setShowScrollButton={setShowScrollButton} />
        <div id="end_line" className="h-10" ref={messagesEndRef} />
      </div>
      <div className={cn('sticky bottom-0 z-50 hidden translate-x-1/2', showScrollButton && 'block')}>
        <Button size="icon" variant="outline" className="rounded-full" onClick={() => handleScrollToBottom('smooth')}>
          <ChevronsDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
