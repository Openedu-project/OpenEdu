import type {
  IAIBlogRequest,
  IAIBlogResponse,
  IBlog,
  IBlogListResponse,
  IBlogRequest,
  IBlogsResponse,
  IRewriteResponse,
} from '#types/blog';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

export const getBlogListService = async (
  url: string | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
) => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.BLOGS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IBlogListResponse>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
};

export const postBlogAI = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IAIBlogRequest; init?: RequestInit }
) => {
  const response = await postAPI<IAIBlogResponse, IAIBlogRequest>(endpoint ?? API_ENDPOINT.BLOGS_AI, payload, init);

  return response.data;
};

export const publishBlog = async (
  endpoint: string | null | undefined,
  id: string | undefined,
  { payload, init }: { payload?: Record<string, string>; init?: RequestInit }
) => {
  const endpointKey = endpoint ?? createAPIUrl({ endpoint: API_ENDPOINT.BLOGS_ID_PUBLISH, params: { id } });
  const response = await postAPI<{ message: string }, Record<string, string> | undefined>(endpointKey, payload, init);

  return response.data;
};

export const unpublishBlog = async (
  type: 'org' | 'personal',
  endpoint: string | null | undefined,
  id: string | undefined,
  init?: RequestInit
) => {
  const endpointKey =
    endpoint ??
    createAPIUrl({
      endpoint: type === 'org' ? API_ENDPOINT.BLOGS_ID_PUBLISH_ORG : API_ENDPOINT.BLOGS_ID_PUBLISH_PERSON,
      params: { id },
    });
  const response = await deleteAPI<{ message: string }, RequestInit>(endpointKey, init);

  return response.data;
};

export const deleteBlog = async (endpoint: string | null | undefined, id: string | undefined, init?: RequestInit) => {
  const endpointKey = endpoint ?? createAPIUrl({ endpoint: API_ENDPOINT.BLOGS_ID, params: { id } });
  const response = await deleteAPI<{ message: string }, RequestInit>(endpointKey, init);

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

export const getBlogContent = async (
  url?: string,
  payload?: { type: 'org' | 'personal'; slug: string; queryParams?: Record<string, string> },
  init?: FetchOptions
) => {
  const defaultUrl = createAPIUrl({
    endpoint: payload?.type === 'org' ? API_ENDPOINT.BLOGS_ID_ORG : API_ENDPOINT.BLOGS_ID_PERSONAL,
    params: { id: payload?.slug },
    queryParams: payload?.queryParams,
  });
  const response = await fetchAPI<IBlog>(url ?? defaultUrl, init);

  return response.data;
};

export const getRewriteData = async (
  url: string | null | undefined,
  params?: { id: string },
  queryParams?: Record<string, string>,
  init?: RequestInit
) => {
  const endpointKey = url ?? createAPIUrl({ endpoint: API_ENDPOINT.BLOG_AI_ID_REWRITE, params, queryParams });
  const response = await fetchAPI<IRewriteResponse>(endpointKey, init);

  return response.data;
};
export async function getBlogsPublishService(
  url: string | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IBlogsResponse | undefined> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.BLOGS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IBlogsResponse>(endpointKey, init);

    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getBlogsByCategoryService(
  url: string | undefined,
  { params, init }: { params: { id: string } & IFilter; init?: RequestInit }
): Promise<IBlogsResponse | undefined> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.BLOGS_CATEGORIES,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IBlogsResponse>(endpointKey, init);

    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
