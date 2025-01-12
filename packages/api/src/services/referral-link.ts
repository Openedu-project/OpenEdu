import { API_ENDPOINT } from '#utils/endpoints';
import { postAPI } from '#utils/fetch';
import type { IReferralLinkPayload, IReferralLinkRes } from '../types/referral-link';

export const postReferralLink = async (url: string, payload: IReferralLinkPayload, init: RequestInit = {}) => {
  const response = await postAPI<IReferralLinkRes, IReferralLinkPayload>(
    url ?? API_ENDPOINT.REFERRAL_LINKS,
    payload,
    init
  );

  return response.data;
};

export const postExtendReferralLink = async (url: string, payload: null, init: RequestInit = {}) => {
  const response = await postAPI<IReferralLinkRes, null>(url, payload, init);

  return response.data;
};
