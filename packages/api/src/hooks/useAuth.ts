import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getMeServiceWithoutError,
  postResetPasswordService,
  postSetPasswordService,
  postSignUpService,
} from '#services/auth';
import type { ISignUpPayload, ISignUpResponse } from '#types/auth';
import type { IResetPasswordPayload, IResetPasswordResponse } from '#types/reset-password';
import type { ISetPasswordPayload, ISetPasswordResponse } from '#types/set-password';
import { API_ENDPOINT } from '#utils/endpoints';

export const useMe = () => {
  const { data, isLoading, error, mutate } = useSWR(API_ENDPOINT.USERS_ME, getMeServiceWithoutError, {
    refreshInterval: 5000,
  });

  return { me: data, meIsLoading: isLoading, meError: error, meMutate: mutate };
};

export const useSignUp = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.AUTH_REGISTER,
    async (endpoint: string, { arg }: { arg: ISignUpPayload }): Promise<ISignUpResponse> =>
      postSignUpService(endpoint, { payload: arg })
  );

  return { triggerSignUp: trigger, isLoading: isMutating, error };
};

export function useSetPassword() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.AUTH_SET_PASSWORD,
    async (endpoint: string, { arg }: { arg: ISetPasswordPayload }): Promise<ISetPasswordResponse> =>
      postSetPasswordService(endpoint, { payload: arg })
  );

  return { triggerSetPassword: trigger, isLoading: isMutating, error };
}

export function useResetPassword() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.AUTH_SET_PASSWORD,
    async (endpoint: string, { arg }: { arg: IResetPasswordPayload }): Promise<IResetPasswordResponse> =>
      postResetPasswordService(endpoint, { payload: arg })
  );

  return { triggerResetPassword: trigger, isLoading: isMutating, error };
}
