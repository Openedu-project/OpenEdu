import useSWRMutation from 'swr/mutation';

import { postResendEmailService } from '#services/resend-email';
import type { IResendEmailPayload, IResendEmailResponse } from '#types/resend-email';
import { API_ENDPOINT } from '#utils/endpoints';

export const usePostResendEmail = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.AUTH_RESEND_MAIL,
    async (endpoint: string, { arg }: { arg: IResendEmailPayload }): Promise<IResendEmailResponse> =>
      postResendEmailService(endpoint, { payload: arg })
  );

  return { triggerResendEmail: trigger, isLoadingResendEmail: isMutating, error };
};
