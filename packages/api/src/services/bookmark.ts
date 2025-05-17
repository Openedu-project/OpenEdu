import { buildUrl } from '@oe/core';
import type { IBookmark, IBookmarkRequest } from '#types/bookmark';
import { API_ENDPOINT } from '#utils/endpoints';
import { deleteAPI, postAPI } from '#utils/fetch';

export const postBookmarkService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IBookmarkRequest; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.BOOKMARKS,
    });
  }

  const response = await postAPI<IBookmark, IBookmarkRequest>(endpointKey, payload, init);

  return response.data;
};

export const removeBookmarkService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.BOOKMARKS_ID,
      params: {
        id: payload.id,
      },
    });
  }
  const response = await deleteAPI(endpointKey, undefined, init);

  return response.data;
};
