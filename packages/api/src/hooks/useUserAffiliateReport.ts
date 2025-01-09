import useSWR from 'swr';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import {
  getUserAffiliateReportDetailService,
  getUserAffiliateReportService,
  getUserAffiliateSummariesReportService,
} from '../services/user-affiliate-report';

export function useGetUserAffiliateReport({ params }: { params: IFilter & { userId: string } }) {
  const endpointKey = params.userId
    ? createAPIUrl({
        endpoint: API_ENDPOINT.REFERRALS_USER_REPORT,
        queryParams: { ...params },
      })
    : '';

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getUserAffiliateReportService(endpoint, { params })
  );

  return {
    dataUserAffiliateReport: data,
    errorUserAffiliateReport: error,
    mutateUserAffiliateReport: mutate,
    isLoadingUserAffiliateReport: isLoading,
  };
}

export function useGetUserAffiliateSummariesReport({ params }: { params: IFilter & { userId: string } }) {
  const endpointKey = params.userId
    ? createAPIUrl({
        endpoint: API_ENDPOINT.USERS_ME_REFERRALS_SUMMARIES,
        queryParams: { ...params },
      })
    : '';

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getUserAffiliateSummariesReportService(endpoint, { params })
  );

  return {
    dataUserAffiliateSummariesReport: data,
    errorUserAffiliateSummariesReport: error,
    mutateUserAffiliateSummariesReport: mutate,
    isLoadingUserAffiliateSummariesReport: isLoading,
  };
}

export function useGetUserAffiliateReportDetail({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ME_REFERRALS,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getUserAffiliateReportDetailService(endpoint, { params })
  );

  return {
    dataUserAffiliateReportDetail: data,
    errorUserAffiliateReportDetail: error,
    mutateUserAffiliateReportDetail: mutate,
    isLoadingUserAffiliateReportDetail: isLoading,
  };
}
