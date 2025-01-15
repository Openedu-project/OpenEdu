import useSWRMutation from 'swr/mutation';

import useSWR from 'swr';
import {
  deleteBlog,
  getBlogListService,
  getRewriteData,
  postBlog,
  postBlogAI,
  publishBlog,
  unpublishBlog,
  updateBlog,
} from '#services/blog';
import type { IAIBlogRequest, IAIBlogResponse, IBlog, IBlogRequest, IRewriteResponse } from '#types/blog';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
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
  const endpointKey = createAPIUrl({
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
  const url = createAPIUrl({ endpoint: API_ENDPOINT.BLOGS_ID_PUBLISH, params: { id } });
  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: Record<string, string> }): Promise<{ message: string }> =>
      publishBlog(endpoint, id, { payload: arg })
  );

  return { publish: trigger, isLoading: isMutating, error };
};

export const useUnpublishBlog = (type: 'org' | 'personal', id: string) => {
  const url = createAPIUrl({
    endpoint: type === 'org' ? API_ENDPOINT.BLOGS_ID_PUBLISH_ORG : API_ENDPOINT.BLOGS_ID_PUBLISH_PERSON,
    params: { id },
  });
  const { trigger, isMutating, error } = useSWRMutation(url, async (endpoint: string) =>
    unpublishBlog(type, endpoint, id)
  );

  return { unpublish: trigger, isLoading: isMutating, error };
};

export const useDeleteBlog = (id: string) => {
  const url = createAPIUrl({ endpoint: API_ENDPOINT.BLOGS_ID, params: { id } });
  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string): Promise<{ message: string }> => deleteBlog(endpoint, id)
  );

  return { delete: trigger, isLoading: isMutating, error };
};

export function useGetRewriteData(id: string, shouldFetch = true) {
  const url = createAPIUrl({ endpoint: API_ENDPOINT.BLOG_AI_ID_REWRITE, params: { id } });
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
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.BLOGS, queryParams: { ...params } });
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
