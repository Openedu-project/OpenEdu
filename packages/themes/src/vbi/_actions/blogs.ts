'use server';

import { getPopularBlogsServicesAtWebsite } from '@oe/api/services/featured-contents';
import { getOrgByDomainService } from '@oe/api/services/organizations';
import type { IBlog } from '@oe/api/types/blog';
import { getCookie } from '@oe/core/utils/cookie';
export const getPopularBlogs = async () => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  const [orgData] = await Promise.all([
    getOrgByDomainService(undefined, {
      domain: domain?.split('/')?.[0] ?? domain,
    }),
  ]);
  try {
    const dataPopularBlogs = await getPopularBlogsServicesAtWebsite(undefined, {
      params: { org_id: orgData?.domain ?? orgData?.alt_domain ?? '' },
    });

    if (dataPopularBlogs?.length === 0) {
      return undefined;
    }

    return {
      featuredPost: dataPopularBlogs?.[0]?.entity as IBlog,
      restPost: dataPopularBlogs?.slice(1, 4)?.map(v => v?.entity) as IBlog[],
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
