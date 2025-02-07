import type { IRole } from '@oe/api/types/conversation';

import type { IMessageData } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useCallback } from 'react';

export const useAIConversationHandler = (status: string, genMessageId?: string) => {
  return useCallback(
    (data: IMessageData) => {
      if (!GENERATING_STATUS.includes(status)) {
        return null;
      }

      if (!genMessageId || genMessageId !== data.message_id) {
        return;
      }

      return {
        id: data.message_id,
        conversation_id: data.conversation_id,
        create_at: Date.now(),
        content: data.status === 'failed' ? (data.error?.msg ?? '') : data.content,
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
      };
    },
    [status, genMessageId]
  );
};
