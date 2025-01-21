import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  deleteAffiliateCampaignService,
  getAffiliateCampaignDetailService,
  getAffiliateCampaignListService,
  getUserAffiliateCampaignListService,
  postAffiliateCampaignService,
  postValidateRefCodeService,
  putAffiliateCampaignService,
} from '#services/affiliate-campaign';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import type {
  IAffiliateCampaignItem,
  IAffiliateCampaignPayload,
  IValidateRefCodePayload,
} from '../types/affiliate-campaign';

export function useGetUserAffiliateCampaignList({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ME_AFFILIATE_CAMPAIGNS,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getUserAffiliateCampaignListService(endpoint, { params })
  );

  return {
    dataUserAffiliateCampaignList: data,
    errorUserAffiliateCampaignList: error,
    mutateUserAffiliateCampaignList: mutate,
    isLoadingUserAffiliateCampaignList: isLoading,
  };
}

export function useGetUserAffiliateCampaignListWithoutAuth({ isAuth, params }: { isAuth: boolean; params: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ME_AFFILIATE_CAMPAIGNS,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(isAuth ? endpointKey : null, (endpoint: string) =>
    getUserAffiliateCampaignListService(endpoint, { params })
  );

  return {
    dataUserAffiliateCampaignList: data,
    errorUserAffiliateCampaignList: error,
    mutateUserAffiliateCampaignList: mutate,
    isLoadingUserAffiliateCampaignList: isLoading,
  };
}

export function useGetAffiliateCampaignList({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAffiliateCampaignListService(endpoint, { params })
  );

  return {
    dataAffiliateCampaignList: data,
    errorAffiliateCampaignList: error,
    mutateAffiliateCampaignList: mutate,
    isLoadingAffiliateCampaignList: isLoading,
  };
}

export function useGetAffiliateCampaignDetail({ params }: { params: { id: string; queryParams: IFilter } }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID,
    params: { ...params },
    queryParams: { ...params.queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAffiliateCampaignDetailService(endpoint, { params })
  );

  return {
    dataAffiliateCampaignDetail: data,
    errorAffiliateCampaignDetail: error,
    mutateAffiliateCampaignDetail: mutate,
    isLoadingAffiliateCampaignDetail: isLoading,
  };
}

export const usePostAffiliateCampaign = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.AFFILIATE_CAMPAIGNS,
    async (endpoint: string, { arg }: { arg: IAffiliateCampaignPayload }): Promise<IAffiliateCampaignItem> =>
      postAffiliateCampaignService(endpoint, { payload: arg })
  );

  return {
    triggerPostAffiliateCampaign: trigger,
    isLoadingPostAffiliateCampaign: isMutating,
    errorPostAffiliateCampaign: error,
  };
};

export const usePutAffiliateCampaign = (id: string) => {
  const url = createAPIUrl({
    endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: IAffiliateCampaignPayload }): Promise<IAffiliateCampaignItem> =>
      putAffiliateCampaignService(endpoint, { payload: arg })
  );

  return {
    triggerPutAffiliateCampaign: trigger,
    isLoadingPutAffiliateCampaign: isMutating,
    errorPutAffiliateCampaign: error,
  };
};

export const useDeleteAffiliateCampaign = (id: string) => {
  const url = createAPIUrl({
    endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: { id: string } }): Promise<IAffiliateCampaignItem> =>
      deleteAffiliateCampaignService(endpoint, { payload: arg })
  );

  return {
    triggerDeleteAffiliateCampaign: trigger,
    isLoadingDeleteAffiliateCampaign: isMutating,
    errorDeleteAffiliateCampaign: error,
  };
};

export const usePostValidateRefCode = (code: string) => {
  const url = createAPIUrl({
    endpoint: API_ENDPOINT.VALIDATE_REFERRAL_LINKS_BY_CODE,
    params: {
      code,
    },
  });
  console.log('url', code);
  const { trigger, isMutating, error } = useSWRMutation(
    code ? url : null,
    async (_endpoint: string, { arg }: { arg: IValidateRefCodePayload }): Promise<{ message: string }> =>
      postValidateRefCodeService(url, { payload: arg, code })
  );

  return {
    triggerPostValidateRefCode: trigger,
    isLoadingPostValidateRefCode: isMutating,
    errorPostValidateRefCode: error,
  };
};
