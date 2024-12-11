import { isLogin } from '#utils/auth';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI, postAPI } from '#utils/fetch';

import type { ILoginPayload, ISignUpPayload, ISignUpResponse, IToken } from '@oe/api/types/auth';
import { cookieOptions, getCookies, setCookie } from '@oe/core/utils/cookie';
import type { NextRequest } from 'next/server';
import type { NextResponse } from 'next/server';
import type { HTTPResponse } from '#types/fetch';
import type { IResetPasswordPayload, IResetPasswordResponse } from '#types/reset-password';
import type { ISetPasswordPayload, ISetPasswordResponse } from '#types/set-password';
import type { IUser } from '#types/user';
import { HTTPError } from '#utils/http-error';
import { HTTPErrorCodeMessages } from '#utils/http-error';

export const postSignUpService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ISignUpPayload; init?: RequestInit }
) => {
  const response = await postAPI<ISignUpResponse, ISignUpPayload>(
    endpoint ?? API_ENDPOINT.AUTH_REGISTER,
    payload,
    init
  );

  return response.data;
};

export const loginService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ILoginPayload; init?: RequestInit }
) => {
  const response = await postAPI<IToken, ILoginPayload>(endpoint ?? API_ENDPOINT.AUTH_LOGIN, payload, init);

  return response.data;
};

export const postSetPasswordService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ISetPasswordPayload; init?: RequestInit }
) => {
  const response = await postAPI<ISetPasswordResponse, ISetPasswordPayload>(
    endpoint ?? API_ENDPOINT.AUTH_SET_PASSWORD,
    payload,
    init
  );

  return response.data;
};

export const postResetPasswordService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IResetPasswordPayload; init?: RequestInit }
) => {
  const response = await postAPI<IResetPasswordResponse, IResetPasswordPayload>(
    endpoint ?? API_ENDPOINT.AUTH_RESET_PASSWORD,
    payload,
    init
  );

  return response.data;
};

export async function getMeService(url?: string, init?: RequestInit): Promise<IUser | null> {
  const isLoggedIn = await isLogin();
  if (isLoggedIn) {
    const res = await fetchAPI<IUser>(url ?? API_ENDPOINT.USERS_ME, init);

    return res?.data as IUser;
  }
  return null;
}

export function getMeServiceWithoutError(url?: string, init?: RequestInit) {
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

export async function refreshTokenService(): Promise<IToken | null> {
  const cookies = await getCookies();
  const origin = cookies?.[process.env.NEXT_PUBLIC_COOKIE_API_ORIGIN_KEY];
  const referrer = cookies?.[process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY];
  const refreshToken = cookies?.[process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY];

  try {
    const data = await postRefreshToken(referrer, origin, refreshToken);

    setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, data.access_token);
    setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, data.refresh_token);
    return data;
  } catch (error) {
    setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, '', { maxAge: 0 });
    setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, '', { maxAge: 0 });
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
  try {
    const data = await postRefreshToken(referrer, origin, refreshToken);

    res.cookies.set(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, data.access_token, { ...cookieOptions() });
    res.cookies.set(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, data.refresh_token, { ...cookieOptions() });
    return { ...data, response: res };
  } catch (error) {
    res.cookies.set(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, '', { ...cookieOptions(), maxAge: 0 });
    res.cookies.set(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, '', { ...cookieOptions(), maxAge: 0 });
    console.error('==========refreshToken error=============', error);

    return { response: res };
  }
};
