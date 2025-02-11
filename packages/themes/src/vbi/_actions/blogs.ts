'use server';

import { getPopularBlogsServicesAtWebsite } from '@oe/api/services/featured-contents';
import type { IBlog } from '@oe/api/types/blog';
import { getCookie } from '@oe/core/utils/cookie';
export const getPopularBlogs = async () => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  try {
    const dataPopularBlogs = await getPopularBlogsServicesAtWebsite(undefined, {
      params: { org_id: domain ?? '' },
    });

    if (dataPopularBlogs?.length === 0) {
      return undefined;
    }

    return {
      featuredPost: dataPopularBlogs?.[0]?.entity as IBlog,
      restPost: dataPopularBlogs?.slice(1, 3)?.map(v => v?.entity) as IBlog[],
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
