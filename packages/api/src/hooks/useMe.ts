import { identifyUser } from '@oe/ui/components/logrocket-handler';
import useSWR from 'swr';
import { getMeService } from '#services/auth';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetMe() {
  const { data, mutate, isLoading, error } = useSWR(API_ENDPOINT.USERS_ME, (endpoint: string) =>
    getMeService(endpoint)
  );

  identifyUser(data?.email ?? '' ?? '', {
    name: data?.username ?? '',
    email: data?.email ?? '',
    role: data?.roles?.map(role => role.role_id).join(',') ?? '',
  });
  return {
    isLoadingMe: isLoading,
    errorMe: error,
    dataMe: data ?? null,
    mutateMe: mutate,
  };
}
