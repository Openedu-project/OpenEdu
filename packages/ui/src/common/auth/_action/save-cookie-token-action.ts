'use server';

import { setCookie } from '@oe/core/utils/cookie';

export async function saveCookieTokenAction(accessToken: string, refreshToken: string) {
  await Promise.all([
    setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, accessToken),
    setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, refreshToken),
  ]);
}
