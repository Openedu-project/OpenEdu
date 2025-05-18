import { encodeJWT, getTokenExpiry, parseJwt, socialLoginService } from '@oe/api';
import type { ISocialCallbackStateData, SessionPayload } from '@oe/api';
import { AUTH_ROUTES } from '@oe/core';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function AuthCallbackPage() {
  const headersList = await headers();
  const url = headersList.get('x-user-url');
  const queryParams = url ? new URL(url).searchParams : null;
  const state = queryParams?.get('state');
  const code = queryParams?.get('code');

  if (!(state && code && url)) {
    redirect(process.env.NEXT_PUBLIC_APP_ORIGIN);
  }

  const { provider, referrer, verifier, originUrl, inviteRefCode } = JSON.parse(
    decodeURIComponent(state)
  ) as ISocialCallbackStateData;
  const originUrlObj = new URL(originUrl);
  const nextPath = originUrlObj.searchParams.get('next');
  let newUrl: URL;
  try {
    const result = await socialLoginService(
      {
        provider,
        code,
        code_verifier: verifier ?? '',
        ref_code: inviteRefCode ?? '',
      },
      { headers: { origin: originUrlObj.origin, referrer } }
    );
    const { access_token, refresh_token } = result?.data ?? {};
    const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();
    const decodedAccessToken = parseJwt(access_token);
    // const { origin, referrer } = getReferrerAndOriginForAPIByUserUrl(url);
    const sessionPayload: SessionPayload = {
      id: decodedAccessToken?.sub || decodedAccessToken?.id,
      origin: originUrlObj.origin,
      referrer: referrer,
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiry: accessTokenExpiry,
      refreshTokenExpiry: refreshTokenExpiry,
      nextPath: decodedAccessToken.next_path,
    };
    const oauthToken = await encodeJWT(sessionPayload);
    newUrl = new URL(`${originUrlObj.origin}${nextPath ?? ''}`);
    newUrl.searchParams.set('oauth_token', oauthToken);
  } catch (error) {
    console.error('Social login error:', error);
    newUrl = new URL(`${originUrlObj.origin}/${AUTH_ROUTES.login}?error=socialLoginFailed&next=${nextPath}`);
  }
  if (newUrl) {
    redirect(newUrl.toString());
  }

  return null;
}
