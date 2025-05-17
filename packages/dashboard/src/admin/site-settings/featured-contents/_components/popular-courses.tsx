import { getOrgByDomainService } from '@oe/api';
import { ListPopularCourses } from './list-popular-courses';

export default async function PopularCourses() {
  const orgData = await getOrgByDomainService();

  return <ListPopularCourses domain={orgData?.domain ?? orgData?.alt_domain} />;
}
