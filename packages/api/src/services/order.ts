import type {
  IOrderChangeMethodPayload,
  IOrderPayload,
  IOrderPaymentSuccessPayload,
  IOrderPaymentWithWalletPayload,
  IOrderPaymentWithWalletRes,
  IOrderRes,
  IOrderStatusRes,
} from '#types/order';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

export const postOrderService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IOrderPayload; init?: RequestInit }
) => {
  const response = await postAPI<IOrderRes, IOrderPayload>(endpoint ?? API_ENDPOINT.ORDERS, payload, init);

  return response.data;
};

export const putOrderChangeMethodService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IOrderChangeMethodPayload & { orderId: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ORDERS_ID_PAYMENT,
      params: {
        id: payload.orderId,
      },
    });
  }

  const response = await putAPI<IOrderRes, IOrderChangeMethodPayload>(endpointKey, payload, init);

  return response.data;
};

export const postOrderPaymentWithWalletService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IOrderPaymentWithWalletPayload & { orderId: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ORDERS_ID_PAYMENT,
      params: {
        id: payload.orderId,
      },
    });
  }

  const response = await postAPI<IOrderPaymentWithWalletRes, IOrderPaymentWithWalletPayload>(
    endpointKey,
    payload,
    init
  );

  return response.data;
};

export const deleteOrderCouponService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { orderId: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ORDERS_ID_COUPONS,
      params: {
        id: payload.orderId,
      },
    });
  }

  const response = await deleteAPI<IOrderRes, null>(endpointKey, null, init);

  return response.data;
};

export const postApplyCouponOrderService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { orderId: string; code: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ORDERS_ID_COUPONS_CODE,
      params: {
        id: payload.orderId,
        code: payload.code,
      },
    });
  }

  const response = await postAPI<IOrderRes, null>(endpointKey, null, init);

  return response.data;
};

export const postOrderPaymentSuccessService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IOrderPaymentSuccessPayload & { orderId: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ORDERS_ID_SUCCESS,
      params: {
        id: payload.orderId,
      },
    });
  }

  const response = await postAPI<IOrderRes, IOrderPaymentSuccessPayload>(endpointKey, payload, init);

  return response.data;
};

export const getOrderPaymentStatusService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { orderId: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.ORDERS_ID_STATUS,
      params: {
        id: payload.orderId,
      },
    });
  }

  try {
    const response = await fetchAPI<IOrderStatusRes | null>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
};
