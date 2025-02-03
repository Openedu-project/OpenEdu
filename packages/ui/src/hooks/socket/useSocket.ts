'use client';
import { useEffect } from 'react';

import type { IMessage, IMessageData, IRole } from '@oe/api/types/conversation';
import type { EventData, ISocketRes } from '@oe/api/types/socket';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';
import { useConversationStore } from '#store/conversation-store';
import { useSocketStore } from '#store/socket';
import { useAIConversationHandler } from './useAIConversationHandler';
import { useReconnection } from './useReconnection';
import { useSocketAuth } from './useSocketAuth';
import { useWebSocketEndpoint } from './useWebSocketEndpoint';

export const useSocket = (isAuthenticated: boolean) => {
  const { accessToken, referrer, error: authError } = useSocketAuth(isAuthenticated);
  const endpoint = useWebSocketEndpoint(accessToken, referrer);

  const { setSocketData } = useSocketStore();
  const { genMessage, setGenMessage, setStatus, status, resetPage } = useConversationStore();

  const handleAIConversation = useAIConversationHandler(status ?? '', genMessage?.id);
  const { shouldReconnect, reconnectInterval } = useReconnection(isAuthenticated, accessToken);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (typeof event.data !== 'string') {
        console.error('Received non-string data from WebSocket');
        return;
      }

      if (event.data === 'pong') {
        return;
      }

      try {
        const parsedData: ISocketRes<EventData> = JSON.parse(event.data);

        if (parsedData.event === 'ai_conversation') {
          if (!GENERATING_STATUS.includes(status as unknown as string)) {
            return;
          }

          const { data } = parsedData as ISocketRes<IMessageData>;

          if (!genMessage || genMessage.id !== data.message_id) {
            return;
          }
          const newMessage: IMessage = {
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
            configs: { is_image_analysis: data.is_image_analysis },
            content_type: 'text',
            is_ai: true,
          };

          setGenMessage(newMessage, () => {
            if (!GENERATING_STATUS.includes(data.status)) {
              setStatus(data?.status);
              if (resetPage) {
                window.location.reload();
              }
            }
          });
        } else {
          setSocketData(parsedData);
        }
      } catch (error) {
        console.error('Error parsing socket data:', error);
      }
    },
    [handleAIConversation, setGenMessage, setStatus, setSocketData, resetPage]
  );

  const { getWebSocket } = useWebSocket(endpoint, {
    onOpen: () => console.info('WebSocket connected'),
    onClose: () => console.info('WebSocket disconnected'),
    onError: error => console.error('WebSocket error:', error),
    onMessage: handleMessage,
    shouldReconnect,
    reconnectInterval,
    heartbeat: {
      message: 'ping',
      returnMessage: `${accessToken}: ping`,
      interval: 10_000,
    },
  });

  // Cleanup effect
  useEffect(() => {
    const ws = getWebSocket();
    if (!accessToken && ws) {
      console.info('Closing WebSocket due to empty token');
      ws.close();
    }
  }, [accessToken, getWebSocket]);

  useEffect(() => {
    return () => {
      const ws = getWebSocket();
      if (ws) {
        console.info('Closing WebSocket on unmount');
        ws.close();
      }
    };
  }, [getWebSocket]);

  return {
    isConnected: !!getWebSocket(),
    error: authError,
  };
};
