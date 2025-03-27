import { getPopularCoursesServicesAtWebsite } from '@oe/api/services/featured-contents';
import { getOrgByDomainService } from '@oe/api/services/organizations';
import { getCookie } from '@oe/core/utils/cookie';
export const getPopularCourses = async () => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  const [orgData] = await Promise.all([
    getOrgByDomainService(undefined, {
      domain: domain?.split('/')?.[0] ?? domain,
    }),
  ]);
  try {
    const dataPopularCourses = await getPopularCoursesServicesAtWebsite(undefined, {
      params: { org_id: orgData?.domain ?? orgData?.alt_domain ?? '' },
    });
    return dataPopularCourses;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
