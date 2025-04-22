import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getAllReferralProgramListService, postInviteReferrerService } from '#services/referral-program';
import type { IFilter } from '#types/filter';
import type { IInviteReferrerPayload, IReferralProgramRes } from '#types/referral-program';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetAllReferralProgramList({ queryParams }: { queryParams: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.POINT_CAMPAIGNS,

    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAllReferralProgramListService(endpoint, { queryParams })
  );

  return {
    dataAllReferralProgramList: data,
    errorAllReferralProgramList: error,
    mutateAllReferralProgramList: mutate,
    isLoadingAllReferralProgramList: isLoading,
  };
}

export const usePostInviteReferrer = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.OE_REFERRAL_INVITE,
    async (endpoint: string, { arg }: { arg: IInviteReferrerPayload }): Promise<IReferralProgramRes> =>
      postInviteReferrerService(endpoint, arg)
  );

  return {
    triggerPostInviteReferrer: trigger,
    isLoadingPostInviteReferrer: isMutating,
    errorPostInviteReferrer: error,
  };
};
