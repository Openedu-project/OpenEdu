import { cookieOptions } from '@oe/core';
import type { NextRequest } from 'next/server';
import type { NextResponse } from 'next/server';
import type { IToken } from '#types/auth';
import { API_ENDPOINT } from '#utils/endpoints';
import { HTTPError, HTTPErrorCodeMessages } from '#utils/http-error';
// import { cookieOptions } from '#utils/cookie';
import { setCookiesService } from './cookies';

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

  const refreshTokenData = await refreshTokenResponse.json();
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
