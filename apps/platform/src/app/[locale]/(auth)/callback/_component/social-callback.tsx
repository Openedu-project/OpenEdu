import { convertToBase64, socialLoginService } from '@oe/api/services/social-login';
import type { ISNSStateData } from '@oe/api/types/social-login';
import { redirect } from 'next/navigation';

export default async function AuthCallbackPage({
  state,
  code,
}: {
  state: string;
  code: string;
}) {
  let stateData: ISNSStateData | null = null;

  if (state) {
    try {
      stateData = JSON.parse(state) as ISNSStateData;
    } catch (error) {
      console.error('Error parsing state:', error);
    }
  }

  const fallbackRedirectUrl = '/login';
  const redirectUrl = stateData?.redirectUrl || fallbackRedirectUrl;

  if (!(state && code)) {
    redirect(`${redirectUrl}/login?error=social-login-failed`);
  }

  try {
    const { provider, referrer } = stateData || {};

    if (!(provider && referrer)) {
      throw new Error('Missing provider or referrer');
    }
    const verifier = stateData?.verifier ?? null;

    const res = await socialLoginService({ code, provider, code_verifier: verifier });

    const token = encodeURIComponent(convertToBase64(res?.data ?? {}));

    // Instead of redirecting here, return the URL
    return { redirectTo: `${redirectUrl}?oauth_token=${token}` };
  } catch (error) {
    console.error('Social login error:', error);
    return { redirectTo: `${redirectUrl}/login?error=social-login-failed` };
  }
}
