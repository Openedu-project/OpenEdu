import type {
  IAIModel,
  IChatHistoryResponse,
  IConversation,
  IConversationDetails,
  IConversationRequest,
  IUpdateConversationPayload,
} from '#types/conversation';
import { isLogin } from '#utils/auth';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

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

export const deleteConversation = async (url: string | undefined, id: string, init: FetchOptions = {}) => {
  const endpointKey = url ?? createAPIUrl({ endpoint: API_ENDPOINT.COM_CHANNELS_ID, params: { id } });
  const response = await deleteAPI(endpointKey, init);

  return response.data;
};

export const getListConversation = async (url?: string, params?: Record<string, unknown>, init?: FetchOptions) => {
  const login = await isLogin();

  if (!login) {
    return null;
  }
  const endpointKey = url ?? createAPIUrl({ endpoint: API_ENDPOINT.COM_CHANNELS, queryParams: params });
  try {
    const response = await fetchAPI<IChatHistoryResponse>(endpointKey, init);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateConversationTitle = async (
  url: string | undefined,
  id: string,
  payload: IUpdateConversationPayload,
  init: FetchOptions = {}
) => {
  const endpointKey =
    url ?? createAPIUrl({ endpoint: API_ENDPOINT.COM_CHANNELS_ID, params: { id }, queryParams: { ...payload } });

  const response = await putAPI<IConversation, IUpdateConversationPayload>(endpointKey, payload, init);

  return response.data;
};
