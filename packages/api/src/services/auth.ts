import { type AuthEventName, authEvents, isLogin } from '#utils/auth';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';

import type { IAccessTokenResponse, ISignUpResponse, ISocialLoginPayload, IToken } from '@oe/api/types/auth';
import { cookieOptions } from '@oe/core/utils/cookie';
import type { NextRequest } from 'next/server';
import type { NextResponse } from 'next/server';
import type { LoginSchemaType, SignUpSchemaType } from '#schemas/authSchema';
import type { IForgotPasswordPayload, IForgotPasswordResponse } from '#types/auth';
import type { IResendEmailPayload, IResendEmailResponse, ISetPasswordPayload, ISetPasswordResponse } from '#types/auth';
import type { HTTPResponse } from '#types/fetch';
import type { IUser } from '#types/user';
import { HTTPError } from '#utils/http-error';
import { HTTPErrorCodeMessages } from '#utils/http-error';
import { setCookiesService } from './cookies';

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

export const loginService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: LoginSchemaType; init?: FetchOptions }
) => {
  const response = await postAPI<IToken, LoginSchemaType>(endpoint ?? API_ENDPOINT.AUTH_LOGIN, payload, {
    ...init,
    shouldRefreshToken: false,
  });
  const data = response.data;
  if (data.access_token && data.refresh_token) {
    await setCookiesService(typeof window !== 'undefined' ? window.location.origin : '', [
      {
        key: process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY,
        value: data.access_token,
      },
      {
        key: process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY,
        value: data.refresh_token,
      },
    ]);
  }

  return data;
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
    (endpoint ?? event === authEvents.setPassword) ? API_ENDPOINT.AUTH_SET_PASSWORD : API_ENDPOINT.AUTH_RESET_PASSWORD,
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
    endpointKey = createAPIUrl({
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
    const res = await fetchAPI<IUser>(url ?? API_ENDPOINT.USERS_ME, { ...init, shouldRefreshToken: false });

    return res?.data as IUser;
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

export const meMiddlewareService = async ({
  referrer,
  origin,
  accessToken,
  req,
  res,
}: {
  referrer: string;
  origin: string;
  accessToken?: string;
  req: NextRequest;
  res: NextResponse;
}): Promise<IUser | null> => {
  let retryCount = 0;
  const MAX_RETRIES = 1;

  async function attemptFetch(token: string): Promise<IUser | null> {
    const meResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.USERS_ME}`, {
      headers: {
        'X-referrer': referrer,
        Origin: origin,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!meResponse.ok) {
      if (meResponse.status === 401 && retryCount < MAX_RETRIES) {
        retryCount++;
        const { response, ...rest } = await refreshTokenMiddlewareService({
          referrer,
          origin,
          req,
          res,
        });
        const newToken = (rest as IToken).access_token;
        console.info('-------------new token for me------------', newToken);
        if (newToken) {
          return attemptFetch(newToken);
        }
      }
      throw new Error(HTTPErrorCodeMessages.NOT_FOUND);
    }

    const me = (await meResponse.json()) as HTTPResponse<IUser>;
    return me?.data;
  }

  try {
    if (!accessToken) {
      throw new Error(HTTPErrorCodeMessages.NOT_FOUND);
    }
    return await attemptFetch(accessToken);
  } catch (error) {
    console.error('==========meMiddlewareService error=============', error);
    return null;
  }
};

async function postRefreshToken(referrer?: string, origin?: string, refreshToken?: string) {
  if (!(refreshToken && origin && referrer)) {
    throw new Error(HTTPErrorCodeMessages.NOT_FOUND);
  }

  const refreshTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.AUTH_REFRESH_TOKEN}`, {
    method: 'POST',
    headers: {
      ...(referrer ? { 'X-referrer': referrer } : {}),
      ...(origin ? { Origin: origin } : {}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    credentials: 'include',
  });

  if (!refreshTokenResponse.ok) {
    const error = await refreshTokenResponse.json();
    console.info('================ refresh token - before error response ================', refreshToken);
    console.info('================ refresh token error response ================', error);
    throw new HTTPError({ message: error?.message ?? HTTPErrorCodeMessages.AUTHENTICATION_ERROR });
  }

  const refreshTokenData = (await refreshTokenResponse.json()) as HTTPResponse<IToken>;
  const data = refreshTokenData?.data;

  console.info('================ refresh token - before success response ================', refreshToken);
  console.info('================ refresh token success response ================', data);

  if (!data) {
    throw new Error(HTTPErrorCodeMessages.NOT_FOUND);
  }

  return data;
}

export async function refreshTokenService({
  origin,
  referrer,
  refreshToken,
}: {
  origin?: string;
  referrer?: string;
  refreshToken?: string;
}): Promise<IToken | null> {
  if (!(origin && refreshToken && referrer)) {
    return null;
  }
  // const cookies = await getCookies();
  // const origin = cookies?.[process.env.NEXT_PUBLIC_COOKIE_API_ORIGIN_KEY];
  // const refreshToken = cookies?.[process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY];
  console.info('==========refreshTokenService=============', origin);
  try {
    const data = await postRefreshToken(referrer, origin, refreshToken);
    if (data.access_token && data.refresh_token) {
      await setCookiesService(origin, [
        { key: process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, value: data.access_token },
        { key: process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, value: data.refresh_token },
      ]);
    }
    return data;
  } catch (error) {
    await setCookiesService(origin, [
      { key: process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, value: '', options: { maxAge: 0 } },
      { key: process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, value: '', options: { maxAge: 0 } },
    ]);
    console.error('==========refreshToken error=============', error);
    return null;
  }
}

export const refreshTokenMiddlewareService = async ({
  referrer,
  origin,
  req,
  res,
}: { referrer: string; origin: string; req: NextRequest; res: NextResponse }) => {
  const refreshToken = req.cookies.get(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY)?.value;
  const domain = new URL(origin).host;
  try {
    const data = await postRefreshToken(referrer, origin, refreshToken);
    res.cookies.set(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, data.access_token, {
      ...cookieOptions({ domain }),
    });
    res.cookies.set(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, data.refresh_token, {
      ...cookieOptions({ domain }),
    });
    return { ...data, response: res };
  } catch (error) {
    res.cookies.set(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, '', { ...cookieOptions({ domain }), maxAge: 0 });
    res.cookies.set(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, '', { ...cookieOptions({ domain }), maxAge: 0 });
    console.error('==========refreshToken error=============', error);

    return { response: res };
  }
};
