import type { IFilter } from '#types/filter';
import type { IInviteReferrerPayload, IReferralProgramPayload, IReferralProgramRes } from '#types/referral-program';
import { API_ENDPOINT } from '#utils/endpoints';
import { postAPI } from '#utils/fetch';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

export const getAllReferralProgramListService = async (
  endpoint: string | null | undefined,
  { queryParams, init }: { queryParams: IFilter; init?: RequestInit }
) => {
  const response = await fetchAPI<IReferralProgramRes>(
    endpoint ?? createAPIUrl({ endpoint: API_ENDPOINT.POINT_CAMPAIGNS, queryParams: { ...queryParams } }),
    init
  );

  return response.data;
};

export const postReferralCampaignService = async (
  url: string,
  payload: IReferralProgramPayload,
  init: RequestInit = {}
) => {
  const response = await postAPI<IReferralProgramRes, IReferralProgramPayload>(
    url ?? API_ENDPOINT.POINT_CAMPAIGNS,
    payload,
    init
  );

  return response.data;
};

export const postInviteReferrerService = async (
  url: string,
  payload: IInviteReferrerPayload,
  init: RequestInit = {}
) => {
  const response = await postAPI<IReferralProgramRes, IInviteReferrerPayload>(
    url ?? API_ENDPOINT.OE_REFERRAL_INVITE,
    payload,
    init
  );

  return response.data;
};
