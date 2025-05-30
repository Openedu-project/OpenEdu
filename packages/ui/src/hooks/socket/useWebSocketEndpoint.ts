import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { buildUrl } from '@oe/core/utils/url';

export const useWebSocketEndpoint = (token: string, referrer: string) => {
  if (!(token && referrer)) {
    return null;
  }

  return `${process.env.NEXT_PUBLIC_WS_ORIGIN}${buildUrl({
    endpoint: API_ENDPOINT.WEBSOCKET,
    queryParams: { token, referrer },
  })}`;
};
