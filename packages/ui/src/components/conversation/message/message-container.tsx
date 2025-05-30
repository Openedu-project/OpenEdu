import { useGetConversationDetails } from '@oe/api/hooks/useConversation';
import type { IMessage, TAgentType } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useEffect, useRef, useState } from 'react';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { Skeleton } from '#shadcn/skeleton';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import type { ISendMessageParams } from '../type';
import { GenMessage } from './gen-message';
import MessageBox from './message-box';

interface IContainerProps {
  id: string;
  nextCursorPage?: string;
  rewrite: (msg: IMessage) => void;
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
export const MessageContainer = ({
  id,
  sendMessage,
  nextCursorPage = '',
  rewrite,
  messageType,
  className,
}: IContainerProps) => {
  const { messages, status, setMessages } = useConversationStore();
  const [shouldGetData, setShouldGetData] = useState<boolean>(false);

  const firstItemIndexRef = useRef<number>(99999);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
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
      firstItemIndexRef.current -= data.results.messages.length;
    }
  }, [data]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (status && GENERATING_STATUS.includes(status)) {
      virtuosoRef.current?.scrollToIndex({
        index: messages.length - 1,
        align: 'end',
        behavior: 'auto',
      });
    }
  }, [messages.length]);

  return (
    <Virtuoso
      className={cn('no-scrollbar', className)}
      data={messages}
      ref={virtuosoRef}
      totalCount={messages.length}
      firstItemIndex={firstItemIndexRef.current}
      followOutput="auto"
      initialTopMostItemIndex={{
        align: 'end',
        index: messages.length - 1,
      }}
      startReached={() => {
        if (nextKeyRef.current.length === 0) {
          return;
        }
        firstItemIndexRef.current -= 1;
        if (!(GENERATING_STATUS.includes(status ?? '') || isLoading)) {
          setShouldGetData(true);
        }
      }}
      itemContent={(_, msg: IMessage) => (
        <MessageBox
          key={msg.id}
          id={msg.id}
          message={msg}
          loading={GENERATING_STATUS.includes(status ?? '')}
          rewrite={!msg.ai_agent_type || messageType.includes(msg.ai_agent_type) ? () => rewrite(msg) : undefined}
          sendMessage={sendMessage}
          messageType={messageType}
        />
      )}
      components={{
        Header: () =>
          nextKeyRef.current.length > 0 ? (
            <div className="flex flex-col items-end gap-4">
              <Skeleton className="h-10 w-2/3 rounded-[20px]" />
              <Skeleton className="h-20 w-full rounded-[20px]" />
            </div>
          ) : null,
        Footer: () => <GenMessage sendMessage={sendMessage} messageType={messageType} />,
      }}
    />
  );
};
