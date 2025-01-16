import { getCookie } from "cookies-next";
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

import type { IMessage, IMessageData, IRole } from "@oe/api/types/conversation";
import type { EventData, ISocketRes } from '@oe/api/types/socket';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useConversationStore } from '#store/conversation-store';
import { useSocketStore } from '#store/socket';

export const useSocket = (token: string) => {
  const isUnmounted = useRef(false);
  const { setSocketData } = useSocketStore();
  const { setGenMessage, setStatus, status, genMessage, resetPage } = useConversationStore();
  const referrer = getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY as string);
  const endpoint = token
    ? `${process.env.NEXT_PUBLIC_WS_ORIGIN}${createAPIUrl({
        endpoint: API_ENDPOINT.WEBSOCKET,
        queryParams: {
          token: token,
          referrer,
        },
      })}`
    : null;

  useWebSocket(endpoint, {
    onOpen: () => console.info("connected"),
    onMessage(event: MessageEvent) {
      const { data } = event;

      if (typeof data !== "string") {
        console.error("Received non-string data from WebSocket");
        return;
      }

      if (data === "pong") {
        return;
      }

      try {
        const parsedData: ISocketRes<EventData> = JSON.parse(data);

        if (parsedData.event === "ai_conversation") {
          if (!GENERATING_STATUS.includes(status as unknown as string)) {
            return;
          }

          const { data } = parsedData as ISocketRes<IMessageData>;

          if (
            !genMessage || genMessage.id !== data.message_id
          ) {
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
            sender: { role: "assistant" as IRole },
            configs: { is_image_analysis: data.is_image_analysis },
            content_type: "text",
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
        console.error("Error parsing socket data:", error);
      }
    },
    shouldReconnect: () => !isUnmounted.current,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    heartbeat: {
      message: "ping",
      returnMessage: `${token}: ping`,
      interval: 10_000, // 10 seconds
    },
  });

  useEffect(
    () => () => {
      isUnmounted.current = true;
    },
    []
  );
};

export const useTrackingSocket = (token: string) => {
  const isUnmounted = useRef(false);
  const referrer = getCookie(
    process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY as string
  );

  const endpoint = token
    ? `${process.env.NEXT_PUBLIC_WS_ORIGIN}${createAPIUrl({
        endpoint: API_ENDPOINT.WEBSOCKET,
        queryParams: {
          token: token,
          referrer,
        },
      })}`
    : null;

  const { sendJsonMessage, readyState } = useWebSocket(endpoint, {
    onOpen: () => console.info("connected"),
    shouldReconnect: () => !isUnmounted.current,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(
    () => () => {
      isUnmounted.current = true;
    },
    []
  );

  return { sendJsonMessage, readyState };
};
