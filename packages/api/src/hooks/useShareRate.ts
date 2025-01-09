import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getShareRateByCodeService, putShareRateService } from '#services/share-rate';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import type { IShareRatePayload, IShareRateRes } from '../types/share-rate';

export function useGetShareRateByCode({ params }: { params: IFilter & { code: string } }) {
  const endpointKey = params.code
    ? createAPIUrl({
        endpoint: API_ENDPOINT.REFERRAL_LINKS_BY_CODE_CODE,
        params: {
          code: params.code,
        },
        queryParams: { ...params },
      })
    : '';

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getShareRateByCodeService(endpoint, { params })
  );

  return {
    dataShareRateByCode: data,
    errorShareRateByCode: error,
    mutateShareRateByCode: mutate,
    isLoadingShareRateByCode: isLoading,
  };
}
export const usePutShareRate = (id: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.REFERRAL_LINKS_ID,
    async (_endpoint: string, { arg }: { arg: IShareRatePayload }): Promise<IShareRateRes> =>
      putShareRateService(
        createAPIUrl({
          endpoint: API_ENDPOINT.REFERRAL_LINKS_ID,
          params: { id },
        }),
        { payload: arg }
      )
  );

  return {
    triggerPutShareRate: trigger,
    isLoadingPutShareRate: isMutating,
    errorPutShareRate: error,
  };
};

export const usePutShareRateById = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.REFERRAL_LINKS_ID,
    async (_endpoint: string, { arg }: { arg: IShareRatePayload }): Promise<IShareRateRes> =>
      putShareRateService(
        createAPIUrl({
          endpoint: API_ENDPOINT.REFERRAL_LINKS_ID,
          params: {
            id: arg.campaignId || '',
          },
        }),
        { payload: arg }
      )
  );

  return {
    triggerPutShareRate: trigger,
    isLoadingPutShareRate: isMutating,
    errorPutShareRate: error,
  };
};
