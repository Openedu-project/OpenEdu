import type { IFormResponse, IRejectFormRegisterCreatorPayload, IRejectFormRegisterCreatorRes } from '#types/form';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI, putAPI } from '#utils/fetch';

export async function getFormRegisterCreatorService(
  url: string,
  { init }: { init?: RequestInit }
): Promise<IFormResponse | null> {
  try {
    const response = await fetchAPI<IFormResponse>(url ?? API_ENDPOINT.FORMS_REGISTER_CREATOR, init);

    return response.data;
  } catch {
    return null;
  }
}

export const putRejectRegisterCreatorService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IRejectFormRegisterCreatorPayload; init?: RequestInit }
) => {
  const response = await putAPI<IRejectFormRegisterCreatorRes, IRejectFormRegisterCreatorPayload>(
    endpoint ?? API_ENDPOINT.FORM_SESSIONS_ID_REJECT,
    payload,
    init
  );

  return response.data;
};
