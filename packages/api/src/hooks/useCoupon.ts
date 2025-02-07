import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  deleteCouponService,
  getAdminCouponListService,
  getCouponDetailService,
  getPlatformCouponListService,
  postApplyCouponService,
  postCouponService,
  putCouponService,
} from '#services/coupon';
import type { ICouponItemRes, ICouponPayload, IUseCouponPayload } from '#types/coupon';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetPlatformCouponList({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.COUPONS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getPlatformCouponListService(endpoint, { params })
  );

  return {
    dataListPlatformCoupon: data,
    errorPlatformCoupon: error,
    mutateListPlatformCoupon: mutate,
    isLoadingPlatformCoupon: isLoading,
  };
}

export function useGetAdminCouponList({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.ADMIN_COUPONS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAdminCouponListService(endpoint, { params })
  );

  return {
    dataListAdminCoupon: data,
    errorAdminCoupon: error,
    mutateListAdminCoupon: mutate,
    isLoadingAdminCoupon: isLoading,
  };
}

export function useGetCouponDetail({ params }: { params: { id: string } }) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.COUPONS_ID, params: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getCouponDetailService(endpoint, { params })
  );

  return {
    dataCouponDetail: data,
    errorCouponDetail: error,
    mutateCouponDetail: mutate,
    isLoadingCouponDetail: isLoading,
  };
}

export const usePostCoupon = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COUPONS,
    async (endpoint: string, { arg }: { arg: ICouponPayload }): Promise<ICouponItemRes> =>
      postCouponService(endpoint, { payload: arg })
  );

  return { triggerPostCoupon: trigger, isLoadingPostCoupon: isMutating, errorPostCoupon: error };
};

export const usePutCoupon = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COUPONS_ID,
    async (_endpoint: string, { arg }: { arg: ICouponPayload }): Promise<ICouponItemRes> =>
      putCouponService(
        createAPIUrl({
          endpoint: API_ENDPOINT.COUPONS_ID,
          params: {
            id: arg.id,
          },
        }),
        { payload: arg }
      )
  );

  return { triggerPutCoupon: trigger, isLoadingPutCoupon: isMutating, errorPutCoupon: error };
};

export const useDeleteCoupon = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COUPONS,
    async (_endpoint: string, { arg }: { arg: { id: string } }): Promise<ICouponItemRes> =>
      deleteCouponService(`${API_ENDPOINT.COUPONS}/${arg.id}`, { payload: arg })
  );

  return { triggerDeleteCoupon: trigger, isLoadingDeleteCoupon: isMutating, errorDeleteCoupon: error };
};

export const usePostApplyCoupon = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COUPONS_USE,
    async (endpoint: string, { arg }: { arg: IUseCouponPayload }): Promise<ICouponItemRes> =>
      postApplyCouponService(endpoint, { payload: arg })
  );

  return { triggerPostApplyCoupon: trigger, isLoadingPostApplyCoupon: isMutating, errorPostApplyCoupon: error };
};
