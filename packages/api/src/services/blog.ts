import type { IBlog, IBlogURL } from '#types/blog';
import { API_ENDPOINT } from '#utils/endpoints';
import { postAPI } from '#utils/fetch';

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
