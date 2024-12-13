import useSWR from 'swr';
import { getMeService } from '#services/auth';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetMe() {
  const { data, mutate, isLoading, error } = useSWR(API_ENDPOINT.USERS_ME, (endpoint: string) =>
    getMeService(endpoint)
  );

  return {
    isLoadingMe: isLoading,
    errorMe: error,
    dataMe: data,
    mutateMe: mutate,
  };
}
