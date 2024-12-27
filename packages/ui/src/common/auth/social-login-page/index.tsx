import { PROVIDERS, createFacebookAuthorizeUrl, createGoogleAuthorizeUrl } from '@oe/api/utils/social-auth';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function SocialLoginPage() {
  const headersList = await headers();
  const url = headersList.get('x-url');
  const queryParams = url ? new URL(url).searchParams : null;
  const referrer = queryParams?.get('referrer');
  const provider = queryParams?.get('provider');
  const originUrl = queryParams?.get('origin_url');

  if (!(provider && originUrl && referrer)) {
    redirect(originUrl ?? PLATFORM_ROUTES.homepage);
  }

  if (provider === PROVIDERS.facebook) {
    const url = createFacebookAuthorizeUrl(referrer, originUrl);
    redirect(url);
  } else if (provider === PROVIDERS.google) {
    const url = createGoogleAuthorizeUrl(referrer, originUrl);
    redirect(url);
  }

  return null;
}
