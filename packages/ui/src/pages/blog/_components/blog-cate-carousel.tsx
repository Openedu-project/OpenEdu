'use server';

import { getBlogsByCategoryService } from '@oe/api/services/blog';
import { BLOG_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { BlogCarousel } from './blog-carousel';

export async function BlogCateCarousel({ id, name, className }: { id: string; name: string; className?: string }) {
  const blogData = await getBlogsByCategoryService(undefined, {
    params: { id, page: 1, per_page: 10, sort: 'update_at desc' },
  });

  if (!blogData || blogData.results.length === 0) {
    return null;
  }

  return (
    <BlogCarousel
      blogs={blogData?.results}
      title={name}
      className={className}
      viewAllProps={{
        href: buildUrl({ endpoint: BLOG_ROUTES.blogCategory, params: { id: `${id} ${name}` } }),
      }}
    />
  );
}
