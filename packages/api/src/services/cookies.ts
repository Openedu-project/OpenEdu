import type { CookieOptions } from '@oe/core/utils/cookie';
import { API_ENDPOINT } from '#utils/endpoints';

type CookieData = {
  key: string;
  value: string;
  options?: CookieOptions;
};

export const setCookiesService = async (cookies: CookieData | CookieData[]) => {
  await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN}${API_ENDPOINT.SET_COOKIE}`, {
    method: 'POST',
    body: JSON.stringify(cookies),
  });
};
