import { sha256 } from 'js-sha256';

import type { IAccessTokenResponse, ISocialLoginPayload } from '#types/auth';
import { API_ENDPOINT } from '#utils/endpoints';
import { postAPI } from '#utils/fetch';
import type { SNSProvider } from '../types/social-login';

export const PROVIDERS: Record<SNSProvider, SNSProvider> = {
  google: 'google',
  facebook: 'facebook',
  twitter: 'twitter',
};

export const AUTHORIZE_ENDPOINT: Record<Exclude<SNSProvider, 'custom'>, string> = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  facebook: 'https://www.facebook.com/v20.0/dialog/oauth',
  twitter: 'https://api.twitter.com/oauth/authorize',
};

const BASE64_PADDING_REGEX = /=+$/;

export const convertToBase64 = <T>(value: T) => btoa(JSON.stringify(value));

const objectToQuery = (params: Record<string, string>) =>
  Object.keys(params)
    .map(key => `${key}=${key === 'redirect_uri' ? params[key] : encodeURIComponent(params[key] ?? '')}`)
    .join('&');

const getAuthorizationUri = <T extends Record<string, string>>(authorizeEndpoint: string, options: T) => {
  const queryParameters = objectToQuery({
    ...Object.fromEntries(Object.entries(options).filter(([, value]) => !!value)),
  });

  return `${authorizeEndpoint}?${queryParameters}`;
};

const redirectToLogin = <P extends Record<string, string>>(url: string, { state, redirect_uri, ...rest }: P) => {
  const loginState = state;
  const authorizeUri = getAuthorizationUri(url, {
    state: loginState,
    redirect_uri,
    ...rest,
    response_type: 'code',
  });

  if (typeof window !== 'undefined') {
    window.location.href = decodeURIComponent(encodeURIComponent(authorizeUri));
  }
};

function dec2hex(dec: number) {
  return `0${dec.toString(16)}`.slice(-2);
}

function generateRandomString() {
  const array = new Uint32Array(56 / 2);

  if (typeof window !== 'undefined') {
    window.crypto.getRandomValues(array);
  }
  return Array.from(array, dec2hex).join('');
}

function base64urlencode(a: ArrayBuffer) {
  const bytes = new Uint8Array(a);
  const str = Array.from(bytes)
    .map(byte => String.fromCharCode(byte))
    .join('');
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(BASE64_PADDING_REGEX, '');
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function challengeFromVerifier() {
  const verifier = generateRandomString();
  // const hashed = await sha256(verifier);
  const hashed = sha256.arrayBuffer(verifier);
  const base64encoded = base64urlencode(hashed);

  return [base64encoded, verifier];
}

export const loginWithGoogle = (state: string, redirectUri: string) => {
  redirectToLogin(AUTHORIZE_ENDPOINT.google, {
    client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID ?? '',
    prompt: 'select_account',
    scope: 'openid profile email',
    state,
    redirect_uri: redirectUri,
  });
};

export const loginWithFacebook = (state: string, redirectUri: string, codeChallenge: string) => {
  redirectToLogin(AUTHORIZE_ENDPOINT.facebook, {
    client_id: process.env.NEXT_PUBLIC_AUTH_FACEBOOK_ID ?? '',
    scope: 'email,public_profile',
    state,
    redirect_uri: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });
};

export const socialLoginService = async (payload: ISocialLoginPayload, init?: RequestInit) => {
  const response = await postAPI<IAccessTokenResponse, ISocialLoginPayload>(API_ENDPOINT.AUTH, payload, init);

  return response;
};
