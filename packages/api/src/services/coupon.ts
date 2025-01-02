import type { ICouponItemRes, ICouponListRes, ICouponPayload, IUseCouponPayload } from '#types/coupon';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

export async function getPlatformCouponListService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ICouponListRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COUPONS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ICouponListRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getAdminCouponListService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ICouponListRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ADMIN_COUPONS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ICouponListRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getCouponDetailService(
  url: string,
  { params, init }: { params: { id: string }; init?: RequestInit }
): Promise<ICouponItemRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COUPONS_ID,
      params: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ICouponItemRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export const postCouponService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICouponPayload; init?: RequestInit }
) => {
  const response = await postAPI<ICouponItemRes, ICouponPayload>(endpoint ?? API_ENDPOINT.COUPONS, payload, init);

  return response.data;
};

export const putCouponService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICouponPayload; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COUPONS_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await putAPI<ICouponItemRes, ICouponPayload>(endpointKey, payload, init);

  return response.data;
};

export const deleteCouponService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COUPONS,
      params: {
        ...payload,
      },
    });
  }
  const response = await deleteAPI<ICouponItemRes, null>(endpointKey, null, init);

  return response.data;
};

export const postApplyCouponService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IUseCouponPayload; init?: RequestInit }
) => {
  const response = await postAPI<ICouponItemRes, IUseCouponPayload>(
    endpoint ?? API_ENDPOINT.COUPONS_USE,
    payload,
    init
  );

  return response.data;
};
