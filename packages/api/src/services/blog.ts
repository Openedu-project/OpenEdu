import type { IBlog, IBlogRequest, IBlogURL, IBlogsResponse } from '#types/blog';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';

export const postBlogAI = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: Record<string, string | IBlogURL[]>; init?: RequestInit }
) => {
  const response = await postAPI<IBlog, Record<string, string | IBlogURL[]>>(
    endpoint ?? API_ENDPOINT.BLOGS_AI,
    payload,
    init
  );

  return response.data;
};

export const postBlog = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IBlogRequest; init?: RequestInit }
) => {
  const response = await postAPI<IBlog, IBlogRequest>(endpoint ?? API_ENDPOINT.BLOGS, payload, init);

  return response.data;
};

export const getUserBlogService = async (
  type: 'personal' | 'org',
  url?: string,
  id?: string,
  { params, init }: { params?: IFilter; init?: RequestInit } = {}
): Promise<IBlogsResponse | null> => {
  const key =
    url ??
    createAPIUrl({
      endpoint: type === 'personal' ? API_ENDPOINT.USERS_ID_PERSON_BLOGS : API_ENDPOINT.USERS_ID_ORG_BLOGS,
      params: { id },
      queryParams: { ...params },
    });
  const res = await fetchAPI<IBlogsResponse>(key, init);

  return res.data;
};

export const updateBlog = async (
  type: 'org' | 'personal',
  endpoint: string | null | undefined,
  id: string | undefined,
  { payload, init }: { payload: IBlogRequest; init?: RequestInit }
) => {
  const url = createAPIUrl({
    endpoint: type === 'org' ? API_ENDPOINT.ADMIN_BLOGS_ID : API_ENDPOINT.BLOGS_ID,
    params: { id },
  });
  const response = await putAPI<IBlog, IBlogRequest>(endpoint ?? url, payload, init);

  return response.data;
};

export const getBlogDraftContent = async (
  url?: string,
  payload?: { id: string; queryParams?: Record<string, string> },
  init?: FetchOptions
) => {
  const defaultUrl = createAPIUrl({
    endpoint: API_ENDPOINT.BLOGS_ID_EDIT,
    params: { id: payload?.id },
    queryParams: payload?.queryParams,
  });
  const response = await fetchAPI<IBlog>(url ?? defaultUrl, init);

  return response.data;
};
