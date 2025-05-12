import useSWRMutation from 'swr/mutation';

import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import { deleteBlog, getBlogListService, getRewriteData, publishBlog, unpublishBlog } from '#services/blog';
import {
  getBlogsByCategoryService,
  getBlogsByHashtagService,
  getBlogsPublishService,
  postBlog,
  postBlogAI,
  updateBlog,
} from '#services/blog';
import type { IAIBlogRequest, IAIBlogResponse, IRewriteResponse } from '#types/blog';
import type { IBlog, IBlogRequest, IBlogsResponse, IPublishBlogType } from '#types/blog';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import type { HTTPError } from '#utils/http-error';

export const usePostAIBlog = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.BLOGS_AI,
    async (endpoint: string, { arg }: { arg: IAIBlogRequest }): Promise<IAIBlogResponse> =>
      postBlogAI(endpoint, { payload: arg })
  );

  return { postAIBlog: trigger, isLoading: isMutating, error };
};

export const usePostBlog = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.BLOGS,
    async (endpoint: string, { arg }: { arg: IBlogRequest }): Promise<IBlog> => postBlog(endpoint, { payload: arg })
  );

  return { postBlog: trigger, isLoading: isMutating, error };
};

export const useUpdateBlog = (type: 'org' | 'personal', id: string) => {
  const endpointKey = buildUrl({
    endpoint: type === 'org' ? API_ENDPOINT.ADMIN_BLOGS_ID : API_ENDPOINT.BLOGS_ID,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (endpoint: string, { arg }: { arg: IBlogRequest }): Promise<IBlog> =>
      updateBlog(type, endpoint, id, { payload: arg })
  );

  return { updateBlog: trigger, isLoading: isMutating, error };
};

export const usePublishBlog = (id: string) => {
  const url = buildUrl({ endpoint: API_ENDPOINT.BLOGS_ID_PUBLISH, params: { id } });
  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: Record<string, string> }): Promise<{ message: string }> =>
      publishBlog(endpoint, id, { payload: arg })
  );

  return { publish: trigger, isLoading: isMutating, error };
};

export const useUnpublishBlog = (type: 'org' | 'personal', id: string) => {
  const url = buildUrl({
    endpoint: type === 'org' ? API_ENDPOINT.BLOGS_ID_PUBLISH_ORG : API_ENDPOINT.BLOGS_ID_PUBLISH_PERSON,
    params: { id },
  });
  const { trigger, isMutating, error } = useSWRMutation(url, async (endpoint: string) =>
    unpublishBlog(type, endpoint, id)
  );

  return { unpublish: trigger, isLoading: isMutating, error };
};

export const useDeleteBlog = (id: string) => {
  const url = buildUrl({ endpoint: API_ENDPOINT.BLOGS_ID, params: { id } });
  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string): Promise<{ message: string }> => deleteBlog(endpoint, id)
  );

  return { delete: trigger, isLoading: isMutating, error };
};

export function useGetRewriteData(id: string, shouldFetch = true) {
  const url = buildUrl({ endpoint: API_ENDPOINT.BLOG_AI_ID_REWRITE, params: { id } });
  const { data, isLoading, error } = useSWR<IRewriteResponse, HTTPError>(id && shouldFetch ? url : null, () =>
    getRewriteData(url)
  );

  return {
    data,
    rewriteLoading: isLoading,
    rewriteError: error,
  };
}

export function useGetListBlogs({ params }: { params: IFilter }) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.BLOGS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getBlogListService(endpoint, { params })
  );

  return {
    blogsData: data,
    errorApproval: error,
    mutateBlogsData: mutate,
    isLoadingBlogs: isLoading,
  };
}

const publishEndpoint: Record<IPublishBlogType, string> = {
  category: API_ENDPOINT.BLOGS_CATEGORIES,
  hashtag: API_ENDPOINT.BLOGS_HASHTAGS,
  default: API_ENDPOINT.BLOGS,
};
const publishServiceFunction: Record<
  IPublishBlogType,
  (endpoint: string, params: IFilter, id: string) => Promise<IBlogsResponse | undefined>
> = {
  category: (endpoint: string, params: IFilter, id: string) =>
    getBlogsByCategoryService(endpoint, { params: { ...params, id } }),
  hashtag: (endpoint: string, params: IFilter, id: string) =>
    getBlogsByHashtagService(endpoint, { params: { ...params, id } }),
  default: (endpoint: string, params: IFilter) => getBlogsPublishService(endpoint, { params }),
};

export function useGetBlogsPublish(type: IPublishBlogType, params: IFilter, id = '', fallback?: IBlogsResponse) {
  const endpointKey = buildUrl({
    endpoint: publishEndpoint[type],
    queryParams: {
      ...params,
      ...(type === 'hashtag' ? { hashtag_id: id } : {}),
      ...(type === 'category' ? { category_id: id } : {}),
    },
  });
  const { data, isLoading, error, mutate } = useSWR(
    endpointKey,
    (endpoint: string) => publishServiceFunction[type](endpoint, params, id),
    {
      fallbackData: fallback,
    }
  );

  return {
    dataListBlog: data,
    errorBlog: error,
    mutateListBlog: mutate,
    isLoadingBlog: isLoading,
  };
}
