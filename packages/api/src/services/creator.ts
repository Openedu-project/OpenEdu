import type {
  IAcceptInvitePayload,
  ICreator,
  ICreatorAcceptResponse,
  ICreatorListResponse,
  ICreatorPayload,
  ICreatorResponse,
  IDeleteCreatorsPayload,
  IInviteCreatorPayload,
} from '#types/creators';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, fetchAPI, postAPI } from '#utils/fetch';

export async function getListCreatorService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ICreatorListResponse | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ADMIN_CREATORS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ICreatorListResponse>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export const postInviteCreatorsService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IInviteCreatorPayload; init?: RequestInit }
) => {
  const response = await postAPI<ICreatorResponse, IInviteCreatorPayload>(
    endpoint ?? API_ENDPOINT.ADMIN_CREATORS_INVITE,
    payload,
    init
  );

  return response.data;
};

export const postCreatorAcceptInvitationService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IAcceptInvitePayload; init?: RequestInit }
) => {
  const response = await postAPI<ICreatorAcceptResponse, IAcceptInvitePayload>(
    endpoint ?? API_ENDPOINT.CREATORS_ACCEPT,
    payload,
    init
  );

  return response.data;
};

export const postCreateCreatorService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICreatorPayload; init?: RequestInit }
) => {
  const response = await postAPI<ICreator, ICreatorPayload>(endpoint ?? API_ENDPOINT.ADMIN_CREATORS, payload, init);

  return response.data;
};

export async function deleteCreatorService(
  url: string,
  { payload, init }: { payload: IDeleteCreatorsPayload; init?: RequestInit }
): Promise<ICreatorResponse | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ADMIN_CREATORS,
      queryParams: {
        ...payload,
      },
    });
  }

  try {
    const response = await deleteAPI<ICreatorResponse, null>(endpointKey, null, init);

    return response.data;
  } catch {
    return null;
  }
}
