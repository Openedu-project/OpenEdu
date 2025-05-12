import { PROVIDERS, createFacebookAuthorizeUrl, createGoogleAuthorizeUrl } from '@oe/api';
import { PLATFORM_ROUTES } from '@oe/core';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function SocialLoginPage() {
  const headersList = await headers();
  const url = headersList.get('x-user-url');
  const queryParams = url ? new URL(url).searchParams : null;
  const referrer = queryParams?.get('referrer');
  const provider = queryParams?.get('provider');
  const originUrl = queryParams?.get('origin_url');
  const inviteRefCode = queryParams?.get('inviteRefCode');

  if (!(provider && originUrl && referrer)) {
    redirect(originUrl ?? PLATFORM_ROUTES.homepage);
  }

  if (provider === PROVIDERS.facebook) {
    const url = await createFacebookAuthorizeUrl(referrer, originUrl, inviteRefCode ?? '');
    redirect(url);
  } else if (provider === PROVIDERS.google) {
    const url = await createGoogleAuthorizeUrl(referrer, originUrl, inviteRefCode ?? '');

    redirect(url);
  }

  return null;
}
