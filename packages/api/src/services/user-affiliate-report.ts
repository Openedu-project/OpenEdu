import { buildUrl } from '@oe/core';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';
import type {
  IUserAffiliateReportDetailRes,
  IUserAffiliateReportRes,
  IUserAffiliateSummariesReportRes,
} from '../types/report-user-affiliate-campaign';

export async function getUserAffiliateReportService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IUserAffiliateReportRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.REFERRALS_USER_REPORT,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IUserAffiliateReportRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getUserAffiliateSummariesReportService(
  url: string,
  { params, init }: { params: IFilter & { userId: string }; init?: RequestInit }
): Promise<IUserAffiliateSummariesReportRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.USERS_ME_REFERRALS_SUMMARIES,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IUserAffiliateSummariesReportRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getUserAffiliateReportDetailService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IUserAffiliateReportDetailRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.USERS_ME_REFERRALS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IUserAffiliateReportDetailRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}
