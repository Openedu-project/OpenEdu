'use server';

import { getBlogListService } from '@oe/api/services/blog';
import type { IBlog } from '@oe/api/types/blog';

export async function getBlogData() {
  const [blogsData] = await Promise.all([
    getBlogListService(undefined, {
      params: {
        per_page: 4,
        page: 1,
        sort: 'create_at desc',
        is_active: true,
      },
    }),
  ]);

  return {
    featuredPost: blogsData?.results[0] as IBlog,
    restPost: blogsData?.results.slice(1) as IBlog[],
  };
}
