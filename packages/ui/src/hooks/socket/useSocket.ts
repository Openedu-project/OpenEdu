'use client';
import type { IMessageData } from '@oe/api';
import type { EventData, ISocketRes } from '@oe/api';
import { useEffect } from 'react';
import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';
import { useConversationStore } from '#store/conversation-store';
import { useSocketStore } from '#store/socket';
import { useAIConversationHandler } from './useAIConversationHandler';
import { useReconnection } from './useReconnection';
import { useSocketAuth } from './useSocketAuth';
import { useWebSocketEndpoint } from './useWebSocketEndpoint';

export const useSocket = (isAuthenticated: boolean, conversation_id?: string) => {
  const { accessToken, referrer, error: authError } = useSocketAuth(isAuthenticated);
  const endpoint = useWebSocketEndpoint(accessToken, referrer, conversation_id);

  const { setSocketData } = useSocketStore();
  const { genMessage, setGenMessage, status } = useConversationStore();

  const handleAIConversation = useAIConversationHandler(status, genMessage?.id);
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
          const { data } = parsedData as ISocketRes<IMessageData>;

          const newMessage = handleAIConversation(data);

          if (newMessage) {
            setGenMessage(newMessage);
          }
        } else {
          setSocketData(parsedData);
        }
      } catch (error) {
        console.error('Error parsing socket data:', error);
      }
    },
    [handleAIConversation, setGenMessage, setSocketData]
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
