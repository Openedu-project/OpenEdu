import { getOrgByDomainService } from '@oe/api';
import { getPopularBlogsServicesAtWebsite } from '@oe/api';
import type { IBlogResult } from './type';
export const getPopularBlogs = async (): Promise<IBlogResult | undefined> => {
  const orgData = await getOrgByDomainService();

  try {
    const dataPopularBlogs = await getPopularBlogsServicesAtWebsite(undefined, {
      params: { org_id: orgData?.domain ?? orgData?.alt_domain ?? '' },
    });
    return dataPopularBlogs as IBlogResult;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
