import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import {
  deleteCommissionService,
  getCommissionDetailService,
  getCommissionListService,
  postCommissionService,
  putCommissionService,
} from '../services/commission';
import type { ICommissionItem, ICommissionPayload } from '../types/commission';

export function useGetCommissionList({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COMMISSIONS,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getCommissionListService(endpoint, { params })
  );

  return {
    dataCommissionList: data,
    errorCommissionList: error,
    mutateCommissionList: mutate,
    isLoadingCommissionList: isLoading,
  };
}

export function useGetCommissionDetail({ params }: { params: { id: string } }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COMMISSIONS_ID,
    params: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getCommissionDetailService(endpoint, { params })
  );

  return {
    dataCommissionDetail: data,
    errorCommissionDetail: error,
    mutateCommissionDetail: mutate,
    isLoadingCommissionDetail: isLoading,
  };
}

export const usePostCommission = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COMMISSIONS,
    async (endpoint: string, { arg }: { arg: ICommissionPayload }): Promise<ICommissionItem> =>
      postCommissionService(endpoint, { payload: arg })
  );

  return {
    triggerPostCommission: trigger,
    isLoadingPostCommission: isMutating,
    errorPostCommission: error,
  };
};

export const usePutCommission = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COMMISSIONS_ID,
    async (_endpoint: string, { arg }: { arg: ICommissionPayload }): Promise<ICommissionItem> =>
      putCommissionService(
        createAPIUrl({
          endpoint: API_ENDPOINT.COMMISSIONS_ID,
          params: {
            id: arg.id,
          },
        }),
        { payload: arg }
      )
  );

  return {
    triggerPutCommission: trigger,
    isLoadingPutCommission: isMutating,
    errorPutCommission: error,
  };
};

export const useDeleteCommission = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COMMISSIONS,
    async (endpoint: string, { arg }: { arg: { ids: string[]; campaign_id: string } }): Promise<void> =>
      deleteCommissionService(endpoint, { payload: arg })
  );

  return {
    triggerDeleteCommission: trigger,
    isLoadingDeleteCommission: isMutating,
    errorDeleteCommission: error,
  };
};
