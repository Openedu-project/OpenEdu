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

// Chuyển đổi từ ArrayBuffer sang hex string
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Chuyển đổi từ ArrayBuffer sang base64 URL-safe
function bufferToBase64UrlSafe(buffer: ArrayBuffer): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(BASE64_PADDING_REGEX, '');
}

async function generatePKCEPair() {
  const NUM_OF_BYTES = 22; // Total of 44 characters (1 Bytes = 2 char) (standard states that: 43 chars <= verifier <= 128 chars)

  // Tạo verifier sử dụng Web Crypto API
  const randomArray = new Uint8Array(NUM_OF_BYTES);
  crypto.getRandomValues(randomArray);
  const randomVerifier = bufferToHex(randomArray.buffer);

  // Tạo challenge sử dụng Web Crypto API
  const encodedVerifier = new TextEncoder().encode(randomVerifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedVerifier);
  const challenge = bufferToBase64UrlSafe(hashBuffer);

  return { verifier: randomVerifier, challenge };
}

const createSocialAuthorizeUrl = ({
  provider,
  referrer,
  originUrl,
  inviteRefCode,
  verifier,
  socialOptions,
}: {
  provider: SocialProvider;
  referrer: string;
  originUrl: string;
  inviteRefCode: string;
  verifier?: string;
  socialOptions: Record<string, string>;
}) => {
  const authorizeUrl = AUTHORIZE_ENDPOINT[provider];
  const url = new URL(authorizeUrl);

  url.searchParams.set('state', JSON.stringify({ referrer, provider, originUrl, verifier, inviteRefCode }));
  url.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_ORIGIN}/callback`);
  url.searchParams.set('response_type', 'code');
  for (const [key, value] of Object.entries(socialOptions)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
};

export const createGoogleAuthorizeUrl = (referrer: string, originUrl: string, inviteRefCode: string) => {
  return createSocialAuthorizeUrl({
    provider: 'google',
    referrer,
    originUrl,
    inviteRefCode,
    socialOptions: {
      client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
      prompt: 'select_account',
      scope: 'openid profile email',
    },
  });
};

export const createFacebookAuthorizeUrl = async (referrer: string, originUrl: string, inviteRefCode: string) => {
  const { verifier, challenge } = await generatePKCEPair();
  return createSocialAuthorizeUrl({
    provider: 'facebook',
    referrer,
    originUrl,
    inviteRefCode,
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
