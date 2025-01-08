import OrgBlogCreation from '@oe/dashboard/blog-admin/creation/page';

export default async function EditOrgBlogPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <OrgBlogCreation id={id} action="update" />;
}
