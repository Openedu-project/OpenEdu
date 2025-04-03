import type { INewUSerSignIn } from '#types/new-user-sign-in';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, fetchAPI } from '#utils/fetch';

export async function getNewUserSignInService(url?: string, init?: FetchOptions): Promise<INewUSerSignIn | null> {
  const res = await fetchAPI<INewUSerSignIn>(url ?? API_ENDPOINT.FORM_NEW_USER_SURVEY, {
    ...init,
  });

  return res?.data;
}
