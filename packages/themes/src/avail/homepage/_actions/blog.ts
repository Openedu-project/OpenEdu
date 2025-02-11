import { getPopularBlogsServicesAtWebsite } from '@oe/api/services/featured-contents';
import { getCookie } from '@oe/core/utils/cookie';
export const getPopularBlogs = async () => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  try {
    const dataPopularBlogs = await getPopularBlogsServicesAtWebsite(undefined, {
      params: { org_id: domain ?? '' },
    });
    return dataPopularBlogs;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
