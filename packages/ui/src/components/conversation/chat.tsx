import { useGetConversationDetails } from '@oe/api/hooks/useConversation';
import type { IMessage, InputType } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { Skeleton } from '#shadcn/skeleton';
import { useConversationStore } from '#store/conversation-store';
import MessageBox from './message/message-box';
import type { ISendMessageParams } from './type';

interface IChatProps {
  id: string;
  nextCursorPage?: string;
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
export const ChatWithMessage = ({ id, sendMessage, nextCursorPage = '' }: IChatProps) => {
  const { messages, status, selectedModel, genMessage, setMessages } = useConversationStore();
  const [shouldGetData, setShouldGetData] = useState<boolean>(false);
  const atBottom = useRef<boolean>(true);

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

  const rewrite = (msg: IMessage) => {
    if (selectedModel?.configs.image_analysis_enabled || !msg.configs.is_image_analysis) {
      void sendMessage({
        message_id: msg.id,
        type: msg.configs.is_image_analysis ? 'image_analysis' : 'chat',
        status: 'pending',
        role: msg.sender.role,
      });
    }
  };

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

  const messageType = useMemo(() => {
    return ['chat', 'scrap_from_url', selectedModel?.configs?.image_analysis_enabled && 'image_analysis'].filter(
      Boolean
    ) as InputType[];
  }, [selectedModel]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (genMessage && atBottom.current) {
      virtuosoRef.current?.scrollToIndex({
        index: messages.length - 1,
        align: 'end',
        behavior: 'smooth',
      });
    }
  }, [messages.length]);

  return (
    <Virtuoso
      data={messages.filter(msg => msg.id !== genMessage?.id)}
      ref={virtuosoRef}
      style={{ paddingBottom: 0 }}
      atBottomStateChange={bottom => {
        atBottom.current = bottom;
      }}
      atBottomThreshold={50}
      alignToBottom={true}
      totalCount={messages.length}
      firstItemIndex={firstItemIndexRef.current}
      followOutput="auto"
      initialTopMostItemIndex={{ align: 'end', index: messages.length - 1 }}
      startReached={() => {
        if (!(GENERATING_STATUS.includes(status ?? '') || isLoading) && nextKeyRef.current.length > 0) {
          setShouldGetData(true);
        }
      }}
      itemContent={(_, msg: IMessage) => (
        <MessageBox
          key={msg.id}
          id={msg.id}
          message={msg}
          loading={GENERATING_STATUS.includes(status ?? '')}
          rewrite={
            !msg.configs?.is_image_analysis || messageType?.includes('image_analysis') ? () => rewrite(msg) : undefined
          }
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
        Footer: () =>
          genMessage ? (
            <MessageBox
              key={genMessage.id}
              id={genMessage.id}
              message={genMessage}
              loading={GENERATING_STATUS.includes(status ?? '')}
              rewrite={
                !genMessage.configs?.is_image_analysis || messageType?.includes('image_analysis')
                  ? () => rewrite(genMessage)
                  : undefined
              }
              sendMessage={sendMessage}
              messageType={messageType}
            />
          ) : null,
      }}
    />
  );
};
