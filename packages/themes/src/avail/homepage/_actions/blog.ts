import { getOrgByDomainService } from '@oe/api';
import { getPopularBlogsServicesAtWebsite } from '@oe/api';
import { getCookie } from '@oe/core';
import type { IBlogResult } from './type';
export const getPopularBlogs = async (): Promise<IBlogResult | undefined> => {
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
    return dataPopularBlogs as IBlogResult;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
