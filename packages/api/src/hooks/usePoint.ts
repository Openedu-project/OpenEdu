import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getMyPointProfileService, postClaimNewPointService } from '#services/point';
import type { IClaimPointPayload, IMyPointProfileRes } from '#types/point';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetMyPointProfile(id: string) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.USER_ME_POINT,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getMyPointProfileService(endpoint, { id })
  );

  return {
    dataMyPointProfile: data,
    errorMyPointProfile: error,
    mutateMyPointProfile: mutate,
    isLoadingMyPointProfile: isLoading,
  };
}

export const usePostClaimNewPoint = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USER_ME_CLAIM_POINT,
    async (endpoint: string, { arg }: { arg: IClaimPointPayload }): Promise<IMyPointProfileRes> =>
      postClaimNewPointService(endpoint, arg)
  );

  return {
    triggerPostClaimNewPoint: trigger,
    isLoadingPostClaimNewPoint: isMutating,
    errorPostClaimNewPoint: error,
  };
};
