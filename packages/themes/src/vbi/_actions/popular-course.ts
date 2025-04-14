import { getOrgByDomainService } from '@oe/api';
import { getPopularCoursesServicesAtWebsite } from '@oe/api';
import { getCookie } from '@oe/core';
import type { ICourseResult } from './type';
export const getPopularCourses = async (): Promise<ICourseResult | undefined> => {
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
    return dataPopularCourses as ICourseResult;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
