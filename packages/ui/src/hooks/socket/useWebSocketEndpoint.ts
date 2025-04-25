import { API_ENDPOINT } from '@oe/api';
import { buildUrl } from '@oe/core';

export const useWebSocketEndpoint = (token: string, referrer: string, conversation_id?: string) => {
  if (!(token && referrer)) {
    return null;
  }

  return `${process.env.NEXT_PUBLIC_WS_ORIGIN}${buildUrl({
    endpoint: API_ENDPOINT.WEBSOCKET,
    queryParams: { token, referrer, conversation_id },
  })}`;
};
