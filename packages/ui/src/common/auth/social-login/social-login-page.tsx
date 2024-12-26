import { PROVIDERS, createFacebookAuthorizeUrl, createGoogleAuthorizeUrl } from '@oe/api/utils/social-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SocialLoginPage() {
  const headersList = await headers();
  const referrer = headersList.get('referrer');
  const provider = headersList.get('provider');
  const originUrl = headersList.get('origin_url');

  if (!(provider && originUrl && referrer)) {
    redirect(originUrl ?? '/');
  }

  if (provider === PROVIDERS.facebook) {
    const url = createFacebookAuthorizeUrl(referrer, originUrl);
    redirect(url);
  } else if (provider === PROVIDERS.google) {
    const url = createGoogleAuthorizeUrl(referrer, originUrl);
    redirect(url);
  }
}
