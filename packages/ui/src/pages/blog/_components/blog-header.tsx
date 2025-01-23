'use client';

import type { ICategoryTree } from '@oe/api/types/categories';
import { BLOG_ROUTES } from '@oe/core/utils/routes';
import { usePathname } from '#common/navigation';
import { CategoryAllMenu, CategoryNavMenu } from './category-nav';
import { SearchBlog } from './search';

export function BlogHeader({
  categoryData,
}: {
  categoryData: ICategoryTree[];
}) {
  const pathname = usePathname();
  const activeId = pathname.includes(BLOG_ROUTES.blogCategory.split('/:')[0] ?? '')
    ? pathname.split('/').at(-1)
    : undefined;
  return (
    <div className="flex flex-col flex-wrap justify-between gap-4 bg-primary/5 p-2 pr-4 pb-0 sm:flex-row">
      <CategoryAllMenu categories={categoryData} activeId={activeId} />
      <CategoryNavMenu className="hidden md:flex" categories={categoryData} activeId={activeId} />
      <div className="mb-3 grow lg:max-w-xl">
        <SearchBlog />
      </div>
    </div>
  );
}
