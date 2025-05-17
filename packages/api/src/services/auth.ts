import { buildUrl } from '@oe/core';
import type { SignUpSchemaType } from '#schemas/authSchema';
import type {
  IAccessTokenResponse,
  IForgotPasswordPayload,
  IForgotPasswordResponse,
  IResendEmailPayload,
  IResendEmailResponse,
  ISetPasswordPayload,
  ISetPasswordResponse,
  ISignUpResponse,
  ISocialLoginPayload,
} from '#types/auth';
import type { IUser } from '#types/user';
import { type AuthEventName, authEvents, isLogin } from '#utils/auth';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, fetchAPI, postAPI } from '#utils/fetch';

export const signUpService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: SignUpSchemaType; init?: FetchOptions }
) => {
  const response = await postAPI<ISignUpResponse, SignUpSchemaType>(
    endpoint ?? API_ENDPOINT.AUTH_REGISTER,
    payload,
    init
  );

  return response.data;
};

export const forgotPasswordService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IForgotPasswordPayload; init?: FetchOptions }
) => {
  const response = await postAPI<IForgotPasswordResponse, IForgotPasswordPayload>(
    endpoint ?? API_ENDPOINT.AUTH_FORGOT_PASSWORD,
    payload,
    init
  );

  return response.data;
};

export const socialLoginService = async (payload: ISocialLoginPayload, init?: FetchOptions) => {
  const response = await postAPI<IAccessTokenResponse, ISocialLoginPayload>(API_ENDPOINT.AUTH, payload, init);

  return response;
};

export const setPasswordService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ISetPasswordPayload & { event: AuthEventName }; init?: FetchOptions }
) => {
  const { event, ...rest } = payload;
  const response = await postAPI<ISetPasswordResponse, ISetPasswordPayload>(
    (endpoint ?? event === authEvents.resetPassword)
      ? API_ENDPOINT.AUTH_RESET_PASSWORD
      : API_ENDPOINT.AUTH_SET_PASSWORD,
    rest,
    init
  );

  return response.data;
};

export const resendEmailService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IResendEmailPayload; init?: FetchOptions }
) => {
  const response = await postAPI<IResendEmailResponse, IResendEmailPayload>(
    endpoint ?? API_ENDPOINT.AUTH_RESEND_MAIL,
    payload,
    init
  );

  return response.data;
};

export async function verifyEmailService(
  url: string | undefined,
  { token, init }: { token: string; init?: RequestInit }
): Promise<IResendEmailResponse> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.AUTH_VERIFY,
      queryParams: {
        token,
      },
    });
  }

  const response = await fetchAPI<IResendEmailResponse>(endpointKey, init);
  return response?.data;
}

export async function getMeService(url?: string, init?: FetchOptions): Promise<IUser | null> {
  const isLoggedIn = await isLogin();
  if (isLoggedIn) {
    const res = await fetchAPI<IUser>(url ?? API_ENDPOINT.USERS_ME, { ...init });
    const { data } = res;

    return data as IUser;
  }
  return null;
}

export function getMeServiceWithoutError(url?: string, init?: FetchOptions) {
  try {
    return getMeService(url, init);
  } catch {
    return null;
  }
}
