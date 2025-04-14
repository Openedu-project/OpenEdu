import { getBlogsByCategoryService } from '@oe/api';
import { getTranslations } from 'next-intl/server';
import { BlogHeader } from '../_components/blog-header';
import { BlogList } from '../_components/blog-list';
import { NoBlogData } from '../_components/no-blog-data';

export async function CategoryBlogPage({
  name,
  id,
}: {
  name?: string;
  id: string;
}) {
  const [blogsData, t] = await Promise.all([
    getBlogsByCategoryService(undefined, {
      params: {
        id,
        page: 1,
        per_page: 12,
        sort: 'update_at desc',
        search_categories: 'title',
        search_term: '',
      },
    }),
    getTranslations('blogSearch'),
  ]);

  return (
    <>
      <BlogHeader activeId={id} />
      <div className="container py-6 xl:px-32">
        <div className="mb-4 flex items-center gap-2 border-b py-3 md:mb-8">
          {name && (
            <h2 className="giant-iheading-semibold16 md:giant-iheading-semibold24 mb-0 text-primary">
              {name} ({blogsData?.pagination?.total_items ?? 0})
            </h2>
          )}
        </div>
        {(blogsData?.results.length ?? 0) > 0 ? (
          <BlogList fallbackData={blogsData} id={id} type="category" />
        ) : (
          <NoBlogData message={t('noBlogAvailable')} />
        )}
      </div>
    </>
  );
}
