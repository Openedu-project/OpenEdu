import type { IRole } from '@oe/api/types/conversation';

import type { IMessageData } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useCallback } from 'react';
import type { IAIAction } from '#store/conversation-store';

export const useAIConversationHandler = (status: string) => {
  return useCallback(
    (data: IMessageData, action: IAIAction) => {
      if (!GENERATING_STATUS.includes(status)) {
        return null;
      }

      const isValidAction =
        action &&
        ((action.key === 'new' && data.parent_message_id === action.id) ||
          (action.key === 'rewrite' && data.message_id === action.id));

      if (!isValidAction) {
        return null;
      }

      return {
        id: data.message_id,
        conversation_id: data.conversation_id,
        create_at: Date.now(),
        content: data.content,
        ai_model: { name: data.ai_model },
        status: data.status,
        sender: { role: 'assistant' as IRole },
        configs: { is_image_analysis: data.is_image_analysis },
        content_type: 'text' as const,
        is_ai: true,
      };
    },
    [status]
  );
};
