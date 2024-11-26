import useSWRMutation from 'swr/mutation';
import { postForgotPasswordService } from '#services/forgot-password';
import type { IForgotPasswordPayload, IForgotPasswordResponse } from '#types/forgot-password';
import { API_ENDPOINT } from '#utils/endpoints';

export const useForgotPassword = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.AUTH_FORGOT_PASSWORD,
    async (endpoint: string, { arg }: { arg: IForgotPasswordPayload }): Promise<IForgotPasswordResponse> =>
      postForgotPasswordService(endpoint, { payload: arg })
  );

  return { triggerForgetPassword: trigger, isLoading: isMutating, error };
};
