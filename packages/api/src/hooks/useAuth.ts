import { identifyUser } from '@oe/ui/components/logrocket-handler';
import useSWR from 'swr';
import { getMeServiceWithoutError } from '#services/auth';
import { API_ENDPOINT } from '#utils/endpoints';

export const useMe = () => {
  const { data, isLoading, error, mutate } = useSWR(API_ENDPOINT.USERS_ME, getMeServiceWithoutError, {
    refreshInterval: 5000,
  });
  identifyUser(data?.email ?? '', {
    name: data?.username ?? '',
    email: data?.email ?? '',
    role: data?.roles?.map(role => role.role_id).join(',') ?? '',
  });
  return { me: data, meIsLoading: isLoading, meError: error, meMutate: mutate };
};
