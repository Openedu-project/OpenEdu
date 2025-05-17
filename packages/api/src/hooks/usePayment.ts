import useSWR from 'swr';

import { buildUrl } from '@oe/core';
import { getPaymentMethodListService } from '#services/payment';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetPaymentMethodList(params: IFilter) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.PAYMENT_METHODS,
    queryParams: {
      ...params,
    },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getPaymentMethodListService(endpoint, { params })
  );

  return {
    isLoading,
    paymentMethodListError: error,
    mutatePaymentMethodList: mutate,
    dataPaymentMethodList: data,
  };
}
