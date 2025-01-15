import type { HTTPResponse } from '@oe/api/types/fetch';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { getConversationDetail } from '#services/conversation';
import type { IChatHistoryResponse } from '#types/conversation';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

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

export function useGetListConversation(params: Record<string, string | number>, shouldFetch = true) {
  const getKey = (
    pageIndex: number,
    previousPageData?: IChatHistoryResponse,
    newParams?: Record<string, string | number>
  ) => {
    if (!shouldFetch) {
      return null;
    }
    if (previousPageData && previousPageData.results?.length > 0 && !newParams) {
      return null;
    }

    const searchParams = newParams
      ? { ...newParams, page: pageIndex + 1 }
      : {
          ...params,
          page: pageIndex + 1,
        };

    return createAPIUrl({ endpoint: API_ENDPOINT.COM_CHANNELS, queryParams: { ...searchParams } });
  };
  const {
    data: res,
    isLoading,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<HTTPResponse<IChatHistoryResponse>>(getKey, fetchAPI, {
    revalidateFirstPage: false,
    revalidateAll: false,
    persistSize: true,
  });

  return {
    isLoading,
    data: res?.flatMap(history => history.data) as IChatHistoryResponse[],
    size,
    setSize,
    mutate,
    getKey,
  };
}
