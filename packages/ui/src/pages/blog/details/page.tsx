import { getBlogContent, getBlogsByCategoryService } from '@oe/api/services/blog';
import { BlogCarousel } from '../_components/blog-carousel';
import { BlogDetails } from '../_components/blog-details';

const getRelativeBlog = async (id?: string) => {
  if (!id) {
    return [];
  }
  try {
    const res = await getBlogsByCategoryService(undefined, { params: { id } });
    return res?.results ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function BlogDetailsPage({
  slug,
  type,
}: {
  slug: string;
  type: 'org' | 'personal';
}) {
  const blogData = await getBlogContent(undefined, { slug, type });
  const relativeBlogs = await getRelativeBlog(blogData.categories?.[0]?.id);

  return (
    <div>
      <BlogDetails data={blogData} />
      {relativeBlogs?.length > 0 && (
        <div className="p-4 lg:p-6">
          <BlogCarousel className="border-t pt-6" blogs={relativeBlogs} title={blogData.categories?.[0]?.name ?? ''} />
        </div>
      )}
    </div>
  );
}
