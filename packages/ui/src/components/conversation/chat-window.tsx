'use client';
import { useGetMe } from '@oe/api/hooks/useMe';
import { postConversation } from '@oe/api/services/conversation';
import type { IAIModel, IAIStatus, IMessage } from '@oe/api/types/conversation';
import type { HTTPError } from '@oe/api/utils/http-error';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { AI_ROUTES, generateRoute } from '@oe/core/utils/routes';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useRouter } from '#common/navigation';
import { cn } from '#utils/cn';
import { useConversationStore } from '../../_stores/conversation-store';
import { ChatWithMessage } from './chat';
import MessageInput from './message/message-input';
import type { ISendMessageParams } from './type';

export function ChatWindow({
  id,
  initMessages = [],
  nextCursorPage,
}: {
  id?: string;
  aiModels?: IAIModel[];
  initMessages?: IMessage[];
  nextCursorPage?: string;
}) {
  const tAI = useTranslations('aiAssistant');
  const { dataMe } = useGetMe();

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
    selectedModel,
    setGenMessage,
  } = useConversationStore();

  const [modelWarning, setModelWarning] = useState<boolean>(false);
  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!id) {
      resetMessages();
      return;
    }

    if (initMessages.length > 0 && !isNewChat) {
      setMessages([...initMessages].reverse());
      if (initMessages.filter(message => GENERATING_STATUS.includes(message.status ?? ''))?.length > 0) {
        setStatus('generating');
      }
    }
  }, []);

  const sendMessage = async ({ messageInput = '', type, images, message_id, role, status }: ISendMessageParams) => {
    const messageID = message_id ?? `id-${Date.now()}`;

    const prevMessage = messages;

    const newMessage: IMessage = {
      content: messageInput,
      attachments: images,
      id: messageID,
      conversation_id: (id as string) ?? 'new-chat',
      create_at: Date.now(),
      content_type: 'text',
      configs: { is_image_analysis: type === 'image_analysis' },
      status: (status ?? 'compeleted') as IAIStatus,
      ai_model: selectedModel ?? { name: 'gpt-4o-mini' },
      is_ai: true,
      sender: { role: role ?? 'user' },
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
        index
      );
    } else {
      updateMessages(newMessage, index, () => {
        setStatus('pending');
      });
    }

    try {
      const data = await postConversation(undefined, {
        ai_model: selectedModel?.name ?? 'gpt-4o-mini',
        content: messageInput,
        content_type: 'text',
        is_image_analysis: type === 'image_analysis',
        attachment_ids: images?.map(image => image.id),
        ai_conversation_id: id as string,
        message_id,
      });

      setGenMessage(data.messages?.at(-1) as IMessage);

      if (messageID.includes('id')) {
        updateMessages(data.messages?.at(0) as IMessage, undefined, undefined, messageID);
      }

      if (!id) {
        setIsNewChat(true);
        router.push(generateRoute(AI_ROUTES.chatDetail, { id: data.id }));
      }
    } catch (error) {
      setStatus('error');
      setMessages(prevMessage);
      if ((error as HTTPError).metadata?.code.toString() === '32002') {
        setModelWarning(true);
        // revalidateTag('ai-models');
      }
      return error;
    }
  };

  return (
    <>
      <div className={cn('flex grow flex-col gap-2 overflow-scroll', id ? 'bg-background' : 'items-center')}>
        {id ? (
          <ChatWithMessage sendMessage={sendMessage} nextCursorPage={nextCursorPage} animationScroll={true} />
        ) : (
          <h2 className="mcaption-regular24 md:giant-iheading-bold40 !font-normal m-auto text-center">
            {tAI.rich('aiHelloText', {
              name: (dataMe?.display_name ?? '').length > 0 ? dataMe?.display_name : dataMe?.username,
            })}
          </h2>
        )}
      </div>
      <div className="pt-2">
        {modelWarning && (
          <div className="m-auto flex w-[95%] items-center gap-2 rounded-t-xl bg-primary/10 p-2">
            <CircleAlert className="h-4 w-4" />
            <p className="mcaption-regular14">{tAI('modelLimitedWarning')}</p>
          </div>
        )}
        <MessageInput
          messageType={['image_analysis', 'scrap_from_url', 'chat']}
          sendMessage={sendMessage}
          showInputOption
          className="w-full"
          generating={GENERATING_STATUS.includes(status ?? '')}
        />
      </div>
    </>
  );
}
