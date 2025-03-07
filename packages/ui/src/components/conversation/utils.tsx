import { revalidateData } from '@oe/api/actions/revalidate';
import { postConversation } from '@oe/api/services/conversation';
import type { IAIModel, IAIStatus, IMessage, TAgentType } from '@oe/api/types/conversation';
import { fileResponseSchema } from '@oe/api/types/file';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPError } from '@oe/api/utils/http-error';
import { z } from '@oe/api/utils/zod';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';
import { useRouter } from '#common/navigation';
import { toast } from '#shadcn/sonner';
import { useConversationStore } from '#store/conversation-store';
import { DESKTOP_BREAKPOINT } from './constants';
import type { ISendMessageParams } from './type';

export const chatSchema = z.object({
  message: z.string().min(1, 'formValidation.required'),
  images: z
    .array(
      fileResponseSchema.optional().refine(data => data !== undefined, {
        message: 'formValidation.required',
      })
    )
    .optional()
    .nullable(),
});

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const onChange = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isDesktop;
}

export const useHandleSendMessage = (agent: TAgentType, id?: string, model?: IAIModel) => {
  const {
    messages,
    setMessages,
    setIsNewChat,
    updateMessages,
    addMessage,
    setStatus,
    selectedModel,
    setGenMessage,
    resetOpenWebSource,
  } = useConversationStore();
  const router = useRouter();
  const tError = useTranslations('errors');

  return useCallback(
    async ({ messageInput = '', type, images, message_id, role, status }: ISendMessageParams) => {
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
        ai_model: selectedModel ?? model ?? { name: 'gpt-4o-mini' },
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
          router.push(
            createAPIUrl({
              endpoint: AI_ROUTES.chatDetail,
              params: { id: data.id },
            })
          );
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
    },
    [
      messages,
      addMessage,
      agent,
      id,
      model,
      resetOpenWebSource,
      selectedModel,
      router,
      setGenMessage,
      setMessages,
      setIsNewChat,
      setStatus,
      tError,
      updateMessages,
    ]
  );
};

export const formatDate = (timestamp: number) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = today - 86_400_000; // 24 hours in milliseconds

  if (timestamp === today) {
    return 'Today';
  }
  if (timestamp === yesterday) {
    return 'Yesterday';
  }

  // Format as dd/mm/yyyy for all other dates
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
