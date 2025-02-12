import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getAdminLaunchpadDetailService,
  getAdminLaunchpadInvestmentService,
  getAdminLaunchpadsService,
  patchLaunchpadDetailService,
  postAdminCancelLaunchpadsService,
  postAdminDecideVotingLaunchpadsService,
  postAdminPublishLaunchpadsService,
  postAdminStartVotingLaunchpadsService,
  putAdminCancelPublishLaunchpadsService,
  putAdminStartFundingTimeLaunchpadsService,
} from '#services/admin-launchpad';
import type {
  IAdminLaunchpadItem,
  IAdminPublishLaunchpadPayload,
  IDecideVotingLaunchpadPayload,
  IStartFundingTimeLaunchpadPayload,
} from '#types/admin-launchpad';
import type { IFilter } from '#types/filter';
import type { ICreateLaunchpadRequest } from '#types/launchpad';
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
    async (_endpoint: string, { arg }: { arg: IAdminPublishLaunchpadPayload }): Promise<IAdminLaunchpadItem> =>
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
    params: { id, milestone_id: milestoneId },
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
    endpoint: API_ENDPOINT.LAUNCHPADS_PUBLISH_LAUNCHPAD_ID,
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

export const usePatchLaunchpadDetail = (id: string) => {
  const url = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: ICreateLaunchpadRequest }) =>
      patchLaunchpadDetailService(endpoint, { params: { ...arg, id } })
  );

  return {
    triggerPatchLaunchpadDetail: trigger,
    isLoadingPatchLaunchpadDetail: isMutating,
    errorPatchLaunchpadDetail: error,
  };
};

export const usePutAdminStartFundingTimeLaunchpad = (id: string) => {
  const url = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_FUNDING_TIME_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: IStartFundingTimeLaunchpadPayload }): Promise<IAdminLaunchpadItem> =>
      putAdminStartFundingTimeLaunchpadsService(endpoint, { payload: { ...arg, id } })
  );

  return {
    triggerPutAdminStartFundingTimeLaunchpad: trigger,
    isLoadingPutAdminStartFundingTimeLaunchpad: isMutating,
    errorPutAdminStartFundingTimeLaunchpad: error,
  };
};

export const usePutAdminDecideVotingLaunchpad = (id: string) => {
  const url = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_DECIDE_VOTING_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: IDecideVotingLaunchpadPayload }): Promise<IAdminLaunchpadItem> =>
      postAdminDecideVotingLaunchpadsService(endpoint, { payload: { ...arg, id } })
  );

  return {
    triggerPostAdminDecideVotingLaunchpad: trigger,
    isLoadingPostAdminDecideVotingLaunchpad: isMutating,
    errorPostAdminDecideVotingLaunchpad: error,
  };
};
