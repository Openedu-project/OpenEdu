import { useGetMessageData } from '@oe/api/hooks/useConversation';
import type { IAIStatus, IRole } from '@oe/api/types/conversation';

import type { IMessageData } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';

export const useAIConversationHandler = (status?: IAIStatus, genMessageId?: string) => {
  const [channelId, setChannelId] = useState<string | undefined>(undefined);
  const prevGenMessage = useRef<string>('');
  const { mutate: globalMutate } = useSWRConfig();

  useEffect(() => {
    setChannelId(undefined);
    if (prevGenMessage.current === genMessageId) {
      globalMutate((key: string) => !!key?.includes(`/messages/${genMessageId}`), undefined, { revalidate: false });
    } else {
      prevGenMessage.current = genMessageId ?? '';
    }
  }, [genMessageId, globalMutate]);

  const { messageData } = useGetMessageData({
    params: {
      channelId,
      messageId: genMessageId,
    },
  });

  return useCallback(
    (data: IMessageData) => {
      if (!(status && GENERATING_STATUS.includes(status))) {
        return null;
      }

      if (!genMessageId || genMessageId !== data.message_id) {
        return;
      }

      if (data.status === 'tool_ended') {
        setChannelId(data.conversation_id);
      }

      return {
        id: data.message_id,
        conversation_id: data.conversation_id,
        create_at: Date.now(),
        content: data.content,
        ai_model: {
          name: data.ai_model,
          display_name: data.ai_model_display_name,
          thumbnail_url: data.ai_model_thumbnail_url,
        },
        status: data.status,
        sender: { role: 'assistant' as IRole },
        content_type: 'text' as const,
        ai_agent_type: data.message_ai_agent_type,
        is_ai: true,
        props: messageData?.props,
      };
    },
    [status, genMessageId, messageData]
  );
};
