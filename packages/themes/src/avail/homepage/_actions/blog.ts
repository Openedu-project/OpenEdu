import { getPopularBlogsServicesAtWebsite } from '@oe/api/services/featured-contents';
import { getOrgByDomainService } from '@oe/api/services/organizations';
import { getCookie } from '@oe/core/utils/cookie';
export const getPopularBlogs = async () => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  try {
    const orgData = await getOrgByDomainService(undefined, { domain });
    const dataPopularBlogs = await getPopularBlogsServicesAtWebsite(undefined, {
      params: { org_id: orgData?.id ?? '' },
    });
    return dataPopularBlogs;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
