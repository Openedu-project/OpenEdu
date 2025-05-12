import { buildUrl } from '@oe/core';
import type { IHashtagResponse } from '#types/hashtag';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';

export const getHashtagsService = async (
  url?: string,
  init?: RequestInit & { queryParams?: Record<string, string> }
) => {
  const defaultUrl = buildUrl({ endpoint: API_ENDPOINT.HASHTAGS, queryParams: init?.queryParams });
  const response = await fetchAPI<IHashtagResponse>(url ?? defaultUrl, init);

  return response.data;
};
