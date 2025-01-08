import { getBlogDraftContent } from '@oe/api/services/blog';
import { BlogDetails } from '#components/blog';

export default async function BlogPreviewPage({ id }: { id: string }) {
  const blogData = await getBlogDraftContent(undefined, { id });

  return <BlogDetails data={blogData} preview />;
}
