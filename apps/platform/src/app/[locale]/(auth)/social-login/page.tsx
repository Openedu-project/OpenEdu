'use client';

import { PROVIDERS, challengeFromVerifier, loginWithFacebook, loginWithGoogle } from '@oe/api/services/social-login';
import { useCallback, useEffect } from 'react';

const redirectUri = typeof window === 'undefined' ? '' : `${window.location.origin}/callback`;

export default function SocialLoginPage() {
  const handleSocialLogin = useCallback(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const provider = searchParams.get('provider');
    const redirectUrl = searchParams.get('redirect_url');
    const referrer = searchParams.get('referrer');

    if (!(provider && redirectUrl && referrer)) {
      return;
    }

    try {
      const state = JSON.stringify({ referrer, redirectUrl, provider });

      if (provider === PROVIDERS.facebook) {
        const [codeChallenge, verifier] = await challengeFromVerifier();

        loginWithFacebook(JSON.stringify({ ...JSON.parse(state), verifier }), redirectUri, codeChallenge ?? '');
      } else {
        setTimeout(() => {
          loginWithGoogle(state, redirectUri);
        }, 500);
      }
    } catch (error) {
      console.error(`Error ${provider} Login`, error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await handleSocialLogin();
    })();
  }, [handleSocialLogin]);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-[1] flex h-[100%] min-h-screen items-center justify-center rounded-[16px]">
      Loading...
    </div>
  );
}
