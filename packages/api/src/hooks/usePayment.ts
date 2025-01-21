import useSWR from 'swr';

import { getPaymentMethodListService } from '#services/payment';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetPaymentMethodList(params: IFilter) {
  const endpointKey = createAPIUrl({
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
