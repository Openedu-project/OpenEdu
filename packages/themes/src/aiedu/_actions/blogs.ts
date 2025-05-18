'use server';

// import type { IBlog } from '@oe/api';
import { getOrgByDomainService } from '@oe/api';
import { getPopularBlogsServicesAtWebsite } from '@oe/api';
import type { IBlogResult } from './type';

interface PopularBlogsResult {
  featuredPost: IBlogResult;
  restPost: IBlogResult[];
}

export const getPopularBlogs = async (): Promise<PopularBlogsResult | undefined> => {
  const orgData = await getOrgByDomainService();

  try {
    const dataPopularBlogs = await getPopularBlogsServicesAtWebsite(undefined, {
      params: { org_id: orgData?.domain ?? orgData?.alt_domain ?? '' },
    });

    if (!dataPopularBlogs || dataPopularBlogs?.length === 0) {
      return undefined;
    }

    return {
      featuredPost: dataPopularBlogs[0]?.entity as IBlogResult,
      restPost: dataPopularBlogs
        .slice(1, 4)
        .map(v => v.entity)
        .filter(Boolean) as IBlogResult[],
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
