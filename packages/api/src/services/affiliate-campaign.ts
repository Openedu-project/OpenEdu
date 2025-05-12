import { buildUrl } from '@oe/core';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';
import type {
  IAffiliateCampaignItem,
  IAffiliateCampaignListRes,
  IAffiliateCampaignPayload,
  IUserAffiliateCampaignListRes,
  IValidateRefCodePayload,
} from '../types/affiliate-campaign';

export async function getUserAffiliateCampaignListService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IUserAffiliateCampaignListRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.USERS_ME_AFFILIATE_CAMPAIGNS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IUserAffiliateCampaignListRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getAffiliateCampaignListService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IAffiliateCampaignListRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IAffiliateCampaignListRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getAffiliateCampaignDetailService(
  url: string,
  { params, init }: { params: { id: string; queryParams: IFilter }; init?: RequestInit }
): Promise<IAffiliateCampaignItem | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID,
      params: {
        ...params,
      },
      queryParams: {
        ...params.queryParams,
      },
    });
  }

  try {
    const response = await fetchAPI<IAffiliateCampaignItem>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export const postAffiliateCampaignService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IAffiliateCampaignPayload; init?: RequestInit }
) => {
  const response = await postAPI<IAffiliateCampaignItem, IAffiliateCampaignPayload>(
    endpoint ?? API_ENDPOINT.AFFILIATE_CAMPAIGNS,
    payload,
    init
  );
  return response.data;
};

export const putAffiliateCampaignService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IAffiliateCampaignPayload; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await putAPI<IAffiliateCampaignItem, IAffiliateCampaignPayload>(endpointKey, payload, init);
  return response.data;
};

export const deleteAffiliateCampaignService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS,
      params: {
        ...payload,
      },
    });
  }
  const response = await deleteAPI<IAffiliateCampaignItem, null>(endpointKey, null, init);
  return response.data;
};

export const postValidateRefCodeService = async (
  endpoint: string | null | undefined,
  { payload, code, init }: { payload: IValidateRefCodePayload; code: string; init?: RequestInit }
) => {
  const url = buildUrl({
    endpoint: API_ENDPOINT.VALIDATE_REFERRAL_LINKS_BY_CODE,
    params: {
      code,
    },
  });
  const response = await postAPI<{ message: string }, IValidateRefCodePayload>(endpoint ?? url, payload, init);

  return response.data;
};
