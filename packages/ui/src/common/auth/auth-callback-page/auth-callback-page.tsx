import { socialLoginService } from '@oe/api';
import type { ISocialCallbackStateData } from '@oe/api';
import { AUTH_ROUTES } from '@oe/core';
import { jsonToBase64 } from '@oe/core';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function AuthCallbackPage() {
  const headersList = await headers();
  const url = headersList.get('x-url');
  const queryParams = url ? new URL(url).searchParams : null;
  const state = queryParams?.get('state');
  const code = queryParams?.get('code');

  if (!(state && code)) {
    redirect(process.env.NEXT_PUBLIC_APP_ORIGIN);
  }

  const { provider, referrer, verifier, originUrl } = JSON.parse(decodeURIComponent(state)) as ISocialCallbackStateData;
  const originUrlObj = new URL(originUrl);
  const nextPath = originUrlObj.searchParams.get('next');
  let newUrl: URL;
  try {
    const result = await socialLoginService(
      { provider, code, code_verifier: verifier ?? '' },
      { origin: originUrlObj.origin, referrer }
    );
    newUrl = new URL(`${originUrlObj.origin}${nextPath ?? ''}`);
    newUrl.searchParams.set('oauth_token', jsonToBase64(result?.data ?? {}));
  } catch (error) {
    console.error('Social login error:', error);
    newUrl = new URL(`${originUrlObj.origin}/${AUTH_ROUTES.login}?error=socialLoginFailed&next=${nextPath}`);
  }
  redirect(newUrl.toString());

  return null;
}
