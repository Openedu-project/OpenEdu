import useSWRMutation from 'swr/mutation';

import { postBlog, postBlogAI, updateBlog } from '#services/blog';
import type { IBlog, IBlogRequest, IBlogURL } from '#types/blog';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export const usePostAIBlog = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.BLOGS_AI,
    async (endpoint: string, { arg }: { arg: Record<string, string | IBlogURL[]> }): Promise<IBlog> =>
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
