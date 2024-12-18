import type { IBlog, IBlogRequest, IBlogURL } from '#types/blog';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';

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
  init?: RequestInit
) => {
  const defaultUrl = createAPIUrl({
    endpoint: API_ENDPOINT.BLOGS_ID_EDIT,
    params: { id: payload?.id },
    queryParams: payload?.queryParams,
  });
  const response = await fetchAPI<IBlog>(url ?? defaultUrl, init);

  return { data: response.data, revalidatePath: defaultUrl };
};
