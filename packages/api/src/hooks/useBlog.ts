import useSWRMutation from 'swr/mutation';

import { postBlogAI } from '#services/blog';
import type { IBlog, IBlogURL } from '#types/blog';
import { API_ENDPOINT } from '#utils/endpoints';

export const usePostAIBlog = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.BLOGS_AI,
    async (endpoint: string, { arg }: { arg: Record<string, string | IBlogURL[]> }): Promise<IBlog> =>
      postBlogAI(endpoint, { payload: arg })
  );

  return { postAIBlog: trigger, isLoading: isMutating, error };
};
