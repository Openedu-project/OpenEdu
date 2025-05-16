'use server';

import type { LoginSchemaType } from '#schemas/authSchema';
import type { IToken } from '#types/auth';
import { API_ENDPOINT } from '#utils/endpoints';
import { postAPI } from '#utils/fetch';
import type { HTTPError } from '#utils/http-error';
import { getAPIReferrerAndOriginServer } from '#utils/referrer-origin';
import { type JWT, getTokenExpiry, parseJwt } from '#utils/session';
import { type SessionPayload, clearSession, setSessionCookie } from './session';

export async function loginAction(payload: LoginSchemaType) {
  try {
    const { origin, referrer } = await getAPIReferrerAndOriginServer();
    const response = await postAPI<IToken, LoginSchemaType>(API_ENDPOINT.AUTH_LOGIN, payload, {
      headers: {
        origin,
        referrer,
      },
    });
    const data = response.data;

    const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();
    const accessTokenPayload = parseJwt(data.access_token);

    const sessionPayload: SessionPayload = {
      id: accessTokenPayload.sub,
      origin,
      referrer,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      accessTokenExpiry,
      refreshTokenExpiry,
      nextPath: payload.next_path,
    };

    await setSessionCookie(sessionPayload);

    return data;
  } catch (error) {
    console.error('[Auth.js] Login failed', error);
    return {
      success: false,
      error: {
        message: (error as HTTPError).message,
      },
    };
  }
}

export async function logoutAction() {
  await clearSession();
}

export async function refreshAccessTokenAction(token: JWT): Promise<JWT | null> {
  // try {
  if (!token.refreshToken) {
    console.warn('[Auth.js] Không thể làm mới token khi không có refresh token');
    return null;
  }

  console.info('[Auth.js] Refreshing token', token.refreshToken, token.origin, token.referrer);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.AUTH_REFRESH_TOKEN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-referrer': token.referrer || '',
      Origin: token.origin || '',
    },
    body: JSON.stringify({
      refresh_token: token.refreshToken,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('[Auth.js] Refresh token failed with status:', response.status);
    await clearSession();
    return null;
    // if (response.status === 401) {
    //   // Refresh token không hợp lệ, xóa session
    // }
    // throw new Error(`Failed to refresh token: ${response.status}`);
  }

  const { data } = await response.json();

  if (!data?.access_token) {
    console.error('[Auth.js] Invalid token response', data);
    return null;
  }

  console.info('[Auth.js] Token refreshed successfully');

  // const accessTokenPayload = parseJwt(data.access_token);
  const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();

  const updatedToken = {
    ...token,
    // id: accessTokenPayload.sub,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpiry,
    refreshTokenExpiry,
  };

  // Cập nhật session với token mới
  await setSessionCookie(updatedToken);

  return updatedToken;
  // } catch (error) {
  //   console.error('[Auth.js] Token refresh failed', error);
  //   throw handleError(error);
  // }
}
