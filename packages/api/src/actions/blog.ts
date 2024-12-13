import { PAGE_SIZE } from '@oe/core/utils/constants';
import { getUserBlogService } from '#services/blog';
import { getTopAuthorService } from '#services/user';
import type { HTTPError } from '#utils/http-error';

interface IGetUserBlogProps {
  type: 'personal' | 'org';
  id: string;
  page?: number;
  pageSize?: number;
  noCache?: boolean;
}

export const getUserBlog = async ({ type, id, page = 1, pageSize, noCache = false }: IGetUserBlogProps) => {
  try {
    return await getUserBlogService(type, undefined, id, {
      params: { page, per_page: pageSize ?? PAGE_SIZE, sort: 'update_at desc' },
      init: { cache: noCache ? 'no-store' : 'force-cache' },
    });
  } catch (error) {
    return error as HTTPError;
  }
};

export const getTopAuthor = async (count?: number) => {
  try {
    return await getTopAuthorService(undefined, {
      params: { page: 1, per_page: count ?? 10, sort: 'update_at desc' },
      init: { next: { tags: ['top-author'] } },
    });
  } catch (error) {
    return error as HTTPError;
  }
};
