import type { IResendEmailResponse } from '#types/resend-email';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

export async function getVerifyEmailService(
  url: string,
  { token, init }: { token: string; init?: RequestInit }
): Promise<IResendEmailResponse | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.AUTH_VERIFY,
      queryParams: {
        token,
      },
    });
  }

  try {
    const response = await fetchAPI<IResendEmailResponse>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}
