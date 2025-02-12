import useSWR from 'swr';

import { getCurrencyService } from '#services/currency';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetCurrencyList(shouldFetch = true) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: { keys: 'currency' },
  });

  const { data, isLoading, error, mutate } = useSWR(shouldFetch ? endpointKey : null, (endpoint: string) =>
    getCurrencyService(endpoint, { keys: 'currency' })
  );

  return {
    dataCurrencyList: data,
    isLoadingCurrencyList: isLoading,
    errorCurrencyList: error,
    mutateCurrencyList: () => mutate,
  };
}
