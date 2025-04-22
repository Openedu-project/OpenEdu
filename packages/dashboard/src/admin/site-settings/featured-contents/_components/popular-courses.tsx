import { getOrgByDomainService } from '@oe/api';
import { getCookie } from '@oe/core';
import { ListPopularCourses } from './list-popular-courses';

export default async function PopularCourses() {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  const [orgData] = await Promise.all([
    getOrgByDomainService(undefined, {
      domain: domain?.split('/')?.[0] ?? domain,
    }),
  ]);

  return <ListPopularCourses domain={orgData?.domain ?? orgData?.alt_domain} />;
}
