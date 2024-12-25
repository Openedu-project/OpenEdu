import type { IFormResponse, IRejectFormRegisterOrgPayload, IRejectFormRegisterOrgRes } from '#types/form';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI, putAPI } from '#utils/fetch';

export async function getFormRegisterOrgService(
  url: string,
  { init }: { init?: RequestInit }
): Promise<IFormResponse | null> {
  try {
    const response = await fetchAPI<IFormResponse>(url ?? API_ENDPOINT.FORMS_REGISTER_ORGANIZATION, init);

    return response.data;
  } catch {
    return null;
  }
}

export const putRejectRegisterOrgService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IRejectFormRegisterOrgPayload; init?: RequestInit }
) => {
  const response = await putAPI<IRejectFormRegisterOrgRes, IRejectFormRegisterOrgPayload>(
    endpoint ?? API_ENDPOINT.FORM_SESSIONS_ID_REJECT,
    payload,
    init
  );

  return response.data;
};
