import { BlogDetailsPage } from "@oe/ui";

export default async function OrgBlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return <BlogDetailsPage slug={slug} type="org" />;
}
