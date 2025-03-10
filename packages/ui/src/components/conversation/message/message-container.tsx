import { useGetConversationDetails } from '@oe/api/hooks/useConversation';
import type { IMessage, TAgentType } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useEffect, useRef, useState } from 'react';
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
  sendMessage: ({
    messageInput,
    type,
    url,
    images,
    message_id,
    role,
  }: // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  ISendMessageParams) => void | Promise<unknown>;
}
export const MessageContainer = ({ id, sendMessage, nextCursorPage = '', messageType }: IContainerProps) => {
  const { messages, status, setMessages } = useConversationStore();
  const [shouldGetData, setShouldGetData] = useState<boolean>(false);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  const nextKeyRef = useRef<string>(nextCursorPage);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollBottom = useRef<boolean>(false);

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
        const scrollDiff = newScrollHeight - prevScrollHeight;
        containerRef.current.scrollTop = scrollDiff;
      }
    });
  }, [data]);

  useEffect(() => {
    if (!containerRef.current || messages.length === 0 || scrollBottom.current) {
      return;
    }
    const { scrollHeight } = containerRef.current;

    containerRef.current.scrollTop = scrollHeight;
    scrollBottom.current = true;
  }, [messages.length]);

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }
    if (containerRef?.current?.scrollTop < 100 && !shouldGetData) {
      setPrevScrollHeight(containerRef.current.scrollHeight);
      setShouldGetData(true);
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
      className={cn('no-scrollbar flex grow flex-col gap-2 overflow-y-auto overflow-x-hidden')}
      onScroll={handleScroll}
    >
      <div className="flex max-w-3xl flex-col gap-4 xl:max-w-4xl">
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
        <GenMessage containerRef={containerRef} />
      </div>
    </div>
  );
};
