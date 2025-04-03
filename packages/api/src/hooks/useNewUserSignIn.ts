import useSWR from 'swr';
import { getNewUserSignInService } from '#services/new-user-sign-in';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetNewUserSignIn(isNewUser: boolean) {
  const { data, mutate, isLoading, error } = useSWR(
    isNewUser && API_ENDPOINT.FORM_NEW_USER_SURVEY,
    (endpoint: string) => getNewUserSignInService(endpoint)
  );

  return {
    isLoadingNewUserSignIn: isLoading,
    errorNewUserSignIn: error,
    dataNewUserSignIn: data ?? null,
    mutateNewUserSignIn: mutate,
  };
}
