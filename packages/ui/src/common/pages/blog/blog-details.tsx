import { getBlogContent, getBlogsByCategoryId } from '@oe/api/services/blog';
import { BlogCarousel, BlogDetails } from '#components/blog';

const getRelativeBlog = async (id?: string) => {
  if (!id) {
    return [];
  }
  try {
    const res = await getBlogsByCategoryId(undefined, { id });
    return res.results;
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
