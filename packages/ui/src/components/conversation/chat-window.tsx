'use client';
import { revalidateData } from '@oe/api/actions/revalidate';
import { useGetConversationDetails } from '@oe/api/hooks/useConversation';
import { cancelConversation, postConversation } from '@oe/api/services/conversation';
import type { IAIStatus, IAgenConfigs, IMessage, TAgentType } from '@oe/api/types/conversation';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPError } from '@oe/api/utils/http-error';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from '#common/navigation';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { ChatWithMessage } from './chat';
import { AGENT_OPTIONS } from './constants';
import MessageInput from './message/message-input';
import type { IChatWindowProps, ISendMessageParams } from './type';

const EmptyChat = dynamic(() => import('./empty-chat'), { ssr: false });

export function ChatWindow({ id, initData, agent = 'ai_search', className }: IChatWindowProps) {
  const tError = useTranslations('errors');
  const searchParams = useSearchParams();

  const {
    messages,
    isNewChat,
    setMessages,
    setIsNewChat,
    resetMessages,
    updateMessages,
    addMessage,
    status,
    setStatus,
    resetStatus,
    selectedModel,
    setGenMessage,
    setSelectedAgent,
    resetOpenWebSource,
  } = useConversationStore();

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevId = useRef<string>('');

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

  const sendMessage = async ({ messageInput = '', type, images, message_id, role, status }: ISendMessageParams) => {
    const messageID = message_id ?? `id_${Date.now()}`;
    resetOpenWebSource();
    const prevMessage = messages;

    const newMessage: IMessage = {
      content: messageInput,
      attachments: images,
      id: messageID,
      conversation_id: (id as string) ?? 'new-chat',
      create_at: Date.now(),
      content_type: 'text',
      status: (status ?? 'compeleted') as IAIStatus,
      ai_model: selectedModel ?? { name: 'gpt-4o-mini' },
      is_ai: true,
      ai_agent_type: type,
      sender: { role: role ?? 'user' },
      props: null,
    };

    const index = messages?.findIndex(msg => msg.id === message_id) ?? -1;

    if (index === -1) {
      addMessage(newMessage, () => {
        setStatus('pending');
      });
    } else if (role === 'assistant') {
      setGenMessage(
        newMessage,
        () => {
          setStatus('pending');
        },
        true,
        index
      );
    } else {
      updateMessages(newMessage, index, () => {
        setStatus('pending');
      });
    }

    try {
      const data = await postConversation(undefined, {
        ai_agent_type: agent,
        message_ai_agent_type: type,
        ai_model: selectedModel?.name ?? 'gpt-4o-mini',
        content: messageInput,
        content_type: 'text',
        attachment_ids: images?.map(image => image.id),
        ai_conversation_id: id as string,
        message_id,
      });

      setGenMessage(data.messages?.at(-1) as IMessage, undefined, true);

      if (messageID.includes('id_')) {
        updateMessages(data.messages?.at(0) as IMessage, undefined, undefined, messageID);
      }

      if (!id) {
        setIsNewChat(true);
        router.push(createAPIUrl({ endpoint: AI_ROUTES.chatDetail, params: { id: data.id } }));
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } catch (error) {
      setStatus('failed');
      setMessages(prevMessage);
      console.error(error);
      toast.error(tError((error as HTTPError).message));
      if ((error as HTTPError).message.toString() === '32002') {
        revalidateData('tag', 'get_ai_models');
      }
    }
  };

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div ref={containerRef} className={cn('flex grow flex-col gap-2 overflow-hidden')}>
        {id ? (
          <ChatWithMessage
            messageType={messageType}
            sendMessage={sendMessage}
            nextCursorPage={messageData?.pagination?.next_cursor}
            id={id}
          />
        ) : (
          <EmptyChat />
        )}
      </div>
      <div className="max-w-3xl bg-background pt-2">
        <MessageInput
          messageType={messageType}
          sendMessage={sendMessage}
          showInputOption
          className="w-full"
          generating={GENERATING_STATUS.includes(status ?? '')}
          resetOnSuccess
        />
      </div>
    </div>
  );
}
