// import 'server-only';
import { AUTH_ROUTES, cookieOptions, getCookieDomain } from '@oe/core';
// import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import type { SessionPayload } from '#actions/session';
import { encodeJWT } from '#actions/session';
import { socialLoginService } from '#services/auth';
import type { ISocialCallbackStateData } from '#types/auth';
import { refreshTokenExpiresIn } from '#utils/session';

export async function handleGETAuthCallback(request: NextRequest, successCallback: () => void) {
  const { searchParams } = request.nextUrl;
  const state = searchParams.get('state');
  const code = searchParams.get('code');

  if (!(state && code)) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_ORIGIN}${AUTH_ROUTES.login}?error=socialLoginFailed&next=/`
    );
  }

  const { provider, referrer, verifier, originUrl, inviteRefCode } = JSON.parse(
    decodeURIComponent(state)
  ) as ISocialCallbackStateData;
  const originUrlObj = new URL(originUrl);
  const nextPath = originUrlObj.searchParams.get('next');

  try {
    console.log(
      '--------------------socialLoginService--------------------',
      provider,
      code,
      verifier,
      inviteRefCode,
      originUrlObj.origin,
      referrer
    );
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
    const sessionPayload: SessionPayload = {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
    const sessionToken = await encodeJWT(sessionPayload);
    const response = NextResponse.redirect(originUrlObj);
    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
      value: sessionToken,
      ...cookieOptions({
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: refreshTokenExpiresIn,
        path: '/',
        domain: getCookieDomain(originUrlObj.host),
      }),
    });
    successCallback();
    return response;
  } catch (error) {
    console.error('Social login error:', error);
    return NextResponse.redirect(
      new URL(`${originUrlObj.origin}${AUTH_ROUTES.login}?error=socialLoginFailed&next=${nextPath}`)
    );
  }
}
