import { cookieOptions, getCookieDomain } from '@oe/core';
import { type NextRequest, NextResponse } from 'next/server';
import { type SessionPayload, decodeJWT, encodeJWT } from '#actions/session';
import type { IToken } from '#types/auth';
import type { HTTPResponse } from '#types/fetch';
import { API_ENDPOINT } from '#utils/endpoints';
import { getReferrerAndOriginForAPIByUserUrl } from '#utils/referrer-origin';
import { refreshTokenExpiresIn } from '#utils/session';

type ErrorResponseParams = {
  redirectUrl: string | null;
  errorMessage: string;
  statusCode: number;
  redirectPath: string;
  baseUrl: string;
  domain?: string;
  successCallback?: () => void;
};

const createErrorResponse = ({
  redirectUrl,
  errorMessage,
  statusCode,
  redirectPath,
  baseUrl,
  domain,
  successCallback,
}: ErrorResponseParams) => {
  const response = redirectUrl
    ? NextResponse.redirect(new URL(redirectPath, baseUrl))
    : NextResponse.json({ error: errorMessage }, { status: statusCode });
  console.error('--------------------Error refresh token response--------------------', statusCode, response);
  response.cookies.delete({
    name: process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
    domain: getCookieDomain(domain),
  });
  successCallback?.();
  return response;
};

type RefreshParams = {
  refreshToken: string;
  origin?: string;
  referrer?: string;
  redirectUrl: string | null;
  baseUrl: string;
  domain?: string;
  successCallback?: () => void;
};

const handleTokenRefresh = async ({
  refreshToken,
  origin,
  referrer,
  redirectUrl,
  baseUrl,
  domain,
  successCallback,
}: RefreshParams) => {
  if (!refreshToken) {
    return createErrorResponse({
      redirectUrl,
      errorMessage: 'Refresh token not provided',
      statusCode: 400,
      redirectPath: '/',
      baseUrl,
      domain,
      successCallback,
    });
  }

  try {
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.AUTH_REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-referrer': referrer || '',
        Origin: origin || '',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!refreshResponse.ok) {
      return createErrorResponse({
        redirectUrl,
        errorMessage: 'Refresh failed',
        statusCode: 401,
        redirectPath: '/',
        baseUrl,
        domain,
        successCallback,
      });
    }

    const { data } = (await refreshResponse.json()) as HTTPResponse<IToken>;
    const accessToken = data?.access_token;
    const newRefreshToken = data?.refresh_token;

    if (!(accessToken && newRefreshToken)) {
      return createErrorResponse({
        redirectUrl,
        errorMessage: 'Invalid token data received',
        statusCode: 500,
        redirectPath: '/',
        baseUrl,
        domain,
        successCallback,
      });
    }

    const response = redirectUrl ? NextResponse.redirect(redirectUrl) : NextResponse.json(data, { status: 200 });

    const newSessionPayload: SessionPayload = {
      accessToken,
      refreshToken: newRefreshToken,
    };

    const newSessionToken = await encodeJWT(newSessionPayload);

    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
      value: newSessionToken,
      ...cookieOptions({
        domain,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: refreshTokenExpiresIn,
      }),
    });

    successCallback?.();
    return response;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return createErrorResponse({
      redirectUrl,
      errorMessage: 'Refresh failed',
      statusCode: 500,
      redirectPath: '/',
      baseUrl,
      domain,
      successCallback,
    });
  }
};

const processRequest = async (request: NextRequest, successCallback?: () => void) => {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get('redirectUrl');
  const session = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY)?.value;
  const userUrl = request.headers.get('x-user-url') || undefined;
  const { referrer, origin, host: domain } = getReferrerAndOriginForAPIByUserUrl(userUrl);

  if (!session) {
    return createErrorResponse({
      redirectUrl,
      errorMessage: 'Session not found',
      statusCode: 404,
      redirectPath: '/',
      baseUrl: request.url,
      domain,
      successCallback,
    });
  }

  try {
    const sessionPayload = (await decodeJWT(session)) as SessionPayload;
    const { refreshToken } = sessionPayload;

    if (!refreshToken) {
      return createErrorResponse({
        redirectUrl,
        errorMessage: 'Unauthorized',
        statusCode: 401,
        redirectPath: '/',
        baseUrl: request.url,
        domain,
        successCallback,
      });
    }

    return handleTokenRefresh({
      refreshToken,
      origin,
      referrer,
      redirectUrl,
      baseUrl: request.url,
      domain,
      successCallback,
    });
  } catch (error) {
    console.error('Error processing session:', error);
    return createErrorResponse({
      redirectUrl,
      errorMessage: 'Invalid session',
      statusCode: 401,
      redirectPath: '/',
      baseUrl: request.url,
      domain,
      successCallback,
    });
  }
};

export async function handleGETRefreshToken(request: NextRequest, successCallback?: () => void) {
  return await processRequest(request, successCallback);
}

export async function handlePOSTRefreshToken(request: NextRequest, successCallback?: () => void) {
  return await processRequest(request, successCallback);
}
