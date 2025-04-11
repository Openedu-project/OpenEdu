import { BlogPreviewPage } from "@oe/ui";

export default async function PreviewOrgBlog({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <BlogPreviewPage id={id} />;
}
