import { createAPIUrl, postEmptyConversation } from '@oe/api';
import type { HTTPError } from '@oe/api';
import { postConversation } from '@oe/api';
import type { IAIModel, IAIStatus, IMessage, TAgentType } from '@oe/api';
import { revalidateData } from '@oe/api';
import { AI_ROUTES } from '@oe/core';
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
  messagesEndRef?: RefObject<HTMLDivElement | null>
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
    setPendingParams,
  } = useConversationStore();
  const router = useRouter();
  const tError = useTranslations('errors');

  const agentData = AI_SIDEBAR().find(data => data.agent === agent);

  return useCallback(
    async ({ messageInput = '', type, files, message_id, role, status }: ISendMessageParams) => {
      const currentSelectedModel = useConversationStore.getState().selectedModel;
      const messages = useConversationStore.getState().messages;
      const thinking = useConversationStore.getState().thinking;
      const newId = useConversationStore.getState().newConversationId;

      resetOpenWebSource();
      const prevMessage = messages;

      try {
        if (!id) {
          const data = await postEmptyConversation(undefined, { ai_agent_type: agent });
          setPendingParams({ messageInput, type, files, message_id, role, status });
          setIsNewChat(true);
          router.push(
            createAPIUrl({
              endpoint: agentData?.detailHref ?? AI_ROUTES.chatDetail,
              params: { id: data.id },
            })
          );
          return;
        }

        const messageID = message_id ?? `id_${Date.now()}`;
        const newMessage: IMessage = {
          content: messageInput,
          attachments: files?.filter(f => ['finished', 'completed'].includes(f.status ?? '')),
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

        const data = await postConversation(undefined, {
          ai_agent_type: agent,
          message_ai_agent_type: type,
          ai_model_id: currentSelectedModel?.id,
          content: messageInput,
          content_type: 'text',
          attachment_ids: files?.filter(f => ['finished', 'completed'].includes(f.status ?? '')).map(f => f.id),
          ai_conversation_id: (id as string) ?? newId,
          message_id,
          extended_thinking: thinking,
        });

        if (data) {
          setGenMessage(data.messages?.at(-1) as IMessage, undefined, true);
        }

        if (messageID.includes('id_')) {
          updateMessages(data.messages?.at(0) as IMessage, undefined, undefined, messageID);
        }

        if (messagesEndRef?.current) {
          requestAnimationFrame(() => {
            if (messagesEndRef.current) {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
          });
        }
      } catch (error) {
        setStatus('failed');
        if (id) {
          setMessages(prevMessage);
          resetGenMessage();
        }
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
      messagesEndRef,
      resetGenMessage,
      agentData,
      setPendingParams,
    ]
  );
};
