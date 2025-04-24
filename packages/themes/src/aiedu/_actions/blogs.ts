'use server';

// import type { IBlog } from '@oe/api';
import { getOrgByDomainService } from '@oe/api';
import { getPopularBlogsServicesAtWebsite } from '@oe/api';
import { getCookie } from '@oe/core';
import type { IBlogResult } from './type';

interface PopularBlogsResult {
  featuredPost: IBlogResult;
  restPost: IBlogResult[];
}

export const getPopularBlogs = async (): Promise<PopularBlogsResult | undefined> => {
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

    if (!dataPopularBlogs || dataPopularBlogs?.length === 0) {
      return undefined;
    }

    return {
      featuredPost: dataPopularBlogs[0]?.entity as IBlogResult,
      restPost: dataPopularBlogs.slice(1, 4)?.map(v => v?.entity) as IBlogResult[],
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
