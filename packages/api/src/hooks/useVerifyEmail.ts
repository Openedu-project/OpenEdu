import useSWR from 'swr';
import { getVerifyEmailService } from '#services/verify-email';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useVerifyEmail(token: string) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.AUTH_VERIFY, queryParams: { token } });

  const { data, isLoading, error, mutate } = useSWR(token ? endpointKey : null, (endpoint: string) =>
    getVerifyEmailService(endpoint, { token })
  );

  return {
    dataVerifyEmail: data,
    isLoading,
    error,
    mutate,
  };
}
