import type { IForgotPasswordPayload, IForgotPasswordResponse } from '#types/forgot-password';
import { API_ENDPOINT } from '#utils/endpoints';
import { postAPI } from '#utils/fetch';

export const postForgotPasswordService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IForgotPasswordPayload; init?: RequestInit }
) => {
  const response = await postAPI<IForgotPasswordResponse, IForgotPasswordPayload>(
    endpoint ?? API_ENDPOINT.AUTH_FORGOT_PASSWORD,
    payload,
    init
  );

  return response.data;
};
