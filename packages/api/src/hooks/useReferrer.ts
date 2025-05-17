import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteReferrerService, getReferrerListService, postReferrerService } from '#services/referrer';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import type { ICreateReferrersPayload } from '../types/referrer';

export function useGetReferrerList({ params, id }: { params: IFilter; id: string }) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_REFERRERS,
    params: {
      id,
    },
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getReferrerListService(endpoint, { params, id })
  );

  return {
    dataReferrerList: data,
    errorReferrerList: error,
    mutateReferrerList: mutate,
    isLoadingReferrerList: isLoading,
  };
}

export const usePostReferrer = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.REFERRERS,
    async (endpoint: string, { arg }: { arg: ICreateReferrersPayload }): Promise<void> =>
      postReferrerService(endpoint, { payload: arg })
  );

  return {
    triggerPostReferrer: trigger,
    isLoadingPostReferrer: isMutating,
    errorPostReferrer: error,
  };
};

export const useDeleteReferrer = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.REFERRERS,
    async (endpoint: string, { arg }: { arg: { ids: string[]; campaign_id: string } }): Promise<void> =>
      deleteReferrerService(endpoint, { payload: arg })
  );

  return {
    triggerDeleteReferrer: trigger,
    isLoadingDeleteReferrer: isMutating,
    errorDeleteReferrer: error,
  };
};
