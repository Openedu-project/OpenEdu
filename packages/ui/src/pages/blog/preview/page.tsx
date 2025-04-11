import { getBlogDraftContent } from '@oe/api';
import { BlogDetails } from '#components/blog';

export async function BlogPreviewPage({ id }: { id: string }) {
  const blogData = await getBlogDraftContent(undefined, { id });

  return <BlogDetails data={blogData} preview />;
}
