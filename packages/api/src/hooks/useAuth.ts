import useSWR from 'swr';
import { getMeServiceWithoutError } from '#services/auth';
import { API_ENDPOINT } from '#utils/endpoints';

export const useMe = () => {
  const { data, isLoading, error, mutate } = useSWR(API_ENDPOINT.USERS_ME, getMeServiceWithoutError, {
    refreshInterval: 5000,
  });
  return { me: data, meIsLoading: isLoading, meError: error, meMutate: mutate };
};
