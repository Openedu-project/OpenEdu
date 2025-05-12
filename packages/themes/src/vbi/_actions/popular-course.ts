import { getOrgByDomainService } from '@oe/api';
import { getPopularCoursesServicesAtWebsite } from '@oe/api';
import type { ICourseResult } from './type';
export const getPopularCourses = async (): Promise<ICourseResult | undefined> => {
  const orgData = await getOrgByDomainService();

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
