import type { CookieOptions } from '@oe/core';
import { API_ENDPOINT } from '#utils/endpoints';

type CookieData = {
  key: string;
  value: string;
  options?: CookieOptions;
};

export const setCookiesService = async (origin: string, cookies: CookieData | CookieData[]) => {
  await fetch(`${origin}${API_ENDPOINT.SET_COOKIE}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cookies),
  });
};
