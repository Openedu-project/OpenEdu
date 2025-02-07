import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getAdminLaunchpadDetailService,
  getAdminLaunchpadInvestmentService,
  getAdminLaunchpadsService,
  postAdminCancelLaunchpadsService,
  postAdminPublishLaunchpadsService,
  postAdminStartVotingLaunchpadsService,
  putAdminCancelPublishLaunchpadsService,
} from '#services/admin-launchpad';
import type { IAdminLaunchpadItem, IAdminPublishLaunchpad } from '#types/admin-launchpad';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetAdminLaunchpads(queryParams: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS,
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAdminLaunchpadsService(endpoint, { params: { ...queryParams } })
  );

  return {
    dataAdminLaunchpads: data,
    errorAdminLaunchpads: error,
    mutateAdminLaunchpads: mutate,
    isLoadingAdminLaunchpads: isLoading,
  };
}

export function useGetAdminLaunchpadDetail(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_ID,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAdminLaunchpadDetailService(endpoint, { params: { id } })
  );

  return {
    dataAdminLaunchpadDetail: data,
    errorAdminLaunchpadDetail: error,
    mutateAdminLaunchpadDetail: mutate,
    isLoadingAdminLaunchpadDetail: isLoading,
  };
}

export function useGetAdminLaunchpadInvestment(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_ID,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAdminLaunchpadInvestmentService(endpoint, { params: { id } })
  );

  return {
    dataAdminLaunchpadDetail: data,
    errorAdminLaunchpadDetail: error,
    mutateAdminLaunchpadDetail: mutate,
    isLoadingAdminLaunchpadDetail: isLoading,
  };
}

export const usePostAdminPublishLaunchpads = (id: string) => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_PUBLISH_LAUNCHPAD_ID,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (_endpoint: string, { arg }: { arg: IAdminPublishLaunchpad }): Promise<IAdminLaunchpadItem> =>
      postAdminPublishLaunchpadsService(endpointKey, { payload: { ...arg, id } })
  );

  return {
    triggerPostAdminPublishLaunchpads: trigger,
    isLoadingPostAdminPublishLaunchpads: isMutating,
    errorPostAdminPublishLaunchpads: error,
  };
};

export const usePostAdminCancelLaunchpads = (id: string) => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_CANCEL_LAUNCHPAD_ID,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (_endpoint: string): Promise<IAdminLaunchpadItem> =>
      postAdminCancelLaunchpadsService(endpointKey, { payload: { id } })
  );

  return {
    triggerPostAdminCancelLaunchpads: trigger,
    isLoadingPostAdminCancelLaunchpads: isMutating,
    errorPostAdminCancelLaunchpads: error,
  };
};

export const usePostAdminStartVotingLaunchpads = (id: string, milestoneId: string) => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_START_VOTING_ID,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (_endpoint: string): Promise<IAdminLaunchpadItem> =>
      postAdminStartVotingLaunchpadsService(endpointKey, { payload: { id, milestoneId } })
  );

  return {
    triggerPostAdminStartVotingLaunchpads: trigger,
    isLoadingPostAdminStartVotingLaunchpads: isMutating,
    errorPostAdminStartVotingLaunchpads: error,
  };
};

export const usePutAdminCancelPublishLaunchpads = (id: string) => {
  const url = createAPIUrl({
    endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string): Promise<IAdminLaunchpadItem> =>
      putAdminCancelPublishLaunchpadsService(endpoint, { payload: { id } })
  );

  return {
    triggerPutAdminCancelPublishLaunchpads: trigger,
    isLoadingPutAdminCancelPublishLaunchpads: isMutating,
    errorPutAdminCancelPublishLaunchpads: error,
  };
};
