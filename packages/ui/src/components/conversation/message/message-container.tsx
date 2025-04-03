import { useGetConversationDetails } from '@oe/api/hooks/useConversation';
import type { IConversationDetails, IMessage, TAgentType } from '@oe/api/types/conversation';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { ChevronsDown } from 'lucide-react';
import { type RefObject, useEffect, useRef, useState } from 'react';
import { type KeyedMutator, useSWRConfig } from 'swr';
import { Button } from '#shadcn/button';
import { Skeleton } from '#shadcn/skeleton';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import type { ISendMessageParams } from '../type';
import { GenMessage } from './gen-message';
import MessageBox from './message-box';

interface IContainerProps {
  id: string;
  nextCursorPage?: string;
  messageType: TAgentType[];
  className?: string;
  containerRef: RefObject<HTMLDivElement | null>;
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
  containerRef,
  className,
  scrollBehavior,
  mutate,
}: IContainerProps) => {
  const { cache, mutate: globalMutate } = useSWRConfig();

  const { messages, status, setMessages, isNewChat, setIsNewChat } = useConversationStore();
  const [shouldGetData, setShouldGetData] = useState<boolean>(false);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [initScrollBottom, setInitScrollBottom] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const nextKeyRef = useRef<string>(nextCursorPage);
  const { data, isLoading } = useGetConversationDetails({
    shouldFetch: shouldGetData && nextKeyRef.current.length > 0,
    id,
    params: {
      cursor: nextKeyRef.current,
      sort: 'create_at desc',
      per_page: 10,
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setShouldGetData(false);
    if (!data) {
      return;
    }
    nextKeyRef.current = data?.pagination.next_cursor ?? '';

    if (data.results.messages) {
      setMessages([...data.results.messages.reverse(), ...messages]);
    }
    requestAnimationFrame(() => {
      if (containerRef.current) {
        const newScrollHeight = containerRef.current.scrollHeight;
        const scrollDiff = newScrollHeight - prevScrollHeight - 200;
        containerRef.current.scrollTop = scrollDiff;
      }
    });
  }, [data]);

  useEffect(() => {
    if (!containerRef.current || messages.length === 0 || initScrollBottom) {
      return;
    }
    handleScrollToBottom(scrollBehavior);
    if (isNewChat) {
      setIsNewChat(false);
      const keysToReset = Array.from(cache.keys()).filter(
        key => typeof key === 'string' && key.includes(`${API_ENDPOINT.COM_CHANNELS}?`)
      );

      // Then clear each one
      for (const key of keysToReset) {
        globalMutate(key, undefined, { revalidate: false });
      }
    }
  }, [
    messages.length,
    initScrollBottom,
    containerRef,
    scrollBehavior,
    isNewChat,
    setIsNewChat,
    globalMutate,
    cache.keys,
  ]);

  const handleScrollToBottom = (scrollBehavior?: 'auto' | 'smooth') => {
    if (!containerRef) {
      return;
    }
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: scrollBehavior ?? (isNewChat ? 'auto' : 'smooth'),
        });
      }
    });
  };

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop < 100 && !shouldGetData && initScrollBottom) {
      setPrevScrollHeight(scrollHeight);
      setShouldGetData(true);
    }

    if (scrollTop + clientHeight > scrollHeight - 50 && !initScrollBottom) {
      setInitScrollBottom(true);
    }

    if (scrollTop + clientHeight < scrollHeight - 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

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
      className={cn('no-scrollbar relative flex grow flex-col gap-2 overflow-y-auto overflow-x-hidden', className)}
      onScroll={handleScroll}
    >
      <div className="flex max-w-3xl grow flex-col gap-4 xl:max-w-4xl">
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
        <GenMessage containerRef={containerRef} mutate={mutate} />
      </div>
      <div className={cn('sticky bottom-0 hidden max-w-3xl translate-x-1/2 xl:max-w-4xl', showScrollButton && 'block')}>
        <Button size="icon" variant="outline" className="rounded-full" onClick={() => handleScrollToBottom()}>
          <ChevronsDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
