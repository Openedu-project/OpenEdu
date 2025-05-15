import { BlogPreviewPage } from "@oe/ui";
export const dynamic = "force-dynamic";
export default async function PreviewPersonalBlog({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <BlogPreviewPage id={id} />;
}
