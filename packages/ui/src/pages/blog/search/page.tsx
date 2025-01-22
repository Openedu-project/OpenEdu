import { getBlogsPublishService } from '@oe/api/services/blog';
import { getCategoriesTreeService } from '@oe/api/services/categories';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Separator } from '#shadcn/separator';
import { BlogHeader } from '../_components/blog-header';
import { BlogList } from '../_components/blog-list';
import { NoBlogData } from '../_components/no-blog-data';

export default async function SearchBlogPage({ name }: { name?: string }) {
  const [blogsData, t, categoryData] = await Promise.all([
    getBlogsPublishService(undefined, {
      params: {
        page: 1,
        per_page: 12,
        sort: 'update_at desc',
        search_categories: 'title',
        search_term: name ?? '',
      },
    }),
    getTranslations('blogSearch'),
    getCategoriesTreeService(undefined, { queryParams: { active: true, type: 'blog' } }),
  ]);

  return (
    <>
      <BlogHeader categoryData={categoryData} />
      <div className="container py-6">
        <div className="mb-4 flex items-center gap-2 border-b py-3 md:mb-8">
          {name && (
            <h3 className="giant-iheading-semibold16 mb-0">
              {t.rich('resultFor', {
                strong: (chunks: ReactNode) => (
                  <strong className="giant-iheading-semibold24 text-primary">{chunks}</strong>
                ),
                name,
              })}
            </h3>
          )}
          <Separator className="h-0.5 w-2" />
          <span className="mbutton-semibold16 text-foreground/75">
            {t.rich((blogsData?.pagination?.total_items ?? 0) > 1 ? 'numberBlogsFound' : 'numberBlogFound', {
              number: blogsData?.pagination?.total_items ?? 0,
            })}
          </span>
        </div>
        {(blogsData?.results.length ?? 0) > 0 ? (
          <BlogList fallbackData={blogsData} />
        ) : (
          <NoBlogData message={t('noBlogAvailable')} />
        )}
      </div>
    </>
  );
}
