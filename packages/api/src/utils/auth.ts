import { type CookieOptions, getCookie } from '@oe/core/utils/cookie';

export const isLogin = async (options?: CookieOptions) => {
  const accessToken = await getCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, options);

  return !!accessToken;
};
