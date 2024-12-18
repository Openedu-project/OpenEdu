import type { IBlog, IBlogRequest, IBlogURL } from '#types/blog';
import { API_ENDPOINT } from '#utils/endpoints';
<<<<<<< HEAD
import { type FetchOptions, createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';
=======
import { createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';
>>>>>>> 2f3aa1c (feat: blog form #14)

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
<<<<<<< HEAD
  init?: FetchOptions
=======
  init?: RequestInit
>>>>>>> 2f3aa1c (feat: blog form #14)
) => {
  const defaultUrl = createAPIUrl({
    endpoint: API_ENDPOINT.BLOGS_ID_EDIT,
    params: { id: payload?.id },
    queryParams: payload?.queryParams,
  });
  const response = await fetchAPI<IBlog>(url ?? defaultUrl, init);

<<<<<<< HEAD
  return response.data;
=======
  return { data: response.data, revalidatePath: defaultUrl };
>>>>>>> 2f3aa1c (feat: blog form #14)
};
