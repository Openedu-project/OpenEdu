import { revalidateData } from '@oe/api/actions/revalidate';
import { postConversation } from '@oe/api/services/conversation';
import type { IAIModel, IAIStatus, IMessage, TAgentType } from '@oe/api/types/conversation';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPError } from '@oe/api/utils/http-error';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { type RefObject, useCallback } from 'react';
import { useRouter } from '#common/navigation';
import { toast } from '#shadcn/sonner';
import { useConversationStore } from '#store/conversation-store';
import { AI_SIDEBAR } from '../constants';
import type { ISendMessageParams } from '../type';

export const useSendMessageHandler = (
  agent: TAgentType,
  id?: string,
  model?: IAIModel,
  containerRef?: RefObject<HTMLDivElement | null>
) => {
  const {
    setMessages,
    setIsNewChat,
    updateMessages,
    addMessage,
    setStatus,
    setGenMessage,
    resetOpenWebSource,
    resetGenMessage,
  } = useConversationStore();
  const router = useRouter();
  const tError = useTranslations('errors');

  const agentData = AI_SIDEBAR().find(data => data.agent === agent);

  return useCallback(
    async ({ messageInput = '', type, files, message_id, role, status }: ISendMessageParams) => {
      const currentSelectedModel = useConversationStore.getState().selectedModel;
      const messages = useConversationStore.getState().messages;
      const thinking = useConversationStore.getState().thinking;

      const messageID = message_id ?? `id_${Date.now()}`;
      resetOpenWebSource();
      const prevMessage = messages;
      const newMessage: IMessage = {
        content: messageInput,
        attachments: files?.filter(f => f.status === 'finished'),
        id: messageID,
        conversation_id: (id as string) ?? 'new-chat',
        create_at: Date.now(),
        content_type: 'text',
        status: (status ?? 'compeleted') as IAIStatus,
        ai_model: currentSelectedModel ?? model ?? { id: 'id_gpt', name: 'gpt-4o-mini' },
        is_ai: true,
        ai_agent_type: type,
        sender: { role: role ?? 'user' },
        props: null,
        reasoning: '',
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
          ai_model_id: currentSelectedModel?.id,
          content: messageInput,
          content_type: 'text',
          attachment_ids: files?.filter(f => f.status === 'finished').map(f => f.id),
          ai_conversation_id: id as string,
          message_id,
          extended_thinking: thinking,
        });

        if (data) {
          setGenMessage(data.messages?.at(-1) as IMessage, undefined, true);
        }

        if (messageID.includes('id_')) {
          updateMessages(data.messages?.at(0) as IMessage, undefined, undefined, messageID);
        }

        if (!id) {
          setIsNewChat(true);
          router.push(
            createAPIUrl({
              endpoint: agentData?.detailHref ?? AI_ROUTES.chatDetail,
              params: { id: data.id },
            })
          );
        }

        if (containerRef?.current) {
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth',
              });
            }
          });
        }
      } catch (error) {
        setStatus('failed');
        setMessages(prevMessage);
        resetGenMessage();
        console.error(error);
        toast.error(tError((error as HTTPError).message));
        if ((error as HTTPError).message.toString() === '32002') {
          revalidateData('tag', 'get_ai_models');
        }
      }
    },
    [
      addMessage,
      agent,
      id,
      model,
      resetOpenWebSource,
      router,
      setGenMessage,
      setMessages,
      setIsNewChat,
      setStatus,
      tError,
      updateMessages,
      containerRef,
      resetGenMessage,
      agentData,
    ]
  );
};
