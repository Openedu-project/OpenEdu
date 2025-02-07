import BlogPreviewPage from '@oe/ui/pages/blog/preview';

export default async function PreviewPersonalBlog({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <BlogPreviewPage id={id} />;
}
