import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import { getHashtagsService } from '#services/hashtag';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';

export const useGetHashtags = (queryParams?: IFilter, shouldFetch = true) => {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.HASHTAGS, queryParams: { ...queryParams } });
  const { data, error, isLoading, mutate } = useSWR(shouldFetch ? endpointKey : null, getHashtagsService);

  return {
    hashtags: data,
    hashtagsError: error,
    hashtagsIsLoading: isLoading,
    hashtagsMutate: mutate,
  };
};
