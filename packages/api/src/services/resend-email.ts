import type { IResendEmailPayload, IResendEmailResponse } from '#types/resend-email';
import { API_ENDPOINT } from '#utils/endpoints';
import { postAPI } from '#utils/fetch';

export const postResendEmailService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IResendEmailPayload; init?: RequestInit }
) => {
  const response = await postAPI<IResendEmailResponse, IResendEmailPayload>(
    endpoint ?? API_ENDPOINT.AUTH_RESEND_MAIL,
    payload,
    init
  );

  return response.data;
};
