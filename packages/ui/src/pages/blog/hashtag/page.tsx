import { getBlogsByHashtagService } from '@oe/api/services/blog';
import { getTranslations } from 'next-intl/server';
import { BlogHeader } from '../_components/blog-header';
import { BlogList } from '../_components/blog-list';
import { NoBlogData } from '../_components/no-blog-data';

export default async function HashtagBlogPage({ name, id }: { name?: string; id: string }) {
  const [blogsData, t] = await Promise.all([
    getBlogsByHashtagService(undefined, {
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
      <BlogHeader />
      <div className="container py-6 xl:px-32">
        <div className="mb-4 flex items-center gap-2 border-b py-3 md:mb-8">
          {name && (
            <h2 className="giant-iheading-semibold16 md:giant-iheading-semibold20 mb-0 rounded-full bg-primary/10 px-4 py-2 text-primary md:px-6">
              #{name}
            </h2>
          )}
          <span className="giant-iheading-semibold20">({blogsData?.pagination?.total_items ?? 0})</span>
        </div>
        {(blogsData?.results.length ?? 0) > 0 ? (
          <BlogList fallbackData={blogsData} id={id} type="hashtag" />
        ) : (
          <NoBlogData message={t('noBlogAvailable')} />
        )}
      </div>
    </>
  );
}
