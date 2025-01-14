import type { IAIModel, IConversation, IConversationDetails, IConversationRequest } from '#types/conversation';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';

export const getAIModels = async (url?: string, init?: FetchOptions) => {
  const response = await fetchAPI<IAIModel[]>(url ?? API_ENDPOINT.AI_MODELS, init);

  return response.data;
};

export const getConversationDetail = async (
  url: string | undefined,
  id: string,
  queryParams: { cursor?: string } & Record<string, string | number>,
  init: FetchOptions = {}
): Promise<IConversationDetails> => {
  const endpointKey =
    url ?? createAPIUrl({ endpoint: API_ENDPOINT.COM_CHANNELS_ID, params: { id }, queryParams: { ...queryParams } });

  const response = await fetchAPI<IConversationDetails>(endpointKey, init);

  return response?.data;
};

export const postConversation = async (url: string | undefined, payload: IConversationRequest) => {
  const endpointKey = url ?? API_ENDPOINT.COM_CHANNELS;
  const response = await postAPI<IConversation, IConversationRequest>(endpointKey, payload);

  return response.data;
};

export const cancelConversation = async (url: string | undefined, id: string, payload?: Record<string, string>) => {
  const endpointKey = url ?? createAPIUrl({ endpoint: API_ENDPOINT.COM_CHANNELS_ID_CANCEL, params: { id } });
  const response = await postAPI<{ message: string }, Record<string, string> | undefined>(endpointKey, payload);

  return response.data;
};
