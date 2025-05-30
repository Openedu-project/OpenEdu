import { createHash, randomBytes } from 'node:crypto';
import type { SocialProvider } from '#types/auth';

export const PROVIDERS: Record<SocialProvider, SocialProvider> = {
  google: 'google',
  facebook: 'facebook',
  twitter: 'twitter',
  linkedin: 'linkedin',
};

export const AUTHORIZE_ENDPOINT: Record<Exclude<SocialProvider, 'custom'>, string> = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  facebook: 'https://www.facebook.com/v20.0/dialog/oauth',
  twitter: 'https://api.twitter.com/oauth/authorize',
  linkedin: 'https://www.linkedin.com/oauth/v2/authorization',
};

const BASE64_PADDING_REGEX = /=+$/;

function generatePKCEPair() {
  const NUM_OF_BYTES = 22; // Total of 44 characters (1 Bytes = 2 char) (standard states that: 43 chars <= verifier <= 128 chars)
  const HASH_ALG = 'sha256';
  const randomVerifier = randomBytes(NUM_OF_BYTES).toString('hex');
  const hash = createHash(HASH_ALG).update(randomVerifier).digest('base64');
  const challenge = hash.replace(/\+/g, '-').replace(/\//g, '_').replace(BASE64_PADDING_REGEX, ''); // Clean base64 to make it URL safe
  return { verifier: randomVerifier, challenge };
}

const createSocialAuthorizeUrl = ({
  provider,
  referrer,
  originUrl,
  verifier,
  socialOptions,
}: {
  provider: SocialProvider;
  referrer: string;
  originUrl: string;
  verifier?: string;
  socialOptions: Record<string, string>;
}) => {
  const authorizeUrl = AUTHORIZE_ENDPOINT[provider];
  const url = new URL(authorizeUrl);
  url.searchParams.set('state', JSON.stringify({ referrer, provider, originUrl, verifier }));
  url.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_ORIGIN}/callback`);
  url.searchParams.set('response_type', 'code');
  for (const [key, value] of Object.entries(socialOptions)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
};

export const createGoogleAuthorizeUrl = (referrer: string, originUrl: string) => {
  return createSocialAuthorizeUrl({
    provider: 'google',
    referrer,
    originUrl,
    socialOptions: {
      client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
      prompt: 'select_account',
      scope: 'openid profile email',
    },
  });
};

export const createFacebookAuthorizeUrl = (referrer: string, originUrl: string) => {
  const { verifier, challenge } = generatePKCEPair();
  return createSocialAuthorizeUrl({
    provider: 'facebook',
    referrer,
    originUrl,
    verifier,
    socialOptions: {
      client_id: process.env.NEXT_PUBLIC_AUTH_FACEBOOK_ID,
      scope: 'email,public_profile',
      code_challenge: challenge,
      code_challenge_method: 'S256',
      nonce: verifier,
    },
  });
};
