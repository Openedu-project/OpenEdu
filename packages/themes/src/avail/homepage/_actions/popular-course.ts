import { getPopularCoursesServicesAtWebsite } from '@oe/api/services/featured-contents';
import { getCookie } from '@oe/core/utils/cookie';
export const getPopularCourses = async () => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  try {
    const dataPopularCourses = await getPopularCoursesServicesAtWebsite(undefined, {
      params: { org_id: domain ?? '' },
    });
    return dataPopularCourses;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
