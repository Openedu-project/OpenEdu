import { buildUrl } from '@oe/core';
import useSWRMutation from 'swr/mutation';
import {
  deleteOrderCouponService,
  getOrderPaymentStatusService,
  postApplyCouponOrderService,
  postOrderPaymentSuccessService,
  postOrderPaymentWithWalletService,
  postOrderService,
  putOrderChangeMethodService,
} from '#services/order';
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

export const useCreateOrder = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ORDERS,
    async (endpoint: string, { arg }: { arg: IOrderPayload }): Promise<IOrderRes> =>
      postOrderService(endpoint, { payload: arg })
  );

  return {
    triggerCreateOrder: trigger,
    isLoadingCreateOrder: isMutating,
    errorCreateOrder: error,
  };
};

export const useApplyCouponOrder = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ORDERS_ID_COUPONS_CODE,
    async (_endpoint: string, { arg }: { arg: { orderId: string; code: string } }): Promise<IOrderRes> =>
      postApplyCouponOrderService(
        buildUrl({
          endpoint: API_ENDPOINT.ORDERS_ID_COUPONS_CODE,
          params: {
            id: arg.orderId,
            code: arg.code,
          },
        }),
        {
          payload: {
            orderId: arg.orderId,
            code: arg.code,
          },
        }
      )
  );

  return {
    triggerApplyCouponOrder: trigger,
    isLoadingApplyCouponOrder: isMutating,
    applyCouponOrderError: error,
  };
};

export const useOrderChangeMethod = (orderId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ORDERS_ID_PAYMENT,
    async (_endpoint: string, { arg }: { arg: IOrderChangeMethodPayload }): Promise<IOrderRes> =>
      putOrderChangeMethodService(
        buildUrl({
          endpoint: API_ENDPOINT.ORDERS_ID_PAYMENT,
          params: {
            id: orderId,
          },
        }),
        { payload: { ...arg, orderId } }
      )
  );

  return {
    triggerOrderChangeMethod: trigger,
    isLoadingOrderChangeMethod: isMutating,
    OrderChangeMethodError: error,
  };
};

export const useOrderPaymentStatus = (orderId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ORDERS_ID_STATUS,
    async (_endpoint: string): Promise<IOrderStatusRes | null> =>
      getOrderPaymentStatusService(
        buildUrl({
          endpoint: API_ENDPOINT.ORDERS_ID_STATUS,
          params: {
            id: orderId,
          },
        }),
        { payload: { orderId } }
      )
  );

  return {
    triggerOrderPaymentStatus: trigger,
    orderPaymentStatusLoading: isMutating,
    orderPaymentStatusError: error,
  };
};

export const useOrderPaymentSuccess = (orderId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ORDERS_ID_SUCCESS,
    async (_endpoint: string, { arg }: { arg: IOrderPaymentSuccessPayload }): Promise<IOrderRes> =>
      postOrderPaymentSuccessService(
        buildUrl({
          endpoint: API_ENDPOINT.ORDERS_ID_SUCCESS,
          params: {
            id: orderId,
          },
        }),
        { payload: { ...arg, orderId } }
      )
  );

  return {
    triggerOrderPaymentSuccess: trigger,
    isLoadingOrderPaymentSuccess: isMutating,
    orderPaymentSuccessError: error,
  };
};

export const useOrderPaymentWithWallet = (orderId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ORDERS_ID_PAYMENT,
    async (_endpoint: string, { arg }: { arg: IOrderPaymentWithWalletPayload }): Promise<IOrderPaymentWithWalletRes> =>
      postOrderPaymentWithWalletService(
        buildUrl({
          endpoint: API_ENDPOINT.ORDERS_ID_PAYMENT,
          params: {
            id: orderId,
          },
        }),
        { payload: { ...arg, orderId } }
      )
  );

  return {
    triggerOrderPaymentWithWallet: trigger,
    isLoadingOrderPaymentWithWallet: isMutating,
    OrderPaymentWithWalletError: error,
  };
};

export const useOrderDeleteCoupon = (orderId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ORDERS_ID_COUPONS,
    async (_endpoint: string): Promise<IOrderRes> =>
      deleteOrderCouponService(
        buildUrl({
          endpoint: API_ENDPOINT.ORDERS_ID_COUPONS,
          params: {
            id: orderId,
          },
        }),
        { payload: { orderId } }
      )
  );

  return {
    triggerOrderDeleteCoupon: trigger,
    isLoadingOrderDeleteCoupon: isMutating,
    OrderDeleteCouponError: error,
  };
};
