import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { getConversationDetail, getListConversation, getMessageData, getPrompts } from '#services/conversation';
import type {
  IChatHistoryResponse,
  IConversationDetails,
  IPrompSearchParams,
  ISearchHistoryParams,
} from '#types/conversation';
import type { HTTPResponse } from '#types/fetch';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';

export function useGetConversationDetails({
  shouldFetch = true,
  id,
  params,
  fallback,
}: {
  shouldFetch?: boolean;
  id?: string;
  params: { cursor?: string } & Record<string, string | number>;
  fallback?: IConversationDetails;
}) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.COM_CHANNELS_ID,
    params: { id },
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(
    shouldFetch && id ? endpointKey : null,
    (endpoint: string) => getConversationDetail(endpoint, id ?? '', params),
    {
      fallbackData: fallback,
    }
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

    return buildUrl({ endpoint: API_ENDPOINT.COM_CHANNELS, queryParams: { ...searchParams } });
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

export function useGetMessageData({
  params,
  shouldFetch = true,
}: { params: { channelId?: string; messageId?: string }; shouldFetch?: boolean }) {
  const endpointKey =
    shouldFetch && params.channelId && params.messageId
      ? buildUrl({ endpoint: API_ENDPOINT.COM_CHANNELS_ID_MESSAGES_ID, params })
      : null;
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) => getMessageData(endpoint));

  return {
    messageData: data,
    messageError: error,
    mutate,
    isLoading,
  };
}

export function useGetPromps({
  queryParams,
  shouldFetch = true,
}: { queryParams?: IPrompSearchParams; shouldFetch?: boolean }) {
  const endpointKey = shouldFetch ? buildUrl({ endpoint: API_ENDPOINT.AI_PROMPTS, queryParams }) : null;
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) => getPrompts(endpoint));

  return {
    prompts: data,
    error,
    mutate,
    isLoading,
  };
}

export function useGetConversations(params: ISearchHistoryParams, shouldFetch = true) {
  const endpoint = shouldFetch
    ? buildUrl({
        endpoint: API_ENDPOINT.COM_CHANNELS,
        queryParams: { ...params },
      })
    : null;

  const { data, isLoading, error, mutate } = useSWR(endpoint, (endpoint: string) => getListConversation(endpoint));

  return {
    history: data,
    error,
    mutate,
    isLoading,
  };
}
