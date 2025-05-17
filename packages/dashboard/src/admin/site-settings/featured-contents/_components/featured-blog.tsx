import { getOrgByDomainService } from '@oe/api';
import { ListBlogs } from './list-blogs';

export default async function FeaturedBlog() {
  const orgData = await getOrgByDomainService();

  return <ListBlogs domain={orgData?.domain ?? orgData?.alt_domain} />;
}
