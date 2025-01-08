import { BlogDetailsPage } from '@oe/ui/common/pages';

export default async function OrgBlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  return <BlogDetailsPage slug={slug} type="org" />;
}
