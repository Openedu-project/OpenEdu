import { socialLoginService } from '@oe/api/services/auth';
import type { ISocialCallbackStateData } from '@oe/api/types/auth';
import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function AuthCallbackPage() {
  const headersList = await headers();
  const state = headersList.get('state');
  const code = headersList.get('code');

  if (!(state && code)) {
    redirect(process.env.NEXT_PUBLIC_APP_ORIGIN);
  }

  const { provider, referrer, verifier, originUrl } = JSON.parse(state) as ISocialCallbackStateData;

  try {
    const result = await socialLoginService(
      { provider, code, code_verifier: verifier },
      { origin: new URL(originUrl).origin, referrer }
    );
    const url = new URL(originUrl);
    const nextPath = url.searchParams.get('next');
    const newUrl = new URL(`${url.origin}${nextPath ?? ''}`);
    newUrl.searchParams.set('oauth_token', encodeURIComponent(btoa(JSON.stringify(result?.data ?? {}))));
    redirect(newUrl.toString());
  } catch (error) {
    console.error('Social login error:', error);
    redirect(`${new URL(originUrl).origin}/${AUTH_ROUTES.login}?error=social-login-failed`);
  }
}
