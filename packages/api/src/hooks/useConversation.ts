import useSWR from 'swr';
import { getConversationDetail } from '#services/conversation';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetConversationDetails({
  shouldFetch,
  id,
  params,
}: { shouldFetch?: boolean; id: string; params: { cursor: string } & Record<string, string | number> }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COM_CHANNELS_ID,
    params: { id },
    queryParams: { ...params },
  });
  const { data, isLoading, error, mutate } = useSWR(shouldFetch && id ? endpointKey : null, (endpoint: string) =>
    getConversationDetail(endpoint, id, params)
  );

  return {
    data,
    error,
    mutate,
    isLoading,
    currentCursor: params.cursor,
  };
}
