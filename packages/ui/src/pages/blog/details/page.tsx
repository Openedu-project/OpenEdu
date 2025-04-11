import { getBlogContent } from '@oe/api';
import { BlogDetails } from '#components/blog';
import { BlogCateCarousel } from '../_components/blog-cate-carousel';

export async function BlogDetailsPage({
  slug,
  type,
}: {
  slug: string;
  type: 'org' | 'personal';
}) {
  const blogData = await getBlogContent(undefined, { slug, type });
  const categoryId = blogData.categories?.[0]?.id;

  return (
    <div>
      <BlogDetails data={blogData} />
      {categoryId && (
        <BlogCateCarousel className="p-4 md:p-8" id={categoryId} name={blogData.categories?.[0]?.name ?? ''} />
      )}
    </div>
  );
}
