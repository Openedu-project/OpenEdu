import { getPopularCoursesServicesAtWebsite } from '@oe/api/services/featured-contents';
import { getOrgByDomainService } from '@oe/api/services/organizations';
import { getCookie } from '@oe/core/utils/cookie';
export const getPopularCourses = async () => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  try {
    const orgData = await getOrgByDomainService(undefined, { domain });
    const dataPopularCourses = await getPopularCoursesServicesAtWebsite(undefined, {
      params: { org_id: orgData?.id ?? '' },
    });
    return dataPopularCourses;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
