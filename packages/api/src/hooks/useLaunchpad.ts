import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getAdminLaunchpadDetailService,
  getAdminLaunchpadInvestmentService,
  getAdminLaunchpadsService,
  postAdminCancelLaunchpadsService,
  postAdminDecideVotingLaunchpadsService,
  postAdminPublishLaunchpadsService,
  postAdminStartVotingLaunchpadsService,
  putAdminCancelPublishLaunchpadsService,
  putAdminStartFundingTimeLaunchpadsService,
} from '#services/admin-launchpad';
import {
  getLaunchpadConfigService,
  postBookmarkLaunchpadService,
  postCreateLaunchpadService,
  postInitPoolLaunchpadService,
  postPledgeLaunchpadService,
  removeBookmarkLaunchpadService,
} from '#services/launchpad';
import type {
  IAdminLaunchpadItem,
  IAdminPublishLaunchpadPayload,
  IDecideVotingLaunchpadPayload,
  IStartFundingTimeLaunchpadPayload,
} from '#types/admin-launchpad';
import type { IFilter } from '#types/filter';
import type {
  ICreateLaunchpadRequest,
  ILaunchpad,
  ILaunchpadMinApprovalPercentageResponse,
  ILaunchpadMinPledgeOptionsResponse,
  ILaunchpadMinSections,
  ILaunchpadVotingPhaseRuleResponse,
  IPledgeLaunchpadPayload,
} from '#types/launchpad';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetAdminLaunchpads(id: string, queryParams: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS,
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (endpoint: string) =>
    getAdminLaunchpadsService(endpoint, { params: { ...queryParams } })
  );

  return {
    dataAdminLaunchpads: data,
    errorAdminLaunchpads: error,
    mutateAdminLaunchpads: mutate,
    isLoadingAdminLaunchpads: isLoading,
  };
}

export function useGetAdminLaunchpadDetail(id: string, queryParams: IFilter = {}) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_ID,
    params: { id },
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAdminLaunchpadDetailService(endpoint, { params: { id }, queryParams })
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

export function usePostCreateLaunchpad() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.LAUNCHPADS,
    async (endpoint: string, { arg }: { arg: ICreateLaunchpadRequest }): Promise<ILaunchpad> =>
      postCreateLaunchpadService(endpoint, { payload: arg })
  );
  return {
    triggerPostCreateLaunchpad: trigger,
    isLoadingPostCreateLaunchpad: isMutating,
    errorPostCreateLaunchpad: error,
  };
}

export const useGetLaunchpadMinPledgeOptions = () => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: { keys: ['course_launchpad_min_pledge_options'] },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getLaunchpadConfigService<ILaunchpadMinPledgeOptionsResponse>(endpoint, {
      keys: ['course_launchpad_min_pledge_options'],
    })
  );

  return {
    dataLaunchpadMinPledgeOptions: data,
    errorLaunchpadMinPledgeOptions: error,
    mutateLaunchpadMinPledgeOptions: mutate,
    isLaunchpadMinPledgeOptionsLoading: isLoading,
  };
};

export const useGetLaunchpadVotingPhaseRule = () => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: { keys: ['course_launchpad_voting_phase_rule'] },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getLaunchpadConfigService<ILaunchpadVotingPhaseRuleResponse>(endpoint, {
      keys: ['course_launchpad_voting_phase_rule'],
    })
  );

  return {
    dataLaunchpadVotingPhaseRule: data,
    errorLaunchpadVotingPhaseRule: error,
    mutateLaunchpadVotingPhaseRule: mutate,
    isLaunchpadVotingPhaseRuleLoading: isLoading,
  };
};

export const useGetLaunchpadMinApprovalPercentage = () => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: { keys: ['course_launchpad_min_approval_percentage'] },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getLaunchpadConfigService<ILaunchpadMinApprovalPercentageResponse>(endpoint, {
      keys: ['course_launchpad_min_approval_percentage'],
    })
  );

  return {
    dataLaunchpadMinApprovalPercentage: data,
    errorLaunchpadMinApprovalPercentage: error,
    mutateLaunchpadMinApprovalPercentage: mutate,
    isLaunchpadMinApprovalPercentageLoading: isLoading,
  };
};

export const useGetLaunchpadMinSections = () => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: { keys: ['course_launchpad_min_sections'] },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getLaunchpadConfigService<ILaunchpadMinSections>(endpoint, {
      keys: ['course_launchpad_min_sections'],
    })
  );

  return {
    dataLaunchpadMinSections: data,
    errorLaunchpadMinSections: error,
    mutateLaunchpadMinSections: mutate,
    isLaunchpadMinSectionsLoading: isLoading,
  };
};

export const usePostInitPool = (id: string, wallet_id: string) => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_POOLS_ID,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (endpoint: string): Promise<ILaunchpad> =>
      postInitPoolLaunchpadService(endpoint, { payload: { wallet_id, id } })
  );

  return {
    triggerPostInitPool: trigger,
    isLoadingPostInitPool: isMutating,
    errorPostInitPool: error,
  };
};

export const usePostPledgeLaunchpad = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.LAUNCHPADS_INVESTMENTS,
    async (_endpoint: string, { arg }: { arg: IPledgeLaunchpadPayload }) => postPledgeLaunchpadService(arg)
  );

  return {
    triggerPostPledgeLaunchpad: trigger,
    isLoadingPostPledgeLaunchpad: isMutating,
    errorPostPledgeLaunchpad: error,
  };
};

export const usePostBookmarkLaunchpad = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.BOOKMARKS,
    async (endpoint: string, { arg }: { arg: { id: string } }): Promise<ILaunchpad> =>
      postBookmarkLaunchpadService(endpoint, { payload: arg })
  );

  return {
    triggerPostBookmarkLaunchpad: trigger,
    isLoadingPostBookmarkLaunchpad: isMutating,
    errorPostBookmarkLaunchpad: error,
  };
};

export const useDeleteBookmarkLaunchpad = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.BOOKMARKS_ID,
    async (endpoint: string, { arg }: { arg: { id: string } }): Promise<unknown> =>
      removeBookmarkLaunchpadService(endpoint, { payload: arg })
  );

  return {
    triggerDeleteBookmarkLaunchpad: trigger,
    isLoadingDeleteBookmarkLaunchpad: isMutating,
    errorDeleteBookmarkLaunchpad: error,
  };
};
